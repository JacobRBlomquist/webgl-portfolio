function GLInstance(canvasID) {
    let canvas = document.getElementById(canvasID);
    let gl = canvas.getContext("webgl2");

    if (!gl) {
        console.error("WebGL Context is not available!");
        return null;
    }

    gl.clearColor(1.0, 1.0, 1.0, 1.0);


    // ......................................
    // Methods

    // Reset canvas with bg color
    gl.fClear = function () {
        this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
        return this;
    }

    // create and fill array buffer
    gl.fCreateArrayBuffer = function (floatArray, isStatic = true) {

        let buf = this.createBuffer();
        this.bindBuffer(this.ARRAY_BUFFER, buf);
        this.bufferData(this.ARRAY_BUFFER, floatArray, (isStatic) ? this.STATIC_DRAW : this.DYNAMIC_DRAW);
        this.bindBuffer(this.ARRAY_BUFFER, null);
        return buf;
    }

    // ......................................
    // Setter/Getters

    // Set size of canvas html element and rendering viewport.
    gl.fSetSize = function (w, h) {
        this.canvas.style.width = w + "px";
        this.canvas.style.height = h + "px";
        this.canvas.width = w;
        this.canvas.height = h;

        this.viewport(0, 0, w, h);
        return this;
    }



    return gl;
}
