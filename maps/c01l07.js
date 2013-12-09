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
'<h1>Reusing Code</h1>' +
'<p>You may have noticed that two challenge ago (which looked very much like this challenge) there were ' +
'three identical isles (like supermarket isles) with charge tiles at the ends. You probably ended up ' +
'repeating the same code three times in order to charge those tiles. If you didn\'t already do this, try ' +
'rewriting your code as the same block of code repeated three times to complete the three isles.</p>' + 
'<p>Luckily there\'s an easier way to do this: We can define a new command that performs the steps necessary ' + 
'to complete one isle, then we can run that command 3 times.</p>' +
'<p>Try making a new command called <span style="font-family: monospace">chargeIsle</span> that contains the ' +
'repeated code, and use it to complete this challenge. Notice how this can make your code much shorter than it ' +
'was before. If you want to, you can copy and paste the <span style="font-family: monospace">turnAround</span> ' +
'command from the last challenge into your code and use it to turn around at the end of the isle - custom ' +
'commands can make use of other custom commands.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c01l08">Next Challenge</a></p>');