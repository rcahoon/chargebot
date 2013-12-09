/* lexical grammar */

var lex = (function() {

var patterns = [
[ /^\/\/.*/               /* skip comments */ ],
[ /^\/\*(.|\n|\r)*?\*\//  /* ignore multiline comment */ ],
[ /^"(\\\.|[^"])*"/,      'STRING_LITERAL' ],
[ /^\s+/                  /* skip whitespace */ ],
[ /^0[xX][a-fA-F0-9]+[uUlL]?/, 'INTEGER' ],
[ /^[0-9]+[eE][-+]?[0-9]+[fFlL]?/, 'FLOATING' ],
[ /^[0-9]*\.[0-9]+([eE][-+]?[0-9]+)?[fFlL]?/, 'FLOATING' ],
[ /^[0-9]+\.[0-9]*([eE][-+]?[0-9]+)?[fFlL]?/, 'FLOATING' ],
[ /^[0-9]+/,             'INTEGER' ],
[ "+=",                  'ADD_ASSIGN' ],
[ "-=",                  'SUB_ASSIGN' ],
[ "*=",                  'MUL_ASSIGN' ],
[ "/=",                  'DIV_ASSIGN' ],
[ "%=",                  'MOD_ASSIGN' ],
[ "&=",                  'AND_ASSIGN' ],
[ "|=",                  'OR_ASSIGN' ],
[ "++",                  'INC_OP' ],
[ "--",                  'DEC_OP' ],
[ "&&",                  'AND_OP' ],
[ "||",                  'OR_OP' ],
[ "<=",                  'LE_OP' ],
[ ">=",                  'GE_OP' ],
[ "==",                  'EQ_OP' ],
[ "!=",                  'NE_OP' ],
[ ";",                   ';' ],
[ "{",                   '{' ],
[ "}",                   '}' ],
[ ",",                   ',' ],
[ ":",                   ':' ],
[ "=",                   '=' ],
[ "(",                   '(' ],
[ ")",                   ')' ],
[ "[",                   '[' ],
[ "]",                   ']' ],
[ "!",                   '!' ],
[ "-",                   '-' ],
[ "+",                   '+' ],
[ "*",                   '*' ],
[ "/",                   '/' ],
[ "%",                   '%' ],
[ "<",                   '<' ],
[ ">",                   '>' ],
[ "?",                   '?' ],
[ /^[a-zA-Z_][a-zA-Z_0-9]*/, 'IDENTIFIER' ]
];

var keywords = [
[ "break",               'BREAK' ],
[ "continue",            'CONTINUE' ],
[ "do",                  'DO' ],
[ "double",              'FLOAT' ],
[ "else",                'ELSE' ],
[ "float",               'FLOAT' ],
[ "for",                 'FOR' ],
[ "if",                  'IF' ],
[ "int",                 'INT' ],
[ "return",              'RETURN' ],
[ "void",                'VOID' ],
[ "while",               'WHILE' ],
[ "bool",                'BOOL' ],
[ "boolean",             'BOOL' ],
[ "string",              'STRING' ],
[ "String",              'STRING' ],
[ "true",                'BOOL_LITERAL' ],
[ "false",               'BOOL_LITERAL' ]
];

return function(code) {
	var tokens = [];
	var pos = 0;
	var lineNr = 1;
	var linePos = 0;
	var nextLinePos = code.indexOf('\n')+1;
	if (nextLinePos <= 0) nextLinePos = code.length;
	
	function makeLoc()
	{
		while(nextLinePos < pos)
		{
			++lineNr;
			linePos = nextLinePos;
			nextLinePos = code.indexOf('\n', linePos) + 1;
			if (nextLinePos <= 0) nextLinePos = code.length;
		}
		return { line: lineNr, column: pos - linePos + 1 };
	}
	
	function pushToken(type, text)
	{
		if (type == 'IDENTIFIER')
		{
			for(var j=0; j < keywords.length; ++j)
			{
				if (keywords[j][0] == text)
					type = keywords[j][1];
			}
		}
		
		var startLoc = makeLoc();
		pos += text.length - 1;
		var endLoc = makeLoc();
		++pos;
		if (type)
			tokens.push({ type: type, text: text, loc: { start: startLoc, end: endLoc } });
	}
	
	advance: while(pos < code.length)
	{
		for(var i=0; i < patterns.length; ++i)
		{
			var p = patterns[i][0];
			if (typeof p === 'string')
			{
				if (code.substring(pos, pos + p.length) == p)
				{
					pushToken(patterns[i][1], p);
					continue advance;
				}
			}
			if (p instanceof RegExp)
			{
				var match = p.exec(code.substring(pos));
				if (match)
				{
					pushToken(patterns[i][1], match[0]);
					continue advance;
				}
			}
		}
		
		var ex = new Error("Looks like you have a typo. I don't recognize some of this code.");
		var loc = makeLoc();
		ex.location = { start: loc, end: loc };
		throw ex;
	}
	
	pushToken('EOF', '');
	
	return tokens;
};
})();

