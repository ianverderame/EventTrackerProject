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

// function getRouteList() {
// 	let xhr = new XMLHttpRequest();
// 	xhr.open("GET", 'api/routes/');
// 	xhr.onreadystatechange = function() {
// 		if (xhr.readyState === 4) {
// 			if (xhr.status === 200) {
// 				// DO STUFF HERE WITH SERVER DATA!! 
// 				// console.log("************************" + xhr.responseText);
// 				let routesList = JSON.parse(xhr.responseText);
// 				// console.log(routesList);
// 				return routesList
// 			}
// 		} else if (xhr.status === 404) {
// 			console.error('Routes not Found!');
// 		}
// 	}
// 	xhr.send();
// };

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
		if (route.enabled) {
			let tr = document.createElement('tr');
			let nametd = document.createElement('td');
			let citytd = document.createElement('td');
			let statetd = document.createElement('td');
			let lengthtd = document.createElement('td');
			nametd.textContent = route.name;
			citytd.textContent = route.city;
			statetd.textContent = route.state;
			lengthtd.textContent = route.length;
			tr.addEventListener('click', function(event) {
				updateRouteInfo(route);
			});
			body.appendChild(tr);
			tr.appendChild(nametd);
			tr.appendChild(citytd);
			tr.appendChild(statetd);
			tr.appendChild(lengthtd);
		}
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

	let idTH = document.createElement('th');
	idTH.textContent = 'Run ID';
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
	tr.appendChild(idTH);
	tr.appendChild(routeTH);
	tr.appendChild(dateTH);
	tr.appendChild(weatherTH);
	tr.appendChild(ratingTH);
	tr.appendChild(hrTH);
	tr.appendChild(timeTH);
	tr.appendChild(completedTH);
	
	let body = document.createElement('tbody');
	table.appendChild(body);
	let counter = 0;
	let totalHR = 0;
	let totalRating = 0;
	let totalTime = 0;
	for (const run of runs) {
		let tr = document.createElement('tr');
		let idtd = document.createElement('td');
		let routetd = document.createElement('td');
		let datetd = document.createElement('td');
		let weathertd = document.createElement('td');
		let ratingtd = document.createElement('td');
		let hrtd = document.createElement('td');
		let timetd = document.createElement('td');
		let completedtd = document.createElement('td');
		let temp = run.date.toString().split('T')[0];
		tr.addEventListener('click', function(event) {
			updateRunInfo(run);
		});

		if (run.route == null) {
			routetd.textContent = '';
		} else {
			routetd.textContent = run.route.name;
		}
		idtd.textContent = run.id;
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
		tr.appendChild(idtd);
		tr.appendChild(routetd);
		tr.appendChild(datetd);
		tr.appendChild(weathertd);
		tr.appendChild(ratingtd);
		tr.appendChild(hrtd);
		tr.appendChild(timetd);
		tr.appendChild(completedtd);

		counter++
		totalHR += run.heartRate;
		totalRating += run.rating;
		totalTime += run.time;
	}
	let tFoot = document.createElement('tFoot');
	table.appendChild(tFoot);
	let fRow = document.createElement('tr');
	let label = document.createElement('td')
	label.textContent = "TOTAL/AVERAGE";
	let timeavg = document.createElement('td');
	timeavg.textContent = totalTime / counter;
	let rtavg = document.createElement('td');
	rtavg.textContent = totalRating / counter;
	let ftotal = document.createElement('td');
	let favg = document.createElement('td');
	ftotal.textContent = counter;
	favg.textContent = totalHR / counter;

	fRow.appendChild(label);
	fRow.appendChild(ftotal);
	fRow.appendChild(document.createElement('td'));
	fRow.appendChild(document.createElement('td'));
	fRow.appendChild(rtavg);
	fRow.appendChild(favg);
	fRow.appendChild(timeavg);
	tFoot.appendChild(fRow);
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
	let routeId = nrf.routeId.value;
	
	let newRun = {
		rating : newRating,
		weather : newWeather,
		date : newDate,
		heartRate : newHR,
		time : newTime,
		completed : newCompleted,
		picture : newPicture,
		route : {
			id : routeId
		}
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

function updateRouteInfo(route) {
	let h3 = document.createElement('h3');
	h3.textContent = 'Edit Route';
	let updateDiv = document.getElementById('updateDiv');
	updateDiv.textContent = '';
	updateDiv.appendChild(h3);
	let form = document.createElement('form');
	let nameInput = document.createElement('input');
	nameInput.setAttribute('id', 'nameInput');
	let nameLabel = document.createElement('label')
	nameLabel.setAttribute('for', nameInput);
	nameLabel.textContent = 'Name ';
	let cityInput = document.createElement('input');
	let cityLabel = document.createElement('label');
	cityLabel.textContent = "City ";
	let stateInput = document.createElement('input');
	let stateLabel = document.createElement('label');
	stateLabel.textContent = "State ";
	let lengthInput = document.createElement('input');
	let lengthLabel = document.createElement('label');
	lengthLabel.textContent = "Miles ";
	let pictureInput = document.createElement('input');
	let pictureLabel = document.createElement('label');
	pictureLabel.textContent = "Picture URL ";

	nameInput.setAttribute('type','text')
	nameInput.setAttribute('value',route.name);
	form.appendChild(nameLabel);
	form.appendChild(nameInput);
	form.appendChild(document.createElement('br'));
	
	cityInput.setAttribute('type','text')
	cityInput.setAttribute('value',route.city);
	form.appendChild(cityLabel);
	form.appendChild(cityInput);
	form.appendChild(document.createElement('br'));
	
	stateInput.setAttribute('type','text')
	stateInput.setAttribute('value',route.state);
	form.appendChild(stateLabel);
	form.appendChild(stateInput);
	form.appendChild(document.createElement('br'));
	
	lengthInput.setAttribute('type','text')
	lengthInput.setAttribute('value',route.length);
	form.appendChild(lengthLabel);
	form.appendChild(lengthInput);
	form.appendChild(document.createElement('br'));

	pictureInput.setAttribute('type','url')
	pictureInput.setAttribute('value',route.picture);
	form.appendChild(pictureLabel);
	form.appendChild(pictureInput);
	form.appendChild(document.createElement('br'));

	let submit = document.createElement('input');
	submit.setAttribute('type','submit');
	submit.addEventListener('click', function(e) {
		e.preventDefault();
		let updatedRoute = {
			name : nameInput.value,
			city : cityInput.value,
			state : stateInput.value,
			length : lengthInput.value,
			picture : pictureInput.value,
			id : route.id
		}
		console.log(route.id);
		routeUpdatePost(updatedRoute);
		form.reset();
	});
	let deleteButton = document.createElement('input');
	deleteButton.setAttribute('type', 'button');
	deleteButton.setAttribute('value','Delete Route');
	deleteButton.addEventListener('click', function (e) {
		deleteRoute(route);
	});
	form.appendChild(submit);
	form.appendChild(deleteButton);
	updateDiv.appendChild(form);
};

function deleteRoute(route) {
	let xhr = new XMLHttpRequest();
	xhr.open("DELETE", `api/routes/${route.id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				console.log("Deleted Successfully")
				getRoutes();
			}
		} else if (xhr.status === 404) {
			console.error('Route not Found!');
		}
	}
	xhr.send();
};

function routeUpdatePost(route) {
	let xhr = new XMLHttpRequest();
	xhr.open("PUT", `api/routes/${route.id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if(xhr.status === 200) {
				var route = JSON.parse(xhr.responseText);
				getRoutes();
			}
		}
	}
	xhr.setRequestHeader('content-type','application/json');
	xhr.send(JSON.stringify(route));
}

function updateRunInfo(run) {
	let h3 = document.createElement('h3');
	h3.textContent = 'Edit Run';
	let updateDiv = document.getElementById('updateDiv');
	updateDiv.textContent = '';
	updateDiv.appendChild(h3);
	let form = document.createElement('form');
	let ratingInput = document.createElement('input');
	let ratingLabel = document.createElement('label');
	ratingLabel.textContent = "Rating from 0-5 ";
	let weatherInput = document.createElement('input');
	let weatherLabel = document.createElement('label');
	weatherLabel.textContent = "Weather ";
	let dateInput = document.createElement('input');
	let dateLabel = document.createElement('label');
	dateLabel.textContent = "Date ";
	let timeInput = document.createElement('input');
	let timeLabel = document.createElement('label');
	timeLabel.textContent = "Time (in minutes): ";
	let hrInput = document.createElement('input');
	let hrLabel = document.createElement('label');
	hrLabel.textContent = "Average Heart Rate ";
	let completedInput = document.createElement('input');
	completedLabel = document.createElement('label');
	completedLabel.textContent = 'Run Completed?';
	let pictureInput = document.createElement('input');
	let pictureLabel = document.createElement('label');
	pictureLabel.textContent = "Picture URL ";
	let routeInput = document.createElement('input');
	let routeLabel = document.createElement('label');
	routeLabel.textContent = "Route ID ";
	
	routeInput.setAttribute('type','number');
	routeInput.setAttribute('value', run.route.id);
	form.appendChild(routeLabel);
	form.appendChild(routeInput);
		
		// let routeList = getRouteList();
		// for (const route of routesList) {
		// 	let opt = document.createElement('option');
		// 	opt.setAttribute('value',route);
		// 	opt.textContent = route.name;
		// 	routeInput.appendChild(opt);
		// }
	form.appendChild(document.createElement('br'));
		
	dateInput.setAttribute('type','date');
	dateInput.setAttribute('value',run.date.toString().split('T')[0]);
	form.appendChild(dateLabel);
	form.appendChild(dateInput);
	form.appendChild(document.createElement('br'));
	
	weather.setAttribute('type','text');
	weatherInput.setAttribute('value',run.weather);
	form.appendChild(weatherLabel);
	form.appendChild(weatherInput);
	form.appendChild(document.createElement('br'));

	ratingInput.setAttribute('type','number');
	ratingInput.setAttribute('value',run.rating);
	form.appendChild(ratingLabel);
	form.appendChild(ratingInput);
	form.appendChild(document.createElement('br'));

	hrInput.setAttribute('type','number');
	hrInput.setAttribute('value',run.heartRate);
	form.appendChild(hrLabel);
	form.appendChild(hrInput);
	form.appendChild(document.createElement('br'));
	
	timeInput.setAttribute('type','number');
	timeInput.setAttribute('value',run.time);
	timeInput.setAttribute('step','0.01');
	form.appendChild(timeLabel);
	form.appendChild(timeInput);
	form.appendChild(document.createElement('br'));

	completedInput.setAttribute('type','checkbox');
	completedInput.setAttribute('checked',run.completed.checked);
	form.appendChild(completedLabel);
	form.appendChild(completedInput);
	form.appendChild(document.createElement('br'));
	
	pictureInput.setAttribute('type','url');
	pictureInput.setAttribute('value',run.picture);
	form.appendChild(pictureLabel);
	form.appendChild(pictureInput);
	form.appendChild(document.createElement('br'));

	let submit = document.createElement('input');
	submit.setAttribute('type','submit');
	submit.addEventListener('click', function(e) {
		e.preventDefault();
		let updatedRun = {
			rating : ratingInput.value,
			weather : weatherInput.value,
			date : dateInput.value,
			heartRate : hrInput.value,
			time : timeInput.value,
			completed : completedInput.checked,
			picture : pictureInput.value,
			id : run.id,
			route : {
				id : routeInput.value
			}
			
		}
		runUpdatePost(updatedRun);
		form.reset();
	});
	form.appendChild(submit);

	let deleteButton = document.createElement('input');
	deleteButton.setAttribute('type', 'button');
	deleteButton.setAttribute('value','Delete Run');
	deleteButton.addEventListener('click', function (e) {
		deleteRun(run);
	});
	form.appendChild(deleteButton);
	updateDiv.appendChild(form);
};

function runUpdatePost(run) {
	let xhr = new XMLHttpRequest();
	xhr.open("PUT", `api/runs/${run.id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if(xhr.status === 200) {
				// var run = JSON.parse(xhr.responseText);
				getRuns();
			}
		}
	}
	xhr.setRequestHeader('content-type','application/json');
	xhr.send(JSON.stringify(run));
}

function deleteRun(run) {
	let xhr = new XMLHttpRequest();
	xhr.open("DELETE", `api/routes/${run.route.id}/runs/${run.id}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				console.log("Deleted Successfully")
				getRuns();
			}
		} else if (xhr.status === 404) {
			console.error('Run not Found!');
		}
	}
	xhr.send();
};
