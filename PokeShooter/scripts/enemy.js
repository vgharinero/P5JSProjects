class Enemy {

    constructor(index, x, y) {
        this.name = ENEMIES_INFO[index].name

        this.img = createImg('sprites/enemy' + index + '.gif', 'enemy')

        this.type = ENEMIES_INFO[index].type

        this.speed = ENEMY_SPEED

        this.x = x
        this.y = y
        
        locateImage(this.img, this.x, this.y)

        this.attack = ENEMIES_INFO[index].attack

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

const ENEMIES_INFO = [
    {
        name: 'Caterpie',
        type: Type.BUG,
        attack: 5,
        evolution: 0
    },
    {
        name: 'Metapod',
        type: Type.BUG,
        attack: 10,
        evolution: 1
    },
    {
        name: 'Butterfree',
        type: Type.BUG,
        attack: 15,
        evolution: 2
    }
]
