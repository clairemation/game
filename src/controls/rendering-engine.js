const Control = require('../classes/control')
const renderer = require('../core/renderer')
const Camera = require('../controls/camera')

class RenderingEngine extends Control{
  constructor(args){
    super(args)
    this.name = 'renderingEngine'
    this.components = []
    this.debugDrawLinesComponents = []
    renderer.strokeStyle = 'green'
  }

  init(){
    this.components = this.owner.scene.getControlsByTag('renderer').sort((a, b) => a.layer - b.layer)
    this.debugDrawLinesComponents = this.owner.scene.getAllControls().filter(e => e.debugDrawLines != undefined)
  }

  enableLayer(num, enable){
    this.components[num].enabled = enable
  }


  update(){

    // Clear canvas
    renderer.setTransform(1, 0, 0, 1, 0, 0)
    renderer.clearRect(0, 0,320, 240)
    renderer.setTransform(1, 0, 0, 1, Camera.getOffset()[0], Camera.getOffset()[1])

    for (var i = 0; i < this.components.length; i++){
      if (this.components[i].enabled){
        this.components[i].render()
      }
    }

    var line
    for (i = 0; i < this.debugDrawLinesComponents.length; i++){
      for (var j = 0; j < this.debugDrawLinesComponents[i].debugDrawLines.length; j++){
        line = this.debugDrawLinesComponents[i].debugDrawLines[j]
        renderer.strokeStyle = j % 2 == 0 ? 'red' : 'green'
        renderer.beginPath()
        renderer.moveTo(line[0], line[1])
        renderer.lineTo(line[2], line[3])
        renderer.stroke()
      }
    }

  }
}

module.exports = RenderingEngine