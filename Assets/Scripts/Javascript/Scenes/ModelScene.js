function Scene () 
{
	this.AwakeDone = false;
	this.StartDone = false;

	this.Awake = function(){};

	this.Start = function()
	{
		if(!this.StartDone)
		{
			// Start behavior here!
			this.StartDone = true;
		}
	};

	this.Update = function()
	{
		if(!Application.GamePaused)
		{

		}
	};

	this.LateUpdate = function()
	{
		if(!Application.GamePaused)
		{

		}
	};

	// Launch Awake() on creation of Scene! 
	this.Awake();
}