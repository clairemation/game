const State = require('../classes/state')

var dying = new State({
  enter: function(){
    // this.controls.sprite.setAnimation('hurt')
    this.scene.assetManager.play('screech')
    this.controls.objectCollider.enabled = false
    loop = requestAnimationFrame(flicker.bind(this))

    setTimeout((function(){
      cancelAnimationFrame(loop)
      this.controls.flicker.makeVisible()
      this.controls.objectCollider.enabled = true
    }).bind(this), 1000)
  },

  // Doesn't really matter since it never gets called
  update: function(){
    this.controls.gravity.update()
    this.controls.velocity.update()
    this.controls.flicker.update()
    this.controls.bodySprite.update()
    this.controls.tailSprite.update()
    this.controls.cameraFollow.update()
  }
})

var loop
function flicker(){
  loop = requestAnimationFrame(flicker.bind(this))
  this.controls.flicker.update.call(this.controls.flicker)
  this.controls.velocity.x = Math.min(Math.max(this.controls.velocity.x, -3), 3)
}

module.exports = dying