const SnakeView = require('./snake-view');

$(() => {
  const game = $('.snake-game');
  const scoreBoard = $('.scoreboard');
  new SnakeView(game, scoreBoard);
});