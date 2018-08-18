const Control = require('../classes/control')
const renderer = require('../core/renderer')

var offset = [0,0]

class CameraFollow extends Control{
  constructor(args){
    super(args)
    this.name = 'camera-follow'
    this.margin = args.margin || [50, 100]
    this.shouldFollow = false
  }

  update(){
    this.shouldFollow = true
  }
}

module.exports = CameraFollow