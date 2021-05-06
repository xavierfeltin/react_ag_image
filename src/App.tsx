import './App.css';
import { useEffect } from 'react';
import RendererFromUrl from './RendererFromUrl';
import RendererFromDrawing from './RendererFromDrawing';
import { Context } from 'vm';

function handleImageLoaded(ctx: Context | null, x: number, y: number, width: number, height: number): ImageData | null {
  if (ctx) {
    const image = ctx.getImageData(x, y, width, height);
    return image;      
  }
  else {
    console.error("ctx is null the image can not be read");
    return null;
  }         
}

function App() {
  /*
  useEffect(() => {
      let canvas = canvasOriginal.current as HTMLCanvasElement;
      let originalImage = getImageData(canvas, 0, 0, 256, 256);

      canvas = canvasGenerated.current as HTMLCanvasElement;
      let generatedImage = getImageData(canvas, 0, 0, 256, 256);

      if (originalImage && generatedImage) {
        const { mssim, performance } = ssim(originalImage, generatedImage);
        console.log(`SSIM: ${mssim} (${performance}ms)`);
      }                                
  });
  */

  return (
    <div>
      <RendererFromUrl name={"original-image"} url="https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif"/>
      <RendererFromDrawing onImageLoaded={handleImageLoaded} name={"generated-image"} width={256} height={256} drawingSteps={[]}/>
    </div>    
  );
}

export default App;