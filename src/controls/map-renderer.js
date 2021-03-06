const Control = require('../classes/control')
const renderer = require('../core/renderer')
const Camera = require('../controls/camera')

var SCREEN_TILE_WIDTH, SCREEN_TILE_HEIGHT

class MapRenderer extends Control{
  constructor(args){
    super(args)
    this.name = 'mapRenderer'
    this.tag = 'renderer'
    this.layer = args.layer
    this.tileMap
    this.enabled = true
    SCREEN_TILE_WIDTH = Math.floor(Camera.getPixelWidth() / 32) + 32
    SCREEN_TILE_HEIGHT = Math.floor(Camera.getPixelHeight() / 32) + 32
  }

  init(){
    this.tileMap = this.owner.scene.tileMap
  }

  render(){
    var camPosition = Camera.getViewportPosition()
    var worldStartX = camPosition[0] - camPosition[0] % 32 - 32
    var worldStartY = camPosition[1] - camPosition[1] % 32 - 32
    var mapStartPos = this.tileMap.worldToMapCoords(worldStartX, worldStartY)
    var sprite, worldX, worldY
    for (var xMap = mapStartPos[0], xWorld = worldStartX; xMap < mapStartPos[0] + SCREEN_TILE_HEIGHT; xMap++, xWorld += 32){
      for (var yMap = mapStartPos[1], yWorld = worldStartY; yMap < mapStartPos[1] + SCREEN_TILE_WIDTH; yMap++, yWorld += 32){
        sprite = this.tileMap.getTileAtMapCoords(xMap, yMap)
        if (sprite){
          renderer.drawImage(this.owner.scene.assetManager.assets[sprite.sheet],
            sprite.coords.x,
            sprite.coords.y,
            32,
            32,
            xWorld,
            yWorld,
            32,
            32
          )
        }
      }
    }
  }
}

module.exports = MapRenderer