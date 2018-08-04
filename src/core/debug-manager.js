const renderer = require('./renderer')
const Camera = require('../controls/camera')
const input = require('./input')
const State = require("../classes/state")
const StateMachine = require('../classes/statemachine')

var debugModeHeader = document.getElementById('debugmodeheader')
var buttons = {
  start: document.getElementById('start-button'),
  advanceFrame: document.getElementById('advance-frame'),
  scroll: document.getElementById('scroll-button'),
  sceneSelect: document.getElementById('scene-select'),
  showGrid: document.getElementById('show-grid'),
  snap: document.getElementById('snap'),
  layer1: document.getElementById('layer-1'),
  layer2: document.getElementById('layer-2'),
  layer3: document.getElementById('layer-3'),
  layer4: document.getElementById('layer-4')
}

var keys = {
  space: 32
}

var updateLoop

var shouldShowGrid = false
var shouldSnapToGrid = false

var highlightedObject
var objectDeltaX
var objectDeltaY

var lastMouseX, lastMouseY
var currentMouseX, currentMouseY
var mouseDown = false

var canvas = document.getElementById('canvas')
var game, camera, renderingEngine, player, objects, map
var pixelWidth, pixelHeight

var gridCanvas = document.createElement('canvas')
var gridCtx
var gridWidth, gridHeight

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
        selection,
        scroll,
        moveObject,
        off
      },
      initialState: 'off'
    })
    game = args.game
    this.changeState('off')
    buttons.start.onclick = e => {
      e.preventDefault()
      this.changeState(this.currentStateName == 'selection' ? 'off' : 'selection')
    }
    buttons.scroll.onclick = e => {
      e.preventDefault()
      this.changeState(this.currentStateName == 'scroll' ? 'selection' : 'scroll')
    }
    buttons.showGrid.onchange = e => {
      e.preventDefault()
      shouldShowGrid = !shouldShowGrid
    }
    buttons.snap.onchange = e => {
      e.preventDefault()
      shouldSnapToGrid = !shouldSnapToGrid
    }
    buttons.advanceFrame.onclick = advanceFrame
    buttons.layer1.onchange = e => {
      e.preventDefault()
      renderingEngine.enableLayer(0, buttons.layer1.checked)
    }
    buttons.layer2.onchange = e => {
      e.preventDefault()
      renderingEngine.enableLayer(1, buttons.layer2.checked)
    }
    buttons.layer3.onchange = e => {
      e.preventDefault()
      renderingEngine.enableLayer(2, buttons.layer3.checked)
    }
    buttons.layer4.onchange = e => {
      e.preventDefault()
      renderingEngine.enableLayer(3, buttons.layer4.checked)
    }
    // buttons.sceneSelect.onchange = selectScene
    // buttons.placePlayer.onclick = togglePlacePlayerMode

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
}

var off = new DebugState({
  enter(){
    input.turnOn()
    game.start()
    buttons.start.innerHTML='<i class="fa fa-pause"></i>'
    debugModeHeader.style.visibility = 'hidden'
    disableAllButtonsExcept(buttons.start)
    cancelAnimationFrame(updateLoop)
    canvas.removeEventListener('mousedown', this.onMouseDown)
    canvas.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
    game.debugMode = false
  }
})

var selection = new DebugState({
  enter: function(){
    game.stop()
    input.turnOff()
    buttons.start.innerHTML='<i class="fa fa-play"></i>'
    debugModeHeader.style.visibility = 'visible'
    enableAllButtons()
    game.debugMode = true

    camera = game.currentScene.getControlsByName('camera')[0]
    renderingEngine = game.currentScene.getControlsByName('renderingEngine')[0]
    player = game.currentScene.getObjectByName('player')
    objects = game.currentScene.objects.filter(e => !e.name.match(/background/) && e.active && e.controls.transform)
    map = game.currentScene.getControlsByName('mapRenderer')[0].tileMap

    pixelWidth = Camera.getPixelWidth()
    pixelHeight = Camera.getPixelHeight()
    gridWidth = pixelWidth + 32
    gridHeight = pixelWidth + 32

    gridCanvas.width = gridWidth
    gridCanvas.height = gridHeight
    gridCtx = gridCanvas.getContext('2d')
    drawGridCanvas()

    canvas.addEventListener('mousedown', this.onMouseDown)
    canvas.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)

    renderer.strokeWidth = "1"
    renderer.strokeStyle = 'green'

    render()

    updateLoop = requestAnimationFrame(this.update.bind(this))
  },

  onMouseDown: function(e){
    if (highlightedObject){
      this.changeState('moveObject')
    }
  },

  onMouseMove: function(e){
    lastMouseX = currentMouseX
    lastMouseY = currentMouseY
    currentMouseX = e.layerX
    currentMouseY = e.layerY
  },

  onKeyDown: function(e){
    if (e.keyCode == keys.space){
      this.changeState('scroll')
    }
  },

  update: function(){
    updateLoop = requestAnimationFrame(this.update.bind(this))
    if (currentMouseX == lastMouseX && currentMouseY == lastMouseY){
      return
    }

    var pointer = getPointerWorldspace()
    var boundingBox
    highlightedObject = null
    for (var i = 0; i < objects.length; i++){
      boundingBox = objects[i].controls.transform.getBounds()
      if (pointer[0] > boundingBox[0] && pointer[0] < boundingBox[2] && pointer[1] > boundingBox[1] && pointer[1] < boundingBox[3]){
        highlightedObject = objects[i]
        highlightObject(highlightedObject)
        break
      }
    }
    if (!highlightedObject){
      var tile = map.getTileAtMapPosition(...pointer)
      console.log(tile)
    }
    render()
  }
})

