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
'<h1>Two Kinds of Numbers</h1>' +
'<p>In the last chapter, you learned how to create counters using <span style="font-family: monospace">int</span> variables. ' +
'<span style="font-family: monospace">int</span> variables can only store whole numbers, so they work well for creating counters, but ' +
'we sometimes need to store numbers with decimal points. For this, we have another type of variable called ' +
'<span style="font-family: monospace">double</span>. You\'ve actually already seen some <span style="font-family: monospace">double</span> ' +
'values: the values that we pass to <span style="font-family: monospace">setLeftMotor</span> and ' +
'<span style="font-family: monospace">setRightMotor</span>.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c03l02">Next Challenge</a></p>'
);