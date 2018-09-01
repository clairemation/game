var App =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(59),
    canvasID = _require.canvasID;

var canvas = document.getElementById(canvasID);
var ctx = canvas.getContext('2d');

ctx.textStyle = 'white';

ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

module.exports = ctx;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = function () {
  function Control() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Control);

    this.owner = args.owner;
    this.name = args.name;
    // Override
  }

  _createClass(Control, [{
    key: "getGame",
    value: function getGame() {
      return this.owner.scene.game;
    }
  }, {
    key: "init",
    value: function init() {
      // Override
    }
  }, {
    key: "update",
    value: function update() {
      //Override
    }
  }]);

  return Control;
}();

module.exports = Control;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PIXEL_WIDTH = 320;
var PIXEL_HEIGHT = 240;

var Control = __webpack_require__(1);
var renderer = __webpack_require__(0);

var offset = [0, 0];

var Camera = function (_Control) {
  _inherits(Camera, _Control);

  function Camera(args) {
    _classCallCheck(this, Camera);

    var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, args));

    _this.name = 'camera';
    offset = args.offset || offset;
    _this.cameraFollow = null;
    _this.parallaxLayers = [];
    return _this;
  }

  _createClass(Camera, [{
    key: 'init',
    value: function init() {
      this.cameraFollow = this.owner.scene.getControlsByName('camera-follow')[0];
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.cameraFollow && this.cameraFollow.shouldFollow) {
        var newPos = [];
        newPos[0] = Math.min(-this.cameraFollow.owner.controls.transform.position[0] + this.cameraFollow.margin[0], -32);
        newPos[1] = Math.min(-this.cameraFollow.owner.controls.transform.position[1] + this.cameraFollow.margin[1], -32);
        Camera.setOffset.apply(Camera, newPos);
        this.cameraFollow.shouldFollow = false;
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      renderer.setTransform(1, 0, 0, 1, 0, 0);
      offset[0] = 0;
      offset[1] = 0;
    }
  }], [{
    key: 'reset',
    value: function reset() {
      Camera.setOffset(0, 0);
    }
  }, {
    key: 'setOffset',
    value: function setOffset(x, y) {
      offset[0] = Math.round(x);
      offset[1] = Math.round(y);
      renderer.setTransform(1, 0, 0, 1, -offset[0], -offset[1]);
    }
  }, {
    key: 'getOffset',
    value: function getOffset() {
      return offset;
    }
  }, {
    key: 'getViewportPosition',
    value: function getViewportPosition() {
      return [-offset[0], -offset[1]];
    }
  }, {
    key: 'setViewportPosition',
    value: function setViewportPosition(x, y) {
      Camera.setOffset(-x, -y);
    }
  }, {
    key: 'getPixelWidth',
    value: function getPixelWidth() {
      return PIXEL_WIDTH;
    }
  }, {
    key: 'getPixelHeight',
    value: function getPixelHeight() {
      return PIXEL_HEIGHT;
    }
  }]);

  return Camera;
}(Control);

Camera.prototype.reset = Camera.reset;
Camera.prototype.getOffset = Camera.getOffset;
Camera.prototype.setOffset = Camera.setOffset;
Camera.prototype.getViewportPosition = Camera.getViewportPosition;
Camera.prototype.setViewportPosition = Camera.setViewportPosition;

module.exports = Camera;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function handleEvent(handlers, e) {
  for (var i = 0; i < handlers.length; i++) {
    handlers[i](e);
  }
}

var instance;

var Input = function () {
  function Input() {
    _classCallCheck(this, Input);

    if (!!instance) {
      return instance;
    }
    this.handlers = {}, this.runKeyDownHandlers = this.runKeyDownHandlers.bind(this);
    this.runKeyUpHandlers = this.runKeyUpHandlers.bind(this);
    instance = this;
  }

  _createClass(Input, [{
    key: "turnOn",
    value: function turnOn() {
      document.addEventListener("keydown", this.runKeyDownHandlers);
      document.addEventListener("keyup", this.runKeyUpHandlers);
    }
  }, {
    key: "turnOff",
    value: function turnOff() {
      document.removeEventListener("keydown", this.runKeyDownHandlers);
      document.removeEventListener("keyup", this.runKeyUpHandlers);
    }
  }, {
    key: "addKeyDownListener",
    value: function addKeyDownListener(key, handler) {
      if (!this.handlers[key]) {
        this.handlers[key] = {
          downHandlers: [],
          downHandlerIndices: {},
          upHandlers: [],
          upHandlerIndices: {}
        };
      }
      this.handlers[key].downHandlers.push(handler);
      this.handlers[key].downHandlerIndices[handler] = this.handlers[key].downHandlers.length - 1;
    }
  }, {
    key: "removeKeyDownListener",
    value: function removeKeyDownListener(key, handler) {
      this.handlers[key].downHandlers[this.handlers[key].downHandlerIndices[handler]] = this.handlers[key].downHandlers[this.handlers[key].downHandlers.length - 1];
      this.handlers[key].downHandlers.splice(this.handlers[key].downHandlers.length - 1, 1);
      delete this.handlers[key].downHandlerIndices[handler];
    }
  }, {
    key: "addKeyUpListener",
    value: function addKeyUpListener(key, handler) {
      if (!this.handlers[key]) {
        this.handlers[key] = {
          downHandlers: [],
          downHandlerIndices: {},
          upHandlers: [],
          upHandlerIndices: {}
        };
      }
      this.handlers[key].upHandlers.push(handler);
      this.handlers[key].upHandlerIndices[handler] = this.handlers[key].upHandlers.length - 1;
    }
  }, {
    key: "removeKeyUpListener",
    value: function removeKeyUpListener(key, handler) {
      this.handlers[key].upHandlers[this.handlers[key].upHandlerIndices[handler]] = this.handlers[key].upHandlers[this.handlers[key].upHandlers.length - 1];
      this.handlers[key].upHandlers.splice(this.handlers[key].upHandlers.length - 1, 1);
      delete this.handlers[key].upHandlerIndices[handler];
    }
  }, {
    key: "runKeyDownHandlers",
    value: function runKeyDownHandlers(e) {
      var key = this.handlers[e.keyCode];
      if (!key || key.down) {
        return;
      }
      e.preventDefault();
      key.down = true;
      handleEvent(key.downHandlers, e);
    }
  }, {
    key: "runKeyUpHandlers",
    value: function runKeyUpHandlers(e) {
      var key = this.handlers[e.keyCode];
      if (!key) {
        return;
      }
      e.preventDefault();
      key.down = false;
      handleEvent(key.upHandlers, e);
    }
  }]);

  return Input;
}();

var input = new Input();
input.turnOn();

module.exports = input;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
    function State() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, State);

        Object.assign(this, args);
    }

    _createClass(State, [{
        key: "enter",
        value: function enter() {
            //Override
        }
    }, {
        key: "exit",
        value: function exit() {
            //Override
        }
    }, {
        key: "message",
        value: function message(e) {
            //Override
        }
    }, {
        key: "update",
        value: function update() {
            //Override
        }
    }]);

    return State;
}();

module.exports = State;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var END_TAG = '$';

var Stack = __webpack_require__(21),
    sin = Math.sin,
    cos = Math.cos,
    vectorInstance = new Vector(),
    values = new Stack(),
    sizeStack = new Stack();

sizeStack.push(0);
var size = 0;

function Vector() {};

var $ = function $(v) {
  values.push(v);
  // sizeStack.push(v.length);
  // size = sizeStack.peek();
  return vectorInstance;
};

Object.defineProperty(Vector.prototype, END_TAG, {
  get: function get() {
    // sizeStack.pop();
    // size = sizeStack.peek();
    return values.pop();
  }
});

// Functions

Vector.prototype.plus = function (x) {
  if (Array.isArray(x)) {
    return this.plusVector(x);
  } else {
    return this.plusScalar(x);
  }
};

