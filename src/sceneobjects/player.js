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

        animationStateMachine: {
          kind: require('../classes/state-machine-control'),
          args: {
            states: require('../states/player-animation-states'),
            initialState: 'initial',
            parameters: {
              direction: 0
            }
          }
        },

        sprite: {
          kind: require('../controls/sprite'),
          args: {
            spritesheetName: 'spritesheet',
            spritesheetData: require('../spritesheet-data/spritesheet'),
            animations: {
                Lstand: ['Lraptorstand'],
                Lwalk: ['Lraptorwalk00', 'Lraptorwalk01'],
                Ljump: ['Lraptorflap00'],
                Lfall: ['Lraptorflap01'],
                Lhurt: ['Lraptorhurt'],
                Rstand: ['Rraptorstand'],
                Rwalk: ['Rraptorwalk00', 'Rraptorwalk01'],
                Rjump: ['Rraptorflap00'],
                Rfall: ['Rraptorflap01'],
                Rhurt: ['Rraptorhurt']
            },
            initialAnimation: ['Rstand', true],
            layer: 2
          }
        },

        feetMapCollider: {
          kind: require('../controls/map-collider'),
          args: {
            tags: ['level01'],
            checkPoint: [28, 28],
            onHit: function(){
              this.owner.changeState('walking')
              this.owner.controls.animationStateMachine.setTrigger('land')
              return false
            },
            onNoCollision: function(){
              this.owner.changeState('flying')
            }
          },
        },

        rightChestMapCollider: {
          kind: require('../controls/map-collider'),
          args: {
            tags: ['level01'],
            checkPoint: [40, 16]
          }
        },

        leftChestMapCollider: {
          kind: require('../controls/map-collider'),
          args: {
            tags: ['level01'],
            checkPoint: [8, 16]
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