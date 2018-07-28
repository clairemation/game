const Control = require('../classes/control')
const renderer = require('../core/renderer')
const Camera = require('../controls/camera')

class SpriteEngine extends Control{
  constructor(args){
    super(args)
    this.name = 'spriteEngine'
    this.components = []
  }

  init(){
    this.components = this.owner.scene.getControlsByName('sprite')
  }

  update(){
    var frameName, frameCoords, spritesheetName

    // Clear canvas
    renderer.setTransform(1, 0, 0, 1, 0, 0)
    renderer.clearRect(0, 0,renderer.canvas.width,renderer.canvas.height)
    renderer.setTransform(1, 0, 0, 1, Camera.getOffset()[0], Camera.getOffset()[1])

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

module.exports = SpriteEngine