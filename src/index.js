"use strict";

// DOM resources ===================================

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

var bg1 = document.getElementById("bg1")
var fg1 = document.getElementById("fg1")
var scoreboard = document.getElementById("scoreboard")
var messageWindow = document.getElementById("message")

// Constants ========================================

const ANIM_FRAMERATE = 200
const SPRITE_WIDTH = 48
const SPRITE_HEIGHT = 48
const GROUND = 176
const FG_SCROLL_SPEED = 5 / 30
const OBSTACLE_FREQUENCY = 0.06

// =================================================

// Globals =========================================

var spritesheetSrc = "assets/spritesheets/sheet00.png"
var sprite = new Image()
var loop
var currentScore = 0


// =================================================



// Base Classes =======================

class State{
    constructor(args = {}){
        Object.assign(this, args)
    }

    enter(){
        //Override
    }

    exit(){
        //Override
    }

    message(msg){
        //Override
    }

    update(deltaTime){
        //Override
    }
}

class Script{
    constructor(args = {}){
        Object.assign(this, args)
    }

    update(deltaTime){
        //Override
    }
}

var sharedStates = {
    updateAllScripts: new State({
        update: function(dt){
            for (var scriptName in this.scripts){
                this.scripts[scriptName].update(dt)
            }
        }
    })
}

class GameObject{
    constructor(args = {}){
        this.name = 'GameObject'
        this.scripts = {}
        this.states = {
            default: sharedStates.updateAllScripts
        }
        this.currentState = this.states.default
        Object.assign(this, args)
    }

    update(dt){
        this.currentState.update.call(this, dt)
    }

    message(msg){
        this.currentState.message.call(this, msg)
    }

    changeState(newState){
        this.currentState.exit.call(this, newState)
        newState.enter.call(this, this.currentState)
        this.currentState = newState
    }
}


// Derived classes ==============================

class SpriteHandler extends Script{
    constructor(args = {}){
        super(args)
        this.engine = gameEnginesObject.spriteEngine
        this.currentFrameNum = 0
        this.elapsedTime = 0
        this.looping = true
        this.finished = false
        this.onFinished = function(){}
    }

    update(dt){
        this.advanceFrame(dt)
    }

    advanceFrame(dt){
        this.elapsedTime += dt
        if (this.looping){
            this.elapsedTime = this.elapsedTime % (this.numFrames * ANIM_FRAMERATE)
        } else if (!this.finished){
            if (this.elapsedTime >= this.numFrames * ANIM_FRAMERATE){
                this.onFinished()
                this.finished = true
            }
        }
        this.currentFrameNum = Math.floor (this.elapsedTime / ANIM_FRAMERATE)
        this.currentFrame = this.currentAnimation[this.currentFrameNum]
    }

    setCurrentAnimation(name, looping = true, onFinished = function(){}){
        this.looping = looping
        this.finished = false
        this.onFinished = onFinished
        if (this.currentAnimation != this.animations[name]){
            this.currentAnimation = this.animations[name]
            this.currentFrameNum = 0
            this.currentFrame = this.currentAnimation[this.currentFrameNum]
            this.numFrames = this.currentAnimation.length
            this.elapsedTime = 0
        }
    }
}

class Collider extends Script{
    constructor(args){
        super(args)
        this.hitBox = this.hitBox || [20, 30, 33, 48]
    }

    onHit(other){
        // Override
    }
}

class CollisionReceiver extends Script{
    constructor(args){
        super(args)
        this.engine = gameEnginesObject.collisionEngine
    }

    onHit(other){
        // Override
    }
}

class Transform extends Script{
    constructor(args){
        super(args)
        this.position = this.position || [0, GROUND - SPRITE_HEIGHT]
        this.pivot = this.pivot || [SPRITE_WIDTH/2, SPRITE_HEIGHT]
        this.center = this.center || [SPRITE_WIDTH/2, SPRITE_HEIGHT/2]
    }
}

class Scroller extends Script{
    constructor(args){
        super(args)
        this.reset()
    }
    reset(){
        this.xScroll = 0
    }
    update(dt){
        this.xScroll = (this.xScroll + FG_SCROLL_SPEED * dt)
        this.owner.scripts.transform.position[0] = 320 - this.xScroll
    }
}

class ObstaclePooler extends Script{
    constructor(args){
        super(args)
    }

