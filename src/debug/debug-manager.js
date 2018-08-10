const renderer = require('../core/renderer')
const Camera = require('../controls/camera')
const input = require('../core/input')
const State = require("../classes/state")
const StateMachine = require('../classes/statemachine')

class DebugManager{
  constructor(args){
    this.name = 'debugManager'
    this.game = args.game
    this.clipboard = []

    this.canvasManagers = {
      scene: new (require('./scene-view-manager'))({
        game: this.game,
        canvas: document.getElementById('canvas'),
        clipboard: this.clipboard
      }),
      inspector: new (require('./inspector-manager'))({game: this.game,
        canvas: document.getElementById('inspector-canvas'),
        clipboard: this.clipboard
      })
    }

    this.canvasManagers.inspector.changeState('initial')
  }
}

module.exports = DebugManager