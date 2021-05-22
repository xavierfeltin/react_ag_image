import './App.css';
import {useState, useCallback, useEffect} from "react";

import MyWorker from './test.worker';
import {AGworkerIn, AGworkerOut} from "./common/communication";
import { getLimitDimensions, Image } from './common/geometry';
import { InputImageUrl } from './InputImageUrl';
import { RendererFromUrl } from './RendererFromUrl';
import { RendererFromDrawing } from './RendererFromDrawing';
import { RendererFromData } from './RendererFromData';
import { GAInformation } from './GAInformation';
import { GAConfiguration } from './GAConfiguration';
import { Configuration } from './common/ga';

function App() {

  const limitImageSize = 256;
  const sampleLnks: {name: string, link: string}[] = [
    { 
      name: "Einstein",
      link: "https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif"
    },
    { 
      name: "Joconde",
      link: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/390px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
    },
    { 
      name: "Photographe",
      link: "https://i.picsum.photos/id/823/420/560.jpg?hmac=H6lJE4fRi96MxgWYyd3_79WbmObu-jJj7Zo40p5I-nU"
    },
    { 
      name: "Random",
      link: "https://picsum.photos/420/560"
    }       
  ];

  const [configuration, setConfiguration] = useState<Configuration>({
    population: 50,
    parentSelectionStrategy: "tournament",
    selectCutoff: 0.2,
    tournamentSize: 3,
    keepPreviousRatio: 0.15,
    newIndividualRatio: 0.05,
    crossoverParentRatio: 0.7,
    mutationRate: 0.2,
    crossoverStrategy: "polygon",
    vertexMovement: 0.1,
    colorModificationRate: 0.1,
    enableSsim: true,
    enablePixelDiff: false,
    ratioSsim: 1,
    ratioPixelDiff: 1,
    enableTransparency: true,
    nbVertex: 3,
    nbPolygons: 125
  });

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

  const [response, setResponse] = useState<AGworkerOut | undefined>(undefined);

  const [imageUrl, setUrl] = useState<string>("");
  const [imageFromUrl, setImage] = useState<Image>({
    image: null, renderedWidth: 0, renderedHeight: 0, ratioOffscreenWidth: 0, ratioOffscreenHeight: 0, offscreenWidth: 0, offscreenHeight: 0, limitOffscreen: 0});

  const [myWorkerInstance, setWorker] = useState<Worker | null>(null); 
  const [isStopped, setStop] = useState<boolean>(true);

  const handleResponse = useCallback((e: MessageEvent<any>) => {      
    const response: AGworkerOut = e.data as AGworkerOut;
    setResponse(response);             
  }, []);

  const handleStart = useCallback((url :string) => {    
    const newWorker = new MyWorker();    
    setWorker(newWorker);

    setStop(false);      
    setUrl(url);    
  }, []);

  useEffect(() => {
    if (myWorkerInstance) {
      console.log("Add listener to worker");
      myWorkerInstance.addEventListener('message', handleResponse);
    }    
  }, [myWorkerInstance, handleResponse]);

  useEffect(() => {

    if (!myWorkerInstance || !imageFromUrl.image || !response || isStopped) {
      return;
    }

    //if ((simulation.generation + 1) === response.generation) {
      setSimulation(response);
      //console.log(`Set response of generation ${response.generation}`);

      //Send next message
      const message: AGworkerIn = {
        isRunning: response.isRunning,
        image: imageFromUrl.image, 
        configuration: configuration,
        notImprovingSince: response.notImprovingSince,
        best: response.best,
        population: response.population,
        generation: response.generation,
        renderingHeight: imageFromUrl.offscreenHeight,
        renderingWidth: imageFromUrl.offscreenWidth
      };

      myWorkerInstance.postMessage(message);
    /*
    }
    else {
      console.warn(`Try to set response of generation ${response.generation} to simulation of generation ${simulation.generation}`);
    } 
    */       
  }, [myWorkerInstance, response, imageFromUrl, configuration, isStopped])

  const handleStop = useCallback(() => {
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
      setUrl("");  
      setStop(true); 
      setResponse(undefined);        
    }    
  }, [myWorkerInstance]);

  const handleUrlImageDrawn = useCallback((img: CanvasImageSource, renderedWidth: number, renderedHeight: number) => {
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

      if (myWorkerInstance && image) {
        //Send next message
        const message: AGworkerIn = {
          isRunning: simulation.isRunning,
          image: image, 
          configuration: configuration,
          notImprovingSince: simulation.notImprovingSince,
          best: simulation.best,
          population: simulation.population,
          generation: simulation.generation,
          renderingHeight: simDimensions.width,
          renderingWidth: simDimensions.height
        };

        console.log("post message for first generation");
        myWorkerInstance.postMessage(message);
      }     

    } 
    else {
      console.error("ctx from url image for resizing could not be created");
    }   
  }, [simulation, myWorkerInstance, configuration]);

  const handleLoadingImageError = useCallback(() => {
    setStop(true);  
  }, []);

  const handleValuesChange = useCallback((config: Configuration) => {   
    setConfiguration(config);
  }, []);

  return (
    <div className="wrapper">       
      <InputImageUrl className="one" links={sampleLnks} start={handleStart} stop={handleStop} isStopped={isStopped}/>
      { imageUrl &&
        <RendererFromUrl className="two" classNameOnError="twoExpanded" name={"original-image"} onImageDrawn={handleUrlImageDrawn} onLoadingError={handleLoadingImageError} limit={limitImageSize} url={imageUrl}/>
      }
      { imageFromUrl.image && !isStopped &&
        <RendererFromDrawing className="three" name={"generated-image"} width={imageFromUrl.renderedWidth} height={imageFromUrl.renderedHeight} ratioW={1 / imageFromUrl.ratioOffscreenWidth} ratioH={1 / imageFromUrl.ratioOffscreenHeight} drawingSteps={simulation.best.phenotype}/>        
      }
      { simulation.best.diff && !isStopped &&
        <RendererFromData className="four" name={"diff-image"} width={imageFromUrl.renderedWidth} height={imageFromUrl.renderedHeight} ratioW={1 / imageFromUrl.ratioOffscreenWidth} ratioH={1 / imageFromUrl.ratioOffscreenHeight} data={simulation.best.diff}/>        
      }
      { !isStopped &&
        <GAInformation 
          className="five" 
          generation={simulation.generation} 
          fitness={simulation.best.fitness} 
          ssim={simulation.best.ssim}
          pixelDiff={simulation.best.pixelDiff}
          idBest={simulation.best.id} 
          elapsedTimeForGeneration={simulation.elapsedTime}
          notImprovingSince={simulation.notImprovingSince}
        />
      }            
      {
        isStopped &&
        <GAConfiguration
          population={configuration.population}
          parentSelectionStrategy={configuration.parentSelectionStrategy}
          selectCutoff={configuration.selectCutoff}
          tournamentSize={configuration.tournamentSize}
          keepPreviousRatio={configuration.keepPreviousRatio}
          newIndividualRatio={configuration.newIndividualRatio}
          crossoverParentRatio={configuration.crossoverParentRatio}
          mutationRate={configuration.mutationRate}
          crossoverStrategy={configuration.crossoverStrategy}
          vertexMovement={configuration.vertexMovement}
          colorModificationRate={configuration.colorModificationRate}
          enableSsim={configuration.enableSsim}
          enablePixelDiff={configuration.enablePixelDiff}
          ratioSsim={configuration.ratioSsim}
          ratioPixelDiff={configuration.ratioPixelDiff}
          enableTransparency={configuration.enableTransparency}
          nbVertex={configuration.nbVertex}
          nbPolygons={configuration.nbPolygons}
          className="five" 
          onValuesChange={handleValuesChange}
        />
      }      
    </div>            
  );
}

export default App;
