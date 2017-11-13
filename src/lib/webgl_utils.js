GLUtil = (function(){

  return {
    standardSettings,
    buildGLProgramFromFiles
  };

  function standardSettings(gl){
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthFunc(gl.LEQUAL);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }

  function buildGLProgramFromFiles(gl, glProg ,vUrl, fUrl){
    return new Promise(function (resolve, reject){
      loadBothShaderScripts(vUrl, fUrl)
        .then(scripts => {
          var shaders = makeBothShadersFromScripts(gl, scripts);
          var program = buildProgramFromShaders(gl, shaders);
          var parameters = getProgramLocations(gl, program, scripts);
          resolve([program, parameters]);
        });
      });
  }

  function buildProgramFromShaders(gl, shaders){
    var program = gl.createProgram();
    gl.attachShader(program, shaders[0]);
    gl.attachShader(program, shaders[1]);
    gl.linkProgram(program);
    return program;
  }

  function loadBothShaderScripts(vUrl, fUrl){
    var scripts = [loadSingleShaderScript(vUrl), loadSingleShaderScript(fUrl)];
    return Promise.all(scripts);
  }

  function loadSingleShaderScript(url){
    return new Promise((resolve, reject) => {
      var script;
      var request = new XMLHttpRequest();
      request.onreadystatechange = function(){
        if (this.readyState == 4){
          if (this.status == 200){
            resolve(this.responseText);
          } else {
            reject("Error loading shader script: HTTP status " + this.status);
          }
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

  function makeShaderFromScript(gl, script, type){
    var shader = gl.createShader(type);
    gl.shaderSource(shader, script);
    gl.compileShader(shader);
    return shader;
  }

  function makeBothShadersFromScripts(gl, scripts){
    return [makeShaderFromScript(gl, scripts[0], gl.VERTEX_SHADER), makeShaderFromScript(gl, scripts[1], gl.FRAGMENT_SHADER)];
  }

  function getAttributeNames(script){
    var attributeNames = [];
    var re = /attribute.*\W(\w*);/g;
    var match = re.exec(script);
    while (!!match){
      attributeNames.push(match[1]);
      match = re.exec(script);
    }
    return attributeNames;
  }

  function getUniformNames(script){
    var uniformNames = [];
    var re = /uniform.*\W(\w*);/g;
    var match = re.exec(script);
    while (!!match){
      uniformNames.push(match[1]);
      match = re.exec(script);
    }
    return uniformNames;
  }

  function getUniformSetters(script){
    var settersLookup = {
      'float': "uniform1f",
      'vec3': "uniform3f",
      'mat4': "uniformMatrix4fv",
      'mat3': "uniformMatrix3fv",
      'int': "uniform1i",
      'sampler2D': "uniform1i"
    };
    var uniformSetters = {};
    var re = /uniform.*(vec2|vec3|mat3|mat4|sampler2D|float|int)\W(\w*)/g;
    var match = re.exec(script);
    while (!!match){
      var name = match[2],
        type = match[1];
      uniformSetters[name] = settersLookup[type];
      match = re.exec(script);
    }
    return uniformSetters;
  }

  function getLocations(gl, program, names, type){
    var get = {
      attribute: "getAttribLocation",
      uniform: "getUniformLocation"
    }[type];
    var locations = {};
    for (var i = 0; i < names.length; i++){
      locations[names[i]] = gl[get](program, names[i]);
    }
    return locations;
  }

  function getProgramLocations(gl, program, scripts){
    var script = scripts[0].concat(scripts[1]);
    var attNames = getAttributeNames(script);
    var attLocations = getLocations(gl, program, attNames, "attribute");
    var uniNames = getUniformNames(script);
    var uniLocations = getLocations(gl, program, uniNames, "uniform");
    var uniSetters = getUniformSetters(script);
    return {
      attributeLocations: attLocations,
      uniformLocations: uniLocations,
      uniformSetters: uniSetters
    };
  }
})();

