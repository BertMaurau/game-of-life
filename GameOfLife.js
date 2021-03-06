//--------------------------------------------------------------------------------------------------------------------------
// HOW THIS WORKS
//--------------------------------------------------------------------------------------------------------------------------
//
// The code exists in 3 Main parts
//      - The Cell object
//      - The Game object
//      - The Grid object
//
// The Cell thingy contains everything that defines itself (alive status, touch handler, element creation, ..
//
// The Game thingy just sets the given options, starts the game, BUT has two important functions
//  - Step: This iterates all the cells and calculates the next life cycle (using the getAliveNeighbours function)
//  - getAliveNeighbours: checks the 'current cell's' neighburs in a 3-by-3 to define it's next lifecycle
//
// The Grid thingy just generates the grid and contains the Cells. It also has the function to randomize the cells state
//
// The code should be self-explanatory. I tried to make it like that at least.
// For further questions, feedback, remarks, .. Feel free to contact me
//--------------------------------------------------------------------------------------------------------------------------
// Author
//--------------------------------------------------------------------------------------------------------------------------
//
//  Bert Maurau
//
//      hello@bertmaurau.be
//      https://bertmaurau.be
//
//--------------------------------------------------------------------------------------------------------------------------


// THe individual cell object
var Cell = function(x, y, size) {

    this.size = size + 'px';
    this.location = {
        cor_x: x,
        cor_y: y
    }

    // My current status
    this.alive = false;

    // Make me live
    this.live = function() {
        this.alive = true;
        this.element.className = 'cell cell-alive';
    };

    // Kill me pls
    this.die = function() {
        this.alive = false;
        this.element.className = 'cell cell-dead';
    }

    this.element;

    // Allow for child selection or whatever you call that (within the onclick handler)
    var parent = this;

    // Let me get touched by my neighbour or the user
    // This part could be a written a bit better probably
    this.touch = function() {

        // Switch the class
        let newClass = (this.alive) ? 'cell cell-dead' : 'cell cell-alive';

        // Switch it's state
        this.alive = !this.alive;

        this.element.className = newClass;

    }

    // The element of the cell
    // This will return a div element with the unique location ID and
    // a classname depending on the state
    // ex. <div id="cell_3_8" class="cell cell-alive"></div>
    this.getElement = function() {

        this.element = document.createElement("div");
        this.element.id = "cell_" + this.location.cor_x + "_" + this.location.cor_y;
        this.element.className = (this.alive) ? 'cell cell-alive' : 'cell cell-dead';
        this.element.style.cssText = 'display:inline-block;width:' + this.size + ';height:' + this.size + ';';
        this.element.onclick = function() { parent.touch() };

        return this.element;
    }

};

