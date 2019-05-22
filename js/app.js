// winner modal
let modal = document.getElementById('winnerMessage');
let palyAgain = document.getElementById('restartbtn');

class Entity {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Entity {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        super('images/enemy-bug.png', x, y);
        this.speed = Math.random() * 100 * speed;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + this.speed * dt;
        if (this.x > 500) {
            this.x = -100
        }
    }
    // Draw the enemy on the screen, required method for game

}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Entity {
    constructor(x, y) {
        super('images/char-boy.png', x, y);
    }
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        for (var i = 0; i < allEnemies.length; i++) {
            var enemy = allEnemies[i];

            if (enemy.y === this.y && enemy.x + 30 >= this.x && enemy.x - 30 <= this.x) {
                alert("TRY IT AGAIN");
                allEnemies = [];
                this.x = 200;
                this.y = 400;
                document.location.reload();
            }
        }
    }
    handleInput(direction) {
        if (direction == 'left' && this.x >= 100) {
            this.x -= 100;
        }
        if (direction == 'right' && this.x <= 300) {
            this.x += 100;
        }
        if (direction == 'up' && this.y > -25) {
            this.y -= 85;
            console.log(this.y)
        }
        if (direction == 'down' && this.y < 400) {
            this.y += 85;
        }
        if (this.y <= -25) {
            allEnemies = [];
            this.x = 200;
            this.y = 400;
            $('#exampleModalCenter').modal('show')
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-100, 145, 2);
var enemy2 = new Enemy(-100, 230, 4);
var enemy3 = new Enemy(-100, 60, 7);

var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
