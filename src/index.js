const Game = require('./classes/game')
const Scene = require('./classes/scene')
const AssetManager = require('./classes/assetmanager')

const TitleScreen = require('./scenes/titlescreen')
const Level01 = require('./scenes/level01')

var game = new Game({
  scenes: {
    titlescreen: new TitleScreen(),
    level01: new Level01()
  }
})

game.push('titlescreen')
game.start()




module.exports = {game, Game, Scene, AssetManager}