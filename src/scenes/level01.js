const Scene = require('../classes/scene')
const loading = require('../states/loading')
const playing = require('../states/playing')

class Level01 extends Scene{
  constructor(game){
    var args = {
      assets: {
        bg: './assets/bg.png',
        arpent: './assets/Arpent.mp3',
        light: './assets/LightInfusor.mp3',
        blop: '../../assets/blop.wav'
      },
      states: {
        loading,
        playing
      }
    }
    super(game, args)

    this.assetManager.onLoadProgress = percent => console.log(Math.min(percent, 100))
    this.enter = function() {
      this.currentState = loading
      this.assetManager.load().then(() => this.changeState(game, 'playing'))
    }
  }
}



module.exports = Level01