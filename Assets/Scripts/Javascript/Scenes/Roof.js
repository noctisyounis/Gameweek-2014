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



function SceneRoof () 
{
	this.name = "Toit";
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
			ctx.drawImage(Images.toitBackground ,0,0, canvas.width, canvas.height);

			switch(this.step){
				case 0:
					GUI.Availaible = false;
					Dialogue.Begin("Aucune issue [short] . [short] . [short] . [short]", 0.10, {x:30, y:570}, "white", "30px Georgia");
					this.step++;
					break;
				case 1:
					if(Dialogue.finished){
						Dialogue.Begin("“RECULEZ ! NE VOUS APPROCHEZ PAS !”", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
					}
					break;
				case 2:
					if(Dialogue.finished){
						this.GameObjects.push(
							new CursorTarget(Images.toitBackground, [
								{sprite: Images.cop, x: 0, y: 150, w: 400, h: 800, speed: 5, Life: 15},
								{sprite: Images.cop, x: 300, y: 290, w: 400, h: 800, speed: 5, Life: 15},
								{sprite: Images.cop, x: 600, y: 100, w: 400, h: 800, speed: 5, Life: 15}
								], this));
						this.step++;
					}
					break;
				case 3:
					break;
				case 4:
					this.GameObjects = [];
					if(Dialogue.finished){
						Dialogue.Begin("Je... [short] C’était donc moi...", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
					}
					break;
				case 5:
					if(Dialogue.finished){
						Dialogue.Begin("Depuis le début ...... [short] Qu’ai-je fait...", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
					}
					break;
				case 6:
					if(Dialogue.finished){
						GUI.Availaible = true;
						this.step++;
					}
					break;
				case 7:
					Application.LoadLevel("Outro");
					break;
			}

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

	this.BattleResult = function(str)
	{
		this.step++;
	}

	// lance l'awake a la creation de la scene
	this.Awake();
}