const Control = require('../classes/control')
const renderer = require('../core/renderer')

var offset = [0,0]

class CameraFollow extends Control{
  constructor(args){
    super(args)
    this.name = 'camera-follow'
    this.margin = args.margin || [50, 100]
  }

  static reset(){
    renderer.setTransform(1, 0, 0, 1, 0, 0)
    offset[0] = 0
    offset[1] = 0
  }

  static getOffset(){
    return offset
  }

  update(){
    renderer.setTransform(1, 0, 0, 1, 0, 0)
    offset[0] = -this.owner.controls.transform.position.x + this.margin[0]
    offset[1] = -this.owner.controls.transform.position.y + this.margin[1]
    renderer.setTransform(1, 0, 0, 1, offset[0], offset[1])
  }
}

module.exports = CameraFollow