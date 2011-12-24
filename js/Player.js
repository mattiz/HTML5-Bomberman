/*
 * Players
 */
Player.prototype = new GameObject();
Player.prototype.constructor = Player;

function Player(x, y, image) {
	this.x = x;
	this.y = y;
	this.speed = 5;
	this.image = image;
	this.walkUpBool = false;
	this.walkDownBool = false;
	this.walkLeftBool = false;
	this.walkRightBool = false;
	this.isColliding = false;
	this.boundingBox = new Rectangle( this.x+4,  this.y+50, 30, 20 );
}

Player.prototype.update = function() {
	if( ! this.isColliding ) {
		if( this.walkUpBool && ! this.isCollidingWithTopEdge() ) {
			this.y -= this.speed;
			this.boundingBox.y -= this.speed;
		}

		if( this.walkDownBool && ! this.isCollidingWithBottomEdge() ) {
			this.y += this.speed;
			this.boundingBox.y += this.speed;
		}

		if( this.walkLeftBool && ! this.isCollidingWithLeftEdge() ) {
			this.x -= this.speed;
			this.boundingBox.x -= this.speed;
		}

		if( this.walkRightBool && ! this.isCollidingWithRightEdge() ) {
			this.x += this.speed;
			this.boundingBox.x += this.speed;
		}
	}

	this.isColliding = false;
}

Player.prototype.isCollidingWithLeftEdge = function() {
	return ( this.x < 20 );
}

Player.prototype.isCollidingWithRightEdge = function() {
	return ( (this.x + 30) > 610 );
}

Player.prototype.isCollidingWithTopEdge = function() {
	return ( (this.y+50) < 66 );
}

Player.prototype.isCollidingWithBottomEdge = function() {
	return ( (this.y+70) > 462 );
}

Player.prototype.collidesWith = function( obj ) {
	this.isColliding = true;
}

Player.prototype.draw = function(game) {
	game.drawImage( this.image, this.x, this.y );
	
	game.strokeStyle = "rgb(200,0,0)";
	game.strokeRect(
		this.boundingBox.x,
		this.boundingBox.y,
		this.boundingBox.width,
		this.boundingBox.height );
};

Player.prototype.walkUp = function() {
	this.walkUpBool = true;
}

Player.prototype.walkDown = function() {
	this.walkDownBool = true;
}

Player.prototype.walkLeft = function() {
	this.walkLeftBool = true;
}

Player.prototype.walkRight = function() {
	this.walkRightBool = true;
}

Player.prototype.stop = function() {
	this.walkUpBool = false;
	this.walkDownBool = false;
	this.walkLeftBool = false;
	this.walkRightBool = false;
}
