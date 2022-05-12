const { divide } = require('lodash');
const Board = require('./board');

class View {
  constructor($game, $scoreboard) {
    this.$game = $game;
    this.$scoreboard = $scoreboard;

    this.board = new Board(20);
    this.setupScoreboard();
    this.setupGrid();

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  }

  render()  {
    this.setupScoreboard();
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  }

  updateClasses(coords, className) {
    this.$li.filter(`.${className}`).removeClass();

    coords.forEach( coord => {
      const flatCoord = (coord.i * this.board.dim) + coord.j;
      this.$li.eq(flatCoord).addClass(className);
    });
  }

  setupGrid() {
    let html = "";

    for (let i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$game.html(html);
    this.$li = this.$game.find("li");
  }

  setupScoreboard() {
    let score = this.board.score.toString();
    if (score.length === 1) {
      score = "000" + score
    } else if (score.length === 2) {
      score = "00" + score
    } else if (score.length === 3) {
      score = "0" + score
    }
    this.$scoreboard.html(score);
  }

  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      alert("You Lose!");
      window.clearInterval(this.intervalId)
    }
  }
}

View.KEYS = {
  38: "N",
  39: "E",
  40: "S",
  37: "W"
};

View.STEP_MILLIS = 100;

module.exports = View;