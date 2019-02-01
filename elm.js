(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done(elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done(elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done(elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? elm$http$Http$GoodStatus_ : elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return elm$core$Dict$empty;
	}

	var headers = elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? elm$core$Maybe$Just(event.total) : elm$core$Maybe$Nothing
		}))));
	});
}



// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm$core$Maybe$Nothing;
	}
}


function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var elm$core$Basics$False = {$: 'False'};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$List$cons = _List_cons;
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var elm$http$Http$header = elm$http$Http$Header;
var ohanhi$remotedata_http$RemoteData$Http$acceptJson = A2(elm$http$Http$header, 'Accept', 'application/json');
var ohanhi$remotedata_http$RemoteData$Http$defaultConfig = {
	headers: _List_fromArray(
		[ohanhi$remotedata_http$RemoteData$Http$acceptJson]),
	risky: false,
	timeout: elm$core$Maybe$Nothing,
	tracker: elm$core$Maybe$Nothing
};
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Basics$True = {$: 'True'};
var elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var elm$http$Http$Timeout_ = {$: 'Timeout_'};
var elm$http$Http$emptyBody = _Http_emptyBody;
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			elm$core$Basics$identity,
			A2(elm$core$Basics$composeR, toResult, toMsg));
	});
var elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var elm$http$Http$NetworkError = {$: 'NetworkError'};
var elm$http$Http$Timeout = {$: 'Timeout'};
var elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return elm$core$Result$Err(elm$http$Http$Timeout);
			case 'NetworkError_':
				return elm$core$Result$Err(elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					elm$core$Result$mapError,
					elm$http$Http$BadBody,
					toResult(body));
		}
	});
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			elm$http$Http$expectStringResponse,
			toMsg,
			elm$http$Http$resolve(
				function (string) {
					return A2(
						elm$core$Result$mapError,
						elm$json$Json$Decode$errorToString,
						A2(elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var krisajenkins$remotedata$RemoteData$Failure = function (a) {
	return {$: 'Failure', a: a};
};
var krisajenkins$remotedata$RemoteData$Success = function (a) {
	return {$: 'Success', a: a};
};
var krisajenkins$remotedata$RemoteData$fromResult = function (result) {
	if (result.$ === 'Err') {
		var e = result.a;
		return krisajenkins$remotedata$RemoteData$Failure(e);
	} else {
		var x = result.a;
		return krisajenkins$remotedata$RemoteData$Success(x);
	}
};
var elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var elm$http$Http$init = elm$core$Task$succeed(
	A2(elm$http$Http$State, elm$core$Dict$empty, _List_Nil));
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Process$kill = _Scheduler_kill;
var elm$core$Process$spawn = _Scheduler_spawn;
var elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _n2 = A2(elm$core$Dict$get, tracker, reqs);
					if (_n2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _n2.a;
						return A2(
							elm$core$Task$andThen,
							function (_n3) {
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2(elm$core$Dict$remove, tracker, reqs));
							},
							elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						elm$core$Task$andThen,
						function (pid) {
							var _n4 = req.tracker;
							if (_n4.$ === 'Nothing') {
								return A3(elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _n4.a;
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3(elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			elm$core$Task$andThen,
			function (reqs) {
				return elm$core$Task$succeed(
					A2(elm$http$Http$State, reqs, subs));
			},
			A3(elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _n0) {
		var actualTracker = _n0.a;
		var toMsg = _n0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? elm$core$Maybe$Just(
			A2(
				elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : elm$core$Maybe$Nothing;
	});
var elm$http$Http$onSelfMsg = F3(
	function (router, _n0, state) {
		var tracker = _n0.a;
		var progress = _n0.b;
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$filterMap,
					A3(elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var elm$http$Http$subMap = F2(
	function (func, _n0) {
		var tracker = _n0.a;
		var toMsg = _n0.b;
		return A2(
			elm$http$Http$MySub,
			tracker,
			A2(elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager(elm$http$Http$init, elm$http$Http$onEffects, elm$http$Http$onSelfMsg, elm$http$Http$cmdMap, elm$http$Http$subMap);
var elm$http$Http$command = _Platform_leaf('Http');
var elm$http$Http$subscription = _Platform_leaf('Http');
var elm$http$Http$request = function (r) {
	return elm$http$Http$command(
		elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var elm$http$Http$riskyRequest = function (r) {
	return elm$http$Http$command(
		elm$http$Http$Request(
			{allowCookiesFromOtherDomains: true, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var ohanhi$remotedata_http$RemoteData$Http$performRequest = function (_n0) {
	var risky = _n0.risky;
	return risky ? elm$http$Http$riskyRequest : elm$http$Http$request;
};
var ohanhi$remotedata_http$RemoteData$Http$request = F6(
	function (method, config, url, tagger, decoder, body) {
		return A2(
			ohanhi$remotedata_http$RemoteData$Http$performRequest,
			config,
			{
				body: body,
				expect: A2(
					elm$http$Http$expectJson,
					A2(elm$core$Basics$composeR, krisajenkins$remotedata$RemoteData$fromResult, tagger),
					decoder),
				headers: config.headers,
				method: method,
				timeout: config.timeout,
				tracker: config.tracker,
				url: url
			});
	});
var ohanhi$remotedata_http$RemoteData$Http$getWithConfig = F4(
	function (config, url, tagger, decoder) {
		return A6(ohanhi$remotedata_http$RemoteData$Http$request, 'GET', config, url, tagger, decoder, elm$http$Http$emptyBody);
	});
var author$project$Main$get = ohanhi$remotedata_http$RemoteData$Http$getWithConfig(ohanhi$remotedata_http$RemoteData$Http$defaultConfig);
var elm$json$Json$Decode$map2 = _Json_map2;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var elm$json$Json$Decode$field = _Json_decodeField;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2(elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			elm$core$String$join,
			after,
			A2(elm$core$String$split, before, string));
	});
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$Model$stationsDecoder = A2(
	elm$json$Json$Decode$andThen,
	A2(elm$core$Basics$composeR, elm$core$Dict$fromList, elm$json$Json$Decode$succeed),
	elm$json$Json$Decode$list(
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'stationName',
			A2(
				elm$json$Json$Decode$map,
				A2(elm$core$String$replace, ' asema', ''),
				elm$json$Json$Decode$string),
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'stationShortCode',
				elm$json$Json$Decode$string,
				elm$json$Json$Decode$succeed(
					F2(
						function (a, b) {
							return _Utils_Tuple2(a, b);
						}))))));
var author$project$View$StationsResponse = function (a) {
	return {$: 'StationsResponse', a: a};
};
var author$project$Main$getStations = A3(author$project$Main$get, 'https://rata.digitraffic.fi/api/v1/metadata/stations', author$project$View$StationsResponse, author$project$Model$stationsDecoder);
var author$project$Model$TrainRaw = F6(
	function (trainNumber, lineId, trainCategory, timetableRows, runningCurrently, cancelled) {
		return {cancelled: cancelled, lineId: lineId, runningCurrently: runningCurrently, timetableRows: timetableRows, trainCategory: trainCategory, trainNumber: trainNumber};
	});
var elm$json$Json$Decode$decodeValue = _Json_run;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$null = _Json_decodeNull;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var elm$json$Json$Decode$value = _Json_decodeValue;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _n0 = A2(elm$json$Json$Decode$decodeValue, pathDecoder, input);
			if (_n0.$ === 'Ok') {
				var rawValue = _n0.a;
				var _n1 = A2(
					elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_n1.$ === 'Ok') {
					var finalResult = _n1.a;
					return elm$json$Json$Decode$succeed(finalResult);
				} else {
					var finalErr = _n1.a;
					return elm$json$Json$Decode$fail(
						elm$json$Json$Decode$errorToString(finalErr));
				}
			} else {
				return elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2(elm$json$Json$Decode$andThen, handleResult, elm$json$Json$Decode$value);
	});
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2(elm$json$Json$Decode$field, key, elm$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var author$project$Model$TimetableRow = F9(
	function (scheduledTime, trainStopping, stationShortCode, stationUICCode, track, rowType, actualTime, liveEstimateTime, differenceInMinutes) {
		return {actualTime: actualTime, differenceInMinutes: differenceInMinutes, liveEstimateTime: liveEstimateTime, rowType: rowType, scheduledTime: scheduledTime, stationShortCode: stationShortCode, stationUICCode: stationUICCode, track: track, trainStopping: trainStopping};
	});
var elm$parser$Parser$deadEndsToString = function (deadEnds) {
	return 'TODO deadEndsToString';
};
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0.a;
		var _n1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_n1.$ === 'Good') {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (_n0.$ === 'Ok') {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parseA(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					var _n2 = callback(a);
					var parseB = _n2.a;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var elm$core$String$length = _String_length;
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var elm$parser$Parser$Advanced$end = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				elm$core$String$length(s.src),
				s.offset) ? A3(elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0.a;
		var parseB = _n1.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n2 = parseA(s0);
				if (_n2.$ === 'Bad') {
					var p = _n2.a;
					var x = _n2.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n2.a;
					var a = _n2.b;
					var s1 = _n2.c;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(
							elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$Advanced$succeed = function (a) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var elm$core$Basics$not = _Basics_not;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _n1.a;
			var newRow = _n1.b;
			var newCol = _n1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var elm$parser$Parser$Advanced$symbol = elm$parser$Parser$Advanced$token;
var elm$parser$Parser$symbol = function (str) {
	return elm$parser$Parser$Advanced$symbol(
		A2(
			elm$parser$Parser$Advanced$Token,
			str,
			elm$parser$Parser$ExpectingSymbol(str)));
};
var elm$core$Basics$round = _Basics_round;
var elm$core$String$toFloat = _String_toFloat;
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var elm$core$String$slice = _String_slice;
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3(elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var elm$parser$Parser$Advanced$problem = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$problem = function (msg) {
	return elm$parser$Parser$Advanced$problem(
		elm$parser$Parser$Problem(msg));
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs = A2(
	elm$parser$Parser$andThen,
	function (str) {
		if (elm$core$String$length(str) <= 9) {
			var _n0 = elm$core$String$toFloat('0.' + str);
			if (_n0.$ === 'Just') {
				var floatVal = _n0.a;
				return elm$parser$Parser$succeed(
					elm$core$Basics$round(floatVal * 1000));
			} else {
				return elm$parser$Parser$problem('Invalid float: \"' + (str + '\"'));
			}
		} else {
			return elm$parser$Parser$problem(
				'Expected at most 9 digits, but got ' + elm$core$String$fromInt(
					elm$core$String$length(str)));
		}
	},
	elm$parser$Parser$getChompedString(
		elm$parser$Parser$chompWhile(elm$core$Char$isDigit)));
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts = F6(
	function (monthYearDayMs, hour, minute, second, ms, utcOffsetMinutes) {
		return elm$time$Time$millisToPosix((((monthYearDayMs + (((hour * 60) * 60) * 1000)) + (((minute - utcOffsetMinutes) * 60) * 1000)) + (second * 1000)) + ms);
	});
var elm$core$String$toInt = _String_toInt;
var rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt = function (quantity) {
	return A2(
		elm$parser$Parser$andThen,
		function (str) {
			if (_Utils_eq(
				elm$core$String$length(str),
				quantity)) {
				var _n0 = elm$core$String$toInt(str);
				if (_n0.$ === 'Just') {
					var intVal = _n0.a;
					return elm$parser$Parser$succeed(intVal);
				} else {
					return elm$parser$Parser$problem('Invalid integer: \"' + (str + '\"'));
				}
			} else {
				return elm$parser$Parser$problem(
					'Expected ' + (elm$core$String$fromInt(quantity) + (' digits, but got ' + elm$core$String$fromInt(
						elm$core$String$length(str)))));
			}
		},
		elm$parser$Parser$getChompedString(
			elm$parser$Parser$chompWhile(elm$core$Char$isDigit)));
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear = 1970;
var rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay = function (day) {
	return elm$parser$Parser$problem(
		'Invalid day: ' + elm$core$String$fromInt(day));
};
var elm$core$Basics$modBy = _Basics_modBy;
var elm$core$Basics$neq = _Utils_notEqual;
var rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear = function (year) {
	return (!A2(elm$core$Basics$modBy, 4, year)) && (A2(elm$core$Basics$modBy, 100, year) || (!A2(elm$core$Basics$modBy, 400, year)));
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore = function (y1) {
	var y = y1 - 1;
	return (((y / 4) | 0) - ((y / 100) | 0)) + ((y / 400) | 0);
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay = 86400000;
var rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear = 31536000000;
var rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay = function (_n0) {
	var year = _n0.a;
	var month = _n0.b;
	var dayInMonth = _n0.c;
	if (dayInMonth < 0) {
		return rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth);
	} else {
		var succeedWith = function (extraMs) {
			var yearMs = rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear * (year - rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear);
			var days = ((month < 3) || (!rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year))) ? (dayInMonth - 1) : dayInMonth;
			var dayMs = rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay * (days + (rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore(year) - rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore(rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear)));
			return elm$parser$Parser$succeed((extraMs + yearMs) + dayMs);
		};
		switch (month) {
			case 1:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(0);
			case 2:
				return ((dayInMonth > 29) || ((dayInMonth === 29) && (!rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year)))) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(2678400000);
			case 3:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(5097600000);
			case 4:
				return (dayInMonth > 30) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(7776000000);
			case 5:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(10368000000);
			case 6:
				return (dayInMonth > 30) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(13046400000);
			case 7:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(15638400000);
			case 8:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(18316800000);
			case 9:
				return (dayInMonth > 30) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(20995200000);
			case 10:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(23587200000);
			case 11:
				return (dayInMonth > 30) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(26265600000);
			case 12:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(28857600000);
			default:
				return elm$parser$Parser$problem(
					'Invalid month: \"' + (elm$core$String$fromInt(month) + '\"'));
		}
	}
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs = A2(
	elm$parser$Parser$andThen,
	rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay,
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(
					F3(
						function (year, month, day) {
							return _Utils_Tuple3(year, month, day);
						})),
				A2(
					elm$parser$Parser$ignorer,
					rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(4),
					elm$parser$Parser$symbol('-'))),
			A2(
				elm$parser$Parser$ignorer,
				rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
				elm$parser$Parser$symbol('-'))),
		rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)));
var rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetMinutesFromParts = F3(
	function (multiplier, hours, minutes) {
		return multiplier * ((hours * 60) + minutes);
	});
var rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601 = A2(
	elm$parser$Parser$andThen,
	function (datePart) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$keeper,
							A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$keeper,
									A2(
										elm$parser$Parser$ignorer,
										elm$parser$Parser$succeed(
											rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts(datePart)),
										elm$parser$Parser$symbol('T')),
									A2(
										elm$parser$Parser$ignorer,
										rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
										elm$parser$Parser$symbol(':'))),
								A2(
									elm$parser$Parser$ignorer,
									rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
									elm$parser$Parser$symbol(':'))),
							rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
						elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									elm$parser$Parser$keeper,
									A2(
										elm$parser$Parser$ignorer,
										elm$parser$Parser$succeed(elm$core$Basics$identity),
										elm$parser$Parser$symbol('.')),
									rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs),
									elm$parser$Parser$succeed(0)
								]))),
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								elm$parser$Parser$map,
								function (_n0) {
									return 0;
								},
								elm$parser$Parser$symbol('Z')),
								A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$keeper,
									A2(
										elm$parser$Parser$keeper,
										elm$parser$Parser$succeed(rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetMinutesFromParts),
										elm$parser$Parser$oneOf(
											_List_fromArray(
												[
													A2(
													elm$parser$Parser$map,
													function (_n1) {
														return 1;
													},
													elm$parser$Parser$symbol('+')),
													A2(
													elm$parser$Parser$map,
													function (_n2) {
														return -1;
													},
													elm$parser$Parser$symbol('-'))
												]))),
									A2(
										elm$parser$Parser$ignorer,
										rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
										elm$parser$Parser$symbol(':'))),
								rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2))
							]))),
					A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(
						A6(rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts, datePart, 0, 0, 0, 0, 0)),
					elm$parser$Parser$end)
				]));
	},
	rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs);
var rtfeldman$elm_iso8601_date_strings$Iso8601$toTime = function (str) {
	return A2(elm$parser$Parser$run, rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601, str);
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$decoder = A2(
	elm$json$Json$Decode$andThen,
	function (str) {
		var _n0 = rtfeldman$elm_iso8601_date_strings$Iso8601$toTime(str);
		if (_n0.$ === 'Err') {
			var deadEnds = _n0.a;
			return elm$json$Json$Decode$fail(
				elm$parser$Parser$deadEndsToString(deadEnds));
		} else {
			var time = _n0.a;
			return elm$json$Json$Decode$succeed(time);
		}
	},
	elm$json$Json$Decode$string);
var author$project$Model$dateDecoder = rtfeldman$elm_iso8601_date_strings$Iso8601$decoder;
var author$project$Model$Arrival = {$: 'Arrival'};
var author$project$Model$Departure = {$: 'Departure'};
var author$project$Model$rowTypeDecoder = A2(
	elm$json$Json$Decode$andThen,
	function (a) {
		switch (a) {
			case 'ARRIVAL':
				return elm$json$Json$Decode$succeed(author$project$Model$Arrival);
			case 'DEPARTURE':
				return elm$json$Json$Decode$succeed(author$project$Model$Departure);
			default:
				var other = a;
				return elm$json$Json$Decode$fail('\"' + (other + '\" is not a valid row type'));
		}
	},
	elm$json$Json$Decode$string);
var elm$json$Json$Decode$bool = _Json_decodeBool;
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$maybe = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder),
				elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
			]));
};
var author$project$Model$timetableRowsDecoder = elm$json$Json$Decode$list(
	A4(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'differenceInMinutes',
		elm$json$Json$Decode$maybe(elm$json$Json$Decode$int),
		elm$core$Maybe$Nothing,
		A4(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'liveEstimateTime',
			elm$json$Json$Decode$maybe(author$project$Model$dateDecoder),
			elm$core$Maybe$Nothing,
			A4(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'actualTime',
				elm$json$Json$Decode$maybe(author$project$Model$dateDecoder),
				elm$core$Maybe$Nothing,
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'type',
					author$project$Model$rowTypeDecoder,
					A4(
						NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'commercialTrack',
						elm$json$Json$Decode$maybe(elm$json$Json$Decode$string),
						elm$core$Maybe$Nothing,
						A3(
							NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'stationUICCode',
							elm$json$Json$Decode$int,
							A3(
								NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'stationShortCode',
								elm$json$Json$Decode$string,
								A3(
									NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'trainStopping',
									elm$json$Json$Decode$bool,
									A3(
										NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'scheduledTime',
										author$project$Model$dateDecoder,
										elm$json$Json$Decode$succeed(author$project$Model$TimetableRow)))))))))));
