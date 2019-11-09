function Block(width_, height_, X_, Y_)
{

    this.width = width_
    this.height = height_ 

    this.X = X_
    this.Y = Y_

    this.draw = function()
    {
        fill('white')
        rect(this.X, this.Y, this.width, this.height)
    }

    this.update = function()
    {
        if (keyIsDown(LEFT_ARROW))
        {
            this.X += 5
        }
        else if (keyIsDown(RIGHT_ARROW))
        {
            this.X -= 5
        }
    }

}