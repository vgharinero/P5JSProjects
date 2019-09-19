function Brick(b_width, b_height, X0, Y0)
{

    this.width = b_width
    this.height = b_height

    this.X = X0
    this.Y = Y0

    this.broken = false

    this.show = function()
    {
        if (!this.broken)
        {
            strokeWeight(3)
            stroke(51)
            fill('white')
            rect(this.X, this.Y, this.width, this.height)
            noStroke()
            fill('red')
            rect(this.X + 5, this.Y + 5, this.width - 10, this.height - 10)
        }
    }

    this.ballCollision = function(breaker, ball)
    {
        if (!this.broken)
        {
            if ((ball.Y + ball.size/1.5 >= this.Y + 5 && ball.Y - ball.size/1.5 <= this.Y + this.height - 10) && 
                (ball.X + ball.size/1.5 >= this.X + 5 && ball.X - ball.size/1.5 <= this.X + this.width - 10)) 
            {
                ball.Y_speed *= -1

                if (ball.Y + ball.size/3 > this.Y) 
                {
                    ball.Y_speed *= -1
                    ball.X_speed *= -1
                }
                
                this.broken = true

                breaker.has_collide = false
            }
        }
    }   

}