/**
* DEFINITIONS
*/

// sound controller container
let soundOn = false;

// perlin noise terrain container
let terrain;

// soundtrack p5.SoundFile container
let soundtrack;

/**
 * I draw this sketch sound indicator.
 * 
 * Returns:
 *  undefined.
 */
function drawSoundIndicator()
{
    // push transformation matrix
    push();

    // translate to bottom right corner
    translate((WIDTH / 2) - 50, (HEIGHT / 2) - 50);

    // set indicator transparency
    soundOn ? tint(255, 100) : tint(255, 255);

    // draw image
    image(keyboard, 0, 0, 50, 50);

    // pop transformation matrix
    pop();
}

/**
* p5.js preload callback.
*
* Returns:
*   undefined;
*/
function preload()
{
    // load soundtrack song
    soundtrack = loadSound('assets/audio/da_beat-nr1.mp3');

    // load keyboard on image
    keyboard = loadImage('assets/images/keyboard.png');
}

/**
 * p5.js mouse clicked callback.
 *
 * Returns:
 *  undefined.
 */
function mouseClicked()
{
    // soundtrack icon was clicked: update soundtrack state
    if(mouseX > WIDTH - 50  && mouseX < WIDTH && mouseY > HEIGHT - 50 && mouseY < HEIGHT)
    {
        soundOn = !soundOn;
        soundOn ? soundtrack.loop() : soundtrack.stop();
    }
}

/**
 * p5.js setup.
 *
 * Returns:
 *  undefined.
 */
function setup()
{
    // set sketch frame rate
    frameRate(FRAME_RATE);

    // create canvas and set renderer as WEBGL
    createCanvas(WIDTH, HEIGHT, WEBGL);

    // setup terrain
    terrain = new Terrain(WIDTH + WIDTH_OFFSET, HEIGHT + HEIGHT, RESOLUTION);
    terrain.setup();
}

/**
 * p5.js drawing callback.
 *
 * Returns:
 *  undefined.
 */
function draw()
{
    // set background color
    background(...BACKGROUND_COLOR);

    // update terrain
    terrain.update({x: 0.2, y: 0.2, speed: 0.18});

    // draw terrain
    terrain.render();

    // draw soundtrack indicator
    drawSoundIndicator();
}