const DebugState = require('./debug-state')
const renderer = require('../../core/renderer')
const Camera = require('../../controls/camera')
const input = require('../../core/input')

var paste = new DebugState({
  enter: function(){
    renderer.strokeStyle = 'green'

    this.selectionWidth = this.clipboard[0].length / 32
    this.selectionHeight = this.clipboard.length / 32
  },

  exit: function(){

  },

  onMouseDown: function(e){
    var pointer = this.getPointerWorldspace()
    if (pointer[0] < this.worldSelectionStart[0] || pointer[0] > this.worldSelectionEnd[0] || pointer[1] < this.worldSelectionStart[1] || pointer[1] > this.worldSelectionEnd[1]){
      this.changeState('selection')
      return
    }
    this.objectDeltaX = this.worldSelectionStart[0] - pointer[0]
    this.objectDeltaY = this.worldSelectionStart[1] - pointer[1]
    this.mouseDown = true
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

  update: function(){
    this.updateLoop = requestAnimationFrame(this.update.bind(this))

    if (!this.mouseDown){
      return
    }

    var pointer = this.getPointerWorldspace()
    var newX = pointer[0] + this.objectDeltaX
    var newY = pointer[1] + this.objectDeltaY

    var distFromLeftLine = newX % 32
    var distFromAboveLine = newY % 32
    if (distFromLeftLine <= 16){
      newX -= distFromLeftLine
    } else {
      newX += 32 - distFromLeftLine
    }
    if (distFromAboveLine <= 16){
      newY -= distFromAboveLine
    } else {
      newY += 32 - distFromAboveLine
    }

    var deltaX = newX - this.worldSelectionStart[0]
    var deltaY = newX - this.worldSelectionStart[1]
    this.worldSelectionStart[0] = newX
    this.worldSelectionStart[1] = newY
    this.worldSelectionEnd[0] += deltaX
    this.worldSelectionEnd[1] += deltaY

    this.render()
    for (var y = 0; y < this.selectedTiles.length; y++){
      for (var x = 0; x < this.selectedTiles[y].length; x++){
        renderer.drawImage(this.game.currentScene.assetManager.assets[this.map.key[this.selectedTiles[y][x]].sheet],
          this.map.key[this.selectedTiles[y][x]].coords.x,
          this.map.key[this.selectedTiles[y][x]].coords.y,
          this.map.key[this.selectedTiles[y][x]].coords.w,
          this.map.key[this.selectedTiles[y][x]].coords.h,
          this.worldSelectionStart[0] + x * 32,
          this.worldSelectionStart[1] + y * 32,
          this.map.key[this.selectedTiles[y][x]].coords.w,
          this.map.key[this.selectedTiles[y][x]].coords.h
        )
      }
    }
    this.highlightTiles()
  }
})

module.exports = paste