    activate(){
        this.owner.changeState(activeObstacle)
    }

    deactivate(){
        gameEnginesObject.scripts.obstaclePoolEngine.returnToPool(this)
        this.owner.changeState(inactiveObstacle)
    }

    update(dt){
        if (this.owner.scripts.transform.position[0] < -SPRITE_WIDTH - 1){
            this.deactivate()
        }
    }
}

// =================================================

// Game Object declarations ========================

var player = new GameObject({name: "Player"})
var gameEnginesObject = new GameObject({name: "GameEnginesObject"})
var fern1 = new GameObject({name: "Fern1"})
var fern2 = new GameObject({name: "Fern2"})
var fern3 = new GameObject({name: "Fern3"})
var fern4 = new GameObject({name: "Fern4"})
var fern5 = new GameObject({name: "Fern5"})
var proto1 = new GameObject({name: "Proto1"})
var proto2 = new GameObject({name: "Proto2"})
var proto3 = new GameObject({name: "Proto3"})
var scoreCounter = new GameObject({name: "Score"})
var message = new GameObject({name: "MessageWindow"})
var game = new GameObject({name: "Game"})

// =================================================

// Score scripts ===================================

scoreCounter.scripts.incrementScript = new Script({
    owner: scoreCounter,
    increment: function(amt){
        currentScore += amt
        scoreboard.innerHTML = `SCORE:\n${Math.floor(currentScore)}`
    }
})

// =================================================

// Score states =================================

var countUp = new State({
    enter: function(){
        currentScore = 0
    },
    update: function(dt){
        this.scripts.incrementScript.increment(dt/200)
    }

})

// =================================================

// Game object scripts =============================

game.scripts.levelGameplayScript = new Script({
    components: {
        player,
        fern1,
        fern2,
        fern3,
        fern4,
        fern5,
        proto1,
        proto2,
        proto3,
        scoreCounter,
        gameEnginesObject
    },
    update: function(dt){
        for (var name in this.components){
            this.components[name].update(dt)
        }
    }
})

// =================================================

// Game object states ===========================

var playLevel = new State({
    message: function(msg){
        switch(msg){
            case ("lose"):
                setTimeout(() => {this.changeState(lose)}, 400)
        }
    },
    update: function(dt){
        this.scripts.levelGameplayScript.update(dt)
    }
})

var pause = new State({
    enter: function(){
        cancelAnimationFrame(loop)
    }
})

var lose = new State({
    enter: function(){
        cancelAnimationFrame(loop)
        messageWindow.style.visibility = "visible"
        messageWindow.innerHTML = `Final score: ${Math.floor(currentScore)}`
    }

})

// =================================================

// Player object scripts ===========================

player.scripts.transform = new Transform({
    owner: player,
    position: [100, 125]
})

player.scripts.spriteHandler = new SpriteHandler({
    owner: player,
    animations: {
        stand: [6],
        walk: [10, 11],
        jump: [4],
        fall: [5],
        glide: [6, 7],
        hurt: [8],
        pounce: [9]
    }
})

player.scripts.collisionReceiver = new CollisionReceiver({
    owner: player,
    hitBox: [20, 26, 40, 40],
    onHit: function(other){
        if (other.owner.scripts.transform.position[1] > this.owner.scripts.transform.position[1]){
            this.owner.message("pounce", other)
        } else {
            this.owner.message("hurt", other)
        }
    }
})

player.scripts.jumpScript = new Script({
    owner: player,
    yAccel: 0,
    gliding: false,
    startJump: function(){
        this.yAccel -= 9
        this.gliding = true
    },
    bounce: function(){
        this.yAccel = -9
        this.gliding = false
    },
    flap: function(){
        this.yAccel -= 4
        this.gliding = true
        this.owner.scripts.spriteHandler.setCurrentAnimation("jump")
    },
    fall: function(){
        this.gliding = false
        this.owner.scripts.spriteHandler.setCurrentAnimation("fall")
    },
    move: function(dt){
        this.yAccel = Math.max(this.yAccel, -9)
        this.owner.scripts.transform.position[1] += this.yAccel * (dt / 30)
        if (this.gliding && this.yAccel > 0){
            this.owner.scripts.spriteHandler.setCurrentAnimation("glide")
            this.yAccel = (dt / 30)
        } else {
            this.yAccel += 0.75 * (dt / 30)
        }
        if (this.owner.scripts.transform.position[1] >= GROUND - SPRITE_HEIGHT){
            // this.owner.scripts.transform.position[1] = GROUND - SPRITE_HEIGHT
            this.owner.scripts.spriteHandler.setCurrentAnimation("hurt")
            this.yAccel = 1.5
            game.message("lose")
        }
    }
})

