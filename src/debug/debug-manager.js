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

var selection = new DebugState({
  enter: function(){
    this.enableAllButtons()
    renderer.strokeStyle = 'green'
    this.updateLoop = requestAnimationFrame(this.update.bind(this))
  },

  onMouseDown: function(e){
    if (this.highlightedObject){
      this.changeState('moveObject')
    } else if (this.highlightedTileCoords){
      this.changeState('moveTile')
    }
  },

  onMouseMove: function(e){
    this.lastMouseX = this.currentMouseX
    this.lastMouseY = this.currentMouseY
    this.currentMouseX = e.layerX
    this.currentMouseY = e.layerY
  },

  onKeyDown: function(e){
    if (e.keyCode == this.keys.space){
      this.changeState('scroll')
    } else if (e.keyCode == this.keys.shift){
      this.changeState('multipleSelection')
    }
  },

  update: function(){
    this.updateLoop = requestAnimationFrame(this.update.bind(this))
    if (this.currentMouseX == this.lastMouseX && this.currentMouseY == this.lastMouseY){
      return
    }

    var pointer = this.getPointerWorldspace()
    var boundingBox
    this.highlightedObject = null
    for (var i = 0; i < this.objects.length; i++){
      boundingBox = this.objects[i].controls.transform.getBounds()
      if (pointer[0] > boundingBox[0] && pointer[0] < boundingBox[2] && pointer[1] > boundingBox[1] && pointer[1] < boundingBox[3]){
        this.highlightedObject = this.objects[i]
        this.highlightObject(this.highlightedObject)
        break
      }
    }
    if (!this.highlightedObject){
      var mapCoords = this.map.worldToMapCoords(...pointer)
      var tile = this.map.map[mapCoords[0]][mapCoords[1]]
      if (tile != ' '){
        this.highlightedTile = tile
        this.highlightedTileCoords = [pointer[0] - pointer[0] % 32, pointer[1] - pointer[1] % 32, 32, 32]
      } else {
        this.highlightedTile = null
        this.highlightedTileCoords = null
      }
    }
    this.render()
  }
})

var multipleSelection = new DebugState({
  enter: function(e){
    this.worldSelectionStart = null
  },

  onMouseDown: function(e){
    if (this.mouseDown){
      return
    }
    var pointer = this.getPointerWorldspace()
    this.worldSelectionStart = [pointer[0] - pointer[0] % 32, pointer[1] - pointer[1] % 32]
    this.mapSelectionStart = this.map.worldToMapCoords(...pointer)
    this.worldSelectionEnd = [...this.worldSelectionStart]
    this.mapSelectionEnd = [...this.mapSelectionStart]
    this.selectionWidth = 32
    this.selectionHeight = 32
    renderer.strokeStyle = 'red'
    this.highlightedTile = null
    this.highlightedTileCoords = null
    this.mouseDown = true
  },

  onMouseUp: function(e){
    this.mouseDown = false
  },

  onMouseMove: function(e){
    this.lastMouseX = this.currentMouseX
    this.lastMouseY = this.currentMouseY
    this.currentMouseX = e.layerX
    this.currentMouseY = e.layerY

    if (this.mouseDown){
      var pointer = this.getPointerWorldspace()
      this.worldSelectionEnd = [pointer[0] + (32 - pointer[0] % 32), pointer[1] + (32 - pointer[1] % 32)]
      this.mapSelectionEnd = this.map.worldToMapCoords(...pointer)
      this.selectionWidth = this.worldSelectionEnd[0] - this.worldSelectionStart[0]
      this.selectionHeight = this.worldSelectionEnd[1] - this.worldSelectionStart[1]
    }
  },

  onKeyUp: function(e){
    if (e.keyCode == this.keys.shift){
      if (this.worldSelectionStart){
        this.changeState('moveMultipleTiles')
      } else {
        this.changeState('selection')
      }
    }
  },

  update: function(){
    this.updateLoop = requestAnimationFrame(this.update.bind(this))

    this.render()
    if (this.worldSelectionStart){
      this.highlightTiles()
    }
  }
})

