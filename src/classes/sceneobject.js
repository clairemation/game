const StateMachine = require('./statemachine')

class SceneObject extends StateMachine{
    constructor(args){
        super(args)
        this.scene = args.scene
        this.scene.controls.play.registerObject(this)
    }

    getControlsByName(name){
        return this.controls.filter(control => control.name == name)
    }

    getGame(){
        return this.scene.game
    }
}

module.exports = SceneObject