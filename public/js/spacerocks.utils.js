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

/*global $, spacerocks */

spacerocks.utils = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {},
    stateMap  = {},
    jqueryMap = {},

    getResourceFolder, setJqueryMap, configModule, get32Images,
    getShortestDistance, getMomentumNumber;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  getResourceFolder = function () {
    return 'resources';
  };
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    jqueryMap = { $container : $container };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  // example: onClickButton = ...
  //-------------------- END EVENT HANDLERS --------------------



  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin public method /get32Images/
  // Purpose    : Gets images with number suffixes in order
  // Arguments  : The base or root part of the image name
  // Returns    : string[]
  // Throws     : error (if you pass in an undefined or empty image name)
  //
  get32Images = function ( imageName ) {
    var 
      image, j, path, numString,
      images = [];

    for (j = 1; j <= 32; ++j) {
      numString = String(j);
      if (numString.length < 2) {
        numString = "0" + numString;
      }
      path = getResourceFolder() + '/' + imageName + numString + '.png'; 
      image = new Image();
      image.src = path;
      images.push(image); 
    }
    
    return images;
  };
  // end public method /get32Images/
  //
  // Begin public method /getMomentumNumber/
  // Purpose    : Something to do with classical physics
  // Arguments  : the collider and collidee and a distance object
  // Returns    : the momentum number
  //
  getMomentumNumber = function ( collider, collidee, distance  ) {
    return 2
      * collidee.mass
      * (((distance.vector.x / distance.scalar) * (collidee.xVel - collider.xVel)) + ((distance.vector.y / distance.scalar) * (collidee.yVel - collider.yVel)))
      / (collider.mass + collidee.mass);
  };
  // end public method /getMomentumNumber/

  // Begin public method /getShortestDistance/
  // Purpose    : Gets distance between two points
  // Arguments  : 2 points, and the dimensions of the level the points are in
  // Returns    : an object holding a scalar and a vector. Both represent distance.
  // Throws     : error (if you pass in an undefined or empty image name)
  //
  getShortestDistance = function ( point1, point2, levelDimensions ) {
    var xDistance, yDistance,
      halfWidth = levelDimensions.width/2,
      halfHeight = levelDimensions.height/2;

    xDistance = Math.abs(point1.x - point2.x);
    //On the surface of a spherical or pseudo-spherical world, 
    //the farthest away two points can be is halfway around the world.
    if (xDistance !== halfWidth) {
      if (xDistance > halfWidth) {
        xDistance = levelDimensions.width - xDistance;
      }
    }

    yDistance = Math.abs(point1.y - point2.y);
    if (yDistance !== halfHeight) {
      if (yDistance > halfHeight) {
        yDistance = levelDimensions.height - yDistance;
      }
    }
    
    return {
      scalar: Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)),
      vector: { x: xDistance, y: yDistance }
    };
  };
  // end public method /getShortestDistance/

  // return public methods
  return {
    get32Images : get32Images,
    getShortestDistance : getShortestDistance,
    getMomentumNumber : getMomentumNumber
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
