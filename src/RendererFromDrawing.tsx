import { useEffect, useRef } from 'react';
import { Context } from 'vm';
import {Rect} from "./common/geometry";

export interface RendererProps {
    name: string;  
    width: number;
    height: number;
    drawingSteps: Rect[];
    onImageDrawn: (img: ImageData) => void;
};

function draw(ctx: Context, width: number, height: number, drawingSteps: Rect[] = []): void {
    ctx.clearRect(0, 0, width, height);

    //console.log("[Renderer] " + JSON.stringify(drawingSteps));

    drawingSteps.forEach(shape => {
        ctx.fillStyle = `rgba(${shape.color.r},${shape.color.g},${shape.color.b},${shape.color.a})`;
        ctx.fillRect(shape.x, shape.y, shape.w, shape.h);        
    })
}

export function RendererFromDrawing({ name, width, height, drawingSteps, onImageDrawn }: RendererProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log("RendererFromDrawing#useEffect");
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
                
        if (width === 0 || height === 0) {
            console.error("Fail to create the drawing");
        }

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
            draw(ctx, width, height, drawingSteps);
            const image = ctx.getImageData(0, 0, width, height);
            onImageDrawn?.(image);
        }
        else {
            console.error("ctx is null the drawing can not be done");
        }       
    }, [width, height, drawingSteps, onImageDrawn]);

    return (
        <div>
          <canvas id={name} ref={canvasRef} />
        </div>
    );    
}
