import ssim from "ssim.js";
import {Rect} from "./common/geometry";
import {AGworkerIn, AGworkerOut} from "./common/communication";
import {Individual} from "./common/ga";
import { Context } from "vm";

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };


function createIndividual(genesSize: number, width: number, height: number): Individual {
    const genes: Rect[] = [];
    for (let j = 0; j < genesSize; j++) {
        const x = Math.ceil(Math.random() * width- 0.5);
        const y = Math.ceil(Math.random() * height- 0.5);
        
        const maxW = width - x;
        const maxH = height - y;
        const w = Math.ceil(Math.random() * maxW- 0.5);
        const h = Math.ceil(Math.random() * maxH - 0.5);

        const r = Math.ceil(Math.random() * 255 - 0.5);
        const g = Math.ceil(Math.random() * 255 - 0.5);
        const b = Math.ceil(Math.random() * 255 - 0.5);
        const a = Math.random();

        const shape: Rect = {
            x: x,
            y: y,
            w: w,
            h: h,
            color: {r: r, g: g, b: b, a: a}
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

function generatePopulation(popSize: number, genesSize: number, width: number, height: number): Individual[]
{
    let population = [];
    for (let i = 0; i < popSize; i++) {
        const ind = createIndividual( genesSize, width, height);
        population.push(ind);
    }
    return population;
}

function evaluatePopulation(population: Individual[], originalImage: ImageData, ctx: Context): Individual[] {
    const width = originalImage.width;
    const height = originalImage.height;

    if(!ctx) {
        return [...population];
    }

    let evaluatedPopulation = [];
    for (let i = 0; i < population.length; i++) {        
        // Clean the drawing space
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);

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

    // Draw the image from the genes
    for (let j = 0; j < ind.genes.length; j++) {
        const shape = ind.genes[j];
        ctx.fillStyle = `rgba(${shape.color.r},${shape.color.g},${shape.color.b},${shape.color.a})`;
        ctx.fillRect(shape.x, shape.y, shape.w, shape.h);
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

    let probaToPickFromA = (a.fitness > b.fitness) ? 0.7 : 0.3;
    for (let i = 0; i < a.genes.length; i++) {
        const rand = Math.random();
        const gene = (rand < probaToPickFromA) ? {...a.genes[i]} : {...b.genes[i]};
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
    
    const probaToMutate = force ? 1.0 : 0.5;
    
    for (let i = 0; i < ind.genes.length; i++) { 
        const gene = {
            x: ind.genes[i].x,
            y: ind.genes[i].y,
            w: ind.genes[i].w,
            h: ind.genes[i].h,
            color: {
                r: ind.genes[i].color.r,
                g: ind.genes[i].color.g,
                b: ind.genes[i].color.b,
                a: ind.genes[i].color.a
            }
        };

        let scaleMutation = Math.random() < 0.5 ? 0.15 : -0.15;
        if (Math.random() < probaToMutate) {            
            gene.x = Math.ceil((gene.x + gene.x * scaleMutation) - 0.5);
            gene.x = Math.min(gene.x, width);
            gene.x = Math.max(gene.x, 0);
            gene.w = Math.min(gene.w, width - gene.x);
        }
        
        scaleMutation = Math.random() < 0.5 ? 0.15 : -0.15;
        if (Math.random() < probaToMutate) {
            gene.y = Math.ceil((gene.y + gene.y * scaleMutation) - 0.5);
            gene.y = Math.min(gene.y, height);
            gene.y = Math.max(gene.y, 0);
            gene.w = Math.min(gene.w, height - gene.y);
        }
        
        scaleMutation = Math.random() < 0.5 ? 0.15 : -0.15;
        if (Math.random() < probaToMutate) {
            gene.w = Math.ceil((gene.w + gene.w * scaleMutation) - 0.5);
            gene.w = Math.min(gene.w, width - gene.x);
            gene.w = Math.max(gene.w, 0);
        }
        
        scaleMutation = Math.random() < 0.5 ? 0.15 : -0.15;
        if (Math.random() < probaToMutate) {
            gene.h = Math.ceil((gene.h + gene.h * scaleMutation) - 0.5);
            gene.h = Math.min(gene.h, height - gene.y);
            gene.h = Math.max(gene.h, 0);
        }
        
        scaleMutation = Math.random() < 0.5 ? 0.15 : -0.15;
        if (Math.random() < probaToMutate) {
            gene.color.r = Math.ceil((gene.color.r + gene.color.r * scaleMutation) -0.5);
            gene.color.r = Math.min(gene.color.r, 255);
            gene.color.r = Math.max(gene.color.r, 0);
        }

        scaleMutation = Math.random() < 0.5 ? 0.15 : -0.15;
        if (Math.random() < probaToMutate) {
            gene.color.g = Math.ceil((gene.color.g + gene.color.g * scaleMutation) -0.5);
            gene.color.g = Math.min(gene.color.g, 255);
            gene.color.g = Math.max(gene.color.g, 0);
        }

        scaleMutation = Math.random() < 0.5 ? 0.15 : -0.15;
        if (Math.random() < probaToMutate) {
            gene.color.b = Math.ceil((gene.color.b + gene.color.b * scaleMutation) -0.5);
            gene.color.b = Math.min(gene.color.b, 255);
            gene.color.b = Math.max(gene.color.b, 0);
        }

        scaleMutation = Math.random() < 0.5 ? 0.15 : -0.15;
        if (Math.random() < probaToMutate) {
            gene.color.a += gene.color.a * scaleMutation;
            gene.color.a = Math.min(gene.color.a, 1);
            gene.color.a = Math.max(gene.color.a, 0);                      
        }        

        mutant.genes.push(gene);
    }
    
    return mutant;
}

function sortDescByFitness(population: Individual[]): Individual[] {
    const sortFn = (a: Individual, b: Individual): number => {
        return b.fitness - a.fitness;
    };

    return [...population].sort(sortFn);
}

self.addEventListener("message", e => {
    if (!e) return;
    console.log('[MyWorker] Incoming message from main thread:', e.data);

    const msg: AGworkerIn = e.data as AGworkerIn;
    let previousPop = msg.population;
    const originalImage = msg.image;

    // Create ressources to draw the generated images
    const canvas = new OffscreenCanvas(originalImage.width, originalImage.height);
    const ctx = canvas.getContext('2d');

    if(!ctx) {
        console.error("no ctx to draw the image");

        const response: AGworkerOut = {
            bestSsim: previousPop[0].fitness,
            bestDrawingSteps: [...previousPop[0].genes],
            population: [...previousPop],
            generation: msg.generation
        };

        postMessage(response);
    }
    else {
        let nextPop: Individual[] = [];
        if (previousPop.length === 0) {
            let start = (new Date()).getTime();
            console.log("[MyWorker] Generate first population");
            nextPop = generatePopulation(msg.populationSize, msg.genesSize, msg.image.width, msg.image.height);
            console.log("[MyWorker] Evaluate first population");
            nextPop = evaluatePopulation(nextPop, originalImage, ctx);        
            let end = (new Date()).getTime();
            let elapsedTime = end - start;
            console.log("[MyWorker] Elapsed time: " + (elapsedTime / 1000) + "s");
        }
        else {
            let start = (new Date()).getTime();
            console.log("[MyWorker] Generate next generation population");
            previousPop = convertFitnessIntoProbabilities(previousPop);
            
            const previousBest: Individual = {...previousPop[0]};
            nextPop.push(previousBest);

            const mutateBest: Individual = mutate(previousBest, originalImage.width, originalImage.height, true);
            mutateBest.fitness = evaluate(mutateBest, originalImage, ctx);
            nextPop.push(mutateBest);
    
            const nbNewIndividuals = Math.ceil(msg.populationSize * 0.4 - 0.5);
            for (let i = 0; i < nbNewIndividuals; i++) {
                const ind = createIndividual(msg.genesSize, originalImage.width, originalImage.height);
                ind.fitness = evaluate(ind, originalImage, ctx);
                nextPop.push(ind);
            }
            
            const nbOldIndividuals = Math.ceil(msg.populationSize * 0.1 - 0.5);
            for (let i = 0; i < nbOldIndividuals; i++) {
                let index = Math.ceil(Math.random() * (msg.populationSize - 1) - 0.5);
                const mutant: Individual = mutate(previousPop[index], originalImage.width, originalImage.height, true);
                mutant.fitness = evaluate(mutateBest, originalImage, ctx);
                nextPop.push(mutant);
            }
            
            const childrenToGenerate = msg.populationSize - nextPop.length; 
            for (let i = 0; i < childrenToGenerate; i++) {
                const parentA = pickParent(previousPop);
                const parentB = pickParent(previousPop);
                let child = crossOver(parentA, parentB);
                child = mutate(child, originalImage.width, originalImage.height, true);
                child.fitness = evaluate(child, originalImage, ctx);
                nextPop.push(child);
            }
            
            let end = (new Date()).getTime();
            let elapsedTime = end - start;
            console.log("[MyWorker] Elapsed time: " + (elapsedTime / 1000) + "s");
        }
    
        nextPop = sortDescByFitness(nextPop);
        
        console.log("[MyWorker] Send response - best (" + nextPop[0].id + "): " + nextPop[0].fitness);

        const response: AGworkerOut = {
            bestSsim: nextPop[0].fitness,
            bestDrawingSteps: nextPop[0].genes,
            population: nextPop,
            generation: msg.generation + 1
        };
    
        postMessage(response);
    }
});