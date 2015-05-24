/**
 * Stores the state of a bullet on the server.
 * Author: Alvin Lin (alvin.lin@stuypulse.com)
 */

/**
 * Constructor for a bullet.
 * @param {number} x The starting x-coordinate of a bullet (absolute).
 * @param {number} y The starting y-coordinate of a bullet (absolute).
 * @param {number} direction The direction the bullet will travel in
 *   radians.
 * @param {string} firedBy The socket ID of the client that fired the
 *   bullet.
 */
function Bullet(x, y, direction, firedBy) {
  this.x_ = x;
  this.y_ = y;
  this.direction_ = direction;
  this.firedBy_ = firedBy;
  this.distanceTraveled_ = 0;
  this.shouldExist_ = true;
}

Bullet.VELOCITY = 15;
Bullet.TRAVEL_DISTANCE = 800;
Bullet.COLLISION_DISTANCE = 25;

/**
 * We reverse the coordinate system and apply sin(direction) to x because
 * canvas in HTML will use up as its '0' reference point while JS math uses
 * left as its '0' reference point.
 * this.direction_ always is stored in radians.
 */

Bullet.prototype.collidedWith = function(player) {
  return Math.abs(player.x_ - this.x_) + Math.abs(player.y_ - this.y_) <
    Bullet.COLLISION_DISTANCE;
};

Bullet.prototype.update = function(players) {
  this.x_ += Bullet.VELOCITY * Math.sin(this.direction_);
  this.y_ -= Bullet.VELOCITY * Math.cos(this.direction_);
  this.distanceTraveled_ += Bullet.VELOCITY;

  if (this.distanceTraveled_ > Bullet.TRAVEL_DISTANCE) {
    this.shouldExist_ = false;
    return;
  }

  for (var i = 0; i < players.length; ++i) {
    if (this.collidedWith(players[i])) {
      players[i].health_ -= 1;
      this.shouldExist_ = false;
      return;
    }
  }
};

Bullet.prototype.shouldExist = function() {
  return this.shouldExist_;
};

exports.Bullet = Bullet;
