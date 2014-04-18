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



function FirstFloorCorridor () 
{
	this.name = "Couloir 1er";
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

			this.Started = true;
			Time.LevelLoaded();
			console.log(" %c System: Scene " + this.name + " have started!", 'background: #222; color: #bada55');
		}
		this.Update();
	};

	this.OnLoadLevel = function()
	{

	};

	this.Step = 1;
	this.alphaShadow = 2;
	this.AlphaPosition = 400;
	this.Update = function()
	{
		if(!Application.GamePaused)
		{
			ctx.drawImage(Images.ascenseurFerme, 448, 274);
			ctx.drawImage(Images.couloirBackgroundNoElevator, 0, 0);
			for(var i = 0; i < this.GameObjects.length; i++)
			{
				if(this.GameObjects[i].enabled)
				{
					this.GameObjects[i].Start();
				}
			}
		}


		if(Progression.PassiveRoute && !Progression.HasBattleRoom104Nurse){
			switch(this.Step){
				case 1:
					GUI.Availaible = false;
					this.AlphaPosition -=  10 * Time.DeltaTime;
					ctx.drawImage(Images.couloirOmbre, this.AlphaPosition, 277, 130, 200);
					if(this.AlphaPosition < 356) 
						this.Step++;
					break;
				case 2:
					this.alphaShadow -= Time.DeltaTime; 

					var alphaOri = ctx.globalAlpha;
					ctx.globalAlpha = this.alphaShadow;
					ctx.drawImage(Images.couloirOmbre, 356, 277, 130, 200);
					ctx.globalAlpha = alphaOri;

					if(this.alphaShadow <= 0.1)
						this.Step++;
					break;
				case 3:
					Dialogue.Begin("Il est rentré dans cette chambre! [short]", 0.10, {x:30, y:570}, "white", "30px Georgia");
					this.Step++;
					break;
				case 4:
					if(Dialogue.finished)
						Application.LoadLevel("Room104");
					break;
			}
		}
		else if(Progression.PassiveRoute && Progression.HasBattleRoom104Nurse){
			switch(this.Step){
				case 1:
					GUI.Availaible = false;
					Dialogue.Begin("L’ascenseur est déjà utilisé, sûrement par une de ces bestioles.", 0.10, {x:30, y:570}, "white", "30px Georgia");
					this.Step++;
					break;
				case 2:
					if(Dialogue.finished){
						Dialogue.Begin("Je ne prendrais pas le risque de vérifier.", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.Step++;
					}
					break;
				case 3:
					if(Dialogue.finished){
						Dialogue.Begin("Passons par les escaliers.", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.Step++;
					}
					break;
				case 4:
					if(Dialogue.finished){
						GUI.Availaible = true;
						this.Step++;
					}
					break;
			}
		}

		if(!Dialogue.finished) {
			Dialogue.Continue();
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