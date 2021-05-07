import ssim from "ssim.js";

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };

export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface AGworkerIn {
    image1: ImageData;
    drawingSteps: Rect[];
};

interface AGworkerOut {
    bestSsim: number;
    bestDrawingSteps: Rect[];
};

function renderImage(drawingSteps: Rect[], width: number, height: number): ImageData | null {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');

    if(!ctx) {
        return null;
    }

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#FFFFFF";
    drawingSteps.forEach(rect => {

        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    })

    return ctx.getImageData(0, 0, width, height);      
}

self.addEventListener("message", e => {
    if (!e) return;
    console.log('[MyWorker] Incoming message from main thread:', e.data);

    const message: AGworkerIn = e.data as AGworkerIn;
    const generatedImage = renderImage(message.drawingSteps, message.image1.width, message.image1.height);

    let similarityresult = -1;
    if (generatedImage)
    {
        const result = ssim(e.data.image1, generatedImage);
        similarityresult = result.mssim;
    }
    
    const response: AGworkerOut = {
        bestSsim: similarityresult,
        bestDrawingSteps: [...message.drawingSteps]
    };
    postMessage(response);
});