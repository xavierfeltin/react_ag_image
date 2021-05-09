import ssim from "ssim.js";
import {copyPolygon, drawPolygon, moveVertex, Polygon, Vertex} from "./common/geometry";
import {AGworkerIn, AGworkerOut} from "./common/communication";
import {Individual, randomNumberInRange} from "./common/ga";
import { Context } from "vm";

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };


function createIndividual(genesSize: number, nbVertices: number, width: number, height: number): Individual {
    const genes: Polygon[] = [];
    for (let i = 0; i < genesSize; i++) {

        const vertices: Vertex[] = [];
        for (let j = 0; j < nbVertices; j++) {
            const x = randomNumberInRange(0, width, true);
            const y = randomNumberInRange(0, height, true);
            const vertex: Vertex = {
                x: x,
                y: y
            };
            vertices.push(vertex);            
        }
        
        const r = randomNumberInRange(0, 256, true);
        const g = randomNumberInRange(0, 256, true);
        const b = randomNumberInRange(0, 256, true);
        const a = randomNumberInRange(0, 1, false);

        const shape: Polygon = {
            vertices: vertices,
            color: [r, g, b, a]
        };
        genes.push(shape);
    }
   
    const ind: Individual = {
        id: Date.now(),
        genes: genes,
        fitness: NaN,
        probability: NaN
    }

    return ind;
}

function generatePopulation(popSize: number, genesSize: number, nbVertices: number, width: number, height: number): Individual[]
{
    let population = [];
    for (let i = 0; i < popSize; i++) {
        const ind = createIndividual( genesSize, nbVertices, width, height);
        population.push(ind);
    }
    return population;
}

function evaluatePopulation(population: Individual[], originalImage: ImageData, ctx: Context): Individual[] {
    if(!ctx) {
        return [...population];
    }

    let evaluatedPopulation = [];
    for (let i = 0; i < population.length; i++) {        
        // Draw the image from the genes
        const ind = population[i];
        const result = evaluate(ind, originalImage, ctx);
        
        evaluatedPopulation.push({
            genes: [...ind.genes],
            fitness: result,
            probability: NaN,
            id: ind.id
        });
    }

    return evaluatedPopulation;
}

function evaluate(ind: Individual, originalImage: ImageData, ctx: Context): number {
    
    // Clean the drawing space
    ctx.clearRect(0, 0, originalImage.width, originalImage.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, originalImage.width, originalImage.height);
    
    // Draw the image from the genes
    for (let j = 0; j < ind.genes.length; j++) {
        const shape = ind.genes[j];
        drawPolygon(ctx, shape);
    }
    const generatedImage = ctx.getImageData(0, 0, originalImage.width, originalImage.height);

    // Compute similarity
    const result = ssim(originalImage, generatedImage);
    return result.mssim;
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

function crossOver(a: Individual, b: Individual): Individual {
    const child: Individual = {
        genes: [],
        fitness: NaN,
        probability: NaN,
        id: Date.now()
    };

    let probaToPickFromA = (a.fitness > b.fitness) ? 0.6 : ((a.fitness === b.fitness)  ? 0.5 : 0.4);
    for (let i = 0; i < a.genes.length; i++) {
        const gene = (Math.random() < probaToPickFromA) ? copyPolygon(a.genes[i]) : copyPolygon(b.genes[i]);
        child.genes.push(gene);
    }
    return child;
}

function mutate(ind: Individual, width: number, height: number, force: boolean): Individual {
    const mutant: Individual = {
        genes: [],
        fitness: NaN,
        probability: NaN,
        id: Date.now()
    };
    
    const probaToMutate = force ? 1.0 : 0.1;
    ind.genes.forEach((gene: Polygon) => {
        const mutatedGene: Polygon = copyPolygon(gene);
        if (Math.random() < probaToMutate) {            
            const vertexIndex = randomNumberInRange(0, mutatedGene.vertices.length, true);            
            mutatedGene.vertices.forEach((v: Vertex) => {
                const range = randomNumberInRange(-0.3, 0.3, false);
                v = moveVertex(mutatedGene.vertices[vertexIndex], range, width, height);     
            })

            if (Math.random() < probaToMutate) {
                mutatedGene.color.forEach((c: number, index: number) => {
                    const range = randomNumberInRange(-0.1, 0.1, false);
                    c = Math.round(c + c * range);
                    if (index === 3) {
                        c = Math.max(0, Math.min(c, 1));
                    }
                    else {
                        c = Math.max(0, Math.min(c, 255));
                    }
                });                              
            }            
        }
        mutant.genes.push(mutatedGene);
    });
    
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
    const canvas = new OffscreenCanvas(originalImage.width, originalImage.height);
    const ctx = canvas.getContext('2d');
    
    if(!ctx) {
        console.error("no ctx to draw the image");

        const response: AGworkerOut = {
            best: previousBest,
            population: [...previousPop],
            generation: msg.generation
        };

        postMessage(response);
    }
    else {
        let nextPop: Individual[] = [];
        if (previousPop.length === 0) {
            let start = (new Date()).getTime();
            nextPop = generatePopulation(msg.populationSize, msg.genesSize, msg.nbVertices, msg.image.width, msg.image.height);
            nextPop = evaluatePopulation(nextPop, originalImage, ctx);        
            let end = (new Date()).getTime();
            let elapsedTime = end - start;
            console.log("[MyWorker] Elapsed time: " + (elapsedTime / 1000) + "s");
        }
        else {
            let start = (new Date()).getTime();
            console.log(`[MyWorker] Previous best ${previousBest?.id} ${previousBest?.fitness}`);
            previousPop = convertFitnessIntoProbabilities([...previousPop, previousBest]);            
            previousPop = sortDescByProbability(previousPop);

            for (let i = 0; i < msg.populationSize; i++) {
                const rand = Math.random();
                if (rand < 0.1) {
                    // Add an previous individual that may be mutated
                    const happySelectInd = pickParent(previousPop);
                    const mutant: Individual = mutate(happySelectInd, originalImage.width, originalImage.height, false);
                    mutant.fitness = evaluate(mutant, originalImage, ctx);
                    nextPop.push(mutant);
                }
                else if (rand < 0.2) {
                    // Create a new individual
                    const ind = createIndividual(msg.genesSize, msg.nbVertices, originalImage.width, originalImage.height);
                    ind.fitness = evaluate(ind, originalImage, ctx);
                    nextPop.push(ind);
                }
                else {
                    // Create a child
                    const parentA = pickParent(previousPop);
                    const parentB = pickParent(previousPop);
                    let child = crossOver(parentA, parentB);
                    child = mutate(child, originalImage.width, originalImage.height, false);
                    child.fitness = evaluate(child, originalImage, ctx);
                    nextPop.push(child);
                }
            }
            
            let end = (new Date()).getTime();
            let elapsedTime = end - start;
            console.log("[MyWorker] Elapsed time: " + (elapsedTime / 1000) + "s");
        }
    
        nextPop = sortDescByFitness(nextPop);
        
        let best: Individual;
        if (previousBest && previousBest.fitness > nextPop[0].fitness) {
            best = previousBest;
        }
        else {
            best = nextPop[0];
        }

        console.log(`[MyWorker] New best ${best.id} (${best.fitness}) - Previous best ${previousBest?.id} ${previousBest?.fitness}`);
        
        const response: AGworkerOut = {
            best: best,
            population: nextPop,
            generation: msg.generation + 1
        };
    
        postMessage(response);
    }
});