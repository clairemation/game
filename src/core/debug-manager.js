const renderer = require('./renderer')

var debugModeHeader = document.getElementById('debugmodeheader')
var buttons = {
  start: document.getElementById('start-button'),
  advanceFrame: document.getElementById('advance-frame'),
  scroll: document.getElementById('scroll-button'),
  sceneSelect: document.getElementById('scene-select'),
  placePlayer: document.getElementById('place-player')
}

var updateLoop

var lastMouseX, lastMouseY
var currentMouseX, currentMouseY
var mouseDown = false

var mode = "play"

var canvas = document.getElementById('canvas')
var game, camera, spriteEngine, player, objects

class DebugManager{
  constructor(g){
    game = g
    buttons.start.onclick = togglePlayPause
    buttons.advanceFrame.onclick = advanceFrame
    buttons.scroll.onclick = toggleScrollMode
    buttons.sceneSelect.onchange = selectScene
    buttons.placePlayer.onclick = togglePlacePlayerMode
  }

}
DebugManager.prototype.exitDebug = exitDebugMode
DebugManager.prototype.enterDebug = enterDebugMode

function togglePlayPause(e){
  e.preventDefault()
  game.debugMode ? exitDebugMode() : enterDebugMode()
}

function advanceFrame(e){
  e.preventDefault()
  game.advanceFrame()
}

function enterDebugMode(){
  game.stop()
  buttons.start.innerHTML='<i class="fa fa-play"></i>'
  debugModeHeader.style.visibility = 'visible'
  enableAllButtons()
  game.debugMode = true
  mode = "debug"

  camera = game.currentScene.getControlsByName('camera')[0]
  spriteEngine = game.currentScene.getControlsByName('spriteEngine')[0]
  player = game.currentScene.getObjectByName('player')
  objects = game.currentScene.objects.filter(e => !e.name.match(/background/) && e.active && e.controls.transform)

  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)

  renderer.strokeStyle = "green"
  renderer.strokeWidth = "1"

  updateLoop = requestAnimationFrame(update)

}

function exitDebugMode(){
  game.start()
  buttons.start.innerHTML='<i class="fa fa-pause"></i>'
  debugModeHeader.style.visibility = 'hidden'
  disableAllButtonsExcept(buttons.start)
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
  cancelAnimationFrame(updateLoop)
  game.debugMode = false
}

function toggleScrollMode(e){
  e.preventDefault()
  if (mode != "scroll"){
    disableAllButtonsExcept(buttons.scroll)

    mode = "scroll"
  } else {
    enableAllButtons()
    canvas.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mouseup', onMouseUp)
    mode = "debug"
  }
}

function togglePlacePlayerMode(e){
  e.preventDefault()
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

function onMouseDown(e){
  if (!mouseDown){
    lastMouseX = e.clientX
    lastMouseY = e.clientY
    currentMouseX = e.layerX
    currentMouseY = e.layerY
    mouseDown = true
  }
}

function onMouseMove(e){
  lastMouseX = currentMouseX
  lastMouseY = currentMouseY
  currentMouseX = e.layerX
  currentMouseY = e.layerY
}

function onMouseUp(e){
  mouseDown = false
}

function update(){
  updateLoop = requestAnimationFrame(update)
  spriteEngine.update()

  if (currentMouseX == lastMouseX && currentMouseY == lastMouseY){
    return
  }

  if (mode == "scroll"){
    scroll()
  } else if (mode == "debug"){
    var camOffset = camera.getOffset()
    var pointer = [currentMouseX / 2 - camOffset[0], currentMouseY / 2 - camOffset[1]]
    var boundingBox
    for (var i = 0; i < objects.length; i++){
      boundingBox = objects[i].controls.transform.getBounds()
      if (pointer[0] > boundingBox[0] && pointer[0] < boundingBox[2] && pointer[1] > boundingBox[1] && pointer[1] < boundingBox[3]){
        renderer.beginPath()
        renderer.rect(...objects[i].controls.transform.position, ...objects[i].controls.transform.size)
        renderer.stroke()
        break
      }
    }
  }
}

function scroll(){
  if (!mouseDown){
    return
  }
  var deltaX = (currentMouseX - lastMouseX) / 2
  var deltaY = (currentMouseY - lastMouseY) / 2
  var currCameraOffset = camera.getOffset()
  currCameraOffset[0] += deltaX
  currCameraOffset[1] += deltaY
  camera.setOffset(currCameraOffset[0], currCameraOffset[1])
  spriteEngine.update()
  lastMouseX = currentMouseX
  lastMouseY = currentMouseY
}

module.exports = DebugManager