const Control = require("./classes/control.js")
const StateMachine = require("./classes/statemachine.js")

// GAME OBJECT ======================================

var game = new StateMachine({name: "Game"})

// Game object controls =============================

game.controls.playControl = new Control({
    components: [],
    update: function(dt){
        for (var i = 0; i < this.components.length; i++){
            this.components[i].update(dt)
        }
    }
})

// =================================================

class GameObject extends StateMachine{
    constructor(args){
        super(args)
        game.controls.playControl.components.push(this)
    }
}

module.exports = {game, GameObject}