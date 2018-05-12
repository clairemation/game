const SceneObject = require('../classes/sceneobject')
const Camera = require('../controls/camera')
const Game = require('../classes/game')

var count = -1

class Background extends SceneObject{
  constructor(args){
    var sceneObjArgs = {
      name: 'background' + (++count),
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

        conditionChecker: {
          kind: require('../controls/condition-checker'),
          args: {
            condition: function(){return this.owner.controls.transform.getBounds()[2] < -Camera.getOffset()[0]},
            result: function(){this.owner.controls.transform.position.x += this.owner.controls.transform.size[0] * 2}
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
            initialAnimation: ['default', true]
          }
        },

        parallax: {
          kind: require('../controls/parallax')
        }
      }
    }
    super(sceneObjArgs)
  }

  static reset(){
    count = -1
  }
}

module.exports = Background