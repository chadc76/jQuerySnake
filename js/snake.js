const Coord = require('./coord')

class Snake {
  constructor(board) {
    this.dir = "N";
    this.turning = false;
    this.board = board;

    const center = new Coord(Math.floor(board.dim / 2), Math.floor(board.dim / 2));
    this.segments = [center];

    this.growTurns = 0;
  }

  head() {
    return this.segments.slice(-1)[0];
  }

  isValid() {
    const head = this.head();

    if (!this.board.validPosition(head)) {
      return false;
    }

    for (let i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)){
        return false;
      }

      return true;
    } 
  }

  move() {
    console.log(this.head());
    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));

    this.turning = false;

    if (this.growTurns > 0) {
      this.growTruns -= 1;
    } else {
      this.segments.shift();
    }

    if (!this.isValid()) {
      this.segments = [];
    }

  }

  turn(dir) {
    if (this.Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[this.dir]) || this.turning) {
      return;
    } else {
      this.turning = true;
      this.dir = dir;
    }
  }
}

Snake.DIFFS = {
  "N": new Coord(-1, 0),
  "E": new Coord(0, 1),
  "S": new Coord(1, 0),
  "W": new Coord(0, -1)
};

module.exports = Snake;