import './App.css';
import { RendererFromUrl } from './RendererFromUrl';
import {RendererFromDrawing} from './RendererFromDrawing';
import {RendererFromData} from './RendererFromData';
import {GAInformation} from './GAInformation';
import {useState, useCallback, useMemo, useEffect} from "react";

import MyWorker from './test.worker';
import {AGworkerIn, AGworkerOut} from "./common/communication";

function App() {

  const width = 256;
  const height = 256;

  const simWidth = 64;
  const simHeight = 64;

  const ratioW = width / simWidth;
  const ratioH = height / simHeight;

  /*
  const ratioSimW = simWidth / width;
  const ratioSimH = simHeight / height;
  */

  const [simulation, setSimulation] = useState<AGworkerOut>({
    best: {
      genes: [],
      fitness: 0,
      ssim: 0,
      pixelDiff: 0,
      diff: undefined,
      id: 0,
      probability: 0,
      phenotype: []
    },
    population: [],
    generation: 0,
    elapsedTime: 0,
    notImprovingSince: 0
  });
  const [imageFromUrl, setImage] = useState<ImageData|null>(null);
  const myWorkerInstance: Worker = useMemo(() => new MyWorker(), []); //new MyWorker();// ;//

  const handleUrlImageDrawn = useCallback((img: CanvasImageSource) => {
    console.log("handleUrlImageDrawn");
    const canvas = new OffscreenCanvas(simWidth, simHeight); 
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Rescale the image for the simulation
      ctx.scale(0.25, 0.25);
      ctx.drawImage(img, 0, 0, width, height);
      const image = ctx.getImageData(0, 0, simWidth, simHeight);
      setImage(image);  
    } 
    else {
      console.error("ctx from url image for resizing could not be created");
    }   
  }, []);

  const handleGeneratedImageDrawn = useCallback((img: ImageData) => {
   if (imageFromUrl)
    {
      const message: AGworkerIn = {
        image: imageFromUrl, 
        populationSize: 50,
        genesSize: 125,
        nbVertices: 3,
        notImprovingSince: simulation.notImprovingSince,
        nbColor: 4,
        best: simulation.best,
        population: simulation.population,
        generation: simulation.generation,
        renderingHeight: simHeight,
        renderingWidth: simWidth
      };
      myWorkerInstance.postMessage(message);
    }
  }, [simulation, imageFromUrl, myWorkerInstance]);

  useEffect(() => {
    myWorkerInstance.addEventListener('message', function(e) {      
      const response: AGworkerOut = e.data as AGworkerOut;
      setSimulation(response);      
    });
  }, [myWorkerInstance]);

  return (
    <div className="wrapper">
        <RendererFromUrl className="one" name={"original-image"} onImageDrawn={handleUrlImageDrawn} url="https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif"/>
        { imageFromUrl && 
          <RendererFromDrawing className="two" onImageDrawn={handleGeneratedImageDrawn} name={"generated-image"} width={width} height={height} ratioW={ratioW} ratioH={ratioH} drawingSteps={simulation.best.phenotype}/>        
        }
        { simulation.best.diff && 
          <RendererFromData className="three" name={"diff-image"} width={width} height={height} ratioW={ratioW} ratioH={ratioH} data={simulation.best.diff}/>        
        }          
      <GAInformation className="four" 
        generation={simulation.generation} 
        fitness={simulation.best.fitness} 
        ssim={simulation.best.ssim}
        pixelDiff={simulation.best.pixelDiff}
        idBest={simulation.best.id} 
        elapsedTimeForGeneration={simulation.elapsedTime}
        notImprovingSince={simulation.notImprovingSince}/>
    </div>        
  );
}

export default App;