var author$project$Model$dropUntil = F2(
	function (predicate, list) {
		dropUntil:
		while (true) {
			if (!list.b) {
				return _List_Nil;
			} else {
				var a = list.a;
				var rest = list.b;
				var _n1 = predicate(a);
				if (_n1) {
					return rest;
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue dropUntil;
				}
			}
		}
	});
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var author$project$Model$findCurrentStation = function (rows) {
	return A2(
		elm$core$Maybe$andThen,
		function (row) {
			return A3(
				elm$core$Maybe$map2,
				F2(
					function (actualTime, differenceInMinutes) {
						return {actualTime: actualTime, differenceInMinutes: differenceInMinutes, rowType: row.rowType, stationShortCode: row.stationShortCode, stationUICCode: row.stationUICCode};
					}),
				row.actualTime,
				row.differenceInMinutes);
		},
		elm$core$List$head(
			elm$core$List$reverse(
				A2(
					elm$core$List$filter,
					A2(
						elm$core$Basics$composeR,
						function ($) {
							return $.actualTime;
						},
						elm$core$Basics$neq(elm$core$Maybe$Nothing)),
					rows))));
};
var author$project$Model$findTimetableRow = F3(
	function (rowType, shortCode, rows) {
		return elm$core$List$head(
			A2(
				elm$core$List$filter,
				function (row) {
					return _Utils_eq(row.stationShortCode, shortCode) && _Utils_eq(row.rowType, rowType);
				},
				rows));
	});
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0.a;
	return millis;
};
var author$project$Model$isRightDirection = F3(
	function (rows, toShortCode, departureRow) {
		if (departureRow.$ === 'Nothing') {
			return false;
		} else {
			var departure = departureRow.a;
			return A2(
				elm$core$List$any,
				function (arr) {
					return _Utils_cmp(
						elm$time$Time$posixToMillis(arr.scheduledTime),
						elm$time$Time$posixToMillis(departure.scheduledTime)) > 0;
				},
				A2(
					elm$core$List$filter,
					function (row) {
						return _Utils_eq(row.stationShortCode, toShortCode) && _Utils_eq(row.rowType, author$project$Model$Arrival);
					},
					rows));
		}
	});
var author$project$Model$takeUntilHelp = F3(
	function (acc, predicate, list) {
		takeUntilHelp:
		while (true) {
			if (!list.b) {
				return _List_Nil;
			} else {
				var a = list.a;
				var rest = list.b;
				var _n1 = predicate(a);
				if (_n1) {
					return acc;
				} else {
					var $temp$acc = A2(elm$core$List$cons, a, acc),
						$temp$predicate = predicate,
						$temp$list = rest;
					acc = $temp$acc;
					predicate = $temp$predicate;
					list = $temp$list;
					continue takeUntilHelp;
				}
			}
		}
	});
