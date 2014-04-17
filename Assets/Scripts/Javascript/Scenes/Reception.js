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



function SceneReception () 
{
	this.name = "Accueil";
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
											position: {x: 60, y: 150}, 
											rotation: {x: 0, y: 0}, 
											scale: {x: Images.monsterNurse.width, y: Images.monsterNurse.height}
										},
										{
											position: {x: 0, y: 0}, 
											rotation: {x: 0, y: 0}, 
											scale: {x: 0, y:0}
										},

										"Policier",
										"Le lit de la chambre 204, il a l'air d'avoir servi récemment. [medium]",
										Images.monsterNurse


										));
		this.GameObjects.push(new DecorativeGameObject({
								position: {x: 310, y: 290}, 
								rotation: {x: 0, y: 0}, 
								scale: {x: Images.monsterNurse.width, y: Images.monsterNurse.height}
							},
							{
								position: {x: 0, y: 0}, 
								rotation: {x: 0, y: 0}, 
								scale: {x: 0, y:0}
							},

							"Gendarme",
							"Le lit de la chambre 204, il a l'air d'avoir servi récemment. [medium]",
							Images.monsterNurse


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
			ctx.fillStyle = "black";
			ctx.drawImage(Images.accueil1Background,0,0, canvas.width, canvas.height);
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