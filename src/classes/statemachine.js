var State = require("./state.js")

var count = 1

class StateMachine{
    constructor(args = {}){
        this.name = args.name || "StateMachine" + count++
        this.controls = {}
        this.states = {
            updateAllControls: new State({
                update: function(dt){ //Update all controls
                    for (var controlName in this.controls){
                        this.controls[controlName].update(dt)
                    }
                }
            })
        }
        this.currentState = this.states.updateAllControls
    }

    update(dt){
        this.currentState.update.call(this, dt)
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