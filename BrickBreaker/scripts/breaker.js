function Breaker()
{

    this.width = 200
    this.height = 40

    this.X = (width - this.width)/2
    this.Y = height - this.height * 2

    this.show = function()
    {
        rect(this.X, this.Y, this.width, this.height)
    }
    
}