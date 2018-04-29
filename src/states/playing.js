const State = require('../classes/state')

var playing = new State({
  enter: function(){
    this.assetManager.play('blop')
    this.game.start()
  },
  update: function(){
    this.controls.play.update()
  }
})

module.exports = playing