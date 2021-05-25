import { VStack } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";

export interface InputRangeProps {
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
    enableSubDiff: boolean;
    ratioSsim: number;
    ratioPixelDiff: number;
    ratioSubDiff: number;
    enableTransparency: boolean;
    nbVertex: number;
    nbPolygons: number;
    resolution: number;
    className: string;
}

export function GAConfigurationInfo({
    population,
    parentSelectionStrategy,
    selectCutoff,
    tournamentSize,
    keepPreviousRatio,
    newIndividualRatio,
    crossoverParentRatio,
    mutationRate,
    crossoverStrategy,
    vertexMovement,
    colorModificationRate,
    enableSsim,
    enablePixelDiff,
    enableSubDiff,
    ratioSsim,
    ratioPixelDiff,
    ratioSubDiff,
    enableTransparency,
    nbVertex,
    nbPolygons,
    resolution,
    className}: InputRangeProps) {

    const generateTournamentInforation = (): JSX.Element[] => {
        const elements: JSX.Element[] = []; 
        elements.push(<Tr key="tr-1"><Td> Selection cutoff:</Td><Td isNumeric>{selectCutoff}</Td></Tr>);
        elements.push(<Tr key="tr-2"><Td> Tournament size::</Td><Td isNumeric>{tournamentSize}</Td></Tr>);
        return elements;               
    }

    const generateFitnessEngineInformation = (): JSX.Element[] => {
        const enabledEngines: string[] = [];

        if (enableSsim) {
            enabledEngines.push("Ssim (" + ratioSsim + ")");
        }

        if (enablePixelDiff) {
            enabledEngines.push("Pixel diff (" + ratioPixelDiff + ")");
        }

        if (enableSubDiff) {
            enabledEngines.push("Sub diff (" + ratioSubDiff + ")");
        }
        
        const elements: JSX.Element[] = [];
        elements.push(<Tr key="tr-3"><Td> Fitness functions:</Td><Td isNumeric>{enabledEngines.join(',')}</Td></Tr>);
        return elements;
    }

    return (
        <div className={className}>
            <VStack spacing={6}>
            <Table variant="striped">
                <Thead>
                    <Tr><Th>General</Th></Tr>
                </Thead>
                <Tbody>                
                <Tr><Td>Population size: </Td><Td isNumeric>{population}</Td></Tr>
                <Tr><Td>Keep from previous generation: </Td><Td isNumeric>{keepPreviousRatio * 100}% </Td></Tr>
                <Tr><Td>Insert new individual in generation: </Td><Td isNumeric>{newIndividualRatio * 100}% </Td></Tr>
                </Tbody>
            </Table>

            <Table variant="striped">
                <Thead>
                    <Tr><Th>Crossover</Th></Tr>
                </Thead>
                <Tbody>
                <Tr><Td>Parent selection strategy:</Td><Td isNumeric>{parentSelectionStrategy}</Td></Tr>
                {generateTournamentInforation()}
                <Tr><Td>Main parent ratio during crossover :</Td><Td isNumeric>{crossoverParentRatio * 100}%</Td></Tr>
                <Tr><Td>Crossover strategy :</Td><Td isNumeric>{crossoverStrategy}</Td></Tr>
                </Tbody>
            </Table>

            <Table variant="striped">
                <Thead>
                   <Tr><Th>Mutation</Th></Tr> 
                </Thead>
                <Tbody>    
                <Tr><Td>Mutation rate :</Td><Td isNumeric>{mutationRate * 100}%</Td></Tr>
                <Tr><Td>Vertex movement during mutation :</Td><Td isNumeric>{vertexMovement * 100}%</Td></Tr>
                <Tr><Td>Color movement during mutation :</Td><Td isNumeric>{colorModificationRate * 100}%</Td></Tr>
                </Tbody>
            </Table>

            <Table variant="striped">
                <Thead>
                    <Tr><Th>Image rendering</Th></Tr>
                </Thead>
                <Tbody>               
                <Tr><Td>Resolution :</Td><Td isNumeric>{resolution}px</Td></Tr>                  
                {generateFitnessEngineInformation()}
                <Tr><Td>Transparency enabled :</Td><Td isNumeric>{enableTransparency}</Td></Tr>
                <Tr><Td>Vertex by polygon :</Td><Td isNumeric>{nbVertex}</Td></Tr>
                <Tr><Td>Generated polygons :</Td><Td isNumeric>{nbPolygons}</Td></Tr>         
                </Tbody>   
            </Table>
            </VStack>
        </div>
    )
}