const Control = require('../classes/control')
const $ = require('../lib/coolgebra')
const intersection = require('../lib/intersection')

class CollisionEngine extends Control{
    constructor(args){
        super(args)
        this.tag = args.tag
        this.components = []
        this.playerCollider = undefined
    }

    init(){
        var colliders
        colliders = this.owner.scene.getControlsByName('collider').filter(c => c.tags.includes(this.tag))
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
            inter = intersection(...playerRay, ...$(collider.rays[i]).plusVector([...collider.owner.controls.transform.position, ...collider.owner.controls.transform.position]).$)
            if (inter){
                var playerPoint = [playerRay[2], playerRay[3]]
                var resistancePoint = intersection(...collider.rays[i], ...$(playerPoint).plusVector($(collider.normals[i]).timesScalar(10).$).$, ...playerPoint)
                return inter
            }
        }
        return null
    }

    getPlayerRay(){
        var offset = [this.playerCollider.owner.controls.transform.size[0] / 2, this.playerCollider.owner.controls.transform.size[1]]
        var pivot = $(this.playerCollider.owner.controls.transform.position).plusVector(offset).$
        var prevPivot = [pivot[0], 0]
        return [...prevPivot, ...pivot]
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
            playerBound[0] = playerBox[0] + playerPos[0]
            playerBound[2] = playerBox[2] + playerPos[0]
            playerBound[1] = playerBox[1] + playerPos[1]
            playerBound[3] = playerBox[3] + playerPos[1]


            otherBox = this.components[i].hitbox
            otherPos = this.components[i].owner.controls.transform.position
            otherBound[0] = otherBox[0] + otherPos[0]
            otherBound[2] = otherBox[2] + otherPos[0]
            otherBound[1] = otherBox[1] + otherPos[1]
            otherBound[3] = otherBox[3] + otherPos[1]

            if (this.isCollidingBroadPhase(playerBound, otherBound)){
                var collisionPoint = this.narrowPhaseCollision(this.components[i])
                if (collisionPoint){
                    this.playerCollider.onHit(this.components[i], collisionPoint)
                    this.components[i].onHit(this.playerCollider, collisionPoint)
                }
            }
        }
    }
}

module.exports = CollisionEngine