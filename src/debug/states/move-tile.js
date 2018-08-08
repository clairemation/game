const DebugState = require('./debug-state')
const renderer = require('../../core/renderer')
const Camera = require('../../controls/camera')
const input = require('../../core/input')

var moveTile = new DebugState({
  enter: function(){
    renderer.strokeStyle = 'red'
    var pointer = this.getPointerWorldspace()
    this.objectDeltaX = this.highlightedTileCoords[0] - pointer[0]
    this.objectDeltaY = this.highlightedTileCoords[1] - pointer[1]

    var mapCoords = this.map.worldToMapCoords(...pointer)
    this.map.map[mapCoords[0]][mapCoords[1]] = ' '
  },

  exit: function(){
    var mapCoords = this.map.worldToMapCoords(this.highlightedTileCoords[0], this.highlightedTileCoords[1])
    this.map.map[mapCoords[0]][mapCoords[1]] = this.highlightedTile
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
    this.highlightedTileCoords[0] = newX
    this.highlightedTileCoords[1] = newY

    this.render()
    renderer.drawImage(this.game.currentScene.assetManager.assets[this.map.key[this.highlightedTile].sheet],
      this.map.key[this.highlightedTile].coords.x,
      this.map.key[this.highlightedTile].coords.y,
      this.map.key[this.highlightedTile].coords.w,
      this.map.key[this.highlightedTile].coords.h,
      this.highlightedTileCoords[0],
      this.highlightedTileCoords[1],
      this.map.key[this.highlightedTile].coords.w,
      this.map.key[this.highlightedTile].coords.h
    )
  }
})

module.exports = moveTile