var author$project$Model$takeUntil = author$project$Model$takeUntilHelp(_List_Nil);
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var author$project$Model$mostAccurateTime = function (timetableRow) {
	return A2(
		elm$core$Maybe$withDefault,
		timetableRow.scheduledTime,
		A2(
			elm$core$Maybe$withDefault,
			timetableRow.liveEstimateTime,
			elm$core$Maybe$Just(timetableRow.actualTime)));
};
var author$project$Model$toDuration = F2(
	function (homeStationDeparture, endStationArrival) {
		var homeTime = author$project$Model$mostAccurateTime(homeStationDeparture);
		var endTime = author$project$Model$mostAccurateTime(endStationArrival);
		return ((elm$time$Time$posixToMillis(endTime) - elm$time$Time$posixToMillis(homeTime)) / 60000) | 0;
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var author$project$Model$toTrain = F2(
	function (_n0, trainRaw) {
		var from = _n0.from;
		var to = _n0.to;
		var stoppingRows = A2(
			elm$core$List$filter,
			function ($) {
				return $.trainStopping;
			},
			trainRaw.timetableRows);
		var upcomingRows = A2(
			elm$core$List$filter,
			function (row) {
				return _Utils_eq(row.actualTime, elm$core$Maybe$Nothing);
			},
			stoppingRows);
		var rowsAfterHomeStation = A2(
			elm$core$List$filter,
			elm$core$Basics$neq(from),
			A2(
				author$project$Model$dropUntil,
				elm$core$Basics$eq(from),
				A2(
					elm$core$List$map,
					function ($) {
						return $.stationShortCode;
					},
					stoppingRows)));
		var stopsBetween = elm$core$List$length(
			A2(
				author$project$Model$takeUntil,
				elm$core$Basics$eq(to),
				rowsAfterHomeStation));
		var homeStationDeparture = A3(author$project$Model$findTimetableRow, author$project$Model$Departure, from, upcomingRows);
		var isValid = (trainRaw.trainCategory === 'Commuter') && A3(author$project$Model$isRightDirection, stoppingRows, to, homeStationDeparture);
		var viaAirport = A2(
			elm$core$List$member,
			'LEN',
			A2(
				elm$core$List$map,
				function ($) {
					return $.stationShortCode;
				},
				stoppingRows)) && ((A2(
			elm$core$List$member,
			to,
			_List_fromArray(
				['PSL', 'HKI'])) || A2(
			elm$core$List$member,
			from,
			_List_fromArray(
				['PSL', 'HKI']))) && A3(author$project$Model$isRightDirection, stoppingRows, 'LEN', homeStationDeparture));
		var endStationArrival = A3(
			author$project$Model$findTimetableRow,
			author$project$Model$Arrival,
			to,
			elm$core$List$reverse(trainRaw.timetableRows));
		var _n1 = _Utils_Tuple3(isValid, homeStationDeparture, endStationArrival);
		if ((_n1.a && (_n1.b.$ === 'Just')) && (_n1.c.$ === 'Just')) {
			var dep = _n1.b.a;
			var end = _n1.c.a;
			return elm$core$Maybe$Just(
				{
					cancelled: trainRaw.cancelled,
					currentStation: author$project$Model$findCurrentStation(trainRaw.timetableRows),
					durationMinutes: A2(author$project$Model$toDuration, dep, end),
					endStationArrival: end,
					homeStationArrival: A3(author$project$Model$findTimetableRow, author$project$Model$Arrival, from, upcomingRows),
					homeStationDeparture: dep,
					lineId: trainRaw.lineId,
					runningCurrently: trainRaw.runningCurrently,
					stopsBetween: stopsBetween,
					trainNumber: trainRaw.trainNumber,
					viaAirport: viaAirport
				});
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var author$project$Model$trainsDecoder = function (targets) {
	return A2(
		elm$json$Json$Decode$andThen,
		A2(
			elm$core$Basics$composeR,
			elm$core$List$filterMap(elm$core$Basics$identity),
			A2(
				elm$core$Basics$composeR,
				elm$core$List$map(
					function (a) {
						return _Utils_Tuple2(a.trainNumber, a);
					}),
				A2(elm$core$Basics$composeR, elm$core$Dict$fromList, elm$json$Json$Decode$succeed))),
		elm$json$Json$Decode$list(
			A2(
				elm$json$Json$Decode$andThen,
				A2(
					elm$core$Basics$composeL,
					elm$json$Json$Decode$succeed,
					author$project$Model$toTrain(targets)),
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'cancelled',
					elm$json$Json$Decode$bool,
					A3(
						NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'runningCurrently',
						elm$json$Json$Decode$bool,
						A3(
							NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'timeTableRows',
							author$project$Model$timetableRowsDecoder,
							A3(
								NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'trainCategory',
								elm$json$Json$Decode$string,
								A3(
									NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'commuterLineID',
									elm$json$Json$Decode$string,
									A3(
										NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'trainNumber',
										elm$json$Json$Decode$int,
										elm$json$Json$Decode$succeed(author$project$Model$TrainRaw))))))))));
};
var author$project$View$TrainsResponse = function (a) {
	return {$: 'TrainsResponse', a: a};
};
var elm$url$Url$Builder$toQueryPair = function (_n0) {
	var key = _n0.a;
	var value = _n0.b;
	return key + ('=' + value);
};
var elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			elm$core$String$join,
			'&',
			A2(elm$core$List$map, elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var elm$url$Url$Builder$crossOrigin = F3(
	function (prePath, pathSegments, parameters) {
		return prePath + ('/' + (A2(elm$core$String$join, '/', pathSegments) + elm$url$Url$Builder$toQuery(parameters)));
	});
var elm$url$Url$percentEncode = _Url_percentEncode;
var elm$url$Url$Builder$QueryParameter = F2(
	function (a, b) {
		return {$: 'QueryParameter', a: a, b: b};
	});
var elm$url$Url$Builder$int = F2(
	function (key, value) {
		return A2(
			elm$url$Url$Builder$QueryParameter,
			elm$url$Url$percentEncode(key),
			elm$core$String$fromInt(value));
	});
var author$project$Main$getTrains = function (targets) {
	var trainsUrl = A3(
		elm$url$Url$Builder$crossOrigin,
		'https://rata.digitraffic.fi/api/v1/live-trains/station',
		_List_fromArray(
			[targets.from]),
		_List_fromArray(
			[
				A2(elm$url$Url$Builder$int, 'minutes_before_departure', 120),
				A2(elm$url$Url$Builder$int, 'minutes_after_departure', 0),
				A2(elm$url$Url$Builder$int, 'minutes_before_arrival', 0),
				A2(elm$url$Url$Builder$int, 'minutes_after_arrival', 0)
			]));
	return A3(
		author$project$Main$get,
		trainsUrl,
		author$project$View$TrainsResponse,
		author$project$Model$trainsDecoder(targets));
};
var author$project$Model$ScheduleRoute = F2(
	function (a, b) {
		return {$: 'ScheduleRoute', a: a, b: b};
	});
var author$project$Model$SelectDepRoute = {$: 'SelectDepRoute'};
var author$project$Model$SelectDestRoute = function (a) {
	return {$: 'SelectDestRoute', a: a};
};
var elm$url$Url$percentDecode = _Url_percentDecode;
var elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var elm$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.visited;
		var unvisited = _n0.unvisited;
		var params = _n0.params;
		var frag = _n0.frag;
		var value = _n0.value;
		return A5(
			elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var elm$url$Url$Parser$map = F2(
	function (subValue, _n0) {
		var parseArg = _n0.a;
		return elm$url$Url$Parser$Parser(
			function (_n1) {
				var visited = _n1.visited;
				var unvisited = _n1.unvisited;
				var params = _n1.params;
				var frag = _n1.frag;
				var value = _n1.value;
				return A2(
					elm$core$List$map,
					elm$url$Url$Parser$mapState(value),
					parseArg(
						A5(elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$url$Url$Parser$oneOf = function (parsers) {
	return elm$url$Url$Parser$Parser(
		function (state) {
			return A2(
				elm$core$List$concatMap,
				function (_n0) {
					var parser = _n0.a;
					return parser(state);
				},
				parsers);
		});
};
var elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _n1 = state.unvisited;
			if (!_n1.b) {
				return elm$core$Maybe$Just(state.value);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				elm$core$List$cons,
				segment,
				elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var elm$url$Url$Parser$preparePath = function (path) {
	var _n0 = A2(elm$core$String$split, '/', path);
	if (_n0.b && (_n0.a === '')) {
		var segments = _n0.b;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _n0;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return elm$core$Maybe$Just(
				A2(elm$core$List$cons, value, list));
		}
	});
var elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _n0 = A2(elm$core$String$split, '=', segment);
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			var rawKey = _n0.a;
			var _n1 = _n0.b;
			var rawValue = _n1.a;
			var _n2 = elm$url$Url$percentDecode(rawKey);
			if (_n2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm$url$Url$percentDecode(rawValue);
				if (_n3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _n3.a;
					return A3(
						elm$core$Dict$update,
						key,
						elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			elm$core$List$foldr,
			elm$url$Url$Parser$addParam,
			elm$core$Dict$empty,
			A2(elm$core$String$split, '&', qry));
	}
};
var elm$url$Url$Parser$parse = F2(
	function (_n0, url) {
		var parser = _n0.a;
		return elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm$url$Url$Parser$State,
					_List_Nil,
					elm$url$Url$Parser$preparePath(url.path),
					elm$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					elm$core$Basics$identity)));
	});
var elm$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0.a;
		var parseAfter = _n1.a;
		return elm$url$Url$Parser$Parser(
			function (state) {
				return A2(
					elm$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return elm$url$Url$Parser$Parser(
			function (_n0) {
				var visited = _n0.visited;
				var unvisited = _n0.unvisited;
				var params = _n0.params;
				var frag = _n0.frag;
				var value = _n0.value;
				if (!unvisited.b) {
					return _List_Nil;
				} else {
					var next = unvisited.a;
					var rest = unvisited.b;
					var _n2 = stringToSomething(next);
					if (_n2.$ === 'Just') {
						var nextValue = _n2.a;
						return _List_fromArray(
							[
								A5(
								elm$url$Url$Parser$State,
								A2(elm$core$List$cons, next, visited),
								rest,
								params,
								frag,
								value(nextValue))
							]);
					} else {
						return _List_Nil;
					}
				}
			});
	});
var elm$url$Url$Parser$string = A2(elm$url$Url$Parser$custom, 'STRING', elm$core$Maybe$Just);
var elm$url$Url$Parser$top = elm$url$Url$Parser$Parser(
	function (state) {
		return _List_fromArray(
			[state]);
	});
var author$project$Main$parseUrl = function (url) {
	var routeParser = elm$url$Url$Parser$oneOf(
		_List_fromArray(
			[
				A2(elm$url$Url$Parser$map, author$project$Model$SelectDepRoute, elm$url$Url$Parser$top),
				A2(elm$url$Url$Parser$map, author$project$Model$SelectDestRoute, elm$url$Url$Parser$string),
				A2(
				elm$url$Url$Parser$map,
				author$project$Model$ScheduleRoute,
				A2(elm$url$Url$Parser$slash, elm$url$Url$Parser$string, elm$url$Url$Parser$string))
			]));
	var _n0 = url.fragment;
	if (_n0.$ === 'Nothing') {
		return author$project$Model$SelectDepRoute;
	} else {
		var fragment = _n0.a;
		return A2(
			elm$core$Maybe$withDefault,
			author$project$Model$SelectDepRoute,
			A2(
				elm$url$Url$Parser$parse,
				routeParser,
				_Utils_update(
					url,
					{
						fragment: elm$core$Maybe$Nothing,
						path: A2(
							elm$core$Maybe$withDefault,
							'',
							elm$url$Url$percentDecode(fragment))
					})));
	}
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var krisajenkins$remotedata$RemoteData$Loading = {$: 'Loading'};
var krisajenkins$remotedata$RemoteData$NotAsked = {$: 'NotAsked'};
var author$project$Main$urlChange = F2(
	function (model, url) {
		var route = author$project$Main$parseUrl(url);
		var _n0 = function () {
			if (route.$ === 'ScheduleRoute') {
				var from = route.a;
				var to = route.b;
				return _Utils_Tuple2(
					krisajenkins$remotedata$RemoteData$Loading,
					author$project$Main$getTrains(
						{from: from, to: to}));
			} else {
				return _Utils_Tuple2(krisajenkins$remotedata$RemoteData$NotAsked, elm$core$Platform$Cmd$none);
			}
		}();
		var trains = _n0.a;
		var trainsCmd = _n0.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{route: route, trains: trains}),
			trainsCmd);
	});
var author$project$Translations$Finnish = {$: 'Finnish'};
var author$project$Model$defaultStoredState = {language: author$project$Translations$Finnish, showTrainsViaAirport: false};
var author$project$Translations$English = {$: 'English'};
var author$project$Translations$Swedish = {$: 'Swedish'};
var author$project$Translations$stringToLanguage = function (string) {
	switch (string) {
		case 'EN':
			return elm$core$Maybe$Just(author$project$Translations$English);
		case 'FI':
			return elm$core$Maybe$Just(author$project$Translations$Finnish);
		case 'SV':
			return elm$core$Maybe$Just(author$project$Translations$Swedish);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var author$project$Model$languageDecoder = A2(
	elm$json$Json$Decode$andThen,
	function (s) {
		var _n0 = author$project$Translations$stringToLanguage(s);
		if (_n0.$ === 'Just') {
			var lang = _n0.a;
			return elm$json$Json$Decode$succeed(lang);
		} else {
			return elm$json$Json$Decode$fail('invalid language');
		}
	},
	elm$json$Json$Decode$string);
var author$project$Model$storedStateDecoderV1 = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'language',
	author$project$Model$languageDecoder,
	elm$json$Json$Decode$succeed(
		function (lang) {
			return _Utils_update(
				author$project$Model$defaultStoredState,
				{language: lang});
		}));
var author$project$Model$StoredState = F2(
	function (language, showTrainsViaAirport) {
		return {language: language, showTrainsViaAirport: showTrainsViaAirport};
	});
var author$project$Model$storedStateDecoderV2 = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'showTrainsViaAirport',
	elm$json$Json$Decode$bool,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'language',
		author$project$Model$languageDecoder,
		elm$json$Json$Decode$succeed(author$project$Model$StoredState)));
var author$project$Model$storedStateDecoder = A2(
	elm$json$Json$Decode$andThen,
	function (version) {
		if (version === 2) {
			return author$project$Model$storedStateDecoderV2;
		} else {
			return author$project$Model$storedStateDecoderV1;
		}
	},
	A2(elm$json$Json$Decode$field, 'version', elm$json$Json$Decode$int));
var author$project$Model$decodeStoredState = elm$json$Json$Decode$decodeString(author$project$Model$storedStateDecoder);
var author$project$View$TimeZoneResponse = function (a) {
	return {$: 'TimeZoneResponse', a: a};
};
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$here = _Time_here(_Utils_Tuple0);
var elm$time$Time$utc = A2(elm$time$Time$Zone, 0, _List_Nil);
var author$project$Main$init = F3(
	function (flags, url, key) {
		var storedState = A2(
			elm$core$Result$withDefault,
			author$project$Model$defaultStoredState,
			author$project$Model$decodeStoredState(flags.storedState));
		var _n0 = A2(
			author$project$Main$urlChange,
			{
				currentTime: elm$time$Time$millisToPosix(flags.timestamp),
				language: storedState.language,
				lastRequestTime: elm$time$Time$millisToPosix(0),
				navKey: key,
				route: author$project$Model$SelectDepRoute,
				showTrainsViaAirport: storedState.showTrainsViaAirport,
				stations: elm$core$Dict$empty,
				trains: krisajenkins$remotedata$RemoteData$NotAsked,
				wagonCounts: elm$core$Dict$empty,
				zone: elm$time$Time$utc
			},
			url);
		var model = _n0.a;
		var trainsCmd = _n0.b;
		return _Utils_Tuple2(
			model,
			elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						author$project$Main$getStations,
						trainsCmd,
						A2(elm$core$Task$perform, author$project$View$TimeZoneResponse, elm$time$Time$here)
					])));
	});
var author$project$View$UpdateTime = function (a) {
	return {$: 'UpdateTime', a: a};
};
var elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var elm$time$Time$init = elm$core$Task$succeed(
	A2(elm$time$Time$State, elm$core$Dict$empty, elm$core$Dict$empty));
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$time$Time$addMySub = F2(
	function (_n0, state) {
		var interval = _n0.a;
		var tagger = _n0.b;
		var _n1 = A2(elm$core$Dict$get, interval, state);
		if (_n1.$ === 'Nothing') {
			return A3(
				elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _n1.a;
			return A3(
				elm$core$Dict$insert,
				interval,
				A2(elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var elm$time$Time$setInterval = _Time_setInterval;
var elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = elm$core$Process$spawn(
				A2(
					elm$time$Time$setInterval,
					interval,
					A2(elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					elm$time$Time$spawnHelp,
					router,
					rest,
					A3(elm$core$Dict$insert, interval, id, processes));
			};
			return A2(elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var elm$time$Time$onEffects = F3(
	function (router, subs, _n0) {
		var processes = _n0.processes;
		var rightStep = F3(
			function (_n6, id, _n7) {
				var spawns = _n7.a;
				var existing = _n7.b;
				var kills = _n7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						elm$core$Task$andThen,
						function (_n5) {
							return kills;
						},
						elm$core$Process$kill(id)));
			});
		var newTaggers = A3(elm$core$List$foldl, elm$time$Time$addMySub, elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _n4) {
				var spawns = _n4.a;
				var existing = _n4.b;
				var kills = _n4.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _n3) {
				var spawns = _n3.a;
				var existing = _n3.b;
				var kills = _n3.c;
				return _Utils_Tuple3(
					spawns,
					A3(elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _n1 = A6(
			elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				elm$core$Dict$empty,
				elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _n1.a;
		var existingDict = _n1.b;
		var killTask = _n1.c;
		return A2(
			elm$core$Task$andThen,
			function (newProcesses) {
				return elm$core$Task$succeed(
					A2(elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				elm$core$Task$andThen,
				function (_n2) {
					return A3(elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _n0 = A2(elm$core$Dict$get, interval, state.taggers);
		if (_n0.$ === 'Nothing') {
			return elm$core$Task$succeed(state);
		} else {
			var taggers = _n0.a;
			var tellTaggers = function (time) {
				return elm$core$Task$sequence(
					A2(
						elm$core$List$map,
						function (tagger) {
							return A2(
								elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$succeed(state);
				},
				A2(elm$core$Task$andThen, tellTaggers, elm$time$Time$now));
		}
	});
var elm$time$Time$subMap = F2(
	function (f, _n0) {
		var interval = _n0.a;
		var tagger = _n0.b;
		return A2(
			elm$time$Time$Every,
			interval,
			A2(elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager(elm$time$Time$init, elm$time$Time$onEffects, elm$time$Time$onSelfMsg, 0, elm$time$Time$subMap);
var elm$time$Time$subscription = _Platform_leaf('Time');
var elm$time$Time$every = F2(
	function (interval, tagger) {
		return elm$time$Time$subscription(
			A2(elm$time$Time$Every, interval, tagger));
	});
var author$project$Main$subscriptions = function (model) {
	return A2(elm$time$Time$every, 1000, author$project$View$UpdateTime);
};
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(
			A3(elm$core$List$foldl, elm$core$Basics$min, x, xs));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Model$trainWagonCountDecoder = function () {
	var wagonCountFromWagons = A2(
		elm$json$Json$Decode$andThen,
		function (a) {
			return elm$json$Json$Decode$succeed(
				elm$core$List$length(a));
		},
		elm$json$Json$Decode$list(
			elm$json$Json$Decode$succeed(true)));
	var wagonCountFromJourneySections = A2(
		elm$json$Json$Decode$map,
		elm$core$List$minimum,
		elm$json$Json$Decode$list(
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'wagons',
				wagonCountFromWagons,
				elm$json$Json$Decode$succeed(elm$core$Basics$identity))));
	var liftMaybe = F2(
		function (trainNum, maybeCount) {
			return A2(
				elm$core$Maybe$andThen,
				function (count) {
					return elm$core$Maybe$Just(
						_Utils_Tuple2(trainNum, count));
				},
				maybeCount);
		});
	return A2(
		elm$json$Json$Decode$map,
		A2(
			elm$core$Basics$composeR,
			elm$core$List$filterMap(
				function (a) {
					return a;
				}),
			elm$core$Dict$fromList),
		elm$json$Json$Decode$list(
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'journeySections',
				wagonCountFromJourneySections,
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'trainNumber',
					elm$json$Json$Decode$int,
					elm$json$Json$Decode$succeed(liftMaybe)))));
}();
var author$project$View$TrainWagonCountsResponse = function (a) {
	return {$: 'TrainWagonCountsResponse', a: a};
};
var ryannhg$date_format$DateFormat$DayOfMonthFixed = {$: 'DayOfMonthFixed'};
var ryannhg$date_format$DateFormat$dayOfMonthFixed = ryannhg$date_format$DateFormat$DayOfMonthFixed;
var elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			elm$core$String$slice,
			-n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$toLower = _String_toLower;
var elm$core$String$toUpper = _String_toUpper;
var elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return elm$core$Basics$floor(numerator / denominator);
	});
var elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var elm$time$Time$toAdjustedMinutes = F2(
	function (_n0, time) {
		var defaultOffset = _n0.a;
		var eras = _n0.b;
		return A3(
			elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				elm$time$Time$flooredDiv,
				elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			elm$core$Basics$modBy,
			24,
			A2(
				elm$time$Time$flooredDiv,
				A2(elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var elm$time$Time$toMillis = F2(
	function (_n0, time) {
		return A2(
			elm$core$Basics$modBy,
			1000,
			elm$time$Time$posixToMillis(time));
	});
var elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			elm$core$Basics$modBy,
			60,
			A2(elm$time$Time$toAdjustedMinutes, zone, time));
	});
var elm$time$Time$Apr = {$: 'Apr'};
var elm$time$Time$Aug = {$: 'Aug'};
var elm$time$Time$Dec = {$: 'Dec'};
var elm$time$Time$Feb = {$: 'Feb'};
var elm$time$Time$Jan = {$: 'Jan'};
var elm$time$Time$Jul = {$: 'Jul'};
var elm$time$Time$Jun = {$: 'Jun'};
var elm$time$Time$Mar = {$: 'Mar'};
var elm$time$Time$May = {$: 'May'};
var elm$time$Time$Nov = {$: 'Nov'};
var elm$time$Time$Oct = {$: 'Oct'};
var elm$time$Time$Sep = {$: 'Sep'};
var elm$core$Basics$ge = _Utils_ge;
var elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2(elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _n0 = elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_n0) {
			case 1:
				return elm$time$Time$Jan;
			case 2:
				return elm$time$Time$Feb;
			case 3:
				return elm$time$Time$Mar;
			case 4:
				return elm$time$Time$Apr;
			case 5:
				return elm$time$Time$May;
			case 6:
				return elm$time$Time$Jun;
			case 7:
				return elm$time$Time$Jul;
			case 8:
				return elm$time$Time$Aug;
			case 9:
				return elm$time$Time$Sep;
			case 10:
				return elm$time$Time$Oct;
			case 11:
				return elm$time$Time$Nov;
			default:
				return elm$time$Time$Dec;
		}
	});
var elm$time$Time$toSecond = F2(
	function (_n0, time) {
		return A2(
			elm$core$Basics$modBy,
			60,
			A2(
				elm$time$Time$flooredDiv,
				elm$time$Time$posixToMillis(time),
				1000));
	});
var elm$time$Time$Fri = {$: 'Fri'};
var elm$time$Time$Mon = {$: 'Mon'};
var elm$time$Time$Sat = {$: 'Sat'};
var elm$time$Time$Sun = {$: 'Sun'};
var elm$time$Time$Thu = {$: 'Thu'};
var elm$time$Time$Tue = {$: 'Tue'};
var elm$time$Time$Wed = {$: 'Wed'};
var elm$time$Time$toWeekday = F2(
	function (zone, time) {
		var _n0 = A2(
			elm$core$Basics$modBy,
			7,
			A2(
				elm$time$Time$flooredDiv,
				A2(elm$time$Time$toAdjustedMinutes, zone, time),
				60 * 24));
		switch (_n0) {
			case 0:
				return elm$time$Time$Thu;
			case 1:
				return elm$time$Time$Fri;
			case 2:
				return elm$time$Time$Sat;
			case 3:
				return elm$time$Time$Sun;
			case 4:
				return elm$time$Time$Mon;
			case 5:
				return elm$time$Time$Tue;
			default:
				return elm$time$Time$Wed;
		}
	});
var ryannhg$date_format$DateFormat$amPm = F3(
	function (language, zone, posix) {
		return language.toAmPm(
			A2(elm$time$Time$toHour, zone, posix));
	});
var elm$time$Time$toDay = F2(
	function (zone, time) {
		return elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var ryannhg$date_format$DateFormat$dayOfMonth = elm$time$Time$toDay;
var ryannhg$date_format$DateFormat$days = _List_fromArray(
	[elm$time$Time$Sun, elm$time$Time$Mon, elm$time$Time$Tue, elm$time$Time$Wed, elm$time$Time$Thu, elm$time$Time$Fri, elm$time$Time$Sat]);
var ryannhg$date_format$DateFormat$dayOfWeek = F2(
	function (zone, posix) {
		return function (_n1) {
			var i = _n1.a;
			return i;
		}(
			A2(
				elm$core$Maybe$withDefault,
				_Utils_Tuple2(0, elm$time$Time$Sun),
				elm$core$List$head(
					A2(
						elm$core$List$filter,
						function (_n0) {
							var day = _n0.b;
							return _Utils_eq(
								day,
								A2(elm$time$Time$toWeekday, zone, posix));
						},
						A2(
							elm$core$List$indexedMap,
							F2(
								function (i, day) {
									return _Utils_Tuple2(i, day);
								}),
							ryannhg$date_format$DateFormat$days)))));
	});
var elm$core$List$sum = function (numbers) {
	return A3(elm$core$List$foldl, elm$core$Basics$add, 0, numbers);
};
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var elm$time$Time$toYear = F2(
	function (zone, time) {
		return elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var ryannhg$date_format$DateFormat$isLeapYear = function (year_) {
	return A2(elm$core$Basics$modBy, 4, year_) ? false : (A2(elm$core$Basics$modBy, 100, year_) ? true : (A2(elm$core$Basics$modBy, 400, year_) ? false : true));
};
var ryannhg$date_format$DateFormat$daysInMonth = F2(
	function (year_, month) {
		switch (month.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return ryannhg$date_format$DateFormat$isLeapYear(year_) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var ryannhg$date_format$DateFormat$months = _List_fromArray(
	[elm$time$Time$Jan, elm$time$Time$Feb, elm$time$Time$Mar, elm$time$Time$Apr, elm$time$Time$May, elm$time$Time$Jun, elm$time$Time$Jul, elm$time$Time$Aug, elm$time$Time$Sep, elm$time$Time$Oct, elm$time$Time$Nov, elm$time$Time$Dec]);
var ryannhg$date_format$DateFormat$monthPair = F2(
	function (zone, posix) {
		return A2(
			elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, elm$time$Time$Jan),
			elm$core$List$head(
				A2(
					elm$core$List$filter,
					function (_n0) {
						var i = _n0.a;
						var m = _n0.b;
						return _Utils_eq(
							m,
							A2(elm$time$Time$toMonth, zone, posix));
					},
					A2(
						elm$core$List$indexedMap,
						F2(
							function (a, b) {
								return _Utils_Tuple2(a, b);
							}),
						ryannhg$date_format$DateFormat$months))));
	});
var ryannhg$date_format$DateFormat$monthNumber_ = F2(
	function (zone, posix) {
		return 1 + function (_n0) {
			var i = _n0.a;
			var m = _n0.b;
			return i;
		}(
			A2(ryannhg$date_format$DateFormat$monthPair, zone, posix));
	});
var ryannhg$date_format$DateFormat$dayOfYear = F2(
	function (zone, posix) {
		var monthsBeforeThisOne = A2(
			elm$core$List$take,
			A2(ryannhg$date_format$DateFormat$monthNumber_, zone, posix) - 1,
			ryannhg$date_format$DateFormat$months);
		var daysBeforeThisMonth = elm$core$List$sum(
			A2(
				elm$core$List$map,
				ryannhg$date_format$DateFormat$daysInMonth(
					A2(elm$time$Time$toYear, zone, posix)),
				monthsBeforeThisOne));
		return daysBeforeThisMonth + A2(ryannhg$date_format$DateFormat$dayOfMonth, zone, posix);
	});
var ryannhg$date_format$DateFormat$quarter = F2(
	function (zone, posix) {
		return (A2(ryannhg$date_format$DateFormat$monthNumber_, zone, posix) / 4) | 0;
	});
var ryannhg$date_format$DateFormat$toFixedLength = F2(
	function (totalChars, num) {
		var numStr = elm$core$String$fromInt(num);
		var numZerosNeeded = totalChars - elm$core$String$length(numStr);
		var zeros = A2(
			elm$core$String$join,
			'',
			A2(
				elm$core$List$map,
				function (_n0) {
					return '0';
				},
				A2(elm$core$List$range, 1, numZerosNeeded)));
		return _Utils_ap(zeros, numStr);
	});
var ryannhg$date_format$DateFormat$toNonMilitary = function (num) {
	return (!num) ? 12 : ((num <= 12) ? num : (num - 12));
};
var ryannhg$date_format$DateFormat$millisecondsPerYear = elm$core$Basics$round((((1000 * 60) * 60) * 24) * 365.25);
var ryannhg$date_format$DateFormat$firstDayOfYear = F2(
	function (zone, time) {
		return elm$time$Time$millisToPosix(
			ryannhg$date_format$DateFormat$millisecondsPerYear * A2(elm$time$Time$toYear, zone, time));
	});
var ryannhg$date_format$DateFormat$weekOfYear = F2(
	function (zone, posix) {
		var firstDay = A2(ryannhg$date_format$DateFormat$firstDayOfYear, zone, posix);
		var firstDayOffset = A2(ryannhg$date_format$DateFormat$dayOfWeek, zone, firstDay);
		var daysSoFar = A2(ryannhg$date_format$DateFormat$dayOfYear, zone, posix);
		return (((daysSoFar + firstDayOffset) / 7) | 0) + 1;
	});
var ryannhg$date_format$DateFormat$year = F2(
	function (zone, time) {
		return elm$core$String$fromInt(
			A2(elm$time$Time$toYear, zone, time));
	});
var ryannhg$date_format$DateFormat$piece = F4(
	function (language, zone, posix, token) {
		switch (token.$) {
			case 'MonthNumber':
				return elm$core$String$fromInt(
					A2(ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthSuffix':
				return function (num) {
					return _Utils_ap(
						elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2(ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthFixed':
				return A2(
					ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2(ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthNameAbbreviated':
				return language.toMonthAbbreviation(
					A2(elm$time$Time$toMonth, zone, posix));
			case 'MonthNameFull':
				return language.toMonthName(
					A2(elm$time$Time$toMonth, zone, posix));
			case 'QuarterNumber':
				return elm$core$String$fromInt(
					1 + A2(ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 'QuarterSuffix':
				return function (num) {
					return _Utils_ap(
						elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					1 + A2(ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 'DayOfMonthNumber':
				return elm$core$String$fromInt(
					A2(ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfMonthSuffix':
				return function (num) {
					return _Utils_ap(
						elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2(ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfMonthFixed':
				return A2(
					ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2(ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfYearNumber':
				return elm$core$String$fromInt(
					A2(ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfYearSuffix':
				return function (num) {
					return _Utils_ap(
						elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2(ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfYearFixed':
				return A2(
					ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2(ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfWeekNumber':
				return elm$core$String$fromInt(
					A2(ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 'DayOfWeekSuffix':
				return function (num) {
					return _Utils_ap(
						elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2(ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 'DayOfWeekNameAbbreviated':
				return language.toWeekdayAbbreviation(
					A2(elm$time$Time$toWeekday, zone, posix));
			case 'DayOfWeekNameFull':
				return language.toWeekdayName(
					A2(elm$time$Time$toWeekday, zone, posix));
			case 'WeekOfYearNumber':
				return elm$core$String$fromInt(
					A2(ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'WeekOfYearSuffix':
				return function (num) {
					return _Utils_ap(
						elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2(ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'WeekOfYearFixed':
				return A2(
					ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2(ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'YearNumberLastTwo':
				return A2(
					elm$core$String$right,
					2,
					A2(ryannhg$date_format$DateFormat$year, zone, posix));
			case 'YearNumber':
				return A2(ryannhg$date_format$DateFormat$year, zone, posix);
			case 'AmPmUppercase':
				return elm$core$String$toUpper(
					A3(ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 'AmPmLowercase':
				return elm$core$String$toLower(
					A3(ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 'HourMilitaryNumber':
				return elm$core$String$fromInt(
					A2(elm$time$Time$toHour, zone, posix));
			case 'HourMilitaryFixed':
				return A2(
					ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2(elm$time$Time$toHour, zone, posix));
			case 'HourNumber':
				return elm$core$String$fromInt(
					ryannhg$date_format$DateFormat$toNonMilitary(
						A2(elm$time$Time$toHour, zone, posix)));
			case 'HourFixed':
				return A2(
					ryannhg$date_format$DateFormat$toFixedLength,
					2,
					ryannhg$date_format$DateFormat$toNonMilitary(
						A2(elm$time$Time$toHour, zone, posix)));
			case 'HourMilitaryFromOneNumber':
				return elm$core$String$fromInt(
					1 + A2(elm$time$Time$toHour, zone, posix));
			case 'HourMilitaryFromOneFixed':
				return A2(
					ryannhg$date_format$DateFormat$toFixedLength,
					2,
					1 + A2(elm$time$Time$toHour, zone, posix));
			case 'MinuteNumber':
				return elm$core$String$fromInt(
					A2(elm$time$Time$toMinute, zone, posix));
			case 'MinuteFixed':
				return A2(
					ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2(elm$time$Time$toMinute, zone, posix));
			case 'SecondNumber':
				return elm$core$String$fromInt(
					A2(elm$time$Time$toSecond, zone, posix));
			case 'SecondFixed':
				return A2(
					ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2(elm$time$Time$toSecond, zone, posix));
			case 'MillisecondNumber':
				return elm$core$String$fromInt(
					A2(elm$time$Time$toMillis, zone, posix));
			case 'MillisecondFixed':
				return A2(
					ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2(elm$time$Time$toMillis, zone, posix));
			default:
				var string = token.a;
				return string;
		}
	});
var ryannhg$date_format$DateFormat$formatWithLanguage = F4(
	function (language, tokens, zone, time) {
		return A2(
			elm$core$String$join,
			'',
			A2(
				elm$core$List$map,
				A3(ryannhg$date_format$DateFormat$piece, language, zone, time),
				tokens));
	});
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var ryannhg$date_format$DateFormat$Language$Language = F6(
	function (toMonthName, toMonthAbbreviation, toWeekdayName, toWeekdayAbbreviation, toAmPm, toOrdinalSuffix) {
		return {toAmPm: toAmPm, toMonthAbbreviation: toMonthAbbreviation, toMonthName: toMonthName, toOrdinalSuffix: toOrdinalSuffix, toWeekdayAbbreviation: toWeekdayAbbreviation, toWeekdayName: toWeekdayName};
	});
var ryannhg$date_format$DateFormat$Language$toEnglishAmPm = function (hour) {
	return (hour > 11) ? 'pm' : 'am';
};
var ryannhg$date_format$DateFormat$Language$toEnglishMonthName = function (month) {
	switch (month.$) {
		case 'Jan':
			return 'January';
		case 'Feb':
			return 'February';
		case 'Mar':
			return 'March';
		case 'Apr':
			return 'April';
		case 'May':
			return 'May';
		case 'Jun':
			return 'June';
		case 'Jul':
			return 'July';
		case 'Aug':
			return 'August';
		case 'Sep':
			return 'September';
		case 'Oct':
			return 'October';
		case 'Nov':
			return 'November';
		default:
			return 'December';
	}
};
var ryannhg$date_format$DateFormat$Language$toEnglishSuffix = function (num) {
	var _n0 = A2(elm$core$Basics$modBy, 100, num);
	switch (_n0) {
		case 11:
			return 'th';
		case 12:
			return 'th';
		case 13:
			return 'th';
		default:
			var _n1 = A2(elm$core$Basics$modBy, 10, num);
			switch (_n1) {
				case 1:
					return 'st';
				case 2:
					return 'nd';
				case 3:
					return 'rd';
				default:
					return 'th';
			}
	}
};
var ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName = function (weekday) {
	switch (weekday.$) {
		case 'Mon':
			return 'Monday';
		case 'Tue':
			return 'Tuesday';
		case 'Wed':
			return 'Wednesday';
		case 'Thu':
			return 'Thursday';
		case 'Fri':
			return 'Friday';
		case 'Sat':
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var ryannhg$date_format$DateFormat$Language$english = A6(
	ryannhg$date_format$DateFormat$Language$Language,
	ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
	A2(
		elm$core$Basics$composeR,
		ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
		elm$core$String$left(3)),
	ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
	A2(
		elm$core$Basics$composeR,
		ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
		elm$core$String$left(3)),
	ryannhg$date_format$DateFormat$Language$toEnglishAmPm,
	ryannhg$date_format$DateFormat$Language$toEnglishSuffix);
var ryannhg$date_format$DateFormat$format = ryannhg$date_format$DateFormat$formatWithLanguage(ryannhg$date_format$DateFormat$Language$english);
var ryannhg$date_format$DateFormat$MonthFixed = {$: 'MonthFixed'};
var ryannhg$date_format$DateFormat$monthFixed = ryannhg$date_format$DateFormat$MonthFixed;
var ryannhg$date_format$DateFormat$Text = function (a) {
	return {$: 'Text', a: a};
};
var ryannhg$date_format$DateFormat$text = ryannhg$date_format$DateFormat$Text;
var ryannhg$date_format$DateFormat$YearNumber = {$: 'YearNumber'};
var ryannhg$date_format$DateFormat$yearNumber = ryannhg$date_format$DateFormat$YearNumber;
var author$project$Main$getCompositions = F2(
	function (posix, zone) {
		var localDate = A3(
			ryannhg$date_format$DateFormat$format,
			_List_fromArray(
				[
					ryannhg$date_format$DateFormat$yearNumber,
					ryannhg$date_format$DateFormat$text('-'),
					ryannhg$date_format$DateFormat$monthFixed,
					ryannhg$date_format$DateFormat$text('-'),
					ryannhg$date_format$DateFormat$dayOfMonthFixed
				]),
			zone,
			posix);
		var url = A3(
			elm$url$Url$Builder$crossOrigin,
			'https://rata.digitraffic.fi/api/v1/compositions',
			_List_fromArray(
				[localDate]),
			_List_Nil);
		return A3(author$project$Main$get, url, author$project$View$TrainWagonCountsResponse, author$project$Model$trainWagonCountDecoder);
	});
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Main$setStorage = _Platform_outgoingPort('setStorage', elm$json$Json$Encode$string);
var author$project$Main$updateTime = function (model) {
	var currentTime = model.currentTime;
	var route = model.route;
	var requestMillis = elm$time$Time$posixToMillis(model.lastRequestTime);
	var currentMillis = elm$time$Time$posixToMillis(currentTime);
	if (route.$ === 'ScheduleRoute') {
		var from = route.a;
		var to = route.b;
		return ((currentMillis - requestMillis) >= 10000) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{lastRequestTime: currentTime}),
			author$project$Main$getTrains(
				{from: from, to: to})) : _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	} else {
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	}
};
var author$project$Model$storedStateVersion = 2;
var author$project$Translations$languageToString = function (language) {
	switch (language.$) {
		case 'English':
			return 'EN';
		case 'Finnish':
			return 'FI';
		default:
			return 'SV';
	}
};
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$json$Json$Encode$int = _Json_wrap;
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var author$project$Model$encodeStoredState = function (model) {
	return A2(
		elm$json$Json$Encode$encode,
		0,
		elm$json$Json$Encode$object(
			_List_fromArray(
				[
					A2(
					elm$core$Tuple$pair,
					'version',
					elm$json$Json$Encode$int(author$project$Model$storedStateVersion)),
					A2(
					elm$core$Tuple$pair,
					'language',
					elm$json$Json$Encode$string(
						author$project$Translations$languageToString(model.language))),
					A2(
					elm$core$Tuple$pair,
					'showTrainsViaAirport',
					elm$json$Json$Encode$bool(model.showTrainsViaAirport))
				])));
};
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$contains = _String_contains;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Navigation$load = _Browser_load;
var elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + elm$core$String$fromInt(port_));
		}
	});
var elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var elm$url$Url$toString = function (url) {
	var http = function () {
		var _n0 = url.protocol;
		if (_n0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'UrlChange':
				var url = msg.a;
				return A2(author$project$Main$urlChange, model, url);
			case 'UpdateTime':
				var time = msg.a;
				return author$project$Main$updateTime(
					_Utils_update(
						model,
						{currentTime: time}));
			case 'TimeZoneResponse':
				var zone = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{zone: zone}),
					A2(author$project$Main$getCompositions, model.currentTime, zone));
			case 'TrainsResponse':
				var webData = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{trains: webData}),
					elm$core$Platform$Cmd$none);
			case 'StationsResponse':
				if (msg.a.$ === 'Success') {
					var stations = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{stations: stations}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'TrainWagonCountsResponse':
				if (msg.a.$ === 'Success') {
					var wagonCounts = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{wagonCounts: wagonCounts}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'LinkClicked':
				var urlRequest = msg.a;
				if (urlRequest.$ === 'Internal') {
					var url = urlRequest.a;
					return _Utils_Tuple2(
						model,
						A2(
							elm$browser$Browser$Navigation$pushUrl,
							model.navKey,
							elm$url$Url$toString(url)));
				} else {
					var url = urlRequest.a;
					return _Utils_Tuple2(
						model,
						elm$browser$Browser$Navigation$load(url));
				}
			case 'SetLanguage':
				var language = msg.a;
				var nextModel = _Utils_update(
					model,
					{language: language});
				return _Utils_Tuple2(
					nextModel,
					author$project$Main$setStorage(
						author$project$Model$encodeStoredState(nextModel)));
			default:
				var value = msg.a;
				var nextModel = _Utils_update(
					model,
					{showTrainsViaAirport: value});
				return _Utils_Tuple2(
					nextModel,
					author$project$Main$setStorage(
						author$project$Model$encodeStoredState(nextModel)));
		}
	});
var author$project$View$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var author$project$View$UrlChange = function (a) {
	return {$: 'UrlChange', a: a};
};
var author$project$Translations$journeyDurationTranslationSet = function (_n0) {
	var durationMinutes = _n0.durationMinutes;
	var slowerBy = _n0.slowerBy;
	var fastestName = _n0.fastestName;
	var dMin = elm$core$String$fromInt(durationMinutes) + ' min';
	var slowerPrefix = dMin + (' · ' + (elm$core$String$fromInt(slowerBy) + ' min '));
	return (slowerBy < 4) ? {english: dMin + ' · fast', finnish: dMin + ' · nopea', swedish: dMin + ' · snabbt'} : {english: slowerPrefix + ('slower than ' + fastestName), finnish: slowerPrefix + ('hitaampi kuin ' + fastestName), swedish: slowerPrefix + ('långsammare än ' + fastestName)};
};
var elm$core$String$endsWith = _String_endsWith;
var author$project$FinnishConjugation$keepBestMatch = F2(
	function (name, rules) {
		return elm$core$List$head(
			elm$core$List$reverse(
				A2(
					elm$core$List$filterMap,
					function (rule) {
						return function (remaining) {
							return (elm$core$List$length(remaining) > 0) ? elm$core$Maybe$Just(rule) : elm$core$Maybe$Nothing;
						}(
							A2(
								elm$core$List$filter,
								function (ending) {
									return A2(
										elm$core$String$endsWith,
										elm$core$String$toUpper(ending),
										elm$core$String$toUpper(name));
								},
								rule.endings));
					},
					rules)));
	});
var author$project$FinnishConjugation$ruleset = _List_fromArray(
	[
		{
		endings: _List_fromArray(
			['a']),
		from: 'sta',
		in_: 'ssa',
		offset: 0,
		to: 'an'
	},
		{
		endings: _List_fromArray(
			['e']),
		from: 'stä',
		in_: 'ssä',
		offset: 0,
		to: 'en'
	},
		{
		endings: _List_fromArray(
			['i']),
		from: 'stä',
		in_: 'ssä',
		offset: 0,
		to: 'in'
	},
		{
		endings: _List_fromArray(
			['o']),
		from: 'sta',
		in_: 'ssa',
		offset: 0,
		to: 'on'
	},
		{
		endings: _List_fromArray(
			['u']),
		from: 'sta',
		in_: 'ssa',
		offset: 0,
		to: 'un'
	},
		{
		endings: _List_fromArray(
			['y']),
		from: 'stä',
		in_: 'ssä',
		offset: 0,
		to: 'yn'
	},
		{
		endings: _List_fromArray(
			['ä']),
		from: 'stä',
		in_: 'ssä',
		offset: 0,
		to: 'än'
	},
		{
		endings: _List_fromArray(
			['ö']),
		from: 'stä',
		in_: 'ssä',
		offset: 0,
		to: 'ön'
	},
		{
		endings: _List_fromArray(
			['pori', 'uri', 'ari', 'ani']),
		from: 'sta',
		in_: 'ssa',
		offset: 0,
		to: 'in'
	},
		{
		endings: _List_fromArray(
			['meri', 'veri']),
		from: 'essä',
		in_: 'estä',
		offset: 1,
		to: 'ereen'
	},
		{
		endings: _List_fromArray(
			['s']),
		from: 'ksesta',
		in_: 'ksessa',
		offset: 1,
		to: 'kseen'
	},
		{
		endings: _List_fromArray(
			['Muhos']),
		from: 'kselta',
		in_: 'ksella',
		offset: 1,
		to: 'kselle'
	},
		{
		endings: _List_fromArray(
			['aus']),
		from: 'desta',
		in_: 'dessa',
		offset: 1,
		to: 'teen'
	},
		{
		endings: _List_fromArray(
			['as', 'es']),
		from: 'ksesta',
		in_: 'ksessa',
		offset: 1,
		to: 'kseen'
	},
		{
		endings: _List_fromArray(
			['by']),
		from: 'stä',
		in_: 'ssä',
		offset: 0,
		to: 'hyn'
	},
		{
		endings: _List_fromArray(
			['ali', 'oli', 'uli', 'nti', 'nni']),
		from: 'sta',
		in_: 'ssa',
		offset: 0,
		to: 'in'
	},
		{
		endings: _List_fromArray(
			['lta']),
		from: 'lasta',
		in_: 'lassa',
		offset: 2,
		to: 'taan'
	},
		{
		endings: _List_fromArray(
			['he']),
		from: 'sta',
		in_: 'ssa',
		offset: 0,
		to: 'en'
	},
		{
		endings: _List_fromArray(
			['kka', 'haka']),
		from: 'asta',
		in_: 'assa',
		offset: 2,
		to: 'kaan'
	},
		{
		endings: _List_fromArray(
			['kkä']),
		from: 'ästä',
		in_: 'ässä',
		offset: 2,
		to: 'kään'
	},
		{
		endings: _List_fromArray(
			['nta']),
		from: 'nasta',
		in_: 'nassa',
		offset: 2,
		to: 'taan'
	},
		{
		endings: _List_fromArray(
			['nki']),
		from: 'ngistä',
		in_: 'ngissä',
		offset: 3,
		to: 'nkiin'
	},
		{
		endings: _List_fromArray(
			['nko']),
		from: 'ngosta',
		in_: 'ngossa',
		offset: 3,
		to: 'nkoon'
	},
		{
		endings: _List_fromArray(
			['pere']),
		from: 'elta',
		in_: 'ella',
		offset: 0,
		to: 'elle'
	},
		{
		endings: _List_fromArray(
			['pele']),
		from: 'eltä',
		in_: 'ellä',
		offset: 0,
		to: 'elle'
	},
		{
		endings: _List_fromArray(
			['rku', 'kku']),
		from: 'usta',
		in_: 'ussa',
		offset: 2,
		to: 'kuun'
	},
		{
		endings: _List_fromArray(
			['ee']),
		from: 'ltä',
		in_: 'llä',
		offset: 0,
		to: 'lle'
	},
		{
		endings: _List_fromArray(
			['ii']),
		from: 'stä',
		in_: 'ssä',
		offset: 0,
		to: 'hin'
	},
		{
		endings: _List_fromArray(
			['uu']),
		from: 'sta',
		in_: 'ssa',
		offset: 0,
		to: 'hun'
	},
		{
		endings: _List_fromArray(
			['aa', 'oo']),
		from: 'sta',
		in_: 'ssa',
		offset: 0,
		to: 'seen'
	},
		{
		endings: _List_fromArray(
			['maa', 'taa', 'ria', 'pua', 'uma', 'tra', 'ava', 'jaa', 'ruu', 'kia', 'suo']),
		from: 'lta',
		in_: 'lla',
		offset: 0,
		to: 'lle'
	},
		{
		endings: _List_fromArray(
			['iä', 'kää', 'pää']),
		from: 'ltä',
		in_: 'llä',
		offset: 0,
		to: 'lle'
	},
		{
		endings: _List_fromArray(
			['vik']),
		from: 'istä',
		in_: 'issä',
		offset: 0,
		to: 'iin'
	},
		{
		endings: _List_fromArray(
			['vio']),
		from: 'lta',
		in_: 'lla',
		offset: 0,
		to: 'lle'
	},
		{
		endings: _List_fromArray(
			['inen']),
		from: 'isista',
		in_: 'isissa',
		offset: 4,
		to: 'isiin'
	},
		{
		endings: _List_fromArray(
			['äinen', 'öinen']),
		from: 'isistä',
		in_: 'isissä',
		offset: 4,
		to: 'isiin'
	},
		{
		endings: _List_fromArray(
			['Joroinen']),
		from: 'isilta',
		in_: 'isilla',
		offset: 4,
		to: 'isille'
	},
		{
		endings: _List_fromArray(
			['harju']),
		from: 'lta',
		in_: 'lla',
		offset: 0,
		to: 'lle'
	},
		{
		endings: _List_fromArray(
			['hiekkaharju', 'uimaharju']),
		from: 'sta',
		in_: 'ssa',
		offset: 0,
		to: 'un'
	},
		{
		endings: _List_fromArray(
			['nummi']),
		from: 'elta',
		in_: 'ella',
		offset: 1,
		to: 'elle'
	},
		{
		endings: _List_fromArray(
			['järvi']),
		from: 'eltä',
		in_: 'ellä',
		offset: 1,
		to: 'elle'
	},
		{
		endings: _List_fromArray(
			['vesi']),
		from: 'deltä',
		in_: 'dellä',
		offset: 2,
		to: 'delle'
	},
		{
		endings: _List_fromArray(
			['npää']),
		from: 'stä',
		in_: 'ssä',
		offset: 0,
		to: 'hän'
	},
		{
		endings: _List_fromArray(
			['koski', 'salmi']),
		from: 'elta',
		in_: 'ella',
		offset: 1,
		to: 'elle'
	},
		{
		endings: _List_fromArray(
			['ore']),
		from: 'elta',
		in_: 'ella',
		offset: 0,
		to: 'elle'
	},
		{
		endings: _List_fromArray(
			['saari']),
		from: 'esta',
		in_: 'essa',
		offset: 1,
		to: 'een'
	},
		{
		endings: _List_fromArray(
			['lahti']),
		from: 'desta',
		in_: 'dessa',
		offset: 2,
		to: 'teen'
	},
		{
		endings: _List_fromArray(
			['kesälahti', 'talvilahti', 'lapinlahti']),
		from: 'delta',
		in_: 'della',
		offset: 2,
		to: 'delle'
	},
		{
		endings: _List_fromArray(
			['vuori']),
		from: 'elta',
		in_: 'ella',
		offset: 1,
		to: 'elle'
	},
		{
		endings: _List_fromArray(
			['laajavuori', 'punavuori']),
		from: 'esta',
		in_: 'essa',
		offset: 1,
		to: 'een'
	},
		{
		endings: _List_fromArray(
			['joki']),
		from: 'joelta',
		in_: 'joella',
		offset: 4,
		to: 'joelle'
	},
		{
		endings: _List_fromArray(
			['mäki']),
		from: 'mäeltä',
		in_: 'mäellä',
		offset: 4,
		to: 'mäelle'
	},
		{
		endings: _List_fromArray(
			['tunturi']),
		from: 'lta',
		in_: 'lla',
		offset: 0,
		to: 'lle'
	},
		{
		endings: _List_fromArray(
			['kannelmäki', 'pukinmäki', 'myyrmäki']),
		from: 'estä',
		in_: 'essä',
		offset: 2,
		to: 'keen'
	},
		{
		endings: _List_fromArray(
			['asema']),
		from: 'lta',
		in_: 'lla',
		offset: 0,
		to: 'lle'
	},
		{
		endings: _List_fromArray(
			['otelli']),
		from: 'sta',
		in_: 'ssa',
		offset: 0,
		to: 'in'
	},
		{
		endings: _List_fromArray(
			['hovi']),
		from: 'sta',
		in_: 'ssa',
		offset: 0,
		to: 'in'
	},
		{
		endings: _List_fromArray(
			['selkä']),
		from: 'ältä',
		in_: 'ällä',
		offset: 2,
		to: 'älle'
	},
		{
		endings: _List_fromArray(
			['tti']),
		from: 'ista',
		in_: 'issa',
		offset: 2,
		to: 'tiin'
	},
		{
		endings: _List_fromArray(
			['kki']),
		from: 'ista',
		in_: 'issa',
		offset: 2,
		to: 'kiin'
	},
		{
		endings: _List_fromArray(
			['retti', 'pirtti']),
		from: 'istä',
		in_: 'issä',
		offset: 2,
		to: 'tiin'
	},
		{
		endings: _List_fromArray(
			['Suomu', 'Ruka', 'Tahko', 'Luosto', 'Malmi']),
		from: 'lta',
		in_: 'lla',
		offset: 0,
		to: 'lle'
	},
		{
		endings: _List_fromArray(
			['Levi', 'Pyhä']),
		from: 'ltä',
		in_: 'llä',
		offset: 0,
		to: 'lle'
	},
		{
		endings: _List_fromArray(
			['Kangasala']),
		from: 'alta',
		in_: 'alla',
		offset: 3,
		to: 'alle'
	},
		{
		endings: _List_fromArray(
			['nki Lentoasema']),
		from: 'ngin Lentoasemalta',
		in_: 'ngin Lentoasemalla',
		offset: 14,
		to: 'ngin Lentoasemalle'
	},
		{
		endings: _List_fromArray(
			['Turenki']),
		from: 'gista',
		in_: 'gissa',
		offset: 2,
		to: 'kiin'
	},
		{
		endings: _List_fromArray(
			['lampi']),
		from: 'mista',
		in_: 'missa',
		offset: 2,
		to: 'mille'
	}
	]);
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3(elm$core$String$slice, 0, -n, string);
	});
var author$project$FinnishConjugation$conjugate = function (name) {
	return A2(
		elm$core$Maybe$map,
		function (rule) {
			var base = A2(elm$core$String$dropRight, rule.offset, name);
			return {
				from: _Utils_ap(base, rule.from),
				in_: _Utils_ap(base, rule.in_),
				to: _Utils_ap(base, rule.to)
			};
		},
		A2(author$project$FinnishConjugation$keepBestMatch, name, author$project$FinnishConjugation$ruleset));
};
var author$project$Translations$finnishInessive = function (stationName) {
	var _n0 = author$project$FinnishConjugation$conjugate(stationName);
	if (_n0.$ === 'Just') {
		var in_ = _n0.a.in_;
		return in_;
	} else {
		return '- ' + stationName;
	}
};
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var author$project$Translations$timeDifferenceTranslationSet = function (_n0) {
	var minuteDiff = _n0.minuteDiff;
	var stationName = _n0.stationName;
	var absDiff = elm$core$Basics$abs(minuteDiff);
	var absDiffString = elm$core$String$fromInt(absDiff);
	return (absDiff <= 1) ? {
		english: 'On time in ' + stationName,
		finnish: 'Ajallaan ' + author$project$Translations$finnishInessive(stationName),
		swedish: 'Enligt tidtabell i ' + stationName
	} : ((minuteDiff < 0) ? {
		english: absDiffString + (' min early in ' + stationName),
		finnish: absDiffString + (' min ajoissa ' + author$project$Translations$finnishInessive(stationName)),
		swedish: absDiffString + (' min i förtid i ' + stationName)
	} : {
		english: absDiffString + (' min late in ' + stationName),
		finnish: absDiffString + (' min myöhässä ' + author$project$Translations$finnishInessive(stationName)),
		swedish: absDiffString + (' min sen i ' + stationName)
	});
};
var author$project$Translations$translationSetFor = function (translationKey) {
	switch (translationKey.$) {
		case 'DepPageTitle':
			return {english: 'Trains.today - Helsinki region commuter trains', finnish: 'Trains.today - Helsingin seudun lähijunat', swedish: 'Trains.today - Helsingfors regions närtåg'};
		case 'DepPageHeading':
			return {english: 'Select departure station', finnish: 'Valitse lähtöasema', swedish: 'Välj startstation'};
		case 'DestPageTitle':
			return {english: 'Select destination – Trains.today', finnish: 'Valitse pääteasema – Trains.today', swedish: 'Välj slutstation - Trains.today'};
		case 'DestPageHeading':
			return {english: 'Select destination station', finnish: 'Valitse pääteasema', swedish: 'Välj slutstation'};
		case 'ErrorNetwork':
			return {english: 'No connection, trying again soon...', finnish: 'Ei yhteyttä, yritetään pian uudestaan...', swedish: 'Ingen anslutning, försöker pånytt snart...'};
		case 'ErrorTimeout':
			return {english: 'Network timed out', finnish: 'Vastaus aikakatkaistiin', swedish: 'Svaret tidsavbröts'};
		case 'ErrorBadUrl':
			return {english: 'It\'s not you, it\'s me. I have the server address wrong.', finnish: 'Vika on minussa. Palvelimen osoite on väärä.', swedish: 'Det är mitt fel. Serverns adress är felaktig.'};
		case 'ErrorBadStatus':
			return {english: 'The server didn\'t like the request (bad status).', finnish: 'Palvelin ei tykännyt pyynnöstä (virheellinen status).', swedish: 'Servern tyckte inte om förfrågan (bad request).'};
		case 'ErrorBadPayload':
			return {english: 'Ouch, the server responded with strange contents.', finnish: 'Auts, palvelin vastasi oudolla sisällöllä.', swedish: 'Aj, servern svarade med något konstigt.'};
		case 'SchedulePageLoading':
			return {english: 'Loading', finnish: 'Ladataan', swedish: 'Laddar'};
		case 'SchedulePageJourneyDuration':
			var params = translationKey.a;
			return author$project$Translations$journeyDurationTranslationSet(params);
		case 'SchedulePageArrivesIn':
			return {english: 'Arrives in', finnish: 'Saapumiseen', swedish: 'Ankommer om'};
		case 'SchedulePageDepartsIn':
			return {english: 'Departs in', finnish: 'Lähtöön', swedish: 'Avgår om'};
		case 'SchedulePageTimeDifference':
			var facts = translationKey.a;
			return author$project$Translations$timeDifferenceTranslationSet(facts);
		case 'SchedulePageNotMoving':
			return {english: 'Not moving', finnish: 'Ei vielä liikkeellä', swedish: 'Stillastående'};
		case 'SchedulePageCancelled':
			return {english: 'Cancelled', finnish: 'Peruttu', swedish: 'Inhiberat'};
		case 'SchedulePageEndOfListNote':
			return {english: 'Only direct trains departing in 2 hours are displayed.', finnish: 'Vain suorat 2 tunnin kuluessa lähtevät junat näytetään.', swedish: 'Bara direkta tåg som avgår inom 2 timmar visas.'};
		case 'SettingsPageTitle':
			return {english: 'Settings', finnish: 'Asetukset', swedish: 'Inställningar'};
		case 'SettingsPageHeading':
			return {english: 'Settings', finnish: 'Asetukset', swedish: 'Inställningar'};
		case 'SettingsPageSelectLanguage':
			return {english: 'Select language', finnish: 'Valitse kieli', swedish: 'Välj språk'};
		default:
			return {english: 'Show trains going via the Airport', finnish: 'Näytä Lentoaseman kautta kulkevat junat', swedish: 'Se tåg som går via Flygplatsen'};
	}
};
var author$project$Translations$translate = F2(
	function (language, translationKey) {
		var translationSet = author$project$Translations$translationSetFor(translationKey);
		switch (language.$) {
			case 'Finnish':
				return translationSet.finnish;
			case 'English':
				return translationSet.english;
			default:
				return translationSet.swedish;
		}
	});
var author$project$Translations$ErrorBadPayload = {$: 'ErrorBadPayload'};
var author$project$Translations$ErrorBadStatus = {$: 'ErrorBadStatus'};
var author$project$Translations$ErrorBadUrl = {$: 'ErrorBadUrl'};
var author$project$Translations$ErrorNetwork = {$: 'ErrorNetwork'};
var author$project$Translations$ErrorTimeout = {$: 'ErrorTimeout'};
var author$project$Translations$SchedulePageLoading = {$: 'SchedulePageLoading'};
var author$project$Translations$PageFooter = {$: 'PageFooter'};
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$footer = _VirtualDom_node('footer');
var elm$html$Html$p = _VirtualDom_node('p');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var author$project$Translations$htmlTranslationSetFor = function (key) {
	return {
		english: A2(
			elm$html$Html$footer,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Made with '),
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('pink')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('♥')
								])),
							elm$html$Html$text(' by '),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$href('https://twitter.com/ohanhi')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('@ohanhi')
								])),
							elm$html$Html$text(' – '),
							elm$html$Html$text('Open Source on '),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$href('https://github.com/ohanhi/trains')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('GitHub')
								]))
						])),
					A2(
					elm$html$Html$p,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('small')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Data provided by '),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$href('https://rata.digitraffic.fi/')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Digitraffic')
								]))
						]))
				])),
		finnish: A2(
			elm$html$Html$footer,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Palvelun tehnyt '),
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('pink')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('♥')
								])),
							elm$html$Html$text(' '),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$href('https://twitter.com/ohanhi')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('@ohanhi')
								])),
							elm$html$Html$text(' – '),
							elm$html$Html$text('Avoin lähdekoodi '),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$href('https://github.com/ohanhi/trains')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('GitHubissa')
								]))
						])),
					A2(
					elm$html$Html$p,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('small')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Tiedot tarjoaa '),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$href('https://rata.digitraffic.fi/')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Digitraffic')
								]))
						]))
				])),
		swedish: A2(
			elm$html$Html$footer,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Servicen gjord med '),
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('pink')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('♥')
								])),
							elm$html$Html$text(' av '),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$href('https://twitter.com/ohanhi')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('@ohanhi')
								])),
							elm$html$Html$text(' – '),
							elm$html$Html$text('Öppen källkod på '),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$href('https://github.com/ohanhi/trains')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('GitHub')
								]))
						])),
					A2(
					elm$html$Html$p,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('small')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Data från '),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$href('https://rata.digitraffic.fi/')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Digitraffic')
								]))
						]))
				]))
	};
};
var author$project$Translations$htmlTranslate = F2(
	function (language, key) {
		var translationSet = author$project$Translations$htmlTranslationSetFor(key);
		switch (language.$) {
			case 'Finnish':
				return translationSet.finnish;
			case 'English':
				return translationSet.english;
			default:
				return translationSet.swedish;
		}
	});
var author$project$Translations$allLanguages = _List_fromArray(
	[author$project$Translations$Finnish, author$project$Translations$English, author$project$Translations$Swedish]);
var author$project$View$SetLanguage = function (a) {
	return {$: 'SetLanguage', a: a};
};
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$View$languageSelect = function (currentLanguage) {
	var optionAttrs = function (lang) {
		return _List_fromArray(
			[
				elm$html$Html$Attributes$value(
				author$project$Translations$languageToString(lang)),
				elm$html$Html$Events$onClick(
				author$project$View$SetLanguage(lang)),
				elm$html$Html$Attributes$class(
				_Utils_eq(currentLanguage, lang) ? 'is-current' : '')
			]);
	};
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('language-select')
			]),
		A2(
			elm$core$List$map,
			function (lang) {
				return A2(
					elm$html$Html$button,
					optionAttrs(lang),
					_List_fromArray(
						[
							elm$html$Html$text(
							author$project$Translations$languageToString(lang))
						]));
			},
			author$project$Translations$allLanguages));
};
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$html$Html$header = _VirtualDom_node('header');
var author$project$View$container = F3(
	function (language, headingText, elements) {
		var heading = function () {
			if (headingText.$ === 'Just') {
				var string = headingText.a;
				return _List_fromArray(
					[
						A2(
						elm$html$Html$header,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$h1,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text(string)
									]))
							]))
					]);
			} else {
				return _List_Nil;
			}
		}();
		return _List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('container')
					]),
				A2(
					elm$core$List$cons,
					author$project$View$languageSelect(language),
					_Utils_ap(heading, elements))),
				A2(author$project$Translations$htmlTranslate, language, author$project$Translations$PageFooter)
			]);
	});
