createWorld([
[ 'W0', 'W2', 'W0', 'W0', 'W0', 'W0', 'W0', 'B2' ],
[ 'W0', 'T2', 'W0', 'W0', 'W0', 'W0', 'W0', 'L2' ],
[ 'W0', 'T2', 'W0', 'W0', 'W0', 'W0', 'W0', 'L2' ],
[ 'W0', 'R2', 'W0', 'L2', 'Y2', 'Y2', 'Y2', 'Y2' ],
[ 'W0', 'R2', 'W0', 'L2', 'W0', 'W0', 'W0', 'W0' ],
[ 'W0', 'R2', 'W0', 'T2', 'T2', 'T2', 'T2', 'L2' ],
[ 'W0', 'M2', 'W0', 'W0', 'W0', 'W0', 'W0', 'L2' ],
[ 'W0', 'M2', 'Y2', 'Y2', 'R2', 'R2', 'M2', 'M2' ]
], 0, 1, 0, 1, [
[ 'W0', 'W2', 'W0', 'W0', 'W0', 'W0', 'W0', 'G2' ],
[ 'W0', 'T2', 'W0', 'W0', 'W0', 'W0', 'W0', 'L2' ],
[ 'W0', 'T2', 'W0', 'W0', 'W0', 'W0', 'W0', 'L2' ],
[ 'W0', 'R2', 'W0', 'L2', 'Y2', 'Y2', 'Y2', 'Y2' ],
[ 'W0', 'R2', 'W0', 'L2', 'W0', 'W0', 'W0', 'W0' ],
[ 'W0', 'R2', 'W0', 'T2', 'T2', 'T2', 'T2', 'L2' ],
[ 'W0', 'M2', 'W0', 'W0', 'W0', 'W0', 'W0', 'L2' ],
[ 'W0', 'M2', 'Y2', 'Y2', 'R2', 'R2', 'M2', 'M2' ]
]);

$("#instructions").html(
'<h1>Calculator Problems</h1>' +
'<p>In addition to calling commands, we can also include math expressions in our programs. ' +
'<span class="chargebot">CHARGEBOT</span> only understands addition, subtraction, multiplication, ' +
'division, and parentheses, but other, smarter robots often include more advanced operations as ' +
'well. Here\'s a brightly colored test track for you to try writing some programs that use math. ' +
'what are the most complicated math expressions you can come up with that solve the challenge? ' +
'Here\'s one to get you started:</p>' +
'<pre>moveForwardFor(2+(2+2)*3-7);</pre>' +
'<p>You can also use <span style="font-family: monospace">print</span> to print numbers in your ' +
'programs. Try <span style="font-family: monospace">print</span>ing the result of some of your math.</p>' +
'<p>Make sure to still charge the tile at the end of the course</p>');
$("#epilogue").html(
'<h1>WELL&nbsp;&nbsp;DONE!</h1>' +
'<p>We\'ve already got the next challenge waiting for you:</p>' +
'<p style="text-align: center"><a href="?map=c01l12">Next Challenge</a></p>'
);