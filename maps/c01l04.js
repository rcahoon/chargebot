createWorld([
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1', 'W0' ],
[ 'B1', 'W0', 'W1', 'W1', 'W1', 'W0', 'W1', 'W0' ],
[ 'W1', 'W0', 'W1', 'W0', 'W1', 'W0', 'W1', 'W0' ],
[ 'W1', 'W0', 'W1', 'W0', 'W1', 'W0', 'W1', 'W0' ],
[ 'W1', 'W0', 'W1', 'W0', 'W1', 'W0', 'W1', 'W0' ],
[ 'W1', 'W0', 'W1', 'W0', 'W1', 'W0', 'W1', 'W0' ],
[ 'W1', 'W0', 'W1', 'W0', 'W1', 'W1', 'W1', 'W0' ],
[ 'W1', 'W1', 'W1', 'W0', 'W0', 'W0', 'W0', 'W0' ]
], 0, 6, 0, 1, [
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1', 'W0' ],
[ 'G1', 'W0', 'W1', 'W1', 'W1', 'W0', 'W1', 'W0' ],
[ 'W1', 'W0', 'W1', 'W0', 'W1', 'W0', 'W1', 'W0' ],
[ 'W1', 'W0', 'W1', 'W0', 'W1', 'W0', 'W1', 'W0' ],
[ 'W1', 'W0', 'W1', 'W0', 'W1', 'W0', 'W1', 'W0' ],
[ 'W1', 'W0', 'W1', 'W0', 'W1', 'W0', 'W1', 'W0' ],
[ 'W1', 'W0', 'W1', 'W0', 'W1', 'W1', 'W1', 'W0' ],
[ 'W1', 'W1', 'W1', 'W0', 'W0', 'W0', 'W0', 'W0' ]
]);

$("#instructions").html(
'<h1>The 2<sup>nd</sup> Dimension</h1>' +
'<p>Great job! You may have guessed this already, but <span class="chargebot">CHARGEBOT</span> can also turn left and right. ' +
'He wouldn\'t be much use if he could only travel in one direction!</p>' +
'<pre>turnLeft(); \t\tturnLeftFor(<i>n</i>);\nturnRight();\t\tturnRightFor(<i>n</i>);</pre>' +
'<p>These commands work very similarly to <span style="font-family: monospace">moveForward</span>, but instead turn ' +
'<span class="chargebot">CHARGEBOT</span> 90&deg; left or right.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c01l05">Next Challenge</a></p>'
);