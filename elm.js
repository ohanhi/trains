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

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
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

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
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
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
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

	if (typeof File !== 'undefined' && value instanceof File)
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
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
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
	if (region.be.as === region.bD.as)
	{
		return 'on line ' + region.be.as;
	}
	return 'on lines ' + region.be.as + ' through ' + region.bD.as;
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
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
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

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
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
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


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



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


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
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
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



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
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
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




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



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
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
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
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
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
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
				? $elm$core$Result$Ok(decoder.c)
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
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

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
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

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
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
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

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

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
		impl.c8,
		impl.dV,
		impl.dJ,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

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
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


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
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
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
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

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
		u: converter,
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
	var converter = _Platform_effectManagers[name].u;

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

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

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


function _Platform_export(exports)
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


function _Platform_export_UNUSED(exports)
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

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
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
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
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
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
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
		T: func(record.T),
		bf: record.bf,
		a3: record.a3
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
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
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

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.T;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.bf;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.a3) && event.preventDefault(),
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
		impl.c8,
		impl.dV,
		impl.dJ,
		function(sendToApp, initialModel) {
			var view = impl.dW;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
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
		impl.c8,
		impl.dV,
		impl.dJ,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.a6 && impl.a6(sendToApp)
			var view = impl.dW;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.aC);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.aP) && (_VirtualDom_doc.title = title = doc.aP);
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
	var onUrlChange = impl.dq;
	var onUrlRequest = impl.dr;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		a6: function(sendToApp)
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
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.cb === next.cb
							&& curr.bP === next.bP
							&& curr.b7.a === next.b7.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		c8: function(flags)
		{
			return A3(impl.c8, flags, _Browser_getUrl(), key);
		},
		dW: impl.dW,
		dV: impl.dV,
		dJ: impl.dJ
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
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
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { c5: 'hidden', cT: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { c5: 'mozHidden', cT: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { c5: 'msHidden', cT: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { c5: 'webkitHidden', cT: 'webkitvisibilitychange' }
		: { c5: 'hidden', cT: 'visibilitychange' };
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
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
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
		ck: _Browser_getScene(),
		cD: {
			cH: _Browser_window.pageXOffset,
			cI: _Browser_window.pageYOffset,
			cG: _Browser_doc.documentElement.clientWidth,
			bN: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		cG: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		bN: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			ck: {
				cG: node.scrollWidth,
				bN: node.scrollHeight
			},
			cD: {
				cH: node.scrollLeft,
				cI: node.scrollTop,
				cG: node.clientWidth,
				bN: node.clientHeight
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
			ck: _Browser_getScene(),
			cD: {
				cH: x,
				cI: y,
				cG: _Browser_doc.documentElement.clientWidth,
				bN: _Browser_doc.documentElement.clientHeight
			},
			cZ: {
				cH: x + rect.left,
				cI: y + rect.top,
				cG: rect.width,
				bN: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
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



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.aS.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.aS.b, xhr)); });
		$elm$core$Maybe$isJust(request.cz) && _Http_track(router, xhr, request.cz.a);

		try {
			xhr.open(request.dc, request.bn, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.bn));
		}

		_Http_configureRequest(xhr, request);

		request.aC.a && xhr.setRequestHeader('Content-Type', request.aC.a);
		xhr.send(request.aC.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.bM; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.dN.a || 0;
	xhr.responseType = request.aS.d;
	xhr.withCredentials = request.cN;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		bn: xhr.responseURL,
		dH: xhr.status,
		dI: xhr.statusText,
		bM: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
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
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			dE: event.loaded,
			co: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			dx: event.loaded,
			co: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
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
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
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
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}var $author$project$View$LinkClicked = function (a) {
	return {$: 6, a: a};
};
var $author$project$View$UrlChange = function (a) {
	return {$: 5, a: a};
};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
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
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
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
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
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
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
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
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.q) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.t),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.t);
		} else {
			var treeLen = builder.q * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.u) : builder.u;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.q);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.t) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.t);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{u: nodeList, q: (len / $elm$core$Array$branchFactor) | 0, t: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
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
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {bI: fragment, bP: host, du: path, b7: port_, cb: protocol, cc: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
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
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
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
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $krisajenkins$remotedata$RemoteData$NotAsked = {$: 0};
var $author$project$Model$SelectDepRoute = {$: 0};
var $author$project$View$TimeZoneResponse = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Translations$Finnish = 0;
var $author$project$Model$defaultStoredState = {a$: 0, a7: false};
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Translations$English = 1;
var $author$project$Translations$Swedish = 2;
var $author$project$Translations$stringToLanguage = function (string) {
	switch (string) {
		case 'EN':
			return $elm$core$Maybe$Just(1);
		case 'FI':
			return $elm$core$Maybe$Just(0);
		case 'SV':
			return $elm$core$Maybe$Just(2);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Model$languageDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (s) {
		var _v0 = $author$project$Translations$stringToLanguage(s);
		if (!_v0.$) {
			var lang = _v0.a;
			return $elm$json$Json$Decode$succeed(lang);
		} else {
			return $elm$json$Json$Decode$fail('invalid language');
		}
	},
	$elm$json$Json$Decode$string);
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $author$project$Model$storedStateDecoderV1 = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'language',
	$author$project$Model$languageDecoder,
	$elm$json$Json$Decode$succeed(
		function (lang) {
			return _Utils_update(
				$author$project$Model$defaultStoredState,
				{a$: lang});
		}));
var $author$project$Model$StoredState = F2(
	function (language, showTrainsViaAirport) {
		return {a$: language, a7: showTrainsViaAirport};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$Model$storedStateDecoderV2 = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'showTrainsViaAirport',
	$elm$json$Json$Decode$bool,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'language',
		$author$project$Model$languageDecoder,
		$elm$json$Json$Decode$succeed($author$project$Model$StoredState)));
var $author$project$Model$storedStateDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (version) {
		if (version === 2) {
			return $author$project$Model$storedStateDecoderV2;
		} else {
			return $author$project$Model$storedStateDecoderV1;
		}
	},
	A2($elm$json$Json$Decode$field, 'version', $elm$json$Json$Decode$int));
var $author$project$Model$decodeStoredState = $elm$json$Json$Decode$decodeString($author$project$Model$storedStateDecoder);
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $author$project$View$StationsResponse = function (a) {
	return {$: 3, a: a};
};
var $elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Header;
var $ohanhi$remotedata_http$RemoteData$Http$acceptJson = A2($elm$http$Http$header, 'Accept', 'application/json');
var $ohanhi$remotedata_http$RemoteData$Http$defaultConfig = {
	bM: _List_fromArray(
		[$ohanhi$remotedata_http$RemoteData$Http$acceptJson]),
	ah: false,
	dN: $elm$core$Maybe$Nothing,
	cz: $elm$core$Maybe$Nothing
};
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 2};
var $elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$Timeout_ = {$: 1};
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
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
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 4, a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$NetworkError = {$: 2};
var $elm$http$Http$Timeout = {$: 1};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 0:
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 1:
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 2:
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 3:
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.dH));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $krisajenkins$remotedata$RemoteData$Failure = function (a) {
	return {$: 2, a: a};
};
var $krisajenkins$remotedata$RemoteData$Success = function (a) {
	return {$: 3, a: a};
};
var $krisajenkins$remotedata$RemoteData$fromResult = function (result) {
	if (result.$ === 1) {
		var e = result.a;
		return $krisajenkins$remotedata$RemoteData$Failure(e);
	} else {
		var x = result.a;
		return $krisajenkins$remotedata$RemoteData$Success(x);
	}
};
var $elm$http$Http$Request = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {ce: reqs, cw: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (!cmd.$) {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 1) {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.cz;
							if (_v4.$ === 1) {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.ce));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.cw)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (!cmd.$) {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					cN: r.cN,
					aC: r.aC,
					aS: A2(_Http_mapExpect, func, r.aS),
					bM: r.bM,
					dc: r.dc,
					dN: r.dN,
					cz: r.cz,
					bn: r.bn
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{cN: false, aC: r.aC, aS: r.aS, bM: r.bM, dc: r.dc, dN: r.dN, cz: r.cz, bn: r.bn}));
};
var $elm$http$Http$riskyRequest = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{cN: true, aC: r.aC, aS: r.aS, bM: r.bM, dc: r.dc, dN: r.dN, cz: r.cz, bn: r.bn}));
};
var $ohanhi$remotedata_http$RemoteData$Http$performRequest = function (_v0) {
	var risky = _v0.ah;
	return risky ? $elm$http$Http$riskyRequest : $elm$http$Http$request;
};
var $ohanhi$remotedata_http$RemoteData$Http$request = F6(
	function (method, config, url, tagger, decoder, body) {
		return A2(
			$ohanhi$remotedata_http$RemoteData$Http$performRequest,
			config,
			{
				aC: body,
				aS: A2(
					$elm$http$Http$expectJson,
					A2($elm$core$Basics$composeR, $krisajenkins$remotedata$RemoteData$fromResult, tagger),
					decoder),
				bM: config.bM,
				dc: method,
				dN: config.dN,
				cz: config.cz,
				bn: url
			});
	});
var $ohanhi$remotedata_http$RemoteData$Http$getWithConfig = F4(
	function (config, url, tagger, decoder) {
		return A6($ohanhi$remotedata_http$RemoteData$Http$request, 'GET', config, url, tagger, decoder, $elm$http$Http$emptyBody);
	});
var $author$project$Main$get = $ohanhi$remotedata_http$RemoteData$Http$getWithConfig($ohanhi$remotedata_http$RemoteData$Http$defaultConfig);
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$Model$stationsDecoder = A2(
	$elm$json$Json$Decode$andThen,
	A2($elm$core$Basics$composeR, $elm$core$Dict$fromList, $elm$json$Json$Decode$succeed),
	$elm$json$Json$Decode$list(
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'stationName',
			A2(
				$elm$json$Json$Decode$map,
				A2($elm$core$String$replace, ' asema', ''),
				$elm$json$Json$Decode$string),
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'stationShortCode',
				$elm$json$Json$Decode$string,
				$elm$json$Json$Decode$succeed(
					F2(
						function (a, b) {
							return _Utils_Tuple2(a, b);
						}))))));
var $author$project$Main$getStations = A3($author$project$Main$get, 'https://rata.digitraffic.fi/api/v1/metadata/stations', $author$project$View$StationsResponse, $author$project$Model$stationsDecoder);
var $elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$here = _Time_here(0);
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $krisajenkins$remotedata$RemoteData$Loading = {$: 1};
var $author$project$View$TrainsResponse = function (a) {
	return {$: 2, a: a};
};
var $elm$url$Url$Builder$toQueryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return key + ('=' + value);
};
var $elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			$elm$core$String$join,
			'&',
			A2($elm$core$List$map, $elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var $elm$url$Url$Builder$crossOrigin = F3(
	function (prePath, pathSegments, parameters) {
		return prePath + ('/' + (A2($elm$core$String$join, '/', pathSegments) + $elm$url$Url$Builder$toQuery(parameters)));
	});
var $author$project$Model$TrainRaw = F6(
	function (trainNumber, lineId, trainCategory, timetableRows, runningCurrently, cancelled) {
		return {aD: cancelled, aI: lineId, aL: runningCurrently, bl: timetableRows, cB: trainCategory, ax: trainNumber};
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $author$project$Model$TimetableRow = F9(
	function (scheduledTime, trainStopping, stationShortCode, stationUICCode, track, rowType, actualTime, liveEstimateTime, differenceInMinutes) {
		return {W: actualTime, aF: differenceInMinutes, bY: liveEstimateTime, ab: rowType, ac: scheduledTime, aj: stationShortCode, dG: stationUICCode, dT: track, ay: trainStopping};
	});
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $rtfeldman$elm_iso8601_date_strings$DeadEnds$problemToString = function (p) {
	switch (p.$) {
		case 0:
			var s = p.a;
			return 'expecting \'' + (s + '\'');
		case 1:
			return 'expecting int';
		case 2:
			return 'expecting hex';
		case 3:
			return 'expecting octal';
		case 4:
			return 'expecting binary';
		case 5:
			return 'expecting float';
		case 6:
			return 'expecting number';
		case 7:
			return 'expecting variable';
		case 8:
			var s = p.a;
			return 'expecting symbol \'' + (s + '\'');
		case 9:
			var s = p.a;
			return 'expecting keyword \'' + (s + '\'');
		case 10:
			return 'expecting end';
		case 11:
			return 'unexpected char';
		case 12:
			var s = p.a;
			return 'problem ' + s;
		default:
			return 'bad repeat';
	}
};
var $rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndToString = function (deadend) {
	return $rtfeldman$elm_iso8601_date_strings$DeadEnds$problemToString(deadend.b8) + (' at row ' + ($elm$core$String$fromInt(deadend.ci) + (', col ' + $elm$core$String$fromInt(deadend.bu))));
};
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndsToString = function (deadEnds) {
	return $elm$core$String$concat(
		A2(
			$elm$core$List$intersperse,
			'; ',
			A2($elm$core$List$map, $rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndToString, deadEnds)));
};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {bu: col, cV: contextStack, b8: problem, ci: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.ci, s.bu, x, s.l));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.g),
			s.e) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.g);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.e, offset) < 0,
					0,
					{bu: col, l: s0.l, m: s0.m, e: offset, ci: row, g: s0.g});
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
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.e, s.ci, s.bu, s);
	};
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3($elm$core$String$slice, s0.e, s1.e, s0.g),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$core$Basics$round = _Basics_round;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$core$String$toFloat = _String_toFloat;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs = A2(
	$elm$parser$Parser$andThen,
	function (str) {
		if ($elm$core$String$length(str) <= 9) {
			var _v0 = $elm$core$String$toFloat('0.' + str);
			if (!_v0.$) {
				var floatVal = _v0.a;
				return $elm$parser$Parser$succeed(
					$elm$core$Basics$round(floatVal * 1000));
			} else {
				return $elm$parser$Parser$problem('Invalid float: \"' + (str + '\"'));
			}
		} else {
			return $elm$parser$Parser$problem(
				'Expected at most 9 digits, but got ' + $elm$core$String$fromInt(
					$elm$core$String$length(str)));
		}
	},
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompWhile($elm$core$Char$isDigit)));
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts = F6(
	function (monthYearDayMs, hour, minute, second, ms, utcOffsetMinutes) {
		return $elm$time$Time$millisToPosix((((monthYearDayMs + (((hour * 60) * 60) * 1000)) + (((minute - utcOffsetMinutes) * 60) * 1000)) + (second * 1000)) + ms);
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
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
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$core$String$append = _String_append;
var $elm$parser$Parser$UnexpectedChar = {$: 11};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.e, s.g);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{bu: 1, l: s.l, m: s.m, e: s.e + 1, ci: s.ci + 1, g: s.g}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{bu: s.bu + 1, l: s.l, m: s.m, e: newOffset, ci: s.ci, g: s.g}));
		};
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0;
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt = function (quantity) {
	var helper = function (str) {
		if (_Utils_eq(
			$elm$core$String$length(str),
			quantity)) {
			var _v0 = $elm$core$String$toInt(str);
			if (!_v0.$) {
				var intVal = _v0.a;
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$Done,
					$elm$parser$Parser$succeed(intVal));
			} else {
				return $elm$parser$Parser$problem('Invalid integer: \"' + (str + '\"'));
			}
		} else {
			return A2(
				$elm$parser$Parser$map,
				function (nextChar) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$String$append, str, nextChar));
				},
				$elm$parser$Parser$getChompedString(
					$elm$parser$Parser$chompIf($elm$core$Char$isDigit)));
		}
	};
	return A2($elm$parser$Parser$loop, '', helper);
};
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.e, s.ci, s.bu, s.g);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{bu: newCol, l: s.l, m: s.m, e: newOffset, ci: newRow, g: s.g});
	};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear = 1970;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay = function (day) {
	return $elm$parser$Parser$problem(
		'Invalid day: ' + $elm$core$String$fromInt(day));
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Basics$neq = _Utils_notEqual;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear = function (year) {
	return (!A2($elm$core$Basics$modBy, 4, year)) && ((!(!A2($elm$core$Basics$modBy, 100, year))) || (!A2($elm$core$Basics$modBy, 400, year)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore = function (y1) {
	var y = y1 - 1;
	return (((y / 4) | 0) - ((y / 100) | 0)) + ((y / 400) | 0);
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay = 86400000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear = 31536000000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay = function (_v0) {
	var year = _v0.a;
	var month = _v0.b;
	var dayInMonth = _v0.c;
	if (dayInMonth < 0) {
		return $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth);
	} else {
		var succeedWith = function (extraMs) {
			var yearMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear * (year - $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear);
			var days = ((month < 3) || (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year))) ? (dayInMonth - 1) : dayInMonth;
			var dayMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay * (days + ($rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore(year) - $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore($rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear)));
			return $elm$parser$Parser$succeed((extraMs + yearMs) + dayMs);
		};
		switch (month) {
			case 1:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(0);
			case 2:
				return ((dayInMonth > 29) || ((dayInMonth === 29) && (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year)))) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(2678400000);
			case 3:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(5097600000);
			case 4:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(7776000000);
			case 5:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(10368000000);
			case 6:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(13046400000);
			case 7:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(15638400000);
			case 8:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(18316800000);
			case 9:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(20995200000);
			case 10:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(23587200000);
			case 11:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(26265600000);
			case 12:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(28857600000);
			default:
				return $elm$parser$Parser$problem(
					'Invalid month: \"' + ($elm$core$String$fromInt(month) + '\"'));
		}
	}
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs = A2(
	$elm$parser$Parser$andThen,
	$rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F3(
						function (year, month, day) {
							return _Utils_Tuple3(year, month, day);
						})),
				$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(4)),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed($elm$core$Basics$identity),
							$elm$parser$Parser$symbol('-')),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
					]))),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$symbol('-')),
					$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
					$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
				]))));
