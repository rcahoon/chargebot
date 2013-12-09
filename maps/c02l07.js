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
'<h1>Feeling Loopy?</h1>' +
'<p>One way loops are commonly used is to repeat some action a fixed number of times. In ' +
'the past, you\'ve done this by creating a custom command (which in most programming languages ' +
'is usually call a <i>function</i>) and then calling that function several times. This has worked ' +
'well enough because you\'ve only needed to do actions a handful of times, but will be difficult ' +
'to work with when you find yourself needing to write a program that repeats something hundreds of ' +
'times. As we\'ll see, using a loop also makes it much easier to answer the question "how many times ' +
'is this being repeated?"</p>' +
'<p>To write a loop that repeats a certain number of times, we use a counter variable to store the number ' +
'of times the loop has already run. We increase this count by 1 at the end of each time through the loop ' +
'and then use the <span style="font-family: monospace">while</span> loop\'s condition to check if the ' +
'count has gotten to the target number of repetitions or if it should keep looping. A ' +
'<span style="font-family: monospace">while</span> loop that begins with</p>' +
'<pre>while (count &lt; 6)</pre>' +
'<p>will make the loop keep repeating while the value stored in the variable called ' +
'<span style="font-family: monospace">count</span> is less than 6. If ' +
'<span style="font-family: monospace">count</span> starts at 0 and is incremented once at the end of each ' +
'time through the loop, this will make the loop repeat 6 times.</p>' +
'<p>Use this to rewrite your code from Level 2 in order to charge all the blue tiles, but using a ' +
'<span style="font-family: monospace">while</span> loop instead of repeatedly calling a function.</p>' +
'<p>P.S. If you haven\'t already tried it, you can put <span style="font-family: monospace">if</span> ' +
'statements inside <span style="font-family: monospace">while</span> loops as well.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c02l08">Next Challenge</a></p>'
);