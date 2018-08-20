function handleEvent(handlers, e){
  for (let i = 0; i < handlers.length; i++){
    handlers[i](e)
  }
}

var instance

class Input {
  constructor(){
    if (!!instance){
      return instance
    }
    this.handlers = {},
    this.runKeyDownHandlers = this.runKeyDownHandlers.bind(this)
    this.runKeyUpHandlers = this.runKeyUpHandlers.bind(this)
    instance = this
  }

  turnOn(){
    document.addEventListener("keydown", this.runKeyDownHandlers)
    document.addEventListener("keyup", this.runKeyUpHandlers)
  }

  turnOff(){
    document.removeEventListener("keydown", this.runKeyDownHandlers)
    document.removeEventListener("keyup", this.runKeyUpHandlers)
  }

  addKeyDownListener(key, handler){
    if (!this.handlers[key]){
      this.handlers[key] = {
        downHandlers: [],
        downHandlerIndices: {},
        upHandlers: [],
        upHandlerIndices: {}
      }
    }
    this.handlers[key].downHandlers.push(handler)
    this.handlers[key].downHandlerIndices[handler] = this.handlers[key].downHandlers.length - 1
  }

  removeKeyDownListener(key, handler){
    this.handlers[key].downHandlers[this.handlers[key].downHandlerIndices[handler]] = this.handlers[key].downHandlers[this.handlers[key].downHandlers.length - 1]
    this.handlers[key].downHandlers.splice(this.handlers[key].downHandlers.length - 1, 1)
    delete this.handlers[key].downHandlerIndices[handler]
  }

  addKeyUpListener(key, handler){
    if (!this.handlers[key]){
      this.handlers[key] = {
        downHandlers: [],
        downHandlerIndices: {},
        upHandlers: [],
        upHandlerIndices: {}
      }
    }
    this.handlers[key].upHandlers.push(handler)
    this.handlers[key].upHandlerIndices[handler] = this.handlers[key].upHandlers.length - 1
  }

  removeKeyUpListener(key, handler){
    this.handlers[key].upHandlers[this.handlers[key].upHandlerIndices[handler]] = this.handlers[key].upHandlers[this.handlers[key].upHandlers.length - 1]
    this.handlers[key].upHandlers.splice(this.handlers[key].upHandlers.length - 1, 1)
    delete this.handlers[key].upHandlerIndices[handler]
  }

  runKeyDownHandlers(e){
    var key = this.handlers[e.keyCode]
    if (!key || key.down){
      return
    }
    e.preventDefault()
    key.down = true
    handleEvent(key.downHandlers, e)
  }

  runKeyUpHandlers(e){
    var key = this.handlers[e.keyCode]
    if (!key){
      return
    }
    e.preventDefault()
    key.down = false
    handleEvent(key.upHandlers, e)
  }
}

var input = new Input()
input.turnOn()

module.exports = input