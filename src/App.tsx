import './App.css';
import { RendererFromUrl } from './RendererFromUrl';
import {Rect, RendererFromDrawing} from './RendererFromDrawing';
import {useState} from "react";

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
  const width = 256;
  const height = 256;
  const [steps, setSteps] = useState<Rect[]>([]);

  const handleImageDrawn = (img: ImageData) => {
    console.log("Renderer drawn image", img);

    const lastRect: Rect = steps.length > 0 ? steps[steps.length - 1] : {x: -20, y: 0, w: 10, h: 10};
    const gotoNewLine = lastRect.x + 2*lastRect.w > (width - lastRect.w);
    const newRect = {
      ...lastRect,
      x: gotoNewLine ? 0 : lastRect.x + 2*lastRect.w,
      y: gotoNewLine ? lastRect.y + 2*lastRect.h : lastRect.y,
    }

    setTimeout(() => {
      setSteps([...steps, newRect]);
    }, 1000);
  };


  return (
    <div>
      <RendererFromUrl name={"original-image"} url="https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif"/>
      <RendererFromDrawing onImageDrawn={handleImageDrawn} name={"generated-image"} width={width} height={height} drawingSteps={steps}/>
    </div>    
  );
}

export default App;
