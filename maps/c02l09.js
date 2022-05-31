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
	
	var countGoal = 1;
	for(var i=1; i < 8; ++i) {
		var c = (Math.random() < 0.3) ? 'B' : colors[Math.floor(Math.random() * colors.length)];
		if (c != 'B')
			++countGoal;
		mapColorsGoal[i][3] = (c == 'B') ? 'G' : c;
		mapData[i][3] = c + '2';
	}
	mapPrintGoal = countGoal + ' non-blue tiles\n';
	return mapData;
}, 0, 3, 0, 1, function() {
	if (window.logRecord != mapPrintGoal) {
		window.writeLog('Your program printed:\n' + window.logRecord);
		window.writeLog('It should have been:\n' + mapPrintGoal);
		return false;
	}
	
	return mapColorsGoal;
});

$("#instructions").html(
'<h1>The Road Less Traveled</h1>' +
'<p>In this challenge, expand your previous code by also keeping a count of the number of non-blue tiles ' +
'<span class="chargebot">CHARGEBOT</span> travels over: charge the blue tiles, count the rest. You can probably ' +
'already figure this out using a bunch of <span style="font-family: monospace">if</span> statements, or with some ' +
'thought, you could probably figure out how to do it with a single <span style="font-family: monospace">if</span> ' +
'and some math expressions. Here\'s another way that makes it more obvious what your code is trying to do, which ' +
'makes it easier for another programmer to read your code.</p>' +
'<p>By this point, you\'re probably pretty familiar with <span style="font-family: monospace">if</span> statements, ' +
'which look like this:</p>' +
'<pre>if (<i>condition</i>)\n{\n    <i>&lt;code executed if condition is true&gt;</i>\n}</pre>' +
'<p>However, there\'s a variation of the <span style="font-family: monospace">if</span> statement called an ' +
'<span style="font-family: monospace">if</span>-<span style="font-family: monospace">else</span> statement:</p>' +
'<pre>if (<i>condition</i>)\n{\n    <i>&lt;code executed if condition is true&gt;</i>\n}\nelse\n{\n' +
'    <i>&lt;code executed if condition is false&gt;</i>\n}</pre>' +
'<p>An <span style="font-family: monospace">if</span>-<span style="font-family: monospace">else</span> statement ' +
'does everything an <span style="font-family: monospace">if</span> statement does, but includes the ' +
'<span style="font-family: monospace">else</span> part, which allows you to run code whenever the condition ' +
'is false. Try using the <span style="font-family: monospace">if</span>-<span style="font-family: monospace">else</span> ' +
'statement to solve this challenge. Print the result of the counting like "X non-blue tiles"</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c02l10">Next Challenge</a></p>'
);