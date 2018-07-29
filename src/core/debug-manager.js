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
var game, camera, spriteEngine, player

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

  updateLoop = requestAnimationFrame(update)

}

function exitDebugMode(){
  game.start()
  buttons.start.innerHTML='<i class="fa fa-pause"></i>'
  debugModeHeader.style.visibility = 'hidden'
  disableAllButtonsExcept(buttons.start)
  game.debugMode = false
}

function toggleScrollMode(e){
  e.preventDefault()
  if (mode != "scroll"){
    disableAllButtonsExcept(buttons.scroll)
    canvas.addEventListener('mousedown', scrollOnMouseDown)
    document.addEventListener('mouseup', scrollOnMouseUp)
    mode = "scroll"
  } else {
    enableAllButtons()
    canvas.removeEventListener('mousedown', scrollOnMouseDown)
    document.removeEventListener('mouseup', scrollOnMouseUp)
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

function scrollOnMouseDown(e){
  if (!mouseDown){
    lastMouseX = e.clientX
    lastMouseY = e.clientY
    currentMouseX = e.clientX
    currentMouseY = e.clientY
    canvas.addEventListener('mousemove', scrollOnMouseMove)
    mouseDown = true
  }
}

function scrollOnMouseMove(e){
  currentMouseX = e.clientX
  currentMouseY = e.clientY
}

function scrollOnMouseUp(e){
  canvas.removeEventListener('mousemove', scrollOnMouseMove)
  mouseDown = false
}

function debugOnMouseMove(e){

}

function update(){
  updateLoop = requestAnimationFrame(update)
  if (mode == "scroll"){
    if (currentMouseX == lastMouseX && currentMouseY == lastMouseY){
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
}

module.exports = DebugManager