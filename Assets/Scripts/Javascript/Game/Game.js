function Run()
{
	// Les methodes de la CurrentScene
	Application.LoadedLevel.Awake();
	Application.LoadedLevel.Start();
	Application.LoadedLevel.Update();
	Application.LoadedLevel.LateUpdate();
	Application.LoadedLevel.OnTriggerEnter();
	console.log("lol");
	RequestAnimFrame(run);
}