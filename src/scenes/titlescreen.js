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
    input.addKeyDownListener(pushLevel)
  },

  exit: function(){
    input.removeKeyDownListener(pushLevel)
  }
})

function pushLevel(){
  titlescreen.game.replaceTop('level01')
}


module.exports = titlescreen