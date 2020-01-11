const PADDING = 75

const FIRE_POINT = 10

const PLAYER_SPEED = 8
const ENEMY_SPEED = 3
const BULLET_SPEED = 10

const ENEMY_RATE = 20

const TYPE_TABLE = [
    // GRASS  -  WATER  -  FIRE  -  BUG
    [    0,        1,       0,       0], // GRASS
    [    0,        0,       1,       0], // WATER
    [    1,        0,       0,       1]  // FIRE
]

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
            players[playerIndex].hp -= enemy.attack
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
                bullet.destroyed = true
                enemy.dead = true
                players[playerIndex].experience += 10
                let nextLevel = (4 * (players[playerIndex].level + 1) ** 3)/5
                if (players[playerIndex].experience > nextLevel) 
                {
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
    bullets.push(new Bullet(players[playerIndex].type, players[playerIndex].x + FIRE_POINT, players[playerIndex].y))
}

function generateEnemy()
{
    enemies.push(new Enemy(0, Type.BUG, width + PADDING, random(PADDING, height - PADDING)))
}

function locateImage(image, x, y) 
{
    image.position((window.innerWidth - width) / 2 + (x - image.width / 2), (window.innerHeight - height) / 2 + (y - image.height / 2))
}

function mouseClicked()
{

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