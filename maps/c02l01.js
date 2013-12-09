var mapColorsGoal;

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
	mapColorsGoal = '';
	for(var i=1; i < 8; ++i) {
		var c = colors[Math.floor(Math.random() * colors.length)];
		mapColorsGoal += 'The tile is ' + cnames[c] + "\n";
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
'<h1>Pretty Printing, Part 2</h1>' +
'<p>Let\'s take our effort to make our printing more readable another step further. Instead of only printing a single letter ' +
'for each tile color, we now want to print the entire name of the color. In other situations, we might be able to use math or ' +
'combine different elements together to create the result we want, but since this situation requires us to generate totally ' +
'different content for each of the different colors, we need to give our program the ability to make decisions: Is the current ' +
'color Green? or is the current color Yellow? or ...</p>' +
'<p>Decisions in our programs work by choosing whether blocks of code should or should not be run in the current situation. The ' +
'most basic type of decision we can use is called <span style="font-family: monospace">if</span> statements, which look like this:</p>' +
'<pre>if (<i>condition</i>)\n{\n    <i>code</i>\n}</pre>' +
'<p><span style="font-family: monospace"><i>code</i></span> is the list of commands that are sometimes run and sometimes not run. ' +
'<span style="font-family: monospace"><i>condition</i></span> is how the <span style="font-family: monospace">if</span> statement ' +
'decides whether to run the <span style="font-family: monospace"><i>code</i></span> or not. ' +
'<span style="font-family: monospace"><i>condition</i></span> is usually some type of comparison, such as checking if two things ' +
'are equal, or if one of them is less than or greater than the other. For this challenge, you\'ll only need to know to know how to ' +
'check if things are equal. To do that, we use two equal signs: <span style="font-family: monospace">==</span>. A single equal sign ' +
'as a different meaning, which we will learn shortly, so make sure to use two.</p>' +
'<p>For example, to only move forward if <span class="chargebot">CHARGEBOT</span> is on a green tile, you would use the code:</p>' +
'<pre>if (getTileColor() == "G")\n{\n    moveForward();\n}</pre>' +
'<p>To only turn left if <span class="chargebot">CHARGEBOT</span> is on a magenta tile, you would use the code:</p>' +
'<pre>if (getTileColor() == "M")\n{\n    turnLeft();\n}</pre>' +
'<p>Here\'s the full list of color letter codes:</p>' +
'<ul>' +
'<li>"L" = gray</li>' +
'<li>"W = white</li>' +
'<li>"B = blue</li>' +
'<li>"G = green</li>' +
'<li>"R = red</li>' +
'<li>"M = magenta</li>' +
'<li>"T = teal</li>' +
'<li>"Y = yellow</li>' +
'</ul>' +
'<p>For this challenge, print out lines like</p>' +
'<p><span style="color: #6f6">The tile is yellow<br />The tile is red</span></p>' +
'<p>for each of the tiles in front of <span class="chargebot">CHARGEBOT</span>.</p>' +
'<p><b>HINT:</b> Write a custom command that prints out the proper message for a single tile, then use this command for each of the tiles.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c02l02">Next Challenge</a></p>'
);