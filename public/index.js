 
    //these are the variables that point to useful numbers
    let totalBagsDropped;
    let totalTeams;
    let totalProfiles;
    let currentCounty;
    let currentTown;
    let level = 'state';
    
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

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() =>{
        vermont.getFirebaseData()
    })
    .catch(function (error) {
      // ToDo: handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      throw ("There has been a problem <br>" + errorCode +"<br>" + errorMessage)
    });

    function handlePrint(){
      let chartDiv = document.getElementsByClassName('hiddenChart')[0]
      console.log(chartDiv)
     let barChart = document.getElementById('barChart')
     if(barChart) {
      chartImg = barChart.toDataURL()
      console.log(chartImg)
    
      chartDiv.innerHTML = '<img id="chartImg" src="' + chartImg + '">'
     }
     window.setTimeout(() => window.print(), 100)
    }

    function openAbout() {
      aboutDiv = document.getElementById('aboutScreen')
      aboutDiv.style = 'display: block'
    }

    function closeAbout() {
      aboutDiv = document.getElementById('aboutScreen')
      aboutDiv.style = 'display: none'
    }
    let vermont = new Vermont