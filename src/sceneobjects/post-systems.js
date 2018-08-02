const SceneObject = require('../classes/sceneobject')
const State = require('../classes/state')

class PostSystems extends SceneObject{
  constructor(args){
    var sceneObjArgs = {
      name: 'post-systems',
      scene: args.scene,

      states: {
        normal: new State({
          update: function(){
            // this.controls.groundLevelObstaclePool.update()
            this.controls.groundPool.update()
            // this.controls.groundLevelObstaclePool.update()
            this.controls.collisionEngine.update()
            this.controls.renderingEngine.update()
          }
        })
      },
      initialState: 'normal',

      controls: {
        bgSpriteEngine: {
          kind: require('../controls/sprite-engine')
        },
        groundSpriteEngine: {
          kind: require('../controls/sprite-engine')
        },
        spriteEngine: {
          kind: require('../controls/sprite-engine')
        },
        renderingEngine: {
          kind: require('../controls/rendering-engine')
        },
        groundLevelObstaclePool: {
          kind: require('../controls/objectpool-engine'),
          args: {
            tag: 'groundLevel'
          }
        },
        groundPool: {
          kind: require('../controls/objectpool-engine'),
          args: {
            tag: 'ground'
          }
        },
        collisionEngine: {
          kind: require('../controls/collision-engine'),
          args: {
            tag: 'ground'
          }
        },
        camera: {
          kind: require('../controls/camera')
        }
      }
    }
    super(sceneObjArgs)
  }
}

module.exports = PostSystems