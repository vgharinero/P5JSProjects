let snake

let isFood
let foodPosition

let difficulty = 0


function setup()
{

    createCanvas(800, 800)

    snake = new Snake()
    snake.setup()
}   

function draw()
{
    frameRate(7 + difficulty)

    background(0)

    if (!isFood)
    {
        isFood = true
        foodPosition = generateFood()
    }

    noStroke()
    fill('red')
    rect(foodPosition.X, foodPosition.Y, 40, 40)

    snake.update()
    snake.show()

    if (snake.X == foodPosition.X && snake.Y == foodPosition.Y)
    {
        isFood = false
        snake.eat()
        difficulty += 0.1
    }

    if (snake.restart)
    {
        snake.setup()        
        isFood = false
        difficulty = 0
    }

}

function keyPressed()
{
    switch (key)
    {
        case 'ArrowUp':
            if (snake.X != -40 && snake.X != width)
            {
                snake.direction = 0
            }
            break
        case 'ArrowDown':
            if (snake.X != -40 && snake.X != width)
            {
                snake.direction = 1
            }
            break
        case 'ArrowLeft':  
            if (snake.Y != -40 && snake.Y != height)
            {
                snake.direction = 2
            }
            break
        case 'ArrowRight':
            if (snake.Y != -40 && snake.Y != height)
            {
                snake.direction = 3
            }
            break
    }
}

function generateFood()
{
    let new_point

    do
    {
        new_point = {X: (int(random(0, 19))) * 40, Y: (int(random(0, 19))) * 40}
    } 
    while (inSnake(new_point))

    return new_point
}

function inSnake(new_point)
{
    let isIn = false
    snake.history.forEach(point => 
        {
            if (new_point.X == point.X && new_point.Y == point.Y)
            {
                isIn = true
            }
        }
    )
    return isIn
}