Vector.prototype.plusScalar = function (s) {
  var v = values.pop();
  var size = v.length;

  // Selects appropriate version for vector/matrix size--no logic branching, no loops, lazily evaluated, for optimal(?) performance
  var functionVersion = {
    2: function _() {
      return [v[0] + s, v[1] + s];
    },
    3: function _() {
      return [v[0] + s, v[1] + s, v[2] + s];
    },
    4: function _() {
      return [v[0] + s, v[1] + s, v[2] + s, v[3] + s];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.plusVector = function (v) {
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function _() {
      return [u[0] + v[0], u[1] + v[1]];
    },
    3: function _() {
      return [u[0] + v[0], u[1] + v[1], u[2] + v[2]];
    },
    4: function _() {
      return [u[0] + v[0], u[1] + v[1], u[2] + v[2], u[3] + v[3]];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.minusVector = function (v) {
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function _() {
      return [u[0] - v[0], u[1] - v[1]];
    },
    3: function _() {
      return [u[0] - v[0], u[1] - v[1], u[2] - v[2]];
    },
    4: function _() {
      return [u[0] - v[0], u[1] - v[1], u[2] - v[2], u[3] - v[3]];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.timesScalar = function (s) {
  var v = values.pop();
  var size = v.length;
  var functionVersion = {
    2: function _() {
      return [v[0] * s, v[1] * s];
    },
    3: function _() {
      return [v[0] * s, v[1] * s, v[2] * s];
    },
    4: function _() {
      return [v[0] * s, v[1] * s, v[2] * s, v[3] * s];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.timesVector = function (v) {
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function _() {
      return [u[0] * v[0], u[1] * v[1]];
    },
    3: function _() {
      return [u[0] * v[0], u[1] * v[1], u[2] * v[2]];
    },
    4: function _() {
      return [u[0] * v[0], u[1] * v[1], u[2] * v[2], u[3] * v[3]];
    }

  }[v.length];
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.timesMatrix = function (m) {
  var v = values.pop();
  var size = v.length;
  var functionVersion = {
    3: function _() {
      return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]];
    },
    4: function _() {
      return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2] + m[3] * v[3], m[4] * v[0] + m[5] * v[1] + m[6] * v[2] + m[7] * v[3], m[8] * v[0] + m[9] * v[1] + m[10] * v[2] + m[11] * v[3], m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3]];
    },
    16: function _() {
      return [m[0] * v[0] + m[1] * v[4] + m[2] * v[8] + m[3] * v[12], m[0] * v[1] + m[1] * v[5] + m[2] * v[9] + m[3] * v[13], m[0] * v[2] + m[1] * v[6] + m[2] * v[10] + m[3] * v[14], m[0] * v[3] + m[1] * v[7] + m[2] * v[11] + m[3] * v[15], m[4] * v[0] + m[5] * v[4] + m[6] * v[8] + m[7] * v[12], m[4] * v[1] + m[5] * v[5] + m[6] * v[9] + m[7] * v[13], m[4] * v[2] + m[5] * v[6] + m[6] * v[10] + m[7] * v[14], m[4] * v[3] + m[5] * v[7] + m[6] * v[11] + m[7] * v[15], m[8] * v[0] + m[9] * v[4] + m[10] * v[8] + m[11] * v[12], m[8] * v[1] + m[9] * v[5] + m[10] * v[9] + m[11] * v[13], m[8] * v[2] + m[9] * v[6] + m[10] * v[10] + m[11] * v[14], m[8] * v[3] + m[9] * v[7] + m[10] * v[11] + m[11] * v[15], m[12] * v[0] + m[13] * v[4] + m[14] * v[8] + m[15] * v[12], m[12] * v[1] + m[13] * v[5] + m[14] * v[9] + m[15] * v[13], m[12] * v[2] + m[13] * v[6] + m[14] * v[10] + m[15] * v[14], m[12] * v[3] + m[13] * v[7] + m[14] * v[11] + m[15] * v[15]];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.times = function () {
  for (var _len = arguments.length, x = Array(_len), _key = 0; _key < _len; _key++) {
    x[_key] = arguments[_key];
  }

  if (x.length === 1) {
    return this.timesScalar(x);
  } else if (x.length === 16) {
    return this.timesMatrix.apply(this, x);
  } else {
    return this.timesVector.apply(this, x);
  }
};

Vector.prototype.divideByScalar = function (s) {
  var v = values.pop();
  var size = v.length;
  var functionVersion = {
    2: function _() {
      return [v[0] / s, v[1] / s];
    },
    3: function _() {
      return [v[0] / s, v[1] / s, v[2] / s];
    },
    4: function _() {
      return [v[0] / s, v[1] / s, v[2] / s, v[3] / s];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.divideByVector = function (v) {
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function _() {
      return [u[0] / v[0], u[1] / v[1]];
    },
    3: function _() {
      return [u[0] / v[0], u[1] / v[1], u[2] / v[2]];
    },
    4: function _() {
      return [u[0] / v[0], u[1] / v[1], u[2] / v[2], u[3] / v[3]];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.divideBy = function (x) {
  if (Array.isArray(x)) {
    return this.divideByVector(x);
  } else {
    return this.divideByScalar(x);
  }
};

Vector.prototype.dot = function (v) {
  var u = values.pop();
  var size = u.length;
  var functionVersion = {
    2: function _() {
      return u[0] * v[0] + u[1] * v[1];
    },
    3: function _() {
      return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
    },
    4: function _() {
      return u[0] * v[0] + u[1] * v[1] + u[2] * v[2] + u[3] * v[3];
    }
  };
  values.push(functionVersion[size]());
  return this;
};

Vector.prototype.mix = function (v) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;

  values.push(this.timesScalar(1 - t).plusVector($(v).timesScalar(t)[END_TAG])[END_TAG]);
  return this;
};

Vector.prototype.squaredLength = function () {
  values.push(this.dot(values.peek())[END_TAG]);
  return this;
};

Vector.prototype.length = function () {
  values.push(Math.sqrt(this.squaredLength()[END_TAG]));
  return this;
};

Vector.prototype.distanceTo = function (b) {
  var a = values.pop();
  var vec = $(b).minusVector(a).$;
  values.push($(vec).length().$);
  return this;
};

Vector.prototype.squaredDistanceTo = function (b) {
  var a = values.pop();
  var vec = $(b).minusVector(a).$;
  values.push($(vec).squaredLength().$);
  return this;
};

Vector.prototype.nearest = function (a, b) {
  var v = values.pop();
  var distA = $(v).squaredDistanceTo(a).$;
  var distB = $(v).squaredDistanceTo(b).$;
  values.push(distA < distB ? a : b);
  return this;
};

// https://stackoverflow.com/questions/1560492/how-to-tell-whether-a-point-is-to-the-right-or-left-side-of-a-line#comment28468479_3461533
Vector.prototype.isRightOf = function (r) {
  var p = values.pop();
  values.push((r[2] - r[0]) * (p[1] - r[1]) > (r[3] - r[1]) * (p[0] - r[0]));
  return this;
};

Vector.prototype.sideOfLine = function (r) {
  var p = values.pop();
  values.push(Math.sign((r[2] - r[0]) * (p[1] - r[1]) - (r[3] - r[1]) * (p[0] - r[0])));
  return this;
};

Vector.prototype.unit = function () {
  var value = values.peek();
  if (value[0] === 0 && value[1] === 0 && (value.length === 2 || value[2] === 0)) {
    values.pop();
    values.push([0, 0, 0].slice(-value.length));
  } else {
    values.push(this.divideByScalar($(values.peek()).length()[END_TAG])[END_TAG]);
  }
  return this;
};

Vector.prototype.turnLeft = function () {
  var v = values.pop();
  values.push([-v[1], v[0]]);
  return this;
};

Vector.prototype.turnRight = function () {
  var v = values.pop();
  values.push([v[1], -v[0]]);
  return this;
};

Vector.prototype.leftNormal = function () {
  var v = values.pop();
  values.push($(v).unit().turnLeft()[END_TAG]);
  return this;
};

Vector.prototype.rightNormal = function () {
  var v = values.pop();
  values.push($(v).unit().turnRight()[END_TAG]);
  return this;
};

Vector.prototype.rotate2d = function (angle) {
  var v = values.pop();
  var size = v.length;
  v[0] = v[0] * cos(angle) - v[1] * sin(angle);
  v[1] = v[0] * sin(angle) + v[1] * cos(angle);
  values.push(v);
  return this;
};

Vector.prototype.angle2d = function () {
  var v = values.pop();
  var size = v.length;
  values.push(Math.atan2(v[1], v[0]));
  return this;
};

Vector.prototype.directionTo = function (v) {
  var u = values.pop();
  var size = u.length;
  values.push(this.minusVector(u).unit()[END_TAG]);
  return this;
};

Vector.prototype.projectedLength = function (v) {
  values.push(Math.sqrt(Math.abs(this.dot(v)[END_TAG])));
  return this;
};

Vector.prototype.scalarProjection = function (b) {
  var a = values.pop();
  var bLength = $(b).length().$;
  values.push(bLength === 0 ? [0, 0, 0, 0].slice(-a.length) : $(b).unit().times($(a).dot(b).$ / $(b).squaredLength().$).$);
  return this;
};

// Vector.prototype.rejection = function(b){
//   var a = values.pop();
//   values.push()
// }

// Todo: Add versions for other size matrices
Vector.prototype.transpose = function () {
  var v = values.pop();
  var size = v.length;
  values.push([v[0], v[4], v[8], v[12], v[1], v[5], v[9], v[13], v[2], v[6], v[10], v[14], v[3], v[7], v[11], v[15]]);
  return this;
};

Vector.prototype.rotate = function (_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      x = _ref2[0],
      y = _ref2[1],
      z = _ref2[2];

  var v = values.pop();
  var size = v.length;
  if (size === 2) {
    values.push(this.rotate2d(x)[END_TAG]);
    return this;
  }
  var xRotation = [1, 0, 0, 0, 0, cos(x), -sin(x), 0, 0, sin(x), cos(x), 0, 0, 0, 0, 1],
      yRotation = [cos(y), 0, sin(y), 0, 0, 1, 0, 0, -sin(y), 0, cos(y), 0, 0, 0, 0, 1],
      zRotation = [cos(z), -sin(z), 0, 0, sin(z), cos(z), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  values.push($(v).timesMatrix(xRotation).timesMatrix(yRotation).timesMatrix(zRotation)[END_TAG]);
  return this;
};

Vector.prototype.cross = function (b) {
  var a = values.pop();
  var size = a.length;
  values.push([a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]);
  return this;
};

Vector.prototype.coordPairToVector = function () {
  var coords = values.pop();
  values.push($([coords[2], coords[3]]).minusVector([coords[0], coords[1]]).$);
  return this;
};

Vector.prototype.angleTo = function (b) {
  var a = values.pop();
  values.push(Math.acos($(a).dot(b).$));
  return this;
};

Vector.prototype.rotateToPlane = function (planeNormal) {
  var myAxis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 1, 0];

  var v = values.pop();
  var rotationMatrix = [];
  if (planeNormal[0] != 0 || planeNormal[1] != 0 || planeNormal[2] != 0) {
    var angle = Math.acos($(myAxis).dot(planeNormal).$),
        axis = $(myAxis).cross(planeNormal).unit().$,
        c = cos(angle),
        t = 1 - c,
        s = sin(angle),
        _axis = _slicedToArray(axis, 3),
        x = _axis[0],
        y = _axis[1],
        z = _axis[2],
        tX = t * x,
        tY = t * y,
        tZ = t * z,
        tXY = tX * y,
        tYX = tXY,
        tXX = tX * x,
        tYZ = tY * z,
        tZY = tYZ,
        tYY = tY * y,
        tXZ = tX * z,
        tZX = tXZ,
        tZZ = tZ * z,
        xS = x * s,
        yS = y * s,
        zS = z * s,
        rotationMatrix = [tXX + c, tYX - zS, tZX + yS, tXY + zS, tYY + c, tZY - xS, tXZ + yS, tYZ + xS, tZZ + c];
  } else {
    rotationMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  values.push($(v).timesMatrix(rotationMatrix).$);
  return this;
};

Vector.prototype.toHexString = function () {
  var v = values.pop();
  var r = ('00' + v[0].toString(16)).slice(-2),
      g = ('00' + v[1].toString(16)).slice(-2),
      b = ('00' + v[2].toString(16)).slice(-2);
  values.push(r + g + b);
  return this;
};

Vector.prototype.fromHexString = function () {
  var v = values.pop();
  var arr = [parseInt(v.slice(0, 1), 16), parseInt(v.slice(2, 3), 16), parseInt(v.slice(4, 5), 16)];
  values.push(arr);
  return this;
};

Vector.prototype.hexColor = function () {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var v = values.pop();
  if (min === -1) v = $(v).plus(1).divideBy(2).$;
  v = $(v).times(256).$;
  var r = ('00' + v[0].toString(16)).slice(-2),
      g = ('00' + v[1].toString(16)).slice(-2),
      b = ('00' + v[2].toString(16)).slice(-2);
  values.push(r + g + b);
  return this;
};

//Input is a line segment [x1, y1, x2, y2]
Vector.prototype.findParametricEquation = function () {
  var outValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var r = values.peek();
  outValues.slope = (r[3] - r[1]) / (r[2] - r[0]);
  outValues.yIntercept = r[1] - slope * r[0];
  return this;
};

Vector.prototype.sqDistanceToLineSegment = function (lineSeg) {
  var p = values.pop();
  var length = $([lineSeg[0], lineSeg[1]]).distanceTo([lineSeg[2], lineSeg[3]]).$;
  if (length == 0) {
    values.push($(p).distanceTo([lineSeg[0], lineSeg[1]]).$);
    return this;
  }
  var t = ((p[0] - lineSeg[0]) * (lineSeg[2] - lineSeg[0]) + (p[0] - lineSeg[1]) * (lineSeg[3] - lineSeg[1])) / length;
  values.push(t);
  return this;
};

Vector.prototype.distanceToLineSegment = function (lineSeg) {
  var p = values.pop();
  var sqDist = $(p).sqDistanceToLineSegment(lineSeg).$;
  if (sqDist == 0) {
    values.push(0);
  } else {
    values.push(Math.sqrt(sqDist));
  }
  return this;
};

Vector.prototype.inverse = function () {
  var r = Vector.IDENTITY_MATRIX,
      m = values.pop();
  var size = m.length;

  r[0] = m[5] * m[10] * m[15] - m[5] * m[14] * m[11] - m[6] * m[9] * m[15] + m[6] * m[13] * m[11] + m[7] * m[9] * m[14] - m[7] * m[13] * m[10];
  r[1] = -m[1] * m[10] * m[15] + m[1] * m[14] * m[11] + m[2] * m[9] * m[15] - m[2] * m[13] * m[11] - m[3] * m[9] * m[14] + m[3] * m[13] * m[10];
  r[2] = m[1] * m[6] * m[15] - m[1] * m[14] * m[7] - m[2] * m[5] * m[15] + m[2] * m[13] * m[7] + m[3] * m[5] * m[14] - m[3] * m[13] * m[6];
  r[3] = -m[1] * m[6] * m[11] + m[1] * m[10] * m[7] + m[2] * m[5] * m[11] - m[2] * m[9] * m[7] - m[3] * m[5] * m[10] + m[3] * m[9] * m[6];

  r[4] = -m[4] * m[10] * m[15] + m[4] * m[14] * m[11] + m[6] * m[8] * m[15] - m[6] * m[12] * m[11] - m[7] * m[8] * m[14] + m[7] * m[12] * m[10];
  r[5] = m[0] * m[10] * m[15] - m[0] * m[14] * m[11] - m[2] * m[8] * m[15] + m[2] * m[12] * m[11] + m[3] * m[8] * m[14] - m[3] * m[12] * m[10];
  r[6] = -m[0] * m[6] * m[15] + m[0] * m[14] * m[7] + m[2] * m[4] * m[15] - m[2] * m[12] * m[7] - m[3] * m[4] * m[14] + m[3] * m[12] * m[6];
  r[7] = m[0] * m[6] * m[11] - m[0] * m[10] * m[7] - m[2] * m[4] * m[11] + m[2] * m[8] * m[7] + m[3] * m[4] * m[10] - m[3] * m[8] * m[6];

  r[8] = m[4] * m[9] * m[15] - m[4] * m[13] * m[11] - m[5] * m[8] * m[15] + m[5] * m[12] * m[11] + m[7] * m[8] * m[13] - m[7] * m[12] * m[9];
  r[9] = -m[0] * m[9] * m[15] + m[0] * m[13] * m[11] + m[1] * m[8] * m[15] - m[1] * m[12] * m[11] - m[3] * m[8] * m[13] + m[3] * m[12] * m[9];
  r[10] = m[0] * m[5] * m[15] - m[0] * m[13] * m[7] - m[1] * m[4] * m[15] + m[1] * m[12] * m[7] + m[3] * m[4] * m[13] - m[3] * m[12] * m[5];
  r[11] = -m[0] * m[5] * m[11] + m[0] * m[9] * m[7] + m[1] * m[4] * m[11] - m[1] * m[8] * m[7] - m[3] * m[4] * m[9] + m[3] * m[8] * m[5];

  r[12] = -m[4] * m[9] * m[14] + m[4] * m[13] * m[10] + m[5] * m[8] * m[14] - m[5] * m[12] * m[10] - m[6] * m[8] * m[13] + m[6] * m[12] * m[9];
  r[13] = m[0] * m[9] * m[14] - m[0] * m[13] * m[10] - m[1] * m[8] * m[14] + m[1] * m[12] * m[10] + m[2] * m[8] * m[13] - m[2] * m[12] * m[9];
  r[14] = -m[0] * m[5] * m[14] + m[0] * m[13] * m[6] + m[1] * m[4] * m[14] - m[1] * m[12] * m[6] - m[2] * m[4] * m[13] + m[2] * m[12] * m[5];
  r[15] = m[0] * m[5] * m[10] - m[0] * m[9] * m[6] - m[1] * m[4] * m[10] + m[1] * m[8] * m[6] + m[2] * m[4] * m[9] - m[2] * m[8] * m[5];

  // In case of divide by zero error, if det is 0 just leave unchanged
  var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12] || 1;
  for (var i = 0; i < 16; i++) {
    r[i] /= det;
  }values.push(r);
  return this;
};

module.exports = $;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var State = __webpack_require__(4);

var DebugState = function (_State) {
  _inherits(DebugState, _State);

  function DebugState() {
    _classCallCheck(this, DebugState);

    return _possibleConstructorReturn(this, (DebugState.__proto__ || Object.getPrototypeOf(DebugState)).apply(this, arguments));
  }

  _createClass(DebugState, [{
    key: 'onMouseUp',
    value: function onMouseUp() {}
  }, {
    key: 'onMouseDown',
    value: function onMouseDown() {}
  }, {
    key: 'onMouseMove',
    value: function onMouseMove() {}
  }, {
    key: 'onKeyDown',
    value: function onKeyDown() {}
  }, {
    key: 'onKeyUp',
    value: function onKeyUp() {}
  }]);

  return DebugState;
}(State);

module.exports = DebugState;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = __webpack_require__(4);

var count = 1;

var StateMachine = function () {
    function StateMachine() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, StateMachine);

        this.name = args.name || "StateMachine" + count++;
        this.states = args.states || {};
        this.currentState = this.states[args.initialState];
        this.currentStateName = args.initialState;

        this.controls = {};
        var control, controlArgs;
        args.controls = args.controls || {};
        for (var name in args.controls) {
            control = args.controls[name];
            controlArgs = control.args || {};
            controlArgs.owner = this;
            this.controls[name] = new control.kind(controlArgs);
        }
    }

    _createClass(StateMachine, [{
        key: "update",
        value: function update() {
            this.currentState.update.call(this);
        }
    }, {
        key: "message",
        value: function message(msg, e) {
            this.currentState.message.call(this, msg, e);
        }
    }, {
        key: "changeState",
        value: function changeState(newStateName, e) {
            if (this.currentStateName == newStateName) {
                return;
            }
            this.currentState.exit.call(this, e);
            this.currentState = this.states[newStateName];
            this.currentStateName = newStateName;
            this.currentState.enter.call(this, e);
        }
    }]);

    return StateMachine;
}();

module.exports = StateMachine;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AssetManager = __webpack_require__(13);
var TileMap = __webpack_require__(27);
var renderer = __webpack_require__(0);
var objectValues = __webpack_require__(20);

var count = 1;

var Scene = function () {
    function Scene(args) {
        _classCallCheck(this, Scene);

        this.name = args.name || "Scene" + count++;
        this.game = null;
        this.objectIndices = {};
        this.objects = [];
        this.initialized = false;
        this.assetManager = new AssetManager(args.assets);
        this.tileMap = new TileMap({
            mapSrc: args.tileMapSrc,
            key: args.tileMapKey
        });
        this.enter = args.enter || this.enter;
        this.exit = args.exit || this.exit;
        this.initialObjectList = args.objects || [];
        this.screenX = 0;
        this.screenY = 0;
    }

    _createClass(Scene, [{
        key: 'resetObjects',
        value: function resetObjects() {
            this.objectIndices = {};
            this.objects = [];
            for (var i = 0; i < this.initialObjectList.length; i++) {
                this.initialObjectList[i].reset();
            }
            for (var _i = 0; _i < this.initialObjectList.length; _i++) {
                new this.initialObjectList[_i]({ scene: this });
            }
            this.init();
        }
    }, {
        key: 'setGame',
        value: function setGame(game) {
            this.game = game;
        }
    }, {
        key: 'enter',
        value: function enter() {
            var _this = this;

            this.game.stop();
            this.resetObjects();
            return new Promise(function (resolve, reject) {
                // return for Promise chainability
                _this.assetManager.load().then(function () {
                    _this.tileMap.init().then(function () {
                        _this.game.start();
                        resolve();
                    });
                });
            });
        }
    }, {
        key: 'exit',
        value: function exit() {}
    }, {
        key: 'init',
        value: function init() {
            var controls = this.getAllControls();
            for (var i = 0; i < controls.length; i++) {
                controls[i].init();
            }
        }
    }, {
        key: 'getAllControls',
        value: function getAllControls() {
            var arr = [];
            for (var i = 0; i < this.objects.length; i++) {
                arr.push.apply(arr, _toConsumableArray(objectValues(this.objects[i].controls)));
            }
            return arr;
        }
    }, {
        key: 'getControlsByName',
        value: function getControlsByName(name) {
            var arr = [];
            for (var i = 0; i < this.objects.length; i++) {
                arr.push.apply(arr, _toConsumableArray(this.objects[i].getControlsByName(name)));
            }
            return arr;
        }
    }, {
        key: 'getControlsByTag',
        value: function getControlsByTag(tag) {
            var arr = [];
            for (var i = 0; i < this.objects.length; i++) {
                arr.push.apply(arr, _toConsumableArray(this.objects[i].getControlsByTag(tag)));
            }
            return arr;
        }
    }, {
        key: 'getObjectByName',
        value: function getObjectByName(name) {
            return this.objects[this.objectIndices[name]];
        }
    }, {
        key: 'registerObject',
        value: function registerObject(obj) {
            this.objects.push(obj);
            this.objectIndices[obj.name] = this.objects.length - 1;
        }
    }, {
        key: 'update',
        value: function update() {
            for (var i = 0; i < this.objects.length; i++) {
                this.objects[i].update();
            }
        }
    }]);

    return Scene;
}();

module.exports = Scene;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stack = __webpack_require__(21);
var StateMachine = __webpack_require__(7);
var Scene = __webpack_require__(8);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);

var screenWidth = 320;
var screenHeight = 240;

var instance;
var loop;
var lastTime;

var Game = function () {
  function Game(args) {
    _classCallCheck(this, Game);

    if (instance != null) {
      console.warn('Trying to instantiate more than one Game, returning original instance');
      return instance;
    }

    this.debugManager = new (__webpack_require__(44))({ game: this });
    this.debugMode = false;

    this.scenes = args.scenes || {};
    this.sceneStack = new Stack();
    this.currentTime = 0;
    this.dt = 0;
    this.running = false;

    for (var i in this.scenes) {
      this.scenes[i].setGame(this);
      this.scenes[i].init();
    }

    this.tick = this.tick.bind(this);

    instance = this;
  }

  _createClass(Game, [{
    key: 'push',
    value: function push(sceneName) {
      if (this.currentScene) {
        this.currentScene.exit(this, this.currentScene);
      }
      this.sceneStack.push(this.scenes[sceneName]);
      this.updateCurrent();
    }
  }, {
    key: 'pop',
    value: function pop(scene) {
      this.currentScene.exit(this, this.currentScene);
      this.sceneStack.pop();
      this.updateCurrent();
    }
  }, {
    key: 'replaceTop',
    value: function replaceTop(sceneName) {
      this.currentScene.exit(this, this.currentScene);
      this.sceneStack.pop();
      this.sceneStack.push(this.scenes[sceneName]);
      this.updateCurrent();
    }
  }, {
    key: 'updateCurrent',
    value: function updateCurrent() {
      this.currentScene = this.sceneStack.peek();
      Camera.reset();
      this.currentScene.enter(this, this.currentScene);
    }
  }, {
    key: 'start',
    value: function start() {
      if (this.running) {
        return;
      }
      lastTime = null;
      loop = requestAnimationFrame(this.tick);
      this.running = true;
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.running) {
        return;
      }
      cancelAnimationFrame(loop);
      this.running = false;
    }
  }, {
    key: 'tick',
    value: function tick(timestamp) {
      loop = requestAnimationFrame(this.tick);
      this.currentTime = timestamp;
      if (!lastTime) {
        lastTime = timestamp;
      }
      this.dt = timestamp - lastTime;
      this.update();
      lastTime = timestamp;
    }
  }, {
    key: 'advanceFrame',
    value: function advanceFrame() {
      this.currentTime = lastTime = Date.now();
      this.dt = 17;
      this.update();
    }
  }, {
    key: 'update',
    value: function update() {
      this.currentScene.update();
    }
  }], [{
    key: 'getScreenWidth',
    value: function getScreenWidth() {
      return screenWidth;
    }
  }, {
    key: 'getScreenHeight',
    value: function getScreenHeight() {
      return screenHeight;
    }
  }, {
    key: 'setScreenWidth',
    value: function setScreenWidth(value) {
      screenWidth = value;
    }
  }, {
    key: 'setScreenHeight',
    value: function setScreenHeight(value) {
      screenWidth = value;
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StateMachine = __webpack_require__(7);
var objectValues = __webpack_require__(20);

var SceneObject = function (_StateMachine) {
    _inherits(SceneObject, _StateMachine);

    function SceneObject(args) {
        _classCallCheck(this, SceneObject);

        var _this = _possibleConstructorReturn(this, (SceneObject.__proto__ || Object.getPrototypeOf(SceneObject)).call(this, args));

        _this.scene = args.scene;
        _this.tag = args.tag || '';
        _this.scene.registerObject(_this);
        _this.active = args.active || false;
        return _this;
    }

    _createClass(SceneObject, [{
        key: 'getControlsByName',
        value: function getControlsByName(name) {
            return objectValues(this.controls).filter(function (control) {
                return control.name == name;
            });
        }
    }, {
        key: 'getControlsByTag',
        value: function getControlsByTag(tag) {
            return objectValues(this.controls).filter(function (control) {
                return control.tag == tag;
            });
        }
    }, {
        key: 'getGame',
        value: function getGame() {
            return this.scene.game;
        }
    }], [{
        key: 'reset',
        value: function reset() {}
    }]);

    return SceneObject;
}(StateMachine);

module.exports = SceneObject;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var $ = __webpack_require__(5);

var MapCollider = function (_Control) {
  _inherits(MapCollider, _Control);

  function MapCollider(args) {
    _classCallCheck(this, MapCollider);

    args.name = 'mapCollider';

    var _this = _possibleConstructorReturn(this, (MapCollider.__proto__ || Object.getPrototypeOf(MapCollider)).call(this, args));

    _this.tags = args.tags;
    _this.checkPoint = args.checkPoint;
    _this.onHit = args.onHit || function () {
      return false;
    };
    _this.onNoCollision = args.onNoCollision || function () {};
    _this.enabled = args.enabled || true;
    return _this;
  }

  _createClass(MapCollider, [{
    key: 'getWorldCheckPoint',
    value: function getWorldCheckPoint() {
      return $(this.checkPoint).plusVector(this.owner.controls.transform.position).$;
    }
  }, {
    key: 'getNextWorldCheckPoint',
    value: function getNextWorldCheckPoint() {
      return $(this.checkPoint).plusVector(this.owner.controls.velocity.previewNewPosition()).$;
    }
  }]);

  return MapCollider;
}(Control);

module.exports = MapCollider;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);

var ANIM_FRAMERATE = 200;
var LEFT = false,
    RIGHT = true;

// animations: {
//     stand: ['walk00'],
//     walk: ['walk00', 'walk01']
// }

var Sprite = function (_Control) {
    _inherits(Sprite, _Control);

    function Sprite() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Sprite);

        var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, args));

        _this.name = 'sprite';
        _this.tag = args.tag;
        _this.animating = args.animating == undefined ? true : args.animating;
        _this.spritesheetName = args.spritesheetName;
        _this.spritesheetData = args.spritesheetData;
        _this.animations = args.animations;
        _this.layer = args.layer;
        _this.offset = args.offset || [0, 0];
        _this.currentAnimation;
        _this.currentAnimationName;
        _this.currentFrameNum = 0;
        _this.elapsedTime = 0;
        _this.looping = true;
        _this.finished = false;
        _this.enabled = true;
        _this.onFinished = function () {};
        _this.setAnimation.apply(_this, _toConsumableArray(args.initialAnimation));
        return _this;
    }

    _createClass(Sprite, [{
        key: 'update',
        value: function update() {
            if (this.animating) {
                this.advanceFrame();
            }
        }
    }, {
        key: 'advanceFrame',
        value: function advanceFrame() {
            this.elapsedTime += this.getGame().dt;
            if (this.looping) {
                this.elapsedTime = this.elapsedTime % (this.numFrames * ANIM_FRAMERATE);
            } else if (!this.finished) {
                if (this.elapsedTime >= this.numFrames * ANIM_FRAMERATE) {
                    this.onFinished();
                    this.finished = true;
                }
            }
            this.currentFrameNum = Math.floor(this.elapsedTime / ANIM_FRAMERATE);
            this.currentFrame = this.currentAnimation[this.currentFrameNum];
        }
    }, {
        key: 'setFrame',
        value: function setFrame(num) {
            this.currentFrameNum = Math.max(Math.min(num, this.currentAnimation.length - 1), 0);
            this.currentFrame = this.currentAnimation[this.currentFrameNum];
        }
    }, {
        key: 'setAnimation',
        value: function setAnimation(name) {
            var looping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var onFinished = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

            this.looping = looping;
            this.finished = false;
            this.onFinished = onFinished;
            this.currentAnimationName = name;
            this.currentAnimation = this.animations[name];
            this.currentFrameNum = 0;
            this.currentFrame = this.currentAnimation[this.currentFrameNum];
            this.numFrames = this.currentAnimation.length;
            this.elapsedTime = 0;
        }
    }]);

    return Sprite;
}(Control);

module.exports = Sprite;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IMG_REGEX = /.*\.(jpg|png|gif)/;
var AUDIO_REGEX = /.*\.(wav|mp3)/;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

// Asset src list follows this form:
// var assetSrcs = {
//     sprite: "assets/spritesheets/sheet00.png",
//     boing: "assets/boing.wav",
//     caw: "assets/caw.wav",
//     crunch: "assets/crunch.wav",
//     crunch2: "assets/crunch2.wav",
//     flap: "assets/flap.wav",
//     screech: "assets/pusou.wav",
//     slime: "assets/blop.wav"
// }

var AssetManager = function () {
    function AssetManager(assetSrcs) {
        _classCallCheck(this, AssetManager);

        this.assets = {};
        this.assetSrcs = assetSrcs;
        this.currentlyPlayingTracks = {};
        this.loadPercent = 0;
    }

    _createClass(AssetManager, [{
        key: 'dump',
        value: function dump() {
            this.assets = {};
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;

            var assetLoadPromises = [];
            for (name in this.assetSrcs) {
                assetLoadPromises.push(this._assetLoadPromise(name, this.assetSrcs[name]));
            }
            return new Promise(function (res, rej) {
                Promise.all(assetLoadPromises).then(function () {
                    _this.loadPercent = 0;
                    res();
                });
            });
        }
    }, {
        key: 'onLoadProgress',
        value: function onLoadProgress(loadPercent) {}
    }, {
        key: 'loop',
        value: function loop(clipName) {
            if (!this.assets[clipName]) {
                console.error('Asset ' + clipName + ' does not exist!');
                return;
            }
            var src = audioCtx.createBufferSource();
            src.buffer = this.assets[clipName];
            src.connect(audioCtx.destination);
            src.loop = true;
            src.start(0);
            this.currentlyPlayingTracks[clipName] = src;
        }
    }, {
        key: 'stop',
        value: function stop(clipName) {
            if (!this.currentlyPlayingTracks[clipName]) {
                return;
            }
            this.currentlyPlayingTracks[clipName].stop();
            delete this.currentlyPlayingTracks[clipName];
        }
    }, {
        key: 'play',
        value: function play(clipName) {
            if (!this.assets[clipName]) {
                console.error('Asset ' + clipName + ' does not exist!');
                return;
            }
            var src = audioCtx.createBufferSource();
            src.buffer = this.assets[clipName];
            src.connect(audioCtx.destination);
            src.start(0);
        }
    }, {
        key: '_assetLoadPromise',
        value: function _assetLoadPromise(name, src) {
            var _this2 = this;

            return new Promise(function (res, rej) {
                if (src.match(IMG_REGEX)) {
                    _this2._resolveImgLoad(name, src, res, rej);
                } else if (src.match(AUDIO_REGEX)) {
                    _this2._resolveAudioLoad(name, src, res, rej);
                }
            });
        }
    }, {
        key: '_incrementLoadPercent',
        value: function _incrementLoadPercent() {
            this.loadPercent = Math.ceil(this.loadPercent + 1 / Object.keys(this.assetSrcs).length * 100);
            this.onLoadProgress(this.loadPercent);
        }

        // TODO: Load error handling

    }, {
        key: '_resolveImgLoad',
        value: function _resolveImgLoad(name, src, resolve, reject) {
            var _this3 = this;

            if (this.assets[name]) {
                this._incrementLoadPercent();
                resolve();
            } else {
                var img = new Image();
                img.onload = function () {
                    _this3._incrementLoadPercent();
                    _this3.assets[name] = img;
                    resolve();
                };
                img.onerror = reject;
                img.src = src;
            }
        }
    }, {
        key: '_resolveAudioLoad',
        value: function _resolveAudioLoad(name, src, resolve, reject) {
            var _this4 = this;

            if (this.assets[name]) {
                this._incrementLoadPercent();
                resolve();
            } else {
                var req = new XMLHttpRequest();
                req.open('GET', src, true);
                req.responseType = 'arraybuffer';
                req.onload = function () {
                    audioCtx.decodeAudioData(req.response, function (buffer) {
                        _this4._incrementLoadPercent();
                        _this4.assets[name] = buffer;
                        resolve();
                    });
                };
                req.send();
            }
        }
    }]);

    return AssetManager;
}();

module.exports = AssetManager;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var Game = __webpack_require__(9);
var Math2 = __webpack_require__(56);
var Camera = __webpack_require__(2);

var ObjectPoolEngine = function (_Control) {
    _inherits(ObjectPoolEngine, _Control);

    function ObjectPoolEngine(args) {
        _classCallCheck(this, ObjectPoolEngine);

        var _this = _possibleConstructorReturn(this, (ObjectPoolEngine.__proto__ || Object.getPrototypeOf(ObjectPoolEngine)).call(this, args));

        _this.tag = args.tag;
        _this.nextObjectPlacementTime = 0;
        _this.activeComponents = [];
        _this.inactiveComponents = [];
        _this.scrollingEngine = null;
        _this.deltaPixels = 0;
        _this.waitTime = 0;
        _this.layer = args.layer || 'foreground';
        _this.objectFrequency = args.objectFrequency || 0.75;
        _this.minInterval = args.minInterval || 50;
        _this.maxInterval = args.maxInterval || 90;
        _this.lastObjectRightEdge = 0;
        return _this;
    }

    _createClass(ObjectPoolEngine, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            this.lastObjectRightEdge = Camera.getOffset()[0] - Game.getScreenWidth();
            var components = this.owner.scene.getControlsByName('objectpooler').filter(function (objPooler) {
                return objPooler.tag == _this2.tag;
            });
            this.inactiveComponents = components.filter(function (c) {
                return c.owner.currentStateName == 'inactive';
            });
            this.activeComponents = components.filter(function (c) {
                return c.owner.currentStateName != 'inactive';
            });
            for (var i = 0; i < this.inactiveComponents.length; i++) {
                this.inactiveComponents[i].setObjectPool(this);
            }
            for (var _i = 0; _i < this.activeComponents.length; _i++) {
                this.activeComponents[_i].setObjectPool(this);
            }
            this.scrollingEngine = this.owner.scene.getControlsByName('scrollingEngine').find(function (e) {
                return e.layer == _this2.layer;
            });
        }
    }, {
        key: 'returnToPool',
        value: function returnToPool(obj) {
            this.activeComponents.splice(this.activeComponents.indexOf(obj), 1);
            this.inactiveComponents.push(obj);
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.lastObjectRightEdge < Game.getScreenWidth() - Camera.getOffset()[0]) {
                var rand = Math.random();
                if (rand < this.objectFrequency) {
                    var r = Math.floor(Math.random() * (this.inactiveComponents.length - 1));
                    var obj = this.inactiveComponents.splice(r, 1)[0];
                    if (obj) {
                        this.activeComponents.push(obj);
                        obj.activate(Game.getScreenWidth() - Camera.getOffset()[0] - 3); // fudge factor
                        this.lastObjectRightEdge = obj.owner.controls.transform.getBounds()[2];
                    }
                } else {
                    var r = Math.ceil(Math.random() * (this.maxInterval - this.minInterval) + this.minInterval);
                    this.lastObjectRightEdge = -Camera.getOffset()[0] + Game.getScreenWidth() + r;
                }
            }
        }

        //     this.deltaPixels += this.scrollingEngine.scrollAmt
        //     if (this.deltaPixels < this.waitTime - 2){ //Fudge factor
        //         return
        //     }

        //     var rand = this.intervalWidth >= this.maxInterval ? 0 : Math.random()
        //     if (rand < this.objectFrequency) {
        //         var r = Math.floor(Math.random() * (this.inactiveComponents.length -1))
        //         var obj = this.inactiveComponents.splice(r, 1)[0]
        //         if (obj) {
        //             this.activeComponents.push(obj)
        //             var offset = this.intervalWidth == 0 ? this.lastOffset : Math2.clamp(this.lastOffset + Math.ceil(Math.random() * 50 - 25), this.minOffset, this.maxOffset)
        //             this.lastOffset = offset
        //             obj.activate(offset)
        //             this.waitTime = obj.owner.controls.transform.width
        //             this.deltaPixels = 0
        //             this.intervalWidth = 0

        //         }
        //     } else {
        //         this.waitTime = this.minInterval
        //         this.deltaPixels = 0
        //         this.intervalWidth += this.minInterval
        //     }
        // }

    }]);

    return ObjectPoolEngine;
}(Control);

module.exports = ObjectPoolEngine;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);

var count = 0;

var SpriteEngine = function (_Control) {
  _inherits(SpriteEngine, _Control);

  function SpriteEngine(args) {
    _classCallCheck(this, SpriteEngine);

    var _this = _possibleConstructorReturn(this, (SpriteEngine.__proto__ || Object.getPrototypeOf(SpriteEngine)).call(this, args));

    _this.name = 'spriteEngine';
    _this.tag = 'renderer';
    _this.components = [];
    _this.enabled = true;
    _this.layer = args.layer || count++;
    return _this;
  }

  _createClass(SpriteEngine, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.components = this.owner.scene.getControlsByName('sprite').filter(function (e) {
        return e.layer == _this2.layer;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var frameName, frameCoords, spritesheetName;

      for (var i = 0; i < this.components.length; i++) {
        if (!this.components[i].enabled) {
          continue;
        }
        spritesheetName = this.components[i].spritesheetName;
        frameName = this.components[i].currentFrame;
        var frameCoords = this.components[i].spritesheetData.frames[frameName];
        renderer.drawImage(this.owner.scene.assetManager.assets[spritesheetName], frameCoords.x, frameCoords.y, frameCoords.w, frameCoords.h, this.components[i].owner.controls.transform.position[0] + this.components[i].offset[0], this.components[i].owner.controls.transform.position[1] + this.components[i].offset[1], frameCoords.w, frameCoords.h);
        // this.components[i].shouldDraw = false
      }
    }
  }]);

  return SpriteEngine;
}(Control);

SpriteEngine.reset = function () {
  count = 0;
};

module.exports = SpriteEngine;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var $ = __webpack_require__(5);

var Transform = function (_Control) {
  _inherits(Transform, _Control);

  function Transform() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Transform);

    var _this = _possibleConstructorReturn(this, (Transform.__proto__ || Object.getPrototypeOf(Transform)).call(this, args));

    _this.name = "transform";
    _this.position = args.position || [0, 0];
    _this.size = args.size || [0, 0];
    _this.prevPosition = [].concat(_toConsumableArray(_this.position));
    return _this;
  }

  _createClass(Transform, [{
    key: 'getBounds',
    value: function getBounds() {
      return [].concat(_toConsumableArray(this.position), _toConsumableArray($(this.position).plusVector(this.size).$));
    }
  }, {
    key: 'getCenter',
    value: function getCenter() {
      return $(this.position).plusVector($(this.size).timesScalar(0.5).$).$;
    }
  }, {
    key: 'moveTo',
    value: function moveTo(x, y) {
      this._setPrevPosition();
      this.position[0] = x;
      this.position[1] = y;
    }
  }, {
    key: 'moveBy',
    value: function moveBy(x, y) {
      this._setPrevPosition();
      this.position[0] += x;
      this.position[1] += y;
    }
  }, {
    key: 'moveUp',
    value: function moveUp(amt) {
      this._setPrevPosition();
      this.position[1] -= amt;
    }
  }, {
    key: 'moveDown',
    value: function moveDown(amt) {
      this._setPrevPosition();
      this.position[1] += amt;
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft(amt) {
      this._setPrevPosition();
      this.position[0] -= amt;
    }
  }, {
    key: 'moveRight',
    value: function moveRight(amt) {
      this._setPrevPosition();
      this.position[0] += amt;
    }
  }, {
    key: '_setPrevPosition',
    value: function _setPrevPosition() {
      this.prevPosition[0] = this.position[0];
      this.prevPosition[1] = this.position[1];
    }
  }, {
    key: 'update',
    value: function update() {
      this._setPrevPosition();
    }
  }]);

  return Transform;
}(Control);

module.exports = Transform;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DebugState = __webpack_require__(6);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);

