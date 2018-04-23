const Stack = require('../lib/stack')
const StateMachine = require('./statemachine')
const Scene = require('./scene')

var instance
var loop
var lastTime

class Game {

  constructor(args){
    if (instance != null) {
      console.warn('Trying to instantiate more than one Game, returning original instance')
      return instance
    }
    this.scenes = new Stack()

    instance = this

    // This feels like a bad idea
    Scene.push = scene => {
      this.scenes.push(scene)
      scene.enter()
    }

    Scene.pop = () => {
      this.scenes.top.exit()
      this.scenes.pop
    }

    Scene.replaceTop = scene => {
      Scene.pop()
      Scene.push(scene)
    }

    Scene.peek = this.scenes.peek
  }

  start(){
    loop = requestAnimationFrame(tick)
  }

  stop(){
    cancelAnimationFrame(loop)
  }

  tick(timestamp){
    loop = requestAnimationFrame(tick);
    this.currentTime = timestamp
    if (!lastTime){
        lastTime = timestamp
    }
    var dt = timestamp - lastTime
    this.update(dt);
    lastTime = timestamp
  }

  update(dt){
    this.scenes.top.update(dt)
  }
}

module.exports = Game