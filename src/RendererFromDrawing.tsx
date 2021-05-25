import { useEffect, useRef } from 'react';
import { Context } from 'vm';
import {drawPolygon, Polygon} from "./common/geometry";
import { Text, VStack } from "@chakra-ui/react";

export interface RendererProps {
    name: string;  
    label: string;
    width: number;
    height: number;
    ratioW: number;
    ratioH: number;
    drawingSteps: Polygon[];
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

export function RendererFromDrawing({ name, label, width, height, ratioW, ratioH, drawingSteps, className }: RendererProps) {
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
        }
        else {
            console.error("ctx is null the drawing can not be done");
        }       
    }, [width, height, ratioW, ratioH, drawingSteps]);

    return (
        <div>
            <VStack>
                <canvas className={className} id={name} ref={canvasRef} />
                <Text fontSize="sm">{label}</Text>
            </VStack>
        </div>
    );    
}
