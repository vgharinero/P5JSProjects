let breaker

function setup()
{

    createCanvas(800, 800)

    breaker = new Breaker()

}   

function draw()
{

    background(0)

    breaker.show()

    if (keyIsDown(LEFT_ARROW))
    {
        if (breaker.X > 0)
        {
            breaker.X -= 10
        }
    }
    else if (keyIsDown(RIGHT_ARROW))
    {
        if (breaker.X < (width - breaker.width))
        {
            breaker.X += 10
        }
    }

}