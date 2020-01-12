const SEGMENT_ANCHOR = 20
const SEGMENT_HORIZONTAL_LENGHT = 60
const SEGMENT_VERTICAL_LENGHT = 90
const TRIANGLE_LENGHT = 10.2
const HOR_PADDING = 4
const VERT_PADDING = 2

const GRAY = [25]
const RED = [255, 0, 0]

const DIGITS = [
    [RED, RED, RED, RED, RED, GRAY, RED],
    [GRAY, RED, GRAY, RED, GRAY, GRAY, GRAY],
    [GRAY, RED, RED, GRAY, RED, RED, RED],
    [GRAY, RED, GRAY, RED, RED, RED, RED],
    [RED, RED, GRAY, RED, GRAY, RED, GRAY],
    [RED, GRAY, GRAY, RED, RED, RED, RED],
    [RED, GRAY, RED, RED, RED, RED, RED],
    [GRAY, RED, GRAY, RED, RED, GRAY, GRAY],
    [RED, RED, RED, RED, RED, RED, RED],
    [RED, RED, GRAY, RED, RED, RED, RED],
]

let segments = []
let initX, initY

function setup() 
{
    createCanvas(500, 500)

    initX = (width - (SEGMENT_HORIZONTAL_LENGHT + SEGMENT_ANCHOR * 2 + HOR_PADDING * 2)) / 2
    initY = (height - (SEGMENT_VERTICAL_LENGHT * 2 + TRIANGLE_LENGHT * 2)) / 2

    setUpSegments()
    setUpUI()
}

function setUpUI()
{
    input = createInput();
    button = createButton('SHOW');

    input.position((innerWidth - input.width - button.width)/2, (innerHeight - height)/2 + height - input.height * 2);
    button.position(input.x + input.width, (innerHeight - height)/2 + height - input.height * 2);

    button.mousePressed(() => showNumber(input.value()))

    textAlign(CENTER);
    textSize(50);
}

function setUpSegments()
{
    segments.push(new Segment(false, initX, initY, GRAY))
    segments.push(new Segment(false, initX + SEGMENT_HORIZONTAL_LENGHT + SEGMENT_ANCHOR + HOR_PADDING * 2, initY, GRAY))
    segments.push(new Segment(false, initX, initY + SEGMENT_VERTICAL_LENGHT + TRIANGLE_LENGHT * 2, GRAY))
    segments.push(new Segment(false, initX + SEGMENT_HORIZONTAL_LENGHT + SEGMENT_ANCHOR + HOR_PADDING * 2, initY + SEGMENT_VERTICAL_LENGHT + TRIANGLE_LENGHT * 2, GRAY))

    segments.push(new Segment(true, initX + SEGMENT_ANCHOR + HOR_PADDING, initY - SEGMENT_ANCHOR - VERT_PADDING, GRAY))
    segments.push(new Segment(true, initX + SEGMENT_ANCHOR + HOR_PADDING, initY + SEGMENT_VERTICAL_LENGHT, GRAY))
    segments.push(new Segment(true, initX + SEGMENT_ANCHOR + HOR_PADDING, initY + SEGMENT_VERTICAL_LENGHT * 2 + SEGMENT_ANCHOR + VERT_PADDING, GRAY))
}

function showNumber(number)
{
    number = Number(number)
    if (isNaN(number) || number < 0 || number > 9)
    {
        console.log('Cannot display ' + number + '!')
        return
    }
    segments.forEach((segment, i) => 
    {
        segment.color = DIGITS[number][i]
    })
}

function draw() 
{
    background(0)
    segments.forEach(segment => segment.show())
}