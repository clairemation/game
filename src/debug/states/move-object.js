const DebugState = require('./debug-state')
const renderer = require('../../core/renderer')
const Camera = require('../../controls/camera')
const input = require('../../core/input')

var moveObject = new DebugState({
  enter: function(){
    renderer.strokeStyle = 'red'
    var pointer = this.getPointerWorldspace()
    this.objectDeltaX = this.highlightedObject.controls.transform.position[0] - pointer[0]
    this.objectDeltaY = this.highlightedObject.controls.transform.position[1] - pointer[1]

  },

  onMouseMove: function(e){
    this.lastMouseX = this.currentMouseX
    this.lastMouseY = this.currentMouseY
    this.currentMouseX = e.layerX
    this.currentMouseY = e.layerY
  },

  onMouseUp: function(e){
    this.changeState('selection')
  },

  update: function(){
    this.updateLoop = requestAnimationFrame(this.update.bind(this))

    if (this.currentMouseX == this.lastMouseX && this.currentMouseY == this.lastMouseY){
      return
    }

    var pointer = this.getPointerWorldspace()
    var newX = pointer[0] + this.objectDeltaX
    var newY = pointer[1] + this.objectDeltaY
    if (this.shouldSnapToGrid){
      var distFromLeftLine = newX % 32
      var distFromAboveLine = newY % 32
      if (distFromLeftLine < 5){
        newX -= distFromLeftLine
      } else if (distFromLeftLine > 32 - 5) {
        newX += 32 - distFromLeftLine
      }
      if (distFromAboveLine < 5){
        newY -= distFromAboveLine
      } else if (distFromAboveLine > 32 - 5) {
        newY += 32 - distFromAboveLine
      }
    }
    this.highlightedObject.controls.transform.position[0] = newX
    this.highlightedObject.controls.transform.position[1] = newY
    this.render()
  }
})

module.exports = moveObject