//api key from weatherapi.com
const APIKEY = '75de5bc1480142d1bf0121058210509';

//elements what used more than once
let temperatureValue = document.querySelector('.temperature-value');
let temperatureUnit = document.querySelector('.temperature-unit');

//on load event
window.addEventListener('load', () => {
	let long;
	let lat;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			//const proxy = "https://cors-anywhere.herokuapp.com/";
			fetch(
				`https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${lat},${long}&aqi=no`
			)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
                    //fill the fetched data to the dom
                    //set the default temperature to celsius
                    
					temperatureValue.innerHTML = data.current.temp_c;
					temperatureUnit.innerHTML = '°C';

					document.querySelector('.location-title').innerHTML =
						data.location.name;
					document.querySelector('.temperature-description').innerHTML =
						data.current.condition.text;
					document.querySelector('.loaction-icon').src =
						data.current.condition.icon;

                        //created a click event on element to change the "C" to "F" on click
					document
						.querySelector('.degree-container')
						.addEventListener('click', () => {
							if (temperatureUnit.innerHTML == '°C') {
								temperatureUnit.innerHTML = 'F';
								temperatureValue.innerHTML = data.current.temp_f;
							} else if (temperatureUnit.innerHTML !== '°C') {
								temperatureUnit.innerHTML = '°C';
								temperatureValue.innerHTML = data.current.temp_c;
							}
						});
				});
		});
	}
    if(!navigator.geolocation ){

    }
});