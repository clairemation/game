const StateMachineControl = require('../classes/state-machine-control')
const State = require('../classes/state')

const ANIM_FRAMERATE = 200
const LEFT = false, RIGHT = true

// animations: {
//     stand: ['walk00'],
//     walk: ['walk00', 'walk01']
// }

class AnimationStateMachine extends StateMachineControl{
    constructor(args = {}){
        super(args)
        this.name = 'animationStateMachine'
    }

    init(){
    }
}

module.exports = AnimationStateMachine