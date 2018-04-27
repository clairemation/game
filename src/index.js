const Game = require('./classes/game')
const Scene = require('./classes/scene')
const AssetManager = require('./classes/assetmanager')
const Level01 = require('./scenes/level01')

var game = new Game()

var level01 = new Level01(game)

game.push(level01)
// game.start()




module.exports = {game, Game, Scene, AssetManager}