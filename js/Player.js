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
	this.boundingBox = new Circle( this.x+24, this.y+63, 15 );
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
	// Player = circle, tiles = rectangles

	while( isCircleAndRectangleColliding( this.boundingBox, obj.boundingBox ) ) {
		if( this.direction == Direction.UP ) {
			this.y++;
			this.boundingBox.y++;
		}

		if( this.direction == Direction.DOWN ) {
			this.y--;
			this.boundingBox.y--;
		}

		if( this.direction == Direction.LEFT ) {
			this.x++;
			this.boundingBox.x++;
		}

		if( this.direction == Direction.RIGHT ) {
			this.x--;
			this.boundingBox.x--;
		}		
	}
}

Player.prototype.draw = function(game) {
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
	game.beginPath();
	game.arc( this.boundingBox.x, this.boundingBox.y, this.boundingBox.radius, 0, Math.PI*2, true );
	game.closePath();
	game.stroke();
	
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
