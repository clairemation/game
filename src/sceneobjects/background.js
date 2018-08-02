const SceneObject = require('../classes/sceneobject')
const Camera = require('../controls/camera')
const Game = require('../classes/game')

var count = 0
const width = 320
const height = 240

class Background extends SceneObject{
  constructor(args){
    var sceneObjArgs = {
      name: 'background' + (count),
      scene: args.scene,
      tag: 'background',

      states: {
        active: require('../states/activebackground')
      },
      initialState: 'active',

      controls: {

        transform: {
          kind: require('../controls/transform'),
          args: {
            position: [320 * count, -230],
            size: [320, 240 * 3]
          }
        },

        sprite: {
          kind: require('../controls/sprite'),
          args: {
            spritesheetName: 'background',
            spritesheetData: require('../spritesheet-data/background'),
            animations: {
              default: ['default'],
            },
            initialAnimation: ['default', true],
            layer: 0
          }
        },

        parallax: {
          kind: require('../controls/parallax'),
          args: {
            rowNumber: count++,
            offset: [0, -180]
          }
        }
      }
    }
    super(sceneObjArgs)
  }

  static getWidth(){
    return width
  }

  static getHeight(){
    return height
  }

  static reset(){
    count = 0
  }
}

module.exports = Background