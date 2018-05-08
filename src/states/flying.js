const State = require('../classes/state')

var flying = new State({
  update: function(){
    this.controls.altitude.update()
    this.controls.loseChecker.update()
    this.controls.sprite.update()
  },
  message: function(msg, e){
    if (msg == "keyDown"){
      this.controls.altitude.flap()
    }
  }
})

module.exports = flying