var GameOfLife = function(inputParams = {}) {

    var options = {
        rows: (inputParams.rows === undefined) ? 30 : inputParams.rows,
        columns: (inputParams.columns === undefined) ? 50 : inputParams.columns,
        gridContainer: (inputParams.gridContainer === undefined) ? 'canvas' : inputParams.gridContainer,
        cellSize: (inputParams.cellSize === undefined) ? 10 : inputParams.cellSize,
        startRandomized: (inputParams.startRandomized === undefined) ? false : inputParams.startRandomized,
        interval: (inputParams.interval === undefined) ? 100 : inputParams.interval
    };

    var stepCounter = 0;
    var stepCounterElement = document.getElementById('stepCounter');

    // Keep track of the running interval
    var currentlyInGame = false;

    // Define a Grid
    var grid = new Grid(options.rows, options.columns, options.gridContainer, options.cellSize);

    // Draw the grid
    grid.generate();

    if (options.startRandomized) {
        this.randomize();
    }

    this.start = function() {

        if (currentlyInGame) {
            console.log('Interval already running..');
        } else {

            currentlyInGame = true;

            this.timer = setInterval(this.step, options.interval);

        }

    }

    this.stop = function() {

        if (!currentlyInGame) {
            console.log('No Interval running..');
        } else {

            currentlyInGame = false;

            // Clear the timer
            clearInterval(this.timer);

        }

    }

    this.randomize = function() {
        console.log('Randomizing Grid');
        grid.randomize();
    }

    this.step = function() {

        // Contains all the values for the next cycle
        this.nextCycle = [];

        stepCounter++;
        stepCounterElement.innerHTML = 'Steps Taken: ' + stepCounter;

        console.log('Taking step: ' + stepCounter);

        // Calculate the next lifecycle first
        for (var row = 0; row < options.rows; row++) {

            this.nextCycle[row] = [];

            for (var col = 0; col < options.columns; col++) {

                let currentCell = grid.cells[row][col];
                let aliveNeighbours = getAliveNeighbours(currentCell);

                switch (aliveNeighbours) {
                    case 3:
                        this.nextCycle[row][col] = true;
                        break;
                    case 2:
                        this.nextCycle[row][col] = (grid.cells[row][col].alive) ? true : false;
                        break;
                    default:
                        this.nextCycle[row][col] = false;
                        break;
                }
            }
        }

        // generate the lifecycle
        for (var row = 0; row < options.rows; row++) {
            for (var col = 0; col < options.columns; col++) {

                (this.nextCycle[row][col]) ? grid.cells[row][col].live(): grid.cells[row][col].die();

            }
        }
        return;
    }

    // Get the neighbours of the given cell in a 3 by 3 radius
    var getAliveNeighbours = function(Cell) {

        let neighbours = 0;
        let row = Cell.location.cor_x;
        let col = Cell.location.cor_y;

        // Top row
        if (grid.cells[row - 1]) {
            // Top left
            if (grid.cells[row - 1][col - 1] && grid.cells[row - 1][col - 1].alive) neighbours++;
            // Top center
            if (grid.cells[row - 1][col] && grid.cells[row - 1][col].alive) neighbours++;
            // Top right
            if (grid.cells[row - 1][col + 1] && grid.cells[row - 1][col + 1].alive) neighbours++;
        }

        // Middle row (exists)
        // Middle Left
        if (grid.cells[row][col - 1] && grid.cells[row][col - 1].alive) neighbours++;
        // Middle right
        if (grid.cells[row][col + 1] && grid.cells[row][col + 1].alive) neighbours++;

        // Bottom row
        if (grid.cells[row + 1]) {
            // Bottom left
            if (grid.cells[row + 1][col - 1] && grid.cells[row + 1][col - 1].alive) neighbours++;
            // Bottom center
            if (grid.cells[row + 1][col] && grid.cells[row + 1][col].alive) neighbours++;
            // Bottom right
            if (grid.cells[row + 1][col + 1] && grid.cells[row + 1][col + 1].alive) neighbours++;
        }

        return neighbours;
    };
}

// Handles everything for the grid itself
var Grid = function(rows, columns, gridContainer, cellSize) {

    this.cellSize = cellSize;
    this.grid = {
        cells: {
            row: rows,
            col: columns
        },
        size: {
            // The + 2 is for the border size
            width: (columns * (cellSize + 2)) + 'px',
            height: (rows * (cellSize + 2)) + 'px'
        }
    }

    // Check if element exists
    if (!document.getElementById(gridContainer)) {
        // Generate a new Dom element
        let element = document.createElement('div');
        element.id = gridContainer;
        document.body.appendChild(element);
    }

    this.gridContainer = document.getElementById(gridContainer);

    // Style the container
    this.gridContainer.style.cssText = 'width:' + this.grid.size.width + ';height:' + this.grid.size.height + ';display:inline-block;flex-wrap:wrap;';

    // This will hold all the cells
    this.cells = [];

    // Generate the "playfield"
    this.generate = function() {

        // Build the rows
        for (var row = 0; row < this.grid.cells.row; row++) {

            // Initiate a new array for the row
            this.cells[row] = [];

            // Build the columns
            for (var col = 0; col < this.grid.cells.col; col++) {

                // Generate a cell for that location
                let cell = new Cell(row, col, this.cellSize);

                let el = cell.getElement();
                this.gridContainer.append(el);

                this.cells[row][col] = cell;
            }
        }
    }

    // Randomly select cells
    this.randomize = function() {

        for (var row = 0; row < this.grid.cells.row; row++) {

            for (var col = 0; col < this.grid.cells.col; col++) {

                // Generate a random state
                let state = Math.random() >= 0.5;
                if (state) this.cells[row][col].touch();

            }
        }
    }
}