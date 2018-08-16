let counties;
let bagsArray;
let profilesArray;
let teamsArray;
let labelsArray;


//NOTE! This function is called in the vermont object and will eventually be called on every map click.

function makeChart() {

    for (let i = 0; i < 2; i++) {

        let ctx = document.getElementById("barChart").getContext("2d");

        let data = {
            labels: labelsArray,
            datasets: [
                {
                    label: "Bags",
                    backgroundColor: "rgb(24, 27, 28)",
                    data: bagsArray
                },
                {
                    label: "Profiles",
                    backgroundColor: "rgb(73, 135, 62)",
                    data: profilesArray
                },
                {
                    label: "Teams",
                    backgroundColor: "rgb(176, 192, 220)",
                    data: teamsArray
                }
            ]
        };
        var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                barValueSpacing: 20,
                legend: {
                    labels: {
                        boxWidth: 100,
                        fontColor: 'grey',
                        fontSize: 18,
                        padding: 15,
                        
                scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                }
                            }]
                        }
                    }
                }
            }
        });

        counties = vermont.counties
        bagsArray = data.datasets[0].data;
        profilesArray = data.datasets[1].data;
        teamsArray = data.datasets[2].data;
        labelsArray = data.labels;

        if (level === 'state') {
            bagsArray = [];
            profilesArray = [];
            teamsArray = [];
            labelsArray = [];
            for (let county in vermont.counties) {
                bagsArray.push(vermont.counties[county].stats.bagCount);
                profilesArray.push(vermont.counties[county].stats.userActivity);
                teamsArray.push(vermont.counties[county].stats.totalTeams);
                labelsArray.push(vermont.counties[county].name.replace(/\w/, c => c.toUpperCase()));
            }
        }


        else if (level === 'county') {
            bagsArray = [];
            profilesArray = [];
            teamsArray = [];
            labelsArray = [];
            let countyForGraph = vermont.countyNumber(currentCounty)
            for (let town in countyForGraph.towns) {
                bagsArray.push(countyForGraph.towns[town].stats.bagCount);
                profilesArray.push(countyForGraph.towns[town].stats.userActivity);
                teamsArray.push(countyForGraph.towns[town].stats.totalTeams);
                labelsArray.push(countyForGraph.towns[town].name.replace(/\w/, c => c.toUpperCase()));

            }
        }
    }
}