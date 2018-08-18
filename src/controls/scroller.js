const Control = require('../classes/control')

class Scroller extends Control{
    constructor(args){
        super(args)
        this.name = 'scroller'
        this.layer = args.layer || 'foreground'
        this.multiplier = args.multiplier || 1.0
        this.engine = null
    }

    update(dt){
        this.owner.controls.velocity.x = 3 * this.multiplier
    }
}

module.exports = Scroller