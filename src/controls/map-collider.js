const Control = require('../classes/control')
const $ = require('../lib/coolgebra')

class MapCollider extends Control{
  constructor(args){
    args.name = 'mapCollider'
    super(args)
    this.tags = args.tags
    this.hitbox = args.hitbox
    this.checkPoint = args.checkPoint
    this.onHit = args.onHit || (() => {})
  }

  getWorldCheckPoint(){
    return [this.checkPoint[0] + this.owner.controls.transform.position[0], this.checkPoint[1] + this.owner.controls.transform.position[1]]
  }

  getLastWorldCheckPoint(){
    return [this.checkPoint[0] + this.owner.controls.transform.prevPosition[0], this.checkPoint[1] + this.owner.controls.transform.prevPosition[1]]
  }

  getMovementRay(){
    return [
      this.checkPoint[0] + this.owner.controls.transform.prevPosition[0],
      this.checkPoint[1] + this.owner.controls.transform.prevPosition[1],
      this.checkPoint[0] + this.owner.controls.transform.position[0],
      this.checkPoint[1] + this.owner.controls.transform.position[1]
    ]
  }
}

module.exports = MapCollider