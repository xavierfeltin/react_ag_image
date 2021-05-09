import './App.css';
import { RendererFromUrl } from './RendererFromUrl';
import {RendererFromDrawing} from './RendererFromDrawing';
import {useState, useCallback, useMemo, useEffect} from "react";

import MyWorker from './test.worker';
import {AGworkerIn, AGworkerOut} from "./common/communication";

function App() {

  const width = 256;
  const height = 256;
  const [simulation, setSimulation] = useState<AGworkerOut>({
    bestSsim: 0,
    bestDrawingSteps: [],
    population: [],
    generation: 0
  });
  const [imageFromUrl, setImage] = useState<ImageData|null>(null);
  const myWorkerInstance: Worker = useMemo(() => new MyWorker(), []); //new MyWorker();// ;//

  const handleUrlImageDrawn = useCallback((img: ImageData) => {
    console.log("handleUrlImageDrawn - Renderer drawn url image");
    setImage(img);
  }, []);

  const handleGeneratedImageDrawn = useCallback((img: ImageData) => {
    console.log("handleGeneratedImageDrawn - Renderer drawn generated image");

    setTimeout(() => {
      if (imageFromUrl)
      {
        const message: AGworkerIn = {
          image: imageFromUrl, 
          populationSize: 50,
          genesSize: 125, 
          nbVertices: 3,
          population: simulation.population,
          generation: simulation.generation
        };
        myWorkerInstance.postMessage(message);
      }
    }, 200);
 
  }, [simulation, imageFromUrl, myWorkerInstance]);

  useEffect(() => {
    myWorkerInstance.addEventListener('message', function(e) {      
      const response: AGworkerOut = e.data as AGworkerOut;
      console.log('Response - Generation ' + response.generation + ': ' + response.bestSsim);
      console.log('Response - First ' + response.population[0].fitness + '- Last ' + response.population[response.population.length - 1].fitness);
      //console.log("[App] " + JSON.stringify(response.bestDrawingSteps));

      setSimulation(response);      
    });
  }, [myWorkerInstance]);

  return (
    <div>
      <RendererFromUrl name={"original-image"} onImageDrawn={handleUrlImageDrawn} url="https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif"/>
      { imageFromUrl && 
        <RendererFromDrawing onImageDrawn={handleGeneratedImageDrawn} name={"generated-image"} width={width} height={height} drawingSteps={simulation.bestDrawingSteps}/>
      }
    </div>    
  );
}

export default App;
