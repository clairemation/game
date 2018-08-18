const Control = require('../classes/control')
const $ = require('../lib/coolgebra')

class Velocity extends Control{
  constructor(args){
    super(args)
    this.x = 0
    this.y = 0
  }

  applyVelocity(){
    this.owner.controls.transform.moveBy(Math.ceil(this.x), Math.ceil(this.y))
  }

  previewNewPosition(){
    return $(this.owner.controls.transform.position).plusVector([this.x, this.y]).$
  }
}

module.exports = Velocity