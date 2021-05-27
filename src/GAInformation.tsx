import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";

export interface GAInfoProps {
    generation: number;  
    fitness: number;
    ssim: number;
    pixelDiff: number;
    subPixel: number;
    idBest: number;
    elapsedTimeForGeneration: number;
    notImprovingSince: number;
    className: string;
};

export function GAInformation({ generation, fitness, ssim, pixelDiff, subPixel, idBest, elapsedTimeForGeneration, notImprovingSince, className }: GAInfoProps) {
    return (
        <div className={className}>
          <Table variant="striped">
            <Thead>
              <Tr><Th> Simulation </Th></Tr>
            </Thead>
            <Tbody>
            <Tr><Td>Generation:</Td><Td isNumeric>{generation}</Td></Tr>
            <Tr><Td>Not improving since:</Td><Td isNumeric>{notImprovingSince}</Td></Tr>
            <Tr><Td>Time by generation:</Td><Td isNumeric>{elapsedTimeForGeneration} seconds</Td></Tr>
            <Tr><Td>Global fitness:</Td><Td isNumeric>{(fitness * 100.0).toFixed(2)}%</Td></Tr>
            <Tr><Td>Ssim fitness:</Td><Td isNumeric>{(ssim * 100.0).toFixed(2)}%</Td></Tr>
            <Tr><Td>Pixelmatch fitness:</Td><Td isNumeric>{(pixelDiff * 100.0).toFixed(2)}%</Td></Tr>
            <Tr><Td>Sub Pixel fitness:</Td><Td isNumeric>{(subPixel * 100.0).toFixed(2)}%</Td></Tr>
            <Tr><Td>Best indivudial:</Td><Td isNumeric>{idBest}</Td></Tr>
            </Tbody>
          </Table>
        </div>
    );    
}