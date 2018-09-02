const TILE_SIZE = 32

var key = {
  // inner
  0: {
    sheet: 'groundAtlas',
    coords: {x:32, y:32, w:32, h:32},
    rays: [],
    onHit
  },
  // flat
  8325038: {
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
  // left edge
  16416927: {
    sheet: 'groundAtlas',
    coords: {x:0, y:32, w:32, h:32},
    rays: [
      {
        ray: [0,32,0,0],
        normal: [-1, 0]
      }
    ],
    onHit
  },
  // right edge
  687282: {
    sheet: 'groundAtlas',
    coords: {x:64, y:32, w:32, h:32},
    rays: [
      {
        ray: [32, 0,32,32],
        normal: [1, 0]
      }
    ],
    onHit
  },
  // upper left corner
  11701498: {
    sheet: 'groundAtlas',
    coords: {x:0, y:0, w:32, h:32},
    rays: [
      {
        ray: [0,0,32,0],
        normal: [0, -1]
      },
      {
        ray: [0,32,0,0],
        normal: [-1, 0]
      }
    ],
    onHit
  },
  // upper right corner
  10987514: {
    sheet: 'groundAtlas',
    coords: {x:64, y:0, w:32, h:32},
    rays: [
      {
        ray: [0,0,32,0],
        normal: [0, -1]
      },
      {
        ray: [32, 0,32,32],
        normal: [1, 0]
      }
    ],
    onHit
  },
  // gentle slope up 1
  11604909: {
    sheet: 'groundAtlas',
    coords: {x:5 * TILE_SIZE, y:4 * TILE_SIZE, w:32, h:32},
    rays: [
      {
        ray: [0,32,32,16],
        normal: [-0.4472135954999579, -0.8944271909999159]
      }
    ],
    onHit
  },
  // gentle slope up 2
  9047942: {
    sheet: 'groundAtlas',
    coords: {x:6*TILE_SIZE, y:4*TILE_SIZE, w:32, h:32},
    rays: [
      {
        ray: [0,16,32,0],
        normal: [-0.4472135954999579, -0.8944271909999159]
      }
    ],
    onHit
  },
  // 45-degree slope down
  2960311: {
    sheet: 'groundAtlas',
    coords: {x:TILE_SIZE, y:4*TILE_SIZE, w:32, h:32},
    rays: [
      {
        ray: [0,0,32,32],
        normal: [0.7071067811865475, -0.7071067811865475]
      }
    ],
    onHit
  },
  // steep slope up 1
  16081320: {
    sheet: 'groundAtlas',
    coords: {x:8*TILE_SIZE, y:5*TILE_SIZE, w:32, h:32},
    rays: [
      {
        ray: [0,32,16,0],
        normal: [-0.8944271909999159, -0.4472135954999579]
      }
    ],
    onHit
  },
  //steep slope up 2
  16094659: {
    sheet: 'groundAtlas',
    coords: {x:9*TILE_SIZE, y:4*TILE_SIZE, w:32, h:32},
    rays: [
      {
        ray: [16,32,32,0],
        normal: [-0.8944271909999159, -0.4472135954999579]
      }
    ],
    onHit
  },
  // gentle slope down 1
  5706164: {
    sheet: 'groundAtlas',
    coords: {x:3*TILE_SIZE, y:4*TILE_SIZE, w:32, h:32},
    rays: [
      {
        ray: [0,0,32,16],
        normal: [0.4472135954999579, -0.8944271909999159]
      }
    ],
    onHit
  },
  // gentle slope down 2
  7295925: {
    sheet: 'groundAtlas',
    coords: {x:4*TILE_SIZE, y:4*TILE_SIZE, w:32, h:32},
    rays: [
      {
        ray: [0,16,32,32],
        normal: [0.4472135954999579, -0.8944271909999159]
      }
    ],
    onHit
  },
  // steep slope down 1
  1403350: {
    sheet: 'groundAtlas',
    coords: {x:7*TILE_SIZE, y:4*TILE_SIZE, w:32, h:32},
    rays: [
      {
        ray: [0,0,16,32],
        normal: [0.8944271909999159, -0.4472135954999579]
      }
    ],
    onHit
  },
  //steep slope down 2
  1136818: {
    sheet: 'groundAtlas',
    coords: {x:7*TILE_SIZE, y:5*TILE_SIZE, w:32, h:32},
    rays: [
      {
        ray: [16,0,32,32],
        normal: [0.8944271909999159, -0.4472135954999579]
      }
    ],
    onHit
  },

}

function onHit(other, intersectionPoint, myPos, tileMap){
  // console.log(intersectionPoint)
  // var destY = tileMap.mapToWorldCoords(...myPos)[1] - other.owner.controls.transform.size[1]
  //     other.owner.controls.transform.moveTo(other.owner.controls.transform.position[0], destY)
  //     other.owner.controls.altitude.resetFall()
  //     other.owner.changeState('walking')
}

module.exports = key