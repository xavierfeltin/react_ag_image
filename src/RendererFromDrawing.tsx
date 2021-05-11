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
    className: string;
};

function draw(ctx: Context, width: number, height: number, ratioW: number, ratioH: number, drawingSteps: Polygon[] = []): void {    
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    ctx.scale(ratioW, ratioH);
    drawingSteps.forEach(shape => {
        drawPolygon(ctx, shape);
    })
}

export function RendererFromDrawing({ name, width, height, ratioW, ratioH, drawingSteps, onImageDrawn, className }: RendererProps) {
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
            draw(ctx, width, height, ratioW, ratioH, drawingSteps);            
            const image = ctx.getImageData(0, 0, width, height);
            onImageDrawn?.(image);
        }
        else {
            console.error("ctx is null the drawing can not be done");
        }       
    }, [width, height, ratioW, ratioH, drawingSteps, onImageDrawn]);

    return (
        <div>
          <canvas className={className} id={name} ref={canvasRef} />
        </div>
    );    
}
