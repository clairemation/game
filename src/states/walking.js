const State = require('../classes/state')

var walking = new State({
  enter: function(){
    this.controls.sprite.setCurrentAnimation('walk')
  },
  update: function(){
    this.controls.altitude.update()
    this.controls.loseChecker.update()
    this.controls.sprite.update()
  },
  message: function(msg, e){
    if (msg == "keyDown"){
      this.controls.altitude.startJump()
    }
  }
})

module.exports = walking