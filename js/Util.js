/**
 * Key contants
 */
var Key = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
}

var Direction = {
	UP: 1,
	DOWN: 2,
	LEFT: 3,
	RIGHT: 0
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

function Circle( x, y, radius ) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.width = radius;
	this.height = radius;
}

function isCircleAndRectangleColliding( circle, rectangle ) {
	// Find the closest point to the circle within the rectangle
	var closestX = clamp(circle.x, rectangle.x, rectangle.x+rectangle.width);
	var closestY = clamp(circle.y, rectangle.y, rectangle.y+rectangle.height);

	// Calculate the distance between the circle's center and this closest point
	var distanceX = circle.x - closestX;
	var distanceY = circle.y - closestY;

	// If the distance is less than the circle's radius, an intersection occurs
	var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
	return distanceSquared < (circle.radius * circle.radius);
}


function clamp(value, min, max ) {
	return Math.max( min, Math.min( max, value ) );
}

function isCirclesColliding( circle1, circle2 ) {
	var a = circle1.radius + circle2.radius;
	var dx = circle1.x - circle2.x;
	var dy = circle1.y - circle2.y;
	return a * a > (dx * dx + dy * dy);
}
