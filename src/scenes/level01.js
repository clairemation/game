const Scene = require('../classes/scene')

const loading = require('../states/loading')
const playing = require('../states/playing')

var scene01 = new Scene({
  assets: {
    sound: '../../assets/Arpent.mp3',
    bg: '../../assets/bg.png',
    blop: '../../assets/blop.wav'
  },
  states: {
    loading,
    playing
  }
})

scene01.assetManager.onLoadProgress = percent => console.log(Math.min(percent, 100))

scene01.enter = function() {
  this.currentState = loading
  this.assetManager.load().then(() => this.changeState('playing'))
}


module.exports = scene01