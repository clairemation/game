const Control = require('../classes/control')

const GRAV_CONSTANT = 0.6

class Gravity extends Control{
  update(){
    this.owner.controls.velocity.y += GRAV_CONSTANT * (this.getGame().dt / 30)
  }
}

module.exports = Gravity