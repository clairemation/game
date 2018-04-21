const Control = require("./control.js")
const StateMachine = require("./statemachine.js")

class SceneObject extends StateMachine{
    constructor(args){
        super(args)
        this.scene = args.scene
        game.controls.playControl.components.push(this)
    }
}

class Scene extends StateMachine{
    constructor(args){
        super(args)

        this.controls.playControl = new Control({
            components: [],
            update: function(dt){
                for (var i = 0; i < this.components.length; i++){
                    this.components[i].update(dt)
                }
            }
        })

        this.Object = function(args = {}){
            args.scene = this
            return new SceneObject(args)
        }
    }
}

// =================================================



module.exports = Scene