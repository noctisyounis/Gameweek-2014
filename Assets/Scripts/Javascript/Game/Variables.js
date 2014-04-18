var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var Scenes = {};

var ImagesPath = [
	
	{ name: "roomBackground", path: "Backgrounds/background_room1.jpg"},
	{ name: "roomBackground2", path: "Backgrounds/background_room2.jpg"},
	{ name: "couloirBackground", path: "Backgrounds/couloir.jpg"},
	{ name: "couloirBackgroundNoElevator", path: "Backgrounds/couloir2.png"},
	{ name: "ceilingBackground", path: "Backgrounds/ceiling.jpg"},
	{ name: "ceilingSurgeon", path: "Backgrounds/ceiling_surgeons.png"},
	{ name: "couloirOmbre", path: "Backgrounds/shadow.png"},
	{ name: "ascenseurFerme", path: "Backgrounds/ascenseur_ferme.jpg"},
	{ name: "ascenseurOuvert", path: "Backgrounds/ascenseur_ouvert.jpg"},
	{ name: "accueil1Background", path: "Backgrounds/background_accueil.jpg"},
	{ name: "accueil2Background", path: "Backgrounds/background_accueil2.jpg"},
	{ name: "toitBackground", path: "Backgrounds/background_roof.jpg"},
	{ name: "coffreBackground", path: "Backgrounds/coffre_background.jpg"},
	{ name: "coffreBouton", path: "Backgrounds/coffre_bouton.png"},
	{ name: "contourOrdinateur", path: "Backgrounds/contour_ordinateur.png"},
	{ name: "cardio", path: "Backgrounds/cardio.png"},
	{ name: "intro1", path: "Backgrounds/intro1.png"},
	{ name: "intro2", path: "Backgrounds/intro2.png"},
	{ name: "intro3", path: "Backgrounds/intro3.png"},
	{ name: "intro4", path: "Backgrounds/intro4.png"},
	{ name: "intro5", path: "Backgrounds/intro5.png"},
	{ name: "titleBackground", path: "Backgrounds/menu.jpg"},
	{ name: "titleLoadBackground", path: "Backgrounds/menu1.jpg"},
	{ name: "titleCreditBackground", path: "Backgrounds/credits.jpg"},
	{ name: "tutoBattle", path: "Backgrounds/combat_tuto.jpg"},

	{ name: "map_planRDC", path: "Map/Plan_RDC.jpg"},
	{ name: "map_planE1", path: "Map/Plan_E1.jpg"},
	{ name: "map_planE2", path: "Map/Plan_E2.jpg"},
	{ name: "map_accueil", path: "Map/Accueil.png"},
	{ name: "map_ascenseur", path: "Map/Ascenseur.png"},
	{ name: "map_couloir", path: "Map/Couloir.png"},
	{ name: "map_escalier", path: "Map/Escalier.png"},
	{ name: "map_salle1", path: "Map/Salle1.png"},
	{ name: "map_salle2", path: "Map/Salle2.png"},
	{ name: "map_salle3", path: "Map/Salle3.png"},
	{ name: "map_salle4", path: "Map/Salle4.png"},
	{ name: "map_salle5", path: "Map/Salle5.png"},
	{ name: "map_salle6", path: "Map/Salle6.png"},
	{ name: "ElevatorButton0", path: "Map/button_rdc.png"},
	{ name: "ElevatorButton1", path: "Map/button_1.png"},
	{ name: "ElevatorButton2", path: "Map/button_2.png"},

	{ name: "barBattleBackground", path: "GUI/barre_combat.jpg"},
	{ name: "barBattleHitZone", path: "GUI/barre_combat1.jpg"},
	{ name: "barBattleCriticalZone", path: "GUI/barre_combat2.jpg"},
	{ name: "barBattleCursor", path: "GUI/barre_combat3.jpg"},
	{ name: "logoHtml5", path: "GUI/html5_logo.png"},
	{ name: "textHtml5", path: "GUI/html5_text.png"},
	{ name: "logoIsart", path: "GUI/isart_logo.png"},
	{ name: "dialogueBox", path: "GUI/dialogue_box.png"},
	{ name: "choiceButtonNormal", path: "GUI/button_choice_normal.png"},
	{ name: "choiceButtonHover", path: "GUI/button_choice_Hover.png"},
	{ name: "choiceButtonClicked", path: "GUI/button_choice_pressed.png"},
	{ name: "loaderBackground", path: "GUI/background_loader.jpg"},
	{ name: "titleBackground", path: "GUI/background_title.jpg"},
	{ name: "titleForeground", path: "GUI/foreground_title.png"},
	{ name: "loaderBackground", path: "GUI/background_loader.jpg"},
	{ name: "titleForeground", path: "GUI/foreground_title.png"},
	{ name: "logoHtml5", path: "GUI/html5_logo.png"},
	{ name: "textHtml5", path: "GUI/html5_text.png"},
	{ name: "logoIsart", path: "GUI/isart_logo.png"},
	{ name: "mapGUI", path: "GUI/map.png"},
	{ name: "backGUI", path: "GUI/retour.png"},
	{ name: "mouse", path:"GUI/souris.png"},

	{ name: "surgeonMain", path: "Enemies/ceiling_mainsurgeon.png"},
	{ name: "monsterKid", path: "Enemies/monster_kid.png"},
	{ name: "monsterNurse", path: "Enemies/monster_nurse.png"},
	{ name: "cop", path: "Enemies/cop.png"},


	{ name: "roomBed", path: "Objects/room_bed.png"},
	{ name: "roomCloset", path: "Objects/room_closet.png"},
	{ name: "roomCurtains1", path: "Objects/room_curtains1.png"},
	{ name: "roomCurtains2", path: "Objects/room_curtains2.png"},
	{ name: "roomCurtains3", path: "Objects/room_curtains3.png"},
	{ name: "roomMedicalstuff", path: "Objects/room_medicalstuff.png"},
	{ name: "roomSofa", path: "Objects/room_sofa.png"},
	{ name: "roomSofa2", path: "Objects/room_sofa2.png"},
	{ name: "roomTable", path: "Objects/room_table.png"},
	{ name: "roomTele1", path: "Objects/room_tele1.png"},
	{ name: "roomTele2", path: "Objects/room_tele2.png"},
	{ name: "roomTele3", path: "Objects/room_tele3.png"},
	{ name: "roomTele4", path: "Objects/room_tele4.png"},
	{ name: "roomWallphone", path: "Objects/room_wallphone.png"},
	{ name: "roomChaise", path: "Objects/room_chair.png"},
	{ name: "couloirOxygene", path: "Objects/couloir_bouteille_oxygene.png"},
	{ name: "couloirExit", path: "Objects/couloir_exit.jpg"},
	{ name: "couloirExtincteur", path: "Objects/couloir_extincteur.png"},
	{ name: "couloirPlan", path: "Objects/couloir_plan.jpg"},
	{ name: "couloirPlan1", path: "Objects/couloir_plan1.png"},
	{ name: "desk", path: "Objects/desk.png"},
	{ name: "computer", path: "Objects/computer.png"},
	{ name: "papers", path: "Objects/papers.png"},
	{ name: "chairDoctor", path: "Objects/room_chairdoctor.png"},
	{ name: "keyboard", path: "Objects/room_keyboard.png"},
	{ name: "library", path: "Objects/room_library.png"},
	{ name: "meds", path: "Objects/room_meds.png"},
	{ name: "painting", path: "Objects/room_painting.png"},
	{ name: "poster", path: "Objects/room_poster.png"},
	{ name: "rollingChair", path: "Objects/room_rollingchair.png"},
	{ name: "coffreFort", path: "Objects/coffre_fort.png"},
	{ name: "haricotMedical", path: "Objects/couloir_haricot_medical.png"},
	{ name: "feuilles", path: "Objects/bureau_feuilles.png"},
	{ name: "trash", path: "Objects/couloir_poubelle.png"},
	{ name: "lampe", path: "Objects/bureau_lampe.png"},
	{ name: "blouse", path: "Objects/room_portemanteau.png"},

];

