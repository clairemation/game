class Control{
    constructor(args = {}){
        Object.assign(this, args)
    }

    update(deltaTime){
        //Override
    }
}

module.exports = Control