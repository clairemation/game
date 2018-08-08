const DebugState = require('./debug-state')
const renderer = require('../../core/renderer')
const Camera = require('../../controls/camera')
const input = require('../../core/input')

var initial = new DebugState({
  enter: function(){
    this.game.stop()
    input.turnOff()
    this.buttons.start.innerHTML='<i class="fa fa-play"></i>'
    this.enableAllButtons()
    this.game.debugMode = true

    this.camera = this.game.currentScene.getControlsByName('this.camera')[0]
    this.renderingEngine = this.game.currentScene.getControlsByName('renderingEngine')[0]
    this.player = this.game.currentScene.getObjectByName('this.player')
    this.objects = this.game.currentScene.objects.filter(e => !e.name.match(/background/) && e.active && e.controls.transform)
    this.map = this.game.currentScene.getControlsByName('mapRenderer')[0].tileMap

    this.pixelWidth = Camera.getPixelWidth()
    this.pixelHeight = Camera.getPixelHeight()
    this.gridWidth = this.pixelWidth + 32
    this.gridHeight = this.pixelWidth + 32

    this.gridCanvas.width = this.gridWidth
    this.gridCanvas.height = this.gridHeight
    this.gridCtx = this.gridCanvas.getContext('2d')
    this.drawGridCanvas(this.gridCtx, this.gridCanvas.width, this.gridCanvas.height)

    this.inspectorGridCanvas.width = this.inspectorCanvas.width
    this.inspectorGridCanvas.height = this.inspectorCanvas.height
    this.drawGridCanvas(this.inspectorGridCtx, this.inspectorGridCanvas.width, this.inspectorGridCanvas.height)

    this.canvas.addEventListener('mousedown', this.onMouseDown)
    this.canvas.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)

    this.render()

    this.changeState('selection')
  }
})

module.exports = initial