var keyDown = false

var keyDownHandlerIndices = {}
var keyDownHandlers = []
var keyUpHandlerIndices = {}
var keyUpHandlers = []

function handleEvent(handlers){
  for (let i = 0; i < handlers.length; i++){
    handlers[i]()
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
  }
}

document.addEventListener("keydown", e => {
    if (!keyDown && e.keyCode == 32){
        e.preventDefault()
        keyDown = true
        handleEvent(keyDownHandlers)
    }
})

document.addEventListener("keyup", e => {
    if (e.keyCode == 32){
        e.preventDefault()
        keyDown = false
        handleEvent(keyUpHandlers)
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