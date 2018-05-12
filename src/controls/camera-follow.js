const Control = require('../classes/control')
const renderer = require('../core/renderer')

var offset = [0,0]

class CameraFollow extends Control{
  constructor(args){
    super(args)
    this.name = 'camera-follow'
    this.margin = args.margin || [50, 100]
    this.camera = null
  }

  update(){
    this.camera.setOffset(-this.owner.controls.transform.position[0] + this.margin[0],
                          -this.owner.controls.transform.position[1] + this.margin[1])
  }
}

module.exports = CameraFollow