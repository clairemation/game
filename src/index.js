const FRAMERATE = 200

var GameObject = (() => {
    const goIndex = [];

    class GameObject{
        constructor(args = {}){
            goIndex.push(this)
            this.components = {}
            this.behaviors = {}
            Object.assign(this, args.properties)
            Object.defineProperty(this, "all", {
                get: () => goIndex
            })
        }

        update(deltaTime){
            this.currentBehavior.update.call(this, deltaTime)
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


class NormalGameBehavior extends Behavior{
    update(deltaTime){
        this.components.gameplay.update(deltaTime);
    }
}

var game = new GameObject({
    properties: {
        behaviors: {
            normal: new NormalGameBehavior()
        },
        components: {
            gameplay: {
                update: updateGameplay
            }
        }
    }
})

game.currentBehavior = game.behaviors.normal


var player = new GameObject()

player.components.transform = {
    owner: player,
    position: [20, 200],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    forward: [1, 0]
}

player.spriteHandler = new SpriteHandler({
    owner: player,
    engine: spriteEngine
})

var spriteEngine = {
    spriteComponents: [player.spriteHandler],
    update: function(){
        ctx.clearRect(0, 0, 320, 240)

        for (var i = 0; i < this.spriteComponents.length; i++){
            var position = this.spriteComponents[i].owner.components.transform.position
            var frame = this.spriteComponents[i].currentFrame
            ctx.drawImage(raptorSprite, frame*48, 0, 48, 32, position[0], position[1], 48, 32)
        }
    }
}

function SpriteHandler(args){
    this.owner = args.owner
    this.engine = args.spriteEngine
    this.animations = {
        walk: [2, 3],
        flap: [0, 1]
    }
    this.currentAnimation = this.animations.walk
    this.currentFrameNum = 0

    this.currentFrame = this.currentAnimation[this.currentFrameNum]

    this.numFrames = this.currentAnimation.length

    this.elapsedTime = 0

}

SpriteHandler.prototype.advanceFrame = function(deltaTime){
    this.elapsedTime += deltaTime
    this.elapsedTime = this.elapsedTime % (this.numFrames * FRAMERATE)
    this.currentFrameNum = Math.floor (this.elapsedTime / FRAMERATE)
    this.currentFrame = this.currentAnimation[this.currentFrameNum]
}




var elapsedTime = 0
var frameOne = true
const numFrames = 2

function updateGameplay(deltaTime){
    player.spriteHandler.advanceFrame(deltaTime)
    spriteEngine.update(deltaTime)
}


var lastTime = 0

function tick(timestamp){
    requestAnimationFrame(tick);
    var dt = timestamp - lastTime
    lastTime = timestamp
    game.update(dt);
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