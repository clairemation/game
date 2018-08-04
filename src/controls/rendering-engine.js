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

  enableLayer(num, enable){
    this.components[num].enabled = enable
    console.log(this.components[num].enabled)
  }


  update(){

    // Clear canvas
    renderer.setTransform(1, 0, 0, 1, 0, 0)
    renderer.clearRect(0, 0,renderer.canvas.width,renderer.canvas.height)
    renderer.setTransform(1, 0, 0, 1, Camera.getOffset()[0], Camera.getOffset()[1])

    for (var i = 0; i < this.components.length; i++){
      if (this.components[i].enabled){
        this.components[i].render()
      }
    }

  }
}

module.exports = RenderingEngine