var Images = {};
var CanAccessMap = false;
var Progression = {
	//Bool qui détermine la route suivie, changee au 1er combat
	PassiveRoute : false,
	//Si le joueur a quitte sa chambre (intro)
	OutOfHerosRoom : false,
	//Si le joueur a passe l'ombre du couloir du second
	SeenCorridorShadow : false,
	//Si le joueur a recupere la cle de l'acsenseur
	GotElevatorKey : false,
	//Branche A only. Si le joueur a le passe partout
	RouteAGotPassePartout : false,
	//Branche B only. Si le joueur a le passe partout
	RouteBGotPassePartout : false,
	//Si le joueur a combattu l'infirmiere de la chambre 104
	HasBattleRoom104Nurse : false,
	//Si le joueur a gagné contre l'infirmiere de la chambre 104
	WonAgainstRoom104Nurse : false,
	//Branche A only. Si le joueur a regardé la carte d'anniversaire
	RouteAHasSeenBirthdayCard : false,
	//Branche A only. Si le joueur a eu acces a l'ordinateur
	RouteAHasComputerAccess : false,
	//Branche A only. Si le joueur a combattu les hallu après le pc
	RouteAHasBattleThingsAfterPC : false,
	//Branche A only. Résultat du combat dans le couloir du second après le pc
	RouteAWonAgainstThingsAfterPC : false,
	//Branche B only. Si le joueur a récupéré la note
	RouteBGotNote : false
};
var GUI= {
	Availaible: false,
	Obj : null,
}
var RoomVisited = {
	RDC : {
		floor : false,
		reception : false,
		waitingRoom : false,
		archives : false,
		operatingTheaterA : false,
		operatingTheaterB : false,
		stairs : false
	},
	premier : {
		floor : false,
		corridor : false,
		elevator : false,
		stairs : false,
		room101 : false,
		room102 : false,
		room103 : false,
		room104 : false,
		room105 : false,
		room106 : false
	},
	second : {
		floor : false,
		characterRoom : false,
		room202 : false,
		room203 : false,
		room204 : false,
		corridor : false,
		elevator : false,
		stairs : false,
		restingArea : false,
		office : false
	}
};
var Application = 
{
	LoadedLevel: null,
	GamePaused: false,
	DebugMode: true,
	LastRoom: null,
	
	LoadLevel: function (SceneName)
	{
		if(Scenes[SceneName] != undefined)
		{
			this.LoadedLevel = Scenes[SceneName];
			this.LoadedLevel.OnLoadLevel();
		}

	}
};

