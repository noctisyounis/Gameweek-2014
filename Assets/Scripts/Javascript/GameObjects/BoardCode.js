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
*	@prefix Renderer.Material																							 {structure}			 
*	The material part of the renderer component.
*
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
*	@method SetActive (): Change the active state of GameObject by the parameters state.
*	@param1 {boolean} state.		
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method SetPosition (): Set position of gameObject.
*   @param1 {structure} {x: float, y:float}.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Awake (): Called at the instruction new GameObject().									
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Start (): Called at the first use of the GameObejct in scene.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Update (): Called each frame, all the system is coded here.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method LateUpdate (): Called each frame, code all the behavior here.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method OnTriggerEnter(): Called each frame when an other box collider is in contact with the GameObject.
*	@param1 {object} : other.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method OnClicked(): Called each frame when user click on the collider.
* 	--------------------------------------------------------------------------------------------------------------------------------
*	@method OnHoverd(): Called each frame when user mouse is over the collider and don't click.
*/

/* **** For launch GameObject ****
*
*	Add NameOfYourGameObject.Start() in your scene.
*/

function BoardCode ()
{
	this.name = "BoardCode";
	this.enabled = true;
	this.physics = false;
	this.renderer = false;
	this.GameObjects = [];
	this.solution = [6,3,5,9];
	this.code = [];
	this.winText = false;

	this.transform =
	{
		position: {x:0, y: 0},
		rotation: {x:0, y: 0}, // obselete
		scale: {x: 0, y: 0}
	};

	this.Physics = 
	{
		BoxCollider: false,
		Clickable:   false,
		DragAndDropable: false,
		ColliderIsSameSizeAsTransform: false,
		RelativePosition: false,
 
 		BoxColliderSize: 
		{
			position: {x:0, y: 0},
			rotation: {x:0, y: 0}, // obselete
			scale: {x: 0, y: 0}
		}
	};
	this.Renderer = 
	{
		visible: false,
		GizmosVisible: false,
		isSprite: false,
		thit: this.name,
		that: this.transform,
		thot: this.Physics.BoxColliderSize,

		Material:
		{
			source: "",

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
			animated: false,
			current: [],
			Animations: [],
			countdown:0
		},

		Draw: function ()
		{
			if(this.isSprite)
				ctx.drawImage(this.Animation.animated ? this.Animation.current[0] : this.Material.source, this.Material.CurrentFrame.x * this.Material.SizeFrame.x, this.Material.CurrentFrame.y * this.Material.SizeFrame.y, this.Material.CurrentFrame.x + this.Material.SizeFrame.x,this.Material.CurrentFrame.y + this.Material.SizeFrame.y,this.that.position.x,this.that.position.y,this.that.scale.x, this.that.scale.y);
			if(Application.DebugMode)
			{
				if(this.GizmosVisible)
				{
					ctx.lineWidth = 10;
					ctx.strokeStyle = Debug.SpriteOutlineColor;
					ctx.strokeRect (this.that.position.x, this.that.position.y, this.that.scale.x, this.that.scale.y);
					ctx.lineWidth = 3;
					ctx.strokeStyle = Debug.ColliderOutlineColor;
					ctx.strokeRect (this.thot.position.x, this.thot.position.y, this.thot.scale.x, this.thot.scale.y);
					ctx.lineWidth = 1;
				}
				ctx.fillStyle = "rgba(122,122,122, 0.4)";
				ctx.RoundedBox (this.that.position.x - 5, this.that.position.y - 60, 160, 55, 4);
				ctx.fillStyle = "white";
				ctx.font = "10px Georgia";
				ctx.fillText(this.thit , this.that.position.x, this.that.position.y - 45);
				ctx.fillText("Rend x:" + Math.floor(this.that.position.x) + ", y:" + Math.floor(this.that.position.y) + ", w:" + Math.floor(this.that.scale.x) + ", h:" + Math.floor(this.that.scale.y), this.that.position.x, this.that.position.y - 25);
				ctx.fillText("Collis x:" + Math.floor(this.thot.position.x) + ", y:" + Math.floor(this.thot.position.y) + ", w:" + Math.floor(this.thot.scale.x) + ", h:" + Math.floor(this.thot.scale.y), this.that.position.x, this.that.position.y - 10);
			}
		}
	}

	this.OnLoadLevel = function()
	{

	};

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
			this.Physics.BoxColliderSize.position.x = this.transform.position.x;
			this.Physics.BoxColliderSize.position.y = this.transform.position.y;

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

		console.log(" %c System: GameObject " + this.name + " Created!", 'background: #222; color: #bada55');
	};

	this.Start = function()
	{
		if(!this.Started)
		{
			// DO START HERE
			var i = 1;
			while(i != 5)
			{
				this.GameObjects.push(new BoardDigit(i));
				i++;
			}

			this.GameObjects.push(new ButtonBack());

			//creer 4 gameobject digit
			console.log(" %c System: GameObject " + this.name + " Started!", 'background: #222; color: #bada55');
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
				if(this.Physics.BoxCollider)
				{
					for(var other in GameObjects)
					{
						if(other.enabled && other.BoxCollider)
						{
							if(Collision.BoxCollider({x: this.Physics.BoxColliderSize.position.x, y: this.Physics.BoxColliderSize.position.y,  w: this.Physics.BoxCollider.scale.x,  h: this.Physics.BoxColliderSize.scale.y },
										   {x: other.Physics.BoxColliderSize.position.x, y: other.Physics.BoxColliderSize.position.y, w: other.Physics.BoxColliderSize.scale.x, h: other.Physics.BoxColliderSize.scale.y } ))
							{
								OnTriggerEnter(other);
							}
						}
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
				}
			}

			this.LateUpdate();
		}
		
	};

	this.LateUpdate = function ()
	{
		this.code = [];
		// boucle sur les 4 digit qu'on  creer plus haut Start()
		ctx.fillStyle = "black";
		ctx.drawImage(Images.coffreBackground,0,0);
		for(var i = 0; i < this.GameObjects.length; i++)
		{
			if(this.GameObjects[i].enabled)
			{
				this.GameObjects[i].Start();
			}
			this.code.push(this.GameObjects[i].number);
		}
		if(this.renderer)
			this.Renderer.Draw();
		var i = 0
		while(i < 4){
			if(this.code[i] != this.solution[i])
				return;
			i++;
		}
		
		Progression.RouteAGotPassePartout = true;
		Scenes.Room104.step = 0;
		Application.LoadLevel("Room104");
		
		

	};

	this.OnTriggerEnter = function (other)
	{

	};

	this.OnClicked = function ()
	{
		if(this.Physics.DragAndDropable && !Input.MouseDraging || Input.MouseDraging && Input.DragedElement == this.name)
		{
			Input.MouseDraging = true;
			Input.DragedElement = this.name;
			this.SetPosition(Input.MousePosition.x - (this.transform.scale.x / 2), Input.MousePosition.y - (this.transform.scale.y / 2) );
		}
	};
	this.OnHovered = function()
	{
	};

	this.UnHovered = function(){};

	this.Awake();
}