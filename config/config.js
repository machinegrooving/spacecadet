/**
* CONSTANTS
*/

// sketch frame rate
const FRAME_RATE = 30;

// audio amplitude smooth factor
const SMOOTH_SCALE = 0.4;

// audio to speed mapping
const AUDIO_TO_SPEED = {min: 0.12, max: 6.6};

// how much to vary pan at each update
const PAN_STEP_FACTOR = 0.8;

// how far from the center the sound should reach
const PAN_THRESHOLD = 0.8;

// sketch size values
const HEIGHT = 400;
const WIDTH = 1000;

// terrain parameters
const RESOLUTION = 20;
const WIDTH_OFFSET = 800;
const HEIGHT_OFFSET = 200;

// colors
const BACKGROUND_COLOR = [118, 168, 218];
const TERRAIN_COLOR = [239, 84, 100, 80];