const Control = require('../classes/control')
const renderer = require('../core/renderer')

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
        this.components[i].owner.controls.transform.position.x,
        this.components[i].owner.controls.transform.position.y,
        frameCoords.w,
        frameCoords.h)
      this.components[i].shouldDraw = false
    }
  }
}

module.exports = SpriteEngine