var $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes = function () {
	var utcOffsetMinutesFromParts = F3(
		function (multiplier, hours, minutes) {
			return (multiplier * (hours * 60)) + minutes;
		});
	return A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return 0;
					},
					$elm$parser$Parser$symbol('Z')),
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							$elm$parser$Parser$succeed(utcOffsetMinutesFromParts),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$map,
										function (_v1) {
											return 1;
										},
										$elm$parser$Parser$symbol('+')),
										A2(
										$elm$parser$Parser$map,
										function (_v2) {
											return -1;
										},
										$elm$parser$Parser$symbol('-'))
									]))),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed($elm$core$Basics$identity),
									$elm$parser$Parser$symbol(':')),
								$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
								$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
								$elm$parser$Parser$succeed(0)
							]))),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(0),
					$elm$parser$Parser$end)
				])));
}();
var $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601 = A2(
	$elm$parser$Parser$andThen,
	function (datePart) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed(
											$rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts(datePart)),
										$elm$parser$Parser$symbol('T')),
									$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											$elm$parser$Parser$keeper,
											A2(
												$elm$parser$Parser$ignorer,
												$elm$parser$Parser$succeed($elm$core$Basics$identity),
												$elm$parser$Parser$symbol(':')),
											$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
											$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
										]))),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$keeper,
										A2(
											$elm$parser$Parser$ignorer,
											$elm$parser$Parser$succeed($elm$core$Basics$identity),
											$elm$parser$Parser$symbol(':')),
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
										$elm$parser$Parser$succeed(0)
									]))),
						$elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed($elm$core$Basics$identity),
										$elm$parser$Parser$symbol('.')),
									$rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs),
									$elm$parser$Parser$succeed(0)
								]))),
					A2($elm$parser$Parser$ignorer, $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes, $elm$parser$Parser$end)),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A6($rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts, datePart, 0, 0, 0, 0, 0)),
					$elm$parser$Parser$end)
				]));
	},
	$rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs);
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {bu: col, b8: problem, ci: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.ci, p.bu, p.b8);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{bu: 1, l: _List_Nil, m: 1, e: 0, ci: 1, g: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime = function (str) {
	return A2($elm$parser$Parser$run, $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601, str);
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$decoder = A2(
	$elm$json$Json$Decode$andThen,
	function (str) {
		var _v0 = $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime(str);
		if (_v0.$ === 1) {
			var deadEnds = _v0.a;
			return $elm$json$Json$Decode$fail(
				$rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndsToString(deadEnds));
		} else {
			var time = _v0.a;
			return $elm$json$Json$Decode$succeed(time);
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Model$dateDecoder = $rtfeldman$elm_iso8601_date_strings$Iso8601$decoder;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (path, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						$elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _v0 = A2(
				$elm$json$Json$Decode$decodeValue,
				A2($elm$json$Json$Decode$at, path, $elm$json$Json$Decode$value),
				input);
			if (!_v0.$) {
				var rawValue = _v0.a;
				var _v1 = A2(
					$elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (!_v1.$) {
					var finalResult = _v1.a;
					return $elm$json$Json$Decode$succeed(finalResult);
				} else {
					return A2(
						$elm$json$Json$Decode$at,
						path,
						nullOr(valDecoder));
				}
			} else {
				return $elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2($elm$json$Json$Decode$andThen, handleResult, $elm$json$Json$Decode$value);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				_List_fromArray(
					[key]),
				valDecoder,
				fallback),
			decoder);
	});
var $author$project$Model$Arrival = 1;
var $author$project$Model$Departure = 0;
var $author$project$Model$rowTypeDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (a) {
		switch (a) {
			case 'ARRIVAL':
				return $elm$json$Json$Decode$succeed(1);
			case 'DEPARTURE':
				return $elm$json$Json$Decode$succeed(0);
			default:
				var other = a;
				return $elm$json$Json$Decode$fail('\"' + (other + '\" is not a valid row type'));
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Model$timetableRowsDecoder = $elm$json$Json$Decode$list(
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'differenceInMinutes',
		$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int),
		$elm$core$Maybe$Nothing,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'liveEstimateTime',
			$elm$json$Json$Decode$maybe($author$project$Model$dateDecoder),
			$elm$core$Maybe$Nothing,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'actualTime',
				$elm$json$Json$Decode$maybe($author$project$Model$dateDecoder),
				$elm$core$Maybe$Nothing,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'type',
					$author$project$Model$rowTypeDecoder,
					A4(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'commercialTrack',
						$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
						$elm$core$Maybe$Nothing,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'stationUICCode',
							$elm$json$Json$Decode$int,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'stationShortCode',
								$elm$json$Json$Decode$string,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'trainStopping',
									$elm$json$Json$Decode$bool,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'scheduledTime',
										$author$project$Model$dateDecoder,
										$elm$json$Json$Decode$succeed($author$project$Model$TimetableRow)))))))))));
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Model$cartesian = F2(
	function (xs, ys) {
		return A2(
			$elm$core$List$concatMap,
			function (x) {
				return A2(
					$elm$core$List$map,
					$elm$core$Tuple$pair(x),
					ys);
			},
			xs);
	});
var $author$project$Model$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			if (!list.b) {
				return _List_Nil;
			} else {
				var a = list.a;
				var rest = list.b;
				if (predicate(a)) {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue dropWhile;
				} else {
					return A2($elm$core$List$cons, a, rest);
				}
			}
		}
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Model$NonStopping = function (a) {
	return {$: 0, a: a};
};
var $author$project$Model$Stopping = {$: 1};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Model$findCurrentStation = function (rows) {
	var passedRows = A2(
		$elm$core$List$filter,
		A2(
			$elm$core$Basics$composeR,
			function ($) {
				return $.W;
			},
			$elm$core$Basics$neq($elm$core$Maybe$Nothing)),
		rows);
	var stoppingType = function (row) {
		if (row.ay && (row.ab === 1)) {
			return $author$project$Model$Stopping;
		} else {
			var prev = A2(
				$elm$core$Maybe$withDefault,
				'?',
				A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.aj;
					},
					$elm$core$List$head(
						$elm$core$List$reverse(
							A2(
								$elm$core$List$filter,
								function ($) {
									return $.ay;
								},
								passedRows)))));
			var next = A2(
				$elm$core$Maybe$withDefault,
				'?',
				A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.aj;
					},
					$elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (r) {
								return r.ay && _Utils_eq(r.W, $elm$core$Maybe$Nothing);
							},
							rows))));
			return $author$project$Model$NonStopping(
				{di: next, dw: prev});
		}
	};
	return A2(
		$elm$core$Maybe$andThen,
		function (row) {
			return A3(
				$elm$core$Maybe$map2,
				F2(
					function (actualTime, differenceInMinutes) {
						return {
							W: actualTime,
							bw: row.aj,
							aF: differenceInMinutes,
							ab: row.ab,
							cs: stoppingType(row)
						};
					}),
				row.W,
				row.aF);
		},
		$elm$core$List$head(
			$elm$core$List$reverse(passedRows)));
};
var $author$project$Model$findTimetableRows = F3(
	function (rowType, shortCode, rows) {
		return A2(
			$elm$core$List$filter,
			function (row) {
				return _Utils_eq(row.aj, shortCode) && _Utils_eq(row.ab, rowType);
			},
			rows);
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$List$any = F2(
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
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0;
	return millis;
};
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$Model$takeUntilHelp = F3(
	function (acc, predicate, list) {
		takeUntilHelp:
		while (true) {
			if (!list.b) {
				return _List_Nil;
			} else {
				var a = list.a;
				var rest = list.b;
				if (predicate(a)) {
					return $elm$core$List$reverse(
						A2($elm$core$List$cons, a, acc));
				} else {
					var $temp$acc = A2($elm$core$List$cons, a, acc),
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
var $author$project$Model$takeUntil = $author$project$Model$takeUntilHelp(_List_Nil);
var $author$project$Model$mostAccurateTime = function (timetableRow) {
	return A2(
		$elm$core$Maybe$withDefault,
		timetableRow.ac,
		A2(
			$elm$core$Maybe$withDefault,
			timetableRow.bY,
			$elm$core$Maybe$Just(timetableRow.W)));
};
var $author$project$Model$toDuration = F2(
	function (homeStationDeparture, endStationArrival) {
		var homeTime = $author$project$Model$mostAccurateTime(homeStationDeparture);
		var endTime = $author$project$Model$mostAccurateTime(endStationArrival);
		return (($elm$time$Time$posixToMillis(endTime) - $elm$time$Time$posixToMillis(homeTime)) / 60000) | 0;
	});
var $author$project$Model$toTrain = F2(
	function (_v0, trainRaw) {
		var from = _v0.a;
		var to = _v0.c;
		var stoppingRows = A2(
			$elm$core$List$filter,
			function ($) {
				return $.ay;
			},
			trainRaw.bl);
		var _v1 = function () {
			var quickestCombination = $elm$core$List$head(
				A2(
					$elm$core$List$sortBy,
					function (_v5) {
						var departure = _v5.a;
						var arrival = _v5.b;
						return $elm$time$Time$posixToMillis(arrival.ac) - $elm$time$Time$posixToMillis(departure.ac);
					},
					A2(
						$elm$core$List$filter,
						function (_v4) {
							var departure = _v4.a;
							var arrival = _v4.b;
							return _Utils_cmp(
								$elm$time$Time$posixToMillis(departure.ac),
								$elm$time$Time$posixToMillis(arrival.ac)) < 0;
						},
						A2(
							$author$project$Model$cartesian,
							A3($author$project$Model$findTimetableRows, 0, from, stoppingRows),
							A3($author$project$Model$findTimetableRows, 1, to, stoppingRows)))));
			if (!quickestCombination.$) {
				var _v3 = quickestCombination.a;
				var departure = _v3.a;
				var arrival = _v3.b;
				return _Utils_Tuple2(
					$elm$core$Maybe$Just(departure),
					$elm$core$Maybe$Just(arrival));
			} else {
				return _Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
			}
		}();
		var homeStationDeparture = _v1.a;
		var endStationArrival = _v1.b;
		var itineraryRows = A2(
			$author$project$Model$takeUntil,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Maybe$Just,
				$elm$core$Basics$eq(endStationArrival)),
			A2(
				$author$project$Model$dropWhile,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Maybe$Just,
					$elm$core$Basics$neq(homeStationDeparture)),
				stoppingRows));
		var isValid = (trainRaw.cB === 'Commuter') && ($elm$core$List$length(itineraryRows) >= 2);
		var stopsBetween = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				function (row) {
					return row.ab === 1;
				},
				itineraryRows)) - 1;
		var viaAirport = A2(
			$elm$core$List$member,
			'LEN',
			A2(
				$elm$core$List$map,
				function ($) {
					return $.aj;
				},
				itineraryRows)) && (A2(
			$elm$core$List$member,
			to,
			_List_fromArray(
				['PSL', 'HKI'])) || A2(
			$elm$core$List$member,
			from,
			_List_fromArray(
				['PSL', 'HKI'])));
		var _v6 = _Utils_Tuple3(isValid, homeStationDeparture, endStationArrival);
		if ((_v6.a && (!_v6.b.$)) && (!_v6.c.$)) {
			var dep = _v6.b.a;
			var end = _v6.c.a;
			return $elm$core$Maybe$Just(
				{
					aD: trainRaw.aD,
					bx: $author$project$Model$findCurrentStation(trainRaw.bl),
					bC: A2($author$project$Model$toDuration, dep, end),
					bE: end,
					aU: dep,
					aI: trainRaw.aI,
					aL: trainRaw.aL,
					ct: stopsBetween,
					ax: trainRaw.ax,
					cC: viaAirport
				});
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Model$trainsDecoder = function (targets) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$List$filterMap($elm$core$Basics$identity),
			A2(
				$elm$core$Basics$composeR,
				$elm$core$List$map(
					function (a) {
						return _Utils_Tuple2(a.ax, a);
					}),
				A2($elm$core$Basics$composeR, $elm$core$Dict$fromList, $elm$json$Json$Decode$succeed))),
		$elm$json$Json$Decode$list(
			A2(
				$elm$json$Json$Decode$andThen,
				A2(
					$elm$core$Basics$composeL,
					$elm$json$Json$Decode$succeed,
					$author$project$Model$toTrain(targets)),
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'cancelled',
					$elm$json$Json$Decode$bool,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'runningCurrently',
						$elm$json$Json$Decode$bool,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'timeTableRows',
							$author$project$Model$timetableRowsDecoder,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'trainCategory',
								$elm$json$Json$Decode$string,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'commuterLineID',
									$elm$json$Json$Decode$string,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'trainNumber',
										$elm$json$Json$Decode$int,
										$elm$json$Json$Decode$succeed($author$project$Model$TrainRaw))))))))));
};
var $author$project$Main$getTrain = F2(
	function (targets, trainNumber) {
		var trainsUrl = A3(
			$elm$url$Url$Builder$crossOrigin,
			'https://rata.digitraffic.fi/api/v1/trains/latest',
			_List_fromArray(
				[
					$elm$core$String$fromInt(trainNumber)
				]),
			_List_Nil);
		return A3(
			$author$project$Main$get,
			trainsUrl,
			$author$project$View$TrainsResponse,
			$author$project$Model$trainsDecoder(targets));
	});
