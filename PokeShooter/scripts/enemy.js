class Enemy {

    constructor(index, type, x, y) {
        this.img = createImg('sprites/enemy' + index + '.gif', 'enemy')

        this.type = type

        this.speed = ENEMY_SPEED

        this.x = x
        this.y = y
        
        locateImage(this.img, this.x, this.y)

        this.attack = ENEMIES_ATTACK[index]

        this.dead = false
        this.destroyed = false
    }

    update()
    {
        if (this.x > -PADDING) {
            this.x -= ENEMY_SPEED
        }
        else
        {
            this.destroyed = true    
        }
    }

}

const ENEMIES_ATTACK = [
    15 // BUTTERFREE
]
