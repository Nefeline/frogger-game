var Game = function() {
  // Initialize game variables
  this.paused = false;
  this.gameOn = false;
};

/* Toggle between paused and un-paused states by blocking updates.
 * This boolean is used in Enemy.update and Player.handleInput
 */
Game.prototype.togglePause = function() {
  this.paused = !this.paused;
};

// Increase number of enemies at end of succesful run
Game.prototype.addAnEnemy = function() {
  /* Determine what row to put the new enemy on. This is determined
   * by finding how many enemies there are, and adding one to the next
   * stone row. When all rows are filled, start again at the first stone row.
   */
  var rows = 4;
  var count = allEnemies.length + 1;

  // Loop to top if count > rows available.
  if (count > rows) {
    count -= rows;
  }

  // Add the new enemy to the allEnemies array
  var enemy = new Enemy(-100, (count * 83) - 21);
  allEnemies.push(enemy);
};

/* Initialize game asset variables. This is called on startup of the game,
 * or if the player presses R on the keyboard.
 */
Game.prototype.gameReset = function() {
  // Place all enemy objects in an array called allEnemies
  allEnemies = [];
  for(var i=1; i<4; i++){
    var enemy = new Enemy(0-i*101, 83*i-21);
    allEnemies.push(enemy);
  }

  /* Place the player object in a variable called player
   * Do not use 'var', so that it becomes global.
   */
  player = new Player(203, 404);

  // Turn on game indicator. This will start game rendering.
  this.gameOn = true;
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Setting the Enemy initial location
    this.x = x;
    this.y = y;
    // Setting the Enemy speed
    this.rate = 100 + Math.floor(Math.random() * 150);
    // Handles collision with the Player
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.rate);
    // When bug goes off one side, reappear on the other side
    if (this.x > 500){
        this.x = -100;
    }
};

// Randomize start location of enemy
Enemy.prototype.reset = function() {
  this.x = 0 - Math.random() * 200;
};

// Increase speed of enemies slightly
Enemy.prototype.increaseRate = function() {
  this.rate += 50;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    // Loading the image by setting this.sprite to the appropriate image in the image folder
    this.sprite = 'images/char-cat-girl.png';
    // Setting the Player initial location
    this.x = x;
    this.y = y;
}

// Reset player's position to start location
Player.prototype.reset = function() {
    // Set player to start position
    this.x = 203;
    this.y = 404;
};

Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'up':
      if (this.y > 0 && !game.paused){
        this.y -= 83;
      }
      break;
    case 'down':
      if (this.y < 404 && !game.paused) {
        this.y += 83;
      }
      break;
    case 'left':
      if (this.x > 0 && !game.paused) {
        this.x -= 101;
      }
      break;
    case 'right':
      if (this.x < 480 && !game.paused){
        this.x += 101;
      }
      break;
    case 'pause':
      game.togglePause();
      break;
    case 'restart':
      game.gameReset();
      break;
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
    this.x = 203;
    this.y = 404;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
    allEnemies = [];
      for(var i=1; i<4; i++){
        var enemy = new Enemy(0-i*101, 83*i-21);
        allEnemies.push(enemy);
      }
    // Place the player object in a variable called player
    player = new Player(203, 404);

//Initialize game (implicity global)
game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',      // A
        68: 'right',     // D
        83: 'down',      // S
        87: 'up'         // W
    };
    player.handleInput(allowedKeys[e.keyCode]);
    if (e.keyCode in allowedKeys){
        e.preventDefault();
    }
});