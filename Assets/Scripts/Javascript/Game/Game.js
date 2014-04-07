function Run()
{
	// Les methodes de la CurrentScene
	console.log("Application " + Application.LoadedLevel);
	if(Application.LoadedLevel != undefined)
	{
		Application.LoadedLevel.Start();
		Application.LoadedLevel.Update();
		Application.LoadedLevel.LateUpdate();
		console.log("lol");
	}
	RequestAnimationFrame(Run);
}