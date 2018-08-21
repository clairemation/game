const Control = require('../classes/control')

class Friction extends Control{
    constructor(args){
        super(args)
        this.name = 'friction'
    }

    update(dt){
        if (this.owner.controls.velocity.x == 0){
            return
        }
        if (Math.abs(this.owner.controls.velocity) < Math.EPSILON){
            this.owner.controls.velocity.x = 0
        } else {
            this.owner.controls.velocity.x *= .999
        }
    }
}

module.exports = Friction