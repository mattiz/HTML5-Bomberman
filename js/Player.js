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

Player.prototype.isCollidingWithLeftEdge = function() {
	return ( this.boundingBox.x < 20 );
}

Player.prototype.isCollidingWithRightEdge = function() {
	return ( (this.boundingBox.x+this.boundingBox.width) > 615 );
}

Player.prototype.isCollidingWithTopEdge = function() {
	return ( (this.boundingBox.y) < 66 );
}

Player.prototype.isCollidingWithBottomEdge = function() {
	return ( (this.boundingBox.y+this.boundingBox.height) > 460 );
}

Player.prototype.collidesWith = function( obj ) {
	// obj = tile, this = player

	if( this.walkUpBool ) {
		var diff = this.boundingBox.y - (obj.boundingBox.y+obj.boundingBox.height) - 1;
		
		this.y -= diff;
		this.boundingBox.y -= diff;
	}

	if( this.walkDownBool ) {
		var diff = (this.boundingBox.y+this.boundingBox.height) - obj.boundingBox.y + 1;
		
		this.y -= diff;
		this.boundingBox.y -= diff;
	}

	if( this.walkLeftBool ) {
		var diff = this.boundingBox.x - (obj.boundingBox.x+obj.boundingBox.width) - 1;
		
		this.x -= diff;
		this.boundingBox.x -= diff;
	}

	if( this.walkRightBool ) {
		var diff = (this.boundingBox.x+this.boundingBox.width) - obj.boundingBox.x + 1;
		
		this.x -= diff;
		this.boundingBox.x -= diff;
	}
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
