import { useEffect, useRef } from 'react';
import { Context } from 'vm';

export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}


export interface RendererProps {
    name: string;  
    width: number;
    height: number;
    drawingSteps: Rect[];
    onImageDrawn: (img: ImageData) => void;
};

function draw(ctx: Context, width: number, height: number, drawingSteps: Rect[] = []): void {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#FFFFFF";
    drawingSteps.forEach(rect => {

        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
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
