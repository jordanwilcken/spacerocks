function Point(x, y, z) {
	this.X = x;
	this.Y = y;
	this.Z = z;
}

//makes shallow copies
Point.prototype.Copy = function(point) {
	return new Point(point.X, point.Y, point.Z);
}

function Rectangle(x, y, width, height) {
	this.X = x;
	this.Y= y;
	this.Width = width;
	this.Height = height;
}
