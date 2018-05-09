const Control = require('../classes/control')

class Collider extends Control{
  constructor(args){
    args.name = 'collider'
    super(args)
    this.hitbox = args.hitbox
    this.bounceFactor = args.bounceFactor || 0
    this.onHit = args.onHit || (() => {})
  }
}

module.exports = Collider