const State = require('../classes/state')

var dying = new State({
  enter: function(){
    // this.controls.sprite.setCurrentAnimation('hurt')
    this.scene.assetManager.play('screech')
    setTimeout(() => this.getGame().replaceTop('titlescreen'), 1000)
  },
  update: function(){
    this.controls.advance.update()
    this.controls.gravity.update()
    this.controls.velocity.update()
    this.controls.bodySprite.update()
    this.controls.tailSprite.update()
    // this.controls.cameraFollow.update()
  }
})

module.exports = dying