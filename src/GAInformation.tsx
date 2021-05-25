export interface GAInfoProps {
    generation: number;  
    fitness: number;
    ssim: number;
    pixelDiff: number;
    subPixel: number;
    idBest: number;
    elapsedTimeForGeneration: number;
    notImprovingSince: number;
    className: string;
};

export function GAInformation({ generation, fitness, ssim, pixelDiff, subPixel, idBest, elapsedTimeForGeneration, notImprovingSince, className }: GAInfoProps) {
    return (
        <div className={className}>
          <p> Generation: {generation} 
            {notImprovingSince > 0 && <span> (not improving since {notImprovingSince}) </span>}
          </p>
          <p> Time for a generation: {elapsedTimeForGeneration} seconds </p>
          <p> Fitness: {(fitness * 100.0).toFixed(2)}%  - [SSIM: {(ssim * 100.0).toFixed(2)}%, Pixel Diff: {(pixelDiff * 100.0).toFixed(2)}%, Sub Pixel: {(subPixel * 100.0).toFixed(2)}%]</p>
          <p> idBest: {idBest} </p>
        </div>
    );    
}