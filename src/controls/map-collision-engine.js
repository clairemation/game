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
    this.debugDrawLines = []
  }

  init(){
    this.tileMap = this.owner.scene.tileMap
    this.components = this.owner.scene.getControlsByName('mapCollider').filter(c => c.tags.includes(this.tag))
  }

  update(){
    this.debugDrawLines = []

    for (var i = 0; i < this.components.length; i++){
      if (!this.components[i].owner.active){
        continue
      }

      var comp = this.components[i]

      var dirty = true
      var startPos = comp.getWorldCheckPoint()

      var count = 0

      while (dirty){

        dirty = false

        if (count++ > 5){
          console.error("Stuck in collision loop")
          break
        }

        var endPos = comp.getNextWorldCheckPoint()

        // Make check box one pixel larger than start and end points, in case it's bordering on another tile
        var upperLeftCorner = [Math.min(startPos[0], endPos[0]) - 1, Math.min(startPos[1], endPos[1]) - 1]
        var lowerRightCorner = [Math.max(startPos[0], endPos[0]) + 1, Math.max(startPos[1], endPos[1]) + 1]

        var upperLeftTile = this.tileMap.worldToMapCoords(...upperLeftCorner)
        var lowerRightTile = this.tileMap.worldToMapCoords(...lowerRightCorner)

        var tileRays = []

        var tile
        for (let x = upperLeftTile[0]; x <= lowerRightTile[0]; x++){
          for (let y = upperLeftTile[1]; y <= lowerRightTile[1]; y++){
            tile = this.tileMap.getTileAtMapCoords(x, y)
            if (!tile){
              continue
            }
            var tr
            for (var k = 0; k < tile.rays.length; k++){
              tr = {
                ray: $(tile.rays[k].ray).plusVector([x * 32, y * 32, x*32, y*32]).$,
                normal: tile.rays[k].normal
                }
              tileRays.push(tr)
            }
            //  TODO: skip tiles in BB that aren't on movement ray
            // (Left undone for now because this is unlikely to include many tiles at normal speeds)
          }
        }

        if (tileRays.length == 0){
          break
        }

        tileRays = tileRays.sort((a, b) => $(startPos).sqDistanceToLineSegment(a.ray).$ - $(startPos).sqDistanceToLineSegment(b.ray).$)

        var tileRay, normal

        for (var j = 0; j < tileRays.length; j++){
          tileRay = tileRays[j].ray
          normal = tileRays[j].normal
          if (!$(endPos).isRightOf(tileRay).$){
            continue
          }
          var intersection = intersectionOf.lineSegments(...startPos, ...endPos, ...tileRay)

          startPos = intersection || startPos

          var normalRay = [...endPos, ...($(endPos).plusVector($(normal).timesScalar(1000).$).$)] //Arbitrary large number
          var surfacePos = intersectionOf.lines(...normalRay, ...tileRay)
          var resistanceVec = $([...endPos, ...surfacePos]).coordPairToVector().$
          var rLength = $(resistanceVec).length().$
          resistanceVec = $(normal).timesScalar(rLength + 0.1).$
          comp.owner.changeState('walking')
          comp.owner.controls.velocity.y += (resistanceVec[1])
          comp.owner.controls.velocity.x += (resistanceVec[0])
          dirty = true
          break
        }
      }
      comp.owner.controls.velocity.applyVelocity()
    }
  }
}

// function pushPointToSurface(p, )

module.exports = MapCollisionEngine