var $elm$url$Url$Builder$QueryParameter = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $elm$url$Url$Builder$int = F2(
	function (key, value) {
		return A2(
			$elm$url$Url$Builder$QueryParameter,
			$elm$url$Url$percentEncode(key),
			$elm$core$String$fromInt(value));
	});
var $author$project$Main$getTrains = function (targets) {
	var trainsUrl = A3(
		$elm$url$Url$Builder$crossOrigin,
		'https://rata.digitraffic.fi/api/v1/live-trains/station',
		_List_fromArray(
			[targets.a]),
		_List_fromArray(
			[
				A2($elm$url$Url$Builder$int, 'minutes_before_departure', 120),
				A2($elm$url$Url$Builder$int, 'minutes_after_departure', 0),
				A2($elm$url$Url$Builder$int, 'minutes_before_arrival', 0),
				A2($elm$url$Url$Builder$int, 'minutes_after_arrival', 0)
			]));
	return A3(
		$author$project$Main$get,
		trainsUrl,
		$author$project$View$TrainsResponse,
		$author$project$Model$trainsDecoder(targets));
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Model$ScheduleRoute = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $author$project$Model$SelectDestRoute = function (a) {
	return {$: 1, a: a};
};
var $author$project$Model$TrainRoute = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $elm$url$Url$Parser$Parser = $elm$core$Basics$identity;
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {Y: frag, _: params, V: unvisited, Q: value, ae: visited};
	});
var $elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return function (_v0) {
			var visited = _v0.ae;
			var unvisited = _v0.V;
			var params = _v0._;
			var frag = _v0.Y;
			var value = _v0.Q;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				var _v2 = stringToSomething(next);
				if (!_v2.$) {
					var nextValue = _v2.a;
					return _List_fromArray(
						[
							A5(
							$elm$url$Url$Parser$State,
							A2($elm$core$List$cons, next, visited),
							rest,
							params,
							frag,
							value(nextValue))
						]);
				} else {
					return _List_Nil;
				}
			}
		};
	});
var $elm$url$Url$Parser$int = A2($elm$url$Url$Parser$custom, 'NUMBER', $elm$core$String$toInt);
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.ae;
		var unvisited = _v0.V;
		var params = _v0._;
		var frag = _v0.Y;
		var value = _v0.Q;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0;
		return function (_v1) {
			var visited = _v1.ae;
			var unvisited = _v1.V;
			var params = _v1._;
			var frag = _v1.Y;
			var value = _v1.Q;
			return A2(
				$elm$core$List$map,
				$elm$url$Url$Parser$mapState(value),
				parseArg(
					A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var parser = _v0;
				return parser(state);
			},
			parsers);
	};
};
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.V;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.Q);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.Q);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 1) {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 1) {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.du),
					$elm$url$Url$Parser$prepareQuery(url.cc),
					url.bI,
					$elm$core$Basics$identity)));
	});
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0;
		var parseAfter = _v1;
		return function (state) {
			return A2(
				$elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var $elm$url$Url$Parser$string = A2($elm$url$Url$Parser$custom, 'STRING', $elm$core$Maybe$Just);
var $elm$url$Url$Parser$top = function (state) {
	return _List_fromArray(
		[state]);
};
var $author$project$Main$parseUrl = function (url) {
	var routeParser = $elm$url$Url$Parser$oneOf(
		_List_fromArray(
			[
				A2($elm$url$Url$Parser$map, $author$project$Model$SelectDepRoute, $elm$url$Url$Parser$top),
				A2($elm$url$Url$Parser$map, $author$project$Model$SelectDestRoute, $elm$url$Url$Parser$string),
				A2(
				$elm$url$Url$Parser$map,
				$author$project$Model$ScheduleRoute,
				A2($elm$url$Url$Parser$slash, $elm$url$Url$Parser$string, $elm$url$Url$Parser$string)),
				A2(
				$elm$url$Url$Parser$map,
				$author$project$Model$TrainRoute,
				A2(
					$elm$url$Url$Parser$slash,
					$elm$url$Url$Parser$string,
					A2($elm$url$Url$Parser$slash, $elm$url$Url$Parser$string, $elm$url$Url$Parser$int)))
			]));
	var _v0 = url.bI;
	if (_v0.$ === 1) {
		return $author$project$Model$SelectDepRoute;
	} else {
		var fragment = _v0.a;
		return A2(
			$elm$core$Maybe$withDefault,
			$author$project$Model$SelectDepRoute,
			A2(
				$elm$url$Url$Parser$parse,
				routeParser,
				_Utils_update(
					url,
					{
						bI: $elm$core$Maybe$Nothing,
						du: A2(
							$elm$core$Maybe$withDefault,
							'',
							$elm$url$Url$percentDecode(fragment))
					})));
	}
};
var $author$project$Main$urlChange = F2(
	function (model, url) {
		var route = $author$project$Main$parseUrl(url);
		var _v0 = function () {
			switch (route.$) {
				case 2:
					var from = route.a;
					var to = route.b;
					return _Utils_Tuple2(
						$krisajenkins$remotedata$RemoteData$Loading,
						$author$project$Main$getTrains(
							{a: from, c: to}));
				case 3:
					var from = route.a;
					var to = route.b;
					var trainNumber = route.c;
					return _Utils_Tuple2(
						$krisajenkins$remotedata$RemoteData$Loading,
						A2(
							$author$project$Main$getTrain,
							{a: from, c: to},
							trainNumber));
				default:
					return _Utils_Tuple2($krisajenkins$remotedata$RemoteData$NotAsked, $elm$core$Platform$Cmd$none);
			}
		}();
		var trains = _v0.a;
		var trainsCmd = _v0.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{a5: route, bm: trains}),
			trainsCmd);
	});
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Main$init = F3(
	function (flags, url, key) {
		var storedState = A2(
			$elm$core$Result$withDefault,
			$author$project$Model$defaultStoredState,
			$author$project$Model$decodeStoredState(flags.bg));
		var _v0 = A2(
			$author$project$Main$urlChange,
			{
				aE: $elm$time$Time$millisToPosix(flags.bk),
				a$: storedState.a$,
				aH: $elm$time$Time$millisToPosix(0),
				b0: key,
				a5: $author$project$Model$SelectDepRoute,
				a7: storedState.a7,
				cr: $elm$core$Dict$empty,
				bm: $krisajenkins$remotedata$RemoteData$NotAsked,
				cE: $elm$core$Dict$empty,
				cL: $elm$time$Time$utc
			},
			url);
		var model = _v0.a;
		var trainsCmd = _v0.b;
		return _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$author$project$Main$getStations,
						trainsCmd,
						A2($elm$core$Task$perform, $author$project$View$TimeZoneResponse, $elm$time$Time$here)
					])));
	});
var $author$project$View$UpdateTime = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {ca: processes, cx: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 1) {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
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
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
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
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.ca;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.cx);
		if (_v0.$ === 1) {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $author$project$Main$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 1000, $author$project$View$UpdateTime);
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Translations$languageToString = function (language) {
	switch (language) {
		case 1:
			return 'EN';
		case 0:
			return 'FI';
		default:
			return 'SV';
	}
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $author$project$Model$storedStateVersion = 2;
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Model$encodeStoredState = function (model) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					A2(
					$elm$core$Tuple$pair,
					'version',
					$elm$json$Json$Encode$int($author$project$Model$storedStateVersion)),
					A2(
					$elm$core$Tuple$pair,
					'language',
					$elm$json$Json$Encode$string(
						$author$project$Translations$languageToString(model.a$))),
					A2(
					$elm$core$Tuple$pair,
					'showTrainsViaAirport',
					$elm$json$Json$Encode$bool(model.a7))
				])));
};
var $author$project$View$TrainWagonCountsResponse = function (a) {
	return {$: 4, a: a};
};
var $ryan_haskell$date_format$DateFormat$DayOfMonthFixed = {$: 7};
var $ryan_haskell$date_format$DateFormat$dayOfMonthFixed = $ryan_haskell$date_format$DateFormat$DayOfMonthFixed;
var $ryan_haskell$date_format$DateFormat$Language$Language = F6(
	function (toMonthName, toMonthAbbreviation, toWeekdayName, toWeekdayAbbreviation, toAmPm, toOrdinalSuffix) {
		return {dO: toAmPm, dP: toMonthAbbreviation, dQ: toMonthName, ak: toOrdinalSuffix, dR: toWeekdayAbbreviation, dS: toWeekdayName};
	});
var $ryan_haskell$date_format$DateFormat$Language$toEnglishAmPm = function (hour) {
	return (hour > 11) ? 'pm' : 'am';
};
var $ryan_haskell$date_format$DateFormat$Language$toEnglishMonthName = function (month) {
	switch (month) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		default:
			return 'December';
	}
};
var $ryan_haskell$date_format$DateFormat$Language$toEnglishSuffix = function (num) {
	var _v0 = A2($elm$core$Basics$modBy, 100, num);
	switch (_v0) {
		case 11:
			return 'th';
		case 12:
			return 'th';
		case 13:
			return 'th';
		default:
			var _v1 = A2($elm$core$Basics$modBy, 10, num);
			switch (_v1) {
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
var $ryan_haskell$date_format$DateFormat$Language$toEnglishWeekdayName = function (weekday) {
	switch (weekday) {
		case 0:
			return 'Monday';
		case 1:
			return 'Tuesday';
		case 2:
			return 'Wednesday';
		case 3:
			return 'Thursday';
		case 4:
			return 'Friday';
		case 5:
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $ryan_haskell$date_format$DateFormat$Language$english = A6(
	$ryan_haskell$date_format$DateFormat$Language$Language,
	$ryan_haskell$date_format$DateFormat$Language$toEnglishMonthName,
	A2(
		$elm$core$Basics$composeR,
		$ryan_haskell$date_format$DateFormat$Language$toEnglishMonthName,
		$elm$core$String$left(3)),
	$ryan_haskell$date_format$DateFormat$Language$toEnglishWeekdayName,
	A2(
		$elm$core$Basics$composeR,
		$ryan_haskell$date_format$DateFormat$Language$toEnglishWeekdayName,
		$elm$core$String$left(3)),
	$ryan_haskell$date_format$DateFormat$Language$toEnglishAmPm,
	$ryan_haskell$date_format$DateFormat$Language$toEnglishSuffix);
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.be, posixMinutes) < 0) {
					return posixMinutes + era.e;
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
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $ryan_haskell$date_format$DateFormat$amPm = F3(
	function (language, zone, posix) {
		return language.dO(
			A2($elm$time$Time$toHour, zone, posix));
	});
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		by: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		b_: month,
		cJ: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).by;
	});
var $ryan_haskell$date_format$DateFormat$dayOfMonth = $elm$time$Time$toDay;
var $elm$time$Time$Sun = 6;
var $elm$time$Time$Fri = 4;
var $elm$time$Time$Mon = 0;
var $elm$time$Time$Sat = 5;
var $elm$time$Time$Thu = 3;
var $elm$time$Time$Tue = 1;
var $elm$time$Time$Wed = 2;
var $ryan_haskell$date_format$DateFormat$days = _List_fromArray(
	[6, 0, 1, 2, 3, 4, 5]);
var $elm$time$Time$toWeekday = F2(
	function (zone, time) {
		var _v0 = A2(
			$elm$core$Basics$modBy,
			7,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60 * 24));
		switch (_v0) {
			case 0:
				return 3;
			case 1:
				return 4;
			case 2:
				return 5;
			case 3:
				return 6;
			case 4:
				return 0;
			case 5:
				return 1;
			default:
				return 2;
		}
	});
var $ryan_haskell$date_format$DateFormat$dayOfWeek = F2(
	function (zone, posix) {
		return function (_v1) {
			var i = _v1.a;
			return i;
		}(
			A2(
				$elm$core$Maybe$withDefault,
				_Utils_Tuple2(0, 6),
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (_v0) {
							var day = _v0.b;
							return _Utils_eq(
								day,
								A2($elm$time$Time$toWeekday, zone, posix));
						},
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (i, day) {
									return _Utils_Tuple2(i, day);
								}),
							$ryan_haskell$date_format$DateFormat$days)))));
	});
var $ryan_haskell$date_format$DateFormat$isLeapYear = function (year_) {
	return (!(!A2($elm$core$Basics$modBy, 4, year_))) ? false : ((!(!A2($elm$core$Basics$modBy, 100, year_))) ? true : ((!(!A2($elm$core$Basics$modBy, 400, year_))) ? false : true));
};
var $ryan_haskell$date_format$DateFormat$daysInMonth = F2(
	function (year_, month) {
		switch (month) {
			case 0:
				return 31;
			case 1:
				return $ryan_haskell$date_format$DateFormat$isLeapYear(year_) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var $elm$time$Time$Jan = 0;
var $elm$time$Time$Apr = 3;
var $elm$time$Time$Aug = 7;
var $elm$time$Time$Dec = 11;
var $elm$time$Time$Feb = 1;
var $elm$time$Time$Jul = 6;
var $elm$time$Time$Jun = 5;
var $elm$time$Time$Mar = 2;
var $elm$time$Time$May = 4;
var $elm$time$Time$Nov = 10;
var $elm$time$Time$Oct = 9;
var $elm$time$Time$Sep = 8;
var $ryan_haskell$date_format$DateFormat$months = _List_fromArray(
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).b_;
		switch (_v0) {
			case 1:
				return 0;
			case 2:
				return 1;
			case 3:
				return 2;
			case 4:
				return 3;
			case 5:
				return 4;
			case 6:
				return 5;
			case 7:
				return 6;
			case 8:
				return 7;
			case 9:
				return 8;
			case 10:
				return 9;
			case 11:
				return 10;
			default:
				return 11;
		}
	});
var $ryan_haskell$date_format$DateFormat$monthPair = F2(
	function (zone, posix) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, 0),
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (_v0) {
						var i = _v0.a;
						var m = _v0.b;
						return _Utils_eq(
							m,
							A2($elm$time$Time$toMonth, zone, posix));
					},
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (a, b) {
								return _Utils_Tuple2(a, b);
							}),
						$ryan_haskell$date_format$DateFormat$months))));
	});
var $ryan_haskell$date_format$DateFormat$monthNumber_ = F2(
	function (zone, posix) {
		return 1 + function (_v0) {
			var i = _v0.a;
			var m = _v0.b;
			return i;
		}(
			A2($ryan_haskell$date_format$DateFormat$monthPair, zone, posix));
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$core$List$takeReverse = F3(
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
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).cJ;
	});
var $ryan_haskell$date_format$DateFormat$dayOfYear = F2(
	function (zone, posix) {
		var monthsBeforeThisOne = A2(
			$elm$core$List$take,
			A2($ryan_haskell$date_format$DateFormat$monthNumber_, zone, posix) - 1,
			$ryan_haskell$date_format$DateFormat$months);
		var daysBeforeThisMonth = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				$ryan_haskell$date_format$DateFormat$daysInMonth(
					A2($elm$time$Time$toYear, zone, posix)),
				monthsBeforeThisOne));
		return daysBeforeThisMonth + A2($ryan_haskell$date_format$DateFormat$dayOfMonth, zone, posix);
	});
var $ryan_haskell$date_format$DateFormat$quarter = F2(
	function (zone, posix) {
		return (A2($ryan_haskell$date_format$DateFormat$monthNumber_, zone, posix) / 4) | 0;
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $ryan_haskell$date_format$DateFormat$toFixedLength = F2(
	function (totalChars, num) {
		var numStr = $elm$core$String$fromInt(num);
		var numZerosNeeded = totalChars - $elm$core$String$length(numStr);
		var zeros = A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				function (_v0) {
					return '0';
				},
				A2($elm$core$List$range, 1, numZerosNeeded)));
		return _Utils_ap(zeros, numStr);
	});
