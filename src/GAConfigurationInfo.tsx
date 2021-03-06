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
    copyColorNeighborRate: number;
    addPolygonRate: number;
    removePolygonRate: number;
    enableSsim: boolean;
    enablePixelDiff: boolean;
    enableSubDiff: boolean;
    ratioSsim: number;
    ratioPixelDiff: number;
    ratioSubDiff: number;
    ratioPolygons: number;
    enableTransparency: boolean;
    nbVertex: number;
    enableVariablePolygons: boolean;
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
    copyColorNeighborRate,
    addPolygonRate,
    removePolygonRate,
    enableSsim,
    enablePixelDiff,
    enableSubDiff,
    ratioSsim,
    ratioPixelDiff,
    ratioSubDiff,
    ratioPolygons,
    enableTransparency,
    nbVertex,
    enableVariablePolygons,
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

        if (enableVariablePolygons) {
            enabledEngines.push("Polygons (" + ratioPolygons + ")");
        }
        
        const elements: JSX.Element[] = [];
        elements.push(<Tr key="tr-3"><Td> Fitness functions:</Td><Td isNumeric>{enabledEngines.join(', ')}</Td></Tr>);
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
                <Tr><Td>Copy neighbor color rate :</Td><Td isNumeric>{copyColorNeighborRate * 100}%</Td></Tr>                
                <Tr><Td>Vertex movement during mutation :</Td><Td isNumeric>{vertexMovement * 100}%</Td></Tr>
                <Tr><Td>Color movement during mutation :</Td><Td isNumeric>{colorModificationRate * 100}%</Td></Tr>
                <Tr><Td>Add polygon during mutation :</Td><Td isNumeric>{addPolygonRate * 100}%</Td></Tr>
                <Tr><Td>Remove polygon during mutation :</Td><Td isNumeric>{removePolygonRate * 100}%</Td></Tr>
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
                <Tr><Td>Variable number of polygons:</Td><Td isNumeric>{enableVariablePolygons}</Td></Tr>
                <Tr><Td>Vertex by polygon :</Td><Td isNumeric>{nbVertex}</Td></Tr>
                <Tr><Td>Generated polygons :</Td><Td isNumeric>{nbPolygons}</Td></Tr>         
                </Tbody>   
            </Table>
            </VStack>
        </div>
    )
}