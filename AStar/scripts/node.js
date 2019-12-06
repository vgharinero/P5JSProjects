function Node(X, Y, wall, start, target)
{

    this.X = X
    this.Y = Y
    this.wall = wall
    this.start = start
    this.target = target

    this.width = 40
    this.height = 40

    this.draw = function()
    {
        noStroke()
        let color
        if (this.wall)
        {
            color = 'black'
        }
        else
        {
            if (this.start)
            {
                color = 'red'
            }
            else if (this.target)
            {
                color = 'blue'
            }
            else
            {
                color = 'green'
            }
        }
        fill(color)
        rect(this.X, this.Y, this.width, this.height)
    }

}