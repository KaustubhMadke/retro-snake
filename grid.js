let GRID_SIZE = 21
export function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

export function outSideGrid(postion) {
    return (
        postion.x < 1 || postion.x > GRID_SIZE 
        || postion.y < 1 || postion.y > GRID_SIZE
    )
}