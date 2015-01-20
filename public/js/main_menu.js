function MainMenu(drawingContext, position, width, height) {
	this.DrawingContext = drawingContext;
	this.Position = position;
	this.Width = width;
	this.Height = height;
	this.IsVisible = true;
}

MainMenu.prototype.Draw = function() {
	if( this.DrawingContext == undefined ||
		this.Position == undefined ||
		this.Width == undefined ||
		this.Height ==undefined	
	)
	{
		throw new Error("MainMenu is in a state where MainMenu.Draw is not going to work.");
	}
	this._DrawTitle();
	this._DrawButtons();
}

MainMenu.prototype._DrawTitle = function() {
	var titleText = "Xasteroids";
	this.DrawingContext.font = "20pt Arial";
	var titleWidth = this.DrawingContext.measureText(titleText).width;
	var titleX = this.Position.X + this.Width/2 - titleWidth/2;
	var titleY = this.Position.Y;
	this.DrawingContext.font = "20pt Arial";
	this.DrawingContext.fillStyle = "white";
	var prevBaseline = this.DrawingContext.textBaseline;
	this.DrawingContext.textBaseline = "top";
	this.DrawingContext.fillText(titleText, titleX, titleY);
	this.DrawingContext.textBaseline = prevBaseline;
}

MainMenu.prototype._DrawButtons = function() {
	var drawContxt = this.DrawingContext;
	var buttonTop = this.Position.Y + 30;
	var buttonRight = this.Position.X + this.Width;
	var buttonBottom = this.Position.Y + this.Height;
	var buttonHeight = 30;
	drawContxt.beginPath();
	drawContxt.moveTo(this.Position.X, buttonTop);
    drawContxt.lineTo(buttonRight, buttonTop);
	drawContxt.lineTo(buttonRight, buttonBottom - buttonHeight/2);
	drawContxt.lineTo(buttonRight - buttonHeight/2, buttonBottom);
	drawContxt.lineTo(this.Position.X, buttonBottom);
	drawContxt.fillStyle = "rgba(0,0,128,0.5)";
	drawContxt.fill();

	var startText = "Let it Begin!";
	drawContxt.font = "16pt Arial";
	var startTextWidth = this.DrawingContext.measureText(startText).width;
	var startTextX = this.Position.X + this.Width/2 - startTextWidth/2;
	var startTextY = buttonTop + buttonHeight/2;
	drawContxt.fillStyle = "white";
	var prevBaseline = drawContxt.textBaseline;
	drawContxt.textBaseline = "middle";
	drawContxt.fillText(startText, startTextX, startTextY);
	drawContxt.textBaseline = prevBaseline;
}

MainMenu.prototype.Start = "Start";

MainMenu.prototype.OnClick = function(event) {
	$(this).trigger(MainMenu.prototype.Start);
}
