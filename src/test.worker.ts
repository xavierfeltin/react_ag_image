import ssim, { Options } from "ssim.js";
import pixelmatch from "pixelmatch";
import {drawPolygon, moveVertex, Vertex} from "./common/geometry";
import {AGworkerIn, AGworkerOut} from "./common/communication";
import {buildPhenotypeFromGenes, Individual, randomNumberInRange} from "./common/ga";
import { Context } from "vm";

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };


function createIndividual(genesSize: number, nbVertices: number, nbColor: number, width: number, height: number): Individual {
    const genes: number[] = [];
    for (let i = 0; i < genesSize; i++) {
        
        for (let j = 0; j < nbVertices; j++) {
            const x = randomNumberInRange(0, width, true);
            const y = randomNumberInRange(0, height, true);
            genes.push(x);
            genes.push(y);
        }

        for (let j = 0; j < nbColor; j++) {
            const c = j < 3 ? randomNumberInRange(0, 256, true) : randomNumberInRange(0, 1, false);
            genes.push(c); 
        }        
    }
   
    const ind: Individual = {
        id: Date.now(),
        genes: genes,
        fitness: NaN,
        probability: NaN,
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
        
        evaluatedPopulation.push({
            genes: [...ind.genes],
            fitness: result,
            probability: NaN,
            id: ind.id,
            phenotype: [...ind.phenotype]
        });
    }

    return evaluatedPopulation;
}

function evaluate(ind: Individual, nbVertices: number, nbColor: number, image: ImageData, ctx: Context): number {
    
    ind.phenotype = buildPhenotypeFromGenes(ind.genes, nbVertices, nbColor)
    
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
    const result = ssim(image, generatedImage, options);
    
    /*
    const canvas = new OffscreenCanvas(image.width, image.height);
    const diffContext = canvas.getContext('2d');
    if (diffContext) {
        const diff = diffContext.createImageData(image.width, image.height);
        const nbPixelsDiff = pixelmatch(image.data, generatedImage.data, diff.data, image.width, image.height, {threshold: 0.1});
        console.log("diff pixels: " + nbPixelsDiff);
    }
    */

    const nbPixelsDiff = pixelmatch(image.data, generatedImage.data, null, image.width, image.height, {threshold: 0.1});
    const ratioMatchingPixel = ((image.width * image.height) - nbPixelsDiff) / (image.width * image.height);
    
    return (result.mssim * 0 + ratioMatchingPixel * 1) / 1;
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

function crossOver(a: Individual, b: Individual, nbVertices: number, nbColor: number): Individual {
    const child: Individual = {
        genes: [],
        fitness: NaN,
        probability: NaN,
        id: Date.now(),
        phenotype: []
    };

    //let probaToPickFromA = (a.fitness > b.fitness) ? 0.7 : ((a.fitness === b.fitness)  ? 0.5 : 0.3);
    let probaToPickFromA = 0.5;
    /*
    for (let i = 0; i < a.genes.length; i++) {
        const gene = (Math.random() < probaToPickFromA) ? a.genes[i] : b.genes[i];
        child.genes.push(gene);
    }
    */

    let i = 0;
    while (i < a.genes.length) {
                
        const relativeIndex = i % (nbVertices * 2 + nbColor); 
        const isVertex = relativeIndex < (nbVertices * 2);
        if (isVertex) {

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
            let genes = Math.random() < probaToPickFromA ? a.genes : b.genes;
            child.genes.push(genes[i]);
            child.genes.push(genes[i+1]);
            child.genes.push(genes[i+2]);

            const isAlpha = nbColor === 4 && (relativeIndex === (nbVertices * 2 + nbColor - 1));
            if (isAlpha) {
                child.genes.push(genes[i+3]);
                i += 4;
            }
            else {
                i += 3;
            }
        }
    }

    return child;
}

function mutate(ind: Individual, nbVertices: number, nbColor: number, width: number, height: number, force: boolean): Individual {
    const mutant: Individual = {
        genes: [],
        fitness: NaN,
        probability: NaN,
        id: Date.now(),
        phenotype: []
    };
    
    const probaToMutate = force ? 1.0 : 0.2;
    let i = 0;
    while (i < ind.genes.length) {
        if (Math.random() < probaToMutate) {         
            const relativeIndex = i % (nbVertices * 2 + nbColor); 
            const isVertex = relativeIndex < (nbVertices * 2);
            if (isVertex) {
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
            else {
                const range = randomNumberInRange(-0.1, 0.1, false);
                let c = ind.genes[i] + ind.genes[i] * range;
                const isAlpha = nbColor === 4 && (relativeIndex === (nbVertices * 2 + nbColor - 1));
                if (isAlpha) {
                    c = Math.max(0, Math.min(c, 1));
                }
                else {
                    c = Math.round(c);
                    c = Math.max(0, Math.min(c, 255));
                }
                mutant.genes.push(c);
                i++;
            }
        }
        else {
            mutant.genes.push(ind.genes[i]);
            i++;
        }
    }    
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
        const ratioW = msg.renderingWidth / originalImage.width;
        const ratioH = msg.renderingHeight / originalImage.height;
        ctxOriginal.scale(ratioW, ratioH);
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

            for (let i = 0; i < msg.populationSize; i++) {
                const rand = Math.random();
                if (rand < 0.15) {
                    // Add an previous individual that may be mutated
                    const happySelectInd = pickParent(previousPop);
                    const mutant: Individual = mutate(happySelectInd, msg.nbVertices, msg.nbColor, msg.renderingWidth, msg.renderingHeight, false);
                    mutant.fitness = evaluate(mutant, msg.nbVertices, msg.nbColor, scaledOriginalImage, ctx);
                    nextPop.push(mutant);
                }
                else if (rand < 0.3) {
                    // Create a new individual
                    const ind = createIndividual(msg.genesSize, msg.nbVertices, msg.nbColor, msg.renderingWidth, msg.renderingHeight);
                    ind.fitness = evaluate(ind, msg.nbVertices, msg.nbColor, scaledOriginalImage, ctx);
                    nextPop.push(ind);
                }
                else {
                    // Create a child
                    const parentA = pickParent(previousPop);
                    const parentB = pickParent(previousPop);                    
                    let child = crossOver(parentA, parentB, msg.nbVertices, msg.nbColor);
                    child = mutate(child, msg.nbVertices, msg.nbColor, msg.renderingWidth, msg.renderingHeight, false);
                    child.fitness = evaluate(child, msg.nbVertices, msg.nbColor, scaledOriginalImage, ctx);
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