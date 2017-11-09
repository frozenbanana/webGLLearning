// HelloCanvas. js
function main()
{
	// retrive <canvas> element
	var canvas = document.getElementById('webgl');
	
	// get the rendering oontext for webgl
	var gl = getWebGLContext(canvas);
	
	if(!gl)
	{
		console.log('Failed to get the rendering context for webGL');
		return;
	}
	
	// specify the color for clearing <canvas>
	gl.clearColor(0.0, 0.0, 0.0, 1.0); // blue
	
	// clear
	gl.clear(gl.COLOR_BUFFER_BIT);
}