import ssim, { Options } from "ssim.js";
import pixelmatch from "pixelmatch";
import {drawPolygon, moveVertex, Vertex} from "./common/geometry";
import {AGworkerIn, AGworkerOut} from "./common/communication";
import {buildPhenotypeFromGenes, Individual, randomNumberInRange, Result} from "./common/ga";
import { Context } from "vm";

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };

function createEmptyIndividual(): Individual {
    const ind: Individual = {
        id: 0,
        genes: [],
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        diff: undefined,
        probability: 0,
        phenotype: []
    }

    return ind;
}

function createIndividual(genesSize: number, nbVertices: number, nbColor: number, width: number, height: number): Individual {
    const genes: number[] = [];
    for (let i = 0; i < genesSize; i++) {
        
        const x = randomNumberInRange(0, width, true);
        const y = randomNumberInRange(0, width, true);

        for (let j = 0; j < nbVertices; j++) {
            genes.push(x + randomNumberInRange(0, width / 2, true));
            genes.push(y + randomNumberInRange(0, height / 2, true));
        }

        for (let j = 0; j < nbColor; j++) {
            const c = j < 3 ? randomNumberInRange(0, 256, true) : randomNumberInRange(0.2, 1, false);
            genes.push(c); 
        }        
    }
   
    const ind: Individual = {
        id: Date.now(),
        genes: genes,
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        diff: undefined,
        probability: 0,
        phenotype: []
    }

    return ind;
}

function generatePopulation(popSize: number, genesSize: number, nbVertices: number, nbColor: number, width: number, height: number): Individual[]
{
    let population = [];
    for (let i = 0; i < popSize; i++) {
        const ind = createIndividual( genesSize, nbVertices, nbColor, width, height);
        population.push(ind);
    }
    return population;
}

function evaluatePopulation(population: Individual[], nbVertices: number, nbColor: number, originalImage: ImageData, ctx: Context): Individual[] {
    if(!ctx) {
        return [...population];
    }

    let evaluatedPopulation = [];
    for (let i = 0; i < population.length; i++) {        
        // Draw the image from the genes
        const ind = population[i];
        const result = evaluate(ind, nbVertices, nbColor, originalImage, ctx);
        
        const evaluatedInd: Individual = {
            genes: [...ind.genes],
            fitness: result.fitness,
            ssim: result.ssim,
            pixelDiff: result.pixelDiff,
            diff: result.diff,
            probability: 0,
            id: ind.id,
            phenotype: [...ind.phenotype]
        };

        evaluatedPopulation.push(evaluatedInd);
    }

    return evaluatedPopulation;
}

function evaluate(ind: Individual, nbVertices: number, nbColor: number, image: ImageData, ctx: Context): Result {
    
    ind.phenotype = buildPhenotypeFromGenes(ind.genes, nbVertices, nbColor);
    
    // Clean the drawing space
    ctx.clearRect(0, 0, image.width, image.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, image.width, image.height);
    
    // Draw the image from the genes
    for (let i = 0; i < ind.phenotype.length; i++) {
        const shape = ind.phenotype[i];
        drawPolygon(ctx, shape);
    }
    const generatedImage = ctx.getImageData(0, 0, image.width, image.height);

    // Compute similarity
    const options: Options = {
        rgb2grayVersion: 'original',
        windowSize: 11, // window size for the SSIM map
        k1: 0.01, //The first stability constant
        k2: 0.03, //The second stability constant
        bitDepth: 8, //The number of bits used to encode each pixel
        downsample: 'original', //false / 'original' / 'fast'
        ssim: 'original'
    };
    const ssimResult = ssim(image, generatedImage, options);

   /*
    const ssimResult = {
        mssim: 0
    };
    */
    
    const canvas = new OffscreenCanvas(image.width, image.height);
    const diffContext = canvas.getContext('2d');
    let nbPixelsDiff = 0;
    let diff: ImageData | undefined = undefined;
    if (diffContext) {
        diff = diffContext.createImageData(image.width, image.height);
        nbPixelsDiff = pixelmatch(image.data, generatedImage.data, diff.data, image.width, image.height, {threshold: 0.1});
    }
    
    const ratioMatchingPixel = ((image.width * image.height) - nbPixelsDiff) / (image.width * image.height);
    
    //let diff: ImageData | undefined = undefined;
    //const ratioMatchingPixel = 0; 
    
    const ratioSsim = 1;
    const ratioPixel = 0;
    const result: Result = {
        fitness: (ssimResult.mssim * ratioSsim + ratioMatchingPixel * ratioPixel) / (ratioSsim + ratioPixel),
        ssim: ssimResult.mssim,
        pixelDiff: ratioMatchingPixel,
        diff: diff
    }
    return result;
}

