const State = require('../classes/state')

var standing = new State({
  enter: function(){
  },
  update: function(){
    var dist = this.scene.getObjectByName('player').controls.transform.position[0] - this.controls.transform.position[0]
    if (Math.abs(dist) < 100){
      this.controls.advance.change(0)
    } else if (Math.abs(dist) < 200){
      this.controls.advance.change(Math.sign(this.scene.getObjectByName('player').controls.transform.position[0] - this.controls.transform.position[0]))
    }

    this.controls.advance.update()
    this.controls.gravity.update()
    this.controls.velocity.update()
    this.controls.animationStateMachine.update()
    this.controls.sprite.update()
  }
})

module.exports = standing