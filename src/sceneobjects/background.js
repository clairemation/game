const SceneObject = require('../classes/sceneobject')
const CameraFollow = require('../controls/camera-follow')
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
            position: {x: 320 * count, y: -240},
            width: 320,
            height: 240 * 3
          }
        },

        scroller: {
          kind: require('../controls/scroller'),
          args: {
            layer: 'background'
          }
        },

        conditionChecker: {
          kind: require('../controls/condition-checker'),
          args: {
            condition: function(){return this.owner.controls.transform.getBounds()[2] < -CameraFollow.getOffset()[0]},
            result: function(){this.owner.controls.transform.position.x += this.owner.controls.transform.width * 2}
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

      }
    }
    super(sceneObjArgs)
  }

  static reset(){
    count = -1
  }
}

module.exports = Background