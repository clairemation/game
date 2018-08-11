const DebugState = require('./debug-state')
const renderer = require('../../core/renderer')
const Camera = require('../../controls/camera')
const input = require('../../core/input')

var selection = new DebugState({
  enter: function(){
    this.enableAllButtons()
    renderer.strokeStyle = 'green'
    this.updateLoop = requestAnimationFrame(this.update.bind(this))
  },

  onMouseDown: function(e){
    if (this.highlightedObject){
      this.changeState('moveObject')
    } else if (this.highlightedTileCoords){
      this.changeState('moveTile')
    }
  },

  onMouseMove: function(e){
    this.lastMouseX = this.currentMouseX
    this.lastMouseY = this.currentMouseY
    this.currentMouseX = e.layerX
    this.currentMouseY = e.layerY
  },

  onKeyDown: function(e){
    if (e.keyCode == this.keys.space){
      this.changeState('scroll')
    } else if (e.keyCode == this.keys.shift){
      this.changeState('multipleSelection')
    }
  },

  update: function(){
    this.updateLoop = requestAnimationFrame(this.update.bind(this))
    if (this.currentMouseX == this.lastMouseX && this.currentMouseY == this.lastMouseY){
      return
    }

    var pointer = this.getPointerWorldspace()
    var boundingBox
    this.highlightedObject = null
    for (var i = 0; i < this.objects.length; i++){
      boundingBox = this.objects[i].controls.transform.getBounds()
      if (pointer[0] > boundingBox[0] && pointer[0] < boundingBox[2] && pointer[1] > boundingBox[1] && pointer[1] < boundingBox[3]){
        this.highlightedObject = this.objects[i]
        this.highlightObject(this.highlightedObject)
        break
      }
    }
    if (!this.highlightedObject){
      var mapCoords = this.map.worldToMapCoords(...pointer)
      var tile = this.map.map[mapCoords[0]][mapCoords[1]]
      // if (tile != ' '){
        this.highlightedTile = tile
        this.highlightedTileCoords = [pointer[0] - pointer[0] % 32, pointer[1] - pointer[1] % 32, 32, 32]
      // } else {
        // this.highlightedTile = null
        // this.highlightedTileCoords = null
      // }
    }
    this.render()
  }
})

module.exports = selection