
// HelloPoint1.js

// Vertex shader program
var VSHADER_SOURCE = 
	'void main() {\n' +
	'	gl_Position = vec4(0.0, 0.0, 0.0, 1.0); \n' + // Cordinates
	'	gl_PointSize = 10.0; \n' +					  // Point size
	' }\n';

// Fragment shader program
var FSHADER_SOURCE = 
	'void main() {\n' +
	'	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n' + // Set color
	' }\n';

// Main program
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
	
	// Initialize shaders
	if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE))
	{
		console.log('Failed to initialize shaders.');
		return;
	}
	
	// specify the color for clearing <canvas>
	gl.clearColor(0.0, 0.0, 0.0, 1.0); // blue
	
	// clear
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	// Draw a point
	gl.drawArrays(gl.POINTS, 0, 1);
}