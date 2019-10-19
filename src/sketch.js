/**
* DEFINITIONS
*/

// perlin noise terrain container
let terrain;

// soundtrack p5.SoundFile container
let soundtrack;

/**
* p5.js preload callback.
*
* Returns:
*   undefined;
*/
function preload() {
  // load soundtrack song
  soundtrack = loadSound('assets/audio/da_beat-nr1.mp3');
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

    // play soundtrack in a loop
    soundtrack.loop();

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
}