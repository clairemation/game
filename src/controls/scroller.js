const Control = require('../classes/control')

class Walk extends Control{
    constructor(args){
        super(args)
        this.name = 'walk'
    }

    update(dt){
        this.owner.controls.velocity.x = Math.max(3, this.owner.controls.velocity.x)
    }
}

module.exports = Walk