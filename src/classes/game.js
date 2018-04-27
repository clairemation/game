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
    this.tick = this.tick.bind(this)
    instance = this
  }

  push(scene){
    if (this.currentScene){
      this.currentScene.exit(this, this.currentScene)
    }
    this.scenes.push(scene)
    this.updateCurrent()
  }

  pop(scene){
    this.currentScene.exit(this, this.currentScene)
    this.scenes.pop()
    this.updateCurrent()
  }

  replaceTop(scene){
    this.currentScene.exit(this, this.currentScene)
    this.scenes.pop()
    this.scenes.push(scene)
    this.updateCurrent()
  }

  updateCurrent(){
    this.currentScene = this.scenes.peek()
    this.currentScene.enter(this, this.currentScene)
  }

  start(){
    loop = requestAnimationFrame(this.tick)
  }

  stop(){
    cancelAnimationFrame(loop)
  }

  tick(timestamp){
    loop = requestAnimationFrame(this.tick);
    this.currentTime = timestamp
    if (!lastTime){
        lastTime = timestamp
    }
    this.dt = timestamp - lastTime
    this.update();
    lastTime = timestamp
  }

  update(){
    var scene = this.scenes.peek()
    scene.update(this, scene)
  }
}

module.exports = Game