var $elm$core$String$toLower = _String_toLower;
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $ryan_haskell$date_format$DateFormat$toNonMilitary = function (num) {
	return (!num) ? 12 : ((num <= 12) ? num : (num - 12));
};
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $elm$core$String$toUpper = _String_toUpper;
var $ryan_haskell$date_format$DateFormat$millisecondsPerYear = $elm$core$Basics$round((((1000 * 60) * 60) * 24) * 365.25);
var $ryan_haskell$date_format$DateFormat$firstDayOfYear = F2(
	function (zone, time) {
		return $elm$time$Time$millisToPosix(
			$ryan_haskell$date_format$DateFormat$millisecondsPerYear * A2($elm$time$Time$toYear, zone, time));
	});
var $ryan_haskell$date_format$DateFormat$weekOfYear = F2(
	function (zone, posix) {
		var firstDay = A2($ryan_haskell$date_format$DateFormat$firstDayOfYear, zone, posix);
		var firstDayOffset = A2($ryan_haskell$date_format$DateFormat$dayOfWeek, zone, firstDay);
		var daysSoFar = A2($ryan_haskell$date_format$DateFormat$dayOfYear, zone, posix);
		return (((daysSoFar + firstDayOffset) / 7) | 0) + 1;
	});
var $ryan_haskell$date_format$DateFormat$year = F2(
	function (zone, time) {
		return $elm$core$String$fromInt(
			A2($elm$time$Time$toYear, zone, time));
	});
var $ryan_haskell$date_format$DateFormat$piece = F4(
	function (language, zone, posix, token) {
		switch (token.$) {
			case 0:
				return $elm$core$String$fromInt(
					A2($ryan_haskell$date_format$DateFormat$monthNumber_, zone, posix));
			case 1:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ak(num));
				}(
					A2($ryan_haskell$date_format$DateFormat$monthNumber_, zone, posix));
			case 2:
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($ryan_haskell$date_format$DateFormat$monthNumber_, zone, posix));
			case 3:
				return language.dP(
					A2($elm$time$Time$toMonth, zone, posix));
			case 4:
				return language.dQ(
					A2($elm$time$Time$toMonth, zone, posix));
			case 17:
				return $elm$core$String$fromInt(
					1 + A2($ryan_haskell$date_format$DateFormat$quarter, zone, posix));
			case 18:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ak(num));
				}(
					1 + A2($ryan_haskell$date_format$DateFormat$quarter, zone, posix));
			case 5:
				return $elm$core$String$fromInt(
					A2($ryan_haskell$date_format$DateFormat$dayOfMonth, zone, posix));
			case 6:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ak(num));
				}(
					A2($ryan_haskell$date_format$DateFormat$dayOfMonth, zone, posix));
			case 7:
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($ryan_haskell$date_format$DateFormat$dayOfMonth, zone, posix));
			case 8:
				return $elm$core$String$fromInt(
					A2($ryan_haskell$date_format$DateFormat$dayOfYear, zone, posix));
			case 9:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ak(num));
				}(
					A2($ryan_haskell$date_format$DateFormat$dayOfYear, zone, posix));
			case 10:
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					3,
					A2($ryan_haskell$date_format$DateFormat$dayOfYear, zone, posix));
			case 11:
				return $elm$core$String$fromInt(
					A2($ryan_haskell$date_format$DateFormat$dayOfWeek, zone, posix));
			case 12:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ak(num));
				}(
					A2($ryan_haskell$date_format$DateFormat$dayOfWeek, zone, posix));
			case 13:
				return language.dR(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 14:
				return language.dS(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 19:
				return $elm$core$String$fromInt(
					A2($ryan_haskell$date_format$DateFormat$weekOfYear, zone, posix));
			case 20:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ak(num));
				}(
					A2($ryan_haskell$date_format$DateFormat$weekOfYear, zone, posix));
			case 21:
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($ryan_haskell$date_format$DateFormat$weekOfYear, zone, posix));
			case 15:
				return A2(
					$elm$core$String$right,
					2,
					A2($ryan_haskell$date_format$DateFormat$year, zone, posix));
			case 16:
				return A2($ryan_haskell$date_format$DateFormat$year, zone, posix);
			case 22:
				return $elm$core$String$toUpper(
					A3($ryan_haskell$date_format$DateFormat$amPm, language, zone, posix));
			case 23:
				return $elm$core$String$toLower(
					A3($ryan_haskell$date_format$DateFormat$amPm, language, zone, posix));
			case 24:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toHour, zone, posix));
			case 25:
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toHour, zone, posix));
			case 26:
				return $elm$core$String$fromInt(
					$ryan_haskell$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 27:
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					$ryan_haskell$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 28:
				return $elm$core$String$fromInt(
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 29:
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 30:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMinute, zone, posix));
			case 31:
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toMinute, zone, posix));
			case 32:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toSecond, zone, posix));
			case 33:
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toSecond, zone, posix));
			case 34:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMillis, zone, posix));
			case 35:
				return A2(
					$ryan_haskell$date_format$DateFormat$toFixedLength,
					3,
					A2($elm$time$Time$toMillis, zone, posix));
			default:
				var string = token.a;
				return string;
		}
	});
var $ryan_haskell$date_format$DateFormat$formatWithLanguage = F4(
	function (language, tokens, zone, time) {
		return A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				A3($ryan_haskell$date_format$DateFormat$piece, language, zone, time),
				tokens));
	});
var $ryan_haskell$date_format$DateFormat$format = $ryan_haskell$date_format$DateFormat$formatWithLanguage($ryan_haskell$date_format$DateFormat$Language$english);
var $ryan_haskell$date_format$DateFormat$MonthFixed = {$: 2};
var $ryan_haskell$date_format$DateFormat$monthFixed = $ryan_haskell$date_format$DateFormat$MonthFixed;
var $ryan_haskell$date_format$DateFormat$Text = function (a) {
	return {$: 36, a: a};
};
var $ryan_haskell$date_format$DateFormat$text = $ryan_haskell$date_format$DateFormat$Text;
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Model$trainWagonCountDecoder = function () {
	var wagonCountFromWagons = A2(
		$elm$json$Json$Decode$andThen,
		function (a) {
			return $elm$json$Json$Decode$succeed(
				$elm$core$List$length(a));
		},
		$elm$json$Json$Decode$list(
			$elm$json$Json$Decode$succeed(true)));
	var wagonCountFromJourneySections = A2(
		$elm$json$Json$Decode$map,
		$elm$core$List$minimum,
		$elm$json$Json$Decode$list(
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'wagons',
				wagonCountFromWagons,
				$elm$json$Json$Decode$succeed($elm$core$Basics$identity))));
	var liftMaybe = F2(
		function (trainNum, maybeCount) {
			return A2(
				$elm$core$Maybe$andThen,
				function (count) {
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(trainNum, count));
				},
				maybeCount);
		});
	return A2(
		$elm$json$Json$Decode$map,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$List$filterMap(
				function (a) {
					return a;
				}),
			$elm$core$Dict$fromList),
		$elm$json$Json$Decode$list(
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'journeySections',
				wagonCountFromJourneySections,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'trainNumber',
					$elm$json$Json$Decode$int,
					$elm$json$Json$Decode$succeed(liftMaybe)))));
}();
var $ryan_haskell$date_format$DateFormat$YearNumber = {$: 16};
var $ryan_haskell$date_format$DateFormat$yearNumber = $ryan_haskell$date_format$DateFormat$YearNumber;
var $author$project$Main$getCompositions = F2(
	function (posix, zone) {
		var localDate = A3(
			$ryan_haskell$date_format$DateFormat$format,
			_List_fromArray(
				[
					$ryan_haskell$date_format$DateFormat$yearNumber,
					$ryan_haskell$date_format$DateFormat$text('-'),
					$ryan_haskell$date_format$DateFormat$monthFixed,
					$ryan_haskell$date_format$DateFormat$text('-'),
					$ryan_haskell$date_format$DateFormat$dayOfMonthFixed
				]),
			zone,
			posix);
		var url = A3(
			$elm$url$Url$Builder$crossOrigin,
			'https://rata.digitraffic.fi/api/v1/compositions',
			_List_fromArray(
				[localDate]),
			_List_Nil);
		return A3($author$project$Main$get, url, $author$project$View$TrainWagonCountsResponse, $author$project$Model$trainWagonCountDecoder);
	});
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $author$project$Main$setStorage = _Platform_outgoingPort('setStorage', $elm$json$Json$Encode$string);
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.cb;
		if (!_v0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.bI,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.cc,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.b7,
					_Utils_ap(http, url.bP)),
				url.du)));
};
var $author$project$Main$updateTime = function (model) {
	var currentTime = model.aE;
	var route = model.a5;
	var requestMillis = $elm$time$Time$posixToMillis(model.aH);
	var currentMillis = $elm$time$Time$posixToMillis(currentTime);
	switch (route.$) {
		case 2:
			var from = route.a;
			var to = route.b;
			return ((currentMillis - requestMillis) >= 10000) ? _Utils_Tuple2(
				_Utils_update(
					model,
					{aH: currentTime}),
				$author$project$Main$getTrains(
					{a: from, c: to})) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		case 3:
			var from = route.a;
			var to = route.b;
			var trainNumber = route.c;
			return ((currentMillis - requestMillis) >= 10000) ? _Utils_Tuple2(
				_Utils_update(
					model,
					{aH: currentTime}),
				A2(
					$author$project$Main$getTrain,
					{a: from, c: to},
					trainNumber)) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		default:
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	}
};
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 5:
				var url = msg.a;
				return A2($author$project$Main$urlChange, model, url);
			case 0:
				var time = msg.a;
				return $author$project$Main$updateTime(
					_Utils_update(
						model,
						{aE: time}));
			case 1:
				var zone = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cL: zone}),
					A2($author$project$Main$getCompositions, model.aE, zone));
			case 2:
				var webData = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bm: webData}),
					$elm$core$Platform$Cmd$none);
			case 3:
				if (msg.a.$ === 3) {
					var stations = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{cr: stations}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 4:
				if (msg.a.$ === 3) {
					var wagonCounts = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{cE: wagonCounts}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 6:
				var urlRequest = msg.a;
				if (!urlRequest.$) {
					var url = urlRequest.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							model.b0,
							$elm$url$Url$toString(url)));
				} else {
					var url = urlRequest.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(url));
				}
			case 7:
				var language = msg.a;
				var nextModel = _Utils_update(
					model,
					{a$: language});
				return _Utils_Tuple2(
					nextModel,
					$author$project$Main$setStorage(
						$author$project$Model$encodeStoredState(nextModel)));
			default:
				var value = msg.a;
				var nextModel = _Utils_update(
					model,
					{a7: value});
				return _Utils_Tuple2(
					nextModel,
					$author$project$Main$setStorage(
						$author$project$Model$encodeStoredState(nextModel)));
		}
	});
var $author$project$Translations$ErrorBadPayload = {$: 8};
var $author$project$Translations$ErrorBadStatus = {$: 7};
var $author$project$Translations$ErrorBadUrl = {$: 6};
var $author$project$Translations$ErrorNetwork = {$: 4};
var $author$project$Translations$ErrorTimeout = {$: 5};
var $author$project$Translations$SchedulePageLoading = {$: 9};
var $author$project$Translations$PageFooter = 0;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $elm$html$Html$Attributes$map = $elm$virtual_dom$VirtualDom$mapAttribute;
var $tesk9$accessible_html$Accessibility$Utils$nonInteractive = $elm$core$List$map(
	$elm$html$Html$Attributes$map($elm$core$Basics$never));
var $tesk9$accessible_html$Accessibility$div = function (attributes) {
	return $elm$html$Html$div(
		$tesk9$accessible_html$Accessibility$Utils$nonInteractive(attributes));
};
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $tesk9$accessible_html$Accessibility$h1 = function (attributes) {
	return $elm$html$Html$h1(
		$tesk9$accessible_html$Accessibility$Utils$nonInteractive(attributes));
};
var $elm$html$Html$header = _VirtualDom_node('header');
var $tesk9$accessible_html$Accessibility$header = function (attributes) {
	return $elm$html$Html$header(
		$tesk9$accessible_html$Accessibility$Utils$nonInteractive(attributes));
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $tesk9$accessible_html$Accessibility$a = function (attributes) {
	return $elm$html$Html$a(
		$tesk9$accessible_html$Accessibility$Utils$nonInteractive(attributes));
};
var $elm$html$Html$footer = _VirtualDom_node('footer');
var $tesk9$accessible_html$Accessibility$footer = function (attributes) {
	return $elm$html$Html$footer(
		$tesk9$accessible_html$Accessibility$Utils$nonInteractive(attributes));
};
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $tesk9$accessible_html$Accessibility$p = function (attributes) {
	return $elm$html$Html$p(
		$tesk9$accessible_html$Accessibility$Utils$nonInteractive(attributes));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $tesk9$accessible_html$Accessibility$span = function (attributes) {
	return $elm$html$Html$span(
		$tesk9$accessible_html$Accessibility$Utils$nonInteractive(attributes));
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $tesk9$accessible_html$Accessibility$text = $elm$html$Html$text;
var $author$project$Translations$htmlTranslationSetFor = function (key) {
	return {
		h: A2(
			$tesk9$accessible_html$Accessibility$footer,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$tesk9$accessible_html$Accessibility$p,
					_List_Nil,
					_List_fromArray(
						[
							$tesk9$accessible_html$Accessibility$text('Made with '),
							A2(
							$tesk9$accessible_html$Accessibility$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('pink')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('♥')
								])),
							$tesk9$accessible_html$Accessibility$text(' by '),
							A2(
							$tesk9$accessible_html$Accessibility$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://twitter.com/ohanhi')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('@ohanhi')
								])),
							$tesk9$accessible_html$Accessibility$text(' – '),
							$tesk9$accessible_html$Accessibility$text('Open Source on '),
							A2(
							$tesk9$accessible_html$Accessibility$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://github.com/ohanhi/trains')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('GitHub')
								]))
						])),
					A2(
					$tesk9$accessible_html$Accessibility$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('small')
						]),
					_List_fromArray(
						[
							$tesk9$accessible_html$Accessibility$text('Data provided by '),
							A2(
							$tesk9$accessible_html$Accessibility$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://rata.digitraffic.fi/')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('Digitraffic')
								]))
						]))
				])),
		i: A2(
			$tesk9$accessible_html$Accessibility$footer,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$tesk9$accessible_html$Accessibility$p,
					_List_Nil,
					_List_fromArray(
						[
							$tesk9$accessible_html$Accessibility$text('Palvelun tehnyt '),
							A2(
							$tesk9$accessible_html$Accessibility$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('pink')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('♥')
								])),
							$tesk9$accessible_html$Accessibility$text(' '),
							A2(
							$tesk9$accessible_html$Accessibility$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://twitter.com/ohanhi')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('@ohanhi')
								])),
							$tesk9$accessible_html$Accessibility$text(' – '),
							$tesk9$accessible_html$Accessibility$text('Avoin lähdekoodi '),
							A2(
							$tesk9$accessible_html$Accessibility$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://github.com/ohanhi/trains')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('GitHubissa')
								]))
						])),
					A2(
					$tesk9$accessible_html$Accessibility$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('small')
						]),
					_List_fromArray(
						[
							$tesk9$accessible_html$Accessibility$text('Tiedot tarjoaa '),
							A2(
							$tesk9$accessible_html$Accessibility$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://rata.digitraffic.fi/')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('Digitraffic')
								]))
						]))
				])),
		j: A2(
			$tesk9$accessible_html$Accessibility$footer,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$tesk9$accessible_html$Accessibility$p,
					_List_Nil,
					_List_fromArray(
						[
							$tesk9$accessible_html$Accessibility$text('Servicen gjord med '),
							A2(
							$tesk9$accessible_html$Accessibility$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('pink')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('♥')
								])),
							$tesk9$accessible_html$Accessibility$text(' av '),
							A2(
							$tesk9$accessible_html$Accessibility$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://twitter.com/ohanhi')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('@ohanhi')
								])),
							$tesk9$accessible_html$Accessibility$text(' – '),
							$tesk9$accessible_html$Accessibility$text('Öppen källkod på '),
							A2(
							$tesk9$accessible_html$Accessibility$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://github.com/ohanhi/trains')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('GitHub')
								]))
						])),
					A2(
					$tesk9$accessible_html$Accessibility$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('small')
						]),
					_List_fromArray(
						[
							$tesk9$accessible_html$Accessibility$text('Data från '),
							A2(
							$tesk9$accessible_html$Accessibility$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://rata.digitraffic.fi/')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('Digitraffic')
								]))
						]))
				]))
	};
};
var $author$project$Translations$htmlTranslate = F2(
	function (language, key) {
		var translationSet = $author$project$Translations$htmlTranslationSetFor(key);
		switch (language) {
			case 0:
				return translationSet.i;
			case 1:
				return translationSet.h;
			default:
				return translationSet.j;
		}
	});
