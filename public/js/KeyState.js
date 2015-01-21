function KeyState() {
	this.A_Pressed = false;
	this.S_Pressed = false;
	this.Space_Pressed = false;
	this.K_Pressed = false;
	this.L_Pressed = false;
}

KeyState.prototype.Update = function(event) {
	var eventIsKeydown = event.type == "keydown"; 
	switch(event.which) {
		case 65:
			eventIsKeydown ? this.A_Pressed = true : this.A_Pressed = false;
			break;
		case 83:
			eventIsKeydown ? this.S_Pressed = true : this.S_Pressed = false;
			break;
		case 32:
			eventIsKeydown ? this.Space_Pressed = true : this.Space_Pressed = false;
			break;
		case 75:
			eventIsKeydown ? this.K_Pressed = true : this.K_Pressed = false;
			break;
		case 76:
			eventIsKeydown ? this.L_Pressed = true : this.L_Pressed = false;
			break;
	}
}

function InputCommands() {
	this.Commands = [];
}

InputCommands.prototype.RotateClockwise = "Rotate Clockwise";
InputCommands.prototype.RotateCounterClockwise = "Rotate Counter Clockwise";
InputCommands.prototype.Thrust = "Thrust";
InputCommands.prototype.Shoot = "Shoot";
InputCommands.prototype.Shield = "Shield";

InputCommands.prototype.Update = function(keyState) {
	if(keyState.A_Pressed)
	{
		if(!keyState.S_Pressed && this.Commands.indexOf(InputCommands.prototype.RotateCounterClockwise) == -1)
		{
			this.Commands.push(InputCommands.prototype.RotateCounterClockwise);
		}
	}
	else
	{
		var index = this.Commands.indexOf(InputCommands.prototype.RotateCounterClockwise);
		if(index != -1)
		{
			this.Commands.splice(index, 1);
		}
	}

	if(keyState.S_Pressed)
	{
		if(!keyState.A_Pressed && this.Commands.indexOf(InputCommands.prototype.RotateClockwise) == -1)
		{
			this.Commands.push(InputCommands.prototype.RotateClockwise);
		}
	}
	else
	{
		var index = this.Commands.indexOf(InputCommands.prototype.RotateClockwise);
		if(index != -1)
		{
			this.Commands.splice(index, 1);
		}
	}

	if(keyState.Space_Pressed)
	{
		if (this.Commands.indexOf(InputCommands.prototype.Thrust) == -1) {
		  this.Commands.push(InputCommands.prototype.Thrust);	
		}
	}
	else
	{
		var index = this.Commands.indexOf(InputCommands.prototype.Thrust);
		if(index != -1)
		{
			this.Commands.splice(index, 1);
		}
	}
	

	if(keyState.K_Pressed &&this.Commands.indexOf(InputCommands.prototype.Shoot) == -1)
	{
		this.Commands.push(InputCommands.prototype.Shoot);	
	}
	else
	{
		var index = this.Commands.indexOf(InputCommands.prototype.Shoot);
		if(index != -1)
		{
			this.Commands.splice(index, 1);
		}
	}

	if(keyState.L_Pressed &&this.Commands.indexOf(InputCommands.prototype.Shield) == -1)
	{
		this.Commands.push(InputCommands.prototype.Shield);	
	}
	else
	{
		var index = this.Commands.indexOf(InputCommands.prototype.Shield);
		if(index != -1)
		{
			this.Commands.splice(index, 1);
		}
	}
}


