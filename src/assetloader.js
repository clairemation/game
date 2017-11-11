var assets = {
    flapAudio: new Audio(),
    crunchAudio: new Audio(),
    crunch2Audio: new Audio(),
    blopAudio: new Audio(),
    screechAudio: new Audio(),
    boingAudio: new Audio(),
    cawAudio: new Audio(),
    sprite: new Image()
}

var assetSrcs = {
    sprite: "assets/spritesheets/sheet00.png",
    flapAudio: "assets/flap.wav",
    crunchAudio: "assets/crunch.wav",
    crunch2Audio: "assets/crunch2.wav",
    screechAudio: "assets/pusou.wav",
    blopAudio: "assets/blop.wav",
    boingAudio: "assets/boing.wav",
    cawAudio: "assets/caw.wav"
}


function loadPromise(asset, src){
    return new Promise((res, rej) => {
        asset.onload = res
        asset.onerror = res
        asset.oncanplaythrough = res
        asset.src = src
        if (asset.play) {
            asset.load()
        }
    })
}

var assetPromises = []

function load(){
    for (name in assets){
        assetPromises.push(loadPromise(assets[name], assetSrcs[name]))
    }

    return Promise.all(assetPromises)
}

module.exports = {
    assets,
    load
}