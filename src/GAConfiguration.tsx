import './GAConfiguration.css';
import { useEffect, useState } from "react";
import { Configuration } from "./common/ga";
import { InputRange } from "./InputRange"

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
    ratioSsim: number;
    ratioPixelDiff: number;
    enableTransparency: boolean;
    nbVertex: number;
    nbPolygons: number;
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
    ratioSsim,
    ratioPixelDiff,
    enableTransparency,
    nbVertex,
    nbPolygons,
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
            ratioSsim: ratioSsim,
            ratioPixelDiff: ratioPixelDiff,
            enableTransparency: enableTransparency,
            nbVertex: nbVertex,
            nbPolygons: nbPolygons
        });

    useEffect(() => {
        onValuesChange(values);
    }, [values, onValuesChange]);

    return (
        <div className={className}>
            <h3> Genetic Algorithm </h3>
            <InputRange id="ga-population" name="ga-population" label="Population" min={10} max={300} defaultVal={values.population} step={1} onChange={v => setValues({...values, population: v})}/>
            <InputRange id="ga-keep-previous" name="ga-keep-previous" label="Keep previous individual" min={0} max={1} defaultVal={values.keepPreviousRatio} step={0.05}onChange={v => setValues({...values, keepPreviousRatio: v})}/>
            <InputRange id="ga-new-individual" name="ga-new-individual" label="Generate new individual" min={0} max={1} defaultVal={values.newIndividualRatio} step={0.05} onChange={v => setValues({...values, newIndividualRatio: v})}/>
            
            <div>
                <span><b>Parent selection strategy</b></span>
                <div className="ga-strategy-div">
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

            <InputRange id="ga-crossover-parent" name="ga-crossover-parent" label="Cross over main parent ratio" min={0} max={1} defaultVal={values.crossoverParentRatio} step={0.05} onChange={v => setValues({...values, crossoverParentRatio: v})}/>
            <div>
                <span><b>Crossover strategy</b></span>
                <div className="ga-strategy-div">
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
            <InputRange id="ga-mutation" name="ga-mutation" label="Mutation rate" min={0} max={1} defaultVal={values.mutationRate} step={0.05} onChange={v => setValues({...values, mutationRate: v})}/>
            <InputRange id="ga-vertex-movement" name="ga-vertex-movement" label="Vertex movement" min={0} max={0.5} defaultVal={values.vertexMovement} step={0.05} onChange={v => setValues({...values, vertexMovement: v})}/>
            <InputRange id="ga-color-modification" name="ga-color-modification" label="Color modification" min={0} max={1} defaultVal={values.colorModificationRate} step={0.05} onChange={v => setValues({...values, colorModificationRate: v})}/>

            <h3> Image rendering </h3>
            <div>
                <label className="gaconfiguration-one" htmlFor="ga-ssim">SSIM:</label>
                <input className="gaconfiguration-three" type="checkbox" id="ga-ssim" value="ssim" checked={values.enableSsim} onChange={v =>{setValues({...values, enableSsim: v.target.checked})}}/>
            </div>
            <div>            
                <label className="gaconfiguration-one" htmlFor="ga-pixeldiff">Pixel differenciation:</label>
                <input className="gaconfiguration-three" type="checkbox" id="ga-pixeldiff" value="pixeldiff" checked={values.enablePixelDiff} onChange={v => setValues({...values, enablePixelDiff: v.target.checked})}/>
            </div>
            {values.enableSsim && values.enablePixelDiff &&
                <div>
                    <InputRange id="ga-ssim-ratio" name="ga-ssim-ratio" label="Ratio Ssim" min={0} max={10} defaultVal={values.ratioSsim} step={1} onChange={v => setValues({...values, ratioSsim: v})}/>
                    <InputRange id="ga-pixldiff-ratio" name="ga-pixldiff-ration" label="Ratio Pixel" min={0} max={10} defaultVal={values.ratioPixelDiff} step={1} onChange={v => setValues({...values, ratioPixelDiff: v})}/>            
                </div>
            }
           
            <div>   
                <label className="gaconfiguration-one" htmlFor="ga-transparency">Transparency:</label>
                <input className="gaconfiguration-three" type="checkbox" id="ga-transparency" value="transparency" checked={values.enableTransparency} onChange={v => setValues({...values, enableTransparency: v.target.checked})}/>
            </div>

            <InputRange id="ga-vertex" name="ga-vertex" label="Vertex" min={3} max={10} defaultVal={values.nbVertex} step={1} onChange={v => setValues({...values, nbVertex: v})}/>
            <InputRange id="ga-vertices" name="ga-vertices" label="Vertices" min={50} max={500} defaultVal={values.nbPolygons} step={1} onChange={v => setValues({...values, nbPolygons: v})}/>
        </div>
    )
}