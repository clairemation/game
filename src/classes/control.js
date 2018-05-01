class Control{
    constructor(args = {}){
      this.owner = args.owner
      // Override
    }

    getGame(){
      return this.owner.scene.game
    }

    init(){
      // Override
    }

    update(){
      //Override
    }
}

module.exports = Control