const Control = require('../classes/control')
const renderer = require('../core/renderer')

var count = 0

class Parallax extends Control{
  constructor(args){
    super(args)
    this.name = 'parallax'
    this.rate = 7.5
    this.rowNumber = args.rowNumber
    this.offset = args.offset
  }

  setPosition(x, y){
    this.owner.controls.transform.position[0] = x
    this.owner.controls.transform.position[1] = y
  }
}

module.exports = Parallax