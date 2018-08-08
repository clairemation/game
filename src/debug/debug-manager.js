const renderer = require('../core/renderer')
const Camera = require('../controls/camera')
const input = require('../core/input')
const State = require("../classes/state")
const StateMachine = require('../classes/statemachine')


class DebugState extends State{
  onMouseUp(){}
  onMouseDown(){}
  onMouseMove(){}
  onKeyDown(){}
  onKeyUp(){}
}

class DebugManager extends StateMachine{
  constructor(args){
    super({
      name: 'debugManager',
      states: {
        initial: require('./states/initial'),
        selection: require('./states/selection'),
        multipleSelection: require('./states/multiple-selection'),
        scroll: require('./states/scroll'),
        moveObject: require('./states/move-object'),
        moveTile: require('./states/move-tile'),
        moveMultipleTiles: require('./states/move-multiple-tiles'),
        off: require('./states/off')
      },
      initialState: 'off'
    })

    this.buttons = {
      start: document.getElementById('start-button'),
      advanceFrame: document.getElementById('advance-frame'),
      scroll: document.getElementById('scroll-button'),
      sceneSelect: document.getElementById('scene-select'),
      showGrid: document.getElementById('show-grid'),
      snap: document.getElementById('snap'),
      layer1: document.getElementById('layer-1'),
      layer2: document.getElementById('layer-2'),
      layer3: document.getElementById('layer-3'),
      exportMap: document.getElementById('export-map'),

      atlasSelect: document.getElementById('atlas-select'),
      drawAtlasGrid: document.getElementById('inspector-show-grid')
    }

    this.keys = {
      space: 32,
      shift: 16
    }

    this.updateLoop

    this.shouldShowGrid = false
    this.shouldSnapToGrid = false

    this.highlightedObject
    this.highlightedTileCoords
    this.highlightedTile
    this.worldSelectionStart
    this.worldSelectionEnd
    this.mapSelectionStart
    this.mapSelectionEnd
    this.selectedTiles
    this.selectionWidth, this.selectionHeight
    this.objectDeltaX
    this.objectDeltaY

    this.lastMouseX, this.lastMouseY
    this.currentMouseX, this.currentMouseY
    this.mouseDown = false
    this.shiftDown = false

    this.canvas = document.getElementById('canvas')
    this.game
    this.camera
    this.renderingEngine
    this.player
    this.objects
    this.map
    this.pixelWidth
    this.pixelHeight

    this.gridCanvas = document.createElement('canvas')
    this.gridCtx
    this.gridWidth
    this.gridHeight

    this.inspectorCanvas = document.getElementById('inspector-canvas')
    this.inspector = this.inspectorCanvas.getContext('2d')
    this.atlasImage
    this.inspectorGridCanvas = document.createElement('canvas')
    this.inspectorGridCtx = this.inspectorGridCanvas.getContext('2d')

    this.shouldDrawAtlasGrid = true

    this.game = args.game
    this.buttons.start.onclick = e => {
      e.preventDefault()
      this.changeState(this.currentStateName == 'off' ? 'initial' : 'off')
    }
    this.buttons.scroll.onclick = e => {
      e.preventDefault()
      this.changeState(this.currentStateName == 'scroll' ? 'selection' : 'scroll')
    }
    this.buttons.showGrid.onchange = e => {
      e.preventDefault()
      this.shouldShowGrid = !this.shouldShowGrid
    }
    this.buttons.snap.onchange = e => {
      e.preventDefault()
      this.shouldSnapToGrid = !this.shouldSnapToGrid
    }
    this.buttons.advanceFrame.onclick = this.advanceFrame
    this.buttons.layer1.onchange = e => {
      e.preventDefault()
      this.renderingEngine.enableLayer(0, this.buttons.layer1.checked)
    }
    this.buttons.layer2.onchange = e => {
      e.preventDefault()
      this.renderingEngine.enableLayer(1, this.buttons.layer2.checked)
    }
    this.buttons.layer3.onchange = e => {
      e.preventDefault()
      this.renderingEngine.enableLayer(2, this.buttons.layer3.checked)
    }
    this.buttons.exportMap.onclick = e => {
      e.preventDefault()
      var textMap = this.map.this.map.this.map(e => e.join('')).join('\n') //Yes this sounds silly
      var blob = new Blob([textMap], {type: 'text/plain;charset=utf-8;'})
      var el = window.document.createElement('a')
      el.href = window.URL.createObjectURL(blob)
      el.download = 'this.map.txt'
      document.body.appendChild(el)
      el.click()
      document.body.removeChild(el)
      window.URL.revokeObjectURL(blob)
    }
    this.buttons.atlasSelect.onchange = e => {
      e.preventDefault()
      this.atlasImage = new Image(160, 160)
      this.atlasImage.onload = this.renderInspector
      this.atlasImage.src = '../assets/' + e.target.value
    }
    this.buttons.drawAtlasGrid.onchange = e => {
      e.preventDefault()
      this.shouldDrawAtlasGrid = !this.shouldDrawAtlasGrid

      this.renderInspector()
    }
    // this.buttons.sceneSelect.onchange = this.selectScene
    // this.buttons.placePlayer.onclick = togglePlacePlayerMode

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  onMouseDown(e){
    this.currentState.onMouseDown.call(this,e)
  }
  onMouseMove(e){
    this.currentState.onMouseMove.call(this, e)
  }
  onMouseUp(e){
    this.currentState.onMouseUp.call(this, e)
  }
  onKeyDown(e){
    this.currentState.onKeyDown.call(this, e)
  }
  onKeyUp(e){
    this.currentState.onKeyUp.call(this, e)
  }

  advanceFrame(e){
    e.preventDefault()
    this.game.advanceFrame()
  }

  enableAllButtons(){
    for (var key in this.buttons){
      this.buttons[key].disabled = false
    }
  }

  disableAllButtonsExcept(button){
    for (var key in this.buttons){
      if (this.buttons[key] != button){
        this.buttons[key].disabled = "disabled"
      }
    }
  }

  selectScene(e){
    this.game.replaceTop(e.target.value)
    this.renderingEngine.update()
  }

  highlightObject(object){
    renderer.beginPath()
    renderer.rect(...object.controls.transform.position, ...object.controls.transform.size)
    renderer.stroke()
  }

  highlightTile(tile){
    renderer.beginPath()
    renderer.rect(...tile)
    renderer.stroke()
  }

  highlightTiles(){
    renderer.beginPath()
    renderer.rect(...this.worldSelectionStart, this.selectionWidth, this.selectionHeight)
    renderer.stroke()
  }

  getPointerWorldspace(){
    var camOffset = Camera.getOffset()
    return [this.currentMouseX / 2 - camOffset[0], this.currentMouseY / 2 - camOffset[1]]
  }

  render(){
    this.renderingEngine.update()
    if (this.shouldShowGrid){
      var camOffset = Camera.getOffset()
      var startX = -camOffset[0] + camOffset[0] % 32
      var startY = -camOffset[1] + camOffset[1] % 32
      renderer.drawImage(this.gridCanvas, 0, 0, this.gridWidth, this.gridHeight, startX, startY, this.gridWidth, this.gridHeight)
    }
    if (this.highlightedObject){
      this.highlightObject(this.highlightedObject)
    } else if (this.highlightedTileCoords){
      this.highlightTile(this.highlightedTileCoords)
    }
  }

  renderInspector(){
    this.inspector.clearRect(0, 0, 320, 320)
    this.inspector.drawImage(this.atlasImage, 0, 0)
    if (this.shouldDrawAtlasGrid){
      this.inspector.drawImage(this.inspectorGridCanvas, 0, 0)
    }
  }

  drawGridCanvas(ctx, width, height){
    ctx.strokeStyle = 'white'
    for (var i = 0; i <= this.gridWidth; i += 32){
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, this.gridWidth)
      ctx.stroke()
    }
    for (var i = 0; i <= this.gridHeight; i += 32){
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(this.gridHeight, i)
      ctx.stroke()
    }
  }
}

module.exports = DebugManager