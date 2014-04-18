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
	this.name = "Couloir 2nd";
	this.Started = false;
	this.elevatorstate = true;
	this.step = 0;
	this.GameObjects = [];

	this.shadowAnimScale = {
		x : 375,
		y : 150,
		w : 362,
		h : 614,
		speed : 10
	};

	this.nurseAnimScale = {
		x : canvas.width/2-50,
		y : 300,
		w : 100,
		h : 250,
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
		
			if(this.elevatorstate)
				ctx.drawImage(Images.ascenseurOuvert, 448, 274);
			else
				ctx.drawImage(Images.ascenseurFerme, 448, 274);
			ctx.drawImage(Images.couloirBackgroundNoElevator, 0, 0);

			if(!Progression.SeenCorridorShadow){
				switch(this.step){
					case 0:
						GUI.Availaible = false;
						Dialogue.Begin("Qu’est-ce que . . . [long]", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
						break;
					case 1:
						if(Dialogue.finished){
							ctx.drawImage(Images.couloirOmbre, this.shadowAnimScale.x, this.shadowAnimScale.y, this.shadowAnimScale.w, this.shadowAnimScale.h);
							this.shadowspawntimer += Time.DeltaTime;
							if(this.shadowspawntimer > 2)
								this.step++;
						}
						break;
					case 2:
						ctx.drawImage(Images.couloirOmbre, this.shadowAnimScale.x, this.shadowAnimScale.y, this.shadowAnimScale.w, this.shadowAnimScale.h);
						Dialogue.Begin("“Excusez-moi ?” [short]", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
						break;
					case 3:
						ctx.drawImage(Images.couloirOmbre, this.shadowAnimScale.x, this.shadowAnimScale.y, this.shadowAnimScale.w, this.shadowAnimScale.h);
						if(Dialogue.finished){
							this.step++;
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
  							this.step++;
						break;
					case 5:
						ctx.drawImage(Images.couloirOmbre, this.shadowAnimScale.x, this.shadowAnimScale.y, this.shadowAnimScale.w, this.shadowAnimScale.h);
						Dialogue.Begin("“S’il vous p [short] . [short] . [short] . [short] ”", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
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
  							if(this.shadowcloseevelatortimer > 1 && Dialogue.finished)
  						  		this.step++;
  						}
  						break;
  					case 7:
  						if(Dialogue.finished){
  						  	Dialogue.Begin("Bon... il n’a pas du m’entendre. [short]", 0.10, {x:30, y:570}, "white", "30px Georgia");
  							this.step++;
  						}
  						break;
  					case 8:
  						if(Dialogue.finished){
    						Dialogue.Begin("Au moins je sais où il va, je vais attendre que l'ascenseur remonte. [short]", 0.10, {x:30, y:570}, "white", "30px Georgia");
  							this.step++;
  						}
  						break;
  					case 9:
  						if(Dialogue.finished){
  							this.elevatorstate = true;
  							this.step++;
  						}
  						break;
  					case 10:
  						if(Dialogue.finished){
    						Dialogue.Begin("C’est bien ma veine, c’est un ascenseur de service. [short]", 0.10, {x:30, y:570}, "white", "30px Georgia");
  							this.step++;
  						}
  						break;
    				case 11:
  						if(Dialogue.finished){
    						Dialogue.Begin("Vu qu’il faut une clé, je vais prendre les escaliers. [short]", 0.10, {x:30, y:570}, "white", "30px Georgia");
  							this.step++;
  						}
  						break;
  					case 12:
    					if(Dialogue.finished){
    						Dialogue.Begin("Quelle galère [short] . [short] . [short] . [short]", 0.10, {x:30, y:570}, "white", "30px Georgia");
  							this.step++;
  						}
  						break;
  					case 13:
    					if(Dialogue.finished){
    						Dialogue.Begin(" [short] . [short] . [short] . [short] ", 0.10, {x:30, y:570}, "white", "30px Georgia");
  							this.step++;
  						}
  						break;
  					case 14:
    					if(Dialogue.finished){
    						Dialogue.Begin("La porte des escaliers est verrouillée !", 0.10, {x:30, y:570}, "white", "30px Georgia");
  							this.step++;
  						}
  						break;
 					case 15:
    					if(Dialogue.finished){
    						Dialogue.Begin("Essayons de trouver quelqu’un. Je ne peux tout de même pas être seul !", 0.10, {x:30, y:570}, "white", "30px Georgia");
  							this.step++;
  						}
  						break;
  					case 16:
    					if(Dialogue.finished){
    						Dialogue.Begin("Je vais voir cette salle de repos.", 0.10, {x:30, y:570}, "white", "30px Georgia");
  							this.step++;
  						}
  						break;
    				case 17:
    					if(Dialogue.finished){
    						GUI.Availaible = true;
    						Progression.SeenCorridorShadow = true;
    						Application.LoadLevel("BreakRoom");
  						}
  						break;
				}
			}
			else if(Progression.HasBattleRoom104Nurse && !Progression.RouteAHasSeenBirthdayCard && Progression.PassiveRoute){
				switch(this.step){
					case 0:
						GUI.Availaible = false;
						Dialogue.Begin("Me revoilà au second étage... Bloquons vite l’accès à la cage d’escalier !", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
						break;
					case 1:
						if(Dialogue.finished){
							Dialogue.Begin("Cette chaise devrait faire l’affaire.", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 2:
						if(Dialogue.finished){
							Dialogue.Begin("Vu que j’ai le passe-partout, je vais essayer de fouiller le bureau.", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 3:
						if(Dialogue.finished){
							GUI.Availaible = true;
							this.step++;
							Application.LoadLevel("Office");
						}
						break;
				}
			}
			else if(Progression.RouteAHasComputerAccess && !Progression.RouteAHasBattleThingsAfterPC && Progression.PassiveRoute){
				switch(this.step){
					case 0:
						GUI.Availaible = false;
						Dialogue.Begin("L’ascenseur ! [short] Il n’est pas barricadé !", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
						break;
					case 1:
						if(Dialogue.finished){
							Dialogue.Begin("“Êtes-vous réel ? N’approchez pas ! J’ai dit reculez !”", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 2:
						if(Dialogue.finished){
							this.GameObjects.push(
								new CursorTarget(Images.couloirBackground, [{sprite: Images.monsterNurse, x: this.nurseAnimScale.x, y: this.nurseAnimScale.y, w: this.nurseAnimScale.w, h: this.nurseAnimScale.h, speed: 10, Life: 10}], this));
							this.step++;
						}
						this.nurseAnimScale.x -= this.nurseAnimScale.speed / 2 * Time.DeltaTime;
						this.nurseAnimScale.y -= this.nurseAnimScale.speed / 2 * Time.DeltaTime;
						this.nurseAnimScale.w += this.nurseAnimScale.speed * Time.DeltaTime;
						this.nurseAnimScale.h += this.nurseAnimScale.speed / 2 * Time.DeltaTime;
						ctx.drawImage (Images.monsterNurse, this.nurseAnimScale.x, this.nurseAnimScale.y, this.nurseAnimScale.w, this.nurseAnimScale.h);
						break;
					case 3:
						break;
					case 4:
						this.GameObjects = [];
						if(Progression.RouteAWonAgainstThingsAfterPC)
							Dialogue.Begin("Un… Un de moins ! Vite, barrons-nous d’ici !", 0.10, {x:30, y:570}, "white", "30px Georgia");
						else if(!Progression.RouteAWonAgainstThingsAfterPC)
							Dialogue.Begin("C’était moins une ! Faut vraiment que je me casse d’ici !", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
						break;
					case 5:
						if(Dialogue.finished){
							Progression.RouteAHasBattleThingsAfterPC = true;
							GUI.Availaible = true;
							this.step++;
							Application.LoadLevel("Roof");
						}
						break;
				}
			}
			else if(Progression.HasBattleRoom104Nurse && !Progression.RouteBGotNote && !Progression.PassiveRoute){
				switch(this.step){
					case 0:
						GUI.Availaible = false;
						Dialogue.Begin("Il faut absolument que je trouve comment sortir d'ici.", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
						break;
					case 1:
						if(Dialogue.finished){
							Dialogue.Begin("Le personnel doit bien avoir de quoi ouvrir. [short] . [short] . [short]", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 2:
						if(Dialogue.finished){
							Dialogue.Begin("Je vais aller re-fouiller la salle de repos.", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 3:
						if(Dialogue.finished){
							GUI.Availaible = true;
							this.step++;
							Application.LoadLevel("BreakRoom");
						}
						break;
				}
			}
			else if(Progression.RouteBGotNote && !Progression.RouteBGotPassePartout && !Progression.PassiveRoute){
				switch(this.step){
					case 0:
						GUI.Availaible = false;
						Dialogue.Begin("Personne pour le moment. Allons dans la chambre 204.", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
						break;
					case 1:
						if(Dialogue.finished){
							GUI.Availaible = true;
							this.step++;
							Application.LoadLevel("Room204");
						}
						break;
				}
			}
			else if(Progression.RouteBGotNote && Progression.RouteBGotPassePartout && !Progression.PassiveRoute){
				switch(this.step){
					case 0:
						GUI.Availaible = false;
						Dialogue.Begin("“AAAH ! Fous moi la paix bordel !”", 0.10, {x:30, y:570}, "white", "30px Georgia");
						this.step++;
						break;
					case 1:
						if(Dialogue.finished){
							Dialogue.Begin("Un truc à lui jeter, vite ! L’extincteur !", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}	
						break;
					case 2:
						if(Dialogue.finished){
							Dialogue.Begin("La porte de l'escalier ! Faut que je me tire !", 0.10, {x:30, y:570}, "white", "30px Georgia");
							this.step++;
						}
						break;
					case 3:
						if(Dialogue.finished){
							GUI.Availaible = true;
							this.step++;
							Application.LoadLevel("Reception");
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

	this.BattleResult = function(str)
	{
		if(str == "Win")
		{
			Progression.RouteAWonAgainstThingsAfterPC = true;
			this.step++;
		}
		else if (str == "Loose"){
			Progression.RouteAWonAgainstThingsAfterPC = false;
			this.step++;
		}
	}

	this.OnLoadLevel = function(){
		this.step = 0;
	}

	// lance l'awake a la creation de la scene
	this.Awake();
}