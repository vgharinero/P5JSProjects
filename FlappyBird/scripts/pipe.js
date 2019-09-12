function Pipe(speed_multiplier, pipe_image, pipe_image_rotated) {

    this.pipe_image = pipe_image
    this.pipe_image_rotated = pipe_image_rotated

    this.Y1 = 0
    this.Y2 = 0

    this.X = width
    this.speed = 2 * speed_multiplier

    this.already_inside = false

    do 
    {
        this.Y1 = random(-275, 0)
        this.Y2 = random(this.Y1 + 360, height - 150)
    } 
    while (this.Y2 - this.Y1 > 550 || this.Y2 - this.Y1 < 450)

    this.show = function() 
    {
        image(this.pipe_image, this.X, this.Y2)
        image(this.pipe_image_rotated, this.X, this.Y1)
    }
    
    this.update = function()
    {
        this.X -= this.speed
    }

    this.hit = function(player)
    {
        if ((player.X + player.sprites_images[player.current_sprite].width) >= this.X && (this.X + this.pipe_image.width) >= player.X)
        {
            if(player.Y <= (this.Y1 + this.pipe_image.height) || (player.Y + player.sprites_images[player.current_sprite].height) >= this.Y2)
            {
                return true
            }
        }
        return false
    }

    this.inside = function(player)
    {
        if (player.X >= (this.X + this.pipe_image.width) && !this.already_inside)
        {
            this.already_inside = true
            return true
        }
        return false
    }


}