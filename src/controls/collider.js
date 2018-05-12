const Control = require('../classes/control')
const $ = require('../lib/coolgebra')

class Collider extends Control{
  constructor(args){
    args.name = 'collider'
    super(args)
    this.tag = args.tag
    this.hitbox = args.hitbox
    this.bounceFactor = args.bounceFactor || 0
    this.rays = args.rays || [[this.hitbox[0], this.hitbox[1], this.hitbox[2], this.hitbox[1]]]
    this.normals = []
    this.onHit = args.onHit || (() => {})

    for (let i = 0; i < this.rays.length; i++){
      this.normals[i] = $(this.rays[i]).coordPairToVector().leftNormal().$
    }
  }
}

module.exports = Collider