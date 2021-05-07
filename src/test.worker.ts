import ssim from "ssim.js";

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };

self.addEventListener("message", e => {
    if (!e) return;
    console.log('[MyWorker] Incoming message from main thread:', e.data);

    const similarity = ssim(e.data.image1, e.data.image2);
    postMessage("Hello from worker: " + similarity.mssim + "(" + similarity.performance + " ms)");

    /*
    const img1 = e.data.image1;
    const img2 = e.data.image2;
    
    const result = ssim(img1, img2);
    postMessage(result);
    */
});