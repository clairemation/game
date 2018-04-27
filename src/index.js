const Game = require('./classes/game')
const Scene = require('./classes/scene')
const AssetManager = require('./classes/assetmanager')
const level01 = require('./scenes/level01')

var game = new Game()

game.push(level01)
game.start()




module.exports = {game, Game, Scene, AssetManager}