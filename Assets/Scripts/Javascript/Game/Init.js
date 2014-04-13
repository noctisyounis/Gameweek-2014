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
		Images[i] = new Image();
		Images[i].src = "Assets/Graphics/" + ImagesPath[i];
		Images[i].onload = function()
		{
			count++;
			if(count == ImagesPath.length)
			{
				ImageLoaded(Images);
	  		}
  		}
 	}
} 

function ImageLoaded(img)
{
	console.log(" %c System: Images Loaded!", 'background: #222; color: #bada55');
	Application.LoadLevel(new SceneModel());
	Run();
}

LoadImages();

Time.TimeWhenGameBegin = new Date().getTime();