var Input = 
{
	MouseClick: false,
	MouseLongClick: false,
	MouseReload: 0,
	MousePosition: {x: 0, y: 0},
	MouseDraging: false,
	DragedElement: null,

	KeysDown: []
};

// For GFX effect
var mul_table = [ 1,57,41,21,203,34,97,73,227,91,149,62,105,45,39,137,241,107,3,173,39,71,65,238,219,101,187,87,81,151,141,133,249,117,221,209,197,187,177,169,5,153,73,139,133,127,243,233,223,107,103,99,191,23,177,171,165,159,77,149,9,139,135,131,253,245,119,231,224,109,211,103,25,195,189,23,45,175,171,83,81,79,155,151,147,9,141,137,67,131,129,251,123,30,235,115,113,221,217,53,13,51,50,49,193,189,185,91,179,175,43,169,83,163,5,79,155,19,75,147,145,143,35,69,17,67,33,65,255,251,247,243,239,59,29,229,113,111,219,27,213,105,207,51,201,199,49,193,191,47,93,183,181,179,11,87,43,85,167,165,163,161,159,157,155,77,19,75,37,73,145,143,141,35,138,137,135,67,33,131,129,255,63,250,247,61,121,239,237,117,29,229,227,225,111,55,109,216,213,211,209,207,205,203,201,199,197,195,193,48,190,47,93,185,183,181,179,178,176,175,173,171,85,21,167,165,41,163,161,5,79,157,78,154,153,19,75,149,74,147,73,144,143,71,141,140,139,137,17,135,134,133,66,131,65,129,1];
var shg_table = [0,9,10,10,14,12,14,14,16,15,16,15,16,15,15,17,18,17,12,18,16,17,17,19,19,18,19,18,18,19,19,19,20,19,20,20,20,20,20,20,15,20,19,20,20,20,21,21,21,20,20,20,21,18,21,21,21,21,20,21,17,21,21,21,22,22,21,22,22,21,22,21,19,22,22,19,20,22,22,21,21,21,22,22,22,18,22,22,21,22,22,23,22,20,23,22,22,23,23,21,19,21,21,21,23,23,23,22,23,23,21,23,22,23,18,22,23,20,22,23,23,23,21,22,20,22,21,22,24,24,24,24,24,22,21,24,23,23,24,21,24,23,24,22,24,24,22,24,24,22,23,24,24,24,20,23,22,23,24,24,24,24,24,24,24,23,21,23,22,23,24,24,24,22,24,24,24,23,22,24,24,25,23,25,25,23,24,25,25,24,22,25,25,25,24,23,24,25,25,25,25,25,25,25,25,25,25,25,25,23,25,23,24,25,25,25,25,25,25,25,25,25,24,22,25,25,23,25,25,20,24,25,24,25,25,22,24,25,24,25,24,25,25,24,25,25,25,25,22,25,25,25,24,25,24,25,18];