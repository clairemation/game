var StateMachine = require("./statemachine.js")

class StateMachineControl extends StateMachine{
    constructor(args){
        super(args)
        this.owner = args.owner
    }

    getGame(){
      return this.owner.scene.game
    }

    init(){
      // Override
    }
}

module.exports = StateMachineControl