function convertFitnessIntoProbabilities(population: Individual[]): Individual[] {
    let sumFit = 0.0;
    let scores = [];
    let populationWithProba = [...population];

    for (let ind of population) {
        const fitness = ind.fitness * ind.fitness;
        scores.push(fitness);
        sumFit += fitness;
    }

    let previousProba = 0.0;
    for (let i = 0; i < scores.length; i++) {
        const relativeFitness = scores[i] / sumFit;
        previousProba += relativeFitness;
        populationWithProba[i].probability = previousProba; // cumulation of probabilities for fortune of wheel
    }

    // Round last probability to 1
    const lastIndex = populationWithProba.length - 1;
    populationWithProba[lastIndex].probability = 1.0;
    return populationWithProba;
}

function pickParent(population: Individual[]): Individual {
    const rand = Math.random();
    let i = 0;
    while (i < population.length && population[i].probability <= rand) {
        i++;
    }

    if (i === population.length) {
        i = i - 1;
    }
    return population[i];
}

function generateTournamentPool(population: Individual[], poolSize: number): Individual[] {
    const pool: Individual[] = [];
    for (let i = 0; i < poolSize; i++) {
        const candidate = pickParent(population);
        pool.push(candidate);
    }
    return pool;
}

function pickParentFromTournament(population: Individual[], tournamentSize: number): Individual {
    let best: Individual = createEmptyIndividual();
    for (let i = 0; i < tournamentSize; i++) {
        const index = Math.floor(Math.random() * population.length);
        const candidate = population[index];
        if (!best || candidate.fitness > best.fitness) {
            best = candidate;
        }
    }
    return best;
}

// Crossover with single point crossover
/*
function crossOver(a: Individual, b: Individual, nbVertices: number, nbColor: number): Individual {
    const child: Individual = {
        genes: [],
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        diff: undefined,
        probability: 0,
        id: Date.now(),
        phenotype: []
    };

    let ratio = 0.6;
    const polygonSize = (nbVertices * 2 + nbColor);
    const nbPolygons = nbVertices / polygonSize;
    const splitIndex = Math.floor(nbPolygons * ratio) * polygonSize;
    const primaryGenes = a.fitness > b.fitness ? a.genes : b.genes;
    const secdondatyGenes = a.fitness > b.fitness ? b.genes : a.genes;

    child.genes = child.genes.concat(primaryGenes.slice(0, splitIndex));
    child.genes = child.genes.concat(secdondatyGenes.slice(splitIndex));

    return child;
}
*/

// Crossover on polygon granularity
function crossOver(a: Individual, b: Individual, nbVertices: number, nbColor: number): Individual {
    const child: Individual = {
        genes: [],
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        diff: undefined,
        probability: 0,
        id: Date.now(),
        phenotype: []
    };

    //let probaToPickFromA = (a.fitness > b.fitness) ? 0.6 : ((a.fitness === b.fitness)  ? 0.5 : 0.4);
    let probaToPickFromA = 0.5;

    let i = 0;
    while (i < a.genes.length) {
        const polygonSize = (nbVertices * 2 + nbColor);
        let genes = Math.random() < probaToPickFromA ? a.genes : b.genes;
        child.genes = child.genes.concat(genes.slice(i, i + polygonSize));
        i += polygonSize;
    }

    return child;
}

/*
// Crossover on vertex granularity
function crossOver(a: Individual, b: Individual, nbVertices: number, nbColor: number): Individual {
    const child: Individual = {
        genes: [],
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        diff: undefined,
        probability: 0,
        id: Date.now(),
        phenotype: []
    };

    let probaToPickFromA = (a.fitness > b.fitness) ? 0.6 : ((a.fitness === b.fitness)  ? 0.5 : 0.4);
    //let probaToPickFromA = 0.5;

    let i = 0;
    while (i < a.genes.length) {        
        const relativeIndex = i % (nbVertices * 2 + nbColor); 
        const isVertex = relativeIndex < (nbVertices * 2);
        if (isVertex) {
            // Copy vertex
            let genes = Math.random() < probaToPickFromA ? a.genes : b.genes;
            let v: Vertex = {
                x: genes[i],
                y: genes[i + 1]
            };
                            
            child.genes.push(v.x);
            child.genes.push(v.y);
            i += 2;
        }
        else {
            // Copy color
            let genes = Math.random() < probaToPickFromA ? a.genes : b.genes;
            child.genes.push(genes[i]);
            child.genes.push(genes[i+1]);
            child.genes.push(genes[i+2]);
            i += 3;
            
            const hasAlpha = nbColor === 4;
            if (hasAlpha) {
                child.genes.push(genes[i]);
                i++;
            }
        }
    }

    return child;
}
*/

