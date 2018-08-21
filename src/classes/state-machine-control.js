var StateMachine = require("./statemachine.js")

class StateMachineControl extends StateMachine{
    constructor(args){
        super(args)
        this.owner = args.owner
        this.parameters = args.parameters || {}
    }

    evaluateState(){
        this.currentState.evaluateState.call.this()
    }

    getGame(){
      return this.owner.scene.game
    }

    init(){
      // Override
    }

    setParameter(name, value){
        this.parameters[name] = value
        this.evaluateState()
    }

    setTrigger(name){
        this.parameters[name] = true
        this.evaluateState()
        this.parameters[name] = false
    }
}

module.exports = StateMachineControl