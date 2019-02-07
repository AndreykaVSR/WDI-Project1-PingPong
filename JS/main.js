
/*----- constants -----*/ 

ctx = document.getElementById("ball-canvas").getContext("2d");

const ballRadius = 6.54; 

/*----- app's state (variables) -----*/ 

var paddle1;
// var paddle1X; 
var paddle2;
// var paddle2X; 
var ballCanvas;

var keyPressed = false;
var btnUp1 = false;
var btnDn1 = false;
var btnUp2 = false;
var btnDn2 = false;

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
        // ctx.strokeStyle = "white";
        // ctx.lineWidth = 1;

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
    // ball.draw();

    // ====================================
    // Table graphics

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

    // ================================= 
    // Ball graphics

    ctx.beginPath();
    ctx.fillStyle = "rgba(246, 156, 2, 1)";
    ctx.arc(ball.x, ball.y, ball.ballRadius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();


    // ballCanvas = document.getElementById("ball-canvas");

    // ================================= 
    // Ball vs canvas collision 

    // if (ball.y + ball.dy > ballCanvas.height - ballRadius || ball.y + ball.dy < ballRadius) {
    //     ball.dy = - ball.dy;
    // }
    // if ( ball.x + ball.dx > ballCanvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    //     ball.dx = - ball.dx;
    // } 
    // ball.x += ball.dx;
    // ball.y += ball.dy;

    // ===================================================================
    // Checking for the collision on the bottom and the top of the canas. 
    if (ball.y + ball.dy > ballCanvas.height - ballRadius || ball.y + ball.dy < ballRadius) {
        ball.dy = - ball.dy;
    }
    
    // if ( (ball.x + ball.dx > ballCanvas.width - ballRadius ) && (ball.y - ballRadius < paddle2.y + paddle2.h)) {

    // ===================================================================================
    // Checking for the collision on the right side of the canas + right paddle (paddle2)
    if ((ball.x > paddle2.x - ballRadius || ball.x + ball.dx < ballRadius) && 
        (ball.y + ballRadius > paddle2.y && ball.y + ballRadius < paddle2.y + paddle2.h)) {
            ball.dx = - ball.dx;
    } else {
        // console.log("ball is gone on right side!");
    }

    if ((ball.x < paddle1.x + paddle1.w + ballRadius || ball.x + ball.dx < ballRadius) && 
        (ball.y + ballRadius > paddle1.y && ball.y + ballRadius < paddle1.y + paddle1.h)) {
            ball.dx = - ball.dx;
    } else {
        // init ();
        // console.log("ball is gone on left side!");
    }
    ball.x += ball.dx;
    ball.y += ball.dy;

    // ================================= 
    // Ball vs Paddles collision

    // if (ball.x + ball.dx > ballCanvas.width - ballRadius) {
        // } 
        
        // if (ball.y + ballRadius >= paddle1.y && ball.x - ballRadius < paddle1.x + paddle1.w) {
        //     ball.dx = - ball.dx; 
        // } else if (ball.y - ballRadius <= paddle1.y + paddle1.h)
        //     ball.dx = - ball.dx
           
            
        //     + ballRadius > paddle1.x || ball.x <  paddle1.x + paddle1.w) {
        //     ball.dx = - ball.dx;
        // }
               
    //  || ball.y + ball.dy < ballRadius) {
        // ball.dx = - ball.dx;

    // if (ball.y + ball.dy > paddle2 - ballRadius || ball.y + ball.dy < ballRadius) {
    //     // ball.dx = - ball.dx;
    // }

    // ball.x += ball.dx;

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
    // console.log ( 'paddles ' +paddle1 + paddle2);

    // ball.x += ball.dx;
    // ball.y += ball.dy;

    // if (btnDn && paddle2.y > 0) {
    //     paddle2.y -= 7;
        
    // }
    // else if (btnDn && paddle2.y + paddle2.h < ballCanvas.height) {
    //     paddle2.y += 7;
    // }
};

// Button assignment / Event Listeners

init();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {

    keyPressed = e.keyCode;
    // if (e.key == "87" || e.key == "W" || e.key == "w") {
    //     btnUp1 = true;
    // }
    // else if (e.key == "83" || e.key == "S" || e.key == "s") {
    //     btnDn1 = true;
    // }

    // if (e.key == "38" || e.key == "ArrowUp") {
    //     btnUp2 = true;
    // }
    // else if (e.key == "40" || e.key == "ArrowDown") {
    //     btnDn2 = true;
    // }
    console.log(keyPressed);
};

function keyUpHandler(e) {

    keyPressed = false;
    // if(e.key == "38" || e.key == "ArrowUp") {
    //     btnUp1 = false;
    // }
    // else if(e.key == "40" || e.key == "ArrowDown") {
    //     btnDn1 = false;
    // }

    // if(e.key == "87" || e.key == "W" || e.key == "w") {
    //     btnUp2 = false;
    // }
    // else if(e.key == "83" || e.key == "S" || e.key == "s") {
    //     btnDn2 = false;
    // }

    // console.log();

};

setInterval(draw, 10);

window.onload = draw();

