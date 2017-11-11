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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// DOM links ===================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bg1 = document.getElementById("bg1");
var fg1 = document.getElementById("fg1");
var scoreboard = document.getElementById("scoreboard");
var titlescreenImg = document.getElementById("title-screen");
var loadingScreen = document.getElementById("loading-screen");
var messageWindow = document.getElementById("message");

// =================================================

// Assets ==========================================

var assets = {
    flapAudio: new Audio(),
    crunchAudio: new Audio(),
    crunch2Audio: new Audio(),
    blopAudio: new Audio(),
    screechAudio: new Audio(),
    boingAudio: new Audio(),
    cawAudio: new Audio(),
    sprite: new Image()
};

var assetSrcs = {
    sprite: "assets/spritesheets/sheet00.png",
    flapAudio: "assets/flap.wav",
    crunchAudio: "assets/crunch.wav",
    crunch2Audio: "assets/crunch2.wav",
    screechAudio: "assets/pusou.wav",
    blopAudio: "assets/blop.wav",
    boingAudio: "assets/boing.wav",
    cawAudio: "assets/caw.wav"
};

function loadPromise(asset, src) {
    return new Promise(function (res, rej) {
        asset.onload = res;
        asset.onerror = res;
        asset.oncanplaythrough = res;
        asset.src = src;
        if (asset.play) {
            asset.load();
        }
    });
}

var assetPromises = [];

function loadAssets() {
    for (name in assets) {
        assetPromises.push(loadPromise(assets[name], assetSrcs[name]));
    }

    Promise.all(assetPromises).then(function () {
        return game.changeState(play);
    });
}

// ==================================================

// Settings ================================

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

assets.flapAudio.playbackRate = 4;
assets.crunch2Audio.playbackRate = 2;
assets.blopAudio.playbackRate = 0.5;

// ==================================================

// Audio setup ======================================

// var audioCtx = new (window.AudioContext || window.webkitAudioContext)()

// var flapSrc = audioCtx.createMediaElementSource(assets.flapAudio)
// flapSrc.connect(audioCtx.destination)

// var crunchSrc = audioCtx.createMediaElementSource(assets.crunchAudio)
// crunchSrc.connect(audioCtx.destination)

// var crunch2Src = audioCtx.createMediaElementSource(assets.crunch2Audio)
// crunch2Src.connect(audioCtx.destination)

// var blopSrc = audioCtx.createMediaElementSource(assets.blopAudio)
// blopSrc.connect(audioCtx.destination)

// var screechSrc = audioCtx.createMediaElementSource(assets.screechAudio)
// screechSrc.connect(audioCtx.destination)

// var boingSrc = audioCtx.createMediaElementSource(assets.boingAudio)
// boingSrc.connect(audioCtx.destination)

// var cawSrc = audioCtx.createMediaElementSource(assets.cawAudio)
// cawSrc.connect(audioCtx.destination)

// ==================================================

// Constants ========================================

var ANIM_FRAMERATE = 200;
var SPRITE_WIDTH = 48;
var SPRITE_HEIGHT = 48;
var GROUND = 176;

// =================================================

// Globals =========================================

var fgScrollSpeed = 0.12;
var obstacleFrequency = 0.15;
var sprite = new Image();
var loop;
var currentScore = 0;
var currentTime;
var lastTime = 0;
var nextScoreMilestone = 50;

// =================================================

// Base Classes =======================

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
        value: function message(msg) {
            //Override
        }
    }, {
        key: "update",
        value: function update(deltaTime) {
            //Override
        }
    }]);

    return State;
}();

var Control = function () {
    function Control() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Control);

        Object.assign(this, args);
    }

    _createClass(Control, [{
        key: "update",
        value: function update(deltaTime) {
            //Override
        }
    }]);

    return Control;
}();

var GameObject = function () {
    function GameObject() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, GameObject);

        this.name = 'GameObject';
        this.controls = {};
        this.states = {
            default: new State({
                update: function update(dt) {
                    //Update all controls
                    for (var controlName in this.controls) {
                        this.controls[controlName].update(dt);
                    }
                }
            })
        };
        this.currentState = this.states.default;
        Object.assign(this, args);
    }

    _createClass(GameObject, [{
        key: "update",
        value: function update(dt) {
            this.currentState.update.call(this, dt);
        }
    }, {
        key: "message",
        value: function message(msg) {
            this.currentState.message.call(this, msg);
        }
    }, {
        key: "changeState",
        value: function changeState(newState) {
            this.currentState.exit.call(this, newState);
            newState.enter.call(this, this.currentState);
            this.currentState = newState;
        }
    }]);

    return GameObject;
}();

