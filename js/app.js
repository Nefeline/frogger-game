// Enemies our player must avoid
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.rate = 100 + Math.floor(Math.random() * 100);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (dt * this.rate);
    // When bug goes off one side, reappear on the other side
    if (this.x > 500){
        this.x = -100;
    }
};
// Randomize start location of enemy
Enemy.prototype.reset = function() {
    this.rate = 100 + Math.floor(Math.random() * 100);
};
// Increase speed of enemies slightly
Enemy.prototype.increaseRate = function() {
    this.rate += 60;
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
    this.carryItem = false;
}
// Reset player's position to start location
Player.prototype.update = function() {
  if (this.carryItem) {
    this.carryItem = false;
  }
    // Set player to start position
    this.x = 202;
    this.y = 404;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
      case 'up':
        if (this.y > -10){
          this.y -= 83;
        }
        break;
      case 'down':
        if (this.y < 404) {
          this.y += 83;
        }
        break;
      case 'left':
        if (this.x > 3) {
          this.x -= 101;
        }
        break;
      case 'right':
        if (this.x < 403){
          this.x += 101;
        }
        break;
    }
};

Player.prototype.history = function(){
  var texts = ["Oh no! You got hit by a ladybug! So sad... Try Again!",
               "You died! Those ladybugs are evil!",
               "Oh no! Are you a suicidal?"];
  var text = texts[Math.floor(Math.random() * texts.length)];
  document.getElementById('text').innerHTML = text;
};

Player.prototype.win = function(){
  var texts = ["Good! You took a bath!",
               "You like this lake, don't you?",
               "Why are they running so fast? It's a marathon??"];
  var text = texts[Math.floor(Math.random() * texts.length)];
  document.getElementById('text').innerHTML = text;
};

var Bonus = function(x, y) {
  this.sprite = 'images/Star.png';
  this.x = x;
  this.y = y;
  this.visible = true;
};

// // Steps to be carried out when an item is picked up by the player
Bonus.prototype.pickup = function() {
  // Set parameters for objects
  //Check for collision between player and the bonus, and take star.
    this.visible = false;
    player.carryItem = true;
    // Hide item off screen (to be reused on reset)
    this.x = -101;
    this.y = -101;
};

Bonus.prototype.history = function(){
  var texts = ["This star is sooo beautiful!",
               "Look how shinny the are!",
               "Look at the stars, look how they shine for you!"];
  var text = texts[Math.floor(Math.random() * texts.length)];
  document.getElementById('text').innerHTML = text;
};

// Reset will set item on game board to be picked up.
Bonus.prototype.update = function() {
  this.x = Math.floor(Math.random() * 5) * 101;
  this.y = Math.ceil(Math.random() * 4) * 83 - 11;
  this.visible = true;
};

// Draw the bonus image on the screen
Bonus.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var score = 0;
var highestScore = 0;
var newHighScore; // true when a new high score is reached.

var Score = function(){}

Score.showHighestScore = function(){
  if(score > highestScore){
    highestScore = score;
    newHighScore = true;
  }
  document.getElementById('highscore').innerHTML = "Your best result:"+ highestScore;
}

Score.update = function() {
    score+= 10;
    document.getElementById('playerScore').innerHTML = score;
    return score;
}

Score.reset = function() {
    score = 0;
    document.getElementById('playerScore').innerHTML = score;
    return score;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
allEnemies = [];
  for(var i=1; i<4; i++){
    var enemy = new Enemy(0-i*101, 83*i-21);
    allEnemies.push(enemy);
  }
// Place the player object in a variable called player
player = new Player(202, 404);
star = new Bonus(-100,-100);

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
});