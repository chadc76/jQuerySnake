class Snake {
  constructor(board) {
    this.dir = "N";
    this.board = board;
    
    const center = [Math.floor(board.dim / 2), Math.floor(board.dim / 2)];
    this.segments = center;
  }
}