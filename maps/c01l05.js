createWorld([
[ 'B0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'B0', 'W2', 'W0', 'W0', 'W0', 'W0', 'B0' ],
[ 'W0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'B0', 'W0', 'W2', 'W0', 'W0', 'W0', 'W0', 'B0' ],
[ 'W0', 'B0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'W0', 'W2', 'W0', 'W0', 'W0', 'W0', 'B0' ],
[ 'B0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'B0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ]
], 0, 3, 0, 1, [
[ 'G0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'G0', 'W2', 'W0', 'W0', 'W0', 'W0', 'G0' ],
[ 'W0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'G0', 'W0', 'W2', 'W0', 'W0', 'W0', 'W0', 'G0' ],
[ 'W0', 'G0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'W0', 'W2', 'W0', 'W0', 'W0', 'W0', 'G0' ],
[ 'G0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'G0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ]
]);

$("#instructions").html(
'<h1>Charge More</h1>' +
'<p>We\'ve picked up some new devices around headquarters that need recharging.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c01l06">Next Challenge</a></p>');