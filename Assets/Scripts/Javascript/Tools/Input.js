function mouseDown(event)
{
	Input.MouseClick = true;
	mouseMove(event);
}
function mouseUp(event)
{
	Input.MouseClick = false;
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
	console.log("keydown " + Input.KeysDown);
}

function keyUp(event)
{
	 delete Input.KeysDown[event.keyCode];
	 console.log("keyup " + Input.KeysDown);
}

function touchDown(event)
{
	event.preventDefault();
	event.stopPropagation();
}