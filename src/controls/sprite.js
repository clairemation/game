const Control = require('../classes/control')

const ANIM_FRAMERATE = 200

// animations: {
//     stand: ['walk00'],
//     walk: ['walk00', 'walk01']
// }

class Sprite extends Control{
    constructor(args = {}){
        super(args)
        this.spritesheetName = args.spritesheetName
        this.spritesheetData = args.spritesheetData
        this.animations = args.animations
        this.currentFrameNum = 0
        this.elapsedTime = 0
        this.looping = true
        this.finished = false
        this.shouldDraw = false
        this.onFinished = function(){}
    }

    update(){
        this.advanceFrame()
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

    setCurrentAnimation(name, looping = true, onFinished = function(){}){
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