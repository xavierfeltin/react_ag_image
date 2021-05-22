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
          <p> Simulation time: {elapsedTimeForGeneration} seconds </p>
          <p> Fitness: {fitness} </p>
          <p> - SSIM: {ssim} </p>
          <p> - Pixel Diff: {pixelDiff} </p>
          <p> - Sub Pixel: {subPixel} </p>
          <p> idBest: {idBest} </p>
        </div>
    );    
}