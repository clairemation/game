const Control = require('../classes/control')

class TailManager extends Control{
    changeDirection(dir){
      if (dir != 0){
        this.owner.controls.tailSprite.setAnimation(dir == 1 ? 'Rblend' : 'Lblend')
      }
    }

    update(){
      this.tailPos = (7 - Math.floor(this.owner.controls.velocity.y / 2 + 4))
      this.owner.controls.tailSprite.setFrame(this.tailPos)
    }
}

module.exports = TailManager