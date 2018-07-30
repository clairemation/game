var keyDown = false

var keyDownHandlerIndices = {}
var keyDownHandlers = []
var keyUpHandlerIndices = {}
var keyUpHandlers = []

function handleEvent(handlers, e){
  for (let i = 0; i < handlers.length; i++){
    handlers[i](e)
  }
}

var input = {
  turnOn: function(){
    document.addEventListener("keydown", keydownHandler)
    document.addEventListener("keyup", keyupHandler)
    document.addEventListener("touchstart", touchstartHandler)
    document.addEventListener("touchend", touchendHandler)
  },

  turnOff: function(){
    document.removeEventListener("keydown", keydownHandler)
    document.removeEventListener("keyup", keyupHandler)
    document.removeEventListener("touchstart", touchstartHandler)
    document.removeEventListener("touchend", touchendHandler)
  },

  addKeyDownListener: function(handler){
    keyDownHandlers.push(handler)
    keyDownHandlerIndices[handler] = keyDownHandlers.length - 1
  },

  removeKeyDownListener: function(handler){
    keyDownHandlers[keyDownHandlerIndices[handler]] = keyDownHandlers[keyDownHandlers.length - 1]
    keyDownHandlers.splice(keyDownHandlers.length - 1, 1)
    delete keyDownHandlerIndices[handler]
  },

  addKeyUpListener: function(handler){
    keyUpHandlers.push(handler)
    keyUpHandlerIndices[handler] = keyUpHandlers.length - 1
  },

  removeKeyUpListener: function(handler){
    keyUpHandlers[keyDownHandlerIndices[handler]] = keyUpHandlers[keyUpHandlers.length - 1]
    keyUpHandlers.splice(keyUpHandlers.length - 1, 1)
    delete keyUpHandlerIndices[handler]
  }
}

function keydownHandler(e){
  if (!keyDown && e.keyCode == 32){
      e.preventDefault()
      keyDown = true
      handleEvent(keyDownHandlers, e)
  }
}

function keyupHandler(e){
  if (e.keyCode == 32){
      e.preventDefault()
      keyDown = false
      handleEvent(keyUpHandlers, e)
  }
}

function touchstartHandler(e){
  e.preventDefault()
  handleEvent(keyDownHandlers)
}

function touchendHandler(e){
  e.preventDefault()
  handleEvent(keyUpHandlers)
}

input.turnOn()

module.exports = input