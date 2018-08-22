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
    this.oscillationMagnitude = Math.max(this.oscillationMagnitude, 0)
    this.tailPos = sinValue
  }

  settle(){
    this.oscillationMagnitude = this.tailPos
    this.progress = 0
  }

  setFromYVelocity(){
    this.tailPos = this.owner.controls.velocity.y
  }

  update(){
    var yPos = this.owner.controls.transform.position[1]
    if (Math.abs(this.lastYPos - yPos) >= 1){
      console.log('asdf')
      this.setFromYVelocity()
      this.oscillating = false
    } else if (!this.oscillating){
      this.oscillating = true
      this.settle()
    } else {
      this.oscillate()
    }
    this.owner.controls.tailSprite.setFrame(this.blendAnimationLength - Math.floor(this.tailPos / 2 + this.normalizationNum))
    this.lastYPos = yPos
  }
}

module.exports = TailManager