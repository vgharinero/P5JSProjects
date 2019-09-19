let breaker
const breaker_width = 200
const breaker_height = 40

let ball
const ball_size = 25
const ball_speed = 2

let bricks = []
const bricks_width = 75
const bricks_height = 35

function setup()
{

    createCanvas(800, 800)

    breaker = new Breaker(breaker_width, breaker_height, (width - breaker_width)/2, height - breaker_height * 2)
    ball = new Ball(ball_size, width/2, height - breaker_height * 2 -  ball_size * 10, ball_speed)
    
    for (let i = 0; i < 8; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            bricks.push(new Brick(bricks_width, bricks_height, 75 * (i + 1), 35 * (j + 1)))
        }
    }
}   

function draw()
{

    background(0)

    breaker.update()
    breaker.show()

    ball.update()
    ball.show()
    ball.breakerCollision(breaker)

    for (brick of bricks)
    {
        brick.show()
        brick.ballCollision(breaker, ball)
    }
}