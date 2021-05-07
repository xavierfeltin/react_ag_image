import './App.css';
import { RendererFromUrl } from './RendererFromUrl';
import {Rect, RendererFromDrawing} from './RendererFromDrawing';
import {useState, useCallback} from "react";

//import MyWorker from './test.worker';

function App() {

  const width = 256;
  const height = 256;
  const [steps, setSteps] = useState<Rect[]>([]);
  const [imageFromUrl, setImage] = useState<ImageData|null>(null);

  // const myWorkerInstance: Worker = new MyWorker();// useMemo(() => new MyWorker(), []);//

  // console.log('[App] MyWorker instance:', myWorkerInstance);
  // myWorkerInstance.postMessage('This is a message from the main thread!');
  
  /*
  interface AGworkerInData {
    image1: ImageData;
    image2: ImageData
  };
  */

  function popRectangles() {
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
  }

  const handleUrlImageDrawn = useCallback((img: ImageData) => {
    console.log("handleUrlImageDrawn - Renderer drawn url image");
    setImage(img);
  }, []);

  const handleGeneratedImageDrawn = (img: ImageData) => {
    console.log("handleGeneratedImageDrawn - Renderer drawn generated image");
    popRectangles();

    if (imageFromUrl)
    {
      /*
      const message: AGworkerInData = {
        image1: urlImage,
        image2: img
      };
      */
      // myWorkerInstance.postMessage(message);
    }
    
    // Generate new best candidate to display
    //agWorker.postMessage(["hello", "universe"]);
    // setSteps([newSteps]);    
  };

  /*
  useEffect(() => {
    myWorkerInstance.addEventListener('message', function(e) {
      console.log('Message from Worker: ' + e.data);
    });
  }, [myWorkerInstance]);
  */

  return (
    <div>
      <RendererFromUrl name={"original-image"} onImageDrawn={handleUrlImageDrawn} url="https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif"/>
      <RendererFromDrawing onImageDrawn={handleGeneratedImageDrawn} name={"generated-image"} width={width} height={height} drawingSteps={steps}/>
    </div>    
  );
}

export default App;
