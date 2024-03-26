



// Essentials
	// Layer 1
let canvas = document.getElementById('layer1');
let c = canvas.getContext("2d");
        
canvas_width = 1024;
canvas_height = 480;
canvas.width = canvas_width;
canvas.height = canvas_height;


	// UI Layer
let ui = document.getElementById('UI');
let u = ui.getContext('2d');

ui.width = canvas_width;
ui.height = canvas_height;


	// Miscellaneous
document.getElementById('weightRange').value = 10;
document.getElementById('eraseRange').value = 40;
let eraseButton = document.getElementById('erase');
let clearButton = document.getElementById('clear');





// Global Variables
let eraseRange = parseFloat(document.getElementById('eraseRange').value)
let weightRange = parseFloat(document.getElementById('weightRange').value);
let color;
let painting =  false;
let erase = false;
let point = {
	x: 0,
	y: 0,
	r: 0
}
u.lineWidth = 2;





// Animation Functions
function draw(e) {
	point.x = e.x - canvas.getBoundingClientRect().left;
	point.y = e.y - canvas.getBoundingClientRect().top;
	point.r = weightRange

	color = document.getElementById('colorSelector').value;

	
	c.fillStyle = color;
	if (!erase) {
		c.beginPath();
		c.arc(point.x, point.y, point.r, 0, Math.PI*2, false);
		c.fill();
		c.closePath();
	}
	else {
		c.save();
    	c.globalCompositeOperation = 'destination-out';
		c.beginPath();
		c.arc(point.x, point.y, eraseRange, 0, Math.PI*2, false);
		c.clip();
		c.fill();
		c.closePath();
		c.restore();
	}
}

function drawReticle(e) {
	u.clearRect(0, 0, canvas_width, canvas_height);
	point.x = e.x - ui.getBoundingClientRect().left;
	point.y = e.y - ui.getBoundingClientRect().top;
	point.r = weightRange;
	
	u.strokeStyle = document.getElementById('colorSelector').value;

	let r;

	if (!erase) r = point.r;
	else {
		r = eraseRange;
		u.strokeStyle = 'silver';
	}

	
	u.beginPath();
	u.arc(point.x, point.y, r, 0, Math.PI*2, false);
	u.stroke();
	u.closePath();
}








// Input Handling
	// Button Inputs
eraseButton.addEventListener('click', () => {
	erase = !erase;
	if (!erase) eraseButton.innerHTML = 'Eraser';
	else eraseButton.innerHTML = 'Brush';
})

clearButton.addEventListener('click', () => {
	c.clearRect(0, 0, canvas_width, canvas_height);
})


	// Cursor and Slider Inputs
document.getElementById('eraseRange').addEventListener('change', () => {
	eraseRange = parseFloat(document.getElementById('eraseRange').value);

})

document.getElementById('weightRange').addEventListener('change', () => {
	weightRange = parseFloat(document.getElementById('weightRange').value);
})

ui.addEventListener('pointerdown', (e) => {
	painting = true;
	draw(e);
})

document.addEventListener('pointerup', (e) => {
	painting = false;
})

document.addEventListener('mousemove', (e) => {
	if (painting) draw(e);
	drawReticle(e);
})
