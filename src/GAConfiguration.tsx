import './GAConfiguration.css';
import { useEffect, useState } from "react";
import { Configuration } from "./common/ga";
import { InputRange } from "./InputRange"

export interface InputRangeProps {
    population: number;
    selectCutoff: number;
    keepPreviousRatio: number;
    newIndividualRatio: number;
    crossoverParentRatio: number;
    mutationRate: number;
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
    selectCutoff,
    keepPreviousRatio,
    newIndividualRatio,
    crossoverParentRatio,
    mutationRate,
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
            selectCutoff: selectCutoff,
            keepPreviousRatio: keepPreviousRatio,
            newIndividualRatio: newIndividualRatio,
            crossoverParentRatio: crossoverParentRatio,
            mutationRate: mutationRate,
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
        console.log("use effect to update configuration " + JSON.stringify(values));
        onValuesChange(values);
    }, [values, onValuesChange]);

    return (
        <div className={className}>
            <h3> Genetic Algorithm </h3>
            <InputRange id="ga-population" name="ga-population" label="Population" min={10} max={300} defaultVal={values.population} step={1} onChange={v => setValues({...values, population: v})}/>
            <InputRange id="ga-selection-cutoff" name="ga-selection-cutoff" label="Selection cutoff" min={0} max={1} defaultVal={values.selectCutoff} step={0.05} onChange={v => setValues({...values, selectCutoff: v})}/>
            <InputRange id="ga-keep-previous" name="ga-keep-previous" label="Keep previous individual" min={0} max={1} defaultVal={values.keepPreviousRatio} step={0.05}onChange={v => setValues({...values, keepPreviousRatio: v})}/>
            <InputRange id="ga-new-individual" name="ga-new-individual" label="Generate new individual" min={0} max={1} defaultVal={values.newIndividualRatio} step={0.05} onChange={v => setValues({...values, newIndividualRatio: v})}/>
            <InputRange id="ga-crossover-parent" name="ga-crossover-parent" label="Cross over main parent ratio" min={0} max={1} defaultVal={values.crossoverParentRatio} step={0.05} onChange={v => setValues({...values, crossoverParentRatio: v})}/>
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