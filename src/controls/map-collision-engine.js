const Control = require('../classes/control')
const renderer = require('../core/renderer')
const Camera = require('../controls/camera')

class MapCollisionEngine extends Control{
  constructor(args){
    super(args)
    this.name = 'mapCollisionEngine'
    this.tileMap = args.tileMap
    this.tag = this.tileMap.name
    this.components = []
  }

  init(){
    this.components = this.owner.scene.getControlsByName('collider').filter(c => c.tags.includes(this.tag))
  }

  update(){
    for (var i = 0; i < this.components.length; i++){
      if (!this.components[i].owner.active){
        continue
      }
      var frontTileMapPos = this.tileMap.worldToMapCoords(...this.components[i].getWorldFrontCheckPoint())
      var frontTile = this.tileMap.getTileAtMapCoords(...frontTileMapPos)
      if (frontTile){
        frontTile.onHitFront(this.components[i], frontTileMapPos, this.tileMap)
      }
      var bottomTileMapPos = this.tileMap.worldToMapCoords(...this.components[i].getWorldBottomCheckPoint())
      var bottomTile = this.tileMap.getTileAtMapCoords(...bottomTileMapPos)
      if (bottomTile && bottomTile != frontTile){
        bottomTile.onHitTop(this.components[i], bottomTileMapPos, this.tileMap)
      }
    }
  }
}

module.exports = MapCollisionEngine