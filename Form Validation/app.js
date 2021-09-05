//elements
const inputUsername = document.getElementById('username');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password1');
const inputPassword2 = document.getElementById('password2');

//events

//triggers an event when sign up clicked -> checks the validation
document.querySelector('#btnSignUp').addEventListener('click', checkValidity);

//triggers an event when 
document.querySelector('#btnRandom').addEventListener('click', (e) => {
	e.preventDefault();
	getRandom();
});
document.addEventListener('DOMContentLoaded', (e) => {
	e.preventDefault();
});

//gets random user data
function getRandom() {
	fetch('https://randomuser.me/api/')
		.then((res) => res.json())
		.then((data) => {
			console.log(data.results[0]);
			fillFields(
				data.results[0].email,
				data.results[0].login.password,
				data.results[0].login.username
			);
		})
		.catch((err) => console.log(err));
}

//fills the input fields with the fetched data
function fillFields(email, password, username) {
	inputEmail.value = email;
	inputPassword.value = password;
	inputPassword2.value = password;
	inputUsername.value = username;
}

//runs the validation on click
//if its valid get an alert message otherwise error message appears
function checkValidity(e) {
	e.preventDefault();
	checkUsername();
	checkEmail();
	checkPasswords();
	if (checkUsername && checkEmail() && checkPasswords()) {
		alert('Logged in!');
	}
}

function checkUsername() {
	//check the length
	if (inputUsername.value.length > 2) {
		setCorrect(inputUsername.parentElement);
		return true;
	} else {
		setWrong(
			inputUsername.parentElement,
			'Username must be at least 3 characters long'
		);
	}
}

function checkEmail() {
	if (validateEmail(inputEmail.value)) {
		setCorrect(inputEmail.parentElement);
		return true;
	} else {
		setWrong(inputEmail.parentElement, 'Email must be valid!');
	}
}

function checkPasswords(hardcore = false) {
	//regex validation
	if (hardcore) {
		if (validatePassword(inputPassword2.value)) {
			setCorrect(inputEmail.parentElement);
		} else {
			setWrong(
				inputPassword2.parentElement,
				"password must match all the criteria's."
			);
		}

		if (validatePassword(inputPassword.value)) {
			setCorrect(inputPassword.parentElement);
		} else {
			setWrong(
				inputPassword.parentElement,
				"password must match all the criteria's."
			);
		}
	}

	//test validation
	else {
		if (inputPassword.value.length > 3) {
			setCorrect(inputPassword.parentElement);
		} else {
			setWrong(
				inputPassword.parentElement,
				'password must be atleast 3 character long!'
			);
		}
		if (inputPassword2.value.length > 3) {
			setCorrect(inputPassword2.parentElement);
		} else {
			setWrong(
				inputPassword2.parentElement,
				'password must be atleast 3 character long!'
			);
		}
		if (inputPassword.value !== inputPassword2.value) {
			setWrong(
				inputPassword2.parentElement,
				'password doesnt match',
				inputPassword.parentElement
			);
		} else if (
			inputPassword.value === inputPassword2.value &&
			inputPassword2.value.length > 3 &&
			inputPassword.value.length > 3
		) {
			setCorrect(inputPassword2.parentElement);
			setCorrect(inputPassword.parentElement);
			return true;
		}
	}
}

//changes classname its wrong
function setWrong(el, er, el2 = null) {
	el.className = 'input-container wrong';
	if (el2) {
		el2.className = 'input-container wrong';
		el2.querySelector('p').innerText = er;
	}
	el.querySelector('p').innerText = er;
}

//changes classname if its correct
function setCorrect(el) {
	el.className = 'input-container correct';
}

//email validation regex
function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

//password validation regex
function validatePassword(password, strong = false) {
	const strongRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/;
	const mediumRe = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})$/;
	return strong
		? strongRe.test(String(password))
		: mediumRe.test(String(password));
}
