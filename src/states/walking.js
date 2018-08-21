const State = require('../classes/state')

var walking = new State({
  enter: function(){
    this.controls.sprite.setCurrentAnimation('walk')
  },
  update: function(){
    this.controls.advance.update()
    this.controls.gravity.update()
    // this.controls.friction.update()
    this.controls.velocity.update()
    this.controls.loseChecker.update()
    this.controls.sprite.update()
    this.controls.cameraFollow.update()
  },
  message: function(msg, e){
    switch(msg){
      case('keyDown'):
        this.controls.flap.startJump()
        break
      case('walkRight'):
        this.controls.advance.direction = 1
        break
      case('walkLeft'):
        this.controls.advance.direction = -1
        break
      case('stop'):
        this.controls.advance.direction = 0
    }
  }
})

module.exports = walking