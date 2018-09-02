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

var player

var level01 = new Scene({
  name: 'Level01',
  assets: {
    bodySprites: './assets/body-sprites.png',
    tailSprites: './assets/tail-sprites.png',
    protoSprites: './assets/proto-sprites.png',
    groundSpritesheet: './assets/ground.png',
    background: './assets/bg3.png',
    blop: './assets/blop.wav',
    screech: './assets/pusou.wav',
    groundTile: './assets/ground-tile.png',
    groundAtlas: './assets/sand-terrain.png'
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

      document.addEventListener('touchstart', tap)
      document.addEventListener('touchend', releaseTap)
      document.addEventListener('touchstart', touchStart)
      document.addEventListener('touchmove', touchMove)
      document.addEventListener('touchend', touchEnd)

      player = this.getObjectByName('player')

      // setTimeout(() => player.controls.advance.change(1), 500)
    })
  },
  exit: function(){
    input.removeKeyDownListener(32, flap)
    input.removeKeyUpListener(32, releaseFlap)
    input.removeKeyDownListener(37, walkLeft)
    input.removeKeyUpListener(37, releaseWalkLeft)
    input.removeKeyDownListener(39, walkRight)
    input.removeKeyUpListener(39, releaseWalkRight)

    document.removeEventListener('touchstart', tap)
    document.removeEventListener('touchend', releaseTap)
    document.removeEventListener('touchstart', touchStart)
    document.removeEventListener('touchmove', touchMove)
    document.removeEventListener('touchend', touchEnd)
  },
  objects: [
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
    require('../sceneobjects/protoceratops'),
    // require('../sceneobjects/protoceratops'),
    require('../sceneobjects/post-systems')
  ]
})

function flap(e){
  player.message('keyDown')
}

function releaseFlap(e){
  player.message('keyUp')
}

function walkLeft(e){
  player.message('walkLeft')
}

function walkRight(e){
  player.message('walkRight')
}

function releaseWalkLeft(e){
  player.message('stop')
}

function releaseWalkRight(e){
  player.message('stop')
}


var isPressed = false

function tap(e){
  if (isPressed){
    return
  }
  for (var i = 0; i < e.changedTouches.length; i++){
    if (e.changedTouches[i].pageX > window.innerWidth / 2){
      flap(e)
      isPressed = true
      break
    }
  }
}

function releaseTap(e){
  if (!isPressed){
    return
  }
  for (var i = 0; i < e.changedTouches.length; i++){
    if (e.changedTouches[i].pageX > window.innerWidth / 2){
      releaseFlap(e)
      isPressed = false
      break
    }
  }
}

var lastX = 0

function touchStart(e){
  for (var i = 0; i < e.changedTouches.length; i++){
    if (e.changedTouches[i].pageX < window.innerWidth / 2){
      lastX = e.changedTouches[i].pageX
      break
    }
  }
}

function touchMove(e){
  for (var i = 0; i < e.changedTouches.length; i++){
    if (e.changedTouches[i].pageX < window.innerWidth / 2){
      if (e.changedTouches[i].pageX < lastX){
        walkLeft(e)
      } else {
        walkRight(e)
      }
      lastX = e.changedTouches[i].pageX
      break
    }
  }
}

function touchEnd(e){
  for (var i = 0; i < e.changedTouches.length; i++){
    if (e.changedTouches[i].pageX < window.innerWidth / 2){
      releaseWalkLeft(e)
      break
    }
  }
}

module.exports = level01