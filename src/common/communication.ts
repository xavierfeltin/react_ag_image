import { Individual } from "./ga";
import {Polygon} from "./geometry";

export interface AGworkerIn {
    image: ImageData;
    populationSize: number;
    genesSize: number;
    nbVertices: number;
    population: Individual[];
    generation: number;
};

export interface AGworkerOut {
    bestSsim: number;
    bestDrawingSteps: Polygon[];
    population: Individual[];
    generation: number;
};