class Segment
{

    constructor(horizontal, x, y, color)
    {
        this.horizontal = horizontal

        this.x = x
        this.y = y

        this.color = color
    }

    show()
    {
        noStroke()
        fill(this.color)    

        let width, height
        let t
        if (this.horizontal)
        {
            width = SEGMENT_HORIZONTAL_LENGHT
            height = SEGMENT_ANCHOR

            t = [
                this.x, this.y,
                this.x, this.y + height,
                this.x - TRIANGLE_LENGHT, this.y + height/2,
                this.x + width, this.y,
                this.x + width, this.y + height,
                this.x + width + TRIANGLE_LENGHT, this.y + height/2
            ]

        }
        else
        {
            width = SEGMENT_ANCHOR
            height =  SEGMENT_VERTICAL_LENGHT

            t = [
                this.x, this.y,
                this.x + width, this.y,
                this.x + width/2, this.y - TRIANGLE_LENGHT,
                this.x, this.y + height,
                this.x + width, this.y + height,
                this.x + width/2, this.y + height + TRIANGLE_LENGHT
            ]
        }

        triangle(t[0], t[1], t[2], t[3], t[4], t[5])
        triangle(t[6], t[7], t[8], t[9], t[10], t[11])
        rect(this.x, this.y, width, height)
    }

}