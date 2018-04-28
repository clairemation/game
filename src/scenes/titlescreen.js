const Scene = require('../classes/scene')
const loading = require('../states/loading')
const playing = require('../states/playing')
const renderer = require('../core/renderer')
const input = require('../core/input')

class TitleScreen extends Scene{
  constructor(game){
    var args = {
      assets: {
        titlescreen: './assets/titlescreen.png'
      },
      states: {
        loading
      }
    }

    super(game, args)

    this.assetManager.onLoadProgress = percent => console.log(percent)

    this.enter = function(game) {
      this.currentState = loading

      game.scenes.level01.assetManager.load()
      input.addKeyDownListener(() => game.push('level01'))
    }
  }
}



module.exports = TitleScreen