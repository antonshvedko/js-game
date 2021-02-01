const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let score = 0; 
let arrOfSquares = [];

function Square(x, y, w, h, speed, color) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.speed = speed;
	this.color = color;

	this.draw = function () {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		this.y += this.speed;
		ctx.closePath();
	}
}

function getRandomColor() {
	let letters = '0123456789ABCDEF';
	let color = '#';

	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	
	return color;
}

function createGameArea() {
	let x = Math.random() * 620;
	let speed = Math.random() * 1.6 + 0.5;
	let color = getRandomColor();
	let gameSquare = new Square(x, -20, 20, 20, speed, color);

	arrOfSquares.push(gameSquare);
	document.querySelector('#score').textContent = 	score;
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	arrOfSquares = arrOfSquares.filter((element) => {
		element.draw();
		return element.y < canvas.width;
	});

	requestAnimationFrame(animate);
}

let infinitySqueres;
let btnStart = document.querySelector('#start');
let btnStop = document.querySelector('#stop');

btnStart.addEventListener('click', () => {
	if (arrOfSquares.length === 0) {
		let randomTimeInterval = Math.random() * 200 + 200;
		infinitySqueres = setInterval(createGameArea, randomTimeInterval);
		score = 0;
	}
});

btnStop.addEventListener('click', () => {
	arrOfSquares = [];
	clearInterval(infinitySqueres);
});

canvas.addEventListener('click', (event) => {
	for (let square of arrOfSquares) {
		if (square.x <= event.offsetX &&
			square.y <= event.offsetY &&
			square.h + square.x >= event.offsetX &&
			square.w + square.y >= event.offsetY) {
			arrOfSquares.splice(arrOfSquares.indexOf(square), 1);
			score += 1;
		}
	}
});

document.body.onload = animate;
