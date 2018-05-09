const SceneObject = require('../classes/sceneobject')
const State = require('../classes/state')

class PreSystems extends SceneObject{
  constructor(args){
    var sceneObjArgs = {
      name: 'post-systems',
      scene: args.scene,

      states: {
        normal: new State({
          update: function(){
            this.controls.foregroundScrollingEngine.update()
            this.controls.backgroundScrollingEngine.update()
          }
        })
      },
      initialState: 'normal',

      controls: {
        foregroundScrollingEngine: {
          kind: require('../controls/scrolling-engine'),
          args: {
            layer: 'foreground',
            multiplier: 1.0
          }
        },
        backgroundScrollingEngine: {
          kind: require('../controls/scrolling-engine'),
          args: {
            layer: 'background',
            multiplier: 0.25
          }
        }
      }
    }
    super(sceneObjArgs)
  }
}

module.exports = PreSystems