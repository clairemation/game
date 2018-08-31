const Control = require('../classes/control')
const $ = require('../lib/coolgebra')

class Flap extends Control{
  constructor(args){
    super(args)
    this.floorNormal = [0, -1]
  }

  startJump(){
    var jumpVec = $(this.floorNormal).timesScalar(7).$
    this.owner.controls.velocity.y += jumpVec[1]
    this.owner.changeState('flying')
    this.owner.controls.animationStateMachine.setTrigger('flap')
    this.owner.controls.tailManager.onGround = false
  }

  flap(){
    this.owner.controls.velocity.y -= Math.max(1.5, this.owner.controls.velocity.y * 0.9)
    this.owner.controls.animationStateMachine.setTrigger('flap')
  }

  fall(){
    this.owner.controls.animationStateMachine.setTrigger('fall')
  }
}

module.exports = Flap