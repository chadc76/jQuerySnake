const Coord = require('./coord')

class Snake {
  constructor(board) {
    this.dir = "N";
    this.board = board;

    const center = new Coord(Math.floor(board.dim / 2), Math.floor(board.dim / 2));
    this.segments = [center];
  }
}

module.exports = Snake;