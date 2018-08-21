const State = require('../classes/state')

var initial = new State({
  update: function(){
    this.changeState('Rstand')
  }
})

var Lstand = new State({
  enter: function(){
    this.owner.controls.sprite.setAnimation('Lstand', false)
  }
})

var Rstand = new State({
  enter: function(){
    this.owner.controls.sprite.setAnimation('Rstand', false)
  }
})

var Lwalk = new State({
  enter: function(){
    this.owner.controls.sprite.setAnimation('Lwalk', true)
  }
})

var Rwalk = new State({
  enter: function(){
    this.owner.controls.sprite.setAnimation('Rwalk', false)
  }
})

var LwalkTailCurled = new State({
  enter: function(){
    this.owner.controls.sprite.setAnimation('LwalkTailCurled', true)
  }
})

var RwalkTailCurled = new State({
  enter: function(){
    this.owner.controls.sprite.setAnimation('RwalkTailCurled', false)
  }
})


var playerAnimationStates = {initial, Rstand}

module.exports = playerAnimationStates