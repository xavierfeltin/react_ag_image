import './GAConfiguration.css';
import { useEffect, useState } from "react";
import { Configuration } from "./common/ga";
import { InputRange } from "./InputRange"
import { Switch, Heading, VStack } from "@chakra-ui/react"

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
            enableSsim: enableSsim,
            enablePixelDiff: enablePixelDiff,
            enableSubDiff: enableSubDiff,
            ratioSsim: ratioSsim,
            ratioPixelDiff: ratioPixelDiff,
            ratioSubDiff: ratioSubDiff,
            enableTransparency: enableTransparency,
            nbVertex: nbVertex,
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
                <InputRange id="ga-population" name="ga-population" label="Population" min={10} max={300} defaultVal={values.population} step={1} onChange={v => setValues({...values, population: v})}/>
                <InputRange id="ga-keep-previous" name="ga-keep-previous" label="Keep previous individual" min={0} max={1} defaultVal={values.keepPreviousRatio} step={0.01}onChange={v => setValues({...values, keepPreviousRatio: v})}/>
                <InputRange id="ga-new-individual" name="ga-new-individual" label="Generate new individual" min={0} max={1} defaultVal={values.newIndividualRatio} step={0.01} onChange={v => setValues({...values, newIndividualRatio: v})}/>
            </div>

            <div>
                <Heading as="h4" size="sm">Crossover</Heading>
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
            
                {values.parentSelectionStrategy === "tournament" &&
                    <InputRange id="ga-selection-cutoff" name="ga-selection-cutoff" label="Selection cutoff" min={0} max={1} defaultVal={values.selectCutoff} step={0.05} onChange={v => setValues({...values, selectCutoff: v})}/>                
                }

                {values.parentSelectionStrategy === "tournament" &&
                    <InputRange id="ga-tournament-size" name="ga-tournament-size" label="Tournament size" min={1} max={Math.round(values.selectCutoff * values.population)} defaultVal={values.tournamentSize} step={1} onChange={v => setValues({...values, tournamentSize: v})}/>
                }

                <InputRange id="ga-crossover-parent" name="ga-crossover-parent" label="Main parent ratio" min={0} max={1} defaultVal={values.crossoverParentRatio} step={0.05} onChange={v => setValues({...values, crossoverParentRatio: v})}/>
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
            </div>
            
            <div>
                <Heading as="h4" size="sm">Mutation</Heading>
                <InputRange id="ga-mutation" name="ga-mutation" label="Mutation rate" min={0} max={1} defaultVal={values.mutationRate} step={0.01} onChange={v => setValues({...values, mutationRate: v})}/>
                <InputRange id="ga-vertex-movement" name="ga-vertex-movement" label="Vertex movement" min={0} max={0.5} defaultVal={values.vertexMovement} step={0.01} onChange={v => setValues({...values, vertexMovement: v})}/>
                <InputRange id="ga-color-modification" name="ga-color-modification" label="Color modification" min={0} max={1} defaultVal={values.colorModificationRate} step={0.01} onChange={v => setValues({...values, colorModificationRate: v})}/>
            </div>

            <div>
                <Heading as="h4" size="sm">Image rendering</Heading>
                <InputRange id="ga-resolution" name="ga-resolution" label="resolution" min={32} max={256} defaultVal={values.resolution} step={32} onChange={v => setValues({...values, resolution: v})}/>
                <div>
                    <label htmlFor="ga-ssim">SSIM:</label>
                    <Switch className="ga-chakra-switch" id="ga-ssim" value="ssim" isChecked={values.enableSsim} onChange={v =>{setValues({...values, enableSsim: v.target.checked})}}/>
                </div>
                <div>            
                    <label htmlFor="ga-pixeldiff">Pixel differenciation:</label>
                    <Switch className="ga-chakra-switch" id="ga-pixeldiff" value="pixeldiff" isChecked={values.enablePixelDiff} onChange={v => setValues({...values, enablePixelDiff: v.target.checked})}/>
                </div>
                <div>            
                    <label htmlFor="ga-subdiff">Pixel substraction:</label>
                    <Switch className="ga-chakra-switch" id="ga-subdiff" value="subdiff" isChecked={values.enableSubDiff} onChange={v => setValues({...values, enableSubDiff: v.target.checked})}/>
                </div>
                {values.enableSsim &&
                    <InputRange id="ga-ssim-ratio" name="ga-ssim-ratio" label="Ratio Ssim" min={0} max={10} defaultVal={values.ratioSsim} step={1} onChange={v => setValues({...values, ratioSsim: v})}/>
                }
                {values.enablePixelDiff && 
                    <InputRange id="ga-pixldiff-ratio" name="ga-pixldiff-ration" label="Ratio Pixel diff" min={0} max={10} defaultVal={values.ratioPixelDiff} step={1} onChange={v => setValues({...values, ratioPixelDiff: v})}/>
                }
                {values.enableSubDiff &&
                    <InputRange id="ga-subdiff-ratio" name="ga-subdiff-ration" label="Ratio Sub diff" min={0} max={10} defaultVal={values.ratioSubDiff} step={1} onChange={v => setValues({...values, ratioSubDiff: v})}/>            
                }
            
                <div>   
                    <label htmlFor="ga-transparency">Transparency:</label>
                    <Switch className="ga-chakra-switch" id="ga-transparency" value="transparency" isChecked={values.enableTransparency} onChange={v => setValues({...values, enableTransparency: v.target.checked})}/>
                </div>

                <InputRange id="ga-vertex" name="ga-vertex" label="Vertex" min={3} max={10} defaultVal={values.nbVertex} step={1} onChange={v => setValues({...values, nbVertex: v})}/>
                <InputRange id="ga-vertices" name="ga-vertices" label="Vertices" min={50} max={500} defaultVal={values.nbPolygons} step={1} onChange={v => setValues({...values, nbPolygons: v})}/>
            </div>
            </VStack>
        </div>
    )
}