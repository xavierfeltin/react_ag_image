import './InputImageUrl.css';
import React, {useState} from 'react';
import { Input, Button, Stack } from "@chakra-ui/react"

export interface InputImageProps {
    start: (url: string) => void;
    stop: () => void;
    links: {name: string, link: string}[] ;
    isStopped: boolean;
    className: string;
};

export function InputImageUrl({start, stop, links, isStopped, className}: InputImageProps) {
    const [url, setUrl] = useState<string>('https://my-image-url');
  
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      start && start(url);
    }

    const onStop = () => {
        stop && stop();
    }

    const generateLinks = (): JSX.Element[] =>  {
        const linkElements: JSX.Element[] = [];
        links.forEach((link => {
            const elem: JSX.Element = <Button key={link.name} variant="link" value={link.link} onClick={e => {setUrl(e.currentTarget.value);}} > {link.name} </Button>; 
            linkElements.push(elem);
        }))
        return linkElements;
    }

    return (
        <div className={className}>
            <div>
                <form onSubmit={onSubmit}>
                    <Stack direction="row" spacing={4} align="center">
                        <Input type="text" name="image-url" value={url} onChange={e => setUrl(e.target.value)} />
                        <Button disabled={!isStopped} type="submit" id="start-button">Start</Button>        
                        <Button disabled={isStopped} type="button" id="stop-button" onClick={onStop}>Stop</Button>      
                    </Stack>  
                </form>                
            </div>
            <div>
                <Stack direction="row" spacing={4} align="center">
                    {generateLinks()}
                </Stack>
            </div>            
        </div>
    )
} 