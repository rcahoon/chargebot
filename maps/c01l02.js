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

$("#instructions").html(
'<h1>The Long Straight</h1>' +
'<p>Great job! Let\'s look more closely at the commands you used to program <span class="chargebot">CHARGEBOT</span>.</p>' +
'<pre>moveForward();\nchargeTile();</pre>' +
'<p>Each command starts with a name, either <span style="font-family: monospace">moveForward</span> or ' +
'<span style="font-family: monospace">chargeTile</span>. You\'ll notice there\'s no space between the words in the ' +
'names. This is because command names must follow some rules: they must start with a letter, and can only be made up of letters, ' +
'numbers, and underscores. Spaces are not legal, so we instead use capitalization to show where new words begin.</p>' +
'<p>Next, come open and close parentheses <span style="font-family: monospace">()</span>. These tell <span class="chargebot">CHARGEBOT</span> ' +
'that these names are commands that it should execute. We\'ll soon learn about other kinds of names that we can use in our programs ' +
'and <span class="chargebot">CHARGEBOT</span> needs a way to tell them apart. Lastly, each command ends with a semicolon ' +
'<span style="font-family: monospace">;</span>. This tells <span class="chargebot">CHARGEBOT</span> where one command ends and the ' +
'next begins. It\'s like the programming version of the period at the end of a sentence.</p>' +
'<p>Using these commands, try to figure out this challenge. You can give <span class="chargebot">CHARGEBOT</span> more commands by ' +
'adding additional lines to your program. <span class="chargebot">CHARGEBOT</span> will execute them in order.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c01l03">Next Challenge</a></p>'
);