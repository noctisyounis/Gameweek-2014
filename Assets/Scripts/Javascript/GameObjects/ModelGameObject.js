/*	**** For create a new GameObject **** 
*
*	@step 1							Copy the content of this file in a new .js document.
*   ----------------------------------------------------------------------------------------------------------------------------
*	@step 2							Save the new file in Assets/Javascript/GameObjects/NameOfYourGameObject.js .
*   ----------------------------------------------------------------------------------------------------------------------------
*	@step 3                      	In the index.html add below this comment <!-- GameObjects --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"
*	----------------------------------------------------------------------------------------------------------------------------
*	@step 4						    To make a new instance of GameObject, use this instruction: "new NomDeVotreGameObject();"
*/


/*	**** How to make the setup of a GameObject ****
*	
*	@property name 																											{string} 			 
*	The name of the object.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@property enabled 																									   {boolean} 			 
*	The active state of the GameObject.
*   --------------------------------------------------------------------------------------------------------------------------------
*	@property physics    																							       {boolean}			 
*	The active state of Physics component
*	--------------------------------------------------------------------------------------------------------------------------------
*	@property renderer    																								   {boolean}			 
*	The active state of Renderer component
*	--------------------------------------------------------------------------------------------------------------------------------
*	@prefix transform                	    																			 {structure}			 
*	Position, rotation and scale of the GameObject.
*
*		
*	@property position 																							{x: float, y: float} 
*	Position of the GameObject.
*
*	@property rotation																							{x: float, y: float} 
*	Rotation of the GameObject. (don't use)
*
*	@property scale																								{x: float, y: float} 
*	Scale of the GameObject.	
*	--------------------------------------------------------------------------------------------------------------------------------     					 
*	@prefix Physics                   																					 {structure}			 
*	The Physics component of the GameObject.
*
*			
*	@property BoxCollider 																								   {boolean}			 
*	If true, call OnTriggerEnter() when colide other box collider.
*
*	@property clickable         																						   {boolean}			 
*	If true, call OnCicked() when click is detected.	
*
*	@property RelativePosition																							   {boolean}			 
*	If true, the collider will follow the transform.
*
*	@property ColliderIsSameSizeAsTransform    																		   	   {boolean}			 
*	If true, the collider take the transform value.	
*	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  		
*	@prefix Physics.BoxColliderSize          																			 {structure}			 
*	Position, rotation and scale of the box collider.
*	
*			
*	@property position 																							{x: float, y: float} 
*	Position of the box collider.
*
*	@property rotation																							{x: float, y: float} 
*	Rotation of the box collider. (don't use)
*
*	@property scale																								{x: float, y: float} 
*	Scale of the box collider.	
*	--------------------------------------------------------------------------------------------------------------------------------
* 	@prefix   Renderer 																									 {structure}			 
*	The renderer component of the GameObject.
*
*	
*	@property visible																									   {boolean}			 
*	If true, the GameObject will be visible.
*	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -	
*	@property Renderer.Material																							 {structure}			 
*	The material part of the renderer component.
*
*	@property source																										 {image}				 
*	The image drawed if no animation.
*	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
*	@prefix Renderer.Animation 																							 {structure}			 
*	The animation part of the renderer component.
*
*
*	@property animated																									   {boolean}			 
*	If true, the image drawed will be animated.
*	
*	@property current 															 {array[image,totalDuration: float,nbFrames: float]}
*	The current animation that will be played  
*
*	@proprety Animations																					   		  {array[[],[]]}
*	Contain all the animations of the gameObject.
*	________________________________________________________________________________________________________________________________
*/

/*	**** Les methodes du GameObject ****
*
*	@method SetActive (boolean: state) 					
*	Change the active state of gameObject by the parameters state.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method SetPosition(x, y)						
*	Set la position du gameObject et cale le collider si il est relatif
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Awake()									
*	Called at the instruction new GameObject().
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Start()									
*	Called at the first use of the GameObejct in scene.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Update()								
*	Called each frame, all the system is coded here.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method LateUpdate()
*	Called each frame, code all the behavior here.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method OnTriggerEnter(other)					
*	Called each frame when an other box collider is in contact with the GameObject.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method OnClicked()								
*	Called each frame when user click on the collider.
* 	--------------------------------------------------------------------------------------------------------------------------------
*	@method OnHoverd()
*	Called each frame when user mouse is over the collider and don't click.
*/

