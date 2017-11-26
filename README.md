# game-of-life

A basic JavaScript implementation of the Conway's Game of Life. This was just for testing my own skillset.

![alt text](https://github.com/BertMaurau/game-of-life/blob/master/screen.png)

## About

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.  

The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced "players", by creating patterns with particular properties.   

### Rules

 - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.  
 - Any live cell with two or three live neighbours lives on to the next generation.  
 - Any live cell with more than three live neighbours dies, as if by overpopulation.  
 - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.  

 More info on the Wiki: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life


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