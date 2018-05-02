const Scene = require('../classes/scene')
const SceneObject = require('../classes/sceneobject')
const Sprite = require('../controls/sprite')
const renderer = require('../core/renderer')
const Control = require('../classes/control')
const SpriteEngine = require('../controls/sprite-engine')
const Transform = require('../controls/transform')
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

player.controls.transform = new Transform({
  owner: player,
  position: {x: 50.0, y: 50.0}
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
  this.controls.transform.moveRight(0.25)
  this.controls.sprite.update()
}

var systems = new SceneObject({
  name: 'systems',
  scene: level01
})

systems.update = function(){
  this.controls.spriteEngine.update()
}

systems.controls.spriteEngine = new SpriteEngine({
  owner: systems
})

module.exports = level01