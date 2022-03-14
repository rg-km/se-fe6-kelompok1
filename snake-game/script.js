const CELL_SIZE = 30;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
const MOVE_INTERVAL = 120;

let Level = 1;
let Speed = 120;
let Life  = 3;
let Score = 0;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake() {
    return {
        ...initHeadAndBody(),
        direction: initDirection(),
    }
}

function initThorn(){
    return {
        ...initHeadAndBody(),
        direction: initDirection(),
    }
}

let snake1 = initSnake();

let apple = [{
    color: "red",
    position: initPosition(),
},{
    color: "red",
    position: initPosition(),
}]

let life = [{
    position: initPosition(),
}]

let thorn1 = initThorn();

let obstacle = initThorn();

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
    let scoreCanvas;
    scoreCanvas = document.getElementById("score1Board");
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(Score, 10, scoreCanvas.scrollHeight / 2);
}

function drawLife(snake) {
    let lifeCanvas;
    lifeCanvas = document.getElementById("lifeBoard");
    let lifeCtx = lifeCanvas.getContext("2d");

    lifeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    lifeCtx.font = "30px Arial";
    lifeCtx.fillStyle = snake.color
    lifeCtx.fillText(Life, 10, lifeCanvas.scrollHeight / 2);
}

function drawLevel(snake) {
    let levelCanvas;
    levelCanvas = document.getElementById("levelBoard");
    let levelCtx = levelCanvas.getContext("2d");

    levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    levelCtx.font = "30px Arial";
    levelCtx.fillStyle = snake.color
    levelCtx.fillText(Level, 10, levelCanvas.scrollHeight / 2);
}

function drawSpeed(snake) {
    let speedCanvas;
    speedCanvas = document.getElementById("speedBoard");
    let speedCtx = speedCanvas.getContext("2d");

    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    speedCtx.font = "30px Arial";
    speedCtx.fillStyle = snake.color
    speedCtx.fillText(Speed, 10, speedCanvas.scrollHeight / 2);
}


function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        let field = new Image();
        field.src = "assets/field.png";
        ctx.drawImage(field , 0 , 0 , CANVAS_SIZE, CANVAS_SIZE);

        var head = document.getElementById("head");
        ctx.drawImage(head, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        for (let i = 1; i < snake1.body.length; i++) {
        var body = document.getElementById("body");
        ctx.drawImage(body, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        var thorn = document.getElementById("thorn");
        ctx.drawImage(thorn, thorn1.head.x * CELL_SIZE, thorn1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        for (let i = 1; i < thorn1.body.length; i++) {
        }

        for (let i = 0; i < apple.length; i++) {
            let apples = apple[i];

            var img = document.getElementById("apple");
            ctx.drawImage(img, apples.position.x * CELL_SIZE, apples.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        for (let i = 2; i <= Score; i++) {
            let flag = 0;
            for (let j = 1; j <= Score; j++) {
                if (Score % j == 0) {
                    flag++
                }
            }
            if (flag == 2) {
                for (let i = 0; i < life.length; i++) {
                    let lifes = life[i];
                    var img = document.getElementById("life");
                    ctx.drawImage(img, lifes.position.x * CELL_SIZE, lifes.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }
        drawScore(snake1);
        drawLife(snake1);
        drawSpeed(snake1);
        drawLevel(snake1);

        if(Level == 2){
            ctx.fillStyle = "BLACK";
            ctx.fillRect(60, 8 * 30, 480, 30);
        }
        else if(Level == 3){
            ctx.fillStyle = "BLACK";
            ctx.fillRect(6* 30, 3 * 30, 30, 430);
            ctx.fillRect(14* 30, 3 * 30, 30, 430);
        }
        else if(Level == 4) {
            ctx.fillStyle = "BLACK";
            ctx.fillRect(40  , 8  * 30, 240, 30);
            ctx.fillRect(340  , 8  * 30, 240, 30);
        }
        else if(Level == 5) {
            ctx.fillStyle = "BLACK";
            ctx.fillRect(60  , 8  * 30, 200, 30);
            ctx.fillRect(340  , 8  * 30, 200, 30);
            ctx.fillRect(200  , 11  * 30, 200, 30);
            ctx.fillRect(90  , 12  * 30, 30, 200);
            ctx.fillRect(480  , 12  * 30, 30, 200);
        }
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple, life) {
    for (let i = 0; i < apple.length; i++) {
        let apples = apple[i];
    if (snake1.head.x == apples.position.x && snake1.head.y == apples.position.y) {
        var audio = new Audio('assets/eat-apple.mp3');
        audio.play();
        apples.position = initPosition();
        Score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        if(Score % 5 == 0){
            textLevel = "Level Complete " + Level;
            alert(textLevel);
            Speed -= 20;
            Level++;
            var audio = new Audio('assets/level-up.mp3');
            audio.play();
            }
        }
    }
    for (let i = 0; i < life.length; i++) {
        let lifes = life[i];
    if (snake.head.x == lifes.position.x && snake.head.y == lifes.position.y) {
        var audio = new Audio('assets/eat-live.mp3');
        audio.play();
        lifes.position = initPosition();
        Life++;
        }
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple, life);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple, life);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple, life);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple, life);
}

function checkCollision(snakes) {
    let isCollide = false;
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        Life-= 1;
        if(Life == 0){
        var audio = new Audio('assets/game-over.wav');
        audio.play();
        alert("Game Over!, try again?");
        Score  = 0;
        Life   = 3;
        Speed  = 120;
        Level  = 1;
        snake1 = initSnake();
        thorn1 = initThorn();
        }
        else {
            snake1 = initSnake({
                direction: initDirection(),
                ...initHeadAndBody(),
            });
            thorn1 = initThorn();
        }
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake1, thorn1, obstacle])) {
        setTimeout(function() {
            move(snake);
        }, 120);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake1);
    move(thorn1);
}

initGame();