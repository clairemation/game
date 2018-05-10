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
      initialState: 'active',

      controls: {

        transform: {
          kind: require('../controls/transform'),
          args: {
            position: {x: 320 - 128 * count, y: 200.0},
            width: 128,
            height: 50
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
          args: {
            tag: 'foreground'
          }
        },

        objectPooler: {
          kind: require('../controls/objectpooler'),
          args: {
            tag: 'ground',
            spawnPosition: {x: 360, y: 200}
          }
        },

        collider: {
          kind: require('../controls/collider'),
          args: {
            hitbox: [0, 0, 128, 36],
            rays: [[0, 36, 40, 0], [40, 0, 88, 0], [88, 0, 128, 36]]
          }
        }
      }
    }
    super(sceneObjArgs)
  }
}

module.exports = Ground