/*
// Granularity of each gene
function crossOver(a: Individual, b: Individual, nbVertices: number, nbColor: number): Individual {
    const child: Individual = {
        genes: [],
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        diff: undefined,
        probability: 0,
        id: Date.now(),
        phenotype: []
    };

    let probaToPickFromA = (a.fitness > b.fitness) ? 0.6 : ((a.fitness === b.fitness)  ? 0.5 : 0.4);
    //let probaToPickFromA = 0.5;

    let i = 0;
    while (i < a.genes.length) {        
        let genes = Math.random() < probaToPickFromA ? a.genes : b.genes;
        child.genes.push(genes[i]);
        i++;
    }

    return child;
}
*/

function mutate(ind: Individual, nbVertices: number, nbColor: number, width: number, height: number, force: boolean): Individual {
    const mutant: Individual = {
        genes: [],
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        diff: undefined,
        probability: 0,
        id: Date.now(),
        phenotype: []
    };
    
    const probaToMutate = force ? 1.0 : 0.01;
    let i = 0;
    let swapBuffer: number[] = [];
    const polygonSize = nbVertices * 2 + nbColor;
    while (i < ind.genes.length) {
        if (Math.random() < probaToMutate) {     
            const relativeIndex = i % polygonSize;   
            const isStartingOfAPolygon = relativeIndex === 0;

            // debugger; 

            if (Math.random() < 0.05 && isStartingOfAPolygon) {
                 // move polygon at the end for rendering
                swapBuffer = swapBuffer.concat(ind.genes.slice(i, i + polygonSize));
                i += polygonSize;
            }
            else {
                // Modifiy polygon shape and color                  
                const isVertexCoordinates = relativeIndex < (nbVertices * 2);               
                const isStartingVertex = (relativeIndex % 2) === 0 && isVertexCoordinates;
                const isColorInformation = relativeIndex >= (nbVertices * 2);

                if (isStartingVertex) {
                    //Modify the vertex
                    let v: Vertex = {
                        x: ind.genes[i],
                        y: ind.genes[i + 1]
                    };
                                    
                    let range = randomNumberInRange(-10, 10, false);
                    if (range > -1 && range <= 0) { range = -1}
                    if (range < 1 && range >= 0) { range = 1}
                    v = moveVertex(v, range, width, height);
                    mutant.genes.push(v.x);
                    mutant.genes.push(v.y);
                    i += 2;
                }
                else if (isColorInformation) {
                    // Change color
                    const range = randomNumberInRange(-0.1, 0.1, false);
                    let c = ind.genes[i] + ind.genes[i] * range;
                    const isAlpha = nbColor === 4 && (relativeIndex === (polygonSize - 1));
                    if (isAlpha) {
                        c = Math.max(0, Math.min(c, 1));
                    }
                    else {
                        c = Math.round(c);
                        c = Math.max(0.2, Math.min(c, 255));
                    }
                    mutant.genes.push(c);
                    i++;
                }
                else {
                    //y coordinate of a vertex do nothing to mutate it
                    mutant.genes.push(ind.genes[i]);
                    i++;
                }
            }         
        }
        else {
            mutant.genes.push(ind.genes[i]);
            i++;
        }      
    }    
    mutant.genes = mutant.genes.concat(swapBuffer);
    return mutant;
}

function sortDescByFitness(population: Individual[]): Individual[] {
    const sortFn = (a: Individual, b: Individual): number => {
        return b.fitness - a.fitness;
    };

    return [...population].sort(sortFn);
}

function sortDescByProbability(population: Individual[]): Individual[] {
    const sortFn = (a: Individual, b: Individual): number => {
        return a.probability - b.probability;
    };

    return [...population].sort(sortFn);
}

