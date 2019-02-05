
/*----- constants -----*/ 
const ballRadius = 6.54; 

var pedal1;
var pedal2;

var ballCanvas;
// var x;
// var y;
// var dx;
// var dy;
// var ctx;
var pedal1;
var pedal2;

/*----- app's state (variables) -----*/ 



/*----- cached element references -----*/ 



/*----- event listeners -----*/ 



/*----- functions -----*/



class Ball {
    constructor(x, y, dx, dy, ballRadius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.ballRadius = ballRadius;
		// this.checkCollision = function() {...};
	};
}


// class pedal1 {
    //     constructor(x, y, dx, dy, pedalBox1) {
    // 		this.x = x;
    // 		this.y = y;
    // 		this.dx = dx;
    // 		this.dy = dy;
    // 		this.pedalBox1 = pedalBox1;
    // 		this.checkCollision = function() {...};
    // 	};
    // }

// class pedal2 {
        //     constructor(x, y, dx, dy, pedalBox2) {
        // 		this.x = x;
        // 		this.y = y;
        // 		this.dx = dx;
        // 		this.dy = dy;
        // 		this.pedalBox2 = pedalBox2;
        // 		this.checkCollision = function() {...};
        // 	};
        // }

function init(){
    ballCanvas = document.getElementById("ball-canvas");

    ball = new Ball(ballCanvas.width/2, ballCanvas.height-30, -2, .2, ballRadius);

}

function draw() {

ctx = document.getElementById("ball-canvas").getContext("2d");
ctx.clearRect(0, 0, ballCanvas.width, ballCanvas.height);

    ctx.fillStyle = "#4F6794";
    ctx.fillRect(50, 5, 900, 490);
    ctx.strokeStyle = "rgba(250, 250, 250, 1)";
    ctx.lineWidth = 10;
    ctx.strokeRect(50, 5, 900, 490);

    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(450, 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(550, 250);
    ctx.lineTo(950, 250);
    ctx.stroke();
    ctx.save();

    ctx.strokeStyle = "rgba(60, 60, 60, 1)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.shadowColor = "rgba(0, 0, 0, .7)";
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;
    ctx.shadowBlur = 5;
    ctx.moveTo(500, 0);
    ctx.lineTo(500, 500);
    ctx.stroke();

// var ctx = document.getElementById("ball-canvas").getContext("2d");

// function draw pedal1
    ctx.fillStyle = "rgba(60, 60, 60, 1)";
    ctx.fillRect(10, 400, 10, 70);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    ctx.fillStyle = "rgba(60, 60, 60, 1)";
    ctx.fillRect(980, 100, 10, 70);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

// var ballRadius = 6.54; 
    ctx.beginPath();
    ctx.fillStyle = "rgba(246, 156, 2, 1)";
    ctx.arc(ball.x, ball.y, ball.ballRadius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();

    ctx.restore();


ballCanvas = document.getElementById("ball-canvas");


    if (ball.y + ball.dy > ballCanvas.height-ballRadius || ball.y + ball.dy < ballRadius) {
        ball.dy = - ball.dy;
    }
    if ( ball.x + ball.dx > ballCanvas.width-ballRadius || ball.x + ball.dx < ballRadius) {
        ball.dx = - ball.dx;
    } 
    ball.x += ball.dx;
    ball.y += ball.dy;
}
init();
setInterval(draw, 10);

window.onload = draw();