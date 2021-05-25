import { useEffect, useRef } from 'react';
import { Context } from 'vm';
import { Text, VStack } from '@chakra-ui/react';

export interface RendererProps {
    name: string;  
    label: string;
    width: number;
    height: number;
    ratioW: number;
    ratioH: number;
    data: ImageData;
    className: string;
};

function draw(ctx: Context, width: number, height: number, ratioW: number, ratioH: number, data: ImageData, canvas: HTMLCanvasElement): void {    
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(data, 0, 0);
    ctx.scale(ratioW, ratioH);        
    ctx.drawImage(canvas, 0, 0);    
}

export function RendererFromData({ name, label, width, height, ratioW, ratioH, data, className }: RendererProps) {
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
            draw(ctx, width, height, ratioW, ratioH, data, canvas);
        }
        else {
            console.error("ctx is null the drawing can not be done");
        }       
    }, [width, height, ratioW, ratioH, data]);

    return (
        <div>          
            <VStack>
                <canvas className={className} id={name} ref={canvasRef} />
                <Text fontSize="sm">{label}</Text>
            </VStack>
        </div>
    );    
}
