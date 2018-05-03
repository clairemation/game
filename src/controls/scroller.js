const Control = require('../classes/control')

var fgScrollSpeed = 5.0

class Scroller extends Control{
    constructor(args){
        super(args)
        this.name = 'scroller'
        this.reset()
    }

    static setFgScrollSpeed(amt){
        fgScrollSpeed = amt
    }

    update(dt){
        this.owner.controls.transform.moveLeft(fgScrollSpeed * this.getGame().dt)
    }
}

module.exports = Scroller