const SceneObject = require('../classes/sceneobject')
const Game = require('../classes/game')

class Player extends SceneObject{
  constructor(args){
    var sceneObjArgs = {
      name: 'player',
      scene: args.scene,

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
            position: {x: 50.0, y: 100.0},
            width: 48,
            height: 48
          }
        },

        sprite: {
          kind: require('../controls/sprite'),
          args: {
            spritesheetName: 'spritesheet',
            spritesheetData: require('../spritesheet-data/spritesheet'),
            animations: {
              stand: ['raptorwalk00'],
              walk: ['raptorwalk00', 'raptorwalk01'],
              fall: ['raptorflap00'],
              jump: ['raptorflap01'],
              hurt: ['raptorhurt']
            },
            initialAnimation: ['walk', true]
          }
        },

        collider: {
          kind: require('../controls/collider'),
          args: {
            hitbox: [0, 0, 48, 48],
            onHit: function(other){
              if (other.owner.tag == 'ground'){
                if (this.owner.controls.transform.prevPosition.y + this.owner.controls.transform.height <= other.owner.controls.transform.position.y){
                  this.owner.controls.transform.position.y = other.owner.controls.transform.position.y - this.owner.controls.transform.height
                  this.owner.controls.altitude.resetFall()
                  this.owner.changeState('walking')
                }
              }
            }
          },
        },

        altitude: {
          kind: require('../controls/altitude')
        },

        loseChecker: {
          kind: require('../controls/condition-checker'),
          args: {
            condition: function(){
              return this.owner.controls.transform.getBounds()[3] > Game.getScreenHeight()
            },
            result: function(){
              this.owner.changeState('dying')
              console.log("LOSE")
            }
          }
        }
      }
    }

    super(sceneObjArgs)
  }
}

module.exports = Player