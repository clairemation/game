const Control = require('../classes/control')

class Transform extends Control{
  constructor(args = {}){
    super(args)
    this.name = "transform"
    this.position = args.position || {x: 0, y:0}
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