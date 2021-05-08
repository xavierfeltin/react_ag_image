import { Rect } from "./geometry";

export interface Individual {
    genes: Rect[];
    fitness: number;
    probability: number;
    id: number
}