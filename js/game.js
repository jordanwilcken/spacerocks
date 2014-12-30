/*jslint         browser : true, continue : true,
    devel  : true, indent  : 2,    maxerr   : 50,
    newcap : true, nomen   : true, plusplus : true,
    regexp : true, sloppy  : true, vars     : false,
    white  : true
*/

/*global $, spacerocks */

var inputCommands;
var keyState;
var canvas;
var mainMenu;

$(function() {
	keyState = new KeyState();
	inputCommands = new InputCommands();
	canvas = $("#c");
	canvas.on("keydown", function(event) {
		keyState.Update(event);
  	});	
	canvas.on("keyup", function(event) {
		keyState.Update(event);
	});

	var arbitraryMenuWidth = 170;
	var arbitraryMenuHeight = 60;
	var menuX = canvas[0].width/2 - arbitraryMenuWidth/2;
	var menuY = canvas[0].height/2 + 20;
	mainMenu = MenuFactory.prototype.MakeMenu(["Let it Begin!"], ctx);
	mainMenu.X = menuX;
	mainMenu.Y = menuY;
	mainMenu.Buttons[0].OnClick = function() {
	   	//Insert function that starts the game here.
   	};

	canvas.on("click", function(event) {
		var offset = canvas.offset();
		event.canvasX = event.clientX - offset.left;
		event.canvasY = event.clientY - offset.top;
		mainMenu.OnClick(event);
	});

	GameLoop();
});

var width = 800,  
//width of the canvas  
  height = 600,  
//height of the canvas  
  now = 0,
  then = 0,
  delta = 0,
  level = 1,
  gLoop,  
  c = document.getElementById('c'),   
//canvas itself   
  
  ctx = c.getContext('2d');  
//and two-dimensional graphic context of the  
//canvas, the only one supported by all   
//browsers for now  
  
c.width = width;  
c.height = height;  
//setting canvas size   

var clear = function(){  
  ctx.fillStyle = '#000000';  
  ctx.beginPath();  
  ctx.rect(0, 0, width, height);  
  ctx.closePath();  
  ctx.fill();  
}

var setDelta = function(){
	now = Date.now();
  if (then != 0) {
	  delta = (now - then) / 1000;
  } else {
    delta = 0;
  }
	then = now;
}

var asteroid = function(){
	this.images = [];
	this.currentFrame=0;
	
	this.width;
	this.height;
	
	this.X;
	this.Y;
	
	this.xVel;
	this.yVel;
}

asteroid.prototype.setPosition = function(x, y){
	this.X = x;
	this.Y = y;
	
	
}

asteroid.prototype.draw = function(){  
        try {  
            ctx.drawImage(this.images[this.currentFrame], 0, 0, this.width, this.height, this.X, this.Y, this.width, this.height);  
//cutting source image and pasting it into destination one, drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)  
        } catch (e) {  
//sometimes, if character's image is too big and will not load until the drawing of the first frame, Javascript will throws error and stop executing everything. To avoid this we have to catch an error and retry painting in another frame. It is invisible for the user with 50 frames per second.  
        }  
}

asteroid.prototype.load = function(x, y){
}

var smallAsteroid = function(){
	asteroid.call();
}

smallAsteroid.prototype = new asteroid();

smallAsteroid.prototype.load = function(x, y){
	this.X = x;
	this.Y = y;
	
	this.xVel = 0;
	this.yVel = 0;

	this.width = 32;
	this.height = 33;
	
  this.images = spacerocks.utils.get32Images("SmaAst");
	
	if (this.X < 0)
	{
		this.xVel = (Math.random() * 400) + 200;
	}
	else
	{
		this.xVel = (Math.random() * -400) - 200;
	}
	if (this.Y < 0)
	{
		this.yVel = (Math.random() * 400) + 200;
	}
	else
	{
		this.yVel = (Math.random() * -400) - 200;
	}
}

var mediumAsteroid = function(){
	asteroid.call();
}

mediumAsteroid.prototype = new asteroid(0, 0);

mediumAsteroid.prototype.load = function(x, y){
	this.X = x;
	this.Y = y;
	
	this.xVel = 0;
	this.yVel = 0;

	this.width = 32;
	this.height = 33;
	
  this.images = spacerocks.utils.get32Images("MedAst");
  	
	if (this.X < 0)
	{
		this.xVel = (Math.random() * 400) + 200;
	}
	else
	{
		this.xVel = (Math.random() * -400) - 200;
	}
	if (this.Y < 0)
	{
		this.yVel = (Math.random() * 400) + 200;
	}
	else
	{
		this.yVel = (Math.random() * -400) - 200;
	}
}

var bigAsteroid = function(){
	asteroid.call();
}

bigAsteroid.prototype = new asteroid();

bigAsteroid.prototype.load = function(x, y){
	this.X = x;
	this.Y = y;
	
	this.xVel = 0;
	this.yVel = 0;

	this.width = 58;
	this.height = 58;
	
  this.images = spacerocks.utils.get32Images("BigAst");
	
	if (this.X < 0)
	{
		this.xVel = 32; //(Math.random() * 400) + 200;
	}
	else
	{
		this.xVel = -32; //(Math.random() * -400) - 200;
	}
	if (this.Y < 0)
	{
		this.yVel =  32; //(Math.random() * 400) + 200;
	}
	else
	{
		this.yVel = -32; //(Math.random() * -400) - 200;
	}
}

var asteroids = [];  
  
