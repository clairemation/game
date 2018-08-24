const Control = require('../classes/control')
const $ = require('../lib/coolgebra')
const intersection = require('../lib/intersection')

class ObjectCollisionEngine extends Control{
    constructor(args){
        super(args)
        this.tag = 'physics'
        this.order = 0
        this.components = []
        this.playerCollider = undefined
    }

    init(){
        var colliders
        colliders = this.owner.scene.getControlsByName('objectCollider')
        var playerColliderIndex = colliders.findIndex(c => c.owner.name == 'player')
        this.playerCollider = colliders[playerColliderIndex]
        colliders.splice(playerColliderIndex, 1)
        this.components = colliders
    }

    isColliding(a, b){
        // If a is above b
        if (a[3] < b[1]) {
            return false
        }

        // If a is below b
        if (a[1] > b[3]) {
            return false
        }

        // If a is left of b
        if (a[2] < b[0]) {
            return false
        }

        // If a is right of b
        if (a[0] > b[2]) {
            return false
        }

        // Else collision
        return true
    }

    calculate(){
        if (!this.playerCollider.enabled){
            return
        }

        var playerBox
        var otherBox
        var playerPos
        var otherPos
        var playerBound = []
        var otherBound = []
        for (var i = 0; i < this.components.length; i++){
            if (!this.components[i].enabled){
                continue
            }
            playerBox = this.playerCollider.getWorldHitbox()

            otherBox = this.components[i].getWorldHitbox()

            if (this.isColliding(playerBox, otherBox)){
                this.playerCollider.onHit(this.components[i])
                this.components[i].onHit(this.playerCollider)
            }
        }
    }
}

module.exports = ObjectCollisionEngine