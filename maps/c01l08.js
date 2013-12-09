createWorld([
[ 'B0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'B0', 'W2', 'W0', 'W0', 'W0', 'B0', 'W0' ],
[ 'W0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'B0', 'W0', 'W2', 'W0', 'W0', 'W0', 'B0', 'W0' ],
[ 'W0', 'B0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'W0', 'W2', 'W0', 'W0', 'W0', 'B0', 'W0' ],
[ 'B0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'B0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ]
], 0, 3, 0, 1, [
[ 'G0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'G0', 'W2', 'W0', 'W0', 'W0', 'G0', 'W0' ],
[ 'W0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'G0', 'W0', 'W2', 'W0', 'W0', 'W0', 'G0', 'W0' ],
[ 'W0', 'G0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'W0', 'W2', 'W0', 'W0', 'W0', 'G0', 'W0' ],
[ 'G0', 'W0', 'W2', 'W0', 'W1', 'W1', 'W1', 'W1' ],
[ 'W0', 'G0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ]
]);

$("#instructions").html(
'<h1>Easy Modifications</h1>' +
'<p>This challenge looks very similar to the last one, except the charge tiles in the isles have ' +
'all been moved in the same way. Since we use the same code for all three isles, changing the code ' +
'to work for this level is very easy. Feel free to copy-and-paste your code from the last challenge ' +
'as a starting point.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>It may not seem like a big deal to modify code once instead of three times, but as you start ' +
'creating larger and larger programs, you might use the same code dozens of times in many different ' +
'places. Being able to change the code in only one place makes the code much quicker to modify if ' +
'you need to, and also means you won\'t need to remember (and possibly forget) all the places ' +
'where you use that code.</p>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c01l09">Next Challenge</a></p>');