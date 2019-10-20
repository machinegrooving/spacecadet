/**
* DEFINITIONS
*/

// sound controller container
let soundOn = false;

// Fast Fourier Transform container
let fft;

// soundtrack p5.SoundFile container
let soundtrack;

// perlin noise terrain container
let terrain;

// audio pan (left/right)
let pan = 0;

// moving to the right or to the left
let pan_direction = 1;

// mouse click actions
const clickActions = [
    {
        position: 1,
        callback: toggleSound,
    }
];

/**
 * I draw a sketch indicator.
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
    soundOn ? soundtrack.loop() : soundtrack.pause();
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

    // setup amplitude helper in smooth mode
    amplitude = new p5.Amplitude();
    amplitude.smooth(SMOOTH_SCALE);

    // setup Fast Fourier Transform with 16 frequency bands
    fft = new p5.FFT(0.4, 16);

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

    const stepParams = {x: 0.2, y: 0.2, speed: 0.18}

    // soundtrack is playing: change animation
    if(soundOn)
    {
        // vary terrain speed based on sound amplitude
        stepParams.speed = map(amplitude.getLevel(), 0, 1, AUDIO_TO_SPEED.min, AUDIO_TO_SPEED.max);

        // change the sound pan
        alterPan();

        // get sound amplitude values of frequency spectrum
        let spectrum = fft.analyze();

        // change colors based on analyzed spectrum
        BACKGROUND_COLOR[0] = (spectrum[0] + spectrum[1]) / 2;
        BACKGROUND_COLOR[1] = (spectrum[2] + spectrum[3]) / 2;
        BACKGROUND_COLOR[2] = (spectrum[4] + spectrum[5]) / 2;
        TERRAIN_COLOR[0] = (spectrum[6] + spectrum[7] + spectrum[8]) / 5;
        TERRAIN_COLOR[1] = (spectrum[9] + spectrum[10] + spectrum[11]) / 4;
        TERRAIN_COLOR[2] = (spectrum[12] + spectrum[13] + spectrum[14]) / 4;
        TERRAIN_COLOR[3] = Math.max(spectrum[15], 80);
    }

    // update terrain
    terrain.update(stepParams);

    // draw terrain
    terrain.render();

    // draw soundtrack indicator
    drawIndicator(keyboard, soundOn, 1);
}

/**
 * I change the audio pan over time.
 *
 * Returns:
 *  undefined.
 */
function alterPan()
{
    // make target slightly above threshold to avoid getting stuck on extremes
    let target = (PAN_THRESHOLD * 1.5) * pan_direction

    /// interpolate previous pan value in direction of the threshold on amplitude
    pan = lerp(pan, target, amplitude.getLevel() * PAN_STEP_FACTOR);

    // pan value is above threshold: change pan direction
    if(pan * pan_direction >= PAN_THRESHOLD)
    {
        // invert pan direction
        pan_direction = pan_direction * -1;
    }

    // assign new pan value to soundtrack
    soundtrack.pan(pan);
}
