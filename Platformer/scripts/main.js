let map
let map_path = 'maps/1.json'

let tile_width = 80
let tile_height = 80

let blocks = []

function setup()
{

    fetch(map_path)
        .then(response => response.text())
        .then(text => {
            map = JSON.parse(text)
            createCanvas(800, 800)
            drawMap()
        })
}   

function draw()
{

    background(0)

    for (b of blocks)
    {
        b.draw()
        b.update()
    }

}

function drawMap()
{
    for (let i = 0; i < map.data.length; i++)
    {
        for (let j = 0; j < map.data[i].length; j++)
        {
            switch (map.data[i][j])
            {
                case 0:
                    break;
                case 1:
                    blocks.push(new Block(tile_width, tile_height, j * tile_width, i * tile_height))
            }
        } 
    }   
}

function keyPressed()
{
    switch (key)
    {
        case 'ArrowUp':
            break
        case 'ArrowDown':
            break
        case 'ArrowLeft': 

            break
        case 'ArrowRight':
            break
    }
}