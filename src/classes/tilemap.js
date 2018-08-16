var PIXEL_WIDTH = 320, PIXEL_HEIGHT = 240
var TILE_SIZE = 32

class TileMap{
  constructor(args){
    this.mapSrc = args.mapSrc
    this.key = args.key
    this.map = []
    this.name = args.name || 'tileMap'
  }

  init(){
    return new Promise((resolve, reject) => {
      var img = new Image()
      img.onload = () => {
        var tempCanvas = document.createElement('canvas')
        tempCanvas.width = img.width
        tempCanvas.height = img.height
        var tempCtx = tempCanvas.getContext('2d')
        tempCtx.drawImage(img, 0, 0, img.width, img.height)
        var imgData = tempCtx.getImageData(0, 0, img.width, img.height).data
        var oneDArr = []
        //B & W image, only need one channel
        for (let i = 0; i < imgData.length; i += 4){
          oneDArr.push(imgData[i])
        }
        this.map = []
        for (let y = 0; y < img.height; y++){
          this.map[y] = []
          for (let x = 0; x < img.width; x++){
            this.map[y].push(oneDArr[y * img.width + x])
          }
        }
        console.log(this.map)
        resolve()
      }
      img.src = this.mapSrc
    })
  }

  worldToMapCoords(x, y){
    return [Math.abs(Math.floor(x / TILE_SIZE)), Math.abs(Math.floor(y / TILE_SIZE))]
  }

  getTileAtWorldPosition(x, y){
    var mapCoords = this.worldToMapCoords(x, y)
    this.getTileAtMapCoords(...mapCoords)
  }

  getTileAtMapCoords(x, y){
    if (y >= this.map.length|| x >= this.map[0].length){
      return null
    }
    var tile = this.map[y][x]
    if (tile == 255){
      return null
    }
    return this.key[tile]
  }

  getSpriteAt(y, x){
    if (y > this.map.length - 1 || x > this.map[0].length - 1){
      return null
    }
    var tile = this.map[y][x]
    if (tile == '255'){
      return null
    }
    return this.key[tile]
  }

  mapToWorldCoords(x, y){
    return [x * 32, y * 32]
  }
}

module.exports = TileMap