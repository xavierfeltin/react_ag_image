import './App.css';
import { RendererFromUrl } from './RendererFromUrl';
import {Rect, RendererFromDrawing} from './RendererFromDrawing';
import {useState, useCallback, useMemo, useEffect} from "react";

import MyWorker from './test.worker';

function App() {

  const width = 256;
  const height = 256;
  const [steps, setSteps] = useState<Rect[]>([]);
  const [imageFromUrl, setImage] = useState<ImageData|null>(null);

  const myWorkerInstance: Worker = useMemo(() => new MyWorker(), []); //new MyWorker();// ;//

  // console.log('[App] MyWorker instance:', myWorkerInstance);
  // myWorkerInstance.postMessage('This is a message from the main thread!');
  
  interface AGworkerIn {
    image1: ImageData;
    drawingSteps: Rect[];
  };

  interface AGworkerOut {
    bestSsim: number;
    bestDrawingSteps: Rect[];
  };

  const handleUrlImageDrawn = useCallback((img: ImageData) => {
    console.log("handleUrlImageDrawn - Renderer drawn url image");
    setImage(img);
  }, []);

  const handleGeneratedImageDrawn = useCallback((img: ImageData) => {
    console.log("handleGeneratedImageDrawn - Renderer drawn generated image");

    const lastRect: Rect = steps.length > 0 ? steps[steps.length - 1] : {x: -20, y: 0, w: 10, h: 10};
    const gotoNewLine = lastRect.x + 2*lastRect.w > (width - lastRect.w);
    const newRect = {
      ...lastRect,
      x: gotoNewLine ? 0 : lastRect.x + 2*lastRect.w,
      y: gotoNewLine ? lastRect.y + 2*lastRect.h : lastRect.y,
    }

    setTimeout(() => {
      if (imageFromUrl)
      {
        const message: AGworkerIn = {
          image1: imageFromUrl, 
          drawingSteps: [...steps, newRect]
        };
        myWorkerInstance.postMessage(message);
      }
    }, 5000);

    // Generate new best candidate to display
    //agWorker.postMessage(["hello", "universe"]);
    // setSteps([newSteps]);    
  }, [steps, imageFromUrl, myWorkerInstance]);

  useEffect(() => {
    myWorkerInstance.addEventListener('message', function(e) {      
      const newIterationResponse: AGworkerOut = e.data as AGworkerOut;
      setSteps([...newIterationResponse.bestDrawingSteps]);
      console.log('Message from Worker: ' + newIterationResponse.bestSsim);
    });
  }, [myWorkerInstance]);

  return (
    <div>
      <RendererFromUrl name={"original-image"} onImageDrawn={handleUrlImageDrawn} url="https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif"/>
      { imageFromUrl && 
        <RendererFromDrawing onImageDrawn={handleGeneratedImageDrawn} name={"generated-image"} width={width} height={height} drawingSteps={steps}/>
      }
    </div>    
  );
}

export default App;
