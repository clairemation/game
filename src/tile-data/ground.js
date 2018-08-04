var ground = {
  sheet: 'groundTile',
  coords: {x:0, y:0, w:32, h:32},
  rays: [[0, 0, 32, 0]],
  onHit: function(other){
    other.owner.controls.altitude.startBounce()
  }
}

module.exports = ground