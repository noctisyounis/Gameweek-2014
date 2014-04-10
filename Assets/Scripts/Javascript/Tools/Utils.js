Random = 
{
	/* Name of functions
	
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
	* a(amplitude) 
	* p(period)
	* s(overshoot amount)

	* Graphical representation: 

	* http://blog.26interactive.com/wp-content/uploads/2012/02/Untitled-1.jpg

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
		InOut: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2*t*t*t + b;t -= 2;return c/2*(t*t*t + 2) + b;}
	},

	Quartic:
	{
		In: function (t, b, c, d) {t /= d;return c*t*t*t*t + b;},
		Out: function (t, b, c, d) {t /= d;t--;return -c * (t*t*t*t - 1) + b;},
		InOut: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2*t*t*t*t + b;t -= 2;return -c/2 * (t*t*t*t - 2) + b;}
	},
	
	Quintic:
	{
		In: function (t, b, c, d) {t /= d;return c*t*t*t*t*t + b;},
		Out: function (t, b, c, d) {t /= d;t--;return c*(t*t*t*t*t + 1) + b;},
		InOut: function (t, b, c, d) {t /= d/2;if (t < 1) return c/2*t*t*t*t*t + b;t -= 2;return c/2*(t*t*t*t*t + 2) + b;}
	},

	Sinusoidale:
	{
		In: function (t, b, c, d) {return -c * Math.cos(t/d * (Math.PI/2)) + c + b;},
		Out: function (t, b, c, d) {return c * Math.sin(t/d * (Math.PI/2)) + b;},
		InOut: function (t, b, c, d) {return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;}
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
	Time: 0, DeltaTime: 0, TimeScale: 1, Fps:0,

	GetTimeWhenGameBegin: function () {return this.TimeWhenGameBegin;},
	GetTimeSinceGameBegin: function () {return new Date().getTime() - this.TimeWhenGameBegin;},

	GetTimeWhenLevelLoaded: function() {return this.TimeWhenLevelLoaded;},
	GetTimeSinceLevelLoaded: function() {return new Date().getTime() - this.TimeWhenLevelLoaded},

	// Don't use the function and variable below
	
	TimeWhenGameBegin: new Date().getTime(), avgDelay: 0, TimeOfLastFrame: 0,
	LevelLoaded: function() { Time.TimeWhenLevelLoaded = new Date().getTime();},
	SetTimeValues: function (){this.Time = Date.now(); this.DeltaTime = (this.Time - this.TimeOfLastFrame) / 1000; this.avgDelay += ((this.Time - this.TimeOfLastFrame) - this.avgDelay) / 10;this.Fps = (1000/this.avgDelay).toFixed(1);this.TimeOfLastFrame = this.Time;}
};

Dialogue = 
{
	//Settings
	interval: 0, shortInterval: 1, mediumInterval: 2, longInterval: 3,

	//Dont touch these variables
	words: [], letters: [], intervalCountdown: 0, destination: "", finished: true,

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
    },
    
    // System
    Write: function(str, x, y)
    {
	    for(var i = 0; i <= str.length; ++i)
	    {
	        var ch = str.charAt(i);
	        ctx.fillStyle = "red"; /************ FAIRE LA GESTION DE LA COULEUR DU TEXT ICI ***********/
	        ctx.fillText(ch, x, y);
	        x += ctx.measureText(ch).width;
	    }
	}
};


Gfx = 
{
	GetRandomColor: function(){return "rgb("+ Math.floor(Math.random()*256)+ "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) +")";},
	
	Filters: 
	{
		Greyscale: function(affectedScreenZone){var pixels = ctx.getImageData(affectedScreenZone.x, affectedScreenZone.y, affectedScreenZone.w, affectedScreenZone.h);var d = pixels.data;for (var i=0; i<d.length; i+=4) {var r = d[i]; var g = d[i+1]; var b = d[i+2];var v = 0.2126*r + 0.7152*g + 0.0722*b;d[i] = d[i+1] = d[i+2] = v}ctx.putImageData(pixels, affectedScreenZone.x, affectedScreenZone.y);},
		Blur: function(affectedScreenZone, power, blurAlpha) {if (isNaN(power) || power < 1 ) return;if (blurAlpha)boxBlurCanvasRGBA(affectedScreenZone, power);else boxBlurCanvasRGB(affectedScreenZone, power);},


		Flash: function()
		{

		}

	}
}


