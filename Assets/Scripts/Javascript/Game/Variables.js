var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var Scenes = {};

var GameObjects = [];

var ImagesPath = [];
var Images = [];

var Application = 
{
	LoadedLevel: null,
	GamePaused: false,
	DebugMode: false,
	
	LoadLevel: function (SceneName)
	{
		if(SceneName != null)
		{
			this.LoadedLevel = SceneName;
		}

	}
};

var Input = 
{
	MouseClick: false,
	MousePosition: {x: 0, y: 0},

	KeysDown: [],
};