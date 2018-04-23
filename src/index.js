const Game = require('./classes/game')
const Scene = require('./classes/scene')
const AssetManager = require('./classes/assetmanager')
const scene01 = require('./levels/01/scene01')

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

var game = new Game()

Scene.push(scene01)

game.start()




module.exports = {game, Game, Scene, AssetManager}