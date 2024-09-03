createWorld([
[ 'W1', 'W1', 'W1', 'W1', 'W1', 'B1', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W1', 'W1', 'W1', 'W1', 'W1', 'W1', 'W1' ]
], 0, 7, 0, 1, [
[ 'W1', 'W1', 'W1', 'W1', 'W1', 'G1', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W1' ],
[ 'W1', 'W1', 'W1', 'W1', 'W1', 'W1', 'W1', 'W1' ]
]);
window.stepless = true;

$("#instructions").html(
'<h1>Drive Straight, Turn Left</h1>' +
'<p>We make <span class="chargebot">CHARGEBOT</span> move forward by setting both his left and right motors to move forward. How ' +
'could we make him turn? His wheels can\'t turn like a car\'s wheels, so our only option is to vary the speed of his two motors.</p>' +
'<p>Let\'s imagine leaving the right wheel stationary while turning on the left motor. The only way for the right wheel to remain ' +
'stationary but still have the left wheel move is for <span class="chargebot">CHARGEBOT</span> to pivot around his right wheel, like ' +
'a basketball player pivoting while keeping one foot in place.</p>' +
'<p>Using this approach, we can have <span class="chargebot">CHARGEBOT</span> turn to the right by setting his right motor to 0 and ' +
'his left motor to a positive value. Similarly, a left turn can be done by turning off the left motor and commanding the right motor ' +
'to move forwards. We call this type of motion a swing turn.</p>' +
'<p>Try solving this challenge using swing turns. You can set <span class="chargebot">CHARGEBOT</span>\'s motors to different speeds ' +
'by passing different numbers to <span style="font-family: monospace">setLeftMotor</span> and ' +
'<span style="font-family: monospace">setRightMotor</span>.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c03l02">Next Challenge</a></p>'
);