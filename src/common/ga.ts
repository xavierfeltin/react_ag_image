import { Polygon } from "./geometry";

export interface Individual {
    genes: Polygon[];
    fitness: number;
    probability: number;
    id: number
}