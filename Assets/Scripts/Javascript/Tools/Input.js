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

function touchdown(event)
{
	event.preventDefault();
	event.stopPropagation();
}