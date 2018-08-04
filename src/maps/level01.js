const TileMap = require('../classes/tilemap')

var map = new TileMap({
    name: 'level01',
    map:
        [
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "----------------------------------------------------------------------------------------------".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split(''),
        "                                                                                              ".split('')
        ],

    key: {
      '-': require('../tile-data/ground')
    }
})

module.exports = map