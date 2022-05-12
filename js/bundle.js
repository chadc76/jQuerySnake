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

	const Snake = __webpack_require__(2);
	$(() => {
	  
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

/***/ })
/******/ ]);