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



function SceneRoom103 () 
{
	this.name = "Room103";
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

			//Rideaux
			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 250, y: 200}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 364 - 60, y: 301 - 60}
 												},
 												{
 													position: {x: 230 + 30, y: 200 + 5}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 364 - 70, y: 301 - 95}
 												},

 												"Rideaux",
 												"Rien de pertinent ici. [short]",
 												Images.roomCurtains2


 												));

			//Chaise
			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 450, y: 400}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 176, y: 191}
 												},
 												{
 													position: {x: 450 + 20, y: 400 + 15}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 176 - 60, y: 191 - 35}
 												},

 												"Chaise",
 												"Ce n'est pas le moment de se reposer ! [short]",
 												Images.roomChaise


 												));

			//Table de chevet
			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 650, y: 300}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 173, y: 236}
 												},
 												{
 													position: {x: 650 + 30, y: 300 + 23}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 173 - 65, y: 236 - 53}
 												},

 												"Table de chevet",
 												"Il n'y a rien pour moi là-dedans. [short]",
 												Images.roomTable


 												));

			//Porte Perfusion
			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 100, y: 120}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 100, y: 521}
 												},
 												{
 													position: {x: 100, y: 120}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 100, y: 521}
 												},

 												"Porte-perfusion",
 												"La dose est a plus de 9000 ml! [short]",
 												Images.roomMedicalstuff


 												));

			//Lit
			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: -100, y: 420}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 568, y: 314}
 												},
 												{
 													position: {x: -100, y: 420 + 20}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 568 - 38, y: 314 - 55}
 												},

 												"Lit",
 												"Ce n'est pas le moment de se reposer! [short]",
 												Images.roomBed


 												));

			//Télé
			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 640, y: 150}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 203, y: 168}
 												},
 												{
 													position: {x: 640 + 35, y: 150 + 22}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 203 - 65, y: 168 - 60}
 												},

 												"Télévision",
 												"J'ai d'autre choses à faire! [short]",
 												Images.roomTele3


 												));


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

	this.OnLoadLevel = function()
	{

	};

	// lance l'awake a la creation de la scene
	this.Awake();
}