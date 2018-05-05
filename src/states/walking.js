const State = require('../classes/state')

var walking = new State({
  update: function(){
    this.controls.altitude.update()
    this.controls.sprite.update()
  }
})

module.exports = walking