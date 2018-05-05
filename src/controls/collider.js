const Control = require('../classes/control')

class Collider extends Control{
  constructor(args){
    args.name = 'collider'
    super(args)
    this.hitbox = args.hitbox
    this.onHit = args.onHit || this.onHit
  }

  onHit(){}
}

module.exports = Collider