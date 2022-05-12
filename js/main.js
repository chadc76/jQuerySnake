const SnakeView = require('./snake-view');

$(() => {
  const rootEl = $('.snake-game');
  new SnakeView(rootEl);
});