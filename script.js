const canvas = document.getElementById("pongCanvas");

const context = canvas.getContext("2d");

canvas.width = 800;

canvas.height = 400;

// Elementos do jogo

const paddleWidth = 10, paddleHeight = 100;

const ballRadius = 10;

const player = {

    x: 0,

    y: canvas.height / 2 - paddleHeight / 2,

    width: paddleWidth,

    height: paddleHeight,

    color: "white",

    dy: 5

};

const ai = {

    x: canvas.width - paddleWidth,

    y: canvas.height / 2 - paddleHeight / 2,

    width: paddleWidth,

    height: paddleHeight,

    color: "white",

    dy: 3

};

const ball = {

    x: canvas.width / 2,

    y: canvas.height / 2,

    radius: ballRadius,

    speed: 5,

    dx: 5,

    dy: 5,

    color: "white"

};

// Função para desenhar o retângulo

function drawRect(x, y, width, height, color) {

    context.fillStyle = color;

    context.fillRect(x, y, width, height);

}

// Função para desenhar a bola

function drawBall(x, y, radius, color) {

    context.fillStyle = color;

    context.beginPath();

    context.arc(x, y, radius, 0, Math.PI * 2);

    context.closePath();

    context.fill();

}

// Atualizar elementos do jogo

function update() {

    // Mover a bola

    ball.x += ball.dx;

    ball.y += ball.dy;

    // Mover o jogador

    if (upArrowPressed && player.y > 0) {

        player.y -= player.dy;

    } else if (downArrowPressed && player.y < canvas.height - player.height) {

        player.y += player.dy;

    }

    // Mover o AI

    if (ai.y < ball.y) {

        ai.y += ai.dy;

    } else if (ai.y > ball.y) {

        ai.y -= ai.dy;

    }

    // Colisão com as bordas superior e inferior

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {

        ball.dy *= -1;

    }

    // Colisão com o jogador

    if (ball.x - ball.radius < player.x + player.width &&

        ball.y > player.y &&

        ball.y < player.y + player.height) {

        ball.dx *= -1;

    }

    // Colisão com o AI

    if (ball.x + ball.radius > ai.x &&

        ball.y > ai.y &&

        ball.y < ai.y + ai.height) {

        ball.dx *= -1;

    }

    // Pontuação e reset da bola

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {

        ball.x = canvas.width / 2;

        ball.y = canvas.height / 2;

        ball.dx *= -1;

    }

}

// Desenhar elementos do jogo

function draw() {

    drawRect(0, 0, canvas.width, canvas.height, "black");

    drawRect(player.x, player.y, player.width, player.height, player.color);

    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);

    drawBall(ball.x, ball.y, ball.radius, ball.color);

}

// Controle do jogador

let upArrowPressed = false;

let downArrowPressed = false;

window.addEventListener("keydown", (event) => {

    switch (event.key) {

        case "ArrowUp":

            upArrowPressed = true;

            break;

        case "ArrowDown":

            downArrowPressed = true;

            break;

    }

});

window.addEventListener("keyup", (event) => {

    switch (event.key) {

        case "ArrowUp":

            upArrowPressed = false;

            break;

        case "ArrowDown":

            downArrowPressed = false;

            break;

    }

});

// Loop do jogo

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();