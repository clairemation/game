const Control = require('../classes/control')

const ANIM_FRAMERATE = 200
const LEFT = false, RIGHT = true

// animations: {
//     stand: ['walk00'],
//     walk: ['walk00', 'walk01']
// }

class Sprite extends Control{
    constructor(args = {}){
        super(args)
        this.name = 'sprite'
        this.tag = args.tag
        this.animating = args.animating == undefined ? true : args.animating
        this.spritesheetName = args.spritesheetName
        this.spritesheetData = args.spritesheetData
        this.animations = args.animations
        this.layer = args.layer
        this.currentFrameNum = 0
        this.elapsedTime = 0
        this.looping = true
        this.finished = false
        this.shouldDraw = false
        this.onFinished = function(){}
        this.setAnimation(...args.initialAnimation)
    }

    update(){
        if (this.animating){
            this.advanceFrame()
        }
        this.shouldDraw = true
    }

    advanceFrame(){
        this.elapsedTime += this.getGame().dt
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

    setFrame(num){
        this.currentFrameNum = Math.max(Math.min(num, this.currentAnimation.length - 1), 0)
        this.currentFrame = this.currentAnimation[this.currentFrameNum]
    }

    setAnimation(name, looping = true, onFinished = function(){}){
        this.looping = looping
        this.finished = false
        this.onFinished = onFinished
        this.currentAnimation = this.animations[name]
        this.currentFrameNum = 0
        this.currentFrame = this.currentAnimation[this.currentFrameNum]
        this.numFrames = this.currentAnimation.length
        this.elapsedTime = 0
    }
}

module.exports = Sprite