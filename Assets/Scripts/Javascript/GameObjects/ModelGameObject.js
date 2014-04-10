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
*	this.name:    							id unique du GameObject
*	this.enabled: 							est ce que le gameObject est actif dans la scene ?
*	this.BoxCollier:    					Est ce que je dois verifier si je collisionne avec les autres boxCollider de la scene ? 
*											(Appelle OnTriggerEnter(other))
*	this.Clickable:     					Est ce que cliquer sur moi provoque une action 
*											(Appelle OnClick en cas de click sur l'item)
*
*	this.ColliderIsSameSizeAsTransform: 	si activé a l'awake prend les valeurs du transform pour les mettres dans le box collider
*
*	this.transform.
*		position							la position x et y de l'element (la scene fait 800*600)
*		rotation							la rotation x et y de l'element (en degres)
*		scale								la longueur et la largeur de l'element
*	
*/

/*	**** Les methodes du GameObject ****
*
*	SetActive(boolean): 					Change l'etat du GameObject par le boolean en parametre
*	Awake()									A la creation du GameObject (pendant le new GameObject())
*	Start()									Doit etre appellé dans la scene qui utilise ce GameObject
*	Update()								Fait les tests de collision si le boxCollider est activé ou l'element clickable
*	LateUpdate()							La logique du GameObject
*	OnTriggerEnter(other)					Appeller si une collision avec un autre boxCollider est détécté, other est l'element colisionant
*	OnClicked()								Appeller si on clique sur l'element, tant que le click est down
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

	this.ColliderIsSameSizeAsTransform = false;

	this.transform =
	{
		position: {x:0, y: 0},
		rotation: {x:0, y: 0}, // obselete
		scale: {x: 0, y: 0}
	};

	this.BoxColliderSize = 
	{
		position: {x:0, y: 0},
		rotation: {x:0, y: 0}, // obselete
		scale: {x: 0, y: 0}
	};

	this.SetActive = function (newState)
	{
		this.enabled = newState;
	}

	this.Awake = function(){
		if(this.ColliderIsSameSizeAsTransform)
		{
			this.BoxCollider = this.transform; 
		}
		Debug.Log("GameObject" + GameObject.name + " Created");
	};

	this.Start = function()
	{
		if(!this.Started)
		{
			// DO START HERE

			Debug.Log("GameObject: " + GameObject.name + " Started");
			this.Started = true;
		}
		this.Update();
	};

	this.Update = function()
	{
		if(!Application.GamePaused && this.enabled)
		{
			if(this.BoxCollider)
			{
				for(var other in GameObjects)
				{
					if(other.enabled && other.BoxCollider)
					{
						if(BoxCollider({x: this.BoxColliderSize.position.x, y: this.BoxColliderSize.position.y,  w: this.BoxCollider.scale.x,  h: this.BoxColliderSize.scale.y },
									   {x: other.BoxColliderSize.position.x, y: other.BoxColliderSize.position.y, w: other.BoxColliderSize.scale.x, h: other.BoxColliderSize.scale.y } ))
						{
							OnTriggerEnter(other);
						}
					}
				}
			}
			if(this.Clickable)
			{
				if(PointCollider(Input.Mouse.x, Input.Mouse.y, {x: this.transform.position.x,y: this.transform.position.y,w: this.transform.scale.x,h: this.transforme.scale.y }))
				{
					if(!Input.Mouseclick) this.OnHover();
					if(Input.Mouseclick)  this.OnClicked();
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
	this.OnHovered = function()
	{

	};
}