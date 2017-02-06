var app = {
	quotes: ["Without Contraries is no progression.", "Attraction and Repulsion, Reason and Energy, Love and Hate, are necessary to Human existence.", "From these contraries spring what the religious call Good & Evil.", "Good is the passive that obeys Reason.", "Evil is the active springing from Energy.", "Good is Heaven. Evil is Hell.", "All Bibles or sacred codes have been the causes of the following Errors:", "1. That Man has two real existing principles: a Body & a Soul.", "2. That Energy, call'd Evil, is alone from the Body, & that Reason, call'd Good, is alone from the Soul.", "3. That God will torment Man in Eternity for following his Energies.", "Those who restrain desire, do so because theirs is weak enough to be restrained.", "I was walking among the fires of hell, delighted with the enjoyments of Genius; which to Angels look like torment and insanity.", "The road of excess leads to the palace of wisdom.", "Prudence is a rich ugly old maid courted by Incapacity.", "Dip him in the river who loves water.", "He whose face gives no light, shall never become a star.", "Eternity is in love with the productions of time.", "The most sublime act is to set another before you.", "Shame is Prides cloke.", "Prisons are built with stones of Law, Brothels with bricks of Religion.", "If the doors of perception were cleansed every thing would appear to man as it is, infinite.", "For man has closed himself up, till he sees all things thro' narow chinks of his cavern."],

	init: function() {

		var quoteCount = app.quotes.length;
		var quoteIndex = 0;
		var currentQuote = app.quotes[0];
		var currentQuoteLength = currentQuote.length;
		var currentLetter = 0;
		var currentQuoteString = "";

		var runnerSpeed = getRandomIntInclusive(60, 120);
		var quoteTimer  = setInterval(function(){ quoteRunner(); }, 60);

		$quoteContainer = $('#quote');

		function quoteRunner() {
			if (currentLetter < currentQuoteLength) {
				currentQuoteString += currentQuote[currentLetter];
				$quoteContainer.html( currentQuoteString );

				currentLetter += 1;

				clearInterval(quoteTimer);
				runnerSpeed = getRandomIntInclusive(60, 120);
				quoteTimer  = setInterval(function(){ quoteRunner(); }, runnerSpeed);
			}
			else if ( app.quotes[quoteIndex+1] ) {
				quoteIndex += 1;
				currentQuote = app.quotes[quoteIndex];
				currentQuoteLength = currentQuote.length;
				currentQuoteString = "";
				currentLetter = 0;

				clearInterval(quoteTimer);
				setTimeout(function() {
					runnerSpeed = getRandomIntInclusive(60, 120);
					quoteTimer = setInterval(function(){ quoteRunner(); }, runnerSpeed);
				}, 1000);
			}
			else {
				quoteIndex = 0;
				currentQuote = app.quotes[quoteIndex];
				currentQuoteLength = currentQuote.length;
				currentQuoteString = "";
				currentLetter = 0;

				clearInterval(quoteTimer);

				setTimeout(function() {
					runnerSpeed = getRandomIntInclusive(60, 120);
					quoteTimer = setInterval(function(){ quoteRunner(); }, runnerSpeed);
				}, 1000);
			}
		}

		function draw() {
			requestAnimationFrame(draw);
			// Drawing code goes here
		}
		draw();

	}
};

$(document).ready(function() {

	app.init();

});
