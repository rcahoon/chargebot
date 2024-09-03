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
'<h1>Just Keep Charging, Just Keep Charging</h1>' +
'<p>OH NO!</p>' +
'<p><span class="chargebot">CHARGEBOT</span> stayed out playing in the rain too long and fried all his memory circuits! He\'s ' +
'forgotten all his automatic movement (<span style="font-family: monospace">moveForward</span>, ' +
'<span style="font-family: monospace">turnLeft</span>, <span style="font-family: monospace">turnRight</span>) commands, so we\'ve ' +
'had to switch him over to manual control mode:</p>' +
'<pre>setLeftMotor(<i>power</i>);\nsetRightMotor(<i>power</i>);</pre>' +
'<p>these commands both take a number (<span style="font-family: monospace"><i>power</i></span>) between -1 and 1 that tells ' +
'<span class="chargebot">CHARGEBOT</span>\'s left or right motor to move forward (positive numbers), backward (negative numbers) or ' +
'stop (0); 1 means full power forward, -1 means full power backward.</p>' +
'<p>Because these commands simply turn the motors on and off without any idea of how the robot is moving, we need some code that ' +
'measures the correct amount for the robot to move. There are several ways to do this, but the easiest is to wait for a certain ' +
'amount of time:</p>' +
'<pre>waitForSeconds(<i>seconds</i>);</pre>' +
'<p>Putting these commands together, we can make <span class="chargebot">CHARGEBOT</span> move forward at half speed for a 5 seconds:</p>' +
'<pre>setLeftMotor(0.5);\nsetRightMotor(0.5);\n\nwaitForSeconds(5.0);\n\nsetLeftMotor(0);\nsetRightMotor(0);</pre>' +
'<p>Make sure you remember to turn off the motors (by setting them to 0) when you want <span class="chargebot">CHARGEBOT</span> to ' +
'stop moving.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c03l02">Next Challenge</a></p>'
);
