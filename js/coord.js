class Coord {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  plus(coord) {
    return new Coord(this.i + coord.i, this.j + coord.j);
  }

  equals(coord) {
    return (this.i == coord.i) && (this.j == coord.j);
  }

  isOpposite(coord) {
    return (this.i == (-1 * coord.i)) && (this.j == (-1 * coord.j));
  }
}

module.exports = Coord;