// =================================================

// Player object states =========================

var walk = new State({
    enter: function(){
        this.scripts.spriteHandler.setCurrentAnimation("walk")
    },
    message: function(msg){
        switch (msg){
            case "jump":
                this.changeState(jump)
                break
            case "hurt":
                this.changeState(hurt)
                break
        }
    },
    update: function(dt){
        this.scripts.spriteHandler.update(dt)
    }
})

var jump = new State({
    enter: function(){
        this.scripts.spriteHandler.setCurrentAnimation("jump")
        this.scripts.jumpScript.startJump()
    },
    message: function(msg, e){
        switch (msg){
            case "jump":
                this.scripts.jumpScript.flap()
                break
            case "fall":
                this.scripts.jumpScript.fall()
                break
            case "hurt":
                this.changeState(hurt)
                break
            case "pounce":
                this.scripts.spriteHandler.setCurrentAnimation("pounce")
                this.scripts.jumpScript.bounce()
        }
    },
    update: function(dt){
        this.scripts.jumpScript.move(dt)
        this.scripts.spriteHandler.update(dt)
    }
})

var hurt = new State({
    enter: function(){
        this.scripts.jumpScript.bounce()
        this.scripts.spriteHandler.setCurrentAnimation("hurt")
        game.message("lose")
    },
    message: function(msg){
        switch(msg){
            case "hurt":
                this.changeState(hurt)
                break
        }
    },
    update: function(dt){
        this.scripts.jumpScript.move(dt)
        this.scripts.spriteHandler.update(dt)
    }
})

// =================================================

// Fern scripts ====================================

// TODO: Make Fern class
fern1.scripts.spriteHandler = new SpriteHandler({
    owner: fern1,
    animations: {
        default: [0]
    }
})
fern1.scripts.collider = new Collider({owner: fern1})
fern1.scripts.transform = new Transform({owner: fern1})
fern1.scripts.scroller = new Scroller({owner: fern1})
fern1.scripts.obstaclePooler = new ObstaclePooler({owner: fern1})

fern2.scripts.spriteHandler = new SpriteHandler({
    owner: fern2,
    animations: {
        default: [0]
    }
})
fern2.scripts.collider = new Collider({owner: fern2})
fern2.scripts.transform = new Transform({owner: fern2})
fern2.scripts.scroller = new Scroller({owner: fern2})
fern2.scripts.obstaclePooler = new ObstaclePooler({owner: fern2})

fern3.scripts.spriteHandler = new SpriteHandler({
    owner: fern3,
    animations: {
        default: [0]
    }
})
fern3.scripts.collider = new Collider({owner: fern3})
fern3.scripts.transform = new Transform({owner: fern3})
fern3.scripts.scroller = new Scroller({owner: fern3})
fern3.scripts.obstaclePooler = new ObstaclePooler({owner: fern3})

fern4.scripts.spriteHandler = new SpriteHandler({
    owner: fern4,
    animations: {
        default: [0]
    }
})
fern4.scripts.collider = new Collider({owner: fern4})
fern4.scripts.transform = new Transform({owner: fern4})
fern4.scripts.scroller = new Scroller({owner: fern4})
fern4.scripts.obstaclePooler = new ObstaclePooler({owner: fern4})

fern5.scripts.spriteHandler = new SpriteHandler({
    owner: fern5,
    animations: {
        default: [0]
    }
})
fern5.scripts.collider = new Collider({owner: fern5})
fern5.scripts.transform = new Transform({owner: fern5})
fern5.scripts.scroller = new Scroller({owner: fern5})
fern5.scripts.obstaclePooler = new ObstaclePooler({owner: fern5})

// =================================================

// Proto scripts ===================================

// TODO: Make protoceratops class

function protoOnHit(){
    if (player.currentState == jump && player.scripts.transform.position[1] < this.owner.scripts.transform.position[1]){
            this.owner.changeState(deadEnemy)
        }
}

