const Control = require('../classes/control')
const renderer = require('../core/renderer')

class CameraFollow extends Control{
  constructor(args){
    super(args)
    this.name = 'camera-follow'
    this.margin = args.margin || [50, 100]
  }

  update(){
    renderer.setTransform(1, 0, 0, 1, 0, 0)
    renderer.setTransform(1, 0, 0, 1, -this.owner.controls.transform.position.x + 50, -this.owner.controls.transform.position.y + 100)
  }
}

module.exports = CameraFollow