// GAME OBJECT ======================================

var game = new GameObject({ name: "Game" });

// Game object controls =============================

game.controls.playControl = new Control({
    components: [],
    update: function update(dt) {
        for (var i = 0; i < this.components.length; i++) {
            this.components[i].update(dt);
        }
    }
});

// =================================================

// Game object states ===========================

var loading = new State({
    enter: function enter() {
        cancelAnimationFrame(loop);
        bg1.style.visibility = "hidden";
        fg1.style.visibility = "hidden";
        scoreboard.style.visibility = "hidden";
        canvas.style.visibility = "hidden";
        titlescreenImg.style.visibility = "hidden";
        loadingScreen.style.visibility = "visible";
        loadAssets();
    }
});

var titleScreen = new State({
    enter: function enter() {
        cancelAnimationFrame(loop);
        bg1.style.visibility = "hidden";
        fg1.style.visibility = "hidden";
        scoreboard.style.visibility = "hidden";
        canvas.style.visibility = "hidden";
        titlescreenImg.style.visibility = "visible";
        loadingScreen.style.visibility = "hidden";
    },
    message: function message(msg) {
        switch (msg) {
            case "keydown":
                this.changeState(loading);
        }
    }
});

var play = new State({
    enter: function enter() {
        canvas.style.visibility = "visible";
        fg1.style.visibility = "visible";
        bg1.style.visibility = "visible";
        scoreboard.style.visibility = "visible";
        titlescreenImg.style.visibility = "hidden";
        loadingScreen.style.visibility = "hidden";
        reset();
        assets.cawAudio.play();
        loop = requestAnimationFrame(tick);
    },
    message: function message(msg) {
        var _this = this;

        switch (msg) {
            case "keydown":
                player.message("jump");
                break;
            case "keyup":
                player.message("fall");
                break;
            case "lose":
                setTimeout(function () {
                    _this.changeState(lose);
                }, 400);
        }
    },
    update: function update(dt) {
        this.controls.playControl.update(dt);
    }
});

var lose = new State({
    enter: function enter() {
        cancelAnimationFrame(loop);
        messageWindow.style.visibility = "visible";
        messageWindow.innerHTML = "<p style='text-align: center; line-height: 30px'>Final score: " + Math.floor(currentScore) + "<br/>SPACE to restart</p>";
    },
    message: function message(msg) {
        switch (msg) {
            case "keydown":
                this.changeState(play);
        }
    }

});

// =================================================

var GameplayObject = function (_GameObject) {
    _inherits(GameplayObject, _GameObject);

    function GameplayObject(args) {
        _classCallCheck(this, GameplayObject);

        var _this2 = _possibleConstructorReturn(this, (GameplayObject.__proto__ || Object.getPrototypeOf(GameplayObject)).call(this, args));

        game.controls.playControl.components.push(_this2);
        return _this2;
    }

    return GameplayObject;
}(GameObject);

var gameEnginesObject = new GameplayObject({ name: "GameEnginesObject" });

// Game engine controls =============================

// TODO: Optimize
gameEnginesObject.controls.obstaclePoolEngine = new Control({
    owner: gameEnginesObject,
    nextObjectPlacementTime: 0,
    activeComponents: [],
    inactiveComponents: [],
    returnToPool: function returnToPool(obj) {
        this.activeComponents.splice(this.activeComponents.indexOf(obj), 1);
        this.inactiveComponents.push(obj);
    },
    update: function update(dt) {
        if (currentTime >= this.nextObjectPlacementTime) {
            var rand = Math.random();
            if (rand < obstacleFrequency) {
                var r = Math.floor(Math.random() * (this.inactiveComponents.length - 1));
                var obj = this.inactiveComponents.splice(r, 1)[0];
                if (obj) {
                    this.activeComponents.push(obj);
                    obj.activate();
                    this.nextObjectPlacementTime = currentTime + 300;
                }
            }
        }
    }
});

