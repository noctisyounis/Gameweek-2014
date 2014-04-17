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

function MapBoard ()
{
	this.name = "MapBoard";
	this.enabled = true;
	this.physics = false;
	this.renderer = false;
	this.gameObjects = [];
	this.floorDisplayed = 2;

	this.mapText = {
		titre : {text : "Plan de l'Hôpital", x : canvas.width/2, y : 70},
		RDC : {
			floor : {text :"Rez de chaussée", x : canvas.width/2, y : 560},
			reception : {text :"Accueil", x : 380, y : 240},
			elevator : {text :"Ascenseur", x : 905, y : 320},
			stairs : {text :"Escaliers", x : 85, y : 320},
			waitingRoom : {text :"Salle d'attente", x : 260, y : 450},
			archives : {text: "Archives", x : 500, y : 450},
			operatingTheaterA : {text : "Bloc opératoire A", x : 735, y : 190},
			operatingTheaterB : {text : "Bloc opératoire B", x : 735, y : 450},
		},
		premier : {
			floor : {text :"Premier Etage", x : canvas.width/2, y : 560},
			corridor : {text :"Couloir", x : 500, y : 320},
			elevator : {text :"Ascenseur", x : 905, y : 320},
			stairs : {text :"Escaliers", x : 85, y : 320},
			room101 : {text :"Chambre 101", x : 260, y : 190},
			room102 : {text :"Chambre 102", x : 260, y : 450},
			room103 : {text :"Chambre 103", x : 500, y : 190},
			room104 : {text :"Chambre 104", x : 500, y : 450},
			room105 : {text :"Chambre 105", x : 735, y : 190},
			room106 : {text :"Chambre 106", x : 735, y : 450}
		},
		second : {
			floor : {text :"Second Etage", x : canvas.width/2, y : 560},
			characterRoom : {text :"Ma chambre", x : 260, y : 190},
			room202 : {text :"Chambre 202", x : 260, y : 450},
			room203 : {text :"Chambre 203", x : 735, y : 190},
			room204 : {text :"Chambre 204", x : 735, y : 450},
			corridor : {text :"Couloir", x : 500, y : 320},
			elevator : {text :"Ascenseur", x : 905, y : 320},
			stairs : {text :"Escaliers", x : 85, y : 320},
			restingArea : {text :"Salle de repos", x : 500, y : 450},
			office : {text : "Bureau", x : 500, y : 190}
		}
	};

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
			var i = 0;
			while (i < 3){
				this.gameObjects.push(new FloorButton(i, this));
				i++;
			}
			//--------------------RCD-------------------------
			this.gameObjects.push(new RoomObject(
				{position: {x:140,y:110}, rotation: {x:0,y:0}, scale: {x:470,y:260}},
				{x :470,y:260},
				"reception",
				"",
				"RDC",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:614,y:263}, rotation: {x:0,y:0}, scale: {x:240,y:109}},
				{x :240,y:109},
				"reception2",
				"",
				"RDC",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:140,y:372}, rotation: {x:0,y:0}, scale: {x:240,y:155}},
				{x :240,y:155},
				"waitingRoom",
				"",
				"RDC",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:382,y:372}, rotation: {x:0,y:0}, scale: {x:229,y:155}},
				{x :229,y:155},
				"archives",
				"",
				"RDC",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:614,y:110}, rotation: {x:0,y:0}, scale: {x:240,y:155}},
				{x :240,y:155},
				"operatingTheaterA",
				"",
				"RDC",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:614,y:372}, rotation: {x:0,y:0}, scale: {x:240,y:155}},
				{x :240,y:155},
				"operatingTheaterB",
				"",
				"RDC",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:31,y:263}, rotation: {x:0,y:0}, scale: {x:109,y:109}},
				{x :109,y:109},
				"RDCstairs",
				"",
				"RDC",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:853,y:263}, rotation: {x:0,y:0}, scale: {x:109,y:109}},
				{x :109,y:109},
				"RDCelevator",
				"",
				"RDC",
				[]));
			//------------------------------------------------
			//---------------FIRST FLOOR----------------------
			this.gameObjects.push(new RoomObject(
				{position: {x:140,y:110}, rotation: {x:0,y:0}, scale: {x:240,y:155}},
				{x :240,y:155},
				"room101",
				"",
				"firstFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:140,y:372}, rotation: {x:0,y:0}, scale: {x:240,y:155}},
				{x :240,y:155},
				"room102",
				"",
				"firstFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:382,y:110}, rotation: {x:0,y:0}, scale: {x:229,y:155}},
				{x :229,y:155},
				"room103",
				"",
				"firstFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:382,y:372}, rotation: {x:0,y:0}, scale: {x:229,y:155}},
				{x :229,y:155},
				"room104",
				"",
				"firstFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:614,y:110}, rotation: {x:0,y:0}, scale: {x:240,y:155}},
				{x :240,y:155},
				"room105",
				"",
				"firstFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:614,y:372}, rotation: {x:0,y:0}, scale: {x:240,y:155}},
				{x :240,y:155},
				"room106",
				"",
				"firstFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:31,y:263}, rotation: {x:0,y:0}, scale: {x:109,y:109}},
				{x :109,y:109},
				"1stairs",
				"",
				"firstFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:141,y:263}, rotation: {x:0,y:0}, scale: {x:711,y:109}},
				{x :711,y:109},
				"1corridor",
				"",
				"firstFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:853,y:263}, rotation: {x:0,y:0}, scale: {x:109,y:109}},
				{x :109,y:109},
				"1elevator",
				"",
				"firstFloor",
				[]));
			//------------------------------------------------
			//--------------SECOND FLOOR----------------------
			this.gameObjects.push(new RoomObject(
				{position: {x:140,y:110}, rotation: {x:0,y:0}, scale: {x:240,y:155}},
				{x :240,y:155},
				"characterRoom",
				"Intro",
				"secondFloor",
				[false]));
			this.gameObjects.push(new RoomObject(
				{position: {x:140,y:372}, rotation: {x:0,y:0}, scale: {x:240,y:155}},
				{x :240,y:155},
				"room202",
				"",
				"secondFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:382,y:110}, rotation: {x:0,y:0}, scale: {x:229,y:155}},
				{x :229,y:155},
				"office",
				"",
				"secondFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:382,y:372}, rotation: {x:0,y:0}, scale: {x:229,y:155}},
				{x :229,y:155},
				"restingArea",
				"",
				"secondFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:614,y:110}, rotation: {x:0,y:0}, scale: {x:240,y:155}},
				{x :240,y:155},
				"room203",
				"",
				"secondFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:614,y:372}, rotation: {x:0,y:0}, scale: {x:240,y:155}},
				{x :240,y:155},
				"room204",
				"",
				"secondFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:31,y:263}, rotation: {x:0,y:0}, scale: {x:109,y:109}},
				{x :109,y:109},
				"2stairs",
				"",
				"secondFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:141,y:263}, rotation: {x:0,y:0}, scale: {x:711,y:109}},
				{x :711,y:109},
				"2corridor",
				"",
				"secondFloor",
				[]));
			this.gameObjects.push(new RoomObject(
				{position: {x:853,y:263}, rotation: {x:0,y:0}, scale: {x:109,y:109}},
				{x :109,y:109},
				"2elevator",
				"",
				"secondFloor",
				[]));
			//------------------------------------------------
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
					for(var other in Application.LoadedLevel.GameObjects)
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

				if(this.Physics.Clickable)
				{
					if(Collision.PointCollider(Input.MousePosition.x, Input.MousePosition.y, {x: this.Physics.BoxColliderSize.position.x, y: this.Physics.BoxColliderSize.position.y,w: this.Physics.BoxColliderSize.scale.x,h: this.Physics.BoxColliderSize.scale.y }))
					{
						if(!Input.MouseClick) this.OnHovered();
						if(Input.MouseClick)  this.OnClicked();
					}
					else
					{
						this.UnHovered();
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
		var stringFloorDisplayed = "";
		var originalTextAlign = ctx.textAlign;
		var originalFont = ctx.font;
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.font = "25px Georgia";
		// GAMEOBJECT BEHAVIOR HERE !
		switch(this.floorDisplayed){
			case 0:
				stringFloorDisplayed = "RDC";
				ctx.drawImage(Images.map_planRDC,0,0);
				if(RoomVisited.RDC.reception)
					ctx.drawImage(Images.map_accueil,0,0);
				if(RoomVisited.RDC.waitingRoom)
					ctx.drawImage(Images.map_salle4,0,0);
				if(RoomVisited.RDC.archives)
					ctx.drawImage(Images.map_salle5,0,0);
				if(RoomVisited.RDC.operatingTheaterA)
					ctx.drawImage(Images.map_salle3,0,0);
				if(RoomVisited.RDC.operatingTheaterB)
					ctx.drawImage(Images.map_salle6,0,0);
				if(RoomVisited.RDC.stairs)
					ctx.drawImage(Images.map_escalier,0,0);

				ctx.fillText(this.mapText.RDC.floor.text, this.mapText.RDC.floor.x, this.mapText.RDC.floor.y);
				ctx.font = "15px Georgia";
				ctx.fillText(this.mapText.RDC.elevator.text, this.mapText.RDC.elevator.x, this.mapText.RDC.elevator.y);
				ctx.fillText(this.mapText.RDC.stairs.text, this.mapText.RDC.stairs.x, this.mapText.RDC.stairs.y);
				ctx.fillText(this.mapText.RDC.reception.text, this.mapText.RDC.reception.x, this.mapText.RDC.reception.y);
				ctx.fillText(this.mapText.RDC.waitingRoom.text, this.mapText.RDC.waitingRoom.x, this.mapText.RDC.waitingRoom.y);
				ctx.fillText(this.mapText.RDC.archives.text, this.mapText.RDC.archives.x, this.mapText.RDC.archives.y);
				ctx.fillText(this.mapText.RDC.operatingTheaterA.text, this.mapText.RDC.operatingTheaterA.x, this.mapText.RDC.operatingTheaterA.y);
				ctx.fillText(this.mapText.RDC.operatingTheaterB.text, this.mapText.RDC.operatingTheaterB.x, this.mapText.RDC.operatingTheaterB.y);
				break;
			case 1:
				stringFloorDisplayed = "firstFloor";
				ctx.drawImage(Images.map_planE1,0,0);
				if(RoomVisited.premier.stairs)
					ctx.drawImage(Images.map_escalier,0,0);
				if(RoomVisited.premier.room101)
					ctx.drawImage(Images.map_salle1,0,0);
				if(RoomVisited.premier.room103)
					ctx.drawImage(Images.map_salle2,0,0);
				if(RoomVisited.premier.room105)
					ctx.drawImage(Images.map_salle3,0,0);
				if(RoomVisited.premier.room102)
					ctx.drawImage(Images.map_salle4,0,0);
				if(RoomVisited.premier.room104)
					ctx.drawImage(Images.map_salle5,0,0);
				if(RoomVisited.premier.room106)
					ctx.drawImage(Images.map_salle6,0,0);

				ctx.fillText(this.mapText.premier.floor.text, this.mapText.premier.floor.x, this.mapText.premier.floor.y);
				ctx.font = "15px Georgia";
				ctx.fillText(this.mapText.premier.elevator.text, this.mapText.premier.elevator.x, this.mapText.premier.elevator.y);
				ctx.fillText(this.mapText.premier.stairs.text, this.mapText.premier.stairs.x, this.mapText.premier.stairs.y);
				ctx.fillText(this.mapText.premier.corridor.text, this.mapText.premier.corridor.x, this.mapText.premier.corridor.y);
				ctx.fillText(this.mapText.premier.room101.text, this.mapText.premier.room101.x, this.mapText.premier.room101.y);
				ctx.fillText(this.mapText.premier.room102.text, this.mapText.premier.room102.x, this.mapText.premier.room102.y);
				ctx.fillText(this.mapText.premier.room103.text, this.mapText.premier.room103.x, this.mapText.premier.room103.y);
				ctx.fillText(this.mapText.premier.room104.text, this.mapText.premier.room104.x, this.mapText.premier.room104.y);
				ctx.fillText(this.mapText.premier.room105.text, this.mapText.premier.room105.x, this.mapText.premier.room105.y);
				ctx.fillText(this.mapText.premier.room106.text, this.mapText.premier.room106.x, this.mapText.premier.room106.y);
				break;
			case 2:
				stringFloorDisplayed = "secondFloor";
				ctx.drawImage(Images.map_planE2,0,0);
				if(RoomVisited.second.elevator)
					ctx.drawImage(Images.map_escalier,0,0);
				if(RoomVisited.second.stairs)
					ctx.drawImage(Images.map_escalier,0,0);
				if(RoomVisited.second.room202)
					ctx.drawImage(Images.map_salle4,0,0);
				if(RoomVisited.second.room203)
					ctx.drawImage(Images.map_salle3,0,0);
				if(RoomVisited.second.room204)
					ctx.drawImage(Images.map_salle6,0,0);
				if(RoomVisited.second.office)
					ctx.drawImage(Images.map_salle2,0,0);
				if(RoomVisited.second.restingArea)
					ctx.drawImage(Images.map_salle5,0,0);

				ctx.fillText(this.mapText.second.floor.text, this.mapText.second.floor.x, this.mapText.second.floor.y);
				ctx.font = "15px Georgia";
				ctx.fillText(this.mapText.second.elevator.text, this.mapText.second.elevator.x, this.mapText.second.elevator.y);
				ctx.fillText(this.mapText.second.stairs.text, this.mapText.second.stairs.x, this.mapText.second.stairs.y);
				ctx.fillText(this.mapText.second.corridor.text, this.mapText.second.corridor.x, this.mapText.second.corridor.y);
				ctx.fillText(this.mapText.second.characterRoom.text, this.mapText.second.characterRoom.x, this.mapText.second.characterRoom.y);
				ctx.fillText(this.mapText.second.room202.text, this.mapText.second.room202.x, this.mapText.second.room202.y);
				ctx.fillText(this.mapText.second.room203.text, this.mapText.second.room203.x, this.mapText.second.room203.y);
				ctx.fillText(this.mapText.second.room204.text, this.mapText.second.room204.x, this.mapText.second.room204.y);
				ctx.fillText(this.mapText.second.restingArea.text, this.mapText.second.restingArea.x, this.mapText.second.restingArea.y);
				ctx.fillText(this.mapText.second.office.text, this.mapText.second.office.x, this.mapText.second.office.y);
				break;
		}
		ctx.font = "50px Georgia";
		ctx.fillText(this.mapText.titre.text, this.mapText.titre.x, this.mapText.titre.y);
		ctx.font = originalFont;
		ctx.textAlign = originalTextAlign;
		if(this.renderer)
			this.Renderer.Draw();

		for(i = 0; i < this.gameObjects.length; i++){
			if(this.gameObjects[i].floor){
				if(this.gameObjects[i].floor == stringFloorDisplayed){
					this.gameObjects[i].enabled = true;
				}
				else{
					this.gameObjects[i].enabled = false;
				}
			}
		}

		for(var i = 0; i < this.gameObjects.length; i++)
		{
			if(this.gameObjects[i].enabled)
			{
				this.gameObjects[i].Start();
			}
		}
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
	
	this.UnHovered = function()
	{
	};

	this.Awake();
}