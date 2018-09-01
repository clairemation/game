const StateMachine = require('./statemachine')
const objectValues = require('../lib/object-values-polyfill')

class SceneObject extends StateMachine{
    constructor(args){
        super(args)
        this.scene = args.scene
        this.tag = args.tag || ''
        this.scene.registerObject(this)
        this.active = args.active || false
    }

    getControlsByName(name){
        return objectValues(this.controls).filter(control => control.name == name)
    }

    getControlsByTag(tag){
        return objectValues(this.controls).filter(control => control.tag == tag)
    }

    getGame(){
        return this.scene.game
    }

    static reset(){}
}

module.exports = SceneObject