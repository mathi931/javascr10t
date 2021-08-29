//on window load opens the new note tab for the user
window.onload = document.querySelector('#user_input').select();
//the input what has 2 events on click to show and hide
const newNoteTab = document.querySelector('#modal');
const input = document.querySelector('#user_input');

document.querySelector('#add_note').addEventListener('click', () => {
	newNoteTab.style.display = 'block';
	input.focus();
});

document.querySelector('#hide').addEventListener('click', () => {
	newNoteTab.style.display = 'none';
});
//if the user put the input in and hit enter it trigers the api request what creates the note
//after enter press event closes the new note tab and resets the text value
input.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		const text = document.querySelector('#user_input');
		createStickyNote(text.value);
		text.value = '';
		newNoteTab.style.display = 'none';
	}
});
//gets the data and then uses to create the note
async function createStickyNote(text) {
	await fetch('./data.json')
		.then((response) => {
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		})

		.then((data) => {
			let note = document.createElement('div');
			let details = document.createElement('div');
			let noteText = document.createElement('h1');

			note.className = 'note';
			details.className = 'details';
			noteText.textContent = text;

			details.appendChild(noteText);
			note.appendChild(details);

			note.setAttribute(
				'style',
				`margin:${
					data.margins[Math.floor(Math.random() * data.margins.length + 1)]
						.margin
				};
				background-color:${
					data.colors[Math.floor(Math.random() * data.colors.length + 1)].color
				};
				transform:${
					data.degrees[Math.floor(Math.random() * data.degrees.length + 1)]
						.degree
				}`
			);

			note.addEventListener('dblclick', () => {
				note.remove();
			});

			document.querySelector('#all_notes').appendChild(note);
		})
		.catch((error) => console.log(error));
}