var $author$project$View$SetLanguage = function (a) {
	return {$: 7, a: a};
};
var $author$project$Translations$allLanguages = _List_fromArray(
	[0, 1, 2]);
var $elm$html$Html$button = _VirtualDom_node('button');
var $tesk9$accessible_html$Accessibility$button = $elm$html$Html$button;
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$View$languageSelect = function (currentLanguage) {
	var optionAttrs = function (lang) {
		return _List_fromArray(
			[
				$elm$html$Html$Attributes$value(
				$author$project$Translations$languageToString(lang)),
				$elm$html$Html$Events$onClick(
				$author$project$View$SetLanguage(lang)),
				$elm$html$Html$Attributes$class(
				_Utils_eq(currentLanguage, lang) ? 'is-current' : '')
			]);
	};
	return A2(
		$tesk9$accessible_html$Accessibility$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('language-select')
			]),
		A2(
			$elm$core$List$map,
			function (lang) {
				return A2(
					$tesk9$accessible_html$Accessibility$button,
					optionAttrs(lang),
					_List_fromArray(
						[
							$tesk9$accessible_html$Accessibility$text(
							$author$project$Translations$languageToString(lang))
						]));
			},
			$author$project$Translations$allLanguages));
};
var $author$project$View$container = F3(
	function (language, headingText, elements) {
		var heading = function () {
			if (!headingText.$) {
				var string = headingText.a;
				return _List_fromArray(
					[
						A2(
						$tesk9$accessible_html$Accessibility$header,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$tesk9$accessible_html$Accessibility$h1,
								_List_Nil,
								_List_fromArray(
									[
										$tesk9$accessible_html$Accessibility$text(string)
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
				$tesk9$accessible_html$Accessibility$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				A2(
					$elm$core$List$cons,
					$author$project$View$languageSelect(language),
					_Utils_ap(heading, elements))),
				A2($author$project$Translations$htmlTranslate, language, 0)
			]);
	});
var $author$project$View$stationName = F2(
	function (stations, shortCode) {
		return A2(
			$elm$core$Maybe$withDefault,
			shortCode,
			A2($elm$core$Dict$get, shortCode, stations));
	});
var $author$project$Translations$SchedulePageEndOfListNote = {$: 18};
var $elm$html$Html$main_ = _VirtualDom_node('main');
var $tesk9$accessible_html$Accessibility$main_ = function (attributes) {
	return $elm$html$Html$main_(
		$tesk9$accessible_html$Accessibility$Utils$nonInteractive(attributes));
};
var $author$project$View$SetShowTrainsViaAirport = function (a) {
	return {$: 8, a: a};
};
var $author$project$Translations$SettingShowTrainsViaAirport = {$: 23};
var $author$project$Translations$SettingShowTrainsViaAirportValue = {$: 24};
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlJson(value));
	});
var $elm$html$Html$Attributes$property = $elm$virtual_dom$VirtualDom$property;
var $tesk9$accessible_html$Accessibility$Aria$indeterminate = A2(
	$elm$html$Html$Attributes$property,
	'indeterminate',
	$elm$json$Json$Encode$bool(true));
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $tesk9$accessible_html$Accessibility$checkbox = F3(
	function (value_, maybeChecked, attributes) {
		return A2(
			$elm$html$Html$input,
			_Utils_ap(
				$tesk9$accessible_html$Accessibility$Utils$nonInteractive(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('checkbox'),
							$elm$html$Html$Attributes$value(value_),
							A2(
							$elm$core$Maybe$withDefault,
							$tesk9$accessible_html$Accessibility$Aria$indeterminate,
							A2($elm$core$Maybe$map, $elm$html$Html$Attributes$checked, maybeChecked))
						])),
				attributes),
			_List_Nil);
	});
var $elm$html$Html$label = _VirtualDom_node('label');
var $tesk9$accessible_html$Accessibility$label = function (attributes) {
	return $elm$html$Html$label(
		$tesk9$accessible_html$Accessibility$Utils$nonInteractive(attributes));
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $tesk9$accessible_html$Accessibility$labelAfter = F3(
	function (attributes, labelContent, input) {
		return A2(
			$tesk9$accessible_html$Accessibility$label,
			attributes,
			_List_fromArray(
				[
					input,
					A2($elm$html$Html$map, $elm$core$Basics$never, labelContent)
				]));
	});
var $elm$html$Html$Events$targetChecked = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'checked']),
	$elm$json$Json$Decode$bool);
var $elm$html$Html$Events$onCheck = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'change',
		A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetChecked));
};
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Model$sortedTrainList = function (trains) {
	return A2(
		$elm$core$List$sortBy,
		function (train) {
			return $elm$time$Time$posixToMillis(train.aU.ac);
		},
		$elm$core$Dict$values(trains));
};
var $author$project$View$scheduleSettings = F3(
	function (t, trainsDict, isChecked) {
		return A2(
			$elm$core$List$any,
			function ($) {
				return $.cC;
			},
			$author$project$Model$sortedTrainList(trainsDict)) ? A2(
			$tesk9$accessible_html$Accessibility$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('schedule-settings')
				]),
			_List_fromArray(
				[
					A3(
					$tesk9$accessible_html$Accessibility$labelAfter,
					_List_Nil,
					$tesk9$accessible_html$Accessibility$text(
						t($author$project$Translations$SettingShowTrainsViaAirport)),
					A3(
						$tesk9$accessible_html$Accessibility$checkbox,
						t($author$project$Translations$SettingShowTrainsViaAirportValue),
						$elm$core$Maybe$Just(isChecked),
						_List_fromArray(
							[
								$elm$html$Html$Events$onCheck($author$project$View$SetShowTrainsViaAirport)
							])))
				])) : $tesk9$accessible_html$Accessibility$text('');
	});
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $author$project$Icons$swap = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$viewBox('0 0 13 13')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$strokeWidth('0.7'),
					$elm$svg$Svg$Attributes$strokeLinecap('round'),
					$elm$svg$Svg$Attributes$stroke('#babdb6'),
					$elm$svg$Svg$Attributes$fill('none'),
					$elm$svg$Svg$Attributes$d('M4 2 v10 M2 4 L4 2 M6 4 L4 2' + 'M8 12 v-10 M6 10 L8 12 M10 10 L8 12')
				]),
			_List_Nil)
		]));
var $author$project$View$SchedulePageRow = 0;
var $author$project$View$ActualTime = function (a) {
	return {$: 2, a: a};
};
var $author$project$Translations$SchedulePageArrived = {$: 13};
var $author$project$Translations$SchedulePageArrivesIn = {$: 12};
var $author$project$Translations$SchedulePageCancelled = {$: 17};
var $author$project$Translations$SchedulePageDepartsIn = {$: 11};
var $author$project$Translations$SchedulePageNotMoving = {$: 16};
var $author$project$Translations$SchedulePageTimeDifference = function (a) {
	return {$: 14, a: a};
};
var $author$project$Translations$SchedulePageTimeDifferenceNonStopping = function (a) {
	return {$: 15, a: a};
};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $author$project$Translations$SchedulePageOvertakenBy = function (a) {
	return {$: 10, a: a};
};
var $author$project$Stations$common = _List_fromArray(
	[
		A2($elm$core$Tuple$pair, 'HKI', 'Helsinki'),
		A2($elm$core$Tuple$pair, 'PSL', 'Pasila')
	]);
var $author$project$Stations$directionLahti = _List_fromArray(
	[
		A2($elm$core$Tuple$pair, 'KÄP', 'Käpylä'),
		A2($elm$core$Tuple$pair, 'OLK', 'Oulunkylä'),
		A2($elm$core$Tuple$pair, 'PMK', 'Pukinmäki'),
		A2($elm$core$Tuple$pair, 'ML', 'Malmi'),
		A2($elm$core$Tuple$pair, 'TNA', 'Tapanila'),
		A2($elm$core$Tuple$pair, 'PLA', 'Puistola'),
		A2($elm$core$Tuple$pair, 'TKL', 'Tikkurila'),
		A2($elm$core$Tuple$pair, 'HKH', 'Hiekkaharju'),
		A2($elm$core$Tuple$pair, 'KVY', 'Koivukylä'),
		A2($elm$core$Tuple$pair, 'RKL', 'Rekola'),
		A2($elm$core$Tuple$pair, 'KRS', 'Korso'),
		A2($elm$core$Tuple$pair, 'SAV', 'Savio'),
		A2($elm$core$Tuple$pair, 'KE', 'Kerava'),
		A2($elm$core$Tuple$pair, 'HAA', 'Haarajoki'),
		A2($elm$core$Tuple$pair, 'MLÄ', 'Mäntsälä'),
		A2($elm$core$Tuple$pair, 'HNN', 'Henna'),
		A2($elm$core$Tuple$pair, 'LH', 'Lahti')
	]);
var $author$project$Stations$directionSiuntio = _List_fromArray(
	[
		A2($elm$core$Tuple$pair, 'ILA', 'Ilmala'),
		A2($elm$core$Tuple$pair, 'HPL', 'Huopalahti'),
		A2($elm$core$Tuple$pair, 'VMO', 'Valimo'),
		A2($elm$core$Tuple$pair, 'PJM', 'Pitäjänmäki'),
		A2($elm$core$Tuple$pair, 'MÄK', 'Mäkkylä'),
		A2($elm$core$Tuple$pair, 'LPV', 'Leppävaara'),
		A2($elm$core$Tuple$pair, 'KIL', 'Kilo'),
		A2($elm$core$Tuple$pair, 'KEA', 'Kera'),
		A2($elm$core$Tuple$pair, 'KNI', 'Kauniainen'),
		A2($elm$core$Tuple$pair, 'KVH', 'Koivuhovi'),
		A2($elm$core$Tuple$pair, 'TRL', 'Tuomarila'),
		A2($elm$core$Tuple$pair, 'EPO', 'Espoo'),
		A2($elm$core$Tuple$pair, 'KLH', 'Kauklahti'),
		A2($elm$core$Tuple$pair, 'MAS', 'Masala'),
		A2($elm$core$Tuple$pair, 'JRS', 'Jorvas'),
		A2($elm$core$Tuple$pair, 'TOL', 'Tolsa'),
		A2($elm$core$Tuple$pair, 'KKN', 'Kirkkonummi'),
		A2($elm$core$Tuple$pair, 'STI', 'Siuntio')
	]);
var $author$project$Stations$directionTampere = _List_fromArray(
	[
		A2($elm$core$Tuple$pair, 'KÄP', 'Käpylä'),
		A2($elm$core$Tuple$pair, 'OLK', 'Oulunkylä'),
		A2($elm$core$Tuple$pair, 'PMK', 'Pukinmäki'),
		A2($elm$core$Tuple$pair, 'ML', 'Malmi'),
		A2($elm$core$Tuple$pair, 'TNA', 'Tapanila'),
		A2($elm$core$Tuple$pair, 'PLA', 'Puistola'),
		A2($elm$core$Tuple$pair, 'TKL', 'Tikkurila'),
		A2($elm$core$Tuple$pair, 'HKH', 'Hiekkaharju'),
		A2($elm$core$Tuple$pair, 'KVY', 'Koivukylä'),
		A2($elm$core$Tuple$pair, 'RKL', 'Rekola'),
		A2($elm$core$Tuple$pair, 'KRS', 'Korso'),
		A2($elm$core$Tuple$pair, 'SAV', 'Savio'),
		A2($elm$core$Tuple$pair, 'KE', 'Kerava'),
		A2($elm$core$Tuple$pair, 'AIN', 'Ainola'),
		A2($elm$core$Tuple$pair, 'JP', 'Järvenpää'),
		A2($elm$core$Tuple$pair, 'SAU', 'Saunakallio'),
		A2($elm$core$Tuple$pair, 'JK', 'Jokela'),
		A2($elm$core$Tuple$pair, 'HY', 'Hyvinkää'),
		A2($elm$core$Tuple$pair, 'RI', 'Riihimäki'),
		A2($elm$core$Tuple$pair, 'RY', 'Ryttylä'),
		A2($elm$core$Tuple$pair, 'TU', 'Turenki'),
		A2($elm$core$Tuple$pair, 'HL', 'Hämeenlinna'),
		A2($elm$core$Tuple$pair, 'PRL', 'Parola'),
		A2($elm$core$Tuple$pair, 'ITA', 'Iittala'),
		A2($elm$core$Tuple$pair, 'TL', 'Toijala'),
		A2($elm$core$Tuple$pair, 'VIA', 'Viiala'),
		A2($elm$core$Tuple$pair, 'LPÄ', 'Lempäälä'),
		A2($elm$core$Tuple$pair, 'TPE', 'Tampere')
	]);
var $author$project$Stations$ringTrackCW = _List_fromArray(
	[
		A2($elm$core$Tuple$pair, 'ILA', 'Ilmala'),
		A2($elm$core$Tuple$pair, 'HPL', 'Huopalahti'),
		A2($elm$core$Tuple$pair, 'POH', 'Pohjois-Haaga'),
		A2($elm$core$Tuple$pair, 'KAN', 'Kannelmäki'),
		A2($elm$core$Tuple$pair, 'MLO', 'Malminkartano'),
		A2($elm$core$Tuple$pair, 'MYR', 'Myyrmäki'),
		A2($elm$core$Tuple$pair, 'LOH', 'Louhela'),
		A2($elm$core$Tuple$pair, 'MRL', 'Martinlaakso'),
		A2($elm$core$Tuple$pair, 'VKS', 'Vantaankoski'),
		A2($elm$core$Tuple$pair, 'VEH', 'Vehkala'),
		A2($elm$core$Tuple$pair, 'KTÖ', 'Kivistö'),
		A2($elm$core$Tuple$pair, 'AVP', 'Aviapolis'),
		A2($elm$core$Tuple$pair, 'LEN', 'Lentoasema (Airport)'),
		A2($elm$core$Tuple$pair, 'LNÄ', 'Leinelä'),
		A2($elm$core$Tuple$pair, 'HKH', 'Hiekkaharju'),
		A2($elm$core$Tuple$pair, 'TKL', 'Tikkurila'),
		A2($elm$core$Tuple$pair, 'PLA', 'Puistola'),
		A2($elm$core$Tuple$pair, 'TNA', 'Tapanila'),
		A2($elm$core$Tuple$pair, 'ML', 'Malmi'),
		A2($elm$core$Tuple$pair, 'PMK', 'Pukinmäki'),
		A2($elm$core$Tuple$pair, 'OLK', 'Oulunkylä'),
		A2($elm$core$Tuple$pair, 'KÄP', 'Käpylä')
	]);
