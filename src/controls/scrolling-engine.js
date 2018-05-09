const Control = require('../classes/control')
const Scroller = require('./scroller')

var scrollRate = 0.15

class ScrollingEngine extends Control{
  constructor(args){
    super(args)
    this.name = 'scrollingEngine'
    this.layer = args.layer || 'foreground'
    this.components = []
    this.multiplier = args.multiplier || 1.0
    this.scrollAmt = 0
  }

  init(){
    this.components = this.owner.scene.getControlsByName('scroller').filter(s => s.layer == this.layer)
    for (let i = 0; i < this.components.length; i++){
      this.components[i].engine = this
    }
  }

  static getScrollRate(){
    return scrollRate
  }

  static setScrollRate(value){
    scrollRate = value
  }

  update(){
    this.scrollAmt = Math.ceil(scrollRate * this.multiplier * this.getGame().dt)
  }
}

module.exports = ScrollingEngine