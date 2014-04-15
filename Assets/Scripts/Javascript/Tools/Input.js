function mouseDown(event)
{	
	if(!Input.MouseClick && Input.MouseReload)
	{
		Input.MouseClick = true;
		Input.MouseReload = false;
	}
	else if(!Input.MouseReload)
	{
		Input.MouseClick = false;
	}
	Input.MouseLongClick = true;
	mouseMove(event);
}
function mouseUp(event)
{
	Input.MouseClick = false;
	Input.MouseLongClick = false;
	Input.MouseReload = true;
	Input.MouseDraging = false;
	Input.DraggedElement = null;
	mouseMove(event);
}
function mouseMove(event)
{
	var rect = canvas.getBoundingClientRect();	
	Input.MousePosition.x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
	Input.MousePosition.y = (event.clientY - canvas.offsetTop) / (rect.bottom - rect.top) * canvas.height;
}

function keyDown(event)
{
	Input.KeysDown[event.keyCode] = true;
}

function keyUp(event)
{
	 delete Input.KeysDown[event.keyCode];
}

function touchDown(event)
{
	event.preventDefault();
	event.stopPropagation();
	
	var rect = canvas.getBoundingClientRect();
	Input.MousePosition.x = (event.targetTouches[0].pageX - rect.left) / (rect.right - rect.left) * canvas.width;
	Input.MousePosition.y = (event.targetTouches[0].pageY - canvas.offsetTop) / (rect.bottom - rect.top) * canvas.height;
}