function StringSet() {
    var setObj = {}, val = {};

    this.add = function(str) {
        setObj[str] = val;
    };

    this.contains = function(str) {
        return setObj[str] === val;
    };

    this.remove = function(str) {
        delete setObj[str];
    };
	
	this.clear = function() {
		setObj = {};
	};

    this.values = function() {
        var values = [];
        for (var i in setObj) {
            if (setObj[i] === val) {
                values.push(i);
            }
        }
        return values;
    };
}

var parser = (function() {

var $;

var tokens;
var iterPos;
var iterStack;

var maxPos = 0;
var possibilities = new StringSet();

function getLocation(_$)
{
	return _$.loc;
}

function expandLocation(start, end)
{
	return { start: start.start, end: end.end };
}

function match()
{
	iterStack.push(iterPos);
	
	var result = [];
	
	if (iterPos < tokens.length)
		result.loc = { start: tokens[iterPos].loc.start, end: tokens[iterPos].loc.end };
	else
		result.loc = { start: tokens[tokens.length-1].loc.end, end: tokens[tokens.length-1].loc.end };
	
	advance: for(var i=0; i < arguments.length; ++i)
	{
		if (typeof arguments[i] === 'function')
		{
			var val = arguments[i]();
			if (!val)
			{
				iterPos = iterStack.pop();
				return false;
			}
			result.push(val);
			continue advance;
		}
		if (typeof arguments[i] === 'string')
		{
			if (iterPos < tokens.length &&
			    tokens[iterPos].type === arguments[i])
			{
				result.push(tokens[iterPos].text);
				++iterPos;
				if (iterPos > maxPos)
				{
					maxPos = iterPos;
					possibilities.clear();
				}
				continue advance;
			}
			else
			{
				if (iterPos === maxPos && i > 0)
				{
					possibilities.add(arguments[i]);
				}
				iterPos = iterStack.pop();
				return false;
			}
		}
		if (arguments[i].length)
		{
			for(var j=0; j < arguments[i].length; ++j)
			{
				if (match(arguments[i][j]))
				{
					result.push($[0]);
					continue advance;
				}
			}
			
			iterPos = iterStack.pop();
			return false;
		}
		
		result.push(arguments[i]);
	}
	
	if (iterPos > iterStack.pop())
		result.loc.end = tokens[iterPos-1].loc.end;
	
	$ = result;
	return true;
}

/* A.2.1 Expressions */

function primary_expression()
{
	if (match('IDENTIFIER'))
	{
		return {
			type: 'Identifier',
			loc: getLocation($),
			name: $[0],
			lvalue: true
		};
	}
	if (match('INTEGER'))
	{
		return {
			type: 'Literal',
			loc: getLocation($),
			value: parseInt($[0]),
			datatype: 'INT'
		};
	}
	if (match('FLOATING'))
	{
		return {
			type: 'Literal',
			loc: getLocation($),
			value: parseFloat($[0]),
			datatype: 'FLOAT'
		};
	}
	if (match('BOOL_LITERAL'))
	{
		return {
			type: 'Literal',
			loc: getLocation($),
			value: $[0] === 'true',
			datatype: 'BOOL'
		};
	}
	if (match('STRING_LITERAL'))
	{
		return {
			type: 'Literal',
			loc: getLocation($),
			value: eval($[0]),
			datatype: 'STRING'
		};
	}
	if (match('(', constant_expression, ')'))
	{
		return $[1];
	}
}

function expression_list()
{
	if (!match(constant_expression))
		return;
		
	var l = [$[0]];
	while (match(',', constant_expression))
	{
		l.push($[1]);
	}
	
	return l;
}

function postfix_expression()
{
	if (!match(primary_expression))
		return;
	
	var primary = $[0];
	
	if (primary.type === 'Identifier' && match('(', [ expression_list, false ], ')'))
	{
		primary = {
			type: 'CallExpression',
			loc: getLocation($),
			callee: primary,
			arguments: $[1] || []
		};
	}
	
	for(;;)
	{
		if (match('[', constant_expression, ']'))
		{
			primary = {
				type: 'MemberExpression',
				loc: getLocation($),
				object: primary,
				property: $[1],
				computed: false,
				lvalue: true
			};
			continue;
		}
		if (match(['INC_OP', 'DEC_OP']))
		{
			if(!primary.lvalue)
			{
				var ex = new Error($[0] + " doesn't work here, because I don't know what to assign to");
				ex.location = getLocation($);
				throw ex;
			}
			primary = {
				type: 'UpdateExpression',
				loc: getLocation($),
				operator: $[0],
				argument: primary,
				prefix: false,
			};
			continue;
		}
		break;
	}
	
	return primary;
}

function unary_operator()
{
	if (match(['+', '-', '!']))
	{
		return $[0];
	}
}

function unary_expression()
{
	if (match(['INC_OP', 'DEC_OP'], unary_expression))
	{
		if(!$[1].lvalue)
		{
			var ex = new Error($[0] + " doesn't work here, because i don't know what to assign to");
			ex.location = getLocation($);
			throw ex;
		}
		return {
			type: 'UpdateExpression',
			loc: getLocation($),
			operator: $[0],
			argument: $[1],
			prefix: true,
		};
	}
	if (match(unary_operator, cast_expression))
	{
		return {
			type: 'UnaryExpression',
			loc: getLocation($),
			operator: $[0],
			prefix: true,
			argument: $[1]
		};
	}
	if (match(postfix_expression))
	{
		return $[0];
	}
}

function cast_expression()
{
	if (match('(', type_specifier, ')', cast_expression))
	{
		//return $[3]
		return {
			type: 'CastExpression',
			loc: getLocation($),
			datatype: $[1],
			argument: $[3]
		};
	}
	if (match(unary_expression))
	{
		return $[0];
	}
}

function multiplicative_expression()
{
	if (!match(cast_expression))
		return;
	
	var left = $[0];
	
	while (match(['*', '/', '%'], cast_expression))
	{
		left = {
			type: 'BinaryExpression',
			loc: getLocation($),
			operator: $[0],
			left: left,
			right: $[1]
		};
	}
	
	return left;
}

function additive_expression()
{
	if (!match(multiplicative_expression))
		return;
	
	var left = $[0];
	
	while (match(['+', '-'], multiplicative_expression))
	{
		left = {
			type: 'BinaryExpression',
			loc: getLocation($),
			operator: $[0],
			left: left,
			right: $[1]
		};
	}
	
	return left;
}

function relational_expression()
{
	if (!match(additive_expression))
		return;
	
	var left = $[0];
	
	while (match(['<', '>', 'LE_OP', 'GE_OP'], additive_expression))
	{
		left = {
			type: 'BinaryExpression',
			loc: getLocation($),
			operator: $[0],
			left: left,
			right: $[1]
		};
	}
	
	return left;
}

function equality_expression()
{
	if (!match(relational_expression))
		return;
	
	var left = $[0];
	
	while (match(['EQ_OP', 'NE_OP'], relational_expression))
	{
		left = {
			type: 'BinaryExpression',
			loc: getLocation($),
			operator: $[0],
			left: left,
			right: $[1]
		};
	}
	
	return left;
}

function logical_and_expression()
{
	if (!match(equality_expression))
		return;
	
	var left = $[0];
	
	while(match('AND_OP', equality_expression))
	{
		left = {
			type: 'LogicalExpression',
			loc: getLocation($),
			operator: '&&',
			left: left,
			right: $[1],
		};
	}
	
	return left;
}

function logical_or_expression()
{
	if (!match(logical_and_expression))
		return;
	
	var left = $[0];
	
	while(match('OR_OP', logical_and_expression))
	{
		left = {
			type: 'LogicalExpression',
			loc: getLocation($),
			operator: '||',
			left: left,
			right: $[1]
		};
	}
	
	return left;
}

function conditional_expression()
{
	if (!match(logical_or_expression))
		return;
	
	var primary = $[0];
	
	if (match('?', constant_expression, ':', conditional_expression))
	{
		return {
			type: 'ConditionalExpression',
			loc: getLocation($),
			test: primary,
			consequent: $[1],
			alternate: $[3]
		};
	}
	else
		return primary;
}

function assignment_operator()
{
	if (match(['=',
		'MUL_ASSIGN',
		'DIV_ASSIGN',
		'MOD_ASSIGN',
		'ADD_ASSIGN',
		'SUB_ASSIGN',
		'AND_ASSIGN',
		'OR_ASSIGN']))
	{
		return $[0];
	}
}

function assignment_expression()
{
	if (!match(postfix_expression))
	{
		return constant_expression();
	}
	
	var left = $[0];
	
	if (match(assignment_operator, constant_expression))
	{
		if(!left.lvalue)
		{
			var ex = new Error("The thing on the left side of the '=' can't be assigned to");
			ex.location = getLocation($);
			throw ex;
		}
		return {
			type: 'AssignmentExpression',
			loc: getLocation($),
			operator: $[0],
			left: left,
			right: $[1]
		};
	}
	else
		return left;
}

var expression = assignment_expression;

var constant_expression = conditional_expression;

/* A.2.2 Declarations */

function declaration()
{
	if (!match(declarator))
		return;
	
	var dec = $[0];
	
	if (match(';'))
	{
		var loc = expandLocation(dec.loc, getLocation($));
		return {
			type: 'VariableDeclaration',
			loc: loc,
			declarations: [
			{
				type: 'VariableDeclarator',
				loc: loc,
				id: dec,
				init: null,
				datatype: dec.datatype
			}
			],
			kind: 'var'
		};
	}
	if (match('=', initializer, ';'))
	{
		var loc = expandLocation(dec.loc, getLocation($));
		return {
			type: 'VariableDeclaration',
			loc: loc,
			declarations: [
			{
				type: 'VariableDeclarator',
				loc: loc,
				id: dec,
				init: $[1],
				datatype: dec.datatype
			}
			],
			kind: 'var'
		};
	}
}

function type_specifier()
{
	if (match('VOID'))
	{
		return 'VOID';
	}
	if (match('INT'))
	{
		return 'INT';
	}
	if (match('FLOAT'))
	{
		return 'FLOAT';
	}
	if (match('BOOL'))
	{
		return 'BOOL';
	}
	if (match('STRING'))
	{
		return 'STRING';
	}
}

function declarator()
{
	if (match(type_specifier, 'IDENTIFIER', '[', constant_expression, ']'))
	{
		return {
			type: 'Identifier',
			loc: getLocation($),
			name: $[1],
			datatype: '[]' + $[0],
			datasize: $[3]
		};
	}
	if (match(type_specifier, 'IDENTIFIER', '[', ']'))
	{
		return {
			type: 'Identifier',
			loc: getLocation($),
			name: $[1],
			datatype: '[]' + $[0]
		};
	}
	if (match(type_specifier, '[', ']', 'IDENTIFIER'))
	{
		return {
			type: 'Identifier',
			loc: getLocation($),
			name: $[3],
			datatype: '[]' + $[0]
		};
	}
	if (match(type_specifier, 'IDENTIFIER'))
	{
		return {
			type: 'Identifier',
			loc: getLocation($),
			name: $[1],
			datatype: $[0]
		};
	}
}

function initializer()
{
	if (match('{', expression_list, [',', false], '}'))
	{
		return {
			type: 'ArrayExpression',
			loc: getLocation($),
			elements: $[1]
		};
	}
	if (match(constant_expression))
	{
		return $[0];
	}
}

/* A.2.3 Statements */

function statement()
{
	return compound_statement()
	|| expression_statement()
	|| selection_statement()
	|| iteration_statement()
	|| jump_statement()
	;
}

function compound_statement()
{
	if (match('{', [block_item_list, false], '}'))
	{
		return {
			type: 'BlockStatement',
			loc: getLocation($),
			body: $[1] || []
		};
	}
}

function block_item_list()
{
	if (!match(block_item))
		return;
	
	var l = [$[0]];
	
	while(match(block_item))
	{
		l.push($[0]);
	}
	
	return l;
}

function block_item()
{
	return declaration()
	|| statement()
	;
}

function for_condition()
{
	if (match(';'))
	{
		return {
			type: 'Literal',
			loc: getLocation($),
			value: true,
			datatype: 'BOOL'
		};
	}
	if (match(constant_expression, ';'))
	{
		return $[0];
	}
}
	
function expression_statement()
{
	if (match(';'))
	{
		return {
			type: 'EmptyStatement',
			loc: getLocation($),
		};
	}
	if (match(expression, ';'))
	{
		return {
			type: 'ExpressionStatement',
			loc: getLocation($),
			expression: $[0]
		};
	}
}

function selection_statement()
{
	if (!match('IF', '(', constant_expression, ')', statement))
		return;
	
	var ret = {
		type: 'IfStatement',
		loc: getLocation($),
		test: $[2],
		consequent: $[4],
		alternate: null
	};
	
	if (match('ELSE', statement))
	{
		ret.alternate = $[1];
	}
	
	return ret;
}

function iteration_statement()
{
	if (match('WHILE', '(', constant_expression, ')', statement))
	{
		return {
			type: 'WhileStatement',
			loc: getLocation($),
			test: $[2],
			body: $[4]
		};
	}
	if (match('DO', statement, 'WHILE', '(', constant_expression, ')', ';'))
	{
		return {
			type: 'DoWhileStatement',
			loc: getLocation($),
			test: $[4],
			body: $[1]
		};
	}
	if (match('FOR', '(', [ declaration, expression_statement], for_condition, [ expression, false ], ')', statement))
	{
		return {
			type: 'ForStatement',
			loc: getLocation($),
			init: $[2],
			test: $[3],
			update: $[4] || null,
			body: $[6]
		};
	}
}

function jump_statement()
{
	if (match('CONTINUE', ';'))
	{
		return {
			type: 'ContinueStatement',
			loc: getLocation($),
			label: null
		};
	}
	if (match('BREAK', ';'))
	{
		return {
			type: 'BreakStatement',
			loc: getLocation($),
			label: null
		};
	}
	if (match('RETURN', [constant_expression, false], ';'))
	{
		return {
			type: 'ReturnStatement',
			loc: getLocation($),
			argument: $[1] || null
		};
	}
}

/* A.2.4 External definitions */

function translation_unit()
{
	if (!match(external_declaration))
		return;
	
	var l = [$[0]];
	
	while(match(external_declaration))
	{
		l.push($[0]);
	}
	
	return l;
}

function external_declaration()
{
	return statement()
	|| function_definition()
	|| declaration()
	;
}

function function_definition()
{
	if (match(declarator, function_parameters, compound_statement))
	{
		return {
			type: 'FunctionDeclaration',
			loc: getLocation($),
			id: $[0],
			params: $[1],
			defaults: [],
			rest: null,
			body: $[2],
			generator: false,
			expression: false,
			datatype: $[0].datatype
		};
	}
}

function function_parameters()
{
	if (match('(', [parameter_list, false], ')'))
	{
		return $[1] || [];
	}
}

function parameter_list()
{
	if (!match(parameter_declaration))
		return;
	
	var l = [$[0]];
	
	while(match(',', parameter_declaration))
	{
		l.push($[1]);
	}
	
	return l;
}

var parameter_declaration = declarator;

function start()
{
	match([translation_unit, false]);
	var code = $[0] || [];
	
	/*var prog = {
		type: 'FunctionExpression',
		loc: getLocation($),
		id: null,
		params: [],
		defaults: [],
		rest: null,
		body: {
		type: 'BlockStatement',
		body: code
		},
		generator: false,
		expression: false
	};*/
	var prog = {
		type: 'Program',
		loc: getLocation($),
		body: code
	};
	
	if (!match('EOF')) {
		var expecting = possibilities.values();
		if (expecting.length == 0)
			expecting = "more code";
		else if (expecting.length == 1)
			expecting = "a " + expecting[0];
		else
			expecting = "either " + expecting.join(', ');
		var ex;
		var loc;
		if (maxPos >= tokens.length ||
			tokens[maxPos].type === 'EOF')
		{
			ex = new Error("Looks like you forgot something. I was expecting " + expecting);
			loc = tokens[tokens.length-1].loc.end;
		}
		else
		{
			var ex = new Error("Looks like you have a typo or forgot something. I read a " + tokens[maxPos].text + " but was expecting " + expecting);
			loc = tokens[maxPos].loc.start;
		}
		ex.location = { start: loc, end: loc };
		throw ex;
	}
	
	return prog;
}

return function(toks) {
	tokens = toks;
	iterPos = 0;
	iterStack = [];
	maxPos = 0;
	possibilities.clear();
	
	return start();
};

})();

var subc = {};
subc.parse = function(code) { return parser(lex(code)); }