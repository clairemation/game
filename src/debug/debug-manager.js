const renderer = require('../core/renderer')
const Camera = require('../controls/camera')
const input = require('../core/input')
const State = require("../classes/state")
const StateMachine = require('../classes/statemachine')

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
  exportMap: document.getElementById('export-map'),

  atlasSelect: document.getElementById('atlas-select'),
  drawAtlasGrid: document.getElementById('inspector-show-grid')
}

var keys = {
  space: 32,
  shift: 16
}

var updateLoop

var shouldShowGrid = false
var shouldSnapToGrid = false

var highlightedObject
var highlightedTileCoords
var highlightedTile
var worldSelectionStart
var worldSelectionEnd
var mapSelectionStart
var mapSelectionEnd
var selectedTiles
var selectionWidth, selectionHeight
var objectDeltaX
var objectDeltaY

var lastMouseX, lastMouseY
var currentMouseX, currentMouseY
var mouseDown = false
var shiftDown = false

var canvas = document.getElementById('canvas')
var game, camera, renderingEngine, player, objects, map
var pixelWidth, pixelHeight

var gridCanvas = document.createElement('canvas')
var gridCtx
var gridWidth, gridHeight

var inspectorCanvas = document.getElementById('inspector-canvas')
var inspector = inspectorCanvas.getContext('2d')
var atlasImage
var inspectorGridCanvas = document.createElement('canvas')
var inspectorGridCtx = inspectorGridCanvas.getContext('2d')

