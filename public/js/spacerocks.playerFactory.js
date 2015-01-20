/*
 * module_template.js
 * Template for browser feature modules
 *
 * Michael S. Mikowski - mike.mikowski@gmail.com
 * Copyright (c) 2011-2012 Manning Publications Co.
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $,spacerocks*/

spacerocks.playerFactory = (function () {
  var playerProto, makePlayer;

  playerProto = {
    type: "player",
    setPosition: function(x, y){  
      this.X = x;  
      this.Y = y;
    },
    draw: function(ctx) {  
      try {  
        ctx.drawImage(this.images[this.currentFrame], 0, 0, this.width, this.height, this.X, this.Y, this.width, this.height);  
        //cutting source image and pasting it into destination one, drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)  
      } catch (e) {  
        //sometimes, if character's image is too big and will not load until the drawing of the first frame, Javascript will throws error and stop executing everything. To avoid this we have to catch an error and retry painting in another frame. It is invisible for the user with 50 frames per second.  
      }  
    },
	  accelerate: function (delta) {
      var degree = (((11.25 * this.currentFrame) - 90) * Math.PI) / 180;
      this.xVel += Math.cos(degree) * delta * 200;
      this.yVel += Math.sin(degree) * delta * 200;
	  },
	  update: function(delta){
      this.X += this.xVel * delta;
      this.Y += this.yVel * delta;
    },
	  rotate: function(direction){
      if (direction)
      {
        this.currentFrame++;
        if (this.currentFrame === 32)
        {
          this.currentFrame = 0;
        }
      }
      else
      {
        this.currentFrame--;
        if (this.currentFrame < 0)
        {
          this.currentFrame = 31;
        }
      }
    }

  }; //end of playerProto
	
  makePlayer = function() {
    var player =  Object.create(playerProto);
    player.images = spacerocks.utils.get32Images("Corvette");
	  player.currentFrame = 0;
    player.width = 32;
    player.height = 32;
    player.radius = player.width/2;
    player.X = 0;
    player.Y = 0;
	  player.xVel = 0;
	  player.yVel = 0;
    player.mass = 1;
    
    return player;
  };

  return {
    makePlayer : makePlayer
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
