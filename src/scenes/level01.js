const Scene = require('../classes/scene')
const SceneObject = require('../classes/sceneobject')
const loading = require('../states/loading')
const playing = require('../states/playing')

var level01 = new Scene({
  name: 'Level01',
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
  this.assetManager.load().then(() => this.changeState('playing'))
}

var player = new SceneObject({
  name: 'player',
  scene: level01
})

player.update = () => {}


module.exports = level01