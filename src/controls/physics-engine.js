const Control = require('../classes/control')
const renderer = require('../core/renderer')
const Camera = require('../controls/camera')

class PhysicsEngine extends Control{
  constructor(args){
    super(args)
    this.name = 'physicsEngine'
    this.engines = []
    this.components = []
  }

  init(){
    this.engines = this.owner.scene.getControlsByTag('physics').sort((a, b) => a.order - b.order)
    this.components = this.owner.scene.getControlsByName('velocity')
  }


  update(){
    for (var i = 0; i < this.engines.length; i++){
      this.engines[i].calculate()
    }

    for (i = 0; i < this.components.length; i++){
      this.components[i].applyVelocity()
    }
  }
}

module.exports = PhysicsEngine