const {canvasID} = require('../../settings')

const canvas = document.getElementById(canvasID)
const ctx = canvas.getContext('2d')

ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

module.exports = ctx