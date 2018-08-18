const Control = require('../classes/control')
const $ = require('../lib/coolgebra')

class Transform extends Control{
  constructor(args = {}){
    super(args)
    this.name = "transform"
    this.position = args.position || [0,0]
    this.size = args.size || [0, 0]
    this.prevPosition = [...this.position]
  }

  getBounds(){
    return [...this.position, ...$(this.position).plusVector(this.size).$]
  }

  getCenter(){
    return $(this.position).plusVector($(this.size).timesScalar(0.5).$).$
  }

  moveTo(x,y){
    this._setPrevPosition()
    this.position[0] = x
    this.position[1] = y
  }

  moveBy(x, y){
    this._setPrevPosition()
    this.position[0] += x
    this.position[1] += y
  }

  moveUp(amt){
    this._setPrevPosition()
    this.position[1] -= amt
  }

  moveDown(amt){
    this._setPrevPosition()
    this.position[1] += amt
  }

  moveLeft(amt){
    this._setPrevPosition()
    this.position[0] -= amt
  }

  moveRight(amt){
    this._setPrevPosition()
    this.position[0] += amt
  }

  _setPrevPosition(){
    this.prevPosition[0] = this.position[0]
    this.prevPosition[1] = this.position[1]
  }

  update(){
    this._setPrevPosition()
  }
}

module.exports = Transform