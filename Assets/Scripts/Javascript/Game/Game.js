function Run()
{
	Time.SetTimeValues();
	
	if(Application.LoadedLevel != null) Application.LoadedLevel.Start();
	else 								console.log("Scene undefined or empty");

	RequestAnimationFrame(Run);
}