var key = {
  // no collision
  0: {
    sheet: 'groundAtlas',
    coords: {x:128, y:0, w:32, h:32},
    rays: [],
    onHit
  },
  // flat
  135: {
    sheet: 'groundAtlas',
    coords: {x:128, y:0, w:32, h:32},
    rays: [
      {
        ray: [0,0,32,0],
        normal: [0, -1]
      }
    ],
    onHit
  },
  // corner
  199: {
    sheet: 'groundAtlas',
    coords: {x:0, y:0, w:32, h:32},
    rays: [
      {
        ray: [0,0,32,0],
        normal: [0, -1]
      }
    ],
    onHit
  },
  // corner
  66: {
    sheet: 'groundAtlas',
    coords: {x:32, y:0, w:32, h:32},
    rays: [
      {
        ray: [0,0,32,0],
        normal: [0, -1]
      }
    ],
    onHit
  },
  // slope up
  87: {
    sheet: 'groundAtlas',
    coords: {x:32, y:64, w:32, h:32},
    rays: [
      {
        ray: [-1,33,33,-1],
        normal: [-0.7071067811865475, -0.7071067811865475]
      }
    ],
    onHit
  },
  // slope down
  204: {
    sheet: 'groundAtlas',
    coords: {x:0, y:64, w:32, h:32},
    rays: [
      {
        ray: [0,0,32,32],
        normal: [0.7071067811865475, -0.7071067811865475]

      }
    ],
    onHit
  },
  // gentle slope up 1
  151: {
    sheet: 'groundAtlas',
    coords: {x:64, y:64, w:32, h:32},
    rays: [
      {
        ray: [-1,33,33,16],
        normal: [-0.4472135954999579, -0.8944271909999159]
      }
    ],
    onHit
  },
  // gentle slope up 2
  212: {
    sheet: 'groundAtlas',
    coords: {x:96, y:64, w:32, h:32},
    rays: [
      {
        ray: [0,16,32,0],
        normal: [-0.4472135954999579, -0.8944271909999159]
      }
    ],
    onHit
  }

}

function onHit(other, intersectionPoint, myPos, tileMap){
  console.log(intersectionPoint)
  var destY = tileMap.mapToWorldCoords(...myPos)[1] - other.owner.controls.transform.size[1]
      other.owner.controls.transform.moveTo(other.owner.controls.transform.position[0], destY)
      other.owner.controls.altitude.resetFall()
      other.owner.changeState('walking')
}

module.exports = key