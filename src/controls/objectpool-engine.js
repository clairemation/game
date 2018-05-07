const Control = require('../classes/control')

class ObjectPoolEngine extends Control{
    constructor(args){
        super(args)
        this.tag = args.tag
        this.nextObjectPlacementTime = 0
        this.activeComponents = []
        this.inactiveComponents = []
        this.step = args.step || 300
        this.objectFrequency = args.step || 2
    }

    init(){
        this.inactiveComponents = this.owner.scene.getControlsByName('objectpooler').filter(objPooler => objPooler.tag == this.tag)
        for (let i = 0; i < this.inactiveComponents.length; i++){
            this.inactiveComponents[i].setObjectPool(this)
        }
    }

    returnToPool(obj){
        this.activeComponents.splice(this.activeComponents.indexOf(obj), 1)
        this.inactiveComponents.push(obj)
    }

    update(){
        if (this.getGame().currentTime >= this.nextObjectPlacementTime){
            var rand = Math.random()
            if (rand < this.objectFrequency) {
                var r = Math.floor(Math.random() * (this.inactiveComponents.length -1))
                var obj = this.inactiveComponents.splice(r, 1)[0]
                if (obj) {
                    this.activeComponents.push(obj)
                    obj.activate()
                    this.nextObjectPlacementTime = this.getGame().currentTime + this.step

                }
            }
        }
    }
}

module.exports = ObjectPoolEngine