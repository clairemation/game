const State = require('../classes/state')
const Scene = require('../classes/scene')
const SceneObject = require('../classes/sceneobject')
const Sprite = require('../controls/sprite')
const renderer = require('../core/renderer')
const Control = require('../classes/control')
const SpriteEngine = require('../controls/sprite-engine')
const Transform = require('../controls/transform')
const raptorSpritesheetData = require('../spritesheet-data/raptor')
const walking = require('../states/walking')

var level01 = new Scene({
  name: 'Level01',
  assets: {
    raptorSpritesheet: './assets/raptor.png',
    bg: './assets/bg.png',
    arpent: './assets/Arpent.mp3',
    light: './assets/LightInfusor.mp3',
    blop: './assets/blop.wav'
  },
  enter: function(){
    Scene.prototype.enter.call(this).then(() => {
      this.assetManager.play('blop')
    })
  }
})


var player = new SceneObject({
  name: 'player',
  scene: level01,

  states: {
    walking
  },
  initialState: 'walking',

  controls: {

    transform: {
      kind: Transform,
      args: {
        position: {x: 50, y: 50}
      }
    },

    sprite: {
      kind: Sprite,
      args: {
        spritesheetName: 'raptorSpritesheet',
        spritesheetData: raptorSpritesheetData,
        animations: {
          stand: ['walk00'],
          walk: ['walk00', 'walk01'],
          jump: ['flap00'],
          fall: ['flap01']
        },
        initialAnimation: ['walk', true]
      }
    }
  }
})

var systems = new SceneObject({
  name: 'systems',
  scene: level01,

  states: {
    normal: new State({
      update: function(){
        this.controls.spriteEngine.update()
      }
    })
  },
  initialState: 'normal',

  controls: {
    spriteEngine: {
      kind: SpriteEngine
    }
  }
})

module.exports = level01