const DebugState = require('./debug-state')
const Camera = require('../../controls/camera')
const input = require('../../core/input')

var inspectorMultipleSelection = new DebugState({
  enter: function(e){
    this.worldSelectionStart = null
    this.updateLoop = requestAnimationFrame(this.update.bind(this))
  },

  onMouseDown: function(e){
    if (this.mouseDown){
      return
    }
    var pointer = this.getPointerWorldspace()
    this.worldSelectionStart = [pointer[0] - pointer[0] % 32, pointer[1] - pointer[1] % 32]
    this.worldSelectionEnd = [...this.worldSelectionStart]
    this.selectionWidth = 32
    this.selectionHeight = 32
    this.renderer.strokeStyle = 'red'
    this.highlightedTile = null
    this.highlightedTileCoords = null
    this.mouseDown = true
  },

  onMouseUp: function(e){
    this.mouseDown = false
  },

  onMouseMove: function(e){
    this.lastMouseX = this.currentMouseX
    this.lastMouseY = this.currentMouseY
    this.currentMouseX = e.layerX
    this.currentMouseY = e.layerY

    if (this.mouseDown){
      var pointer = this.getPointerWorldspace()
      this.worldSelectionEnd = [pointer[0] + (32 - pointer[0] % 32), pointer[1] + (32 - pointer[1] % 32)]
      this.selectionWidth = this.worldSelectionEnd[0] - this.worldSelectionStart[0]
      this.selectionHeight = this.worldSelectionEnd[1] - this.worldSelectionStart[1]
    }
  },

  update: function(){
    this.updateLoop = requestAnimationFrame(this.update.bind(this))

    this.render()
    if (this.worldSelectionStart){
      this.highlightTiles()
    }
  }
})

module.exports = inspectorMultipleSelection