var author$project$View$stationName = F2(
	function (stations, shortCode) {
		return A2(
			elm$core$Maybe$withDefault,
			shortCode,
			A2(elm$core$Dict$get, shortCode, stations));
	});
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$path = elm$svg$Svg$trustedNode('path');
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var author$project$Icons$swap = A2(
	elm$svg$Svg$svg,
	_List_fromArray(
		[
			elm$svg$Svg$Attributes$viewBox('0 0 13 13')
		]),
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$path,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$strokeWidth('0.7'),
					elm$svg$Svg$Attributes$strokeLinecap('round'),
					elm$svg$Svg$Attributes$stroke('#babdb6'),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$d('M4 2 v10 M2 4 L4 2 M6 4 L4 2' + 'M8 12 v-10 M6 10 L8 12 M10 10 L8 12')
				]),
			_List_Nil)
		]));
var elm$core$Dict$values = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var elm$core$List$sortBy = _List_sortBy;
var author$project$Model$sortedTrainList = function (trains) {
	return A2(
		elm$core$List$sortBy,
		function (train) {
			return elm$time$Time$posixToMillis(train.homeStationDeparture.scheduledTime);
		},
		elm$core$Dict$values(trains));
};
var author$project$Translations$SchedulePageEndOfListNote = {$: 'SchedulePageEndOfListNote'};
var author$project$Translations$SettingShowTrainsViaAirport = {$: 'SettingShowTrainsViaAirport'};
var author$project$View$SetShowTrainsViaAirport = function (a) {
	return {$: 'SetShowTrainsViaAirport', a: a};
};
var author$project$Translations$SchedulePageArrivesIn = {$: 'SchedulePageArrivesIn'};
var author$project$Translations$SchedulePageCancelled = {$: 'SchedulePageCancelled'};
var author$project$Translations$SchedulePageDepartsIn = {$: 'SchedulePageDepartsIn'};
var author$project$Translations$SchedulePageNotMoving = {$: 'SchedulePageNotMoving'};
var author$project$Translations$SchedulePageTimeDifference = function (a) {
	return {$: 'SchedulePageTimeDifference', a: a};
};
var author$project$View$LiveEstimate = function (a) {
	return {$: 'LiveEstimate', a: a};
};
var author$project$View$ScheduleEstimate = function (a) {
	return {$: 'ScheduleEstimate', a: a};
};
var author$project$Icons$wagon = A2(
	elm$svg$Svg$svg,
	_List_fromArray(
		[
			elm$svg$Svg$Attributes$viewBox('0 0 100 100')
		]),
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$path,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$fill('#ffffff'),
					elm$svg$Svg$Attributes$d('M92.87,52.474c-0.971-0.966-2.138-2.062-3.421-3.198c-2.372-2.102-4.564-3.832-5.942-4.733  c-0.073-0.051-0.151-0.097-0.229-0.146c-0.08-0.05-0.156-0.096-0.229-0.14c-0.056-0.032-0.108-0.065-0.165-0.096  c-0.15-0.085-0.282-0.151-0.396-0.199c-1.219-0.58-2.704-0.925-4.312-0.926h-0.002c-0.002,0-0.005-0.001-0.007-0.001  s-0.005,0.001-0.007,0.001H66.84c-0.106-0.202-0.291-0.386-0.545-0.535l3.897-0.669c0.119-0.02,0.215-0.087,0.275-0.176  c0.012-0.017,0.019-0.036,0.027-0.055c0.012-0.025,0.025-0.051,0.032-0.08c0.002-0.006,0.006-0.01,0.007-0.015  c0.003-0.021-0.003-0.04-0.003-0.062c0-0.02,0.006-0.039,0.003-0.061c-0.001-0.006-0.005-0.01-0.007-0.016  c-0.007-0.027-0.021-0.053-0.032-0.079c-0.009-0.019-0.016-0.038-0.027-0.055c-0.061-0.089-0.156-0.156-0.275-0.177l-6.618-1.135  c-0.226-0.038-0.436,0.1-0.472,0.309s0.117,0.41,0.341,0.448l4.462,0.765l-3.846,0.66c-0.882,0.098-1.58,0.461-1.823,0.931H46.224  H42.36H18.403c-0.002,0-0.003-0.001-0.005-0.001s-0.003,0.001-0.006,0.001h-0.001c-1.249,0.001-2.403,0.346-3.35,0.926  c-0.089,0.048-0.191,0.114-0.309,0.199c-0.044,0.03-0.085,0.063-0.127,0.096c-0.013,0.009-0.026,0.021-0.039,0.03  c-1.065,0.736-2.489,1.979-3.951,3.493c-2.066,2.14-3.59,4.183-3.944,5.203c-0.145,0.32-0.235,0.684-0.235,1.08  c0,0.718,0.273,1.35,0.688,1.749l0.003,0.003c0.021,0.021,0.041,0.047,0.063,0.066l1.623,1.679l0.002-0.003  c0.015,0.015,0.028,0.028,0.044,0.04c0.081,0.072,0.178,0.115,0.283,0.115h1.724h1.23h29.812h4.665h39.704h1.584h2.217  c0.136,0,0.261-0.043,0.364-0.115c0.021-0.012,0.039-0.025,0.058-0.04l0.001,0.003l2.09-1.679c0.029-0.02,0.054-0.045,0.081-0.066  l0.005-0.003c0.534-0.399,0.885-1.031,0.885-1.749C93.562,53.436,93.294,52.873,92.87,52.474z M15.746,48.17h-2.821l2.821-2.533  V48.17z M24.614,48.17h-6.507v-2.533h6.507V48.17z M46.142,48.17H33.934v-2.533h12.208V48.17z M60.673,48.17H48.465v-2.533h12.208  V48.17z M68.849,48.17v-2.533h6.508l2.283,2.533H68.849z M81.315,49.726l-3.608-4.069h4.761l4.991,4.069H81.315z')
				]),
			_List_Nil)
		]));
