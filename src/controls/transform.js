const Control = require('../classes/control')

class Transform extends Control{
  constructor(args = {}){
    super(args)
    this.name = "transform"
    this.position = args.position || {x: 0, y:0}
    this.width = args.width || 0
    this.height = args.height || 0
  }

  getBounds(){
    return [this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height]
  }

  moveUp(amt){
    this.position.y -= amt
  }

  moveDown(amt){
    this.position.y += amt
  }

  moveLeft(amt){
    this.position.x -= amt
  }

  moveRight(amt){
    this.position.x += amt
  }
}

module.exports = Transform