var moveTile = new DebugState({
  enter: function(){
    renderer.strokeStyle = 'red'
    var pointer = this.getPointerWorldspace()
    this.objectDeltaX = this.highlightedTileCoords[0] - pointer[0]
    this.objectDeltaY = this.highlightedTileCoords[1] - pointer[1]

    var mapCoords = this.map.worldToMapCoords(...pointer)
    this.map.map[mapCoords[0]][mapCoords[1]] = ' '
  },

  exit: function(){
    var mapCoords = this.map.worldToMapCoords(this.highlightedTileCoords[0], this.highlightedTileCoords[1])
    this.map.map[mapCoords[0]][mapCoords[1]] = this.highlightedTile
  },

  onMouseMove: function(e){
    this.lastMouseX = this.currentMouseX
    this.lastMouseY = this.currentMouseY
    this.currentMouseX = e.layerX
    this.currentMouseY = e.layerY
  },

  onMouseUp: function(e){
    this.changeState('selection')
  },

  update: function(){
    this.updateLoop = requestAnimationFrame(this.update.bind(this))

    var pointer = this.getPointerWorldspace()
    var newX = pointer[0] + this.objectDeltaX
    var newY = pointer[1] + this.objectDeltaY
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
    this.highlightedTileCoords[0] = newX
    this.highlightedTileCoords[1] = newY

    this.render()
    renderer.drawImage(this.game.currentScene.assetManager.assets[this.map.key[this.highlightedTile].sheet],
      this.map.key[this.highlightedTile].coords.x,
      this.map.key[this.highlightedTile].coords.y,
      this.map.key[this.highlightedTile].coords.w,
      this.map.key[this.highlightedTile].coords.h,
      this.highlightedTileCoords[0],
      this.highlightedTileCoords[1],
      this.map.key[this.highlightedTile].coords.w,
      this.map.key[this.highlightedTile].coords.h
    )
  }
})

var moveMultipleTiles = new DebugState({
  enter: function(){
    renderer.strokeStyle = 'green'

    this.selectionWidth = this.worldSelectionEnd[0] - this.worldSelectionStart[0]
    this.selectionHeight = this.worldSelectionEnd[1] - this.worldSelectionStart[1]

    var mapStartY = this.mapSelectionStart[0]
    var mapEndY = this.mapSelectionEnd[0]
    var mapStartX = this.mapSelectionStart[1]
    var mapEndX = this.mapSelectionEnd[1]

    this.selectedTiles = []
    for (var y = mapStartY; y <= mapEndY; y++){
      var row = []
      for (var x = mapStartX; x <= mapEndX; x++){
        row.push(this.map.map[y][x])
        this.map.map[y][x] = ' '
      }
      this.selectedTiles.push(row)
    }
  },

  exit: function(){
    console.log(this.selectedTiles)
    var mapStart = this.map.worldToMapCoords(...this.worldSelectionStart)
    for (var y = 0; y < this.selectedTiles.length; y++){
      for (var x = 0; x < this.selectedTiles[y].length; x++){
        this.map.map[mapStart[0] + y][mapStart[1] + x] = this.selectedTiles[y][x]
      }
    }
  },

  onMouseDown: function(e){
    var pointer = this.getPointerWorldspace()
    if (pointer[0] < this.worldSelectionStart[0] || pointer[0] > this.worldSelectionEnd[0] || pointer[1] < this.worldSelectionStart[1] || pointer[1] > this.worldSelectionEnd[1]){
      this.changeState('selection')
      return
    }
    this.objectDeltaX = this.worldSelectionStart[0] - pointer[0]
    this.objectDeltaY = this.worldSelectionStart[1] - pointer[1]
    this.mouseDown = true
  },

  onMouseMove: function(e){
    this.lastMouseX = this.currentMouseX
    this.lastMouseY = this.currentMouseY
    this.currentMouseX = e.layerX
    this.currentMouseY = e.layerY
  },

  onMouseUp: function(e){
    this.mouseDown = false
  },

  update: function(){
    this.updateLoop = requestAnimationFrame(this.update.bind(this))

    if (!this.mouseDown){
      return
    }

    var pointer = this.getPointerWorldspace()
    var newX = pointer[0] + this.objectDeltaX
    var newY = pointer[1] + this.objectDeltaY

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

    var deltaX = newX - this.worldSelectionStart[0]
    var deltaY = newX - this.worldSelectionStart[1]
    this.worldSelectionStart[0] = newX
    this.worldSelectionStart[1] = newY
    this.worldSelectionEnd[0] += deltaX
    this.worldSelectionEnd[1] += deltaY

    this.render()
    for (var y = 0; y < this.selectedTiles.length; y++){
      for (var x = 0; x < this.selectedTiles[y].length; x++){
        renderer.drawImage(this.game.currentScene.assetManager.assets[this.map.key[this.selectedTiles[y][x]].sheet],
          this.map.key[this.selectedTiles[y][x]].coords.x,
          this.map.key[this.selectedTiles[y][x]].coords.y,
          this.map.key[this.selectedTiles[y][x]].coords.w,
          this.map.key[this.selectedTiles[y][x]].coords.h,
          this.worldSelectionStart[0] + x * 32,
          this.worldSelectionStart[1] + y * 32,
          this.map.key[this.selectedTiles[y][x]].coords.w,
          this.map.key[this.selectedTiles[y][x]].coords.h
        )
      }
    }
    this.highlightTiles()
  }
})

