/*
 *
 * LOADING
 *
 */

// Runs through image array and executes callback
function loadTheseThen(imageArray, callback){
	var len = imageArray.length;
	var loadCounter = 0;
	for(var i = 0; i < len; i++) {
		$(document.createElement('img')).attr('src', $(imageArray[i]).attr('src')).one("load", function() {
			// console.log(imageArray[i] + 'is loaded');
			loadCounter++;
			if(loadCounter === len) {
				callback("all are loaded");
			}
		}).each(function() {
			if(this.complete) $(this).trigger("load");
		});
	}
}

/*
 *
 * MATHEMATICS
 *
 */

/*
 * Map numbers between two value ranges
 */

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
	return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

/*
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */

Number.prototype.clamp = function(min, max) {
	return Math.min(Math.max(this, min), max);
};

/*
 * Returns a random number between 0 (inclusive) and 1 (exclusive)
 */

function getRandom() {
	return Math.random();
}

/*
 * Returns a random number between min (inclusive) and max (exclusive)
 */

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

/* 
 * Returns a random integer between min (included) and max (excluded)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
/*
 * Returns a random integer between min (included) and max (included)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomIntInclusive(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function svgasimg() {
	return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
}

/*
 * ---------------------
 * LISTENER CAN ONLY BE EVOKED SO AND SO MANY TIMES
 * ---------------------
 */

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
/*
 * USAGE:
 * 
var myEfficientFn = debounce(function() {
	// All the taxing stuff you do
}, 250);
window.addEventListener('resize', myEfficientFn);
*/

/*
 * ---------------------
 * IF OR ELSE CONDITION IS MET
 * ---------------------
 */

function poll(fn, callback, errback, timeout, interval) {
	var endTime = Number(new Date()) + (timeout || 2000);
	interval = interval || 100;

	(function p() {
			// If the condition is met, we're done! 
			if(fn()) {
				callback();
			}
			// If the condition isn't met but the timeout hasn't elapsed, go again
			else if (Number(new Date()) < endTime) {
				setTimeout(p, interval);
			}
			// Didn't match and too much time, reject!
			else {
				errback(new Error('timed out for ' + fn + ': ' + arguments));
			}
	})();
}

/*
 * Usage:  ensure element is visible
 * 
poll(
	function() {
		return document.getElementById('lightbox').offsetWidth > 0;
	},
	function() {
		// Done, success callback
	},
	function() {
		// Error, failure callback
	}
);
*/

/*
 * ---------------------
 * FIRE ONCE ONLY
 * ---------------------
 */

function once(fn, context) { 
	var result;

	return function() { 
		if(fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	};
}

/*
 * USAGE:
 * 
var canOnlyFireOnce = once(function() {
	console.log('Fired!');
});
*/

/*
 *
 * COOKIES
 *
 */

function getCookie( name ) {	

	var start = document.cookie.indexOf( name + "=" );

	var len = start + name.length + 1;

	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {

		return null;

	}

	if ( start == -1 ) return null;

	var end = document.cookie.indexOf( ';', len );

	if ( end == -1 ) end = document.cookie.length;

	return unescape( document.cookie.substring( len, end ) );

}

function setCookie( name, value, expires, path, domain, secure ) {

	var today = new Date();

	today.setTime( today.getTime() );

	if ( expires ) {

		expires = expires * 1000 * 60 * 60 * 24;

	}

	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name+'='+escape( value ) +

		( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()

		( ( path ) ? ';path=' + path : '' ) + 

		( ( domain ) ? ';domain=' + domain : '' ) +

		( ( secure ) ? ';secure' : '' );

}

function deleteCookie( name, path, domain ) {

	if ( getCookie( name ) ) document.cookie = name + '=' +

			( ( path ) ? ';path=' + path : '') +

			( ( domain ) ? ';domain=' + domain : '' ) +

			';expires=Thu, 01-Jan-1970 00:00:01 GMT';

}