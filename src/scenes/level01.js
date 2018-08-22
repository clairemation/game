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
    spritesheet: './assets/raptor-2-part-sprites.png',
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
      input.addKeyUpListener(32, releaseFlap)
      input.addKeyDownListener(37, walkLeft)
      input.addKeyUpListener(37, releaseWalkLeft)
      input.addKeyDownListener(39, walkRight)
      input.addKeyUpListener(39, releaseWalkRight)
    })
  },
  exit: function(){
    input.removeKeyDownListener(32, flap)
    input.removeKeyUpListener(32, releaseFlap)
    input.removeKeyDownListener(37, walkLeft)
    input.removeKeyUpListener(37, releaseWalkLeft)
    input.removeKeyDownListener(39, walkRight)
    input.removeKeyUpListener(39, releaseWalkRight)
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

function releaseFlap(e){
  level01.getObjectByName('player').message('keyUp')
}

function walkLeft(e){
  level01.getObjectByName('player').message('walkLeft')
}

function walkRight(e){
  level01.getObjectByName('player').message('walkRight')
}

function releaseWalkLeft(e){
  level01.getObjectByName('player').message('stop')
}

function releaseWalkRight(e){
  level01.getObjectByName('player').message('stop')
}

module.exports = level01