function boxBlurCanvasRGBA(affectedScreenZone, radius)
{
	var mul_table = [ 1,57,41,21,203,34,97,73,227,91,149,62,105,45,39,137,241,107,3,173,39,71,65,238,219,101,187,87,81,151,141,133,249,117,221,209,197,187,177,169,5,153,73,139,133,127,243,233,223,107,103,99,191,23,177,171,165,159,77,149,9,139,135,131,253,245,119,231,224,109,211,103,25,195,189,23,45,175,171,83,81,79,155,151,147,9,141,137,67,131,129,251,123,30,235,115,113,221,217,53,13,51,50,49,193,189,185,91,179,175,43,169,83,163,5,79,155,19,75,147,145,143,35,69,17,67,33,65,255,251,247,243,239,59,29,229,113,111,219,27,213,105,207,51,201,199,49,193,191,47,93,183,181,179,11,87,43,85,167,165,163,161,159,157,155,77,19,75,37,73,145,143,141,35,138,137,135,67,33,131,129,255,63,250,247,61,121,239,237,117,29,229,227,225,111,55,109,216,213,211,209,207,205,203,201,199,197,195,193,48,190,47,93,185,183,181,179,178,176,175,173,171,85,21,167,165,41,163,161,5,79,157,78,154,153,19,75,149,74,147,73,144,143,71,141,140,139,137,17,135,134,133,66,131,65,129,1];
var shg_table = [0,9,10,10,14,12,14,14,16,15,16,15,16,15,15,17,18,17,12,18,16,17,17,19,19,18,19,18,18,19,19,19,20,19,20,20,20,20,20,20,15,20,19,20,20,20,21,21,21,20,20,20,21,18,21,21,21,21,20,21,17,21,21,21,22,22,21,22,22,21,22,21,19,22,22,19,20,22,22,21,21,21,22,22,22,18,22,22,21,22,22,23,22,20,23,22,22,23,23,21,19,21,21,21,23,23,23,22,23,23,21,23,22,23,18,22,23,20,22,23,23,23,21,22,20,22,21,22,24,24,24,24,24,22,21,24,23,23,24,21,24,23,24,22,24,24,22,24,24,22,23,24,24,24,20,23,22,23,24,24,24,24,24,24,24,23,21,23,22,23,24,24,24,22,24,24,24,23,22,24,24,25,23,25,25,23,24,25,25,24,22,25,25,25,24,23,24,25,25,25,25,25,25,25,25,25,25,25,25,23,25,23,24,25,25,25,25,25,25,25,25,25,24,22,25,25,23,25,25,20,24,25,24,25,25,22,24,25,24,25,24,25,25,24,25,25,25,25,22,25,25,25,24,25,24,25,18];

	if ( isNaN(radius) || radius < 1 ) return; radius |= 0;
	
	var iterations = 1;
	var imageData = ctx.getImageData(affectedScreenZone.x, affectedScreenZone.y, affectedScreenZone.w, affectedScreenZone.h);
	
	var pixels = imageData.data;
		
	var rsum,gsum,bsum,asum,x,y,i,p,p1,p2,yp,yi,yw,idx,pa;		
	var wm = width - 1;
  	var hm = height - 1;
    var wh = width * height;
	var rad1 = radius + 1;
    
	var mul_sum = mul_table[radius];
	var shg_sum = shg_table[radius];

	var r = [];
    var g = [];
    var b = [];
	var a = [];
	
	var vmin = [];
	var vmax = [];
  
	while ( iterations-- > 0 ){
		yw = yi = 0;
	 
		for ( y=0; y < height; y++ ){
			rsum = pixels[yw]   * rad1;
			gsum = pixels[yw+1] * rad1;
			bsum = pixels[yw+2] * rad1;
			asum = pixels[yw+3] * rad1;
			
			
			for( i = 1; i <= radius; i++ ){
				p = yw + (((i > wm ? wm : i )) << 2 );
				rsum += pixels[p++];
				gsum += pixels[p++];
				bsum += pixels[p++];
				asum += pixels[p]
			}
			
			for ( x = 0; x < affectedScreenZone.w; x++ ) {
				r[yi] = rsum;
				g[yi] = gsum;
				b[yi] = bsum;
				a[yi] = asum;

				if( y==0) {
					vmin[x] = ( ( p = x + rad1) < wm ? p : wm ) << 2;
					vmax[x] = ( ( p = x - radius) > 0 ? p << 2 : 0 );
				} 
				
				p1 = yw + vmin[x];
				p2 = yw + vmax[x];
				  
				rsum += pixels[p1++] - pixels[p2++];
				gsum += pixels[p1++] - pixels[p2++];
				bsum += pixels[p1++] - pixels[p2++];
				asum += pixels[p1]   - pixels[p2];
					 
				yi++;
			}
			yw += ( affectedScreenZone.w << 2 );
		}
	  
		for ( x = 0; x < affectedScreenZone.w; x++ ) {
			yp = x;
			rsum = r[yp] * rad1;
			gsum = g[yp] * rad1;
			bsum = b[yp] * rad1;
			asum = a[yp] * rad1;
			
			for( i = 1; i <= radius; i++ ) {
			  yp += ( i > hm ? 0 : affectedScreenZone.w );
			  rsum += r[yp];
			  gsum += g[yp];
			  bsum += b[yp];
			  asum += a[yp];
			}
			
			yi = x << 2;
			for ( y = 0; y < affectedScreenZone.h; y++) {
				
				pixels[yi+3] = pa = (asum * mul_sum) >>> shg_sum;
				if ( pa > 0 )
				{
					pa = 255 / pa;
					pixels[yi]   = ((rsum * mul_sum) >>> shg_sum) * pa;
					pixels[yi+1] = ((gsum * mul_sum) >>> shg_sum) * pa;
					pixels[yi+2] = ((bsum * mul_sum) >>> shg_sum) * pa;
				} else {
					pixels[yi] = pixels[yi+1] = pixels[yi+2] = 0;
				}				
				if( x == 0 ) {
					vmin[y] = ( ( p = y + rad1) < hm ? p : hm ) * affectedScreenZone.w;
					vmax[y] = ( ( p = y - radius) > 0 ? p * affectedScreenZone.w : 0 );
				} 
			  
				p1 = x + vmin[y];
				p2 = x + vmax[y];

				rsum += r[p1] - r[p2];
				gsum += g[p1] - g[p2];
				bsum += b[p1] - b[p2];
				asum += a[p1] - a[p2];

				yi += affectedScreenZone.w << 2;
			}
		}
	}
	
	ctx.putImageData( imageData, affectedScreenZone.x, affectedScreenZone.y );
	
}

