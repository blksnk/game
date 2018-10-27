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
	rotate: function (){
		return this.rotation * Math.PI/180;
	},
	drawMe: function () {

		ctx.translate(this.x+this.width/2, this.y+this.height/2)
		ctx.rotate(this.rotate());

		ctx.drawImage(carImg, -this.width/2, -this.height/2, this.width, this.height);
	}
};













drawingLoop();

function drawingLoop () {

	ctx.clearRect(0, 0, 1000, 1000)
	
	ctx.lineWidth = 4;
	ctx.strokeRect(0, 0, 1000, 1000);

	ctx.save();


	car.drawMe();


	ctx.restore();

	requestAnimationFrame(function () {
		//set up a recursive loop : the function call itself
		drawingLoop();
	});
}

document.onkeydown = function (event) {

	if (!car.isCrashed) {
		switch (event.keyCode) {
			case 90: //z
				if (((car.rotation > 315 && car.rotation >= 0) || (car.rotation >= 0 && car.rotation < 45)) || ((car.rotation < -315 && car.rotation >= -360) || (car.rotation <=0) && (car.rotation > -45))){
					car.y -= 10;
				} 
				else if ((car.rotation > 45 && car.rotation < 135) || (car.rotation < -225 && car.rotation > -315)){
					car.x += 10;
				}
				else if ((car.rotation > 135 && car.rotation < 225 )|| (car.rotation < -135 && car.rotation > -225)){
					car.y += 10;
				}
				else if ((car.rotation > 225 && car.rotation < 315) || (car.rotation < -45 && car.rotation > -135)){
					car.x -= 10;
				};

				break;

			case 83: //s
				car.y += 10;
				break;

			case 81: //q
				car.rotation -=10;
				console.log(car.rotation);

				if (car.rotation === -360) {
					car.rotation = 0;
				};
				break;

			case 68: //d
				
				car.rotation +=10;
				console.log(car.rotation);

				if (car.rotation === 360) {
					car.rotation = 0;
				};
				break;

		};
	}
}