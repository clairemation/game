const StateMachine = require('./statemachine')

class SystemsObject extends StateMachine{
    constructor(args){
        super(args)
        this.scene = args.scene
        this.name = 'systems'
        this.scene.setSystemsObject(this)
    }

    getControlsByName(name){
        return Object.values(this.controls).filter(control => control.name == name)
    }

    getGame(){
        return this.scene.game
    }
}

module.exports = SystemsObject