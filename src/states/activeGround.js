const State = require('../classes/state')

var active = new State({
  update: function(){
    this.controls.scroller.update()
    this.controls.objectPooler.update()
    this.controls.sprite.update()
  }
})

module.exports = active