var off = new DebugState({
  enter: function enter() {
    input.turnOn();
    this.game.start();
    this.buttons.start.innerHTML = '<i class="fa fa-pause"></i>';
    this.disableAllButtonsExcept(this.buttons.start);
    cancelAnimationFrame(this.updateLoop);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
    this.game.debugMode = false;
  }
});

module.exports = off;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DebugState = __webpack_require__(6);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);

var scroll = new DebugState({
  enter: function enter() {
    this.disableAllButtonsExcept(this.buttons.scroll);
    this.canvas.style.cursor = 'all-scroll';
  },

  exit: function exit() {
    this.enableAllButtons();
    this.canvas.style.cursor = 'default';
  },

  onMouseDown: function onMouseDown(e) {
    if (!this.mouseDown) {
      this.lastMouseX = e.layerX;
      this.lastMouseY = e.layerY;
      this.currentMouseX = e.layerX;
      this.currentMouseY = e.layerY;
      this.mouseDown = true;
    }
  },

  onMouseMove: function onMouseMove(e) {
    this.lastMouseX = this.currentMouseX;
    this.lastMouseY = this.currentMouseY;
    this.currentMouseX = e.layerX;
    this.currentMouseY = e.layerY;
  },

  onMouseUp: function onMouseUp(e) {
    this.mouseDown = false;
  },

  onKeyUp: function onKeyUp(e) {
    if (e.keyCode == this.keys.space) {
      this.changeState('selection');
    }
  },

  update: function update() {
    this.updateLoop = requestAnimationFrame(this.update.bind(this));
    if (!this.mouseDown || this.currentMouseX == this.lastMouseX && this.currentMouseY == this.lastMouseY) {
      return;
    }
    var deltaX = (this.currentMouseX - this.lastMouseX) / 2;
    var deltaY = (this.currentMouseY - this.lastMouseY) / 2;
    var currCameraOffset = Camera.getOffset();
    currCameraOffset[0] += deltaX;
    currCameraOffset[1] += deltaY;
    Camera.setOffset(currCameraOffset[0], currCameraOffset[1]);
    this.render();
  }
});

module.exports = scroll;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Adapted from the Internet
// function intersection(a0x, a0y, a1x, a1y, b0x, b0y, b1x, b1y)
// {
//     var axDiff, ayDiff, bxDiff, byDiff;
//     axDiff = a1x - a0x;     ayDiff = a1y - a0y;
//     bxDiff = b1x - b0x;     byDiff = b1y - b0y;
//     abxDiff = a0x - b0x;    abyDiff = a0y - b0y;

//     var denominator = -bxDiff * ayDiff + axDiff * byDiff

//     var s, t;
//     s = (-ayDiff * abxDiff + axDiff * abyDiff) / denominator;
//     t = ( bxDiff * abyDiff - byDiff * abxDiff) / denominator;

//     if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
//     {
//         return [a0x + (t * axDiff), a0y + (t * ayDiff)];
//     }

//     return null; // No collision
// }

// function intersection(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) { var s1_x, s1_y, s2_x, s2_y; s1_x = p1_x - p0_x; s1_y = p1_y - p0_y; s2_x = p3_x - p2_x; s2_y = p3_y - p2_y; var s, t; s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y); t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
//     if (s >= 0 && s <= 1 && t >= 0 && t <= 1) { // Collision detected
//         var intX = p0_x + (t * s1_x);
//         var intY = p0_y + (t * s1_y);
//         return [intX, intY];
//     } return null; // No collision
// }

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function lines(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Check if none of the lines are of length 0
  if (x1 === x2 && y1 === y2 || x3 === x4 && y3 === y4) {
    return null;
  }

  var denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Lines are parallel
  if (denominator === 0) {
    return null;
  }

  var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  var ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  // if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
  // return null
  // }

  // Return a object with the x and y coordinates of the intersection
  var x = x1 + ua * (x2 - x1);
  var y = y1 + ua * (y2 - y1);
  return [x, y];
}

function lineSegments(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Check if none of the lines are of length 0
  if (x1 === x2 && y1 === y2 || x3 === x4 && y3 === y4) {
    return null;
  }

  var denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Lines are parallel
  if (denominator === 0) {
    return null;
  }

  var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  var ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return null;
  }

  // Return a object with the x and y coordinates of the intersection
  var x = x1 + ua * (x2 - x1);
  var y = y1 + ua * (y2 - y1);
  return [x, y];
}

