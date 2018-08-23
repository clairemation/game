const Control = require('../classes/control')

class TailManager extends Control{
  constructor(args){
    super(args)
    this.oscillating = false
    this.oscillationMagnitude = 0
    this.progress = 0
    this.onGround = false
    this.blendAnimationLength = 0
    this.normalizationNum = 0
    this.tailPos = 0
    this.lastYPos = 0
    this.oscillationRate = 100
  }

  init(){
    this.blendAnimationLength = this.owner.controls.tailSprite.currentAnimation.length
    this.normalizationNum = Math.ceil(this.blendAnimationLength / 2)
  }

  changeDirection(dir){
    if (dir != 0){
      this.owner.controls.tailSprite.setAnimation(dir == 1 ? 'Rblend' : 'Lblend')
    }
  }

  oscillate(){
    this.progress += this.getGame().dt / this.oscillationRate
    this.tailPos = Math.cos(this.progress) * this.oscillationMagnitude
    this.oscillationMagnitude -= this.getGame().dt / 150
    this.oscillationMagnitude = Math.max(this.oscillationMagnitude, 0)
  }

  startOscillation(startPos){
    this.oscillationMagnitude = startPos
    this.progress = 0
  }

  tweenTowards(pos){
    var diff = pos - this.tailPos
    if (Math.abs(diff) < 0.5) {
      this.tailPos = this.owner.controls.velocity.y
    } else {
      this.tailPos += 0.5 * Math.sign(diff)
    }
  }

  offsetTowardsButtPosition(){
    if ((this.owner.controls.bodySprite.currentAnimationName == 'Lwalk' || this.owner.controls.bodySprite.currentAnimationName == 'Rwalk') && this.owner.controls.bodySprite.currentFrameNum == 1){
      this.owner.controls.tailSprite.offset[1] = -1
    } else {
      this.owner.controls.tailSprite.offset[1] = 0
    }
  }

  update(){
    this.offsetTowardsButtPosition()
    var yPos = this.owner.controls.transform.position[1]
    var yPosDiff = yPos - this.lastYPos
    if (Math.abs(yPosDiff) >= 1){
      this.oscillating = false
      this.tweenTowards(yPosDiff)
    } else if (!this.oscillating){
      this.oscillating = true
      this.startOscillation(this.tailPos)
    } else {
      if (this.owner.controls.velocity.x != 0){
        this.oscillationMagnitude = Math.max(this.oscillationMagnitude, 1)
      }
      this.oscillate()
    }
    this.owner.controls.tailSprite.setFrame(this.blendAnimationLength - Math.floor(this.tailPos / 2 + this.normalizationNum))
    this.lastYPos = yPos
  }
}

module.exports = TailManager