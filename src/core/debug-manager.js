var startButton = document.getElementById('start-button')
var stopButton = document.getElementById('stop-button')
var advanceFrameButton = document.getElementById('advance-frame')

class DebugManager{
  constructor(game){
    this.game = game
    startButton.onclick = e => {
      e.preventDefault()
      this.game.start()
    }
    stopButton.onclick = e => {
      e.preventDefault()
      this.game.stop()
    }
    advanceFrameButton.onclick = e => {
      e.preventDefault()
      this.game.advanceFrame()
    }
  }

}

module.exports = DebugManager