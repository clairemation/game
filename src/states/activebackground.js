const State = require('../classes/state')

var activeBG = new State({
  update: function(){
    // this.controls.scroller.update()
    this.controls.conditionChecker.update()
    this.controls.sprite.update()
  }
})

module.exports = activeBG