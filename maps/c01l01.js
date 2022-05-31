createWorld([
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W1', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'B2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W1', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ]
], 3, 3, 0, 1, [
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W1', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'G2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W1', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ]
]);

$("#instructions").html(
'<h1>Getting Started</h1>' +
'<p style="text-align: center"><img src="img/robotE.png" height="125" /></p>' +
'<p>This is <span class="chargebot">CHARGEBOT</span>; he\'s responsible for recharging the devices around headquarters ' +
'when their power supplies are depleted. Your job is to program <span class="chargebot">CHARGEBOT</span> ' +
'to make his rounds and restore all the power tiles.</p>' +
'<p><span class="chargebot">CHARGEBOT</span> is programmed by giving him lists of commands, which you enter ' +
'in the green-outlined code box to the right. ' +
'<pre>moveForward();</pre> ' +
'makes him move forward one square. ' +
'<pre>chargeTile();</pre> ' +
'recharges the tile he\'s sitting on, if it\'s depleted (blue).</p>' +
'<p><span class="chargebot">CHARGEBOT</span> isn\'t very smart, though, '+
'so you have to make sure to spell the commands exactly right, with correct capitalization and puncutation.</p>'+
'<p>Try entering <span style="font-family: monospace">moveForward();</span> in the code box, and then ' +
'<span style="font-family: monospace">chargeTile();</span> on the next line, then press the ' +
'<span style="font-weight: bold">Run</span> button.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c01l02">Next Challenge</a></p>'
);