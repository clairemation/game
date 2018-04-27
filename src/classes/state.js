class State{
    constructor(args = {}){
        Object.assign(this, args)
    }
    enter(game, scene){
        //Override
    }
    exit(game, scene){
        //Override
    }
    message(game, scene, msg){
        //Override
    }
    update(game, scene){
        //Override
    }
}

module.exports = State