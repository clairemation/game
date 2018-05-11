const Control = require('../classes/control')
const renderer = require('../core/renderer')

var offset = [0,0]

class Camera extends Control{
  constructor(args){
    super(args)
    this.name = 'camera'
    offset = args.offset || offset
    this.cameraFollow = null
    this.parallaxLayers = []
  }

  init(){
    this.cameraFollow = this.owner.scene.getControlsByName('camera-follow')[0]
    this.cameraFollow.camera = this
    this.parallaxLayers = this.owner.scene.getControlsByName('parallax')
  }

  reset(){
    renderer.setTransform(1, 0, 0, 1, 0, 0)
    offset[0] = 0
    offset[1] = 0
  }

  static reset(){
    Camera.setOffset(0, 0)
  }

  static setOffset(x, y){
    offset[0] = x
    offset[1] = y
    renderer.setTransform(1, 0, 0, 1, -offset[0], -offset[1])
  }

  static getOffset(){
    return offset
  }

  setOffset(x,y){
    var diff = [x - offset[0], y - offset[1]]
    for (let i = 0; i < this.parallaxLayers.length; i++){
      this.parallaxLayers[i].move(-diff[0], -diff[1])
    }
    Camera.setOffset(x, y)
  }

  update(){
    renderer.setTransform(1, 0, 0, 1, 0, 0)
    offset[0] = -this.owner.controls.transform.position.x + this.margin[0]
    offset[1] = -this.owner.controls.transform.position.y + this.margin[1]
    renderer.setTransform(1, 0, 0, 1, offset[0], offset[1])
  }
}

Camera.prototype.reset = Camera.reset
Camera.prototype.getOffset = Camera.getOffset

module.exports = Camera