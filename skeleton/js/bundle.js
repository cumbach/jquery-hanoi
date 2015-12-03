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
/***/ function(module, exports, __webpack_require__) {

	var HanoiView = __webpack_require__(1);
	var HanoiGame = __webpack_require__(3);

	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  new HanoiView(game,rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};

	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];

	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};

	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};

	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};

	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};

	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};

	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }

	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};

	module.exports = Game;


/***/ }
/******/ ]);