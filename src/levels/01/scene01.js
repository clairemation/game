const Scene = require('../../classes/scene')

var scene01 = new Scene({
  assetList: {
    sound: '../../../assets/Arpent.mp3',
    bg: '../../../assets/bg.png',
    blop: '../../../assets/blop.wav'
  }
})

scene01.assetManager.onLoadIncrement = percent => console.log(Math.min(percent, 100))

scene01.enter = () => {
  console.log("Enter scene 01")
  window.a = scene01.assetManager.load()
  window.a.then(() => console.log("asdf")).catch(() => console.log("error"))
}

module.exports = scene01