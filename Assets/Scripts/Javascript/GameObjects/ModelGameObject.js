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

	this.transform =
	{
		position: {x:0, y: 0},
		rotation: {x:0, y: 0}, // obselete
		scale: {x: 50, y: 100}
	};
	
	this.Renderer = 
	{
		visible: true,
		that: this.transform,

		Material:
		{
			src: ImgTest,
			//console.log("test= " + ImgTest), 

			//DontTouch bellow 
			SizeFrame:
			{
				x: 0,
				y: 0
			},

			CurrentFrame:
			{
				x: 0,
				y: 0
			},
		},

		Animation: 
		{
			animated: true,
			current: [ImgTest, 10, 12], // [animationImage, TotalDuration, NumberOfFrame]
			Animations: [],
			countdown:0
		},

		Draw: function ()
		{
			if(this.visible)
			{
				//console.log(this.Animation.animated + " " + this.Animation.current[0].src );
				debugger;
				ctx.drawImage(
					this.Animation.animated ? this.Animation.current[0] : this.Material.src, 
					this.Material.CurrentFrame.x * this.Material.SizeFrame.x, 
					this.Material.CurrentFrame.y * this.Material.SizeFrame.y, 
					this.Material.CurrentFrame.x + this.Material.SizeFrame.x,
					this.Material.CurrentFrame.y + this.Material.SizeFrame.y,
				    this.that.position.x,
				    this.that.position.y,
				    this.that.scale.x, 
				    this.that.scale.y
				     );
			}
		}
	},

	this.Physics = 
	{
		BoxCollider: false,
		Clickable:   false,
		ColliderIsSameSizeAsTransform: false,

		BoxColliderSize: 
		{
			position: {x:0, y: 0},
			rotation: {x:0, y: 0}, // obselete
			scale: {x: 0, y: 0}
		}
	}

	this.SetActive = function (newState)
	{
		this.enabled = newState;
	}

	this.Awake = function()
	{
		if(this.ColliderIsSameSizeAsTransform)
		{
			this.BoxCollider = this.transform; 
		}
		if(this.Renderer.Material.src != "")
		{
			this.Renderer.Material.SizeFrame.x = this.Renderer.Material.width / this.Renderer.Animation.current[2];
			this.Renderer.Material.SizeFrame.y = this.Renderer.Material.height;
		}

		Debug.Log("GameObject: " + GameObject.name + " Created");
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
		if(!Application.GamePaused && this.enabled){
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
				if(PointCollider(Input.MousePosition.x, Input.MousePosition.y, {x: this.Physics.BoxColliderSize.position.x, y: this.Physics.BoxColliderSize.position.y,w: this.Physics.BoxColliderSize.scale.x,h: this.Physics.BoxColliderSize.scale.y }))
				{
					if(!Input.Mouseclick) this.OnHover();
					if(Input.Mouseclick)  this.OnClicked();
				}
			}

			if(this.Renderer.Animation.animated)
			{
				this.Renderer.Animation.countdown -= Time.DeltaTime;
				if(this.Renderer.Animation.countdown <= 0)
				{
					this.Renderer.Material.CurrentFrame.x += 1;
					this.Renderer.Animation.countdown = this.Renderer.Animation.current [1] / this.Renderer.Animation.current[2];

					if(this.Renderer.Material.CurrentFrame.x > this.Renderer.Animation.current[2])
						this.Renderer.Material.CurrentFrame.x = 0;

					//console.log(this.Renderer.Material.CurrentFrame.x);
				}
			}

			this.LateUpdate();
		}
		
	};

	this.LateUpdate = function ()
	{
		// GAMEOBJECT BEHAVIOR HERE ! 

		this.Renderer.Draw();
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

	this.Awake();
}