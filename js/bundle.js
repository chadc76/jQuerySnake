/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const SnakeView = __webpack_require__(4);

	$(() => {
	  const rootEl = $('.snake-game');
	  new SnakeView(rootEl);
	});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(3)

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

	    if (!this.board.validPosition(this.head())) {
	      return false;
	    }

	    for (let i = 0; i < this.segments.length - 1; i++) {
	      if (this.segments[i].equals(head)){
	        return false;
	      }
	    }

	    return true; 
	  }

	  move() {
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
	    if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[this.dir]) || this.turning) {
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

	Snake.SYMBOL = "S";

	module.exports = Snake;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(5);

	class View {
	  constructor($el) {
	    this.$el = $el;

	    this.board = new Board(20);
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
	    this.updateClasses(this.board.snake.segments, "snake");
	    let head = this.board.snake.head();
	    if (head) {
	      this.updateClasses([head], this.board.snake.dir);
	    }
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

	    this.$el.html(html);
	    this.$li = this.$el.find("li");
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(3);
	const Snake = __webpack_require__(2);

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

	  render() {
	    const grid = Board.blankGrid(this.dim);

	    this.snake.segments.forEach(segment => {
	      grid[segment.i][segment.j] = Snake.SYMBOL;
	    })

	    const rowStr = [];
	    grid.map(row => row.join("")).join("\n");
	  }

	  validPosition(coord) {
	    return (coord.i >= 0) && (coord.i < this.dim) && 
	      (coord.j >= 0) && (coord.j < this.dim);
	  }  
	}

	Board.BLANK_SYMBOL = ".";

	module.exports = Board;

/***/ })
/******/ ]);