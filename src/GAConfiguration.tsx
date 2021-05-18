import { useEffect, useState } from "react";
import { Configuration } from "./common/ga";
import { InputRange } from "./InputRange"

export interface InputRangeProps {
    onValuesChange: (configuration: Configuration) => void;
    className: string;
}

export function GAConfiguration({onValuesChange, className} : InputRangeProps) {
    const [values, setValues] = useState<Configuration>({
        population: 0,
        selectCutoff: 0,
        keepPreviousRatio: 0,
        newIndividualRatio: 0,
        crossoverParentRatio: 0,
        mutationRate: 0,
        vertexMovement: 0,
        colorModificationRate: 0,
        enableSsim: true,
        enablePixelDiff: true,
        ratioSsim: 0,
        ratioPixelDiff: 0,
        enableTransparency: true,
        nbVertex: 0,
        nbPolygons: 0
    });

    useEffect(() => {
        console.log("use effect to update configuration")
        onValuesChange(values);
    }, [values, onValuesChange]);

    return (
        <div className={className}>
            <h3> Genetic Algorithm </h3>
            <InputRange id="ga-population" name="ga-population" label="Population" min={10} max={300} defaultVal={50} step={1} onChange={v => setValues({...values, population: v})}/>
            <InputRange id="ga-selection-cutoff" name="ga-selection-cutoff" label="Selection cutoff" min={0} max={1} defaultVal={0.2} step={0.1} onChange={v => setValues({...values, selectCutoff: v})}/>
            <InputRange id="ga-keep-previous" name="ga-keep-previous" label="Keep previous individual" min={0} max={1} defaultVal={0.1} step={0.1}onChange={v => setValues({...values, keepPreviousRatio: v})}/>
            <InputRange id="ga-new-individual" name="ga-new-individual" label="Generate new individual" min={0} max={1} defaultVal={0.1} step={0.1} onChange={v => setValues({...values, newIndividualRatio: v})}/>
            <InputRange id="ga-crossover-parent" name="ga-crossover-parent" label="Cross over main parent ratio" min={0} max={1} defaultVal={0.6} step={0.1} onChange={v => setValues({...values, crossoverParentRatio: v})}/>
            <InputRange id="ga-mutation" name="ga-mutation" label="Mutation rate" min={0} max={1} defaultVal={0.1} step={0.1} onChange={v => setValues({...values, mutationRate: v})}/>
            <InputRange id="ga-vertex-movement" name="ga-vertex-movement" label="Vertex movement" min={0} max={32} defaultVal={10} step={1} onChange={v => setValues({...values, vertexMovement: v})}/>
            <InputRange id="ga-color-modification" name="ga-color-modification" label="Color modification" min={0} max={1} defaultVal={0.1} step={0.1} onChange={v => setValues({...values, colorModificationRate: v})}/>

            <h3> Image rendering </h3>
            <label>SSIM:</label>
            <input type="checkbox" id="ga-ssim" value="ssim" checked onChange={v => setValues({...values, enableSsim: v.target.value === "true"})}/>
            <InputRange id="ga-ssim-ratio" name="ga-ssim-ratio" label="Ratio" min={0} max={10} defaultVal={3} step={1} onChange={v => setValues({...values, ratioSsim: v})}/>
            
            <label>Pixel differenciation:</label>
            <input type="checkbox" id="ga-pixeldiff" value="pixeldiff" onChange={v => setValues({...values, enablePixelDiff: v.target.value === "true"})}/>
            <InputRange id="ga-pixldiff-ration" name="ga-pixldiff-ration" label="Ratio" min={0} max={10} defaultVal={1} step={1} onChange={v => setValues({...values, ratioPixelDiff: v})}/>
            
            <label>Transparency:</label>
            <input type="checkbox" id="ga-transparency" value="transparency" checked onChange={v => setValues({...values, enableTransparency: v.target.value === "true"})}/>

            <InputRange id="ga-vertex" name="ga-vertex" label="Vertex" min={3} max={10} defaultVal={3} step={1} onChange={v => setValues({...values, nbVertex: v})}/>
            <InputRange id="ga-vertices" name="ga-vertices" label="Vertices" min={3} max={10} defaultVal={3} step={1} onChange={v => setValues({...values, nbPolygons: v})}/>
        </div>
    )
}