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
	
	mapPrintGoal = '';
	for(var i=1; i < 8; ++i) {
		var c = colors[Math.floor(Math.random() * colors.length)];
		mapPrintGoal += 'The tile is ' + cnames[c] + "\n";
		mapColorsGoal[i][3] = (c == 'B') ? 'G' : c;
		mapData[i][3] = c + '2';
	}
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
'<h1>Working Memory</h1>' +
'<p>In the previous challenge, you programed <span class="chargebot">CHARGEBOT</span> to both print out the tile colors he sees and ' +
'charge all the blue tiles. To do this, you needed to tell <span class="chargebot">CHARGEBOT</span> to read each tile\'s color ' +
'several times. Let\'s see how we can do this more efficiently:</p>' +
'<p>By using <b>variables</b> in our programs, we can store values and use them later. You can create a variable to hold text using a ' +
'line of code like this:</p>' +
'<pre>string myVariable;</pre>' +
'<p><span style="font-family: monospace">myVariable</span> is the name of the variable. When naming a variable, it\'s usually a good idea ' +
'to pick a name that describes the kinds of values the variable will be storing. This is similar to how we have to name custom ' +
'commands: the name is also what lets us use it later on in the program.</p>' +
'<p><span style="font-family: monospace">string</span> tells the computer ' +
'that this variable is going to store text - <span style="font-family: monospace">string</span> is the programming name for a bit of ' +
'text. Lastly, we end the statement with a semicolon.</p>' +
'<p>After the variable has been created (or <i>declared</i>), we can then assign a value to it. Since this variable holds text (which we ' +
'now know are called strings), we can give it a text value:</p>' +
'<pre>myVariable = "I\'m printing colors";</pre>' +
'<p>The <span style="font-family: monospace">=</span> sign is similar to the math = sign, but also somewhat different: it means make the ' +
'variable on the left side of the = sign store the value which is on the right side of the = sign. The order matters in programming. So this ' +
'line of code means make the variable called <span style="font-family: monospace">myVariable</span> store the string "I\'m printing colors" ' +
'(and don\'t forget the semicolon at the end).</p>' +
'<p>The values that are stored into variables don\'t have to be the same constant values - we can also have variables store the results of ' +
'commands:</p>' +
'<pre>string myColor;\nmyColor = getTileColor();</pre>' +
'<p>This creates a variable called <span style="font-family: monospace">myColor</span> that can hold strings, and stores the color of the ' +
'current tile in it.</p>' +
'<p>After a value has been stored in a variable, we can use that variable any place where we would otherwise need a value, including as a ' +
'parameter when calling commands such as <span style="font-family: monospace">print</span>, or in an <span style="font-family: monospace">if</span> ' +
'statement\'s condition. For instance, ' +
'here\'s some code that uses a variable to print the color of the current tile:</p>' +
'<pre>string tileColor;\ntileColor = getTileColor();\nprint(tileColor);</pre>' +
'<p>This may seem like a lot of extra code to do the same thing we could have done with a single line of code, but the advantage is that if, ' +
'for example, we wanted to print the tile color twice, all we need is another print line:</p>' +
'<pre>string tileColor;\ntileColor = getTileColor();\nprint(tileColor);\nprint(tileColor);</pre>' +
'<p>Now the tile color will be printed twice, but we only had to read the color once, which means this program will run much faster than if we ' +
'had to wait for <span class="chargebot">CHARGEBOT</span> to read the color twice.</p>' +
'<p>Update your code from the previous challenge to use variables so that <span class="chargebot">CHARGEBOT</span> only has to read each ' +
'tile\'s color once. To see the effect this has, try timing how long it takes <span class="chargebot">CHARGEBOT</span> to run this program versus ' +
'the last one.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>You can compress the code to create and initialize a variable somewhat by combining the lines that declare the variable and assign its first ' +
'value. Instead of writing</p>' +
'<pre>string tileColor;\ntileColor = getTileColor();</pre>' +
'<p>you write the same thing as a single line:</p>' +
'<pre>string tileColor = getTileColor;</pre>' +
'<p>&nbsp;</p>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c02l05">Next Challenge</a></p>'
);