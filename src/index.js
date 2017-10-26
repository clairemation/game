const FRAMERATE = 200
const SPRITE_WIDTH = 48
const SPRITE_HEIGHT = 32

var GameObject = (() => {
    const goIndex = [];

    class GameObject{
        constructor(args = {}){
            goIndex.push(this)
            this.scripts = {}
            this.behaviors = {}
            Object.assign(this, args.properties)
            Object.defineProperty(this, "all", {
                get: () => goIndex
            })
        }

        update(dt){
            this.currentBehavior.update.call(this, dt)
        }

        destroy(){
            goIndex.splice(goIndex.indexOf(this), 1)
        }

        changeBehavior(newBehavior){
            this.currentBehavior.exit()
            newBehavior.enter()
            this.currentBehavior = newBehavior
        }
    }

    return GameObject
})()


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

    update(timestamp){
        //Override
    }
}

class Script{
    constructor(args = {}){
        this.owner = args.owner
        this.engine = args.engine
        Object.assign(this, args.properties)
    }
}

class SpriteHandler extends Script{
    constructor(args = {}){
        super(args)
        this.engine = spriteEngine
        this.currentFrameNum = 0
        this.elapsedTime = 0
    }

    setCurrentAnimation(name){
        this.currentAnimation = this.animations[name]
        this.currentFrameNum = 0
        this.currentFrame = this.currentAnimation[this.currentFrameNum]
        this.numFrames = this.currentAnimation.length
        this.elapsedTime = 0
    }

    advanceFrame(dt){
        this.elapsedTime += dt
        this.elapsedTime = this.elapsedTime % (this.numFrames * FRAMERATE)
        this.currentFrameNum = Math.floor (this.elapsedTime / FRAMERATE)
        this.currentFrame = this.currentAnimation[this.currentFrameNum]
    }

    update(dt){
        advanceFrame(dt)
    }
}

var gameplayBehavior = new Behavior({
    properties: {
        update: function(dt){
            this.scripts.levelGameplay.update(dt);
        }
    }
})

var levelGameplay = new Script({
    properties: {
        gameObjects: {
            player,
            spriteEngine
        },
        update: function(dt){
            for (var i = 0; i < this.gameObjects.length; i++){
                this.gameObjects[i].update(dt)
            }
        }
    }
})

var game = new GameObject({
    properties: {
        behaviors: {
            normal: gameplayBehavior
        },
        scripts: {
            levelGameplay
        }
    }
})

game.currentBehavior = game.behaviors.normal

var player = new GameObject()

player.scripts.transform = {
    owner: player,
    position: [20, 200],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    forward: [1, 0]
}

player.scripts.spriteHandler = new SpriteHandler({
    owner: player,
    engine: spriteEngine,
    properties: {
        animations: {
            walk: [2, 3],
            flap: [0, 1]
        }
    }
})

player.scripts.spriteHandler.setCurrentAnimation("walk")

var spriteEngine = {
    components: [player.spriteHandler],
    update: function(){
        ctx.clearRect(0, 0, 320, 240)
        for (var i = 0; i < this.components.length; i++){
            var position = this.components[i].owner.components.transform.position
            var frame = this.components[i].currentFrame
            ctx.drawImage(raptorSprite, frame*SPRITE_WIDTH, 0, SPRITE_WIDTH, SPRITE_HEIGHT, position[0], position[1], SPRITE_WIDTH, SPRITE_HEIGHT)
        }
    }
}


var lastTime = 0

function tick(timestamp){
    requestAnimationFrame(tick);
    var dt = timestamp - lastTime
    game.update(dt);
    // console.log(player.scripts.spriteHandler.currentFrame)
    lastTime = timestamp
}



var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var raptorSpritesheetSrc = "assets/spritesheets/sheet00.png"
var raptorSprite = new Image()
raptorSprite.onload = () => {
    requestAnimationFrame(tick)
}
raptorSprite.src = raptorSpritesheetSrc


module.exports = {GameObject}