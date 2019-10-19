/**
* DEFINITIONS
*/

// sound controller container
let soundOn = false;

// soundtrack p5.SoundFile container
let soundtrack;

// webcam stream container
let webcam;

// webcam controller container
let webcamOn = false;

// perlin noise terrain container
let terrain;

// mouse click actions
const clickActions = [
    {
        position: 1,
        callback: toggleSound,
    },
    {
        position: 2,
        callback: toggleWebcam
    }
];

/**
 * I draw this sketch sound indicator.
 *
 * Args:
 *  indicator (object): indicator image
 *  toggled (boolean): indicator toggle status
 *  position (number): position in the indicators stack (1 is lowest)
 *
 * Returns:
 *  undefined.
 */
function drawIndicator(indicator, toggled, position)
{
    // push transformation matrix
    push();

    // translate to indicators stack
    translate((WIDTH / 2) - 50, (HEIGHT / 2) - position * 50);

    // set indicator transparency
    toggled ? tint(255, 255) : tint(255, 100);

    // draw image
    image(indicator, 0, 0, 50, 50);

    // pop transformation matrix
    pop();
}

/**
 * Draw webcam input on sketch.
 *
 * Args:
 *  position (number): position on indicators stack
 *
 * Returns:
 *  undefined.
 */
function drawWebcamInput(position)
{
    // webcam is activated: draw input
    if(webcamOn)
    {
        // push transformation matrix
        push();

        // translate to indicators stack
        translate((WIDTH / 2) - 50, (HEIGHT / 2) - position * 50);

        // apply transparency
        tint(200, 100);

        // draw webcam input
        image(webcam, 0, 0, 50, 50);

        // pop transformation matrix
        pop();
    }
}

/**
 * I update the webcam functioning status.
 *
 * Returns:
 *  undefined.
 */
function updateWebcamStatus()
{
    webcamOn = webcam.loadedmetadata;
}

/**Sound
* p5.js preload callback.
*
* Returns:
*   undefined;
*/
function preload()
{
    // load soundtrack song
    soundtrack = loadSound('assets/audio/da_beat-nr1.mp3');

    // load keyboard image
    keyboard = loadImage('assets/images/keyboard.png');

    // load film row image
    filmreel = loadImage('assets/images/filmreel.png')

    // create webcam capture
    webcam = createCapture(VIDEO);
    webcam.hide();
}

/**
 * I handle a sound toggle action.
 *
 * Returns:
 *  undefined.
 */
function toggleSound()
{
    // update sketch sound state
    soundOn = !soundOn;

    // update soundtrack state
    soundOn ? soundtrack.loop() : soundtrack.stop();
}

/**
 * I handle a webcam toggle action.
 *
 * Returns:
 *  undefined.
 */
function toggleWebcam()
{
    // webcam is enabled: pause it and set state as disabled
    if(webcamOn)
    {
        // pause webcam stream
        webcam.pause();

        // set state as disabled
        webcam.loadedmetadata = false;
    }

    // webcam is disabled: recreate capture
    else
    {
        // create webcam capture
        webcam = createCapture(VIDEO);
        webcam.hide();
    }
}

/**
 * p5.js mouse clicked callback.
 *
 * Returns:
 *  undefined.
 */
function mouseClicked()
{
    // for each registed click action
    for(action of clickActions)

        // icon was clicked: dispatch callback
        if(mouseX > WIDTH - 50  && mouseX < WIDTH && mouseY > HEIGHT - action.position * 50 && mouseY < HEIGHT - (action.position - 1) * 50)
        {
            action.callback();
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

    // update webcam status
    updateWebcamStatus();

    // draw soundtrack indicator
    drawIndicator(keyboard, soundOn, 1);

    // draw webcam indicator
    drawIndicator(filmreel, webcamOn, 2);

    // draw webcam input
    drawWebcamInput(3);
}
