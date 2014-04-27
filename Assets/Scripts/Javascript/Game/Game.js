function Run()
{
	Time.SetTimeValues();
	ctx.clearRect(0,0, canvas.width, canvas.height);

	if(Application.LoadedLevel != null)
	{
		Collision.CheckClick();
		Application.LoadedLevel.Start();
	} 
	if(GUI.Availaible && GUI.Obj != null) GUI.Obj.Start();
	if(Input.MouseReload > 0) Input.MouseClick = false;
	RequestAnimationFrame(Run);
}