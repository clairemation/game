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
        titlescreen: './assets/titlescreen.png',
        bg: './assets/bg.png',
        arpent: './assets/Arpent.mp3',
        light: './assets/LightInfusor.mp3',
        blop: '../../assets/blop.wav'
      },
      states: {
        loading
      }
    }

    super(game, args)

    this.assetManager.onLoadProgress = percent => console.log(percent)

    this.enter = function(game) {
      this.currentState = loading
      level01.assetManager.load()
      input.addKeyDownListener(() => game.push(level01))
    }
  }
}



module.exports = TitleScreen