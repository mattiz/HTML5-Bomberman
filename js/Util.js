/**
 * Key contants
 */
var Key = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
}

function Rectangle( x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

function isRectanglesColliding( x1, y1, w1, h1, x2, y2, w2, h2 ) {
	w2 += x2;
	w1 += x1;
	if (x2 > w1 || x1 > w2) return false;
	h2 += y2;
	h1 += y1;
	if (y2 > h1 || y1 > h2) return false;
	return true;
}
