const DebugState = require('./debug-state')
const renderer = require('../../core/renderer')
const Camera = require('../../controls/camera')
const input = require('../../core/input')

var multipleSelection = new DebugState({
  enter: function(e){
    this.worldSelectionStart = null
  },

  onMouseDown: function(e){
    if (this.mouseDown){
      return
    }
    var pointer = this.getPointerWorldspace()
    this.worldSelectionStart = [pointer[0] - pointer[0] % 32, pointer[1] - pointer[1] % 32]
    this.mapSelectionStart = this.map.worldToMapCoords(...pointer)
    this.worldSelectionEnd = [...this.worldSelectionStart]
    this.mapSelectionEnd = [...this.mapSelectionStart]
    this.selectionWidth = 32
    this.selectionHeight = 32
    renderer.strokeStyle = 'red'
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
      this.mapSelectionEnd = this.map.worldToMapCoords(...pointer)
      this.selectionWidth = this.worldSelectionEnd[0] - this.worldSelectionStart[0]
      this.selectionHeight = this.worldSelectionEnd[1] - this.worldSelectionStart[1]
    }
  },

  onKeyUp: function(e){
    if (e.keyCode == this.keys.shift){
      if (this.worldSelectionStart){
        this.changeState('moveMultipleTiles')
      } else {
        this.changeState('selection')
      }
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

module.exports = multipleSelection