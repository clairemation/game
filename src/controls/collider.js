const Control = require('../classes/control')

class Collider extends Control{
  constructor(args){
    args.name = 'collider'
    super(args)
    this.hitbox = args.hitbox
    this.bounceFactor = args.bounceFactor || 0
    this.rays = args.rays || [[this.hitbox[0], this.hitbox[1], this.hitbox[2], this.hitbox[1]]]
    this.onHit = args.onHit || (() => {})
  }
}

module.exports = Collider