import { Individual } from "./ga";
import {Rect} from "./geometry";

export interface AGworkerIn {
    image: ImageData;
    populationSize: number;
    genesSize: number;
    population: Individual[];
    generation: number;
};

export interface AGworkerOut {
    bestSsim: number;
    bestDrawingSteps: Rect[];
    population: Individual[];
    generation: number;
};