proto1.scripts.spriteHandler = new SpriteHandler({
    owner: proto1,
    animations: {
        default: [3],
        dead: [1,2]
    }
})
proto1.scripts.collider = new Collider({
    owner: proto1,
    hitbox: [3, 31, 31, 48],
    onHit: protoOnHit
})
proto1.scripts.transform = new Transform({owner: proto1})
proto1.scripts.scroller = new Scroller({owner: proto1})
proto1.scripts.obstaclePooler = new ObstaclePooler({owner: proto1})

proto2.scripts.spriteHandler = new SpriteHandler({
    owner: proto2,
    animations: {
        default: [3],
        dead: [1,2]
    }
})
proto2.scripts.collider = new Collider({
    owner: proto2,
    hitbox: [3, 31, 31, 48],
    onHit: protoOnHit
})
proto2.scripts.transform = new Transform({owner: proto2})
proto2.scripts.scroller = new Scroller({owner: proto2})
proto2.scripts.obstaclePooler = new ObstaclePooler({owner: proto2})

proto3.scripts.spriteHandler = new SpriteHandler({
    owner: proto3,
    animations: {
        default: [3],
        dead: [1,2]
    }
})
proto3.scripts.collider = new Collider({
    owner: proto3,
    hitbox: [3, 31, 31, 48],
    onHit: protoOnHit
})
proto3.scripts.transform = new Transform({owner: proto3})
proto3.scripts.scroller = new Scroller({owner: proto3})
proto3.scripts.obstaclePooler = new ObstaclePooler({owner: proto3})

// =================================================

// Fern states ==================================

var activeObstacle = new State({
    enter: function(){
        this.scripts.spriteHandler.setCurrentAnimation("default")
        this.scripts.scroller.reset()
    },
    update: function(dt){
        this.scripts.scroller.update(dt)
        this.scripts.obstaclePooler.update(dt)
    }
})

var inactiveObstacle = new State({
    enter: function(){
        this.scripts.transform.position = [-SPRITE_WIDTH, GROUND - SPRITE_HEIGHT]
        gameEnginesObject.scripts.obstaclePoolEngine.returnToPool()
    }
})

var deadEnemy = new State({
    enter: function(){
        this.scripts.spriteHandler.setCurrentAnimation("dead", false)
        scoreCounter.scripts.incrementScript.increment(10)
    },
    update: function(dt){
        this.scripts.scroller.update(dt)
        this.scripts.obstaclePooler.update(dt)
        this.scripts.spriteHandler.update(dt)
    }
})
// =================================================

// Game engine scripts =============================

// TODO: Optimize
gameEnginesObject.scripts.obstaclePoolEngine = new Script({
    owner: gameEnginesObject,
    nextObjectPlacementTime: 0,
    activeComponents: [],
    inactiveComponents: [fern1.scripts.obstaclePooler, fern2.scripts.obstaclePooler, fern3.scripts.obstaclePooler,fern4.scripts.obstaclePooler, fern5.scripts.obstaclePooler, proto1.scripts.obstaclePooler, proto2.scripts.obstaclePooler, proto3.scripts.obstaclePooler],
    returnToPool: function(obj){
        this.activeComponents.splice(this.activeComponents.indexOf(obj), 1)
        this.inactiveComponents.push(obj)
    },
    update: function(dt){
        if (currentTime >= this.nextObjectPlacementTime){
            var rand = Math.random()
            if (rand < OBSTACLE_FREQUENCY) {
                var r = Math.floor(Math.random() * (this.inactiveComponents.length -1))
                var obj = this.inactiveComponents.splice(r, 1)[0]
                if (obj) {
                    this.activeComponents.push(obj)
                    obj.activate()
                    this.nextObjectPlacementTime = currentTime + 300

                }
            }
        }
    }
})

gameEnginesObject.scripts.spriteEngine = new Script({
    owner: gameEnginesObject,
    components: [player.scripts.spriteHandler, fern1.scripts.spriteHandler, fern2.scripts.spriteHandler, fern3.scripts.spriteHandler, fern4.scripts.spriteHandler, fern5.scripts.spriteHandler, proto1.scripts.spriteHandler, proto2.scripts.spriteHandler, proto3.scripts.spriteHandler],
    update: function(dt){
        ctx.clearRect(0, 0, 320, 240)
        for (var i = 0; i < this.components.length; i++){
            var position = this.components[i].owner.scripts.transform.position
            var frame = this.components[i].currentFrame
            ctx.drawImage(sprite, frame*SPRITE_WIDTH, 0, SPRITE_WIDTH, SPRITE_HEIGHT, position[0], position[1], SPRITE_WIDTH, SPRITE_HEIGHT)
        }
    }
})

