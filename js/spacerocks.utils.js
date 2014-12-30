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

    getResourceFolder, setJqueryMap, configModule, get32Images;
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
  // end public method /configmodule/

  // return public methods
  return {
    get32Images : get32Images
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
