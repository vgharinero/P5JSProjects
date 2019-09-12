// VARIABLES
const width = 288 
const height = 512

const floor_height = 112

let bg_image, floor_image, start_image, pipe_image, pipe_image_rotated

const player_color = 'yellow'
let player

const pipe_color = 'green'
let pipes_ratio = 100
let pipes = []

let score = 0
let score_images = []

let difficulty_factor = 1.001

// SET UP FUNCTION
function setup() 
{

    //CANVAS
    createCanvas(width, height)

    // BACKGROUND IMAGE's
    let now = new Date().getHours()
    if (now > 6 && now < 20)
    {
        bg_image = loadImage('assets/images/background-day.png')
    }
    else
    {
        bg_image = loadImage('assets/images/background-night.png')
    }

    // FLOOR
    floor_image = loadImage('assets/images/base.png')

    // START SCREEN
    start_image = loadImage('assets/images/message.png')

    // BIRD
    player = new Bird(player_color, floor_height)
    player.setup()

    // PIPES
    pipe_image = loadImage('assets/images/pipe-' + pipe_color + '.png')
    pipe_image_rotated = loadImage('assets/images/pipe-' + pipe_color + '-rotated.png')

    // SCORE
    for (let i = 0; i < 10; i++)
    {
        score_images[i] = loadImage('assets/images/' + i + '.png')
    }
}

// DRAW FUNCTION
function draw() 
{

    // DRAW BACKGROUND
    background(bg_image)

    // PLAYER
    if(player.start)
    {
        player.update()
        player.show()
    }
    
    // PIPES
    if (frameCount % pipes_ratio == 0 && player.start)
    {
        pipes.push(new Pipe(difficulty_factor, pipe_image, pipe_image_rotated))
        pipes.forEach((pipe, index) => 
            {
                if (pipe.X < -(pipe_image.width * 2))
                {
                    pipes.splice(index, 1)
                }   
            }
        )
    }
    pipes.forEach(pipe => 
        {
            console.log(pipe.speed)
            pipe.show()
            pipe.update()          
            if (pipe.hit(player))
            {
                player.start = false
            }
            if (pipe.inside(player))
            {
                score += 1
                difficulty_factor += 0.01
            } 
        }
    )
    
    // SCORE
    drawScore()

    // FLOOR
    image(floor_image, 0, height - floor_height)

    // START IMAGE
    if (!player.start)
    {
        image(start_image, 0, 0)
        score = 0
        pipes = []
    }

}

// SCORE
function drawScore()
{
    if (score > 999)
    {
        player.start = false
    }
    else if (score > 99)
    {
        let first_digit = Number(String(score).charAt(0))
        let second_digit = Number(String(score).charAt(1))
        let third_digit = Number(String(score).charAt(2))
        image(score_images[first_digit], (width - score_images[first_digit].width * 3)/2, 50)
        image(score_images[second_digit], (width - score_images[second_digit].width)/2, 50)
        image(score_images[third_digit], (width + score_images[third_digit].width)/2, 50)
    }
    else if (score > 9)
    {
        let first_digit = Number(String(score).charAt(0))
        let second_digit = Number(String(score).charAt(1))
        image(score_images[first_digit], (width - score_images[first_digit].width * 2)/2, 50)
        image(score_images[second_digit], width/2, 50)
    }
    else
    {
        image(score_images[score], (width - score_images[score].width)/2, 50)
    }
}

// USER CONTROL
function keyPressed() 
{
    if (key == ' ')
    {
        if (player.start)
        {
            player.fly()
        }
    }
    if (keyCode == ENTER)
    {
        player.start = true
    }
}