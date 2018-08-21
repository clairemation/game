const State = require('../classes/state')

var flying = new State({
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
        this.controls.flap.flap()
        break
      case('keyUp'):
        this.controls.flap.fall()
        break
    }
  }
})

module.exports = flying