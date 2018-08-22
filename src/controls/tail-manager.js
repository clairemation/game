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
    this.lastYVelocity = 0
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
    var sinValue = Math.cos(this.progress) * this.oscillationMagnitude
    this.progress += this.getGame().dt / 100
    this.oscillationMagnitude -= this.getGame().dt / 150
    this.tailPos = sinValue
    if (this.oscillationMagnitude < 1){
      this.oscillating = false
    }
  }

  settle(){
    if (this.onGround){
      return
    }
    this.onGround = true
    this.oscillationMagnitude = this.tailPos
    this.progress = 0
    this.oscillating = true
  }

  setFromYVelocity(){
    this.tailPos = this.owner.controls.velocity.y
  }

  update(){
    if (this.oscillating){
      this.oscillate()
    } else {
      this.setFromYVelocity()
    }
    this.owner.controls.tailSprite.setFrame(this.blendAnimationLength - Math.floor(this.tailPos / 2 + this.normalizationNum))
  }
}

module.exports = TailManager