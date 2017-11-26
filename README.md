# game-of-life

A basic JavaScript implementation of the Conway's Game of Life. This was just for testing my own skillset.

## Options

 - **rows**: The number of rows to generate (defaul: 30)  
 - **columns**: The number of columns to generate (default: 50)  
 - **gridContainer**: The DOM element to render the Grid in (default: 'canvas')  
 - **cellSize**: The size (in px) of each cell (default: 10)   
 - **startRandomized**: Start with a randomized lifecycle (default: true)  
 - **interval**: The interval between each lifecycle (default: 100)  

## Start

### The HTML

```html
<div id="canvas"></div>
<hr>
<input type="button" onclick="game.start();" value="Start">
<input type="button" onclick="game.stop();" value="Stop">
<span id="stepCounter">Steps Taken: 0</span>
```

### The Code

Set your own options

```
var options = {
   rows: 30,
   columns: 50,
   gridContainer: 'canvas',
   cellSize: 10,
   startRandomized: true,
   interval: 100
}
```

Initialize a new Game

```
var game = new GameOfLife();
```

Attach the start handler to an input onClick (or call it from the script where you load the game)

```
game.start();
```

## Todo

 - Add a reset button  
 - Allow for user input  
 - Better randomizer  
 - ...  