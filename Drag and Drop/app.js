//api request url
const URL =
	'https://api.unsplash.com/photos/random?query=avatar&count=5&client_id=SHlu-fKvhg7ulutGx8_Sjk9f0Vg5HAILj1n2YTuiGTA';

//index variable what helps loop through the nodelist
let i = 0;

//elements
const images = document.querySelectorAll('.image');
const holders = document.querySelectorAll('.placeholder');

//on load resets the index and trigers the api request 
window.addEventListener('load', () => {
	i = 0;
	//getImages();
});

//drag and drop events
document.addEventListener('dragstart', dragStart);
document.addEventListener('dragend', dragEnd);
document.addEventListener('dragover', dragOver);
document.addEventListener('dragenter', dragEnter);
document.addEventListener('dragleave', dragLeave);
document.addEventListener('drop', dragDrop);

//functions

//get random images
//fill the nodes background with inline html styles
function getImages() {
	fetch(URL)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			data.map((d) => {
				let img = d.urls.thumb;
				images[i].setAttribute('style', `background-image: url(\'${img}\');`);
				i++;
			});
		})
		.catch((error) => console.log(error));
}

function dragStart(e) {
	currentEl = e.target;
	console.log(currentEl);
	if (e.target.classList.contains('image')) {
		console.log('drag Started');
		e.target.classList.add('on-hold');
		setTimeout(() => e.target.classList.add('hide'), 0);
	}
}

function dragEnd(e) {
	if (e.target.classList.contains('image')) {
		console.log('drag Finished');
		e.target.className = 'image';
	}
}

function dragOver(e) {
	e.preventDefault();
}

function dragEnter(e) {
	e.preventDefault();

	if (
		e.target.classList.contains('placeholder') &&
		e.target.childElementCount === 1
	) {
		//console.log(e.target.childElementCount);
		//console.log(e.target);
		e.target.classList.add('hovered');
		e.target.firstChild.innerText = '';
	}
}

function dragLeave(e) {
	if (e.target.classList.contains('placeholder')) {
		e.target.classList.remove('hovered');
		e.target.firstChild.innerText = e.target.id;

		// console.log(e.target);
		//console.log(e.target.childElementCount);
	}
}

function dragDrop(e) {
	if (
		e.target.classList.contains('placeholder') &&
		e.target.childElementCount == 1
	) {
		//console.log(e.target.childElementCount);
	}
	e.target.append(currentEl);
	e.target.classList.remove('hovered');
}
