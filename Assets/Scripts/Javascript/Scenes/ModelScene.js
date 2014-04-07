function SceneModel () 
{
	this.name = "Model";
	this.Started = false;

	this.Awake = function(){};

	this.Start = function()
	{
		if(!this.Started)
		{
			// Start behavior before the boolean!
			console.log("hello");
			this.Started = true;
		}
	};

	this.Update = function() // For Game
	{
		if(!Application.GamePaused)
		{
			ctx.fillStyle = "grey";
			ctx.fillRect(0,0, canvas.width, canvas.height);
		}
	};

	this.LateUpdate = function() // For GUI 
	{
		if(!Application.GamePaused)
		{

		}
	};

	// Launch Awake() on creation of Scene! 
	this.Awake();
}