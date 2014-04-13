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



function SceneLoader () 
{
	this.name = "Loader";
	this.Started = false;

	this.GameObjects = [];
	this.imagesLoaded = 0;
	var loadingShowed = false;
	this.Awake = function()
	{
		//codez l'awake avant le console.log


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
	this.alphacountIsartLogo = 0;
	this.alphacountHtmlLogo = 0;
	this.Update = function()
	{
		if(!Application.GamePaused)
		{
			if(this.imageLoaded == ImagesPath.length)
			{
				 Scenes["title"] = new SceneTitle();
				 Application.LoadLevel("title");
			}
			ctx.fillStyle = "black";
			ctx.fillRect(0,0, canvas.width, canvas.height);
			if(Images.loaderBackground)
			{
				ctx.drawImage(Images.loaderBackground, 0, 0, canvas.width, canvas.height);
			}
			if(Images.logoIsart && Images.logoHtml5)
			{
				ctx.save();

				this.alphacountIsartLogo += 0.3* Time.DeltaTime;
				ctx.globalAlpha = this.alphacountIsartLogo;
				ctx.drawImage(Images.logoIsart, canvas. width / 2 - Images.logoHtml5.width /2 + 10,50);
				if(this.alphacountIsartLogo > 1.5)
				{
					this.alphacountHtmlLogo += 1 * Time.DeltaTime;
					ctx.globalAlpha = this.alphacountHtmlLogo;
					ctx.drawImage(Images.logoHtml5, canvas. width / 2 - Images.logoHtml5.width /2 ,150);
				}
				ctx.restore();

			}

			if(this.alphacountHtmlLogo > 2 && !this.loadingShowed)
			{
				this.loadingShowed = true;
				Dialogue.Begin("Chargement [short] . [short] . [short] . [short]", 0.1, {x: 465 , y:490}, "white");
			}

			if(Dialogue.finished) this.loadingShowed = false;
			if(!Dialogue.finished) 
			{
				Dialogue.Continue();
				if(this.imageLoaded == ImagesPath.length)
				{
					 Scenes["title"] = new Title();
					 Application.LoadLevel("title");
				}
			}

			ctx.strokeStyle = "white";
			ctx.strokeRect( canvas.width / 2 - 200, 500, 400, 20);
			ctx.fillStyle = "white";
			var portion = 400 / ImagesPath.length;
			ctx.RoundedBox( canvas.width / 2 - 198, 503, this.imageLoaded * portion - 4, 15, 6);

			
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