var author$project$Translations$SchedulePageJourneyDuration = function (a) {
	return {$: 'SchedulePageJourneyDuration', a: a};
};
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var elm$core$String$fromFloat = _String_fromNumber;
var elm$html$Html$strong = _VirtualDom_node('strong');
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var author$project$View$metaDataRow = F3(
	function (t, data, current) {
		var wagonCount = function (count) {
			return A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('train-wagon-count')
					]),
				A2(elm$core$List$repeat, count, author$project$Icons$wagon));
		}(
			A2(
				elm$core$Maybe$withDefault,
				0,
				A2(elm$core$Dict$get, current.trainNumber, data.wagonCounts)));
		var _n0 = function (list) {
			return _Utils_Tuple2(
				A2(
					elm$core$Maybe$withDefault,
					current,
					elm$core$List$head(list)),
				A2(
					elm$core$Maybe$withDefault,
					current,
					elm$core$List$head(
						elm$core$List$reverse(list))));
		}(
			A2(
				elm$core$List$sortBy,
				function ($) {
					return $.durationMinutes;
				},
				data.allTrains));
		var fastest = _n0.a;
		var slowest = _n0.b;
		var referenceClass = ((current.durationMinutes - fastest.durationMinutes) < 4) ? 'is-fast' : 'is-slower';
		var relativeWidth = function (n) {
			return A2(
				elm$html$Html$Attributes$style,
				'flex-basis',
				elm$core$String$fromFloat((n / slowest.durationMinutes) * 100) + '%');
		};
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('duration'),
					elm$html$Html$Attributes$class(referenceClass)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('duration-text')
						]),
					function (key) {
						return _List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('duration-text-content')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$strong,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text(current.lineId + ' · ')
											])),
										elm$html$Html$text(
										t(key))
									])),
								wagonCount
							]);
					}(
						author$project$Translations$SchedulePageJourneyDuration(
							{durationMinutes: current.durationMinutes, fastestName: fastest.lineId, slowerBy: current.durationMinutes - fastest.durationMinutes}))),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('duration-bar')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('duration-bar-reference'),
									relativeWidth(fastest.durationMinutes)
								]),
							_List_Nil),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('duration-bar-diff'),
									relativeWidth(current.durationMinutes - fastest.durationMinutes)
								]),
							_List_Nil)
						]))
				]));
	});
