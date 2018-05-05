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
    raptorSpritesheet: './assets/raptor.png',
    bg: './assets/bg.png',
    arpent: './assets/Arpent.mp3',
    light: './assets/LightInfusor.mp3',
    blop: './assets/blop.wav'
  },
  enter: function(){
    Scene.prototype.enter.call(this).then(() => {
      this.assetManager.play('blop')
      input.addKeyDownListener(flap)
    })
  },
  exit: function(){
    input.removeKeyDownListener(flap)
  },
  objects: [
    require('../sceneobjects/player')
  ]
})

function flap(e){
  var player = level01.objects[level01.objectIndices['player']]
  player.controls.altitude.startJump()
}

// new SceneObject({
//   name: 'obstacle01',
//   scene: level01,

//   states: {
//     active: new State({
//       update: function(){
//         this.controls.scroller.update()
//         this.controls.objectPooler.update()
//         this.controls.sprite.update()
//       }
//     }),
//     inactive: new State({
//       update: function(){}
//     })
//   },
//   initialState: 'inactive',

//   controls: {

//     transform: {
//       kind: Transform,
//       args: {
//         position: {x: 300.0, y: 50.0}
//       }
//     },

//     sprite: {
//       kind: Sprite,
//       args: {
//         spritesheetName: 'raptorSpritesheet',
//         spritesheetData: raptorSpritesheetData,
//         animations: {
//           stand: ['walk00'],
//           walk: ['walk00', 'walk01'],
//           jump: ['flap00'],
//           fall: ['flap01']
//         },
//         initialAnimation: ['walk', true]
//       }
//     },

//     scroller: {
//       kind: require('../controls/scroller'),
//     },

//     objectPooler: {
//       kind: require('../controls/objectpooler')
//     },

//     collider: {
//       kind: require('../controls/collider'),
//       args: {
//         hitbox: [0, 0, 40, 40]
//       }
//     }
//   }
// })

new SceneObject({
  name: 'systems',
  scene: level01,

  states: {
    normal: new State({
      update: function(){
        this.controls.obstaclePoolEngine.update()
        this.controls.collisionEngine.update()
        this.controls.spriteEngine.update()
      }
    })
  },
  initialState: 'normal',

  controls: {
    spriteEngine: {
      kind: SpriteEngine
    },
    obstaclePoolEngine: {
      kind: require('../controls/objectpool-engine')
    },
    collisionEngine: {
      kind: require('../controls/collision-engine')
    }
  }
})

module.exports = level01