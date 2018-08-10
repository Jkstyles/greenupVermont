class Vermont {
    constructor() {
        this.counties = {
            
        }
        this.stats = {
            
        }
        this.getTotalProfiles()
        this.getCounties()
        this.buildCountyBagsArrays()
        this.getTeams()
    }
    getCounties() {
        let counties =countyPolygons.features
        for (let county in counties) {
            let countyName = counties[county].properties.CNTYNAME.toLowerCase()
            this.counties[countyName] = new County(countyName)
        } 
    }
    buildCountyBagsArrays() {
        console.log('trash populate start')
        var trashDrops = firebase
        .database()
        .ref('trashDrops/')
        .on('value', (snapshot) => {
            let trashDropsObject = snapshot.val()
            console.log('data retrieved')
            // create the arrays to store bagDrops in each county
            for (let county in this.counties) {
                this.counties[county].bagDrops = Array(0)
            }
            //for each trashdrop
            for (var key in trashDropsObject) {
                let countyBoundaries = L.geoJSON(countyPolygons);
                // put the coordinates of the trash drop object into a conveinient form
                let keyCoordinates = [trashDropsObject[key].location.longitude, trashDropsObject[key].location.latitude]
                // figure out which county the drop is in, then cleans up that county name so it's usable in the next function
                var resultsArray = leafletPip.pointInLayer(keyCoordinates, countyBoundaries, true)
                var results = resultsArray[0].feature.properties.CNTYNAME.toLowerCase()
                //looks through the list of counties in our vermont object, finds the one whose name matches the one the trash drop is in.
                for(let county in this.counties){
                    if(results === this.counties[county].name){
                        //Then push the trash drop into the array in that county object we set up earlier.
                        this.counties[county].bagDrops.push(trashDropsObject[key])
                    }            
                }
            }
            //to do: calculateTownBagCount
            console.log('populate finished.')
            this.getBagStats()
            putBagNumbersInPolygonData()
            console.log(vermont)
        })
    }
    
    getTotalProfiles() {
        const thisplaceholder = this
        var teams = firebase
        .database()
        .ref('profiles/')
        .on('value', (snapshot) => {
            let profilesCountArray = []
            let profilesCountObject = snapshot.val()
            for (var key in profilesCountObject) {
                profilesCountArray.push(profilesCountObject[key])
            }
            totalProfiles = profilesCountArray.length
            thisplaceholder.stats.totalUsers = totalProfiles
            
        })
    }
    
    getBagStats() {
        //set up an array to work with at the state level later.
        let stateBagCountArray = []
        //For each county
        for (let county in this.counties) {
            //set up a working array
            let bagCountArray = []
            //Take each drop in the array, and push its number of bags to the county's array
            for(let bagDrop in this.counties[county].bagDrops){
                let bagNumber = this.counties[county].bagDrops[bagDrop].bagCount
                bagCountArray.push(bagNumber)
            }
            // add up the bag numbers in the county array for a total number of bags in the county
            totalBagsDropped = bagCountArray.reduce(function (total, currentValue) {
                return total + currentValue;
            }, 0);
            // 'Save' the total number of bags at the county level to a property of the County Object.
            this.counties[county].stats.bagCount = totalBagsDropped
            // take that total number of county bags and push it to the state level array.
            stateBagCountArray.push(totalBagsDropped)
        }
        // sum up bag counts again. this time at the state level to get a total number of bags in the state.
        let stateBagCount = stateBagCountArray.reduce(function (total, currentValue) {
            return total + currentValue;
        }, 0);
        // 'Save' the total number of bags at the state level to a property of the Vermont Object.
        this.stats.bagCount = stateBagCount
    }
    
    getTeams() {
        var profiles = firebase
        .database()
        .ref('teams/')
        .on('value', (snapshot) => {
            this.townlessTeamsArray = []
            for (let county in this.counties) {
                this.counties[county].teams = Array(0)
            }
            let teamCountObject = snapshot.val()
            for (var team in teamCountObject) {
                let teamTown = teamCountObject[team].town.toUpperCase().trim()
                let teamCNTY; 
                if (teamTown) {
                    for (let town in townPolygons.features) {
                        let townName = townPolygons.features[town].properties.TOWNNAME
                        if (townName === teamTown){
                            teamCNTY = townPolygons.features[town].properties.CNTY
                            break
                        }
                    }
                    let countyObject = this.countyNumber(teamCNTY)
                    if (countyObject){
                        countyObject.teams.push(teamCountObject[team])
                    } else {
                        this.townlessTeamsArray.push(teamCountObject[team])
                    }
                }
            }
            for (let county in this.counties) {
                this.counties[county].stats.totalTeams = this.counties[county].teams.length
            }
            
            this.getTotalTeams()
        })
    }

    //Gets the team count from each county and sums it to get the total teams in the state.
    getTotalTeams() {
        let teamCountArray = []
        for (let county in this.counties) {
            teamCountArray.push(this.counties[county].stats.totalTeams)
        } 
        let totalCountyTeams = teamCountArray.reduce(function (total, currentValue) {
            return total + currentValue;
        }, 0);
        this.stats.totalTeams = totalCountyTeams + this.townlessTeamsArray.length
    }
    //Apparently each county in vermont has a number that refers just to that county.
    //This is a function that takes the County Number, listed for each town in our town polygons, and returns the county object that number corresponds to.
    countyNumber(CNTYNumber) {
        switch (CNTYNumber) {
            case 19:
            return this.counties.orleans
            break;
            case 13:
            return this.counties['grand isle']
            break;
            case 7:
            return this.counties.chittenden
            break;
            case 27:
            return this.counties.windsor
            break;
            case 25:
            return this.counties.windham
            break;
            case 3:
            return this.counties.bennington
            break;
            case 11:
            return this.counties.franklin
            break;
            case 9:
            return this.counties.essex
            break;
            case 15:
            return this.counties.lamoille
            break;
            case 5:
            return this.counties.caledonia
            break;
            case 17:
            return this.counties.orange
            break;
            case 23:
            return this.counties.washington
            break;
            case 21:
            return this.counties.rutland
            break;
            case 1:
            return this.counties.addison
            break;
        }
    }
    
}


