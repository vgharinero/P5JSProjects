function Ball(size, X0, Y0, speed)
{
    this.size = size

    this.X = X0
    this.Y = Y0

    this.X_speed = speed
    this.Y_speed = speed

    this.has_collide = false

    this.show = function()
    {
        noStroke()
        fill('white')
        circle(this.X, this.Y, this.size)
    }

    this.update = function()
    {
        this.X += this.X_speed
        this.Y += this.Y_speed

        if (this.X - this.size/2 <= 0 || this.X + this.size/2 >= width)
        {
            this.X_speed *= -1
            this.has_collide = false
        }

        if (this.Y - this.size/2 <= 0)
        {
            this.Y_speed *= -1
            this.has_collide = false
        }
        else if (this.Y + this.size/2 > height)
        {
            this.X = X0
            this.Y = Y0
        }
    }

    this.breakerCollision = function (breaker)
    {
        if (!this.has_collide)
        {
            if ((this.Y + this.size/2 >= breaker.Y && this.Y - this.size/2 <= breaker.Y + breaker.height) && 
                (this.X + this.size/2 >= breaker.X && this.X - this.size/2 <= breaker.X + breaker.width)) 
            {
                this.Y_speed *= -1

                if (this.Y + this.size/3 > breaker.Y) 
                {
                    this.X_speed *= -1
                }

                this.has_collide = true
            }
        }
    }
}