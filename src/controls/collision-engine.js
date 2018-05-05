const Control = require('../classes/control')

class CollisionEngine extends Control{
    constructor(args){
        super(args)
        this.components = []
        this.playerCollider = undefined
    }

    init(){
        var colliders
        colliders = this.owner.scene.getControlsByName('collider')
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

    update(){
        var playerBox
        var otherBox
        var playerPos
        var otherPos
        var playerBound = []
        var otherBound = []
        for (var i = 0; i < this.components.length; i++){
            if (this.components[i].owner.currentStateName == 'inactive'){
                continue
            }
            playerBox = this.playerCollider.hitbox
            playerPos = this.playerCollider.owner.controls.transform.position
            playerBound[0] = playerBox[0] + playerPos.x
            playerBound[2] = playerBox[2] + playerPos.x
            playerBound[1] = playerBox[1] + playerPos.y
            playerBound[3] = playerBox[3] + playerPos.y


            otherBox = this.components[i].hitbox
            otherPos = this.components[i].owner.controls.transform.position
            otherBound[0] = otherBox[0] + otherPos.x
            otherBound[2] = otherBox[2] + otherPos.x
            otherBound[1] = otherBox[1] + otherPos.y
            otherBound[3] = otherBox[3] + otherPos.y

            if (this.isColliding(playerBound, otherBound)){
                this.playerCollider.onHit(this.components[i])
                this.components[i].onHit()
            }
        }
    }
}

module.exports = CollisionEngine