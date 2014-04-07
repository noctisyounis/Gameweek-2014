var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2D");

var Scenes = {};

var GameObjects = [];

var ImagesPath = [];
var Images = [];

var Application = 
{
	LevelLoaded: null,
	GamePaused: false,
	
	LoadLevel: function (SceneName)
	{
		if(SceneName != null)
		{
			this.LevelLoaded = SceneName;
		}

	}
};

var Input = 
{
	MouseClick: false,
	MousePosition: {x: 0, y: 0}
};