const Stack = require('../lib/stack')
const StateMachine = require('./statemachine')
const Scene = require('./scene')
const renderer = require('../core/renderer')
const Camera = require('../controls/camera')

var screenWidth = 320
var screenHeight = 240

var instance
var loop
var lastTime

class Game {

  constructor(args){
    if (instance != null) {
      console.warn('Trying to instantiate more than one Game, returning original instance')
      return instance
    }
    this.scenes = args.scenes || {}
    this.sceneStack = new Stack()
    this.currentTime = 0
    this.dt = 0
    this.running = false

    for (var i in this.scenes){
      this.scenes[i].setGame(this)
      this.scenes[i].init()
    }

    this.tick = this.tick.bind(this)

    instance = this
  }

  static getScreenWidth(){
    return screenWidth
  }

  static getScreenHeight(){
    return screenHeight
  }

  static setScreenWidth(value){
    screenWidth = value
  }

  static setScreenHeight(value){
    screenWidth = value
  }

  push(sceneName){
    if (this.currentScene){
      this.currentScene.exit(this, this.currentScene)
    }
    this.sceneStack.push(this.scenes[sceneName])
    this.updateCurrent()
  }

  pop(scene){
    this.currentScene.exit(this, this.currentScene)
    this.sceneStack.pop()
    this.updateCurrent()
  }

  replaceTop(sceneName){
    this.currentScene.exit(this, this.currentScene)
    this.sceneStack.pop()
    this.sceneStack.push(this.scenes[sceneName])
    this.updateCurrent()
  }

  updateCurrent(){
    this.currentScene = this.sceneStack.peek()
    Camera.reset()
    this.currentScene.enter(this, this.currentScene)
  }

  start(){
    if (this.running){
      return
    }
    loop = requestAnimationFrame(this.tick)
    this.running = true
  }

  stop(){
    if (!this.running){
      return
    }
    cancelAnimationFrame(loop)
    this.running = false
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
    this.currentScene.update()
  }
}

module.exports = Game