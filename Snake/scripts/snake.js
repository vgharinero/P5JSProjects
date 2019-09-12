function Snake(main) 
{

    this.restart

    this.setup = function() 
    {
        this.history = []
        
        this.direction = 1

        this.body_length = 3

        this.X = width/2 - 40
        this.Y = height/2 - 40

        for (let i = this.body_length; i > -1; i--)
        {
            this.history.push({X: this.X, Y: this.Y - (40 * i)})
        }
    }

    this.show = function() 
    {
        this.restart = false

        if (this.Y >= height)
        {
            this.Y = 0
        }
        if (this.Y <= -40)
        {
            this.Y = height - 40
        }
        if (this.X >= width)
        {
            this.X = 0
        }
        if (this.X <= -40)
        {
            this.X = width - 40
        }

        let new_point = {X: this.X, Y: this.Y}
        this.history.forEach(point => 
            {
                if (new_point.X == point.X && new_point.Y == point.Y)
                {
                    this.restart = true
                }
            }
        )
    
        this.history.push(new_point)

        strokeWeight(3)
        stroke(51)
        fill('white')
        rect(this.X, this.Y, 40, 40)

        for (let i = 1; i < this.body_length; i++)
        {
            rect(this.history[this.history.length - i - 1].X, this.history[this.history.length - i - 1].Y, 40, 40)
        }

        noStroke()
        fill('black')
        switch (this.direction)
        {
            case 0:
                rect(this.X + 8, this.Y + 10, 6, 6)
                rect(this.X + 26, this.Y + 10, 6, 6)
                break
            case 1:
                rect(this.X + 8, this.Y + 24, 6, 6)
                rect(this.X + 26, this.Y + 24, 6, 6)
                break
            case 2:
                rect(this.X + 10, this.Y + 8, 6, 6)
                rect(this.X + 10, this.Y + 26, 6, 6)
                break
            case 3:
                rect(this.X + 24, this.Y + 8, 6, 6)
                rect(this.X + 24, this.Y + 26, 6, 6)
                break
        }

        while (this.history.length > this.body_length)
        {
            this.history.shift()
        }
        
    }

    this.update = function()
    {
        switch (this.direction)
        {
            case 0:
                this.Y -= 40
                break
            case 1:
                this.Y += 40
                break
            case 2:
                this.X -= 40
                break
            case 3:
                this.X += 40
                break
        }
    }

    this.eat = function()
    {
        this.body_length++
    }

}