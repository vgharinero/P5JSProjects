function Breaker(b_width, b_height, X0, Y0)
{

    this.width = b_width
    this.height = b_height

    this.X = X0
    this.Y = Y0

    this.show = function()
    {
        noStroke()
        fill('white')
        rect(this.X, this.Y, this.width, this.height)
    }

    this.update = function()
    {
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
    
}