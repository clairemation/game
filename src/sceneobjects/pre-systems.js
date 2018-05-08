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
          }
        })
      },
      initialState: 'normal',

      controls: {
        foregroundScrollingEngine: {
          kind: require('../controls/scrolling-engine'),
          args: {
            tag: 'foreground'
          }
        }
      }
    }
    super(sceneObjArgs)
  }
}

module.exports = PreSystems