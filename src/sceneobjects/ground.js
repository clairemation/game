const SceneObject = require('../classes/sceneobject')

var count = 0

class Ground extends SceneObject{
  constructor(args){
    var sceneObjArgs = {
      name: 'ground' + count++,
      scene: args.scene,
      tag: 'ground',
      active: true,

      states: {
        active: require('../states/activeGround'),
        inactive: require('../states/inactive')
      },
      initialState: 'active',

      controls: {

        transform: {
          kind: require('../controls/transform'),
          args: {
            position: [320 - 128 * count, 190.0],
            size: [128, 240]
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
            spawnPosition: [360, 190]
          }
        },

        collider: {
          kind: require('../controls/collider'),
          args: {
            tag: 'ground',
            hitbox: [0, 0, 128, 36],
            rays: [[0, 36, 40, 0], [40, 0, 88, 0], [88, 0, 128, 36]]
          }
        }
      }
    }
    super(sceneObjArgs)
  }

  static reset(){
    count = 0
  }
}

module.exports = Ground