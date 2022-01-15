console.log("script.js loaded");

window.addEventListener("load", function (e) {
  init();
});

function init() {
	console.log("In init()");
	let routeButton = document.getElementById('routesListButton');
	routeButton.addEventListener('click', function(event) {
		event.preventDefault();
		getRoutes();
	});
	
	let runButton = document.getElementById('runsListButton');
	runButton.addEventListener('click', function(event) {
		event.preventDefault();
		getRuns();
	});
	
	let createRouteButton = document.getElementById('newRouteButton');
	createRouteButton.addEventListener('click', function(e) {
		e.preventDefault();
		createRoute();
	});

	let createRunButton = document.getElementById('newRunButton');
	createRunButton.addEventListener('click', function(e) {
		e.preventDefault();
		createRun();
	});
};
  // TODO - setup event listeners for forms, etc.


function getRoutes() {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", 'api/routes/');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// DO STUFF HERE WITH SERVER DATA!! 
				let routes = JSON.parse(xhr.responseText);
				displayRoutes(routes);
			}
		} else if (xhr.status === 404) {
			console.error('Routes not Found!');
		}
	}
	xhr.send();
};

function getRuns() {
	console.log('in getRuns()');
	let xhr = new XMLHttpRequest();
	xhr.open("GET", 'api/runs/');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let runs = JSON.parse(xhr.responseText);
				displayRuns(runs);
			}
		}
	}
	xhr.send();
};

function displayRoutes(routes) {
	let routesDiv = document.getElementById('routesListDiv');
	routesDiv.textContent = '';
	let h2 = document.createElement('h2');
	h2.textContent = "All Routes In GoRun";
	routesDiv.appendChild(h2);

	let table = document.createElement('table');
	table.style.border = 'solid 1px black';
	let thead = document.createElement('thead');
	let tr = document.createElement('tr');

	let nameTH = document.createElement('th');
	nameTH.textContent = 'Name';
	let cityTH = document.createElement('th');
	cityTH.textContent = 'City';
	let stateTH = document.createElement('th');
	stateTH.textContent = 'State';
	let lengthTH = document.createElement('th');
	lengthTH.textContent = 'Length (miles)';

	routesDiv.appendChild(table);
	table.appendChild(thead);
	thead.appendChild(tr);
	tr.appendChild(nameTH);
	tr.appendChild(stateTH);
	tr.appendChild(cityTH);
	tr.appendChild(lengthTH);
	
	let body = document.createElement('tbody');
	table.appendChild(body);
	for (const route of routes) {
		let tr = document.createElement('tr');
		let nametd = document.createElement('td');
		let citytd = document.createElement('td');
		let statetd = document.createElement('td');
		let lengthtd = document.createElement('td');
		nametd.textContent = route.name;
		citytd.textContent = route.city;
		statetd.textContent = route.state;
		lengthtd.textContent = route.length;

		body.appendChild(tr);
		tr.appendChild(nametd);
		tr.appendChild(citytd);
		tr.appendChild(statetd);
		tr.appendChild(lengthtd);
	}

	let clear = document.createElement('button');
	clear.textContent = 'Clear';
	clear.addEventListener('click', function(e) {
		e.preventDefault;
		routesDiv.textContent = '';
	});
	routesDiv.appendChild(clear);

};

