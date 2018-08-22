const StateMachineControl = require('../classes/state-machine-control')
const State = require('../classes/state')

class AnimationStateMachine extends StateMachineControl{
    constructor(args = {}){
        super(args)
        this.name = 'animationStateMachine'
        this.tag = args.tag
        this.sprite
    }

    init(){
      this.sprite = this.owner.getControlsByName('sprite').find(e => e.tag == this.tag)
    }
}

module.exports = AnimationStateMachine