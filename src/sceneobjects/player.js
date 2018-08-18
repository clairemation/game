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
              stand: ['raptorwalk00'],
              walk: ['raptorwalk00', 'raptorwalk01'],
              jump: ['raptorflap00'],
              fall: ['raptorflap01'],
              hurt: ['raptorhurt']
            },
            initialAnimation: ['walk', true],
            layer: 2
          }
        },

        mapCollider: {
          kind: require('../controls/map-collider'),
          args: {
            tags: ['level01'],
            checkPoint: [16, 34],
            onHit: function(other){
              // if (other.owner.tag == 'ground'){
              //     this.owner.controls.transform.moveTo(...$(collisionPoint).minusVector([this.owner.controls.transform.size[0] / 2, this.owner.controls.transform.size[1]]).$)
              //     this.owner.controls.altitude.resetFall()
              //     this.owner.changeState('walking')
              // }
            }
          },
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
              return this.owner.controls.transform.getBounds()[3] >= 400
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