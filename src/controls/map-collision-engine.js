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

      var dirty = true
      var startPos = comp.getLastWorldCheckPoint()

      var count = 0
      while (dirty){
        if (count > 1){
          console.log(count)
        }
        if (count > 3){
          console.error("Stuck in collision loop")
          break
        }
        count ++
        dirty = false

        var endPos = comp.getWorldCheckPoint()

        var upperLeftCorner = [Math.min(startPos[0], endPos[0]) - 1, Math.min(startPos[1], endPos[1]) - 1]
        var lowerRightCorner = [Math.max(startPos[0], endPos[0]) + 1, Math.max(startPos[1], endPos[1]) + 1]

        var startTileCoords = this.tileMap.worldToMapCoords(...upperLeftCorner)
        var endTileCoords = this.tileMap.worldToMapCoords(...lowerRightCorner)
        var tile
        var shouldBreakOuterLoop = false
        // Ray bounding box
        for (var x = startTileCoords[0]; x <= endTileCoords[0]; x++){
          for (var y = startTileCoords[1]; y <= endTileCoords[1]; y++){
            //  TODO: skip tiles in BB that aren't on movement ray
            // (Left undone for now because this is unlikely to include many tiles at normal speeds)
            tile = this.tileMap.getTileAtMapCoords(x, y)
            if (!tile){
              continue
            }

            shouldBreakOuterLoop = false
            var tileRay
            for (var j = 0; j < tile.rays.length; j++){
              tileRay = tile.rays[j]
              tileRay = $(tileRay).plusVector([x * 32, y * 32, x*32, y*32]).$
              if (!$(endPos).isLeftOf(tileRay).$ || $(startPos).isLeftOf(tileRay).$){
                continue
              }


              var dist = $(endPos).distanceToLineSegment(tileRay).$
              var projPos = $(endPos).plusVector($(tile.rayNormals[j]).$).$
              var projRay = [...endPos, ...projPos]
              var newPos = intersectionOf(...projRay, ...tileRay)
              comp.owner.controls.transform.moveTo(...($(newPos).minusVector(comp.checkPoint).$))
              comp.owner.controls.altitude.resetFall()
              comp.owner.changeState('walking')

              dirty = true
              shouldBreakOuterLoop = true
              break
            }

            if (shouldBreakOuterLoop){
              break
            }
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