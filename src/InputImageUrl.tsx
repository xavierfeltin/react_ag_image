export interface InputImageProps {
    onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
};

export function InputImageUrl({onSubmit}: InputImageProps) {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="image-url" value="https://my-image-url"/>
                <button type="submit" id="load-button">Submit image</button>
            </form>
        </div>
    )
}