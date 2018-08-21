const State = require('../classes/state')

var flying = new State({
  update: function(){
    this.controls.advance.update()
    this.controls.gravity.update()
    this.controls.velocity.update()
    this.controls.loseChecker.update()
    this.controls.animationStateMachine.update()
    this.controls.sprite.update()
    this.controls.cameraFollow.update()
  },
  message: function(msg, e){
    switch(msg){
      case('keyDown'):
        this.controls.flap.flap()
        break
      case('keyUp'):
        this.controls.flap.fall()
        break
      case('walkRight'):
        this.controls.advance.change(1)
        break
      case('walkLeft'):
        this.controls.advance.change(-1)
        break
      case('stop'):
        this.controls.advance.change(0)
    }
  }
})

module.exports = flying