import { Individual } from "./ga";

export interface AGworkerIn {
    image: ImageData;
    populationSize: number;
    genesSize: number;
    nbVertices: number;
    nbColor: number;
    population: Individual[];
    generation: number;
    best: Individual;
    notImprovingSince: number;
    renderingWidth: number;
    renderingHeight: number;
};

export interface AGworkerOut {
    best: Individual;
    population: Individual[];
    generation: number;
    elapsedTime: number;
    notImprovingSince: number;
};