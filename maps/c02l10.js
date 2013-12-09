createWorld([
[ 'W0', 'B0', 'W0', 'B0', 'W0', 'B0', 'W0', 'B0' ],
[ 'B0', 'W0', 'B0', 'W0', 'B0', 'W0', 'B0', 'W0' ],
[ 'W0', 'B0', 'W0', 'B0', 'W0', 'B0', 'W0', 'B0' ],
[ 'B0', 'W0', 'B0', 'W0', 'B0', 'W0', 'B0', 'W0' ],
[ 'W0', 'B0', 'W0', 'B0', 'W0', 'B0', 'W0', 'B0' ],
[ 'B0', 'W0', 'B0', 'W0', 'B0', 'W0', 'B0', 'W0' ],
[ 'W0', 'B0', 'W0', 'B0', 'W0', 'B0', 'W0', 'B0' ],
[ 'B0', 'W0', 'B0', 'W0', 'B0', 'W0', 'B0', 'W0' ]
], 0, 0, 0, 1, [
[ 'W0', 'G0', 'W0', 'G0', 'W0', 'G0', 'W0', 'G0' ],
[ 'G0', 'W0', 'G0', 'W0', 'G0', 'W0', 'G0', 'W0' ],
[ 'W0', 'G0', 'W0', 'G0', 'W0', 'G0', 'W0', 'G0' ],
[ 'G0', 'W0', 'G0', 'W0', 'G0', 'W0', 'G0', 'W0' ],
[ 'W0', 'G0', 'W0', 'G0', 'W0', 'G0', 'W0', 'G0' ],
[ 'G0', 'W0', 'G0', 'W0', 'G0', 'W0', 'G0', 'W0' ],
[ 'W0', 'G0', 'W0', 'G0', 'W0', 'G0', 'W0', 'G0' ],
[ 'G0', 'W0', 'G0', 'W0', 'G0', 'W0', 'G0', 'W0' ]
]);

$("#instructions").html(
'<h1>Nested Loops</h1>' +
'<p>Just like you\'ve been putting <span style="font-family: monospace">if</span> statements inside loops, you can ' +
'also put loops inside other loops. Just make sure that if you want the loops to use separate counters that you give ' +
'each loop\'s variable a different name.</p>' +
'<p>Use nested loops to charge the checkerboard pattern of tiles. For reference, I was able to solve this challenge ' +
'using a total of 3 loops and 21 lines of code, but don\'t worry if you need a couple more than that. However, if you ' +
'find yourself using a lot more, you may need to rethink how you\'re writing your code.</p>' +
'<p>P.S. If you lose track of how the values of your counter variables are changing, remember that you can use ' +
'<span style="font-family: monospace">print</span> statements to print them to the message window, which may help you ' +
'figure out any problems that you might run into.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c02l11">Next Challenge</a></p>'
);