var author$project$View$minutesToMillis = function (minutes) {
	return minutes * 60000;
};
var ryannhg$date_format$DateFormat$MinuteNumber = {$: 'MinuteNumber'};
var ryannhg$date_format$DateFormat$minuteNumber = ryannhg$date_format$DateFormat$MinuteNumber;
var ryannhg$date_format$DateFormat$SecondFixed = {$: 'SecondFixed'};
var ryannhg$date_format$DateFormat$secondFixed = ryannhg$date_format$DateFormat$SecondFixed;
var author$project$View$prettyMinutes = function (posix) {
	var formatted = A3(
		ryannhg$date_format$DateFormat$format,
		_List_fromArray(
			[
				ryannhg$date_format$DateFormat$minuteNumber,
				ryannhg$date_format$DateFormat$text(':'),
				ryannhg$date_format$DateFormat$secondFixed
			]),
		elm$time$Time$utc,
		posix);
	return formatted;
};
var ryannhg$date_format$DateFormat$HourMilitaryNumber = {$: 'HourMilitaryNumber'};
var ryannhg$date_format$DateFormat$hourMilitaryNumber = ryannhg$date_format$DateFormat$HourMilitaryNumber;
var ryannhg$date_format$DateFormat$MinuteFixed = {$: 'MinuteFixed'};
var ryannhg$date_format$DateFormat$minuteFixed = ryannhg$date_format$DateFormat$MinuteFixed;
var author$project$View$prettyTime = ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			ryannhg$date_format$DateFormat$hourMilitaryNumber,
			ryannhg$date_format$DateFormat$text('.'),
			ryannhg$date_format$DateFormat$minuteFixed
		]));
