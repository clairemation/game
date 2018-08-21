const Control = require('../classes/control')

class Flap extends Control{
  startJump(){
    this.owner.controls.velocity.y -= 7
    this.owner.changeState('flying')
    this.owner.controls.sprite.setCurrentAnimation('jump')
  }

  flap(){
    this.owner.controls.velocity.y -= Math.max(1.5, this.owner.controls.velocity.y * 0.9)
    this.owner.controls.velocity.x = Math.max(3, this.owner.controls.velocity.x)
    this.owner.controls.sprite.setCurrentAnimation("jump")
  }

  fall(){
    this.owner.controls.sprite.setCurrentAnimation("fall")
  }
}

module.exports = Flap