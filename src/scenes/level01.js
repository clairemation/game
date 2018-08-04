const State = require('../classes/state')
const Scene = require('../classes/scene')
const SceneObject = require('../classes/sceneobject')
const Sprite = require('../controls/sprite')
const renderer = require('../core/renderer')
const input = require('../core/input')
const Control = require('../classes/control')
const SpriteEngine = require('../controls/sprite-engine')
const Transform = require('../controls/transform')
const raptorSpritesheetData = require('../spritesheet-data/raptor')
const walking = require('../states/walking')
const Player = require('../sceneobjects/player')

var level01 = new Scene({
  name: 'Level01',
  assets: {
    spritesheet: './assets/spritesheet.png',
    groundSpritesheet: './assets/ground.png',
    background: './assets/bg2.png',
    blop: './assets/blop.wav',
    screech: './assets/pusou.wav',
    groundTile: './assets/ground-tile.png'
  },
  enter: function(){
    Scene.prototype.enter.call(this).then(() => {
      this.assetManager.play('blop')
      input.addKeyDownListener(flap)
      input.addKeyUpListener(release)
    })
  },
  exit: function(){
    input.removeKeyDownListener(flap)
    input.removeKeyUpListener(release)
  },
  objects: [
    require('../sceneobjects/pre-systems'),
    require('../sceneobjects/background'),
    require('../sceneobjects/background'),
    require('../sceneobjects/ground'),
    require('../sceneobjects/ground'),
    require('../sceneobjects/ground'),
    require('../sceneobjects/ground'),
    require('../sceneobjects/ground'),
    require('../sceneobjects/ground'),
    require('../sceneobjects/ground'),
    require('../sceneobjects/player'),
    require('../sceneobjects/protoceratops'),
    require('../sceneobjects/protoceratops'),
    require('../sceneobjects/post-systems')
  ]
})

function flap(e){
  level01.getObjectByName('player').message('keyDown')
}

function release(e){
  level01.getObjectByName('player').message('keyUp')
}

module.exports = level01