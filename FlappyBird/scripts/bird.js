function Bird(color, floor_height) {

    this.X0 = 50
    this.Y0 = (height - floor_height)/2 - 12

    this.X = this.X0
    this.Y = this.Y0

    this.color = color

    this.current_sprite = 0
    this.animation_timer = 0
    this.sprites_images = []
    this.sprites = [
        this.color + 'bird-downflap.png',
        this.color + 'bird-midflap.png',
        this.color + 'bird-upflap.png',
    ]

    this.gravity = 0.2   
    this.upVelocity = 0
    this.flyForce = 10

    this.setup = function() 
    {
        this.sprites.forEach(sprite => this.sprites_images.push(loadImage('assets/images/' + sprite)))
    }

    this.show = function()
    {
        image(this.sprites_images[this.current_sprite], this.X, this.Y)
        if (++this.animation_timer > 7)
        {
            this.animation_timer = 0
            if (++this.current_sprite > 2) 
            {
                this.current_sprite = 0
            }
        }
    }

    this.update = function()
    {
        this.upVelocity += this.gravity
        if (this.upVelocity < -6) 
        {
            this.upVelocity *= 0.8
        }
        this.Y += this.upVelocity
        

        if (this.Y > height - floor_height - this.sprites_images[this.current_sprite].height) {
            this.Y = this.Y0
            this.upVelocity = 0
            this.start = false
        }
        
        if (this.Y < 0) {
            this.Y = 0   
            this.upVelocity = 0
        }
    }

    this.fly = function()
    {
        this.upVelocity -= this.flyForce
    }

}