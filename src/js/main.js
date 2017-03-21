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

class yoyo {
	constructor() {
		console.log('something');
	}
}

var app = {
	init: function() {
		//app.initMarkDown();
		//app.initReadMe();
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState === 1) {
				// send has been called. it will start
			}
			if (request.readyState === 3) {
				// loading
			}
			if (request.readyState === 4) {
				if (request.status === 200) {
					// all good, no problems
				}
				else {
					throw new Error(request.response);
				}

				// all done
				var data = JSON.parse(request.response);
				app.writePackageJSON(data);
			}
		};

		request.open('GET', 'package.json');
		request.send();

	},

	writePackageJSON: function(data) {
		var $depinject = $('#inject-deps');
		var deps = data.devDependencies;
		var keys = [];

		for (var k in deps) keys.push(k);
		$depinject.html('');

		for (var i = 0; i < keys.length; i++) {
			var sep = ( i == keys.length-1 ? '' : ' &middot; ');
			$depinject.append(keys[i]+sep);
		}
	},


	/*
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
	*/
};

$(document).ready(function() {
	app.init();
});

window.app = app;
