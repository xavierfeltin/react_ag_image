import { Polygon, Vertex } from "./geometry";

export interface Individual {
    genes: number[];
    fitness: number;
    ssim: number;
    pixelDiff: number;
    subPixel: number;
    diff: ImageData | undefined;
    probability: number;
    id: number
    phenotype: Polygon[];
}

export interface Result {
    fitness: number;
    ssim: number;
    pixelDiff: number;
    subPixel: number;
    diff: ImageData | undefined;
}

export interface Configuration {
    population: number;
    parentSelectionStrategy: string;
    selectCutoff: number;
    tournamentSize: number;
    keepPreviousRatio: number;
    newIndividualRatio: number;
    crossoverParentRatio: number;
    mutationRate: number;
    crossoverStrategy: string;
    vertexMovement: number;
    colorModificationRate: number;
    enableSsim: boolean;
    enablePixelDiff: boolean;
    enableSubDiff: boolean,
    ratioSsim: number;
    ratioPixelDiff: number;
    ratioSubDiff: number;
    enableTransparency: boolean;
    nbVertex: number;
    nbPolygons: number;
}


export function createEmptyIndividual(): Individual {
    const ind: Individual = {
        id: 0,
        genes: [],
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        subPixel: 0,
        diff: undefined,
        probability: 0,
        phenotype: []
    }

    return ind;
}