var moveObject = new DebugState({
  enter: function(){
    renderer.strokeStyle = 'red'
    var pointer = getPointerWorldspace()
    objectDeltaX = highlightedObject.controls.transform.position[0] - pointer[0]
    objectDeltaY = highlightedObject.controls.transform.position[1] - pointer[1]
  },

  onMouseMove(e){
    lastMouseX = currentMouseX
    lastMouseY = currentMouseY
    currentMouseX = e.layerX
    currentMouseY = e.layerY
  },

  onMouseUp(e){
    this.changeState('selection')
  },

  update: function(){
    updateLoop = requestAnimationFrame(this.update.bind(this))

    if (currentMouseX == lastMouseX && currentMouseY == lastMouseY){
      return
    }

    var pointer = getPointerWorldspace()
    var newX = pointer[0] + objectDeltaX
    var newY = pointer[1] + objectDeltaY
    if (shouldSnapToGrid){
      var distFromLeftLine = newX % 32
      var distFromAboveLine = newY % 32
      if (distFromLeftLine < 5){
        newX -= distFromLeftLine
      } else if (distFromLeftLine > 32 - 5) {
        newX += 32 - distFromLeftLine
      }
      if (distFromAboveLine < 5){
        newY -= distFromAboveLine
      } else if (distFromAboveLine > 32 - 5) {
        newY += 32 - distFromAboveLine
      }
    }
    highlightedObject.controls.transform.position[0] = newX
    highlightedObject.controls.transform.position[1] = newY
    render()
  }
})

var scroll = new DebugState({
  enter: function(){
    disableAllButtonsExcept(buttons.scroll)
    canvas.style.cursor = 'all-scroll'
  },

  exit: function(){
    enableAllButtons()
    canvas.style.cursor = 'default'
  },

  onMouseDown: function(e){
    if (!mouseDown){
      lastMouseX = e.layerX
      lastMouseY = e.layerY
      currentMouseX = e.layerX
      currentMouseY = e.layerY
      mouseDown = true
    }
  },

  onMouseMove: function(e){
    lastMouseX = currentMouseX
    lastMouseY = currentMouseY
    currentMouseX = e.layerX
    currentMouseY = e.layerY
  },

  onMouseUp: function(e){
    mouseDown = false
  },

  onKeyUp: function(e){
    if (e.keyCode == keys.space){
      this.changeState('selection')
    }
  },

  update: function(){
    updateLoop = requestAnimationFrame(this.update.bind(this))
    if (!mouseDown || (currentMouseX == lastMouseX && currentMouseY == lastMouseY)){
      return
    }
    var deltaX = (currentMouseX - lastMouseX) / 2
    var deltaY = (currentMouseY - lastMouseY) / 2
    var currCameraOffset = camera.getOffset()
    currCameraOffset[0] += deltaX
    currCameraOffset[1] += deltaY
    camera.setOffset(currCameraOffset[0], currCameraOffset[1])
    render()
  }
})

function advanceFrame(e){
  e.preventDefault()
  game.advanceFrame()
}

function enableAllButtons(){
  for (var key in buttons){
    buttons[key].disabled = false
  }
}

function disableAllButtonsExcept(button){
  for (var key in buttons){
    if (buttons[key] != button){
      buttons[key].disabled = "disabled"
    }
  }
}

function selectScene(e){
  game.replaceTop(e.target.value)
  renderingEngine.update()
}

function highlightObject(object){
  renderer.beginPath()
  renderer.rect(...object.controls.transform.position, ...object.controls.transform.size)
  renderer.stroke()
}

function getPointerWorldspace(){
  var camOffset = camera.getOffset()
  return [currentMouseX / 2 - camOffset[0], currentMouseY / 2 - camOffset[1]]
}

function render(){
  renderingEngine.update()
  if (shouldShowGrid){
    var camOffset = camera.getOffset()
    var startX = -camOffset[0] + camOffset[0] % 32
    var startY = -camOffset[1] + camOffset[1] % 32
    renderer.drawImage(gridCanvas, 0, 0, gridWidth, gridHeight, startX, startY, gridWidth, gridHeight)
  }
  if (highlightedObject){
    highlightObject(highlightedObject)
  }
}

function drawGridCanvas(){
  gridCtx.strokeStyle = 'white'
  for (var i = 0; i <= gridWidth; i += 32){
    gridCtx.beginPath()
    gridCtx.moveTo(i, 0)
    gridCtx.lineTo(i, gridWidth)
    gridCtx.stroke()
  }
  for (var i = 0; i <= gridHeight; i += 32){
    gridCtx.beginPath()
    gridCtx.moveTo(0, i)
    gridCtx.lineTo(gridHeight, i)
    gridCtx.stroke()
  }

}

module.exports = DebugManager