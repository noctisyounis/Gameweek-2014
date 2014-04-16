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



function SceneTitle () 
{
	this.name = "Title";
	this.Started = false;

	this.GameObjectsTitle = [];
	this.GameObjectsLoad = [];
	this.PlayPressed = false;

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
			this.GameObjectsTitle.push(new ButtonStart());
			this.GameObjectsLoad.push(new ButtonBackToMenu());
			for(var i = 0; i != 3; i++)
			{
				this.GameObjectsLoad.push(new ButtonLoadGame(i + 1));
			}
			/****/
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
			ctx.drawImage(this.PlayPressed ? Images.titleLoadBackground : Images.titleBackground, 0,0);

			if(!this.PlayPressed)
			{
				for(var i = 0; i < this.GameObjectsTitle.length; i++)
				{
					if(this.GameObjectsTitle[i].enabled)
					{
						this.GameObjectsTitle[i].Start();
					}
				}
			}
			else
			{
				for(var i = 0; i < this.GameObjectsLoad.length; i++)
				{
					if(this.GameObjectsLoad[i].enabled)
					{
						this.GameObjectsLoad[i].Start();
					}
				}
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