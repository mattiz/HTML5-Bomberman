/*
 * Players
 */
Player.prototype = new GameObject();
Player.prototype.constructor = Player;

function Player(x, y, image) {
	this.x = x;
	this.y = y;
	this.speed = 4;
	this.image = image;
	this.walkUpBool = false;
	this.walkDownBool = false;
	this.walkLeftBool = false;
	this.walkRightBool = false;
}

Player.prototype.update = function() {
	if( this.walkUpBool && ! this.isCollidingWithTopEdge() ) {
		this.y -= this.speed;
	}

	if( this.walkDownBool && ! this.isCollidingWithBottomEdge() ) {
		this.y += this.speed;
	}

	if( this.walkLeftBool && ! this.isCollidingWithLeftEdge() ) {
		this.x -= this.speed;
	}

	if( this.walkRightBool && ! this.isCollidingWithRightEdge() ) {
		this.x += this.speed;
	}

	
	if( this.isColliding() ) {
		if( this.walkUpBool ) {
			this.y += this.speed;
		}

		if( this.walkDownBool ) {
			this.y -= this.speed;
		}

		if( this.walkLeftBool ) {
			this.x += this.speed;
		}

		if( this.walkRightBool ) {
			this.x -= this.speed;
		}
	}
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

Player.prototype.isColliding = function() {
	for( var i = 0; i < window.elements.length-1; i++ ) {
		var element = elements[ i ];

		if( this.isRectanglesColliding(
			element.x,
			element.y,
			element.image.width,
			element.image.height,
			this.x+4,
			this.y+50,
			30,
			20
			) ) {
			return true;
		}
	}
	
	return false;
}

Player.prototype.isRectanglesColliding = function( x1, y1, w1, h1, x2, y2, w2, h2 ) {
	w2 += x2;
	w1 += x1;
	if (x2 > w1 || x1 > w2) return false;
	h2 += y2;
	h1 += y1;
	if (y2 > h1 || y1 > h2) return false;
	return true;
}

Player.prototype.draw = function(game) {
	game.drawImage( this.image, this.x, this.y );

	game.strokeStyle = "rgb(200,0,0)";
	game.strokeRect( this.x+4,  this.y+50, 30, 20 );
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
