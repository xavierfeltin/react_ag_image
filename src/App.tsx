import './App.css';
import { RendererFromUrl } from './RendererFromUrl';
import {RendererFromDrawing} from './RendererFromDrawing';
import {useState, useCallback, useMemo, useEffect} from "react";

import MyWorker from './test.worker';
import {AGworkerIn, AGworkerOut} from "./common/communication";

function App() {

  const width = 256;
  const height = 256;

  const simWidth = 64;
  const simHeight = 64;

  const ratioW = 256 / simWidth;
  const ratioH = 256 / simHeight;

  const [simulation, setSimulation] = useState<AGworkerOut>({
    best: {
      genes: [],
      fitness: NaN,
      id: NaN,
      probability: NaN
    },
    population: [],
    generation: 0
  });
  const [imageFromUrl, setImage] = useState<ImageData|null>(null);
  const myWorkerInstance: Worker = useMemo(() => new MyWorker(), []); //new MyWorker();// ;//

  const handleUrlImageDrawn = useCallback((img: ImageData) => {
    setImage(img);
  }, []);

  const handleGeneratedImageDrawn = useCallback((img: ImageData) => {
    setTimeout(() => {
      if (imageFromUrl)
      {
        const message: AGworkerIn = {
          image: imageFromUrl, 
          populationSize: 50,
          genesSize: 125, 
          nbVertices: 3,
          best: simulation.best,
          population: simulation.population,
          generation: simulation.generation,
          renderingHeight: simHeight,
          renderingWidth: simWidth
        };
        myWorkerInstance.postMessage(message);
      }
    }, 200);
 
  }, [simulation, imageFromUrl, myWorkerInstance]);

  useEffect(() => {
    myWorkerInstance.addEventListener('message', function(e) {      
      const response: AGworkerOut = e.data as AGworkerOut;
      setSimulation(response);      
    });
  }, [myWorkerInstance]);

  return (
    <div>
      <RendererFromUrl name={"original-image"} onImageDrawn={handleUrlImageDrawn} url="https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif"/>
      { imageFromUrl && 
        <RendererFromDrawing onImageDrawn={handleGeneratedImageDrawn} name={"generated-image"} width={width} height={height} ratioW={ratioW} ratioH={ratioH} drawingSteps={simulation.best.genes}/>
      }
    </div>    
  );
}

export default App;
