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
	var pos = Math.floor(Math.random() * 7)+1;
	mapData[pos][3] = 'B2';
	mapColorsGoal[pos][3] = 'G2';
	mapPrintGoal = 'Moved ' + pos + ' steps\n';
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
'<h1>Count Your Steps</h1>' +
'<p>So far, we\'ve only used variables that hold strings (remember, that\'s what we programmers call text) ' +
'since that\'s how <span class="chargebot">CHARGEBOT</span> tells us about colors. However, we can also ' +
'use variables to store numbers, but this requires a change to how we create the variable. When we create a ' +
'string variable, we write</p>' +
'<pre>string myStringVariable;</pre>' +
'The <span style="font-family: monospace">string</span> part says that the variable stores strings. ' +
'(We also sometimes say this is a <i>string variable</i> or the variable\'s <i>type</i> is  ' +
'<span style="font-family: monospace">string</span>.) To create a variable that stores whole numbers &ndash; such ' +
'as the number of times something has happened &ndash; we instead need an <span style="font-family: monospace">int</span> ' +
'variable, such as</p>' +
'<pre>int myCount;</pre>' +
'<p>Remember that once the variable has been declared, we can then store values in it. Storing numbers is easy:</p>' +
'<pre>myCount = 10;</pre>' +
'<p>Remember also that if you want to declare and store a value immediately afterwards, you can combine those into a ' +
'single line, which does the same thing, but just makes your code more compact and easier to read. It makes sense that ' +
'a counter should start at 0, so let\'s make that happen:</p>' +
'<pre>int myCount = 0;</pre>' +
'<p>You only should only declare the variable once, but you can assign it new values as many times as you want.</p>' +
'<p>Instead of constant values, you can also use the math expressions you learned about in Chapter 1 to compute a value ' +
'for the variable to hold:</p>' +
'<pre>int mathAnswer = 6 * 9;</pre>' +
'<p>Since we can use variables in the place of any value, we can also use variables in our math expressions:</p>' +
'<pre>int answerSquared = mathAnswer * mathAnswer;</pre>' +
'<p>In an odd twist of logic, we can also use a variable\'s current value to compute a new value for the variable to ' +
'store. This is useful for our counter variable, because we it allows us to advance the counter in a single line of ' +
'code:</p>' +
'<pre>myCount = myCount + 1;</pre>' +
'<p>Using your new understanding of <span style="font-family: monospace">int</span> variables and how to create counters, ' +
'expand your program from the last level so that it prints the number of times <span class="chargebot">CHARGEBOT</span> ' +
'had to move before it found the tile to charge, such as "Moved 4 steps"</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>If you solved the code without using a <span style="font-family: monospace">while</span> loop, try rewriting your code ' +
'to use one. You\'ll need it for the next challenge.</p>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c02l07">Next Challenge</a></p>'
);