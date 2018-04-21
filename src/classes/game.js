const Stack = require('../lib/stack')
const StateMachine = require('./require/statemachine')

var instance

class Game {

  constructor(args){
    if (instance != null) {
      console.warn('Trying to instantiate more than one Game, returning original instance')
      return instance
    }
    this.scenes = new Stack()
    instance = this
  }
}