const PADDING = 75

const FIRE_POINT = 10

const PLAYER_SPEED = 8
const ENEMY_SPEED = 3
const BULLET_SPEED = 10

const ENEMY_RATE = 100

const TYPE_TABLE = [
    // GRASS  -  WATER  -  FIRE  -  BUG
    [    0,        1,       0,       0], // GRASS
    [    0,        0,       1,       0], // WATER
    [    1,        0,       0,       1],  // FIRE
    [    1,        0,       0,       0]  // BUG
]

const SoundsSrc =
{
    PLAYER_HURT: 'sounds/player_hurt.wav',
    GRASS_ATTACK: 'sounds/grass_attack.wav',
    WATER_ATTACK: 'sounds/water_attack.wav',
    FIRE_ATTACK: 'sounds/fire_attack.wav',
    ENEMY_HURT: 'sounds/enemy_hurt.wav'
}

const Sounds = {}

const Type = 
{
    GRASS: 0,
    WATER: 1,
    FIRE: 2,
    BUG: 3
}

let playing = false

let players = []
let playerIndex = null

let enemies = []
let bullets = []

function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight)
}

function setup() 
{
    for (let key in SoundsSrc)
    {
        Sounds[key] = loadSound(SoundsSrc[key])
    }
    createCanvas(innerWidth, innerHeight)
}

function draw() 
{
    background(0)
    if (playing)
    {
        drawGame()
    }
}

function drawGame()
{
    input()

    if (players[playerIndex] && players[playerIndex].hp > 0)
    {
        fill(0, 255, 0)
        rect(players[playerIndex].x - 30, players[playerIndex].y - players[playerIndex].img.height/2 - 14, (players[playerIndex].hp / players[playerIndex].maxHP) * 80, 5)
        
        fill(255)
        textSize(11)
        text(players[playerIndex].name, players[playerIndex].x - 56, players[playerIndex].y - players[playerIndex].img.height/2 - 24)
        text("Lv." + players[playerIndex].level, players[playerIndex].x + 36 - (players[playerIndex].level.toString().length - 1) * 7, players[playerIndex].y - players[playerIndex].img.height/2 - 24)

        locateImage(players[playerIndex].img, players[playerIndex].x, players[playerIndex].y)
        locateImage(players[playerIndex].hpBar, players[playerIndex].x, players[playerIndex].y - players[playerIndex].img.height/2 - 12)
        if (players[playerIndex].hitEffect)
        {
            locateImage(players[playerIndex].hitEffect, players[playerIndex].x, players[playerIndex].y)
        }
        if (players[playerIndex].levelUpEffect)
        {
            locateImage(players[playerIndex].levelUpEffect, players[playerIndex].x, players[playerIndex].y)
        }
    }

    enemies.forEach((enemy, i) =>
    {
        locateImage(enemy.img, enemy.x, enemy.y)
        enemy.update()
        if (enemy.dead)
        {
            enemy.img.remove()
            enemies.splice(i, 1)
        }
        if (enemy.destroyed)
        {
            players[playerIndex].hp -= enemy.attack * (1 + 1 * (TYPE_TABLE[enemy.type][players[playerIndex].type]))

            document.body.classList.add('shaking')
            setTimeout(function() {
                document.body.classList.remove('shaking')
            }, 300)

            Sounds.PLAYER_HURT.play()
            players[playerIndex].hitEffect = createImg('sprites/playerHit.gif', 'hit')
            players[playerIndex].hitEffect.size(48, 48)
            locateImage(players[playerIndex].hitEffect, players[playerIndex].x, players[playerIndex].y)
            setTimeout(function() {
                players[playerIndex].hitEffect.remove()
            }, 400)

            enemy.img.remove()
            enemies.splice(i, 1)
        }
    })

    bullets.forEach((bullet, i) =>
    {
        locateImage(bullet.img, bullet.x, bullet.y)
        bullet.update()
        if (bullet.destroyed)
        {
            bullet.img.remove()
            bullets.splice(i, 1)
        }
        enemies.forEach((enemy, i) =>
        {
            if (bullet.collide(enemy))
            {
                Sounds.ENEMY_HURT.play()
                let hitEffect = createImg('sprites/hit' + players[playerIndex].type + '.gif', 'hit')
                locateImage(hitEffect, enemy.x, enemy.y)
                setTimeout(function() {
                    hitEffect.remove()
                }, 400)

                bullet.destroyed = true
                enemy.dead = true

                players[playerIndex].experience += 10
                let nextLevel = (4 * (players[playerIndex].level + 1) ** 3)/5

                if (players[playerIndex].experience > nextLevel) 
                {
                    players[playerIndex].levelUpEffect = createImg('sprites/levelUp.gif', 'hit')
                    players[playerIndex].levelUpEffect.size(48, 48)
                    locateImage(players[playerIndex].levelUpEffect, players[playerIndex].x, players[playerIndex].y)
                    setTimeout(function() {
                        players[playerIndex].levelUpEffect.remove()
                    }, 700)
                    players[playerIndex].level += 1
                }
            }
        })
    })

    if (frameCount % ENEMY_RATE == 0)
    {
        generateEnemy()
    }
}

function setUpGame()
{
    playerIndex = 0

    players.push(new Player('sprites/bulbasaur.gif', Type.GRASS, PADDING, height/2, 100, 'Bulbasur'))
    players.push(new Player('sprites/squirtle.gif', Type.WATER, PADDING, height/2, 150, 'Squirtle'))
    players.push(new Player('sprites/charmander.gif', Type.FIRE, PADDING, height/2, 125, 'Charmander'))

    players[playerIndex].img = createImg(players[playerIndex].sprite, 'player_sprite')
    players[playerIndex].setHPBar()

    document.getElementById('main_menu').style.visibility = 'hidden'
    playing = true
}

function changePlayer()
{
    let oldIndex = playerIndex
    players[playerIndex].img.remove()
    players[playerIndex].hpBar.remove()

    playerIndex += 1
    playerIndex %= 3

    players[playerIndex].img = createImg(players[playerIndex].sprite, 'player_sprite')
    players[playerIndex].setHPBar()

    players[playerIndex].x = players[oldIndex].x
    players[playerIndex].y = players[oldIndex].y
}

function shoot()
{
    Sounds[Object.keys(Type)[players[playerIndex].type] + '_ATTACK'].play()
    bullets.push(new Bullet(players[playerIndex].type, players[playerIndex].x + FIRE_POINT, players[playerIndex].y))
}

function generateEnemy()
{
    enemies.push(new Enemy(floor(random() * 3), width + PADDING, random(PADDING, height - PADDING)))
}

function locateImage(image, x, y) 
{
    image.position((window.innerWidth - width) / 2 + (x - image.width / 2), (window.innerHeight - height) / 2 + (y - image.height / 2))
}

function keyPressed()
{
    switch(key)
    {
        case 'x':
        case 'X':
            changePlayer()
            break;
        case ' ':
            shoot()
            break
    }
}

function input() 
{
    if (keyIsDown(UP_ARROW) && players[playerIndex].y > PADDING)
    {
        players[playerIndex].y -= players[playerIndex].speed
    }
    else if (keyIsDown(DOWN_ARROW) && players[playerIndex].y < height - PADDING)
    {
        players[playerIndex].y += players[playerIndex].speed
    }
}