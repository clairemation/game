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

var player = new GameObject()
var gameEnginesObject = new GameObject()
var fern = new GameObject()
var game = new GameObject()

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

var prop = new Behavior({
    enter: function(){
        this.scripts.spriteHandler.setCurrentAnimation("default")
    },
    update: function(dt){
        this.scripts.scroll.update(dt)
    }
})

player.changeBehavior(walk)
fern.changeBehavior(prop)


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

gameEnginesObject.scripts.collisionEngine = new Script({
    owner: gameEnginesObject
})


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


var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var bg1 = document.getElementById("bg1")

var raptorSpritesheetSrc = "assets/spritesheets/sheet00.png"
var raptorSprite = new Image()
raptorSprite.onload = () => {
    requestAnimationFrame(tick)
}
raptorSprite.src = raptorSpritesheetSrc


// module.exports = {GameObject}