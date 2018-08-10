const DebugState = require('./debug-state')
const renderer = require('../../core/renderer')
const Camera = require('../../controls/camera')
const input = require('../../core/input')

var inspectorInitial = new DebugState({
  enter: function(){
    this.gridCanvas.width = this.gridWidth
    this.gridCanvas.height = this.gridHeight
    this.gridCtx = this.gridCanvas.getContext('2d')
    this.drawGridCanvas(this.gridCtx, this.gridCanvas.width, this.gridCanvas.height)

    this.canvas.addEventListener('mousedown', this.onMouseDown)
    this.canvas.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)

    this.changeState('multipleSelection')
  }
})

module.exports = inspectorInitial