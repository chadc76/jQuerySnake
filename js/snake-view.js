const { divide } = require('lodash');
const Board = require('./board');

class View {
  constructor($game, $scoreboard) {
    this.$game = $game;
    this.$scoreboard = $scoreboard;

    this.board = new Board(20);
    this.setupScoreboard();
    this.setupGrid();
    this.startInterval();
    this.gamePaused = false;

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {
    if (View.KEYS[event.keyCode] === "P") {
      this.pauseGame();
    } else if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  }

  startInterval() {
    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );
  }

  render()  {
    this.setupScoreboard();
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  }

  updateClasses(coords, className) {
    this.$li.filter(`.${className}`).removeClass(className);

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

  pauseGame() {
    const $p = $('.pause-screen');
    if (this.gamePaused) {
      this.startInterval();
      this.gamePaused = false;
      $p.addClass("hidden");
    } else {
      window.clearInterval(this.intervalId)
      this.gamePaused = true;
      $p.removeClass("hidden");

    }
  }
}

View.KEYS = {
  38: "N",
  39: "E",
  40: "S",
  37: "W",
  80: "P"
};

View.STEP_MILLIS = 100;

module.exports = View;