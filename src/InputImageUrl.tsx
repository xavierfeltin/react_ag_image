import './InputImageUrl.css';
import React, {useState} from 'react';

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
            const elem: JSX.Element = <button key={link.name} className="link" value={link.link} onClick={e => {setUrl(e.currentTarget.value);}} > {link.name} </button>; 
            linkElements.push(elem);
        }))
        return linkElements;
    }

    return (
        <div className={className}>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="image-url" value={url} onChange={e => setUrl(e.target.value)} />
                    <button disabled={!isStopped} type="submit" id="start-button">Start</button>        
                    <button disabled={isStopped} type="button" id="stop-button" onClick={onStop}>Stop</button>        
                </form>                
            </div>
            <div>
                {generateLinks()}
            </div>            
        </div>
    )
} 