const Control = require('../classes/control')
const Game = require('../classes/game')

class ObjectPooler extends Control{
    constructor(args){
        super(args)
        this.name = 'objectpooler'
        this.tag = args.tag
        this.spawnPosition = args.spawnPosition || {x: Game.getScreenWidth(), y: 200}
    }

    activate(){
        this.owner.changeState('active')
        this.owner.controls.transform.position.x = this.spawnPosition.x
        this.owner.controls.transform.position.y = this.spawnPosition.y
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