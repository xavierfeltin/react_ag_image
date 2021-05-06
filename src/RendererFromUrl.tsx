import { useEffect, useRef } from 'react';

export interface RendererProps {
    name: string;  
    url: string;
    limit?: number
};

function getLimitDimensions(width: number, height: number, limit?: number): {width: number, height: number} {
    if (limit && width >= limit && height >= limit) {
        const ratio = width / height
  
        if (ratio > 1) {
            return { width: Math.round(limit / ratio), height: limit }
        }
        return { width: limit, height: Math.round(limit * ratio) }
    }
    return { width, height }
}

function RendererFromUrl({ name, url, limit }: RendererProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        
        const img = new Image();
        img.crossOrigin = "anonymous";  // This enables CORS
        img.onload = () => {
            const { width, height } = getLimitDimensions(img.width, img.height, limit);

            if (width === 0 || height === 0) {
                console.error("Fail to load the image");
            }

            canvas.width = width;
            canvas.height = height;

            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
            }
            else {
                console.error("ctx is null the image can not be loaded");
            }                        
        };
        img.src = url;
    });

    return (
        <div>
          <canvas id={name} ref={canvasRef}></canvas>
        </div>
    );    
}

export default RendererFromUrl;