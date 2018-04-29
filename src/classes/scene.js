const Control = require("./control")
const State = require('./state')
const StateMachine = require("./statemachine")
const AssetManager = require('./assetmanager')

var count = 1

class Scene extends StateMachine{
    constructor(args){
        super(args)
        this.name = args.name || "Scene" + count++
        this.controls.play = new Play({owner: this})
        this.game = null
        this.states = {
            loading: new State(),
            playing: new State({
              enter: function(){
                this.assetManager.play('blop')
                this.game.start()
              },
              update: function(){
                this.controls.play.update()
              }
            })
        }
        this.assetManager = new AssetManager(args.assets)
    }

    setGame(game){
        this.game = game
    }

    enter(game){}

    exit(game){}
}

class Play extends Control{
    constructor(args){
        super(args)
        this.objectIndices = {}
        this.objects = []
    }

    getControlsByName(name){
        var arr = []
        for (let i = 0; i < objects.length; i++){
            arr.push(...(objects[i].getControlsByName(name)))
        }
        return arr
    }

    getObjectByName(name){
        return objects[objectIndices[name]]
    }

    registerObject(obj){
        this.objects.push(obj)
        this.objectIndices[obj.name] = this.objects.length - 1
    }

    update(){
        for (let i = 0; i < this.objects.length; i++){
          this.objects[i].update()
        }
      }
}

module.exports = Scene