// Libs ===============================

// const $ = require("./lib/coolgebra.js")

// ====================================

// Constants ==========================

const ANIM_FRAMERATE = 200
const SPRITE_WIDTH = 48
const SPRITE_HEIGHT = 32
const GROUND = 176

// ====================================

// Base Classes =======================

class Behavior{
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

var sharedBehaviors = {
    updateAllScripts: new Behavior({
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
        this.behaviors = {
            default: sharedBehaviors.updateAllScripts
        }
        this.currentBehavior = this.behaviors.default
        Object.assign(this, args)
    }

    update(dt){
        this.currentBehavior.update.call(this, dt)
    }

    message(msg){
        this.currentBehavior.message.call(this, msg)
    }

    changeBehavior(newBehavior){
        this.currentBehavior.exit.call(this, newBehavior)
        newBehavior.enter.call(this, this.currentBehavior)
        this.currentBehavior = newBehavior
    }
}


// Derived classes ==============================

class SpriteHandler extends Script{
    constructor(args = {}){
        super(args)
        this.engine = gameEnginesObject.spriteEngine
        this.currentFrameNum = 0
        this.elapsedTime = 0
    }

    update(dt){
        this.advanceFrame(dt)
    }

    advanceFrame(dt){
        this.elapsedTime += dt
        this.elapsedTime = this.elapsedTime % (this.numFrames * ANIM_FRAMERATE)
        this.currentFrameNum = Math.floor (this.elapsedTime / ANIM_FRAMERATE)
        this.currentFrame = this.currentAnimation[this.currentFrameNum]
    }

    setCurrentAnimation(name){
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
        this.engine = gameEnginesObject.collisionEngine
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

// =================================================

// Game Object declarations ========================

var player = new GameObject({name: "Player"})
var gameEnginesObject = new GameObject({name: "GameEnginesObject"})
var fern = new GameObject({name: "Fern1"})
var game = new GameObject({name: "Game"})

// =================================================

// Game object scripts =============================

game.scripts.levelGameplayScript = new Script({
    gameObjects: {
        player,
        fern,
        gameEnginesObject
    },
    update: function(dt){
        for (var name in this.gameObjects){
            this.gameObjects[name].update(dt)
        }
    }
})

// =================================================

// Player object scripts ===========================

player.scripts.transform = new Transform({
    owner: player,
    position: [20, GROUND - SPRITE_HEIGHT]
})

player.scripts.spriteHandler = new SpriteHandler({
    owner: player,
    animations: {
        stand: [3],
        walk: [5, 6],
        jump: [1],
        fall: [2],
        glide: [3, 4]
    }
})

player.scripts.collisionReceiver = new CollisionReceiver({
    owner: player,
    hitBox: [0, 0, SPRITE_WIDTH, SPRITE_HEIGHT],
    onHit: function(other){
        console.log("Hit")
    }
})

player.scripts.jumpScript = new Script({
    owner: player,
    yAccel: 0,
    gliding: false,
    startJump: function(){
        this.yAccel -= 7
        this.gliding = true
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
        this.yAccel = Math.max(this.yAccel, -7)
        this.owner.scripts.transform.position[1] += this.yAccel * (dt / 30)
        if (this.gliding && this.yAccel > 0){
            this.owner.scripts.spriteHandler.setCurrentAnimation("glide")
            this.yAccel = (dt / 30)
        } else {
            this.yAccel += 0.5 * (dt / 30)
        }
        if (this.owner.scripts.transform.position[1] >= GROUND - SPRITE_HEIGHT){
            this.owner.scripts.transform.position[1] = GROUND - SPRITE_HEIGHT
            this.yAccel = 0
            this.owner.changeBehavior(walk)
        }
    }
})

// =================================================

// Player object behaviors =========================

var stand = new Behavior({
    enter: function(){
        this.scripts.spriteHandler.setCurrentAnimation("stand")
    },
    message: function(msg){
        switch (msg){
            case "jump":
                this.changeBehavior(jump)
                break
        }
    }
})

var walk = new Behavior({
    enter: function(){
        this.scripts.spriteHandler.setCurrentAnimation("walk")
    },
    message: function(msg){
        switch (msg){
            case "jump":
                this.changeBehavior(jump)
                break
        }
    },
    update: function(dt){
        this.scripts.spriteHandler.update(dt)
    }
})

var jump = new Behavior({
    enter: function(){
        this.scripts.spriteHandler.setCurrentAnimation("jump")
        this.scripts.jumpScript.startJump()
    },
    message: function(msg){
        switch (msg){
            case "jump":
                this.scripts.jumpScript.flap()
                break
            case "fall":
                this.scripts.jumpScript.fall()
        }
    },
    update: function(dt){
        this.scripts.jumpScript.move(dt)
        this.scripts.spriteHandler.update(dt)
    }
})

// =================================================

// Fern scripts ====================================

fern.scripts.collider = new Collider({
    owner: fern,
    hitBox: [0, 0, SPRITE_WIDTH, SPRITE_HEIGHT]
})

fern.scripts.spriteHandler = new SpriteHandler({
    owner: fern,
    animations: {
        default: [0]
    }
})

fern.scripts.transform = new Transform({
    owner: fern,
    position: [320, GROUND - SPRITE_HEIGHT],
})

fern.scripts.scroll = new Script({
    owner: fern,
    xScroll: 0,
    update: function(dt){
        this.xScroll = (this.xScroll + 2.5 * (dt/30))
        this.owner.scripts.transform.position[0] = 320 - this.xScroll
    }
})

// =================================================

// Fern behaviors ==================================

var prop = new Behavior({
    enter: function(){
        this.scripts.spriteHandler.setCurrentAnimation("default")
    },
    update: function(dt){
        this.scripts.scroll.update(dt)
    }
})

// =================================================

// Game engine scripts =============================

gameEnginesObject.scripts.spriteEngine = new Script({
    owner: gameEnginesObject,
    components: [player.scripts.spriteHandler, fern.scripts.spriteHandler],
    update: function(dt){
        ctx.clearRect(0, 0, 320, 240)
        for (var i = 0; i < this.components.length; i++){
            var position = this.components[i].owner.scripts.transform.position
            var frame = this.components[i].currentFrame
            ctx.drawImage(raptorSprite, frame*SPRITE_WIDTH, 0, SPRITE_WIDTH, SPRITE_HEIGHT, position[0], position[1], SPRITE_WIDTH, SPRITE_HEIGHT)
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
    components: [fern.scripts.collider],
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
            }
        }
    }
})

// =================================================

// Behavior assignments ============================

player.changeBehavior(walk)
fern.changeBehavior(prop)

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

// Expose globally
var currentTime
var tick = (() => {

    var lastTime = 0

    function tick(timestamp){
        requestAnimationFrame(tick);
        var dt = timestamp - lastTime
        currentTime = timestamp
        game.update(dt);
        lastTime = timestamp
        bgX = (bgX - 5 * (dt/30)) % 640
        bg1.style.backgroundPosition = `${bgX}px 0px`
    }

    return tick
})()

// =================================================

// Get resources ===================================

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var bg1 = document.getElementById("bg1")

var raptorSpritesheetSrc = "assets/spritesheets/sheet00.png"
var raptorSprite = new Image()
raptorSprite.onload = () => {
    requestAnimationFrame(tick)
}
raptorSprite.src = raptorSpritesheetSrc

// =================================================

// Export module ===================================


// module.exports = {GameObject}