//this function is ready to go for for the state and county levels when the back-end team is ready to call it. You can play with if from the console if you want to see it. When currentTown is ready, we can change the "placeHolder" bits.

function updateLabels() {
    
    if (level === 'state') {
       
        document.getElementById('bagCounterLabel').innerText = "Total Bags in Vermont"
        document.getElementById('teamCounterLabel').innerText = "Total Teams in Vermont"
        document.getElementById('userCounterLabel').innerText = "Total Users in Vermont"

    } else if (level === 'county') {
       
        document.getElementById('bagCounterLabel').innerText = "Total Bags in " + vermont.countyNumber(currentCounty).name.replace(/\w/, c => c.toUpperCase())
        document.getElementById('teamCounterLabel').innerText = "Total Teams in " + vermont.countyNumber(currentCounty).name.replace(/\w/, c => c.toUpperCase())
        document.getElementById('userCounterLabel').innerText = "Total Users in " + vermont.countyNumber(currentCounty).name.replace(/\w/, c => c.toUpperCase())
   
    } else if (level === 'town') {
       
        document.getElementById('bagCounterLabel').innerText = "Total Bags in " + currentTown.name.replace(/\w/, c => c.toUpperCase())
        document.getElementById('teamCounterLabel').innerText = "Total Teams in " + currentTown.name.replace(/\w/, c => c.toUpperCase())
        document.getElementById('userCounterLabel').innerText = "Total Users in " + currentTown.name.replace(/\w/, c => c.toUpperCase())
    }

}