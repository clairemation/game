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
    this.progress += this.getGame().dt / 100
    this.tailPos = Math.cos(this.progress) * this.oscillationMagnitude
    this.oscillationMagnitude -= this.getGame().dt / 150
    this.oscillationMagnitude = Math.max(this.oscillationMagnitude, 0)
  }

  startOscillation(){
    this.oscillationMagnitude = this.tailPos
    this.progress = 0
  }

  tweenTowardsYVelocity(){
    var diff = this.owner.controls.velocity.y - this.tailPos
    if (Math.abs(diff) < 0.5) {
      this.tailPos = this.owner.controls.velocity.y
    } else {
      this.tailPos += 0.5 * Math.sign(diff)
    }
  }

  update(){
    var yPos = this.owner.controls.transform.position[1]
    if (Math.abs(this.lastYPos - yPos) >= 1){
      this.tweenTowardsYVelocity()
      this.oscillating = false
    } else if (!this.oscillating){
      this.oscillating = true
      this.startOscillation()
    } else {
      this.oscillate()
    }
    this.owner.controls.tailSprite.setFrame(this.blendAnimationLength - Math.floor(this.tailPos / 2 + this.normalizationNum))
    this.lastYPos = yPos
  }
}

module.exports = TailManager