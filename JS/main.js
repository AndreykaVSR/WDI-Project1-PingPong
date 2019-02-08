
/*----- constants -----*/ 
var resetInt;
ctx = document.getElementById("ball-canvas").getContext("2d");

const ballRadius = 6.54; 

/*----- app's state (variables) -----*/ 

var paddle1;
var paddle2;
var ballCanvas;

var keyPressed = false;
var btnUp1 = false;
var btnDn1 = false;
var btnUp2 = false;
var btnDn2 = false;
var ballIsGone = false;

let score, winner;

/*----- cached element references -----*/ 

const scoreEls = {
    p1: document.querySelector('#p1 > h1'),
    p2: document.querySelector('#p2 > h1'),
  };

/*----- event listeners -----*/ 

document.getElementById("newGame").addEventListener('click', newGame);

/*----- functions -----*/

class Ball {
    constructor(x, y, dx, dy, ballRadius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.ballRadius = ballRadius;
	};
}

class Paddle {
    constructor(x, y, dy, w, h) {
		this.x = x;
		this.y = y;
		this.dy = dy;
		this.w = w;
        this.h = h;
        this.score = 0;
    };

    draw () {
        ctx.fillStyle = "rgba(60, 60, 60, 1)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
};

function init() {
    ballCanvas = document.getElementById("ball-canvas");

    paddle1 = new Paddle(0, 400, 7, 5, 70);
    paddle2 = new Paddle(995, 100, 7, 5, 70);
    ball = new Ball(paddle1.x + paddle1.w + ballRadius+50, paddle1.h / 2 + paddle1.y, 2, -.3, ballRadius);
};

function draw() {

    ctx.clearRect(0, 0, ballCanvas.width, ballCanvas.height);

    paddle1.draw();
    paddle2.draw();

// ====================================
// Table graphics

    ctx.fillStyle = "#4F6794";
    ctx.fillRect(50, 5, 900, 490);
    ctx.strokeStyle = "rgba(250, 250, 250, 1)";
    ctx.lineWidth = 10;
    ctx.strokeRect(50, 5, 900, 490);

// middle lines
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(450, 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(550, 250);
    ctx.lineTo(950, 250);
    ctx.stroke();
    ctx.save();

// Net
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

// ================================= 
// Ball graphics
    ctx.beginPath();
    ctx.fillStyle = "rgba(246, 156, 2, 1)";
    ctx.arc(ball.x, ball.y, ball.ballRadius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    // ===================================================================
    // Checking for the collision on the bottom and the top of the canas. 
    if (ball.y + ball.dy > ballCanvas.height - ballRadius || ball.y + ball.dy < 0) {
        ball.dy = - ball.dy;
    }

// ===================================================================================
// Checking for the collision on the right side of the canas + right paddle (paddle2)
    if ((ball.x > paddle2.x - ballRadius) && 
        (ball.y + ballRadius > paddle2.y && ball.y + ballRadius < paddle2.y + paddle2.h)) {
            ball.dx = - ball.dx;
    } else if (ball.x > ballCanvas.width + ballRadius) {
            ballIsGone = true;
            console.log('ball is gone on the right ');
            paddle1.score += 1;
            render();
            clearInterval(resetInt);
            setTimeout(function(){
                // init();
                ball = new Ball(paddle1.x + paddle1.w + ballRadius+50, paddle1.h / 2 + paddle1.y, 2, -.3, ballRadius);
                resetInt = setInterval(draw, 5);
                ballIsGone = false;
            }, 2000);
        // console.log("ball is gone on right side!");
    }
// ===================================================================================
// Checking for the collision on the right side of the canas + left paddle (paddle1)

    if ((ball.x < paddle1.x + paddle1.w + ballRadius /* || ball.x + ball.dx < ballRadius*/) && 
        (ball.y + ballRadius > paddle1.y && ball.y + ballRadius < paddle1.y + paddle1.h)) {
            ball.dx = - ball.dx;
    } else if (ball.x < -25) {
        ballIsGone = true;
        // console.log('ball is gone on the left ');
        paddle2.score += 1;
        render();
        clearInterval(resetInt);
        setTimeout(function(){
            ball = new Ball(paddle1.x + paddle1.w + ballRadius+50, paddle1.h / 2 + paddle1.y, 2, -.3, ballRadius);
            resetInt = setInterval(draw, 5);
            ballIsGone = false;
        }, 2000);
    }
    ball.x += ball.dx;
    ball.y += ball.dy;

    
    // ================================= 
    // Paddles vs canvas collision

    // Paddle1

    if (keyPressed && keyPressed == 87) {
        if (paddle1.y > 3) {
            paddle1.y -= 3;
        } else if (paddle1.y < 3)
            paddle1.y = 0;
    }

    if (keyPressed && keyPressed == 83) {
        if (paddle1.y + paddle1.h < ballCanvas.height) {
        paddle1.y += 3;
        }
        else if (paddle1.y + paddle1.h < ballCanvas.height - paddle1.h) {
        paddle1.y = ballCanvas.height - paddle1.height;
        }
    }   

    // Peddle2

    if (keyPressed && keyPressed == 38) {
        if (paddle2.y > 3) {
        paddle2.y -= 3;
        } else if (paddle2.y < 3)
        paddle2.y = 0;
    }

    if (keyPressed && keyPressed == 40) { 
        if (paddle2.y + paddle2.h < ballCanvas.height) {
            paddle2.y += 3;
        } else if (paddle2.y + paddle2.h > ballCanvas.height - paddle2.h){
        paddle2.y = ballCanvas.height - paddle2.h
        }
    }
};

// ====================================
// Button assignment

init();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    keyPressed = e.keyCode;
};

function keyUpHandler(e) {
    keyPressed = false;
};

var $p1Score = document.querySelector("#p1 h1");
var $p2Score = document.querySelector("#p2 h1");

function render() {

    $p1Score.textContent = paddle1.score;
    $p2Score.textContent = paddle2.score;
  }

// New Game Button ********************************************
// ============================================================

function newGame() {
    paddle1 = new Paddle(0, 400, 7, 5, 70);
    paddle2 = new Paddle(995, 100, 7, 5, 70);
    ball = new Ball(paddle1.x + paddle1.w + ballRadius+50, paddle1.h / 2 + paddle1.y, 2, -.3, ballRadius);
    render();
}

resetInt = setInterval(draw, 5);

window.onload = draw();


