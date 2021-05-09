import { Individual } from "./ga";

export interface AGworkerIn {
    image: ImageData;
    populationSize: number;
    genesSize: number;
    nbVertices: number;
    population: Individual[];
    generation: number;
    best: Individual;
};

export interface AGworkerOut {
    best: Individual;
    population: Individual[];
    generation: number;
};