const Snake = require('./snake');

class Board {
  constructor(dim) {
    this.dim = dim;

    this.snake = new Snake(this);
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

  validPosition(coord) {
    return (coord.i >= 0) && (coord.i < this.dim) && 
    (coord.j >= 0) && (coord.j < this.dim);
  }

  
}

Board.BLANK_SYMBOL = ".";

module.exports = Board;