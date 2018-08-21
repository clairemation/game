const State = require('../classes/state')

var initial = new State({
  update: function(){
    this.owner.controls.sprite.setAnimation('Rstand', true)
    this.changeState('Rstand')
  }
})

var Lstand = new State({
  enter: function(){
    this.owner.controls.sprite.setAnimation('Lstand', true)
  }
})

var Rstand = new State({
  update: function(){
    // this.owner.controls.sprite.setAnimation('Rstand', false)
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

var Ljump = new State({
  enter: function(){
    this.owner.controls.sprite.setAnimation('Ljump', true)
  }
})

var Rjump = new State({
  enter: function(){
    this.owner.controls.sprite.setAnimation('Rjump', false)
  }
})

var Lfall = new State({
  enter: function(){
    this.owner.controls.sprite.setAnimation('Lfall', true)
  }
})

var Rfall = new State({
  enter: function(){
    this.owner.controls.sprite.setAnimation('Rfall', false)
  }
})


var playerAnimationStates = {initial, Rstand}

module.exports = playerAnimationStates