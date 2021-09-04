//api request query
const QUERY =
	'https://api.unsplash.com/photos/random?query=snake&orientation=landscape&client_id=SHlu-fKvhg7ulutGx8_Sjk9f0Vg5HAILj1n2YTuiGTA';

//load event
window.addEventListener('load', getImage());

//get a random image
function getImage() {
	fetch(QUERY)
		.then((res) => res.json())
		.then((data) => {
			document.body.style.backgroundImage = `url(\'${data.urls.full}\')`;
		})
		.catch((error) => console.log(error));
}

//game board
const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

//game speed
let speed = 8;

//size of each brick
let brickSize = 10;

let velocityX = 0;
let velocityY = 0;

//score
let score = 0;

//apple
let apple = {
	x: Math.floor(Math.random() * 21) * 10,
	y: Math.floor(Math.random() * 21) * 10,
};

//each snake part
const snake = [
	{ x: 200, y: 200 },
	{ x: 200, y: 200 },
	{ x: 200, y: 200 },
];
class SnakePart {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
//gets random color
function getColor() {
	fetch('https://placekitten.com/1280/1024')
		.then((res) => {
			res.json();
		})
		.then((data) => {
			console.log(data);
		});
}

//the game loop
function gameLoop() {
	if (gameOver()) {
		context.fillStyle = 'white';
		context.font = '50px Arial';
		context.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);
		return;
	}
	speedSetUp();
	fillScore();

	setTimeout(function onTick() {
		resetBackground();
		appleCollision();
		moveSnake();
		fillApple();
		fillSnake();
		gameLoop();
	}, 1000 / speed);
}

//draws the background, clear the last snake elements
function resetBackground() {
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

//draws the snake, unites the parts
function fillSnake() {
	snake.forEach((snakePart) => {
		drawSnakePart(snakePart);
	});
	//draw the head styles
	context.fillStyle = 'rgb(92, 177, 92)';
	context.strokeStyle = 'rgb(56, 100, 56)';
	context.fillRect(snake[0].x, snake[0].y, brickSize, brickSize);
	context.strokeRect(snake[0].x, snake[0].y, brickSize, brickSize);
	context.fillStyle = 'black';
	context.fillRect(
		snake[0].x + 4,
		snake[0].y + 2,
		brickSize / 5,
		brickSize / 5
	);
	context.fillStyle = 'black';
	context.fillRect(
		snake[0].x + 4,
		snake[0].y + 6,
		brickSize / 5,
		brickSize / 5
	);
}
//draws a snake part
function drawSnakePart(snakePart) {
	context.fillStyle = 'rgb(20, 136, 20)';
	context.strokeStyle = 'rgb(19, 77, 19)';
	context.fillRect(snakePart.x, snakePart.y, brickSize, brickSize);
	context.strokeRect(snakePart.x, snakePart.y, brickSize, brickSize);
}
//draw the apple
function fillApple() {
	context.fillStyle = 'rgb(190, 34, 34)';
	context.strokeStyle = 'rgb(112, 19, 19)';
	context.fillRect(apple.x, apple.y, brickSize, brickSize);
	context.strokeRect(apple.x, apple.y, brickSize, brickSize);
}
//action on apple collision
function appleCollision() {
	if (apple.x == snake[0].x && apple.y == snake[0].y) {
		apple.x = Math.floor(Math.random() * 21) * 10;
		apple.y = Math.floor(Math.random() * 21) * 10;
		snake.push(new SnakePart(apple.x, apple.y));
		score++;
	}
}
//when the game is over
function gameOver() {
	//no collision with his own, on spawn or before get the first apple
	if (snake.length > 3) {
		//check own collision
		for (let i = 1; i < snake.length; i++) {
			if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
				console.log('COLLISED!');
				return true;
			}
		}
	}
	//check the wall collision
	if (
		snake[0].x < 0 ||
		snake[0].x > canvas.width - 10 ||
		snake[0].y < 0 ||
		snake[0].y > canvas.height - 10
	) {
		return true;
	}
}

//move the snake
function moveSnake() {
	//create a new snake part place it to the beginning of the snake
	snake.unshift(new SnakePart(snake[0].x + velocityX, snake[0].y + velocityY));
	//remove the last element of the snake
	snake.pop();
}

//moving setup
document.body.addEventListener('keydown', keyDown);
function keyDown(e) {
	console.log(speed);
	//move left A
	if (e.keyCode == 37 || e.keyCode == 65) {
		if (velocityX === 10) {
			return;
		} //prevent to go go reverse
		velocityX = -10;
		velocityY = 0;
	}

	//move up W
	if (e.keyCode == 38 || e.keyCode == 87) {
		if (velocityY === 10) return; //prevent to go go reverse
		velocityX = 0;
		velocityY = -10;
	}

	//move right D
	if (e.keyCode == 39 || e.keyCode == 68) {
		if (velocityX === -10) return; //prevent to go go reverse
		velocityX = 10;
		velocityY = 0;
	}

	//move down S
	if (e.keyCode == 40 || e.keyCode == 83) {
		if (velocityY === -10) return; //prevent to go go reverse
		velocityX = 0;
		velocityY = 10;
	}
}
//set up speed
function speedSetUp() {
	if (snake.length > 5 && snake.length < 7) {
		speed = 10;
	} else if (snake.length > 7 && snake.length < 9) {
		speed = 13;
	} else if (snake.length > 9 && snake.length < 11) {
		speed = 17;
	} else if (snake.length > 11 && snake.length < 13) {
		speed = 22;
	} else if (snake.length > 13) {
		speed = 25;
	}
}
//draw the score
function fillScore() {
	context.fillStyle = 'white';
	context.font = '10px Arial';
	context.fillText(`Score: ${score}`, canvas.width - 50, 15);
}
//loop the game
gameLoop();
