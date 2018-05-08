const Control = require('../classes/control')
const Scroller = require('./scroller')

class ScrollingEngine extends Control{
  constructor(args){
    super(args)
    this.name = 'scrollingEngine'
    this.layer = args.layer || 'foreground'
    this.components = []
    this.scrollRate = args.scrollRate || 0.15
    this.scrollAmt = 0
  }

  init(){
    this.components = this.owner.scene.getControlsByName('scroller').filter(s => s.tag == this.tag)
    for (let i = 0; i < this.components.length; i++){
      this.components[i].engine = this
    }
  }

  update(){
    this.scrollAmt = Math.ceil(this.scrollRate * this.getGame().dt)
  }
}

module.exports = ScrollingEngine