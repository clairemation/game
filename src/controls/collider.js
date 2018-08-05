const Control = require('../classes/control')
const $ = require('../lib/coolgebra')

class Collider extends Control{
  constructor(args){
    args.name = 'collider'
    super(args)
    this.tags = args.tags
    this.hitbox = args.hitbox
    this.checkPoints = args.checkPoints

    var upperLeftCorner = [this.hitbox[0], this.hitbox[1]]
    var upperRightCorner = [this.hitbox[2], this.hitbox[1]]
    var lowerLeftCorner = [this.hitbox[0], this.hitbox[3]]
    var lowerRightCorner = [this.hitbox[2], this.hitbox[3]]
    this.hitboxCorners = [upperLeftCorner, upperRightCorner, lowerLeftCorner, lowerRightCorner]

    this.bounceFactor = args.bounceFactor || 0
    this.rays = args.rays || [[this.hitbox[0], this.hitbox[1], this.hitbox[2], this.hitbox[1]]]
    this.normals = []
    this.onHit = args.onHit || (() => {})

    for (let i = 0; i < this.rays.length; i++){
      this.normals[i] = $(this.rays[i]).coordPairToVector().leftNormal().$
    }
  }

  getWorldFrontCheckPoint(){
    return [this.checkPoints.front[0] + this.owner.controls.transform.position[0], this.checkPoints.front[1] + this.owner.controls.transform.position[1]]
  }

  getWorldBottomCheckPoint(){
    return [this.checkPoints.bottom[0] + this.owner.controls.transform.position[0], this.checkPoints.bottom[1] + this.owner.controls.transform.position[1]]
  }
}

module.exports = Collider