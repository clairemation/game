const Control = require('../classes/control')
const renderer = require('../core/renderer')
const Camera = require('../controls/camera')

class RenderingEngine extends Control{
  constructor(args){
    super(args)
    this.name = 'renderingEngine'
    this.components = []
  }

  init(){
    this.components = this.owner.scene.getControlsByTag('renderer').sort((a, b) => a.layer - b.layer)
  }

  update(){

    // Clear canvas
    renderer.setTransform(1, 0, 0, 1, 0, 0)
    renderer.clearRect(0, 0,renderer.canvas.width,renderer.canvas.height)
    renderer.setTransform(1, 0, 0, 1, Camera.getOffset()[0], Camera.getOffset()[1])

    for (var i = 0; i < this.components.length; i++){
      this.components[i].render()
    }

  }
}

module.exports = RenderingEngine