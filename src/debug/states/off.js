const DebugState = require('./debug-state')
const renderer = require('../../core/renderer')
const Camera = require('../../controls/camera')
const input = require('../../core/input')

var off = new DebugState({
  enter(){
    input.turnOn()
    this.game.start()
    this.buttons.start.innerHTML='<i class="fa fa-pause"></i>'
    this.disableAllButtonsExcept(this.buttons.start)
    cancelAnimationFrame(this.updateLoop)
    this.canvas.removeEventListener('mousedown', this.onMouseDown)
    this.canvas.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
    this.game.debugMode = false
  }
})

module.exports = off