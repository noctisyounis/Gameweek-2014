/*	**** For create a new Scene **** 
*
*	@step 1							Copy the content of this file in a new .js document.
*   ----------------------------------------------------------------------------------------------------------------------------
*	@step 2							Save the new file in Assets/Javascript/Scenes/NameOfYourScene.js .
*   ----------------------------------------------------------------------------------------------------------------------------
*	@step 3                      	In the index.html add below this comment <!-- Scene --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"
*	----------------------------------------------------------------------------------------------------------------------------
*	@step 4						    For create a new scene, use this instruction: "new Scene()".
*/

/*	**** How to make the setup of a Scene ****
*	
*	@property name 																											{string} 			 
*	The name of the scene.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@property GameObjects 																				   {array[GameObject1, ...]} 			 
*	All the GameObject of the scene	
*
*/

/*	**** Method of the scene ****
*
*	@method Awake()									
*	Called at the instruction new Scene().
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Start()									
*	Called at the first use of scene in game.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Update()								
*	Called each frame,code game is here.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method LateUpdate()
*	Called each frame, code all the GUI here.
*/

/* **** For launch Scene ****
*
*	To load your scene, use this instruction: "Application.LoadLevel(LevelName)".
*/



function SceneBreakRoom () 
{
	this.name = "BreakRoom";
	this.Started = false;

	this.GameObjects = [];

	this.Awake = function()
	{
		//codez l'awake avant le console.log
		console.clear();
		console.log(" %c System: Scene " + this.name + " created!", 'background: #222; color: #bada55'); 
	};

	this.Start = function()
	{
		if(!this.Started)
		{
			//codez le start avant le changement de booleen

			//Armoire
			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 750, y: 105}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 282, y: 553}
 												},
 												{
 													position: {x: 750 + 60, y: 105 + 45}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 282 - 110, y:553 - 110}
 												},

 												"RoomCloset",
 												"Ah ! Voici la clé de l’ascenseur ! [medium]",
 												Images.roomCloset


 												));

			//Rideaux
			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 230, y: 200}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 364, y: 301}
 												},
 												{
 													position: {x: 230, y: 200}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 230, y: 200}
 												},

 												"RoomCurtains3",
 												"",
 												Images.roomCurtains3


 												));

			//this.GameObjects.push(new RoomCurtains3(230,200,364,301));
			//this.GameObjects.push(new RoomSofa2(260,350,429,234));
			//this.GameObjects.push(new RoomTable(650,300,173,236));

			this.Started = true;
			Time.LevelLoaded();
			console.log(" %c System: Scene " + this.name + " have started!", 'background: #222; color: #bada55');
		}
		this.Update();
	};

	this.Update = function()
	{
		if(!Application.GamePaused)
		{
			ctx.fillStyle = "black";
			ctx.fillRect(0,0, canvas.width, canvas.height);
			ctx.drawImage(Images.roomBackground, 0, 0, canvas.width, canvas.height);

			for(var i = 0; i < this.GameObjects.length; i++)
			{
				if(this.GameObjects[i].enabled)
				{
					this.GameObjects[i].Start();
				}
			}

			if(!Dialogue.finished) 
			{
				ctx.drawImage(Images.dialogueBox, 0, 470);
				Dialogue.Continue();
			}
			this.LateUpdate();
		}
	};

	this.LateUpdate = function()
	{
		if(!Application.GamePaused)
		{
			//Codez la GUI ici pour que la pause soit prise en compte
		}
		if(Application.DebugMode)
		{
			Debug.ShowStats();
		}
	};

	// lance l'awake a la creation de la scene
	this.Awake();
}