export function createIndividual(nbPolygons: number, nbVertices: number, nbColor: number, width: number, height: number): Individual {
    const genes: number[] = [];
    const rangeW = width / 2;
    const rangeH = height / 2;

    for (let i = 0; i < nbPolygons; i++) {    
        const x = randomNumberInRange(0, width, true);
        const y = randomNumberInRange(0, height, true);

        for (let j = 0; j < nbVertices; j++) {        
            let newX = x + randomNumberInRange(-rangeW, rangeW, true); 
            newX = Math.max(0, Math.min(newX, width));    

            let newY = y + randomNumberInRange(-rangeH, rangeH, true); 
            newY = Math.max(0, Math.min(newY, height));

            genes.push(newX);
            genes.push(newY);
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
        subPixel: 0,
        diff: undefined,
        probability: 0,
        phenotype: []
    }

    return ind;
}

export function generatePopulation(popSize: number, nbPolygons: number, nbVertices: number, nbColor: number, width: number, height: number): Individual[]
{
    let population = [];
    for (let i = 0; i < popSize; i++) {
        const ind = createIndividual( nbPolygons, nbVertices, nbColor, width, height);
        population.push(ind);
    }
    return population;
}

export function randomNumberInRange(min: number, max: number, isInteger: boolean): number {
    let value = Math.random() * (max - min) + min;

    if (isInteger) {
        value = Math.floor(value);
    }
    else {
        value = Math.round(value * 1000.0) / 1000.0; // force 3 digits max
    }

    return value;
}

export function buildPhenotypeFromGenes(genes: number[], nbVertices: number, nbColor: number):  Polygon[] {
    const phenotype: Polygon[] = [];

    const polygonSize = nbVertices * 2 + nbColor;
    for (let i = 0; i < genes.length; i = i+polygonSize) {
        const p: Polygon = {
            vertices: [],
            color: []
        };

        const nbCoordinates = nbVertices * 2;
        for (let j = 0; j < nbCoordinates; j = j+2) {
            const v: Vertex = {
                x: genes[i + j],
                y: genes[i + j + 1]
            };
            p.vertices.push(v);    
        }

        for (let k = 0; k < nbColor; k++) {
            p.color.push(genes[i + nbCoordinates + k]);    
        }
        phenotype.push(p);
    }
    return phenotype;
}

export function sortDescByFitness(population: Individual[]): Individual[] {
    const sortFn = (a: Individual, b: Individual): number => {
        return b.fitness - a.fitness;
    };

    return [...population].sort(sortFn);
}

export function sortDescByProbability(population: Individual[]): Individual[] {
    const sortFn = (a: Individual, b: Individual): number => {
        return a.probability - b.probability;
    };

    return [...population].sort(sortFn);
}

export function convertFitnessIntoProbabilities(population: Individual[]): Individual[] {
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

export function pickParent(population: Individual[]): Individual {
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

export function generateTournamentPool(population: Individual[], poolSize: number): Individual[] {
    const pool: Individual[] = [];
    for (let i = 0; i < poolSize; i++) {
        const candidate = pickParent(population);
        pool.push(candidate);
    }
    return pool;
}

export function pickParentFromTournament(population: Individual[], tournamentSize: number): Individual {
    let best: Individual = createEmptyIndividual();
    for (let i = 0; i < tournamentSize; i++) {
        const index = Math.floor(Math.random() * population.length);
        const candidate = population[index];
        if (best.id === 0 || candidate.fitness > best.fitness) {
            best = candidate;
        }
    }
    return best;
}

export function crossOver(a: Individual, b: Individual, strategy: string, parentRatio: number, nbVertices: number, nbColor: number): Individual {
    switch(strategy) {
        case "polygon":
            return crossOverPolygon(a, b, parentRatio, nbVertices, nbColor);
        case "vertex":
            return crossOverVertex(a, b, parentRatio, nbVertices, nbColor);
        case "data":
            return crossOverData(a, b, parentRatio, nbVertices, nbColor);
        default:
            return crossOverSinglePoint(a, b, parentRatio, nbVertices, nbColor);
    }
}

// Crossover with single point crossover
function crossOverSinglePoint(a: Individual, b: Individual, parentRatio: number, nbVertices: number, nbColor: number): Individual {
    const child: Individual = {
        genes: [],
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        subPixel: 0,
        diff: undefined,
        probability: 0,
        id: Date.now(),
        phenotype: []
    };

    const polygonSize = (nbVertices * 2 + nbColor);
    const nbPolygons = nbVertices / polygonSize;
    const splitIndex = Math.floor(nbPolygons * parentRatio) * polygonSize;
    const primaryGenes = a.fitness > b.fitness ? a.genes : b.genes;
    const secdondatyGenes = a.fitness > b.fitness ? b.genes : a.genes;

    child.genes = child.genes.concat(primaryGenes.slice(0, splitIndex));
    child.genes = child.genes.concat(secdondatyGenes.slice(splitIndex));

    return child;
}

// Crossover on polygon granularity
export function crossOverPolygon(a: Individual, b: Individual, parentRatio: number, nbVertices: number, nbColor: number): Individual {
    const child: Individual = {
        genes: [],
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        subPixel: 0,
        diff: undefined,
        probability: 0,
        id: Date.now(),
        phenotype: []
    };

    let probaToPickFromA = (a.fitness > b.fitness) ? parentRatio : 1 - parentRatio;
   
    let i = 0;
    while (i < a.genes.length) {
        const polygonSize = (nbVertices * 2 + nbColor);
        let genes = Math.random() < probaToPickFromA ? a.genes : b.genes;
        child.genes = child.genes.concat(genes.slice(i, i + polygonSize));
        i += polygonSize;
    }

    return child;
}

// Crossover on vertex granularity
export function crossOverVertex(a: Individual, b: Individual, parentRatio: number, nbVertices: number, nbColor: number): Individual {
    const child: Individual = {
        genes: [],
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        subPixel: 0,
        diff: undefined,
        probability: 0,
        id: Date.now(),
        phenotype: []
    };

   let probaToPickFromA = (a.fitness > b.fitness) ? parentRatio : 1 - parentRatio;
    
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

// Granularity of each gene
export function crossOverData(a: Individual, b: Individual, parentRatio: number, nbVertices: number, nbColor: number): Individual {
    const child: Individual = {
        genes: [],
        fitness: 0,
        ssim: 0,
        pixelDiff: 0,
        subPixel: 0,
        diff: undefined,
        probability: 0,
        id: Date.now(),
        phenotype: []
    };

    let probaToPickFromA = (a.fitness > b.fitness) ? parentRatio : 1 - parentRatio;

    let i = 0;
    while (i < a.genes.length) {        
        let genes = Math.random() < probaToPickFromA ? a.genes : b.genes;
        child.genes.push(genes[i]);
        i++;
    }

    return child;
}