function isColliding(a, b){

    // If a is above b
    if (a[3] < b[1]) {
        return false
    }

    // If a is below b
    if (a[1] > b[3]) {
        return false
    }

    // If a is left of b
    if (a[2] < b[0]) {
        return false
    }

    // If a is right of b
    if (a[0] > b[2]) {
        return false
    }

    // Else collision
    return true
}

gameEnginesObject.scripts.collisionEngine = new Script({
    owner: gameEnginesObject,
    playerCollider: player.scripts.collisionReceiver,
    components: [fern1.scripts.collider, fern2.scripts.collider, fern3.scripts.collider, fern4.scripts.collider, fern5.scripts.collider, proto1.scripts.collider, proto2.scripts.collider, proto3.scripts.collider],
    update: function(dt){
        var playerBox
        var otherBox
        var playerPos
        var otherPos
        var playerBound = []
        var otherBound = []
        for (var i = 0; i < this.components.length; i++){
            playerBox = this.playerCollider.hitBox
            playerPos = this.playerCollider.owner.scripts.transform.position
            playerBound[0] = playerBox[0] + playerPos[0]
            playerBound[2] = playerBox[2] + playerPos[0]
            playerBound[1] = playerBox[1] + playerPos[1]
            playerBound[3] = playerBox[3] + playerPos[1]

            otherBox = this.components[i].hitBox
            otherPos = this.components[i].owner.scripts.transform.position
            otherBound[0] = otherBox[0] + otherPos[0]
            otherBound[2] = otherBox[2] + otherPos[0]
            otherBound[1] = otherBox[1] + otherPos[1]
            otherBound[3] = otherBox[3] + otherPos[1]

            if (isColliding(playerBound, otherBound)){
                player.scripts.collisionReceiver.onHit(this.components[i])
                this.components[i].onHit()
            }
        }
    }
})

// =================================================

// State assignments ============================

game.changeState(playLevel)
player.changeState(jump)
player.scripts.jumpScript.gliding = false
fern1.changeState(inactiveObstacle)
fern2.changeState(inactiveObstacle)
fern3.changeState(inactiveObstacle)
fern4.changeState(inactiveObstacle)
fern5.changeState(inactiveObstacle)
proto1.changeState(inactiveObstacle)
proto2.changeState(inactiveObstacle)
proto3.changeState(inactiveObstacle)
// scoreCounter.changeState(countUp)

// =================================================


// Key listeners ===================================

var keyDown = false

document.addEventListener("keydown", e => {
    if (keyDown == false && e.keyCode == 32){
        player.message("jump")
        keyDown = true
    }
})

document.addEventListener("keyup", e => {
    if (keyDown == true && e.keyCode == 32){
        player.message("fall")
        keyDown = false
    }
})

document.addEventListener("touchstart", e => {
    if (keyDown == false){
        player.message("jump")
        keyDown = true
    }
})

document.addEventListener("touchend", e => {
    if (keyDown == true){
        player.message("fall")
        keyDown = false
    }
})

// =================================================

// Game loop =======================================

var bgX = 0
var fgX = 0

// Expose globally
var currentTime
var tick = (() => {

    var lastTime = 0

    function tick(timestamp){
        loop = requestAnimationFrame(tick);
        var dt = timestamp - lastTime
        currentTime = timestamp
        game.update(dt);
        lastTime = timestamp
        bgX = (bgX - 3 * (dt/30)) % 640
        bg1.style.backgroundPosition = `${bgX}px 0px`
        fgX = (fgX - FG_SCROLL_SPEED * dt * 2) % 640
        fg1.style.backgroundPosition = `${fgX}px 0px`

    }

    return tick
})()

// =================================================

// Start ============================================

sprite.onload = () => {
    loop = requestAnimationFrame(tick)
}
sprite.src = spritesheetSrc

// =================================================

// Export module ===================================

module.exports = {GameObject}