import { Polygon, Vertex } from "./geometry";

export interface Individual {
    genes: number[];
    fitness: number;
    ssim: number;
    pixelDiff: number;
    diff: ImageData | undefined;
    probability: number;
    id: number
    phenotype: Polygon[];
}

export interface Result {
    fitness: number;
    ssim: number;
    pixelDiff: number;
    diff: ImageData | undefined;
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