if (typeof Object.create === 'undefined') { 
	Object.create = function (o) {
		function F() {};
		
		F.prototype = o;
		
		return new F();
	};
}

/*function writeCont(msg, cont)
{
	return function(val, type) {
		console.log(msg + ' "' + val + '" of type ' + type);
		cont(val, type);
	};
}

function dump(arr,maxlevel,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object' && (level < maxlevel)) { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,maxlevel,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}*/

function interpreter(ast, baseEnv, onstep)
{
	function ParseError(node, msg)
	{
		var ex;
		if (typeof msg === 'string')
			ex = new Error(msg);
		else
			ex = msg;
		ex.location = node.loc;
		throw ex;
	}
	
	if (!baseEnv) baseEnv = {};
	
	function evaluate(node, env, stack, cont)
	{
		var leftValue, leftType;
		
		//console.log('Evaluating ' + node.type);
		//console.log(node);
		
		if (onstep)
		{
			onstep(node);
		}
		
		switch (node.type)
		{
		case 'EmptyStatement':
			break;
		case 'Program':
		case 'BlockStatement':
			var blockEnv = Object.create(env); // start new scope
			// push statements onto stack in reverse order
			for(var i=node.body.length-1; i >= 0; i--)
			{
				(function(stmt) {
					stack.push(function() { evaluate(stmt, blockEnv, stack, cont); });
				})(node.body[i]);
			}
			break;
		case 'FunctionDeclaration':
			if (node.id.name in env) ParseError(node, 'A function or variable named ' + node.id.name + ' has already been declared'); //TODO: customize error for previously defined symbol type
			
			env[node.id.name] = {
				type: 'Function',
				loc: node.loc,
				datatype: node.datatype,
				owner: env,
				node: node,
				env: env
			};
			break;
		case 'VariableDeclaration':
			// push declarations onto stack in reverse order
			for(var i=node.declarations.length-1; i >= 0; i--)
			{
				(function(dec) {
					stack.push(function() { evaluate(dec, env, stack, function() {}); });
				})(node.declarations[i]);
			}
			break;
		case 'VariableDeclarator':
			if ((node.id.name in env) && (env[node.id.name].owner === env)) ParseError(node, 'A function or variable named ' + node.id.name + ' has already been declared'); //TODO: customize error for previously defined symbol type
			var newvar = {
				type: 'Variable',
				loc: node.loc,
				datatype: node.datatype,
				owner: env
			};
			env[node.id.name] = newvar;
			if (!!node.init)
			{
				stack.push(function() {
					evaluate(node.init, env, stack, function(val, type) {
						newvar.value = convertType(node, val, type, newvar.datatype);
					});
				});
			}
			break;
		case 'ExpressionStatement':
			stack.push(function() { evaluate(node.expression, env, stack, function() {}); });
			break;
		case 'CallExpression':
			if (!(node.callee.name in env)) ParseError(node, 'A function named ' + node.callee.name + ' does not exist');
			var func = env[node.callee.name];
			if (func.type === 'Function')
			{
				if (func.node.params.length !== node.arguments.length) ParseError(node, 'The function ' + node.callee.name + ' requires ' + func.node.params.length + ' arguments, but you have given ' + node.arguments.length);
				var callEnv = Object.create(func.env); // start new scope
				
				var retCB = function(val, type, returnNode) {
					if (!returnNode) returnNode = func.node;
					cont(convertType(returnNode, val, type, func.datatype), func.datatype);
				};
				
				stack.push('%RETURN%');
				stack.push(function() {
					var fakeReturn = {
						type: 'ReturnStatement',
						loc: func.node.loc,
						argument: null
					};
					evaluate(fakeReturn, callEnv, stack, retCB);
				});
				
				stack.push(function() {
					evaluate(func.node.body, callEnv, stack, retCB);
				});
				
				for(var i=node.arguments.length-1; i >= 0; i--)
				{
					(function(arg, param) {
						stack.push(function() {
							evaluate(arg, env, stack, function(val, type) {
								callEnv[param.name] = {
									type: 'Variable',
									loc: param.loc,
									datatype: param.datatype,
									owner: callEnv,
									value: convertType(arg, val, type, param.datatype)
								};
							});
						});
					})(node.arguments[i], func.node.params[i]);
				}
			}
			else if (func.type === 'Intrinsic')
			{
				if (typeof func.numArgs !== 'undefined')
				{
					if (func.numArgs !== node.arguments.length) ParseError(node, 'The function ' + node.callee.name + ' requires ' + func.numArgs + ' arguments, but you have given ' + node.arguments.length);
				}
				if (typeof func.params !== 'undefined')
				{
					if (func.params.length !== node.arguments.length) ParseError(node, 'The function ' + node.callee.name + ' requires ' + func.params.length + ' arguments, but you have given ' + node.arguments.length);
				}
				
				var finished = false;
				
				var args = [ function(retVal) { finished = true; cont(retVal, func.datatype); } ];
				stack.push(function() {
					try {
						func.func.apply(func, args);
					} catch(ex) {
						ParseError(node, ex);
					}
					
					//TODO: make this an asynchronous wait
					function waitOn()
					{
						if (!finished)
						{
							window.world.step();
							stack.push(waitOn);
						}
					}
					waitOn();
				});
				for(var i=node.arguments.length-1; i >= 0; i--)
				{
					(function(arg, param) {
						stack.push(function() {
							evaluate(arg, env, stack, function(val, type) {
								if (typeof func.params !== 'undefined')
								{
									args.push(convertType(arg, val, type, param));
								}
								else
								{
									args.push(val);
								}
							});
						});
					})(node.arguments[i], func.params[i]);
				}
			}
			else if (func.type === 'Variable')
				ParseError(node, node.callee.name + ' is a variable, so you can\'t call it as a function');
			else
				ParseError(node, 'Internal Error: Unrecognized function entry type ' + func.type + '. This isn\'t your fault, but please let us know about this');
			break;
			/*** Control Flow ***/
		case 'IfStatement':
		case 'ConditionalExpression':
			stack.push(function() {
				evaluate(node.test, env, stack, function(val, type) {
					if (convertType(node.test, val, type, 'BOOL'))
					{
						stack.push(function() { evaluate(node.consequent, env, stack, cont); });
					}
					else if (node.alternate)
					{
						stack.push(function() { evaluate(node.alternate, env, stack, cont); });
					}
				});
			});
			break;
		case 'WhileStatement':
			stack.push(function() {
				evaluate(node.test, env, stack, function(val, type) {
				if (convertType(node.test, val, type, 'BOOL'))
				{
					stack.push('%BREAK%');
					stack.push(function() { evaluate(node, env, stack, cont); });
					stack.push('%CONTINUE%');
					stack.push(function() { evaluate(node.body, env, stack, cont); });
				}
				});
			});
		break;
		case 'DoWhileStatement':
			stack.push('%BREAK%');
			stack.push(function() {
				evaluate(node.test, env, stack, function(val, type) {
					if (convertType(node.test, val, type, 'BOOL'))
					{
						stack.push(function() { evaluate(node, env, stack, cont); });
					}
				});
			});
			stack.push('%CONTINUE%');
			stack.push(function() { evaluate(node.body, env, stack, cont); });
			break;
		case 'ForStatement':
			var loopEnv = env;
			stack.push('%BREAK%');
			stack.push(function() {
				evaluate(node.test, loopEnv, stack, function(val, type) {
					if (convertType(node.test, val, type, 'BOOL'))
					{
						var partial_loop = {
							type: 'ForStatement',
							loc: node.loc,
							init: null,
							test: node.test,
							update: node.update,
							body: node.body,
						};
						stack.push(function() { evaluate(partial_loop, loopEnv, stack, cont); });
						if (node.update)
							stack.push(function() { evaluate(node.update, loopEnv, stack, cont); });
						stack.push('%CONTINUE%');
						stack.push(function() { evaluate(node.body, loopEnv, stack, cont); });
					}
				});
			});
			if (node.init)
			{
				loopEnv = Object.create(loopEnv);
				stack.push(function() { evaluate(node.init, loopEnv, stack, cont); });
			}
			break;
		case 'BreakStatement':
			do {
				if (stack.length == 0 || stack[stack.length-1] === '%RETURN%')
					ParseError(node, 'You can only use "break" inside a loop');
			} while(stack.pop() !== '%BREAK%');
			break;
		case 'ContinueStatement':
			do {
				if (stack.length == 0 || stack[stack.length-1] === '%RETURN%')
					ParseError(node, 'You can only use "continue" inside a loop');
			} while(stack.pop() !== '%CONTINUE%');
			break;
		case 'ReturnStatement':
			do {
				if (stack.length == 0)
					ParseError(node, 'You can only use "return" inside a function');
			} while(stack.pop() !== '%RETURN%');
			if (!node.argument)
			{
				cont(undefined, 'VOID', node);
			}
			else
			{
				stack.push(function() {
					evaluate(node.argument, env, stack, function(val, type) {
						cont(val, type, node);
					});
				});
			}
			break;
		/*** Operator Expressions ***/
		case 'LogicalExpression':
			stack.push(function() {
				evaluate(node.left, env, stack, function(val, type) {
					var leftValue = convertType(node.left, val, type, 'BOOL');
					
					switch (node.operator)
					{
					case '&&':
						if (leftValue)
						{
							stack.push(function() {
								evaluate(node.right, env, stack, function(val, type) {
									cont(convertType(node.right, val, type, 'BOOL'), 'BOOL');
								});
							});
						}
						else
						{
							cont(false, 'BOOL');
						}
						break;
					case '||':
						if (!leftValue)
						{
							stack.push(function() {
								evaluate(node.right, env, stack, function(val, type) {
									cont(convertType(node.right, val, type, 'BOOL'), 'BOOL');
								});
							});
						}
						else
						{
							cont(true, 'BOOL');
						}
						break;
					default:
						ParseError(node, 'Internal Error: Unrecognized operator ' + node.operator + '. This isn\'t your fault, but please let us know about this');
						break;
					}
				});
			});
			break;
		case 'BinaryExpression':
			stack.push(function() {
				evaluate(node.right, env, stack, function(rightValue, rightType) {
					var resultType;
					switch (node.operator)
					{
					case '+':
						resultType = (leftType === 'STRING' || rightType === 'STRING') ? 'STRING' : getNumericType(node.left, leftType, node.right, rightType);
						cont(leftValue + rightValue, resultType);
						break;
					case '-':
						resultType = getNumericType(node.left, leftType, node.right, rightType);
						cont(leftValue - rightValue, resultType);
						break;
					case '*':
						resultType = getNumericType(node.left, leftType, node.right, rightType);
						cont(leftValue * rightValue, resultType);
						break;
					case '/':
						resultType = getNumericType(node.left, leftType, node.right, rightType);
						if (resultType === 'INT')
							cont(toInt(leftValue / rightValue), resultType); // enforce integer division
						else
							cont(leftValue / rightValue, resultType);
						break;
					case '<':
						getNumericType(node.left, leftType, node.right, rightType);
						cont(leftValue < rightValue, 'BOOL');
						break;
					case '>':
						getNumericType(node.left, leftType, node.right, rightType);
						cont(leftValue > rightValue, 'BOOL');
						break;
					case '<=':
						getNumericType(node.left, leftType, node.right, rightType);
						cont(leftValue <= rightValue, 'BOOL');
						break;
					case '>=':
						getNumericType(node.left, leftType, node.right, rightType);
						cont(leftValue >= rightValue, 'BOOL');
						break;
					case '==':
						cont(leftValue === rightValue, 'BOOL');
						break;
					case '!=':
						cont(leftValue !== rightValue, 'BOOL');
						break;
					default:
						ParseError(node, 'Internal Error: Unrecognized operator ' + node.operator + '. This isn\'t your fault, but please let us know about this');
					}
				});
			});
			stack.push(function() {
				evaluate(node.left, env, stack, function(val, type) {
					leftValue = val;
					leftType = type;
				});
			});
			break;
		case 'AssignmentExpression':
			var assignValue;
			var assignType;
		
			stack.push(function() {
				evaluateLvalue(node.left, env, stack, function(varnode, cb) {
					var lhs, rhs;
					var result;
					var resultType;
					switch (node.operator)
					{
					case '=':
						result = convertType(node, assignValue, assignType, varnode.datatype);
						break;
					case '+=':
						resultType = (varnode.datatype === 'STRING' || assignType === 'STRING') ? 'STRING' : getNumericType(node.left, varnode.datatype, node.right, assignType);
						result = convertType(node, varnode.value + assignValue, resultType, varnode.datatype);
						break;
					case '-=':
						resultType = getNumericType(node.left, varnode.datatype, node.right, assignType);
						result = convertType(node, varnode.value - assignValue, resultType, varnode.datatype);
						break;
					case '*=':
						resultType = getNumericType(node.left, varnode.datatype, node.right, assignType);
						result = convertType(node, varnode.value * assignValue, resultType, varnode.datatype);
						break;
					case '/=':
						resultType = getNumericType(node.left, varnode.datatype, node.right, assignType);
						if (resultType === 'INT')
							result = convertType(node, toInt(varnode.value / assignValue), resultType, varnode.datatype);
						else
							result = convertType(node, varnode.value / assignValue, resultType, varnode.datatype);
						break;
					case '&=':
						lhs = convertType(node, varnode.value, varnode.datatype, 'BOOL');
						rhs = convertType(node, assignValue, assignType, 'BOOL');
						result = convertType(node, lhs && rhs, 'BOOL', varnode.datatype);
						break;
					case '|=':
						lhs = convertType(node, varnode.value, varnode.datatype, 'BOOL');
						rhs = convertType(node, assignValue, assignType, 'BOOL');
						result = convertType(node, lhs || rhs, 'BOOL', varnode.datatype);
						break;
					default:
						ParseError(node, 'Internal Error: Unrecognized compound assignment ' + node.operator + '. This isn\'t your fault, but please let us know about this');
						break;
					}
					cb(result);
					cont(result, varnode.datatype);
				});
			});
		
			stack.push(function() {
				evaluate(node.right, env, stack, function(val, type) {
					assignValue = val;
					assignType = type;
				});
			});
			break;
		case 'UpdateExpression':
			stack.push(function() {
				evaluateLvalue(node.argument, env, stack, function(varnode, cb) {
					var newValue;
					var oldValue = varnode.value;
					checkNumericType(node.argument, varnode.datatype);
					switch(node.operator)
					{
						case '++':
							newValue = varnode.value + 1;
							break;
						case '--':
							newValue = varnode.value - 1;
							break;
						default:
							ParseError(node, 'Internal Error: Unrecognized update expression operator ' + node.operator + '. This isn\'t your fault, but please let us know about this');
							break;
					}
					cb(newValue);
					cont(node.prefix ? newValue : oldValue, varnode.datatype);
				});
			});
			break;
		case 'UnaryExpression':
			stack.push(function() {
				evaluate(node.argument, env, stack, function(val, type) {
					switch (node.operator)
					{
					case '+':
						checkNumericType(node.argument, type);
						cont(val, type);
						break;
					case '-':
						checkNumericType(node.argument, type);
						cont(-val, type);
						break;
					case '!':
						cont(!convertType(node.argument, val, type, 'BOOL'), 'BOOL');
						break;
					default:
						ParseError(node, 'Internal Error: Unrecognized unary operator ' + node.operator + '. This isn\'t your fault, but please let us know about this');
						break;
					}
				});
			});
			break;
		case 'CastExpression':
			var toType = node.datatype;
			stack.push(function() {
				evaluate(node.argument, env, stack, function(val, fromType) {
					cont(castType(node, val, fromType, toType), toType);
				});
			});
			break;
		/*** Identifiers and Literals ***/
		case 'Identifier':
		case 'MemberExpression':
			stack.push(function() {
				evaluateLvalue(node, env, stack, function(varnode) {
					cont(varnode.value, varnode.datatype);
				});
			});
			break;
		case 'Literal':
			cont(node.value, node.datatype);
			break;
		case 'ArrayExpression':
			var elements = [];
			var elTypes = [];
			stack.push(function() {
				cont(elements, elTypes);
			});
			for(var i=node.elements.length-1; i >= 0; i--)
			{
				(function(j) {
					var el = node.elements[j];
					stack.push(function() {
						evaluate(el, env, stack, function(val, type) {
							elements[j] = val;
							elTypes[j] = type;
						});
					});
				})(i);
			}
			break;
		default:
			ParseError(node, 'Internal Error: Unrecognized node ' + node.type + '. This isn\'t your fault, but please let us know about this');
			break;
		}
	}

	function toInt(num)
	{
		return num | 0; // implements: (int)num
	}

	function isArrayType(type)
	{
		return type.lastIndexOf('[]', 0) === 0; // implements: type.startsWith('[]')
	}

	function getElementType(arrType)
	{
		return arrType.substring(2);
	}
	
	function formatType(type)
	{
		if (isArrayType(type))
			return 'array of ' + formatType(getElementType(type));
		else
			return type.toLowerCase();
	}

	function convertType(node, value, fromType, toType)
	{
		if (fromType === toType)
		{
			return value;
		}
		if (fromType instanceof Array)
		{
			if (!isArrayType(toType))
				ParseError(node, 'You are trying to use an array value type (' + formatType(fromType) + ', but a non-array value type (' + formatType(toType) + ') is needed');
			
			var result = [];
			for(var i=0; i < value.length; i++)
			{
				result.push(convertType(node, value[i], fromType[i], getElementType(toType)));
			}
			return result;
		}
		else if (isArrayType(fromType))
		{
			if (!isArrayType(toType))
				ParseError(node, 'You are trying to use an array value type (' + formatType(fromType) + ', but a non-array value type (' + formatType(toType) + ') is needed');
			
			var result = [];
			for(var i=0; i < value.length; i++)
			{
				result.push(convertType(node, value[i], getElementType(fromType), getElementType(toType)));
			}
			return result;
		}
		else if (isArrayType(toType))
		{
			ParseError(node, 'You are trying to use a non-array value type (' + formatType(fromType) + ', but an array value type (' + formatType(toType) + ') is needed');
		}
		else if (fromType === 'VOID')
		{
			// (Supposedly) the only way to generate a VOID value type is a void function, or not returning a value from a function that requires a return value
			ParseError(node, 'This function isn\'t producing a value, but this code needs a value');
		}
		else if (toType === 'VOID')
		{
			// (Supposedly) the only way to require a VOID value type is when returning from a void return
			ParseError(node, 'This function is declared as having a void return type, so it shouldn\'t return a value');
		}
		else if (toType === 'STRING')
		{
			return value.toString();
		}
		else if (toType === 'FLOAT' && fromType === 'INT')
		{
			return value; // all numbers are already floats in JS
		}
		else
		{
			ParseError(node, 'You are trying to use a ' + formatType(fromType) + ' value but a ' + formatType(toType) + ' value is needed');
		}
	}

	function castType(node, value, fromType, toType)
	{
		if (fromType === toType)
		{
			return value;
		}
		if (isArrayType(fromType))
		{
			if (!isArrayType(toType))
				ParseError(node, 'I can\'t cast from an array value type (' + formatType(fromType) + ' to a non-array value type (' + formatType(toType) + ')');
			
			var result = [];
			for(var i=0; i < value.length; i++)
			{
				result.push(castType(node, value[i], getElementType(fromType), getElementType(toType)));
			}
			return result;
		}
		else if (toType === 'FLOAT' && fromType === 'INT')
		{
			return value; // all numbers are already floats in JS
		}
		else if (toType === 'INT' && fromType === 'FLOAT')
		{
			return toInt(value); // force a conversion to integer by a bit-wise operation
		}
		else
		{
			//TODO: handle other cases
			ParseError(node, 'I can\'t cast from a ' + formatType(fromType) + ' to a ' + formatType(toType));
		}
	}

	function getNumericType(leftNode, leftType, rightNode, rightType)
	{
		checkNumericType(leftNode, leftType);
		checkNumericType(rightNode, rightType);
		
		if (leftType === 'FLOAT' || rightType === 'FLOAT')
			return 'FLOAT';
		else
			return 'INT';
	}

	function checkNumericType(node, type)
	{
		if (type !== 'FLOAT' && type !== 'INT')
			ParseError(node, 'This requires a number (either an int or a float), but you\'ve given a ' + formatType(type));
	}

	function evaluateLvalue(node, env, stack, cb)
	{
		switch (node.type)
		{
		case 'Identifier':
			if (!(node.name in env)) ParseError(node, 'A variable named ' + node.name + ' does not exist');
			var varnode = env[node.name];
			if (varnode.type !== 'Variable')
			{
				if (varnode.type === 'Function' || varnode.type === 'Intrinsic')
					ParseError(node, node.name + ' is a function, so you can\'t use it as a variable');
				else
					ParseError(node, node.name + ' is not a variable, so you can\'t use it like one');
			}
			cb(varnode, function(newval) {
				varnode.value = newval;
			});
			break;
		case 'MemberExpression':
			var arrValue;
			var arrType;
			stack.push(function() {
				evaluate(node.property, env, stack, function(val, type) {
					var idxValue = convertType(node, val, type, 'INT');
					if (idxValue < 0 || idxValue >= arrValue.length) ParseError(node, idxValue + ' is not a valid index for array: the array has ' + arrValue.length + ', so the index should be between 0 and ' + (arrValue.length-1));
					var varnode = {
						type: 'Variable',
						loc: node.loc,
						datatype: getElementType(arrType),
						owner: env,
						value: arrValue[idxValue]
					};
					cb(varnode, function(newval) {
						arrValue[idxValue] = newval;
					});
				});
			});
			stack.push(function() {
				evaluate(node.object, env, stack, function(val, type) {
					if (!isArrayType(type)) ParseError(node, 'You are trying to access an array element in a value that is not an array');
					arrValue = val;
					arrType = type;
				});
			});
			break;
		default:
			ParseError(node, 'You are trying to assign a value to something which can not be assigned to');
			break;
		}
	}
	
	var stack = [];
	evaluate(ast, baseEnv, stack, function() {});
	return function() {
		if (stack.length > 100000) throw new Error('Stack overflow error: Check to make sure one of your functions isn\'t calling itself when it\'s not supposed to');
		
		if (stack.length == 0)
			return false;
		
		var it = stack.pop();
		switch(typeof(it))
		{
		case 'function':
		  it();
		  break;
		case 'string':
		  break;
		default:
		  throw new Error('Internal error: Invalid stack entry type "' + typeof(it) + '". This isn\'t your fault, but please let us know about this error');
		}
		
		return true;
	};
}