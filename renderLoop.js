class RenderLoop {
    constructor(callback = null, fps = 0) {
        let oThis = this;
        this.msLastFrame = null; // Time ms of last frame
        this.callBack = callback; // function to call each frame
        this.isActive = false; // control on/off state of render loop
        this.fps = 0;   // Save the fps
        this.frameCount = 0;

        if (fps > 0) { // limit framerate
            this.msFpsLimit = 1000 / fps; // calc how many ms per frame in one second
            this.run = function () {
                oThis.frameCount++;
                if (oThis.frameCount % 200 == 0)
                    console.log("FPS: ", oThis.fps)

                let msCurrent = performance.now();
                let msDelta = (msCurrent - oThis.msLastFrame);
                let deltaTime = msDelta / 1000.0;

                if (msDelta >= oThis.msFpsLimit) {
                    oThis.fps = Math.floor(1.0 / deltaTime);
                    oThis.msLastFrame = msCurrent;
                    oThis.callBack(deltaTime);
                }

                if (oThis.isActive)
                    window.requestAnimationFrame(oThis.run);

            }
        } else { // Build run method that is optimized.
            this.run = function () {
                oThis.frameCount++;
                if (oThis.frameCount % 100 == 0)
                    console.log("FPS: ", oThis.fps)
                let msCurrent = performance.now();
                let deltaTime = (msCurrent - oThis.msLastFrame) / 1000.0;
                oThis.fps = Math.floor(1 / deltaTime);
                oThis.msLastFrame = msCurrent;

                oThis.callBack(deltaTime);
                if (oThis.isActive)
                    window.requestAnimationFrame(oThis.run);
            }
        }
    }

    start() {
        this.isActive = true;
        this.msLastFrame = performance.now();
        window.requestAnimationFrame(this.run);
        return this;
    }

    stop() {
        this.isActive = false;
    }
}