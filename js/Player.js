/*
 * Players
 */
Player.prototype = new GameObject();
Player.prototype.constructor = Player;

function Player(x, y, image) {
	this.x = x;
	this.y = y;
	this.width = 51;
	this.height = 77;
	this.speed = 0;
	this.maxSpeed = 5;
	this.image = image;
	this.i = 0;

	this.direction = Direction.DOWN;
	this.boundingBox = new Rectangle( this.x+4,  this.y+50, 30, 20 );
}

Player.prototype.update = function() {
	if( this.direction == Direction.UP && ! this.isCollidingWithTopEdge() ) {
		this.y -= this.speed;
		this.boundingBox.y -= this.speed;
	}

	if( this.direction == Direction.DOWN && ! this.isCollidingWithBottomEdge() ) {
		this.y += this.speed;
		this.boundingBox.y += this.speed;
	}

	if( this.direction == Direction.LEFT && ! this.isCollidingWithLeftEdge() ) {
		this.x -= this.speed;
		this.boundingBox.x -= this.speed;
	}

	if( this.direction == Direction.RIGHT && ! this.isCollidingWithRightEdge() ) {
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

	if( this.direction == Direction.UP ) {
		var diff = this.boundingBox.y - (obj.boundingBox.y+obj.boundingBox.height) - 1;
		
		this.y -= diff;
		this.boundingBox.y -= diff;
	}

	if( this.direction == Direction.DOWN ) {
		var diff = (this.boundingBox.y+this.boundingBox.height) - obj.boundingBox.y + 1;
		
		this.y -= diff;
		this.boundingBox.y -= diff;
	}

	if( this.direction == Direction.LEFT ) {
		var diff = this.boundingBox.x - (obj.boundingBox.x+obj.boundingBox.width) - 1;
		
		this.x -= diff;
		this.boundingBox.x -= diff;
	}

	if( this.direction == Direction.RIGHT ) {
		var diff = (this.boundingBox.x+this.boundingBox.width) - obj.boundingBox.x + 1;
		
		this.x -= diff;
		this.boundingBox.x -= diff;
	}
}

Player.prototype.draw = function(game) {
	//game.drawImage( this.image, this.x, this.y );

	if( this.speed > 0 ) {
		this.i++;
	}

	game.drawImage(
		this.image,
		this.width*(this.i%15),
		this.height * this.direction,
		this.width,
		this.height,
		this.x,
		this.y,
		this.width,
		this.height );
	
	/* Draw the bounding box */
	game.strokeStyle = "rgb(200,0,0)";
	game.strokeRect(
		this.boundingBox.x,
		this.boundingBox.y,
		this.boundingBox.width,
		this.boundingBox.height );

};

Player.prototype.walkUp = function() {
	this.direction = Direction.UP;
	this.speed = this.maxSpeed;
}

Player.prototype.walkDown = function() {
	this.direction = Direction.DOWN;
	this.speed = this.maxSpeed;
}

Player.prototype.walkLeft = function() {
	this.direction = Direction.LEFT;
	this.speed = this.maxSpeed;
}

Player.prototype.walkRight = function() {
	this.direction = Direction.RIGHT;
	this.speed = this.maxSpeed;
}

Player.prototype.stop = function() {
	this.speed = 0;
}
