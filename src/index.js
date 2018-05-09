const Game = require('./classes/game')
const Scene = require('./classes/scene')
const AssetManager = require('./classes/assetmanager')

const titlescreen = require('./scenes/titlescreen')
const level01 = require('./scenes/level01')

var game = new Game({
  scenes: {
    titlescreen,
    level01
  }
})

game.start()
game.push('titlescreen')




module.exports = {game, Game, Scene, AssetManager}