module.exports = { lines: lines, lineSegments: lineSegments };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function objectValues(obj) {
  var arr = [];
  for (var key in obj) {
    arr.push(obj[key]);
  }
  return arr;
}

module.exports = objectValues;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Stack() {
  this.top = null;
}

Stack.prototype.push = function (value) {
  this.top = { value: value, below: this.top };
};

Stack.prototype.pop = function () {
  var node = this.top;
  this.top = this.top.below;
  return node.value;
};

Stack.prototype.replaceTop = function (value) {
  var node = { value: value, below: this.top.below };
  this.top = node;
};

Stack.prototype.removeAt = function (index) {
  var node = this.top;
  for (var i = 0; i < index - 2; i++) {
    node = node.below;
  }
  node.below = node.below.below;
};

Stack.prototype.removeWhere = function (callback) {
  var node = this.top;
  while (node != null && node.below != null) {
    if (callback(node.below.value)) {
      node.below = node.below.below;
    }
    node = node.below;
  }
};

Stack.prototype.peek = function () {
  return this.top.value;
};

Stack.prototype.fill = function (a) {
  for (var i = 0; i < a.length; i++) {
    this.push(a[i]);
  }
};

Stack.prototype.fillWithValues = function (va) {
  for (var i = 0; i < a.length; i++) {
    this.pushValue(va[i]);
  }
};

Stack.prototype.toArr = function () {
  var arr = [];
  var currentNode = this.top;
  while (currentNode != null) {
    arr.push(currentNode);
    currentNode = currentNode.below;
  }
  return arr;
};

module.exports = Stack;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SceneObject = __webpack_require__(10);
var Game = __webpack_require__(9);
var $ = __webpack_require__(5);

var Player = function (_SceneObject) {
  _inherits(Player, _SceneObject);

  function Player(args) {
    _classCallCheck(this, Player);

    var sceneObjArgs = {
      name: 'player',
      scene: args.scene,
      active: true,

      states: {
        walking: __webpack_require__(23),
        flying: __webpack_require__(65),
        dying: __webpack_require__(64)
      },
      initialState: 'flying',

      controls: {

        transform: {
          kind: __webpack_require__(16),
          args: {
            position: [100.0, 200.0],
            size: [48, 34]
          }
        },

        advance: {
          kind: __webpack_require__(28),
          args: {
            acceleration: 2
          }
        },

        gravity: {
          kind: __webpack_require__(34)
        },

        flap: {
          kind: __webpack_require__(32)
        },

        animationStateMachine: {
          kind: __webpack_require__(29),
          args: {
            tag: 'body',
            states: __webpack_require__(66),
            initialState: 'initial',
            parameters: {
              direction: 0
            }
          }
        },

        bodySprite: {
          kind: __webpack_require__(12),
          args: {
            tag: 'body',
            spritesheetName: 'bodySprites',
            spritesheetData: __webpack_require__(61),
            animations: {
              Lstand: ['Lraptorstand'],
              Lwalk: ['Lraptorwalk00', 'Lraptorwalk01'],
              Ljump: ['Lraptorflap00'],
              Lfall: ['Lraptorflap01'],
              Lhurt: ['Lraptorhurt'],
              Rstand: ['Rraptorstand'],
              Rwalk: ['Rraptorwalk00', 'Rraptorwalk01'],
              Rjump: ['Rraptorflap00'],
              Rfall: ['Rraptorflap01'],
              Rhurt: ['Rraptorhurt']
            },
            initialAnimation: ['Rstand', true],
            layer: 2
          }
        },

        tailManager: {
          kind: __webpack_require__(42)
        },

        tailSprite: {
          kind: __webpack_require__(12),
          args: {
            tag: 'tail',
            animating: false,
            spritesheetName: 'tailSprites',
            spritesheetData: __webpack_require__(63),
            animations: {
              Rblend: ['Rtail00', 'Rtail01', 'Rtail02', 'Rtail03', 'Rtail04', 'Rtail05', 'Rtail06', 'Rtail07', 'Rtail08'],
              Lblend: ['Ltail00', 'Ltail01', 'Ltail02', 'Ltail03', 'Ltail04', 'Ltail05', 'Ltail06', 'Ltail07', 'Ltail08']
            },
            initialAnimation: ['Rblend', true],
            layer: 2
          }
        },

        flicker: {
          kind: __webpack_require__(33)
        },

        objectCollider: {
          kind: __webpack_require__(38),
          args: {
            hitbox: [20, 10, 44, 20],
            onHit: function onHit(other) {
              this.owner.changeState('dying');
              var worldHitbox = this.getWorldHitbox();
              var otherWorldHitbox = other.getWorldHitbox();
              var center = $([worldHitbox[0], worldHitbox[1]]).plusVector($([this.hitbox[2], this.hitbox[3]]).minusVector([this.hitbox[0], this.hitbox[1]]).timesScalar(0.5).$).$;
              var otherCenter = $([otherWorldHitbox[0], otherWorldHitbox[1]]).plusVector($([otherWorldHitbox[2], otherWorldHitbox[3]]).minusVector([otherWorldHitbox[0], otherWorldHitbox[1]]).timesScalar(0.5).$).$;
              var bounceBack = $(center).minusVector(otherCenter).unit().$;
              this.owner.controls.velocity.x += bounceBack[0] * 10;
              this.owner.controls.velocity.y += bounceBack[1] * 10;
            }
          }
        },

        feetMapCollider: {
          kind: __webpack_require__(11),
          args: {
            tags: ['level01'],
            checkPoint: [28, 28],
            onHit: function onHit(floor) {
              this.owner.changeState('walking');
              this.owner.controls.flap.floorNormal = floor.normal;
              this.owner.controls.animationStateMachine.setTrigger('land');
              return false;
            },
            onNoCollision: function onNoCollision() {
              this.owner.changeState('flying');
            }
          }
        },

        rightChestMapCollider: {
          kind: __webpack_require__(11),
          args: {
            tags: ['level01'],
            checkPoint: [60, 10]
          }
        },

        leftChestMapCollider: {
          kind: __webpack_require__(11),
          args: {
            tags: ['level01'],
            checkPoint: [56, 10]
          }
        },

        velocity: {
          kind: __webpack_require__(43)
        },

        loseChecker: {
          kind: __webpack_require__(31),
          args: {
            condition: function condition() {
              return this.owner.controls.transform.getBounds()[3] >= 800;
            },
            result: function result() {
              this.owner.changeState('dying');
            }
          }
        },

        cameraFollow: {
          kind: __webpack_require__(30)
        }
      }
    };

    return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, sceneObjArgs));
  }

  return Player;
}(SceneObject);

module.exports = Player;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var State = __webpack_require__(4);

var walking = new State({
  enter: function enter() {
    // this.controls.sprite.setAnimation('Rwalk')
  },
  update: function update() {
    this.controls.advance.update();
    this.controls.gravity.update();
    this.controls.velocity.update();
    this.controls.loseChecker.update();
    this.controls.animationStateMachine.update();
    this.controls.tailManager.update();
    this.controls.bodySprite.update();
    this.controls.tailSprite.update();
    this.controls.cameraFollow.update();
  },
  message: function message(msg, e) {
    switch (msg) {
      case 'keyDown':
        this.controls.flap.startJump();
        break;
      case 'walkRight':
        this.controls.advance.change(1);
        break;
      case 'walkLeft':
        this.controls.advance.change(-1);
        break;
      case 'stop':
        this.controls.advance.change(0);
    }
  }
});

module.exports = walking;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var State = __webpack_require__(4);
var Scene = __webpack_require__(8);
var SceneObject = __webpack_require__(10);
var Sprite = __webpack_require__(12);
var renderer = __webpack_require__(0);
var input = __webpack_require__(3);
var Control = __webpack_require__(1);
var SpriteEngine = __webpack_require__(15);
var Transform = __webpack_require__(16);
var raptorSpritesheetData = __webpack_require__(62);
var walking = __webpack_require__(23);
var Player = __webpack_require__(22);

var level01 = new Scene({
  name: 'Level01',
  assets: {
    bodySprites: './assets/body-sprites.png',
    tailSprites: './assets/tail-sprites.png',
    protoSprites: './assets/proto-sprites.png',
    groundSpritesheet: './assets/ground.png',
    background: './assets/bg2.png',
    blop: './assets/blop.wav',
    screech: './assets/pusou.wav',
    groundTile: './assets/ground-tile.png',
    groundAtlas: './assets/ground-atlas.png'
  },
  tileMapSrc: './assets/level01.png',
  tileMapKey: __webpack_require__(57),
  enter: function enter() {
    var _this = this;

    Scene.prototype.enter.call(this).then(function () {
      _this.assetManager.play('blop');
      input.addKeyDownListener(32, flap);
      input.addKeyUpListener(32, releaseFlap);
      input.addKeyDownListener(37, walkLeft);
      input.addKeyUpListener(37, releaseWalkLeft);
      input.addKeyDownListener(39, walkRight);
      input.addKeyUpListener(39, releaseWalkRight);

      document.addEventListener('touchstart', tap);
      document.addEventListener('touchend', releaseTap);
      document.addEventListener('touchstart', touchStart);
      document.addEventListener('touchmove', touchMove);
      document.addEventListener('touchend', touchEnd);
    });
  },
  exit: function exit() {
    input.removeKeyDownListener(32, flap);
    input.removeKeyUpListener(32, releaseFlap);
    input.removeKeyDownListener(37, walkLeft);
    input.removeKeyUpListener(37, releaseWalkLeft);
    input.removeKeyDownListener(39, walkRight);
    input.removeKeyUpListener(39, releaseWalkRight);

    document.removeEventListener('touchstart', tap);
    document.removeEventListener('touchend', releaseTap);
    document.removeEventListener('touchstart', touchStart);
    document.removeEventListener('touchmove', touchMove);
    document.removeEventListener('touchend', touchEnd);
  },
  objects: [
  // require('../sceneobjects/background'),
  // require('../sceneobjects/background'),
  // require('../sceneobjects/ground'),
  // require('../sceneobjects/ground'),
  // require('../sceneobjects/ground'),
  // require('../sceneobjects/ground'),
  // require('../sceneobjects/ground'),
  // require('../sceneobjects/ground'),
  // require('../sceneobjects/ground'),
  __webpack_require__(22),
  // require('../sceneobjects/protoceratops'),
  // require('../sceneobjects/protoceratops'),
  __webpack_require__(58)]
});

function flap(e) {
  level01.getObjectByName('player').message('keyDown');
}

function releaseFlap(e) {
  level01.getObjectByName('player').message('keyUp');
}

function walkLeft(e) {
  level01.getObjectByName('player').message('walkLeft');
}

function walkRight(e) {
  level01.getObjectByName('player').message('walkRight');
}

function releaseWalkLeft(e) {
  level01.getObjectByName('player').message('stop');
}

function releaseWalkRight(e) {
  level01.getObjectByName('player').message('stop');
}

var isPressed = false;

function tap(e) {
  if (isPressed) {
    return;
  }
  for (var i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].pageX > window.innerWidth / 2) {
      flap(e);
      isPressed = true;
      break;
    }
  }
}

function releaseTap(e) {
  if (!isPressed) {
    return;
  }
  for (var i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].pageX > window.innerWidth / 2) {
      releaseFlap(e);
      isPressed = false;
      break;
    }
  }
}

var lastX = 0;

function touchStart(e) {
  for (var i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].pageX < window.innerWidth / 2) {
      lastX = e.changedTouches[i].pageX;
      break;
    }
  }
}

function touchMove(e) {
  for (var i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].pageX < window.innerWidth / 2) {
      if (e.changedTouches[i].pageX < lastX) {
        walkLeft(e);
      } else {
        walkRight(e);
      }
      lastX = e.changedTouches[i].pageX;
      break;
    }
  }
}

function touchEnd(e) {
  for (var i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].pageX < window.innerWidth / 2) {
      releaseWalkLeft(e);
      break;
    }
  }
}

module.exports = level01;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Scene = __webpack_require__(8);
var renderer = __webpack_require__(0);
var input = __webpack_require__(3);

var titlescreen = new Scene({
  name: 'TitleScreen',
  assets: {
    titlescreen: './assets/titlescreen.png'
  },

  enter: function enter() {
    var _this = this;

    this.game.stop();
    this.assetManager.load().then(function () {
      return renderer.drawImage(_this.assetManager.assets.titlescreen, 0, 0);
    });
    this.game.scenes.level01.assetManager.load();
    input.addKeyDownListener(32, pushLevel);
    document.addEventListener('touchstart', pushLevel);
  },

  exit: function exit() {
    input.removeKeyDownListener(32, pushLevel);
    document.removeEventListener('touchstart', pushLevel);
  }
});

function pushLevel() {
  titlescreen.game.replaceTop('level01');
}

function echoTouch(e) {
  console.log(e);
}

module.exports = titlescreen;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StateMachine = __webpack_require__(7);

var StateMachineControl = function (_StateMachine) {
    _inherits(StateMachineControl, _StateMachine);

    function StateMachineControl(args) {
        _classCallCheck(this, StateMachineControl);

        var _this = _possibleConstructorReturn(this, (StateMachineControl.__proto__ || Object.getPrototypeOf(StateMachineControl)).call(this, args));

        _this.owner = args.owner;
        _this.parameters = args.parameters || {};
        return _this;
    }

    _createClass(StateMachineControl, [{
        key: "evaluateChange",
        value: function evaluateChange(parameterName, value) {
            this.currentState.evaluateChange.call(this, parameterName, value);
        }
    }, {
        key: "getGame",
        value: function getGame() {
            return this.owner.scene.game;
        }
    }, {
        key: "init",
        value: function init() {
            // Override
        }
    }, {
        key: "setParameter",
        value: function setParameter(name, value) {
            this.parameters[name] = value;
            this.evaluateChange(name, value);
        }
    }, {
        key: "setTrigger",
        value: function setTrigger(name, value) {
            this.evaluateChange(name, value);
        }
    }]);

    return StateMachineControl;
}(StateMachine);

module.exports = StateMachineControl;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = __webpack_require__(5);

var PIXEL_WIDTH = 320,
    PIXEL_HEIGHT = 240;
var TILE_SIZE = 32;

var TileMap = function () {
  function TileMap(args) {
    _classCallCheck(this, TileMap);

    this.mapSrc = args.mapSrc;
    this.key = args.key;
    this.map = [];
    this.name = args.name || 'tileMap';
  }

  _createClass(TileMap, [{
    key: 'init',
    value: function init() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
          var tempCanvas = document.createElement('canvas');
          tempCanvas.width = img.width;
          tempCanvas.height = img.height;
          var tempCtx = tempCanvas.getContext('2d');
          tempCtx.drawImage(img, 0, 0, img.width, img.height);
          var imgData = tempCtx.getImageData(0, 0, img.width, img.height).data;
          var oneDimensionalArray = [];
          //B & W image, only need one channel
          var hex;
          for (var i = 0; i < imgData.length; i += 4) {
            hex = parseInt($([imgData[i], imgData[i + 1], imgData[i + 2]]).toHexString().$, 16);
            oneDimensionalArray.push(hex);
          }
          _this.map = [];
          for (var y = 0; y < img.height; y++) {
            _this.map[y] = [];
            for (var x = 0; x < img.width; x++) {
              _this.map[y].push(oneDimensionalArray[y * img.width + x]);
            }
          }
          resolve();
        };
        img.src = _this.mapSrc;
      });
    }
  }, {
    key: 'worldToMapCoords',
    value: function worldToMapCoords(x, y) {
      return [Math.abs(Math.floor(x / TILE_SIZE)), Math.abs(Math.floor(y / TILE_SIZE))];
    }
  }, {
    key: 'getTileAtWorldPosition',
    value: function getTileAtWorldPosition(x, y) {
      var mapCoords = this.worldToMapCoords(x, y);
      this.getTileAtMapCoords.apply(this, _toConsumableArray(mapCoords));
    }
  }, {
    key: 'getTileAtMapCoords',
    value: function getTileAtMapCoords(x, y) {
      if (y >= this.map.length || x >= this.map[0].length) {
        return null;
      }
      var tile = this.map[y][x];
      if (tile == 16777215) {
        return null;
      }
      return this.key[tile];
    }
  }, {
    key: 'getSpriteAt',
    value: function getSpriteAt(y, x) {
      if (y > this.map.length - 1 || x > this.map[0].length - 1) {
        return null;
      }
      var tile = this.map[y][x];
      if (tile == 16777215) {
        return null;
      }
      return this.key[tile];
    }
  }, {
    key: 'mapToWorldCoords',
    value: function mapToWorldCoords(x, y) {
      return [x * 32, y * 32];
    }
  }]);

  return TileMap;
}();

module.exports = TileMap;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);

var Advance = function (_Control) {
    _inherits(Advance, _Control);

    function Advance(args) {
        _classCallCheck(this, Advance);

        var _this = _possibleConstructorReturn(this, (Advance.__proto__ || Object.getPrototypeOf(Advance)).call(this, args));

        _this.name = 'walk';
        _this.acceleration = args.acceleration || 1;
        _this.topImpulse = args.topImpulse || 3;
        _this.impulse = 0;
        _this.direction = 0;
        return _this;
    }

    _createClass(Advance, [{
        key: 'change',
        value: function change(direction) {
            if (direction == this.direction) {
                return;
            }
            this.direction = direction;
            this.owner.controls.animationStateMachine.setParameter('direction', direction);
        }
    }, {
        key: 'update',
        value: function update(dt) {
            if (this.direction == 0) {
                if (this.owner.controls.velocity.x == 0) {
                    return;
                }
                if (Math.abs(this.owner.controls.velocity.x) < 1) {
                    this.owner.controls.velocity.x = 0;
                } else {
                    this.owner.controls.velocity.x *= 0.7;
                }
            }
            if (this.direction > 0 && this.owner.controls.velocity.x < this.topImpulse || this.direction < 0 && this.owner.controls.velocity.x > -this.topImpulse) {
                this.owner.controls.velocity.x += this.direction * this.acceleration;
            }
        }
    }]);

    return Advance;
}(Control);

module.exports = Advance;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StateMachineControl = __webpack_require__(26);
var State = __webpack_require__(4);

