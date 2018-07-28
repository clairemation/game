var startButton = document.getElementById('start-button')
var advanceFrameButton = document.getElementById('advance-frame')

var buttonIsPause = true

class DebugManager{
  constructor(game){
    this.game = game
    startButton.onclick = this.togglePlayPause.bind(this)
    advanceFrameButton.onclick = this.advanceFrame.bind(this)
  }

  togglePlayPause(e){
    e.preventDefault()
    console.log(this)
    if (buttonIsPause){
      this.game.stop()
      startButton.innerHTML='<i class="material-icons">play_arrow</i>'
      advanceFrameButton.disabled = false
      buttonIsPause = false
    } else {
      this.game.start()
      startButton.innerHTML='<i class="material-icons">pause</i>'
      advanceFrameButton.disabled = "disabled"
      buttonIsPause = true
    }
  }

  advanceFrame(e){
    e.preventDefault()
    this.game.advanceFrame()
  }
}

module.exports = DebugManager