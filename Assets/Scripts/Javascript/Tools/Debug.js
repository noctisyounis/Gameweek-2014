Debug = 
{
	Log: function(logMsg)	{console.log(logMsg);},
	ShowStats: function(){ 
		ctx.font = "20px Georgia";
		if(Time.Fps > 40) ctx.fillStyle = "green";
		if(Time.Fps < 40) ctx.fillStyle = "orange";
		if(Time.Fps < 20) ctx.fillStyle = "red";

		ctx.fillText('Fps: ' + Time.Fps ,20,50);
	}
};

print = function (logMsg) {console.log(logMsg);};