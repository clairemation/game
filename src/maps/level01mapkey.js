var key = {
  0: {
    sheet: 'groundTile',
    coords: {x:0, y:0, w:32, h:32},
    onHitFront: function(other, myPos){},
    onHitTop: function(other, myPos, tileMap){
      var destY = tileMap.mapToWorldCoords(...myPos)[1] - other.owner.controls.transform.size[1]
      other.owner.controls.transform.moveTo(other.owner.controls.transform.position[0], destY)
      other.owner.controls.altitude.resetFall()
      other.owner.changeState('walking')
    }
  }
}

module.exports = key