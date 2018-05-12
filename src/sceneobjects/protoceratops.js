const SceneObject = require('../classes/sceneobject')

var count = 0

class Protoceratops extends SceneObject{
  constructor(args){
    var sceneObjArgs = {
      name: 'protoceratops' + count++,
      scene: args.scene,
      tag: 'protoceratops',

      states: {
        active: require('../states/activeGround'),
        inactive: require('../states/inactive')
      },
      initialState: 'inactive',

      controls: {

        transform: {
          kind: require('../controls/transform'),
          args: {
            position: [0, 0],
            size: [48, 34]
          }
        },

        sprite: {
          kind: require('../controls/sprite'),
          args: {
            spritesheetName: 'spritesheet',
            spritesheetData: require('../spritesheet-data/spritesheet'),
            animations: {
              default: ['proto'],
            },
            initialAnimation: ['default', true]
          }
        },

        scroller: {
          kind: require('../controls/scroller'),
          args: {
            layer: 'foreground'
          }
        },

        objectPooler: {
          kind: require('../controls/objectpooler'),
          args: {
            tag: 'groundLevel',
            spawnPosition: [360, 166]
          }
        },

        collider: {
          kind: require('../controls/collider'),
          args: {
            hitbox: [0, 20, 48, 50],
            onHit: () => console.log('asdf')
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

module.exports = Protoceratops