/* **** For launch GameObject ****
*
*	Add NameOfYourGameObject.Start() in your scene.
*/
function GameObject ()
{
	this.name = "GameObject";
	this.enabled = true;
	this.physics = true;
	this.renderer = true;

	this.transform =
	{
		position: {x:100, y: 100},
		rotation: {x:0, y: 0}, // obselete
		scale: {x: 200, y: 350}
	};

	this.Physics = 
	{
		BoxCollider: false,
		Clickable:   false,
		ColliderIsSameSizeAsTransform: false,
		RelativePosition: true,
 
 		BoxColliderSize: 
		{
			position: {x:0, y: 0},
			rotation: {x:0, y: 0}, // obselete
			scale: {x: 100, y: 150}
		}
	};
	this.Renderer = 
	{
		visible: true,
		that: this.transform,
		thot: this.Physics.BoxColliderSize,

		Material:
		{
			source: Images[0],
			//console.log("test= " + ImgTest), 

			//DontTouch bellow 
			SizeFrame:
			{
				x: 0,
				y: 0
			},

			CurrentFrame:
			{
				x: 0,
				y: 0
			},
		},

		Animation: 
		{
			animated: true,
			current: [Images[0], .7, 3], // [animationImage, TotalDuration, NumberOfFrame]
			Animations: [],
			countdown:0
		},

		Draw: function ()
		{
			ctx.drawImage(this.Animation.animated ? this.Animation.current[0] : this.Material.source, this.Material.CurrentFrame.x * this.Material.SizeFrame.x, this.Material.CurrentFrame.y * this.Material.SizeFrame.y, this.Material.CurrentFrame.x + this.Material.SizeFrame.x,this.Material.CurrentFrame.y + this.Material.SizeFrame.y,this.that.position.x,this.that.position.y,this.that.scale.x, this.that.scale.y);
			if(Application.DebugMode)
			{
				ctx.fillStyle = Debug.SpriteOutlineColor;
				ctx.strokeRect (this.that.position.x, this.that.position.y, this.that.scale.x, this.that.scale.y)
				ctx.fillStyle = Debug.ColliderOutlineColor;
				ctx.strokeRect (this.thot.position.x, this.thot.position.y, this.thot.scale.x, this.thot.scale.y);
				}
		}
	}

	this.SetActive = function (newState)
	{
		this.enabled = newState;
	};

	this.SetPosition = function(x, y) 
	{
		this.transform.position.x = x;
		this.transform.position.y = y;

		if(this.physics && this.Physics.RelativePosition)
		{
			this.Physics.BoxColliderSize.position.x = this.Physics.BoxColliderOriginal.x + this.transform.position.x;
			this.Physics.BoxColliderSize.position.y = this.Physics.BoxColliderOriginal.x + this.transform.position.x;
		}
	};

	this.Awake = function()
	{
		this.Physics.BoxColliderOriginal = this.Physics.BoxColliderSize;
		if(this.physics && this.ColliderIsSameSizeAsTransform)
		{
			this.BoxCollider = this.transform; 
		}

		if(this.physics && this.Physics.RelativePosition)
		{
			this.Physics.BoxColliderSize.position.x += this.transform.position.x;
			this.Physics.BoxColliderSize.position.y += this.transform.position.y;
		}
		
		if(this.Renderer.Material.src != "")
		{
			this.Renderer.Material.SizeFrame.x = this.Renderer.Material.source.width / this.Renderer.Animation.current[2];
			this.Renderer.Material.SizeFrame.y = this.Renderer.Material.source.height;
		}

		Debug.Log("GameObject: " + GameObject.name + " Created");
	};

	this.Start = function()
	{
		if(!this.Started)
		{
			// DO START HERE

			Debug.Log("GameObject: " + GameObject.name + " Started");
			this.Started = true;
		}
		this.Update();
	};

	this.Update = function()
	{
		if(!Application.GamePaused && this.enabled)
		{
			if(this.physics)
			{
				if(this.BoxCollider)
				{
					for(var other in GameObjects)
					{
						if(other.enabled && other.BoxCollider)
						{
							if(BoxCollider({x: this.Physics.BoxColliderSize.position.x, y: this.Physics.BoxColliderSize.position.y,  w: this.Physics.BoxCollider.scale.x,  h: this.Physics.BoxColliderSize.scale.y },
										   {x: other.Physics.BoxColliderSize.position.x, y: other.Physics.BoxColliderSize.position.y, w: other.Physics.BoxColliderSize.scale.x, h: other.Physics.BoxColliderSize.scale.y } ))
							{
								OnTriggerEnter(other);
							}
						}
					}
				}

				if(this.Clickable)
				{
					if(PointCollider(Input.MousePosition.x, Input.MousePosition.y, {x: this.Physics.BoxColliderSize.position.x, y: this.Physics.BoxColliderSize.position.y,w: this.Physics.BoxColliderSize.scale.x,h: this.Physics.BoxColliderSize.scale.y }))
					{
						if(!Input.Mouseclick) this.OnHover();
						if(Input.Mouseclick)  this.OnClicked();
					}
				}
			}

			if(this.renderer && this.Renderer.Animation.animated)
			{
				this.Renderer.Animation.countdown -= Time.DeltaTime;
				if(this.Renderer.Animation.countdown <= 0)
				{
					this.Renderer.Material.CurrentFrame.x += 1;
					this.Renderer.Animation.countdown = this.Renderer.Animation.current [1] / this.Renderer.Animation.current[2];

					if(this.Renderer.Material.CurrentFrame.x > this.Renderer.Animation.current[2] - 1)
						this.Renderer.Material.CurrentFrame.x = 0;

					//console.log(this.Renderer.Material.CurrentFrame.x);
				}
			}

			this.LateUpdate();
		}
		
	};

	this.LateUpdate = function ()
	{
		// GAMEOBJECT BEHAVIOR HERE ! 
		if(this.renderer)
			this.Renderer.Draw();
	};

	this.OnTriggerEnter = function (other)
	{

	};

	this.OnClicked = function ()
	{

	};
	this.OnHovered = function()
	{

	};

	this.Awake();
}