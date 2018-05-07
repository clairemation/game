const Control = require('../classes/control')

class ObjectPooler extends Control{
    constructor(args){
        super(args)
        this.name = 'objectpooler'
        this.tag = args.tag
        this.originalPosition = args.originalPosition
    }

    activate(){
        this.owner.changeState('active')
        this.owner.controls.transform.position.x = this.originalPosition.x
        this.owner.controls.transform.position.y = this.originalPosition.y
    }

    setObjectPool(value){
        this.objectPool = value
    }

    deactivate(){
        this.objectPool.returnToPool(this)
        this.owner.changeState('inactive')
    }

    update(){
        if (this.owner.controls.transform.position.x < -128){
            this.deactivate()
        }
    }
}

module.exports = ObjectPooler