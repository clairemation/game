const Scene = require('../classes/scene')
const loading = require('../states/loading')
const playing = require('../states/playing')

var level01 = new Scene({
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
})

level01.enter = function() {
  this.currentState = loading
  this.game.start()
  this.assetManager.load().then(() => this.changeState('playing'))
}


module.exports = level01