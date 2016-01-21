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

function randInt(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

function svgasimg() {
	return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
}