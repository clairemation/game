const IMG_REGEX = /.*\.(jpg|png|gif)/
const AUDIO_REGEX = /.*\.(wav|mp3)/

window.AudioContext = window.AudioContext || window.webkitAudioContext
var audioCtx = new AudioContext()

// Asset src list follows this form:
// var assetSrcs = {
//     sprite: "assets/spritesheets/sheet00.png",
//     boing: "assets/boing.wav",
//     caw: "assets/caw.wav",
//     crunch: "assets/crunch.wav",
//     crunch2: "assets/crunch2.wav",
//     flap: "assets/flap.wav",
//     screech: "assets/pusou.wav",
//     slime: "assets/blop.wav"
// }

class AssetManager {

    constructor(assetSrcs){
        this.assets = {}
        this.assetSrcs = assetSrcs
        this.loadPercent = 0
    }

    dump(){
        this.assets = {}
    }

    load(){
        var assetLoadPromises = []
        for (name in this.assetSrcs){
            assetLoadPromises.push(this._assetLoadPromise(name, this.assetSrcs[name]))
        }
        return new Promise((res, rej) => {
            Promise.all(assetLoadPromises).then(() => {
                this.loadPercent = 0
                res()
            })
        })
    }

    onLoadProgress(loadPercent){}

    play(clipName){
        var src = audioCtx.createBufferSource()
        src.buffer = this.assets[clipName]
        src.connect(audioCtx.destination)
        src.start(0)
    }

    _assetLoadPromise(name, src){
        return new Promise((res, rej) => {
            if (src.match(IMG_REGEX)){
                this._resolveImgLoad(name, src, res, rej)
            } else if (src.match(AUDIO_REGEX)) {
                this._resolveAudioLoad(name, src, res, rej)
            }
        })
    }

    _incrementLoadPercent(){
        this.loadPercent = Math.ceil(this.loadPercent + (1 / Object.keys(this.assetSrcs).length * 100))
        this.onLoadProgress(this.loadPercent)
    }

    // TODO: Load error handling
    _resolveImgLoad(name, src, resolve, reject){
        if (this.assets[name]){
            this._incrementLoadPercent()
            resolve()
        } else {
            var img = new Image()
            img.onload = () => {
                this._incrementLoadPercent()
                this.assets[name] = img
                resolve()
            }
            img.onerror = reject
            img.src = src
        }
    }

    _resolveAudioLoad(name, src, resolve, reject){
        if (this.assets[name]){
            this._incrementLoadPercent()
            resolve()
        } else {
            var req = new XMLHttpRequest()
            req.open('GET', src, true)
            req.responseType ='arraybuffer'
            req.onload = () => {
                audioCtx.decodeAudioData(req.response, buffer => {
                    this._incrementLoadPercent()
                    this.assets[name] = buffer
                    resolve()
                })
            }
            req.send()
        }
    }
}

module.exports = AssetManager