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
document.addEventListener("touchstart", touchDown, false);


//Track Keboard Event
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

// DEBUGING NEEDED
if (canvas.requestFullscreen) canvas.requestFullscreen();
else if (canvas.mozRequestFullScreen) canvas.mozRequestFullScreen();
else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();

//Image Loader
function LoadImages(callBack)
{
	var count = 0;
    for(var i in ImagesPath)
    {
    	var name = ImagesPath[i].name;
    	var content = new Image();
    	Images[name] = content;
		Images[name].src = "Assets/Graphics/" + ImagesPath[i].path;
		Images[name].name.onload = function()
		{
			count++;
			Scenes.loader.imageLoaded = count;
			if(count == ImagesPath.length)
			{
				ImageLoaded(Images, count);
	  		}
  		}
 	}
} 

function ImageLoaded(img, imagesloaded)
{
	console.log(" %c System: "+ imagesloaded +" Images Loaded!", 'background: #222; color: #bada55');
}
Time.TimeWhenGameBegin = new Date().getTime();
Scenes.loader = new SceneLoader();
Application.LoadLevel(Scenes.loader);
Run();

LoadImages();