var AnimationStateMachine = function (_StateMachineControl) {
    _inherits(AnimationStateMachine, _StateMachineControl);

    function AnimationStateMachine() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, AnimationStateMachine);

        var _this = _possibleConstructorReturn(this, (AnimationStateMachine.__proto__ || Object.getPrototypeOf(AnimationStateMachine)).call(this, args));

        _this.name = 'animationStateMachine';
        _this.tag = args.tag;
        _this.sprite;
        return _this;
    }

    _createClass(AnimationStateMachine, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            this.sprite = this.owner.getControlsByName('sprite').find(function (e) {
                return e.tag == _this2.tag;
            });
        }
    }]);

    return AnimationStateMachine;
}(StateMachineControl);

module.exports = AnimationStateMachine;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var renderer = __webpack_require__(0);

var offset = [0, 0];

var CameraFollow = function (_Control) {
  _inherits(CameraFollow, _Control);

  function CameraFollow(args) {
    _classCallCheck(this, CameraFollow);

    var _this = _possibleConstructorReturn(this, (CameraFollow.__proto__ || Object.getPrototypeOf(CameraFollow)).call(this, args));

    _this.name = 'camera-follow';
    _this.margin = args.margin || [50, 100];
    _this.shouldFollow = false;
    return _this;
  }

  _createClass(CameraFollow, [{
    key: 'update',
    value: function update() {
      this.shouldFollow = true;
    }
  }]);

  return CameraFollow;
}(Control);

module.exports = CameraFollow;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);

var ConditionChecker = function (_Control) {
  _inherits(ConditionChecker, _Control);

  function ConditionChecker(args) {
    _classCallCheck(this, ConditionChecker);

    var _this = _possibleConstructorReturn(this, (ConditionChecker.__proto__ || Object.getPrototypeOf(ConditionChecker)).call(this, args));

    _this.name = 'lose-checker';
    _this.condition = args.condition || function () {
      return false;
    };
    _this.result = args.result || function () {};
    return _this;
  }

  _createClass(ConditionChecker, [{
    key: 'update',
    value: function update() {
      if (this.condition()) {
        this.result();
      }
    }
  }]);

  return ConditionChecker;
}(Control);

module.exports = ConditionChecker;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var $ = __webpack_require__(5);

var Flap = function (_Control) {
  _inherits(Flap, _Control);

  function Flap(args) {
    _classCallCheck(this, Flap);

    var _this = _possibleConstructorReturn(this, (Flap.__proto__ || Object.getPrototypeOf(Flap)).call(this, args));

    _this.floorNormal = [0, -1];
    return _this;
  }

  _createClass(Flap, [{
    key: 'startJump',
    value: function startJump() {
      var jumpVec = $(this.floorNormal).timesScalar(7).$;
      this.owner.controls.velocity.y += jumpVec[1];
      this.owner.changeState('flying');
      this.owner.controls.animationStateMachine.setTrigger('flap');
      this.owner.controls.tailManager.onGround = false;
    }
  }, {
    key: 'flap',
    value: function flap() {
      this.owner.controls.velocity.y -= Math.max(1.5, this.owner.controls.velocity.y * 0.9);
      this.owner.controls.animationStateMachine.setTrigger('flap');
    }
  }, {
    key: 'fall',
    value: function fall() {
      this.owner.controls.animationStateMachine.setTrigger('fall');
    }
  }]);

  return Flap;
}(Control);

module.exports = Flap;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);

var Flicker = function (_Control) {
  _inherits(Flicker, _Control);

  function Flicker() {
    _classCallCheck(this, Flicker);

    return _possibleConstructorReturn(this, (Flicker.__proto__ || Object.getPrototypeOf(Flicker)).apply(this, arguments));
  }

  _createClass(Flicker, [{
    key: 'init',
    value: function init() {
      this.sprites = this.owner.getControlsByName('sprite');
      this.game = this.owner.getGame();
    }
  }, {
    key: 'makeVisible',
    value: function makeVisible() {
      for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].enabled = true;
      }
    }
  }, {
    key: 'makeInvisible',
    value: function makeInvisible() {
      for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].enabled = false;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (Math.floor(this.game.dt * 1000) % 2 == 0) {
        this.makeInvisible();
      } else {
        this.makeVisible();
      }
    }
  }]);

  return Flicker;
}(Control);

module.exports = Flicker;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);

var GRAV_CONSTANT = 0.6;

var Gravity = function (_Control) {
  _inherits(Gravity, _Control);

  function Gravity() {
    _classCallCheck(this, Gravity);

    return _possibleConstructorReturn(this, (Gravity.__proto__ || Object.getPrototypeOf(Gravity)).apply(this, arguments));
  }

  _createClass(Gravity, [{
    key: 'update',
    value: function update() {
      this.owner.controls.velocity.y += GRAV_CONSTANT * (this.getGame().dt / 30);
    }
  }]);

  return Gravity;
}(Control);

module.exports = Gravity;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);

var PIXEL_WIDTH, PIXEL_HEIGHT;

var HorizontalInfinitePlane = function (_Control) {
  _inherits(HorizontalInfinitePlane, _Control);

  function HorizontalInfinitePlane(args) {
    _classCallCheck(this, HorizontalInfinitePlane);

    var _this = _possibleConstructorReturn(this, (HorizontalInfinitePlane.__proto__ || Object.getPrototypeOf(HorizontalInfinitePlane)).call(this, args));

    _this.name = 'infinitePlane';
    _this.tag = 'renderer';
    _this.layer = args.layer;
    _this.rate = args.rate;
    _this.spritesheetData = args.spritesheetData;
    _this.offset = args.offset || [0, 0];
    _this.enabled = true;
    PIXEL_WIDTH = Camera.getPixelWidth();
    PIXEL_HEIGHT = Camera.getPixelHeight();
    return _this;
  }

  _createClass(HorizontalInfinitePlane, [{
    key: 'render',
    value: function render() {
      var camOffset = Camera.getOffset();

      var x = Math.round(-camOffset[0] % (PIXEL_WIDTH * this.rate) / this.rate);
      var y = Math.round(-camOffset[1] % (PIXEL_HEIGHT * this.rate) / this.rate + this.offset[1]);

      var clipWidth = Math.min(PIXEL_WIDTH - x, PIXEL_WIDTH);

      renderer.drawImage(this.owner.scene.assetManager.assets[this.spritesheetData.sheet], x, y, clipWidth, PIXEL_HEIGHT, -camOffset[0], -camOffset[1], clipWidth, PIXEL_HEIGHT);

      var xRemaining = PIXEL_WIDTH - clipWidth;

      if (xRemaining > 0) {
        renderer.drawImage(this.owner.scene.assetManager.assets[this.spritesheetData.sheet], 0, y, xRemaining, PIXEL_HEIGHT, -camOffset[0] + clipWidth, -camOffset[1], xRemaining, PIXEL_HEIGHT);
      }
    }
  }]);

  return HorizontalInfinitePlane;
}(Control);

module.exports = HorizontalInfinitePlane;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var $ = __webpack_require__(5);
var intersectionOf = __webpack_require__(19);

var MapCollisionEngine = function (_Control) {
  _inherits(MapCollisionEngine, _Control);

  function MapCollisionEngine(args) {
    _classCallCheck(this, MapCollisionEngine);

    var _this = _possibleConstructorReturn(this, (MapCollisionEngine.__proto__ || Object.getPrototypeOf(MapCollisionEngine)).call(this, args));

    _this.name = 'mapCollisionEngine';
    _this.tileMap = args.tileMap;
    _this.tag = 'physics';
    _this.order = 1;
    _this.components = [];
    return _this;
  }

  _createClass(MapCollisionEngine, [{
    key: 'init',
    value: function init() {
      this.tileMap = this.owner.scene.tileMap;
      this.components = this.owner.scene.getControlsByName('mapCollider');
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      for (var i = 0; i < this.components.length; i++) {
        if (!this.components[i].enabled) {
          continue;
        }

        var comp = this.components[i];

        var collision = false;

        var dirty = true;
        var startPos = comp.getWorldCheckPoint();

        var count = 0;

        while (dirty) {
          var _tileMap, _tileMap2;

          dirty = false;

          if (count++ > 5) {
            console.error("Stuck in collision loop");
            break;
          }

          var endPos = comp.getNextWorldCheckPoint();

          // Make check box one pixel larger than start and end points, in case it's bordering on another tile
          var upperLeftCorner = [Math.min(startPos[0], endPos[0]) - 1, Math.min(startPos[1], endPos[1]) - 1];
          var lowerRightCorner = [Math.max(startPos[0], endPos[0]) + 1, Math.max(startPos[1], endPos[1]) + 1];

          var upperLeftTile = (_tileMap = this.tileMap).worldToMapCoords.apply(_tileMap, upperLeftCorner);
          var lowerRightTile = (_tileMap2 = this.tileMap).worldToMapCoords.apply(_tileMap2, lowerRightCorner);

          var tileRays = [];

          var tile;
          for (var x = upperLeftTile[0]; x <= lowerRightTile[0]; x++) {
            for (var y = upperLeftTile[1]; y <= lowerRightTile[1]; y++) {
              tile = this.tileMap.getTileAtMapCoords(x, y);
              if (!tile) {
                continue;
              }
              var tr;
              for (var k = 0; k < tile.rays.length; k++) {
                tr = {
                  ray: $(tile.rays[k].ray).plusVector([x * 32, y * 32, x * 32, y * 32]).$,
                  normal: tile.rays[k].normal
                };
                tileRays.push(tr);
              }
              //  TODO: skip tiles in BB that aren't on movement ray
              // (Left undone for now because this is unlikely to include many tiles at normal speeds)
            }
          }

          if (tileRays.length == 0) {
            break;
          }

          tileRays = tileRays.sort(function (a, b) {
            return $(startPos).sqDistanceToLineSegment(a.ray).$ - $(startPos).sqDistanceToLineSegment(b.ray).$;
          });

          var tileRay, normal;

          for (var j = 0; j < tileRays.length; j++) {
            tileRay = tileRays[j].ray;
            normal = tileRays[j].normal;

            if (!$(endPos).isRightOf(tileRay).$ || $(startPos).isRightOf(tileRay).$) {
              continue;
            }

            collision = true;

            // Returns true if we should skip collision restitution
            if (comp.onHit(tileRays[j])) {
              break;
            }

            var normalRay = [].concat(_toConsumableArray(endPos), _toConsumableArray($(endPos).plusVector($(normal).timesScalar(1000).$).$)); //Arbitrary large number
            var surfacePos = intersectionOf.lines.apply(intersectionOf, _toConsumableArray(normalRay).concat(_toConsumableArray(tileRay)));
            var resistanceVec = $([].concat(_toConsumableArray(endPos), _toConsumableArray(surfacePos))).coordPairToVector().$;
            var rLength = $(resistanceVec).length().$;
            resistanceVec = $(normal).timesScalar(rLength + 0.1).$;
            comp.owner.controls.velocity.y += resistanceVec[1];
            comp.owner.controls.velocity.x += resistanceVec[0];
            dirty = true;
            break;
          }
        }
        if (!collision) {
          comp.onNoCollision();
        }
      }
    }
  }]);

  return MapCollisionEngine;
}(Control);

// function pushPointToSurface(p, )

module.exports = MapCollisionEngine;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);

var SCREEN_TILE_WIDTH, SCREEN_TILE_HEIGHT;

var MapRenderer = function (_Control) {
  _inherits(MapRenderer, _Control);

  function MapRenderer(args) {
    _classCallCheck(this, MapRenderer);

    var _this = _possibleConstructorReturn(this, (MapRenderer.__proto__ || Object.getPrototypeOf(MapRenderer)).call(this, args));

    _this.name = 'mapRenderer';
    _this.tag = 'renderer';
    _this.layer = args.layer;
    _this.tileMap;
    _this.enabled = true;
    SCREEN_TILE_WIDTH = Math.floor(Camera.getPixelWidth() / 32) + 32;
    SCREEN_TILE_HEIGHT = Math.floor(Camera.getPixelHeight() / 32) + 32;
    return _this;
  }

  _createClass(MapRenderer, [{
    key: 'init',
    value: function init() {
      this.tileMap = this.owner.scene.tileMap;
    }
  }, {
    key: 'render',
    value: function render() {
      var camPosition = Camera.getViewportPosition();
      var worldStartX = camPosition[0] - camPosition[0] % 32 - 32;
      var worldStartY = camPosition[1] - camPosition[1] % 32 - 32;
      var mapStartPos = this.tileMap.worldToMapCoords(worldStartX, worldStartY);
      var sprite, worldX, worldY;
      for (var xMap = mapStartPos[0], xWorld = worldStartX; xMap < mapStartPos[0] + SCREEN_TILE_HEIGHT; xMap++, xWorld += 32) {
        for (var yMap = mapStartPos[1], yWorld = worldStartY; yMap < mapStartPos[1] + SCREEN_TILE_WIDTH; yMap++, yWorld += 32) {
          sprite = this.tileMap.getTileAtMapCoords(xMap, yMap);
          if (sprite) {
            renderer.drawImage(this.owner.scene.assetManager.assets[sprite.sheet], sprite.coords.x, sprite.coords.y, 32, 32, xWorld, yWorld, 32, 32);
          }
        }
      }
    }
  }]);

  return MapRenderer;
}(Control);

module.exports = MapRenderer;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var $ = __webpack_require__(5);

var ObjectCollider = function (_Control) {
  _inherits(ObjectCollider, _Control);

  function ObjectCollider(args) {
    _classCallCheck(this, ObjectCollider);

    args.name = 'objectCollider';

    var _this = _possibleConstructorReturn(this, (ObjectCollider.__proto__ || Object.getPrototypeOf(ObjectCollider)).call(this, args));

    _this.tags = args.tags;
    _this.hitbox = args.hitbox;
    _this.checkPoints = args.checkPoints;
    _this.onHit = args.onHit || function (other) {};
    _this.enabled = args.enabled || true;
    return _this;
  }

  _createClass(ObjectCollider, [{
    key: 'getWorldHitbox',
    value: function getWorldHitbox() {
      return $(this.hitbox).plusVector([].concat(_toConsumableArray(this.owner.controls.transform.position), _toConsumableArray(this.owner.controls.transform.position))).$;
    }
  }]);

  return ObjectCollider;
}(Control);

module.exports = ObjectCollider;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var $ = __webpack_require__(5);
var intersection = __webpack_require__(19);

var ObjectCollisionEngine = function (_Control) {
    _inherits(ObjectCollisionEngine, _Control);

    function ObjectCollisionEngine(args) {
        _classCallCheck(this, ObjectCollisionEngine);

        var _this = _possibleConstructorReturn(this, (ObjectCollisionEngine.__proto__ || Object.getPrototypeOf(ObjectCollisionEngine)).call(this, args));

        _this.tag = 'physics';
        _this.order = 0;
        _this.components = [];
        _this.playerCollider = undefined;
        return _this;
    }

    _createClass(ObjectCollisionEngine, [{
        key: 'init',
        value: function init() {
            var colliders;
            colliders = this.owner.scene.getControlsByName('objectCollider');
            var playerColliderIndex = colliders.findIndex(function (c) {
                return c.owner.name == 'player';
            });
            this.playerCollider = colliders[playerColliderIndex];
            colliders.splice(playerColliderIndex, 1);
            this.components = colliders;
        }
    }, {
        key: 'isColliding',
        value: function isColliding(a, b) {
            // If a is above b
            if (a[3] < b[1]) {
                return false;
            }

            // If a is below b
            if (a[1] > b[3]) {
                return false;
            }

            // If a is left of b
            if (a[2] < b[0]) {
                return false;
            }

            // If a is right of b
            if (a[0] > b[2]) {
                return false;
            }

            // Else collision
            return true;
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            if (!this.playerCollider.enabled) {
                return;
            }

            var playerBox;
            var otherBox;
            var playerPos;
            var otherPos;
            var playerBound = [];
            var otherBound = [];
            for (var i = 0; i < this.components.length; i++) {
                if (!this.components[i].enabled) {
                    continue;
                }
                playerBox = this.playerCollider.getWorldHitbox();

                otherBox = this.components[i].getWorldHitbox();

                if (this.isColliding(playerBox, otherBox)) {
                    this.playerCollider.onHit(this.components[i]);
                    this.components[i].onHit(this.playerCollider);
                }
            }
        }
    }]);

    return ObjectCollisionEngine;
}(Control);

module.exports = ObjectCollisionEngine;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);

var PhysicsEngine = function (_Control) {
  _inherits(PhysicsEngine, _Control);

  function PhysicsEngine(args) {
    _classCallCheck(this, PhysicsEngine);

    var _this = _possibleConstructorReturn(this, (PhysicsEngine.__proto__ || Object.getPrototypeOf(PhysicsEngine)).call(this, args));

    _this.name = 'physicsEngine';
    _this.engines = [];
    _this.components = [];
    return _this;
  }

  _createClass(PhysicsEngine, [{
    key: 'init',
    value: function init() {
      this.engines = this.owner.scene.getControlsByTag('physics').sort(function (a, b) {
        return a.order - b.order;
      });
      this.components = this.owner.scene.getControlsByName('velocity');
    }
  }, {
    key: 'update',
    value: function update() {
      for (var i = 0; i < this.engines.length; i++) {
        this.engines[i].calculate();
      }

      for (i = 0; i < this.components.length; i++) {
        this.components[i].applyVelocity();
      }
    }
  }]);

  return PhysicsEngine;
}(Control);

module.exports = PhysicsEngine;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);

var RenderingEngine = function (_Control) {
  _inherits(RenderingEngine, _Control);

  function RenderingEngine(args) {
    _classCallCheck(this, RenderingEngine);

    var _this = _possibleConstructorReturn(this, (RenderingEngine.__proto__ || Object.getPrototypeOf(RenderingEngine)).call(this, args));

    _this.name = 'renderingEngine';
    _this.components = [];
    _this.debugDrawLinesComponents = [];
    renderer.strokeStyle = 'green';
    return _this;
  }

  _createClass(RenderingEngine, [{
    key: 'init',
    value: function init() {
      this.components = this.owner.scene.getControlsByTag('renderer').sort(function (a, b) {
        return a.layer - b.layer;
      });
      this.debugDrawLinesComponents = this.owner.scene.getAllControls().filter(function (e) {
        return e.debugDrawLines != undefined;
      });
    }
  }, {
    key: 'enableLayer',
    value: function enableLayer(num, enable) {
      this.components[num].enabled = enable;
    }
  }, {
    key: 'update',
    value: function update() {

      // Clear canvas
      renderer.setTransform(1, 0, 0, 1, 0, 0);
      renderer.clearRect(0, 0, 320, 240);
      renderer.setTransform(1, 0, 0, 1, Camera.getOffset()[0], Camera.getOffset()[1]);

      for (var i = 0; i < this.components.length; i++) {
        if (this.components[i].enabled) {
          this.components[i].render();
        }
      }

      var line;
      for (i = 0; i < this.debugDrawLinesComponents.length; i++) {
        for (var j = 0; j < this.debugDrawLinesComponents[i].debugDrawLines.length; j++) {
          line = this.debugDrawLinesComponents[i].debugDrawLines[j];
          renderer.strokeStyle = j % 2 == 0 ? 'red' : 'green';
          renderer.beginPath();
          renderer.moveTo(line[0], line[1]);
          renderer.lineTo(line[2], line[3]);
          renderer.stroke();
        }
      }
    }
  }]);

  return RenderingEngine;
}(Control);

