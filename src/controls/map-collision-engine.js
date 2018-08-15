const Control = require('../classes/control')
const renderer = require('../core/renderer')
const Camera = require('../controls/camera')
const $ = require('../lib/coolgebra')
const intersectionOf = require('../lib/intersection')

class MapCollisionEngine extends Control{
  constructor(args){
    super(args)
    this.name = 'mapCollisionEngine'
    this.tileMap = args.tileMap
    this.tag = this.tileMap.name
    this.components = []
  }

  init(){
    this.tileMap = this.owner.scene.tileMap
    this.components = this.owner.scene.getControlsByName('mapCollider').filter(c => c.tags.includes(this.tag))
  }

  update(){
    for (var i = 0; i < this.components.length; i++){
      if (!this.components[i].owner.active){
        continue
      }
      var comp = this.components[i]
      var ray = comp.getMovementRay()
      var startTileCoords = this.tileMap.worldToMapCoords(ray[0], ray[1])
      var endTileCoords = this.tileMap.worldToMapCoords(ray[2], ray[3])
      var tile
      for (var x = startTileCoords[0]; x <= endTileCoords[0]; x++){
        for (var y = startTileCoords[1]; y <= endTileCoords[1]; y++){
          tile = this.tileMap.getTileAtMapCoords(y, x)
          if (!tile){
            continue
          }
          // var tileRay
          // for (var j = 0; j < tile.rays.length; j++){
          //   tileRay = tile.rays[i]
          //   tileRay = $(tileRay).plusVector([x * 32, y * 32, x*32, y*32]).$
          //   var intersection = intersectionOf(...ray, tileRay)
          //   if (intersection) {
          //   }
          // }
        }
      }


      var tileMapPos = this.tileMap.worldToMapCoords(...this.components[i].getWorldCheckPoint())
      var tile = this.tileMap.getTileAtMapCoords(...tileMapPos)
      if (tile){
        tile.onHit(this.components[i], tileMapPos, this.tileMap)
      }
    }
  }
}

module.exports = MapCollisionEngine