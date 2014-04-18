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



function SceneRoom204 () 
{
	this.name = "Chambre 204";
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

			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 60, y: 380}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomBed.width, y: Images.roomBed.height - 40}
 												},
 												{
 													position: {x: 140, y: 410}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomBed.width - 100, y: Images.roomBed.height - 100}
 												},

										"Lit d'hopital",
										"Le lit de la chambre 204, il a l'air d'avoir servi récemment. [medium]",
										Images.roomBed


										));

			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 650, y: 320}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomTable.width, y: Images.roomTable.height}
 												},
 												{
 													position: {x: 680, y: 350}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomTable.width - 60, y: Images.roomTable.height - 60}
 												},

 												"Table de nuit",
 												"Le bouquet est encore frais. [medium]",
 												Images.roomTable


 												));

			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: -10, y: 160}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomMedicalstuff.width, y: Images.roomMedicalstuff.height}
 												},
 												{
 													position: {x: 20, y: 165}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomTable.width - 60, y: Images.roomMedicalstuff.height }
 												},

 												"Perfusion",
 												"La seringue est dans un sale état. [medium]",
 												Images.roomMedicalstuff


 												));

			if(!Progression.PassiveRoute)
			{
				this.GameObjects.push(new PassePartout({
 													position: {x: 740, y: 540}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 40, y: 40}
 												},
 												{
 													position: {x: 740, y: 540}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 40, y: 40}
 												},

 												"Passe Partout",
 												"Oh tiens, c'est le passe partout de l'hopital. [medium]",
 												"",
 												this


 												));
			}

			this.Started = true;
			Time.LevelLoaded();
			console.log(" %c System: Scene " + this.name + " have started!", 'background: #222; color: #bada55');
		}
		this.Update();
	};

	this.OnLoadLevel = function()
	{

	};

	this.Update = function()
	{
		if(!Application.GamePaused)
		{
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

			if (Progression.RouteBGotPassePartout == true && Dialogue.finished)
			{
				Application.LoadLevel("SecondFloorCorridor");
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

	this.OnLoadLevel = function()
	{
		GUI.Availaible = true;
	};

	// lance l'awake a la creation de la scene
	this.Awake();
}