var shouldDrawAtlasGrid = false


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
        initial,
        selection,
        multipleSelection,
        scroll,
        moveObject,
        moveTile,
        moveMultipleTiles,
        off
      },
      initialState: 'off'
    })
    game = args.game
    this.changeState('off')
    buttons.start.onclick = e => {
      e.preventDefault()
      this.changeState(this.currentStateName == 'off' ? 'initial' : 'off')
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
    buttons.exportMap.onclick = e => {
      e.preventDefault()
      var textMap = map.map.map(e => e.join('')).join('\n') //Yes I should
      var blob = new Blob([textMap], {type: 'text/plain;charset=utf-8;'})
      var el = window.document.createElement('a')
      el.href = window.URL.createObjectURL(blob)
      el.download = 'map.txt'
      document.body.appendChild(el)
      el.click()
      document.body.removeChild(el)
      window.URL.revokeObjectURL(blob)
    }
    buttons.atlasSelect.onchange = e => {
      e.preventDefault()
      inspector.clearRect(0,0,320,320)
      atlasImage = new Image(160, 160)
      atlasImage.onload = renderInspector
      atlasImage.src = '../assets/' + e.target.value
    }
    buttons.drawAtlasGrid.onclick = e => {
      e.preventDefault()
      shouldDrawAtlasGrid = !shouldDrawAtlasGrid
      renderInspector()
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

var initial = new DebugState({
  enter: function(){
    game.stop()
    input.turnOff()
    buttons.start.innerHTML='<i class="fa fa-play"></i>'
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
    drawGridCanvas(gridCtx, gridCanvas.width, gridCanvas.height)

    inspectorGridCanvas.width = inspectorCanvas.width
    inspectorGridCanvas.height = inspectorCanvas.height
    drawGridCanvas(inspectorGridCtx, inspectorGridCanvas.width, inspectorGridCanvas.height)

    canvas.addEventListener('mousedown', this.onMouseDown)
    canvas.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)

    render()

    this.changeState('selection')
  }
})

var selection = new DebugState({
  enter: function(){
    enableAllButtons()
    renderer.strokeStyle = 'green'
    updateLoop = requestAnimationFrame(this.update.bind(this))
  },

  onMouseDown: function(e){
    if (highlightedObject){
      this.changeState('moveObject')
    } else if (highlightedTileCoords){
      this.changeState('moveTile')
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
    } else if (e.keyCode == keys.shift){
      this.changeState('multipleSelection')
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
      var mapCoords = map.worldToMapCoords(...pointer)
      var tile = map.map[mapCoords[0]][mapCoords[1]]
      if (tile != ' '){
        highlightedTile = tile
        highlightedTileCoords = [pointer[0] - pointer[0] % 32, pointer[1] - pointer[1] % 32, 32, 32]
      } else {
        highlightedTile = null
        highlightedTileCoords = null
      }
    }
    render()
  }
})

var multipleSelection = new DebugState({
  enter: function(e){
    worldSelectionStart = null
  },

  onMouseDown: function(e){
    if (mouseDown){
      return
    }
    var pointer = getPointerWorldspace()
    worldSelectionStart = [pointer[0] - pointer[0] % 32, pointer[1] - pointer[1] % 32]
    mapSelectionStart = map.worldToMapCoords(...pointer)
    worldSelectionEnd = [...worldSelectionStart]
    mapSelectionEnd = [...mapSelectionStart]
    selectionWidth = 32
    selectionHeight = 32
    renderer.strokeStyle = 'red'
    highlightedTile = null
    highlightedTileCoords = null
    mouseDown = true
  },

  onMouseUp: function(e){
    mouseDown = false
  },

  onMouseMove: function(e){
    lastMouseX = currentMouseX
    lastMouseY = currentMouseY
    currentMouseX = e.layerX
    currentMouseY = e.layerY

    if (mouseDown){
      var pointer = getPointerWorldspace()
      worldSelectionEnd = [pointer[0] + (32 - pointer[0] % 32), pointer[1] + (32 - pointer[1] % 32)]
      mapSelectionEnd = map.worldToMapCoords(...pointer)
      selectionWidth = worldSelectionEnd[0] - worldSelectionStart[0]
      selectionHeight = worldSelectionEnd[1] - worldSelectionStart[1]
    }
  },

  onKeyUp: function(e){
    if (e.keyCode == keys.shift){
      if (worldSelectionStart){
        this.changeState('moveMultipleTiles')
      } else {
        this.changeState('selection')
      }
    }
  },

  update: function(){
    updateLoop = requestAnimationFrame(this.update.bind(this))

    render()
    if (worldSelectionStart){
      highlightTiles()
    }
  }
})

var moveTile = new DebugState({
  enter: function(){
    renderer.strokeStyle = 'red'
    var pointer = getPointerWorldspace()
    objectDeltaX = highlightedTileCoords[0] - pointer[0]
    objectDeltaY = highlightedTileCoords[1] - pointer[1]

    var mapCoords = map.worldToMapCoords(...pointer)
    map.map[mapCoords[0]][mapCoords[1]] = ' '
  },

  exit: function(){
    var mapCoords = map.worldToMapCoords(highlightedTileCoords[0], highlightedTileCoords[1])
    map.map[mapCoords[0]][mapCoords[1]] = highlightedTile
  },

  onMouseMove: function(e){
    lastMouseX = currentMouseX
    lastMouseY = currentMouseY
    currentMouseX = e.layerX
    currentMouseY = e.layerY
  },

  onMouseUp: function(e){
    this.changeState('selection')
  },

  update: function(){
    updateLoop = requestAnimationFrame(this.update.bind(this))

    var pointer = getPointerWorldspace()
    var newX = pointer[0] + objectDeltaX
    var newY = pointer[1] + objectDeltaY
    var distFromLeftLine = newX % 32
    var distFromAboveLine = newY % 32
    if (distFromLeftLine <= 16){
      newX -= distFromLeftLine
    } else {
      newX += 32 - distFromLeftLine
    }
    if (distFromAboveLine <= 16){
      newY -= distFromAboveLine
    } else {
      newY += 32 - distFromAboveLine
    }
    highlightedTileCoords[0] = newX
    highlightedTileCoords[1] = newY

    render()
    renderer.drawImage(game.currentScene.assetManager.assets[map.key[highlightedTile].sheet],
      map.key[highlightedTile].coords.x,
      map.key[highlightedTile].coords.y,
      map.key[highlightedTile].coords.w,
      map.key[highlightedTile].coords.h,
      highlightedTileCoords[0],
      highlightedTileCoords[1],
      map.key[highlightedTile].coords.w,
      map.key[highlightedTile].coords.h
    )
  }
})

var moveMultipleTiles = new DebugState({
  enter: function(){
    renderer.strokeStyle = 'green'

    selectionWidth = worldSelectionEnd[0] - worldSelectionStart[0]
    selectionHeight = worldSelectionEnd[1] - worldSelectionStart[1]

    var mapStartY = mapSelectionStart[0]
    var mapEndY = mapSelectionEnd[0]
    var mapStartX = mapSelectionStart[1]
    var mapEndX = mapSelectionEnd[1]

    selectedTiles = []
    for (var y = mapStartY; y <= mapEndY; y++){
      var row = []
      for (var x = mapStartX; x <= mapEndX; x++){
        row.push(map.map[y][x])
        map.map[y][x] = ' '
      }
      selectedTiles.push(row)
    }
  },

  exit: function(){
    console.log(selectedTiles)
    var mapStart = map.worldToMapCoords(...worldSelectionStart)
    for (var y = 0; y < selectedTiles.length; y++){
      for (var x = 0; x < selectedTiles[y].length; x++){
        map.map[mapStart[0] + y][mapStart[1] + x] = selectedTiles[y][x]
      }
    }
  },

  onMouseDown: function(e){
    var pointer = getPointerWorldspace()
    if (pointer[0] < worldSelectionStart[0] || pointer[0] > worldSelectionEnd[0] || pointer[1] < worldSelectionStart[1] || pointer[1] > worldSelectionEnd[1]){
      this.changeState('selection')
      return
    }
    objectDeltaX = worldSelectionStart[0] - pointer[0]
    objectDeltaY = worldSelectionStart[1] - pointer[1]
    mouseDown = true
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

    if (!mouseDown){
      return
    }

    var pointer = getPointerWorldspace()
    var newX = pointer[0] + objectDeltaX
    var newY = pointer[1] + objectDeltaY

    var distFromLeftLine = newX % 32
    var distFromAboveLine = newY % 32
    if (distFromLeftLine <= 16){
      newX -= distFromLeftLine
    } else {
      newX += 32 - distFromLeftLine
    }
    if (distFromAboveLine <= 16){
      newY -= distFromAboveLine
    } else {
      newY += 32 - distFromAboveLine
    }

    var deltaX = newX - worldSelectionStart[0]
    var deltaY = newX - worldSelectionStart[1]
    worldSelectionStart[0] = newX
    worldSelectionStart[1] = newY
    worldSelectionEnd[0] += deltaX
    worldSelectionEnd[1] += deltaY

    render()
    for (var y = 0; y < selectedTiles.length; y++){
      for (var x = 0; x < selectedTiles[y].length; x++){
        renderer.drawImage(game.currentScene.assetManager.assets[map.key[selectedTiles[y][x]].sheet],
          map.key[selectedTiles[y][x]].coords.x,
          map.key[selectedTiles[y][x]].coords.y,
          map.key[selectedTiles[y][x]].coords.w,
          map.key[selectedTiles[y][x]].coords.h,
          worldSelectionStart[0] + x * 32,
          worldSelectionStart[1] + y * 32,
          map.key[selectedTiles[y][x]].coords.w,
          map.key[selectedTiles[y][x]].coords.h
        )
      }
    }
    highlightTiles()
  }
})

var moveObject = new DebugState({
  enter: function(){
    renderer.strokeStyle = 'red'
    var pointer = getPointerWorldspace()
    objectDeltaX = highlightedObject.controls.transform.position[0] - pointer[0]
    objectDeltaY = highlightedObject.controls.transform.position[1] - pointer[1]

  },

  onMouseMove: function(e){
    lastMouseX = currentMouseX
    lastMouseY = currentMouseY
    currentMouseX = e.layerX
    currentMouseY = e.layerY
  },

  onMouseUp: function(e){
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

function highlightTile(tile){
  renderer.beginPath()
  renderer.rect(...tile)
  renderer.stroke()
}

function highlightTiles(){
  renderer.beginPath()
  renderer.rect(...worldSelectionStart, selectionWidth, selectionHeight)
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
  } else if (highlightedTileCoords){
    highlightTile(highlightedTileCoords)
  }
}

function renderInspector(){
  inspector.clearRect(0, 0, 320, 320)
  inspector.drawImage(atlasImage, 0, 0)
  if (shouldDrawAtlasGrid){
    inspector.drawImage(inspectorGridCanvas, 0, 0)
  }
}

function drawGridCanvas(ctx, width, height){
  ctx.strokeStyle = 'white'
  for (var i = 0; i <= gridWidth; i += 32){
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, gridWidth)
    ctx.stroke()
  }
  for (var i = 0; i <= gridHeight; i += 32){
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(gridHeight, i)
    ctx.stroke()
  }

}

module.exports = DebugManager