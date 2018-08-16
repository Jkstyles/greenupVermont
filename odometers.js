
function updateOdometer() {
 
    if (level === 'state') {
 
        setTimeout(function () {
            bagsOdometer.innerHTML = vermont.stats.bagCount;
        }, 500);
        setTimeout(function () {
            teamsOdometer.innerHTML = vermont.stats.totalTeams;
        }, 500);
        setTimeout(function () {
            usersOdometer.innerHTML = vermont.stats.totalUsers;
        }, 500);
   
    } else if (level === 'county') {
   
        setTimeout(function () {
            bagsOdometer.innerHTML = vermont.countyNumber(currentCounty).stats.bagCount
        }, 500);
        setTimeout(function () {
            teamsOdometer.innerHTML = vermont.countyNumber(currentCounty).stats.totalTeams
        }, 500);
        setTimeout(function () {
            usersOdometer.innerHTML = vermont.countyNumber(currentCounty).stats.userActivity
        }, 500);
   
    } else if (level === 'town') {
       
        setTimeout(function () {
            bagsOdometer.innerHTML = 666
        }, 500);
        setTimeout(function () {
            teamsOdometer.innerHTML = 666
        }, 500);
        setTimeout(function () {
            usersOdometer.innerHTML = 666
        }, 500);
   
    }
}