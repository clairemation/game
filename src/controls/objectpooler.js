const Control = require('../classes/control')
const Game = require('../classes/game')
const CameraFollow = require('./camera-follow')

class ObjectPooler extends Control{
    constructor(args){
        super(args)
        this.name = 'objectpooler'
        this.tag = args.tag
        this.spawnPosition = args.spawnPosition || {x: Game.getScreenWidth(), y: 200}
    }

    activate(x){
        this.owner.changeState('active')
        this.owner.controls.transform.position.x = x
    }

    setObjectPool(value){
        this.objectPool = value
    }

    deactivate(){
        this.objectPool.returnToPool(this)
        this.owner.changeState('inactive')
    }

    update(){
        if (this.owner.controls.transform.position.x + this.owner.controls.transform.width < -CameraFollow.getOffset()[0]){
            this.deactivate()
        }
    }
}

module.exports = ObjectPooler