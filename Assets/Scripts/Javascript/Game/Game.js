function Run()
{
	Time.SetTimeValues();
	ctx.clearRect(0,0, canvas.width, canvas.height);
	
	if(Application.LoadedLevel != null) Application.LoadedLevel.Start();
	else console.log("Scene undefined or empty");
	RequestAnimationFrame(Run);
}