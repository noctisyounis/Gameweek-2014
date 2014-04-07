function GameObject ()
{
	this.name = "GameObject";
	this.enabled = true;
	this.BoxCollider = false;
	this.Clickable = false;

	this.transform =
	{
		position: {x:0, y: 0},
		rotation: {x:0, y: 0},
		scale: {x: 0, y: 0}
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
			for(var other in GameObjects)
			{
				if(other.enabled && other.BoxCollider)
				{
					if(BoxCollider({x: this.transform.position.x, y: this.transform.position.y,  w: this.transform.scale.x,  h: this.transform.scale.y },
								   {x: other.transform.position.x,y: other.transform.position.y, w: other.transform.scale.x, h: other .transforme.scale.y } ))
					{
						OnTriggerEnter(other);
					}
				}
			}

			if(this.Clickable)
			{
				if(PointCollider(Input.Mouse.x, Input.Mouse.y, {x: this.transform.position.x,y: this.transform.position.y,w: this.transform.scale.x,h: this.transforme.scale.y }))
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