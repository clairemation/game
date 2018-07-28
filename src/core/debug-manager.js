var startButton = document.getElementById('start-button')
var advanceFrameButton = document.getElementById('advance-frame')
var debugModeHeader = document.getElementById('debugmodeheader')

class DebugManager{
  constructor(game){
    this.game = game
    startButton.onclick = this.togglePlayPause.bind(this)
    advanceFrameButton.onclick = this.advanceFrame.bind(this)
  }

  togglePlayPause(e){
    e.preventDefault()
    this.game.debugMode ? this.exitDebugMode() : this.enterDebugMode()
  }

  advanceFrame(e){
    e.preventDefault()
    this.game.advanceFrame()
  }

  enterDebugMode(){
    this.game.stop()
    startButton.innerHTML='<i class="material-icons">play_arrow</i>'
    debugModeHeader.style.visibility = 'visible'
    advanceFrameButton.disabled = false
    this.game.debugMode = true
  }

  exitDebugMode(){
    this.game.start()
    startButton.innerHTML='<i class="material-icons">pause</i>'
    debugModeHeader.style.visibility = 'hidden'
    advanceFrameButton.disabled = "disabled"
    this.game.debugMode = false
  }
}

module.exports = DebugManager