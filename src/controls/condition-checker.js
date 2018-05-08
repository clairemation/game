const Control = require('../classes/control')

class ConditionChecker extends Control{
  constructor(args){
    super(args)
    this.name = 'lose-checker'
    this.condition = args.condition || (() => false)
    this.result = args.result || (() => {})
  }

  update(){
    if (this.condition()){
      this.result()
    }
  }
}

module.exports = ConditionChecker