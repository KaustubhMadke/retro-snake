import {getInputDirection} from './input.js'

export let SNAKE_SPEED = 3
const snakeBody = [{x:11, y:11}]
let newSegment = 0
let speedBumped = true

export function updateSnakeSpeed(value) {
    SNAKE_SPEED = value
}

export function update() {
    addSegments()
    let inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y    
    // if ((snakeBody.length / 10) === 1) {
    //     if (!speedBumped) {
    //         SNAKE_SPEED = SNAKE_SPEED + 1
    //     }        
    // } else {
    //     speedBumped = false
    // }
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount) {
    newSegment += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (index === 0 && ignoreHead) return false
        return equalPositions(segment, position)
    })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i< newSegment ; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length -1]})
    }

    newSegment = 0
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead : true})
}