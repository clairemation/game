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
        this.owner.controls.transform.moveLeft(Math.ceil(this.engine.scrollAmt * this.multiplier))
    }
}

module.exports = Scroller