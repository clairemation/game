const AssetManager = require('./assetmanager')
const renderer = require('../core/renderer')

var count = 1

class Scene {
    constructor(args){
        this.name = args.name || "Scene" + count++
        this.game = null
        this.objectIndices = {}
        this.objects = []
        this.initialized = false
        this.assetManager = new AssetManager(args.assets)
        this.enter = args.enter || this.enter
        this.exit = args.exit || this.exit
        this.initialObjectList = args.objects || []
        this.screenX = 0
        this.screenY = 0
    }

    resetObjects(){
        this.objectIndices = {}
        this.objects = []
        for (let i = 0; i < this.initialObjectList.length; i++){
            this.initialObjectList[i].reset()
        }
        for (let i = 0; i < this.initialObjectList.length; i++){
            new this.initialObjectList[i]({scene: this})
        }
        this.init()
    }

    setGame(game){
        this.game = game
    }

    enter(){
        this.game.stop()
        this.resetObjects()
        return this.assetManager.load().then(() => this.game.start()) // return for Promise chainability
    }

    exit(){}

    init(){
        var controls = this.getAllControls()
        for (let i = 0; i < controls.length; i++){
            controls[i].init()
        }
    }

    getAllControls(){
        var arr = []
        for (let i = 0; i < this.objects.length; i++){
            arr.push(...Object.values(this.objects[i].controls))
        }
        return arr
    }

    getControlsByName(name){
        var arr = []
        for (let i = 0; i < this.objects.length; i++){
            arr.push(...(this.objects[i].getControlsByName(name)))
        }
        return arr
    }

    getObjectByName(name){
        return this.objects[this.objectIndices[name]]
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