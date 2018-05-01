class Control{
    constructor(args = {}){
      this.owner = args.owner
      this.name = args.name
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