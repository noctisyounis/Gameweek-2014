function mouseDown(event)
{
	Input.MouseClick = true;
	Input.MousePosition.x = event.clientX - canvas.offsetLeft;
	Input.MousePosition.y = event.clientY - canvas.offsetTop;
}
function mouseUp(event)
{
	Input.MouseClick = false;
	Input.MousePosition.x = event.clientX - canvas.offsetLeft;
	Input.MousePosition.y = event.clientY - canvas.offsetTop;
}
function mouseMove(event)
{
	Input.MousePosition.x = event.clientX - canvas.offsetLeft;
	Input.MousePosition.y = event.clientY - canvas.offsetTop;
}