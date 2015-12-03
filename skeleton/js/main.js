var HanoiView = require('./hanoi-view');
var HanoiGame = require('../../hanoi-core-solution/src/game.js');

$(function () {
  var rootEl = $('.hanoi');
  var game = new HanoiGame();
  new HanoiView(game,rootEl);
});
