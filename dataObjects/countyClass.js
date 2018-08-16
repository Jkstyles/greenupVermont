class County {
    constructor(countyName){
        this.name = countyName
        //ToDo?:add this.polygon for map interaction?
        this.towns = {
            
        }
        this.teams = Array(0)
        this.bagDrops = Array(0)
        this.stats = {
            
        }
    }
    getBagStats() {
        //set up an array to work with at the county level later.
        let countyBagCountArray = []
        //For each town
        for (let town in this.towns) {
            //set up a working array
            let townBagCountArray = []
            //Take each drop in the array, and push its number of bags to the towns's array
            for(let bagDrop in this.towns[town].bagDrops){
                let bagNumber = this.towns[town].bagDrops[bagDrop].bagCount
                townBagCountArray.push(bagNumber)
            }
            // add up the bag numbers in the town array for a total number of bags in the town
            totalBagsDropped = _.sum(townBagCountArray)
            // 'Save' the total number of bags at the town level to a property of the town Object.
            this.towns[town].stats.bagCount = totalBagsDropped
            // take that total number of town bags and push it to the county level array.
            countyBagCountArray.push(totalBagsDropped)
        }
        // sum up bag counts again. this time at the county level to get a total number of bags in the county.
        let countyBagCount = _.sum(countyBagCountArray)
        // 'Save' the total number of bags at the county level to a property of the county Object.
        this.stats.bagCount = countyBagCount
    }
    getTeamAndUserStats() {
        //set up arrays to work with later
        let teamCountArray = []
        let userCountArray = []
        //for each town
        for (let town in this.towns) {
            //set the totalTeams subproperty of stats to the number of towns
            this.towns[town].stats.totalTeams = this.towns[town].teams.length
            //set userActivity to the total number of team members in the town.
            this.towns[town].stats.userActivity = _.sum(this.towns[town].users)
            //and push those numbers to our working arrays
            teamCountArray.push(this.towns[town].stats.totalTeams)
            userCountArray.push(this.towns[town].stats.userActivity)
        }
        //add up the tnumber of teams and users in each town
        let totalCountyTeams = _.sum(teamCountArray)
        let totalCountyUsers = _.sum(userCountArray)
        //and 'save' those numbers as a property of the county
        this.stats.totalTeams = totalCountyTeams
        this.stats.userActivity = totalCountyUsers
    }
    cleanStats(){
        this.stats= {}
        this.teams = Array(0)
        this.bagDrops = Array(0)
        for (let town in this.towns) {
            this.towns[town].cleanStats()
        }
    }
}