module.exports = RenderingEngine;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);

var TailManager = function (_Control) {
  _inherits(TailManager, _Control);

  function TailManager(args) {
    _classCallCheck(this, TailManager);

    var _this = _possibleConstructorReturn(this, (TailManager.__proto__ || Object.getPrototypeOf(TailManager)).call(this, args));

    _this.oscillating = false;
    _this.oscillationMagnitude = 0;
    _this.progress = 0;
    _this.onGround = false;
    _this.blendAnimationLength = 0;
    _this.normalizationNum = 0;
    _this.tailPos = 0;
    _this.lastYPos = 0;
    _this.oscillationRate = 100;
    return _this;
  }

  _createClass(TailManager, [{
    key: 'init',
    value: function init() {
      this.blendAnimationLength = this.owner.controls.tailSprite.currentAnimation.length;
      this.normalizationNum = Math.ceil(this.blendAnimationLength / 2);
    }
  }, {
    key: 'changeDirection',
    value: function changeDirection(dir) {
      if (dir != 0) {
        this.owner.controls.tailSprite.setAnimation(dir == 1 ? 'Rblend' : 'Lblend');
      }
    }
  }, {
    key: 'oscillate',
    value: function oscillate() {
      this.progress += this.getGame().dt / this.oscillationRate;
      this.tailPos = Math.cos(this.progress) * this.oscillationMagnitude;
      this.oscillationMagnitude -= this.getGame().dt / 150;
      this.oscillationMagnitude = Math.max(this.oscillationMagnitude, 0);
    }
  }, {
    key: 'startOscillation',
    value: function startOscillation(startPos) {
      this.oscillationMagnitude = startPos;
      this.progress = 0;
    }
  }, {
    key: 'tweenTowards',
    value: function tweenTowards(pos) {
      var diff = pos - this.tailPos;
      if (Math.abs(diff) < 0.5) {
        this.tailPos = this.owner.controls.velocity.y;
      } else {
        this.tailPos += 0.5 * Math.sign(diff);
      }
    }
  }, {
    key: 'offsetTowardsButtPosition',
    value: function offsetTowardsButtPosition() {
      if ((this.owner.controls.bodySprite.currentAnimationName == 'Lwalk' || this.owner.controls.bodySprite.currentAnimationName == 'Rwalk') && this.owner.controls.bodySprite.currentFrameNum == 1) {
        this.owner.controls.tailSprite.offset[1] = -1;
      } else {
        this.owner.controls.tailSprite.offset[1] = 0;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.offsetTowardsButtPosition();
      var yPos = this.owner.controls.transform.position[1];
      var yPosDiff = yPos - this.lastYPos;
      if (Math.abs(yPosDiff) >= 1) {
        this.oscillating = false;
        this.tweenTowards(yPosDiff);
      } else if (!this.oscillating) {
        this.oscillating = true;
        this.startOscillation(this.tailPos);
      } else {
        if (this.owner.controls.velocity.x != 0) {
          this.oscillationMagnitude = Math.max(this.oscillationMagnitude, 1);
        }
        this.oscillate();
      }
      this.owner.controls.tailSprite.setFrame(this.blendAnimationLength - Math.floor(this.tailPos / 2 + this.normalizationNum));
      this.lastYPos = yPos;
    }
  }]);

  return TailManager;
}(Control);

module.exports = TailManager;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = __webpack_require__(1);
var $ = __webpack_require__(5);

var Velocity = function (_Control) {
  _inherits(Velocity, _Control);

  function Velocity(args) {
    _classCallCheck(this, Velocity);

    var _this = _possibleConstructorReturn(this, (Velocity.__proto__ || Object.getPrototypeOf(Velocity)).call(this, args));

    _this.name = 'velocity';
    _this.x = 0;
    _this.y = 0;
    return _this;
  }

  _createClass(Velocity, [{
    key: 'applyVelocity',
    value: function applyVelocity() {
      this.owner.controls.transform.moveBy(this.x, this.y);
    }
  }, {
    key: 'previewNewPosition',
    value: function previewNewPosition() {
      return $(this.owner.controls.transform.position).plusVector([this.x, this.y]).$;
    }
  }]);

  return Velocity;
}(Control);

module.exports = Velocity;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);
var State = __webpack_require__(4);
var StateMachine = __webpack_require__(7);

var DebugManager = function DebugManager(args) {
  _classCallCheck(this, DebugManager);

  this.name = 'debugManager';
  this.game = args.game;
  this.clipboard = [];

  this.canvasManagers = {
    scene: new (__webpack_require__(46))({
      game: this.game,
      canvas: document.getElementById('canvas'),
      clipboard: this.clipboard
    }),
    inspector: new (__webpack_require__(45))({ game: this.game,
      canvas: document.getElementById('inspector-canvas'),
      clipboard: this.clipboard
    })
  };

  this.canvasManagers.inspector.changeState('initial');
};

module.exports = DebugManager;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Camera = __webpack_require__(2);
var input = __webpack_require__(3);
var State = __webpack_require__(4);
var StateMachine = __webpack_require__(7);

var InspectorManager = function (_StateMachine) {
  _inherits(InspectorManager, _StateMachine);

  function InspectorManager(args) {
    _classCallCheck(this, InspectorManager);

    var _this = _possibleConstructorReturn(this, (InspectorManager.__proto__ || Object.getPrototypeOf(InspectorManager)).call(this, {
      name: 'sceneViewManager',
      states: {
        initial: __webpack_require__(48),
        multipleSelection: __webpack_require__(49),
        scroll: __webpack_require__(18),
        off: __webpack_require__(17)
      },
      initialState: 'off'
    }));

    _this.canvas = args.canvas;
    _this.renderer = _this.canvas.getContext('2d');
    _this.clipboard = args.clipboard;
    _this.game = args.game;

    _this.buttons = {
      atlasSelect: document.getElementById('atlas-select'),
      drawAtlasGrid: document.getElementById('inspector-show-grid'),
      copy: document.getElementById('copy-button')
    };

    _this.keys = {
      space: 32,
      shift: 16
    };

    _this.updateLoop;

    _this.shouldShowGrid = true;
    _this.shouldSnapToGrid = false;

    _this.highlightedObject;
    _this.highlightedTileCoords;
    _this.highlightedTile;
    _this.worldSelectionStart;
    _this.worldSelectionEnd;
    _this.mapSelectionStart;
    _this.mapSelectionEnd;
    _this.selectedTiles;
    _this.selectionWidth, _this.selectionHeight;
    _this.objectDeltaX;
    _this.objectDeltaY;

    _this.lastMouseX, _this.lastMouseY;
    _this.currentMouseX, _this.currentMouseY;
    _this.mouseDown = false;
    _this.shiftDown = false;

    _this.pixelWidth;
    _this.pixelHeight;

    _this.gridCanvas = document.createElement('canvas');
    _this.gridCtx;
    _this.gridWidth = 320;
    _this.gridHeight = 240;

    _this.atlasImage;
    _this.atlasName;

    _this.buttons.atlasSelect.onchange = function (e) {
      _this.atlasImage = new Image();
      _this.atlasImage.onload = _this.render.bind(_this);
      _this.atlasName = e.target.value;
      _this.atlasImage.src = '../assets/' + _this.atlasName;
    };
    _this.buttons.drawAtlasGrid.onchange = function (e) {
      _this.shouldShowGrid = !_this.shouldShowGrid;
      _this.render();
    };
    _this.buttons.copy.onclick = _this.copy.bind(_this);

    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onKeyUp = _this.onKeyUp.bind(_this);
    return _this;
  }

  _createClass(InspectorManager, [{
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      this.currentState.onMouseDown.call(this, e);
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      this.currentState.onMouseMove.call(this, e);
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      this.currentState.onMouseUp.call(this, e);
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      this.currentState.onKeyDown.call(this, e);
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      this.currentState.onKeyUp.call(this, e);
    }
  }, {
    key: 'advanceFrame',
    value: function advanceFrame(e) {
      e.preventDefault();
      this.game.advanceFrame();
    }
  }, {
    key: 'copy',
    value: function copy(e) {
      var selectionTileWidth = this.selectionWidth / 32;
      var selectionTileHeight = this.selectionHeight / 32;

      this.clipboard = [];

      for (var y = 0; y < selectionTileHeight; y++) {
        this.clipboard[y] = [];
        for (var x = 0; x < selectionTileWidth; x++) {
          var tile = {};
          tile.image = this.atlasImage;
          tile.coords = [this.worldSelectionStart[0] + x * 32, this.worldSelectionStart[1] + y * 32];
          this.clipboard[y][x] = tile;
        }
      }
    }
  }, {
    key: 'highlightObject',
    value: function highlightObject(object) {
      var _renderer;

      this.renderer.beginPath();
      (_renderer = this.renderer).rect.apply(_renderer, _toConsumableArray(object.controls.transform.position).concat(_toConsumableArray(object.controls.transform.size)));
      this.renderer.stroke();
    }
  }, {
    key: 'highlightTile',
    value: function highlightTile(tile) {
      var _renderer2;

      this.renderer.beginPath();
      (_renderer2 = this.renderer).rect.apply(_renderer2, _toConsumableArray(tile));
      this.renderer.stroke();
    }
  }, {
    key: 'highlightTiles',
    value: function highlightTiles() {
      var _renderer3;

      this.renderer.beginPath();
      (_renderer3 = this.renderer).rect.apply(_renderer3, _toConsumableArray(this.worldSelectionStart).concat([this.selectionWidth, this.selectionHeight]));
      this.renderer.stroke();
    }
  }, {
    key: 'getPointerWorldspace',
    value: function getPointerWorldspace() {
      return [this.currentMouseX / 2, this.currentMouseY / 2];
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.atlasImage) {
        return;
      }
      this.renderer.clearRect(0, 0, 320, 240);
      this.renderer.drawImage(this.atlasImage, 0, 0);
      if (this.shouldShowGrid) {
        var startX = 0;
        var startY = 0;
        this.renderer.drawImage(this.gridCanvas, 0, 0, this.gridWidth, this.gridHeight, startX, startY, this.gridWidth, this.gridHeight);
      }
      if (this.highlightedObject) {
        this.highlightObject(this.highlightedObject);
      } else if (this.highlightedTileCoords) {
        this.highlightTile(this.highlightedTileCoords);
      }
    }
  }, {
    key: 'drawGridCanvas',
    value: function drawGridCanvas(renderer, width, height) {
      renderer.strokeStyle = 'white';
      for (var i = 0; i <= this.gridWidth; i += 32) {
        renderer.beginPath();
        renderer.moveTo(i, 0);
        renderer.lineTo(i, this.gridWidth);
        renderer.stroke();
      }
      for (var i = 0; i <= this.gridHeight; i += 32) {
        renderer.beginPath();
        renderer.moveTo(0, i);
        renderer.lineTo(this.gridHeight, i);
        renderer.stroke();
      }
    }
  }]);

  return InspectorManager;
}(StateMachine);

module.exports = InspectorManager;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);
var State = __webpack_require__(4);
var StateMachine = __webpack_require__(7);

var DebugState = function (_State) {
  _inherits(DebugState, _State);

  function DebugState() {
    _classCallCheck(this, DebugState);

    return _possibleConstructorReturn(this, (DebugState.__proto__ || Object.getPrototypeOf(DebugState)).apply(this, arguments));
  }

  _createClass(DebugState, [{
    key: 'onMouseUp',
    value: function onMouseUp() {}
  }, {
    key: 'onMouseDown',
    value: function onMouseDown() {}
  }, {
    key: 'onMouseMove',
    value: function onMouseMove() {}
  }, {
    key: 'onKeyDown',
    value: function onKeyDown() {}
  }, {
    key: 'onKeyUp',
    value: function onKeyUp() {}
  }]);

  return DebugState;
}(State);

var DebugManager = function (_StateMachine) {
  _inherits(DebugManager, _StateMachine);

  function DebugManager(args) {
    _classCallCheck(this, DebugManager);

    var _this2 = _possibleConstructorReturn(this, (DebugManager.__proto__ || Object.getPrototypeOf(DebugManager)).call(this, {
      name: 'debugManager',
      states: {
        initial: __webpack_require__(47),
        selection: __webpack_require__(54),
        multipleSelection: __webpack_require__(53),
        scroll: __webpack_require__(18),
        moveObject: __webpack_require__(51),
        moveTile: __webpack_require__(52),
        moveMultipleTiles: __webpack_require__(50),
        off: __webpack_require__(17)
      },
      initialState: 'off'
    }));

    _this2.buttons = {
      start: document.getElementById('start-button'),
      advanceFrame: document.getElementById('advance-frame'),
      scroll: document.getElementById('scroll-button'),
      sceneSelect: document.getElementById('scene-select'),
      showGrid: document.getElementById('show-grid'),
      snap: document.getElementById('snap'),
      layer1: document.getElementById('layer-1'),
      layer2: document.getElementById('layer-2'),
      layer3: document.getElementById('layer-3'),
      exportMap: document.getElementById('export-map'),
      undo: document.getElementById('undo'),
      paste: document.getElementById('paste')
    };

    _this2.keys = {
      space: 32,
      shift: 16
    };

    _this2.updateLoop;

    _this2.renderer = renderer;
    _this2.clipboard = args.clipboard;

    _this2.shouldShowGrid = false;
    _this2.shouldSnapToGrid = false;

    _this2.highlightedObject;
    _this2.highlightedTileCoords;
    _this2.highlightedTile;
    _this2.worldSelectionStart;
    _this2.worldSelectionEnd;
    _this2.mapSelectionStart;
    _this2.mapSelectionEnd;
    _this2.selectedTiles;
    _this2.selectionWidth, _this2.selectionHeight;
    _this2.objectDeltaX;
    _this2.objectDeltaY;

    _this2.lastMouseX, _this2.lastMouseY;
    _this2.currentMouseX, _this2.currentMouseY;
    _this2.mouseDown = false;
    _this2.shiftDown = false;

    _this2.canvas = document.getElementById('canvas');
    _this2.game;
    _this2.renderingEngine;
    _this2.player;
    _this2.objects;
    _this2.map;
    _this2.lastMap;
    _this2.pixelWidth;
    _this2.pixelHeight;

    _this2.gridCanvas = document.createElement('canvas');
    _this2.gridCtx;
    _this2.gridWidth;
    _this2.gridHeight;

    _this2.inspectorCanvas = document.getElementById('inspector-canvas');
    _this2.inspector = _this2.inspectorCanvas.getContext('2d');
    _this2.atlasImage;
    _this2.inspectorGridCanvas = document.createElement('canvas');
    _this2.inspectorGridCtx = _this2.inspectorGridCanvas.getContext('2d');

    _this2.shouldDrawAtlasGrid = true;

    _this2.game = args.game;
    _this2.buttons.start.onclick = function (e) {
      e.preventDefault();
      _this2.changeState(_this2.currentStateName == 'off' ? 'initial' : 'off');
    };
    _this2.buttons.scroll.onclick = function (e) {
      e.preventDefault();
      _this2.changeState(_this2.currentStateName == 'scroll' ? 'selection' : 'scroll');
    };
    _this2.buttons.showGrid.onchange = function (e) {
      e.preventDefault();
      _this2.shouldShowGrid = !_this2.shouldShowGrid;
    };
    _this2.buttons.snap.onchange = function (e) {
      e.preventDefault();
      _this2.shouldSnapToGrid = !_this2.shouldSnapToGrid;
    };
    _this2.buttons.advanceFrame.onclick = _this2.advanceFrame.bind(_this2);
    _this2.buttons.layer1.onchange = function (e) {
      e.preventDefault();
      _this2.renderingEngine.enableLayer(0, _this2.buttons.layer1.checked);
    };
    _this2.buttons.layer2.onchange = function (e) {
      e.preventDefault();
      _this2.renderingEngine.enableLayer(1, _this2.buttons.layer2.checked);
    };
    _this2.buttons.layer3.onchange = function (e) {
      e.preventDefault();
      _this2.renderingEngine.enableLayer(2, _this2.buttons.layer3.checked);
    };
    _this2.buttons.exportMap.onclick = function (e) {
      e.preventDefault();
      var textMap = _this2.map.this.map.this.map(function (e) {
        return e.join('');
      }).join('\n'); //Yes this sounds silly
      var blob = new Blob([textMap], { type: 'text/plain;charset=utf-8;' });
      var el = window.document.createElement('a');
      el.href = window.URL.createObjectURL(blob);
      el.download = 'this.map.txt';
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
      window.URL.revokeObjectURL(blob);
    };

    // this.buttons.sceneSelect.onchange = this.selectScene
    // this.buttons.placePlayer.onclick = togglePlacePlayerMode

    _this2.onMouseDown = _this2.onMouseDown.bind(_this2);
    _this2.onMouseMove = _this2.onMouseMove.bind(_this2);
    _this2.onMouseUp = _this2.onMouseUp.bind(_this2);
    _this2.onKeyDown = _this2.onKeyDown.bind(_this2);
    _this2.onKeyUp = _this2.onKeyUp.bind(_this2);
    return _this2;
  }

  _createClass(DebugManager, [{
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      this.currentState.onMouseDown.call(this, e);
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      this.currentState.onMouseMove.call(this, e);
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      this.currentState.onMouseUp.call(this, e);
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      this.currentState.onKeyDown.call(this, e);
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      this.currentState.onKeyUp.call(this, e);
    }
  }, {
    key: 'advanceFrame',
    value: function advanceFrame(e) {
      e.preventDefault();
      this.game.advanceFrame();
    }
  }, {
    key: 'enableAllButtons',
    value: function enableAllButtons() {
      for (var key in this.buttons) {
        this.buttons[key].disabled = false;
      }
    }
  }, {
    key: 'disableAllButtonsExcept',
    value: function disableAllButtonsExcept(button) {
      for (var key in this.buttons) {
        if (this.buttons[key] != button) {
          this.buttons[key].disabled = "disabled";
        }
      }
    }
  }, {
    key: 'selectScene',
    value: function selectScene(e) {
      this.game.replaceTop(e.target.value);
      this.renderingEngine.update();
    }
  }, {
    key: 'highlightObject',
    value: function highlightObject(object) {
      var _renderer;

      this.renderer.beginPath();
      (_renderer = this.renderer).rect.apply(_renderer, _toConsumableArray(object.controls.transform.position).concat(_toConsumableArray(object.controls.transform.size)));
      this.renderer.stroke();
    }
  }, {
    key: 'highlightTile',
    value: function highlightTile(tile) {
      var _renderer2;

      this.renderer.beginPath();
      (_renderer2 = this.renderer).rect.apply(_renderer2, _toConsumableArray(tile));
      this.renderer.stroke();
    }
  }, {
    key: 'highlightTiles',
    value: function highlightTiles() {
      var _renderer3;

      this.renderer.beginPath();
      (_renderer3 = this.renderer).rect.apply(_renderer3, _toConsumableArray(this.worldSelectionStart).concat([this.selectionWidth, this.selectionHeight]));
      this.renderer.stroke();
    }
  }, {
    key: 'getPointerWorldspace',
    value: function getPointerWorldspace() {
      var camOffset = Camera.getOffset();
      return [this.currentMouseX / 2 - camOffset[0], this.currentMouseY / 2 - camOffset[1]];
    }
  }, {
    key: 'render',
    value: function render() {
      this.renderingEngine.update();
      if (this.shouldShowGrid) {
        var camOffset = Camera.getOffset();
        var startX = -camOffset[0] + camOffset[0] % 32;
        var startY = -camOffset[1] + camOffset[1] % 32;
        this.renderer.drawImage(this.gridCanvas, 0, 0, this.gridWidth, this.gridHeight, startX, startY, this.gridWidth, this.gridHeight);
      }
      if (this.highlightedObject) {
        this.highlightObject(this.highlightedObject);
      } else if (this.highlightedTileCoords) {
        this.highlightTile(this.highlightedTileCoords);
      }
    }
  }, {
    key: 'renderInspector',
    value: function renderInspector() {
      this.inspector.clearRect(0, 0, 320, 320);
      this.inspector.drawImage(this.atlasImage, 0, 0);
      if (this.shouldDrawAtlasGrid) {
        this.inspector.drawImage(this.inspectorGridCanvas, 0, 0);
      }
    }
  }, {
    key: 'drawGridCanvas',
    value: function drawGridCanvas(ctx, width, height) {
      ctx.strokeStyle = 'white';
      for (var i = 0; i <= this.gridWidth; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, this.gridWidth);
        ctx.stroke();
      }
      for (var i = 0; i <= this.gridHeight; i += 32) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(this.gridHeight, i);
        ctx.stroke();
      }
    }
  }]);

  return DebugManager;
}(StateMachine);

