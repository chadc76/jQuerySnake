class Board {
  constructor(dim) {
    this.dim = dim;
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

  
}

Board.BLANK_SYMBOL = ".";

module.exports = Board;