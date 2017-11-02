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

// =================================================

// Globals =========================================

var fgScrollSpeed = 0.12
var obstacleFrequency = 0.2
var spritesheetSrc = "assets/spritesheets/sheet00.png"
var sprite = new Image()
var loop
var currentScore = 0
var currentTime
var lastTime = 0


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

class Control{
    constructor(args = {}){
        Object.assign(this, args)
    }

    update(deltaTime){
        //Override
    }
}

var sharedStates = {
    updateAllControls: new State({
        update: function(dt){
            for (var controlName in this.controls){
                this.controls[controlName].update(dt)
            }
        }
    })
}

class GameObject{
    constructor(args = {}){
        this.name = 'GameObject'
        this.controls = {}
        this.states = {
            default: sharedStates.updateAllControls
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

class SpriteHandler extends Control{
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

class Collider extends Control{
    constructor(args){
        super(args)
        this.hitBox = this.hitBox || [20, 30, 33, 48]
    }

    onHit(other){
        // Override
    }
}

class CollisionReceiver extends Control{
    constructor(args){
        super(args)
        this.engine = gameEnginesObject.collisionEngine
    }

    onHit(other){
        // Override
    }
}

class Transform extends Control{
    constructor(args){
        super(args)
        this.position = this.position || [0, GROUND - SPRITE_HEIGHT]
        this.pivot = this.pivot || [SPRITE_WIDTH/2, SPRITE_HEIGHT]
        this.center = this.center || [SPRITE_WIDTH/2, SPRITE_HEIGHT/2]
    }
}

class Scroller extends Control{
    constructor(args){
        super(args)
        this.reset()
    }
    reset(){
        this.xScroll = 0
    }
    update(dt){
        this.xScroll = (this.xScroll + fgScrollSpeed * dt)
        this.owner.controls.transform.position[0] = 320 - this.xScroll
    }
}

class ObstaclePooler extends Control{
    constructor(args){
        super(args)
    }

    activate(){
        this.owner.changeState(activeObstacle)
    }

    deactivate(){
        gameEnginesObject.controls.obstaclePoolEngine.returnToPool(this)
        this.owner.changeState(inactiveObstacle)
    }

    update(dt){
        if (this.owner.controls.transform.position[0] < -SPRITE_WIDTH - 1){
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

// Score controls ===================================

var nextScoreMilestone = 50

scoreCounter.controls.incrementControl = new Control({
    owner: scoreCounter,
    increment: function(amt){
        currentScore += amt
        scoreboard.innerHTML = `SCORE:\n${Math.floor(currentScore)}`
        if (currentScore > nextScoreMilestone){
            obstacleFrequency -= 0.02
            nextScoreMilestone += 50
        }
    }
})

// =================================================

// Game object controls =============================

game.controls.levelGameplayControl = new Control({
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
        this.controls.levelGameplayControl.update(dt)
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
        messageWindow.innerHTML = `<p style='text-align: center; line-height: 30px'>Final score: ${Math.floor(currentScore)}<br/>SPACE to restart</p>`
    }

})

// =================================================

// Player object controls ===========================

player.controls.transform = new Transform({
    owner: player,
    position: [100, 125]
})

player.controls.spriteHandler = new SpriteHandler({
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

player.controls.collisionReceiver = new CollisionReceiver({
    owner: player,
    hitBox: [20, 26, 40, 40],
    onHit: function(other){
        if (other.owner.controls.transform.position[1] > this.owner.controls.transform.position[1]){
            this.owner.message("pounce", other)
        } else {
            this.owner.message("hurt", other)
        }
    }
})

player.controls.jumpControl = new Control({
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
        this.owner.controls.spriteHandler.setCurrentAnimation("jump")
    },
    fall: function(){
        this.gliding = false
        this.owner.controls.spriteHandler.setCurrentAnimation("fall")
    },
    move: function(dt){
        this.yAccel = Math.max(this.yAccel, -9)
        this.owner.controls.transform.position[1] += this.yAccel * (dt / 30)
        if (this.gliding && this.yAccel > 0){
            this.owner.controls.spriteHandler.setCurrentAnimation("glide")
            this.yAccel = (dt / 30)
        } else {
            this.yAccel += 0.75 * (dt / 30)
        }
        if (this.owner.controls.transform.position[1] >= GROUND - SPRITE_HEIGHT){
            // this.owner.controls.transform.position[1] = GROUND - SPRITE_HEIGHT
            this.owner.controls.spriteHandler.setCurrentAnimation("hurt")
            this.yAccel = 1.5
            game.message("lose")
        }
    }
})

// =================================================

// Player object states =========================

var walk = new State({
    enter: function(){
        this.controls.spriteHandler.setCurrentAnimation("walk")
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
        this.controls.spriteHandler.update(dt)
    }
})

var jump = new State({
    enter: function(){
        this.controls.spriteHandler.setCurrentAnimation("jump")
        this.controls.jumpControl.startJump()
    },
    message: function(msg, e){
        switch (msg){
            case "jump":
                this.controls.jumpControl.flap()
                break
            case "fall":
                this.controls.jumpControl.fall()
                break
            case "hurt":
                this.changeState(hurt)
                break
            case "pounce":
                this.controls.spriteHandler.setCurrentAnimation("pounce")
                this.controls.jumpControl.bounce()
        }
    },
    update: function(dt){
        this.controls.jumpControl.move(dt)
        this.controls.spriteHandler.update(dt)
    }
})

var hurt = new State({
    enter: function(){
        this.controls.jumpControl.bounce()
        this.controls.spriteHandler.setCurrentAnimation("hurt")
        game.message("lose")
    },
    message: function(msg){
    },
    update: function(dt){
        this.controls.jumpControl.move(dt)
        this.controls.spriteHandler.update(dt)
    }
})

// =================================================

// Fern controls ====================================

// TODO: Make Fern class
fern1.controls.spriteHandler = new SpriteHandler({
    owner: fern1,
    animations: {
        default: [0]
    }
})
fern1.controls.collider = new Collider({owner: fern1})
fern1.controls.transform = new Transform({owner: fern1})
fern1.controls.scroller = new Scroller({owner: fern1})
fern1.controls.obstaclePooler = new ObstaclePooler({owner: fern1})

fern2.controls.spriteHandler = new SpriteHandler({
    owner: fern2,
    animations: {
        default: [0]
    }
})
fern2.controls.collider = new Collider({owner: fern2})
fern2.controls.transform = new Transform({owner: fern2})
fern2.controls.scroller = new Scroller({owner: fern2})
fern2.controls.obstaclePooler = new ObstaclePooler({owner: fern2})

fern3.controls.spriteHandler = new SpriteHandler({
    owner: fern3,
    animations: {
        default: [0]
    }
})
fern3.controls.collider = new Collider({owner: fern3})
fern3.controls.transform = new Transform({owner: fern3})
fern3.controls.scroller = new Scroller({owner: fern3})
fern3.controls.obstaclePooler = new ObstaclePooler({owner: fern3})

fern4.controls.spriteHandler = new SpriteHandler({
    owner: fern4,
    animations: {
        default: [0]
    }
})
fern4.controls.collider = new Collider({owner: fern4})
fern4.controls.transform = new Transform({owner: fern4})
fern4.controls.scroller = new Scroller({owner: fern4})
fern4.controls.obstaclePooler = new ObstaclePooler({owner: fern4})

fern5.controls.spriteHandler = new SpriteHandler({
    owner: fern5,
    animations: {
        default: [0]
    }
})
fern5.controls.collider = new Collider({owner: fern5})
fern5.controls.transform = new Transform({owner: fern5})
fern5.controls.scroller = new Scroller({owner: fern5})
fern5.controls.obstaclePooler = new ObstaclePooler({owner: fern5})

// =================================================

// Proto controls ===================================

// TODO: Make protoceratops class

function protoOnHit(){
    if (player.currentState == jump && player.controls.transform.position[1] < this.owner.controls.transform.position[1]){
            this.owner.changeState(deadEnemy)
        }
}

proto1.controls.spriteHandler = new SpriteHandler({
    owner: proto1,
    animations: {
        default: [3],
        dead: [1,2]
    }
})
proto1.controls.collider = new Collider({
    owner: proto1,
    hitbox: [3, 31, 31, 48],
    onHit: protoOnHit
})
proto1.controls.transform = new Transform({owner: proto1})
proto1.controls.scroller = new Scroller({owner: proto1})
proto1.controls.obstaclePooler = new ObstaclePooler({owner: proto1})

proto2.controls.spriteHandler = new SpriteHandler({
    owner: proto2,
    animations: {
        default: [3],
        dead: [1,2]
    }
})
proto2.controls.collider = new Collider({
    owner: proto2,
    hitbox: [3, 31, 31, 48],
    onHit: protoOnHit
})
proto2.controls.transform = new Transform({owner: proto2})
proto2.controls.scroller = new Scroller({owner: proto2})
proto2.controls.obstaclePooler = new ObstaclePooler({owner: proto2})

proto3.controls.spriteHandler = new SpriteHandler({
    owner: proto3,
    animations: {
        default: [3],
        dead: [1,2]
    }
})
proto3.controls.collider = new Collider({
    owner: proto3,
    hitbox: [3, 31, 31, 48],
    onHit: protoOnHit
})
proto3.controls.transform = new Transform({owner: proto3})
proto3.controls.scroller = new Scroller({owner: proto3})
proto3.controls.obstaclePooler = new ObstaclePooler({owner: proto3})

// =================================================

// Fern states ==================================

var activeObstacle = new State({
    enter: function(){
        this.controls.spriteHandler.setCurrentAnimation("default")
        this.controls.scroller.reset()
    },
    update: function(dt){
        this.controls.scroller.update(dt)
        this.controls.obstaclePooler.update(dt)
    }
})

var inactiveObstacle = new State({
    enter: function(){
        this.controls.transform.position = [-SPRITE_WIDTH, GROUND - SPRITE_HEIGHT]
        gameEnginesObject.controls.obstaclePoolEngine.returnToPool()
    }
})

var deadEnemy = new State({
    enter: function(){
        this.controls.spriteHandler.setCurrentAnimation("dead", false)
        scoreCounter.controls.incrementControl.increment(10)
    },
    update: function(dt){
        this.controls.scroller.update(dt)
        this.controls.obstaclePooler.update(dt)
        this.controls.spriteHandler.update(dt)
    }
})
// =================================================

// Game engine controls =============================

// TODO: Optimize
gameEnginesObject.controls.obstaclePoolEngine = new Control({
    owner: gameEnginesObject,
    nextObjectPlacementTime: 0,
    activeComponents: [],
    inactiveComponents: [fern1.controls.obstaclePooler, fern2.controls.obstaclePooler, fern3.controls.obstaclePooler,fern4.controls.obstaclePooler, fern5.controls.obstaclePooler, proto1.controls.obstaclePooler, proto2.controls.obstaclePooler, proto3.controls.obstaclePooler],
    returnToPool: function(obj){
        this.activeComponents.splice(this.activeComponents.indexOf(obj), 1)
        this.inactiveComponents.push(obj)
    },
    update: function(dt){
        if (currentTime >= this.nextObjectPlacementTime){
            var rand = Math.random()
            if (rand < obstacleFrequency) {
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

gameEnginesObject.controls.spriteEngine = new Control({
    owner: gameEnginesObject,
    components: [player.controls.spriteHandler, fern1.controls.spriteHandler, fern2.controls.spriteHandler, fern3.controls.spriteHandler, fern4.controls.spriteHandler, fern5.controls.spriteHandler, proto1.controls.spriteHandler, proto2.controls.spriteHandler, proto3.controls.spriteHandler],
    update: function(dt){
        ctx.clearRect(0, 0, 320, 240)
        for (var i = 0; i < this.components.length; i++){
            var position = this.components[i].owner.controls.transform.position
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

gameEnginesObject.controls.collisionEngine = new Control({
    owner: gameEnginesObject,
    playerCollider: player.controls.collisionReceiver,
    components: [fern1.controls.collider, fern2.controls.collider, fern3.controls.collider, fern4.controls.collider, fern5.controls.collider, proto1.controls.collider, proto2.controls.collider, proto3.controls.collider],
    update: function(dt){
        var playerBox
        var otherBox
        var playerPos
        var otherPos
        var playerBound = []
        var otherBound = []
        for (var i = 0; i < this.components.length; i++){
            playerBox = this.playerCollider.hitBox
            playerPos = this.playerCollider.owner.controls.transform.position
            playerBound[0] = playerBox[0] + playerPos[0]
            playerBound[2] = playerBox[2] + playerPos[0]
            playerBound[1] = playerBox[1] + playerPos[1]
            playerBound[3] = playerBox[3] + playerPos[1]

            otherBox = this.components[i].hitBox
            otherPos = this.components[i].owner.controls.transform.position
            otherBound[0] = otherBox[0] + otherPos[0]
            otherBound[2] = otherBox[2] + otherPos[0]
            otherBound[1] = otherBox[1] + otherPos[1]
            otherBound[3] = otherBox[3] + otherPos[1]

            if (isColliding(playerBound, otherBound)){
                player.controls.collisionReceiver.onHit(this.components[i])
                this.components[i].onHit()
            }
        }
    }
})

// =================================================

// State assignments ============================

game.changeState(playLevel)
player.changeState(jump)
player.controls.jumpControl.gliding = false
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
        if (game.currentState == lose){
            restart()
        } else {
            player.message("jump")
            keyDown = true
        }
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
        if (game.currentState == lose){
            restart()
        } else {
            player.message("jump")
            keyDown = true
        }
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

function tick(timestamp){
    loop = requestAnimationFrame(tick);
    if (!lastTime){
        lastTime = timestamp
    }
    var dt = timestamp - lastTime
    currentTime = timestamp
    game.update(dt);
    lastTime = timestamp
    bgX = (bgX - 3 * (dt/30)) % 640
    bg1.style.backgroundPosition = `${bgX}px 0px`
    fgX = (fgX - fgScrollSpeed * dt * 2) % 640
    fg1.style.backgroundPosition = `${fgX}px 0px`

}

function restart(){
    lastTime = null
    currentScore = 0
    obstacleFrequency = 0.2
    scoreboard.innerHTML = `SCORE: ${Math.floor(currentScore)}`
    player.controls.transform.position = [100, 125]
    game.changeState(playLevel)
    player.changeState(jump)
    player.controls.jumpControl.gliding = false
    // fern1.changeState(inactiveObstacle)
    // fern2.changeState(inactiveObstacle)
    // fern3.changeState(inactiveObstacle)
    // fern4.changeState(inactiveObstacle)
    // fern5.changeState(inactiveObstacle)
    // proto1.changeState(inactiveObstacle)
    // proto2.changeState(inactiveObstacle)
    // proto3.changeState(inactiveObstacle)
    messageWindow.style.visibility = "hidden"
    game.changeState(playLevel)
    loop = requestAnimationFrame(tick)

}

// =================================================

// Start ============================================

sprite.onload = () => {
    loop = requestAnimationFrame(tick)
}
sprite.src = spritesheetSrc

// =================================================

// Export module ===================================

// module.exports = {GameObject}