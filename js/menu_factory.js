function Button(buttonText, hitRect, onClick)
{
	this.ButtonText = buttonText;
	this.HitRect = hitRect;
	this.OnClick = onClick;
}

Button.prototype.Draw = function(drawingContext) {
	var right = this.HitRect.X + this.HitRect.Width;
	var bottom = this.HitRect.Y + this.HitRect.Height;
	drawingContext.beginPath();
	drawingContext.moveTo(this.HitRect.X, this.HitRect.Y);
    drawingContext.lineTo(right, this.HitRect.Y);
	drawingContext.lineTo(right, this.HitRect.Y + this.HitRect.Height/2);
	drawingContext.lineTo(right - this.HitRect.Height/2, bottom);
	drawingContext.lineTo(this.HitRect.X, bottom);
	drawingContext.fillStyle = "rgba(0,0,128,0.5)";
	drawingContext.fill();

	drawingContext.font = "16pt Arial";
	var textWidth = drawingContext.measureText(this.ButtonText).width;
	var startTextX = this.HitRect.X + this.HitRect.Width/2 - textWidth/2;
	var startTextY = this.HitRect.Y + this.HitRect.Height/2;
	drawingContext.fillStyle = "white";
	var prevBaseline = drawingContext.textBaseline;
	drawingContext.textBaseline = "middle";
	drawingContext.fillText(this.ButtonText, startTextX, startTextY);
	drawingContext.textBaseline = prevBaseline;
}

function Menu(options, x, y, width, height) {
	this.Buttons = [];
	this.Options;
	this._x = x;
	this._y = y;
	this.Width = width;
	this.Height = height;
}

Menu.prototype = {
	get X() {
		return this._x;
	},
	set X(value) {
		var distanceToMove = value - this._x;
		this._x = value;
		if(this.Buttons != undefined)
		{
			this.Buttons.forEach(function(button) {
				button.HitRect.X += distanceToMove;
			});
		}
	},

	get Y() {
		return this._y;
	},
	set Y(value) {
		var distanceToMove = value - this._y;
		this._y = value;
		if(this.Buttons != undefined)
		{
			this.Buttons.forEach(function(button) {
				button.HitRect.Y += distanceToMove;
			});
		}
	}
};

Menu.prototype.Draw;

Menu.prototype.OnClick = function(event) {
	var clickPoint = new Point(event.canvasX, event.canvasY);
	for(var j = 0; j < this.Buttons.length; ++j)
	{
		var button = this.Buttons[j];
		if(Tools.prototype.IsPointInsideRectangle(clickPoint, button.HitRect))
		{
			button.OnClick();	
			break;
		}
	}
}

function MenuFactory() {
}

MenuFactory.prototype.MakeMenu = function(options, drawingContext) {
	if(options == undefined || options.length == 0)
	{
		throw new Error("You cannot pass a null or empty array to MakeMenu.");
	}
	if(drawingContext == undefined)
	{
		throw new Error("You cannot pass a null drawing context to MakeMenu.");
	}

	var menu = new Menu(options, 0, 0, 170);

	var buttonHeight = 30;
	var spaceBetween = 5;
	var buttonTop = menu.Y;

	var button;
	options.forEach(function(option) {
		var hitRect = new Rectangle(menu.X, buttonTop, menu.Width, buttonHeight);
		button = new Button(option, hitRect);
		menu.Buttons.push(button);
		buttonTop += buttonHeight + spaceBetween;
	});

	var topOfTopButton = menu.Y;
	var bottomOfBottomButton = button.HitRect.Y + buttonHeight;  
	menu.Height = bottomOfBottomButton - topOfTopButton;
	
	menu.Draw = function() {
		menu.Buttons.forEach(function(button) {
			button.Draw(drawingContext);
		});
	};
	
	return menu;
}
