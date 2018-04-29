const Scene = require('../classes/scene')
const loading = require('../states/loading')
const playing = require('../states/playing')
const renderer = require('../core/renderer')
const input = require('../core/input')

var titlescreen = new Scene({
  assets: {
    titlescreen: './assets/titlescreen.png'
  },
  states: {
    loading
  }
})

titlescreen.enter = function() {
  this.game.stop()
  this.currentState = loading
  this.assetManager.load().then(() => renderer.drawImage(this.assetManager.assets.titlescreen, 0, 0))
  this.game.scenes.level01.assetManager.load()
  input.addKeyDownListener(() => this.game.push('level01'))
}



module.exports = titlescreen