module.exports = DebugManager;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DebugState = __webpack_require__(6);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);

var initial = new DebugState({
  enter: function enter() {
    this.game.stop();
    input.turnOff();
    this.buttons.start.innerHTML = '<i class="fa fa-play"></i>';
    this.enableAllButtons();
    this.game.debugMode = true;

    this.camera = this.game.currentScene.getControlsByName('this.camera')[0];
    this.renderingEngine = this.game.currentScene.getControlsByName('renderingEngine')[0];
    this.player = this.game.currentScene.getObjectByName('this.player');
    this.objects = this.game.currentScene.objects.filter(function (e) {
      return !e.name.match(/background/) && e.active && e.controls.transform;
    });
    this.map = this.game.currentScene.getControlsByName('mapRenderer')[0].tileMap;

    this.pixelWidth = Camera.getPixelWidth();
    this.pixelHeight = Camera.getPixelHeight();
    this.gridWidth = this.pixelWidth + 32;
    this.gridHeight = this.pixelWidth + 32;

    this.gridCanvas.width = this.gridWidth;
    this.gridCanvas.height = this.gridHeight;
    this.gridCtx = this.gridCanvas.getContext('2d');
    this.drawGridCanvas(this.gridCtx, this.gridCanvas.width, this.gridCanvas.height);

    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);

    this.render();

    this.changeState('selection');
  }
});

module.exports = initial;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DebugState = __webpack_require__(6);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);

var inspectorInitial = new DebugState({
  enter: function enter() {
    this.gridCanvas.width = this.gridWidth;
    this.gridCanvas.height = this.gridHeight;
    this.gridCtx = this.gridCanvas.getContext('2d');
    this.drawGridCanvas(this.gridCtx, this.gridCanvas.width, this.gridCanvas.height);

    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);

    this.changeState('multipleSelection');
  }
});

module.exports = inspectorInitial;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DebugState = __webpack_require__(6);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);

var inspectorMultipleSelection = new DebugState({
  enter: function enter(e) {
    this.worldSelectionStart = null;
    this.updateLoop = requestAnimationFrame(this.update.bind(this));
  },

  onMouseDown: function onMouseDown(e) {
    if (this.mouseDown) {
      return;
    }
    var pointer = this.getPointerWorldspace();
    this.worldSelectionStart = [pointer[0] - pointer[0] % 32, pointer[1] - pointer[1] % 32];
    this.worldSelectionEnd = [].concat(_toConsumableArray(this.worldSelectionStart));
    this.selectionWidth = 32;
    this.selectionHeight = 32;
    this.renderer.strokeStyle = 'red';
    this.highlightedTile = null;
    this.highlightedTileCoords = null;
    this.mouseDown = true;
  },

  onMouseUp: function onMouseUp(e) {
    this.mouseDown = false;
  },

  onMouseMove: function onMouseMove(e) {
    this.lastMouseX = this.currentMouseX;
    this.lastMouseY = this.currentMouseY;
    this.currentMouseX = e.layerX;
    this.currentMouseY = e.layerY;

    if (this.mouseDown) {
      var pointer = this.getPointerWorldspace();
      this.worldSelectionEnd = [pointer[0] + (32 - pointer[0] % 32), pointer[1] + (32 - pointer[1] % 32)];
      this.selectionWidth = this.worldSelectionEnd[0] - this.worldSelectionStart[0];
      this.selectionHeight = this.worldSelectionEnd[1] - this.worldSelectionStart[1];
    }
  },

  update: function update() {
    this.updateLoop = requestAnimationFrame(this.update.bind(this));

    this.render();
    if (this.worldSelectionStart) {
      this.highlightTiles();
    }
  }
});

module.exports = inspectorMultipleSelection;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DebugState = __webpack_require__(6);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);

var moveMultipleTiles = new DebugState({
  enter: function enter() {
    renderer.strokeStyle = 'green';

    this.selectionWidth = this.worldSelectionEnd[0] - this.worldSelectionStart[0];
    this.selectionHeight = this.worldSelectionEnd[1] - this.worldSelectionStart[1];

    var mapStartY = this.mapSelectionStart[0];
    var mapEndY = this.mapSelectionEnd[0];
    var mapStartX = this.mapSelectionStart[1];
    var mapEndX = this.mapSelectionEnd[1];

    this.selectedTiles = [];
    for (var y = mapStartY; y <= mapEndY; y++) {
      var row = [];
      for (var x = mapStartX; x <= mapEndX; x++) {
        row.push(this.map.map[y][x]);
        this.map.map[y][x] = ' ';
      }
      this.selectedTiles.push(row);
    }
  },

  exit: function exit() {
    var _map;

    var mapStart = (_map = this.map).worldToMapCoords.apply(_map, _toConsumableArray(this.worldSelectionStart));
    for (var y = 0; y < this.selectedTiles.length; y++) {
      for (var x = 0; x < this.selectedTiles[y].length; x++) {
        this.map.map[mapStart[0] + y][mapStart[1] + x] = this.selectedTiles[y][x];
      }
    }
  },

  onMouseDown: function onMouseDown(e) {
    var pointer = this.getPointerWorldspace();
    if (pointer[0] < this.worldSelectionStart[0] || pointer[0] > this.worldSelectionEnd[0] || pointer[1] < this.worldSelectionStart[1] || pointer[1] > this.worldSelectionEnd[1]) {
      this.changeState('selection');
      return;
    }
    this.objectDeltaX = this.worldSelectionStart[0] - pointer[0];
    this.objectDeltaY = this.worldSelectionStart[1] - pointer[1];
    this.mouseDown = true;
  },

  onMouseMove: function onMouseMove(e) {
    this.lastMouseX = this.currentMouseX;
    this.lastMouseY = this.currentMouseY;
    this.currentMouseX = e.layerX;
    this.currentMouseY = e.layerY;
  },

  onMouseUp: function onMouseUp(e) {
    this.mouseDown = false;
  },

  update: function update() {
    this.updateLoop = requestAnimationFrame(this.update.bind(this));

    if (!this.mouseDown) {
      return;
    }

    var pointer = this.getPointerWorldspace();
    var newX = pointer[0] + this.objectDeltaX;
    var newY = pointer[1] + this.objectDeltaY;

    var distFromLeftLine = newX % 32;
    var distFromAboveLine = newY % 32;
    if (distFromLeftLine <= 16) {
      newX -= distFromLeftLine;
    } else {
      newX += 32 - distFromLeftLine;
    }
    if (distFromAboveLine <= 16) {
      newY -= distFromAboveLine;
    } else {
      newY += 32 - distFromAboveLine;
    }

    var deltaX = newX - this.worldSelectionStart[0];
    var deltaY = newX - this.worldSelectionStart[1];
    this.worldSelectionStart[0] = newX;
    this.worldSelectionStart[1] = newY;
    this.worldSelectionEnd[0] += deltaX;
    this.worldSelectionEnd[1] += deltaY;

    this.render();
    for (var y = 0; y < this.selectedTiles.length; y++) {
      for (var x = 0; x < this.selectedTiles[y].length; x++) {
        renderer.drawImage(this.game.currentScene.assetManager.assets[this.map.key[this.selectedTiles[y][x]].sheet], this.map.key[this.selectedTiles[y][x]].coords.x, this.map.key[this.selectedTiles[y][x]].coords.y, this.map.key[this.selectedTiles[y][x]].coords.w, this.map.key[this.selectedTiles[y][x]].coords.h, this.worldSelectionStart[0] + x * 32, this.worldSelectionStart[1] + y * 32, this.map.key[this.selectedTiles[y][x]].coords.w, this.map.key[this.selectedTiles[y][x]].coords.h);
      }
    }
    this.highlightTiles();
  }
});

module.exports = moveMultipleTiles;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DebugState = __webpack_require__(6);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);

var moveObject = new DebugState({
  enter: function enter() {
    renderer.strokeStyle = 'red';
    var pointer = this.getPointerWorldspace();
    this.objectDeltaX = this.highlightedObject.controls.transform.position[0] - pointer[0];
    this.objectDeltaY = this.highlightedObject.controls.transform.position[1] - pointer[1];
  },

  onMouseMove: function onMouseMove(e) {
    this.lastMouseX = this.currentMouseX;
    this.lastMouseY = this.currentMouseY;
    this.currentMouseX = e.layerX;
    this.currentMouseY = e.layerY;
  },

  onMouseUp: function onMouseUp(e) {
    this.changeState('selection');
  },

  update: function update() {
    this.updateLoop = requestAnimationFrame(this.update.bind(this));

    if (this.currentMouseX == this.lastMouseX && this.currentMouseY == this.lastMouseY) {
      return;
    }

    var pointer = this.getPointerWorldspace();
    var newX = pointer[0] + this.objectDeltaX;
    var newY = pointer[1] + this.objectDeltaY;
    if (this.shouldSnapToGrid) {
      var distFromLeftLine = newX % 32;
      var distFromAboveLine = newY % 32;
      if (distFromLeftLine < 5) {
        newX -= distFromLeftLine;
      } else if (distFromLeftLine > 32 - 5) {
        newX += 32 - distFromLeftLine;
      }
      if (distFromAboveLine < 5) {
        newY -= distFromAboveLine;
      } else if (distFromAboveLine > 32 - 5) {
        newY += 32 - distFromAboveLine;
      }
    }
    this.highlightedObject.controls.transform.position[0] = newX;
    this.highlightedObject.controls.transform.position[1] = newY;
    this.render();
  }
});

module.exports = moveObject;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DebugState = __webpack_require__(6);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);

var moveTile = new DebugState({
  enter: function enter() {
    var _map;

    renderer.strokeStyle = 'red';
    var pointer = this.getPointerWorldspace();
    this.objectDeltaX = this.highlightedTileCoords[0] - pointer[0];
    this.objectDeltaY = this.highlightedTileCoords[1] - pointer[1];

    var mapCoords = (_map = this.map).worldToMapCoords.apply(_map, _toConsumableArray(pointer));
    this.map.map[mapCoords[0]][mapCoords[1]] = ' ';
  },

  exit: function exit() {
    var mapCoords = this.map.worldToMapCoords(this.highlightedTileCoords[0], this.highlightedTileCoords[1]);
    this.map.map[mapCoords[0]][mapCoords[1]] = this.highlightedTile;
  },

  onMouseMove: function onMouseMove(e) {
    this.lastMouseX = this.currentMouseX;
    this.lastMouseY = this.currentMouseY;
    this.currentMouseX = e.layerX;
    this.currentMouseY = e.layerY;
  },

  onMouseUp: function onMouseUp(e) {
    this.changeState('selection');
  },

  update: function update() {
    this.updateLoop = requestAnimationFrame(this.update.bind(this));

    var pointer = this.getPointerWorldspace();
    var newX = pointer[0] + this.objectDeltaX;
    var newY = pointer[1] + this.objectDeltaY;
    var distFromLeftLine = newX % 32;
    var distFromAboveLine = newY % 32;
    if (distFromLeftLine <= 16) {
      newX -= distFromLeftLine;
    } else {
      newX += 32 - distFromLeftLine;
    }
    if (distFromAboveLine <= 16) {
      newY -= distFromAboveLine;
    } else {
      newY += 32 - distFromAboveLine;
    }
    this.highlightedTileCoords[0] = newX;
    this.highlightedTileCoords[1] = newY;

    this.render();
    renderer.drawImage(this.game.currentScene.assetManager.assets[this.map.key[this.highlightedTile].sheet], this.map.key[this.highlightedTile].coords.x, this.map.key[this.highlightedTile].coords.y, this.map.key[this.highlightedTile].coords.w, this.map.key[this.highlightedTile].coords.h, this.highlightedTileCoords[0], this.highlightedTileCoords[1], this.map.key[this.highlightedTile].coords.w, this.map.key[this.highlightedTile].coords.h);
  }
});

module.exports = moveTile;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DebugState = __webpack_require__(6);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);

var multipleSelection = new DebugState({
  enter: function enter(e) {
    this.worldSelectionStart = null;
  },

  onMouseDown: function onMouseDown(e) {
    var _map;

    if (this.mouseDown) {
      return;
    }
    var pointer = this.getPointerWorldspace();
    this.worldSelectionStart = [pointer[0] - pointer[0] % 32, pointer[1] - pointer[1] % 32];
    this.mapSelectionStart = (_map = this.map).worldToMapCoords.apply(_map, _toConsumableArray(pointer));
    this.worldSelectionEnd = [].concat(_toConsumableArray(this.worldSelectionStart));
    this.mapSelectionEnd = [].concat(_toConsumableArray(this.mapSelectionStart));
    this.selectionWidth = 32;
    this.selectionHeight = 32;
    renderer.strokeStyle = 'red';
    this.highlightedTile = null;
    this.highlightedTileCoords = null;
    this.mouseDown = true;
  },

  onMouseUp: function onMouseUp(e) {
    this.mouseDown = false;
  },

  onMouseMove: function onMouseMove(e) {
    this.lastMouseX = this.currentMouseX;
    this.lastMouseY = this.currentMouseY;
    this.currentMouseX = e.layerX;
    this.currentMouseY = e.layerY;

    if (this.mouseDown) {
      var _map2;

      var pointer = this.getPointerWorldspace();
      this.worldSelectionEnd = [pointer[0] + (32 - pointer[0] % 32), pointer[1] + (32 - pointer[1] % 32)];
      this.mapSelectionEnd = (_map2 = this.map).worldToMapCoords.apply(_map2, _toConsumableArray(pointer));
      this.selectionWidth = this.worldSelectionEnd[0] - this.worldSelectionStart[0];
      this.selectionHeight = this.worldSelectionEnd[1] - this.worldSelectionStart[1];
    }
  },

  onKeyUp: function onKeyUp(e) {
    if (e.keyCode == this.keys.shift) {
      if (this.worldSelectionStart) {
        this.changeState('moveMultipleTiles');
      } else {
        this.changeState('selection');
      }
    }
  },

  update: function update() {
    this.updateLoop = requestAnimationFrame(this.update.bind(this));

    this.render();
    if (this.worldSelectionStart) {
      this.highlightTiles();
    }
  }
});

module.exports = multipleSelection;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DebugState = __webpack_require__(6);
var renderer = __webpack_require__(0);
var Camera = __webpack_require__(2);
var input = __webpack_require__(3);

