class Bullet {

    constructor(type, x, y) 
    {
        this.img = createImg('sprites/' + type + '.gif', 'bullet')

        this.type = type

        this.x = x
        this.y = y
        
        locateImage(this.img, this.x, this.y)

        this.destroyed = false
    }

    collide(enemy)
    {
        let realX = this.x + this.img.width/2
        let realX_ = enemy.x - enemy.img.width/2

        return realX > realX_ + 30 && this.y > enemy.y - enemy.img.height/2 && this.y < enemy.y + enemy.img.height/2 && TYPE_TABLE[this.type][enemy.type] == 1
    }

    update()
    {
        if (this.x < width + PADDING) {
            this.x += BULLET_SPEED
        }
        else
        {
            this.destroyed = true    
        }
    }

}
