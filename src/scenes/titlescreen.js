const Scene = require('../classes/scene')
const loading = require('../states/loading')
const playing = require('../states/playing')
const renderer = require('../core/renderer')
const input = require('../core/input')
const Level01 = require('../scenes/level01')

var level01 = new Level01()

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

    this.enter = function(game) {
      this.currentState = loading
      this.assetManager.load().then(() => {
        renderer.drawImage(this.assetManager.assets.titlescreen, 0, 0)
        input.addKeyDownListener(() => game.replaceTop(level01))

      })
    }
  }
}



module.exports = TitleScreen