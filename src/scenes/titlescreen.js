const Scene = require('../classes/scene')
const renderer = require('../core/renderer')
const input = require('../core/input')

var titlescreen = new Scene({
  name: 'TitleScreen',
  assets: {
    titlescreen: './assets/titlescreen.png'
  },

  enter: function(){
    this.game.stop()
    this.assetManager.load().then(() => renderer.drawImage(this.assetManager.assets.titlescreen, 0, 0))
    this.game.scenes.level01.assetManager.load()
    input.addKeyDownListener(32, pushLevel)
    document.addEventListener('touchstart', pushLevel)
  },

  exit: function(){
    input.removeKeyDownListener(32, pushLevel)
    document.removeEventListener('touchstart', pushLevel)
  }
})

function pushLevel(){
  titlescreen.game.replaceTop('level01')
}

function echoTouch(e){
  console.log(e)
}


module.exports = titlescreen