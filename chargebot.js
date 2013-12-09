$(function() {
	
	window.codeEditor = CodeMirror($("div.code").get(0), {
		lineNumbers: true,
		mode: "text/x-csrc",
		indentWithTabs: true,
		tabSize: 4,
		indentUnit: 4
    });
	
	window.logRecord = '';
	
	window.writeLog = function(msg, record)
	{
		if (record)
			window.logRecord += msg + "\n";
		
		var li = $('<li>').html(msg);
		if (record)
			li.addClass('progout');
		$("#output").append(li);
		return li;
	};
	
	window.clearLog = function()
	{
		$("#output").empty();
		window.logRecord = '';
	};
	
	window.saveCode = function()
	{
	};
	
	window.passLevel = function()
	{
		$('#'+window.worldMap).addClass('done');
	};
	
	var execHL = [];
	
	function startVM(e) {
		e.preventDefault();
		
		var code = window.codeEditor.getValue();
		
		while(execHL.length > 0)
		{
			window.codeEditor.removeLineClass(execHL.pop(), 'background');
		}
		
		$("button#run")
		.off('click')
		.attr('disabled','disabled');
		
		$(".instructions").slideUp({ always: function() {
			window.world.reload();
			
			clearLog();
			
			var runningAction = null;
			
			var vm = subcc(code, {
				print: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [ 'STRING' ],
					func: function(cb, msg) {
						window.writeLog(msg, true);
						cb();
					}
				},
				moveForward: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [],
					func: function(cb) {
						runningAction = window.world.robotForward(cb);
					}
				},
				moveForwardFor: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [ 'INT' ],
					func: function(cb, count) {
						function worker()
						{
							if (count > 0)
							{
								--count;
								runningAction = window.world.robotForward(worker);
							}
							else
								cb();
						}
						worker();
					}
				},
				turnLeft: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [],
					func: function(cb) {
						runningAction = window.world.robotTurnLeft(cb);
					}
				},
				turnLeftFor: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [ 'INT' ],
					func: function(cb, count) {
						function worker()
						{
							if (count > 0)
							{
								--count;
								runningAction = window.world.robotTurnLeft(worker);
							}
							else
								cb();
						}
						worker();
					}
				},
				turnRight: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [],
					func: function(cb) {
						runningAction = window.world.robotTurnRight(cb);
					}
				},
				turnRightFor: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [ 'INT' ],
					func: function(cb, count) {
						function worker()
						{
							if (count > 0)
							{
								--count;
								runningAction = window.world.robotTurnRight(worker);
							}
							else
								cb();
						}
						worker();
					}
				},
				chargeTile: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [],
					func: function(cb) {
						runningAction = window.world.chargeTile(cb);
					}
				},
				drainTile: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [],
					func: function(cb) {
						runningAction = window.world.drainTile(cb);
					}
				},
				jump: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [],
					func: function(cb) {
						runningAction = window.world.robotJump(cb);
					}
				},
				getTileColor: {
					type: 'Intrinsic',
					datatype: 'STRING',
					params: [],
					func: function(cb) {
						runningAction = window.world.getTileColor(cb);
					}
				},
				setLeftMotor: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [ 'FLOAT' ],
					func: function(cb, power) {
						window.world.setLeftMotor(power);
						cb();
					}
				},
				setRightMotor: {
					type: 'Intrinsic',
					datatype: 'VOID',
					params: [ 'FLOAT' ],
					func: function(cb, power) {
						window.world.setRightMotor(power);
						cb();
					}
				},
				getLeftMotor: {
					type: 'Intrinsic',
					datatype: 'FLOAT',
					params: [],
					func: function(cb) {
						cb(window.world.getLeftMotor());
					}
				},
				getRightMotor: {
					type: 'Intrinsic',
					datatype: 'FLOAT',
					params: [],
					func: function(cb) {
						cb(window.world.getRightMotor());
					}
				},				clearLeftEncoder: {					type: 'Intrinsic',					datatype: 'VOID',					params: [],					func: function(cb) {						window.world.clearLeftEncoder();						cb();					}				},				clearRightEncoder: {					type: 'Intrinsic',					datatype: 'VOID',					params: [],					func: function(cb) {						window.world.clearRightEncoder();						cb();					}				},
				getLeftEncoder: {
					type: 'Intrinsic',
					datatype: 'FLOAT',
					params: [],
					func: function(cb) {
						cb(window.world.getLeftEncoder());
					}
				},
				getRightEncoder: {
					type: 'Intrinsic',
					datatype: 'FLOAT',
					params: [],
					func: function(cb) {
						cb(window.world.getRightEncoder());
					}
				}
			}, function(err) {
				while(execHL.length > 0)
				{
					window.codeEditor.removeLineClass(execHL.pop(), 'background');
				}
				
				var msg = '<div class="errormsg">' + err.message;
				
				var thisHL = [];
				if (err.location)
				{
					msg += '<div class="outputsubtext">Line ' + err.location.start.line + ', column ' + err.location.start.column + '</div>';
					
					for(var i=err.location.start.line; i <= err.location.end.line; ++i)
					{
						var line = window.codeEditor.addLineClass(i-1, 'background', 'errorline');
						execHL.push(line);
						thisHL.push(line);
					}
				}
				
				msg += '</div>';
				
				window.writeLog(msg).hover(
					function() {
						for(var i=0; i < thisHL.length; ++i)
						{
							window.codeEditor.addLineClass(thisHL[i], 'background', 'errorlineactive');
						}
					},
					function() {
						for(var i=0; i < thisHL.length; ++i)
						{
							window.codeEditor.removeLineClass(thisHL[i], 'background', 'errorlineactive');
						}
					}
				);
				
				$("button#stop")
				.off('click')
				.attr('disabled','disabled');
				
				$("button#run")
				.off('click')
				.click(startVM)
				.removeAttr('disabled');
			});
			
			if (!vm)
				return;
			
			var codeVersion = window.codeEditor.getDoc().changeGeneration();
			
			vm.onstep = function(pos) {
				while(execHL.length > 0)
				{
					window.codeEditor.removeLineClass(execHL.pop(), 'background');
				}
				if (window.codeEditor.getDoc().isClean(codeVersion))
				{
					for(var i=pos.start.line; i <= pos.end.line; ++i)
					{
						execHL.push(window.codeEditor.addLineClass(i-1, 'background', 'executing'));
					}
				}
			};
			
			vm.onstop = function(aborted) {
				while(execHL.length > 0)
				{
					window.codeEditor.removeLineClass(execHL.pop(), 'background');
				}
				
				if (runningAction !== null)
				{
					runningAction.clear();
					runningAction = null;
				}								window.world.stop();
				
				if (aborted)
				{
					window.writeLog('---- Program aborted ----');
				}
				else
				{
					window.writeLog('---- Program ended ----');
					
					if (!window.world.check())
						return;
					
					window.writeLog('---- Success ----');
					
					passLevel();
					saveCode();
					$('.messagewindow').show();
				}
				
				$("button#stop")
				.off('click')
				.attr('disabled','disabled');
				
				$("button#run")
				.off('click')
				.click(startVM)
				.removeAttr('disabled');
			};
			
			window.setTimeout(function() {
				$("button#stop")
				.off('click')
				.click(function(e) {
					e.preventDefault();
					
					vm.stop();
					
					window.world.reload();
					
					$("button#stop")
					.off('click')
					.attr('disabled','disabled');
					
					$("button#run")
					.off('click')
					.click(startVM)
					.removeAttr('disabled');
				})
				.removeAttr('disabled');
				
				vm.run();
			}, 550);
		} });
	}
	$("button#run").click(startVM).removeAttr('disabled');
	
	$("button#clear").click(function(e) {
		e.preventDefault();
		clearLog();
	}).removeAttr('disabled');
	
	$("button#save").click(function(e) {
		e.preventDefault();
		saveCode();
	}).removeAttr('disabled');
	
	
	
	$('a.showinstr').click(function(e) {
		e.preventDefault();
		$(".instructions").slideToggle();
	});
	$('a.hideinstr').click(function(e) {
		e.preventDefault();
		$(".instructions").slideUp();
	});
	
	$('a.loginheader').click(function(e) {
		e.preventDefault();
	});
	$('div.loginmenu').hover(function() {
		$('div#loginmenu').show();
	}, function() {
		$('div#loginmenu').hide();
	});
	
	$('a#hidemwnd').click(function(e) {
		e.preventDefault();
		$('div.messagewindow').animate({ top: "-250px" });
	});
	
	window.openInFrame = function(url)
	{
		var frame = $('div#popframe');
		
		var ifr = frame.find('iframe');
		
		ifr.attr('src', url);
		
		frame.show();
		
		return frame;
	}
	
	$('a#hidepopframe').click(function(e) {
		e.preventDefault();
		$('div#popframe').hide();
	});
	
	var selCh = $('select#chapter').change(function() {
		var $this = $(this);
		var oldVal = $this.data('oldValue');
		var newVal = $this.val();
		if (oldVal)
			$('#'+oldVal).hide();
		$('#'+newVal).show();
		$this.data('oldValue', newVal);
	}).val($('#'+window.worldMap).closest('.chapter').attr('id')).change();
	
	$(window).load(function() { selCh.change(); });
});