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

function SceneHerosRoom () 
{
	this.name = "HerosRoom";
	this.Started = false;

	this.GameObjects = [];

	this.FadeOutWhiteScreen = 1;
	this.FadeInSurgeonAssist = 0;
	this.SurgeonAssistVisible = false;
	this.SurgeonMain = false;

	this.FadeInSurgeonMain = 0;
	this.DialogueStep = 0;

	this.Awake = function()
	{
		//codez l'awake avant le console.log
		Dialogue.finished = true;
		Dialogue.InitDialogue();
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
			// background
			ctx.drawImage(Images.ceilingBackground, 0, 0);

			//Fade Out Whitet
			if(this.FadeOutWhiteScreen > 0) 
			{
				this.FadeOutWhiteScreen -= 0.5 * Time.DeltaTime;
				if(this.FadeOutWhiteScreen < 0) return;
				var alphaOri = ctx.globalAlpha;
				ctx.globalAlpha = this.FadeOutWhiteScreen;

				ctx.fillStyle = "white";
				ctx.fillRect(0,0, canvas.width, canvas.height);

				ctx.globalAlpha = alphaOri;
			}
			if(this.FadeOutWhiteScreen < 0 && this.DialogueStep == 0)
			{
				Dialogue.Begin("qu'est ce [short] . [short] . [short] . qu'est ce qu'il se passe ? [long]", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.DialogueStep = 1;
			}

			// surgeon assist
			if(this.FadeOutWhiteScreen < 0 && this.FadeInSurgeonAssist < 1 && this.DialogueStep == 1 && Dialogue.finished) 
			{
				this.FadeInSurgeonAssist += Time.DeltaTime;
				var alphaOri = ctx.globalAlpha;
				ctx.globalAlpha = this.FadeInSurgeonAssist;
				ctx.drawImage(Images.ceilingSurgeon, 0, 0);
				ctx.globalAlpha = alphaOri;

				if(this.FadeInSurgeonAssist > 1) this.SurgeonAssistVisible = true;
			}
			// Dialogue Surgeon assist
			if(this.FadeInSurgeonAssist > 1 && this.DialogueStep == 1)
			{
				Dialogue.Begin("Docteur ! Le patient se reveille ! [long] ", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.DialogueStep = 2;
			}

			
			// Fade In Main Surgeon
			if(this.DialogueStep == 2 && Dialogue.finished) 
			{
				this.FadeInSurgeonMain += Time.DeltaTime;
				var alphaOri = ctx.globalAlpha;
				ctx.globalAlpha = this.FadeInSurgeonMain;
				ctx.drawImage(Images.surgeonMain, 0, 0);
				ctx.globalAlpha = alphaOri;

				if(this.FadeInSurgeonMain > 1)
				{
					this.surgeonMainVisible = true;
					this.DialogueStep = 3;
				} 
			}
			
			if(this.DialogueStep == 3)
			{
				Dialogue.Begin("Ce n'est pas un probleme. [short] On continue! [medium]", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.DialogueStep = 4;
			}

			if(this.DialogueStep == 4 && Dialogue.finished)
			{
				this.GameObjects.push(new ButtonChoice(1, "Se debattre", 150, 250, this));
				this.GameObjects.push(new ButtonChoice(2, "Ne rien faire", 550, 250, this));
				this.DialogueStep = 5;
			}

			if(this.SurgeonAssistVisible) ctx.drawImage(Images.ceilingSurgeon, 0, 0);
			if(this.surgeonMainVisible) ctx.drawImage(Images.surgeonMain, 0, 0);

			//WinBattle
			if(this.Step == 10)
			{
				this.GameObjects = [];
				this.SurgeonAssistVisible = false;
				this.surgeonMainVisible = false;
				Dialogue.Begin("Quoi? [short] ils [short] . [short] . [short] . ont disparus! Je dois demander de l'aide...", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.Step = 11;
			}

			if(this.Step == 11 && Dialogue.finished)
			{
				this.Step = 22;
			}
			if(this.Step == 20)
			{
				Dialogue.Begin("Quoi? [short] ils [short] . [short] . [short] . ont disparus! Je dois demander de l'aide...", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.Step = 21;
			}
			if(this.Step == 21 && Dialogue.finished)
			{
				this.Step = 22;
			}

			if(this.Step == 22)
			{
				Application.LoadLevel("SecondFloorCorridor");
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

	this.ChoiceMade = function (idClicked)
	{
		if(idClicked == 1)
		{
			this.GameObjects = [];
			this.GameObjects.push(
				new CursorTarget(Images.ceilingBackground, [{sprite: Images.surgeonMain, x: 0, y: 0, w: 777, h: 728, speed: 10, Life: 5}], this));
			//Combat;
		}
		else
		{
			//pasCombat;
		}
	}

	// lance l'awake a la creation de la scene
	this.Awake();
}