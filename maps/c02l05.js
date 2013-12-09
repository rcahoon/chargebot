var mapColorsGoal = [[]];
var mapTargetPos;

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
	var mapData = [
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ]
	];
	mapColorsGoal = [
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
	[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ]
	];
	mapTargetPos = Math.floor(Math.random() * 7)+1;
	mapData[mapTargetPos][3] = 'B2';
	mapColorsGoal[mapTargetPos][3] = 'G2';
	return mapData;
}, 0, 3, 0, 1, function() {
	if (window.world.getRobotI() != mapTargetPos || window.world.getRobotJ() != 3)
	{
		window.writeLog('Chargebot didn\'t stop when it should have');
		return false;
	}
	
	return mapColorsGoal;
});

$("#instructions").html(
'<h1>Are We There Yet?</h1>' +
'<p>Hopefully you now have a basic understanding of how <span style="font-family: monospace">if</span> statements ' +
'work. Another type of decision that you can use in programs is called the <i><span style="font-family: monospace">while</span> ' +
'loop</i>. It looks a lot like the <span style="font-family: monospace">if</span> statement:</p>' +
'<pre>while (<i>condition</i>)\n{\n   <i>code</i>\n}</pre>' +
'<p>However, <span style="font-family: monospace">while</span> loops work differently: they will execute the commands ' +
'in <span style="font-family: monospace"><i>code</i></span> over and over until ' +
'<span style="font-family: monospace"><i>condition</i></span> is no longer true.</p>' +
'<p>For example, the following code will make <span class="chargebot">CHARGEBOT</span> move forward for as long as it\'s ' +
'on a teal square:</p>' +
'<pre>while (getTileColor() == "T")\n{\n    moveForward();\n}</pre>' +
'<p>In this challenge, somebody has left a tool randomly laying about in the workshop. Have  <span class="chargebot">CHARGEBOT</span> ' +
'move forward until he reaches the tool (blue tile), then recharge it.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c02l06">Next Challenge</a></p>'
);