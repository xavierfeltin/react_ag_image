import { useEffect, useRef } from 'react';
import { getLimitDimensions } from './common/geometry';

export interface RendererProps {
    name: string;  
    url: string;
    limit?: number;
    onImageDrawn: (img: CanvasImageSource, renderedWidth: number, renderedHeight: number) => void;
    className: string;
};

export function RendererFromUrl({ name, url, limit, onImageDrawn, className }: RendererProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        
        const img = new Image();
        img.crossOrigin = "Anonymous";  // This enables CORS
        img.onload = () => {
            const { width, height } = getLimitDimensions(img.width, img.height, limit);            
            if (width === 0 || height === 0) {
                console.error("Fail to load the image");
            }

            canvas.width = width;
            canvas.height = height;

            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                onImageDrawn?.(img, width, height);
            }
            else {
                console.error("ctx is null the image can not be loaded");
            }                        
        };
        img.src = url;
    }, [url, limit, onImageDrawn]);

    return (
        <div className={className}>
          <canvas id={name} ref={canvasRef} />
        </div>
    );    
}
