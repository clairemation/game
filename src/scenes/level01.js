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
    spritesheet: './assets/raptor-sprites.png',
    groundSpritesheet: './assets/ground.png',
    background: './assets/bg2.png',
    blop: './assets/blop.wav',
    screech: './assets/pusou.wav',
    groundTile: './assets/ground-tile.png',
    groundAtlas: './assets/ground-atlas.png'
  },
  tileMapSrc: './assets/level01.png',
  tileMapKey: require('../maps/level01mapkey'),
  enter: function(){
    Scene.prototype.enter.call(this).then(() => {
      this.assetManager.play('blop')
      input.addKeyDownListener(32, flap)
      input.addKeyUpListener(32, release)
    })
  },
  exit: function(){
    input.removeKeyDownListener(32, flap)
    input.removeKeyUpListener('32', release)
  },
  objects: [
    require('../sceneobjects/pre-systems'),
    // require('../sceneobjects/background'),
    // require('../sceneobjects/background'),
    // require('../sceneobjects/ground'),
    // require('../sceneobjects/ground'),
    // require('../sceneobjects/ground'),
    // require('../sceneobjects/ground'),
    // require('../sceneobjects/ground'),
    // require('../sceneobjects/ground'),
    // require('../sceneobjects/ground'),
    require('../sceneobjects/player'),
    // require('../sceneobjects/protoceratops'),
    // require('../sceneobjects/protoceratops'),
    require('../sceneobjects/post-systems')
  ]
})

function flap(e){
  level01.getObjectByName('player').message('keyDown')
}

function release(e){
  level01.getObjectByName('player').message('keyUp')
}

function walkLeft(e){
  level01.getObjectByName('player').message('walkLeft')
}

function walkRight(e){
  level01.getObjectByName('player').message('walkRight')
}

module.exports = level01