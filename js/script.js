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



//-------------------------start screen--------------

	if (startCounter <= 30){
		ctx.fillStyle = "white";
		ctx.font = "bold 60px SolidSans"
		ctx.fillText("PRESS ANY KEY TO START", 185, 850);
	};

	if (startCounter > 30){
		ctx.fillStyle = "transparent";
		ctx.font = "bold 60px SolidSans"
		ctx.fillText("PRESS ANY KEY TO START", 185, 850);
	};

	if (startCounter === 60) {
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
	y: 680,
	width: 34,
	height: 58,
	isCrashed: false,
	rotation: 90,
	speed: 0,
	acceleration: 0.5,
	maxSpeed: 30,
	brake: 1,
	maniability : 6,
	rotate: function (){
		return this.rotation * Math.PI/180;
	},
	drawMe: function () {

		ctx.translate(this.x+this.width/2, this.y+this.height/2	)
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
		ctx.fillStyle = "#BC2323"
			
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

class FinishLine {
	constructor (lineX, lineY, lineWidth, lineHeight) {
		this.x = lineX;
		this.y = lineY;
		this.width = lineWidth;
		this.height = lineHeight;
		this.isCrossed = -1
	}

	drawMe () {
		ctx.fillStyle = "#6152D3"
			
		ctx.fillRect(this.x, this.y, this.width, this.height);

		ctx.font = "bold 40px monospace";
		ctx.fillStyle = "#6CD4FF";
		if (this.isCrossed >=0) {
			ctx.fillText("lap counter " + this.isCrossed, 200, 100);
		}
		else {
			ctx.fillText("Get ready", 200, 100);
		}
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

	// right curve outer
	new Border(790, 280, 40, 15),
	new Border(820, 290, 40, 15),
	new Border(850, 300, 40, 15),
	new Border(870, 310, 40, 15),
	new Border(890, 325, 40, 15),
	new Border(910, 340, 40, 15),
	new Border(925, 355, 40, 15),
	new Border(940, 370, 15, 30),
	new Border(955, 400, 15, 30),
	new Border(965, 430, 15, 30),
	new Border(975, 460, 15, 160),
	new Border(965, 620, 15, 30),
	new Border(950, 650, 15, 30),
	new Border(935, 680, 15, 30),
	new Border(910, 710, 40, 15),
	new Border(890, 725, 40, 15),
	new Border(870, 740, 40, 15),
	new Border(850, 755, 40, 15),
	new Border(830, 770, 40, 15),
	new Border(800, 780, 40, 25),

	//straight bottom
	new Border(300, 650, 400, 10),
	new Border(200, 790, 600, 15),

	//center isle
	new Border(300, 430, 400, 220),
	new Border(270, 435, 455, 210),
	new Border(235, 440, 520, 190),
	new Border(220, 460, 550, 160),
	new Border(205, 480, 580, 120),
	

];

var finishLine0 = new FinishLine(600, 660, 10, 129);



//check for keyPressed
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



//go forward depending on rotation
function goForward () {
	car.y -= car.speed * Math.cos(car.rotate());	
	car.x += car.speed * Math.sin(car.rotate());
}
	
//go reverse

function goBackwards () {
	if (car.speed < car.maxSpeed) {
		car.speed -= car.acceleration;
	};
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

	if (car.speed < 0) {
		car.speed += car.acceleration/3
	};

	if (car.speed > -0.5 && car.speed < 0.5) {
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

//more advanced try at collision detection;

function willItWork (car) {

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

//counting laps 

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

//----------------------timer----------------------

//using drawing loop

var frame = 0;
var dseconds = 0;
var seconds = 0;
var minutes = 0;

function timer () {
	//tenth of a second
	if (frame % 6 === 0) { 
		dseconds++;
	}

	//second
	if (frame % 60 === 0) {
		seconds++;
		dseconds = 0;
	}

	//minute
	if (frame % 3600 === 0) {
		minutes++;
		seconds = 0;
	}

	ctx.font = "bold 40px monospace";
	ctx.fillStyle = "#6CD4FF";
	ctx.fillText( minutes + " : " + seconds + " : " + dseconds, 400, 900)
}


//-------------------------------------------------------------------

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




function drawEverything () {
	

	ctx.drawImage(track1Background, 0, 0, 1000, 1000);
	track1.forEach(function (border) {
		border.drawMe();

		if (collision(car, border)) {
			car.y += (car.speed+1) * Math.cos(car.rotate())	
			car.x -= (car.speed+1) * Math.sin(car.rotate())

			if (!collision(car, border)) {
				car.speed = 0;
			};
		};
	});

	finishLine0.drawMe();


	//----------------lap count-----------
	if (collision(car, finishLine0)) {
		buffer ++;
		endOfCross = false;
	};

	if (!collision(car, finishLine0) && buffer >0) {
		endOfCross = true;
	}
	lap();

	//----------timer------------------

	frame++;
	timer()


	//-------------draw car----------------
	ctx.save();

	car.drawMe();

	ctx.restore();


	//------------acceleration & deceleration----------
	goForward();

	if (keyPressed === false) {
		decelerate();
	}


	//--------------movement system----------------
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

				else{
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
				car.y -= 1;
				console.log("car Y = " + car.y);
				break;

			case 40: //downarrow
				car.y += 1;
				console.log("car Y = " + car.y);
				break;

			case 37: //left arrow
				car.x -=1;
				console.log("car X = " + car.x);
				break;

			case 39: //right arrow
				car.x +=1;
				console.log("car X = " + car.x);
				break;
		};

	}
}



};