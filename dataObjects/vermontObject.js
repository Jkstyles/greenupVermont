class Vermont {
    constructor() {
        this.counties = {
            
        }
        this.stats = {
            
        }
        this.getCounties()
        this.getTowns()
        this.getFirebaseData()
    }
    getCounties() {
        //Puts a county object for each Vermont county into the vermontObject
        let counties =countyPolygons.features
        for (let county in counties) {
            let countyName = counties[county].properties.CNTYNAME.toLowerCase()
            this.counties[countyName] = new County(countyName)
        } 
    }
    getTowns() {
        //Puts a town object for each town in vermont into it's appropriate county object
        for (let town in townPolygons.features) {
            let townName = townPolygons.features[town].properties.TOWNNAME.toLowerCase()
            let CNTYNum = townPolygons.features[town].properties.CNTY
            this.countyNumber(CNTYNum).towns[townName] = new Town(townName)
        }
    }

    getFirebaseData() {
        console.log('Getting Data')
        var profiles = firebase
        .database()
        .ref('/')
        .on('value', (snapshot) => {
            console.log('data retrieved')
            let teamsObject = snapshot.val().teams
            let teamMembersObject = snapshot.val().teamMembers
            let trashDropsObject = snapshot.val().trashDrops
            let profilesCountObject = snapshot.val().profiles

            this.getTotalProfiles(profilesCountObject)
            this.buildCountyBagsArrays(trashDropsObject)
            this.sortTeamsAndMembersToTowns(teamsObject, teamMembersObject)
            this.getTotalTeams();
            createChoropleth();
            updateLabels();
            removeLoading();
            updateOdometer();

        })
    }

    buildCountyBagsArrays(trashDropsObject) {
            //for each trashdrop
            for (var key in trashDropsObject) {
                let townBoundaries = L.geoJSON(townPolygons);
                // put the coordinates of the trash drop object into a conveinient form
                let keyCoordinates = [trashDropsObject[key].location.longitude, trashDropsObject[key].location.latitude]
                // figure out which town the drop is in, then cleans up that town name so it's usable in the next function
                var resultsArray = leafletPip.pointInLayer(keyCoordinates, townBoundaries, true)
                var results = resultsArray[0].feature.properties.TOWNNAME.toLowerCase()
                //looks through the list of counties in our vermont object,
                for(let county in this.counties){
                    county = this.counties[county]
                    //for a town object with the same name as the town the team is in.
                    if (county.towns[results]){
                        //Then push the bag drop into the existing bag drop array in that town object.
                        county.towns[results].bagDrops.push(trashDropsObject[key])
                        //and escape the loop
                        break;
                    }
                }
            }
            
            this.getBagStats()
            console.log(vermont)
       
    }
    
    
    sortTeamsAndMembersToTowns(teamsObject, teamMembersObject){
        this.townlessTeamsArray = []
            //for each team in the database
            for (var team in teamsObject) {
                //get the town that team is in,
                let teamTown = teamsObject[team].town.toLowerCase().trim() 
                //(if there is one)
                if (teamTown) {
                    //then search through the counties
                    for(let county in this.counties){
                        county = this.counties[county]
                        //for a town object with the same name as the town the team is in.
                        if (county.towns[teamTown]){
                            //Then push the team into the existing team array in that town object.
                            county.towns[teamTown].teams.push(teamsObject[team])
                            //Save a count of the number of users in each team.
                            county.towns[teamTown].users.push(Object.keys(teamMembersObject[team]).length)
                            //and escape the loop
                            break;
                        }
                    //     //(set up a loop escape for later)
                    //     let done                      
                    //     //and all the towns in the counties
                    //     for(let town in county.towns) {
                    //         
                    //         if(teamTown === county.towns[town].name){
                                
                    //             
                    //             county.towns[town].teams.push(teamsObject[team])
                    //             //set your flag to escape the loop,
                    //             done = true
                    //             break;                       
                    //         }          
                    //     } 
                    //     //and move on to the next team
                    //     if(done){
                    //         break;
                    //     } 
                    }
                } 
                //If the team doesn't have a town
                else {
                    this.townlessTeamsArray.push(teamsObject[team])
                }
            }
            for (let county in this.counties) {
                this.counties[county].getTeamAndUserStats()
            }
            console.log('populate finished.')
    }
    getTotalProfiles(profilesCountObject) {
        let profilesCountArray = []
            for (var key in profilesCountObject) {
                profilesCountArray.push(profilesCountObject[key])
            }
            totalProfiles = profilesCountArray.length
            this.stats.totalUsers = totalProfiles
    }
    
    getBagStats() {
        //set up an array to work with at the state level later.
        let stateBagCountArray = []
        //For each county
        for (let county in this.counties) {
            this.counties[county].getBagStats()
            stateBagCountArray.push(this.counties[county].stats.bagCount)
        }
        // sum up bag counts again. this time at the state level to get a total number of bags in the state.
        let stateBagCount = _.sum(stateBagCountArray)
        // 'Save' the total number of bags at the state level to a property of the Vermont Object.
        this.stats.bagCount = stateBagCount
    }
    
    //Gets the team count from each county and sums it to get the total teams in the state.
    getTotalTeams() {
        let teamCountArray = []
        for (let county in this.counties) {
            teamCountArray.push(this.counties[county].stats.totalTeams)
        } 
        let totalCountyTeams = _.sum(teamCountArray)
        this.stats.totalTeams = totalCountyTeams + this.townlessTeamsArray.length
        makeChart();


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
