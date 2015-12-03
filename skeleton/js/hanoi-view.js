var HanoiView = function (game, $rootEl) {
  this.game = game;
  this.$rootEL = $rootEl;
  this.setupTowers();
};


$.extend(HanoiView.prototype, {
  setupTowers: function() {
    for (var i = 0; i < 3; i++) {
      var $stack = $("<ul>").data('id', i);
      for (var j = 0; j < 3; j++) {
        var $disk = $("<li>").data('pos', [i,j]);
        $stack.append($disk);
      }
      this.$rootEL.append($stack);
    }
  },
  render: function() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (this.game.towers[i,j] === 3) {
          $disk(pos = [i,j]).addClass("disk-3");
        } else if (this.game.towers[i,j] === 2) {
          $disk(pos = [i,j]).addClass("disk-2");
        } else if (this.game.towers[i,j] === 1) {
          $disk(pos = [i,j]).addClass("disk-1");
        }
      }
    }
  },
});


module.exports = HanoiView;