gameEnginesObject.controls.spriteEngine = new Control({
    owner: gameEnginesObject,
    components: [],
    update: function update(dt) {
        ctx.clearRect(0, 0, 320, 240);
        for (var i = 0; i < this.components.length; i++) {
            var position = this.components[i].owner.controls.transform.position;
            var frame = this.components[i].currentFrame;
            ctx.drawImage(assets.sprite, frame * SPRITE_WIDTH, 0, SPRITE_WIDTH, SPRITE_HEIGHT, position[0], position[1], SPRITE_WIDTH, SPRITE_HEIGHT);
        }
    }
});

function isColliding(a, b) {

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

gameEnginesObject.controls.collisionEngine = new Control({
    owner: gameEnginesObject,
    playerCollider: undefined,
    components: [],
    update: function update(dt) {
        var playerBox;
        var otherBox;
        var playerPos;
        var otherPos;
        var playerBound = [];
        var otherBound = [];
        for (var i = 0; i < this.components.length; i++) {
            playerBox = this.playerCollider.hitBox;
            playerPos = this.playerCollider.owner.controls.transform.position;
            playerBound[0] = playerBox[0] + playerPos[0];
            playerBound[2] = playerBox[2] + playerPos[0];
            playerBound[1] = playerBox[1] + playerPos[1];
            playerBound[3] = playerBox[3] + playerPos[1];

            otherBox = this.components[i].hitBox;
            otherPos = this.components[i].owner.controls.transform.position;
            otherBound[0] = otherBox[0] + otherPos[0];
            otherBound[2] = otherBox[2] + otherPos[0];
            otherBound[1] = otherBox[1] + otherPos[1];
            otherBound[3] = otherBox[3] + otherPos[1];

            if (isColliding(playerBound, otherBound)) {
                player.controls.playerCollider.onHit(this.components[i]);
                this.components[i].onHit();
            }
        }
    }
});

// GameplayObject Controls ==============================

var Sprite = function (_Control) {
    _inherits(Sprite, _Control);

    function Sprite() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Sprite);

        var _this3 = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, args));

        gameEnginesObject.controls.spriteEngine.components.push(_this3);
        _this3.currentFrameNum = 0;
        _this3.elapsedTime = 0;
        _this3.looping = true;
        _this3.finished = false;
        _this3.onFinished = function () {};
        return _this3;
    }

    _createClass(Sprite, [{
        key: "update",
        value: function update(dt) {
            this.advanceFrame(dt);
        }
    }, {
        key: "advanceFrame",
        value: function advanceFrame(dt) {
            this.elapsedTime += dt;
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
        key: "setCurrentAnimation",
        value: function setCurrentAnimation(name) {
            var looping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var onFinished = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

            this.looping = looping;
            this.finished = false;
            this.onFinished = onFinished;
            if (this.currentAnimation != this.animations[name]) {
                this.currentAnimation = this.animations[name];
                this.currentFrameNum = 0;
                this.currentFrame = this.currentAnimation[this.currentFrameNum];
                this.numFrames = this.currentAnimation.length;
                this.elapsedTime = 0;
            }
        }
    }]);

    return Sprite;
}(Control);

var Collider = function (_Control2) {
    _inherits(Collider, _Control2);

    function Collider(args) {
        _classCallCheck(this, Collider);

        var _this4 = _possibleConstructorReturn(this, (Collider.__proto__ || Object.getPrototypeOf(Collider)).call(this, args));

        gameEnginesObject.controls.collisionEngine.components.push(_this4);
        return _this4;
    }

    _createClass(Collider, [{
        key: "onHit",
        value: function onHit(other) {
            // Override
        }
    }]);

    return Collider;
}(Control);

var PlayerCollider = function (_Control3) {
    _inherits(PlayerCollider, _Control3);

    function PlayerCollider(args) {
        _classCallCheck(this, PlayerCollider);

        var _this5 = _possibleConstructorReturn(this, (PlayerCollider.__proto__ || Object.getPrototypeOf(PlayerCollider)).call(this, args));

        gameEnginesObject.controls.collisionEngine.playerCollider = _this5;
        return _this5;
    }

    _createClass(PlayerCollider, [{
        key: "onHit",
        value: function onHit(other) {
            // Override
        }
    }]);

    return PlayerCollider;
}(Control);

