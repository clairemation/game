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

var flapAudio = document.getElementById("flapsound")
flapAudio.playbackRate = 4
var crunchAudio = document.getElementById("crunchsound")
var crunch2Audio = document.getElementById("crunchsound2")
crunch2Audio.playbackRate = 2
var blopAudio = document.getElementById("blopsound")
blopAudio.playbackRate = 0.5
var screechAudio = document.getElementById("screechsound")

// Audio setup ======================================

var audioCtx = new (window.AudioContext || window.webkitAudioContext)()

var flapSrc = audioCtx.createMediaElementSource(flapAudio)
flapSrc.connect(audioCtx.destination)

var crunchSrc = audioCtx.createMediaElementSource(crunchAudio)
crunchSrc.connect(audioCtx.destination)

var crunch2Src = audioCtx.createMediaElementSource(crunch2Audio)
crunch2Src.connect(audioCtx.destination)

var blopSrc = audioCtx.createMediaElementSource(blopAudio)
blopSrc.connect(audioCtx.destination)

var screechSrc = audioCtx.createMediaElementSource(screechAudio)
screechSrc.connect(audioCtx.destination)

function play(audio){

}

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

// GAME OBJECT ======================================

var game = new GameObject({name: "Game"})

// Game object controls =============================

game.controls.playControl = new Control({
    components: [],
    update: function(dt){
        for (var i = 0; i < this.components.length; i++){
            this.components[i].update(dt)
        }
    }
})

// =================================================

// Game object states ===========================

var titleScreen = new State({
    enter: function(){
        cancelAnimationFrame(loop)
        fg1.style.visibility = "hidden"
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, 320, 240)
        ctx.fillStyle = "#fff"
        ctx.font = "16px PressStart2P"
        ctx.fillText("Click to start", 40, 120)
        var startGame = () => {
            console.log(this)
            this.changeState(play)
            document.removeEventListener("click", startGame)
        }
        document.addEventListener("click", startGame)
    },
    exit: function(){
        fg1.style.visibility = "visible"
    }
})

