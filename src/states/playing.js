const State = require('../classes/state')

var playing = new State({
  enter: function(game, scene){
    this.assetManager.play('blop')
  }
})

module.exports = playing