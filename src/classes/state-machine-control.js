var StateMachine = require("./statemachine.js")

class StateMachineControl extends StateMachine{
    constructor(args){
        super(args)
        this.owner = args.owner
        this.parameters = args.parameters || {}
    }

    evaluateChange(parameterName, value){
        this.currentState.evaluateChange.call(this, parameterName, value)
    }

    getGame(){
      return this.owner.scene.game
    }

    init(){
      // Override
    }

    setParameter(name, value){
        this.parameters[name] = value
        this.evaluateChange(name, value)
    }

    setTrigger(name, value){
        this.evaluateChange(name, value)
    }
}

module.exports = StateMachineControl