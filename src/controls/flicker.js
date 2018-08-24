const Control = require('../classes/control')

class Flicker extends Control{
  init(){
    this.sprites = this.owner.getControlsByName('sprite')
    this.game = this.owner.getGame()
  }

  makeVisible(){
    for (var i = 0; i < this.sprites.length; i++){
      this.sprites[i].enabled = true
    }
  }

  makeInvisible(){
    for (var i = 0; i < this.sprites.length; i++){
      this.sprites[i].enabled = false
    }
  }

  update(){
    if (Math.floor(this.game.dt * 1000) % 2 == 0){
      this.makeInvisible()
    } else {
      this.makeVisible()
    }
  }
}

module.exports = Flicker