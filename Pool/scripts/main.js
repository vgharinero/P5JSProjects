let holes = [
    {
        X: 90,
        Y: 90
    },
    {
        X: 600,
        Y: 90
    },
    {
        X: 1110,
        Y: 90
    },
    {
        X: 90,
        Y: 710
    },
    {
        X: 600,
        Y: 710
    },
    {
        X: 1110,
        Y: 710
    }
]

let whiteBall = {
    X: 400,
    Y: 400,
    velX: 0,
    velY: 0,
    forceX: 0,
    forceY: 0
}

let shooting = false

let mouseStart = {
    X: 0,
    Y: 0
}

let mouseEnd = {
    X: 0,
    Y: 0
}

function setup()
{

    createCanvas(1200, 800)
}   

function draw()
{

    background(0)

    noStroke()
    drawPoolTable()

    drawHoles()

    if (shooting)
        drawStick()

    noStroke()
    drawWhiteBall()

}

function drawPoolTable() 
{

    fill(75, 33, 10)
    rect(50, 50, width - 100, height - 100, 20)


    fill(54, 116, 21)
    rect(85, 85, width - 170, height - 170, 20)

}

function drawHoles() 
{

    holes.forEach(hole => {
        fill(0)
        circle(hole.X, hole.Y, 60)
    })

}

function drawStick() 
{
    strokeWeight(10)
    stroke(75, 33, 10)
    line(mouseX, mouseY, whiteBall.X, whiteBall.Y)

}

function drawWhiteBall() 
{

    fill(255)

    whiteBall.X += whiteBall.velX
    whiteBall.Y += whiteBall.velY

    if (whiteBall.X - 20 < 95 || whiteBall.X + 20 > 1105) {
        whiteBall.velX *= -1
    }
    if (whiteBall.Y - 20 < 95 || whiteBall.Y + 20 > 705) {
        whiteBall.velY *= -1
    }

    circle(whiteBall.X, whiteBall.Y, 40)

    if (whiteBall.velX > 0)
    {
        if (whiteBall.velX - 1 > 0)
        {
            whiteBall.velX -= whiteBall.forceX
        }
        else 
        {
            whiteBall.velX = 0
            whiteBall.forceX = 0
        }
    }
    else
    {
        if (whiteBall.velX + 1 < 0)
        {
            whiteBall.velX += whiteBall.forceX
        }
        else 
        {
            whiteBall.velX = 0
            whiteBall.forceX = 0
        }
    }

    if (whiteBall.velY > 0)
    {
        if (whiteBall.velY - 1 > 0)
        {
            whiteBall.velY -= whiteBall.forceY
        }
        else 
        {
            whiteBall.velY = 0
            whiteBall.forceY = 0
        }
    }
    else
    {
        if (whiteBall.velY + 1 < 0)
        {
            whiteBall.velY += whiteBall.forceY
        }
        else 
        {
            whiteBall.velY = 0
            whiteBall.forceY = 0
        }
    }

}

function touchStarted(event) {

    mouseStart.X = event.screenX
    mouseStart.Y = event.screenY

    shooting = true

}

function touchEnded(event) {

    shooting = false

    mouseEnd.X = event.screenX
    mouseEnd.Y = event.screenY

    whiteBall.velX = (mouseStart.X - mouseEnd.X)/10
    whiteBall.velY = (mouseStart.Y - mouseEnd.Y)/10

    whiteBall.forceX = abs(whiteBall.velX/30)
    whiteBall.forceY = abs(whiteBall.velY/30)

}
