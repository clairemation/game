const State = require('../classes/state')

var initial = new State({
  update: function(){
    this.changeState('Rstand')
  },
  evaluateChange: () => {}
})

var Lstand = new State({
  enter: function(){
    this.sprite.setAnimation('Lstand', true)
  },

  evaluateChange: function(parameterName, value){
    switch(parameterName){
      case('direction'):
        this.changeState(value == -1 ? 'Lwalk' : 'Rwalk')
        this.owner.controls.tailManager.changeDirection(value)
        break
      case('flap'):
        this.changeState('Ljump')
        break
    }
  }
})

var Rstand = new State({
  enter: function(){
    this.sprite.setAnimation('Rstand', true)
  },

  evaluateChange: function(parameterName, value){
    switch(parameterName){
      case('direction'):
        this.changeState(value == -1 ? 'Lwalk' : 'Rwalk')
        this.owner.controls.tailManager.changeDirection(value)
        break
      case('flap'):
        this.changeState('Rjump')
        break
    }
  }
})

var Lwalk = new State({
  enter: function(){
    this.sprite.setAnimation('Lwalk', true)
  },

  evaluateChange: function(parameterName, value){
    switch(parameterName){
      case('direction'):
        this.changeState(value == 1 ? 'Rwalk' : 'Lstand')
        this.owner.controls.tailManager.changeDirection(value)
        break
      case('flap'):
        this.changeState('Ljump')
        break
    }
  }
})

var Rwalk = new State({
  enter: function(){
    this.sprite.setAnimation('Rwalk', true)
  },

  evaluateChange: function(parameterName, value){
    switch(parameterName){
      case('direction'):
        this.changeState(value == -1 ? 'Lwalk' : 'Rstand')
        this.owner.controls.tailManager.changeDirection(value)
        break
      case('flap'):
        this.changeState('Rjump')
        break
    }
  }
})

var LwalkTailCurled = new State({
  enter: function(){
    this.sprite.setAnimation('LwalkTailCurled', true)
  }
})

var RwalkTailCurled = new State({
  enter: function(){
    this.sprite.setAnimation('RwalkTailCurled', true)
  }
})

var Ljump = new State({
  enter: function(){
    this.sprite.setAnimation('Ljump', true)
  },

  evaluateChange: function(parameterName, value){
    switch(parameterName){
      case('direction'):
        if (value == 1){
          this.changeState('Rjump')
          this.owner.controls.tailManager.changeDirection(value)
        }
        break
      case('fall'):
        this.changeState('Lfall')
        break
      case('land'):
        this.changeState(this.parameters.direction == 0 ? 'Lstand' : 'Lwalk')
        break
    }
  }
})

var Rjump = new State({
  enter: function(){
    this.sprite.setAnimation('Rjump', true)
  },

  evaluateChange: function(parameterName, value){
    switch(parameterName){
      case('direction'):
        if (value == -1){
          this.changeState('Ljump')
          this.owner.controls.tailManager.changeDirection(value)
        }
        break
      case('fall'):
        this.changeState('Rfall')
        break
      case('land'):
        this.changeState(this.parameters.direction == 0 ? 'Rstand' : 'Rwalk')
        break
    }
  }
})

var Lfall = new State({
  enter: function(){
    this.sprite.setAnimation('Lfall', true)
  },

  evaluateChange: function(parameterName, value){
    switch(parameterName){
      case('direction'):
        if (value == 1){
          this.changeState('Rfall')
          this.owner.controls.tailManager.changeDirection(value)
        }
        break
      case('flap'):
        this.changeState('Ljump')
        break
      case('land'):
        this.changeState(this.parameters.direction == 0 ? 'Lstand' : 'Lwalk')
        break
    }
  }
})

var Rfall = new State({
  enter: function(){
    this.sprite.setAnimation('Rfall', true)
  },

  evaluateChange: function(parameterName, value){
    switch(parameterName){
      case('direction'):
        if (value == -1){
          this.changeState('Lfall')
          this.owner.controls.tailManager.changeDirection(value)
        }
        break
      case('flap'):
        this.changeState('Rjump')
        break
      case('land'):
        this.changeState(this.parameters.direction == 0 ? 'Rstand' : 'Rwalk')
        break
    }
  }
})


var playerAnimationStates = {initial, Rstand, Lstand, Rwalk, Lwalk, Rjump, Ljump, Rfall, Lfall}

module.exports = playerAnimationStates