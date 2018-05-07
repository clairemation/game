const Control = require('../classes/control')

class ObjectPooler extends Control{
    constructor(args){
        super(args)
        this.name = 'objectpooler'
        this.tag = args.tag
    }

    activate(){
        this.owner.changeState('active')
        this.owner.controls.transform.position.x = 300
    }

    setObjectPool(value){
        this.objectPool = value
    }

    deactivate(){
        this.objectPool.returnToPool(this)
        this.owner.changeState('inactive')
    }

    update(){
        if (this.owner.controls.transform.position.x < -100){
            this.deactivate()
        }
    }
}

module.exports = ObjectPooler