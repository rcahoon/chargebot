var mapColorsGoal = [[]];
var mapPrintGoal;

createWorld(function() {
	var colors = [ 'L','B','R','G','W','Y','M','T' ];
	var cnames = {
		X: 'transparent',
		L: 'gray',
		B: 'blue',
		R: 'red',
		G: 'green',
		W: 'white',
		Y: 'yellow',
		M: 'magenta',
		T: 'teal'
	};
	
	var terminal = {};
	var goal = [ terminal, 7, 7 ];
	
	var graph = [
	[ false, false, false, false, false, false, false, false ],
	[ false, false, false, false, false, false, false, false ],
	[ false, false, false, false, false, false, false, false ],
	[ false, false, false, false, false, false, false, false ],
	[ false, false, false, false, false, false, false, false ],
	[ false, false, false, false, false, false, false, false ],
	[ false, false, false, false, false, false, false, false ],
	[ false, false, false, false, false, false, false, goal ]
	];
	
	var frontier = [ goal ];
	
	while(frontier.length)
	{
		var idx = Math.floor(Math.random() * frontier.length);
		var node = frontier[idx];
		frontier.splice(idx, 1);
		
		var x = node[1];
		var y = node[2];
		graph[x][y] = node;
		
		if (x === 0 && y === 0)
			break;
		
		var nbh = [ [ node, x+1, y ], [ node, x-1, y ], [ node, x, y+1 ], [ node, x, y-1] ];
		for(var i=0; i < nbh.length; ++i) {
			if (nbh[i][1] < 8 && nbh[i][1] >= 0
			 && nbh[i][2] < 8 && nbh[i][2] >= 0
			 && !graph[nbh[i][1]][nbh[i][2]])
				frontier.push(nbh[i]);
		}
	}
	
	var mapData = [
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ]
	];
	mapColorsGoal = [
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ],
	[ 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0', 'L0' ]
	];
	
	mapPrintGoal = '';
	
	var orient = 1;
	for(var node = graph[0][0]; node !== terminal; node = node[0])
	{
		var c;
		if (node[0] == terminal)
		{
			c = 'R';
		}
		else
		{
			var nh;
			if (node[2] - node[0][2] == -1)
				nh = 2;
			else if (node[2] - node[0][2] == 1)
				nh = 0;
			else if (node[1] - node[0][1] == 1)
				nh = 3;
			else if (node[1] - node[0][1] == -1)
				nh = 1;
			
			var turn = nh - orient;
			
			if (turn == -1)
				c = 'M';
			else if (turn == 1)
				c = 'Y';
			else if (Math.random() < 0.35)
				c = 'B';
			else if (Math.random() < 0.25)
				c = 'G';
			else
				c = 'W';
			
			orient = nh;
		}
		
		if (c == 'G')
			mapPrintGoal += "I'm a little teapot\n";
		
		mapData[node[1]][node[2]] = c + '1';
		if (c == 'B')
			c = 'G';
		mapColorsGoal[node[1]][node[2]] = c + '1';
	}
	
	return mapData;
}, 0, 0, 0, 1, function() {
	if (window.logRecord != mapPrintGoal) {
		window.writeLog('Your program printed:\n' + window.logRecord);
		window.writeLog('It should have been:\n' + mapPrintGoal);
		return false;
	}
	
	if (window.world.getRobotI() != 7 || window.world.getRobotJ() != 7)
	{
		window.writeLog('Chargebot didn\'t make it to the end of the course');
		return false;
	}
	
	return mapColorsGoal;
});

$("#instructions").html(
'<h1>Program By Colors</h1>' +
'<p>For this challenge, program <span class="chargebot">CHARGEBOT</span> so he reacts to tile ' +
'colors in the following ways:</p>' +
'<ul>' +
'<li>White &rarr; Move forward</li>' +
'<li>Blue &rarr; Charge tile and Move forward</li>' +
'<li>Magenta &rarr; Turn left and Move forward</li>' +
'<li>Yellow &rarr; Turn right and Move forward</li>' +
'<li>Red &rarr; Stop</li>' +
'<li>Green &rarr; Print "I\'m a little teapot" and Move forward</li>' +
'</ul>' +
'<p>So far, you\'ve used <span style="font-family: monospace">==</span> to check if two things ' +
'are equal, and <span style="font-family: monospace">&lt;</span> to check if something is ' +
'less than something else. To help you out, here\'s a list of other comparisons you can make:</p>' +
'<table style="border-spacing: 15px 2px">' +
'<tr><td><span style="font-family: monospace">==</span></td><td>equals</td></tr>' +
'<tr><td><span style="font-family: monospace">!=</span></td><td>not equals</td></tr>' +
'<tr><td><span style="font-family: monospace">&lt;</span></td><td>less than</td></tr>' +
'<tr><td><span style="font-family: monospace">&gt;</span></td><td>greater than</td></tr>' +
'<tr><td><span style="font-family: monospace">&lt;=</span></td><td>less than or equal to</td></tr>' +
'<tr><td><span style="font-family: monospace">&gt;=</span></td><td>greater than or equal to</td></tr>' +
'</table>');

$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>You\'ve just programmed your own very simple programming language. Instead of programming ' +
'<span class="chargebot">CHARGEBOT</span> using lines of written code, he can now be programmed ' +
'using the colors of the tiles.</p>' +
'<p style="text-align: center"><a href="?map=c03l01">Next Challenge</a></p>'
);