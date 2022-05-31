createWorld([
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'B2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ]
], 0, 3, 0, 1, function() {
if ($.trim(window.logRecord) == '') {
	window.writeLog('Remember to include print commands in your program');
	return false;
}
return [
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'G2', 'W1', 'W0', 'W0', 'W0' ],
[ 'W0', 'W0', 'W1', 'W2', 'W1', 'W0', 'W0', 'W0' ]
]; });

$("#instructions").html(
'<h1>Talk Back</h1>' +
'<p>Another capability <span class="chargebot">CHARGEBOT</span> has is to report back information at various points in ' +
'your program. You may have already noticed that <span class="chargebot">CHARGEBOT</span> prints "Program ended" once all ' +
'the commands in your program have been completed.' +
'<p>Other messages can be printed by using the <span style="font-family: monospace">print(<i>message</i>);</span> command. ' +
'For example, if we wanted <span class="chargebot">CHARGEBOT</span> say "I\'m a unicorn!" then we could give the command:</p>' +
'<pre>print("I\'m a unicorn!");</pre>' +
'<p>The <span style="font-family: monospace"><i>message</i></span> is a parameter to the <span style="font-family: monospace">print</span> ' +
'command, just like the <span style="font-family: monospace">moveForwardFor</span> and <span style="font-family: monospace">turnRightFor</span> ' +
'commands have. However, the <span style="font-family: monospace"><i>message</i></span> is given with double quotation marks. These ' +
'tell <span class="chargebot">CHARGEBOT</span> that he shouldn\'t try to interpret the message as code, just use it as a block ' +
'of text.</p>' +
'<p>Try rewriting your code for this simple world so that <span class="chargebot">CHARGEBOT</span> prints a message after each ' +
'action he performs, telling what he just did. For example, after each call to <span style="font-family: monospace">moveForward</span>, ' +
'print "Moved Forward." Also print an appropriate message after he charges the tile.</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>Using <span style="font-family: monospace">print</span> commands can help you diagnose problems in programs you\'ve written. ' +
'If you\'re ever unsure why your program isn\'t working, try adding some <span style="font-family: monospace">print</span>s!</p>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c01l10">Next Challenge</a></p>'
);