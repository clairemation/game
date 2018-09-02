const Control = require('../classes/control')

class Advance extends Control{
    constructor(args){
        super(args)
        this.name = 'walk'
        this.acceleration = args.acceleration || 1
        this.topImpulse = args.topImpulse || 3
        this.impulse = 0
        this.direction = 0
    }

    change(direction){
        if (direction == this.direction){
            return
        }
        this.direction = direction
        this.owner.controls.animationStateMachine.setParameter('direction', direction)
    }

    update(dt){
        if (this.direction == 0){
            if (this.owner.controls.velocity.x == 0){
                return
            }
            if (Math.abs(this.owner.controls.velocity.x) < 1){
                this.owner.controls.velocity.x = 0
            } else {
                this.owner.controls.velocity.x *= 0.7
            }
        }
        else if ((this.direction > 0 && this.owner.controls.velocity.x < this.topImpulse) ||
            (this.direction < 0 && this.owner.controls.velocity.x > -this.topImpulse)){
            this.owner.controls.velocity.x += this.direction * this.acceleration
        }
    }
}

module.exports = Advance