// ColoredPoints.js by Henry Bergström

// Vertex shader program
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'void main() {\n' +
	'	gl_Position = a_Position; \n' + // Cordinates
	'	gl_PointSize = 10.0; \n' +		// Point size
	' }\n';

// Fragment shader program
var FSHADER_SOURCE = 
	'precision mediump float;\n' +
	'uniform vec4 u_FragColor;\n' +		// uniform
	'void main() {\n' +
	'	gl_FragColor = u_FragColor; \n' + // Set color
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
	
	// Get the storage location of u_FragColor
	var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if (!u_FragColor)
	{
		console.log('Failed to get the storage location of u_FragColor');
		return;
	}
	
	// Regsiter function to be called on mouse pressed
	canvas.onmousedown = function(ev){ click(ev, gl, canvas, a_Position, u_FragColor) };
	
	// Pass vertex position to attribute variable
	gl.vertexAttrib4f(a_Position, 0.0, 0.0, 0.0, 1.0);
	
	// specify the color for clearing <canvas>
	gl.clearColor(0.0, 0.0, 0.0, 1.0); 
	
	// clear
	gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_points = [];		// positions of a mouse press
var g_colors = [];		// store the color of a point

function click(ev, gl, canvas, a_Position, u_FragColor)
{
	var x = ev.clientX;
	var y = ev.clientY;
	var rect = ev.target.getBoundingClientRect();

    // example clicking close to the left corner
	// x = 10 px
	// rect.left = 8 px (start of canvas i x-axis)
	// x - rect.left = 2 ( we clicked 2 px from the left border of canvas)
	// ((x - rect.left) - canvas.width/2) = -198  ( which is 198 px from the mid point of canvas)
	// normalized -198/200 to get corrent position format.
	
	x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
	y = ((canvas.height/2) - (y - rect.top))/(canvas.height/2);
	
	// store the coordinates
	g_points.push([x,y]);
	
	if(x >= 0.0 && y >= 0.0)			// 1st quadrant
	{
		g_colors.push([1.0, 0.0, 0.0, 1.0]);	//	is Red
	}
	else if(x < 0.0 && y < 0.0)			// 3rd quadrant
	{
		g_colors.push([0.0, 1.0, 0.0, 1.0]);	//	is Green
	}
	else 								// others
	{
		g_colors.push([1.0, 1.0, 1.0, 1.0]);	//	is White
	}
	
	// Clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	var len = g_points.length;
	for(var i = 0; i < len; i++)
	{
		var xy = g_points[i];
		var rgba = g_colors[i];
		
		// Pass the position of a point to a a_Position variable
		gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
		
		// Pass the color of a point to a u_FragColor varaible
		gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
		
		// Draw a point
		gl.drawArrays(gl.POINTS, 0, 1);
	}
}