var $author$project$Stations$commuterStations = _List_fromArray(
	[
		_Utils_ap($author$project$Stations$common, $author$project$Stations$directionSiuntio),
		_Utils_ap($author$project$Stations$common, $author$project$Stations$ringTrackCW),
		_Utils_ap($author$project$Stations$common, $author$project$Stations$directionTampere),
		_Utils_ap($author$project$Stations$common, $author$project$Stations$directionLahti)
	]);
var $author$project$Stations$findName = function (abbreviation) {
	return A2(
		$elm$core$Dict$get,
		abbreviation,
		$elm$core$Dict$fromList(
			$elm$core$List$concat($author$project$Stations$commuterStations)));
};
var $ryan_haskell$date_format$DateFormat$HourMilitaryNumber = {$: 24};
var $ryan_haskell$date_format$DateFormat$hourMilitaryNumber = $ryan_haskell$date_format$DateFormat$HourMilitaryNumber;
var $ryan_haskell$date_format$DateFormat$MinuteFixed = {$: 31};
var $ryan_haskell$date_format$DateFormat$minuteFixed = $ryan_haskell$date_format$DateFormat$MinuteFixed;
var $author$project$View$prettyTime = $ryan_haskell$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryan_haskell$date_format$DateFormat$hourMilitaryNumber,
			$ryan_haskell$date_format$DateFormat$text('.'),
			$ryan_haskell$date_format$DateFormat$minuteFixed
		]));
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $author$project$Icons$wagon = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$viewBox('0 0 100 100')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill('#ffffff'),
					$elm$svg$Svg$Attributes$d('M92.87,52.474c-0.971-0.966-2.138-2.062-3.421-3.198c-2.372-2.102-4.564-3.832-5.942-4.733  c-0.073-0.051-0.151-0.097-0.229-0.146c-0.08-0.05-0.156-0.096-0.229-0.14c-0.056-0.032-0.108-0.065-0.165-0.096  c-0.15-0.085-0.282-0.151-0.396-0.199c-1.219-0.58-2.704-0.925-4.312-0.926h-0.002c-0.002,0-0.005-0.001-0.007-0.001  s-0.005,0.001-0.007,0.001H66.84c-0.106-0.202-0.291-0.386-0.545-0.535l3.897-0.669c0.119-0.02,0.215-0.087,0.275-0.176  c0.012-0.017,0.019-0.036,0.027-0.055c0.012-0.025,0.025-0.051,0.032-0.08c0.002-0.006,0.006-0.01,0.007-0.015  c0.003-0.021-0.003-0.04-0.003-0.062c0-0.02,0.006-0.039,0.003-0.061c-0.001-0.006-0.005-0.01-0.007-0.016  c-0.007-0.027-0.021-0.053-0.032-0.079c-0.009-0.019-0.016-0.038-0.027-0.055c-0.061-0.089-0.156-0.156-0.275-0.177l-6.618-1.135  c-0.226-0.038-0.436,0.1-0.472,0.309s0.117,0.41,0.341,0.448l4.462,0.765l-3.846,0.66c-0.882,0.098-1.58,0.461-1.823,0.931H46.224  H42.36H18.403c-0.002,0-0.003-0.001-0.005-0.001s-0.003,0.001-0.006,0.001h-0.001c-1.249,0.001-2.403,0.346-3.35,0.926  c-0.089,0.048-0.191,0.114-0.309,0.199c-0.044,0.03-0.085,0.063-0.127,0.096c-0.013,0.009-0.026,0.021-0.039,0.03  c-1.065,0.736-2.489,1.979-3.951,3.493c-2.066,2.14-3.59,4.183-3.944,5.203c-0.145,0.32-0.235,0.684-0.235,1.08  c0,0.718,0.273,1.35,0.688,1.749l0.003,0.003c0.021,0.021,0.041,0.047,0.063,0.066l1.623,1.679l0.002-0.003  c0.015,0.015,0.028,0.028,0.044,0.04c0.081,0.072,0.178,0.115,0.283,0.115h1.724h1.23h29.812h4.665h39.704h1.584h2.217  c0.136,0,0.261-0.043,0.364-0.115c0.021-0.012,0.039-0.025,0.058-0.04l0.001,0.003l2.09-1.679c0.029-0.02,0.054-0.045,0.081-0.066  l0.005-0.003c0.534-0.399,0.885-1.031,0.885-1.749C93.562,53.436,93.294,52.873,92.87,52.474z M15.746,48.17h-2.821l2.821-2.533  V48.17z M24.614,48.17h-6.507v-2.533h6.507V48.17z M46.142,48.17H33.934v-2.533h12.208V48.17z M60.673,48.17H48.465v-2.533h12.208  V48.17z M68.849,48.17v-2.533h6.508l2.283,2.533H68.849z M81.315,49.726l-3.608-4.069h4.761l4.991,4.069H81.315z')
				]),
			_List_Nil)
		]));
var $author$project$View$metaDataRow = F3(
	function (t, data, current) {
		var wagonCount = function (count) {
			return A2(
				$tesk9$accessible_html$Accessibility$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('train-wagon-count')
					]),
				A2($elm$core$List$repeat, count, $author$project$Icons$wagon));
		}(
			A2(
				$elm$core$Maybe$withDefault,
				0,
				A2($elm$core$Dict$get, current.ax, data.cE)));
		var millis = A2($elm$core$Basics$composeL, $elm$time$Time$posixToMillis, $author$project$Model$mostAccurateTime);
		var overtakeText = A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (train) {
					return t(
						$author$project$Translations$SchedulePageOvertakenBy(
							{
								c_: A2(
									$elm$core$Maybe$withDefault,
									data.c,
									$author$project$Stations$findName(data.c)),
								aI: train.aI,
								dM: A2(
									$author$project$View$prettyTime,
									data.cL,
									$author$project$Model$mostAccurateTime(train.aU))
							}));
				},
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (train) {
							return (_Utils_cmp(
								millis(train.aU),
								millis(current.aU)) > 0) && (_Utils_cmp(
								millis(train.bE),
								millis(current.bE)) < 0);
						},
						data.aB))));
		return A2(
			$tesk9$accessible_html$Accessibility$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('duration')
				]),
			_List_fromArray(
				[
					A2(
					$tesk9$accessible_html$Accessibility$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('duration-text')
						]),
					_List_fromArray(
						[
							A2(
							$tesk9$accessible_html$Accessibility$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('duration-text-content')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text(overtakeText)
								])),
							wagonCount
						]))
				]));
	});
var $author$project$View$LiveEstimate = function (a) {
	return {$: 0, a: a};
};
var $author$project$View$ScheduleEstimate = function (a) {
	return {$: 1, a: a};
};
var $author$project$View$minutesToMillis = function (minutes) {
	return minutes * 60000;
};
var $ryan_haskell$date_format$DateFormat$MinuteNumber = {$: 30};
var $ryan_haskell$date_format$DateFormat$minuteNumber = $ryan_haskell$date_format$DateFormat$MinuteNumber;
var $ryan_haskell$date_format$DateFormat$SecondFixed = {$: 33};
var $ryan_haskell$date_format$DateFormat$secondFixed = $ryan_haskell$date_format$DateFormat$SecondFixed;
var $author$project$View$prettyMinutes = function (posix) {
	var formatted = A3(
		$ryan_haskell$date_format$DateFormat$format,
		_List_fromArray(
			[
				$ryan_haskell$date_format$DateFormat$minuteNumber,
				$ryan_haskell$date_format$DateFormat$text(':'),
				$ryan_haskell$date_format$DateFormat$secondFixed
			]),
		$elm$time$Time$utc,
		posix);
	return formatted;
};
var $author$project$View$prettyBestEstimateFor = F2(
	function (currentTime, timetableRow) {
		var prettyDiff = function (date) {
			return function (millis) {
				return (_Utils_cmp(
					millis,
					$author$project$View$minutesToMillis(30)) < 0) ? $elm$core$Maybe$Just(
					$author$project$View$prettyMinutes(
						$elm$time$Time$millisToPosix(millis))) : $elm$core$Maybe$Nothing;
			}(
				A2(
					$elm$core$Basics$max,
					0,
					$elm$time$Time$posixToMillis(date) - $elm$time$Time$posixToMillis(currentTime)));
		};
		var _v0 = timetableRow.bY;
		if (!_v0.$) {
			var estimate = _v0.a;
			return A2(
				$elm$core$Maybe$map,
				$author$project$View$LiveEstimate,
				prettyDiff(estimate));
		} else {
			return A2(
				$elm$core$Maybe$map,
				$author$project$View$ScheduleEstimate,
				prettyDiff(timetableRow.ac));
		}
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $author$project$View$timelinessColor = function (difference) {
	return ($elm$core$Basics$abs(difference) <= 1) ? 'on-time' : (($elm$core$Basics$abs(difference) <= 5) ? 'slightly-off-schedule' : 'off-schedule');
};
var $author$project$View$stationRow = F3(
	function (zone, stations, station) {
		var name = A2($author$project$View$stationName, stations, station.aj);
		return A2(
			$tesk9$accessible_html$Accessibility$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('train-stations-row')
				]),
			_List_fromArray(
				[
					function () {
					var _v0 = _Utils_Tuple2(station.bY, station.aF);
					if ((!_v0.a.$) && (!_v0.b.$)) {
						var estimate = _v0.a.a;
						var n = _v0.b.a;
						return A2(
							$tesk9$accessible_html$Accessibility$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('train-stations-estimate')
								]),
							_List_fromArray(
								[
									A2(
									$tesk9$accessible_html$Accessibility$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('train-stations-estimate-time'),
											$elm$html$Html$Attributes$class(
											'is-' + $author$project$View$timelinessColor(n))
										]),
									_List_fromArray(
										[
											$tesk9$accessible_html$Accessibility$text(
											A2($author$project$View$prettyTime, zone, estimate))
										])),
									(!(!n)) ? A2(
									$tesk9$accessible_html$Accessibility$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('train-stations-scheduled-inaccurate')
										]),
									_List_fromArray(
										[
											$tesk9$accessible_html$Accessibility$text(
											A2($author$project$View$prettyTime, zone, station.ac))
										])) : $tesk9$accessible_html$Accessibility$text('')
								]));
					} else {
						return A2(
							$tesk9$accessible_html$Accessibility$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('train-stations-estimate')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text(
									A2($author$project$View$prettyTime, zone, station.ac))
								]));
					}
				}(),
					A2(
					$tesk9$accessible_html$Accessibility$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('train-stations-name')
						]),
					_List_fromArray(
						[
							$tesk9$accessible_html$Accessibility$text(name)
						])),
					A2(
					$tesk9$accessible_html$Accessibility$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('train-stations-track')
						]),
					_List_fromArray(
						[
							$tesk9$accessible_html$Accessibility$text(
							A2($elm$core$Maybe$withDefault, '', station.dT))
						]))
				]));
	});
var $author$project$View$trainViewCustom = F4(
	function (kind, t, data, train) {
		var wrapper = function () {
			if (!kind) {
				return $tesk9$accessible_html$Accessibility$a(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href(
							'#/' + (data.a + ('/' + (data.c + ('/' + $elm$core$String$fromInt(train.ax)))))),
							$elm$html$Html$Attributes$class('train'),
							$elm$html$Html$Attributes$id(
							'train-' + $elm$core$String$fromInt(train.ax))
						]));
			} else {
				return $tesk9$accessible_html$Accessibility$div(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('train is-expanded')
						]));
			}
		}();
		var timeDiffTranslation = function (station) {
			var _v7 = station.cs;
			if (_v7.$ === 1) {
				return $author$project$Translations$SchedulePageTimeDifference(
					{
						at: station.aF,
						dF: A2($author$project$View$stationName, data.cr, station.bw)
					});
			} else {
				var prevStopShortCode = _v7.a.dw;
				var nextStopShortCode = _v7.a.di;
				return $author$project$Translations$SchedulePageTimeDifferenceNonStopping(
					{
						at: station.aF,
						dh: A2($author$project$View$stationName, data.cr, nextStopShortCode),
						dv: A2($author$project$View$stationName, data.cr, prevStopShortCode)
					});
			}
		};
		var tText = A2($elm$core$Basics$composeR, t, $tesk9$accessible_html$Accessibility$text);
		var statusInfoBadge = function () {
			var _v5 = _Utils_Tuple2(train.aD, train.bx);
			if (!_v5.a) {
				if (!_v5.b.$) {
					var station = _v5.b.a;
					return A2(
						$tesk9$accessible_html$Accessibility$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('train-status-badge'),
								$elm$html$Html$Attributes$class(
								'is-' + $author$project$View$timelinessColor(station.aF))
							]),
						_List_fromArray(
							[
								tText(
								timeDiffTranslation(station))
							]));
				} else {
					var _v6 = _v5.b;
					return A2(
						$tesk9$accessible_html$Accessibility$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('train-status-badge')
							]),
						_List_fromArray(
							[
								tText($author$project$Translations$SchedulePageNotMoving)
							]));
				}
			} else {
				return A2(
					$tesk9$accessible_html$Accessibility$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('train-status-badge is-cancelled')
						]),
					_List_fromArray(
						[
							tText($author$project$Translations$SchedulePageCancelled)
						]));
			}
		}();
		var _v0 = function () {
			var _v1 = _Utils_Tuple2(train.aU.W, train.bE.W);
			if (!_v1.a.$) {
				if (!_v1.b.$) {
					var time = _v1.b.a;
					return _Utils_Tuple2(
						$elm$core$Maybe$Just(
							$author$project$View$ActualTime(
								A2($author$project$View$prettyTime, data.cL, time))),
						$author$project$Translations$SchedulePageArrived);
				} else {
					var _v2 = _v1.b;
					return _Utils_Tuple2(
						A2($author$project$View$prettyBestEstimateFor, data.aE, train.bE),
						$author$project$Translations$SchedulePageArrivesIn);
				}
			} else {
				return _Utils_Tuple2(
					A2($author$project$View$prettyBestEstimateFor, data.aE, train.aU),
					$author$project$Translations$SchedulePageDepartsIn);
			}
		}();
		var shownEstimate = _v0.a;
		var estimateTranslation = _v0.b;
		return wrapper(
			_List_fromArray(
				[
					A3($author$project$View$metaDataRow, t, data, train),
					A2(
					$tesk9$accessible_html$Accessibility$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('train-content')
						]),
					_List_fromArray(
						[
							A2(
							$tesk9$accessible_html$Accessibility$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('train-name')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text(train.aI)
								])),
							A2(
							$tesk9$accessible_html$Accessibility$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('train-stations')
								]),
							_List_fromArray(
								[
									A3($author$project$View$stationRow, data.cL, data.cr, train.aU),
									A2(
									$tesk9$accessible_html$Accessibility$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('train-stations-row')
										]),
									_List_fromArray(
										[
											A2(
											$tesk9$accessible_html$Accessibility$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('train-stations-separator')
												]),
											_List_fromArray(
												[
													$tesk9$accessible_html$Accessibility$text('︙')
												]))
										])),
									A3($author$project$View$stationRow, data.cL, data.cr, train.bE)
								])),
							A2(
							$tesk9$accessible_html$Accessibility$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('train-status')
								]),
							function () {
								var _v3 = _Utils_Tuple2(train.aD, shownEstimate);
								if ((!_v3.a) && (!_v3.b.$)) {
									var estimate = _v3.b.a;
									return _List_fromArray(
										[
											A2(
											$tesk9$accessible_html$Accessibility$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('train-status-arriving')
												]),
											_List_fromArray(
												[
													tText(estimateTranslation)
												])),
											A2(
											$tesk9$accessible_html$Accessibility$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('train-status-time')
												]),
											_List_fromArray(
												[
													function () {
													switch (estimate.$) {
														case 0:
															var time = estimate.a;
															return $tesk9$accessible_html$Accessibility$text(time);
														case 1:
															var time = estimate.a;
															return $tesk9$accessible_html$Accessibility$text('~' + time);
														default:
															var time = estimate.a;
															return $tesk9$accessible_html$Accessibility$text(time);
													}
												}()
												]))
										]);
								} else {
									return _List_Nil;
								}
							}())
						])),
					statusInfoBadge
				]));
	});
