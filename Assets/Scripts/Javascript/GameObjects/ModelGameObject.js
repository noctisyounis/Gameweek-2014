/*	**** Pour creer une nouveau GameObject **** 
*
*	1/	Copiez le modele ci dessous dans un nouveau fichier qui portera le nom de votre GameObject
*	2/	Sauvegardez le nouveau fichier JS dans le dossier Assets/Javascript/GameObjects/NomDeVotreGameObject.js
*	3/	Dans l'index.html rajoutez sous le commentaire <!-- GameObjects --> la ligne: 
*       "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NomDeVotreGameObject.js"></script>"
*	4/  Pour Creer une instance de votre GameObject faite "new NomDeVotreGameObject();"
*/

/*	**** Comment faire le setup d'un GameObject ****
*	
*	this.name:    		id unique du GameObject
*	this.enabled: 		est ce que le gameObject est actif dans la scene ?
*	this.BoxCollier:    Est ce que je dois verifier si je collisionne avec les autres boxCollider de la scene ? 
*						(Appelle OnTriggerEnter(other))
*	this.Clickable:     Est ce que cliquer sur moi provoque une action 
*						(Appelle OnClick en cas de click sur l'item)
*	this.transform.
*		position		la position x et y de l'element (la scene fait 800*600)
*		rotation		la rotation x et y de l'element (en degres)
*		scale			la longueur et la largeur de l'element
*	
*	this.started 		Ne pas toucher a cette valeur, elle definis si le start a deja été fait ou non
*/

/*	**** Les methodes du GameObject ****
*
*	SetActive(boolean): 	Change l'etat du GameObject par le boolean en parametre
*	Awake()					A la creation du GameObject (pendant le new GameObject())
*	Start()					Doit etre appellé dans la scene qui utilise ce GameObject
*	Update()				Fait les tests de collision si le boxCollider est activé ou l'element clickable
*	LateUpdate()			La logique du GameObject
*	OnTriggerEnter(other)	Appeller si une collision avec un autre boxCollider est détécté, other est l'element colisionant
*	OnClicked()				Appeller si on clique sur l'element, tant que le click est down
*/

/* **** Pour lancer le cycle du GameObject ****
*
*	rajoutez simplement NomDeVotreGameObject.Start() dans votre Scene
*/
function GameObject ()
{
	this.name = "GameObject";
	this.enabled = true;
	this.BoxCollider = false;
	this.Clickable = false;

	this.transform =
	{
		position: {x:0, y: 0},
		rotation: {x:0, y: 0},
		scale: {x: 0, y: 0}
	};

	this.Started = false;
	this.SetActive = function (newState)
	{
		this.enabled = newState;
	}

	this.Awake = function(){};

	this.Start = function()
	{
		if(this.Started)
		{
			// DO START HERE

			this.Started = true;
		}
		this.Update();
	};

	this.Update = function()
	{
		if(!Application.GamePaused && this.enabled)
		{
			if(this.BoxCollider)
			for(var other in GameObjects)
			{
				if(other.enabled && other.BoxCollider)
				{
					if(BoxCollider({x: this.transform.position.x, y: this.transform.position.y,  w: this.transform.scale.x,  h: this.transform.scale.y },
								   {x: other.transform.position.x,y: other.transform.position.y, w: other.transform.scale.x, h: other .transforme.scale.y } ))
					{
						OnTriggerEnter(other);
					}
				}
			}

			if(this.Clickable)
			{
				if(PointCollider(Input.Mouse.x, Input.Mouse.y, {x: this.transform.position.x,y: this.transform.position.y,w: this.transform.scale.x,h: this.transforme.scale.y }))
				{
					OnClicked();
				}
			}
			this.LateUpdate();
		}
		
	};

	this.LateUpdate = function ()
	{
		
	};

	this.OnTriggerEnter = function (other)
	{

	};

	this.OnClicked = function ()
	{

	};
}