const State = require('../classes/state')

var walking = new State({
  update: function(){
    this.controls.sprite.update()
  }
})

module.exports = walking