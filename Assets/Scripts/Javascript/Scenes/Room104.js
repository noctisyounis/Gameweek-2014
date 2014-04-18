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



function SceneRoom104 () 
{
	this.name = "Chambre 104";
	this.Started = false;
	this.step = 0;
	this.FadeInNurse = 0;
	this.NurseVisible = false;

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

			this.GameObjects.push(new DecorativeGameObject({
													position: {x: 230, y: 190}, 
													rotation: {x: 0, y: 0}, 
													scale: {x: Images.roomCurtains2.width, y: Images.roomCurtains2.height}
												},
												{
													position: {x: 230, y: 190}, 
													rotation: {x: 0, y: 0}, 
													scale: {x: Images.roomCurtains2.width, y: Images.roomCurtains2.height - 100}
												},

												"Rideau",
												"La fenêtre est fermée. [medium]",
												Images.roomCurtains2


												));

			this.GameObjects.push(new Coffre());

			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 40, y: 380}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomBed.width, y: Images.roomBed.height - 40}
 												},
 												{
 													position: {x: 90, y: 410}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomBed.width - 80, y: Images.roomBed.height - 100}
 												},

 												"Lit d'hopital",
 												"Le lit de la chambre 104, il a l'air inutilisé! [medium]",
 												Images.roomBed


 												));

			this.GameObjects.push(new DecorativeGameObject({
 													position: {x: 650, y: 320}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomTable.width, y: Images.roomTable.height}
 												},
 												{
 													position: {x: 680, y: 350}, 
 													rotation: {x: 0, y: 0}, 
 													scale: {x: Images.roomTable.width - 60, y: Images.roomTable.height - 60}
 												},

 												"Table de nuit",
 												"Le bouquet est en train de faner! [medium]",
 												Images.roomTable


 												));

			this.GameObjects.push(new DecorativeGameObject({
													position: {x: 500, y: 500}, 
													rotation: {x: 0, y: 0}, 
													scale: {x: Images.papers.width, y: Images.papers.height}
												},
												{
													position: {x: 500, y: 500}, 
													rotation: {x: 0, y: 0}, 
													scale: {x: Images.papers.width, y: Images.papers.height}
												},

												"Papiers",
												"*код безопасности 6359.* [long]",
												Images.papers


												));

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
			ctx.drawImage(Images.roomBackground, 0, 0, canvas.width, canvas.height);
			for(var i = 0; i < this.GameObjects.length; i++)
			{
				if(this.GameObjects[i].enabled)
				{
					this.GameObjects[i].Start();
				}
			}
			if(Progression.PassiveRoute && !Progression.RouteAGotPassePartout)
			{
				switch(this.step)
				{
					case 0:
						Dialogue.Begin("*Clic* [short]", 0.1, {x:30, y:580}, "white", "30px Georgia");
						this.step++;
						break;
					case 1:
						if(Dialogue.finished){
							Dialogue.Begin("“?! Hey ! Ouvrez cette porte !”", 0.1, {x:30, y:580}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 2:
						if(Dialogue.finished){
							Dialogue.Begin("Rien à faire, elle est verrouillée. Je dois trouver un moyen de l’ouvrir.", 0.1, {x:30, y:580}, "white", "30px Georgia");
							this.step++;
						}
						break;
				}
			}
			else if (Progression.PassiveRoute && Progression.RouteAGotPassePartout)
			{
				switch(this.step)
				{
					case 0:
						Dialogue.Begin("Bingo ! Maintenant que j'ai le passe-partout, sortons d’ici ! [medium]", 0.1, {x:30, y:580}, "white", "30px Georgia");
						this.step++;
						break;
					case 1:
						if(Dialogue.finished){
							Dialogue.Begin("*BAM*", 0.1, {x:30, y:580}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 2:
						if(Dialogue.finished){
							Dialogue.Begin("C'était quoi ce bruit ?", 0.1, {x:30, y:580}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 3:
						if(Dialogue.finished){
							for(i = 0; i < this.GameObjects.length-1; i++){
								this.GameObjects[i].enabled = false;
							}
							this.NurseVisible = false;
							this.GameObjects.push(
								new CursorTarget(Images.roomBackground, [{sprite: Images.monsterNurse, x: 0, y: 0, w: Images.monsterNurse.width, h: Images.monsterNurse.height, speed: 10, Life: 15}], this));
							this.step++;
						}
						break;
					case 4:
						break;
					case 5:
						for(i = 0; i < this.GameObjects.length-1; i++){
							this.GameObjects[i].enabled = true;
						}
						this.GameObjects.splice(this.GameObjects.indexOf(CursorTarget),1);
						Dialogue.Begin("Qu’est-ce que c’était que ce monstre ?", 0.1, {x:30, y:580}, "white", "30px Georgia");
						this.step++;
						break;
					case 6:
						if(Dialogue.finished){
							Dialogue.Begin("Je dois vite trouver quelqu’un de vivant. Partons d’ici.", 0.1, {x:30, y:580}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 7:
						if(Dialogue.finished){
							Progression.HasBattleRoom104Nurse = true;
							Application.LoadLevel("FirstFloorCorridor");
						}
						break;
				}

			}
			else if(!Progression.PassiveRoute && !Progression.HasBattleRoom104Nurse)
			{
				if(this.NurseVisible) 
					ctx.drawImage(Images.monsterNurse, 0, 0);
				switch(this.step)
				{
					case 0:
						Dialogue.Begin("*Toc* [short] *Toc* *Toc* *Toc*! [medium]", 0.1, {x:30, y:580}, "white", "30px Georgia");
						this.step++;
						break;
					case 1:
						if(Dialogue.finished){
							this.FadeInNurse += Time.DeltaTime;
							var alphaOri = ctx.globalAlpha;
							ctx.globalAlpha = this.FadeInNurse;
							ctx.drawImage(Images.monsterNurse, 0, 0);
							ctx.globalAlpha = alphaOri;

							if(this.FadeInNurse > 1){
								this.NurseVisible = true;
								this.step++;
							}
						}
						break;
					case 2:
						if(Dialogue.finished){
							Dialogue.Begin("Oh merde...", 0.1, {x:30, y:580}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 3:
						//Combat
						if(Dialogue.finished){
							for(i = 0; i < this.GameObjects.length-1; i++){
								this.GameObjects[i].enabled = false;
							}
							this.NurseVisible = false;
							this.GameObjects.push(
								new CursorTarget(Images.roomBackground, [{sprite: Images.monsterNurse, x: 0, y: 0, w: Images.monsterNurse.width, h: Images.monsterNurse.height, speed: 10, Life: 15}], this));
							this.step++;
						}
						break;
					case 4:
						break;
					case 5:
						for(i = 0; i < this.GameObjects.length-1; i++){
							this.GameObjects[i].enabled = true;
						}
						this.GameObjects.splice(this.GameObjects.indexOf(CursorTarget),1);
						Dialogue.Begin("Mais qu’est-ce qu’il se passe ici ?", 0.1, {x:30, y:580}, "white", "30px Georgia");
						this.step++;
						break;
					case 6:
						if(Dialogue.finished){
							Dialogue.Begin("C'était quoi cette... chose !?", 0.1, {x:30, y:580}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 7:
						if(Dialogue.finished){
							Dialogue.Begin("Faut que je parte, et vite ! Il doit bien y avoir une clé quelque part.", 0.1, {x:30, y:580}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 8:
						if(Dialogue.finished){
							Progression.HasBattleRoom104Nurse = true;
							Application.LoadLevel("SecondFloorCorridor");
							this.step++;
						}
						break;
						
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
		if(str == "Win")
		{
			Progression.WonAgainstRoom104Nurse = true;
			this.step++;
		}
		else if (str == "Loose"){
			Progression.WonAgainstRoom104Nurse = false;
			this.step++;
		}
	}

	// lance l'awake a la creation de la scene
	this.Awake();
}