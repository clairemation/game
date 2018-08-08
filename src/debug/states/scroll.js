const DebugState = require('./debug-state')
const renderer = require('../../core/renderer')
const Camera = require('../../controls/camera')
const input = require('../../core/input')

var scroll = new DebugState({
  enter: function(){
    this.disableAllButtonsExcept(this.buttons.scroll)
    this.canvas.style.cursor = 'all-scroll'
  },

  exit: function(){
    this.enableAllButtons()
    this.canvas.style.cursor = 'default'
  },

  onMouseDown: function(e){
    if (!this.mouseDown){
      this.lastMouseX = e.layerX
      this.lastMouseY = e.layerY
      this.currentMouseX = e.layerX
      this.currentMouseY = e.layerY
      this.mouseDown = true
    }
  },

  onMouseMove: function(e){
    this.lastMouseX = this.currentMouseX
    this.lastMouseY = this.currentMouseY
    this.currentMouseX = e.layerX
    this.currentMouseY = e.layerY
  },

  onMouseUp: function(e){
    this.mouseDown = false
  },

  onKeyUp: function(e){
    if (e.keyCode == this.keys.space){
      this.changeState('selection')
    }
  },

  update: function(){
    this.updateLoop = requestAnimationFrame(this.update.bind(this))
    if (!this.mouseDown || (this.currentMouseX == this.lastMouseX && this.currentMouseY == this.lastMouseY)){
      return
    }
    var deltaX = (this.currentMouseX - this.lastMouseX) / 2
    var deltaY = (this.currentMouseY - this.lastMouseY) / 2
    var currCameraOffset = this.camera.getOffset()
    currCameraOffset[0] += deltaX
    currCameraOffset[1] += deltaY
    this.camera.setOffset(currCameraOffset[0], currCameraOffset[1])
    this.render()
  }
})

module.exports = scroll