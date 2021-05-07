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
  
  interface AGworkerInData {
    image1: ImageData;
    image2: ImageData
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
      setSteps([...steps, newRect]);
    }, 5000);

    if (imageFromUrl)
    {
      const message: AGworkerInData = {
        image1: imageFromUrl,
        image2: img
      };
      myWorkerInstance.postMessage(message);
    }
    
    // Generate new best candidate to display
    //agWorker.postMessage(["hello", "universe"]);
    // setSteps([newSteps]);    
  }, [steps, imageFromUrl, myWorkerInstance]);

  useEffect(() => {
    myWorkerInstance.addEventListener('message', function(e) {
      console.log('Message from Worker: ' + e.data);
    });
  }, [myWorkerInstance]);

  return (
    <div>
      <RendererFromUrl name={"original-image"} onImageDrawn={handleUrlImageDrawn} url="https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif"/>
      <RendererFromDrawing onImageDrawn={handleGeneratedImageDrawn} name={"generated-image"} width={width} height={height} drawingSteps={steps}/>
    </div>    
  );
}

export default App;
