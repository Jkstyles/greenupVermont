class Vermont {
    constructor() {
        this.counties = {
            
        }
        this.stats = {
            
        }
        this.getBagCount()
        this.getTotalProfiles()
        this.getTotalTeams()
        this.getCounties()
    }
    getCounties() {
        let counties =countyPolygons.features
        for (let county in counties) {
            let countyName = counties[county].properties.CNTYNAME.toLowerCase()
            this.counties[countyName] = new County(countyName)
          }
    }
    getTotalProfiles() {
        const thisplaceholder = this
        var teams = firebase
        .database()
        .ref('profiles/')
        .on('value', function (snapshot) {
            let profilesCountArray = []
            let profilesCountObject = snapshot.val()
            for (var key in profilesCountObject) {
                profilesCountArray.push(profilesCountObject[key])
            }
            totalProfiles = profilesCountArray.length
            thisplaceholder.stats.totalUsers = totalProfiles
            
        })
    }
    getBagCount() {   
        const thisplaceholder = this
        var trashDrops = firebase
        .database()
        .ref('trashDrops/')
        .on('value', function (snapshot) {
            let bagCountArray = []
            let trashDropsObject = snapshot.val()
            for (var key in trashDropsObject) {
                bagCountArray.push(trashDropsObject[key].bagCount)
            }
            totalBagsDropped = bagCountArray.reduce(function (total, currentValue) {
                return total + currentValue;
            }, 0);
            thisplaceholder.stats.bagCount = totalBagsDropped
        })
    }
    getTotalTeams() {
        var profiles = firebase
        .database()
        .ref('teams/')
        .on('value', (snapshot) => {
            let teamsCountArray = []
            let teamCountObject = snapshot.val()
            for (var key in teamCountObject) {
                teamsCountArray.push(teamCountObject[key])
            }
            totalTeams = teamsCountArray.length
            this.stats.teams = totalTeams
        })
        
    }
    
    
}


