/**
 * Perlin noise generated terrain abstraction.
 */

class Terrain
{
    /**
     * I initialize myself.
     *
     * Args:
     *  width (number): terrain width
     *  height (number): terrain height
     *  resolution (number): terrain resolution
     *
     * Returns:
     *  undefined.
     */
    constructor(width, height, resolution)
    {
        // store components
        this.terrain = [];
        this.seed = 0;

        // store parameters
        this.width = width;
        this.height = height;
        this.resolution = resolution;
    }

    /**
     * I return my number of rows.
     *
     * Returns:
     *  _ (number): number of rows
     */
    get rows()
    {
        return this.height / this.resolution;
    }

    /**
     * I return my number of columns.
     *
     * Returns:
     *  _ (number): number of columns
     */
    get columns()
    {
        return this.width / this.resolution;
    }

    /**
     * I load my initial state.
     *
     * Returns:
     *  undefined.
     */
    setup()
    {
        this.setupNoise();
    }

    /**
     * I load my initial perlin noise space state.
     *
     * Returns:
     *  undefined.
     */
    setupNoise()
    {
        // setup terrain
        for(let row = 0; row < this.rows * 3; row++)
        {
            this.terrain.push(Array(this.columns).fill(0));
        }
    }

    /**
     * I update the terrain state in one step.
     *
     * Args:
     *  step(Object): x and y dimensions space coordinates step size
     *
     * Returns:
     *  undefined.
     */
    update(step)
    {
        // initialize perlin noise space current coordinates
        let coordinates = {x: 0, y: 0};

        // update terrain
        coordinates.y = this.seed;
        for(let row = 0; row < this.rows; row++)
        {
            coordinates.x = 0;
            for(let column = 0; column < this.columns; column++)
            {
                this.terrain[column][row] = map(noise(coordinates.x, coordinates.y), 0, 1, -100, 100);
                coordinates.x += step.x;
            }
            coordinates.y += step.y;
        }

        // update seed
        this.seed -= step.speed;
    }

    /**
     * I render this terrain state.
     *
     * Returns:
     *  undefined.
     */
    render()
    {
        // push transformation matrix
        push();

        // rotate 60 degrees
        rotateX(PI / 3);

        // adjust sketch centering
        translate(-this.width / 2, -this.height / 2);

        // set mesh color
        strokeWeight(0);
        fill(...TERRAIN_COLOR);

        // draw terrain
        for(let row = 0; row < this.rows - 1; row++)
        {
            // start drawing triangles strip
            beginShape(TRIANGLE_STRIP);

            // add vertices
            for(let column = 0; column < this.columns; column++)
            {
                vertex(column * this.resolution, row * this.resolution, this.terrain[column][row]);
                vertex(column * this.resolution, (row + 1) * this.resolution, this.terrain[column][row + 1]);
            }

            // stop drawing triangles strip
            endShape();
        }

        // pop transformation matrix
        pop();
    }
}