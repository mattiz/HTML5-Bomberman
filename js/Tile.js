/*
 * Tiles
 */
Tile.prototype = new GameObject();
Tile.prototype.constructor = Tile;

function Tile(x, y, image) {
	this.x = x;
	this.y = y;
	this.image = image;
	this.isColliding = false;
	this.boundingBox = new Rectangle( x+1,  y+1, image.width-2, image.height-2 );
}

GameObject.prototype.collidesWith = function( obj ) {
	this.isColliding = true;
}

Tile.prototype.update = function() {
	
}

Tile.prototype.draw = function(game) {
	game.drawImage( this.image, this.x, this.y );
	
	if( this.isColliding ) {
		game.fillRect( this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height );
	}

	this.isColliding = false;
};
