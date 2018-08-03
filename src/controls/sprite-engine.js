const Control = require('../classes/control')
const renderer = require('../core/renderer')
const Camera = require('../controls/camera')

var count = 0

class SpriteEngine extends Control{
  constructor(args){
    super(args)
    this.name = 'spriteEngine'
    this.tag = 'renderer'
    this.components = []
    this.layer = args.layer || count++
  }

  init(){
    this.components = this.owner.scene.getControlsByName('sprite').filter(e => e.layer == this.layer)
  }

  render(){
    var frameName, frameCoords, spritesheetName

    for (let i = 0; i < this.components.length; i++){
      if (!this.components[i].shouldDraw){
        continue
      }
      spritesheetName = this.components[i].spritesheetName
      frameName = this.components[i].currentFrame
      var frameCoords = this.components[i].spritesheetData.frames[frameName]
      renderer.drawImage(this.owner.scene.assetManager.assets[spritesheetName],
        frameCoords.x,
        frameCoords.y,
        frameCoords.w,
        frameCoords.h,
        this.components[i].owner.controls.transform.position[0],
        this.components[i].owner.controls.transform.position[1],
        frameCoords.w,
        frameCoords.h)
      // this.components[i].shouldDraw = false
    }
  }
}

SpriteEngine.reset = function(){
  count = 0
}

module.exports = SpriteEngine