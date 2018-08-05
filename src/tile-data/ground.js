var ground = {
  sheet: 'groundTile',
  coords: {x:0, y:0, w:32, h:32},
  rays: [[0, 32, 0, 0], [0, 0, 32, 0], [32, 0, 32, 32]],
  onHitFront: function(other, myPos){},
  onHitTop: function(other, myPos, tileMap){
    var destY = tileMap.mapToWorldCoords(...myPos)[1] - other.owner.controls.transform.size[1]
    other.owner.controls.transform.moveTo(other.owner.controls.transform.position[0], destY)
    other.owner.controls.altitude.resetFall()
    other.owner.changeState('walking')
      // if (other.owner.tag == 'ground'){
      //     this.owner.controls.transform.moveTo(...$(collisionPoint).minusVector([this.owner.controls.transform.size[0] / 2, this.owner.controls.transform.size[1]]).$)
      //     this.owner.controls.altitude.resetFall()
      //     this.owner.changeState('walking')
      // }
  }
}

module.exports = ground