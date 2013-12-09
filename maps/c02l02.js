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
'<h1>Auto-Charge</h1>' +
'<p>Somebody\'s left the shop in a mess, but <span class="chargebot">CHARGEBOT</span> still has a job to do! Use <span class="chargebot">CHARGEBOT</span>\'s ' +
'color sensor and <span style="font-family: monospace">if</span> statements to only charge the blue tiles.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c02l03">Next Challenge</a></p>'
);