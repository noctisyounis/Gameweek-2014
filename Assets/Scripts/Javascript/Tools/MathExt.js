var Random = 
{
	Range: function (min, max) {return Math.random() * (max - min) + min;},
	InArray: function(array) {array[Math.floor(Math.random() * array.length)]},
	InCircle: function(center, radius) {angle = rand(0, 360);d = Random.Range(0, radius);return {x: center.x + sin(angle)*d, y: center.y + cos(angle)*d};}
};

var Tween = 
{
	/* Name of functions:

	* Quad 	= Quadratic
	* Cubic = Cubic
	* Quart = Quartic
	* Qunt 	= Quintic
	* Sine 	= Sinusoidale
	* Expo 	= Exponential
	* Circ 	= Circle

	* Linear: 	 	 no easing no accelleration 
	* In:  			 accelerating from zero velocity 
	* Out: 			 decelerating to zero velocity
	* InOut:  		 acceleration until halfway, then deceleration

	*/

	/* Parametres: 

	* t(time)     = current time
	* b(base)     = start value
	* c(change)   = change in value 
	* d(duration) = duration

	*/


	Linear: function (t, b, c, d) {return c*t/d + b;},
	// Quadratic
	InQuad: function (t, b, c, d) {t /= d;return c*t*t + b;}, 
	OutQuad: function (t, b, c, d) {t /= d;return -c * t*(t-2) + b;},
	InOutQuad: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2*t*t + b;t--;return -c/2 * (t*(t-2) - 1) + b;},
	// Cubic
	InCubic: function (t, b, c, d) {t /= d;return c*t*t*t + b;},
	OutCubic: function (t, b, c, d) {t /= d;t--;return c*(t*t*t + 1) + b;},
	InOutCubic: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2*t*t*t + b;t -= 2;return c/2*(t*t*t + 2) + b;},
	// Quartic
	InQuart: function (t, b, c, d) {t /= d;return c*t*t*t*t + b;},
	OutQuart: function (t, b, c, d) {t /= d;t--;return -c * (t*t*t*t - 1) + b;},
	InOutQuart: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2*t*t*t*t + b;t -= 2;return -c/2 * (t*t*t*t - 2) + b;},
	// Quintic
	InQuint: function (t, b, c, d) {t /= d;return c*t*t*t*t*t + b;},
	OutQuint: function (t, b, c, d) {t /= d;t--;return c*(t*t*t*t*t + 1) + b;},
	InOutQuint: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2*t*t*t*t*t + b;t -= 2;return c/2*(t*t*t*t*t + 2) + b;},
	// Sinusoidal
	InSine: function (t, b, c, d) {return -c * Math.cos(t/d * (Math.PI/2)) + c + b;},
	OutSine: function (t, b, c, d) {return c * Math.sin(t/d * (Math.PI/2)) + b;},
	InOutSine: function (t, b, c, d) {return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;},
	// Exponential
	InExpo: function (t, b, c, d) {return c * Math.pow( 2, 10 * (t/d - 1) ) + b;},
	OutExpo: function (t, b, c, d) {return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;},
	InOutExpo: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;t--;return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;},
	// Circlear
	InCirc: function (t, b, c, d) {t /= d;return -c * (Math.sqrt(1 - t*t) - 1) + b;},
	OutCirc: function (t, b, c, d) {t /= d;t--;return c * Math.sqrt(1 - t*t) + b;},
	InOutCirc: function (t, b, c, d) {t /= d/2;if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;t -= 2;return c/2 * (Math.sqrt(1 - t*t) + 1) + b;}
};

var Time = 
{
	Time: 0, 
	DeltaTime: 0,
	TimeScale: 1,
	TimeOfLastFrame: 0,

	GetTimeWhenGameBegin: function () {return this.TimeWhenGameBegin;},
	GetTimeSinceGameBegin: function () {return new Date().getTime() - this.TimeWhenGameBegin;},

	GetTimeWhenLevelLoaded: function() {return this.TimeWhenLevelLoaded;},
	GetTimeSinceLevelLoaded: function() {return new Date().getTime() - this.TimeWhenLevelLoaded},

	// Don't use the function and variable below
	TimeWhenGameBegin: new Date().getTime(),

	LevelLoaded: function() { Time.TimeWhenLevelLoaded = new Date().getTime();},
	SetDeltaTime: function (){this.Time = Date.now(); this.DeltaTime = (this.Time - this.TimeOfLastFrame) / 1000; this.TimeOfLastFrame = this.Time;}
}

Text.Scrolling = 
{
	//Settings
	interval: 0,
	
	shortInterval: 1, 
	mediumInterval: 2,
	longInterval: 3,

	//Dont touch this variables
	words: [],
	letters: [],
	intervalCountdown: 0,
	destination: "",
	finished: true,

	Begin: function(text, interval, destination) {this.words = text.split(" "); this.interval = interval; this.destination = destination; this.finished = false;},

	Continue: function()
	{
		if(!Application.LoadedLevel.GamePaused) // Si on est pas en pause 
		{
			this.intervalCountdown -= Time.DeltaTime;
			if(this.intervalCountdown <= 0 && this.words.length > -1) // Si on a attendu et qu'il reste des mots ou des lettres a afficher
			{
				if(this.letters.length > 0) // Si un mot est en cours d'affichage
				{
					this.destination += this.letters[0];
					this.letters.splice(0,1);
					this.intervalCountdown = this.interval;
					console.clear()
					console.log(this.destination);
					console.log("countdown fini + words " + this.words.length + " letters " + this.letters.length );
				}
				else// sinon passe au prochain mot
				{
					switch(this.words[0])
					{
						case "[short]":
							this.intervalCountdown += this.shortInterval;
							this.words.splice(0,1);
							return;

						case "[medium]":
							this.intervalCountdown += this.mediumInterval;
							this.words.splice(0,1);
							return;

						case "[long]":
							this.intervalCountdown += this.shortInterval;
							this.words.splice(0,1);
							return;

						default:
							if(this.words[0] != undefined)
							{
								this.letters = this.words[0].split("");
								this.words.splice(0,1);
								this.destination += " "; 
								finished = false;
							}
							else finished = true;
							return;
					}
				}
			}
		}
	},

	Interupt: function()
	{
		//finished = true;
	}
}



















