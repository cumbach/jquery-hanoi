var HanoiView = require('./hanoi-view.js');
var HanoiGame = require('../../hanoi-core-solution/hanoi-core.js');

$(function () {
  var rootEl = $(".hanoi");
  var game = new HanoiGame();
  new HanoiView(game, $(".hanoi"));
});
