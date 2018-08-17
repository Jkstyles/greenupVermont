// (1).pad(3) // => "001"
// (10).pad(3) // => "010"
// (100).pad(3) // => "100"
  

function updateOdometer() {

    Number.prototype.pad = function(size) {
        var s = String(this);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
      }
 
    if (level === 'state') {
 
        setTimeout(function () {
            bagsOdometer.innerHTML = (vermont.stats.bagCount)
        }, 200);
        setTimeout(function () {
            teamsOdometer.innerHTML = (vermont.stats.totalTeams)
        }, 400);
        setTimeout(function () {
            usersOdometer.innerHTML = vermont.stats.totalUsers;
        }, 600);
   
    } else if (level === 'county') {
   
        setTimeout(function () {
            bagsOdometer.innerHTML = vermont.countyNumber(currentCounty).stats.bagCount
        }, 200);
        setTimeout(function () {
            teamsOdometer.innerHTML = vermont.countyNumber(currentCounty).stats.totalTeams
        }, 400);
        setTimeout(function () {
            usersOdometer.innerHTML = vermont.countyNumber(currentCounty).stats.userActivity
        }, 600);
   
    } else if (level === 'town') {
       
        setTimeout(function () {
            bagsOdometer.innerHTML = currentTown.stats.bagCount
        }, 200);
        setTimeout(function () {
            teamsOdometer.innerHTML = currentTown.stats.totalTeams
        }, 400);
        setTimeout(function () {
            usersOdometer.innerHTML = currentTown.stats.userActivity
        }, 600);
   
    }
}