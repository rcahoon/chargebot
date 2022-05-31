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
		mapColorsGoal += c + "\n";
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
'<h1>Disco Tiles</h1>' +
'<p>Until now, the programs you\'ve written have done the same thing each time you\'ve run them. This has worked well because the ' +
'worlds that <span class="chargebot">CHARGEBOT</span> has worked in haven\'t changed.</p>' +
'<p>In a strange plot twist, <span class="chargebot">CHARGEBOT</span> now finds himself in a discotheque, and thanks to his color ' +
'sensor, he becomes enchanted with the psychedelic color-changing floor. Let\'s help him check out the floor colors.</p>' +
'<pre>getTileColor()</pre>' +
'<p>uses <span class="chargebot">CHARGEBOT</span>\'s color sensor to detect the color of the tile he is currently sitting on. ' +
'But obviously this isn\'t useful if we can\'t use the information from the sensor in our programs. Using the sensor reading is easy: ' +
'we just put this command in place of a text value, like the ones that we pass to <span style="font-family: monospace">print</span>:</p>' +
'<pre>print(getTileColor());</pre>' +
'<p>Instead of the same text value each time, though, <span style="font-family: monospace">getTileColor</span> produces a text value that ' +
'will change depending on the color that the color sensor detects.</p>' +
'<p>Create a program to print out the color reading of each of the tiles in front of <span class="chargebot">CHARGEBOT</span>. Note: You won\'t ' +
'need to charge any tiles in this challenge - just print the tile colors</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>If you want to, try running your program a couple more times and watch the output change depending on the colors of the floor tiles.</p>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c01l11">Next Challenge</a></p>'
);