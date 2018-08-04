const Control = require('../classes/control')
const renderer = require('../core/renderer')
const Camera = require('../controls/camera')

var PIXEL_WIDTH, PIXEL_HEIGHT

class HorizontalInfinitePlane extends Control{
  constructor(args){
    super(args)
    this.name = 'infinitePlane'
    this.tag = 'renderer'
    this.layer = args.layer
    this.rate = args.rate
    this.spritesheetData = args.spritesheetData
    this.offset = args.offset || [0,0]
    this.enabled = true
    PIXEL_WIDTH = Camera.getPixelWidth()
    PIXEL_HEIGHT = Camera.getPixelHeight()
  }

  render(){
    var camOffset = Camera.getOffset()

    var x = -camOffset[0] % (PIXEL_WIDTH * this.rate) / this.rate
    var y = -camOffset[1] % (PIXEL_HEIGHT * this.rate) / this.rate + this.offset[1]

    var clipWidth = Math.min(PIXEL_WIDTH - x, PIXEL_WIDTH)

    renderer.drawImage(this.owner.scene.assetManager.assets[this.spritesheetData.sheet],
      x,
      y,
      clipWidth,
      PIXEL_HEIGHT,
      -camOffset[0],
      -camOffset[1],
      clipWidth,
      PIXEL_HEIGHT
    )

    var xRemaining = PIXEL_WIDTH - clipWidth

    if (xRemaining > 0){
      renderer.drawImage(this.owner.scene.assetManager.assets[this.spritesheetData.sheet],
        0,
        y,
        xRemaining,
        PIXEL_HEIGHT,
        -camOffset[0] + clipWidth,
        -camOffset[1],
        xRemaining,
        PIXEL_HEIGHT
      )
    }
  }
}

module.exports = HorizontalInfinitePlane