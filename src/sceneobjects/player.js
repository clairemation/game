const SceneObject = require('../classes/sceneobject')

class Player extends SceneObject{
  constructor(args){
    var sceneObjArgs = {
      name: 'player',
      scene: args.scene,

      states: {
        walking: require('../states/walking'),
        flying: require('../states/flying')
      },
      initialState: 'walking',

      controls: {

        transform: {
          kind: require('../controls/transform'),
          args: {
            position: {x: 50.0, y: 50.0}
          }
        },

        sprite: {
          kind: require('../controls/sprite'),
          args: {
            spritesheetName: 'raptorSpritesheet',
            spritesheetData: require('../spritesheet-data/raptor'),
            animations: {
              stand: ['walk00'],
              walk: ['walk00', 'walk01'],
              jump: ['flap00'],
              fall: ['flap01']
            },
            initialAnimation: ['walk', true]
          }
        },

        collider: {
          kind: require('../controls/collider'),
          args: {
            hitbox: [0, 0, 30, 30]
          }
        },

        altitude: {
          kind: require('../controls/altitude')
        }
      }
    }

    super(sceneObjArgs)
  }
}

module.exports = Player