var CreateLevel = function(){
	for (var i = 0; i < level + 3; i++)
	{
		var bigAst = new bigAsteroid();
		var temp = Math.floor(Math.random() * 5);
		switch (temp)
		{
			case 0:
			{
				bigAst.load((Math.random() * -200) - 32, (Math.random() * (height + 200)) - 100);
			} break;
			case 1:
			{
				bigAst.load((Math.random() * 200) + 32, (Math.random() * (height + 200)) - 100);
			} break;
			case 2:
			{
				bigAst.load((Math.random() * (width + 200)) - 100, (Math.random() * -200) - 32);
			} break;
			case 3:
			{
				bigAst.load((Math.random() * (width + 200)) - 100, (Math.random() * 200) + 32);
			} break;
			default:
			{
				bigAst.load((Math.random() * -200) - 32, (Math.random() * (height + 200)) - 100);
			} break;
		}
		asteroids.push(bigAst);
	}
}

//add information about circles into  
//the 'circles' Array. It is x & y positions,   
//radius from 0-100 and transparency   
//from 0-0.5 (0 is invisible, 1 no transparency)  
  
var DrawAsteroids = function(){  
  for (var i = 0; i < asteroids.length; i++) {  
	asteroids[i].draw();
  }  
}

var MoveAsteroids = function(){  
  for (var i = 0; i < asteroids.length; i++) {
	asteroids[i].X += asteroids[i].xVel * delta;
	asteroids[i].Y += asteroids[i].yVel * delta;
	
	if (asteroids[i].X > width + 64 && asteroids[i].xVel >= 0) 
	{
		asteroids[i].X -= (width + 128);
    }
	else if (asteroids[i].X < -64 && asteroids[i].xVel < 0)
	{
		asteroids[i].X += (width + 128);
	}
    if (asteroids[i].Y > height + 64 && asteroids[i].yVel >= 0) 
	{
		asteroids[i].Y -= (height + 128);
    }
	else if (asteroids[i].Y < -64 && asteroids[i].yVel < 0)
	{
		asteroids[i].Y += (height + 128);
	}
	asteroids[i].currentFrame++;
	if (asteroids[i].currentFrame==32)
	{
		asteroids[i].currentFrame=0;
	}
  }  
};
	
var player = new (function(){  
//create new object based on function and assign   
//what it returns to the 'player' variable  
  
    var that = this;  
//'that' will be the context now  
  
//attributes  
    that.images = [];  
	
  this.images = spacerocks.utils.get32Images("Corvette");
//create new Image and set it's source to the   
//'angel.png' image I upload above  
  
	that.currentFrame = 0;
  
    that.width = 32;  
//width of the single frame  
    that.height = 32;  
//height of the single frame  
  
    that.X = 0;  
    that.Y = 0;  
	that.xVel = 0;
	that.yVel = 0;
//X&Y position  
  
//methods   
    that.setPosition = function(x, y){  
    that.X = x;  
    that.Y = y;
};
  
    that.draw = function(){  
        try {  
            ctx.drawImage(that.images[that.currentFrame], 0, 0, that.width, that.height, that.X, that.Y, that.width, that.height);  
//cutting source image and pasting it into destination one, drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)  
        } catch (e) {  
//sometimes, if character's image is too big and will not load until the drawing of the first frame, Javascript will throws error and stop executing everything. To avoid this we have to catch an error and retry painting in another frame. It is invisible for the user with 50 frames per second.  
        }  
    };  
	
	that.accelerate = function(){
		var degree = (((11.25 * that.currentFrame) - 90) * Math.PI) / 180;
		that.xVel += Math.cos(degree) * delta * 200;
		that.yVel += Math.sin(degree) * delta * 200;
	}
	
	that.update = function(){
		that.X += that.xVel * delta;
		that.Y += that.yVel * delta;
		
		if (that.X < -32)
		{
			that.X += width + 32;
		}
		else if (that.X > width + 32)
		{
			that.X -= width + 32;
		}
		if (that.Y < -32)
		{
			that.Y += height + 32;
		}
		else if (that.Y > height + 32)
		{
			that.Y -= height + 32;
		}
	}
	
	that.rotate = function(direction){
		if (direction)
		{
			that.currentFrame++;
			if (that.currentFrame == 32)
			{
				that.currentFrame = 0;
			}
		}
		else
		{
			that.currentFrame--;
			if (that.currentFrame < 0)
			{
				that.currentFrame = 31;
			}
		}
	}
	
})();  
//we immediately execute the function above and   
//assign its result to the 'player' variable  
//as a new object   
  
player.setPosition(~~((width-player.width)/2),  ~~((height - player.height)/2));  
//our character is ready, let's move it   
//to the center of the screen,  
//'~~' returns nearest lower integer from  
//given float, equivalent of Math.floor()  
CreateLevel();

var GameLoop = function(){  
  clear();  
  inputCommands.Update(keyState);
  for (var i = 0; i < inputCommands.Commands.length; i++)
  {
	switch (inputCommands.Commands[i])
	{
		case "Rotate Clockwise":
		{
			player.rotate(true);
		} break;
		case "Rotate Counter Clockwise":
		{
			player.rotate(false);
		} break;
		case "Thrust":
		{
			player.accelerate();
		}
	}
  }
  setDelta();
  MoveAsteroids(5);  
  DrawAsteroids();
  player.update();
  player.draw();  
  mainMenu.Draw();
  gLoop = setTimeout(GameLoop, 1000 / 50);  
};
