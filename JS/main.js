
var ballCanvas;
var x;
var y;
var dx;
var dy;
var ctx;

function init(){
    ballCanvas = document.getElementById("ball-canvas");
    x = ballCanvas.width/2;
    y = ballCanvas.height-30;
    dx = -2;
    dy = 0.5;

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

    ctx.fillStyle = "rgba(60, 60, 60, 1)";
    ctx.fillRect(10, 400, 10, 70);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    ctx.fillStyle = "rgba(60, 60, 60, 1)";
    ctx.fillRect(980, 100, 10, 70);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

var ballRadius = 6.54; 
    ctx.beginPath();
    ctx.fillStyle = "rgba(246, 156, 2, 1)";
    ctx.arc(x, y, ballRadius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();

    ctx.restore();


ballCanvas = document.getElementById("ball-canvas");



    if (y + dy > ballCanvas.height-ballRadius || y + dy < ballRadius) {
        dy = - dy;
    }
    if ( x + dx > ballCanvas.width-ballRadius || x + dx < ballRadius) {
        dx = - dx;
    } 
    x += dx;
    y += dy;
}
init();
setInterval(draw, 10);

window.onload = draw();