var $author$project$View$trainRow = $author$project$View$trainViewCustom(0);
var $author$project$View$trainsView = F5(
	function (t, model, _v0, heading, trainsDict) {
		var from = _v0.a;
		var to = _v0.b;
		var trains = A2(
			$elm$core$List$filter,
			function (train) {
				return model.a7 || (!train.cC);
			},
			$author$project$Model$sortedTrainList(trainsDict));
		var trainRowData = {aB: trains, aE: model.aE, a: from, cr: model.cr, c: to, cE: model.cE, cL: model.cL};
		return A2(
			$tesk9$accessible_html$Accessibility$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('trains')
				]),
			_List_fromArray(
				[
					A2(
					$tesk9$accessible_html$Accessibility$header,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$tesk9$accessible_html$Accessibility$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('back-link'),
									$elm$html$Html$Attributes$href('#/')
								]),
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text('‹')
								])),
							A2(
							$tesk9$accessible_html$Accessibility$h1,
							_List_Nil,
							_List_fromArray(
								[
									$tesk9$accessible_html$Accessibility$text(heading)
								])),
							A2(
							$tesk9$accessible_html$Accessibility$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('swap-link'),
									$elm$html$Html$Attributes$href('#/' + (to + ('/' + from)))
								]),
							_List_fromArray(
								[$author$project$Icons$swap]))
						])),
					A2(
					$tesk9$accessible_html$Accessibility$main_,
					_List_Nil,
					A2(
						$elm$core$List$map,
						A2($author$project$View$trainRow, t, trainRowData),
						trains)),
					A3($author$project$View$scheduleSettings, t, trainsDict, model.a7),
					A2(
					$tesk9$accessible_html$Accessibility$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('trains-end-of-list')
						]),
					_List_fromArray(
						[
							$tesk9$accessible_html$Accessibility$text(
							t($author$project$Translations$SchedulePageEndOfListNote))
						]))
				]));
	});
var $author$project$View$schedulePage = F3(
	function (t, model, _v0) {
		var from = _v0.a;
		var to = _v0.b;
		var tText = A2($elm$core$Basics$composeL, $tesk9$accessible_html$Accessibility$text, t);
		var minutesSinceLastRequest = function (diff) {
			return diff / 60000;
		}(
			$elm$time$Time$posixToMillis(model.aH) - $elm$time$Time$posixToMillis(model.aE));
		var heading = A2($author$project$View$stationName, model.cr, from) + ('—' + A2($author$project$View$stationName, model.cr, to));
		return {
			aC: A3(
				$author$project$View$container,
				model.a$,
				$elm$core$Maybe$Nothing,
				_List_fromArray(
					[
						function () {
						var _v1 = model.bm;
						switch (_v1.$) {
							case 3:
								var trains = _v1.a;
								return (minutesSinceLastRequest < 5) ? A5(
									$author$project$View$trainsView,
									t,
									model,
									_Utils_Tuple2(from, to),
									heading,
									trains) : A2(
									$tesk9$accessible_html$Accessibility$header,
									_List_Nil,
									_List_fromArray(
										[
											tText($author$project$Translations$SchedulePageLoading)
										]));
							case 2:
								var err = _v1.a;
								return A2(
									$tesk9$accessible_html$Accessibility$div,
									_List_Nil,
									_List_fromArray(
										[
											function () {
											switch (err.$) {
												case 2:
													return tText($author$project$Translations$ErrorNetwork);
												case 1:
													return tText($author$project$Translations$ErrorTimeout);
												case 0:
													return tText($author$project$Translations$ErrorBadUrl);
												case 3:
													return tText($author$project$Translations$ErrorBadStatus);
												default:
													return tText($author$project$Translations$ErrorBadPayload);
											}
										}()
										]));
							case 1:
								return A2(
									$tesk9$accessible_html$Accessibility$header,
									_List_Nil,
									_List_fromArray(
										[
											tText($author$project$Translations$SchedulePageLoading)
										]));
							default:
								return $tesk9$accessible_html$Accessibility$text('');
						}
					}()
					])),
			aP: heading + ' – Trains.today'
		};
	});
var $author$project$Translations$DepPageHeading = {$: 1};
var $author$project$Translations$DepPageTitle = {$: 0};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Stations$all = A2(
	$elm$core$List$sortBy,
	$elm$core$Tuple$second,
	$elm$core$Dict$toList(
		$elm$core$Dict$fromList(
			$elm$core$List$concat($author$project$Stations$commuterStations))));
var $elm$html$Html$li = _VirtualDom_node('li');
var $tesk9$accessible_html$Accessibility$li = function (attributes) {
	return $elm$html$Html$li(
		$tesk9$accessible_html$Accessibility$Utils$nonInteractive(attributes));
};
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $tesk9$accessible_html$Accessibility$ul = function (attributes) {
	return $elm$html$Html$ul(
		$tesk9$accessible_html$Accessibility$Utils$nonInteractive(attributes));
};
var $author$project$View$selectDepPage = F2(
	function (t, model) {
		return {
			aC: A3(
				$author$project$View$container,
				model.a$,
				$elm$core$Maybe$Just(
					t($author$project$Translations$DepPageHeading)),
				_List_fromArray(
					[
						A2(
						$tesk9$accessible_html$Accessibility$ul,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('stations')
							]),
						A2(
							$elm$core$List$map,
							function (_v0) {
								var abbr = _v0.a;
								var name = _v0.b;
								return A2(
									$tesk9$accessible_html$Accessibility$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$tesk9$accessible_html$Accessibility$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('#/' + abbr)
												]),
											_List_fromArray(
												[
													$tesk9$accessible_html$Accessibility$text(name)
												]))
										]));
							},
							$author$project$Stations$all))
					])),
			aP: t($author$project$Translations$DepPageTitle)
		};
	});
var $author$project$Translations$DestPageHeading = {$: 3};
var $author$project$Translations$DestPageTitle = {$: 2};
var $author$project$Stations$matching = function (abbreviation) {
	return A2(
		$elm$core$List$sortBy,
		$elm$core$Tuple$second,
		$elm$core$Dict$toList(
			A2(
				$elm$core$Dict$remove,
				abbreviation,
				$elm$core$Dict$fromList(
					$elm$core$List$concat(
						A2(
							$elm$core$List$filter,
							function (track) {
								return A2(
									$elm$core$Maybe$withDefault,
									false,
									A2(
										$elm$core$Maybe$map,
										function (_v1) {
											return true;
										},
										$elm$core$List$head(
											A2(
												$elm$core$List$filter,
												function (_v0) {
													var abbr = _v0.a;
													return _Utils_eq(abbreviation, abbr);
												},
												track))));
							},
							$author$project$Stations$commuterStations))))));
};
var $author$project$View$selectDestPage = F3(
	function (t, model, dep) {
		var url = function (dest) {
			return '#/' + (dep + ('/' + dest));
		};
		var linkText = function (dest) {
			return A2(
				$elm$core$Maybe$withDefault,
				dest,
				A2(
					$elm$core$Maybe$map,
					function (name) {
						return name + ('–' + dest);
					},
					$author$project$Stations$findName(dep)));
		};
		return {
			aC: A3(
				$author$project$View$container,
				model.a$,
				$elm$core$Maybe$Just(
					t($author$project$Translations$DestPageHeading)),
				_List_fromArray(
					[
						A2(
						$tesk9$accessible_html$Accessibility$ul,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('stations')
							]),
						A2(
							$elm$core$List$map,
							function (_v0) {
								var abbr = _v0.a;
								var name = _v0.b;
								return A2(
									$tesk9$accessible_html$Accessibility$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$tesk9$accessible_html$Accessibility$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href(
													url(abbr))
												]),
											_List_fromArray(
												[
													$tesk9$accessible_html$Accessibility$text(
													linkText(name))
												]))
										]));
							},
							$author$project$Stations$matching(dep)))
					])),
			aP: t($author$project$Translations$DestPageTitle)
		};
	});
var $author$project$Translations$TrainPageHeading = function (a) {
	return {$: 19, a: a};
};
var $krisajenkins$remotedata$RemoteData$map = F2(
	function (f, data) {
		switch (data.$) {
			case 3:
				var value = data.a;
				return $krisajenkins$remotedata$RemoteData$Success(
					f(value));
			case 1:
				return $krisajenkins$remotedata$RemoteData$Loading;
			case 0:
				return $krisajenkins$remotedata$RemoteData$NotAsked;
			default:
				var error = data.a;
				return $krisajenkins$remotedata$RemoteData$Failure(error);
		}
	});
var $krisajenkins$remotedata$RemoteData$withDefault = F2(
	function (_default, data) {
		if (data.$ === 3) {
			var x = data.a;
			return x;
		} else {
			return _default;
		}
	});
var $krisajenkins$remotedata$RemoteData$toMaybe = A2(
	$elm$core$Basics$composeR,
	$krisajenkins$remotedata$RemoteData$map($elm$core$Maybe$Just),
	$krisajenkins$remotedata$RemoteData$withDefault($elm$core$Maybe$Nothing));
var $author$project$View$TrainPageCard = 1;
var $author$project$View$trainPageCard = $author$project$View$trainViewCustom(1);
var $author$project$View$trainPage = F4(
	function (t, model, _v0, trainNumber) {
		var from = _v0.a;
		var to = _v0.b;
		var trainRowData = {aB: _List_Nil, aE: model.aE, a: from, cr: model.cr, c: to, cE: model.cE, cL: model.cL};
		var maybeTrain = A2(
			$elm$core$Maybe$andThen,
			function (trains) {
				return A2($elm$core$Dict$get, trainNumber, trains);
			},
			$krisajenkins$remotedata$RemoteData$toMaybe(model.bm));
		var heading = function () {
			if (!maybeTrain.$) {
				var train = maybeTrain.a;
				return t(
					$author$project$Translations$TrainPageHeading(
						{aI: train.aI}));
			} else {
				return '';
			}
		}();
		return {
			aC: A3(
				$author$project$View$container,
				model.a$,
				$elm$core$Maybe$Just(heading),
				_List_fromArray(
					[
						function () {
						if (!maybeTrain.$) {
							var train = maybeTrain.a;
							return A3($author$project$View$trainPageCard, t, trainRowData, train);
						} else {
							return $tesk9$accessible_html$Accessibility$text('');
						}
					}()
					])),
			aP: heading
		};
	});
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$String$endsWith = _String_endsWith;
var $author$project$FinnishConjugation$keepBestMatch = F2(
	function (name, rules) {
		return $elm$core$List$head(
			$elm$core$List$reverse(
				A2(
					$elm$core$List$filterMap,
					function (rule) {
						return function (remaining) {
							return ($elm$core$List$length(remaining) > 0) ? $elm$core$Maybe$Just(rule) : $elm$core$Maybe$Nothing;
						}(
							A2(
								$elm$core$List$filter,
								function (ending) {
									return A2(
										$elm$core$String$endsWith,
										$elm$core$String$toUpper(ending),
										$elm$core$String$toUpper(name));
								},
								rule.d));
					},
					rules)));
	});
