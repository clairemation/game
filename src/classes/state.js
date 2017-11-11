class State{
    constructor(args = {}){
        Object.assign(this, args)
    }
    enter(){
        //Override
    }
    exit(){
        //Override
    }
    message(msg){
        //Override
    }
    update(deltaTime){
        //Override
    }
}

module.exports = State