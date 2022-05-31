function makeLocation(_$) { 
	return {
		start: {
			line: _$.first_line,
			column: _$.first_column
		},
		end: {
			line: _$.last_line,
			column: _$.last_column
		}
	};
}

if (typeof Date.now === 'undefined') {
	Date.now = function now() {
		return new Date().getTime();
	};
}

function subcc(code, base_env, onerror) {
	
	function errorMessage(e) {
		var msg;
		if (e.message)
			msg = e.message;
		else
			msg = e.toString();
		if (!e.location)
			msg = 'Internal error. This isn\'t your fault, but please let us know about this\n' + msg;
		return { message: msg, location: e.location };
	}
	
	var parse_tree;
	try
	{
		subc.trace = onerror;
		parse_tree = subc.parse(code);
	}
	catch(e)
	{
		if (console && console.log)
		{
			console.log(e);
			if (e.stack)
				console.log(e.stack);
		}
		if (onerror)
			onerror(errorMessage(e));
		throw e;
	}
	
	//console.log(parse_tree);
	
	var vm = {
		//run: process,
		stop: function() {
			if (timeoutID !== null) {
				window.clearTimeout(timeoutID);
				timeoutID = null;
				vm.onstop(true);
			}
		},
		onstop: function(aborted) {},
		onstep: function(pos) {}
	};
	
	var vm_step;
	try
	{
		vm_step = interpreter(parse_tree, base_env, function(node) {
			if (vm)
				vm.onstep(node.loc);
		});
	}
	catch(e)
	{
		if (console && console.log)
		{
			console.log(e);
			if (e.stack)
				console.log(e.stack);
		}
		if (onerror)
			onerror(errorMessage(e));
		throw e;
	}
	
	var timeoutID = null;
	
	function process() {
		var start = Date.now();
		while(Date.now() - start < 10)
		{
			try
			{
				if (vm_step())
					continue;
			}
			catch(e)
			{
				if (console && console.log)
				{
					console.log(e);
					if (e.stack)
						console.log(e.stack);
				}
				if (onerror)
					onerror(errorMessage(e));
				timeoutID = null;
				throw e;
			}
			
			vm.onstop(false);
			timeoutID = null;
			return;
		}
		timeoutID = window.setTimeout(process, 15);
	}
	
	vm.run = process;
	
	return vm;
}