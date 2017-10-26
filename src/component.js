const index = [],
  registry = {}

class Component {

  constructor(args){
    this.owner = args.owner
    this.id = args.id
    this.engine = args.engine || null
    this.update = function(){}
    this.enabled = args.enabled != undefined ? args.enabled : true
    index.push(this)
    registry[args.id] = this
  }

  static getAll(){
    return registry;
  }

  static getIndex(){
    return index;
  }

  destroy(){
    delete registry[this.id]
    index.splice(index.indexOf(this), 1)
    if (engine){
      engine.destroyComponent(this.id)
    }
  }

}

module.exports = Component