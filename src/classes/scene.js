const Control = require("./control.js")
const StateMachine = require("./statemachine.js")
const AssetManager = require('./assetmanager')

var count = 1

class SceneObject extends StateMachine{
    constructor(args){
        super(args)
        this.scene = args.scene
        this.scene.objects.push(this)
        this.scene.objectIndices[this] = this.scene.objects.length - 1
    }
}

class Scene extends StateMachine{
    constructor(args){
        super(args)
        this.name = this.name || "Scene" + count++
        this.objectIndices = {}
        this.objects = []
        this.assetManager = new AssetManager(args.assets)
    }

     createObject(args = {}){
        args.scene = this
        return new SceneObject(args)
    }

    enter(){}

    exit(){}
}

// =================================================



module.exports = Scene