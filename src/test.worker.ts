import ssim, { Options } from "ssim.js";
import pixelmatch from "pixelmatch";
import {drawPolygon, moveVertex, Vertex} from "./common/geometry";
import {AGworkerIn, AGworkerOut} from "./common/communication";
import {buildPhenotypeFromGenes, Individual, randomNumberInRange, generateTournamentPool,
    Result, generatePopulation, convertFitnessIntoProbabilities, sortDescByProbability, createIndividual,
    pickParent, pickParentFromTournament, sortDescByFitness, crossOver} from "./common/ga";
import { Context } from "vm";

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };

function evaluatePopulation(population: Individual[], enableSsim: boolean, enablePixelDiff: boolean, ratioSsim: number, ratioPixelDiff: number, nbVertices: number, nbColor: number, originalImage: ImageData, ctx: Context): Individual[] {
    if(!ctx) {
        return [...population];
    }

    let evaluatedPopulation = [];
    for (let i = 0; i < population.length; i++) {        
        // Draw the image from the genes
        const ind = population[i];
        const result = evaluate(ind, enableSsim, enablePixelDiff, ratioSsim, ratioPixelDiff, nbVertices, nbColor, originalImage, ctx);
        
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

function evaluate(ind: Individual, enableSsim: boolean, enablePixelDiff: boolean, ratioSsim: number, ratioPixelDiff: number, nbVertices: number, nbColor: number, image: ImageData, ctx: Context): Result {
    
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
    let ssimResult = {
        mssim: 0
    };

    let overloadRatioSsim = ratioSsim;
    if (enableSsim) {
        const options: Options = {
            rgb2grayVersion: 'original',
            windowSize: 11, // window size for the SSIM map
            k1: 0.01, //The first stability constant
            k2: 0.03, //The second stability constant
            bitDepth: 8, //The number of bits used to encode each pixel
            downsample: 'original', //false / 'original' / 'fast'
            ssim: 'weber'
        };
        ssimResult = ssim(image, generatedImage, options);
    }
    else {
        overloadRatioSsim= 0;
    }

    let diff: ImageData | undefined = undefined;
    let ratioMatchingPixel= 0;
    let overloadRatioPixelDiff = ratioPixelDiff;
    if (enablePixelDiff){
        const canvas = new OffscreenCanvas(image.width, image.height);
        const diffContext = canvas.getContext('2d');
        let nbPixelsDiff = 0;
        if (diffContext) {
            diff = diffContext.createImageData(image.width, image.height);
            nbPixelsDiff = pixelmatch(image.data, generatedImage.data, diff.data, image.width, image.height, {threshold: 0.1});
        }
        
        ratioMatchingPixel = ((image.width * image.height) - nbPixelsDiff) / (image.width * image.height);
    }
    else {
        overloadRatioPixelDiff = 0;
    }
    
    const result: Result = {
        fitness: (ssimResult.mssim * overloadRatioSsim + ratioMatchingPixel * overloadRatioPixelDiff) / (overloadRatioSsim + overloadRatioPixelDiff),
        ssim: ssimResult.mssim,
        pixelDiff: ratioMatchingPixel,
        diff: diff
    }
    return result;
}

function mutate(ind: Individual, mutationRate: number, vertexMovement: number, colorModificationRate: number, nbVertices: number, nbColor: number, width: number, height: number, force: boolean): Individual {
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
    
    const probaToMutate = force ? 1.0 : mutationRate;
    let i = 0;
    let swapBuffer: number[] = [];
    const polygonSize = nbVertices * 2 + nbColor;
    while (i < ind.genes.length) {
        if (Math.random() < probaToMutate) {     
            const relativeIndex = i % polygonSize;   
           
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

                let maxDistance = Math.max(width, height) * vertexMovement;
                let range = randomNumberInRange(-maxDistance, maxDistance, false);
                if (range > -1 && range <= 0) { range = -1}
                if (range < 1 && range >= 0) { range = 1}
                v = moveVertex(v, range, width, height);
                mutant.genes.push(v.x);
                mutant.genes.push(v.y);
                i += 2;
            }
            else if (isColorInformation) {
                // Change color
                const range = randomNumberInRange(-colorModificationRate, colorModificationRate, false);
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
        else {
            mutant.genes.push(ind.genes[i]);
            i++;
        }      
    }    
    mutant.genes = mutant.genes.concat(swapBuffer);
    return mutant;
}

self.addEventListener("message", e => {
    if (!e) return;
    
    const msg: AGworkerIn = e.data as AGworkerIn;

    const config = msg.configuration;
    const nbColors = config.enableTransparency ? 4 : 3;
    
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
            isRunning: true,
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

            nextPop = generatePopulation(config.population, config.nbPolygons, config.nbVertex, nbColors, msg.renderingWidth, msg.renderingHeight);
            nextPop = evaluatePopulation(
                nextPop, 
                config.enableSsim,
                config.enablePixelDiff,
                config.ratioSsim,
                config.ratioPixelDiff,
                config.nbVertex,
                nbColors,
                scaledOriginalImage,
                ctx);                    
        }
        else {
            if (previousBest.id !== previousPop[0].id) {
                previousPop = convertFitnessIntoProbabilities([...previousPop, previousBest]);
            }                        
            previousPop = sortDescByProbability(previousPop);

            const poolSize = Math.round(previousPop.length * config.selectCutoff);
            const tournamentPool = generateTournamentPool(previousPop, poolSize);

            for (let i = 0; i < config.population; i++) {
                const rand = Math.random();
                if (rand < config.keepPreviousRatio) {
                    // Add an previous individual that may be mutated
                    const happySelectInd = pickParent(previousPop);
                    const mutant: Individual = mutate(
                        happySelectInd, 
                        config.mutationRate, 
                        config.vertexMovement, 
                        config.colorModificationRate, 
                        config.nbVertex, 
                        nbColors, 
                        msg.renderingWidth, 
                        msg.renderingHeight, 
                        false);

                    const result = evaluate(
                        mutant, 
                        config.enableSsim,
                        config.enablePixelDiff,
                        config.ratioSsim,
                        config.ratioPixelDiff,
                        config.nbVertex,
                        nbColors,
                        scaledOriginalImage, 
                        ctx);                

                    mutant.fitness = result.fitness;
                    mutant.ssim = result.ssim;
                    mutant.pixelDiff = result.pixelDiff;
                    mutant.diff = result.diff;
                    nextPop.push(mutant);
                }
                else if (rand < (config.keepPreviousRatio + config.newIndividualRatio)) {
                    // Create a new individual
                    const ind = createIndividual(config.nbPolygons, config.nbVertex, nbColors, msg.renderingWidth, msg.renderingHeight);
                    const result = evaluate(
                        ind, 
                        config.enableSsim,
                        config.enablePixelDiff,
                        config.ratioSsim,
                        config.ratioPixelDiff,
                        config.nbVertex,
                        nbColors,
                        scaledOriginalImage, 
                        ctx);

                    ind.fitness = result.fitness;
                    ind.ssim = result.ssim;
                    ind.pixelDiff = result.pixelDiff;
                    ind.diff = result.diff;
                    nextPop.push(ind);
                }
                else {
                    // Create a child
                    let parentA;
                    let parentB;
                    
                    if (config.parentSelectionStrategy === "tournament") {
                        parentA = pickParentFromTournament(tournamentPool, config.tournamentSize);
                        parentB = pickParentFromTournament(tournamentPool, config.tournamentSize);
                    }
                    else {
                        parentA = pickParent(previousPop);
                        parentB = pickParent(previousPop);    
                    }
                    
                    let child = crossOver(parentA, parentB, config.crossoverStrategy, config.crossoverParentRatio, config.nbVertex, nbColors);
                    child = mutate(
                        child, 
                        config.mutationRate, 
                        config.vertexMovement, 
                        config.colorModificationRate, 
                        config.nbVertex, 
                        nbColors, 
                        msg.renderingWidth, 
                        msg.renderingHeight, 
                        false);

                    const result = evaluate(
                        child, 
                        config.enableSsim,
                        config.enablePixelDiff,
                        config.ratioSsim,
                        config.ratioPixelDiff,
                        config.nbVertex,
                        nbColors,
                        scaledOriginalImage, 
                        ctx);

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
            isRunning: true,
            best: best,
            population: nextPop,
            generation: msg.generation + 1,
            elapsedTime: elapsedTime,
            notImprovingSince: nonImprovingSince
        };
    
        postMessage(response);
    }
});