const Control = require('../classes/control')
const $ = require('../lib/coolgebra')

class ObjectCollider extends Control{
  constructor(args){
    args.name = 'objectCollider'
    super(args)
    this.tags = args.tags
    this.hitbox = args.hitbox
    this.checkPoints = args.checkPoints
    this.onHit = args.onHit || (other => {})
    this.enabled = args.enabled || true
  }

  getWorldHitbox(){
    return $(this.hitbox).plusVector([...this.owner.controls.transform.position, ...this.owner.controls.transform.position]).$
  }
}

module.exports = ObjectCollider