var author$project$View$timelinessColor = function (difference) {
	return (elm$core$Basics$abs(difference) <= 1) ? 'on-time' : ((elm$core$Basics$abs(difference) <= 5) ? 'slightly-off-schedule' : 'off-schedule');
};
var author$project$View$stationRow = F3(
	function (zone, stations, station) {
		var name = A2(author$project$View$stationName, stations, station.stationShortCode);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('train-stations-row')
				]),
			_List_fromArray(
				[
					function () {
					var _n0 = _Utils_Tuple2(station.liveEstimateTime, station.differenceInMinutes);
					if ((_n0.a.$ === 'Just') && (_n0.b.$ === 'Just')) {
						var estimate = _n0.a.a;
						var n = _n0.b.a;
						return A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('train-stations-estimate')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('train-stations-estimate-time'),
											elm$html$Html$Attributes$class(
											'is-' + author$project$View$timelinessColor(n))
										]),
									_List_fromArray(
										[
											elm$html$Html$text(
											A2(author$project$View$prettyTime, zone, estimate))
										])),
									n ? A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('train-stations-scheduled-inaccurate')
										]),
									_List_fromArray(
										[
											elm$html$Html$text(
											A2(author$project$View$prettyTime, zone, station.scheduledTime))
										])) : elm$html$Html$text('')
								]));
					} else {
						return A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('train-stations-estimate')
								]),
							_List_fromArray(
								[
									elm$html$Html$text(
									A2(author$project$View$prettyTime, zone, station.scheduledTime))
								]));
					}
				}(),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('train-stations-name')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(name)
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('train-stations-track')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(
							A2(elm$core$Maybe$withDefault, '', station.track))
						]))
				]));
	});
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var author$project$View$trainRow = F3(
	function (t, data, train) {
		var tText = A2(elm$core$Basics$composeR, t, elm$html$Html$text);
		var statusInfoBadge = function () {
			var _n4 = _Utils_Tuple2(train.cancelled, train.currentStation);
			if (!_n4.a) {
				if (_n4.b.$ === 'Just') {
					var station = _n4.b.a;
					return A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('train-status-badge'),
								elm$html$Html$Attributes$class(
								'is-' + author$project$View$timelinessColor(station.differenceInMinutes))
							]),
						_List_fromArray(
							[
								tText(
								author$project$Translations$SchedulePageTimeDifference(
									{
										minuteDiff: station.differenceInMinutes,
										stationName: A2(author$project$View$stationName, data.stations, station.stationShortCode)
									}))
							]));
				} else {
					var _n5 = _n4.b;
					return A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('train-status-badge')
							]),
						_List_fromArray(
							[
								tText(author$project$Translations$SchedulePageNotMoving)
							]));
				}
			} else {
				return A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('train-status-badge is-cancelled')
						]),
					_List_fromArray(
						[
							tText(author$project$Translations$SchedulePageCancelled)
						]));
			}
		}();
		var prettyDiff = function (date) {
			return function (millis) {
				return (_Utils_cmp(
					millis,
					author$project$View$minutesToMillis(30)) < 0) ? elm$core$Maybe$Just(
					author$project$View$prettyMinutes(
						elm$time$Time$millisToPosix(millis))) : elm$core$Maybe$Nothing;
			}(
				A2(
					elm$core$Basics$max,
					0,
					elm$time$Time$posixToMillis(date) - elm$time$Time$posixToMillis(data.currentTime)));
		};
		var prettyBestEstimateFor = function (timetableRow) {
			var _n3 = timetableRow.liveEstimateTime;
			if (_n3.$ === 'Just') {
				var estimate = _n3.a;
				return A2(
					elm$core$Maybe$map,
					author$project$View$LiveEstimate,
					prettyDiff(estimate));
			} else {
				return A2(
					elm$core$Maybe$map,
					author$project$View$ScheduleEstimate,
					prettyDiff(timetableRow.scheduledTime));
			}
		};
		var homeStationDepartingIn = prettyBestEstimateFor(train.homeStationDeparture);
		var homeStationArrivingIn = A2(elm$core$Maybe$andThen, prettyBestEstimateFor, train.homeStationArrival);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('train'),
					elm$html$Html$Attributes$id(
					'train-' + elm$core$String$fromInt(train.trainNumber))
				]),
			_List_fromArray(
				[
					A3(author$project$View$metaDataRow, t, data, train),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('train-content')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('train-stations')
								]),
							_List_fromArray(
								[
									A3(author$project$View$stationRow, data.zone, data.stations, train.homeStationDeparture),
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('train-stations-row')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$div,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('train-stations-separator')
												]),
											_List_fromArray(
												[
													elm$html$Html$text('︙')
												]))
										])),
									A3(author$project$View$stationRow, data.zone, data.stations, train.endStationArrival)
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('train-status')
								]),
							function () {
								var _n0 = _Utils_Tuple3(train.cancelled, homeStationArrivingIn, homeStationDepartingIn);
								_n0$2:
								while (true) {
									if (!_n0.a) {
										if (_n0.b.$ === 'Just') {
											var estimate = _n0.b.a;
											return _List_fromArray(
												[
													A2(
													elm$html$Html$div,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('train-status-arriving')
														]),
													_List_fromArray(
														[
															tText(author$project$Translations$SchedulePageArrivesIn)
														])),
													A2(
													elm$html$Html$div,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('train-status-time')
														]),
													_List_fromArray(
														[
															function () {
															if (estimate.$ === 'LiveEstimate') {
																var time = estimate.a;
																return elm$html$Html$text(time);
															} else {
																var time = estimate.a;
																return elm$html$Html$text('~' + time);
															}
														}()
														]))
												]);
										} else {
											if (_n0.c.$ === 'Just') {
												var estimate = _n0.c.a;
												return _List_fromArray(
													[
														A2(
														elm$html$Html$div,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('train-status-arriving')
															]),
														_List_fromArray(
															[
																tText(author$project$Translations$SchedulePageDepartsIn)
															])),
														A2(
														elm$html$Html$div,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('train-status-time')
															]),
														_List_fromArray(
															[
																function () {
																if (estimate.$ === 'LiveEstimate') {
																	var time = estimate.a;
																	return elm$html$Html$text(time);
																} else {
																	var time = estimate.a;
																	return elm$html$Html$text('~' + time);
																}
															}()
															]))
													]);
											} else {
												break _n0$2;
											}
										}
									} else {
										break _n0$2;
									}
								}
								return _List_Nil;
							}())
						])),
					statusInfoBadge
				]));
	});
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$label = _VirtualDom_node('label');
var elm$html$Html$main_ = _VirtualDom_node('main');
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$checked = elm$html$Html$Attributes$boolProperty('checked');
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetChecked = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'checked']),
	elm$json$Json$Decode$bool);
var elm$html$Html$Events$onCheck = function (tagger) {
	return A2(
		elm$html$Html$Events$on,
		'change',
		A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetChecked));
};
var author$project$View$trainsView = F5(
	function (t, model, _n0, heading, trainsDict) {
		var from = _n0.a;
		var to = _n0.b;
		var trains = A2(
			elm$core$List$filter,
			function (train) {
				return model.showTrainsViaAirport || (!train.viaAirport);
			},
			author$project$Model$sortedTrainList(trainsDict));
		var trainRowData = {allTrains: trains, currentTime: model.currentTime, from: from, stations: model.stations, to: to, wagonCounts: model.wagonCounts, zone: model.zone};
		var scheduleSettings = A2(
			elm$core$List$any,
			function ($) {
				return $.viaAirport;
			},
			author$project$Model$sortedTrainList(trainsDict)) ? A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('schedule-settings')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$label,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$input,
							_List_fromArray(
								[
									elm$html$Html$Attributes$type_('checkbox'),
									elm$html$Html$Attributes$checked(model.showTrainsViaAirport),
									elm$html$Html$Events$onCheck(author$project$View$SetShowTrainsViaAirport)
								]),
							_List_Nil),
							elm$html$Html$text(
							t(author$project$Translations$SettingShowTrainsViaAirport))
						]))
				])) : elm$html$Html$text('');
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('trains')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$header,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('back-link'),
									elm$html$Html$Attributes$href('#/')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('‹')
								])),
							A2(
							elm$html$Html$h1,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(heading)
								])),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('swap-link'),
									elm$html$Html$Attributes$href('#/' + (to + ('/' + from)))
								]),
							_List_fromArray(
								[author$project$Icons$swap]))
						])),
					A2(
					elm$html$Html$main_,
					_List_Nil,
					A2(
						elm$core$List$map,
						A2(author$project$View$trainRow, t, trainRowData),
						trains)),
					scheduleSettings,
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('trains-end-of-list')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(
							t(author$project$Translations$SchedulePageEndOfListNote))
						]))
				]));
	});
