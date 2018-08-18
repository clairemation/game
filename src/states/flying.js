const State = require('../classes/state')

var flying = new State({
  update: function(){
    this.controls.advance.update()
    this.controls.altitude.update()
    this.controls.physics.update()
    this.controls.loseChecker.update()
    this.controls.sprite.update()
    this.controls.cameraFollow.update()
  },
  message: function(msg, e){
    if (msg == 'keyDown'){
      this.controls.altitude.flap()
    } else if (msg == 'keyUp'){
      this.controls.altitude.fall()
    }
  }
})

module.exports = flying