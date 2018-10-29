var canvas = document.querySelector(".game");

var ctx = canvas.getContext("2d");

//-------------------STRART SCREEN-------------------

var startscreenImg = new Image();
startscreenImg.src = "./images/titlescreen.png";

var startCounter = 0;
var pressedStart = false;

drawingLoopStart();

function drawingLoopStart () {
	ctx.clearRect(0, 0, 1000, 1000);

	ctx.drawImage(startscreenImg, 0, 0, 1000, 1000);

	if (startCounter <= 60){
		ctx.fillStyle = "white";
		ctx.font = "bold 60px SolidSans"
		ctx.fillText("PRESS ANY KEY", 300, 850);
	};

	if (startCounter > 60){
		ctx.fillStyle = "transparent";
		ctx.font = "bold 60px SolidSans"
		ctx.fillText("PRESS ANY KEY", 300, 850);
	};

	if (startCounter === 120) {
		startCounter = 0;
	};

	startCounter ++;
	
	document.onkeydown = function () {
		pressedStart = true;
		console.log("pressed start");
	};

	requestAnimationFrame(function () {
		if (pressedStart === false) {
			drawingLoopStart();
		} 

		else if (pressedStart) {
			drawingLoopGame();

		}
	});
};





//-----------------------game screen-----------------

var carImg = new Image();
carImg.src = "./images/car1.png";

var car = {
	x: 500,
	y: 500,
	width: 57,
	height: 81,
	isCrashed: false,
	rotation: 0,
	speed: 0,
	acceleration: 0.5,
	maxSpeed: 30,
	brake: 1,
	maniability : 7,
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

class FinishLine {
	constructor (lineX, lineY, lineWidth, lineHeight) {
		this.x = lineX;
		this.y = lineY;
		this.width = lineWidth;
		this.height = lineHeight;
		this.isCrossed = 0
	}

	drawMe () {
		ctx.fillStyle = "#2DE675"
			
		ctx.fillRect(this.x, this.y, this.width, this.height);

		ctx.font = "bold 40px monospace";
		ctx.fillStyle = "#2DE675";
		ctx.fillText("lap counter " + this.isCrossed, 200, 100);
	}
}

var track1Background = new Image();
track1Background.src = "./images/track1.png";

var track1 = [
	//straight top
	new Border(200, 270, 600, 15),
	new Border(300, 415, 400, 15),

	//curve left outer
	new Border(180, 280, 40, 15),
	new Border(150, 290, 40, 15),
	new Border(120, 300, 40, 15),
	new Border(100, 310, 40, 15),
	new Border(80, 325, 40, 15),
	new Border(60, 340, 40, 15),
	new Border(45, 355, 40, 15),
	new Border(45, 370, 15, 30),
	new Border(35, 400, 15, 30),
	new Border(25, 430, 15, 30),
	new Border(15, 460, 15, 30),
	new Border(5, 490, 20, 90),
	new Border(15, 580, 15, 30),
	new Border(25, 610, 15, 30),
	new Border(35, 640, 15, 30),
	new Border(45, 670, 15, 30),
	new Border(45, 700, 40, 15),
	new Border(60, 715, 40, 15),
	new Border(80, 730, 40, 15),
	new Border(100, 745, 40, 15),
	new Border(120, 760, 40, 15),
	new Border(150, 775, 40, 15),
	new Border(180, 790, 40, 15),


	//straight bottom
	new Border(300, 650, 400, 10),
	new Border(200, 790, 600, 15),

	

];

var finishLine0 = new FinishLine(300, 200, 10, 150);



//check for keypress
var keyPressed = false;


document.onkeyup = function (event) {
	switch(event.keyCode) {
		case 90: 

			keyPressed = false;
			break;

		case 83: 

			keyPressed = false;
			break;

		default:

			
		break;
	}	
}

// car movement

document.onkeydown = function (event) {

	if (!car.isCrashed) {
		switch (event.keyCode) {
			case 90: //z

				accelerate();
				keyPressed = true;
				break;

			case 83: //s
				keyPressed = true;
				
				if (car.speed > 0) {
					brake();
				}
				else if (car.speed <=0) {
					goBackwards();
				}
				

				break;

			case 81: //q
				car.rotation -= car.maniability;

				if (car.rotation < 0) {
					car.rotation += 360;
				};

				if (car.rotation === 360) {
					car.rotation = 0;
				};
				console.log(car.rotation);
				
				break;

			case 68: //d
				
				car.rotation += car.maniability;

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

//go forward depending on rotation
function goForward () {
	car.y -= car.speed * Math.cos(car.rotate());	
	car.x += car.speed * Math.sin(car.rotate());
}
	
//go reverse

function goBackwards () {
	car.y += car.speed * Math.cos(car.rotate());	
	car.x -= car.speed * Math.sin(car.rotate());

}

//acceleration
function accelerate () {
	if (car.speed < car.maxSpeed) {
		car.speed += car.acceleration;
	};
}


//deceleration

function decelerate () {
	if (car.speed > 0) {
		car.speed -= car.acceleration/6
	};

	if (car.speed > 0 && car.speed < 1) {
		car.speed = 0;
	};
}


//brake

function brake () {
	if (car.speed > 0) {
		car.speed -= car.brake
	};
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



//drawing elements on canvas


function drawingLoopGame () {


	ctx.clearRect(0, 0, 1000, 1000)
	
	ctx.lineWidth = 4;
	ctx.fillStyle = "black";
	ctx.strokeRect(0, 0, 1000, 1000);

	drawEverything();

	requestAnimationFrame(function () {

		drawingLoopGame();
	});
};

function lap () {
	if (buffer > 0 && endOfCross === true) {
		setTimeout (function () {
			finishLine0.isCrossed += 1;
		}, 500);

		buffer = 0;
		endOfCross = false;
	};


}

var endOfCross = false;
var buffer = 0;

function drawEverything () {
	

	ctx.drawImage(track1Background, 0, 0, 1000, 1000);
	track1.forEach(function (border) {
		border.drawMe();

		if (collision(car, border)) {
			car.y += car.speed * Math.cos(car.rotate())	
			car.x -= car.speed * Math.sin(car.rotate())
			car.speed = 0;
		};
	});

	finishLine0.drawMe();

	if (collision(car, finishLine0)) {
		buffer ++;
		endOfCross = false;


		
	};

	if (!collision(car, finishLine0) && buffer >0) {
		endOfCross = true;
	}
	
	lap();

	//draw car
	ctx.save();

	car.drawMe();

	ctx.restore();

	goForward();

	if (keyPressed === false) {
		decelerate();
	}


	if (car.isCrashed) {
		gameOver.drawMe();
	}

	document.onkeydown = function (event) {

	if (!car.isCrashed) {
		switch (event.keyCode) {
			case 90: //z

				accelerate();
				keyPressed = true;
				break;

			case 83: //s
				keyPressed = true;
				
				if (car.speed > 0) {
					brake();
				}
				else if (car.speed <=0) {
					goBackwards();
				}
				

				break;

			case 81: //q
				car.rotation -= car.maniability;

				if (car.rotation < 0) {
					car.rotation += 360;
				};

				if (car.rotation === 360) {
					car.rotation = 0;
				};
				console.log(car.rotation);
				
				break;

			case 68: //d
				
				car.rotation += car.maniability;

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



};