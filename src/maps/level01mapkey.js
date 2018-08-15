var key = {
  0: {
    sheet: 'groundAtlas',
    coords: {x:128, y:0, w:32, h:32},
    onHit
  },
  199: {
    sheet: 'groundAtlas',
    coords: {x:0, y:0, w:32, h:32},
    onHit
  },
  66: {
    sheet: 'groundAtlas',
    coords: {x:32, y:0, w:32, h:32},
    onHit
  }
}

function onHit(other, myPos, tileMap){
  var destY = tileMap.mapToWorldCoords(...myPos)[1] - other.owner.controls.transform.size[1]
      other.owner.controls.transform.moveTo(other.owner.controls.transform.position[0], destY)
      other.owner.controls.altitude.resetFall()
      other.owner.changeState('walking')
}

module.exports = key