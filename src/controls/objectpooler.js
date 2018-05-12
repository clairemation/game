const Control = require('../classes/control')
const Game = require('../classes/game')
const Camera = require('./camera')

class ObjectPooler extends Control{
    constructor(args){
        super(args)
        this.name = 'objectpooler'
        this.tag = args.tag
        this.spawnPosition = args.spawnPosition || [Game.getScreenWidth(), 200]
    }

    activate(x){
        this.owner.changeState('active')
        this.owner.controls.transform.position[0] = x
    }

    setObjectPool(value){
        this.objectPool = value
    }

    deactivate(){
        this.objectPool.returnToPool(this)
        this.owner.changeState('inactive')
    }

    update(){
        if (this.owner.controls.transform.position[0] + this.owner.controls.transform.size[0] < -Camera.getOffset()[0]){
            this.deactivate()
        }
    }
}

module.exports = ObjectPooler