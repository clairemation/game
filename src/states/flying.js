const State = require('../classes/state')

var flying = new State({
  update: function(){
    // this.controls.advance.update()
    this.controls.gravity.update()
    this.controls.velocity.update()
    this.controls.loseChecker.update()
    this.controls.sprite.update()
    this.controls.cameraFollow.update()
  },
  message: function(msg, e){
    if (msg == 'keyDown'){
      this.controls.flap.flap()
    } else if (msg == 'keyUp'){
      this.controls.flap.fall()
    }
  }
})

module.exports = flying