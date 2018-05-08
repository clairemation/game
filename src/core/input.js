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

document.addEventListener("keydown", e => {
    if (!keyDown && e.keyCode == 32){
        e.preventDefault()
        keyDown = true
        handleEvent(keyDownHandlers, e)
    }
})

document.addEventListener("keyup", e => {
    if (e.keyCode == 32){
        e.preventDefault()
        keyDown = false
        handleEvent(keyUpHandlers, e)
    }
})

document.addEventListener("touchstart", e => {
    e.preventDefault()
    handleEvent(keyDownHandlers)
})

document.addEventListener("touchend", e => {
    e.preventDefault()
    handleEvent(keyUpHandlers)
})

module.exports = input