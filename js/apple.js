const Coord = require('./coord')

class Apple {
  constructor(board) {
    this.board = board;
    this.replace();
  }

  replace() {
    let x = Math.floor(Math.random() * this.board.dim);
    let y = Math.floor(Math.random() * this.board.dim);

    this.position = new Coord(x,y);
  }
}

Apple.SYMBOL = "A"

module.exports = Apple;