var Transform = function (_Control4) {
    _inherits(Transform, _Control4);

    function Transform(args) {
        _classCallCheck(this, Transform);

        var _this6 = _possibleConstructorReturn(this, (Transform.__proto__ || Object.getPrototypeOf(Transform)).call(this, args));

        _this6.position = _this6.position || [0, GROUND - SPRITE_HEIGHT];
        _this6.pivot = _this6.pivot || [SPRITE_WIDTH / 2, SPRITE_HEIGHT];
        _this6.center = _this6.center || [SPRITE_WIDTH / 2, SPRITE_HEIGHT / 2];
        return _this6;
    }

    return Transform;
}(Control);

var Scroller = function (_Control5) {
    _inherits(Scroller, _Control5);

    function Scroller(args) {
        _classCallCheck(this, Scroller);

        var _this7 = _possibleConstructorReturn(this, (Scroller.__proto__ || Object.getPrototypeOf(Scroller)).call(this, args));

        _this7.reset();
        return _this7;
    }

    _createClass(Scroller, [{
        key: "reset",
        value: function reset() {
            this.xScroll = 0;
        }
    }, {
        key: "update",
        value: function update(dt) {
            this.xScroll = this.xScroll + fgScrollSpeed * dt;
            this.owner.controls.transform.position[0] = 320 - this.xScroll;
        }
    }]);

    return Scroller;
}(Control);

var ObstaclePooler = function (_Control6) {
    _inherits(ObstaclePooler, _Control6);

    function ObstaclePooler(args) {
        _classCallCheck(this, ObstaclePooler);

        var _this8 = _possibleConstructorReturn(this, (ObstaclePooler.__proto__ || Object.getPrototypeOf(ObstaclePooler)).call(this, args));

        gameEnginesObject.controls.obstaclePoolEngine.inactiveComponents.push(_this8);
        return _this8;
    }

    _createClass(ObstaclePooler, [{
        key: "activate",
        value: function activate() {
            this.owner.changeState(activeObstacle);
        }
    }, {
        key: "deactivate",
        value: function deactivate() {
            gameEnginesObject.controls.obstaclePoolEngine.returnToPool(this);
            this.owner.changeState(inactiveObstacle);
        }
    }, {
        key: "update",
        value: function update(dt) {
            if (this.owner.controls.transform.position[0] < -SPRITE_WIDTH - 1) {
                this.deactivate();
            }
        }
    }]);

    return ObstaclePooler;
}(Control);

// =================================================

// Score controls ===================================

var scoreCounter = new GameplayObject({ name: "Score" });

scoreCounter.controls.incrementControl = new Control({
    owner: scoreCounter,
    increment: function increment(amt) {
        currentScore += amt;
        scoreboard.innerHTML = "SCORE:\n" + Math.floor(currentScore);
        if (currentScore > nextScoreMilestone) {
            fgScrollSpeed += 0.01;
            obstacleFrequency = Math.max(obstacleFrequency - 0.005, 0.06);
            nextScoreMilestone += 50;
        }
    },
    update: function update(dt) {
        this.increment(dt / 30);
    }
});

// =================================================

// PLAYER ============================

var player = new GameplayObject({ name: "Player" });

// Player object controls ===========================

player.controls.transform = new Transform({
    owner: player,
    position: [40, 125]
});

player.controls.sprite = new Sprite({
    owner: player,
    animations: {
        stand: [7],
        walk: [11, 12],
        jump: [5],
        fall: [6],
        glide: [7, 8],
        hurt: [9],
        pounce: [10]
    }
});

player.controls.playerCollider = new PlayerCollider({
    owner: player,
    hitBox: [20, 26, 40, 40],
    onHit: function onHit(other) {
        this.owner.message("pounce", other);
    }
});

player.controls.altitude = new Control({
    owner: player,
    yAccel: 0,
    startJump: function startJump() {
        this.yAccel -= 9;
        this.gliding = true;
    },
    bounce: function bounce() {
        this.yAccel = -7;
    },
    flap: function flap() {
        this.yAccel -= Math.max(0, this.yAccel * 0.9);
        this.owner.controls.sprite.setCurrentAnimation("jump");
        assets.flapAudio.play();
    },
    fall: function fall() {
        this.owner.controls.sprite.setCurrentAnimation("fall");
    },
    sink: function sink() {
        this.yAccel = 1.5;
    },
    move: function move(dt) {
        this.yAccel = Math.max(this.yAccel, -9);
        this.owner.controls.transform.position[1] += this.yAccel * (dt / 30);
        this.yAccel += 0.45 * (dt / 30);
        if (this.owner.controls.transform.position[1] >= GROUND - SPRITE_HEIGHT / 2) {
            this.owner.changeState(sink);
        }
    }
});

