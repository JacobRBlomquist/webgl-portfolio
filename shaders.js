class ShaderUtil {
    static domShaderSrc(elmID) {
        let elm = document.getElementById(elmID);
        if (!elm || elm.text == "") {
            console.log(elmID + " shader not found or no text.");
            return null;
        }
        return elm.text;
    }

    static createShader(gl, src, type) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);

        // Get error data if shader failed compiling
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Error compiling shader: " + src, gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    static createProgram(gl, vShader, fShader, doValidate) {
        // Link shaders
        let prog = gl.createProgram();
        gl.attachShader(prog, vShader);
        gl.attachShader(prog, fShader);
        gl.linkProgram(prog);

        // Check if successful
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error("Error creating shader program: ", gl.getProgramInfoLog(prog));
            gl.deleteProgram(prog);
            return null;
        }

        if (doValidate) {
            gl.validateProgram(prog);
            if (!gl.getProgramParameter(prog, gl.VALIDATE_STATUS)) {
                console.error("Error validating program: ", gl.getProgramInfoLog(prog));
                gl.deleteProgram(prog);
                return null;
            }
        }

        // can delete the shaders now
        // TODO detaching might cause problems in some browsers. Might need to delete this.
        gl.detachShader(prog, vShader);
        gl.detachShader(prog, fShader);
        gl.deleteShader(vShader);
        gl.deleteShader(fShader);

        return prog;
    }

    static domShaderProgram(gl, vecID, fragID, doValidate) {
        let vShaderTxt = ShaderUtil.domShaderSrc(vecID);
        if (!vShaderTxt)
            return null;
        let fShaderTxt = ShaderUtil.domShaderSrc(fragID);
        if (!fShaderTxt)
            return null;
        let vShader = ShaderUtil.createShader(gl, vShaderTxt, gl.VERTEX_SHADER);
        if (!vShader)
            return null;
        let fShader = ShaderUtil.createShader(gl, fShaderTxt, gl.FRAGMENT_SHADER);
        if (!fShader)
            return null;
        return ShaderUtil.createProgram(gl, vShader, fShader, doValidate);
    }
}