var State = require("./state.js")

var count = 1

class StateMachine{
    constructor(args = {}){
        this.name = args.name || "StateMachine" + count++
        this.states = args.states || {}
        this.currentState = args.initialState

        this.controls = {}
        var control, controlArgs
        for (var name in args.controls){
            control = args.controls[name]
            controlArgs = control.args
            controlArgs.owner = this
            this.controls[name] = new control.kind(controlArgs)
        }
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