Random = 
{
/** **** Method of Random ****

* @prefix Random : All the extended method to generate random.wws

* @method RangeInt (): Choose randomly int between min and max.
* @param1 {float}: min.
* @param2 {float}: max.
* @return {int}: randomNumber.

* @method RangeFloat (): Choose randomly float between min and max.
* @param1 {float}: min.
* @param2 {float}: max.
* @return {float}: randomNumber.

* @method InArray (): Choose randomly element of array.
* @param1 {array}: array.
* @return {object}: randomElement.	 

* @method InCircle (): Choose randomly a point in a circle. 
* @param1 {structure}: {x: float, y:float}.
* @param2 	{float}:   radius.
* @return struture: {x: float, y: float}.

* @method InScreen (): Choose randomly a screen point.
* @return {structure}: {x:float, y:float}.

* @method Color (): Choose randomly RGB color.
* @return {string}: color      


*/
	RangeInt: function (min, max) {return Math.random() * (max - min) + min |0;},
	RangeFloat: function (min, max) {return Math.random() * (max - min) + min;},
	InArray: function(array) {array[Math.floor(Math.random() * array.length)]},
	InCircle: function(center, radius) {angle = rand(0, 360);d = Random.Range(0, radius);return {x: center.x + sin(angle)*d, y: center.y + cos(angle)*d};},
	InScreen: function() { return {x: Random.RangeInt(0, canvas.width),y: Random.RangeInt(0,canvas.height)};},
	Color: function(){return "rgb("+ Math.floor(Math.random()*256)+ "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) +")";}
};

Collision =
{
	BoxCollider: function(box1, box2)
	{
	   if((box2.x >= box1.x + box1.w)
	    || (box2.x + box2.w <= box1.x)
	    || (box2.y >= box1.y + box1.h)
	    || (box2.y + box2.h <= box1.y))
	          return false; 
	   else
	          return true; 
	},

PointCollider: function(curseur_x, curseur_y, box)
{
  return curseur_x >= box.x  && curseur_x < box.x + box.w&& curseur_y >= box.y && curseur_y < box.y + box.h ? true : false;
}
};

Debug = 
{
/** 												
* @prefix Debug: Contain all the property and the method of the extended class Debug.

													**** Property of Debug ****
* @property SpriteOutlineColor 																							  {string} 			 
* The gizmos color for the sprite bounds.

* @property ColliderOutlineColor 																						  {string} 			 
* The gizmos color for the collider bounds.


 													**** Methods of Debug ****

* @method Log (): console.log() alternative.
* @param1 {string}: logMsg
 
* @method ShowStats(): show statistics from game on the canvas.
 
* @method Break(): alternative to debugger, create breakpoint.

*/

	SpriteOutlineColor: "grey", ColliderOutlineColor: "green",
	Log: function(logMsg)	{console.log(logMsg);},

	ShowStats: function(){
		ctx.fillStyle = "rgba(122,122,122, 0.4)";
		ctx.RoundedBox(2, 2, 100, 400, 3);
		ctx.font = "14px Georgia";
		if(Time.Fps > 40) ctx.fillStyle = "green";
		if(Time.Fps < 40) ctx.fillStyle = "orange";
		if(Time.Fps < 20) ctx.fillStyle = "red";

		ctx.fillText('Fps: ' + Time.Fps ,5,20);
		ctx.fillStyle = "white";

		ctx.fillText("Game: " + (Time.GetTimeSinceGameBegin() / 1000 |0), 5, 40);
		ctx.fillText("Scene: " + (Time.GetTimeSinceLevelLoaded() / 1000 |0), 5, 60);

		ctx.fillText("Mouse x: " + Math.floor(Input.MousePosition.x), 5, 90);
		ctx.fillText("Mouse y: " + Math.floor(Input.MousePosition.y), 5, 110);
		ctx.fillText("Click: " + Input.MouseClick, 5, 130);

		ctx.fillText("Scene: " + Application.LoadedLevel.name, 5, 190);
		ctx.fillText("GameObjects: ", 5, 220 );
		for(var i = 0; i < Application.LoadedLevel.GameObjects.length; i++)
		{
			ctx.fillText(Application.LoadedLevel.GameObjects[i].name , 5, 240 + i * 20);
		}
	},

	Break: function() { debugger; }
};

print = function (logMsg) {console.log(logMsg);};

