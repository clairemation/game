const State = require('../classes/state')

var activeBG = new State({
  update: function(){
    this.controls.sprite.update()
  }
})

module.exports = activeBG