var selection = new DebugState({
  enter: function enter() {
    this.enableAllButtons();
    renderer.strokeStyle = 'green';
    this.updateLoop = requestAnimationFrame(this.update.bind(this));
  },

  onMouseDown: function onMouseDown(e) {
    if (this.highlightedObject) {
      this.changeState('moveObject');
    } else if (this.highlightedTileCoords) {
      this.changeState('moveTile');
    }
  },

  onMouseMove: function onMouseMove(e) {
    this.lastMouseX = this.currentMouseX;
    this.lastMouseY = this.currentMouseY;
    this.currentMouseX = e.layerX;
    this.currentMouseY = e.layerY;
  },

  onKeyDown: function onKeyDown(e) {
    if (e.keyCode == this.keys.space) {
      this.changeState('scroll');
    } else if (e.keyCode == this.keys.shift) {
      this.changeState('multipleSelection');
    }
  },

  update: function update() {
    this.updateLoop = requestAnimationFrame(this.update.bind(this));
    if (this.currentMouseX == this.lastMouseX && this.currentMouseY == this.lastMouseY) {
      return;
    }

    var pointer = this.getPointerWorldspace();
    var boundingBox;
    this.highlightedObject = null;
    for (var i = 0; i < this.objects.length; i++) {
      boundingBox = this.objects[i].controls.transform.getBounds();
      if (pointer[0] > boundingBox[0] && pointer[0] < boundingBox[2] && pointer[1] > boundingBox[1] && pointer[1] < boundingBox[3]) {
        this.highlightedObject = this.objects[i];
        this.highlightObject(this.highlightedObject);
        break;
      }
    }
    if (!this.highlightedObject) {
      var _map;

      var mapCoords = (_map = this.map).worldToMapCoords.apply(_map, _toConsumableArray(pointer));
      var tile = this.map.map[mapCoords[0]][mapCoords[1]];
      // if (tile != ' '){
      this.highlightedTile = tile;
      this.highlightedTileCoords = [pointer[0] - pointer[0] % 32, pointer[1] - pointer[1] % 32, 32, 32];
      // } else {
      // this.highlightedTile = null
      // this.highlightedTileCoords = null
      // }
    }
    this.render();
  }
});

module.exports = selection;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(9);
var Scene = __webpack_require__(8);
var AssetManager = __webpack_require__(13);

var titlescreen = __webpack_require__(25);
var level01 = __webpack_require__(24);

var game = new Game({
  scenes: {
    titlescreen: titlescreen,
    level01: level01
  }
});

game.start();
game.push('titlescreen');

module.exports = { $: __webpack_require__(5) };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Math2 = {
  clamp: function clamp(num, min, max) {
    return Math.max(Math.min(num, max), min);
  }
};

module.exports = Math2;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var key = {
  // inner
  0: {
    sheet: 'groundAtlas',
    coords: { x: 32, y: 32, w: 32, h: 32 },
    rays: [],
    onHit: onHit
  },
  // flat
  8325038: {
    sheet: 'groundAtlas',
    coords: { x: 32, y: 0, w: 32, h: 32 },
    rays: [{
      ray: [0, 0, 32, 0],
      normal: [0, -1]
    }],
    onHit: onHit
  },
  // left edge
  16416927: {
    sheet: 'groundAtlas',
    coords: { x: 0, y: 32, w: 32, h: 32 },
    rays: [{
      ray: [0, 32, 0, 0],
      normal: [-1, 0]
    }],
    onHit: onHit
  },
  // right edge
  687282: {
    sheet: 'groundAtlas',
    coords: { x: 64, y: 32, w: 32, h: 32 },
    rays: [{
      ray: [32, 0, 32, 32],
      normal: [1, 0]
    }],
    onHit: onHit
  },
  // upper left corner
  11701498: {
    sheet: 'groundAtlas',
    coords: { x: 0, y: 0, w: 32, h: 32 },
    rays: [{
      ray: [0, 0, 32, 0],
      normal: [0, -1]
    }, {
      ray: [0, 32, 0, 0],
      normal: [-1, 0]
    }],
    onHit: onHit
  },
  // upper right corner
  10987514: {
    sheet: 'groundAtlas',
    coords: { x: 64, y: 0, w: 32, h: 32 },
    rays: [{
      ray: [0, 0, 32, 0],
      normal: [0, -1]
    }, {
      ray: [32, 0, 32, 32],
      normal: [1, 0]
    }],
    onHit: onHit
  },
  // gentle slope up 1
  11604909: {
    sheet: 'groundAtlas',
    coords: { x: 128, y: 96, w: 32, h: 32 },
    rays: [{
      ray: [0, 32, 32, 16],
      normal: [-0.4472135954999579, -0.8944271909999159]
    }],
    onHit: onHit
  },
  // gentle slope up 2
  9047942: {
    sheet: 'groundAtlas',
    coords: { x: 160, y: 96, w: 32, h: 32 },
    rays: [{
      ray: [0, 16, 32, 0],
      normal: [-0.4472135954999579, -0.8944271909999159]
    }],
    onHit: onHit
  },
  // 45-degree slope down
  2960311: {
    sheet: 'groundAtlas',
    coords: { x: 0, y: 96, w: 32, h: 32 },
    rays: [{
      ray: [0, 0, 32, 32],
      normal: [0.7071067811865475, -0.7071067811865475]
    }],
    onHit: onHit
  },
  // steep slope up 1
  16081320: {
    sheet: 'groundAtlas',
    coords: { x: 224, y: 128, w: 32, h: 32 },
    rays: [{
      ray: [0, 32, 16, 0],
      normal: [-0.8944271909999159, -0.4472135954999579]
    }],
    onHit: onHit
  },
  //steep slope up 2
  16094659: {
    sheet: 'groundAtlas',
    coords: { x: 224, y: 96, w: 32, h: 32 },
    rays: [{
      ray: [16, 32, 32, 0],
      normal: [-0.8944271909999159, -0.4472135954999579]
    }],
    onHit: onHit
  },
  // gentle slope down 1
  5706164: {
    sheet: 'groundAtlas',
    coords: { x: 64, y: 96, w: 32, h: 32 },
    rays: [{
      ray: [0, 0, 32, 16],
      normal: [0.4472135954999579, -0.8944271909999159]
    }],
    onHit: onHit
  },
  // gentle slope down 2
  7295925: {
    sheet: 'groundAtlas',
    coords: { x: 96, y: 96, w: 32, h: 32 },
    rays: [{
      ray: [0, 16, 32, 32],
      normal: [0.4472135954999579, -0.8944271909999159]
    }],
    onHit: onHit
  },
  // steep slope down 1
  1403350: {
    sheet: 'groundAtlas',
    coords: { x: 192, y: 96, w: 32, h: 32 },
    rays: [{
      ray: [0, 0, 16, 32],
      normal: [0.8944271909999159, -0.4472135954999579]
    }],
    onHit: onHit
  },
  //steep slope down 2
  1136818: {
    sheet: 'groundAtlas',
    coords: { x: 192, y: 128, w: 32, h: 32 },
    rays: [{
      ray: [16, 0, 32, 32],
      normal: [0.8944271909999159, -0.4472135954999579]
    }],
    onHit: onHit
  }

};

function onHit(other, intersectionPoint, myPos, tileMap) {
  // console.log(intersectionPoint)
  // var destY = tileMap.mapToWorldCoords(...myPos)[1] - other.owner.controls.transform.size[1]
  //     other.owner.controls.transform.moveTo(other.owner.controls.transform.position[0], destY)
  //     other.owner.controls.altitude.resetFall()
  //     other.owner.changeState('walking')
}

module.exports = key;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SceneObject = __webpack_require__(10);
var State = __webpack_require__(4);

var PostSystems = function (_SceneObject) {
  _inherits(PostSystems, _SceneObject);

  function PostSystems(args) {
    _classCallCheck(this, PostSystems);

    var sceneObjArgs = {
      name: 'post-systems',
      scene: args.scene,

      states: {
        normal: new State({
          update: function update() {
            // this.controls.groundLevelObstaclePool.update()
            this.controls.groundPool.update();
            // this.controls.groundLevelObstaclePool.update()
            // this.controls.collisionEngine.update()
            this.controls.physicsEngine.update();
            this.controls.camera.update();
            this.controls.renderingEngine.update();
          }
        })
      },
      initialState: 'normal',

      controls: {
        background: {
          kind: __webpack_require__(35),
          args: {
            rate: 7.5,
            spritesheetData: __webpack_require__(60),
            offset: [0, 200],
            layer: 0
          }
        },
        mapRenderer: {
          kind: __webpack_require__(37)
        },
        groundSpriteEngine: {
          kind: __webpack_require__(15),
          args: { layer: 2 }
        },
        renderingEngine: {
          kind: __webpack_require__(41)
        },
        physicsEngine: {
          kind: __webpack_require__(40)
        },
        groundLevelObstaclePool: {
          kind: __webpack_require__(14),
          args: {
            tag: 'groundLevel'
          }
        },
        groundPool: {
          kind: __webpack_require__(14),
          args: {
            tag: 'ground'
          }
        },
        objectCollisionEngine: {
          kind: __webpack_require__(39),
          args: {
            tag: 'ground'
          }
        },
        mapCollisionEngine: {
          kind: __webpack_require__(36)
        },
        camera: {
          kind: __webpack_require__(2)
        }
      }
    };
    return _possibleConstructorReturn(this, (PostSystems.__proto__ || Object.getPrototypeOf(PostSystems)).call(this, sceneObjArgs));
  }

  return PostSystems;
}(SceneObject);

module.exports = PostSystems;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var settings = {
  canvasID: 'canvas'
};

module.exports = settings;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var background = {
  sheet: 'background',
  frames: {
    default: { x: 0, y: 0, w: 320, h: 240 * 3 }
  }
};

module.exports = background;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var spritesheet = {
  sheet: 'bodySprites',
  frames: {
    Rraptorstand: { x: 0, y: 2 * 34, w: 64, h: 34 },
    Rraptorflap00: { x: 0, y: 0, w: 64, h: 34 },
    Rraptorflap01: { x: 0, y: 34, w: 64, h: 34 },
    Rraptorwalk00: { x: 0, y: 3 * 34, w: 64, h: 34 },
    Rraptorwalk01: { x: 0, y: 4 * 34, w: 64, h: 34 },

    Lraptorstand: { x: 64, y: 2 * 34, w: 64, h: 34 },
    Lraptorflap00: { x: 64, y: 0, w: 64, h: 34 },
    Lraptorflap01: { x: 64, y: 34, w: 64, h: 34 },
    Lraptorwalk00: { x: 64, y: 3 * 34, w: 64, h: 34 },
    Lraptorwalk01: { x: 64, y: 4 * 34, w: 64, h: 34 }

  }
};

module.exports = spritesheet;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var raptor = {
  sheet: 'raptorSpritesheet',
  frames: {
    flap00: { x: 1, y: 1, w: 48, h: 34 },
    flap01: { x: 51, y: 1, w: 48, h: 34 },
    walk00: { x: 101, y: 1, w: 48, h: 34 },
    walk01: { x: 151, y: 1, w: 48, h: 34 },
    hurt: { x: 201, y: 1, w: 48, h: 34 }
  }
};

module.exports = raptor;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _frames;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var spritesheet = {
  sheet: 'tailSprites',
  frames: (_frames = {

    Rtail00: { x: 0, y: 0 * 34, w: 64, h: 34 },
    Rtail01: { x: 0, y: 1 * 34, w: 64, h: 34 },
    Rtail02: { x: 0, y: 2 * 34, w: 64, h: 34 },
    Rtail03: { x: 0, y: 3 * 34, w: 64, h: 34 },
    Rtail04: { x: 0, y: 4 * 34, w: 64, h: 34 },
    Rtail05: { x: 0, y: 5 * 34, w: 64, h: 34 },
    Rtail06: { x: 0, y: 6 * 34, w: 64, h: 34 },
    Rtail07: { x: 0, y: 7 * 34, w: 64, h: 34 },
    Rtail08: { x: 0, y: 8 * 34, w: 64, h: 34 },

    Ltail00: { x: 64, y: 0 * 34, w: 64, h: 34 },
    Ltail01: { x: 64, y: 1 * 34, w: 64, h: 34 },
    Ltail02: { x: 64, y: 2 * 34, w: 64, h: 34 },
    Ltail03: { x: 64, y: 3 * 34, w: 64, h: 34 },
    Ltail04: { x: 64, y: 4 * 34, w: 64, h: 34 },
    Ltail05: { x: 64, y: 5 * 34, w: 64, h: 34 },
    Ltail06: { x: 64, y: 6 * 34, w: 64, h: 34 },
    Ltail07: { x: 64, y: 7 * 34, w: 64, h: 34 }
  }, _defineProperty(_frames, 'Ltail07', { x: 64, y: 8 * 34, w: 64, h: 34 }), _defineProperty(_frames, 'Ltail08', { x: 64, y: 8 * 34, w: 64, h: 34 }), _frames)
};

module.exports = spritesheet;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var State = __webpack_require__(4);

var dying = new State({
  enter: function enter() {
    // this.controls.sprite.setAnimation('hurt')
    this.scene.assetManager.play('screech');
    this.controls.objectCollider.enabled = false;
    loop = requestAnimationFrame(flicker.bind(this));

    setTimeout(function () {
      cancelAnimationFrame(loop);
      this.controls.flicker.makeVisible();
      this.controls.objectCollider.enabled = true;
    }.bind(this), 1000);
  },

  // Doesn't really matter since it never gets called
  update: function update() {
    this.controls.gravity.update();
    this.controls.velocity.update();
    this.controls.flicker.update();
    this.controls.bodySprite.update();
    this.controls.tailSprite.update();
    this.controls.cameraFollow.update();
  }
});

var loop;
function flicker() {
  loop = requestAnimationFrame(flicker.bind(this));
  this.controls.flicker.update.call(this.controls.flicker);
  this.controls.velocity.x = Math.min(Math.max(this.controls.velocity.x, -3), 3);
}

module.exports = dying;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var State = __webpack_require__(4);

var flying = new State({
  update: function update() {
    this.controls.advance.update();
    this.controls.gravity.update();
    this.controls.velocity.update();
    this.controls.loseChecker.update();
    this.controls.animationStateMachine.update();
    this.controls.tailManager.update();
    this.controls.bodySprite.update();
    this.controls.tailSprite.update();
    this.controls.cameraFollow.update();
  },
  message: function message(msg, e) {
    switch (msg) {
      case 'keyDown':
        this.controls.flap.flap();
        break;
      case 'keyUp':
        this.controls.flap.fall();
        break;
      case 'walkRight':
        this.controls.advance.change(1);
        break;
      case 'walkLeft':
        this.controls.advance.change(-1);
        break;
      case 'stop':
        this.controls.advance.change(0);
    }
  }
});

module.exports = flying;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var State = __webpack_require__(4);

var initial = new State({
  update: function update() {
    this.changeState('Rstand');
  },
  evaluateChange: function evaluateChange() {}
});

var Lstand = new State({
  enter: function enter() {
    this.sprite.setAnimation('Lstand', true);
  },

  evaluateChange: function evaluateChange(parameterName, value) {
    switch (parameterName) {
      case 'direction':
        this.changeState(value == -1 ? 'Lwalk' : 'Rwalk');
        this.owner.controls.tailManager.changeDirection(value);
        break;
      case 'flap':
        this.changeState('Ljump');
        break;
    }
  }
});

var Rstand = new State({
  enter: function enter() {
    this.sprite.setAnimation('Rstand', true);
  },

  evaluateChange: function evaluateChange(parameterName, value) {
    switch (parameterName) {
      case 'direction':
        this.changeState(value == -1 ? 'Lwalk' : 'Rwalk');
        this.owner.controls.tailManager.changeDirection(value);
        break;
      case 'flap':
        this.changeState('Rjump');
        break;
    }
  }
});

var Lwalk = new State({
  enter: function enter() {
    this.sprite.setAnimation('Lwalk', true);
  },

  evaluateChange: function evaluateChange(parameterName, value) {
    switch (parameterName) {
      case 'direction':
        this.changeState(value == 1 ? 'Rwalk' : 'Lstand');
        this.owner.controls.tailManager.changeDirection(value);
        break;
      case 'flap':
        this.changeState('Ljump');
        break;
    }
  }
});

var Rwalk = new State({
  enter: function enter() {
    this.sprite.setAnimation('Rwalk', true);
  },

  evaluateChange: function evaluateChange(parameterName, value) {
    switch (parameterName) {
      case 'direction':
        this.changeState(value == -1 ? 'Lwalk' : 'Rstand');
        this.owner.controls.tailManager.changeDirection(value);
        break;
      case 'flap':
        this.changeState('Rjump');
        break;
    }
  }
});

var LwalkTailCurled = new State({
  enter: function enter() {
    this.sprite.setAnimation('LwalkTailCurled', true);
  }
});

var RwalkTailCurled = new State({
  enter: function enter() {
    this.sprite.setAnimation('RwalkTailCurled', true);
  }
});

var Ljump = new State({
  enter: function enter() {
    this.sprite.setAnimation('Ljump', true);
  },

  evaluateChange: function evaluateChange(parameterName, value) {
    switch (parameterName) {
      case 'direction':
        if (value == 1) {
          this.changeState('Rjump');
          this.owner.controls.tailManager.changeDirection(value);
        }
        break;
      case 'fall':
        this.changeState('Lfall');
        break;
      case 'land':
        this.changeState(this.parameters.direction == 0 ? 'Lstand' : 'Lwalk');
        break;
    }
  }
});

var Rjump = new State({
  enter: function enter() {
    this.sprite.setAnimation('Rjump', true);
  },

  evaluateChange: function evaluateChange(parameterName, value) {
    switch (parameterName) {
      case 'direction':
        if (value == -1) {
          this.changeState('Ljump');
          this.owner.controls.tailManager.changeDirection(value);
        }
        break;
      case 'fall':
        this.changeState('Rfall');
        break;
      case 'land':
        this.changeState(this.parameters.direction == 0 ? 'Rstand' : 'Rwalk');
        break;
    }
  }
});

var Lfall = new State({
  enter: function enter() {
    this.sprite.setAnimation('Lfall', true);
  },

  evaluateChange: function evaluateChange(parameterName, value) {
    switch (parameterName) {
      case 'direction':
        if (value == 1) {
          this.changeState('Rfall');
          this.owner.controls.tailManager.changeDirection(value);
        }
        break;
      case 'flap':
        this.changeState('Ljump');
        break;
      case 'land':
        this.changeState(this.parameters.direction == 0 ? 'Lstand' : 'Lwalk');
        break;
    }
  }
});

var Rfall = new State({
  enter: function enter() {
    this.sprite.setAnimation('Rfall', true);
  },

  evaluateChange: function evaluateChange(parameterName, value) {
    switch (parameterName) {
      case 'direction':
        if (value == -1) {
          this.changeState('Lfall');
          this.owner.controls.tailManager.changeDirection(value);
        }
        break;
      case 'flap':
        this.changeState('Rjump');
        break;
      case 'land':
        this.changeState(this.parameters.direction == 0 ? 'Rstand' : 'Rwalk');
        break;
    }
  }
});

var playerAnimationStates = { initial: initial, Rstand: Rstand, Lstand: Lstand, Rwalk: Rwalk, Lwalk: Lwalk, Rjump: Rjump, Ljump: Ljump, Rfall: Rfall, Lfall: Lfall };

module.exports = playerAnimationStates;

/***/ })
/******/ ]);