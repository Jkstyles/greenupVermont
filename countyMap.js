
    var mymap = L.map('mapid').setView([44.0423, -72.6034], 8);
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19,
    id: 'mapbox.streets',
}).addTo(mymap);

let countyBoundaries = L.geoJSON(countyPolygons);
countyBoundaries.addTo(mymap)
