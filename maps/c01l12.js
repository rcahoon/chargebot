var mapColorsGoal;

createWorld(function() {
	var colors = [ 'L','B','R','G','W','Y','M','T' ];
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
	mapColorsGoal = '';
	for(var i=1; i < 8; ++i) {
		var c = colors[Math.floor(Math.random() * colors.length)];
		mapColorsGoal += 'The tile is ' + c + "\n";
		mapData[i][3] = c + '2';
	}
	return mapData;
}, 0, 3, 0, 1, function() {
	var ret = (window.logRecord == mapColorsGoal);
	if (!ret) {
		window.writeLog('Your program printed:\n' + window.logRecord);
		window.writeLog('It should have been:\n' + mapColorsGoal);
	}
	return ret;
});

$("#instructions").html(
'<h1>Pretty Printing, Part 1</h1>' +
'<p>As you saw in the last level, the <span style="font-family: monospace">+</span> ' +
'operator adds the numbers on either side of it together. However, if one of the things ' +
'that it\'s adding is text, it has an different meaning: it will create a new bit of text ' +
'with the two things appended. We call this <i>concatenation</i>. For example, ' +
'<span style="font-family: monospace">"Hello" + "there"</span> results in "Hellothere" ' +
'Notice that no space was added between the two bits of text &ndash; if you want a space, you have ' +
'to include that in the program. Any of the following would do that:</p>' +
'<pre>"Hello " + "there"</pre><pre>"Hello" + " there"</pre><pre>"Hello" + " " + "there"</pre>' +
'<p>In Level 10: Disco Tiles, you programmed <span class="chargebot">CHARGEBOT</span> ' +
'to print letters representing the colors of the tiles. However, the result of this isn\'t ' +
'very understandable to somebody who doesn\'t know what the program is doing. Let\'s make the ' +
'printing more readable by adding some text explaining what the letter is, such as</p>' +
'<p><span style="color: #6f6">The tile is Y<br />The tile is L</span></p>' +
'<p>Before, you used lines of code such as</p>' +
'<pre>print(getTileColor());</pre>' +
'<p>to print the tile colors. How can you use what you just learned to modify this code so it prints ' +
'what we want?</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c02l01">Next Challenge</a></p>'
);