const State = require('../classes/state')

var walking = new State({
  enter: function(){
    this.controls.sprite.setCurrentAnimation('walk')
  },
  update: function(){
    this.controls.altitude.update()
    this.controls.advance.update()
    this.controls.loseChecker.update()
    this.controls.physics.update()
    this.controls.sprite.update()
    this.controls.cameraFollow.update()
  },
  message: function(msg, e){
    if (msg == "keyDown"){
      this.controls.altitude.startJump()
    }
  }
})

module.exports = walking