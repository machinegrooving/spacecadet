/**
* CONSTANTS AND DEFINITIONS
*/
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
  // create dummy canvas
  createCanvas(1, 1);

  // play soundtrack in a loop
  soundtrack.loop();
}

/**
 * p5.js drawing callback.
 *
 * Returns:
 *  undefined.
 */
function draw()
{

}
