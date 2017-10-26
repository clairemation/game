const Component = require('./component.js')

const componentIndex = [],
  componentRegistry = {}

class Engine extends Component {

  constructor(args){
    super(args)
    this.Component = function(args){}
    Object.defineProperty(this, "components", {
      get: () => componentRegistry
    })
  }

  createComponent(args) {
    var component = new this.Component(args)
    componentRegistry[args.id] = component
    componentIndex.push(component)
    return component
  }

  destroyComponent(id) {
    var component = componentRegistry[id]
    delete componentRegistry[id]
    componentIndex.splice(componentIndex.indexOf(component), 1)
  }
}

module.exports = Engine