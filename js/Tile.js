/*
 * Tiles
 */
Tile.prototype = new GameObject();
Tile.prototype.constructor = Tile;

function Tile(x, y, image) {
	this.x = x;
	this.y = y;
	this.image = image;
}

Tile.prototype.update = function() {
	
}

Tile.prototype.draw = function(game) {
	game.drawImage( this.image, this.x, this.y );
};
