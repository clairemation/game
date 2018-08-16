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
      var startPos = comp.getLastWorldCheckPoint()
      var endPos = comp.getWorldCheckPoint()
      var checkRay = [...startPos, ...endPos]
      var startTileCoords = this.tileMap.worldToMapCoords(...startPos)
      var endTileCoords = this.tileMap.worldToMapCoords(...endPos)
      var tile
      var shouldBreak = false
      // Ray bounding box
      for (var x = startTileCoords[0]; x <= endTileCoords[0]; x++){
        for (var y = startTileCoords[1]; y <= endTileCoords[1]; y++){
          //  TODO: skip tiles in BB that aren't on movement ray
          // (Left undone for now because this is unlikely to include many tiles at normal speeds)
          tile = this.tileMap.getTileAtMapCoords(x, y)
          if (!tile){
            continue
          }

          shouldBreak = false
          var tileRay
          for (var j = 0; j < tile.rays.length; j++){
            tileRay = tile.rays[j]
            tileRay = $(tileRay).plusVector([x * 32, y * 32, x*32, y*32]).$

            if (!$(endPos).isLeftOf(tileRay).$ || $(startPos).isLeftOf(tileRay).$){
              continue
            }
            // if ($([ray[2], ray[3]]).isLeftOf(tileRay).$){
            //   continue
            // }

            // var intersection = intersectionOf(...checkRay, ...tileRay)

            // if (!intersection){
            //   console.error("Intersection should not be null.")
            // }
            // if (intersection) {
              var dist = $(endPos).distanceToLineSegment(tileRay).$
              // if (dist != 0){
                var projPos = $(endPos).plusVector($(tile.rayNormals[i]).$).$
                var projRay = [...endPos, ...projPos]
                var newPos = intersectionOf(...projRay, ...tileRay)
                comp.owner.controls.transform.moveTo(...($(newPos).minusVector(comp.checkPoint).$))
                comp.owner.controls.altitude.resetFall()
                comp.owner.changeState('walking')

              // }

                shouldBreak = true
                break
            // } else {
              // console.log($([ray[0], ray[1]]).distanceToLineSegment(tileRay).$, $([ray[2], ray[3]]).isLeftOf(tileRay).$)
            // }
          }

          if (shouldBreak){
            break
          }
        }
      }


      // var tileMapPos = this.tileMap.worldToMapCoords(...this.components[i].getWorldCheckPoint())
      // var tile = this.tileMap.getTileAtMapCoords(...tileMapPos)
      // if (tile){
      //   tile.onHit(this.components[i], tileMapPos, this.tileMap)
      // }
    }
  }
}

module.exports = MapCollisionEngine