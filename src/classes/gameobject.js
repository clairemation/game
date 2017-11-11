var State = require("./state.js")

class GameObject{
    constructor(args = {}){
        this.name = 'GameObject'
        this.controls = {}
        this.states = {
            default: new State({
                update: function(dt){ //Update all controls
                    for (var controlName in this.controls){
                        this.controls[controlName].update(dt)
                    }
                }
            })
        }
        this.currentState = this.states.default
        Object.assign(this, args)
    }

    update(dt){
        this.currentState.update.call(this, dt)
    }

    message(msg){
        this.currentState.message.call(this, msg)
    }

    changeState(newState){
        this.currentState.exit.call(this, newState)
        newState.enter.call(this, this.currentState)
        this.currentState = newState
    }
}

module.exports = GameObject