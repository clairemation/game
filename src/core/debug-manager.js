const renderer = require('./renderer')
const input = require('./input')
const State = require("../classes/state")
const StateMachine = require('../classes/statemachine')

var debugModeHeader = document.getElementById('debugmodeheader')
var buttons = {
  start: document.getElementById('start-button'),
  advanceFrame: document.getElementById('advance-frame'),
  scroll: document.getElementById('scroll-button'),
  sceneSelect: document.getElementById('scene-select'),
  placePlayer: document.getElementById('place-player')
}

var updateLoop

var highlightedObject
var objectDeltaX
var objectDeltaY

var lastMouseX, lastMouseY
var currentMouseX, currentMouseY
var mouseDown = false

var canvas = document.getElementById('canvas')
var game, camera, spriteEngine, player, objects

class DebugState extends State{
  onMouseUp(){}
  onMouseDown(){}
  onMouseMove(){}
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
    buttons.advanceFrame.onclick = advanceFrame
    // buttons.sceneSelect.onchange = selectScene
    // buttons.placePlayer.onclick = togglePlacePlayerMode

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
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
    spriteEngine = game.currentScene.getControlsByName('spriteEngine')[0]
    player = game.currentScene.getObjectByName('player')
    objects = game.currentScene.objects.filter(e => !e.name.match(/background/) && e.active && e.controls.transform)

    canvas.addEventListener('mousedown', this.onMouseDown)
    canvas.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)

    renderer.strokeWidth = "1"

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

  update: function(){
    updateLoop = requestAnimationFrame(this.update.bind(this))
    if (currentMouseX == lastMouseX && currentMouseY == lastMouseY){
      return
    }

    spriteEngine.update()

    var pointer = getPointerWorldspace()
    var boundingBox
    for (var i = 0; i < objects.length; i++){
      boundingBox = objects[i].controls.transform.getBounds()
      if (pointer[0] > boundingBox[0] && pointer[0] < boundingBox[2] && pointer[1] > boundingBox[1] && pointer[1] < boundingBox[3]){
        highlightedObject = objects[i]
        highlightObject(highlightedObject, 'red')
        return
      }
      highlightedObject = null
    }
  }
})

var moveObject = new DebugState({
  enter: function(){
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
    highlightedObject.controls.transform.position[0] = pointer[0] + objectDeltaX
    highlightedObject.controls.transform.position[1] = pointer[1] + objectDeltaY
    spriteEngine.update()
    highlightObject(highlightedObject, 'green')
  }
})

var scroll = new DebugState({
  enter: function(){
    disableAllButtonsExcept(buttons.scroll)
  },

  exit: function(){
    enableAllButtons()
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
    spriteEngine.update()
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
  spriteEngine.update()
}

function highlightObject(object, color){
  renderer.strokeStyle = color
  renderer.beginPath()
  renderer.rect(...object.controls.transform.position, ...object.controls.transform.size)
  renderer.stroke()
}

function getPointerWorldspace(){
  var camOffset = camera.getOffset()
  return [currentMouseX / 2 - camOffset[0], currentMouseY / 2 - camOffset[1]]
}

module.exports = DebugManager