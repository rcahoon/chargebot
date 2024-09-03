createWorld([
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'B2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ]
], 0, 3, 0, 1, [
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'G2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ]
]);
window.stepless = true;

$("#instructions").html(
'<h1>Measuring Tape</h1>' +
'<p>In the last two challenges, we simply waited for a certain amount of time in order for <span class="chargebot">CHARGEBOT</span> to move ' +
'the correct distance. However, if <span class="chargebot">CHARGEBOT</span> were to encounter an obstacle or start going up a hill, it ' +
'might take longer than we expected for him to move the correct distance. A way to prevent this from happening is to use sensors to ' +
'make sure he travels the correct distance.</p>' +
'<p>The most common kind of sensor used for this purpose is an <i>encoder</i>, which measures how much a wheel has rotated. We can read the ' +
'encoders attached to <span class="chargebot">CHARGEBOT</span>\'s wheels by using the following functions:</p>' +
'<pre>getLeftEncoder()\ngetRightEncoder()</pre>' +
'<p>Try solving this challenge using a while loop swing turns. You can set <span class="chargebot">CHARGEBOT</span>\'s motors to different speeds ' +
'by passing different numbers to <span style="font-family: monospace">setLeftMotor</span> and ' +
'<span style="font-family: monospace">setRightMotor</span>.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c03l02">Next Challenge</a></p>'
);