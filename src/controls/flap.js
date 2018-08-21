const Control = require('../classes/control')

class Flap extends Control{
  startJump(){
    this.owner.controls.velocity.y -= 7
    this.owner.changeState('flying')
    // this.owner.controls.sprite.setAnimation('Rjump')
  }

  flap(){
    this.owner.controls.velocity.y -= Math.max(1.5, this.owner.controls.velocity.y * 0.9)
    // this.owner.controls.sprite.setAnimation("Rjump")
  }

  fall(){
    // this.owner.controls.sprite.setAnimation("Rfall")
  }
}

module.exports = Flap