const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 50;
let dx = 4;
let dy = -4;

let paddleHeight = 12;
let paddleWidth = 120;
let paddleX = (canvas.width - paddleWidth) / 2;

let score = 0;

document.addEventListener("mousemove", movePaddle);
function movePaddle(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    paddleX = mouseX - paddleWidth / 2;
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "cyan";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    document.getElementById("score").innerText = score;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();

    // Wall collisions
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
    if (y + dy < ballRadius) dy = -dy;

    // Paddle collision
    if (y + dy > canvas.height - paddleHeight - 20 && x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
        score++;
    }

    if (y + dy > canvas.height - ballRadius) {
        alert("Game Over! Score: " + score);
        document.location.reload();
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

draw();