// Constants ==========================

const ANIM_FRAMERATE = 200
const SPRITE_WIDTH = 48
const SPRITE_HEIGHT = 32
const GROUND = 200

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
        // if (this.currentBehavior != newBehavior){
            this.currentBehavior.exit.call(this, newBehavior)
            newBehavior.enter.call(this, this.currentBehavior)
            this.currentBehavior = newBehavior
        // }
    }
}


// Derived classes ==============================

class SpriteHandler extends Script{
    constructor(args = {}){
        super(args)
        this.engine = spriteEngineScript
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
        this.currentAnimation = this.animations[name]
        this.currentFrameNum = 0
        this.currentFrame = this.currentAnimation[this.currentFrameNum]
        this.numFrames = this.currentAnimation.length
        this.elapsedTime = 0
    }
}

// =================================================

var player = new GameObject()
var gameEnginesObject = new GameObject()
var fern = new GameObject()

var levelGameplayScript = new Script({
    gameObjects: {
        player,
        // fern,
        gameEnginesObject
    },
    update: function(dt){
        for (var goName in this.gameObjects){
            this.gameObjects[goName].update(dt)
        }
    }
})

var game = new GameObject({
    scripts: {
        levelGameplayScript
    }
})

player.scripts.transform = new Script({
    owner: player,
    position: [20, GROUND - SPRITE_HEIGHT],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    facing: [1, 0],
    pivot: [SPRITE_WIDTH / 2, SPRITE_HEIGHT],
    center: [SPRITE_WIDTH / 2, SPRITE_HEIGHT / 2]
})

player.scripts.spriteHandler = new SpriteHandler({
    owner: player,
    animations: {
        stand: [3],
        walk: [3, 4],
        jump: [1],
        fall: [2]
    }
})

fern.scripts.spriteHandler = new SpriteHandler({
    owner: fern,
    animations: {
        default: [0]
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
                if (this.scripts.jumpScript.jumpBar > 5){
                    this.changeBehavior(jump)
                }
                break
        }
    },
    update: function(dt){
        this.scripts.spriteHandler.update(dt)
        this.scripts.jumpScript.charge(dt)
    }
})

player.scripts.jumpScript = new Script({
    owner: player,
    yAccel: 0,
    nextJumpTime: 0,
    jumpBar: 10,
    startJump: function(){
        this.yAccel -=7
        this.nextJumpTime = currentTime + 1000
        this.jumpBar = Math.max(this.jumpBar - 5, 0)
    },
    move: function(dt){
        this.owner.scripts.transform.position[1] += this.yAccel * (dt / 30)
        this.yAccel += 0.5 * (dt / 30)
        if (this.yAccel > 0) {
            this.owner.changeBehavior(fall)
        }
        if (this.owner.scripts.transform.position[1] >= GROUND - SPRITE_HEIGHT){
            this.owner.scripts.transform.position[1] = GROUND - SPRITE_HEIGHT
            this.yAccel = 0
            this.owner.changeBehavior(walk)
        }
    },
    charge: function(dt){
        this.jumpBar = Math.min(this.jumpBar + dt/100, 10)
    }
})

var fall = new Behavior({
    enter: function(){
        this.scripts.spriteHandler.setCurrentAnimation("fall")
    },
    message: function(msg){
        switch (msg){
            case "jump":
                if (this.scripts.jumpScript.jumpBar > 5){
                    this.changeBehavior(jump)
                }
                break
        }
    },
    update: function(dt){
        this.scripts.jumpScript.move(dt)
        this.scripts.jumpScript.charge(dt)
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
                if (this.scripts.jumpScript.jumpBar > 5){
                    this.changeBehavior(jump)
                }
                break
        }
    },
    update: function(dt){
        this.scripts.jumpScript.move(dt)
        this.scripts.jumpScript.charge(dt)
    }
})

player.changeBehavior(walk)


document.addEventListener("keydown", e => {
    if (e.keyCode == 32){
        player.message("jump")
    }
})


var spriteEngineScript = new Script({
    components: [player.scripts.spriteHandler],
    update: function(dt){
        ctx.clearRect(0, 0, 320, 240)
        for (var i = 0; i < this.components.length; i++){
            var position = this.components[i].owner.scripts.transform.position
            var frame = this.components[i].currentFrame
            ctx.drawImage(raptorSprite, frame*SPRITE_WIDTH, 0, SPRITE_WIDTH, SPRITE_HEIGHT, position[0], position[1], SPRITE_WIDTH, SPRITE_HEIGHT)
        }
    }
})

gameEnginesObject.scripts.spriteEngine = spriteEngineScript




// Expose globally
var currentTime
var tick = (() => {

    var lastTime = 0

    function tick(timestamp){
        requestAnimationFrame(tick);
        var dt = timestamp - lastTime
        game.update(dt);
        lastTime = timestamp
        currentTime = timestamp
        console.log(player.scripts.jumpScript.jumpBar)
    }

    return tick
})()


var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var raptorSpritesheetSrc = "assets/spritesheets/sheet00.png"
var raptorSprite = new Image()
raptorSprite.onload = () => {
    requestAnimationFrame(tick)
}
raptorSprite.src = raptorSpritesheetSrc


// module.exports = {GameObject}