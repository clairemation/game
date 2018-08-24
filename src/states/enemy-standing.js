const State = require('../classes/state')

var standing = new State({
  enter: function(){
  },
  update: function(){
    var dist = this.scene.getObjectByName('player').controls.transform.position[0] - this.controls.transform.position[0]
    if (Math.abs(dist) < 200){
      this.controls.advance.direction = Math.sign(this.scene.getObjectByName('player').controls.transform.position[0] - this.controls.transform.position[0])
    } else {
      this.controls.advance.direction = 0
    }

    this.controls.advance.update()
    this.controls.gravity.update()
    this.controls.velocity.update()
    this.controls.sprite.update()
  }
})

module.exports = standing