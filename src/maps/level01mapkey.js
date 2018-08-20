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
  // gentle slope up 1
  11604909: {
    sheet: 'groundAtlas',
    coords: {x:128, y:96, w:32, h:32},
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
    coords: {x:160, y:96, w:32, h:32},
    rays: [
      {
        ray: [0,16,32,0],
        normal: [-0.4472135954999579, -0.8944271909999159]
      }
    ],
    onHit
  },
  // steep slope up 1
  16081320: {
    sheet: 'groundAtlas',
    coords: {x:224, y:128, w:32, h:32},
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
    coords: {x:224, y:96, w:32, h:32},
    rays: [
      {
        ray: [16,32,32,0],
        normal: [-0.8944271909999159, -0.4472135954999579]
      }
    ],
    onHit
  },
  // steep slope down 1
  1403350: {
    sheet: 'groundAtlas',
    coords: {x:192, y:96, w:32, h:32},
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
    coords: {x:192, y:128, w:32, h:32},
    rays: [
      {
        ray: [16,32,32,32],
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