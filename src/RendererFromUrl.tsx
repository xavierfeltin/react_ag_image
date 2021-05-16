import './RendererFromUrl.css';
import { useEffect, useRef, useState } from 'react';
import { getLimitDimensions } from './common/geometry';

export interface RendererProps {
    name: string;  
    url: string;
    limit?: number;
    onImageDrawn: (img: CanvasImageSource, renderedWidth: number, renderedHeight: number) => void;
    onLoadingError: () => void;
    className: string;
    classNameOnError: string;
};

export function RendererFromUrl({ name, url, limit, onImageDrawn, onLoadingError, className, classNameOnError }: RendererProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isErrorOnLoad, setError] = useState<boolean>(false);

    useEffect(() => {        
        setError(false);
        const canvas = canvasRef.current as HTMLCanvasElement;
        if (canvas) {
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
            img.onerror = () => {
                setError(true);
                onLoadingError();
            }    
        }
    }, [url, limit, onImageDrawn]);



    return (
        <div>
            {isErrorOnLoad &&
                <div className={classNameOnError}>
                <p className="error">The image {url} could not be loaded. Try with another URL.</p>
                </div> 
            }
            <div className={className}>
            <canvas id={name} ref={canvasRef} />
            </div>
        </div>
    );
}
