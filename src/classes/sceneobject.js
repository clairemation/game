const StateMachine = require('./statemachine')

class SceneObject extends StateMachine{
    constructor(args){
        super(args)
        this.scene = args.scene
        this.transform = {x: 0, y: 0}
        this.scene.registerObject(this)
    }

    getControlsByName(name){
        return Object.values(this.controls).filter(control => control.name == name)
    }

    getGame(){
        return this.scene.game
    }
}

module.exports = SceneObject