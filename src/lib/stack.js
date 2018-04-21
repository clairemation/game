function Stack(){
  this.top = null;
}

Stack.prototype.push = function(value){
  this.top = {value, below: this.top};
}

Stack.prototype.pop = function(){
  var node = this.top;
  this.top = this.top.below;
  return node.value;
}

Stack.prototype.replaceTop = function(value){
  var node = {value, below: this.top.below};
  this.top = node;
}

Stack.prototype.removeAt = function(index){
  var node = this.top
  for (let i = 0; i < index - 2; i++){
    node = node.below;
  }
  node.below = node.below.below;
}

Stack.prototype.removeWhere = function(callback){
  var node = this.top
  while (node != null && node.below != null){
    if (callback(node.below.value)){
      node.below = node.below.below
    }
    node = node.below
  }
}

Stack.prototype.peek = function(){
  return this.top.value;
}

Stack.prototype.fill = function(a){
  for (let i = 0; i < a.length; i++){
    this.push(a[i]);
  }
}

Stack.prototype.fillWithValues = function(va){
  for (let i = 0; i < a.length; i++){
    this.pushValue(va[i]);
  }
}

Stack.prototype.toArr = function(){
  var arr = [];
  var currentNode = this.top;
  while (currentNode != null){
    arr.push(currentNode);
    currentNode = currentNode.below;
  }
  return arr;
}

module.exports = Stack;