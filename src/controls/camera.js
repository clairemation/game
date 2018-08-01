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

  getPixelWidth(){
    return PIXEL_WIDTH
  }

  getPixelHeight(){
    return PIXEL_HEIGHT
  }

  setOffset(x,y){

    Camera.setOffset(x, y)

    var rate, rowNum, xCamOffset, yCamOffset
    for (var i = 0; i < this.parallaxLayers.length; i++){
      rowNum = this.parallaxLayers[i].rowNumber
      //Only need to recalc if rate is different from last iteration
      if (rate != this.parallaxLayers[i].rate){
        rate = this.parallaxLayers[i].rate
        xCamOffset = x % (PIXEL_WIDTH * rate) / rate
        yCamOffset = y % (PIXEL_HEIGHT * rate) / rate
      }
      this.parallaxLayers[i].owner.controls.transform.position[0] = -x + xCamOffset + PIXEL_WIDTH * rowNum
      this.parallaxLayers[i].owner.controls.transform.position[1] = -y + yCamOffset + this.parallaxLayers[i].offset[1]
    }
  }

  update(){
    offset[0] = -this.owner.controls.transform.position.x + this.margin[0]
    offset[1] = -this.owner.controls.transform.position.y + this.margin[1]
    renderer.setTransform(1, 0, 0, 1, offset[0], offset[1])
  }
}

Camera.prototype.reset = Camera.reset
Camera.prototype.getOffset = Camera.getOffset

module.exports = Camera