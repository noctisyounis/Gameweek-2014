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



function SceneOffice () 
{
	this.name = "Bureau";
	this.Started = false;
	this.step = 0;

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

			GUI.Availaible = true;

			this.GameObjects.push(new DecorativeGameObject({
										position: {x: 575, y: 210}, 
										rotation: {x: 0, y: 0}, 
										scale: {x: 224, y: 314}
									},
									{
										position: {x: 575 + 30, y: 210}, 
										rotation: {x: 0, y: 0}, 
										scale: {x: 224 - 60, y: 314 - 30}

									},

									"Bibliothèque",
									"Il y a beaucoup de livres. [medium]",
									Images.library


									));

			//Canapé
			this.GameObjects.push(new DecorativeGameObject({
										position: {x: 230, y: 370}, 
										rotation: {x: 0, y: 0}, 
										scale: {x: 429 / 1.2, y: 234 / 1.2}
									},
									{
										position: {x: 130 + 130, y: 370 + 28}, 
										rotation: {x: 0, y: 0}, 
										scale: {x: (429 - 80) / 1.2, y: (234 - 80) / 1.2}
									},

									"Canapé",
									"Pas de temps à perdre ! [short]",
									Images.roomSofa2


									));

			this.GameObjects.push(new DecorativeGameObject({
										position: {x: 120, y: 370}, 
										rotation: {x: 0, y: 0}, 
										scale: {x: 153, y: 196}
									},
									{
										position: {x: 120, y: 370}, 
										rotation: {x: 0, y: 0}, 
										scale: {x: 123, y: 196}
									},

									"Chaise de Bureau",
									"Cette chaise à l'air confortable. [medium]",
									Images.rollingChair


									));

			this.GameObjects.push(new DecorativeGameObject({
										position: {x: 700, y: 400}, 
										rotation: {x: 0, y: 0}, 
										scale: {x: Images.roomCurtains2.width / 1.2, y: Images.roomCurtains2.height / 1.2}
									},
									{
										position: {x: 727, y: 450}, 
										rotation: {x: 0, y: 0}, 
										scale: {x: 250, y: 170}
									},

									"Bureau",
									"Le bois du bureau commence à ternir. [medium]",
									Images.desk


									));

			this.GameObjects.push(new Computer());

			this.GameObjects.push(new Card());

			this.Started = true;
			Time.LevelLoaded();
			console.log(" %c System: Scene " + this.name + " have started!", 'background: #222; color: #bada55');
		}
		this.Update();
	};

	this.OnLoadLevel = function()
	{
		this.step = 0;
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

			if(this.step == 0 && Dialogue.finished && Progression.RouteAHasComputerAccess)
			{
				Dialogue.Begin("*[...] présente de sévères troubles du comportement suite à son opération* [short]", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.step++;
			}

			if(this.step == 1 && Dialogue.finished && Progression.RouteAHasComputerAccess)
			{
				Dialogue.Begin("*[...] au coeur.* [short]", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.step++;
			}

			if(this.step == 2 && Dialogue.finished && Progression.RouteAHasComputerAccess)
			{
				Dialogue.Begin("*[...] Nous recommandons une mise en isolement de l’individu.* [short]", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.step++;
			}

			if(this.step == 3 && Dialogue.finished && Progression.RouteAHasComputerAccess)
			{
				Dialogue.Begin("Ces choses sont réelles !  Je ne les ai pas imaginées, c’est absurde ! [short]", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.step++;
			}

			if(this.step == 4 && Dialogue.finished && Progression.RouteAHasComputerAccess)
			{
				Dialogue.Begin("Je le saurais si j’étais fou.... [medium]", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.step++;
			}

			if(this.step == 5 && Dialogue.finished && Progression.RouteAHasComputerAccess)
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

	// lance l'awake a la creation de la scene
	this.Awake();
}