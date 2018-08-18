const State = require('../classes/state')

var walking = new State({
  enter: function(){
    this.controls.sprite.setCurrentAnimation('walk')
  },
  update: function(){
    this.controls.advance.update()
    this.controls.gravity.update()
    this.controls.velocity.update()
    this.controls.loseChecker.update()
    this.controls.sprite.update()
    this.controls.cameraFollow.update()
  },
  message: function(msg, e){
    if (msg == "keyDown"){
      this.controls.flap.startJump()
    }
  }
})

module.exports = walking