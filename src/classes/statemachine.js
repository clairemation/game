var State = require("./state.js")

var count = 1

class StateMachine{
    constructor(game, scene, args = {}){
        this.name = args.name || "StateMachine" + count++
        this.controls = args.controls || {}
        this.states = args.states || {}
    }

    update(game, scene){
        this.currentState.update.call(this, game, scene)
    }

    message(game, scene, msg){
        this.currentState.message.call(this, msg)
    }

    changeState(game, scene, newStateName){
        this.currentState.exit.call(this, game, scene)
        this.currentState = this.states[newStateName]
        this.currentState.enter.call(this, game, scene)
    }
}

module.exports = StateMachine