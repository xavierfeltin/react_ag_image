import './RendererFromUrl.css';
import { useEffect, useRef, useState } from 'react';
import { getLimitDimensions } from './common/geometry';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { Text, VStack } from '@chakra-ui/react';

export interface RendererProps {
    name: string;  
    url: string;
    label: string;
    limit?: number;
    onImageDrawn: (img: CanvasImageSource, renderedWidth: number, renderedHeight: number) => void;
    onLoadingError: () => void;
    className: string;
    classNameOnError: string;
};

export function RendererFromUrl({ name, url, label, limit, onImageDrawn, onLoadingError, className, classNameOnError }: RendererProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isErrorOnLoad, setError] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>(""); 

    useEffect(() => {       
        if (url !== imageUrl)
        {
            setImageUrl(url);
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
        }         
    }, [url, limit, onImageDrawn, onLoadingError, imageUrl]);

    return (
        <div className={isErrorOnLoad ? classNameOnError : className}>
            {isErrorOnLoad &&
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>Loading error!</AlertTitle>
                    <AlertDescription>The image {url} could not be loaded. Try with another URL.</AlertDescription>
                </Alert>
            }
            {!isErrorOnLoad &&
                <VStack>
                    <canvas id={name} ref={canvasRef} />
                    <Text fontSize="sm">{label}</Text>
                </VStack>
            }
        </div>
    );
}
