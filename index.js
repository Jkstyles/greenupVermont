 
    //these are the variables that point to useful numbers
    let totalBagsDropped;
    let totalTeams;
    let totalProfiles;
    let level = 'state'
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAjwSCpOvLPgYcFr26V3gmfwJlGb-VtWAs",
      authDomain: "greenupvermont-de02b.firebaseapp.com",
      databaseURL: "https://greenupvermont-de02b.firebaseio.com",
      projectId: "greenupvermont-de02b",
      storageBucket: "greenupvermont-de02b.appspot.com",
      messagingSenderId: "439621369113"
    };
    const email = "WillyNillyLoman@gmail.com"
    const password = "burlingtonCA"

    firebase.initializeApp(config);
    var database = firebase.database();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // ToDo: handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    let vermont = new Vermont
    // function buildCountyBagsArrays() {
    //   console.log('trash populate start')
    //   var trashDrops = firebase
    //     .database()
    //     .ref('trashDrops/')
    //     .on('value', function (snapshot) {
    //       trashDropsObject = snapshot.val()
    //       console.log('data retrieved')
    //       for (let county in vermont.counties) {
    //         vermont.counties[county].bagDrops = Array(0)
    //       }
    //       for (var key in trashDropsObject) {
    //         let countyBoundaries = L.geoJSON(countyPolygons);
    //         // put the coordinates of the trash drop object into a conveinient form
    //         let keyCoordinates = [trashDropsObject[key].location.longitude, trashDropsObject[key].location.latitude]
    //        // figure out which county the point is in, then cleans up that county name so it's usable in the next function
    //         var resultsArray = leafletPip.pointInLayer(keyCoordinates, countyBoundaries, true)
    //         var results = resultsArray[0].feature.properties.CNTYNAME.toLowerCase()
    //         //looks through the list of counties in our vermont object, finds the one whose name matches the one the trash drop is in. Then pushes the trash drop into an array in that county object.
    //         for(let county in vermont.counties){
    //           if(results === vermont.counties[county].name){
    //             vermont.counties[county].bagDrops.push(trashDropsObject[key])
    //           }            
    //         }
    //       }
    //       //to do: calculateTownBagCount
    //       //to do: calculateCountyBagCount
    //       console.log('populate finished.')
    //       console.log(vermont)
    //     })
    // }

    // buildCountyBagsArrays();

//  var mymap = L.map('mapid').setView([44.0423, -72.6034], 8);
//     L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 19,
//     id: 'mapbox.streets',
// }).addTo(mymap);

// //The beginnings of a function that makes the choropleth.
// let counties =countyPolygons.features
// for (county in counties) {
//   counties[county].properties.bagCount = bagCountOf(county)
// }
// let countyBoundaries = L.geoJSON(countyPolygons);
// countyBoundaries.addTo(mymap)

// //ToDo: write a function in data structure to calculate total bag drops per county. Call it to get bag count for chloropleth.
// function bagCountOf(county) {
  
// } 

// each of the counties in countyBoundaries already has a bounding box, addisons is at the variable below.
// this would make zooming easy when we get around to that.

// mymap.fitBounds(countyBoundaries._layers['51']._bounds)