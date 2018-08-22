const Control = require('../classes/control')

class Flap extends Control{
  startJump(){
    this.owner.controls.velocity.y -= 7
    this.owner.changeState('flying')
    this.owner.controls.bodyAnimationStateMachine.setTrigger('flap')
  }

  flap(){
    this.owner.controls.velocity.y -= Math.max(1.5, this.owner.controls.velocity.y * 0.9)
    this.owner.controls.bodyAnimationStateMachine.setTrigger('flap')
  }

  fall(){
    this.owner.controls.bodyAnimationStateMachine.setTrigger('fall')
  }
}

module.exports = Flap