// =================================================

// Player object states =========================

var walk = new State({
    enter: function enter() {
        this.controls.sprite.setCurrentAnimation("walk");
    },
    message: function message(msg) {
        switch (msg) {
            case "jump":
                this.changeState(jump);
                break;
            case "hurt":
                this.changeState(hurt);
                break;
        }
    },
    update: function update(dt) {
        this.controls.sprite.update(dt);
    }
});

var sink = new State({
    enter: function enter() {
        this.controls.sprite.setCurrentAnimation("hurt");
        this.controls.altitude.sink();
        assets.blopAudio.play();
        game.message("lose");
    }
});

var jump = new State({
    enter: function enter() {
        this.controls.sprite.setCurrentAnimation("jump");
        this.controls.altitude.startJump();
    },
    message: function message(msg, e) {
        switch (msg) {
            case "jump":
                this.controls.altitude.flap();
                break;
            case "fall":
                this.controls.altitude.fall();
                break;
            case "hurt":
                this.changeState(hurt);
                break;
            case "pounce":
                this.controls.sprite.setCurrentAnimation("pounce");
                this.controls.altitude.bounce();
        }
    },
    update: function update(dt) {
        this.controls.altitude.move(dt);
        this.controls.sprite.update(dt);
    }
});

var hurt = new State({
    enter: function enter() {
        assets.screechAudio.play();
        this.controls.altitude.bounce();
        this.controls.sprite.setCurrentAnimation("hurt");
        game.message("lose");
    },
    message: function message(msg) {},
    update: function update(dt) {
        this.controls.altitude.move(dt);
        this.controls.sprite.update(dt);
    }
});

// =================================================

// FOOTHOLD OBJECTS ====================================

var Foothold = function (_GameplayObject) {
    _inherits(Foothold, _GameplayObject);

    function Foothold(args) {
        _classCallCheck(this, Foothold);

        var _this9 = _possibleConstructorReturn(this, (Foothold.__proto__ || Object.getPrototypeOf(Foothold)).call(this, args));

        _this9.controls = {
            sprite: new Sprite({ owner: _this9 }),
            collider: new Collider({ owner: _this9 }),
            transform: new Transform({ owner: _this9 }),
            scroller: new Scroller({ owner: _this9 }),
            obstaclePooler: new ObstaclePooler({ owner: _this9 })
        };
        return _this9;
    }

    return Foothold;
}(GameplayObject);

var Fern = function (_Foothold) {
    _inherits(Fern, _Foothold);

    function Fern(args) {
        _classCallCheck(this, Fern);

        var _this10 = _possibleConstructorReturn(this, (Fern.__proto__ || Object.getPrototypeOf(Fern)).call(this, args));

        _this10.controls.sprite.animations = {
            default: [1],
            dead: [0]
        };
        _this10.controls.collider.hitBox = [20, 30, 33, 48];
        _this10.controls.collider.onHit = function () {
            if (player.currentState == jump && player.controls.transform.position[1] < this.owner.controls.transform.position[1]) {
                this.owner.changeState(deadEnemy);
                assets.crunch2Audio.play();
            }
        };
        return _this10;
    }

    return Fern;
}(Foothold);

var Protoceratops = function (_Foothold2) {
    _inherits(Protoceratops, _Foothold2);

    function Protoceratops(args) {
        _classCallCheck(this, Protoceratops);

        var _this11 = _possibleConstructorReturn(this, (Protoceratops.__proto__ || Object.getPrototypeOf(Protoceratops)).call(this, args));

        _this11.controls.sprite.animations = {
            default: [4]
        };
        _this11.controls.collider.hitBox = [3, 31, 31, 48];
        _this11.controls.collider.onHit = function () {
            if (player.currentState == jump && player.controls.transform.position[1] < this.owner.controls.transform.position[1]) {
                assets.boingAudio.play();
            }
        };
        return _this11;
    }

    return Protoceratops;
}(Foothold);

