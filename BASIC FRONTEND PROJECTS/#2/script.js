// ==========================
// 1️⃣ DOM SELECTORS
// ==========================

const hscore = document.querySelector("#high-score");
const score = document.querySelector("#score");
const time = document.querySelector("#time");

const stbutton = document.querySelector(".start-btn");
const rstbutton = document.querySelector(".restart-btn");

const modal = document.querySelector(".modal");
const startgame = document.querySelector(".start-game");
const gameover = document.querySelector(".game-over");

const board = document.querySelector(".game-board");


// ==========================
// 2️⃣ GAME STATE VARIABLES
// ==========================

let highScore = localStorage.getItem("highScore") || 0;
let currentScore = 0;

let startTime = `0-0`;
let timeintervalid = null;
let intervalId = null;

const blockWidth = 30;
const blockHeight = 30;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let direction = "down";
let snake = [{ x: 1, y: 3 }];

let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols)
};

const blocks = [];

hscore.textContent = highScore;


// ==========================
// 3️⃣ BOARD CREATION
// ==========================

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row},${col}`] = block;
    }
}


// ==========================
// 4️⃣ EVENT LISTENERS
// ==========================

stbutton.addEventListener("click", startGame);
rstbutton.addEventListener("click", restartGame);

addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } 
    else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    } 
    else if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } 
    else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
});


// ==========================
// 5️⃣ GAME CONTROL FUNCTIONS
// ==========================

function startGame() {

    modal.style.display = "none";

    intervalId = setInterval(render, 300);

    timeintervalid = setInterval(() => {

        let [min, sec] = startTime.split("-").map(Number);

        if (sec === 59) {
            min += 1;
            sec = 0;
        } else {
            sec += 1;
        }

        startTime = `${min}-${sec}`;
        time.textContent = startTime;

    }, 1000);
}


function restartGame() {

    clearInterval(intervalId);
    clearInterval(timeintervalid);

    blocks[`${food.x},${food.y}`].classList.remove("food");

    snake.forEach((segment) => {
        const block = blocks[`${segment.x},${segment.y}`];
        block.classList.remove("filld");
    });

    currentScore = 0;
    startTime = `0-0`;
    direction = "down";
    snake = [{ x: 1, y: 3 }];

    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    };

    score.textContent = currentScore;
    time.textContent = startTime;
    hscore.textContent = highScore;

    modal.style.display = "none";

    intervalId = setInterval(render, 300);

    timeintervalid = setInterval(() => {

        let [min, sec] = startTime.split("-").map(Number);

        if (sec === 59) {
            min += 1;
            sec = 0;
        } else {
            sec += 1;
        }

        startTime = `${min}-${sec}`;
        time.textContent = startTime;

    }, 1000);
}


// ==========================
// 6️⃣ GAME RENDER LOGIC
// ==========================

function render() {

    let head = null;

    blocks[`${food.x},${food.y}`].classList.add("food");

    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } 
    else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } 
    else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    } 
    else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }

    // Wall collision
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        modal.style.display = "flex";
        startgame.style.display = "none";
        gameover.style.display = "flex";
        clearInterval(intervalId);
        clearInterval(timeintervalid);
        return;
    }

    // Remove previous snake rendering
    snake.forEach((segment) => {
        blocks[`${segment.x},${segment.y}`].classList.remove("filld");
    });

    snake.unshift(head);

    // Food eaten
    if (head.x === food.x && head.y === food.y) {

        blocks[`${food.x},${food.y}`].classList.remove("food");

        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };

        currentScore += 10;
        score.textContent = currentScore;

        if (currentScore > highScore) {
            highScore = currentScore;
            localStorage.setItem("highScore", highScore.toString());
        }

    } 
    else {
        snake.pop();
    }

    // Render snake
    snake.forEach((segment) => {
        blocks[`${segment.x},${segment.y}`].classList.add("filld");
    });
}