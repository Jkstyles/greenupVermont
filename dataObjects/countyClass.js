class County {
    constructor(countyName){
        this.name = countyName
        //add this.polygon for map interaction?
        this.towns = {
            
        }
        this.bagDrops = Array(0)
        this.stats = {
            
        }
    }
    getBagStats() {
        //set up an array to work with at the state level later.
        let countyBagCountArray = []
        //For each county
        for (let town in this.towns) {
            //set up a working array
            let townBagCountArray = []
            //Take each drop in the array, and push its number of bags to the county's array
            for(let bagDrop in this.towns[town].bagDrops){
                let bagNumber = this.towns[town].bagDrops[bagDrop].bagCount
                townBagCountArray.push(bagNumber)
            }
            // add up the bag numbers in the county array for a total number of bags in the county
            totalBagsDropped = townBagCountArray.reduce(function (total, currentValue) {
                return total + currentValue;
            }, 0);
            // 'Save' the total number of bags at the county level to a property of the County Object.
            this.towns[town].stats.bagCount = totalBagsDropped
            // take that total number of county bags and push it to the state level array.
            countyBagCountArray.push(totalBagsDropped)
        }
        // sum up bag counts again. this time at the county level to get a total number of bags in the county.
        let countyBagCount = countyBagCountArray.reduce(function (total, currentValue) {
            return total + currentValue;
        }, 0);
        // 'Save' the total number of bags at the state level to a property of the Vermont Object.
        this.stats.bagCount = countyBagCount
    }
    getTeamStats() {
        let teamCountArray = []
        for (let town in this.towns) {
            this.towns[town].stats.totalTeams = this.towns[town].teams.length
            teamCountArray.push(this.towns[town].stats.totalTeams)
        }
        let totalCountyTeams = teamCountArray.reduce(function (total, currentValue) {
            return total + currentValue;
        }, 0);
        this.stats.totalTeams = totalCountyTeams
    }
}