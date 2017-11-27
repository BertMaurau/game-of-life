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
        this.element.onclick = function() { this.touch() };

        return this.element;
    }

};

var GameOfLife = function(inputParams = {}) {

    var options = {
        rows: inputParams.rows || 30,
        columns: inputParams.columns || 50,
        gridContainer: inputParams.gridContainer || 'canvas',
        cellSize: inputParams.cellSize || 10,
        startRandomized: (inputParams.startRandomized === undefined) ? false : inputParams.startRandomized,
        interval: inputParams.interval || 100
    };

    console.log(inputParams.startRandomized);

    var stepCounter = 0;
    var stepCounterElement = document.getElementById('stepCounter');

    // Define a Grid
    var grid = new Grid(options.rows, options.columns, options.gridContainer, options.cellSize);

    // Draw the grid
    grid.generate();

    if (options.startRandomized) {
        grid.randomize();
    }

    this.start = function() {

        this.timer = setInterval(this.step, options.interval);

    }

    this.stop = function() {
        // Clear the timer
        clearInterval(this.timer);

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