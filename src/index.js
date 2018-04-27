const Game = require('./classes/game')
const Scene = require('./classes/scene')
const AssetManager = require('./classes/assetmanager')
const Level01 = require('./scenes/level01')
const TitleScreen = require('./scenes/titlescreen')

var game = new Game()

var level01 = new Level01(game)
var titlescreen = new TitleScreen(game)

game.push(titlescreen)
game.start()




module.exports = {game, Game, Scene, AssetManager}