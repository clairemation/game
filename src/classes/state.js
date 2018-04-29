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
    message(e){
        //Override
    }
    update(){
        //Override
    }
}

module.exports = State