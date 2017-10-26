// Constants ==========================

const FRAMERATE = 200
const SPRITE_WIDTH = 48
const SPRITE_HEIGHT = 32

// ====================================

// Base Classes =======================

class GameObject{
    constructor(args = {}){
        this.scripts = {}
        this.behaviors = {
            default: sharedBehaviors.updateAllScripts
        }
        this.currentBehavior = this.behaviors.default
        Object.assign(this, args.properties)
    }

    update(dt){
        this.currentBehavior.update.call(this, dt)
    }

    changeBehavior(newBehavior){
        this.currentBehavior.exit()
        newBehavior.enter()
        this.currentBehavior = newBehavior
    }
}

class Behavior{
    constructor(args = {}){
        Object.assign(this, args.properties)
    }

    enter(){
        //Override
    }

    exit(){
        //Override
    }

    update(deltaTime){
        //Override
    }
}

class Script{
    constructor(args = {}){
        Object.assign(this, args.properties)
    }

    update(deltaTime){
        //Override
    }
}

// ====================================

var sharedBehaviors = {
    updateAllScripts: {
        update: function(dt){
            for (var scriptName in this.scripts){
                this.scripts[scriptName].update(dt)
            }
        }
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
        this.elapsedTime = this.elapsedTime % (this.numFrames * FRAMERATE)
        this.currentFrameNum = Math.floor (this.elapsedTime / FRAMERATE)
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

var levelGameplayScript = new Script({
    properties: {
        gameObjects: {
            player,
            gameEnginesObject
        },
        update: function(dt){
            for (var goName in this.gameObjects){
                this.gameObjects[goName].update(dt)
            }
        }
    }
})

var game = new GameObject({
    properties: {
        scripts: {
            levelGameplayScript
        }
    }
})

player.scripts.transform = new Script({
    properties: {
        owner: player,
        position: [20, 200],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        forward: [1, 0]
    }
})

player.scripts.spriteHandler = new SpriteHandler({
    properties: {
        owner: player,
        engine: spriteEngineScript,
        animations: {
            stand: [2],
            walk: [2, 3],
            flap: [0, 1]
        }
    }
})

player.scripts.spriteHandler.setCurrentAnimation("stand")

player.scripts.movementController = new Script({
    properties: {
        push(direction){

        }
    }
})

document.addEventListener("keydown", e => {
    if (e.keyCode == 38){
        
    }
})


var spriteEngineScript = new Script({
    properties: {
        components: [player.scripts.spriteHandler],
        update: function(dt){
            ctx.clearRect(0, 0, 320, 240)
            for (var i = 0; i < this.components.length; i++){
                var position = this.components[i].owner.scripts.transform.position
                var frame = this.components[i].currentFrame
                ctx.drawImage(raptorSprite, frame*SPRITE_WIDTH, 0, SPRITE_WIDTH, SPRITE_HEIGHT, position[0], position[1], SPRITE_WIDTH, SPRITE_HEIGHT)
            }
        }
    }
})

gameEnginesObject.scripts.spriteEngine = spriteEngineScript






var tick = (() => {

    var lastTime = 0

    function tick(timestamp){
        requestAnimationFrame(tick);
        var dt = timestamp - lastTime
        game.update(dt);
        lastTime = timestamp
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