self.addEventListener("message", e => {
    if (!e) return;
    
    const msg: AGworkerIn = e.data as AGworkerIn;
    let previousPop = msg.population;
    let previousBest = msg.best;
    const originalImage = msg.image;

    // Create ressources to draw the generated images
    const canvas = new OffscreenCanvas(msg.renderingWidth, msg.renderingHeight);
    const ctx = canvas.getContext('2d');
    
    const canvasOriginal = new OffscreenCanvas(msg.renderingWidth, msg.renderingHeight);
    const ctxOriginal = canvasOriginal.getContext('2d');  

    if(!ctx || !ctxOriginal) {
        console.error("no ctx to draw the image");

        const response: AGworkerOut = {
            best: previousBest,
            population: [...previousPop],
            generation: msg.generation,
            elapsedTime: 0,
            notImprovingSince: 0
        };

        postMessage(response);
    }
    else {
        ctxOriginal.putImageData(originalImage, 0, 0);
        const scaledOriginalImage = ctxOriginal.getImageData(0, 0, msg.renderingWidth, msg.renderingHeight);

        let nextPop: Individual[] = [];        
        let start = (new Date()).getTime();
        if (previousPop.length === 0) {
            nextPop = generatePopulation(msg.populationSize, msg.genesSize, msg.nbVertices, msg.nbColor, msg.renderingWidth, msg.renderingHeight); //, msg.image.width, msg.image.height);
            nextPop = evaluatePopulation(nextPop, msg.nbVertices, msg.nbColor, scaledOriginalImage, ctx);                    
        }
        else {
            if (previousBest.id !== previousPop[0].id) {
                previousPop = convertFitnessIntoProbabilities([...previousPop, previousBest]);
            }                        
            previousPop = sortDescByProbability(previousPop);

            const poolSize = Math.round(previousPop.length * 0.2);
            const tournamentPool = generateTournamentPool(previousPop, poolSize);
            
            for (let i = 0; i < msg.populationSize; i++) {
                const rand = Math.random();
                if (rand < 0.05) {
                    // Add an previous individual that may be mutated
                    const happySelectInd = pickParent(previousPop);
                    const mutant: Individual = mutate(happySelectInd, msg.nbVertices, msg.nbColor, msg.renderingWidth, msg.renderingHeight, false);
                    const result = evaluate(mutant, msg.nbVertices, msg.nbColor, scaledOriginalImage, ctx);
                    mutant.fitness = result.fitness;
                    mutant.ssim = result.ssim;
                    mutant.pixelDiff = result.pixelDiff;
                    mutant.diff = result.diff;
                    nextPop.push(mutant);
                }
                else if (rand < 0.15) {
                    // Create a new individual
                    const ind = createIndividual(msg.genesSize, msg.nbVertices, msg.nbColor, msg.renderingWidth, msg.renderingHeight);
                    const result = evaluate(ind, msg.nbVertices, msg.nbColor, scaledOriginalImage, ctx);
                    ind.fitness = result.fitness;
                    ind.ssim = result.ssim;
                    ind.pixelDiff = result.pixelDiff;
                    ind.diff = result.diff;
                    nextPop.push(ind);
                }
                else {
                    // Create a child
                    // const parentA = pickParent(previousPop);
                    // const parentB = pickParent(previousPop);
                    const parentA = pickParentFromTournament(tournamentPool, 3);
                    const parentB = pickParentFromTournament(tournamentPool, 3);                    
                    let child = crossOver(parentA, parentB, msg.nbVertices, msg.nbColor);
                    child = mutate(child, msg.nbVertices, msg.nbColor, msg.renderingWidth, msg.renderingHeight, false);
                    const result = evaluate(child, msg.nbVertices, msg.nbColor, scaledOriginalImage, ctx);
                    child.fitness = result.fitness;
                    child.ssim = result.ssim;
                    child.pixelDiff = result.pixelDiff;
                    child.diff = result.diff;
                    nextPop.push(child);
                }
            }            
        }
    
        nextPop = sortDescByFitness(nextPop);
        
        let end = (new Date()).getTime();
        let elapsedTime = (end - start) / 1000; //in seconds

        let best: Individual;
        let nonImprovingSince = msg.notImprovingSince;
        if (previousBest && previousBest.fitness > nextPop[0].fitness) {
            best = previousBest;
            nonImprovingSince++;
        }
        else {
            best = nextPop[0];
            nonImprovingSince = 0;
        }

        const response: AGworkerOut = {
            best: best,
            population: nextPop,
            generation: msg.generation + 1,
            elapsedTime: elapsedTime,
            notImprovingSince: nonImprovingSince
        };
    
        postMessage(response);
    }
});