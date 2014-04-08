/*	Pour creer une nouvelle Scene: 
*	1/	Copiez le modele ci dessous dans un nouveau fichier qui portera le nom de votre scene
*	2/	Sauvegardez le nouveau fichier JS dans le dossier Assets/Javascript/Scenes/NomDeVotreScene.js
*	3/	Dans l'index.html rajoutez sous le commentaire <!-- Scenes --> la ligne: 
*       "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NomDeVotreScene.js"></script>"
*	4/  Pour passer sur votre scene: "Application.LoadLevel(LeNomDeVotreScene);"
*	
*/
function SceneModel () 
{
	this.name = "Model";
	this.Started = false;

	this.Awake = function()
	{
		//codez l'awake avant le console.log

		console.log("Scene: " + this.name + "created!"); 
	};

	this.Start = function()
	{
		if(!this.Started)
		{
			//codez le start avant le changement de booleen

			this.Started = true;
			console.log("Scene: " + this.name + " have started!");
		}
	};

	this.Update = function()
	{
		if(!Application.GamePaused)
		{
			//Codez le jeu ici pour que la pause soit prise en compte
			ctx.fillStyle = "grey";
			ctx.fillRect(0,0, canvas.width, canvas.height);
		}
	};

	this.LateUpdate = function()
	{
		if(!Application.GamePaused)
		{
			//Codez la GUI ici pour que la pause soit prise en compte
		}
	};

	// lance l'awake a la creation de la scene
	this.Awake();
}