Tween = 
{
/** **** method of Tween ****

* Linear: 	 	 no easing no accelleration 
* In:  			 accelerating from zero velocity 
* Out: 			 decelerating to zero velocity
* InOut:  		 acceleration until halfway, then deceleration

*/

/** **** Parametres ****

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
							this.intervalCountdown += this.longInterval;
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
    
    // Dont Touch the function below
    Write: function(str, x, y, color)
    {
    	ctx.fillStyle = color;
	    for(var i = 0; i <= str.length; ++i)
	    {
	        var ch = str.charAt(i);
	        switch(ch)
	        {
	        	case "§":
	        		ctx.fillStyle = ctx.fillStyle == color ? "red" : color;
	        		continue;        	
	        	
	        	case "°":
	        		ctx.fillStyle = ctx.fillStyle == color ? "green" : color; 
	        		continue;
	        }
	        ctx.fillText(ch, x, y);
	        x += ctx.measureText(ch).width;
	    }
	}
};

Gfx = 
{
	Filters: 
	{
		Greyscale: function(affectedScreenZone){var pixels = ctx.getImageData(affectedScreenZone.x, affectedScreenZone.y, affectedScreenZone.w, affectedScreenZone.h);var d = pixels.data;for (var i=0; i<d.length; i+=4) {var r = d[i]; var g = d[i+1]; var b = d[i+2];var v = 0.2126*r + 0.7152*g + 0.0722*b;d[i] = d[i+1] = d[i+2] = v}ctx.putImageData(pixels, affectedScreenZone.x, affectedScreenZone.y);},
		Sepia: function(affectedScreenZone) {var noise = 20;var imageData = ctx.getImageData(affectedScreenZone.x, affectedScreenZone.y, affectedScreenZone.w, affectedScreenZone.h);for (var i=0; i < imageData.data.length; i+=4) {imageData.data[i] = r[imageData.data[i]];imageData.data[i+1] = g[imageData.data[i+1]];imageData.data[i+2] = b[imageData.data[i+2]];if (noise > 0) {var noise = Math.round(noise - Math.random() * noise);for(var j=0; j<3; j++){var iPN = noise + imageData.data[i+j];imageData.data[i+j] = (iPN > 255) ? 255 : iPN;}}}ctx.putImageData(imageData, affectedScreenZone.x, affectedScreenZone.y);},
		Blur: function(affectedScreenZone, power, blurAlpha) {if (isNaN(power) || power < 1 ) return;if (blurAlpha)Gfx.Filters.boxBlurCanvasRGBA(affectedScreenZone, power);else Gfx.Filters.boxBlurCanvasRGB(affectedScreenZone, power);},
		Flash: function(affectedZone, power, color){ctx.fillStyle = "rgba(" + color.r +","+ color.g +","+ color.b +"," + power+")";ctx.fillRect(affectedScreenZone.x, affectedScreenZone.y, affectedScreenZone.w, affectedScreenZone.h);},

		//Don't touch the functions bellow
		boxBlurCanvasRGBA: function(affectedScreenZone, radius){if ( isNaN(radius) || radius < 1 ) return; radius |= 0;var iterations = 1;var imageData = ctx.getImageData(affectedScreenZone.x, affectedScreenZone.y, affectedScreenZone.w, affectedScreenZone.h);var pixels = imageData.data;var rsum,gsum,bsum,asum,x,y,i,p,p1,p2,yp,yi,yw,idx,pa;var wm = affectedScreenZone.w - 1;var hm = affectedScreenZone.h - 1;var wh = affectedScreenZone.w * affectedScreenZone.h;var rad1 = radius + 1;var mul_sum = mul_table[radius];var shg_sum = shg_table[radius];var r = [];var g = [];var b = [];var a = [];var vmin = [];var vmax = [];while ( iterations-- > 0 ){yw = yi = 0;for ( y=0; y < height; y++ ){rsum = pixels[yw]   * rad1;gsum = pixels[yw+1] * rad1;bsum = pixels[yw+2] * rad1;asum = pixels[yw+3] * rad1;for( i = 1; i <= radius; i++ ){p = yw + (((i > wm ? wm : i )) << 2 );rsum += pixels[p++];gsum += pixels[p++];bsum += pixels[p++];asum += pixels[p]}for ( x = 0; x < affectedScreenZone.w; x++ ) {r[yi] = rsum;g[yi] = gsum;b[yi] = bsum;a[yi] = asum;if( y==0) {vmin[x] = ( ( p = x + rad1) < wm ? p : wm ) << 2;vmax[x] = ( ( p = x - radius) > 0 ? p << 2 : 0 );} p1 = yw + vmin[x];p2 = yw + vmax[x]; rsum += pixels[p1++] - pixels[p2++];gsum += pixels[p1++] - pixels[p2++];bsum += pixels[p1++] - pixels[p2++];asum += pixels[p1]   - pixels[p2];yi++;}yw += ( affectedScreenZone.w << 2 );}for ( x = 0; x < affectedScreenZone.w; x++ ) {yp = x;rsum = r[yp] * rad1;gsum = g[yp] * rad1;bsum = b[yp] * rad1;asum = a[yp] * rad1;for( i = 1; i <= radius; i++ ) {yp += ( i > hm ? 0 : affectedScreenZone.w );rsum += r[yp];gsum += g[yp];bsum += b[yp];asum += a[yp];}	yi = x << 2;for ( y = 0; y < affectedScreenZone.h; y++) {pixels[yi+3] = pa = (asum * mul_sum) >>> shg_sum;if ( pa > 0 ){pa = 255 / pa;pixels[yi]   = ((rsum * mul_sum) >>> shg_sum) * pa;pixels[yi+1] = ((gsum * mul_sum) >>> shg_sum) * pa;pixels[yi+2] = ((bsum * mul_sum) >>> shg_sum) * pa;} else {pixels[yi] = pixels[yi+1] = pixels[yi+2] = 0;}if( x == 0 ) {vmin[y] = ( ( p = y + rad1) < hm ? p : hm ) * affectedScreenZone.w;vmax[y] = ( ( p = y - radius) > 0 ? p * affectedScreenZone.w : 0 );} p1 = x + vmin[y];p2 = x + vmax[y];rsum += r[p1] - r[p2];gsum += g[p1] - g[p2];bsum += b[p1] - b[p2];asum += a[p1] - a[p2];yi += affectedScreenZone.w << 2;}}}ctx.putImageData( imageData, affectedScreenZone.x, affectedScreenZone.y );},
		boxBlurCanvasRGB: function(affectedScreenZone, radius){if ( isNaN(radius) || radius < 1 ) return; radius |= 0;var iterations = 1;var imageData = ctx.getImageData(affectedScreenZone.x, affectedScreenZone.y, affectedScreenZone.w, affectedScreenZone.h);var pixels = imageData.data;var rsum,gsum,bsum,asum,x,y,i,p,p1,p2,yp,yi,yw,idx;		var wm = affectedScreenZone.w - 1;var hm = affectedScreenZone.h - 1;var wh = affectedScreenZone.w * affectedScreenZone.h;var rad1 = radius + 1;var r = [];var g = [];var b = [];var mul_sum = mul_table[radius];var shg_sum = shg_table[radius];var vmin = [];var vmax = [];while ( iterations-- > 0 ){yw = yi = 0;for ( y=0; y < affectedScreenZone.h; y++ ){rsum = pixels[yw]   * rad1;gsum = pixels[yw+1] * rad1;bsum = pixels[yw+2] * rad1;for( i = 1; i <= radius; i++ ){p = yw + (((i > wm ? wm : i )) << 2 );rsum += pixels[p++];gsum += pixels[p++];bsum += pixels[p++];}for ( x = 0; x < affectedScreenZone.w; x++ ){r[yi] = rsum;g[yi] = gsum;b[yi] = bsum;if( y==0) {vmin[x] = ( ( p = x + rad1) < wm ? p : wm ) << 2;vmax[x] = ( ( p = x - radius) > 0 ? p << 2 : 0 );} p1 = yw + vmin[x];p2 = yw + vmax[x];rsum += pixels[p1++] - pixels[p2++];gsum += pixels[p1++] - pixels[p2++];bsum += pixels[p1++] - pixels[p2++];yi++;}yw += ( affectedScreenZone.w << 2 );}for ( x = 0; x < affectedScreenZone.w; x++ ){yp = x;rsum = r[yp] * rad1;gsum = g[yp] * rad1;bsum = b[yp] * rad1;for( i = 1; i <= radius; i++ ){yp += ( i > hm ? 0 : affectedScreenZone.w);rsum += r[yp];gsum += g[yp];bsum += b[yp];}yi = x << 2;for ( y = 0; y < affectedScreenZone.h; y++){pixels[yi]   = (rsum * mul_sum) >>> shg_sum;pixels[yi+1] = (gsum * mul_sum) >>> shg_sum;pixels[yi+2] = (bsum * mul_sum) >>> shg_sum;if( x == 0 ) {vmin[y] = ( ( p = y + rad1) < hm ? p : hm ) * affectedScreenZone.w;vmax[y] = ( ( p = y - radius) > 0 ? p * affectedScreenZone.w : 0 );} p1 = x + vmin[y];p2 = x + vmax[y];rsum += r[p1] - r[p2];gsum += g[p1] - g[p2];bsum += b[p1] - b[p2];yi += affectedScreenZone.w << 2;}}}ctx.putImageData( imageData, affectedScreenZone.x, affectedScreenZone.y );}
	}
};

PlayerPrefs = 
{
	Save: function(key, value){localStorage.setitem(key, value);},
	Load: function(key){return localStorate.getItem(key);},
	Delete: function(key){localStorage.removeItem(key);}
};

Data =
{

};

CanvasRenderingContext2D.prototype.RoundedBox = 
function(x,y,w,h,r) {
    if (typeof r === "undefined") {
        r = 2;
    }
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    this.fill();
};

CanvasRenderingContext2D.prototype.fillPolygon = function (pointsArray, fillColor, strokeColor) {
    if (pointsArray.length <= 0) return;
    this.moveTo(pointsArray[0][0], pointsArray[0][1]);
    for (var i = 0; i < pointsArray.length; i++) {
        this.lineTo(pointsArray[i][0], pointsArray[i][1]);
    }
    if (strokeColor != null && strokeColor != undefined)
        this.strokeStyle = strokeColor;

    if (fillColor != null && fillColor != undefined) {
        this.fillStyle = fillColor;
        this.fill();
    }
}


