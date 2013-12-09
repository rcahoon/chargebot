createWorld([
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W1', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'B2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W1', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ]
], 5, 3, 0, 1, [
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W1', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'G2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W1', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0', 'W0' ]
]);

$("#instructions").html(
'<h1>Defining Commands</h1>' +
'<p>So far, we\'ve been writing programs for <span class="chargebot">CHARGEBOT</span> that only use commands ' +
'that he already knows. Like a pet dog, <span class="chargebot">CHARGEBOT</span> is smart enough to learn new ' +
'commands, but we have to tell him exactly how to do them. Let\'s see how to define a command.</p>' +
'<p>A common operation that <span class="chargebot">CHARGEBOT</span> might have to do is to turn around. ' + 
'One way to do this is to turn left twice. Let\'s write a command called ' +
'<span style="font-family: monospace">turnAround</span> (remember, spaces are illegal in command names), that ' +
'does this. Try typing the following code into your program:</p>' + 
'<pre>void turnAround()\n' +
'{\n' +
'    turnLeft();\n' +
'    turnLeft();\n' +
'}</pre>' +
'<p>This code includes some elements that we haven\'t used before, so let\'s break it down. The first thing is ' +
'the word <span style="font-family: monospace">void</span>. We\'ll learn more about this later, but basically ' +
'this tells <span class="chargebot">CHARGEBOT</span> that we\'re starting to define a new command. Then comes ' +
'the name of the command, in this case <span style="font-family: monospace">turnAround</span>, followed by open ' +
'open and close parentheses, like we would type if we were calling this command. However, we don\'t put a ' +
'semicolon because we haven\'t finished: we haven\'t yet told <span class="chargebot">CHARGEBOT</span> what this ' +
'command does.</p>' +
'<p>To do that, we have to give a block of code surrounded by braces: ' +
'<span style="font-family: monospace">{</span> and <span style="font-family: monospace">}</span>. You can type ' +
'these by holding the Shift key while pressing one of the two keys to the right of the P key. Any code that you ' +
'put between the open and close braces will be executed whenever your new command is run. In the case of ' +
'<span style="font-family: monospace">turnAround</span>, that code is two ' +
'<span style="font-family: monospace">turnLeft</span>s</p>' +
'<p>Once your new command has been defined, you can run it like any other command:</p>' +
'<pre>turnAround();</pre>' +
'<p>Try using this command to solve this challenge. <span class="chargebot">CHARGEBOT</span> starts facing ' +
'the wrong direction - looks like he\'ll need to <span style="font-family: monospace">turnAround</span>!</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>The next challenge will ask you to write a more complicated custom command. If you feel like you don\'y yet ' +
'fully understand how custom commands work, try experimenting with them before moving on. Can you create a modified ' +
'version of <span style="font-family: monospace">turnAround</span> which makes the robot do a complete 360?</p>' +
'<p style="text-align: center"><a href="?map=c01l07">Next Challenge</a></p>');