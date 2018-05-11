const StateMachine = require('./statemachine')

class SceneObject extends StateMachine{
    constructor(args){
        super(args)
        this.scene = args.scene
        this.tag = args.tag || ''
        this.scene.registerObject(this)
    }

    getControlsByName(name){
        return Object.values(this.controls).filter(control => control.name == name)
    }

    getGame(){
        return this.scene.game
    }

    static reset(){}
}

module.exports = SceneObject