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
            // this.controls.collisionEngine.update()
            this.controls.physicsEngine.update()
            this.controls.camera.update()
            this.controls.renderingEngine.update()
          }
        })
      },
      initialState: 'normal',

      controls: {
        background: {
          kind: require('../controls/horizontal-infinite-plane'),
          args: {
            rate: 7.5,
            spritesheetData: require('../spritesheet-data/background'),
            offset: [0, 200],
            layer: 0
          }
        },
        mapRenderer: {
          kind: require('../controls/map-renderer'),
          args: {
            tileMap: require('../maps/level01'),
            layer: 1
          }
        },
        groundSpriteEngine: {
          kind: require('../controls/sprite-engine'),
          args: {layer: 2}
        },
        spriteEngine: {
          kind: require('../controls/sprite-engine'),
          args: {layer: 3}
        },
        renderingEngine: {
          kind: require('../controls/rendering-engine')
        },
        physicsEngine: {
          kind: require('../controls/physics-engine')
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
        mapCollisionEngine: {
          kind: require('../controls/map-collision-engine'),
          args: {
            tileMap: require('../maps/level01')
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