function objectValues(obj){
  var arr = []
  for (var key in obj){
    arr.push(obj[key])
  }
  return arr
}

module.exports = objectValues