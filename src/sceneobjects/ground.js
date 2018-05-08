const SceneObject = require('../classes/sceneobject')

var count = 0

class Ground extends SceneObject{
  constructor(args){
    var sceneObjArgs = {
      name: 'ground' + count++,
      scene: args.scene,
      tag: 'ground',

      states: {
        active: require('../states/activeGround'),
        inactive: require('../states/inactive')
      },
      initialState: 'inactive',

      controls: {

        transform: {
          kind: require('../controls/transform'),
          args: {
            position: {x: 300.0, y: 50.0}
          }
        },

        sprite: {
          kind: require('../controls/sprite'),
          args: {
            spritesheetName: 'groundSpritesheet',
            spritesheetData: require('../spritesheet-data/ground'),
            animations: {
              default: ['default'],
            },
            initialAnimation: ['default', true]
          }
        },

        scroller: {
          kind: require('../controls/scroller'),
        },

        objectPooler: {
          kind: require('../controls/objectpooler'),
          args: {
            tag: 'ground',
            originalPosition: {x: 360, y: 150}
          }
        },

        collider: {
          kind: require('../controls/collider'),
          args: {
            hitbox: [0, 0, 128, 50]
          }
        }
      }
    }
    super(sceneObjArgs)
  }
}

module.exports = Ground