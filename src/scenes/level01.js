const Scene = require('../classes/scene')
const SceneObject = require('../classes/sceneobject')
const Sprite = require('../controls/sprite')
const renderer = require('../core/renderer')
const raptorSpritesheetData = require('../spritesheet-data/raptor')

var level01 = new Scene({
  name: 'Level01',
  assets: {
    raptorSpritesheet: './assets/raptor.png',
    bg: './assets/bg.png',
    arpent: './assets/Arpent.mp3',
    light: './assets/LightInfusor.mp3',
    blop: './assets/blop.wav'
  }
})

level01.enter = function() {
  Scene.prototype.enter.call(this).then(() => {
    this.assetManager.play('blop')
  })
}

var player = new SceneObject({
  name: 'player',
  scene: level01
})

player.controls.sprite = new Sprite({
  owner: player,
  spritesheetName: 'raptorSpritesheet',
  spritesheetData: raptorSpritesheetData,
  animations: {
    stand: ['walk00'],
    walk: ['walk00', 'walk01'],
    jump: ['flap00'],
    fall: ['flap01']
  }
})

player.controls.sprite.setCurrentAnimation('walk')

player.update = function(){
  this.controls.sprite.update()
  var frameName = this.controls.sprite.currentFrame
  var frameCoords = raptorSpritesheetData.frames[frameName]
  renderer.drawImage(this.scene.assetManager.assets.raptorSpritesheet, frameCoords.x, frameCoords.y, frameCoords.w, frameCoords.h, 0, 0, frameCoords.w, frameCoords.h)
}


module.exports = level01