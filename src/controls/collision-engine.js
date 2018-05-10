const Control = require('../classes/control')
const $ = require('../lib/coolgebra')
const intersection = require('../lib/intersection')

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

    isCollidingBroadPhase(a, b){
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

    narrowPhaseCollision(collider){
        var playerRay = this.getPlayerRay()
        var inter = null
        for (let i = 0; i < collider.rays.length; i++){
            inter = intersection(...playerRay, ...($(collider.rays[i]).plusVector([collider.owner.controls.transform.position.x, collider.owner.controls.transform.position.y, collider.owner.controls.transform.position.x, collider.owner.controls.transform.position.y]).$))
            if (inter){
                return inter
            }
        }
        return null
    }

    getPlayerRay(){
        var offset = [this.playerCollider.owner.controls.transform.width / 2, this.playerCollider.owner.controls.transform.height]
        var pivot = $([this.playerCollider.owner.controls.transform.position.x, this.playerCollider.owner.controls.transform.position.y]).plusVector(offset).$
        var upper = [this.playerCollider.owner.controls.transform.prevPosition.x + offset[0], 0]
        return [...upper, ...pivot]

    }

    getPivot(pos){
        return $(pos).plusVector([this.playerCollider.owner.controls.transform.width / 2, this.playerCollider.owner.controls.transform.height / 2]).$
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

            // if (this.isCollidingBroadPhase(playerBound, otherBound)){
                var collisionPoint = this.narrowPhaseCollision(this.components[i])
                if (collisionPoint){
                    this.playerCollider.onHit(this.components[i], collisionPoint)
                    this.components[i].onHit()
                }
            // }
        }
    }
}

module.exports = CollisionEngine