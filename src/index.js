const Game = require('./classes/game')
const Scene = require('./classes/scene')
const AssetManager = require('./classes/assetmanager')

// const titlescreen = require('./scenes/titlescreen')
const level01 = require('./scenes/level01')

var game = new Game({
  scenes: {
    level01
  }
})

game.start()
game.push('level01')

module.exports = {$: require('./lib/coolgebra')}