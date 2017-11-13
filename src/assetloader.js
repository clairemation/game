const IMG_REGEX = /.*\.(jpg|png|gif)/
const AUDIO_REGEX = /.*\.(wav|mp3)/

window.AudioContext = window.AudioContext || window.webkitAudioContext
var audioCtx = new AudioContext()

var assets = {
    sprite: new Image(),
    boing: {buffer: null, lastPlayed: 0},
    caw: {buffer: null, lastPlayed: 0},
    crunch: {buffer: null, lastPlayed: 0},
    crunch2: {buffer: null, lastPlayed: 0},
    flap: {buffer: null, lastPlayed: 0},
    screech: {buffer: null, lastPlayed: 0},
    slime: {buffer: null, lastPlayed: 0},
}

var assetSrcs = {
    sprite: "assets/spritesheets/sheet00.png",
    boing: "assets/boing.wav",
    caw: "assets/caw.wav",
    crunch: "assets/crunch.wav",
    crunch2: "assets/crunch2.wav",
    flap: "assets/flap.wav",
    screech: "assets/pusou.wav",
    slime: "assets/blop.wav"
}

function play(audioBuffer, currentTime){
    if (currentTime - audioBuffer.lastPlayed < 100) return
    var src = audioCtx.createBufferSource()
    src.buffer = audioBuffer.buffer
    src.connect(audioCtx.destination)
    audioBuffer.lastPlayed = currentTime
    src.start(0)
}

function loadPromise(asset, src){
    return new Promise((res, rej) => {
        if (src.match(IMG_REGEX)){
            loadImg(asset, src, res, rej)
        } else if (src.match(AUDIO_REGEX)) {
            loadAudio(asset, src, res, rej)
        }
    })
}

function loadImg(img, src, resolve, reject){
    img.onload = resolve
    img.onerror = resolve
    img.src = src
}

function loadAudio(audio, src, resolve, reject){
    var req = new XMLHttpRequest()
    req.open('GET', src, true)
    req.responseType ='arraybuffer'
    req.onload = () => {
        audioCtx.decodeAudioData(req.response, buffer => {
            audio.buffer = buffer
            resolve()
        })
    }
    req.send()
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
    load,
    play
}