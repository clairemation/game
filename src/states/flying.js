const State = require('../classes/state')

var flying = new State({
  update: function(){
    this.controls.advance.update()
    this.controls.velocity.update()
    this.controls.physics.update()
    this.controls.loseChecker.update()
    this.controls.sprite.update()
    this.controls.cameraFollow.update()
  },
  message: function(msg, e){
    if (msg == 'keyDown'){
      this.controls.velocity.flap()
    } else if (msg == 'keyUp'){
      this.controls.velocity.fall()
    }
  }
})

module.exports = flying