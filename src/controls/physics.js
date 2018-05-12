const Control = require('../classes/control')

class Physics extends Control{
  constructor(args){
    super(args)
    this.movement = [0,0]
  }

  addMovement(x,y){
    this.movement[0] += x
    this.movement[1] += y
  }

  update(){
    this.owner.controls.transform.prevPosition[0] = this.owner.controls.transform.position[0]
    this.owner.controls.transform.prevPosition[1] = this.owner.controls.transform.position[1]
    this.owner.controls.transform.position[0] += this.movement[0]
    this.owner.controls.transform.position[1] += this.movement [1]
    this.movement[0] = 0
    this.movement[1] = 0
  }
}

module.exports = Physics