var author$project$View$schedulePage = F3(
	function (t, model, _n0) {
		var from = _n0.a;
		var to = _n0.b;
		var tText = A2(elm$core$Basics$composeL, elm$html$Html$text, t);
		var heading = A2(author$project$View$stationName, model.stations, from) + ('—' + A2(author$project$View$stationName, model.stations, to));
		return {
			body: A3(
				author$project$View$container,
				model.language,
				elm$core$Maybe$Nothing,
				_List_fromArray(
					[
						function () {
						var _n1 = model.trains;
						switch (_n1.$) {
							case 'Success':
								var trains = _n1.a;
								return A5(
									author$project$View$trainsView,
									t,
									model,
									_Utils_Tuple2(from, to),
									heading,
									trains);
							case 'Failure':
								var err = _n1.a;
								return A2(
									elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											function () {
											switch (err.$) {
												case 'NetworkError':
													return tText(author$project$Translations$ErrorNetwork);
												case 'Timeout':
													return tText(author$project$Translations$ErrorTimeout);
												case 'BadUrl':
													var url = err.a;
													return tText(author$project$Translations$ErrorBadUrl);
												case 'BadStatus':
													var status = err.a;
													return tText(author$project$Translations$ErrorBadStatus);
												default:
													return tText(author$project$Translations$ErrorBadPayload);
											}
										}()
										]));
							case 'Loading':
								return A2(
									elm$html$Html$header,
									_List_Nil,
									_List_fromArray(
										[
											tText(author$project$Translations$SchedulePageLoading)
										]));
							default:
								return elm$html$Html$text('');
						}
					}()
					])),
			title: heading + ' – Trains.today'
		};
	});
var author$project$Stations$common = _List_fromArray(
	[
		A2(elm$core$Tuple$pair, 'HKI', 'Helsinki'),
		A2(elm$core$Tuple$pair, 'PSL', 'Pasila')
	]);
var author$project$Stations$directionLahti = _List_fromArray(
	[
		A2(elm$core$Tuple$pair, 'KÄP', 'Käpylä'),
		A2(elm$core$Tuple$pair, 'OLK', 'Oulunkylä'),
		A2(elm$core$Tuple$pair, 'PMK', 'Pukinmäki'),
		A2(elm$core$Tuple$pair, 'ML', 'Malmi'),
		A2(elm$core$Tuple$pair, 'TNA', 'Tapanila'),
		A2(elm$core$Tuple$pair, 'PLA', 'Puistola'),
		A2(elm$core$Tuple$pair, 'TKL', 'Tikkurila'),
		A2(elm$core$Tuple$pair, 'HKH', 'Hiekkaharju'),
		A2(elm$core$Tuple$pair, 'KVY', 'Koivukylä'),
		A2(elm$core$Tuple$pair, 'RKL', 'Rekola'),
		A2(elm$core$Tuple$pair, 'KRS', 'Korso'),
		A2(elm$core$Tuple$pair, 'SAV', 'Savio'),
		A2(elm$core$Tuple$pair, 'KE', 'Kerava'),
		A2(elm$core$Tuple$pair, 'HAA', 'Haarajoki'),
		A2(elm$core$Tuple$pair, 'MLÄ', 'Mäntsälä'),
		A2(elm$core$Tuple$pair, 'HNN', 'Henna'),
		A2(elm$core$Tuple$pair, 'LH', 'Lahti')
	]);
var author$project$Stations$directionSiuntio = _List_fromArray(
	[
		A2(elm$core$Tuple$pair, 'ILA', 'Ilmala'),
		A2(elm$core$Tuple$pair, 'HPL', 'Huopalahti'),
		A2(elm$core$Tuple$pair, 'VMO', 'Valimo'),
		A2(elm$core$Tuple$pair, 'PJM', 'Pitäjänmäki'),
		A2(elm$core$Tuple$pair, 'MÄK', 'Mäkkylä'),
		A2(elm$core$Tuple$pair, 'LPV', 'Leppävaara'),
		A2(elm$core$Tuple$pair, 'KIL', 'Kilo'),
		A2(elm$core$Tuple$pair, 'KEA', 'Kera'),
		A2(elm$core$Tuple$pair, 'KNI', 'Kauniainen'),
		A2(elm$core$Tuple$pair, 'KVH', 'Koivuhovi'),
		A2(elm$core$Tuple$pair, 'TRL', 'Tuomarila'),
		A2(elm$core$Tuple$pair, 'EPO', 'Espoo'),
		A2(elm$core$Tuple$pair, 'KLH', 'Kauklahti'),
		A2(elm$core$Tuple$pair, 'MAS', 'Masala'),
		A2(elm$core$Tuple$pair, 'JRS', 'Jorvas'),
		A2(elm$core$Tuple$pair, 'TOL', 'Tolsa'),
		A2(elm$core$Tuple$pair, 'KKN', 'Kirkkonummi'),
		A2(elm$core$Tuple$pair, 'STI', 'Siuntio')
	]);
var author$project$Stations$directionTampere = _List_fromArray(
	[
		A2(elm$core$Tuple$pair, 'KÄP', 'Käpylä'),
		A2(elm$core$Tuple$pair, 'OLK', 'Oulunkylä'),
		A2(elm$core$Tuple$pair, 'PMK', 'Pukinmäki'),
		A2(elm$core$Tuple$pair, 'ML', 'Malmi'),
		A2(elm$core$Tuple$pair, 'TNA', 'Tapanila'),
		A2(elm$core$Tuple$pair, 'PLA', 'Puistola'),
		A2(elm$core$Tuple$pair, 'TKL', 'Tikkurila'),
		A2(elm$core$Tuple$pair, 'HKH', 'Hiekkaharju'),
		A2(elm$core$Tuple$pair, 'KVY', 'Koivukylä'),
		A2(elm$core$Tuple$pair, 'RKL', 'Rekola'),
		A2(elm$core$Tuple$pair, 'KRS', 'Korso'),
		A2(elm$core$Tuple$pair, 'SAV', 'Savio'),
		A2(elm$core$Tuple$pair, 'KE', 'Kerava'),
		A2(elm$core$Tuple$pair, 'AIN', 'Ainola'),
		A2(elm$core$Tuple$pair, 'JP', 'Järvenpää'),
		A2(elm$core$Tuple$pair, 'SAU', 'Saunakallio'),
		A2(elm$core$Tuple$pair, 'JK', 'Jokela'),
		A2(elm$core$Tuple$pair, 'HY', 'Hyvinkää'),
		A2(elm$core$Tuple$pair, 'RI', 'Riihimäki'),
		A2(elm$core$Tuple$pair, 'RY', 'Ryttylä'),
		A2(elm$core$Tuple$pair, 'TU', 'Turenki'),
		A2(elm$core$Tuple$pair, 'HL', 'Hämeenlinna'),
		A2(elm$core$Tuple$pair, 'PRL', 'Parola'),
		A2(elm$core$Tuple$pair, 'ITA', 'Iittala'),
		A2(elm$core$Tuple$pair, 'TL', 'Toijala'),
		A2(elm$core$Tuple$pair, 'VIA', 'Viiala'),
		A2(elm$core$Tuple$pair, 'LPÄ', 'Lempäälä'),
		A2(elm$core$Tuple$pair, 'TPE', 'Tampere')
	]);
var author$project$Stations$ringTrackCW = _List_fromArray(
	[
		A2(elm$core$Tuple$pair, 'ILA', 'Ilmala'),
		A2(elm$core$Tuple$pair, 'HPL', 'Huopalahti'),
		A2(elm$core$Tuple$pair, 'POH', 'Pohjois-Haaga'),
		A2(elm$core$Tuple$pair, 'KAN', 'Kannelmäki'),
		A2(elm$core$Tuple$pair, 'MLO', 'Malminkartano'),
		A2(elm$core$Tuple$pair, 'MYR', 'Myyrmäki'),
		A2(elm$core$Tuple$pair, 'LOH', 'Louhela'),
		A2(elm$core$Tuple$pair, 'MRL', 'Martinlaakso'),
		A2(elm$core$Tuple$pair, 'VKS', 'Vantaankoski'),
		A2(elm$core$Tuple$pair, 'VEH', 'Vehkala'),
		A2(elm$core$Tuple$pair, 'KTÖ', 'Kivistö'),
		A2(elm$core$Tuple$pair, 'AVP', 'Aviapolis'),
		A2(elm$core$Tuple$pair, 'LEN', 'Lentoasema (Airport)'),
		A2(elm$core$Tuple$pair, 'LNÄ', 'Leinelä'),
		A2(elm$core$Tuple$pair, 'HKH', 'Hiekkaharju'),
		A2(elm$core$Tuple$pair, 'TKL', 'Tikkurila'),
		A2(elm$core$Tuple$pair, 'PLA', 'Puistola'),
		A2(elm$core$Tuple$pair, 'TNA', 'Tapanila'),
		A2(elm$core$Tuple$pair, 'ML', 'Malmi'),
		A2(elm$core$Tuple$pair, 'PMK', 'Pukinmäki'),
		A2(elm$core$Tuple$pair, 'OLK', 'Oulunkylä'),
		A2(elm$core$Tuple$pair, 'KÄP', 'Käpylä')
	]);
var author$project$Stations$commuterStations = _List_fromArray(
	[
		_Utils_ap(author$project$Stations$common, author$project$Stations$directionSiuntio),
		_Utils_ap(author$project$Stations$common, author$project$Stations$ringTrackCW),
		_Utils_ap(author$project$Stations$common, author$project$Stations$directionTampere),
		_Utils_ap(author$project$Stations$common, author$project$Stations$directionLahti)
	]);
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var author$project$Stations$all = A2(
	elm$core$List$sortBy,
	elm$core$Tuple$second,
	elm$core$Dict$toList(
		elm$core$Dict$fromList(
			elm$core$List$concat(author$project$Stations$commuterStations))));
var author$project$Translations$DepPageHeading = {$: 'DepPageHeading'};
var author$project$Translations$DepPageTitle = {$: 'DepPageTitle'};
var elm$html$Html$li = _VirtualDom_node('li');
var elm$html$Html$ul = _VirtualDom_node('ul');
var author$project$View$selectDepPage = F2(
	function (t, model) {
		return {
			body: A3(
				author$project$View$container,
				model.language,
				elm$core$Maybe$Just(
					t(author$project$Translations$DepPageHeading)),
				_List_fromArray(
					[
						A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('stations')
							]),
						A2(
							elm$core$List$map,
							function (_n0) {
								var abbr = _n0.a;
								var name = _n0.b;
								return A2(
									elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											elm$html$Html$a,
											_List_fromArray(
												[
													elm$html$Html$Attributes$href('#/' + abbr)
												]),
											_List_fromArray(
												[
													elm$html$Html$text(name)
												]))
										]));
							},
							author$project$Stations$all))
					])),
			title: t(author$project$Translations$DepPageTitle)
		};
	});
var author$project$Stations$findName = function (abbreviation) {
	return A2(
		elm$core$Dict$get,
		abbreviation,
		elm$core$Dict$fromList(
			elm$core$List$concat(author$project$Stations$commuterStations)));
};
var author$project$Stations$matching = function (abbreviation) {
	return A2(
		elm$core$List$sortBy,
		elm$core$Tuple$second,
		elm$core$Dict$toList(
			A2(
				elm$core$Dict$remove,
				abbreviation,
				elm$core$Dict$fromList(
					elm$core$List$concat(
						A2(
							elm$core$List$filter,
							function (track) {
								return A2(
									elm$core$Maybe$withDefault,
									false,
									A2(
										elm$core$Maybe$map,
										function (_n1) {
											return true;
										},
										elm$core$List$head(
											A2(
												elm$core$List$filter,
												function (_n0) {
													var abbr = _n0.a;
													var name = _n0.b;
													return _Utils_eq(abbreviation, abbr);
												},
												track))));
							},
							author$project$Stations$commuterStations))))));
};
var author$project$Translations$DestPageHeading = {$: 'DestPageHeading'};
var author$project$Translations$DestPageTitle = {$: 'DestPageTitle'};
var author$project$View$selectDestPage = F3(
	function (t, model, dep) {
		var url = function (dest) {
			return '#/' + (dep + ('/' + dest));
		};
		var linkText = function (dest) {
			return A2(
				elm$core$Maybe$withDefault,
				dest,
				A2(
					elm$core$Maybe$map,
					function (name) {
						return name + ('–' + dest);
					},
					author$project$Stations$findName(dep)));
		};
		return {
			body: A3(
				author$project$View$container,
				model.language,
				elm$core$Maybe$Just(
					t(author$project$Translations$DestPageHeading)),
				_List_fromArray(
					[
						A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('stations')
							]),
						A2(
							elm$core$List$map,
							function (_n0) {
								var abbr = _n0.a;
								var name = _n0.b;
								return A2(
									elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											elm$html$Html$a,
											_List_fromArray(
												[
													elm$html$Html$Attributes$href(
													url(abbr))
												]),
											_List_fromArray(
												[
													elm$html$Html$text(
													linkText(name))
												]))
										]));
							},
							author$project$Stations$matching(dep)))
					])),
			title: t(author$project$Translations$DestPageTitle)
		};
	});
var author$project$View$view = function (model) {
	var t = author$project$Translations$translate(model.language);
	var _n0 = model.route;
	switch (_n0.$) {
		case 'SelectDepRoute':
			return A2(author$project$View$selectDepPage, t, model);
		case 'SelectDestRoute':
			var dep = _n0.a;
			return A3(author$project$View$selectDestPage, t, model, dep);
		default:
			var from = _n0.a;
			var to = _n0.b;
			return A3(
				author$project$View$schedulePage,
				t,
				model,
				_Utils_Tuple2(from, to));
	}
};
var elm$browser$Browser$application = _Browser_application;
var author$project$Main$main = elm$browser$Browser$application(
	{init: author$project$Main$init, onUrlChange: author$project$View$UrlChange, onUrlRequest: author$project$View$LinkClicked, subscriptions: author$project$Main$subscriptions, update: author$project$Main$update, view: author$project$View$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	A2(
		elm$json$Json$Decode$andThen,
		function (timestamp) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (storedState) {
					return elm$json$Json$Decode$succeed(
						{storedState: storedState, timestamp: timestamp});
				},
				A2(elm$json$Json$Decode$field, 'storedState', elm$json$Json$Decode$string));
		},
		A2(elm$json$Json$Decode$field, 'timestamp', elm$json$Json$Decode$int)))(0)}});}(this));