var moveObject = new DebugState({
  enter: function(){
    renderer.strokeStyle = 'red'
    var pointer = this.getPointerWorldspace()
    this.objectDeltaX = this.highlightedObject.controls.transform.position[0] - pointer[0]
    this.objectDeltaY = this.highlightedObject.controls.transform.position[1] - pointer[1]

  },

  onMouseMove: function(e){
    this.lastMouseX = this.currentMouseX
    this.lastMouseY = this.currentMouseY
    this.currentMouseX = e.layerX
    this.currentMouseY = e.layerY
  },

  onMouseUp: function(e){
    this.changeState('selection')
  },

  update: function(){
    this.updateLoop = requestAnimationFrame(this.update.bind(this))

    if (this.currentMouseX == this.lastMouseX && this.currentMouseY == this.lastMouseY){
      return
    }

    var pointer = this.getPointerWorldspace()
    var newX = pointer[0] + this.objectDeltaX
    var newY = pointer[1] + this.objectDeltaY
    if (this.shouldSnapToGrid){
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
    this.highlightedObject.controls.transform.position[0] = newX
    this.highlightedObject.controls.transform.position[1] = newY
    this.render()
  }
})

var scroll = new DebugState({
  enter: function(){
    this.disableAllButtonsExcept(this.buttons.scroll)
    this.canvas.style.cursor = 'all-scroll'
  },

  exit: function(){
    this.enableAllButtons()
    this.canvas.style.cursor = 'default'
  },

  onMouseDown: function(e){
    if (!this.mouseDown){
      this.lastMouseX = e.layerX
      this.lastMouseY = e.layerY
      this.currentMouseX = e.layerX
      this.currentMouseY = e.layerY
      this.mouseDown = true
    }
  },

  onMouseMove: function(e){
    this.lastMouseX = this.currentMouseX
    this.lastMouseY = this.currentMouseY
    this.currentMouseX = e.layerX
    this.currentMouseY = e.layerY
  },

  onMouseUp: function(e){
    this.mouseDown = false
  },

  onKeyUp: function(e){
    if (e.keyCode == this.keys.space){
      this.changeState('selection')
    }
  },

  update: function(){
    this.updateLoop = requestAnimationFrame(this.update.bind(this))
    if (!this.mouseDown || (this.currentMouseX == this.lastMouseX && this.currentMouseY == this.lastMouseY)){
      return
    }
    var deltaX = (this.currentMouseX - this.lastMouseX) / 2
    var deltaY = (this.currentMouseY - this.lastMouseY) / 2
    var currCameraOffset = this.camera.getOffset()
    currCameraOffset[0] += deltaX
    currCameraOffset[1] += deltaY
    this.camera.setOffset(currCameraOffset[0], currCameraOffset[1])
    this.render()
  }
})

module.exports = DebugManager