class Town {
    constructor(townName){
        this.name = townName
        this.users = Array(0)
        this.teams= Array(0)
        this.bagDrops= Array(0)
        this.stats={}
    }
    cleanStats(){
        this.users = Array(0)
        this.teams= Array(0)
        this.bagDrops= Array(0)
        this.stats={}
    }
}