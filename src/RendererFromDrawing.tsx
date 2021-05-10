import { useEffect, useRef } from 'react';
import { Context } from 'vm';
import {drawPolygon, Polygon} from "./common/geometry";

export interface RendererProps {
    name: string;  
    width: number;
    height: number;
    ratioW: number;
    ratioH: number;
    drawingSteps: Polygon[];
    onImageDrawn: (img: ImageData) => void;
};

function draw(ctx: Context, width: number, height: number, drawingSteps: Polygon[] = []): void {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    drawingSteps.forEach(shape => {
        drawPolygon(ctx, shape);
    })
}

export function RendererFromDrawing({ name, width, height, ratioW, ratioH, drawingSteps, onImageDrawn }: RendererProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
                
        if (width === 0 || height === 0) {
            console.error("Fail to create the drawing");
        }

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
            ctx.scale(ratioW, ratioH);
            draw(ctx, width, height, drawingSteps);
            
            const image = ctx.getImageData(0, 0, width, height);
            onImageDrawn?.(image);
        }
        else {
            console.error("ctx is null the drawing can not be done");
        }       
    }, [width, height, ratioW, ratioH, drawingSteps, onImageDrawn]);

    return (
        <div>
          <canvas id={name} ref={canvasRef} />
        </div>
    );    
}
