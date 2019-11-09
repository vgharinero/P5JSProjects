let ground, player, platforms
let down, collideY
let g = 0.015

function setupObjects() {
    ground = {
        x: 0,
        y: height - 100,
        width: width,
        height: 100,
        color: 'green'
    }
    player = {
        x: 0,
        y: 100,
        width: 10,
        height: 25,
        ySpeed: 0,
        jumping: false,
        color: 'red'
    }
    platforms = [
        {
            x: 110,
            y: height - 200,
            width: 75,
            height: 25,
            color: 'green'
        },
        {
            x: 260,
            y: height - 260,
            width: 200,
            height: 10,
            color: 'green'
        }, {
            x: 70,
            y: height - 310,
            width: 75,
            height: 25,
            color: 'green'
        }
    ]
}

function setup() {
    createCanvas(400, 400)
    setupObjects()
}

function collide(a, b) {
    if (a.y + a.height >= b.y && a.y + a.height <= b.y + b.height) {
        if (a.x + a.width >= b.x && a.x <= b.x + b.width) {
            if (down) {
                collideY = b.y
                return true
            }
        }
    }
    return false
}

function collideWithSomething() {
    let collide_ = false
    platforms.forEach(p => {
        if (collide(player, p)) {
            collide_ = true
            return
        }
    })
    if (collide(player, ground)) {
        collide_ = true
    }
    return collide_
}

function draw() {
    background(0)
    noStroke()
    // draw ground
    fill(ground.color)
    rect(ground.x, ground.y, ground.width, ground.height)
    // draw platforms
    platforms.forEach(p => {
        fill(p.color)
        rect(p.x, p.y, p.width, p.height)
    })
    // draw player
    fill(player.color)
    rect(player.x, player.y, player.width, player.height)
    // horizontal movement
    if (keyIsDown(LEFT_ARROW)) {
        player.x -= 5;
        if (player.x < 0)
            player.x = 0
    }
    else if (keyIsDown(RIGHT_ARROW)) {
        player.x += 5
        if (player.x + player.width > width)
            player.x = width - player.width
    }
    gravity()
}

function gravity() {
    down = g * (deltaTime ** 2) > player.ySpeed
    player.y += g * (deltaTime ** 2) - player.ySpeed
    player.ySpeed -= g * deltaTime
    if (collideWithSomething()) {
        player.jumping = false
        player.ySpeed = 0
        player.y = collideY - player.height
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW && !player.jumping) {
        player.jumping = true
        player.ySpeed += 11.5
    }
}