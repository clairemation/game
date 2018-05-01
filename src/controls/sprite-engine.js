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
      spritesheetName = this.components[i].spritesheetName
      frameName = this.components[i].currentFrame
      var frameCoords = this.components[i].spritesheetData.frames[frameName]
      renderer.drawImage(this.owner.scene.assetManager.assets[spritesheetName], frameCoords.x, frameCoords.y, frameCoords.w, frameCoords.h, 0, 0, frameCoords.w, frameCoords.h)
    }
  }
}

module.exports = SpriteEngine