const Control = require('../classes/control')

class ObjectPoolEngine extends Control{
    constructor(args){
        super(args)
        this.tag = args.tag
        this.nextObjectPlacementTime = 0
        this.activeComponents = []
        this.inactiveComponents = []
        this.scrollingEngine = null
        this.deltaPixels = 0
        this.waitTime = 0
        this.layer = args.layer || 'foreground'
        this.objectFrequency = args.objectFrequency || 0.5
        this.minInterval = args.minInterval || 50
        this.maxInterval = args.maxInterval || 200
        this.sinceLastObject = 0
    }

    init(){
        var components = this.owner.scene.getControlsByName('objectpooler').filter(objPooler => objPooler.tag == this.tag)
        this.inactiveComponents = components.filter(c => c.owner.currentStateName == 'inactive')
        this.activeComponents = components.filter(c => c.owner.currentStateName != 'inactive')
        for (let i = 0; i < this.inactiveComponents.length; i++){
            this.inactiveComponents[i].setObjectPool(this)
        }
        for (let i = 0; i < this.activeComponents.length; i++){
            this.activeComponents[i].setObjectPool(this)
        }
        this.scrollingEngine = this.owner.scene.getControlsByName('scrollingEngine').find(e => e.layer == this.layer)
    }

    returnToPool(obj){
        this.activeComponents.splice(this.activeComponents.indexOf(obj), 1)
        this.inactiveComponents.push(obj)
    }

    update(){

        this.deltaPixels += this.scrollingEngine.scrollAmt
        if (this.deltaPixels < this.waitTime - 2){ //Fudge factor
            return
        }

        var rand = Math.random()
        if (rand < this.objectFrequency) {
            var r = Math.floor(Math.random() * (this.inactiveComponents.length -1))
            var obj = this.inactiveComponents.splice(r, 1)[0]
            if (obj) {
                this.activeComponents.push(obj)
                obj.activate()
                this.waitTime = obj.owner.controls.transform.width
                this.deltaPixels = 0

            }
        } else {
            this.waitTime = this.minInterval
            this.deltaPixels = 0
        }
    }
}

module.exports = ObjectPoolEngine