const Control = require("./control.js")
const StateMachine = require("./statemachine.js")
const AssetManager = require('./assetmanager')

var count = 1

class SceneObject extends StateMachine{
    constructor(args){
        super(args)
        this.scene = args.scene
        this.scene.registerObject(this)
    }

    getControlsByName(name){
        return this.controls.filter(control => control.name == name)
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

     createObject(args = {}){
        args.scene = this
        return new SceneObject(args)
    }

    enter(){}

    exit(){}
}

// =================================================



module.exports = Scene