const Control = require('../classes/control')
const renderer = require('../core/renderer')

var offset = [0,0]

class Parallax extends Control{
  constructor(args){
    super(args)
    this.name = 'parallax'
    this.level = args.level || 0.5
  }

  move(){

  }
}

module.exports = Parallax