var $author$project$FinnishConjugation$ruleset = _List_fromArray(
	[
		{
		d: _List_fromArray(
			['a']),
		a: 'sta',
		b: 'ssa',
		e: 0,
		c: 'an'
	},
		{
		d: _List_fromArray(
			['e']),
		a: 'stä',
		b: 'ssä',
		e: 0,
		c: 'en'
	},
		{
		d: _List_fromArray(
			['i']),
		a: 'stä',
		b: 'ssä',
		e: 0,
		c: 'in'
	},
		{
		d: _List_fromArray(
			['o']),
		a: 'sta',
		b: 'ssa',
		e: 0,
		c: 'on'
	},
		{
		d: _List_fromArray(
			['u']),
		a: 'sta',
		b: 'ssa',
		e: 0,
		c: 'un'
	},
		{
		d: _List_fromArray(
			['y']),
		a: 'stä',
		b: 'ssä',
		e: 0,
		c: 'yn'
	},
		{
		d: _List_fromArray(
			['ä']),
		a: 'stä',
		b: 'ssä',
		e: 0,
		c: 'än'
	},
		{
		d: _List_fromArray(
			['ö']),
		a: 'stä',
		b: 'ssä',
		e: 0,
		c: 'ön'
	},
		{
		d: _List_fromArray(
			['pori', 'uri', 'ari', 'ani']),
		a: 'sta',
		b: 'ssa',
		e: 0,
		c: 'in'
	},
		{
		d: _List_fromArray(
			['meri', 'veri']),
		a: 'essä',
		b: 'estä',
		e: 1,
		c: 'ereen'
	},
		{
		d: _List_fromArray(
			['s']),
		a: 'ksesta',
		b: 'ksessa',
		e: 1,
		c: 'kseen'
	},
		{
		d: _List_fromArray(
			['Muhos']),
		a: 'kselta',
		b: 'ksella',
		e: 1,
		c: 'kselle'
	},
		{
		d: _List_fromArray(
			['aus']),
		a: 'desta',
		b: 'dessa',
		e: 1,
		c: 'teen'
	},
		{
		d: _List_fromArray(
			['as', 'es']),
		a: 'ksesta',
		b: 'ksessa',
		e: 1,
		c: 'kseen'
	},
		{
		d: _List_fromArray(
			['by']),
		a: 'stä',
		b: 'ssä',
		e: 0,
		c: 'hyn'
	},
		{
		d: _List_fromArray(
			['ali', 'oli', 'uli', 'nti', 'nni']),
		a: 'sta',
		b: 'ssa',
		e: 0,
		c: 'in'
	},
		{
		d: _List_fromArray(
			['lta']),
		a: 'lasta',
		b: 'lassa',
		e: 2,
		c: 'taan'
	},
		{
		d: _List_fromArray(
			['he']),
		a: 'sta',
		b: 'ssa',
		e: 0,
		c: 'en'
	},
		{
		d: _List_fromArray(
			['kka', 'haka']),
		a: 'asta',
		b: 'assa',
		e: 2,
		c: 'kaan'
	},
		{
		d: _List_fromArray(
			['kkä']),
		a: 'ästä',
		b: 'ässä',
		e: 2,
		c: 'kään'
	},
		{
		d: _List_fromArray(
			['nta']),
		a: 'nasta',
		b: 'nassa',
		e: 2,
		c: 'taan'
	},
		{
		d: _List_fromArray(
			['nki']),
		a: 'ngistä',
		b: 'ngissä',
		e: 3,
		c: 'nkiin'
	},
		{
		d: _List_fromArray(
			['nko']),
		a: 'ngosta',
		b: 'ngossa',
		e: 3,
		c: 'nkoon'
	},
		{
		d: _List_fromArray(
			['pere']),
		a: 'elta',
		b: 'ella',
		e: 0,
		c: 'elle'
	},
		{
		d: _List_fromArray(
			['pele']),
		a: 'eltä',
		b: 'ellä',
		e: 0,
		c: 'elle'
	},
		{
		d: _List_fromArray(
			['rku', 'kku']),
		a: 'usta',
		b: 'ussa',
		e: 2,
		c: 'kuun'
	},
		{
		d: _List_fromArray(
			['ee']),
		a: 'ltä',
		b: 'llä',
		e: 0,
		c: 'lle'
	},
		{
		d: _List_fromArray(
			['ii']),
		a: 'stä',
		b: 'ssä',
		e: 0,
		c: 'hin'
	},
		{
		d: _List_fromArray(
			['uu']),
		a: 'sta',
		b: 'ssa',
		e: 0,
		c: 'hun'
	},
		{
		d: _List_fromArray(
			['aa', 'oo']),
		a: 'sta',
		b: 'ssa',
		e: 0,
		c: 'seen'
	},
		{
		d: _List_fromArray(
			['maa', 'taa', 'ria', 'pua', 'uma', 'tra', 'ava', 'jaa', 'ruu', 'kia', 'suo']),
		a: 'lta',
		b: 'lla',
		e: 0,
		c: 'lle'
	},
		{
		d: _List_fromArray(
			['iä', 'kää', 'pää']),
		a: 'ltä',
		b: 'llä',
		e: 0,
		c: 'lle'
	},
		{
		d: _List_fromArray(
			['vik']),
		a: 'istä',
		b: 'issä',
		e: 0,
		c: 'iin'
	},
		{
		d: _List_fromArray(
			['vio']),
		a: 'lta',
		b: 'lla',
		e: 0,
		c: 'lle'
	},
		{
		d: _List_fromArray(
			['inen']),
		a: 'isista',
		b: 'isissa',
		e: 4,
		c: 'isiin'
	},
		{
		d: _List_fromArray(
			['äinen', 'öinen']),
		a: 'isistä',
		b: 'isissä',
		e: 4,
		c: 'isiin'
	},
		{
		d: _List_fromArray(
			['Joroinen']),
		a: 'isilta',
		b: 'isilla',
		e: 4,
		c: 'isille'
	},
		{
		d: _List_fromArray(
			['harju']),
		a: 'lta',
		b: 'lla',
		e: 0,
		c: 'lle'
	},
		{
		d: _List_fromArray(
			['hiekkaharju', 'uimaharju']),
		a: 'sta',
		b: 'ssa',
		e: 0,
		c: 'un'
	},
		{
		d: _List_fromArray(
			['nummi']),
		a: 'elta',
		b: 'ella',
		e: 1,
		c: 'elle'
	},
		{
		d: _List_fromArray(
			['järvi']),
		a: 'eltä',
		b: 'ellä',
		e: 1,
		c: 'elle'
	},
		{
		d: _List_fromArray(
			['vesi']),
		a: 'deltä',
		b: 'dellä',
		e: 2,
		c: 'delle'
	},
		{
		d: _List_fromArray(
			['npää']),
		a: 'stä',
		b: 'ssä',
		e: 0,
		c: 'hän'
	},
		{
		d: _List_fromArray(
			['koski', 'salmi']),
		a: 'elta',
		b: 'ella',
		e: 1,
		c: 'elle'
	},
		{
		d: _List_fromArray(
			['ore']),
		a: 'elta',
		b: 'ella',
		e: 0,
		c: 'elle'
	},
		{
		d: _List_fromArray(
			['saari']),
		a: 'esta',
		b: 'essa',
		e: 1,
		c: 'een'
	},
		{
		d: _List_fromArray(
			['lahti']),
		a: 'desta',
		b: 'dessa',
		e: 2,
		c: 'teen'
	},
		{
		d: _List_fromArray(
			['kesälahti', 'talvilahti', 'lapinlahti']),
		a: 'delta',
		b: 'della',
		e: 2,
		c: 'delle'
	},
		{
		d: _List_fromArray(
			['vuori']),
		a: 'elta',
		b: 'ella',
		e: 1,
		c: 'elle'
	},
		{
		d: _List_fromArray(
			['laajavuori', 'punavuori']),
		a: 'esta',
		b: 'essa',
		e: 1,
		c: 'een'
	},
		{
		d: _List_fromArray(
			['joki']),
		a: 'joelta',
		b: 'joella',
		e: 4,
		c: 'joelle'
	},
		{
		d: _List_fromArray(
			['mäki']),
		a: 'mäeltä',
		b: 'mäellä',
		e: 4,
		c: 'mäelle'
	},
		{
		d: _List_fromArray(
			['tunturi']),
		a: 'lta',
		b: 'lla',
		e: 0,
		c: 'lle'
	},
		{
		d: _List_fromArray(
			['kannelmäki', 'pukinmäki', 'myyrmäki']),
		a: 'estä',
		b: 'essä',
		e: 2,
		c: 'keen'
	},
		{
		d: _List_fromArray(
			['asema']),
		a: 'lta',
		b: 'lla',
		e: 0,
		c: 'lle'
	},
		{
		d: _List_fromArray(
			['otelli']),
		a: 'sta',
		b: 'ssa',
		e: 0,
		c: 'in'
	},
		{
		d: _List_fromArray(
			['hovi']),
		a: 'sta',
		b: 'ssa',
		e: 0,
		c: 'in'
	},
		{
		d: _List_fromArray(
			['selkä']),
		a: 'ältä',
		b: 'ällä',
		e: 2,
		c: 'älle'
	},
		{
		d: _List_fromArray(
			['tti']),
		a: 'ista',
		b: 'issa',
		e: 2,
		c: 'tiin'
	},
		{
		d: _List_fromArray(
			['kki']),
		a: 'ista',
		b: 'issa',
		e: 2,
		c: 'kiin'
	},
		{
		d: _List_fromArray(
			['retti', 'pirtti']),
		a: 'istä',
		b: 'issä',
		e: 2,
		c: 'tiin'
	},
		{
		d: _List_fromArray(
			['Suomu', 'Ruka', 'Tahko', 'Luosto', 'Malmi']),
		a: 'lta',
		b: 'lla',
		e: 0,
		c: 'lle'
	},
		{
		d: _List_fromArray(
			['Levi', 'Pyhä']),
		a: 'ltä',
		b: 'llä',
		e: 0,
		c: 'lle'
	},
		{
		d: _List_fromArray(
			['Kangasala']),
		a: 'alta',
		b: 'alla',
		e: 3,
		c: 'alle'
	},
		{
		d: _List_fromArray(
			['nki Lentoasema']),
		a: 'ngin Lentoasemalta',
		b: 'ngin Lentoasemalla',
		e: 14,
		c: 'ngin Lentoasemalle'
	},
		{
		d: _List_fromArray(
			['Turenki']),
		a: 'gista',
		b: 'gissa',
		e: 2,
		c: 'kiin'
	},
		{
		d: _List_fromArray(
			['lampi']),
		a: 'mista',
		b: 'missa',
		e: 2,
		c: 'mille'
	}
	]);
var $author$project$FinnishConjugation$conjugate = function (name) {
	return A2(
		$elm$core$Maybe$map,
		function (rule) {
			var base = A2($elm$core$String$dropRight, rule.e, name);
			return {
				a: _Utils_ap(base, rule.a),
				b: _Utils_ap(base, rule.b),
				c: _Utils_ap(base, rule.c)
			};
		},
		A2($author$project$FinnishConjugation$keepBestMatch, name, $author$project$FinnishConjugation$ruleset));
};
var $author$project$Translations$finnishInessive = function (stationName) {
	var _v0 = $author$project$FinnishConjugation$conjugate(stationName);
	if (!_v0.$) {
		var in_ = _v0.a.b;
		return in_;
	} else {
		return '- ' + stationName;
	}
};
var $author$project$Translations$timeDifferenceTranslationSet = function (_v0) {
	var minuteDiff = _v0.at;
	var suffixes = _v0.bh;
	var absDiff = $elm$core$Basics$abs(minuteDiff);
	var absDiffString = $elm$core$String$fromInt(absDiff);
	return (absDiff <= 1) ? {h: 'On time ' + suffixes.h, i: 'Ajallaan ' + suffixes.i, j: 'Enligt tidtabell ' + suffixes.j} : ((minuteDiff < 0) ? {h: absDiffString + (' min early ' + suffixes.h), i: absDiffString + (' min ajoissa ' + suffixes.i), j: absDiffString + (' min i förtid ' + suffixes.j)} : {h: absDiffString + (' min late ' + suffixes.h), i: absDiffString + (' min myöhässä ' + suffixes.i), j: absDiffString + (' min sen ' + suffixes.j)});
};
var $author$project$Translations$timeDifferenceTranslationSetNonStopping = function (_v0) {
	var minuteDiff = _v0.at;
	var prevStationName = _v0.dv;
	var nextStationName = _v0.dh;
	return $author$project$Translations$timeDifferenceTranslationSet(
		{
			at: minuteDiff,
			bh: {h: 'between ' + (prevStationName + (' and ' + nextStationName)), i: 'välillä ' + (prevStationName + ('–' + nextStationName)), j: 'mellan ' + (prevStationName + (' och ' + nextStationName))}
		});
};
var $author$project$Translations$timeDifferenceTranslationSetStopping = function (_v0) {
	var minuteDiff = _v0.at;
	var stationName = _v0.dF;
	return $author$project$Translations$timeDifferenceTranslationSet(
		{
			at: minuteDiff,
			bh: {
				h: 'in ' + stationName,
				i: $author$project$Translations$finnishInessive(stationName),
				j: 'i ' + stationName
			}
		});
};
var $author$project$Translations$translationSetFor = function (translationKey) {
	switch (translationKey.$) {
		case 0:
			return {h: 'Trains.today - Helsinki region commuter trains', i: 'Trains.today - Helsingin seudun lähijunat', j: 'Trains.today - Helsingfors regions närtåg'};
		case 1:
			return {h: 'Select departure station', i: 'Valitse lähtöasema', j: 'Välj startstation'};
		case 2:
			return {h: 'Select destination - Trains.today', i: 'Valitse pääteasema - Trains.today', j: 'Välj slutstation - Trains.today'};
		case 3:
			return {h: 'Select destination station', i: 'Valitse pääteasema', j: 'Välj slutstation'};
		case 4:
			return {h: 'No connection, trying again soon...', i: 'Ei yhteyttä, yritetään pian uudestaan...', j: 'Ingen anslutning, försöker pånytt snart...'};
		case 5:
			return {h: 'Network timed out', i: 'Vastaus aikakatkaistiin', j: 'Svaret tidsavbröts'};
		case 6:
			return {h: 'It\'s not you, it\'s me. I have the server address wrong.', i: 'Vika on minussa. Palvelimen osoite on väärä.', j: 'Det är mitt fel. Serverns adress är felaktig.'};
		case 7:
			return {h: 'The server didn\'t like the request (bad status).', i: 'Palvelin ei tykännyt pyynnöstä (virheellinen status).', j: 'Servern tyckte inte om förfrågan (bad request).'};
		case 8:
			return {h: 'Ouch, the server responded with strange contents.', i: 'Auts, palvelin vastasi oudolla sisällöllä.', j: 'Aj, servern svarade med något konstigt.'};
		case 9:
			return {h: 'Loading', i: 'Ladataan', j: 'Laddar'};
		case 10:
			var lineId = translationKey.a.aI;
			var time = translationKey.a.dM;
			var endStationName = translationKey.a.c_;
			return {
				h: lineId + ('-train (' + (time + (') will reach ' + (endStationName + ' earlier!')))),
				i: lineId + ('-juna (' + (time + (') on aiemmin perillä ' + ($author$project$Translations$finnishInessive(endStationName) + '!')))),
				j: lineId + ('-tåg (' + (time + (') anländer tidigare i ' + (endStationName + '!'))))
			};
		case 11:
			return {h: 'Departs in', i: 'Lähtöön', j: 'Avgår om'};
		case 12:
			return {h: 'Arriving in', i: 'Perillä', j: 'Anländar'};
		case 13:
			return {h: 'Arrived at', i: 'Saapui', j: 'Anlände'};
		case 14:
			var facts = translationKey.a;
			return $author$project$Translations$timeDifferenceTranslationSetStopping(facts);
		case 15:
			var facts = translationKey.a;
			return $author$project$Translations$timeDifferenceTranslationSetNonStopping(facts);
		case 16:
			return {h: 'Not moving', i: 'Ei vielä liikkeellä', j: 'Stillastående'};
		case 17:
			return {h: 'Cancelled', i: 'Peruttu', j: 'Inhiberat'};
		case 18:
			return {h: 'Only direct trains departing in 2 hours are displayed.', i: 'Vain suorat 2 tunnin kuluessa lähtevät junat näytetään.', j: 'Bara direkta tåg som avgår inom 2 timmar visas.'};
		case 19:
			var lineId = translationKey.a.aI;
			return {h: lineId + ' train', i: lineId + '-juna', j: lineId + '-tåg'};
		case 20:
			return {h: 'Settings', i: 'Asetukset', j: 'Inställningar'};
		case 21:
			return {h: 'Settings', i: 'Asetukset', j: 'Inställningar'};
		case 22:
			return {h: 'Select language', i: 'Valitse kieli', j: 'Välj språk'};
		case 23:
			return {h: 'Show trains going via the Airport', i: 'Näytä Lentoaseman kautta kulkevat junat', j: 'Se tåg som går via Flygplatsen'};
		default:
			return {h: 'Yes', i: 'Kyllä', j: 'Ja'};
	}
};
var $author$project$Translations$translate = F2(
	function (language, translationKey) {
		var translationSet = $author$project$Translations$translationSetFor(translationKey);
		switch (language) {
			case 0:
				return translationSet.i;
			case 1:
				return translationSet.h;
			default:
				return translationSet.j;
		}
	});
var $author$project$View$view = function (model) {
	var t = $author$project$Translations$translate(model.a$);
	var _v0 = model.a5;
	switch (_v0.$) {
		case 0:
			return A2($author$project$View$selectDepPage, t, model);
		case 1:
			var dep = _v0.a;
			return A3($author$project$View$selectDestPage, t, model, dep);
		case 2:
			var from = _v0.a;
			var to = _v0.b;
			return A3(
				$author$project$View$schedulePage,
				t,
				model,
				_Utils_Tuple2(from, to));
		default:
			var from = _v0.a;
			var to = _v0.b;
			var trainNumber = _v0.c;
			return A4(
				$author$project$View$trainPage,
				t,
				model,
				_Utils_Tuple2(from, to),
				trainNumber);
	}
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{c8: $author$project$Main$init, dq: $author$project$View$UrlChange, dr: $author$project$View$LinkClicked, dJ: $author$project$Main$subscriptions, dV: $author$project$Main$update, dW: $author$project$View$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (timestamp) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (storedState) {
					return $elm$json$Json$Decode$succeed(
						{bg: storedState, bk: timestamp});
				},
				A2($elm$json$Json$Decode$field, 'storedState', $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$field, 'timestamp', $elm$json$Json$Decode$int)))(0)}});}(this));