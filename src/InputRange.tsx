import './InputRange.css';
import { useState } from "react";

interface InputRangeProps {
    defaultVal: number;
    min: number;
    max: number;
    step: number;
    label: string;
    id: string;
    name: string;
    onChange: (val: number) => void
}

export function InputRange({defaultVal, min, max, step, label, id, name, onChange}: InputRangeProps) {
    const [value, setValue] = useState<number>(defaultVal);

    const handleOnChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.valueAsNumber; 
        setValue(newValue);
        onChange(newValue);
    }

    return (
        <div className="inputrange-wrapper">
            <label className="inputrange-one">{label}</label>
            <input className="inputrange-two" type="range" id={id} name={name} min={min} max={max} step={step} value={value} onChange={handleOnChange}/>
            <span className="inputrange-three">{value}</span>
        </div>        
    )
}