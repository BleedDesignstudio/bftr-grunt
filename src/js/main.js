/*
 *
 * REQUIRE
 * -
 * Require all the necessary JavaScript
 * dependencies to run the application.
 *
 */

// Modernizr
require('browsernizr/test/css/rgba');
require('browsernizr/test/touchevents');
require('browsernizr');
var Modernizr = require('browsernizr');

// Common Bleed functions
var bftrfunc = require('npm-bftrfunc');

// jQuery
$ = require('jquery');

// Greensock
require('gsap/CSSPlugin');
require('gsap/TweenMax');

// Misc.
var slick = require('slick-carousel');
var requestAnimationFrame = require('requestanimationframe');
var marked = require('marked');

/*
 *
 * THE APPLICATION
 * -
 * Require all the necessary JavaScript
 * dependencies to run the application.
 *
 */

var app = {
	init: function() {
		app.initMarkDown();
		app.initReadMe();
	},

	initMarkDown: function() {
		marked.setOptions({
		  renderer: new marked.Renderer(),
		  gfm:         true,
		  tables:      true,
		  breaks:      false,
		  pedantic:    false,
		  sanitize:    false,
		  smartLists:  true,
		  smartypants: false
		});
	},
	initReadMe: function() {
		$.ajax({
			url: "readme.md",
			type: "GET"
		})
		.done(function(data) {
			$('#inject-readme').html( marked(data) );
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			 $('#inject-readme').html('Failed to load readme.md');
		});
	}
};

$(document).ready(function() {
	app.init();
});

window.app = app;
