var State = require("./state.js")

var count = 1

class StateMachine{
    constructor(args = {}){
        this.name = args.name || "StateMachine" + count++
        this.controls = args.controls || {}
        this.states = args.states || {}
    }

    update(){
        this.currentState.update.call(this)
    }

    message(msg, e){
        this.currentState.message.call(this, msg, e)
    }

    changeState(newStateName, e){
        this.currentState.exit.call(this, e)
        this.currentState = this.states[newStateName]
        this.currentState.enter.call(this, e)
    }
}

module.exports = StateMachine