const { divide } = require('lodash');
const Board = require('./board');

class View {
  constructor($game, $scoreboard) {
    this.$game = $game;
    this.$scoreboard = $scoreboard;
    this.leaderboard = [["chad", 80], ["chad", 10], ["chad", 20], ["chad", 30], ["chad", 40], ["chad", 50], ["chad", 60], ["chad", 70], ["chad", 0]];
    this.startGame();

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  startGame() {
    this.board = new Board(20);
    this.gameOver = false;
    this.gamePaused = false;
    const $s = $('.new-game');
    $s.addClass("hidden");
    this.setupScoreboard();
    this.setupLeaderboard();
    this.setupGrid();
    this.startInterval();
  }

  handleKeyEvent(event) {
    if (event.keyCode === 80) {
      this.pauseGame();
    } else if (event.keyCode === 78 && this.gameOver) {
      this.startGame();
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
    let score = this.stringScore(this.board.score);
    this.$scoreboard.html(score);
  }

  stringScore(numericScore) {
    let score = numericScore.toString();
    if (score.length === 1) {
      score = "000" + score
    } else if (score.length === 2) {
      score = "00" + score
    } else if (score.length === 3) {
      score = "0" + score
    }
    return score;
  }

  setupLeaderboard() {
    $(".table").find(".score").remove();

    if (this.leaderboard.length > 0) {
      this.leaderboard = this.leaderboard.sort((x, y) => {
        return x[1] - y[1];
      });

      if (this.leaderboard.length > 9) {
        this.leaderboard.shift();
      }

      const $t = $('.table');

      for (let i = this.leaderboard.length - 1; i >= 0; i--) {
        let name = this.leaderboard[i][0];
        let score = this.leaderboard[i][1];
        $t.append(`<tr class="score"><td>${name}</td><td>${this.stringScore(score)}</td></tr>`);
      }
    }
  }

  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      this.endGame();
    }
  }

  endGame() {
    this.addToLeaderboard();
    const $s = $('.new-game');
    $s.removeClass("hidden");
    window.clearInterval(this.intervalId)
    this.gameOver = true;
  }

  addToLeaderboard() {
    if (this.leaderboard[0][1] >= this.board.score) {
      return;
    }
    let name = window.prompt("Enter your name for leaderboard: ")
    this.leaderboard.push([name, this.board.score]);
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
};

View.STEP_MILLIS = 100;

module.exports = View;