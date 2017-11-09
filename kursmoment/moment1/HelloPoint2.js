
// HelloPoint2.js

// Vertex shader program
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'attribute float a_PointSize;\n' +
	'void main() {\n' +
	'	gl_Position = a_Position; \n' + // Cordinates
	'	gl_PointSize = a_PointSize; \n' +					  // Point size
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

	// Get the storage location of attribute variable
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0)
	{
		console.log('Failed to get the storage location of a_Position');
		return;
	}
	
	var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
	if(a_PointSize  < 0)
	{
		console.log('Failed to get the storage location of a_PointSize');
		return;
	}
	
	// Pass vertex position to attribute variable
	gl.vertexAttrib4f(a_Position, 0.0, 0.0, 0.0, 1.0);
	
	// Pass point size to attribute variable
	gl.vertexAttrib1f(a_PointSize, 15.0);
	
	// specify the color for clearing <canvas>
	gl.clearColor(0.0, 0.0, 0.0, 1.0); 
	
	// clear
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	// Draw a point
	gl.drawArrays(gl.POINTS, 0, 1);
}