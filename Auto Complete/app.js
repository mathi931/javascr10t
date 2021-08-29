const api = 'https://countriesnow.space/api/v0.1/countries/capital';

const input = document.querySelector('#input');
const container = document.querySelector('.match-list');

input.addEventListener('input', () => search(input.value));

async function search(inputText) {
	//get the countries
	await fetch(api)
		.then((res) => res.json())
		.then((data) => {
			//save the countries from response
			let countries = data.data;
			//create a regex for filter the matches
			//return new RegExp("(?=.*" + contains + ")^" + startsWith);
			const regex = new RegExp(`(?=.*${inputText})^${input}`, 'gi');
			//filter countries what match with input keywords
			let matches = countries
				.filter((country) => {
					return country.name.match(regex) || country.capital.match(regex);
				})
				.slice(0, 10); //slice and get only 10

			//if there is no input remove autocomplete remains
			if (inputText.length === 0 || matches.length === 0) {
				matches = [];
				container.innerHTML = '';
			}

			fillMatches(matches);
		});
}

function fillMatches(matches) {
	//runs only if there is match
	if (matches.length > 0) {
		//create a prev text if there is more than 1 match
		const prevText = `
        <div class="match more-relevant">
            <div class="country">Type more to get more relevant results</div>
        </div>`;
		//create html elements and put the matches in
		const matchText = matches
			.map(
				(match) => `				
        <div class="match">
            <div class="country">${match.name}</div>
            <div class="capital">${match.capital}</div>
        </div>`
			)
			.join('');
		//if there is only one match don`t put the prev text in
		matches.length === 1
			? (container.innerHTML = matchText)
			: (container.innerHTML = prevText + matchText);
	}
}
