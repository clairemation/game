const Stack = require('./lib/stack')

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;