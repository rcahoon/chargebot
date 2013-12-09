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
'<h1>Code Shortcuts</h1>' +
'<p>You probably noticed that the code to complete the last challenge required a lot of <span style="font-family: monospace">moveForward();</span> ' +
'commands, and that keeping track of how many of these commands you had used was rather clumsy. Let\'s talk about a new command that will help with this:</p>' +
'<pre>moveForwardFor(<i>n</i>);</pre>' +
'<p>This command does the work of many <span style="font-family: monospace">moveForward();</span> commands: you replace the ' +
'<span style="font-family: monospace; font-style: italic">n</span> with the number of times to move forward, such as:</p>' +
'<pre>moveForwardFor(3);</pre>' +
'<p>to move forward 3 squares. The <span style="font-family: monospace; font-style: italic">n</span> is called the command\'s <u>argument</u>, or sometimes the ' +
'command\'s <u>parameter</u>.</p>' +
'<p>Programmers should always try to make their code as simple as possible, which makes it easier to maintain, ' +
'and easier for other team members to read and understand. Try writing a new version of the program to solve the previous challenge that takes ' +
'advantage of this new command - you should be able to do it in only two lines. You can copy-and-paste your code from the previous problem as a starting point.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c01l04">Next Challenge</a></p>'
);