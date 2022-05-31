var mapColorsGoal = [[]];

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
	var mapData = [[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ]];
	mapColorsGoal = [[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ]];
	for(var i=1; i < 8; ++i) {
		mapData[i]       = [ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ];
		mapColorsGoal[i] = [ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ];
		if (Math.random() > 0.5) {
			mapData[i][3] = 'B2';
			mapColorsGoal[i][3] = 'G2';
		}
	}
	return mapData;
}, 0, 3, 0, 1, function() {
	return mapColorsGoal;
});

$("#instructions").html(
'<h1>For Loops</h1>' +
'<p>Your final code from the last challenge should have looked something like this:</p>' +
'<pre>int count = 0;\nwhile (count &lt; 7)\n{\n    <i>&lt;some code to control ' +
'<span class="chargebot">CHARGEBOT</span>&gt;</i>\n\n    count = count + 1;\n}</pre>' +
'<p>Loops of this form are used so often in programming that we have a special way or writing them, called ' +
'a <i><span style="font-family: monospace">for</span> loop</i>. A <span style="font-family: monospace">for</span> ' +
'loop takes the same common bits of code, but groups them together to make the code easier to read. This same code ' +
'written as a <span style="font-family: monospace">for</span> loop would look like this:</p>' +
'<pre>for (int count = 0; count &lt; 7; count = count + 1)\n{\n    <i>&lt;some code to control ' +
'<span class="chargebot">CHARGEBOT</span>&gt;</i>\n}</pre>' +
'<p><span style="font-family: monospace">for</span> says that this is a <span style="font-family: monospace">for</span> ' +
'loop. This is followed by a set of parentheses containing 3 pieces of code, which are separated by semicolons ' +
'<span style="font-family: monospace">;</span>. The first bit is run once right before the loop starts, and is usually ' +
'used to declare and initialize a counter variable, like we\'ve done here. The second bit of code is used at the beginning ' +
'of each each repetition of the loop to test whether the loop should continue or not - if the expression is true, then the ' +
'loop continues, but the loop stops if it\'s false. This is exactly the same as a <span style="font-family: monospace">while</span> ' +
'loop\'s condition. Usually we use it to test if the counter variable has counted high enough yet. The third bit of code ' +
'is executed at the end of each time through the loop, and is usually used to advance the counter variable.</p>' +
'<p>The <span style="font-family: monospace">for</span> line is then followed by the loop\'s body, which is exactly the ' +
'same as a <span style="font-family: monospace">while</span> loop: a set of statements, surrounded by braces, that are ' +
'run each time the loop repeats</p>' +
'<p>Try modifying your code from the last challenge to use a <span style="font-family: monospace">for</span> loop instead ' +
'of a <span style="font-family: monospace">while</span> loop.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c02l09">Next Challenge</a></p>'
);