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



function SecondFloorCorridor () 
{
	this.name = "SecondFloorCorridor";
	this.Started = false;
	this.elevatorstate = true;
	this.corridorShadowTextProgression = 0;
	this.GameObjects = [];

	this.shadowAnimScale = {
		x : 375,
		y : 150,
		w : 362,
		h : 614,
		speed : 10
	};
	this.shadowspawntimer = 0;
	this.shadowcloseevelatortimer = 0;

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

	this.Update = function()
	{
		if(!Application.GamePaused)
		{
			for(var i = 0; i < this.GameObjects.length; i++)
			{
				if(this.GameObjects[i].enabled)
				{
					this.GameObjects[i].Start();
				}
			}
			if(this.elevatorstate)
				ctx.drawImage(Images.ascenseurOuvert, 448, 274);
			else
				ctx.drawImage(Images.ascenseurFerme, 448, 274);
			ctx.drawImage(Images.couloirBackgroundNoElevator, 0, 0);

			if(!Progression.SeenCorridorShadow){
				switch(this.corridorShadowTextProgression){
					case 0:
						Dialogue.Begin("!!! [long] ", 0.05, {x:30, y:570}, "white", "30px Georgia");
						this.corridorShadowTextProgression++;
						break;
					case 1:
						if(Dialogue.finished){
							ctx.drawImage(Images.couloirOmbre, this.shadowAnimScale.x, this.shadowAnimScale.y, this.shadowAnimScale.w, this.shadowAnimScale.h);
							this.shadowspawntimer += Time.DeltaTime;
							if(this.shadowspawntimer > 2)
								this.corridorShadowTextProgression++;
						}
						break;
					case 2:
						ctx.drawImage(Images.couloirOmbre, this.shadowAnimScale.x, this.shadowAnimScale.y, this.shadowAnimScale.w, this.shadowAnimScale.h);
						Dialogue.Begin("Hello...? [short] [short]", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.corridorShadowTextProgression++;
						break;
					case 3:
						ctx.drawImage(Images.couloirOmbre, this.shadowAnimScale.x, this.shadowAnimScale.y, this.shadowAnimScale.w, this.shadowAnimScale.h);
						if(Dialogue.finished){
							this.corridorShadowTextProgression++;
						}
						break;
					case 4:
						if(this.shadowAnimScale.w > 200){
							this.shadowAnimScale.x += this.shadowAnimScale.speed * 0.75 * Time.DeltaTime;
							this.shadowAnimScale.y += this.shadowAnimScale.speed * 0.50 * Time.DeltaTime;
							this.shadowAnimScale.w -= this.shadowAnimScale.speed * 2 * Time.DeltaTime;
							this.shadowAnimScale.h -= this.shadowAnimScale.speed * 2 * Time.DeltaTime;
	  						ctx.drawImage(Images.couloirOmbre, this.shadowAnimScale.x, this.shadowAnimScale.y, this.shadowAnimScale.w, this.shadowAnimScale.h);
  						}
  						else
  							this.corridorShadowTextProgression++;
						break;
					case 5:
						ctx.drawImage(Images.couloirOmbre, this.shadowAnimScale.x, this.shadowAnimScale.y, this.shadowAnimScale.w, this.shadowAnimScale.h);
						Dialogue.Begin("Hey! [short] WAIT! [short]", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.corridorShadowTextProgression++;
						break;
					case 6:
						if(this.shadowAnimScale.w > 75){
							this.shadowAnimScale.x += this.shadowAnimScale.speed * 0.75 * Time.DeltaTime;
							this.shadowAnimScale.y += this.shadowAnimScale.speed * 1.5 * Time.DeltaTime;
							this.shadowAnimScale.w -= this.shadowAnimScale.speed * 2 * Time.DeltaTime;
							this.shadowAnimScale.h -= this.shadowAnimScale.speed * 2 * Time.DeltaTime;
	  						ctx.drawImage(Images.couloirOmbre, this.shadowAnimScale.x, this.shadowAnimScale.y, this.shadowAnimScale.w, this.shadowAnimScale.h);
  						}
  						else{
  							this.elevatorstate = false;
  							this.shadowcloseevelatortimer += Time.DeltaTime;
  							if(this.shadowcloseevelatortimer > 1)
  						  		this.corridorShadowTextProgression++;
  						}
  						break;
  					case 7:
  						Dialogue.Begin("... [long]", 0.50, {x:30, y:570}, "white", "30px Georgia");
  						break;
				}
			}

			if(!Dialogue.finished){
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