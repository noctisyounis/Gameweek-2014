Random = 
{
	/*
	
	* RangeInt	 = Choose random value between min and max, return a int
	* RangeFloat = Choose random value between min and max, return a float 
	* InArray  	 = Return element of array randomly
	* InCircle 	 = Return a screen point in the circle sent in parameters (return {x, y})
	* InScreen	 = Return a screen randomly (return {x, y})

	*/
	RangeInt: function (min, max) {return Math.random() * (max - min) + min |0;},
	RangeFloat: function (min, max) {return Math.random() * (max - min) + min;},
	InArray: function(array) {array[Math.floor(Math.random() * array.length)]},
	InCircle: function(center, radius) {angle = rand(0, 360);d = Random.Range(0, radius);return {x: center.x + sin(angle)*d, y: center.y + cos(angle)*d};},
	InScreen: function() { return {x: Random.RangeInt(0, canvas.width),y: Random.RangeInt(0,canvas.height)}; }
};

Tween = 
{
	/* Name of functions:

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

	Quadratic: 
	{
		In: function (t, b, c, d) {t /= d;return c*t*t + b;}, 
		Out: function (t, b, c, d) {t /= d;return -c * t*(t-2) + b;},
		InOut: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2*t*t + b;t--;return -c/2 * (t*(t-2) - 1) + b;}
	},

	Cubic:
	{
		In: function (t, b, c, d) {t /= d;return c*t*t*t + b;},
		Out: function (t, b, c, d) {t /= d;t--;return c*(t*t*t + 1) + b;},
		InOut: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2*t*t*t + b;t -= 2;return c/2*(t*t*t + 2) + b;},
	},

	Quartic:
	{
		In: function (t, b, c, d) {t /= d;return c*t*t*t*t + b;},
		Out: function (t, b, c, d) {t /= d;t--;return -c * (t*t*t*t - 1) + b;},
		InOut: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2*t*t*t*t + b;t -= 2;return -c/2 * (t*t*t*t - 2) + b;},
	},
	
	Quintic:
	{
		In: function (t, b, c, d) {t /= d;return c*t*t*t*t*t + b;},
		Out: function (t, b, c, d) {t /= d;t--;return c*(t*t*t*t*t + 1) + b;},
		InOut: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2*t*t*t*t*t + b;t -= 2;return c/2*(t*t*t*t*t + 2) + b;},
	},

	Sinusoidale:
	{
		In: function (t, b, c, d) {return -c * Math.cos(t/d * (Math.PI/2)) + c + b;},
		Out: function (t, b, c, d) {return c * Math.sin(t/d * (Math.PI/2)) + b;},
		InOut: function (t, b, c, d) {return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;},	
	},


	Exponential:
	{
		In: function (t, b, c, d) {return c * Math.pow( 2, 10 * (t/d - 1) ) + b;},
		Out: function (t, b, c, d) {return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;},
		InOut: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;t--;return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;}
	},
	

	Circular:
	{
		In: function (t, b, c, d) {t /= d;return -c * (Math.sqrt(1 - t*t) - 1) + b;},
		Out: function (t, b, c, d) {t /= d;t--;return c * Math.sqrt(1 - t*t) + b;},
		InOut: function (t, b, c, d) {t /= d/2;if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;t -= 2;return c/2 * (Math.sqrt(1 - t*t) + 1) + b;}
	},

	Elastic: 
	{
		In: function (t, b, c, d, a, p) {if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3; if (a < Math.abs(c)) { a=c; var s=p/4; }else var s = p/(2*Math.PI) * Math.asin (c/a);return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;},
		Out: function (t, b, c, d, a, p) {if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;if (a < Math.abs(c)) { a=c; var s=p/4; } else var s = p/(2*Math.PI) * Math.asin (c/a);return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;},
		InOut:function (t, b, c, d, a, p) {if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);if (a < Math.abs(c)) { a=c; var s=p/4; }else var s = p/(2*Math.PI) * Math.asin (c/a);if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;}	
	},

	Back: 
	{
		In: function (t, b, c, d, s) {if (s == undefined) s = 1.70158;return c*(t/=d)*t*((s+1)*t - s) + b;},
		Out: function (t, b, c, d, s) {if (s == undefined) s = 1.70158;return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;},
		InOut: function (t, b, c, d, s) {if (s == undefined) s = 1.70158; if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;}
	},	

	Bounce:
	{
		In: function (t, b, c, d) {return c - Tween.Bounce.Out (d-t, 0, c, d) + b;},
		Out: function (t, b, c, d) {if ((t/=d) < (1/2.75)) {return c*(7.5625*t*t) + b;} else if (t < (2/2.75)) {return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;} else if (t < (2.5/2.75)) {return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;} else {return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;}},
		InOut: function (t, b, c, d) {if (t < d/2) return Tween.Bounce.In (t*2, 0, c, d) * .5 + b;return Tween.Bounce.Out (t*2-d, 0, c, d) * .5 + c*.5 + b;}
	}
};

Time = 
{
	Time: 0, 
	DeltaTime: 0,
	TimeScale: 1,
	Fps:0,

	GetTimeWhenGameBegin: function () {return this.TimeWhenGameBegin;},
	GetTimeSinceGameBegin: function () {return new Date().getTime() - this.TimeWhenGameBegin;},

	GetTimeWhenLevelLoaded: function() {return this.TimeWhenLevelLoaded;},
	GetTimeSinceLevelLoaded: function() {return new Date().getTime() - this.TimeWhenLevelLoaded},

	// Don't use the function and variable below
	TimeWhenGameBegin: new Date().getTime(),
	avgDelay: 0,
	TimeOfLastFrame: 0,

	LevelLoaded: function() { Time.TimeWhenLevelLoaded = new Date().getTime();},
	SetTimeValues: function (){this.Time = Date.now(); this.DeltaTime = (this.Time - this.TimeOfLastFrame) / 1000; this.avgDelay += ((this.Time - this.TimeOfLastFrame) - this.avgDelay) / 10;this.Fps = (1000/this.avgDelay).toFixed(1);this.TimeOfLastFrame = this.Time;}
};

Dialogue = 
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
				}
				else
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
								this.finished = false;
							}
							else 
								{
									this.finished = true;
									console.log("Sentence showed!");
								}
							return;
					}
				}
			}
		}
	},

	Interupt: function()
	{
		while(this.letters.length > 0)
		{
			this.destination += this.letters[0];
			this.letters.splice(0,1);
			console.log("letters " + this.letters.length);
		}

		while(this.words.length > 0)
		{
			if(this.words[0] == "[short]" || this.words[0] == "[medium]" || this.words[0] == "[long]") this.words.splice(0,1);
			else
			{
				this.destination += " " + this.words[0];
				this.words.splice(0,1);
				console.log("words " + this.words.length);
			}
		}
		console.log("Sentence skipped!");
		finished = true;
    }
};



































