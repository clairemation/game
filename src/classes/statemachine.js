var State = require("./state.js")

var count = 1

class StateMachine{
    constructor(args = {}){
        this.name = args.name || "StateMachine" + count++
        this.controls = args.controls || {}
        this.states = args.states || {}
    }

    update(game, scene){
        this.currentState.update.call(this, game, scene)
    }

    message(msg){
        this.currentState.message.call(this, msg)
    }

    changeState(newStateName){
        this.currentState.exit.call(this, this.states[newStateName])
        this.currentState = this.states[newStateName]
        this.currentState.enter.call(this, this.currentState)
    }
}

module.exports = StateMachine