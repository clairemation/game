const GLUtil = require("./webgl_utils.js")

function WebGLProgram(canvas, vertShaderUrl, fragShaderUrl){
  this.canvas = canvas;
  this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  var gl = this.gl;
  this.projectionMatrix = WebGLProgram.makeOrthoMatrix(canvas.clientWidth, canvas.clientHeight, 1000);
  this.mvMatrix = [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
    ];
  this.program = {};
  return new Promise((resolve, reject) => {
    GLUtil.buildGLProgramFromFiles(gl, this.program, vertShaderUrl, fragShaderUrl).then(result => {
      this.program = {
        program: result[0],
        params: result[1]
      };
      GLUtil.standardSettings(gl);
      resolve(this);
    });
  });
}

WebGLProgram.prototype.use = function(){
  this.gl.useProgram(this.program.program);
};

WebGLProgram.prototype.bindDataToAttribute = function(attribute, data, numComponents){
  var buffer = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
  var attribLocation = this.program.params.attributeLocations[attribute];
  this.gl.enableVertexAttribArray(attribLocation);
  this.gl.vertexAttribPointer(this.program.params.attributeLocations[attribute], numComponents, this.gl.FLOAT, false, 0, 0);
};

WebGLProgram.makeProjectionMatrix = function(fov, aspect, near, far, isInRadians){
  if (!isInRadians) fov *= Math.PI / 180;
  var f = 1.0 / Math.tan(fov / 2);
  var rangeInverse = 1.0 / (near-far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near+far) * rangeInverse, -1,
    0, 0, near*far * rangeInverse * 2, 0
  ]);
};

WebGLProgram.makeOrthoMatrix = function(width, height, depth){
  return new Float32Array([
    2/width, 0, 0, 0,
    0, -2/height, 0, 0,
    0, 0, 2/depth, 0,
    -1, 1, 0, 1
  ]);
};

WebGLProgram.prototype.setUniform = function(name, data){
  var setter = this.program.params.uniformSetters[name];
  var location = this.program.params.uniformLocations[name];
  if (setter === "uniform3f"){
    this.gl[setter](location, ...data);
  }
  else if (setter === "uniform1f"){
    this.gl[setter](location, data);
  } else {
    this.gl[setter](location, false, data);
  }
};

WebGLProgram.prototype.attachTexture = function(img){
  if (typeof img === "string"){
    return new Promise((resolve, reject) => {
      WebGLProgram.loadImage(img).then(result => {
        WebGLProgram.attachTexture(this.gl, result, 0, "LINEAR", "LINEAR_MIPMAP_NEAREST");
        resolve();
      })
    });
  }
  return new Promise((resolve, reject) => {
    WebGLProgram.attachTexture(this.gl, img, 0, "LINEAR", "LINEAR_MIPMAP_NEAREST");
    resolve();
  });
};

WebGLProgram.attachTexture = function(gl, texImage, index, magFilter, minFilter){
  index = index || 0;
  magFilter = magFilter || "LINEAR";
  minFilter = minFilter || "LINEAR_MIPMAP_NEAREST";
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texImage);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[magFilter]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[minFilter]);
  if (magFilter.concat(minFilter).match(/MIPMAP/)){
    gl.generateMipmap(gl.TEXTURE_2D);
  }
  gl.activeTexture(gl.TEXTURE0);
};

WebGLProgram.loadImage = function(url){
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  });
};