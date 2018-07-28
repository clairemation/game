var canvas = document.getElementById('canvas')
var startButton = document.getElementById('start-button')
var advanceFrameButton = document.getElementById('advance-frame')
var debugModeHeader = document.getElementById('debugmodeheader')

var lastMousePos = [0,0]
var currentMousePos = [0,0]
var mouseDown = false
var scrollUpdateLoop

var game
var camera
var spriteEngine

class DebugManager{
  constructor(g){
    game = g
    startButton.onclick = togglePlayPause
    advanceFrameButton.onclick = advanceFrame
  }
}

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
  startButton.innerHTML='<i class="material-icons">play_arrow</i>'
  debugModeHeader.style.visibility = 'visible'
  advanceFrameButton.disabled = false
  game.debugMode = true

  camera = game.currentScene.getControlsByName('camera')[0]
  spriteEngine = game.currentScene.getControlsByName('spriteEngine')[0]

  canvas.addEventListener('mousedown', onMouseDown.bind())
  canvas.addEventListener('mouseup', onMouseUp.bind())
}

function exitDebugMode(){
  game.start()
  startButton.innerHTML='<i class="material-icons">pause</i>'
  debugModeHeader.style.visibility = 'hidden'
  advanceFrameButton.disabled = "disabled"
  game.debugMode = false
}

function onMouseDown(e){
  if (!mouseDown){
    lastMousePos = [e.clientX, e.clientY]
    currentMousePos = [e.clientX, e.clientY]
    canvas.addEventListener('mousemove', onMouseMove)
    scrollUpdateLoop = requestAnimationFrame(scrollUpdate)
    mouseDown = true
  }
}

function onMouseMove(e){
  currentMousePos[0] = e.clientX
  currentMousePos[1] = e.clientY
}

function onMouseUp(e){
  cancelAnimationFrame(scrollUpdateLoop)
  canvas.removeEventListener('mousemove', onMouseMove)
  mouseDown = false
}

function scrollUpdate(){
  scrollUpdateLoop = requestAnimationFrame(scrollUpdate)
  var deltaX = currentMousePos[0] - lastMousePos[0]
  var deltaY = currentMousePos[1] - lastMousePos[1]
  var currCameraOffset = camera.getOffset()
  currCameraOffset[0] += deltaX
  currCameraOffset[1] += deltaY
  camera.setOffset(currCameraOffset[0], currCameraOffset[1])
  spriteEngine.update()
  lastMousePos[0] = currentMousePos[0]
  lastMousePos[1] = currentMousePos[1]
}

module.exports = DebugManager