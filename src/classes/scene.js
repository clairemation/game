const Control = require("./control.js")
const StateMachine = require("./statemachine.js")
const AssetManager = require('./assetmanager')

var count = 1

class SceneObject extends StateMachine{
    constructor(args){
        super(args)
        this.scene = scene
        this.scene.registerObject(this)
    }

    getControlsByName(name){
        return this.controls.filter(control => control.name == name)
    }

    getGame(){
        return this.scene.game
    }
}

class Scene extends StateMachine{
    constructor(args){
        super(args)
        this.name = args.name || "Scene" + count++
        this.objectIndices = {}
        this.objects = []
        this.game = null
        this.assetManager = new AssetManager(args.assets)
    }

    getControlsByName(name){
        var arr = []
        for (let i = 0; i < objects.length; i++){
            arr.push(...(objects[i].getControlsByName(name)))
        }
    }

    getObjectByName(name){
        return objects[objectIndices[name]]
    }

    registerObject(obj){
        this.objects.push(obj)
        this.objectIndices[obj.name] = this.objects.length - 1
    }

    setGame(game){
        this.game = game
    }

    enter(game){}

    exit(game){}
}

// =================================================



module.exports = Scene