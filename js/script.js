var canvas = document.querySelector(".game");

var ctx = canvas.getContext("2d");

var carImg = new Image();
carImg.src = "./images/car1.png";

var car = {
	x: 500,
	y: 500,
	width: 57,
	height: 81,
	isCrashed: false,
	rotation: 0,
	speed: 6,
	rotate: function (){
		return this.rotation * Math.PI/180;
	},
	drawMe: function () {

		ctx.translate(this.x+this.width/2, this.y+this.height/2)
		ctx.rotate(this.rotate());


		ctx.drawImage(carImg, -this.width/2, -this.height/2, this.width, this.height);
	}
};

class Border {
	constructor (borderX, borderY, borderWidth, borderHeight) {
		this.x = borderX;
		this.y = borderY;
		this.width = borderWidth;
		this.height = borderHeight;
		this.isCrashed = false;
	}

	drawMe () {
		ctx.fillStyle = "#E12DE6"
			
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}



var track = [
	new Border(200, 200, 600, 10),
	new Border(800, 200, 10, 600),
];





//drawing elements on canvas

drawingLoop();

function drawingLoop () {

	ctx.clearRect(0, 0, 1000, 1000)
	
	ctx.lineWidth = 4;
	ctx.strokeRect(0, 0, 1000, 1000);

	drawEverything();

	requestAnimationFrame(function () {

		drawingLoop();
	});
};


function drawEverything () {
	
	track.forEach(function (border) {
		border.drawMe();


		if (collision(car, border)) {
			car.isCrashed = true;
		};

	ctx.save();

	car.drawMe();

	ctx.restore();
	});

	if (car.isCrashed) {
		gameOver.drawMe();
	}



};

// car movement
document.onkeydown = function (event) {

	if (!car.isCrashed) {
		switch (event.keyCode) {
			case 90: //z
				if (((car.rotation >= 315 && car.rotation <= 359) || (car.rotation >= 0 && car.rotation <= 45))){
					
					if ((car.rotation >= 355 && car.rotation <= 359) || (car.rotation >= 0 && car.rotation <= 5)) {
						car.y -= car.speed;
					}
					else if (car.rotation >= 40 && car.rotation <= 50) {
						car.y -= car.speed;
						car.x += car.speed;
					}
					else if (car.rotation >= 310 && car.rotation <= 320) {
						car.y -= car.speed;
						car.x -= car.speed;
					};

				} 
				else if (car.rotation >= 45 && car.rotation <= 135){
					
					if (car.rotation >= 85 && car.rotation <= 95) {
						car.x += car.speed;
					}

					else if (car.rotation >= 40 && car.rotation <= 50) { //diagonal
						car.y -= car.speed;
						car.x += car.speed;
					}

					else if (car.rotation >= 130 && car.rotation <= 140) {
						car.y += car.speed;
						car.x += car.speed;
					};
				}
				else if (car.rotation >= 135 && car.rotation <= 225) {
					
					if (car.rotation >= 175 && car.rotation <= 185) {
						car.y += car.speed;
					}
					else if (car.rotation >= 130 && car.rotation <= 140) {
						car.y += car.speed;
						car.x += car.speed;
					}
					else if (car.rotation >= 220 && car.rotation <= 230) {
						car.y += car.speed;
						car.x -= car.speed;
					};
				}
				else if (car.rotation >= 225 && car.rotation <= 315) {
					
					if (car.rotation >= 265 && car.rotation <= 275) {
						car.x -= car.speed;
					}
					else if (car.rotation >= 220 && car.rotation <= 230) {
						car.y += car.speed;
						car.x -= car.speed;
					}
					else if (car.rotation >= 310 && car.rotation <= 320) {
						car.y -= car.speed;
						car.x -= car.speed;
					};
				};

				break;

			case 83: //s
				car.y += car.speed/2;
				break;

			case 81: //q
				car.rotation -=5;

				if (car.rotation < 0) {
					car.rotation += 360;
				};

				if (car.rotation === 360) {
					car.rotation = 0;
				};
				console.log(car.rotation);
				
				break;

			case 68: //d
				
				car.rotation +=5;

				if (car.rotation === 360) {
					car.rotation = 0;
				};
				console.log(car.rotation);
				break;


			case 38: //uparrow
				car.speed += 2;
				console.log(car.speed);
				break;

			case 40: //downarrow
				car.speed -= 2;
				console.log(car.speed);
				break;
		};
	}
}


//collision detection
function collision (car, border) {
	return car.y + car.height >= border.y
		&&	car.y <= border.y + border.height
		&& car.x + car.width >= border.x
		&& car.x <= border.x + border.width;	

}


//rudimentary game over screen

var gameOver = {
	opacity: 0,
	drawMe: function () {
		this.opacity += 0.01;
		ctx.globalAlpha = this.opacity;
		ctx.font = "bold 70px monospace";

		ctx.fillStyle = "#00CEBF";
		ctx.fillText("Game Over", 400, 500);

		ctx.lineWidth = 3;
		ctx.strokeStyle = "#C031BB";
		ctx.strokeText("Game Over", 400, 500);

		ctx.globalAlpha = 1;
	}
};