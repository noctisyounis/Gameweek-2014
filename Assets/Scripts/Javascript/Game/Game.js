function Run()
{
	// Les methodes de la CurrentScene
	if(Application.LoadedLevel != null)
	{
		Application.LoadedLevel.Start();
		Application.LoadedLevel.Update();
		Application.LoadedLevel.LateUpdate();
	}
	else
	{
		console.log("Scene undefined or empty");
	}

	RequestAnimationFrame(Run);
}