const Control = require("./classes/control.js")
const GameObject = require("./classes/gameobject.js")

// GAME OBJECT ======================================

var game = new GameObject({name: "Game"})

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

class GameplayObject extends GameObject{
    constructor(args){
        super(args)
        game.controls.playControl.components.push(this)
    }
}

module.exports = {game, GameplayObject}