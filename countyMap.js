let currentCounty
var mymap = L.map('mapid', {zoomControl: false, }).setView([44.0423, -72.6034], 8);
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    id: 'mapbox.streets',
}).addTo(mymap);

let townBoundaries
let countyBoundaries = L.geoJson(countyPolygons, {
        fillColor: '#1D4F1A',
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '',
        fillOpacity: 0.6
}).addTo(mymap)

function createChoropleth() {
    //inserts that data into the polygon objects.
    let dataType = 
    document.getElementById('trashRadio').checked ? 'trash' :
    document.getElementById('teamRadio').checked ? 'teams' :
    'users'

if (level === 'state') {
    let counties = countyPolygons.features
    for (let countyIndex in counties) {
        let targetCounty = counties[countyIndex].properties.CNTYNAME.toString().toLowerCase()
        counties[countyIndex].properties.choroplethData = (dataType === 'trash') ? bagCountOf(targetCounty) : (dataType === 'teams') ? teamCountOf(targetCounty) : teamCountOf(targetCounty); 
    }
    mymap.removeLayer(countyBoundaries);

    countyBoundaries = L.geoJson(countyPolygons, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(mymap);
} else if (level === 'county') {
    for(let county in vermont.counties){
        county = vermont.counties[county]
        for(let town in county.towns){
            town = county.towns[town]
            for(let townPolygon in townPolygons.features){
                townPolygon = townPolygons.features[townPolygon]
                if (townPolygon.properties.TOWNNAME.toLowerCase() == town.name){
                    townPolygon.properties.choroplethData = (dataType === 'trash')  ? town.stats.bagCount : town.stats.totalTeams; 
                    break
                }
            }
        }
    }
    createTownMap()
}
}

function bagCountOf(county) {
    return vermont.counties[county].stats.bagCount
}

function teamCountOf(county) {
    return vermont.counties[county].stats.totalTeams
}

// each of the counties in countyBoundaries already has a bounding box, addisons is at the variable below.
// this would make zooming easy when we get around to that.
// mymap.fitBounds(countyBoundaries._layers['51']._bounds)

function getColor(d) {
    return d > 27 ? '#043300' :
    d > 25 ? '#10410D' :
    d > 23 ? '#1D4F1A' :
    d > 21 ? '#295D27' :
    d > 19 ? '#366B34' :
    d > 17 ? '#427941' :
    d > 15 ? '#F48748' :
    d > 13 ? '#5C955B' :
    d > 11 ? '#68A368' :
    d > 9 ? '#75B175' :
    d > 7 ? '#81BF82' :
    d > 5 ? '#8ECD8F' :
    d > 3 ? '#9ADB9C' :
    d > 1 ? '#A7E9A9' :
    d > 0 ? '#B4F8B6' :
    d === 0 ?'#DFFFDF':
    '#000000';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.choroplethData),
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '',
        fillOpacity: 0.8
    };
}

function highlightFeature(e) {
    var layer = e.target;
    
    layer.setStyle({
        weight: 3,
        color: 'black',
        dashArray: '',
        fillOpacity: 1
    });
    
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties)
}

function resetHighlight(e) {
    // townBoundaries.resetStyle(e.target)
    countyBoundaries.resetStyle(e.target);
    info.update()
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
    console.log(e.target)
    currentCounty = e.target.feature.properties.CNTY
    level = (e.target.feature.properties.TOWNNAME ? 'town' : 'county')
    createChoropleth()
    //This Function doesn't exist yet. Make it in a new townMap.js file.
    //It should remove countyBoundaries and info from mymap and add the town versions.
    //moveToTownChoropleth()
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var info = L.control();

info.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    let dataType = 
    document.getElementById('trashRadio').checked ? 'trash' :
    document.getElementById('teamRadio').checked ? 'teams' :
    'users'
    if (level == 'state'){
    this._div.innerHTML =  '<h4>' + (dataType === 'trash' ? 'Total Bags by' : 'Total Teams By ') + (level === 'state' ? 'County' : 'Town') + '</h4>' + (props ? 
    '<b>' + props.CNTYNAME + '</b><br />' + props.choroplethData + ' ' + (dataType === 'trash' ? "bags":'teams')
    : 'Hover over a county');
    } else if(level = 'county'){
        this._div.innerHTML =  '<h4>' + (dataType === 'trash' ? 'Total Bags by' : 'Total Teams By ') + (level === 'state' ? 'County' : 'Town') + '</h4>' + (props && props.TOWNNAME ? 
            '<b>' + props.TOWNNAME + '</b><br />' + props.choroplethData + ' ' + (dataType === 'trash' ? "bags":'teams')
            : 'Hover over a town');
    }
};

function createTownMap(){
    console.log('create town called')
    if (townBoundaries) {mymap.removeLayer(townBoundaries)};
    townBoundaries = L.geoJson(townPolygons, {
        style: style,
        onEachFeature: onEachFeature,
        filter: (feature, layer) => {
           return (feature.properties.CNTY === currentCounty ? true : false)
           
        }
    }).addTo(mymap);
}



mymap.dragging.disable();
mymap.touchZoom.disable();
mymap.doubleClickZoom.disable();
mymap.scrollWheelZoom.disable();


info.addTo(mymap);