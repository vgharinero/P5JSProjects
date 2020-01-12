class Player {

    constructor(sprite, type, x, y, hp, name) {
        this.name = name

        this.level = 5
        this.experience = 0

        this.sprite = sprite
        this.img = ''

        this.type = type

        this.speed = PLAYER_SPEED

        this.x = x
        this.y = y

        this.maxHP = hp
        this.hp = hp

        this.hitEffect = ''
        this.levelUpEffect = ''
    }

    setHPBar()
    {
        this.hpBar = createImg('sprites/HPBar.png', 'battleBox_player')
        this.hpBar.size(116.77, 11.85)
    }

}
