const PIXEL_WIDTH = 320
const PIXEL_HEIGHT = 240

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
  }

  update(){
    if (this.cameraFollow && this.cameraFollow.shouldFollow){
      var newPos = []
      newPos[0] = Math.min(-this.cameraFollow.owner.controls.transform.position[0] + this.cameraFollow.margin[0], -32)
      newPos[1] = Math.min(-this.cameraFollow.owner.controls.transform.position[1] + this.cameraFollow.margin[1], -32)
      Camera.setOffset(...newPos)
      this.cameraFollow.shouldFollow = false
    }
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
    offset[0] = Math.round(x)
    offset[1] = Math.round(y)
    renderer.setTransform(1, 0, 0, 1, -offset[0], -offset[1])
  }

  static getOffset(){
    return offset
  }

  static getViewportPosition(){
    return [-offset[0], -offset[1]]
  }

  static setViewportPosition(x, y){
    Camera.setOffset(-x, -y)
  }

  static getPixelWidth(){
    return PIXEL_WIDTH
  }

  static getPixelHeight(){
    return PIXEL_HEIGHT
  }
}

Camera.prototype.reset = Camera.reset
Camera.prototype.getOffset = Camera.getOffset
Camera.prototype.setOffset = Camera.setOffset
Camera.prototype.getViewportPosition = Camera.getViewportPosition
Camera.prototype.setViewportPosition = Camera.setViewportPosition

module.exports = Camera