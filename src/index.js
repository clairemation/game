const Game = require('./classes/game')
const Scene = require('./classes/scene')
const AssetManager = require('./classes/assetmanager')

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

module.exports = {Game, Scene, AssetManager}