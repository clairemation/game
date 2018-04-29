const StateMachine = require('./statemachine')

class SceneObject extends StateMachine{
    constructor(args){
        super(args)
        this.scene = scene
        this.scene.registerObject(this)
    }

    getControlsByName(name){
        return this.controls.filter(control => control.name == name)
    }

    getGame(){
        return this.scene.game
    }
}

module.exports = SceneObject