function Breaker()
{

    this.width = 200
    this.height = 40

    this.X = (width - this.width)/2
    this.Y = height - this.height * 2

    this.ball_width = 20

    this.ball_X = width/2
    this.ball_Y = height - this.height * 2 - this.ball_width * 2

    this.ball_X_speed = 0
    this.ball_Y_speed = 0

    this.show = function()
    {
        rect(this.X, this.Y, this.width, this.height)
        circle(this.ball_X, this.ball_Y, this.ball_width)
    }

    this.update = function()
    {
        if (this.ball_X + this.ball_width/2)
    }
    
}