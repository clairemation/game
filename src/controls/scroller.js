const Control = require('../classes/control')

class Scroller extends Control{
    constructor(args){
        super(args)
        this.name = 'scroller'
        this.tag = args.tag || ''
        this.engine = undefined
    }

    update(dt){
        this.owner.controls.transform.moveLeft(this.engine.scrollAmt)
    }
}

module.exports = Scroller