var StateMachine = require("./statemachine.js")

class StateMachineControl extends StateMachine{
    constructor(args){
        super(args)
        this.owner = args.owner
        this.parameters = args.parameters || {}
    }

    evaluateChange(parameterName){
        this.currentState.evaluateChange.call(this, parameterName)
    }

    getGame(){
      return this.owner.scene.game
    }

    init(){
      // Override
    }

    setParameter(name, value){
        this.parameters[name] = value
        this.evaluateChange(name)
    }

    setTrigger(name){
        this.parameters[name] = true
        this.evaluateChange(name)
        this.parameters[name] = false
    }
}

module.exports = StateMachineControl