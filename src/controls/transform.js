const Control = require('../classes/control')

class Transform extends Control{
  constructor(args = {}){
    super(args)
    this.name = "transform"
    this.position = args.position || {x: 0, y:0}
  }
}

module.exports = Transform