var play = new State({
    enter: function(){
        loop = requestAnimationFrame(tick)
    },
    message: function(msg){
        switch(msg){
            case ("lose"):
                setTimeout(() => {this.changeState(lose)}, 400)
        }
    },
    update: function(dt){
        this.controls.playControl.update(dt)
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

class GameplayObject extends GameObject{
    constructor(args){
        super(args)
        game.controls.playControl.components.push(this)
    }
}

// GameplayObject Controls ==============================

class Sprite extends Control{
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

var player = new GameplayObject({name: "Player"})
var gameEnginesObject = new GameplayObject({name: "GameEnginesObject"})
var fern1 = new GameplayObject({name: "Fern1"})
var fern2 = new GameplayObject({name: "Fern2"})
var fern3 = new GameplayObject({name: "Fern3"})
var fern4 = new GameplayObject({name: "Fern4"})
var fern5 = new GameplayObject({name: "Fern5"})
var proto1 = new GameplayObject({name: "Proto1"})
var proto2 = new GameplayObject({name: "Proto2"})
var proto3 = new GameplayObject({name: "Proto3"})
var scoreCounter = new GameplayObject({name: "Score"})
var message = new GameplayObject({name: "MessageWindow"})

// =================================================

// Score controls ===================================

var nextScoreMilestone = 50

scoreCounter.controls.incrementControl = new Control({
    owner: scoreCounter,
    increment: function(amt){
        currentScore += amt
        scoreboard.innerHTML = `SCORE:\n${Math.floor(currentScore)}`
        if (currentScore > nextScoreMilestone){
            fgScrollSpeed += 0.02
            obstacleFrequency = Math.max(obstacleFrequency - 0.02, 0.02)
            nextScoreMilestone += 50
        }
    }
})

// =================================================


// Player object controls ===========================

player.controls.transform = new Transform({
    owner: player,
    position: [40, 125]
})

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
})

player.controls.collisionReceiver = new CollisionReceiver({
    owner: player,
    hitBox: [20, 26, 40, 40],
    onHit: function(other){
        // if (other.owner.controls.transform.position[1] > this.owner.controls.transform.position[1]){
            this.owner.message("pounce", other)
        // } else {
            // this.owner.message("hurt", other)
        // }
    }
})

player.controls.altitude = new Control({
    owner: player,
    yAccel: 0,
    gliding: false,
    startJump: function(){
        this.yAccel -= 9
        this.gliding = true
    },
    bounce: function(){
        this.yAccel = -5
        this.gliding = false
    },
    flap: function(){
        this.yAccel -= Math.max(3, this.yAccel/2)
        this.gliding = true
        this.owner.controls.sprite.setCurrentAnimation("jump")
        flapAudio.play()
    },
    fall: function(){
        this.gliding = false
        this.owner.controls.sprite.setCurrentAnimation("fall")
    },
    move: function(dt){
        this.yAccel = Math.max(this.yAccel, -9)
        this.owner.controls.transform.position[1] += this.yAccel * (dt / 30)
        // if (this.gliding && this.yAccel > 0){
        //     this.owner.controls.sprite.setCurrentAnimation("glide")
        //     this.yAccel = (dt / 30)
        // } else {
            this.yAccel += 0.45 * (dt / 30)
        // }
        if (this.owner.controls.transform.position[1] >= GROUND - SPRITE_HEIGHT / 2){
            this.owner.controls.sprite.setCurrentAnimation("hurt")
            this.yAccel = 1.5
            blopAudio.play()
            game.message("lose")
        }
    }
})

// =================================================

// Player object states =========================

var walk = new State({
    enter: function(){
        this.controls.sprite.setCurrentAnimation("walk")
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
        this.controls.sprite.update(dt)
    }
})

var jump = new State({
    enter: function(){
        this.controls.sprite.setCurrentAnimation("jump")
        this.controls.altitude.startJump()
    },
    message: function(msg, e){
        switch (msg){
            case "jump":
                this.controls.altitude.flap()
                break
            case "fall":
                this.controls.altitude.fall()
                break
            case "hurt":
                this.changeState(hurt)
                break
            case "pounce":
                this.controls.sprite.setCurrentAnimation("pounce")
                this.controls.altitude.bounce()
        }
    },
    update: function(dt){
        this.controls.altitude.move(dt)
        this.controls.sprite.update(dt)
    }
})

var hurt = new State({
    enter: function(){
        screechAudio.play()
        this.controls.altitude.bounce()
        this.controls.sprite.setCurrentAnimation("hurt")
        game.message("lose")
    },
    message: function(msg){
    },
    update: function(dt){
        this.controls.altitude.move(dt)
        this.controls.sprite.update(dt)
    }
})

// =================================================

// Fern controls ====================================

// TODO: Make Fern class

function fernOnHit(){
    if (player.currentState == jump && player.controls.transform.position[1] < this.owner.controls.transform.position[1]){
            this.owner.changeState(deadEnemy)
            crunch2Audio.play()
        }
}

fern1.controls.sprite = new Sprite({
    owner: fern1,
    animations: {
        default: [1],
        dead: [0]
    }
})
fern1.controls.collider = new Collider({owner: fern1, onHit: fernOnHit})
fern1.controls.transform = new Transform({owner: fern1})
fern1.controls.scroller = new Scroller({owner: fern1})
fern1.controls.obstaclePooler = new ObstaclePooler({owner: fern1})

fern2.controls.sprite = new Sprite({
    owner: fern2,
    animations: {
        default: [1],
        dead: [0]
    }
})
fern2.controls.collider = new Collider({owner: fern2, onHit: fernOnHit})
fern2.controls.transform = new Transform({owner: fern2})
fern2.controls.scroller = new Scroller({owner: fern2})
fern2.controls.obstaclePooler = new ObstaclePooler({owner: fern2})

fern3.controls.sprite = new Sprite({
    owner: fern3,
    animations: {
        default: [1],
        dead: [0]
    }
})
fern3.controls.collider = new Collider({owner: fern3, onHit: fernOnHit})
fern3.controls.transform = new Transform({owner: fern3})
fern3.controls.scroller = new Scroller({owner: fern3})
fern3.controls.obstaclePooler = new ObstaclePooler({owner: fern3})

fern4.controls.sprite = new Sprite({
    owner: fern4,
    animations: {
        default: [1],
        dead: [0]
    }
})
fern4.controls.collider = new Collider({owner: fern4, onHit: fernOnHit})
fern4.controls.transform = new Transform({owner: fern4})
fern4.controls.scroller = new Scroller({owner: fern4})
fern4.controls.obstaclePooler = new ObstaclePooler({owner: fern4})

fern5.controls.sprite = new Sprite({
    owner: fern5,
    animations: {
        default: [1],
        dead: [0]
    }
})
fern5.controls.collider = new Collider({owner: fern5, onHit: fernOnHit})
fern5.controls.transform = new Transform({owner: fern5})
fern5.controls.scroller = new Scroller({owner: fern5})
fern5.controls.obstaclePooler = new ObstaclePooler({owner: fern5})

// =================================================

// Proto controls ===================================

// TODO: Make protoceratops class

function protoOnHit(){
    if (player.currentState == jump && player.controls.transform.position[1] < this.owner.controls.transform.position[1]){
            this.owner.changeState(deadEnemy)
            crunchAudio.play()
        }
}

proto1.controls.sprite = new Sprite({
    owner: proto1,
    animations: {
        default: [4],
        dead: [2,3]
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

proto2.controls.sprite = new Sprite({
    owner: proto2,
    animations: {
        default: [4],
        dead: [2,3]
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

proto3.controls.sprite = new Sprite({
    owner: proto3,
    animations: {
        default: [4],
        dead: [2,3]
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
        this.controls.sprite.setCurrentAnimation("default")
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
        this.controls.sprite.setCurrentAnimation("dead", false)
        scoreCounter.controls.incrementControl.increment(10)
    },
    update: function(dt){
        this.controls.scroller.update(dt)
        this.controls.obstaclePooler.update(dt)
        this.controls.sprite.update(dt)
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
    components: [player.controls.sprite, fern1.controls.sprite, fern2.controls.sprite, fern3.controls.sprite, fern4.controls.sprite, fern5.controls.sprite, proto1.controls.sprite, proto2.controls.sprite, proto3.controls.sprite],
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

game.changeState(titleScreen)
player.changeState(jump)
player.controls.altitude.gliding = false
fern1.changeState(inactiveObstacle)
fern2.changeState(inactiveObstacle)
fern3.changeState(inactiveObstacle)
fern4.changeState(inactiveObstacle)
fern5.changeState(inactiveObstacle)
proto1.changeState(inactiveObstacle)
proto2.changeState(inactiveObstacle)
proto3.changeState(inactiveObstacle)

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
    fgScrollSpeed = 0.12
    nextScoreMilestone = 50
    scoreboard.innerHTML = `SCORE: ${Math.floor(currentScore)}`
    player.controls.transform.position = [40, 125]
    game.changeState(play)
    player.changeState(jump)
    player.controls.altitude.gliding = false
    messageWindow.style.visibility = "hidden"
    game.changeState(play)
    loop = requestAnimationFrame(tick)

}

// =================================================

// Start ============================================

sprite.onload = () => {
    // loop = requestAnimationFrame(tick)
}
sprite.src = spritesheetSrc

// =================================================

// Export module ===================================

module.exports = {GameObject}