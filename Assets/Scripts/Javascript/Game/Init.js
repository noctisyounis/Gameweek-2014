// RequestAnimationFrame this useless bulshit ! 
window.RequestAnimationFrame = (function(){
	return  window.requestAnimationFrame 		|| 
			window.webkitRequestAnimationFrame 	|| 
			window.mozRequestAnimationFrame    	|| 
			window.oRequestAnimationFrame      	|| 
			window.msRequestAnimationFrame     	|| 
	function(callback, element){
		window.setTimeout(callback, 1000 / 60);
	};
})();

//Track Mouse Event
document.addEventListener('mousedown', mouseDown);
document.addEventListener('mouseup', mouseUp);
document.addEventListener('mousemove', mouseMove);

//Track TouchEvent
document.addEventListener("touchstart", "touchDown", false);


//Track Keboard Event



//Image Loader
function LoadImages(ImagesPath, Images, callBack)
{
	var count = 0;
    for(var i in ImagesPath)
    {
		Images[i] = new Image();
		Images[i].src = ImagesPath[i];
		Images[i].onload = function()
		{
			count++;
			if(count == ImagePath.length)
			{
				callBack(Images);
	  		}
  		}
 	}
} 

function ImageLoaded(img)
{
	Application.LoadLevel(Scenes.Title);
	Run();
}

LoadImages(ImagesPath, Images, ImageLoaded);

Time.TimeWhenGameBegin = new Date().getTime();
Application.LoadLevel(new SceneModel());
var o = "";
Text.Scrolling.Begin("Salut, Comment Vas Tu? [long] . [long] . [long] . [long] hahaha j'adore cet effet debile", 0.1, o);
Run();