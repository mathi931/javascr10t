//on load switches color theme depends on the current time
window.addEventListener('load', () => {
	let date = new Date();
	let hour = date.getHours();

	if (hour >= 7 && hour < 19) {
		document.body.style.backgroundColor = 'white';
		document.body.style.color = 'black';
	} else {
		document.body.style.backgroundColor = 'black';
		document.body.style.color = 'white';
	}
});

//hitting enter or click on search icon triggers the api request
document.querySelector('#input').addEventListener('keydown', (event) => {
	if (event.key == 'Enter') apiRequest();
});

document.querySelector('#search').addEventListener('click', () => {
	apiRequest();
});

//fetch data with api key through unsplash. use input value as query
apiRequest = () => {
	document.querySelector('#grid').textContent = '';

	const url =
		'https://api.unsplash.com/search/photos?query=' +
		input.value +
		'&per_page=30&client_id=SHlu-fKvhg7ulutGx8_Sjk9f0Vg5HAILj1n2YTuiGTA';

	fetch(url)
		.then((response) => {
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		})

		.then((data) => {
			loadImages(data);
		})

		.catch((error) => console.log(error));
};

//for each api result, create a div element and change the background color of the results url.
//also add a click event on each new image what opens the image in _blank mode.
loadImages = (data) => {
	for (let i = 0; i < data.results.length; i++) {
		let image = document.createElement('div');
		image.className = 'img';
		image.style.backgroundImage =
			'url(' + data.results[i].urls.raw + '&w=1366&h=768' + ')';
		image.addEventListener('click', () => {
			window.open(data.results[i].links.download, '_blank');
		});

		document.querySelector('#grid').appendChild(image);
	}
};
