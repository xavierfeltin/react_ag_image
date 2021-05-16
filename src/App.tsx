import './App.css';
import {useState, useCallback, useMemo, useEffect} from "react";

import MyWorker from './test.worker';
import {AGworkerIn, AGworkerOut} from "./common/communication";
import { getLimitDimensions, Image } from './common/geometry';
import { InputImageUrl } from './InputImageUrl';
import { RendererFromUrl } from './RendererFromUrl';
import { RendererFromDrawing } from './RendererFromDrawing';
import { RendererFromData } from './RendererFromData';
import { GAInformation } from './GAInformation';

function App() {

  const limitImageSize = 256;

  const [simulation, setSimulation] = useState<AGworkerOut>({
    isRunning: false,
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

  const [imageUrl, setUrl] = useState<string>("");
  //const [imageUrl, setUrl] = useState<string>("https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif");
  //const [imageUrl, setUrl] = useState<string>("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/390px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg");
  //const [imageFromUrl, setImage] = useState<ImageData|null>(null);
  
  const [imageFromUrl, setImage] = useState<Image>({
    image: null, renderedWidth: 0, renderedHeight: 0, ratioOffscreenWidth: 0, ratioOffscreenHeight: 0, offscreenWidth: 0, offscreenHeight: 0, limitOffscreen: 0});

  const [myWorkerInstance, setWorker] = useState<Worker | null>(null); 
  const [isStopped, setStop] = useState<boolean>(true);

  const handleSelectUrl = useCallback((url :string) => {
    setStop(false);
    setUrl(url);
  }, []);

  const handleStop = useCallback(() => {
    setStop(true); 

    // Reset simulation
    if (myWorkerInstance) {
      myWorkerInstance.terminate();
      setSimulation({
        isRunning: false,
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
    }    
  }, [myWorkerInstance]);

  const handleUrlImageDrawn = useCallback((img: CanvasImageSource, renderedWidth: number, renderedHeight: number) => {
    setWorker(new MyWorker());
    
    const imageWidth: number = img.width as number;
    const imageHeight: number = img.height as number;

    const simDimensions = getLimitDimensions(imageWidth, imageHeight, 64);  
    const ratioW = simDimensions.width / renderedWidth;
    const ratioH = simDimensions.height / renderedHeight; 

    const canvas = new OffscreenCanvas(simDimensions.width, simDimensions.height); 
    const ctx = canvas.getContext('2d');
    if (ctx) {      
      // Rescale the image for the simulation
      ctx.scale(ratioW, ratioH);
      ctx.drawImage(img, 0, 0, renderedWidth, renderedHeight);
      const image = ctx.getImageData(0, 0, simDimensions.width, simDimensions.height);

      setImage({
        image: image,
        renderedWidth: renderedWidth,
        renderedHeight: renderedHeight,
        offscreenWidth: simDimensions.width,
        offscreenHeight: simDimensions.height,
        ratioOffscreenWidth: ratioW,
        ratioOffscreenHeight: ratioH,
        limitOffscreen: 64
      });  
    } 
    else {
      console.error("ctx from url image for resizing could not be created");
    }   
  }, []);

  const handleLoadingImageError = useCallback(() => {
    setStop(true);  
  }, []);

  const handleGeneratedImageDrawn = useCallback((img: ImageData) => {    
    if (myWorkerInstance && imageFromUrl.image)
    {
      const message: AGworkerIn = {
        isRunning: simulation.isRunning,
        image: imageFromUrl.image, 
        populationSize: 50,
        genesSize: 125,
        nbVertices: 3,
        notImprovingSince: simulation.notImprovingSince,
        nbColor: 4,
        best: simulation.best,
        population: simulation.population,
        generation: simulation.generation,
        renderingHeight: imageFromUrl.offscreenHeight,
        renderingWidth: imageFromUrl.offscreenWidth
      };

      myWorkerInstance.postMessage(message);
    }
  }, [simulation, imageFromUrl, myWorkerInstance]);

  useEffect(() => {
    if (myWorkerInstance) {
      myWorkerInstance.addEventListener('message', function(e) {      
        const response: AGworkerOut = e.data as AGworkerOut;
        setSimulation(response);      
      });
    }    
  }, [myWorkerInstance]);

  return (
    <div className="wrapper">       
      <InputImageUrl className="one" start={handleSelectUrl} stop={handleStop} isStopped={isStopped}/>
      { imageUrl &&
        <RendererFromUrl className="two" classNameOnError="twoExpanded" name={"original-image"} onImageDrawn={handleUrlImageDrawn} onLoadingError={handleLoadingImageError} limit={limitImageSize} url={imageUrl}/>
      }
      { imageFromUrl.image && 
        <RendererFromDrawing className="three" onImageDrawn={handleGeneratedImageDrawn} name={"generated-image"} width={imageFromUrl.renderedWidth} height={imageFromUrl.renderedHeight} ratioW={1 / imageFromUrl.ratioOffscreenWidth} ratioH={1 / imageFromUrl.ratioOffscreenHeight} drawingSteps={simulation.best.phenotype}/>        
      }
      { imageFromUrl && simulation.best.diff && 
        <RendererFromData className="four" name={"diff-image"} width={imageFromUrl.renderedWidth} height={imageFromUrl.renderedHeight} ratioW={1 / imageFromUrl.ratioOffscreenWidth} ratioH={1 / imageFromUrl.ratioOffscreenHeight} data={simulation.best.diff}/>        
      }  
      { imageFromUrl.image && simulation.best.diff && 
        <RendererFromData className="four" name={"diff-image"} width={imageFromUrl.renderedWidth} height={imageFromUrl.renderedHeight} ratioW={1 / imageFromUrl.ratioOffscreenWidth} ratioH={1 / imageFromUrl.ratioOffscreenHeight} data={imageFromUrl.image}/>        
      }          
      <GAInformation className="five" 
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
