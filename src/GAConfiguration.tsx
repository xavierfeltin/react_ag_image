import './GAConfiguration.css';
import { useEffect, useState } from "react";
import { Configuration } from "./common/ga";
import { InputRange } from "./InputRange"
import { Switch, Heading, VStack, Tooltip } from "@chakra-ui/react"

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
    onValuesChange: (configuration: Configuration) => void;
    className: string;
}

export function GAConfiguration({
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
    onValuesChange, className} : InputRangeProps) {
    
        const [values, setValues] = useState<Configuration>({
            population: population,
            parentSelectionStrategy: parentSelectionStrategy,
            selectCutoff: selectCutoff,
            tournamentSize: tournamentSize,
            keepPreviousRatio: keepPreviousRatio,
            newIndividualRatio: newIndividualRatio,
            crossoverParentRatio: crossoverParentRatio,
            mutationRate: mutationRate,
            crossoverStrategy: crossoverStrategy,
            vertexMovement: vertexMovement,
            colorModificationRate: colorModificationRate,
            copyColorNeighborRate: copyColorNeighborRate,
            addPolygonRate: addPolygonRate,
            removePolygonRate: removePolygonRate,
            enableSsim: enableSsim,
            enablePixelDiff: enablePixelDiff,
            enableSubDiff: enableSubDiff,
            ratioSsim: ratioSsim,
            ratioPixelDiff: ratioPixelDiff,
            ratioSubDiff: ratioSubDiff,
            ratioPolygons: ratioPolygons,
            enableTransparency: enableTransparency,
            nbVertex: nbVertex,
            enableVariablePolygons,
            nbPolygons: nbPolygons,
            resolution: resolution
        });

    useEffect(() => {
        onValuesChange(values);
    }, [values, onValuesChange]);

    return (
        <div className={className}>
            <VStack spacing={6}>
            <div>
                <Heading as="h4" size="sm">General</Heading>
                <InputRange id="ga-population" name="ga-population" label="Population" tooltip="Number of individuals (solutions) evaluated at each generation" min={10} max={300} defaultVal={values.population} step={1} onChange={v => setValues({...values, population: v})}/>
                <InputRange id="ga-keep-previous" name="ga-keep-previous" label="Keep previous individual" tooltip="Rate when building next generation to incorpore an individual from the previous generation" min={0} max={1} defaultVal={values.keepPreviousRatio} step={0.01}onChange={v => setValues({...values, keepPreviousRatio: v})}/>
                <InputRange id="ga-new-individual" name="ga-new-individual" label="Generate new individual" tooltip="Rate when building next generation to incorpore a completely new random individual" min={0} max={1} defaultVal={values.newIndividualRatio} step={0.01} onChange={v => setValues({...values, newIndividualRatio: v})}/>
            </div>

            <div>
                <Heading as="h4" size="sm">Crossover</Heading>
                <Tooltip label="The selection strategy to pick parents for generating the children of the next generation" placement="top" closeOnClick={false} bg="blue.50" color="black" offset={[0, -10]}>
                <div className="gaconfiguration-wrapper">
                    <label className="gaconfiguration-one">Type: </label> <br/>
                    <div className="gaconfiguration-two">
                        <label className="ga-strategy-label" htmlFor="strategy-tournament">Tournament <br/> 
                            <input type="radio" id="strategy-tournament" name="parentstrategy" value="tournament" checked={values.parentSelectionStrategy === "tournament"} onChange={v =>{setValues({...values, parentSelectionStrategy: v.target.value})}}/>
                        </label> 

                        <label className="ga-strategy-label" htmlFor="strategy-fortunewheel">Fortune Wheel <br/>
                            <input type="radio" id="strategy-fortunewheel" name="parentstrategy" value="fortunewheel" checked={values.parentSelectionStrategy === "fortunewheel"} onChange={v =>{setValues({...values, parentSelectionStrategy: v.target.value})}}/>
                        </label>
                    </div>
                </div>
                </Tooltip>
            
                {values.parentSelectionStrategy === "tournament" &&
                    <InputRange id="ga-selection-cutoff" name="ga-selection-cutoff" label="Selection cutoff" tooltip="Quantity of the population to be considered for creating the tournament pool" min={0} max={1} defaultVal={values.selectCutoff} step={0.05} onChange={v => setValues({...values, selectCutoff: v})}/>                
                }

                {values.parentSelectionStrategy === "tournament" &&
                    <InputRange id="ga-tournament-size" name="ga-tournament-size" label="Tournament size" tooltip="Number of participants from the pool to participate in each tournament" min={1} max={Math.round(values.selectCutoff * values.population)} defaultVal={values.tournamentSize} step={1} onChange={v => setValues({...values, tournamentSize: v})}/>
                }

                <InputRange id="ga-crossover-parent" name="ga-crossover-parent" label="Main parent ratio" tooltip="Quantity of genes to keep from the parent with the highest fitness" min={0} max={1} defaultVal={values.crossoverParentRatio} step={0.05} onChange={v => setValues({...values, crossoverParentRatio: v})}/>
                <Tooltip label="The granularity used for the crossover of the two parents" placement="top" closeOnClick={false} bg="blue.50" color="black" offset={[0, -20]}>
                <div className="gaconfiguration-wrapper">
                    <label className="gaconfiguration-one">Granularity: </label> <br/>
                    <div className="gaconfiguration-two">
                        <label className="ga-strategy-label" htmlFor="strategy-polygon">Polygons <br/>
                            <input type="radio" id="strategy-polygon" name="strategy" value="polygon" checked={values.crossoverStrategy === "polygon"} onChange={v =>{setValues({...values, crossoverStrategy: v.target.value})}}/>
                        </label> 

                        <label className="ga-strategy-label" htmlFor="strategy-vertex">Vertex <br/>
                            <input type="radio" id="strategy-vertex" name="strategy" value="vertex" checked={values.crossoverStrategy === "vertex"} onChange={v =>{setValues({...values, crossoverStrategy: v.target.value})}}/>
                        </label>

                        <label className="ga-strategy-label" htmlFor="strategy-data">Data <br/>
                            <input type="radio" id="strategy-data" name="strategy" value="data" checked={values.crossoverStrategy === "data"} onChange={v =>{setValues({...values, crossoverStrategy: v.target.value})}}/>
                        </label>

                        <label className="ga-strategy-label" htmlFor="strategy-singlePoint">Single point <br/>
                            <input type="radio" id="strategy-singlePoint" name="strategy" value="singlePoint" checked={values.crossoverStrategy === "singlePoint"} onChange={v =>{setValues({...values, crossoverStrategy: v.target.value})}}/>
                        </label>
                    </div>
                </div>
                </Tooltip>
            </div>
            
            <div>
                <Heading as="h4" size="sm">Mutation</Heading>
                <InputRange id="ga-mutation" name="ga-mutation" label="Mutation rate" tooltip="Rate of mutation applied to each gene of an individual" min={0} max={1} defaultVal={values.mutationRate} step={0.01} onChange={v => setValues({...values, mutationRate: v})}/>
                <InputRange id="ga-vertex-movement" name="ga-vertex-movement" label="Vertex movement" tooltip="Maximum pourcentage of the image resolution to use as range for moving a vertex during mutation" min={0} max={0.5} defaultVal={values.vertexMovement} step={0.01} onChange={v => setValues({...values, vertexMovement: v})}/>
                <InputRange id="ga-color-modification" name="ga-color-modification" label="Color modification" tooltip="Maximum pourcentage for changing a color component during mutation" min={0} max={1} defaultVal={values.colorModificationRate} step={0.01} onChange={v => setValues({...values, colorModificationRate: v})}/>
                <InputRange id="ga-color-copy" name="ga-color-copy" label="Copy neighbor color" min={0} max={1} tooltip="Rate when mutating color to get the color from the closest neighbor than changing the value by a percentage" defaultVal={values.copyColorNeighborRate} step={0.01} onChange={v => setValues({...values, copyColorNeighborRate: v})}/>
                <InputRange id="ga-add-polygon" name="ga-add-polygon" label="Add polygon" min={0} max={1} tooltip="Rate when mutating polygon to insert an additional polygon (variable number of polygons should be enabled) " defaultVal={values.addPolygonRate} step={0.01} onChange={v => setValues({...values, addPolygonRate: v})}/>
                <InputRange id="ga-remove-polygon" name="ga-remove-polygon" label="Remove polygon" min={0} max={1} tooltip="Rate when mutation polygon to remove the current polygon (variable number of polygons should be enabled)" defaultVal={values.removePolygonRate} step={0.01} onChange={v => setValues({...values, removePolygonRate: v})}/>
            </div>
            
            <div>
                <Heading as="h4" size="sm">Image rendering</Heading>
                <InputRange id="ga-resolution" name="ga-resolution" label="resolution" tooltip="Resolution used for the original image during simulation (less for faster computing but less rendering quality)" min={32} max={256} defaultVal={values.resolution} step={32} onChange={v => setValues({...values, resolution: v})}/>
                <Tooltip label="Enable the Ssim fitness function (help to build the image's structure)" placement="top" closeOnClick={false} bg="blue.50" color="black" offset={[0, -20]}>
                <div>
                    <label htmlFor="ga-ssim">SSIM:</label>
                    <Switch className="ga-chakra-switch" id="ga-ssim" value="ssim" isChecked={values.enableSsim} onChange={v =>{setValues({...values, enableSsim: v.target.checked})}}/>
                </div>
                </Tooltip>
                <Tooltip label="Enable the Pixelmatch fitness function (help to fit the colors, consider as well other image's attributes)" placement="top" closeOnClick={false} bg="blue.50" color="black" offset={[0, -20]}>
                <div>            
                    <label htmlFor="ga-pixeldiff">Pixel differenciation:</label>
                    <Switch className="ga-chakra-switch" id="ga-pixeldiff" value="pixeldiff" isChecked={values.enablePixelDiff} onChange={v => setValues({...values, enablePixelDiff: v.target.checked})}/>
                </div>
                </Tooltip>
                <Tooltip label="Enable the average difference between pixels fitness function (help to fit the colors)" placement="top" closeOnClick={false} bg="blue.50" color="black" offset={[0, -20]}>
                <div>            
                    <label htmlFor="ga-subdiff">Pixel substraction:</label>
                    <Switch className="ga-chakra-switch" id="ga-subdiff" value="subdiff" isChecked={values.enableSubDiff} onChange={v => setValues({...values, enableSubDiff: v.target.checked})}/>
                </div>
                </Tooltip>
                <Tooltip label="Enable the action to add / remove a polygon from an individual" placement="top" closeOnClick={false} bg="blue.50" color="black" offset={[0, -20]}>
                <div>   
                    <label htmlFor="ga-enableVariablePolygons">Variable number of polygons:</label>
                    <Switch className="ga-chakra-switch" id="ga-enableVariablePolygons" value="enableVariablePolygons" isChecked={values.enableVariablePolygons} onChange={v => setValues({...values, enableVariablePolygons: v.target.checked})}/>
                </div>
                </Tooltip>
                {values.enableSsim &&
                    <InputRange id="ga-ssim-ratio" name="ga-ssim-ratio" label="Ratio Ssim" tooltip="Weight for computing the global fitness" min={0} max={10} defaultVal={values.ratioSsim} step={0.1} onChange={v => setValues({...values, ratioSsim: v})}/>
                }
                {values.enablePixelDiff && 
                    <InputRange id="ga-pixldiff-ratio" name="ga-pixldiff-ration" label="Ratio Pixelmatch" tooltip="Weight for computing the global fitness" min={0} max={10} defaultVal={values.ratioPixelDiff} step={0.1} onChange={v => setValues({...values, ratioPixelDiff: v})}/>
                }
                {values.enableSubDiff &&
                    <InputRange id="ga-subdiff-ratio" name="ga-subdiff-ration" label="Ratio Sub diff" tooltip="Weight for computing the global fitness" min={0} max={10} defaultVal={values.ratioSubDiff} step={0.1} onChange={v => setValues({...values, ratioSubDiff: v})}/>            
                }
                {values.enableVariablePolygons &&
                    <InputRange id="ga-polygons-ratio" name="ga-polygons-ration" label="Ratio polygons" tooltip="Weight for computing the global fitness" min={0} max={10} defaultVal={values.ratioPolygons} step={0.1} onChange={v => setValues({...values, ratioPolygons: v})}/>            
                }
            
               <Tooltip label="Enable the transparency when drawing the polygons" placement="top" closeOnClick={false} bg="blue.50" color="black" offset={[0, -20]}>
                <div>   
                    <label htmlFor="ga-transparency">Transparency:</label>
                    <Switch className="ga-chakra-switch" id="ga-transparency" value="transparency" isChecked={values.enableTransparency} onChange={v => setValues({...values, enableTransparency: v.target.checked})}/>
                </div>
                </Tooltip>

                <InputRange id="ga-vertex" name="ga-vertex" label="Vertex" tooltip="Number of vertex for the polygons used for the drawing (3 is a triangle)" min={3} max={10} defaultVal={values.nbVertex} step={1} onChange={v => setValues({...values, nbVertex: v})}/>
                <InputRange id="ga-vertices" name="ga-vertices" label="Vertices" tooltip="Number of polygons used for the drawing (this number is fixed during the evolution)" min={1} max={500} defaultVal={values.nbPolygons} step={1} onChange={v => setValues({...values, nbPolygons: v})}/>
            </div>
            </VStack>
        </div>
    )
}