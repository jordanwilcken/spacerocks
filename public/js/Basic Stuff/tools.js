/* Depends on geometry.js
 *
 */
function Tools() {
}

Tools.prototype.IsPointInsideRectangle = function(point, rectangle) {
	if(point.X < rectangle.X)
	{
		return false;
	}
	if(point.X > (rectangle.X + rectangle.Width))
	{
		return false;
	}
	if(point.Y < rectangle.Y)
	{
		return false;
	}
	if(point.Y > (rectangle.Y + rectangle.Height))
	{
		return false;
	}
	return true;
}
