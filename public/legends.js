
function makeLegends(dataType) {

    if (level === 'state' && dataType === 'teams')  {

        legend = L.control({ position: 'bottomleft' });

        legend.onAdd = function (mymap) {

            var div = L.DomUtil.create('div', 'legend'),
                grades = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 30],
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML = 'Number of Teams' + '<br>'
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i]) + '"></i> ' +
                    grades[i] + '<br>';
            }

            return div;
        };
        legend.addTo(mymap);

    }

    if (level === 'state' && dataType === 'users')  {

        legend = L.control({ position: 'bottomleft' });

        legend.onAdd = function (mymap) {

            var div = L.DomUtil.create('div', 'legend'),
                grades = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 30],
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML = 'Number of Users' + '<br>'
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i]) + '"></i> ' +
                    grades[i] + '<br>';
            }

            return div;
        };
        legend.addTo(mymap);
    }
    if (level === 'state' && dataType === 'trash')  {

        legend = L.control({ position: 'bottomleft' });

        legend.onAdd = function (mymap) {

            var div = L.DomUtil.create('div', 'legend'),
                grades = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 30],
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML = 'Number of Trash Bags' + '<br>'
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i]) + '"></i> ' +
                    grades[i] + '<br>';
            }

            return div;
        };
        legend.addTo(mymap);
    }
    if (level === 'county' && dataType === 'trash' || level === 'town' && dataType === 'trash')  {

        legend = L.control({ position: 'bottomleft' });

        legend.onAdd = function (mymap) {

            var div = L.DomUtil.create('div', 'legend'),
                grades = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 30],
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML = 'Number of Trash Bags' + '<br>'
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getLocalColor(grades[i]) + '"></i> ' +
                    grades[i] + '<br>';
            }

            return div;
        };
        legend.addTo(mymap);
    }
    if (level === 'county' && dataType === 'users' || level === 'town' && dataType === 'users')  {

        legend = L.control({ position: 'bottomleft' });

        legend.onAdd = function (mymap) {

            var div = L.DomUtil.create('div', 'legend'),
                grades = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 30],
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML = 'Number of Users' + '<br>'
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getLocalColor(grades[i]) + '"></i> ' +
                    grades[i] + '<br>';
            }

            return div;
        };
        legend.addTo(mymap);
    }
    if (level === 'county' && dataType === 'teams' || level === 'town' && dataType === 'teams')  {

        legend = L.control({ position: 'bottomleft' });

        legend.onAdd = function (mymap) {

            var div = L.DomUtil.create('div', 'legend'),
                grades = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 30],
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML = 'Number of Teams' + '<br>'
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getLocalColor(grades[i]) + '"></i> ' +
                    grades[i] + '<br>';
            }

            return div;
        };
        legend.addTo(mymap);
    }

}

//     else {

//         legend = L.control({ position: 'bottomleft' });

//         legend.onAdd = function (mymap) {

//             var div = L.DomUtil.create('div', 'legend'),
//                 grades = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 30],
//                 labels = [];

//             // loop through our density intervals and generate a label with a colored square for each interval
//             for (var i = 0; i < grades.length; i++) {
//                 div.innerHTML +=
//                     '<i style="background:' + getLocalColor(grades[i] + 1) + '"></i> ' +
//                     grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//             }

//             return div;
//         };
//         legend.addTo(mymap);

//     }

// }




// makeLegends()

function killTheLegend() {
    let legend = document.getElementsByClassName('legend')[0]
    if (legend){
        legend.remove()
        console.log('legend removed')
    }
}
