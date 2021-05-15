import './InputImageUrl.css';
import React, {useEffect, useState} from 'react';

export interface InputImageProps {
    start: (url: string) => void;
    stop: () => void;
    className: string;
};

export function InputImageUrl({start, stop, className}: InputImageProps) {
    const [url, setUrl] = useState<string>('https://my-image-url');
    const [isStopped, setStopped] = useState<boolean>(true);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStopped(false);
      start && start(url);
    }

    const onStop = () => {
        setStopped(true);
        stop && stop();
    }

    return (
        <div className={className}>
            <form onSubmit={onSubmit}>
                <input type="text" name="image-url" value={url} onChange={e => setUrl(e.target.value)} />
                <button disabled={!isStopped} type="submit" id="start-button">Start</button>                
            </form>
            <button disabled={isStopped} type="button" id="stop-button" onClick={onStop}>Stop</button>
        </div>
    )
} 