const Control = require('../classes/control')
const $ = require('../lib/coolgebra')

class MapCollider extends Control{
  constructor(args){
    args.name = 'mapCollider'
    super(args)
    this.tags = args.tags
    this.checkPoint = args.checkPoint
    this.onHit = args.onHit || (() => {})
  }

  getWorldCheckPoint(){
    return $(this.checkPoint).plusVector(this.owner.controls.transform.position).$
  }

  getNextWorldCheckPoint(){
    return $(this.checkPoint).plusVector(this.owner.controls.velocity.previewNewPosition()).$
  }
}

module.exports = MapCollider