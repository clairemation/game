const Camera = require('../controls/camera')
const input = require('../core/input')
const State = require("../classes/state")
const StateMachine = require('../classes/statemachine')

class InspectorManager extends StateMachine{
  constructor(args){
    super({
      name: 'sceneViewManager',
      states: {
        initial: require('./states/inspector-initial'),
        multipleSelection: require('./states/multiple-selection'),
        scroll: require('./states/scroll'),
        off: require('./states/off')
      },
      initialState: 'off'
    })

    this.canvas = args.canvas
    this.renderer = this.canvas.getContext('2d')
    this.clipboard = args.clipboard
    this.game = args.game

    this.buttons = {
      atlasSelect: document.getElementById('atlas-select'),
      drawAtlasGrid: document.getElementById('inspector-show-grid')
    }

    this.keys = {
      space: 32,
      shift: 16
    }

    this.updateLoop

    this.shouldShowGrid = true
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

    this.pixelWidth
    this.pixelHeight

    this.gridCanvas = document.createElement('canvas')
    this.gridCtx
    this.gridWidth = 320
    this.gridHeight = 240

    this.buttons.atlasSelect.onchange = e => {
      this.atlasImage = new Image()
      this.atlasImage.onload = this.render.bind(this)
      this.atlasImage.src = '../assets/' + e.target.value
    }
    this.buttons.drawAtlasGrid.onchange = e => {
      this.shouldShowGrid = !this.shouldShowGrid
      this.render()
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
    this.renderer.beginPath()
    this.renderer.rect(...object.controls.transform.position, ...object.controls.transform.size)
    this.renderer.stroke()
  }

  highlightTile(tile){
    this.renderer.beginPath()
    this.renderer.rect(...tile)
    this.renderer.stroke()
  }

  highlightTiles(){
    this.renderer.beginPath()
    this.renderer.rect(...this.worldSelectionStart, this.selectionWidth, this.selectionHeight)
    this.renderer.stroke()
  }

  getPointerWorldspace(){
    var camOffset = Camera.getOffset()
    return [this.currentMouseX / 2 - camOffset[0], this.currentMouseY / 2 - camOffset[1]]
  }

  render(){
    this.renderer.clearRect(0, 0, 320, 240)
    this.renderer.drawImage(this.atlasImage, 0, 0)
    if (this.shouldShowGrid){
      var startX = 0
      var startY = 0
      this.renderer.drawImage(this.gridCanvas, 0, 0, this.gridWidth, this.gridHeight, startX, startY, this.gridWidth, this.gridHeight)
    }
    if (this.highlightedObject){
      this.highlightObject(this.highlightedObject)
    } else if (this.highlightedTileCoords){
      this.highlightTile(this.highlightedTileCoords)
    }
  }

  drawGridCanvas(renderer, width, height){
    renderer.strokeStyle = 'white'
    for (var i = 0; i <= this.gridWidth; i += 32){
      renderer.beginPath()
      renderer.moveTo(i, 0)
      renderer.lineTo(i, this.gridWidth)
      renderer.stroke()
    }
    for (var i = 0; i <= this.gridHeight; i += 32){
      renderer.beginPath()
      renderer.moveTo(0, i)
      renderer.lineTo(this.gridHeight, i)
      renderer.stroke()
    }
  }
}

module.exports = InspectorManager