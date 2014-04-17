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

 												"Armoire",
 												"Ah ! Voici la clé de l’ascenseur ! [medium]",
 												Images.roomCloset


 												));

			//Rideaux
			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 250, y: 200}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 364 - 50, y: 301 - 50}
 												},
 												{
 													position: {x: 230 + 30, y: 200 + 5}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 364 - 70, y: 301 - 95}
 												},

 												"Rideaux",
 												"Rien de pertinent ici. [short]",
 												Images.roomCurtains3


 												));

			//Canapé
			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 260, y: 350}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 429, y: 234}
 												},
 												{
 													position: {x: 220 + 80, y: 350 + 28}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: 429 - 80, y: 234 - 80}
 												},

 												"Canapé",
 												"Pas de temps à perdre ! [short]",
 												Images.roomSofa2


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

			//Clé
			this.GameObjects.push(new Key());

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

	this.DestroyKey = function (key)
	{
		var o = this.GameObjects.indexOf(key);
		this.GameObjects.splice(o, 1);
	}

	// lance l'awake a la creation de la scene
	this.Awake();
}