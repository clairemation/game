var ground = {
  sheet: 'groundTile',
  coords: {x:0, y:0, w:32, h:32},
  rays: [[0, 32, 0, 0], [0, 0, 32, 0], [32, 0, 32, 32]],
  onHit: function(other, isFront){
    if (isFront){
      // other.owner.controls.transform.position[0] -= other.owner.controls.transform.width
    } else {
      other.owner.controls.altitude.startBounce()
    }
  }
}

module.exports = ground