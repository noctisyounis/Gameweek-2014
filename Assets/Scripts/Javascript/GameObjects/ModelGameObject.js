function GameObject ()
{
	this.name = "GameObject";
	this.enabled = true;
	this.BoxCollider = false;
	this.Clickable = false;

	this.transform =
	{
		position: {x, y},
		rotation: {x, y},
		scale: {x,y}
	};

	this.Started = false;
	this.SetActive = function (newState)
	{
		this.enabled = newState;
	}

	this.Awake = function(){};

	this.Start = function()
	{
		if(this.Started)
		{
			// DO START HERE

			this.Started = true;
		}
	};

	this.Update = function()
	{
		if(!Application.GamePaused && this.enabled)
		{
			if(this.BoxCollider)
			foreach(other in GameObjects)
			{
				if(other.enabled && other.BoxCollider)
				{
					if(BoxCollider({this.transform.position.x, this.transform.position.y, this.transform.scale.x, this.transforme.scale.y }, 
								   {other.transform.position.x, other.transform.position.y, other.transform.scale.x, other .transforme.scale.y } ))
					{
						OnTriggerEnter(other);
					}
				}
			}

			if(this.Clickable)
			{
				if(PointCollider(Input.Mouse.x, Input.Mouse.y, {this.transform.position.x, this.transform.position.y, this.transform.scale.x, this.transforme.scale.y }))
				{
					OnClicked();
				}
			}


		}
	};

	this.LateUpdate = function ()
	{
		if(this.enabled)
		{

		}
	};

	this.OnTriggerEnter = function (other)
	{

	};

	this.OnClicked = function ()
	{

	};
}