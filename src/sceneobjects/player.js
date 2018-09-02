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
          kind: require('../controls/advance'),
          args: {
            acceleration: 2
          }
        },

        gravity: {
          kind: require('../controls/gravity')
        },

        flap: {
          kind: require('../controls/flap')
        },

        tailManager: {
          kind: require('../controls/tail-manager')
        },

        tailSprite: {
          kind: require('../controls/sprite'),
          args: {
            tag: 'tail',
            animating: false,
            spritesheetName: 'tailSprites',
            spritesheetData: require('../spritesheet-data/tail'),
            animations: {
                Rblend: ['Rtail00', 'Rtail01', 'Rtail02', 'Rtail03', 'Rtail04', 'Rtail05', 'Rtail06', 'Rtail07', 'Rtail08'],
                Lblend: ['Ltail00', 'Ltail01', 'Ltail02', 'Ltail03', 'Ltail04', 'Ltail05', 'Ltail06', 'Ltail07', 'Ltail08']
            },
            initialAnimation: ['Rblend', true],
            layer: 2
          }
        },

        animationStateMachine: {
          kind: require('../controls/animation-state-machine'),
          args: {
            tag: 'body',
            states: require('../states/player-animation-states'),
            initialState: 'initial',
            parameters: {
              direction: 0
            },
          }
        },

        bodySprite: {
          kind: require('../controls/sprite'),
          args: {
            tag: 'body',
            spritesheetName: 'bodySprites',
            spritesheetData: require('../spritesheet-data/body'),
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

        flicker: {
          kind: require('../controls/flicker')
        },

        objectCollider: {
          kind: require('../controls/object-collider'),
          args: {
            hitbox: [20, 10, 44, 20],
            onHit: function(other){
              this.owner.changeState('dying')
              var worldHitbox = this.getWorldHitbox()
              var otherWorldHitbox = other.getWorldHitbox()
              var center = $([worldHitbox[0], worldHitbox[1]]).plusVector($([this.hitbox[2], this.hitbox[3]]).minusVector([this.hitbox[0], this.hitbox[1]]).timesScalar(0.5).$).$
              var otherCenter = $([otherWorldHitbox[0], otherWorldHitbox[1]]).plusVector($([otherWorldHitbox[2], otherWorldHitbox[3]]).minusVector([otherWorldHitbox[0], otherWorldHitbox[1]]).timesScalar(0.5).$).$
              var bounceBack = $(center).minusVector(otherCenter).unit().$
              this.owner.controls.velocity.x += bounceBack[0] * 10
              this.owner.controls.velocity.y += bounceBack[1] * 10
            }
          }
        },

        feetMapCollider: {
          kind: require('../controls/map-collider'),
          args: {
            tags: ['level01'],
            checkPoint: [28, 28],
            onHit: function(floor){
              this.owner.changeState('walking')
              this.owner.controls.flap.floorNormal = floor.normal
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
            checkPoint: [60, 10]
          }
        },

        leftChestMapCollider: {
          kind: require('../controls/map-collider'),
          args: {
            tags: ['level01'],
            checkPoint: [56, 10]
          }
        },

        velocity: {
          kind: require('../controls/velocity')
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