var App = (() => {
  return {
    $: require('lib/coolgebra'),
    Engine: require('engines/engine'),
    // Entity: require('entities'),
    EventEmitter: require('events'),
    Lib: require('lib'),
    ObjectPool: require('lib/object-pool'),
    Position: require('engines/position'),
    Shell: require('shell'),
    Stack: require('lib/stack'),
    Spheretest: require('tests/spherenormals-test.js')
    // WebGLDataObject: require('lib/webgl/index')
  }
})();

module.exports = App;

Object.assign(window, module.exports);