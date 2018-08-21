const SceneObject = require('../classes/sceneobject')
const Game = require('../classes/game')
const $ = require('../lib/coolgebra')

class Player extends SceneObject{
  constructor(args){
    var sceneObjArgs = {
      name: 'player',
      scene: args.scene,
      active: true,

      states: {
        walking: require('../states/walking'),
        flying: require('../states/flying'),
        dying: require('../states/dying')
      },
      initialState: 'flying',

      controls: {

        transform: {
          kind: require('../controls/transform'),
          args: {
            position: [100.0, 200.0],
            size: [48, 34]
          }
        },

        advance: {
          kind: require('../controls/scroller'),
          args: {
            multiplier: 1.0
          }
        },

        gravity: {
          kind: require('../controls/gravity')
        },

        flap: {
          kind: require('../controls/flap')
        },

        sprite: {
          kind: require('../controls/sprite'),
          args: {
            spritesheetName: 'spritesheet',
            spritesheetData: require('../spritesheet-data/spritesheet'),
            animations: {
              false: {
                stand: ['Lraptorwalk00'],
                walk: ['Lraptorwalk00', 'Lraptorwalk01'],
                jump: ['Lraptorflap00'],
                fall: ['Lraptorflap01'],
                hurt: ['Lraptorhurt']
              },
              true: {
                stand: ['Rraptorwalk00'],
                walk: ['Rraptorwalk00', 'Rraptorwalk01'],
                jump: ['Rraptorflap00'],
                fall: ['Rraptorflap01'],
                hurt: ['Rraptorhurt']
              }
            },
            initialAnimation: ['walk', true],
            layer: 2
          }
        },

        feetMapCollider: {
          kind: require('../controls/map-collider'),
          args: {
            tags: ['level01'],
            checkPoint: [24, 34],
            onHit: function(){
              this.owner.changeState('walking')
            },
            onNoCollision: function(){
              this.owner.changeState('flying')
            }
          },
        },

        chestMapCollider: {
          kind: require('../controls/map-collider'),
          args: {
            tags: ['level01'],
            checkPoint: [48, 16]
          }
        },

        velocity: {
          kind: require('../controls/velocity')
        },

        physics: {
          kind: require('../controls/physics')
        },

        loseChecker: {
          kind: require('../controls/condition-checker'),
          args: {
            condition: function(){
              return this.owner.controls.transform.getBounds()[3] >= 800
            },
            result: function(){
              this.owner.changeState('dying')
            }
          }
        },

        cameraFollow: {
          kind: require('../controls/camera-follow')
        }
      }
    }

    super(sceneObjArgs)
  }
}

module.exports = Player