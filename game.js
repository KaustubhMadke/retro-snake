import {update as updatesnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, updateSnakeSpeed} from './snake.js'
import {update as updateFood, draw as drawFood, EXPANSION_RATE, updateExpansionRate} from './food.js'
import {outSideGrid} from './grid.js'


let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    document.getElementById('error-message').style.visibility = 'hidden'    

    if (gameOver) {
        document.getElementById('error-message').style.visibility = 'visible'
        return 
    }
    
    window.requestAnimationFrame(main)

    const secondSinceLastRener = (currentTime - lastRenderTime)/1000
    if (secondSinceLastRener < 1 / SNAKE_SPEED) return
    
    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updatesnake()
    updateFood()
    checkForDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkForDeath() {
    gameOver = outSideGrid(getSnakeHead()) || snakeIntersection() 
}

function gameModeSelection(value) {
    switch(value) {
        case 'EASY':
            updateSnakeSpeed(2);
            updateExpansionRate(1);
            break;
        case 'MEDIUM':
            updateSnakeSpeed(3);
            updateExpansionRate(3);
            break;
        case 'HARD':
            updateSnakeSpeed(5);
            updateExpansionRate(3);
            break;
    }
    document.getElementById('game-mode').style.visibility = 'hidden'    
}

document.addEventListener('DOMContentLoaded', function () {
    var inputRadio = document.getElementsByClassName('game-selection-button')
    if (inputRadio.length > 0) {
        for (let i=0; i<inputRadio.length;i++){
            inputRadio[i].addEventListener("click", function() {
                gameModeSelection(inputRadio[i].value)
            });
            //gameModeSelection(inputRadio[i].value))
        }
    }    
})