function displayRuns(runs) {
	console.log('in displayRuns()');
	let runsDiv = document.getElementById('runsList');
	runsDiv.textContent = '';
	let h2 = document.createElement('h2');
	h2.textContent = "All Runs In GoRun";
	runsDiv.appendChild(h2);

	let table = document.createElement('table');
	table.style.border = 'solid 1px black';
	let thead = document.createElement('thead');
	let tr = document.createElement('tr');

	let dateTH = document.createElement('th');
	dateTH.textContent = 'Date';
	let weatherTH = document.createElement('th');
	weatherTH.textContent = 'Weather';
	let ratingTH = document.createElement('th');
	ratingTH.textContent = 'Rating';
	let hrTH = document.createElement('th');
	hrTH.textContent = 'Average Heart Rate';
	let timeTH = document.createElement('th');
	timeTH.textContent = 'Time (in Minutes)';
	let completedTH = document.createElement('th');
	completedTH.textContent = 'Race Finished?';
	let routeTH = document.createElement('th');
	routeTH.textContent = 'Route';

	runsDiv.appendChild(table);
	table.appendChild(thead);
	thead.appendChild(tr);
	tr.appendChild(routeTH);
	tr.appendChild(dateTH);
	tr.appendChild(weatherTH);
	tr.appendChild(ratingTH);
	tr.appendChild(hrTH);
	tr.appendChild(timeTH);
	tr.appendChild(completedTH);
	
	let body = document.createElement('tbody');
	table.appendChild(body);
	for (const run of runs) {
		let tr = document.createElement('tr');
		let routetd = document.createElement('td');
		let datetd = document.createElement('td');
		let weathertd = document.createElement('td');
		let ratingtd = document.createElement('td');
		let hrtd = document.createElement('td');
		let timetd = document.createElement('td');
		let completedtd = document.createElement('td');
		let temp = run.date.toString().split('T')[0];


		if (run.route == null) {
			routetd.textContent = '';
		} else {
			routetd.textContent = run.route.name;
		}
		
		datetd.textContent = temp;
		weathertd.textContent = run.weather;
		ratingtd.textContent = run.rating;
		hrtd.textContent = run.heartRate;
		timetd.textContent = run.time;
		if (run.completed === true) {
			completedtd.textContent = 'Yes';
		} else if (run.completed === false) {
			completedtd.textContent = 'No';
		}

		body.appendChild(tr);
		tr.appendChild(routetd);
		tr.appendChild(datetd);
		tr.appendChild(weathertd);
		tr.appendChild(ratingtd);
		tr.appendChild(hrtd);
		tr.appendChild(timetd);
		tr.appendChild(completedtd);
	}
	let clear = document.createElement('button');
	clear.textContent = 'Clear';
	clear.addEventListener('click', function(e) {
		e.preventDefault;
		runsDiv.textContent = '';
	});
	runsDiv.appendChild(clear);
};

function createRoute() {
	let nrf = document.getElementById('newRouteForm');

	let newRoute = {
		name : nrf.name.value,
		city : nrf.city.value,
		state : nrf.state.value,
		length : nrf.length.value,
		picture : nrf.picture.value,
		enabled : true
	};

	let xhr = new XMLHttpRequest();
	xhr.open("POST", "api/routes");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if(xhr.status === 201) {
				var route = JSON.parse(xhr.responseText);
				nrf.reset();
				getRoutes();
			}
		}
	}
	xhr.setRequestHeader('content-type','application/json');
	xhr.send(JSON.stringify(newRoute));
};

function createRun() {
	let nrf = document.getElementById('newRunForm');
	let newRating = nrf.rating.value;
	let newWeather = nrf.weather.value;
	let newDate = nrf.date.value;
	let newHR = nrf.heartRate.value;
	let newTime = nrf.time.value;
	let newCompleted = nrf.completed.checked;
	let newPicture = nrf.picture.value;
	// let newrouteId = nrf.routeId.value;
	
	let newRun = {
		rating : newRating,
		weather : newWeather,
		date : newDate,
		heartRate : newHR,
		time : newTime,
		completed : newCompleted,
		picture : newPicture,
		// route : newrouteId
	};

	let xhr = new XMLHttpRequest();
	xhr.open("POST", "api/runs");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if(xhr.status === 201) {
				var run = JSON.parse(xhr.responseText);
				nrf.reset();
				getRuns();
			}
		}
	}
	xhr.setRequestHeader('content-type','application/json');
	xhr.send(JSON.stringify(newRun));
};