var mul_table = [ 1,57,41,21,203,34,97,73,227,91,149,62,105,45,39,137,241,107,3,173,39,71,65,238,219,101,187,87,81,151,141,133,249,117,221,209,197,187,177,169,5,153,73,139,133,127,243,233,223,107,103,99,191,23,177,171,165,159,77,149,9,139,135,131,253,245,119,231,224,109,211,103,25,195,189,23,45,175,171,83,81,79,155,151,147,9,141,137,67,131,129,251,123,30,235,115,113,221,217,53,13,51,50,49,193,189,185,91,179,175,43,169,83,163,5,79,155,19,75,147,145,143,35,69,17,67,33,65,255,251,247,243,239,59,29,229,113,111,219,27,213,105,207,51,201,199,49,193,191,47,93,183,181,179,11,87,43,85,167,165,163,161,159,157,155,77,19,75,37,73,145,143,141,35,138,137,135,67,33,131,129,255,63,250,247,61,121,239,237,117,29,229,227,225,111,55,109,216,213,211,209,207,205,203,201,199,197,195,193,48,190,47,93,185,183,181,179,178,176,175,173,171,85,21,167,165,41,163,161,5,79,157,78,154,153,19,75,149,74,147,73,144,143,71,141,140,139,137,17,135,134,133,66,131,65,129,1];
var shg_table = [0,9,10,10,14,12,14,14,16,15,16,15,16,15,15,17,18,17,12,18,16,17,17,19,19,18,19,18,18,19,19,19,20,19,20,20,20,20,20,20,15,20,19,20,20,20,21,21,21,20,20,20,21,18,21,21,21,21,20,21,17,21,21,21,22,22,21,22,22,21,22,21,19,22,22,19,20,22,22,21,21,21,22,22,22,18,22,22,21,22,22,23,22,20,23,22,22,23,23,21,19,21,21,21,23,23,23,22,23,23,21,23,22,23,18,22,23,20,22,23,23,23,21,22,20,22,21,22,24,24,24,24,24,22,21,24,23,23,24,21,24,23,24,22,24,24,22,24,24,22,23,24,24,24,20,23,22,23,24,24,24,24,24,24,24,23,21,23,22,23,24,24,24,22,24,24,24,23,22,24,24,25,23,25,25,23,24,25,25,24,22,25,25,25,24,23,24,25,25,25,25,25,25,25,25,25,25,25,25,23,25,23,24,25,25,25,25,25,25,25,25,25,24,22,25,25,23,25,25,20,24,25,24,25,25,22,24,25,24,25,24,25,25,24,25,25,25,25,22,25,25,25,24,25,24,25,18];


