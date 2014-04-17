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



function SceneRoom104 () 
{
	this.name = "Chambre 104";
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
											position: {x: 230, y: 190}, 
											rotation: {x: 0, y: 0}, 
											scale: {x: Images.roomCurtains2.width, y: Images.roomCurtains2.height}
										},
										{
											position: {x: 680, y: 350}, 
											rotation: {x: 0, y: 0}, 
											scale: {x: Images.roomTable.width - 60, y: Images.roomTable.height - 60}
										},

										"Rideau",
										"La fenetre est férmé. [medium]",
										Images.roomCurtains2


										));

			this.GameObjects.push(new Coffre());

			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 40, y: 380}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomBed.width, y: Images.roomBed.height - 40}
 												},
 												{
 													position: {x: 90, y: 410}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomBed.width - 80, y: Images.roomBed.height - 100}
 												},

 												"Lit d'hopital",
 												"Le lit de la chambre 104, il a l'air inutilisé! [medium]",
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
 												"Le bouquet est en train de faner! [medium]",
 												Images.roomTable


 												));

			this.GameObjects.push(new DecorativeGameObject({
											position: {x: 500, y: 500}, 
											rotation: {x: 0, y: 0}, 
											scale: {x: Images.papers.width, y: Images.papers.height}
										},
										{
											position: {x: 500, y: 500}, 
											rotation: {x: 0, y: 0}, 
											scale: {x: Images.papers.width, y: Images.papers.height}
										},

										"Papiers",
										"*код безопасности 6359.* [long]",
										Images.papers


										));

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

			if (Progression.RouteAGotPassePartout == true && this.Step == 1)
			{
				Dialogue.Begin("Bingo ! Maintenant que j'ai le passe-partout, sortons d’ici ! [medium]", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.Step = 2;
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