import { Configuration, Individual } from "./ga";

export interface AGworkerIn {
    isRunning: boolean;
    image: ImageData;
    configuration: Configuration;
    //populationSize: number;
    //genesSize: number;
    //nbVertices: number;
    //nbColor: number;
    population: Individual[];
    generation: number;
    best: Individual;
    notImprovingSince: number;
    renderingWidth: number;
    renderingHeight: number;
};

export interface AGworkerOut {
    isRunning: boolean;
    best: Individual;
    population: Individual[];
    generation: number;
    elapsedTime: number;
    notImprovingSince: number;
};