function boxBlurCanvasRGB(affectedScreenZone, radius)
{
	if ( isNaN(radius) || radius < 1 ) return; radius |= 0;
	
	var iterations = 1;
	var imageData = ctx.getImageData(affectedScreenZone.x, affectedScreenZone.y, affectedScreenZone.w, affectedScreenZone.h);
	
	var pixels = imageData.data;
		
	var rsum,gsum,bsum,asum,x,y,i,p,p1,p2,yp,yi,yw,idx;		
	var wm = affectedScreenZone.w - 1;
  	var hm = affectedScreenZone.h - 1;
    var wh = affectedScreenZone.w * affectedScreenZone.h;
	var rad1 = radius + 1;
   
	var r = [];
    var g = [];
    var b = [];
	
	var mul_sum = mul_table[radius];
	var shg_sum = shg_table[radius];
	
	var vmin = [];
	var vmax = [];
  
	while ( iterations-- > 0 ){
		yw = yi = 0;
	 
		for ( y=0; y < affectedScreenZone.h; y++ ){
			rsum = pixels[yw]   * rad1;
			gsum = pixels[yw+1] * rad1;
			bsum = pixels[yw+2] * rad1;
			
			for( i = 1; i <= radius; i++ ){
				p = yw + (((i > wm ? wm : i )) << 2 );
				rsum += pixels[p++];
				gsum += pixels[p++];
				bsum += pixels[p++];
			}
			
			for ( x = 0; x < width; x++ ){
				r[yi] = rsum;
				g[yi] = gsum;
				b[yi] = bsum;
				
				if( y==0) {
					vmin[x] = ( ( p = x + rad1) < wm ? p : wm ) << 2;
					vmax[x] = ( ( p = x - radius) > 0 ? p << 2 : 0 );
				} 
				
				p1 = yw + vmin[x];
				p2 = yw + vmax[x];
				  
				rsum += pixels[p1++] - pixels[p2++];
				gsum += pixels[p1++] - pixels[p2++];
				bsum += pixels[p1++] - pixels[p2++];
				 
				yi++;
			}
			yw += ( affectedScreenZone.w << 2 );
		}
	  
		for ( x = 0; x < affectedScreenZone.w; x++ ){
			yp = x;
			rsum = r[yp] * rad1;
			gsum = g[yp] * rad1;
			bsum = b[yp] * rad1;
				
			for( i = 1; i <= radius; i++ ){
			  yp += ( i > hm ? 0 : affectedScreenZone.w);
			  rsum += r[yp];
			  gsum += g[yp];
			  bsum += b[yp];
			}
			
			yi = x << 2;
			for ( y = 0; y < affectedScreenZone.h; y++){
				pixels[yi]   = (rsum * mul_sum) >>> shg_sum;
				pixels[yi+1] = (gsum * mul_sum) >>> shg_sum;
				pixels[yi+2] = (bsum * mul_sum) >>> shg_sum;
		   
				if( x == 0 ) {
					vmin[y] = ( ( p = y + rad1) < hm ? p : hm ) * affectedScreenZone.w;
					vmax[y] = ( ( p = y - radius) > 0 ? p * affectedScreenZone.w : 0 );
				} 
				  
				p1 = x + vmin[y];
				p2 = x + vmax[y];

				rsum += r[p1] - r[p2];
				gsum += g[p1] - g[p2];
				bsum += b[p1] - b[p2];
				  
				yi += affectedScreenZone.w << 2;
			}
		}
	}
	ctx.putImageData( imageData, affectedScreenZone.x, affectedScreenZone.y );
	
}



