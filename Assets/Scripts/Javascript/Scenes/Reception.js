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
			//codez le start avant le changement de booleen

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

			if(Progression.GotElevatorKey && !Progression.HasBattleRoom104Nurse){
				switch(this.step){
					case 0:
						GUI.Availaible = false;
						Dialogue.Begin("Cet hôpital est sans dessus dessous ! Que se passe t-il ici ?!", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
						break;
					case 1:
						if(Dialogue.finished){
							Dialogue.Begin("Je dois trouver un autre chemin.", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 2:
						if(Dialogue.finished){
							GUI.Availaible = true;
							this.step++;
						}
						break;
				}
			}
			else if(!Progression.PassiveRoute && Progression.RouteBGotNote){
				switch(this.step){
					case 0:
						GUI.Availaible = false;
						Dialogue.Begin("“Mais qu’est-ce que vous me voulez !? CASSEZ-VOUS !”", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
						break;
					case 1:
						if(Dialogue.finished){
							Dialogue.Begin("Y en a partout ! Il me faut un truc pour me frayer un chemin !", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 2:
						if(Dialogue.finished){
							Dialogue.Begin("“NE M’APPROCHEZ-PAS !”", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 3:
						if(Dialogue.finished){
							this.GameObjects.push(
								new CursorTarget(Images.accueil1Background, [
									{sprite: Images.cop, x: 50, y: 150, w: 400, h: 800, speed: 5, Life: 20},
									{sprite: Images.cop, x: 520, y: 150, w: 400, h: 800, speed: 5, Life: 20}
									], this));
							this.step++;
						}
						break;
					case 4:
						break;
					case 5:
						this.GameObjects = [];
						if(Dialogue.finished){
							Dialogue.Begin("La sortie est juste ici ! Ce cauchemar va enfin se terminer !", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 6:
						if(Dialogue.finished){
							Dialogue.Begin("Que... Qu’est-ce que... Des hallucinations ?", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 7:
						if(Dialogue.finished){
							Dialogue.Begin("...Tout ça c’était... dans ma tête ?", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 8:
						if(Dialogue.finished){
							Dialogue.Begin("Qu’est-ce qu’il m’arrive... Qu’ai-je fait...", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 9:
						if(Dialogue.finished){
							GUI.Availaible = true;
							this.step++;
						}
						break;
				}
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