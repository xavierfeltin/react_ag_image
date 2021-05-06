import { useEffect, useRef } from 'react';
import { Context } from 'vm';

type MyCallbackType = (ctx: Context | null, x: number, y: number, width: number, height: number) => ImageData | null;

export interface RendererProps {
    name: string;  
    width: number;
    height: number;
    drawingSteps: string[];
    onImageLoaded: MyCallbackType;
};

function draw(ctx: Context, width: number, height: number): void {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 10, 40, 40);
}

function RendererFromDrawing({ name, width, height, drawingSteps, onImageLoaded }: RendererProps) {
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
            draw(ctx, width, height);
            onImageLoaded(ctx, 0, 0, width, height);
        }
        else {
            console.error("ctx is null the drawing can not be done");
        }       
    });

    return (
        <div>
          <canvas id={name} ref={canvasRef}></canvas>
        </div>
    );    
}

export default RendererFromDrawing;