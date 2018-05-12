const Control = require('../classes/control')
const renderer = require('../core/renderer')

var offset = [0,0]

class Parallax extends Control{
  constructor(args){
    super(args)
    this.name = 'parallax'
    this.level = args.level || 0.75
  }

  move(x, y){
    this.owner.controls.transform.position[0]+= x * this.level
    this.owner.controls.transform.position[1] += y * this.level
  }
}

module.exports = Parallax