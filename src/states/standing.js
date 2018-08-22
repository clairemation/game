const State = require('../classes/state')

var standing = new State({
  enter: function(){
    // this.controls.sprite.setAnimation('stand')
  },
  update: function(){
    this.controls.advance.update()
    this.controls.gravity.update()
    this.controls.velocity.update()
    this.controls.loseChecker.update()
    this.controls.bodySprite.update()
    this.controls.tailSprite.update()
    this.controls.cameraFollow.update()
  },
  message: function(msg, e){
    if (msg == "keyDown"){
      this.controls.flap.startJump()
    }
  }
})

module.exports = standing