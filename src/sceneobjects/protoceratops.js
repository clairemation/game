const SceneObject = require('../classes/sceneobject')
const Game = require('../classes/game')
const $ = require('../lib/coolgebra')

class Proto extends SceneObject{
  constructor(args){
    var sceneObjArgs = {
      name: 'proto',
      scene: args.scene,
      active: true,

      states: {
        walking: require('../states/enemy-standing'),
      },
      initialState: 'walking',

      controls: {

        transform: {
          kind: require('../controls/transform'),
          args: {
            position: [300.0, 100.0],
            size: [80, 44]
          }
        },

        advance: {
          kind: require('../controls/advance'),
          args: {
            acceleration: 0.5
          }
        },

        gravity: {
          kind: require('../controls/gravity')
        },

        animationStateMachine: {
          kind: require('../controls/animation-state-machine'),
          args: {
            tag: 'proto',
            states: require('../states/proto-animation-states'),
            initialState: 'initial',
            parameters: {
              direction: 0
            },
          }
        },

        sprite: {
          kind: require('../controls/sprite'),
          args: {
            tag: 'proto',
            spritesheetName: 'protoSprites',
            spritesheetData: require('../spritesheet-data/proto'),
            animations: {
                Lstand: ['Lstand'],
                Lwalk: ['Lwalk00', 'Lwalk01'],
                Rstand: ['Rstand'],
                Rwalk: ['Rwalk00', 'Rwalk01']
            },
            initialAnimation: ['Lstand', true],
            layer: 2
          }
        },

        feetMapCollider: {
          kind: require('../controls/map-collider'),
          args: {
            tags: ['level01'],
            checkPoint: [40, 44]
          }
        },

        // rightNoseMapCollider: {
        //   kind: require('../controls/map-collider'),
        //   args: {
        //     tags: ['level01'],
        //     checkPoint: [60, 10]
        //   }
        // },

        // leftNoseMapCollider: {
        //   kind: require('../controls/map-collider'),
        //   args: {
        //     tags: ['level01'],
        //     checkPoint: [56, 10]
        //   }
        // },

        velocity: {
          kind: require('../controls/velocity')
        },
      }
    }

    super(sceneObjArgs)
  }
}

module.exports = Proto