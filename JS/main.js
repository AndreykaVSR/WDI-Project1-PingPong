
/*----- constants -----*/ 

ctx = document.getElementById("ball-canvas").getContext("2d");

const ballRadius = 6.54; 

/*----- app's state (variables) -----*/ 

var paddle1;
// var paddle1X; 
var paddle2;
// var paddle2X; 
var ballCanvas;

var btnUp = false;
var btnDn = false;

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

class Paddle {
    constructor(x, y, dy, w, h) {
		this.x = x;
		this.y = y;
		this.dy = dy;
		this.w = w;
		this.h = h;
		// this.checkCollision = function() {...};
    };

    draw () {
    
        ctx.fillStyle = "rgba(60, 60, 60, 1)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        // ctx.shadowColor = "rgba(0, 0, 0, .7)";
        // ctx.shadowOffsetX = 6;
        // ctx.shadowOffsetY = 6;
        // ctx.shadowBlur = 5;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;

    }
    
};


function init() {
    ballCanvas = document.getElementById("ball-canvas");

    paddle1 = new Paddle(20, 400, 7, 10, 70);
    paddle2 = new Paddle(980, 100, 7, 10, 70);
    ball = new Ball(paddle1.x + paddle1.w + ballRadius, paddle1.h / 2 + paddle1.y, 2, -.2, ballRadius);
    // console.log(ball);

   
};

function draw() {

ctx.clearRect(0, 0, ballCanvas.width, ballCanvas.height);

 
    paddle1.draw();
    paddle2.draw();

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


    if (btnDn && paddle1.y > 0) {
        paddle1.y -= 7;
    }
    else if (btnDn && paddle1.y + paddle1.h < ballCanvas.height) {
        paddle1.y += 7;
    }
    // ball.x += ball.dx;
    // ball.y += ball.dy;

    if (btnDn && paddle2.y > 0) {
        paddle2.y -= 7;
    }
    else if (btnDn && paddle2.y + paddle2.h < ballCanvas.height) {
        paddle2.y += 7;
    }
};

init();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "40" || e.key == "ArrowUp") {
        btnUp = true;
    }
    else if(e.key == "38" || e.key == "ArrowDown") {
        btnDn = true;
    }
};

function keyUpHandler(e) {
    if(e.key == "40" || e.key == "ArrowUp") {
        btnUp = false;
    }
    else if(e.key == "38" || e.key == "ArrowDown") {
        btnDn = false;
    }
};

setInterval(draw, 7);

window.onload = draw();