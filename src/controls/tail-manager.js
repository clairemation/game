const Control = require('../classes/control')

class TailManager extends Control{
  constructor(args){
    super(args)
    this.oscillating = false
    this.oscillationMagnitude = 0
    this.progress = 0
    this.onGround = false
  }

  changeDirection(dir){
    if (dir != 0){
      this.owner.controls.tailSprite.setAnimation(dir == 1 ? 'Rblend' : 'Lblend')
    }
  }

  oscillate(){
    var sinValue = Math.sin(this.progress) * this.oscillationMagnitude
    this.progress += this.getGame().dt / 100
    this.oscillationMagnitude -= this.getGame().dt / 100
    this.tailPos = 7 - Math.floor(sinValue / 2 + Math.ceil(this.owner.controls.tailSprite.currentAnimation.length / 2))
    if (this.oscillationMagnitude < 1){
      this.oscillating = false
    }
    console.log(this.progress)
  }

  settle(){
    if (this.onGround){
      return
    }
    this.onGround = true
    this.oscillationMagnitude = 4
    this.progress = 0
    this.oscillating = true
  }

  update(){
    if (this.oscillating){
      this.oscillate()
    } else {
      this.tailPos = (7 - Math.floor(this.owner.controls.velocity.y / 2 + Math.ceil(this.owner.controls.tailSprite.currentAnimation.length / 2)))
    }
    this.owner.controls.tailSprite.setFrame(this.tailPos)
  }
}

module.exports = TailManager