var ProtoSkeleton = function (_Foothold3) {
    _inherits(ProtoSkeleton, _Foothold3);

    function ProtoSkeleton(args) {
        _classCallCheck(this, ProtoSkeleton);

        var _this12 = _possibleConstructorReturn(this, (ProtoSkeleton.__proto__ || Object.getPrototypeOf(ProtoSkeleton)).call(this, args));

        _this12.controls.sprite.animations = {
            default: [2],
            dead: [3]
        };
        _this12.controls.collider.hitBox = [3, 31, 31, 48];
        _this12.controls.collider.onHit = function () {
            if (player.currentState == jump && player.controls.transform.position[1] < this.owner.controls.transform.position[1]) {
                this.owner.changeState(deadEnemy);
                assets.crunchAudio.play();
            }
        };
        return _this12;
    }

    return ProtoSkeleton;
}(Foothold);

// ==================================================

// Foothold states ==================================

var activeObstacle = new State({
    enter: function enter() {
        this.controls.sprite.setCurrentAnimation("default");
        this.controls.scroller.reset();
    },
    update: function update(dt) {
        this.controls.scroller.update(dt);
        this.controls.obstaclePooler.update(dt);
    }
});

var inactiveObstacle = new State({
    enter: function enter() {
        this.controls.transform.position = [-SPRITE_WIDTH, GROUND - SPRITE_HEIGHT];
        gameEnginesObject.controls.obstaclePoolEngine.returnToPool();
    }
});

var deadEnemy = new State({
    enter: function enter() {
        this.controls.sprite.setCurrentAnimation("dead", false);
    },
    update: function update(dt) {
        this.controls.scroller.update(dt);
        this.controls.obstaclePooler.update(dt);
        this.controls.sprite.update(dt);
    }
});
// =================================================

// Object instantiation ============================

var fern1 = new Fern({ name: "Fern1" });
var fern2 = new Fern({ name: "Fern2" });
var fern3 = new Fern({ name: "Fern3" });
var fern4 = new Fern({ name: "Fern4" });
var fern5 = new Fern({ name: "Fern5" });
var proto1 = new Protoceratops({ name: "Proto1" });
var protoSkel1 = new ProtoSkeleton({ name: "ProtoSkel1" });
var protoSkel2 = new ProtoSkeleton({ name: "ProtoSkel2" });

// =================================================

// State assignments ============================

game.changeState(titleScreen);
player.changeState(jump);
fern1.changeState(inactiveObstacle);
fern2.changeState(inactiveObstacle);
fern3.changeState(inactiveObstacle);
fern4.changeState(inactiveObstacle);
fern5.changeState(inactiveObstacle);
proto1.changeState(inactiveObstacle);
protoSkel1.changeState(inactiveObstacle);
protoSkel2.changeState(inactiveObstacle);

// =================================================


// Key listeners ===================================

document.addEventListener("keydown", function (e) {
    if (e.keyCode == 32) {
        game.message("keydown");
        e.preventDefault();
    }
});

document.addEventListener("keyup", function (e) {
    if (e.keyCode == 32) {
        game.message("keyup");
        e.preventDefault();
    }
});

document.addEventListener("touchstart", function (e) {
    game.message("keydown");
    e.preventDefault();
});

document.addEventListener("touchend", function (e) {
    game.message("keyup");
    e.preventDefault();
});

// =================================================

// Game loop =======================================

var bgX = 0;
var fgX = 0;

function tick(timestamp) {
    loop = requestAnimationFrame(tick);
    if (!lastTime) {
        lastTime = timestamp;
    }
    var dt = timestamp - lastTime;
    currentTime = timestamp;
    game.update(dt);
    lastTime = timestamp;
    bgX = (bgX - 3 * (dt / 30)) % 640;
    bg1.style.left = bgX + "px";
    fgX = (fgX - fgScrollSpeed * dt * 2) % 640;
    fg1.style.left = fgX + "px";
}

function reset() {
    lastTime = null;
    currentScore = 0;
    obstacleFrequency = 0.15;
    fgScrollSpeed = 0.12;
    nextScoreMilestone = 50;
    scoreboard.innerHTML = "SCORE: " + Math.floor(currentScore);
    player.controls.transform.position = [40, 125];
    player.changeState(jump);
    messageWindow.style.visibility = "hidden";
}

// =================================================

// Export module ===================================

module.exports = { GameObject: GameObject };

/***/ })
/******/ ]);