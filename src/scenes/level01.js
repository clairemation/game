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
    background: './assets/bg.png',
    blop: './assets/blop.wav',
    screech: './assets/pusou.wav'
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
  ]
})

function flap(e){
  level01.getObjectByName('player').message('keyDown')
}

function release(e){
  level01.getObjectByName('player').message('keyUp')
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
//       kind: require('../controls/objectpooler'),
//       args: {
//         tag: 'groundLevel'
//       }
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
  name: 'post-systems',
  scene: level01,

  states: {
    normal: new State({
      update: function(){
        // this.controls.groundLevelObstaclePool.update()
        this.controls.groundPool.update()
        // this.controls.groundLevelObstaclePool.update()
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
    groundLevelObstaclePool: {
      kind: require('../controls/objectpool-engine'),
      args: {
        tag: 'groundLevel'
      }
    },
    groundPool: {
      kind: require('../controls/objectpool-engine'),
      args: {
        tag: 'ground'
      }
    },
    collisionEngine: {
      kind: require('../controls/collision-engine')
    }
  }
})

module.exports = level01