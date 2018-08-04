var PIXEL_WIDTH = 320, PIXEL_HEIGHT = 240
var TILE_SIZE = 32

class TileMap{
  constructor(args){
    this.map = args.map
    this.key = args.key
    this.name = args.name
  }

  worldToMapCoords(x, y){
    return [Math.abs(Math.floor(y / TILE_SIZE)), Math.abs(Math.floor(x / TILE_SIZE))]
  }

  getTileAtMapPosition(x, y){
    var mapCoords = this.worldToMapCoords(x, y)
    if (mapCoords[0] > this.map.length - 1|| mapCoords[1] > this.map[0].length - 1){
      return null
    }
    var tile = this.map[mapCoords[0]][mapCoords[1]]
    if (tile == ' '){
      return null
    }
    return this.key[tile]
  }

  getSpriteAt(y, x){
    if (y > this.map.length - 1 || x > this.map[0].length - 1){
      return null
    }
    var tile = this.map[y][x]
    if (tile == ' '){
      return null
    }
    return this.key[tile]
  }
}

module.exports = TileMap