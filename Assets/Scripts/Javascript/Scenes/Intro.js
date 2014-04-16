/*	**** For create a new GameObject **** 
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

function SceneIntro () 
{
	this.name = "Intro";
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
	this.Step = 0;
	this.firstIntroPosition = -300;
	this.secondIntroPosition = - 200;
	this.thirdIntroAlpha = 0;
	this.offsetX = 435;
	this.offsetY = 219;
	this.fifthIntroPosition = 3000;
	this.FadeInWhiteScreen = 0;
	this.Update = function()
	{
		if(!Application.GamePaused)
		{

			// Draw Black background
			ctx.fillStyle = "black";
			ctx.fillRect(0,0, canvas.width, canvas.height);
			//Draw Intro 1
			if(this.Step == 0)
			{
				this.firstIntroPosition += 170 * Time.DeltaTime;
				ctx.drawImage(Images.intro1, this.firstIntroPosition + 25, 50);
				if(this.firstIntroPosition > 100) this.Step = 1;
			}
			if(this.Step > 0) ctx.drawImage(Images.intro1, 100 + 25, 50);

			if(this.Step == 1)
			{ 
				Dialogue.Begin("[medium] L'hôpital a appelé, [medium] ils ont trouvé un donneur... [medium]", 0.1, {x:100, y:580}, "white", "30px Georgia");
				this.Step = 2;
			}
			if(this.Step == 2 && Dialogue.finished)
			{
				this.secondIntroPosition += 170 * Time.DeltaTime;
				ctx.drawImage(Images.intro2, 405, this.secondIntroPosition);
				if(this.secondIntroPosition > 50) this.Step = 3;
			}

			if(this.Step > 2) ctx.drawImage(Images.intro2, 405, 50);

			if(this.Step == 3)
			{
				Dialogue.Begin("[medium] “Bonjour monsieur. Pouvez-vous remplir ce formulaire s’il vous plaît ?” [medium]", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.Step = 4;
			}
			// Draw Intro 3
			if(this.Step == 4 && Dialogue.finished)
			{
				this.thirdIntroAlpha += Time.DeltaTime / 2;
				var alphaOri = ctx.globalAlpha;
				ctx.globalAlpha = this.thirdIntroAlpha;
				ctx.drawImage(Images.intro3, 660, 50);
				ctx.globalAlpha = alphaOri;
				if(this.thirdIntroAlpha > 1) this.Step = 5;
			}

			if(this.Step > 4) ctx.drawImage(Images.intro3, 660, 50);
			// Draw Intro 4 && 5
			if(this.Step == 5)
			{
				Dialogue.Begin("Bien, [short] votre chambre sera prête quand vous sortirez du bloc opératoire. [medium] [long]", 0.1, {x:30, y:580}, "white", "30px Georgia");
				this.Step = 6;
			}
			if(this.Step == 6)
			{
				if(this.fifthIntroPosition > 495) 
				{
						this.fifthIntroPosition -= 8;
						ctx.drawImage(Images.intro5, this.fifthIntroPosition, 270);
				}
				else this.Step = 7;
				if(this.offsetX > 0) this.offsetX -= 4;
				if(this.offsetY > 0) this.offsetY -= 2;
				ctx.drawImage(Images.intro4, 125 + this.offsetY, 240, 435 - this.offsetX, 229);



			}
			if(this.Step > 6)
			{
				ctx.drawImage(Images.intro5, 495, 270);
				ctx.drawImage(Images.intro4, 125, 240, 435, 229);
			} 
			
			if(this.Step == 7)
			{
				this.FadeInWhiteScreen += 0.2 * Time.DeltaTime;
				var alphaOri = ctx.globalAlpha;
				ctx.globalAlpha = this.FadeInWhiteScreen;

				ctx.fillStyle = "white";
				ctx.fillRect(0,0, canvas.width, canvas.height);

				ctx.globalAlpha = alphaOri;

				if(this.FadeInWhiteScreen > 1) this.Step = 8;
			}
			if(this.Step == 8)
			{
				Application.LoadLevel("HerosRoom");
			}
			for(var GameObject in this.GameObjects)
			{
				if(GameObject.enable)
				{
					GameObject.Start();
				}
			}
			if(!Dialogue.finished) {Dialogue.Continue();}
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