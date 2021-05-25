import { VStack } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import "./GAConfigurationInfo.css";

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
    className}: InputRangeProps) {

    const generateTournamentInforation = (): JSX.Element[] => {
        const elements: JSX.Element[] = []; 
        elements.push(<Tr key="tr-1"><Td><span> Selection cutoff:</span></Td><Td><span>{selectCutoff}</span></Td></Tr>);
        elements.push(<Tr key="tr-2"><Td><span> Tournament size::</span></Td><Td><span>{tournamentSize}</span></Td></Tr>);
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
        elements.push(<Tr key="tr-3"><Td><span> Fitness functions:</span></Td><Td><span>{enabledEngines.join(',')}</span></Td></Tr>);
        return elements;
    }

    return (
        <div className={className}>
            <VStack spacing={6}>
            <Table variant="striped">
                <Thead>
                    <Th>General</Th>
                </Thead>
                <Tbody>                
                <Tr><Td><span>Population size: </span></Td><Td><span>{population}</span></Td></Tr>
                <Tr><Td><span>Keep from previous generation: </span></Td><Td><span>{keepPreviousRatio * 100}% </span></Td></Tr>
                <Tr><Td><span>Insert new individual in generation: </span></Td><Td><span>{newIndividualRatio * 100}% </span></Td></Tr>
                </Tbody>
            </Table>

            <Table variant="striped">
                <Thead>
                    <Th>Crossover</Th>
                </Thead>
                <Tbody>
                <Tr><Td><span>Parent selection strategy:</span></Td><Td><span>{parentSelectionStrategy}</span></Td></Tr>
                {generateTournamentInforation()}
                <Tr><Td><span>Main parent ratio during crossover :</span></Td><Td><span>{crossoverParentRatio * 100}%</span></Td></Tr>
                <Tr><Td><span>Crossover strategy :</span></Td><Td><span>{crossoverStrategy}</span></Td></Tr>
                </Tbody>
            </Table>

            <Table variant="striped">
                <Thead>
                    <Th>Mutation</Th>
                </Thead>
                <Tbody>    
                <Tr><Td><span>Mutation rate :</span></Td><Td><span>{mutationRate * 100}%</span></Td></Tr>
                <Tr><Td><span>Vertex movement during mutation :</span></Td><Td><span>{vertexMovement * 100}%</span></Td></Tr>
                <Tr><Td><span>Color movement during mutation :</span></Td><Td><span>{colorModificationRate * 100}%</span></Td></Tr>
                </Tbody>
            </Table>

            <Table variant="striped">
                <Thead>
                    <Th>Image rendering</Th>
                </Thead>
                <Tbody>                              
                {generateFitnessEngineInformation()}
                <Tr><Td><span>Transparency enabled :</span></Td><Td><span>{enableTransparency}</span></Td></Tr>
                <Tr><Td><span>Vertex by polygon :</span></Td><Td><span>{nbVertex}</span></Td></Tr>
                <Tr><Td><span>Generated polygons :</span></Td><Td><span>{nbPolygons}</span></Td></Tr>         
                </Tbody>   
            </Table>
            </VStack>
        </div>
    )
}