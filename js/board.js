const Snake = require('./snake');
const Apple = require('./apple');

class Board {
  constructor(dim) {
    this.dim = dim;

    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }

  static blankGrid(dim) {
    let grid = [];

    for (let i = 0; i < dim; i++) {
      let row = [];
      for (let j = 0; j < dim; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }

    return grid;
  }

  render() {
    const grid = Board.blankGrid(this.dim);

    this.snake.segments.forEach(segment => {
      grid[segment.i][segment.j] = Snake.SYMBOL;
    })

    grid[this.apple.position.i][this.apple.position.j] = Apple.SYMBOL;

    grid.map(row => row.join("")).join("\n");
  }

  validPosition(coord) {
    return (coord.i >= 0) && (coord.i < this.dim) && 
      (coord.j >= 0) && (coord.j < this.dim);
  }  
}

Board.BLANK_SYMBOL = ".";

module.exports = Board;