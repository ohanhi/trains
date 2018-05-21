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
		_Error_throw(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Error_throw(9, moduleName, region, value, message);
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
				+ _Debug_toAnsiString(ansi, elm_lang$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm_lang$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm_lang$core$Array$toList(value));
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
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
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



function _Error_throw_UNUSED(identifier)
{
	throw new Error('https://github.com/elm-lang/core/blob/master/hints/' + identifier + '.md');
}


function _Error_throw(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('Internal red-black tree invariant violated');

		case 1:
			var url = fact1;
			throw new Error('Cannot navigate to the following URL. It seems to be invalid:\n' + url);

		case 2:
			var message = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + message);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Error_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Error_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm-lang/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Error_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}

function _Error_dictBug()
{
	_Error_throw(0);
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
		typeof x === 'function' && _Error_throw(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm_lang$core$Set$toList(x);
		y = elm_lang$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm_lang$core$Dict$toList(x);
		y = elm_lang$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm_lang$core$Dict$toList(x);
		y = elm_lang$core$Dict$toList(y);
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
	if (!x.$)
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
	return n < 0 ? elm_lang$core$Basics$LT : n ? elm_lang$core$Basics$GT : elm_lang$core$Basics$EQ;
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
		return ord === elm_lang$core$Basics$EQ ? 0 : ord === elm_lang$core$Basics$LT ? -1 : 1;
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
		? _Error_throw(11)
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



// SEND REQUEST

var _Http_toTask = F2(function(request, maybeProgress)
{
	return _Scheduler_binding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		_Http_configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_Scheduler_fail(elm_lang$http$Http$NetworkError));
		});
		xhr.addEventListener('timeout', function() {
			callback(_Scheduler_fail(elm_lang$http$Http$Timeout));
		});
		xhr.addEventListener('load', function() {
			callback(_Http_handleResponse(xhr, request.expect.a));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail(elm_lang$http$Http$BadUrl(request.url)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.body;
		xhr.send(elm_lang$http$Http$Internal$isStringBody(body)
			? (xhr.setRequestHeader('Content-Type', body.a), body.b)
			: body.a
		);

		return function() { xhr.abort(); };
	});
});

function _Http_configureProgress(xhr, maybeProgress)
{
	if (!elm_lang$core$Maybe$isJust(maybeProgress))
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_Scheduler_rawSpawn(maybeProgress.a({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.expect.b;
	xhr.withCredentials = request.withCredentials;

	elm_lang$core$Maybe$isJust(request.timeout) && (xhr.timeout = request.timeout.a);
}


// RESPONSES

function _Http_handleResponse(xhr, responseToResult)
{
	var response = _Http_toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(elm_lang$http$Http$BadStatus(response));
	}

	var result = responseToResult(response);

	if (elm_lang$core$Result$isOk(result))
	{
		return _Scheduler_succeed(result.a);
	}
	else
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(elm_lang$http$Http$BadPayload(result.a, response));
	}
}

function _Http_toResponse(xhr)
{
	return {
		url: xhr.responseURL,
		status: { code: xhr.status, message: xhr.statusText },
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		body: xhr.response
	};
}

function _Http_parseHeaders(rawHeaders)
{
	var headers = elm_lang$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm_lang$core$Dict$update, key, function(oldValue) {
				return elm_lang$core$Maybe$Just(elm_lang$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function _Http_expectStringResponse(responseToResult)
{
	return {
		$: 0,
		b: 'text',
		a: responseToResult
	};
}

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		b: expect.b,
		a: function(response) {
			var convertedResponse = expect.a(response);
			return A2(elm_lang$core$Result$map, func, convertedResponse);
		}
	};
});


// BODY

function _Http_multipart(parts)
{


	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}

	return elm_lang$http$Http$Internal$FormDataBody(formData);
}



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

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
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
		return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
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
		case 3:
			return (typeof value === 'boolean')
				? elm_lang$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm_lang$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm_lang$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm_lang$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm_lang$core$Result$Ok(value)
				: (value instanceof String)
					? elm_lang$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm_lang$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm_lang$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm_lang$core$Result$isOk(result)) ? result : elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm_lang$core$Result$isOk(result)) ? result : elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
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
					if (!elm_lang$core$Result$isOk(result))
					{
						return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm_lang$core$Result$Ok(elm_lang$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm_lang$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm_lang$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm_lang$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm_lang$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm_lang$core$Result$Err(elm_lang$json$Json$Decode$OneOf(elm_lang$core$List$reverse(errors)));

		case 1:
			return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm_lang$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm_lang$core$Result$isOk(result))
		{
			return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm_lang$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm_lang$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
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

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
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
	return JSON.stringify(_Json_unwrap(value), null, indentLevel);
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
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
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
		? elm_lang$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm_lang$core$Maybe$Nothing;
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

function _String_toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return elm_lang$core$Maybe$Nothing;
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return elm_lang$core$Maybe$Nothing;
		}
		return elm_lang$core$Maybe$Just(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && ((c !== '-' && c !== '+') || len === 1)))
	{
		return elm_lang$core$Maybe$Nothing;
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return elm_lang$core$Maybe$Nothing;
		}
	}

	return elm_lang$core$Maybe$Just(parseInt(s, 10));
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm_lang$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm_lang$core$Maybe$Just(n) : elm_lang$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}





// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, object)
{
	object['worker'] = function(flags)
	{
		return _Platform_initialize(
			flagDecoder,
			flags,
			impl.init,
			impl.update,
			impl.subscriptions,
			function() { return function() {} }
		);
	};
	return object;
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, flags, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(flags));
	elm_lang$core$Result$isOk(result) || _Error_throw(2, result.a);
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
// This is used by code in elm-lang/browser and elm-lang/http
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
		_Error_throw(3, name)
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

	var init = _Scheduler_succeed(null);

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

		elm_lang$core$Result$isOk(result) || _Error_throw(4, name, result.a);

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
			? (typeof name === 'function')
				? _Error_throw(6)
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
			? (typeof name === 'function')
				? _Error_throw(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
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


var _Parser_isAsciiChar = F3(function(char, offset, string)
{
	return char[0] === string[offset];
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
		return elm_lang$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm_lang$core$Maybe$Nothing;
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
			A2(elm_lang$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm_lang$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm_lang$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}




// HELPERS


var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, object)
{
	// NOTE: this function needs _Platform_export available to work
	object['embed'] = function(node)
	{
		node.parentNode.replaceChild(
			_VirtualDom_render(virtualNode, function() {}),
			node
		);
	};
	return object;
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
	return /^\s*javascript:/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^\s*javascript:/i.test(value)
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
	var tag = elm_lang$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			A3(elm_lang$json$Json$Decode$map2,
				!tag
					? _VirtualDom_mapTimed
					:
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm_lang$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapTimed = F2(function(func, timed)
{
	return {
		$: timed.$,
		a: func(timed.a)
	};
});

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(
		_VirtualDom_mapTimed(func, tuple.a),
		tuple.b
	);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: _VirtualDom_mapTimed(func, record.message),
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
		(key !== 'value' || domNode[key] !== value) && (domNode[key] = value);
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
		value
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

		value
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
			&& { passive: elm_lang$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
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

		if (!elm_lang$core$Result$isOk(result))
		{
			return;
		}

		var ok = result.a;
		var timedMsg = _VirtualDom_eventToTimedMsg(event, elm_lang$virtual_dom$VirtualDom$toHandlerInt(handler), ok);
		var message = timedMsg.a;
		var currentEventNode = eventNode;
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger === 'function')
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
		currentEventNode(message, elm_lang$virtual_dom$VirtualDom$isSync(timedMsg));
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ === y.$ && _Json_equality(x.a, y.a);
}

function _VirtualDom_eventToTimedMsg(event, tag, value)
{
	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	if (!tag)
	{
		return value;
	}

	if (tag === 1 ? value.b : tag === 3 && value.stopPropagation) event.stopPropagation();
	if (tag === 2 ? value.b : tag === 3 && value.preventDefault) event.preventDefault();

	return tag < 3 ? value.a : value.message;
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
		if (xValue === yValue && xKey !== 'value'
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
		_VirtualDom_pushPatch(patches, 6, index, xLen - yLen);
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, yKids.slice(xLen));
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
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
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
			v: localPatches,
			w: inserts,
			x: endInserts
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
			y: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, z: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, z: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.y, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			v: subPatches,
			z: entry
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
			y: vnode,
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
		_VirtualDom_diffHelp(vnode, entry.y, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			v: subPatches,
			z: entry
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

			var subPatches = patch.s.v;
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
				data.z.s = domNode;
				var subPatches = data.v;
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
			var i = patch.s;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 7:
			var newNodes = patch.s;
			for (var i = 0; i < newNodes.length; i++)
			{
				_VirtualDom_appendChild(domNode, _VirtualDom_render(newNodes[i], patch.u));
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.z;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.v);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Error_throw(10); // 'Ran into an unknown patch!'
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
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.x, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.v);

	// inserts
	var inserts = data.w;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.z;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.y, patch.u);
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
		var entry = insert.z;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.y, patch.u)
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
	// else is normal NODE


	// ATTRIBUTES

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

	// NODES

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


var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// FAKE NAVIGATION


function _Browser_go(n)
{
	return _Scheduler_binding(function(callback)
	{
		if (n !== 0)
		{
			history.go(n);
		}
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


function _Browser_pushState(url)
{
	return _Scheduler_binding(function(callback)
	{
		history.pushState({}, '', url);
		callback(_Scheduler_succeed(_Browser_getUrl()));
	});
}


function _Browser_replaceState(url)
{
	return _Scheduler_binding(function(callback)
	{
		history.replaceState({}, '', url);
		callback(_Scheduler_succeed(_Browser_getUrl()));
	});
}



// REAL NAVIGATION


function _Browser_reload(skipCache)
{
	return _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	});
}

function _Browser_load(url)
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	});
}



// GET URL


function _Browser_getUrl()
{
	return _VirtualDom_doc.location.href;
}



// DETECT IE11 PROBLEMS


function _Browser_isInternetExplorer11()
{
	return window.navigator.userAgent.indexOf('Trident') !== -1;
}



// INVALID URL


function _Browser_invalidUrl(url)
{
	_Error_throw(1, url);
}


// PROGRAMS


var _Browser_staticPage = F4(function(virtualNode, flagDecoder, debugMetadata, object)
{
	object['embed'] = function(node)
	{
		node.parentNode.replaceChild(
			_VirtualDom_render(virtualNode, function() {}),
			node
		);
	};
	return object;
});


var _Debugger_embed;

var _Browser_embed = _Debugger_embed || F4(function(impl, flagDecoder, debugMetadata, object)
{
	object['embed'] = function(node, flags)
	{
		return _Platform_initialize(
			flagDecoder,
			flags,
			impl.init,
			impl.update,
			impl.subscriptions,
			_Browser_makeStepperBuilder(node, impl.view)
		);
	};
	return object;
});

var _Debugger_fullscreen;

var _Browser_fullscreen = _Debugger_fullscreen || F4(function(impl, flagDecoder, debugMetadata, object)
{
	object['fullscreen'] = function(flags)
	{
		return _Platform_initialize(
			A2(elm_lang$json$Json$Decode$map, _Browser_toEnv, flagDecoder),
			flags,
			impl.init,
			impl.update,
			impl.subscriptions,
			_Browser_makeStepperBuilder(_VirtualDom_doc.body, function(model) {
				var ui = impl.view(model);
				if (_VirtualDom_doc.title !== ui.title)
				{
					_VirtualDom_doc.title = ui.title;
				}
				return _VirtualDom_node('body')(_List_Nil)(ui.body);
			})
		);
	};
	return object;
});


function _Browser_toEnv(flags)
{
	return {
		url: _Browser_getUrl(),
		flags: flags
	};
}



// RENDERER


function _Browser_makeStepperBuilder(domNode, view)
{
	return function(sendToApp, initialModel)
	{
		var currNode = _VirtualDom_virtualize(domNode);

		return _Browser_makeAnimator(initialModel, function(model)
		{
			var nextNode = view(model);
			var patches = _VirtualDom_diff(currNode, nextNode);
			domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
			currNode = nextNode;
		});
	};
}



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


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



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function()
		{
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm_lang$browser$Browser$NotFound(id))
			);
		});
	});
}


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// SCROLLING


function _Browser_getScroll(id)
{
	return _Browser_withNode(id, function(node) {
		return _Utils_Tuple2(node.scrollLeft, node.scrollTop);
	});
}

var _Browser_setPositiveScroll = F3(function(scroll, id, offset)
{
	return _Browser_withNode(id, function(node) {
		node[scroll] = offset;
		return _Utils_Tuple0;
	});
});

var _Browser_setNegativeScroll = F4(function(scroll, scrollMax, id, offset)
{
	return _Browser_withNode(id, function(node) {
		node[scroll] = node[scrollMax] - offset;
		return _Utils_Tuple0;
	});
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_document = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F4(function(node, passive, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: passive });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm_lang$core$Result$isOk(result)
		? (result.a.b && event.preventDefault(), elm_lang$core$Maybe$Just(result.a.a))
		: elm_lang$core$Maybe$Nothing
});var elm_lang$core$Basics$False = {$: 'False'};
var elm_lang$core$Maybe$Nothing = {$: 'Nothing'};
var elm_lang$core$Basics$EQ = {$: 'EQ'};
var elm_lang$core$Basics$LT = {$: 'LT'};
var elm_lang$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm_lang$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm_lang$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm_lang$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm_lang$core$Elm$JsArray$foldr,
			helper,
			A3(elm_lang$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm_lang$core$List$cons = _List_cons;
var elm_lang$core$Array$toList = function (array) {
	return A3(elm_lang$core$Array$foldr, elm_lang$core$List$cons, _List_Nil, array);
};
var elm_lang$core$Basics$GT = {$: 'GT'};
var elm_lang$core$Dict$foldr = F3(
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
					A3(elm_lang$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm_lang$core$Dict$toList = function (dict) {
	return A3(
		elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm_lang$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm_lang$core$Dict$keys = function (dict) {
	return A3(
		elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm_lang$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm_lang$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm_lang$core$Dict$keys(dict);
};
var elm_lang$http$Http$Internal$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var elm_lang$http$Http$header = elm_lang$http$Http$Internal$Header;
var ohanhi$remotedata_http$RemoteData$Http$acceptJson = A2(elm_lang$http$Http$header, 'Accept', 'application/json');
var ohanhi$remotedata_http$RemoteData$Http$defaultConfig = {
	headers: _List_fromArray(
		[ohanhi$remotedata_http$RemoteData$Http$acceptJson]),
	timeout: elm_lang$core$Maybe$Nothing,
	withCredentials: false
};
var elm_lang$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm_lang$http$Http$Internal$EmptyBody = {$: 'EmptyBody'};
var elm_lang$http$Http$emptyBody = elm_lang$http$Http$Internal$EmptyBody;
var elm_lang$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm_lang$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm_lang$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm_lang$core$Dict$LBlack = {$: 'LBlack'};
var elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {$: 'RBEmpty_elm_builtin', a: a};
};
var elm_lang$core$Dict$empty = elm_lang$core$Dict$RBEmpty_elm_builtin(elm_lang$core$Dict$LBlack);
var elm_lang$core$Basics$compare = _Utils_compare;
var elm_lang$core$Dict$Insert = {$: 'Insert'};
var elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm_lang$core$Dict$Red = {$: 'Red'};
var elm_lang$core$Dict$Remove = {$: 'Remove'};
var elm_lang$core$Dict$Same = {$: 'Same'};
var elm_lang$core$Dict$Black = {$: 'Black'};
var elm_lang$core$Dict$NBlack = {$: 'NBlack'};
var elm_lang$core$Dict$lessBlack = function (color) {
	switch (color.$) {
		case 'BBlack':
			return elm_lang$core$Dict$Black;
		case 'Black':
			return elm_lang$core$Dict$Red;
		case 'Red':
			return elm_lang$core$Dict$NBlack;
		default:
			return _Error_dictBug(0);
	}
};
var elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												elm_lang$core$Dict$RBNode_elm_builtin,
												elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var elm_lang$core$Dict$redden = function (t) {
	if (t.$ === 'RBEmpty_elm_builtin') {
		return _Error_dictBug(0);
	} else {
		var k = t.b;
		var v = t.c;
		var l = t.d;
		var r = t.e;
		return A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Red, k, v, l, r);
	}
};
var elm_lang$core$Dict$balanceHelp = function (tree) {
	_n0$0:
	while (true) {
		_n0$1:
		while (true) {
			_n0$2:
			while (true) {
				_n0$3:
				while (true) {
					_n0$4:
					while (true) {
						_n0$5:
						while (true) {
							_n0$6:
							while (true) {
								if (tree.$ === 'RBNode_elm_builtin') {
									if (tree.d.$ === 'RBNode_elm_builtin') {
										if (tree.e.$ === 'RBNode_elm_builtin') {
											switch (tree.d.a.$) {
												case 'Red':
													switch (tree.e.a.$) {
														case 'Red':
															if ((tree.d.d.$ === 'RBNode_elm_builtin') && (tree.d.d.a.$ === 'Red')) {
																break _n0$0;
															} else {
																if ((tree.d.e.$ === 'RBNode_elm_builtin') && (tree.d.e.a.$ === 'Red')) {
																	break _n0$1;
																} else {
																	if ((tree.e.d.$ === 'RBNode_elm_builtin') && (tree.e.d.a.$ === 'Red')) {
																		break _n0$2;
																	} else {
																		if ((tree.e.e.$ === 'RBNode_elm_builtin') && (tree.e.e.a.$ === 'Red')) {
																			break _n0$3;
																		} else {
																			break _n0$6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((tree.d.d.$ === 'RBNode_elm_builtin') && (tree.d.d.a.$ === 'Red')) {
																break _n0$0;
															} else {
																if ((tree.d.e.$ === 'RBNode_elm_builtin') && (tree.d.e.a.$ === 'Red')) {
																	break _n0$1;
																} else {
																	if (((((tree.a.$ === 'BBlack') && (tree.e.d.$ === 'RBNode_elm_builtin')) && (tree.e.d.a.$ === 'Black')) && (tree.e.e.$ === 'RBNode_elm_builtin')) && (tree.e.e.a.$ === 'Black')) {
																		break _n0$4;
																	} else {
																		break _n0$6;
																	}
																}
															}
														default:
															if ((tree.d.d.$ === 'RBNode_elm_builtin') && (tree.d.d.a.$ === 'Red')) {
																break _n0$0;
															} else {
																if ((tree.d.e.$ === 'RBNode_elm_builtin') && (tree.d.e.a.$ === 'Red')) {
																	break _n0$1;
																} else {
																	break _n0$6;
																}
															}
													}
												case 'NBlack':
													switch (tree.e.a.$) {
														case 'Red':
															if ((tree.e.d.$ === 'RBNode_elm_builtin') && (tree.e.d.a.$ === 'Red')) {
																break _n0$2;
															} else {
																if ((tree.e.e.$ === 'RBNode_elm_builtin') && (tree.e.e.a.$ === 'Red')) {
																	break _n0$3;
																} else {
																	if (((((tree.a.$ === 'BBlack') && (tree.d.d.$ === 'RBNode_elm_builtin')) && (tree.d.d.a.$ === 'Black')) && (tree.d.e.$ === 'RBNode_elm_builtin')) && (tree.d.e.a.$ === 'Black')) {
																		break _n0$5;
																	} else {
																		break _n0$6;
																	}
																}
															}
														case 'NBlack':
															if (tree.a.$ === 'BBlack') {
																if ((((tree.e.d.$ === 'RBNode_elm_builtin') && (tree.e.d.a.$ === 'Black')) && (tree.e.e.$ === 'RBNode_elm_builtin')) && (tree.e.e.a.$ === 'Black')) {
																	break _n0$4;
																} else {
																	if ((((tree.d.d.$ === 'RBNode_elm_builtin') && (tree.d.d.a.$ === 'Black')) && (tree.d.e.$ === 'RBNode_elm_builtin')) && (tree.d.e.a.$ === 'Black')) {
																		break _n0$5;
																	} else {
																		break _n0$6;
																	}
																}
															} else {
																break _n0$6;
															}
														default:
															if (((((tree.a.$ === 'BBlack') && (tree.d.d.$ === 'RBNode_elm_builtin')) && (tree.d.d.a.$ === 'Black')) && (tree.d.e.$ === 'RBNode_elm_builtin')) && (tree.d.e.a.$ === 'Black')) {
																break _n0$5;
															} else {
																break _n0$6;
															}
													}
												default:
													switch (tree.e.a.$) {
														case 'Red':
															if ((tree.e.d.$ === 'RBNode_elm_builtin') && (tree.e.d.a.$ === 'Red')) {
																break _n0$2;
															} else {
																if ((tree.e.e.$ === 'RBNode_elm_builtin') && (tree.e.e.a.$ === 'Red')) {
																	break _n0$3;
																} else {
																	break _n0$6;
																}
															}
														case 'NBlack':
															if (((((tree.a.$ === 'BBlack') && (tree.e.d.$ === 'RBNode_elm_builtin')) && (tree.e.d.a.$ === 'Black')) && (tree.e.e.$ === 'RBNode_elm_builtin')) && (tree.e.e.a.$ === 'Black')) {
																break _n0$4;
															} else {
																break _n0$6;
															}
														default:
															break _n0$6;
													}
											}
										} else {
											switch (tree.d.a.$) {
												case 'Red':
													if ((tree.d.d.$ === 'RBNode_elm_builtin') && (tree.d.d.a.$ === 'Red')) {
														break _n0$0;
													} else {
														if ((tree.d.e.$ === 'RBNode_elm_builtin') && (tree.d.e.a.$ === 'Red')) {
															break _n0$1;
														} else {
															break _n0$6;
														}
													}
												case 'NBlack':
													if (((((tree.a.$ === 'BBlack') && (tree.d.d.$ === 'RBNode_elm_builtin')) && (tree.d.d.a.$ === 'Black')) && (tree.d.e.$ === 'RBNode_elm_builtin')) && (tree.d.e.a.$ === 'Black')) {
														break _n0$5;
													} else {
														break _n0$6;
													}
												default:
													break _n0$6;
											}
										}
									} else {
										if (tree.e.$ === 'RBNode_elm_builtin') {
											switch (tree.e.a.$) {
												case 'Red':
													if ((tree.e.d.$ === 'RBNode_elm_builtin') && (tree.e.d.a.$ === 'Red')) {
														break _n0$2;
													} else {
														if ((tree.e.e.$ === 'RBNode_elm_builtin') && (tree.e.e.a.$ === 'Red')) {
															break _n0$3;
														} else {
															break _n0$6;
														}
													}
												case 'NBlack':
													if (((((tree.a.$ === 'BBlack') && (tree.e.d.$ === 'RBNode_elm_builtin')) && (tree.e.d.a.$ === 'Black')) && (tree.e.e.$ === 'RBNode_elm_builtin')) && (tree.e.e.a.$ === 'Black')) {
														break _n0$4;
													} else {
														break _n0$6;
													}
												default:
													break _n0$6;
											}
										} else {
											break _n0$6;
										}
									}
								} else {
									break _n0$6;
								}
							}
							return tree;
						}
						var _n23 = tree.a;
						var zk = tree.b;
						var zv = tree.c;
						var _n24 = tree.d;
						var _n25 = _n24.a;
						var xk = _n24.b;
						var xv = _n24.c;
						var a = _n24.d;
						var _n26 = a.a;
						var _n27 = _n24.e;
						var _n28 = _n27.a;
						var yk = _n27.b;
						var yv = _n27.c;
						var b = _n27.d;
						var c = _n27.e;
						var d = tree.e;
						return A5(
							elm_lang$core$Dict$RBNode_elm_builtin,
							elm_lang$core$Dict$Black,
							yk,
							yv,
							A5(
								elm_lang$core$Dict$balance,
								elm_lang$core$Dict$Black,
								xk,
								xv,
								elm_lang$core$Dict$redden(a),
								b),
							A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, zk, zv, c, d));
					}
					var _n17 = tree.a;
					var xk = tree.b;
					var xv = tree.c;
					var a = tree.d;
					var _n18 = tree.e;
					var _n19 = _n18.a;
					var zk = _n18.b;
					var zv = _n18.c;
					var _n20 = _n18.d;
					var _n21 = _n20.a;
					var yk = _n20.b;
					var yv = _n20.c;
					var b = _n20.d;
					var c = _n20.e;
					var d = _n18.e;
					var _n22 = d.a;
					return A5(
						elm_lang$core$Dict$RBNode_elm_builtin,
						elm_lang$core$Dict$Black,
						yk,
						yv,
						A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, xk, xv, a, b),
						A5(
							elm_lang$core$Dict$balance,
							elm_lang$core$Dict$Black,
							zk,
							zv,
							c,
							elm_lang$core$Dict$redden(d)));
				}
				var col = tree.a;
				var xk = tree.b;
				var xv = tree.c;
				var a = tree.d;
				var _n13 = tree.e;
				var _n14 = _n13.a;
				var yk = _n13.b;
				var yv = _n13.c;
				var b = _n13.d;
				var _n15 = _n13.e;
				var _n16 = _n15.a;
				var zk = _n15.b;
				var zv = _n15.c;
				var c = _n15.d;
				var d = _n15.e;
				return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
			}
			var col = tree.a;
			var xk = tree.b;
			var xv = tree.c;
			var a = tree.d;
			var _n9 = tree.e;
			var _n10 = _n9.a;
			var zk = _n9.b;
			var zv = _n9.c;
			var _n11 = _n9.d;
			var _n12 = _n11.a;
			var yk = _n11.b;
			var yv = _n11.c;
			var b = _n11.d;
			var c = _n11.e;
			var d = _n9.e;
			return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
		}
		var col = tree.a;
		var zk = tree.b;
		var zv = tree.c;
		var _n5 = tree.d;
		var _n6 = _n5.a;
		var xk = _n5.b;
		var xv = _n5.c;
		var a = _n5.d;
		var _n7 = _n5.e;
		var _n8 = _n7.a;
		var yk = _n7.b;
		var yv = _n7.c;
		var b = _n7.d;
		var c = _n7.e;
		var d = tree.e;
		return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
	}
	var col = tree.a;
	var zk = tree.b;
	var zv = tree.c;
	var _n1 = tree.d;
	var _n2 = _n1.a;
	var yk = _n1.b;
	var yv = _n1.c;
	var _n3 = _n1.d;
	var _n4 = _n3.a;
	var xk = _n3.b;
	var xv = _n3.c;
	var a = _n3.d;
	var b = _n3.e;
	var c = _n1.e;
	var d = tree.e;
	return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
};
var elm_lang$core$Basics$True = {$: 'True'};
var elm_lang$core$Basics$eq = _Utils_equal;
var elm_lang$core$Basics$or = _Basics_or;
var elm_lang$core$Dict$BBlack = {$: 'BBlack'};
var elm_lang$core$Dict$blackish = function (dict) {
	if (dict.$ === 'RBNode_elm_builtin') {
		var color = dict.a;
		return _Utils_eq(color, elm_lang$core$Dict$Black) || _Utils_eq(color, elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var elm_lang$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		var dict = A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
		return elm_lang$core$Dict$blackish(dict) ? elm_lang$core$Dict$balanceHelp(dict) : dict;
	});
var elm_lang$core$Dict$blacken = function (t) {
	if (t.$ === 'RBEmpty_elm_builtin') {
		return elm_lang$core$Dict$RBEmpty_elm_builtin(elm_lang$core$Dict$LBlack);
	} else {
		var k = t.b;
		var v = t.c;
		var l = t.d;
		var r = t.e;
		return A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, k, v, l, r);
	}
};
var elm_lang$core$Dict$isBBlack = function (dict) {
	_n0$2:
	while (true) {
		if (dict.$ === 'RBNode_elm_builtin') {
			if (dict.a.$ === 'BBlack') {
				var _n1 = dict.a;
				return true;
			} else {
				break _n0$2;
			}
		} else {
			if (dict.a.$ === 'LBBlack') {
				var _n2 = dict.a;
				return true;
			} else {
				break _n0$2;
			}
		}
	}
	return false;
};
var elm_lang$core$Dict$lessBlackTree = function (dict) {
	if (dict.$ === 'RBNode_elm_builtin') {
		var c = dict.a;
		var k = dict.b;
		var v = dict.c;
		var l = dict.d;
		var r = dict.e;
		return A5(
			elm_lang$core$Dict$RBNode_elm_builtin,
			elm_lang$core$Dict$lessBlack(c),
			k,
			v,
			l,
			r);
	} else {
		return elm_lang$core$Dict$RBEmpty_elm_builtin(elm_lang$core$Dict$LBlack);
	}
};
var elm_lang$core$Dict$moreBlack = function (color) {
	switch (color.$) {
		case 'Black':
			return elm_lang$core$Dict$BBlack;
		case 'Red':
			return elm_lang$core$Dict$Black;
		case 'NBlack':
			return elm_lang$core$Dict$Red;
		default:
			return _Error_dictBug(0);
	}
};
var elm_lang$core$Dict$bubble = F5(
	function (color, key, value, left, right) {
		return (elm_lang$core$Dict$isBBlack(left) || elm_lang$core$Dict$isBBlack(right)) ? A5(
			elm_lang$core$Dict$balance,
			elm_lang$core$Dict$moreBlack(color),
			key,
			value,
			elm_lang$core$Dict$lessBlackTree(left),
			elm_lang$core$Dict$lessBlackTree(right)) : A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
	});
var elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.a.$ === 'Red')) {
		var _n1 = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var right = dict.e;
		return A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, key, value, left, right);
	} else {
		return dict;
	}
};
var elm_lang$core$Dict$LBBlack = {$: 'LBBlack'};
var elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			if (r.$ === 'RBEmpty_elm_builtin') {
				return _Utils_Tuple2(k, v);
			} else {
				var kr = r.b;
				var vr = r.c;
				var rr = r.e;
				var $temp$k = kr,
					$temp$v = vr,
					$temp$r = rr;
				k = $temp$k;
				v = $temp$v;
				r = $temp$r;
				continue maxWithDefault;
			}
		}
	});
var elm_lang$core$Dict$removeMax = F5(
	function (color, key, value, left, right) {
		if (right.$ === 'RBEmpty_elm_builtin') {
			return A3(elm_lang$core$Dict$rem, color, left, right);
		} else {
			var cr = right.a;
			var kr = right.b;
			var vr = right.c;
			var lr = right.d;
			var rr = right.e;
			return A5(
				elm_lang$core$Dict$bubble,
				color,
				key,
				value,
				left,
				A5(elm_lang$core$Dict$removeMax, cr, kr, vr, lr, rr));
		}
	});
var elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _n0 = _Utils_Tuple2(left, right);
		if (_n0.a.$ === 'RBEmpty_elm_builtin') {
			if (_n0.b.$ === 'RBEmpty_elm_builtin') {
				switch (color.$) {
					case 'Red':
						return elm_lang$core$Dict$RBEmpty_elm_builtin(elm_lang$core$Dict$LBlack);
					case 'Black':
						return elm_lang$core$Dict$RBEmpty_elm_builtin(elm_lang$core$Dict$LBBlack);
					default:
						return _Error_dictBug(0);
				}
			} else {
				var cl = _n0.a.a;
				var _n2 = _n0.b;
				var cr = _n2.a;
				var k = _n2.b;
				var v = _n2.c;
				var l = _n2.d;
				var r = _n2.e;
				var _n3 = _Utils_Tuple3(color, cl, cr);
				if (((_n3.a.$ === 'Black') && (_n3.b.$ === 'LBlack')) && (_n3.c.$ === 'Red')) {
					var _n4 = _n3.a;
					var _n5 = _n3.b;
					var _n6 = _n3.c;
					return A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, k, v, l, r);
				} else {
					return _Error_dictBug(0);
				}
			}
		} else {
			if (_n0.b.$ === 'RBEmpty_elm_builtin') {
				var _n7 = _n0.a;
				var cl = _n7.a;
				var k = _n7.b;
				var v = _n7.c;
				var l = _n7.d;
				var r = _n7.e;
				var cr = _n0.b.a;
				var _n8 = _Utils_Tuple3(color, cl, cr);
				if (((_n8.a.$ === 'Black') && (_n8.b.$ === 'Red')) && (_n8.c.$ === 'LBlack')) {
					var _n9 = _n8.a;
					var _n10 = _n8.b;
					var _n11 = _n8.c;
					return A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, k, v, l, r);
				} else {
					return _Error_dictBug(0);
				}
			} else {
				var _n12 = _n0.a;
				var cl = _n12.a;
				var kl = _n12.b;
				var vl = _n12.c;
				var ll = _n12.d;
				var rl = _n12.e;
				var _n13 = _n0.b;
				var newLeft = A5(elm_lang$core$Dict$removeMax, cl, kl, vl, ll, rl);
				var _n14 = A3(elm_lang$core$Dict$maxWithDefault, kl, vl, rl);
				var k = _n14.a;
				var v = _n14.b;
				return A5(elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var elm_lang$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm_lang$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var up = function (dict) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				var _n1 = alter(elm_lang$core$Maybe$Nothing);
				if (_n1.$ === 'Nothing') {
					return _Utils_Tuple2(elm_lang$core$Dict$Same, elm_lang$core$Dict$empty);
				} else {
					var v = _n1.a;
					return _Utils_Tuple2(
						elm_lang$core$Dict$Insert,
						A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Red, targetKey, v, elm_lang$core$Dict$empty, elm_lang$core$Dict$empty));
				}
			} else {
				var color = dict.a;
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n2 = A2(elm_lang$core$Basics$compare, targetKey, key);
				switch (_n2.$) {
					case 'EQ':
						var _n3 = alter(
							elm_lang$core$Maybe$Just(value));
						if (_n3.$ === 'Nothing') {
							return _Utils_Tuple2(
								elm_lang$core$Dict$Remove,
								A3(elm_lang$core$Dict$rem, color, left, right));
						} else {
							var newValue = _n3.a;
							return _Utils_Tuple2(
								elm_lang$core$Dict$Same,
								A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, newValue, left, right));
						}
					case 'LT':
						var _n4 = up(left);
						var flag = _n4.a;
						var newLeft = _n4.b;
						switch (flag.$) {
							case 'Same':
								return _Utils_Tuple2(
									elm_lang$core$Dict$Same,
									A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, newLeft, right));
							case 'Insert':
								return _Utils_Tuple2(
									elm_lang$core$Dict$Insert,
									A5(elm_lang$core$Dict$balance, color, key, value, newLeft, right));
							default:
								return _Utils_Tuple2(
									elm_lang$core$Dict$Remove,
									A5(elm_lang$core$Dict$bubble, color, key, value, newLeft, right));
						}
					default:
						var _n6 = up(right);
						var flag = _n6.a;
						var newRight = _n6.b;
						switch (flag.$) {
							case 'Same':
								return _Utils_Tuple2(
									elm_lang$core$Dict$Same,
									A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, left, newRight));
							case 'Insert':
								return _Utils_Tuple2(
									elm_lang$core$Dict$Insert,
									A5(elm_lang$core$Dict$balance, color, key, value, left, newRight));
							default:
								return _Utils_Tuple2(
									elm_lang$core$Dict$Remove,
									A5(elm_lang$core$Dict$bubble, color, key, value, left, newRight));
						}
				}
			}
		};
		var _n8 = up(dictionary);
		var finalFlag = _n8.a;
		var updatedDict = _n8.b;
		switch (finalFlag.$) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var elm_lang$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm_lang$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm_lang$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm_lang$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm_lang$core$Result$Err(e);
		}
	});
var elm_lang$http$Http$BadPayload = F2(
	function (a, b) {
		return {$: 'BadPayload', a: a, b: b};
	});
var elm_lang$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var elm_lang$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var elm_lang$http$Http$NetworkError = {$: 'NetworkError'};
var elm_lang$http$Http$Timeout = {$: 'Timeout'};
var elm_lang$http$Http$Internal$FormDataBody = function (a) {
	return {$: 'FormDataBody', a: a};
};
var elm_lang$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 'StringBody') {
		return true;
	} else {
		return false;
	}
};
var elm_lang$http$Http$expectStringResponse = _Http_expectStringResponse;
var elm_lang$core$Array$branchFactor = 32;
var elm_lang$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm_lang$core$Basics$ceiling = _Basics_ceiling;
var elm_lang$core$Basics$fdiv = _Basics_fdiv;
var elm_lang$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(_Basics_e);
	});
var elm_lang$core$Basics$toFloat = _Basics_toFloat;
var elm_lang$core$Array$shiftStep = elm_lang$core$Basics$ceiling(
	A2(elm_lang$core$Basics$logBase, 2, elm_lang$core$Array$branchFactor));
var elm_lang$core$Elm$JsArray$empty = _JsArray_empty;
var elm_lang$core$Array$empty = A4(elm_lang$core$Array$Array_elm_builtin, 0, elm_lang$core$Array$shiftStep, elm_lang$core$Elm$JsArray$empty, elm_lang$core$Elm$JsArray$empty);
var elm_lang$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm_lang$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm_lang$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm_lang$core$List$foldl = F3(
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
var elm_lang$core$List$reverse = function (list) {
	return A3(elm_lang$core$List$foldl, elm_lang$core$List$cons, _List_Nil, list);
};
var elm_lang$core$Array$compressNodes = F2(
	function (nodes, acc) {
		var _n0 = A2(elm_lang$core$Elm$JsArray$initializeFromList, elm_lang$core$Array$branchFactor, nodes);
		var node = _n0.a;
		var remainingNodes = _n0.b;
		var newAcc = A2(
			elm_lang$core$List$cons,
			elm_lang$core$Array$SubTree(node),
			acc);
		if (!remainingNodes.b) {
			return elm_lang$core$List$reverse(newAcc);
		} else {
			return A2(elm_lang$core$Array$compressNodes, remainingNodes, newAcc);
		}
	});
var elm_lang$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm_lang$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm_lang$core$Basics$ceiling(nodeListSize / elm_lang$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm_lang$core$Elm$JsArray$initializeFromList, elm_lang$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm_lang$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm_lang$core$Basics$add = _Basics_add;
var elm_lang$core$Basics$floor = _Basics_floor;
var elm_lang$core$Basics$gt = _Utils_gt;
var elm_lang$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm_lang$core$Basics$mul = _Basics_mul;
var elm_lang$core$Basics$sub = _Basics_sub;
var elm_lang$core$Elm$JsArray$length = _JsArray_length;
var elm_lang$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm_lang$core$Array$Array_elm_builtin,
				elm_lang$core$Elm$JsArray$length(builder.tail),
				elm_lang$core$Array$shiftStep,
				elm_lang$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm_lang$core$Array$branchFactor;
			var depth = elm_lang$core$Basics$floor(
				A2(elm_lang$core$Basics$logBase, elm_lang$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm_lang$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm_lang$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm_lang$core$Array$Array_elm_builtin,
				elm_lang$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm_lang$core$Basics$max, 5, depth * elm_lang$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm_lang$core$Basics$idiv = _Basics_idiv;
var elm_lang$core$Basics$lt = _Utils_lt;
var elm_lang$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm_lang$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm_lang$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm_lang$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm_lang$core$Array$Leaf(
					A3(elm_lang$core$Elm$JsArray$initialize, elm_lang$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm_lang$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm_lang$core$List$cons, leaf, nodeList),
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
var elm_lang$core$Basics$le = _Utils_le;
var elm_lang$core$Basics$remainderBy = _Basics_remainderBy;
var elm_lang$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm_lang$core$Array$empty;
		} else {
			var tailLen = len % elm_lang$core$Array$branchFactor;
			var tail = A3(elm_lang$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm_lang$core$Array$branchFactor;
			return A5(elm_lang$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm_lang$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm_lang$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm_lang$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm_lang$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm_lang$json$Json$Decode$decodeString = _Json_runOnString;
var elm_lang$core$Basics$and = _Basics_and;
var elm_lang$core$Basics$append = _Utils_append;
var elm_lang$core$Char$toCode = _Char_toCode;
var elm_lang$core$Char$isLower = function (_char) {
	var code = elm_lang$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm_lang$core$Char$isUpper = function (_char) {
	var code = elm_lang$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm_lang$core$Char$isAlpha = function (_char) {
	return elm_lang$core$Char$isLower(_char) || elm_lang$core$Char$isUpper(_char);
};
var elm_lang$core$Char$isDigit = function (_char) {
	var code = elm_lang$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm_lang$core$Char$isAlphaNum = function (_char) {
	return elm_lang$core$Char$isLower(_char) || (elm_lang$core$Char$isUpper(_char) || elm_lang$core$Char$isDigit(_char));
};
var elm_lang$core$List$length = function (xs) {
	return A3(
		elm_lang$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm_lang$core$List$map2 = _List_map2;
var elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm_lang$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(elm_lang$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm_lang$core$List$map2,
			f,
			A2(
				elm_lang$core$List$range,
				0,
				elm_lang$core$List$length(xs) - 1),
			xs);
	});
var elm_lang$core$String$all = _String_all;
var elm_lang$core$String$fromInt = _String_fromNumber;
var elm_lang$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm_lang$core$String$uncons = _String_uncons;
var elm_lang$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm_lang$json$Json$Decode$indent = function (str) {
	return A2(
		elm_lang$core$String$join,
		'\n    ',
		A2(elm_lang$core$String$split, '\n', str));
};
var elm_lang$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm_lang$core$String$fromInt(i + 1) + (') ' + elm_lang$json$Json$Decode$indent(
			elm_lang$json$Json$Decode$errorToString(error))));
	});
var elm_lang$json$Json$Encode$encode = _Json_encode;
var elm_lang$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm_lang$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm_lang$core$Char$isAlpha(_char) && A2(elm_lang$core$String$all, elm_lang$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm_lang$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm_lang$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm_lang$core$List$cons, indexName, context);
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
									elm_lang$core$String$join,
									'',
									elm_lang$core$List$reverse(context));
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
										elm_lang$core$String$join,
										'',
										elm_lang$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm_lang$core$String$fromInt(
								elm_lang$core$List$length(errors)) + ' ways:'));
							return A2(
								elm_lang$core$String$join,
								'\n\n',
								A2(
									elm_lang$core$List$cons,
									introduction,
									A2(elm_lang$core$List$indexedMap, elm_lang$json$Json$Decode$errorOneOf, errors)));
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
								elm_lang$core$String$join,
								'',
								elm_lang$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm_lang$json$Json$Decode$indent(
						A2(elm_lang$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm_lang$json$Json$Decode$errorToString = function (error) {
	return A2(elm_lang$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm_lang$http$Http$expectJson = function (decoder) {
	return elm_lang$http$Http$expectStringResponse(
		function (response) {
			var _n0 = A2(elm_lang$json$Json$Decode$decodeString, decoder, response.body);
			if (_n0.$ === 'Err') {
				var decodeError = _n0.a;
				return elm_lang$core$Result$Err(
					elm_lang$json$Json$Decode$errorToString(decodeError));
			} else {
				var value = _n0.a;
				return elm_lang$core$Result$Ok(value);
			}
		});
};
var elm_lang$core$Basics$identity = function (x) {
	return x;
};
var elm_lang$http$Http$Internal$Request = function (a) {
	return {$: 'Request', a: a};
};
var elm_lang$http$Http$request = elm_lang$http$Http$Internal$Request;
var ohanhi$remotedata_http$RemoteData$Http$createRequest = F5(
	function (config, method, url, successDecoder, body) {
		return elm_lang$http$Http$request(
			{
				body: body,
				expect: elm_lang$http$Http$expectJson(successDecoder),
				headers: config.headers,
				method: method,
				timeout: config.timeout,
				url: url,
				withCredentials: config.withCredentials
			});
	});
var ohanhi$remotedata_http$RemoteData$Http$getRequest = F3(
	function (config, url, decoder) {
		return A5(ohanhi$remotedata_http$RemoteData$Http$createRequest, config, 'GET', url, decoder, elm_lang$http$Http$emptyBody);
	});
var elm_lang$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm_lang$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm_lang$core$Task$andThen = _Scheduler_andThen;
var elm_lang$core$Task$succeed = _Scheduler_succeed;
var elm_lang$core$Task$init = elm_lang$core$Task$succeed(_Utils_Tuple0);
var elm_lang$core$List$foldrHelper = F4(
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
							elm_lang$core$List$foldl,
							fn,
							acc,
							elm_lang$core$List$reverse(r4)) : A4(elm_lang$core$List$foldrHelper, fn, acc, ctr + 1, r4);
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
var elm_lang$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm_lang$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm_lang$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm_lang$core$Task$andThen,
			function (a) {
				return elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					elm_lang$core$Task$andThen,
					function (b) {
						return elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm_lang$core$Task$sequence = function (tasks) {
	return A3(
		elm_lang$core$List$foldr,
		elm_lang$core$Task$map2(elm_lang$core$List$cons),
		elm_lang$core$Task$succeed(_List_Nil),
		tasks);
};
var elm_lang$core$Platform$sendToApp = _Platform_sendToApp;
var elm_lang$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm_lang$core$Task$andThen,
				elm_lang$core$Platform$sendToApp(router),
				task));
	});
var elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm_lang$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm_lang$core$Task$sequence(
				A2(
					elm_lang$core$List$map,
					elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var elm_lang$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm_lang$core$Task$succeed(_Utils_Tuple0);
	});
var elm_lang$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm_lang$core$Task$Perform(
			A2(elm_lang$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm_lang$core$Task$init, elm_lang$core$Task$onEffects, elm_lang$core$Task$onSelfMsg, elm_lang$core$Task$cmdMap);
var elm_lang$core$Task$command = _Platform_leaf('Task');
var elm_lang$core$Task$onError = _Scheduler_onError;
var elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm_lang$core$Task$command(
			elm_lang$core$Task$Perform(
				A2(
					elm_lang$core$Task$onError,
					function ($) {
						return elm_lang$core$Task$succeed(
							resultToMessage(
								elm_lang$core$Result$Err($)));
					},
					A2(
						elm_lang$core$Task$andThen,
						function ($) {
							return elm_lang$core$Task$succeed(
								resultToMessage(
									elm_lang$core$Result$Ok($)));
						},
						task))));
	});
var elm_lang$http$Http$toTask = function (_n0) {
	var request_ = _n0.a;
	return A2(_Http_toTask, request_, elm_lang$core$Maybe$Nothing);
};
var elm_lang$http$Http$send = F2(
	function (resultToMessage, request_) {
		return A2(
			elm_lang$core$Task$attempt,
			resultToMessage,
			elm_lang$http$Http$toTask(request_));
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
var ohanhi$remotedata_http$RemoteData$Http$toCmd = function (tagger) {
	return elm_lang$http$Http$send(
		function ($) {
			return tagger(
				krisajenkins$remotedata$RemoteData$fromResult($));
		});
};
var ohanhi$remotedata_http$RemoteData$Http$getWithConfig = F4(
	function (config, url, tagger, decoder) {
		return A2(
			ohanhi$remotedata_http$RemoteData$Http$toCmd,
			tagger,
			A3(ohanhi$remotedata_http$RemoteData$Http$getRequest, config, url, decoder));
	});
var author$project$Main$get = ohanhi$remotedata_http$RemoteData$Http$getWithConfig(ohanhi$remotedata_http$RemoteData$Http$defaultConfig);
var elm_lang$json$Json$Decode$map2 = _Json_map2;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom = elm_lang$json$Json$Decode$map2(elm_lang$core$Basics$apR);
var elm_lang$json$Json$Decode$field = _Json_decodeField;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2(elm_lang$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var elm_lang$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm_lang$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			elm_lang$core$Dict$update,
			key,
			elm_lang$core$Basics$always(
				elm_lang$core$Maybe$Just(value)),
			dict);
	});
var elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		elm_lang$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm_lang$core$Dict$insert, key, value, dict);
			}),
		elm_lang$core$Dict$empty,
		assocs);
};
var elm_lang$core$Basics$negate = function (n) {
	return -n;
};
var elm_lang$core$String$slice = _String_slice;
var elm_lang$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3(elm_lang$core$String$slice, 0, -n, string);
	});
var elm_lang$core$String$endsWith = _String_endsWith;
var elm_lang$json$Json$Decode$andThen = _Json_andThen;
var elm_lang$json$Json$Decode$list = _Json_decodeList;
var elm_lang$json$Json$Decode$map = _Json_map1;
var elm_lang$json$Json$Decode$string = _Json_decodeString;
var elm_lang$json$Json$Decode$succeed = _Json_succeed;
var author$project$Model$stationsDecoder = A2(
	elm_lang$json$Json$Decode$andThen,
	function ($) {
		return elm_lang$json$Json$Decode$succeed(
			elm_lang$core$Dict$fromList($));
	},
	elm_lang$json$Json$Decode$list(
		A3(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
			'stationName',
			A2(
				elm_lang$json$Json$Decode$map,
				function (a) {
					return A2(elm_lang$core$String$endsWith, ' asema', a) ? A2(elm_lang$core$String$dropRight, 6, a) : a;
				},
				elm_lang$json$Json$Decode$string),
			A3(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
				'stationShortCode',
				elm_lang$json$Json$Decode$string,
				elm_lang$json$Json$Decode$succeed(
					F2(
						function (a, b) {
							return _Utils_Tuple2(a, b);
						}))))));
var author$project$View$StationsResponse = function (a) {
	return {$: 'StationsResponse', a: a};
};
var author$project$Main$getStations = function () {
	var stationsUrl = 'https://rata.digitraffic.fi/api/v1/metadata/stations';
	return A3(author$project$Main$get, stationsUrl, author$project$View$StationsResponse, author$project$Model$stationsDecoder);
}();
var author$project$Model$TrainRaw = F5(
	function (trainNumber, lineId, trainCategory, timetableRows, cancelled) {
		return {cancelled: cancelled, lineId: lineId, timetableRows: timetableRows, trainCategory: trainCategory, trainNumber: trainNumber};
	});
var elm_lang$json$Json$Decode$decodeValue = _Json_run;
var elm_lang$json$Json$Decode$fail = _Json_fail;
var elm_lang$json$Json$Decode$null = _Json_decodeNull;
var elm_lang$json$Json$Decode$oneOf = _Json_oneOf;
var elm_lang$json$Json$Decode$value = _Json_decodeValue;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return elm_lang$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						elm_lang$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _n0 = A2(elm_lang$json$Json$Decode$decodeValue, pathDecoder, input);
			if (_n0.$ === 'Ok') {
				var rawValue = _n0.a;
				var _n1 = A2(
					elm_lang$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_n1.$ === 'Ok') {
					var finalResult = _n1.a;
					return elm_lang$json$Json$Decode$succeed(finalResult);
				} else {
					var finalErr = _n1.a;
					return elm_lang$json$Json$Decode$fail(
						elm_lang$json$Json$Decode$errorToString(finalErr));
				}
			} else {
				return elm_lang$json$Json$Decode$succeed(fallback);
			}
		};
		return A2(elm_lang$json$Json$Decode$andThen, handleResult, elm_lang$json$Json$Decode$value);
	});
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2(elm_lang$json$Json$Decode$field, key, elm_lang$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var author$project$Model$TimetableRow = F8(
	function (scheduledTime, trainStopping, stationShortCode, stationUICCode, rowType, actualTime, liveEstimateTime, differenceInMinutes) {
		return {actualTime: actualTime, differenceInMinutes: differenceInMinutes, liveEstimateTime: liveEstimateTime, rowType: rowType, scheduledTime: scheduledTime, stationShortCode: stationShortCode, stationUICCode: stationUICCode, trainStopping: trainStopping};
	});
var elm_lang$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm_lang$time$Time$millisToPosix = elm_lang$time$Time$Posix;
var author$project$Vendor$Iso8601$fromParts = F6(
	function (monthYearDayMs, hour, minute, second, ms, utcOffsetMinutes) {
		return elm_lang$time$Time$millisToPosix((((monthYearDayMs + (((hour * 60) * 60) * 1000)) + (((minute - utcOffsetMinutes) * 60) * 1000)) + (second * 1000)) + ms);
	});
var elm_lang$core$String$length = _String_length;
var elm_lang$core$String$toInt = _String_toInt;
var elm_lang$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var elm_lang$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var elm_lang$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm_lang$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0.a;
		return elm_lang$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parseA(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm_lang$parser$Parser$Advanced$Bad, p, x);
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
						return A2(elm_lang$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(elm_lang$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var elm_lang$parser$Parser$andThen = elm_lang$parser$Parser$Advanced$andThen;
var elm_lang$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm_lang$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm_lang$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm_lang$parser$Parser$Advanced$Good,
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
var elm_lang$parser$Parser$Advanced$chompWhile = function (isGood) {
	return elm_lang$parser$Parser$Advanced$Parser(
		function (s) {
			return A5(elm_lang$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var elm_lang$parser$Parser$chompWhile = elm_lang$parser$Parser$Advanced$chompWhile;
var elm_lang$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm_lang$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm_lang$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm_lang$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3(elm_lang$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var elm_lang$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm_lang$parser$Parser$Advanced$mapChompedString, elm_lang$core$Basics$always, parser);
};
var elm_lang$parser$Parser$getChompedString = elm_lang$parser$Parser$Advanced$getChompedString;
var elm_lang$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var elm_lang$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var elm_lang$parser$Parser$Advanced$Empty = {$: 'Empty'};
var elm_lang$parser$Parser$Advanced$Problem = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var elm_lang$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm_lang$parser$Parser$Advanced$AddRight,
			elm_lang$parser$Parser$Advanced$Empty,
			A4(elm_lang$parser$Parser$Advanced$Problem, s.row, s.col, x, s.context));
	});
var elm_lang$parser$Parser$Advanced$problem = function (x) {
	return elm_lang$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				elm_lang$parser$Parser$Advanced$Bad,
				false,
				A2(elm_lang$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm_lang$parser$Parser$problem = function (msg) {
	return elm_lang$parser$Parser$Advanced$problem(
		elm_lang$parser$Parser$Problem(msg));
};
var elm_lang$parser$Parser$Advanced$succeed = function (a) {
	return elm_lang$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm_lang$parser$Parser$Advanced$Good, false, a, s);
		});
};
var elm_lang$parser$Parser$succeed = elm_lang$parser$Parser$Advanced$succeed;
var author$project$Vendor$Iso8601$paddedInt = function (quantity) {
	return A2(
		elm_lang$parser$Parser$andThen,
		function (str) {
			if (_Utils_eq(
				elm_lang$core$String$length(str),
				quantity)) {
				var _n0 = elm_lang$core$String$toInt(str);
				if (_n0.$ === 'Just') {
					var intVal = _n0.a;
					return elm_lang$parser$Parser$succeed(intVal);
				} else {
					return elm_lang$parser$Parser$problem('Invalid integer: \"' + (str + '\"'));
				}
			} else {
				return elm_lang$parser$Parser$problem(
					'Expected ' + (elm_lang$core$String$fromInt(quantity) + (' digits, but got ' + elm_lang$core$String$fromInt(
						elm_lang$core$String$length(str)))));
			}
		},
		elm_lang$parser$Parser$getChompedString(
			elm_lang$parser$Parser$chompWhile(elm_lang$core$Char$isDigit)));
};
var author$project$Vendor$Iso8601$epochYear = 1970;
var author$project$Vendor$Iso8601$invalidDay = function (day) {
	return elm_lang$parser$Parser$problem(
		'Invalid day: ' + elm_lang$core$String$fromInt(day));
};
var elm_lang$core$Basics$modBy = _Basics_modBy;
var elm_lang$core$Basics$neq = _Utils_notEqual;
var author$project$Vendor$Iso8601$isLeapYear = function (year) {
	return (!A2(elm_lang$core$Basics$modBy, 4, year)) && (A2(elm_lang$core$Basics$modBy, 100, year) || (!A2(elm_lang$core$Basics$modBy, 400, year)));
};
var author$project$Vendor$Iso8601$leapYearsBetween = F2(
	function (lower, higher) {
		leapYearsBetween:
		while (true) {
			if (_Utils_eq(lower, higher)) {
				return 0;
			} else {
				if (_Utils_cmp(lower, higher) > 0) {
					var $temp$lower = higher,
						$temp$higher = lower;
					lower = $temp$lower;
					higher = $temp$higher;
					continue leapYearsBetween;
				} else {
					var nonLeapYears = (((lower / 100) | 0) - (((higher - 1) / 100) | 0)) - (((lower / 400) | 0) - (((higher - 1) / 400) | 0));
					var defaultLeapYears = ((lower / 4) | 0) - (((higher - 1) / 4) | 0);
					return defaultLeapYears - nonLeapYears;
				}
			}
		}
	});
var author$project$Vendor$Iso8601$msPerDay = 86400000;
var author$project$Vendor$Iso8601$msPerYear = 31536000000;
var elm_lang$core$Basics$not = _Basics_not;
var author$project$Vendor$Iso8601$yearMonthDay = function (_n0) {
	var year = _n0.a;
	var month = _n0.b;
	var dayInMonth = _n0.c;
	if (dayInMonth < 0) {
		return author$project$Vendor$Iso8601$invalidDay(dayInMonth);
	} else {
		var succeedWith = function (extraMs) {
			var yearMs = author$project$Vendor$Iso8601$msPerYear * (year - author$project$Vendor$Iso8601$epochYear);
			var days = ((month < 3) || (!author$project$Vendor$Iso8601$isLeapYear(year))) ? (dayInMonth - 1) : dayInMonth;
			var dayMs = author$project$Vendor$Iso8601$msPerDay * (days + A2(author$project$Vendor$Iso8601$leapYearsBetween, author$project$Vendor$Iso8601$epochYear, year));
			return elm_lang$parser$Parser$succeed((extraMs + yearMs) + dayMs);
		};
		switch (month) {
			case 1:
				return (dayInMonth > 31) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(0);
			case 2:
				return ((dayInMonth > 29) || ((dayInMonth === 29) && (!author$project$Vendor$Iso8601$isLeapYear(year)))) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(2678400000);
			case 3:
				return (dayInMonth > 31) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(5097600000);
			case 4:
				return (dayInMonth > 30) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(7776000000);
			case 5:
				return (dayInMonth > 31) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(10368000000);
			case 6:
				return (dayInMonth > 30) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(13046400000);
			case 7:
				return (dayInMonth > 31) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(15638400000);
			case 8:
				return (dayInMonth > 31) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(18316800000);
			case 9:
				return (dayInMonth > 30) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(20995200000);
			case 10:
				return (dayInMonth > 31) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(23587200000);
			case 11:
				return (dayInMonth > 30) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(26265600000);
			case 12:
				return (dayInMonth > 31) ? author$project$Vendor$Iso8601$invalidDay(dayInMonth) : succeedWith(28857600000);
			default:
				return elm_lang$parser$Parser$problem(
					'Invalid month: \"' + (elm_lang$core$String$fromInt(month) + '\"'));
		}
	}
};
var elm_lang$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0.a;
		var parseB = _n1.a;
		return elm_lang$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n2 = parseA(s0);
				if (_n2.$ === 'Bad') {
					var p = _n2.a;
					var x = _n2.b;
					return A2(elm_lang$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n2.a;
					var a = _n2.b;
					var s1 = _n2.c;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm_lang$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(
							elm_lang$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var elm_lang$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm_lang$parser$Parser$Advanced$map2, elm_lang$core$Basics$always, keepParser, ignoreParser);
	});
var elm_lang$parser$Parser$ignorer = elm_lang$parser$Parser$Advanced$ignorer;
var elm_lang$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm_lang$parser$Parser$Advanced$map2, elm_lang$core$Basics$apL, parseFunc, parseArg);
	});
var elm_lang$parser$Parser$keeper = elm_lang$parser$Parser$Advanced$keeper;
var elm_lang$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var elm_lang$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var elm_lang$core$String$isEmpty = function (string) {
	return string === '';
};
var elm_lang$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm_lang$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm_lang$core$String$isEmpty(str);
	return elm_lang$parser$Parser$Advanced$Parser(
		function (s) {
			var _n1 = A5(elm_lang$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _n1.a;
			var newRow = _n1.b;
			var newCol = _n1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				elm_lang$parser$Parser$Advanced$Bad,
				false,
				A2(elm_lang$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				elm_lang$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var elm_lang$parser$Parser$Advanced$symbol = elm_lang$parser$Parser$Advanced$token;
var elm_lang$parser$Parser$symbol = function (str) {
	return elm_lang$parser$Parser$Advanced$symbol(
		A2(
			elm_lang$parser$Parser$Advanced$Token,
			str,
			elm_lang$parser$Parser$ExpectingSymbol(str)));
};
var author$project$Vendor$Iso8601$monthYearDayInMs = A2(
	elm_lang$parser$Parser$andThen,
	author$project$Vendor$Iso8601$yearMonthDay,
	A2(
		elm_lang$parser$Parser$keeper,
		A2(
			elm_lang$parser$Parser$keeper,
			A2(
				elm_lang$parser$Parser$keeper,
				elm_lang$parser$Parser$succeed(
					F3(
						function (year, month, day) {
							return _Utils_Tuple3(year, month, day);
						})),
				A2(
					elm_lang$parser$Parser$ignorer,
					author$project$Vendor$Iso8601$paddedInt(4),
					elm_lang$parser$Parser$symbol('-'))),
			A2(
				elm_lang$parser$Parser$ignorer,
				author$project$Vendor$Iso8601$paddedInt(2),
				elm_lang$parser$Parser$symbol('-'))),
		author$project$Vendor$Iso8601$paddedInt(2)));
var author$project$Vendor$Iso8601$utcOffsetMinutesFromParts = F3(
	function (multiplier, hours, minutes) {
		return multiplier * ((hours * 60) + minutes);
	});
var elm_lang$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm_lang$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm_lang$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm_lang$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var elm_lang$parser$Parser$map = elm_lang$parser$Parser$Advanced$map;
var elm_lang$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var elm_lang$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm_lang$parser$Parser$Advanced$Bad, false, bag);
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
							$temp$bag = A2(elm_lang$parser$Parser$Advanced$Append, bag, x),
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
var elm_lang$parser$Parser$Advanced$oneOf = function (parsers) {
	return elm_lang$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm_lang$parser$Parser$Advanced$oneOfHelp, s, elm_lang$parser$Parser$Advanced$Empty, parsers);
		});
};
var elm_lang$parser$Parser$oneOf = elm_lang$parser$Parser$Advanced$oneOf;
var author$project$Vendor$Iso8601$iso8601 = A2(
	elm_lang$parser$Parser$keeper,
	A2(
		elm_lang$parser$Parser$keeper,
		A2(
			elm_lang$parser$Parser$keeper,
			A2(
				elm_lang$parser$Parser$keeper,
				A2(
					elm_lang$parser$Parser$keeper,
					A2(
						elm_lang$parser$Parser$keeper,
						elm_lang$parser$Parser$succeed(author$project$Vendor$Iso8601$fromParts),
						A2(
							elm_lang$parser$Parser$ignorer,
							author$project$Vendor$Iso8601$monthYearDayInMs,
							elm_lang$parser$Parser$symbol('T'))),
					A2(
						elm_lang$parser$Parser$ignorer,
						author$project$Vendor$Iso8601$paddedInt(2),
						elm_lang$parser$Parser$symbol(':'))),
				A2(
					elm_lang$parser$Parser$ignorer,
					author$project$Vendor$Iso8601$paddedInt(2),
					elm_lang$parser$Parser$symbol(':'))),
			A2(
				elm_lang$parser$Parser$ignorer,
				author$project$Vendor$Iso8601$paddedInt(2),
				elm_lang$parser$Parser$symbol('.'))),
		author$project$Vendor$Iso8601$paddedInt(3)),
	elm_lang$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm_lang$parser$Parser$map,
				function (_n0) {
					return 0;
				},
				elm_lang$parser$Parser$symbol('Z')),
				A2(
				elm_lang$parser$Parser$keeper,
				A2(
					elm_lang$parser$Parser$keeper,
					A2(
						elm_lang$parser$Parser$keeper,
						elm_lang$parser$Parser$succeed(author$project$Vendor$Iso8601$utcOffsetMinutesFromParts),
						elm_lang$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									elm_lang$parser$Parser$map,
									function (_n1) {
										return 1;
									},
									elm_lang$parser$Parser$symbol('+')),
									A2(
									elm_lang$parser$Parser$map,
									function (_n2) {
										return -1;
									},
									elm_lang$parser$Parser$symbol('-'))
								]))),
					A2(
						elm_lang$parser$Parser$ignorer,
						author$project$Vendor$Iso8601$paddedInt(2),
						elm_lang$parser$Parser$symbol(':'))),
				author$project$Vendor$Iso8601$paddedInt(2))
			])));
var elm_lang$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var elm_lang$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm_lang$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var elm_lang$parser$Parser$Advanced$bagToList = F2(
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
						$temp$list = A2(elm_lang$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm_lang$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm_lang$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0.a;
		var _n1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_n1.$ === 'Good') {
			var value = _n1.b;
			return elm_lang$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm_lang$core$Result$Err(
				A2(elm_lang$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm_lang$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm_lang$parser$Parser$Advanced$run, parser, source);
		if (_n0.$ === 'Ok') {
			var a = _n0.a;
			return elm_lang$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm_lang$core$Result$Err(
				A2(elm_lang$core$List$map, elm_lang$parser$Parser$problemToDeadEnd, problems));
		}
	});
var author$project$Vendor$Iso8601$toTime = function (str) {
	return A2(elm_lang$parser$Parser$run, author$project$Vendor$Iso8601$iso8601, str);
};
var author$project$Model$dateDecoder = A2(
	elm_lang$json$Json$Decode$andThen,
	function (a) {
		var _n0 = author$project$Vendor$Iso8601$toTime(a);
		if (_n0.$ === 'Ok') {
			var date = _n0.a;
			return elm_lang$json$Json$Decode$succeed(date);
		} else {
			return elm_lang$json$Json$Decode$fail('Parsing date \'' + (a + '\' failed'));
		}
	},
	elm_lang$json$Json$Decode$string);
var author$project$Model$Arrival = {$: 'Arrival'};
var author$project$Model$Departure = {$: 'Departure'};
var author$project$Model$rowTypeDecoder = A2(
	elm_lang$json$Json$Decode$andThen,
	function (a) {
		switch (a) {
			case 'ARRIVAL':
				return elm_lang$json$Json$Decode$succeed(author$project$Model$Arrival);
			case 'DEPARTURE':
				return elm_lang$json$Json$Decode$succeed(author$project$Model$Departure);
			default:
				var other = a;
				return elm_lang$json$Json$Decode$fail('\"' + (other + '\" is not a valid row type'));
		}
	},
	elm_lang$json$Json$Decode$string);
var elm_lang$json$Json$Decode$bool = _Json_decodeBool;
var elm_lang$json$Json$Decode$int = _Json_decodeInt;
var elm_lang$json$Json$Decode$maybe = function (decoder) {
	return elm_lang$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm_lang$json$Json$Decode$map, elm_lang$core$Maybe$Just, decoder),
				elm_lang$json$Json$Decode$succeed(elm_lang$core$Maybe$Nothing)
			]));
};
var author$project$Model$timetableRowsDecoder = elm_lang$json$Json$Decode$list(
	A4(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optional,
		'differenceInMinutes',
		elm_lang$json$Json$Decode$maybe(elm_lang$json$Json$Decode$int),
		elm_lang$core$Maybe$Nothing,
		A4(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optional,
			'liveEstimateTime',
			elm_lang$json$Json$Decode$maybe(author$project$Model$dateDecoder),
			elm_lang$core$Maybe$Nothing,
			A4(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optional,
				'actualTime',
				elm_lang$json$Json$Decode$maybe(author$project$Model$dateDecoder),
				elm_lang$core$Maybe$Nothing,
				A3(
					NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
					'type',
					author$project$Model$rowTypeDecoder,
					A3(
						NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
						'stationUICCode',
						elm_lang$json$Json$Decode$int,
						A3(
							NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
							'stationShortCode',
							elm_lang$json$Json$Decode$string,
							A3(
								NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
								'trainStopping',
								elm_lang$json$Json$Decode$bool,
								A3(
									NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
									'scheduledTime',
									author$project$Model$dateDecoder,
									elm_lang$json$Json$Decode$succeed(author$project$Model$TimetableRow))))))))));
var author$project$Model$Train = F5(
	function (trainNumber, lineId, timetableRows, cancelled, departingFromStation) {
		return {cancelled: cancelled, departingFromStation: departingFromStation, lineId: lineId, timetableRows: timetableRows, trainNumber: trainNumber};
	});
var elm_lang$core$List$any = F2(
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
var elm_lang$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm_lang$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm_lang$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm_lang$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm_lang$core$List$foldr,
			elm_lang$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm_lang$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm_lang$core$Maybe$Just(x);
	} else {
		return elm_lang$core$Maybe$Nothing;
	}
};
var elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm_lang$core$Maybe$Just(
				f(value));
		} else {
			return elm_lang$core$Maybe$Nothing;
		}
	});
var elm_lang$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm_lang$time$Time$posixToMillis = function (_n0) {
	var millis = _n0.a;
	return millis;
};
var author$project$Model$toTrain = F2(
	function (_n0, _n1) {
		var from = _n0.a;
		var to = _n0.b;
		var trainNumber = _n1.trainNumber;
		var lineId = _n1.lineId;
		var trainCategory = _n1.trainCategory;
		var timetableRows = _n1.timetableRows;
		var cancelled = _n1.cancelled;
		var rightDirection = function (rows) {
			var departureTime = elm_lang$core$List$head(
				A2(
					elm_lang$core$List$filterMap,
					function (row) {
						return (_Utils_eq(row.stationShortCode, from) && _Utils_eq(row.rowType, author$project$Model$Departure)) ? elm_lang$core$Maybe$Just(
							elm_lang$time$Time$posixToMillis(row.scheduledTime)) : elm_lang$core$Maybe$Nothing;
					},
					rows));
			var arrivalTimes = A2(
				elm_lang$core$List$filterMap,
				function (row) {
					return (_Utils_eq(row.stationShortCode, to) && _Utils_eq(row.rowType, author$project$Model$Arrival)) ? elm_lang$core$Maybe$Just(
						elm_lang$time$Time$posixToMillis(row.scheduledTime)) : elm_lang$core$Maybe$Nothing;
				},
				rows);
			return A2(
				elm_lang$core$Maybe$withDefault,
				false,
				A2(
					elm_lang$core$Maybe$map,
					function (dep) {
						return A2(
							elm_lang$core$List$any,
							function (arr) {
								return _Utils_cmp(arr, dep) > 0;
							},
							arrivalTimes);
					},
					departureTime));
		}(
			A2(
				elm_lang$core$List$filter,
				function ($) {
					return $.trainStopping;
				},
				timetableRows));
		var departingFromStation = elm_lang$core$List$head(
			A2(
				elm_lang$core$List$filterMap,
				function (a) {
					return (_Utils_eq(a.stationShortCode, from) && _Utils_eq(a.rowType, author$project$Model$Departure)) ? elm_lang$core$Maybe$Just(a.scheduledTime) : elm_lang$core$Maybe$Nothing;
				},
				timetableRows));
		return ((trainCategory === 'Commuter') && rightDirection) ? A2(
			elm_lang$core$Maybe$withDefault,
			elm_lang$json$Json$Decode$succeed(elm_lang$core$Maybe$Nothing),
			A2(
				elm_lang$core$Maybe$map,
				function ($) {
					return elm_lang$json$Json$Decode$succeed(
						elm_lang$core$Maybe$Just(
							A5(author$project$Model$Train, trainNumber, lineId, timetableRows, cancelled, $)));
				},
				departingFromStation)) : elm_lang$json$Json$Decode$succeed(elm_lang$core$Maybe$Nothing);
	});
var author$project$Model$trainsDecoder = function (targets) {
	return A2(
		elm_lang$json$Json$Decode$andThen,
		function ($) {
			return elm_lang$json$Json$Decode$succeed(
				elm_lang$core$Dict$fromList(
					A2(
						elm_lang$core$List$map,
						function (a) {
							return _Utils_Tuple2(a.trainNumber, a);
						},
						A2(elm_lang$core$List$filterMap, elm_lang$core$Basics$identity, $))));
		},
		elm_lang$json$Json$Decode$list(
			A2(
				elm_lang$json$Json$Decode$andThen,
				author$project$Model$toTrain(targets),
				A3(
					NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
					'cancelled',
					elm_lang$json$Json$Decode$bool,
					A3(
						NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
						'timeTableRows',
						author$project$Model$timetableRowsDecoder,
						A3(
							NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
							'trainCategory',
							elm_lang$json$Json$Decode$string,
							A3(
								NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
								'commuterLineID',
								elm_lang$json$Json$Decode$string,
								A3(
									NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
									'trainNumber',
									elm_lang$json$Json$Decode$int,
									elm_lang$json$Json$Decode$succeed(author$project$Model$TrainRaw)))))))));
};
var author$project$View$TrainsResponse = function (a) {
	return {$: 'TrainsResponse', a: a};
};
var elm_lang$url$Url$toQueryPair = function (_n0) {
	var key = _n0.a;
	var value = _n0.b;
	return key + ('=' + value);
};
var elm_lang$url$Url$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			elm_lang$core$String$join,
			'&',
			A2(elm_lang$core$List$map, elm_lang$url$Url$toQueryPair, parameters));
	}
};
var elm_lang$url$Url$crossOrigin = F3(
	function (prePath, pathSegments, parameters) {
		return prePath + ('/' + (A2(elm_lang$core$String$join, '/', pathSegments) + elm_lang$url$Url$toQuery(parameters)));
	});
var elm_lang$url$Url$QueryParameter = F2(
	function (a, b) {
		return {$: 'QueryParameter', a: a, b: b};
	});
var elm_lang$url$Url$percentEncode = _Url_percentEncode;
var elm_lang$url$Url$int = F2(
	function (key, value) {
		return A2(
			elm_lang$url$Url$QueryParameter,
			elm_lang$url$Url$percentEncode(key),
			elm_lang$core$String$fromInt(value));
	});
var author$project$Main$getTrains = function (_n0) {
	var from = _n0.a;
	var to = _n0.b;
	var trainsUrl = A3(
		elm_lang$url$Url$crossOrigin,
		'https://rata.digitraffic.fi/api/v1/live-trains/station/',
		_List_fromArray(
			[from]),
		_List_fromArray(
			[
				A2(elm_lang$url$Url$int, 'minutes_before_departure', 120),
				A2(elm_lang$url$Url$int, 'minutes_after_departure', 0),
				A2(elm_lang$url$Url$int, 'minutes_before_arrival', 0),
				A2(elm_lang$url$Url$int, 'minutes_after_arrival', 0)
			]));
	return A3(
		author$project$Main$get,
		trainsUrl,
		author$project$View$TrainsResponse,
		author$project$Model$trainsDecoder(
			_Utils_Tuple2(from, to)));
};
var author$project$Model$ScheduleRoute = F2(
	function (a, b) {
		return {$: 'ScheduleRoute', a: a, b: b};
	});
var author$project$Model$SelectDepRoute = {$: 'SelectDepRoute'};
var author$project$Model$SelectDestRoute = function (a) {
	return {$: 'SelectDestRoute', a: a};
};
var elm_lang$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm_lang$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var elm_lang$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.visited;
		var unvisited = _n0.unvisited;
		var params = _n0.params;
		var frag = _n0.frag;
		var value = _n0.value;
		return A5(
			elm_lang$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var elm_lang$url$Url$Parser$map = F2(
	function (subValue, _n0) {
		var parseArg = _n0.a;
		return elm_lang$url$Url$Parser$Parser(
			function (_n1) {
				var visited = _n1.visited;
				var unvisited = _n1.unvisited;
				var params = _n1.params;
				var frag = _n1.frag;
				var value = _n1.value;
				return A2(
					elm_lang$core$List$map,
					elm_lang$url$Url$Parser$mapState(value),
					parseArg(
						A5(elm_lang$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var elm_lang$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm_lang$core$List$foldr, elm_lang$core$List$cons, ys, xs);
		}
	});
var elm_lang$core$List$concat = function (lists) {
	return A3(elm_lang$core$List$foldr, elm_lang$core$List$append, _List_Nil, lists);
};
var elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return elm_lang$core$List$concat(
			A2(elm_lang$core$List$map, f, list));
	});
var elm_lang$url$Url$Parser$oneOf = function (parsers) {
	return elm_lang$url$Url$Parser$Parser(
		function (state) {
			return A2(
				elm_lang$core$List$concatMap,
				function (_n0) {
					var parser = _n0.a;
					return parser(state);
				},
				parsers);
		});
};
var elm_lang$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _n1 = state.unvisited;
			if (!_n1.b) {
				return elm_lang$core$Maybe$Just(state.value);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm_lang$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var elm_lang$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				elm_lang$core$List$cons,
				segment,
				elm_lang$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var elm_lang$url$Url$Parser$preparePath = function (path) {
	var _n0 = A2(elm_lang$core$String$split, '/', path);
	if (_n0.b && (_n0.a === '')) {
		var segments = _n0.b;
		return elm_lang$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _n0;
		return elm_lang$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var elm_lang$url$Url$percentDecode = _Url_percentDecode;
var elm_lang$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return elm_lang$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return elm_lang$core$Maybe$Just(
				A2(elm_lang$core$List$cons, value, list));
		}
	});
var elm_lang$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _n0 = A2(elm_lang$core$String$split, '=', segment);
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			var rawKey = _n0.a;
			var _n1 = _n0.b;
			var rawValue = _n1.a;
			var _n2 = elm_lang$url$Url$percentDecode(rawKey);
			if (_n2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm_lang$url$Url$percentDecode(rawValue);
				if (_n3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _n3.a;
					return A3(
						elm_lang$core$Dict$update,
						key,
						elm_lang$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var elm_lang$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return elm_lang$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			elm_lang$core$List$foldr,
			elm_lang$url$Url$Parser$addParam,
			elm_lang$core$Dict$empty,
			A2(elm_lang$core$String$split, '&', qry));
	}
};
var elm_lang$url$Url$Parser$parse = F2(
	function (_n0, url) {
		var parser = _n0.a;
		return elm_lang$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm_lang$url$Url$Parser$State,
					_List_Nil,
					elm_lang$url$Url$Parser$preparePath(url.path),
					elm_lang$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					elm_lang$core$Basics$identity)));
	});
var elm_lang$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0.a;
		var parseAfter = _n1.a;
		return elm_lang$url$Url$Parser$Parser(
			function (state) {
				return A2(
					elm_lang$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var elm_lang$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return elm_lang$url$Url$Parser$Parser(
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
								elm_lang$url$Url$Parser$State,
								A2(elm_lang$core$List$cons, next, visited),
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
var elm_lang$url$Url$Parser$string = A2(elm_lang$url$Url$Parser$custom, 'STRING', elm_lang$core$Maybe$Just);
var elm_lang$url$Url$Parser$top = elm_lang$url$Url$Parser$Parser(
	function (state) {
		return _List_fromArray(
			[state]);
	});
var author$project$Main$parseUrl = function (url) {
	var routeParser = elm_lang$url$Url$Parser$oneOf(
		_List_fromArray(
			[
				A2(elm_lang$url$Url$Parser$map, author$project$Model$SelectDepRoute, elm_lang$url$Url$Parser$top),
				A2(elm_lang$url$Url$Parser$map, author$project$Model$SelectDestRoute, elm_lang$url$Url$Parser$string),
				A2(
				elm_lang$url$Url$Parser$map,
				author$project$Model$ScheduleRoute,
				A2(elm_lang$url$Url$Parser$slash, elm_lang$url$Url$Parser$string, elm_lang$url$Url$Parser$string))
			]));
	return A2(
		elm_lang$core$Maybe$withDefault,
		author$project$Model$SelectDepRoute,
		A2(elm_lang$url$Url$Parser$parse, routeParser, url));
};
var elm_lang$core$Platform$Cmd$batch = _Platform_batch;
var elm_lang$core$Platform$Cmd$none = elm_lang$core$Platform$Cmd$batch(_List_Nil);
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
						_Utils_Tuple2(from, to)));
			} else {
				return _Utils_Tuple2(krisajenkins$remotedata$RemoteData$NotAsked, elm_lang$core$Platform$Cmd$none);
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
var author$project$Main$init = function (env) {
	var _n0 = A2(
		author$project$Main$urlChange,
		{
			currentTime: elm_lang$time$Time$millisToPosix(env.flags),
			lastRequestTime: elm_lang$core$Maybe$Nothing,
			route: author$project$Model$SelectDepRoute,
			stations: elm_lang$core$Dict$empty,
			trains: krisajenkins$remotedata$RemoteData$NotAsked
		},
		env.url);
	var model = _n0.a;
	var trainsCmd = _n0.b;
	return _Utils_Tuple2(
		model,
		elm_lang$core$Platform$Cmd$batch(
			_List_fromArray(
				[author$project$Main$getStations, trainsCmd])));
};
var author$project$View$UpdateTime = function (a) {
	return {$: 'UpdateTime', a: a};
};
var elm_lang$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var elm_lang$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var elm_lang$time$Time$init = elm_lang$core$Task$succeed(
	A2(elm_lang$time$Time$State, elm_lang$core$Dict$empty, elm_lang$core$Dict$empty));
var elm_lang$core$Dict$foldl = F3(
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
					A3(elm_lang$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
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
					return (_Utils_cmp(lKey, rKey) < 0) ? A3(
						stepState,
						rKey,
						rValue,
						_Utils_Tuple2(
							rest,
							A3(leftStep, lKey, lValue, result))) : ((_Utils_cmp(lKey, rKey) > 0) ? _Utils_Tuple2(
						list,
						A3(rightStep, rKey, rValue, result)) : _Utils_Tuple2(
						rest,
						A4(bothStep, lKey, lValue, rValue, result)));
				}
			});
		var _n3 = A3(
			elm_lang$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm_lang$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm_lang$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm_lang$core$Process$kill = _Scheduler_kill;
var elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm_lang$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm_lang$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm_lang$core$Maybe$Just(value);
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
var elm_lang$time$Time$addMySub = F2(
	function (_n0, state) {
		var interval = _n0.a;
		var tagger = _n0.b;
		var _n1 = A2(elm_lang$core$Dict$get, interval, state);
		if (_n1.$ === 'Nothing') {
			return A3(
				elm_lang$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _n1.a;
			return A3(
				elm_lang$core$Dict$insert,
				interval,
				A2(elm_lang$core$List$cons, tagger, taggers),
				state);
		}
	});
var elm_lang$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm_lang$core$Process$spawn = _Scheduler_spawn;
var elm_lang$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var elm_lang$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var elm_lang$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var elm_lang$time$Time$customZone = elm_lang$time$Time$Zone;
var elm_lang$time$Time$setInterval = _Time_setInterval;
var elm_lang$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return elm_lang$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = elm_lang$core$Process$spawn(
				A2(
					elm_lang$time$Time$setInterval,
					interval,
					A2(elm_lang$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					elm_lang$time$Time$spawnHelp,
					router,
					rest,
					A3(elm_lang$core$Dict$insert, interval, id, processes));
			};
			return A2(elm_lang$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var elm_lang$time$Time$onEffects = F3(
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
						elm_lang$core$Task$andThen,
						function (_n5) {
							return kills;
						},
						elm_lang$core$Process$kill(id)));
			});
		var newTaggers = A3(elm_lang$core$List$foldl, elm_lang$time$Time$addMySub, elm_lang$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _n4) {
				var spawns = _n4.a;
				var existing = _n4.b;
				var kills = _n4.c;
				return _Utils_Tuple3(
					A2(elm_lang$core$List$cons, interval, spawns),
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
					A3(elm_lang$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _n1 = A6(
			elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				elm_lang$core$Dict$empty,
				elm_lang$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _n1.a;
		var existingDict = _n1.b;
		var killTask = _n1.c;
		return A2(
			elm_lang$core$Task$andThen,
			function (newProcesses) {
				return elm_lang$core$Task$succeed(
					A2(elm_lang$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				elm_lang$core$Task$andThen,
				function (_n2) {
					return A3(elm_lang$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var elm_lang$time$Time$now = _Time_now(elm_lang$time$Time$millisToPosix);
var elm_lang$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _n0 = A2(elm_lang$core$Dict$get, interval, state.taggers);
		if (_n0.$ === 'Nothing') {
			return elm_lang$core$Task$succeed(state);
		} else {
			var taggers = _n0.a;
			var tellTaggers = function (time) {
				return elm_lang$core$Task$sequence(
					A2(
						elm_lang$core$List$map,
						function (tagger) {
							return A2(
								elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				elm_lang$core$Task$andThen,
				function (_n1) {
					return elm_lang$core$Task$succeed(state);
				},
				A2(elm_lang$core$Task$andThen, tellTaggers, elm_lang$time$Time$now));
		}
	});
var elm_lang$time$Time$subMap = F2(
	function (f, _n0) {
		var interval = _n0.a;
		var tagger = _n0.b;
		return A2(
			elm_lang$time$Time$Every,
			interval,
			function ($) {
				return f(
					tagger($));
			});
	});
_Platform_effectManagers['Time'] = _Platform_createManager(elm_lang$time$Time$init, elm_lang$time$Time$onEffects, elm_lang$time$Time$onSelfMsg, 0, elm_lang$time$Time$subMap);
var elm_lang$time$Time$subscription = _Platform_leaf('Time');
var elm_lang$time$Time$every = F2(
	function (interval, tagger) {
		return elm_lang$time$Time$subscription(
			A2(elm_lang$time$Time$Every, interval, tagger));
	});
var author$project$Main$subscriptions = function (model) {
	return A2(elm_lang$time$Time$every, 1000, author$project$View$UpdateTime);
};
var elm_lang$core$Basics$ge = _Utils_ge;
var author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'UrlChange':
				var url = msg.a;
				return A2(author$project$Main$urlChange, model, url);
			case 'UpdateTime':
				var time = msg.a;
				var _n1 = A2(
					elm_lang$core$Maybe$withDefault,
					_Utils_Tuple2(
						elm_lang$core$Maybe$Just(model.currentTime),
						_List_Nil),
					A2(
						elm_lang$core$Maybe$map,
						function (requestTime) {
							var _n2 = model.route;
							if (_n2.$ === 'ScheduleRoute') {
								var from = _n2.a;
								var to = _n2.b;
								return ((elm_lang$time$Time$posixToMillis(model.currentTime) - elm_lang$time$Time$posixToMillis(requestTime)) >= 10000) ? _Utils_Tuple2(
									elm_lang$core$Maybe$Just(model.currentTime),
									_List_fromArray(
										[
											author$project$Main$getTrains(
											_Utils_Tuple2(from, to))
										])) : _Utils_Tuple2(model.lastRequestTime, _List_Nil);
							} else {
								return _Utils_Tuple2(model.lastRequestTime, _List_Nil);
							}
						},
						model.lastRequestTime));
				var lastRequestTime = _n1.a;
				var cmds = _n1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{currentTime: time, lastRequestTime: lastRequestTime}),
					elm_lang$core$Platform$Cmd$batch(cmds));
			case 'TrainsResponse':
				var webData = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{trains: webData}),
					elm_lang$core$Platform$Cmd$none);
			default:
				if (msg.a.$ === 'Success') {
					var stations = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{stations: stations}),
						elm_lang$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm_lang$core$Platform$Cmd$none);
				}
		}
	});
var author$project$View$UrlChange = function (a) {
	return {$: 'UrlChange', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 'Rgba', a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Element$rgb = F3(
	function (r, g, b) {
		return A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, r, g, b, 1);
	});
var author$project$View$colors = {
	black: A3(mdgriffith$stylish_elephants$Element$rgb, 3.9e-2, 3.9e-2, 3.9e-2),
	gray: A3(mdgriffith$stylish_elephants$Element$rgb, 0.726, 0.726, 0.726),
	lightGray: A3(mdgriffith$stylish_elephants$Element$rgb, 0.93, 0.93, 0.93),
	offSchedule: A3(mdgriffith$stylish_elephants$Element$rgb, 0.643, 0, 0),
	onTime: A3(mdgriffith$stylish_elephants$Element$rgb, 0.306, 0.604, 1.7e-2),
	purple: A3(mdgriffith$stylish_elephants$Element$rgb, 0.29, 7.8e-2, 0.549),
	slightlyOffSchedule: A3(mdgriffith$stylish_elephants$Element$rgb, 0.96, 0.474, 0),
	white: A3(mdgriffith$stylish_elephants$Element$rgb, 1, 1, 1)
};
var author$project$View$rem = function (x) {
	return x * 16;
};
var elm_lang$core$Basics$pow = _Basics_pow;
var author$project$View$ts = function (scale) {
	return A2(elm_lang$core$Basics$pow, 1.33, scale) * author$project$View$rem(1);
};
var elm_lang$core$Basics$round = _Basics_round;
var mdgriffith$stylish_elephants$Internal$Flag$Flag = function (a) {
	return {$: 'Flag', a: a};
};
var mdgriffith$stylish_elephants$Internal$Flag$col = function (i) {
	return mdgriffith$stylish_elephants$Internal$Flag$Flag(
		A2(elm_lang$core$Basics$pow, 2, i));
};
var mdgriffith$stylish_elephants$Internal$Flag$spacing = mdgriffith$stylish_elephants$Internal$Flag$col(3);
var mdgriffith$stylish_elephants$Internal$Model$SpacingStyle = F2(
	function (a, b) {
		return {$: 'SpacingStyle', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 'StyleClass', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$spacing = function (x) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$spacing,
		A2(mdgriffith$stylish_elephants$Internal$Model$SpacingStyle, x, x));
};
var mdgriffith$stylish_elephants$Internal$Flag$fontColor = mdgriffith$stylish_elephants$Internal$Flag$col(14);
var mdgriffith$stylish_elephants$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 'Colored', a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Internal$Model$floatClass = function (x) {
	return elm_lang$core$String$fromInt(
		elm_lang$core$Basics$round(x * 100));
};
var mdgriffith$stylish_elephants$Internal$Model$formatColorClass = function (_n0) {
	var red = _n0.a;
	var green = _n0.b;
	var blue = _n0.c;
	var alpha = _n0.d;
	return mdgriffith$stylish_elephants$Internal$Model$floatClass(red) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(green) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(blue) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(alpha))))));
};
var mdgriffith$stylish_elephants$Element$Font$color = function (fontColor) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$fontColor,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Colored,
			'fc-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var mdgriffith$stylish_elephants$Internal$Flag$fontSize = mdgriffith$stylish_elephants$Internal$Flag$col(4);
var mdgriffith$stylish_elephants$Internal$Model$FontSize = function (a) {
	return {$: 'FontSize', a: a};
};
var mdgriffith$stylish_elephants$Element$Font$size = function (i) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$fontSize,
		mdgriffith$stylish_elephants$Internal$Model$FontSize(i));
};
var author$project$View$headingStyles = _List_fromArray(
	[
		mdgriffith$stylish_elephants$Element$Font$size(
		elm_lang$core$Basics$round(
			author$project$View$ts(2))),
		mdgriffith$stylish_elephants$Element$spacing(2),
		mdgriffith$stylish_elephants$Element$Font$color(author$project$View$colors.black)
	]);
var elm_lang$virtual_dom$VirtualDom$isSync = function (timed) {
	if (timed.$ === 'Sync') {
		return true;
	} else {
		return false;
	}
};
var elm_lang$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
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
var elm_lang$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm_lang$svg$Svg$path = elm_lang$svg$Svg$trustedNode('path');
var elm_lang$svg$Svg$svg = elm_lang$svg$Svg$trustedNode('svg');
var elm_lang$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var elm_lang$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm_lang$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm_lang$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var elm_lang$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var elm_lang$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var elm_lang$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm_lang$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var author$project$Icons$swap = function (floatSize) {
	var size = elm_lang$core$String$fromInt(
		elm_lang$core$Basics$round(floatSize));
	return A2(
		elm_lang$svg$Svg$svg,
		_List_fromArray(
			[
				elm_lang$svg$Svg$Attributes$viewBox('0 0 13 13'),
				elm_lang$svg$Svg$Attributes$width(size),
				elm_lang$svg$Svg$Attributes$height(size)
			]),
		_List_fromArray(
			[
				A2(
				elm_lang$svg$Svg$path,
				_List_fromArray(
					[
						elm_lang$svg$Svg$Attributes$strokeWidth('0.7'),
						elm_lang$svg$Svg$Attributes$strokeLinecap('round'),
						elm_lang$svg$Svg$Attributes$stroke('#babdb6'),
						elm_lang$svg$Svg$Attributes$fill('none'),
						elm_lang$svg$Svg$Attributes$d('M4 2 v10 M2 4 L4 2 M6 4 L4 2' + 'M8 12 v-10 M6 10 L8 12 M10 10 L8 12')
					]),
				_List_Nil)
			]));
};
var elm_lang$core$Dict$values = function (dict) {
	return A3(
		elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(elm_lang$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var elm_lang$core$List$sortBy = _List_sortBy;
var author$project$Model$sortedTrainList = function (trains) {
	return A2(
		elm_lang$core$List$sortBy,
		function ($) {
			return elm_lang$time$Time$posixToMillis($.departingFromStation);
		},
		elm_lang$core$Dict$values(trains));
};
var author$project$View$stationName = F2(
	function (stations, shortCode) {
		return A2(
			elm_lang$core$Maybe$withDefault,
			shortCode,
			A2(elm_lang$core$Dict$get, shortCode, stations));
	});
var elm_lang$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm_lang$core$Maybe$Nothing;
		}
	});
var author$project$View$formatDifference = F2(
	function (_default, differenceInMinutes) {
		var stringify = function (n) {
			return (!n) ? elm_lang$core$Maybe$Nothing : ((n < 0) ? elm_lang$core$Maybe$Just(
				elm_lang$core$String$fromInt(
					elm_lang$core$Basics$abs(n)) + ' min early') : elm_lang$core$Maybe$Just(
				elm_lang$core$String$fromInt(n) + ' min late'));
		};
		return A2(
			elm_lang$core$Maybe$withDefault,
			_default,
			A2(elm_lang$core$Maybe$andThen, stringify, differenceInMinutes));
	});
var author$project$View$prettyMinutes = function (timeDiff) {
	return '%M:%S';
};
var mdgriffith$stylish_elephants$Element$rgba = mdgriffith$stylish_elephants$Internal$Model$Rgba;
var mdgriffith$stylish_elephants$Internal$Model$BoxShadow = function (a) {
	return {$: 'BoxShadow', a: a};
};
var mdgriffith$stylish_elephants$Element$Border$shadow = function (shade) {
	return mdgriffith$stylish_elephants$Internal$Model$BoxShadow(
		{blur: shade.blur, color: shade.color, inset: false, offset: shade.offset, size: shade.size});
};
var author$project$View$shadow = mdgriffith$stylish_elephants$Element$Border$shadow(
	{
		blur: 10,
		color: A4(mdgriffith$stylish_elephants$Element$rgba, 0, 0, 0, 0.1),
		offset: _Utils_Tuple2(1, 5),
		size: 0
	});
var author$project$View$prettyTime = function (time) {
	return '%H.%M';
};
var author$project$View$timeWidth = elm_lang$core$Basics$round(
	author$project$View$rem(3));
var author$project$View$timelinessColor = function (difference) {
	return (elm_lang$core$Basics$abs(difference) <= 1) ? author$project$View$colors.onTime : ((elm_lang$core$Basics$abs(difference) <= 5) ? author$project$View$colors.slightlyOffSchedule : author$project$View$colors.offSchedule);
};
var mdgriffith$stylish_elephants$Internal$Model$Fill = function (a) {
	return {$: 'Fill', a: a};
};
var mdgriffith$stylish_elephants$Element$fill = mdgriffith$stylish_elephants$Internal$Model$Fill(1);
var mdgriffith$stylish_elephants$Internal$Model$Height = function (a) {
	return {$: 'Height', a: a};
};
var mdgriffith$stylish_elephants$Element$height = mdgriffith$stylish_elephants$Internal$Model$Height;
var mdgriffith$stylish_elephants$Internal$Model$Width = function (a) {
	return {$: 'Width', a: a};
};
var mdgriffith$stylish_elephants$Element$width = mdgriffith$stylish_elephants$Internal$Model$Width;
var mdgriffith$stylish_elephants$Internal$Model$Unkeyed = function (a) {
	return {$: 'Unkeyed', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AsColumn = {$: 'AsColumn'};
var mdgriffith$stylish_elephants$Internal$Model$asColumn = mdgriffith$stylish_elephants$Internal$Model$AsColumn;
var elm_lang$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var elm_lang$core$Set$empty = elm_lang$core$Set$Set_elm_builtin(elm_lang$core$Dict$empty);
var elm_lang$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var elm_lang$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm_lang$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm_lang$virtual_dom$VirtualDom$text = _VirtualDom_text;
var mdgriffith$stylish_elephants$Internal$Flag$heightContent = mdgriffith$stylish_elephants$Internal$Flag$col(36);
var elm_lang$core$Bitwise$and = _Bitwise_and;
var mdgriffith$stylish_elephants$Internal$Flag$present = F2(
	function (_n0, _n1) {
		var query = _n0.a;
		var truth = _n1.a;
		return _Utils_eq(query & truth, query);
	});
var mdgriffith$stylish_elephants$Internal$Flag$widthContent = mdgriffith$stylish_elephants$Internal$Flag$col(38);
var mdgriffith$stylish_elephants$Internal$Model$Keyed = function (a) {
	return {$: 'Keyed', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Styled = function (a) {
	return {$: 'Styled', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AsEl = {$: 'AsEl'};
var mdgriffith$stylish_elephants$Internal$Model$asEl = mdgriffith$stylish_elephants$Internal$Model$AsEl;
var elm_lang$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return elm_lang$core$Set$Set_elm_builtin(
			A3(elm_lang$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm_lang$core$Dict$get, key, dict);
		if (_n0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var elm_lang$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return A2(elm_lang$core$Dict$member, key, dict);
	});
var mdgriffith$stylish_elephants$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 'Px':
			var px = x.a;
			return elm_lang$core$String$fromInt(px) + 'px';
		case 'Content':
			return 'auto';
		case 'Fill':
			var i = x.a;
			return elm_lang$core$String$fromInt(i) + 'fr';
		case 'Min':
			var min = x.a;
			var len = x.b;
			return 'min' + (elm_lang$core$String$fromInt(min) + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + (elm_lang$core$String$fromInt(max) + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(len));
	}
};
var mdgriffith$stylish_elephants$Internal$Model$pseudoClassName = function (_class) {
	switch (_class.$) {
		case 'Focus':
			return 'focus';
		case 'Hover':
			return 'hover';
		default:
			return 'active';
	}
};
var mdgriffith$stylish_elephants$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 'Shadows':
			var name = style.a;
			return name;
		case 'Transparency':
			var name = style.a;
			var o = style.b;
			return name;
		case 'Style':
			var _class = style.a;
			return _class;
		case 'FontFamily':
			var name = style.a;
			return name;
		case 'FontSize':
			var i = style.a;
			return 'font-size-' + elm_lang$core$String$fromInt(i);
		case 'Single':
			var _class = style.a;
			return _class;
		case 'Colored':
			var _class = style.a;
			return _class;
		case 'SpacingStyle':
			var x = style.a;
			var y = style.b;
			return 'spacing-' + (elm_lang$core$String$fromInt(x) + ('-' + elm_lang$core$String$fromInt(y)));
		case 'PaddingStyle':
			var top = style.a;
			var right = style.b;
			var bottom = style.c;
			var left = style.d;
			return 'pad-' + (elm_lang$core$String$fromInt(top) + ('-' + (elm_lang$core$String$fromInt(right) + ('-' + (elm_lang$core$String$fromInt(bottom) + ('-' + elm_lang$core$String$fromInt(left)))))));
		case 'GridTemplateStyle':
			var template = style.a;
			return 'grid-rows-' + (A2(
				elm_lang$core$String$join,
				'-',
				A2(elm_lang$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
				elm_lang$core$String$join,
				'-',
				A2(elm_lang$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + (mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.spacing.b)))))));
		case 'GridPosition':
			var pos = style.a;
			return 'grid-pos-' + (elm_lang$core$String$fromInt(pos.row) + ('-' + (elm_lang$core$String$fromInt(pos.col) + ('-' + (elm_lang$core$String$fromInt(pos.width) + ('-' + elm_lang$core$String$fromInt(pos.height)))))));
		case 'PseudoSelector':
			var selector = style.a;
			var subStyle = style.b;
			return A2(
				elm_lang$core$String$join,
				' ',
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$pseudoClassName(selector),
					A2(elm_lang$core$List$map, mdgriffith$stylish_elephants$Internal$Model$getStyleName, subStyle)));
		default:
			return 'transformation';
	}
};
var mdgriffith$stylish_elephants$Internal$Model$reduceStyles = F2(
	function (style, _n0) {
		var cache = _n0.a;
		var existing = _n0.b;
		var styleName = mdgriffith$stylish_elephants$Internal$Model$getStyleName(style);
		return A2(elm_lang$core$Set$member, styleName, cache) ? _Utils_Tuple2(cache, existing) : _Utils_Tuple2(
			A2(elm_lang$core$Set$insert, styleName, cache),
			A2(elm_lang$core$List$cons, style, existing));
	});
var elm_lang$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var mdgriffith$stylish_elephants$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 'Property', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 'Style', a: a, b: b};
	});
var elm_lang$core$String$fromFloat = _String_fromNumber;
var mdgriffith$stylish_elephants$Internal$Model$formatColor = function (_n0) {
	var red = _n0.a;
	var green = _n0.b;
	var blue = _n0.c;
	var alpha = _n0.d;
	return 'rgba(' + (elm_lang$core$String$fromInt(
		elm_lang$core$Basics$round(red * 255)) + ((',' + elm_lang$core$String$fromInt(
		elm_lang$core$Basics$round(green * 255))) + ((',' + elm_lang$core$String$fromInt(
		elm_lang$core$Basics$round(blue * 255))) + (',' + (elm_lang$core$String$fromFloat(alpha) + ')')))));
};
var mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		elm_lang$core$String$join,
		' ',
		A2(
			elm_lang$core$List$filterMap,
			elm_lang$core$Basics$identity,
			_List_fromArray(
				[
					shadow.inset ? elm_lang$core$Maybe$Just('inset') : elm_lang$core$Maybe$Nothing,
					elm_lang$core$Maybe$Just(
					elm_lang$core$String$fromFloat(shadow.offset.a) + 'px'),
					elm_lang$core$Maybe$Just(
					elm_lang$core$String$fromFloat(shadow.offset.b) + 'px'),
					elm_lang$core$Maybe$Just(
					elm_lang$core$String$fromFloat(shadow.blur) + 'px'),
					elm_lang$core$Maybe$Just(
					elm_lang$core$String$fromFloat(shadow.size) + 'px'),
					elm_lang$core$Maybe$Just(
					mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.color))
				])));
};
var mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle = function (focus) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$Style,
		'.se:focus .focusable, .se.focusable:focus',
		A2(
			elm_lang$core$List$filterMap,
			elm_lang$core$Basics$identity,
			_List_fromArray(
				[
					A2(
					elm_lang$core$Maybe$map,
					function (color) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'border-color',
							mdgriffith$stylish_elephants$Internal$Model$formatColor(color));
					},
					focus.borderColor),
					A2(
					elm_lang$core$Maybe$map,
					function (color) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'background-color',
							mdgriffith$stylish_elephants$Internal$Model$formatColor(color));
					},
					focus.backgroundColor),
					A2(
					elm_lang$core$Maybe$map,
					function (shadow) {
						return A2(
							mdgriffith$stylish_elephants$Internal$Model$Property,
							'box-shadow',
							mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(
								{
									blur: shadow.blur,
									color: shadow.color,
									inset: false,
									offset: A2(
										elm_lang$core$Tuple$mapSecond,
										elm_lang$core$Basics$toFloat,
										A2(elm_lang$core$Tuple$mapFirst, elm_lang$core$Basics$toFloat, shadow.offset)),
									size: shadow.size
								}));
					},
					focus.shadow),
					elm_lang$core$Maybe$Just(
					A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'outline', 'none'))
				])));
};
var elm_lang$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var mdgriffith$stylish_elephants$Internal$Flag$alignBottom = mdgriffith$stylish_elephants$Internal$Flag$col(41);
var mdgriffith$stylish_elephants$Internal$Flag$alignRight = mdgriffith$stylish_elephants$Internal$Flag$col(40);
var mdgriffith$stylish_elephants$Internal$Flag$centerX = mdgriffith$stylish_elephants$Internal$Flag$col(42);
var mdgriffith$stylish_elephants$Internal$Flag$centerY = mdgriffith$stylish_elephants$Internal$Flag$col(43);
var mdgriffith$stylish_elephants$Internal$Flag$heightFill = mdgriffith$stylish_elephants$Internal$Flag$col(37);
var mdgriffith$stylish_elephants$Internal$Flag$widthFill = mdgriffith$stylish_elephants$Internal$Flag$col(39);
var elm_lang$json$Json$Encode$string = _Json_wrap;
var elm_lang$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var mdgriffith$stylish_elephants$Internal$Model$vDomClass = function (cls) {
	return A2(
		elm_lang$virtual_dom$VirtualDom$property,
		'className',
		elm_lang$json$Json$Encode$string(cls));
};
var mdgriffith$stylish_elephants$Internal$Style$classes = {above: 'a', active: 'av', alignBottom: 'ab', alignCenterX: 'cx', alignCenterY: 'cy', alignContainerBottom: 'acb', alignContainerCenterX: 'accx', alignContainerCenterY: 'accy', alignContainerRight: 'acr', alignLeft: 'al', alignRight: 'ar', alignTop: 'at', any: 's', behind: 'bh', below: 'b', bold: 'w7', borderDashed: 'bd', borderDotted: 'bdt', borderNone: 'bn', borderSolid: 'bs', capturePointerEvents: 'cpe', clip: 'cp', clipX: 'cpx', clipY: 'cpy', column: 'c', container: 'cr', contentBottom: 'cb', contentCenterX: 'ccx', contentCenterY: 'ccy', contentLeft: 'cl', contentRight: 'cr', contentTop: 'ct', cursorPointer: 'cptr', cursorText: 'ctxt', focus: 'fs', grid: 'g', heightContent: 'hc', heightFill: 'hf', heightFillPortion: 'hfp', hover: 'hv', inFront: 'fr', italic: 'i', noTextSelection: 'notxt', onLeft: 'ol', onRight: 'or', opaque: 'oq', overflowHidden: 'oh', page: 'pg', paragraph: 'p', passPointerEvents: 'ppe', root: 'se', row: 'r', scrollbars: 'sb', scrollbarsX: 'sbx', scrollbarsY: 'sby', seButton: 'sb', single: 'e', spaceEvenly: 'se', strike: 'sk', text: 't', textCenter: 'tc', textExtraBold: 'w8', textExtraLight: 'w2', textHeavy: 'w9', textJustify: 'tj', textJustifyAll: 'tja', textLeft: 'tl', textLight: 'w3', textMedium: 'w5', textNormalWeight: 'w4', textRight: 'tr', textSemiBold: 'w6', textThin: 'w1', textUnitalicized: 'tun', transition: 'ts', transparent: 'clr', underline: 'u', widthContent: 'wc', widthExact: 'we', widthFill: 'wf', widthFillPortion: 'wfp'};
var mdgriffith$stylish_elephants$Internal$Model$renderNode = F4(
	function (_n0, children, styles, context) {
		var attributes = _n0.attributes;
		var node = _n0.node;
		var has = _n0.has;
		var createNode = F3(
			function (nodeName, attrs, withStyles) {
				if (children.$ === 'Keyed') {
					var keyed = children.a;
					return A3(
						elm_lang$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							if (withStyles.$ === 'Nothing') {
								return keyed;
							} else {
								var stylesheet = withStyles.a;
								return A2(
									elm_lang$core$List$cons,
									_Utils_Tuple2(
										'stylesheet',
										A3(
											elm_lang$virtual_dom$VirtualDom$node,
											'style',
											_List_fromArray(
												[
													mdgriffith$stylish_elephants$Internal$Model$vDomClass('stylesheet')
												]),
											_List_fromArray(
												[
													elm_lang$virtual_dom$VirtualDom$text(stylesheet)
												]))),
									keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A3(
						elm_lang$virtual_dom$VirtualDom$node,
						nodeName,
						attrs,
						function () {
							if (withStyles.$ === 'Nothing') {
								return unkeyed;
							} else {
								var stylesheet = withStyles.a;
								return A2(
									elm_lang$core$List$cons,
									A3(
										elm_lang$virtual_dom$VirtualDom$node,
										'style',
										_List_fromArray(
											[
												mdgriffith$stylish_elephants$Internal$Model$vDomClass('stylesheet')
											]),
										_List_fromArray(
											[
												elm_lang$virtual_dom$VirtualDom$text(stylesheet)
											])),
									unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 'Generic':
					return A3(createNode, 'div', attributes, styles);
				case 'NodeName':
					var nodeName = node.a;
					return A3(createNode, nodeName, attributes, styles);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						elm_lang$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A3(
								createNode,
								internal,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Internal$Model$vDomClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.single))
									]),
								styles)
							]));
			}
		}();
		switch (context.$) {
			case 'AsRow':
				return A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$widthFill, has) ? html : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$alignRight, has) ? A3(
					elm_lang$virtual_dom$VirtualDom$node,
					'u',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm_lang$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.container, mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY, mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerRight])))
						]),
					_List_fromArray(
						[html])) : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$centerX, has) ? A3(
					elm_lang$virtual_dom$VirtualDom$node,
					's',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm_lang$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.container, mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY, mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX])))
						]),
					_List_fromArray(
						[html])) : html));
			case 'AsColumn':
				return A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$heightFill, has) ? html : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$centerY, has) ? A3(
					elm_lang$virtual_dom$VirtualDom$node,
					's',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm_lang$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.container, mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY])))
						]),
					_List_fromArray(
						[html])) : (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$alignBottom, has) ? A3(
					elm_lang$virtual_dom$VirtualDom$node,
					'u',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							A2(
								elm_lang$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.container, mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerBottom])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$textElement = function (str) {
	return A3(
		elm_lang$virtual_dom$VirtualDom$node,
		'div',
		_List_fromArray(
			[
				A2(
				elm_lang$virtual_dom$VirtualDom$property,
				'className',
				elm_lang$json$Json$Encode$string(
					A2(
						elm_lang$core$String$join,
						' ',
						_List_fromArray(
							[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.text, mdgriffith$stylish_elephants$Internal$Style$classes.widthContent, mdgriffith$stylish_elephants$Internal$Style$classes.heightContent]))))
			]),
		_List_fromArray(
			[
				elm_lang$virtual_dom$VirtualDom$text(str)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$textElementFill = function (str) {
	return A3(
		elm_lang$virtual_dom$VirtualDom$node,
		'div',
		_List_fromArray(
			[
				A2(
				elm_lang$virtual_dom$VirtualDom$property,
				'className',
				elm_lang$json$Json$Encode$string(
					A2(
						elm_lang$core$String$join,
						' ',
						_List_fromArray(
							[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.text, mdgriffith$stylish_elephants$Internal$Style$classes.widthFill, mdgriffith$stylish_elephants$Internal$Style$classes.heightFill]))))
			]),
		_List_fromArray(
			[
				elm_lang$virtual_dom$VirtualDom$text(str)
			]));
};
var elm_lang$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var mdgriffith$stylish_elephants$Internal$Model$Active = {$: 'Active'};
var mdgriffith$stylish_elephants$Internal$Model$Focus = {$: 'Focus'};
var mdgriffith$stylish_elephants$Internal$Model$Hover = {$: 'Hover'};
var mdgriffith$stylish_elephants$Internal$Model$renderFont = function (families) {
	var fontName = function (font) {
		switch (font.$) {
			case 'Serif':
				return 'serif';
			case 'SansSerif':
				return 'sans-serif';
			case 'Monospace':
				return 'monospace';
			case 'Typeface':
				var name = font.a;
				return '\"' + (name + '\"');
			default:
				var name = font.a;
				var url = font.b;
				return '\"' + (name + '\"');
		}
	};
	return A2(
		elm_lang$core$String$join,
		', ',
		A2(elm_lang$core$List$map, fontName, families));
};
var mdgriffith$stylish_elephants$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var renderTopLevels = function (rule) {
			if (rule.$ === 'FontFamily') {
				var name = rule.a;
				var typefaces = rule.b;
				var getImports = function (font) {
					if (font.$ === 'ImportFont') {
						var url = font.b;
						return elm_lang$core$Maybe$Just('@import url(\'' + (url + '\');'));
					} else {
						return elm_lang$core$Maybe$Nothing;
					}
				};
				return elm_lang$core$Maybe$Just(
					A2(
						elm_lang$core$String$join,
						'\n',
						A2(elm_lang$core$List$filterMap, getImports, typefaces)));
			} else {
				return elm_lang$core$Maybe$Nothing;
			}
		};
		var renderProps = F3(
			function (force, _n18, existing) {
				var key = _n18.a;
				var val = _n18.b;
				return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
			});
		var renderStyle = F4(
			function (force, maybePseudo, selector, props) {
				if (maybePseudo.$ === 'Nothing') {
					return selector + ('{' + (A3(
						elm_lang$core$List$foldl,
						renderProps(force),
						'',
						props) + '\n}'));
				} else {
					var pseudo = maybePseudo.a;
					switch (pseudo.$) {
						case 'Hover':
							return selector + (':hover {' + (A3(
								elm_lang$core$List$foldl,
								renderProps(force),
								'',
								props) + '\n}'));
						case 'Focus':
							var renderedProps = A3(
								elm_lang$core$List$foldl,
								renderProps(force),
								'',
								props);
							return A2(
								elm_lang$core$String$join,
								'\n',
								_List_fromArray(
									[selector + (':focus {' + (renderedProps + '\n}')), '.se:focus ~ ' + (selector + (':not(.focus)  {' + (renderedProps + '\n}'))), '.se:focus ' + (selector + ('  {' + (renderedProps + '\n}')))]));
						default:
							return selector + (':active {' + (A3(
								elm_lang$core$List$foldl,
								renderProps(force),
								'',
								props) + '\n}'));
					}
				}
			});
		var renderStyleRule = F3(
			function (rule, maybePseudo, force) {
				switch (rule.$) {
					case 'Style':
						var selector = rule.a;
						var props = rule.b;
						return A4(renderStyle, force, maybePseudo, selector, props);
					case 'Shadows':
						var name = rule.a;
						var prop = rule.b;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'box-shadow', prop)
								]));
					case 'Transparency':
						var name = rule.a;
						var transparency = rule.b;
						var opacity = A2(
							elm_lang$core$Basics$max,
							0,
							A2(elm_lang$core$Basics$min, 1, 1 - transparency));
						return (opacity <= 0) ? A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'opacity', '0'),
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'pointer-events', 'none')
								])) : A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'opacity',
									elm_lang$core$String$fromFloat(opacity)),
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'pointer-events', 'auto')
								]));
					case 'FontSize':
						var i = rule.a;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.font-size-' + elm_lang$core$String$fromInt(i),
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'font-size',
									elm_lang$core$String$fromInt(i) + 'px')
								]));
					case 'FontFamily':
						var name = rule.a;
						var typefaces = rule.b;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							'.' + name,
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'font-family',
									mdgriffith$stylish_elephants$Internal$Model$renderFont(typefaces))
								]));
					case 'Single':
						var _class = rule.a;
						var prop = rule.b;
						var val = rule.c;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							_class,
							_List_fromArray(
								[
									A2(mdgriffith$stylish_elephants$Internal$Model$Property, prop, val)
								]));
					case 'Colored':
						var _class = rule.a;
						var prop = rule.b;
						var color = rule.c;
						return A4(
							renderStyle,
							force,
							maybePseudo,
							_class,
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									prop,
									mdgriffith$stylish_elephants$Internal$Model$formatColor(color))
								]));
					case 'SpacingStyle':
						var x = rule.a;
						var y = rule.b;
						var yPx = elm_lang$core$String$fromInt(y) + 'px';
						var xPx = elm_lang$core$String$fromInt(x) + 'px';
						var row = '.' + function ($) {
							return $.row;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var right = '.' + function ($) {
							return $.alignRight;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var paragraph = '.' + function ($) {
							return $.paragraph;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var page = '.' + function ($) {
							return $.page;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var left = '.' + function ($) {
							return $.alignLeft;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var column = '.' + function ($) {
							return $.column;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						var _class = '.spacing-' + (elm_lang$core$String$fromInt(x) + ('-' + elm_lang$core$String$fromInt(y)));
						var any = '.' + function ($) {
							return $.any;
						}(mdgriffith$stylish_elephants$Internal$Style$classes);
						return A3(
							elm_lang$core$List$foldl,
							elm_lang$core$Basics$append,
							'',
							_List_fromArray(
								[
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (row + (' > ' + (any + (' + ' + any)))),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (column + (' > ' + (any + (' + ' + any)))),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-top', yPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + (any + (' + ' + any)))),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-top', yPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + left)),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-right', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (page + (' > ' + right)),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_Utils_ap(_class, paragraph),
									_List_fromArray(
										[
											A2(
											mdgriffith$stylish_elephants$Internal$Model$Property,
											'line-height',
											'calc(1em + ' + (elm_lang$core$String$fromInt(y) + 'px)'))
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									'textarea' + _class,
									_List_fromArray(
										[
											A2(
											mdgriffith$stylish_elephants$Internal$Model$Property,
											'line-height',
											'calc(1em + ' + (elm_lang$core$String$fromInt(y) + 'px)'))
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + (' > ' + left)),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-right', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + (' > ' + right)),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'margin-left', xPx)
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + '::after'),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'content', '\'\''),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'display', 'block'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'height', '0'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'width', '0'),
											A2(
											mdgriffith$stylish_elephants$Internal$Model$Property,
											'margin-top',
											elm_lang$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
										])),
									A4(
									renderStyle,
									force,
									maybePseudo,
									_class + (paragraph + '::before'),
									_List_fromArray(
										[
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'content', '\'\''),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'display', 'block'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'height', '0'),
											A2(mdgriffith$stylish_elephants$Internal$Model$Property, 'width', '0'),
											A2(
											mdgriffith$stylish_elephants$Internal$Model$Property,
											'margin-bottom',
											elm_lang$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
										]))
								]));
					case 'PaddingStyle':
						var top = rule.a;
						var right = rule.b;
						var bottom = rule.c;
						var left = rule.d;
						var _class = '.pad-' + (elm_lang$core$String$fromInt(top) + ('-' + (elm_lang$core$String$fromInt(right) + ('-' + (elm_lang$core$String$fromInt(bottom) + ('-' + elm_lang$core$String$fromInt(left)))))));
						return A4(
							renderStyle,
							force,
							maybePseudo,
							_class,
							_List_fromArray(
								[
									A2(
									mdgriffith$stylish_elephants$Internal$Model$Property,
									'padding',
									elm_lang$core$String$fromInt(top) + ('px ' + (elm_lang$core$String$fromInt(right) + ('px ' + (elm_lang$core$String$fromInt(bottom) + ('px ' + (elm_lang$core$String$fromInt(left) + 'px')))))))
								]));
					case 'GridTemplateStyle':
						var template = rule.a;
						var toGridLengthHelper = F3(
							function (minimum, maximum, x) {
								switch (x.$) {
									case 'Px':
										var px = x.a;
										return elm_lang$core$String$fromInt(px) + 'px';
									case 'Content':
										var _n2 = _Utils_Tuple2(minimum, maximum);
										if (_n2.a.$ === 'Nothing') {
											if (_n2.b.$ === 'Nothing') {
												var _n3 = _n2.a;
												var _n4 = _n2.b;
												return 'max-content';
											} else {
												var _n6 = _n2.a;
												var maxSize = _n2.b.a;
												return 'minmax(max-content, ' + (elm_lang$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n2.b.$ === 'Nothing') {
												var minSize = _n2.a.a;
												var _n5 = _n2.b;
												return 'minmax(' + (elm_lang$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
											} else {
												var minSize = _n2.a.a;
												var maxSize = _n2.b.a;
												return 'minmax(' + (elm_lang$core$String$fromInt(minSize) + ('px, ' + (elm_lang$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 'Fill':
										var i = x.a;
										var _n7 = _Utils_Tuple2(minimum, maximum);
										if (_n7.a.$ === 'Nothing') {
											if (_n7.b.$ === 'Nothing') {
												var _n8 = _n7.a;
												var _n9 = _n7.b;
												return elm_lang$core$String$fromInt(i) + 'fr';
											} else {
												var _n11 = _n7.a;
												var maxSize = _n7.b.a;
												return 'minmax(max-content, ' + (elm_lang$core$String$fromInt(maxSize) + 'px)');
											}
										} else {
											if (_n7.b.$ === 'Nothing') {
												var minSize = _n7.a.a;
												var _n10 = _n7.b;
												return 'minmax(' + (elm_lang$core$String$fromInt(minSize) + ('px, ' + (elm_lang$core$String$fromInt(i) + ('fr' + 'fr)'))));
											} else {
												var minSize = _n7.a.a;
												var maxSize = _n7.b.a;
												return 'minmax(' + (elm_lang$core$String$fromInt(minSize) + ('px, ' + (elm_lang$core$String$fromInt(maxSize) + 'px)')));
											}
										}
									case 'Min':
										var m = x.a;
										var len = x.b;
										return A3(
											toGridLengthHelper,
											elm_lang$core$Maybe$Just(m),
											maximum,
											len);
									default:
										var m = x.a;
										var len = x.b;
										return A3(
											toGridLengthHelper,
											minimum,
											elm_lang$core$Maybe$Just(m),
											len);
								}
							});
						var toGridLength = function (x) {
							return A3(toGridLengthHelper, elm_lang$core$Maybe$Nothing, elm_lang$core$Maybe$Nothing, x);
						};
						var xSpacing = toGridLength(template.spacing.a);
						var ySpacing = toGridLength(template.spacing.b);
						var rows = function (x) {
							return 'grid-template-rows: ' + (x + ';');
						}(
							A2(
								elm_lang$core$String$join,
								' ',
								A2(elm_lang$core$List$map, toGridLength, template.rows)));
						var msRows = function (x) {
							return '-ms-grid-rows: ' + (x + ';');
						}(
							A2(
								elm_lang$core$String$join,
								ySpacing,
								A2(elm_lang$core$List$map, toGridLength, template.columns)));
						var msColumns = function (x) {
							return '-ms-grid-columns: ' + (x + ';');
						}(
							A2(
								elm_lang$core$String$join,
								ySpacing,
								A2(elm_lang$core$List$map, toGridLength, template.columns)));
						var gapY = 'grid-row-gap:' + (toGridLength(template.spacing.b) + ';');
						var gapX = 'grid-column-gap:' + (toGridLength(template.spacing.a) + ';');
						var columns = function (x) {
							return 'grid-template-columns: ' + (x + ';');
						}(
							A2(
								elm_lang$core$String$join,
								' ',
								A2(elm_lang$core$List$map, toGridLength, template.columns)));
						var _class = '.grid-rows-' + (A2(
							elm_lang$core$String$join,
							'-',
							A2(elm_lang$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
							elm_lang$core$String$join,
							'-',
							A2(elm_lang$core$List$map, mdgriffith$stylish_elephants$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + (mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + mdgriffith$stylish_elephants$Internal$Model$lengthClassName(template.spacing.b)))))));
						var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
						var supports = '@supports (display:grid) {' + (modernGrid + '}');
						var base = _class + ('{' + (msColumns + (msRows + '}')));
						return _Utils_ap(base, supports);
					case 'GridPosition':
						var position = rule.a;
						var msPosition = A2(
							elm_lang$core$String$join,
							' ',
							_List_fromArray(
								[
									'-ms-grid-row: ' + (elm_lang$core$String$fromInt(position.row) + ';'),
									'-ms-grid-row-span: ' + (elm_lang$core$String$fromInt(position.height) + ';'),
									'-ms-grid-column: ' + (elm_lang$core$String$fromInt(position.col) + ';'),
									'-ms-grid-column-span: ' + (elm_lang$core$String$fromInt(position.width) + ';')
								]));
						var modernPosition = A2(
							elm_lang$core$String$join,
							' ',
							_List_fromArray(
								[
									'grid-row: ' + (elm_lang$core$String$fromInt(position.row) + (' / ' + (elm_lang$core$String$fromInt(position.row + position.height) + ';'))),
									'grid-column: ' + (elm_lang$core$String$fromInt(position.col) + (' / ' + (elm_lang$core$String$fromInt(position.col + position.width) + ';')))
								]));
						var _class = '.grid-pos-' + (elm_lang$core$String$fromInt(position.row) + ('-' + (elm_lang$core$String$fromInt(position.col) + ('-' + (elm_lang$core$String$fromInt(position.width) + ('-' + elm_lang$core$String$fromInt(position.height)))))));
						var modernGrid = _class + ('{' + (modernPosition + '}'));
						var supports = '@supports (display:grid) {' + (modernGrid + '}');
						var base = _class + ('{' + (msPosition + '}'));
						return _Utils_ap(base, supports);
					case 'PseudoSelector':
						var _class = rule.a;
						var styles = rule.b;
						var renderPseudoRule = function (style) {
							switch (_class.$) {
								case 'Focus':
									return A3(
										renderStyleRule,
										style,
										elm_lang$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Focus),
										false);
								case 'Active':
									return A3(
										renderStyleRule,
										style,
										elm_lang$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Active),
										false);
								default:
									var _n13 = options.hover;
									switch (_n13.$) {
										case 'NoHover':
											return '';
										case 'AllowHover':
											return A3(
												renderStyleRule,
												style,
												elm_lang$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Hover),
												false);
										default:
											return A3(renderStyleRule, style, elm_lang$core$Maybe$Nothing, true);
									}
							}
						};
						return A2(
							elm_lang$core$String$join,
							' ',
							A2(elm_lang$core$List$map, renderPseudoRule, styles));
					default:
						return '';
				}
			});
		var combine = F2(
			function (style, rendered) {
				return _Utils_update(
					rendered,
					{
						rules: _Utils_ap(
							rendered.rules,
							A3(renderStyleRule, style, elm_lang$core$Maybe$Nothing, false)),
						topLevel: function () {
							var _n15 = renderTopLevels(style);
							if (_n15.$ === 'Nothing') {
								return rendered.topLevel;
							} else {
								var topLevel = _n15.a;
								return _Utils_ap(rendered.topLevel, topLevel);
							}
						}()
					});
			});
		return function (_n14) {
			var rules = _n14.rules;
			var topLevel = _n14.topLevel;
			return _Utils_ap(topLevel, rules);
		}(
			A3(
				elm_lang$core$List$foldl,
				combine,
				{rules: '', topLevel: ''},
				stylesheet));
	});
var mdgriffith$stylish_elephants$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		return A3(
			elm_lang$virtual_dom$VirtualDom$node,
			'style',
			_List_Nil,
			_List_fromArray(
				[
					elm_lang$virtual_dom$VirtualDom$text(
					A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheetString, options, styleSheet))
				]));
	});
var mdgriffith$stylish_elephants$Internal$Style$Batch = function (a) {
	return {$: 'Batch', a: a};
};
var mdgriffith$stylish_elephants$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 'Child', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 'Descriptor', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Left = {$: 'Left'};
var mdgriffith$stylish_elephants$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 'Prop', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Right = {$: 'Right'};
var mdgriffith$stylish_elephants$Internal$Style$Self = function (a) {
	return {$: 'Self', a: a};
};
var mdgriffith$stylish_elephants$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 'Supports', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Style$Content = function (a) {
	return {$: 'Content', a: a};
};
var mdgriffith$stylish_elephants$Internal$Style$Bottom = {$: 'Bottom'};
var mdgriffith$stylish_elephants$Internal$Style$CenterX = {$: 'CenterX'};
var mdgriffith$stylish_elephants$Internal$Style$CenterY = {$: 'CenterY'};
var mdgriffith$stylish_elephants$Internal$Style$Top = {$: 'Top'};
var mdgriffith$stylish_elephants$Internal$Style$alignments = _List_fromArray(
	[mdgriffith$stylish_elephants$Internal$Style$Top, mdgriffith$stylish_elephants$Internal$Style$Bottom, mdgriffith$stylish_elephants$Internal$Style$Right, mdgriffith$stylish_elephants$Internal$Style$Left, mdgriffith$stylish_elephants$Internal$Style$CenterX, mdgriffith$stylish_elephants$Internal$Style$CenterY]);
var mdgriffith$stylish_elephants$Internal$Style$dot = function (c) {
	return '.' + c;
};
var mdgriffith$stylish_elephants$Internal$Style$contentName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _n1 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentTop);
		case 'Bottom':
			var _n2 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentBottom);
		case 'Right':
			var _n3 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentRight);
		case 'Left':
			var _n4 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentLeft);
		case 'CenterX':
			var _n5 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterX);
		default:
			var _n6 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY);
	}
};
var mdgriffith$stylish_elephants$Internal$Style$selfName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _n1 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignTop);
		case 'Bottom':
			var _n2 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignBottom);
		case 'Right':
			var _n3 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignRight);
		case 'Left':
			var _n4 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignLeft);
		case 'CenterX':
			var _n5 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterX);
		default:
			var _n6 = desc.a;
			return mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY);
	}
};
var mdgriffith$stylish_elephants$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _n0 = values(alignment);
		var content = _n0.a;
		var indiv = _n0.b;
		return _List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Descriptor,
				mdgriffith$stylish_elephants$Internal$Style$contentName(
					mdgriffith$stylish_elephants$Internal$Style$Content(alignment)),
				content),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Child,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$selfName(
							mdgriffith$stylish_elephants$Internal$Style$Self(alignment)),
						indiv)
					]))
			]);
	};
	return mdgriffith$stylish_elephants$Internal$Style$Batch(
		A2(elm_lang$core$List$concatMap, createDescription, mdgriffith$stylish_elephants$Internal$Style$alignments));
};
var mdgriffith$stylish_elephants$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Child,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$selfName(
							mdgriffith$stylish_elephants$Internal$Style$Self(alignment)),
						values(alignment))
					]))
			]);
	};
	return mdgriffith$stylish_elephants$Internal$Style$Batch(
		A2(elm_lang$core$List$concatMap, createDescription, mdgriffith$stylish_elephants$Internal$Style$alignments));
};
var mdgriffith$stylish_elephants$Internal$Style$Above = {$: 'Above'};
var mdgriffith$stylish_elephants$Internal$Style$Behind = {$: 'Behind'};
var mdgriffith$stylish_elephants$Internal$Style$Below = {$: 'Below'};
var mdgriffith$stylish_elephants$Internal$Style$OnLeft = {$: 'OnLeft'};
var mdgriffith$stylish_elephants$Internal$Style$OnRight = {$: 'OnRight'};
var mdgriffith$stylish_elephants$Internal$Style$Within = {$: 'Within'};
var mdgriffith$stylish_elephants$Internal$Style$locations = function () {
	var loc = mdgriffith$stylish_elephants$Internal$Style$Above;
	var _n0 = function () {
		switch (loc.$) {
			case 'Above':
				return _Utils_Tuple0;
			case 'Below':
				return _Utils_Tuple0;
			case 'OnRight':
				return _Utils_Tuple0;
			case 'OnLeft':
				return _Utils_Tuple0;
			case 'Within':
				return _Utils_Tuple0;
			default:
				return _Utils_Tuple0;
		}
	}();
	return _List_fromArray(
		[mdgriffith$stylish_elephants$Internal$Style$Above, mdgriffith$stylish_elephants$Internal$Style$Below, mdgriffith$stylish_elephants$Internal$Style$OnRight, mdgriffith$stylish_elephants$Internal$Style$OnLeft, mdgriffith$stylish_elephants$Internal$Style$Within, mdgriffith$stylish_elephants$Internal$Style$Behind]);
}();
var mdgriffith$stylish_elephants$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .se.row > .se { flex-basis: auto !important; }\n  .se.row > .se.container { flex-basis: auto !important; }\n}';
var elm_lang$core$String$concat = function (strings) {
	return A2(elm_lang$core$String$join, '', strings);
};
var mdgriffith$stylish_elephants$Internal$Style$Intermediate = function (a) {
	return {$: 'Intermediate', a: a};
};
var mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return mdgriffith$stylish_elephants$Internal$Style$Intermediate(
			{closing: closing, others: _List_Nil, props: _List_Nil, selector: selector});
	});
var mdgriffith$stylish_elephants$Internal$Style$renderRules = F2(
	function (_n0, rulesToRender) {
		var parent = _n0.a;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 'Prop':
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								props: A2(
									elm_lang$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.props)
							});
					case 'Supports':
						var _n2 = rule.a;
						var prop = _n2.a;
						var value = _n2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm_lang$core$List$cons,
									mdgriffith$stylish_elephants$Internal$Style$Intermediate(
										{closing: '\n}', others: _List_Nil, props: props, selector: '@supports (' + (prop + (':' + (value + (') {' + parent.selector))))}),
									rendered.others)
							});
					case 'Adjacent':
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm_lang$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.selector + (' + ' + selector), ''),
										adjRules),
									rendered.others)
							});
					case 'Child':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm_lang$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.selector + (' > ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'Descriptor':
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm_lang$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(
											mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.selector, descriptor),
											''),
										descriptorRules),
									rendered.others)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								others: A2(
									elm_lang$core$List$cons,
									A2(
										mdgriffith$stylish_elephants$Internal$Style$renderRules,
										A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, parent.selector, ''),
										batched),
									rendered.others)
							});
				}
			});
		return mdgriffith$stylish_elephants$Internal$Style$Intermediate(
			A3(elm_lang$core$List$foldr, generateIntermediates, parent, rulesToRender));
	});
var mdgriffith$stylish_elephants$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return elm_lang$core$String$concat(
			A2(
				elm_lang$core$List$map,
				function (_n3) {
					var x = _n3.a;
					var y = _n3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _n2 = rule.props;
		if (!_n2.b) {
			return '';
		} else {
			return rule.selector + ('{' + (renderValues(rule.props) + (rule.closing + '}')));
		}
	};
	var renderIntermediate = function (_n0) {
		var rule = _n0.a;
		return _Utils_ap(
			renderClass(rule),
			elm_lang$core$String$concat(
				A2(elm_lang$core$List$map, renderIntermediate, rule.others)));
	};
	return elm_lang$core$String$concat(
		A2(
			elm_lang$core$List$map,
			renderIntermediate,
			A3(
				elm_lang$core$List$foldr,
				F2(
					function (_n1, existing) {
						var name = _n1.a;
						var styleRules = _n1.b;
						return A2(
							elm_lang$core$List$cons,
							A2(
								mdgriffith$stylish_elephants$Internal$Style$renderRules,
								A2(mdgriffith$stylish_elephants$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var mdgriffith$stylish_elephants$Internal$Style$rules = _Utils_ap(
	mdgriffith$stylish_elephants$Internal$Style$overrides,
	mdgriffith$stylish_elephants$Internal$Style$renderCompact(
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				'html,body',
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'padding', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0')
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any) + ':focus',
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'outline', 'none')
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.root),
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'min-height', '100%'),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						_Utils_ap(
							mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
							_Utils_ap(
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.single),
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightContent))),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%')
									]))
							]))
					])),
				A2(
				mdgriffith$stylish_elephants$Internal$Style$Class,
				mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'relative'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border', 'none'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'resize', 'none'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'box-sizing', 'border-box'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'padding', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-width', '0'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'solid'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-size', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'color', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-family', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'line-height', '1'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', 'inherit'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'none'),
						A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'inherit'),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.noTextSelection),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'user-select', 'none'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-ms-user-select', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cursorPointer),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'cursor', 'pointer')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.cursorText),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'cursor', 'text')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.passPointerEvents),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.capturePointerEvents),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.transparent),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.opaque),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.hover, mdgriffith$stylish_elephants$Internal$Style$classes.transparent)) + ':hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.hover, mdgriffith$stylish_elephants$Internal$Style$classes.opaque)) + ':hover',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.focus, mdgriffith$stylish_elephants$Internal$Style$classes.transparent)) + ':focus',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.focus, mdgriffith$stylish_elephants$Internal$Style$classes.opaque)) + ':focus',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.active, mdgriffith$stylish_elephants$Internal$Style$classes.transparent)) + ':active',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(
							_Utils_ap(mdgriffith$stylish_elephants$Internal$Style$classes.active, mdgriffith$stylish_elephants$Internal$Style$classes.opaque)) + ':active',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'opacity', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.transition),
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Prop,
								'transition',
								A2(
									elm_lang$core$String$join,
									', ',
									A2(
										elm_lang$core$List$map,
										function (x) {
											return x + ' 160ms';
										},
										_List_fromArray(
											['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.overflowHidden),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'hidden'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, '-ms-overflow-style', 'none')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.scrollbars),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'auto'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.scrollbarsX),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-x', 'auto'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.row),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.scrollbarsY),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-y', 'auto'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.column),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-shrink', '1')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.clip),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.clipX),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-x', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.clipY),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'overflow-y', 'hidden')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthContent),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', 'auto')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.borderNone),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-width', '0')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.borderDashed),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'dashed')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.borderDotted),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'dotted')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.borderSolid),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'border-style', 'solid')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.text),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-block')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'pre'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.seButton),
								_List_fromArray(
									[
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.text),
										_List_fromArray(
											[
												A2(
												mdgriffith$stylish_elephants$Internal$Style$Descriptor,
												mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
													])),
												A2(
												mdgriffith$stylish_elephants$Internal$Style$Descriptor,
												mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'auto !important')
													]))
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightContent),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthContent),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'left')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', '0 !important')
													]));
										case 'Bottom':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', '0 !important')
													]));
										case 'Right':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 'CenterX':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'center')
													]));
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(
														mdgriffith$stylish_elephants$Internal$Style$Child,
														mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
														_List_fromArray(
															[
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto')
															]))
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
													]));
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'row'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', '0%'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthExact),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFillPortion),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.container),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerRight,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterX),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-left', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterX),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-right', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:only-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX + ' ~ u'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerRight + (' ~ s.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterX)),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 'Bottom':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 'Right':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_Nil);
										case 'Left':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_Nil);
										case 'CenterX':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'center')
													]),
												_List_Nil);
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'center')
													]));
									}
								}),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.spaceEvenly),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-direction', 'column'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '100000')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFillPortion),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthContent),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'left')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerBottom,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:first-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', '0 !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', '0 !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:only-of-type.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY,
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '1'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto !important'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto !important')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								's:last-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY + ' ~ u'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								'u:first-of-type.' + (mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerBottom + (' ~ s.' + mdgriffith$stylish_elephants$Internal$Style$classes.alignContainerCenterY)),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-bottom', 'auto')
													]));
										case 'Bottom':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin-top', 'auto')
													]));
										case 'Right':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-end')
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'flex-start')
													]));
										case 'CenterX':
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
													]),
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'center')
													]));
										default:
											return _Utils_Tuple2(
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'center')
													]),
												_List_Nil);
									}
								}),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.container),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-grow', '0'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'flex-basis', 'auto'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-self', 'stretch !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Descriptor,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.spaceEvenly),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'space-between')
									]))
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.grid),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', '-ms-grid'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Supports,
								_Utils_Tuple2('display', 'grid'),
								_List_fromArray(
									[
										_Utils_Tuple2('display', 'grid')
									])),
								mdgriffith$stylish_elephants$Internal$Style$gridAlignments(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-start')
												]);
										case 'Bottom':
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'flex-end')
												]);
										case 'Right':
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-end')
												]);
										case 'Left':
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'flex-start')
												]);
										case 'CenterX':
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'align-items', 'center')
												]);
										default:
											return _List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'justify-content', 'center')
												]);
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.page),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'block'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any + ':first-child'),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(
									mdgriffith$stylish_elephants$Internal$Style$classes.any + (mdgriffith$stylish_elephants$Internal$Style$selfName(
										mdgriffith$stylish_elephants$Internal$Style$Self(mdgriffith$stylish_elephants$Internal$Style$Left)) + (':first-child + .' + mdgriffith$stylish_elephants$Internal$Style$classes.any))),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(
									mdgriffith$stylish_elephants$Internal$Style$classes.any + (mdgriffith$stylish_elephants$Internal$Style$selfName(
										mdgriffith$stylish_elephants$Internal$Style$Self(mdgriffith$stylish_elephants$Internal$Style$Right)) + (':first-child + .' + mdgriffith$stylish_elephants$Internal$Style$classes.any))),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Bottom':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Right':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'right'),
														A2(
														mdgriffith$stylish_elephants$Internal$Style$Descriptor,
														':after:',
														_List_fromArray(
															[
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'content', '\"\"'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'table'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'clear', 'both')
															]))
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'left'),
														A2(
														mdgriffith$stylish_elephants$Internal$Style$Descriptor,
														':after:',
														_List_fromArray(
															[
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'content', '\"\"'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'table'),
																A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'clear', 'both')
															]))
													]));
										case 'CenterX':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										default:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.paragraph),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'block'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.text),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.single),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal'),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.inFront),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.behind),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.above),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.below),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.onRight),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Descriptor,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.onLeft),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'flex')
											])),
										A2(
										mdgriffith$stylish_elephants$Internal$Style$Child,
										mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.text),
										_List_fromArray(
											[
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline'),
												A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'white-space', 'normal')
											]))
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.row),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.column),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-flex')
									])),
								A2(
								mdgriffith$stylish_elephants$Internal$Style$Child,
								mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.grid),
								_List_fromArray(
									[
										A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'inline-grid')
									])),
								mdgriffith$stylish_elephants$Internal$Style$describeAlignment(
								function (alignment) {
									switch (alignment.$) {
										case 'Top':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Bottom':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										case 'Right':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'right')
													]));
										case 'Left':
											return _Utils_Tuple2(
												_List_Nil,
												_List_fromArray(
													[
														A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'float', 'left')
													]));
										case 'CenterX':
											return _Utils_Tuple2(_List_Nil, _List_Nil);
										default:
											return _Utils_Tuple2(_List_Nil, _List_Nil);
									}
								})
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.hidden',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'display', 'none')
							])),
						mdgriffith$stylish_elephants$Internal$Style$Batch(
						function (fn) {
							return A2(elm_lang$core$List$map, fn, mdgriffith$stylish_elephants$Internal$Style$locations);
						}(
							function (loc) {
								switch (loc.$) {
									case 'Above':
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.above),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'bottom', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
														])),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%')
														])),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									case 'Below':
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.below),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'bottom', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', 'auto')
														]))
												]));
									case 'OnRight':
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.onRight),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
												]));
									case 'OnLeft':
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.onLeft),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'right', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
												]));
									case 'Within':
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.inFront),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '10'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.any),
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
									default:
										return A2(
											mdgriffith$stylish_elephants$Internal$Style$Descriptor,
											mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.behind),
											_List_fromArray(
												[
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'absolute'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'margin', '0 !important'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'z-index', '0'),
													A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none'),
													A2(
													mdgriffith$stylish_elephants$Internal$Style$Child,
													'.se',
													_List_fromArray(
														[
															A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'auto')
														]))
												]));
								}
							})),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textThin),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '100')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textExtraLight),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '200')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textLight),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '300')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textNormalWeight),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '400')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textMedium),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '500')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textSemiBold),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '600')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.bold),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '700')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textExtraBold),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '800')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textHeavy),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-weight', '900')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.italic),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'italic')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.strike),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'line-through')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.underline),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration', 'underline'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-decoration-skip', 'ink')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textUnitalicized),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'font-style', 'normal')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textJustify),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'justify')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textJustifyAll),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'justify-all')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textCenter),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'center')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textRight),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'right')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						mdgriffith$stylish_elephants$Internal$Style$dot(mdgriffith$stylish_elephants$Internal$Style$classes.textLeft),
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'text-align', 'left')
							])),
						A2(
						mdgriffith$stylish_elephants$Internal$Style$Descriptor,
						'.modal',
						_List_fromArray(
							[
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'position', 'fixed'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'left', '0'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'top', '0'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'width', '100%'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'height', '100%'),
								A2(mdgriffith$stylish_elephants$Internal$Style$Prop, 'pointer-events', 'none')
							]))
					]))
			])));
var mdgriffith$stylish_elephants$Internal$Model$asElement = F4(
	function (embedMode, children, context, rendered) {
		var gatherKeyed = F2(
			function (_n10, _n11) {
				var key = _n10.a;
				var child = _n10.b;
				var htmls = _n11.a;
				var existingStyles = _n11.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, elm_lang$core$Maybe$Nothing, context)),
								htmls),
							_Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$widthContent, rendered.has) && (A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$heightContent, rendered.has) && _Utils_eq(context, mdgriffith$stylish_elephants$Internal$Model$asEl))) ? _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								_Utils_Tuple2(
									key,
									elm_lang$virtual_dom$VirtualDom$text(str)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								_Utils_Tuple2(
									key,
									mdgriffith$stylish_elephants$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _n8) {
				var htmls = _n8.a;
				var existingStyles = _n8.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								A2(styled.html, elm_lang$core$Maybe$Nothing, context),
								htmls),
							_Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_eq(context, mdgriffith$stylish_elephants$Internal$Model$asEl) ? _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$textElementFill(str),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								elm_lang$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var _n0 = function () {
			if (children.$ === 'Keyed') {
				var keyedChildren = children.a;
				return A2(
					elm_lang$core$Tuple$mapFirst,
					mdgriffith$stylish_elephants$Internal$Model$Keyed,
					A3(
						elm_lang$core$List$foldr,
						gatherKeyed,
						_Utils_Tuple2(_List_Nil, rendered.styles),
						keyedChildren));
			} else {
				var unkeyedChildren = children.a;
				return A2(
					elm_lang$core$Tuple$mapFirst,
					mdgriffith$stylish_elephants$Internal$Model$Unkeyed,
					A3(
						elm_lang$core$List$foldr,
						gather,
						_Utils_Tuple2(_List_Nil, rendered.styles),
						unkeyedChildren));
			}
		}();
		var htmlChildren = _n0.a;
		var styleChildren = _n0.b;
		switch (embedMode.$) {
			case 'NoStyleSheet':
				var renderedChildren = function () {
					if (htmlChildren.$ === 'Keyed') {
						var keyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Keyed(
							_Utils_ap(
								keyed,
								A2(
									elm_lang$core$List$map,
									function (x) {
										return _Utils_Tuple2('nearby-elements-pls', x);
									},
									rendered.children)));
					} else {
						var unkeyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
							_Utils_ap(unkeyed, rendered.children));
					}
				}();
				if (!styleChildren.b) {
					return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
						A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm_lang$core$Maybe$Nothing));
				} else {
					return mdgriffith$stylish_elephants$Internal$Model$Styled(
						{
							html: A2(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren),
							styles: styleChildren
						});
				}
			case 'StaticRootAndDynamic':
				var options = embedMode.a;
				var styles = A3(
					elm_lang$core$List$foldl,
					mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
					_Utils_Tuple2(
						elm_lang$core$Set$empty,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.focus)
							])),
					styleChildren).b;
				var renderedChildren = function () {
					if (htmlChildren.$ === 'Keyed') {
						var keyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Keyed(
							A2(
								elm_lang$core$List$cons,
								_Utils_Tuple2(
									'static-stylesheet',
									A3(
										elm_lang$virtual_dom$VirtualDom$node,
										'style',
										_List_Nil,
										_List_fromArray(
											[
												elm_lang$virtual_dom$VirtualDom$text(mdgriffith$stylish_elephants$Internal$Style$rules)
											]))),
								A2(
									elm_lang$core$List$cons,
									_Utils_Tuple2(
										'dynamic-stylesheet',
										A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles)),
									_Utils_ap(
										keyed,
										A2(
											elm_lang$core$List$map,
											function (x) {
												return _Utils_Tuple2('nearby-elements-pls', x);
											},
											rendered.children)))));
					} else {
						var unkeyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
							A2(
								elm_lang$core$List$cons,
								A3(
									elm_lang$virtual_dom$VirtualDom$node,
									'style',
									_List_Nil,
									_List_fromArray(
										[
											elm_lang$virtual_dom$VirtualDom$text(mdgriffith$stylish_elephants$Internal$Style$rules)
										])),
								A2(
									elm_lang$core$List$cons,
									A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles),
									_Utils_ap(unkeyed, rendered.children))));
					}
				}();
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm_lang$core$Maybe$Nothing));
			default:
				var options = embedMode.a;
				var styles = A3(
					elm_lang$core$List$foldl,
					mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
					_Utils_Tuple2(
						elm_lang$core$Set$empty,
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.focus)
							])),
					styleChildren).b;
				var renderedChildren = function () {
					if (htmlChildren.$ === 'Keyed') {
						var keyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Keyed(
							A2(
								elm_lang$core$List$cons,
								_Utils_Tuple2(
									'dynamic-stylesheet',
									A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles)),
								_Utils_ap(
									keyed,
									A2(
										elm_lang$core$List$map,
										function (x) {
											return _Utils_Tuple2('nearby-elements-pls', x);
										},
										rendered.children))));
					} else {
						var unkeyed = htmlChildren.a;
						return mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
							A2(
								elm_lang$core$List$cons,
								A2(mdgriffith$stylish_elephants$Internal$Model$toStyleSheet, options, styles),
								_Utils_ap(unkeyed, rendered.children)));
					}
				}();
				return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
					A3(mdgriffith$stylish_elephants$Internal$Model$renderNode, rendered, renderedChildren, elm_lang$core$Maybe$Nothing));
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$Attr = function (a) {
	return {$: 'Attr', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$htmlClass = function (cls) {
	return mdgriffith$stylish_elephants$Internal$Model$Attr(
		A2(
			elm_lang$virtual_dom$VirtualDom$property,
			'className',
			elm_lang$json$Json$Encode$string(cls)));
};
var mdgriffith$stylish_elephants$Internal$Model$contextClasses = function (context) {
	switch (context.$) {
		case 'AsRow':
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.row));
		case 'AsColumn':
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.column));
		case 'AsEl':
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.single));
		case 'AsGrid':
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.grid));
		case 'AsParagraph':
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.paragraph));
		default:
			return mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.any + (' ' + mdgriffith$stylish_elephants$Internal$Style$classes.page));
	}
};
var mdgriffith$stylish_elephants$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 'Single', a: a, b: b, c: c};
	});
var mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup = F2(
	function (maybePseudo, group) {
		var translate = A2(
			elm_lang$core$Maybe$map,
			function (_n9) {
				var x = _n9.a;
				var y = _n9.b;
				var z = _n9.c;
				return 'translate3d(' + (elm_lang$core$String$fromFloat(
					A2(elm_lang$core$Maybe$withDefault, 0, x)) + ('px, ' + (elm_lang$core$String$fromFloat(
					A2(elm_lang$core$Maybe$withDefault, 0, y)) + ('px, ' + (elm_lang$core$String$fromFloat(
					A2(elm_lang$core$Maybe$withDefault, 0, z)) + 'px)')))));
			},
			group.translate);
		var scale = A2(
			elm_lang$core$Maybe$map,
			function (_n8) {
				var x = _n8.a;
				var y = _n8.b;
				var z = _n8.c;
				return 'scale3d(' + (elm_lang$core$String$fromFloat(x) + (', ' + (elm_lang$core$String$fromFloat(y) + (', ' + (elm_lang$core$String$fromFloat(z) + ')')))));
			},
			group.scale);
		var rotate = A2(
			elm_lang$core$Maybe$map,
			function (_n7) {
				var x = _n7.a;
				var y = _n7.b;
				var z = _n7.c;
				var angle = _n7.d;
				return 'rotate3d(' + (elm_lang$core$String$fromFloat(x) + (',' + (elm_lang$core$String$fromFloat(y) + (',' + (elm_lang$core$String$fromFloat(z) + (',' + (elm_lang$core$String$fromFloat(angle) + 'rad)')))))));
			},
			group.rotate);
		var transformations = A2(
			elm_lang$core$List$filterMap,
			elm_lang$core$Basics$identity,
			_List_fromArray(
				[scale, translate, rotate]));
		var name = A2(
			elm_lang$core$String$join,
			'-',
			A2(
				elm_lang$core$List$filterMap,
				elm_lang$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						elm_lang$core$Maybe$map,
						function (_n4) {
							var x = _n4.a;
							var y = _n4.b;
							var z = _n4.c;
							return 'move-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm_lang$core$Maybe$withDefault, 0, x)) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm_lang$core$Maybe$withDefault, 0, y)) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(
								A2(elm_lang$core$Maybe$withDefault, 0, z))))));
						},
						group.translate),
						A2(
						elm_lang$core$Maybe$map,
						function (_n5) {
							var x = _n5.a;
							var y = _n5.b;
							var z = _n5.c;
							return 'scale' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(x) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(y) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(z)))));
						},
						group.scale),
						A2(
						elm_lang$core$Maybe$map,
						function (_n6) {
							var x = _n6.a;
							var y = _n6.b;
							var z = _n6.c;
							var angle = _n6.d;
							return 'rotate-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(x) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(y) + ('-' + (mdgriffith$stylish_elephants$Internal$Model$floatClass(z) + ('-' + mdgriffith$stylish_elephants$Internal$Model$floatClass(angle)))))));
						},
						group.rotate)
					])));
		if (!transformations.b) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var trans = transformations;
			var transforms = A2(elm_lang$core$String$join, ' ', trans);
			var _n1 = function () {
				if (maybePseudo.$ === 'Nothing') {
					return _Utils_Tuple2('transform-' + name, '.transform-' + name);
				} else {
					var pseudo = maybePseudo.a;
					switch (pseudo.$) {
						case 'Hover':
							return _Utils_Tuple2('transform-' + (name + '-hover'), '.transform-' + (name + '-hover:hover'));
						case 'Focus':
							return _Utils_Tuple2('transform-' + (name + '-focus'), '.transform-' + (name + ('-focus:focus, .se:focus ~ .transform-' + (name + '-focus'))));
						default:
							return _Utils_Tuple2('transform-' + (name + '-active'), '.transform-' + (name + '-active:active'));
					}
				}
			}();
			var classOnElement = _n1.a;
			var classInStylesheet = _n1.b;
			return elm_lang$core$Maybe$Just(
				_Utils_Tuple2(
					classOnElement,
					A3(mdgriffith$stylish_elephants$Internal$Model$Single, classInStylesheet, 'transform', transforms)));
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$finalize = function (gathered) {
	var addTextShadows = function (_n11) {
		var classes = _n11.a;
		var styles = _n11.b;
		var _n9 = gathered.textShadows;
		if (_n9.$ === 'Nothing') {
			return _Utils_Tuple2(classes, styles);
		} else {
			var _n10 = _n9.a;
			var shadowClass = _n10.a;
			var shades = _n10.b;
			return _Utils_Tuple2(
				A2(elm_lang$core$List$cons, shadowClass, classes),
				A2(
					elm_lang$core$List$cons,
					A3(mdgriffith$stylish_elephants$Internal$Model$Single, '.' + shadowClass, 'text-shadow', shades),
					styles));
		}
	};
	var addBoxShadows = function (_n8) {
		var classes = _n8.a;
		var styles = _n8.b;
		var _n6 = gathered.boxShadows;
		if (_n6.$ === 'Nothing') {
			return _Utils_Tuple2(classes, styles);
		} else {
			var _n7 = _n6.a;
			var shadowClass = _n7.a;
			var shades = _n7.b;
			return _Utils_Tuple2(
				A2(elm_lang$core$List$cons, shadowClass, classes),
				A2(
					elm_lang$core$List$cons,
					A3(mdgriffith$stylish_elephants$Internal$Model$Single, '.' + shadowClass, 'box-shadow', shades),
					styles));
		}
	};
	var add = F2(
		function (_new, _n5) {
			var classes = _n5.a;
			var styles = _n5.b;
			if (_new.$ === 'Nothing') {
				return _Utils_Tuple2(classes, styles);
			} else {
				var _n4 = _new.a;
				var newClass = _n4.a;
				var newStyle = _n4.b;
				return _Utils_Tuple2(
					A2(elm_lang$core$List$cons, newClass, classes),
					A2(elm_lang$core$List$cons, newStyle, styles));
			}
		});
	var addTransform = function (_n2) {
		var classes = _n2.a;
		var styles = _n2.b;
		var _n1 = gathered.transform;
		if (_n1.$ === 'Nothing') {
			return _Utils_Tuple2(classes, styles);
		} else {
			var transform = _n1.a;
			return A2(
				add,
				A2(
					elm_lang$core$Maybe$andThen,
					mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
						elm_lang$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Active)),
					transform.active),
				A2(
					add,
					A2(
						elm_lang$core$Maybe$andThen,
						mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
							elm_lang$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Hover)),
						transform.hover),
					A2(
						add,
						A2(
							elm_lang$core$Maybe$andThen,
							mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(
								elm_lang$core$Maybe$Just(mdgriffith$stylish_elephants$Internal$Model$Focus)),
							transform.focus),
						A2(
							add,
							A2(
								elm_lang$core$Maybe$andThen,
								mdgriffith$stylish_elephants$Internal$Model$renderTransformationGroup(elm_lang$core$Maybe$Nothing),
								transform.normal),
							_Utils_Tuple2(classes, styles)))));
		}
	};
	var _n0 = addTransform(
		addTextShadows(
			addBoxShadows(
				_Utils_Tuple2(_List_Nil, gathered.styles))));
	var newClasses = _n0.a;
	var newStyles = _n0.b;
	return _Utils_update(
		gathered,
		{
			attributes: A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$vDomClass(
					A2(elm_lang$core$String$join, ' ', newClasses)),
				gathered.attributes),
			styles: newStyles
		});
};
var elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _n0) {
				var trues = _n0.a;
				var falses = _n0.b;
				return pred(x) ? _Utils_Tuple2(
					A2(elm_lang$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2(elm_lang$core$List$cons, x, falses));
			});
		return A3(
			elm_lang$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var elm_lang$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm_lang$core$Bitwise$or = _Bitwise_or;
var mdgriffith$stylish_elephants$Internal$Flag$add = F2(
	function (_n0, _n1) {
		var flipTo = _n0.a;
		var truth = _n1.a;
		return mdgriffith$stylish_elephants$Internal$Flag$Flag(flipTo | truth);
	});
var mdgriffith$stylish_elephants$Internal$Flag$height = mdgriffith$stylish_elephants$Internal$Flag$col(7);
var mdgriffith$stylish_elephants$Internal$Flag$width = mdgriffith$stylish_elephants$Internal$Flag$col(6);
var mdgriffith$stylish_elephants$Internal$Flag$xAlign = mdgriffith$stylish_elephants$Internal$Flag$col(30);
var mdgriffith$stylish_elephants$Internal$Flag$yAlign = mdgriffith$stylish_elephants$Internal$Flag$col(29);
var mdgriffith$stylish_elephants$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 'FontFamily', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$GridPosition = function (a) {
	return {$: 'GridPosition', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$GridTemplateStyle = function (a) {
	return {$: 'GridTemplateStyle', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$PaddingStyle = F4(
	function (a, b, c, d) {
		return {$: 'PaddingStyle', a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 'PseudoSelector', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Shadows = F2(
	function (a, b) {
		return {$: 'Shadows', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Transform = function (a) {
	return {$: 'Transform', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 'Transparency', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 'Embedded', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Internal$Model$NodeName = function (a) {
	return {$: 'NodeName', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 'Generic':
				return mdgriffith$stylish_elephants$Internal$Model$NodeName(newNode);
			case 'NodeName':
				var name = old.a;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2(mdgriffith$stylish_elephants$Internal$Model$Embedded, x, y);
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$alignXName = function (align) {
	switch (align.$) {
		case 'Left':
			return 'aligned-horizontally ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignLeft;
		case 'Right':
			return 'aligned-horizontally ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignRight;
		default:
			return 'aligned-horizontally ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterX;
	}
};
var mdgriffith$stylish_elephants$Internal$Model$alignYName = function (align) {
	switch (align.$) {
		case 'Top':
			return 'aligned-vertically ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignTop;
		case 'Bottom':
			return 'aligned-vertically ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignBottom;
		default:
			return 'aligned-vertically ' + mdgriffith$stylish_elephants$Internal$Style$classes.alignCenterY;
	}
};
var mdgriffith$stylish_elephants$Internal$Model$boxShadowName = function (shadow) {
	return elm_lang$core$String$concat(
		_List_fromArray(
			[
				shadow.inset ? 'box-inset' : 'box-',
				elm_lang$core$String$fromFloat(shadow.offset.a) + 'px',
				elm_lang$core$String$fromFloat(shadow.offset.b) + 'px',
				elm_lang$core$String$fromFloat(shadow.blur) + 'px',
				elm_lang$core$String$fromFloat(shadow.size) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColorClass(shadow.color)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$formatTextShadow = function (shadow) {
	return A2(
		elm_lang$core$String$join,
		' ',
		_List_fromArray(
			[
				elm_lang$core$String$fromFloat(shadow.offset.a) + 'px',
				elm_lang$core$String$fromFloat(shadow.offset.b) + 'px',
				elm_lang$core$String$fromFloat(shadow.blur) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.color)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup = {rotate: elm_lang$core$Maybe$Nothing, scale: elm_lang$core$Maybe$Nothing, translate: elm_lang$core$Maybe$Nothing};
var mdgriffith$stylish_elephants$Internal$Model$emptyTransformationStates = {active: elm_lang$core$Maybe$Nothing, focus: elm_lang$core$Maybe$Nothing, hover: elm_lang$core$Maybe$Nothing, normal: elm_lang$core$Maybe$Nothing};
var mdgriffith$stylish_elephants$Internal$Model$Rotation = F4(
	function (a, b, c, d) {
		return {$: 'Rotation', a: a, b: b, c: c, d: d};
	});
var mdgriffith$stylish_elephants$Internal$Model$addIfNothing = F2(
	function (val, existing) {
		if (existing.$ === 'Nothing') {
			return val;
		} else {
			var x = existing;
			return x;
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$stackTransforms = F2(
	function (transform, group) {
		switch (transform.$) {
			case 'Move':
				var mx = transform.a;
				var my = transform.b;
				var mz = transform.c;
				var _n1 = group.translate;
				if (_n1.$ === 'Nothing') {
					return _Utils_update(
						group,
						{
							translate: elm_lang$core$Maybe$Just(
								_Utils_Tuple3(mx, my, mz))
						});
				} else {
					var _n2 = _n1.a;
					var existingX = _n2.a;
					var existingY = _n2.b;
					var existingZ = _n2.c;
					return _Utils_update(
						group,
						{
							translate: elm_lang$core$Maybe$Just(
								_Utils_Tuple3(
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, mx, existingX),
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, my, existingY),
									A2(mdgriffith$stylish_elephants$Internal$Model$addIfNothing, mz, existingZ)))
						});
				}
			case 'Rotate':
				var x = transform.a;
				var y = transform.b;
				var z = transform.c;
				var angle = transform.d;
				return _Utils_update(
					group,
					{
						rotate: A2(
							mdgriffith$stylish_elephants$Internal$Model$addIfNothing,
							elm_lang$core$Maybe$Just(
								A4(mdgriffith$stylish_elephants$Internal$Model$Rotation, x, y, z, angle)),
							group.rotate)
					});
			default:
				var x = transform.a;
				var y = transform.b;
				var z = transform.c;
				return _Utils_update(
					group,
					{
						scale: A2(
							mdgriffith$stylish_elephants$Internal$Model$addIfNothing,
							elm_lang$core$Maybe$Just(
								_Utils_Tuple3(x, y, z)),
							group.scale)
					});
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$stackOn = F3(
	function (maybePseudo, transform, gathered) {
		var states = A2(elm_lang$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformationStates, gathered.transform);
		if (maybePseudo.$ === 'Nothing') {
			var normal = states.normal;
			return _Utils_update(
				gathered,
				{
					transform: elm_lang$core$Maybe$Just(
						_Utils_update(
							states,
							{
								normal: elm_lang$core$Maybe$Just(
									A2(
										mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
										transform,
										A2(elm_lang$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, normal)))
							}))
				});
		} else {
			switch (maybePseudo.a.$) {
				case 'Hover':
					var _n1 = maybePseudo.a;
					var hover = states.hover;
					return _Utils_update(
						gathered,
						{
							transform: elm_lang$core$Maybe$Just(
								_Utils_update(
									states,
									{
										hover: elm_lang$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm_lang$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, hover)))
									}))
						});
				case 'Active':
					var _n2 = maybePseudo.a;
					var active = states.active;
					return _Utils_update(
						gathered,
						{
							transform: elm_lang$core$Maybe$Just(
								_Utils_update(
									states,
									{
										active: elm_lang$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm_lang$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, active)))
									}))
						});
				default:
					var _n3 = maybePseudo.a;
					var focus = states.focus;
					return _Utils_update(
						gathered,
						{
							transform: elm_lang$core$Maybe$Just(
								_Utils_update(
									states,
									{
										focus: elm_lang$core$Maybe$Just(
											A2(
												mdgriffith$stylish_elephants$Internal$Model$stackTransforms,
												transform,
												A2(elm_lang$core$Maybe$withDefault, mdgriffith$stylish_elephants$Internal$Model$emptyTransformGroup, focus)))
									}))
						});
			}
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$textShadowName = function (shadow) {
	return elm_lang$core$String$concat(
		_List_fromArray(
			[
				'txt',
				elm_lang$core$String$fromFloat(shadow.offset.a) + 'px',
				elm_lang$core$String$fromFloat(shadow.offset.b) + 'px',
				elm_lang$core$String$fromFloat(shadow.blur) + 'px',
				mdgriffith$stylish_elephants$Internal$Model$formatColor(shadow.color)
			]));
};
var mdgriffith$stylish_elephants$Internal$Model$gatherAttributes = F2(
	function (attr, gathered) {
		var styleName = function (name) {
			return '.' + name;
		};
		var formatStyleClass = function (styleType) {
			switch (styleType.$) {
				case 'Transform':
					var x = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$Transform(x);
				case 'Shadows':
					var x = styleType.a;
					var y = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$Shadows, x, y);
				case 'PseudoSelector':
					var selector = styleType.a;
					var style = styleType.b;
					return A2(
						mdgriffith$stylish_elephants$Internal$Model$PseudoSelector,
						selector,
						A2(elm_lang$core$List$map, formatStyleClass, style));
				case 'Style':
					var cls = styleType.a;
					var props = styleType.b;
					return A2(
						mdgriffith$stylish_elephants$Internal$Model$Style,
						styleName(cls),
						props);
				case 'Single':
					var cls = styleType.a;
					var name = styleType.b;
					var val = styleType.c;
					return A3(
						mdgriffith$stylish_elephants$Internal$Model$Single,
						styleName(cls),
						name,
						val);
				case 'Colored':
					var cls = styleType.a;
					var name = styleType.b;
					var val = styleType.c;
					return A3(
						mdgriffith$stylish_elephants$Internal$Model$Colored,
						styleName(cls),
						name,
						val);
				case 'SpacingStyle':
					var x = styleType.a;
					var y = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$SpacingStyle, x, y);
				case 'PaddingStyle':
					var top = styleType.a;
					var right = styleType.b;
					var bottom = styleType.c;
					var left = styleType.d;
					return A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, top, right, bottom, left);
				case 'GridTemplateStyle':
					var grid = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$GridTemplateStyle(grid);
				case 'GridPosition':
					var pos = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$GridPosition(pos);
				case 'FontFamily':
					var name = styleType.a;
					var fam = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$FontFamily, name, fam);
				case 'FontSize':
					var i = styleType.a;
					return mdgriffith$stylish_elephants$Internal$Model$FontSize(i);
				default:
					var name = styleType.a;
					var o = styleType.b;
					return A2(mdgriffith$stylish_elephants$Internal$Model$Transparency, name, o);
			}
		};
		var classNameAttr = function (name) {
			return A2(
				elm_lang$virtual_dom$VirtualDom$property,
				'className',
				elm_lang$json$Json$Encode$string(name));
		};
		switch (attr.$) {
			case 'NoAttribute':
				return gathered;
			case 'Class':
				var flag = attr.a;
				var exactClassName = attr.b;
				return A2(mdgriffith$stylish_elephants$Internal$Flag$present, flag, gathered.has) ? gathered : _Utils_update(
					gathered,
					{
						attributes: A2(
							elm_lang$core$List$cons,
							classNameAttr(exactClassName),
							gathered.attributes),
						has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, flag, gathered.has)
					});
			case 'Attr':
				var attribute = attr.a;
				return _Utils_update(
					gathered,
					{
						attributes: A2(elm_lang$core$List$cons, attribute, gathered.attributes)
					});
			case 'StyleClass':
				var flag = attr.a;
				var style = attr.b;
				var addNormalStyle = F2(
					function (styleProp, gatheredProps) {
						return A2(mdgriffith$stylish_elephants$Internal$Flag$present, flag, gatheredProps.has) ? gatheredProps : _Utils_update(
							gatheredProps,
							{
								attributes: function () {
									if (styleProp.$ === 'PseudoSelector') {
										return A2(
											elm_lang$core$List$cons,
											A2(
												elm_lang$virtual_dom$VirtualDom$property,
												'className',
												elm_lang$json$Json$Encode$string(mdgriffith$stylish_elephants$Internal$Style$classes.transition)),
											A2(
												elm_lang$core$List$cons,
												classNameAttr(
													mdgriffith$stylish_elephants$Internal$Model$getStyleName(styleProp)),
												gatheredProps.attributes));
									} else {
										return A2(
											elm_lang$core$List$cons,
											classNameAttr(
												mdgriffith$stylish_elephants$Internal$Model$getStyleName(styleProp)),
											gatheredProps.attributes);
									}
								}(),
								has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, flag, gatheredProps.has),
								styles: A2(
									elm_lang$core$List$cons,
									formatStyleClass(styleProp),
									gatheredProps.styles)
							});
					});
				switch (style.$) {
					case 'Transform':
						var transformation = style.a;
						return A3(mdgriffith$stylish_elephants$Internal$Model$stackOn, elm_lang$core$Maybe$Nothing, transformation, gathered);
					case 'PseudoSelector':
						var pseudo = style.a;
						var props = style.b;
						var forTransforms = function (attribute) {
							if (attribute.$ === 'Transform') {
								var x = attribute.a;
								return elm_lang$core$Maybe$Just(x);
							} else {
								return elm_lang$core$Maybe$Nothing;
							}
						};
						var _n3 = A2(
							elm_lang$core$List$partition,
							function (x) {
								return !_Utils_eq(
									forTransforms(x),
									elm_lang$core$Maybe$Nothing);
							},
							props);
						var transformationProps = _n3.a;
						var otherProps = _n3.b;
						var withTransforms = A3(
							elm_lang$core$List$foldr,
							mdgriffith$stylish_elephants$Internal$Model$stackOn(
								elm_lang$core$Maybe$Just(pseudo)),
							gathered,
							A2(elm_lang$core$List$filterMap, forTransforms, transformationProps));
						return A2(
							addNormalStyle,
							A2(mdgriffith$stylish_elephants$Internal$Model$PseudoSelector, pseudo, otherProps),
							withTransforms);
					default:
						return A2(addNormalStyle, style, gathered);
				}
			case 'Width':
				var width = attr.a;
				if (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$width, gathered.has)) {
					var widthHelper = F2(
						function (w, gath) {
							switch (w.$) {
								case 'Px':
									var px = w.a;
									return _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													mdgriffith$stylish_elephants$Internal$Style$classes.widthExact + (' width-px-' + elm_lang$core$String$fromInt(px))),
												gath.attributes),
											styles: A2(
												elm_lang$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													styleName(
														'width-px-' + elm_lang$core$String$fromInt(px)),
													'width',
													elm_lang$core$String$fromInt(px) + 'px'),
												gath.styles)
										});
								case 'Content':
									return _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.widthContent),
												gath.attributes),
											has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthContent, gathered.has)
										});
								case 'Fill':
									var portion = w.a;
									return (portion === 1) ? _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.widthFill),
												gath.attributes),
											has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthFill, gathered.has)
										}) : _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													mdgriffith$stylish_elephants$Internal$Style$classes.widthFillPortion + (' width-fill-' + elm_lang$core$String$fromInt(portion))),
												gath.attributes),
											has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$widthFill, gathered.has),
											styles: A2(
												elm_lang$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													'.' + (mdgriffith$stylish_elephants$Internal$Style$classes.any + ('.' + (mdgriffith$stylish_elephants$Internal$Style$classes.row + (' > ' + styleName(
														'width-fill-' + elm_lang$core$String$fromInt(portion)))))),
													'flex-grow',
													elm_lang$core$String$fromInt(portion * 100000)),
												gath.styles)
										});
								case 'Min':
									var minSize = w.a;
									var len = w.b;
									var _n7 = _Utils_Tuple2(
										'min-width-' + elm_lang$core$String$fromInt(minSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.min-width-' + elm_lang$core$String$fromInt(minSize),
											'min-width',
											elm_lang$core$String$fromInt(minSize) + 'px'));
									var cls = _n7.a;
									var style = _n7.b;
									var newGathered = _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(cls),
												gath.attributes),
											styles: A2(elm_lang$core$List$cons, style, gath.styles)
										});
									return A2(widthHelper, len, newGathered);
								default:
									var maxSize = w.a;
									var len = w.b;
									var _n8 = _Utils_Tuple2(
										'max-width-' + elm_lang$core$String$fromInt(maxSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.max-width-' + elm_lang$core$String$fromInt(maxSize),
											'max-width',
											elm_lang$core$String$fromInt(maxSize) + 'px'));
									var cls = _n8.a;
									var style = _n8.b;
									var newGathered = _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(cls),
												gath.attributes),
											styles: A2(elm_lang$core$List$cons, style, gath.styles)
										});
									return A2(widthHelper, len, newGathered);
							}
						});
					return A2(
						widthHelper,
						width,
						_Utils_update(
							gathered,
							{
								has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$width, gathered.has)
							}));
				} else {
					return gathered;
				}
			case 'Height':
				var height = attr.a;
				if (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$height, gathered.has)) {
					var heightHelper = F2(
						function (h, gath) {
							switch (h.$) {
								case 'Px':
									var px = h.a;
									return _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													'height-px-' + elm_lang$core$String$fromInt(px)),
												gath.attributes),
											styles: A2(
												elm_lang$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													styleName(
														'height-px-' + elm_lang$core$String$fromInt(px)),
													'height',
													elm_lang$core$String$fromInt(px) + 'px'),
												gath.styles)
										});
								case 'Content':
									return _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.heightContent),
												gath.attributes),
											has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightContent, gathered.has)
										});
								case 'Fill':
									var portion = h.a;
									return (portion === 1) ? _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(mdgriffith$stylish_elephants$Internal$Style$classes.heightFill),
												gath.attributes),
											has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightFill, gathered.has)
										}) : _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(
													mdgriffith$stylish_elephants$Internal$Style$classes.heightFillPortion + (' height-fill-' + elm_lang$core$String$fromInt(portion))),
												gath.attributes),
											has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$heightFill, gathered.has),
											styles: A2(
												elm_lang$core$List$cons,
												A3(
													mdgriffith$stylish_elephants$Internal$Model$Single,
													'.' + (mdgriffith$stylish_elephants$Internal$Style$classes.any + ('.' + (mdgriffith$stylish_elephants$Internal$Style$classes.column + (' > ' + styleName(
														'height-fill-' + elm_lang$core$String$fromInt(portion)))))),
													'flex-grow',
													elm_lang$core$String$fromInt(portion * 100000)),
												gath.styles)
										});
								case 'Min':
									var minSize = h.a;
									var len = h.b;
									var _n10 = _Utils_Tuple2(
										'min-height-' + elm_lang$core$String$fromInt(minSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.min-height-' + elm_lang$core$String$fromInt(minSize),
											'min-height',
											elm_lang$core$String$fromInt(minSize) + 'px'));
									var cls = _n10.a;
									var style = _n10.b;
									var newGathered = _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(cls),
												gath.attributes),
											styles: A2(elm_lang$core$List$cons, style, gath.styles)
										});
									return A2(heightHelper, len, newGathered);
								default:
									var maxSize = h.a;
									var len = h.b;
									var _n11 = _Utils_Tuple2(
										'max-height-' + elm_lang$core$String$fromInt(maxSize),
										A3(
											mdgriffith$stylish_elephants$Internal$Model$Single,
											'.max-height-' + elm_lang$core$String$fromInt(maxSize),
											'max-height',
											elm_lang$core$String$fromInt(maxSize) + 'px'));
									var cls = _n11.a;
									var style = _n11.b;
									var newGathered = _Utils_update(
										gath,
										{
											attributes: A2(
												elm_lang$core$List$cons,
												classNameAttr(cls),
												gath.attributes),
											styles: A2(elm_lang$core$List$cons, style, gath.styles)
										});
									return A2(heightHelper, len, newGathered);
							}
						});
					return A2(
						heightHelper,
						height,
						_Utils_update(
							gathered,
							{
								has: A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$height, gathered.has)
							}));
				} else {
					return gathered;
				}
			case 'Describe':
				var description = attr.a;
				switch (description.$) {
					case 'Main':
						return _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'main', gathered.node)
							});
					case 'Navigation':
						return _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'nav', gathered.node)
							});
					case 'ContentInfo':
						return _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'footer', gathered.node)
							});
					case 'Complementary':
						return _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'aside', gathered.node)
							});
					case 'Heading':
						var i = description.a;
						return (i <= 1) ? _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'h1', gathered.node)
							}) : ((i < 7) ? _Utils_update(
							gathered,
							{
								node: A2(
									mdgriffith$stylish_elephants$Internal$Model$addNodeName,
									'h' + elm_lang$core$String$fromInt(i),
									gathered.node)
							}) : _Utils_update(
							gathered,
							{
								node: A2(mdgriffith$stylish_elephants$Internal$Model$addNodeName, 'h6', gathered.node)
							}));
					case 'Button':
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm_lang$core$List$cons,
									A2(elm_lang$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									gathered.attributes)
							});
					case 'Label':
						var label = description.a;
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm_lang$core$List$cons,
									A2(elm_lang$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									gathered.attributes)
							});
					case 'LivePolite':
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm_lang$core$List$cons,
									A2(elm_lang$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									gathered.attributes)
							});
					default:
						return _Utils_update(
							gathered,
							{
								attributes: A2(
									elm_lang$core$List$cons,
									A2(elm_lang$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									gathered.attributes)
							});
				}
			case 'Nearby':
				var location = attr.a;
				var elem = attr.b;
				var styles = function () {
					switch (elem.$) {
						case 'Empty':
							return elm_lang$core$Maybe$Nothing;
						case 'Text':
							var str = elem.a;
							return elm_lang$core$Maybe$Nothing;
						case 'Unstyled':
							var html = elem.a;
							return elm_lang$core$Maybe$Nothing;
						default:
							var styled = elem.a;
							return elm_lang$core$Maybe$Just(
								_Utils_ap(gathered.styles, styled.styles));
					}
				}();
				var nearbyElement = A3(
					elm_lang$virtual_dom$VirtualDom$node,
					'div',
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Internal$Model$vDomClass(
							function () {
								switch (location.$) {
									case 'Above':
										return A2(
											elm_lang$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.above]));
									case 'Below':
										return A2(
											elm_lang$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.below]));
									case 'OnRight':
										return A2(
											elm_lang$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.onRight]));
									case 'OnLeft':
										return A2(
											elm_lang$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.onLeft]));
									case 'InFront':
										return A2(
											elm_lang$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.inFront]));
									default:
										return A2(
											elm_lang$core$String$join,
											' ',
											_List_fromArray(
												[mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.behind]));
								}
							}())
						]),
					_List_fromArray(
						[
							function () {
							switch (elem.$) {
								case 'Empty':
									return elm_lang$virtual_dom$VirtualDom$text('');
								case 'Text':
									var str = elem.a;
									return mdgriffith$stylish_elephants$Internal$Model$textElement(str);
								case 'Unstyled':
									var html = elem.a;
									return html(mdgriffith$stylish_elephants$Internal$Model$asEl);
								default:
									var styled = elem.a;
									return A2(styled.html, elm_lang$core$Maybe$Nothing, mdgriffith$stylish_elephants$Internal$Model$asEl);
							}
						}()
						]));
				return _Utils_update(
					gathered,
					{
						children: A2(elm_lang$core$List$cons, nearbyElement, gathered.children),
						styles: function () {
							if (styles.$ === 'Nothing') {
								return gathered.styles;
							} else {
								var newStyles = styles.a;
								return newStyles;
							}
						}()
					});
			case 'AlignX':
				var x = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$xAlign, gathered.has)) ? _Utils_update(
					gathered,
					{
						attributes: A2(
							elm_lang$core$List$cons,
							classNameAttr(
								mdgriffith$stylish_elephants$Internal$Model$alignXName(x)),
							gathered.attributes),
						has: function (flags) {
							switch (x.$) {
								case 'CenterX':
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$centerX, flags);
								case 'Right':
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$alignRight, flags);
								default:
									return flags;
							}
						}(
							A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$xAlign, gathered.has))
					}) : gathered;
			case 'AlignY':
				var y = attr.a;
				return (!A2(mdgriffith$stylish_elephants$Internal$Flag$present, mdgriffith$stylish_elephants$Internal$Flag$yAlign, gathered.has)) ? _Utils_update(
					gathered,
					{
						attributes: A2(
							elm_lang$core$List$cons,
							classNameAttr(
								mdgriffith$stylish_elephants$Internal$Model$alignYName(y)),
							gathered.attributes),
						has: function (flags) {
							switch (y.$) {
								case 'CenterY':
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$centerY, flags);
								case 'Bottom':
									return A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$alignBottom, flags);
								default:
									return flags;
							}
						}(
							A2(mdgriffith$stylish_elephants$Internal$Flag$add, mdgriffith$stylish_elephants$Internal$Flag$yAlign, gathered.has))
					}) : gathered;
			case 'BoxShadow':
				var shadow = attr.a;
				var _n19 = gathered.boxShadows;
				if (_n19.$ === 'Nothing') {
					return _Utils_update(
						gathered,
						{
							boxShadows: elm_lang$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$boxShadowName(shadow),
									mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(shadow)))
						});
				} else {
					var _n20 = _n19.a;
					var existingClass = _n20.a;
					var existing = _n20.b;
					return _Utils_update(
						gathered,
						{
							boxShadows: elm_lang$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$boxShadowName(shadow) + ('-' + existingClass),
									mdgriffith$stylish_elephants$Internal$Model$formatBoxShadow(shadow) + (', ' + existing)))
						});
				}
			default:
				var shadow = attr.a;
				var _n21 = gathered.textShadows;
				if (_n21.$ === 'Nothing') {
					return _Utils_update(
						gathered,
						{
							textShadows: elm_lang$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow),
									mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow)))
						});
				} else {
					var _n22 = _n21.a;
					var existingClass = _n22.a;
					var existing = _n22.b;
					return _Utils_update(
						gathered,
						{
							textShadows: elm_lang$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$stylish_elephants$Internal$Model$textShadowName(shadow) + ('-' + existingClass),
									mdgriffith$stylish_elephants$Internal$Model$formatTextShadow(shadow) + (', ' + existing)))
						});
				}
		}
	});
var mdgriffith$stylish_elephants$Internal$Flag$none = mdgriffith$stylish_elephants$Internal$Flag$Flag(0);
var mdgriffith$stylish_elephants$Internal$Model$Generic = {$: 'Generic'};
var mdgriffith$stylish_elephants$Internal$Model$initGathered = function (maybeNodeName) {
	return {
		attributes: _List_Nil,
		boxShadows: elm_lang$core$Maybe$Nothing,
		children: _List_Nil,
		has: mdgriffith$stylish_elephants$Internal$Flag$none,
		node: function () {
			if (maybeNodeName.$ === 'Nothing') {
				return mdgriffith$stylish_elephants$Internal$Model$Generic;
			} else {
				var name = maybeNodeName.a;
				return mdgriffith$stylish_elephants$Internal$Model$NodeName(name);
			}
		}(),
		styles: _List_Nil,
		textShadows: elm_lang$core$Maybe$Nothing,
		transform: elm_lang$core$Maybe$Nothing
	};
};
var mdgriffith$stylish_elephants$Internal$Model$element = F5(
	function (embedMode, context, node, attributes, children) {
		return A4(
			mdgriffith$stylish_elephants$Internal$Model$asElement,
			embedMode,
			children,
			context,
			mdgriffith$stylish_elephants$Internal$Model$finalize(
				A3(
					elm_lang$core$List$foldr,
					mdgriffith$stylish_elephants$Internal$Model$gatherAttributes,
					mdgriffith$stylish_elephants$Internal$Model$initGathered(node),
					A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Internal$Model$contextClasses(context),
						attributes))));
	});
var mdgriffith$stylish_elephants$Internal$Model$NoStyleSheet = {$: 'NoStyleSheet'};
var mdgriffith$stylish_elephants$Internal$Model$noStyleSheet = mdgriffith$stylish_elephants$Internal$Model$NoStyleSheet;
var mdgriffith$stylish_elephants$Element$column = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asColumn,
			elm_lang$core$Maybe$Nothing,
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentTop),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentLeft),
					A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$fill),
						A2(
							elm_lang$core$List$cons,
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
							attrs)))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Internal$Model$Content = {$: 'Content'};
var mdgriffith$stylish_elephants$Element$shrink = mdgriffith$stylish_elephants$Internal$Model$Content;
var mdgriffith$stylish_elephants$Element$el = F2(
	function (attrs, child) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm_lang$core$Maybe$Nothing,
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
					attrs)),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var mdgriffith$stylish_elephants$Internal$Model$Px = function (a) {
	return {$: 'Px', a: a};
};
var mdgriffith$stylish_elephants$Element$px = mdgriffith$stylish_elephants$Internal$Model$Px;
var mdgriffith$stylish_elephants$Internal$Model$AsRow = {$: 'AsRow'};
var mdgriffith$stylish_elephants$Internal$Model$asRow = mdgriffith$stylish_elephants$Internal$Model$AsRow;
var mdgriffith$stylish_elephants$Element$row = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asRow,
			elm_lang$core$Maybe$Nothing,
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentLeft),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY),
					A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
						A2(
							elm_lang$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							attrs)))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Internal$Model$Text = function (a) {
	return {$: 'Text', a: a};
};
var mdgriffith$stylish_elephants$Element$text = function (content) {
	return mdgriffith$stylish_elephants$Internal$Model$Text(content);
};
var mdgriffith$stylish_elephants$Element$Font$strike = mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.strike);
var author$project$View$stationRow = F2(
	function (stations, station) {
		var name = A2(author$project$View$stationName, stations, station.stationShortCode);
		return A2(
			mdgriffith$stylish_elephants$Element$row,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$spacing(
					elm_lang$core$Basics$round(
						author$project$View$rem(0.5)))
				]),
			_List_fromArray(
				[
					function () {
					var _n0 = _Utils_Tuple2(station.liveEstimateTime, station.differenceInMinutes);
					if ((_n0.a.$ === 'Just') && (_n0.b.$ === 'Just')) {
						var estimate = _n0.a.a;
						var n = _n0.b.a;
						return A2(
							mdgriffith$stylish_elephants$Element$column,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$width(
									mdgriffith$stylish_elephants$Element$px(author$project$View$timeWidth)),
									mdgriffith$stylish_elephants$Element$Font$color(
									author$project$View$timelinessColor(n))
								]),
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$text(
									author$project$View$prettyTime(estimate)),
									n ? A2(
									mdgriffith$stylish_elephants$Element$el,
									_List_fromArray(
										[
											mdgriffith$stylish_elephants$Element$Font$color(author$project$View$colors.gray),
											mdgriffith$stylish_elephants$Element$Font$strike,
											mdgriffith$stylish_elephants$Element$Font$size(
											elm_lang$core$Basics$round(
												author$project$View$ts(-1)))
										]),
									mdgriffith$stylish_elephants$Element$text(
										author$project$View$prettyTime(station.scheduledTime))) : mdgriffith$stylish_elephants$Element$text('')
								]));
					} else {
						return A2(
							mdgriffith$stylish_elephants$Element$el,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$width(
									mdgriffith$stylish_elephants$Element$px(author$project$View$timeWidth))
								]),
							mdgriffith$stylish_elephants$Element$text(
								author$project$View$prettyTime(station.scheduledTime)));
					}
				}(),
					A2(
					mdgriffith$stylish_elephants$Element$el,
					_List_Nil,
					mdgriffith$stylish_elephants$Element$text(name))
				]));
	});
var author$project$View$whenJust = F2(
	function (value, toElement) {
		if (value.$ === 'Just') {
			var a = value.a;
			return toElement(a);
		} else {
			return mdgriffith$stylish_elephants$Element$text('');
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$AlignX = function (a) {
	return {$: 'AlignX', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$CenterX = {$: 'CenterX'};
var mdgriffith$stylish_elephants$Element$centerX = mdgriffith$stylish_elephants$Internal$Model$AlignX(mdgriffith$stylish_elephants$Internal$Model$CenterX);
var mdgriffith$stylish_elephants$Internal$Model$AlignY = function (a) {
	return {$: 'AlignY', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$CenterY = {$: 'CenterY'};
var mdgriffith$stylish_elephants$Element$centerY = mdgriffith$stylish_elephants$Internal$Model$AlignY(mdgriffith$stylish_elephants$Internal$Model$CenterY);
var mdgriffith$stylish_elephants$Internal$Flag$padding = mdgriffith$stylish_elephants$Internal$Flag$col(2);
var mdgriffith$stylish_elephants$Element$paddingXY = F2(
	function (x, y) {
		return A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$padding,
			A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, y, x, y, x));
	});
var mdgriffith$stylish_elephants$Internal$Model$AsParagraph = {$: 'AsParagraph'};
var mdgriffith$stylish_elephants$Internal$Model$asParagraph = mdgriffith$stylish_elephants$Internal$Model$AsParagraph;
var mdgriffith$stylish_elephants$Element$paragraph = F2(
	function (attrs, children) {
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asParagraph,
			elm_lang$core$Maybe$Just('p'),
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Element$spacing(5),
					attrs)),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(children));
	});
var mdgriffith$stylish_elephants$Internal$Flag$bgColor = mdgriffith$stylish_elephants$Internal$Flag$col(8);
var mdgriffith$stylish_elephants$Element$Background$color = function (clr) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$bgColor,
		A3(
			mdgriffith$stylish_elephants$Internal$Model$Colored,
			'bg-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var mdgriffith$stylish_elephants$Internal$Flag$fontWeight = mdgriffith$stylish_elephants$Internal$Flag$col(13);
var mdgriffith$stylish_elephants$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$Font$bold = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontWeight, mdgriffith$stylish_elephants$Internal$Style$classes.bold);
var mdgriffith$stylish_elephants$Internal$Flag$fontAlignment = mdgriffith$stylish_elephants$Internal$Flag$col(12);
var mdgriffith$stylish_elephants$Element$Font$center = A2(mdgriffith$stylish_elephants$Internal$Model$Class, mdgriffith$stylish_elephants$Internal$Flag$fontAlignment, mdgriffith$stylish_elephants$Internal$Style$classes.textCenter);
var author$project$View$trainRow = F3(
	function (_n0, _n1, train) {
		var stations = _n0.stations;
		var currentTime = _n0.currentTime;
		var from = _n1.a;
		var to = _n1.b;
		var statusInfoBadge = F2(
			function (station, n) {
				return A2(
					mdgriffith$stylish_elephants$Element$row,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$Font$size(
							elm_lang$core$Basics$round(
								author$project$View$ts(-1))),
							mdgriffith$stylish_elephants$Element$Font$center,
							mdgriffith$stylish_elephants$Element$centerX
						]),
					_List_fromArray(
						[
							A2(
							mdgriffith$stylish_elephants$Element$el,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$Font$center,
									mdgriffith$stylish_elephants$Element$Font$bold,
									mdgriffith$stylish_elephants$Element$Font$color(
									author$project$View$timelinessColor(n))
								]),
							mdgriffith$stylish_elephants$Element$text(
								A2(author$project$View$formatDifference, 'On time', station.differenceInMinutes)))
						]));
			});
		var statusInfo = function (station) {
			return A2(
				author$project$View$whenJust,
				station.differenceInMinutes,
				statusInfoBadge(station));
		};
		var endStation = elm_lang$core$List$head(
			A2(
				elm_lang$core$List$filter,
				function (row) {
					return _Utils_eq(row.rowType, author$project$Model$Arrival) && _Utils_eq(row.stationShortCode, to);
				},
				train.timetableRows));
		var currentStation = elm_lang$core$List$head(
			elm_lang$core$List$reverse(
				A2(
					elm_lang$core$List$filter,
					function ($) {
						return !_Utils_eq(elm_lang$core$Maybe$Nothing, $.actualTime);
					},
					train.timetableRows)));
		var isMoving = !_Utils_eq(currentStation, elm_lang$core$Maybe$Nothing);
		var _n2 = function (homeStationRows) {
			return _Utils_Tuple2(
				elm_lang$core$List$head(
					A2(
						elm_lang$core$List$filter,
						function ($) {
							return _Utils_eq(author$project$Model$Arrival, $.rowType);
						},
						homeStationRows)),
				elm_lang$core$List$head(
					A2(
						elm_lang$core$List$filter,
						function ($) {
							return _Utils_eq(author$project$Model$Departure, $.rowType);
						},
						homeStationRows)));
		}(
			A2(
				elm_lang$core$List$filter,
				function ($) {
					return _Utils_eq(from, $.stationShortCode);
				},
				train.timetableRows));
		var homeStationArrival = _n2.a;
		var homeStationDeparture = _n2.b;
		var homeStationArrivingIn = A2(
			elm_lang$core$Maybe$andThen,
			function (timeDiff) {
				return (timeDiff > 0) ? elm_lang$core$Maybe$Just(
					author$project$View$prettyMinutes(timeDiff)) : elm_lang$core$Maybe$Nothing;
			},
			A2(
				elm_lang$core$Maybe$map,
				function (date) {
					return elm_lang$time$Time$posixToMillis(date) - elm_lang$time$Time$posixToMillis(currentTime);
				},
				A2(
					elm_lang$core$Maybe$withDefault,
					A2(
						elm_lang$core$Maybe$map,
						function ($) {
							return $.scheduledTime;
						},
						homeStationArrival),
					A2(
						elm_lang$core$Maybe$map,
						function ($) {
							return $.liveEstimateTime;
						},
						homeStationArrival))));
		var homeStationLiveEstimate = A2(
			elm_lang$core$Maybe$andThen,
			elm_lang$core$Basics$identity,
			A2(
				elm_lang$core$Maybe$map,
				function ($) {
					return $.liveEstimateTime;
				},
				homeStationDeparture));
		return A2(
			mdgriffith$stylish_elephants$Element$row,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$Background$color(author$project$View$colors.white),
					author$project$View$shadow,
					A2(
					mdgriffith$stylish_elephants$Element$paddingXY,
					elm_lang$core$Basics$round(
						author$project$View$rem(1)),
					elm_lang$core$Basics$round(
						author$project$View$rem(0.5))),
					mdgriffith$stylish_elephants$Element$spacing(
					elm_lang$core$Basics$round(
						author$project$View$rem(1))),
					mdgriffith$stylish_elephants$Element$centerY,
					mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill)
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$column,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$width(
							mdgriffith$stylish_elephants$Element$px(
								elm_lang$core$Basics$round(
									author$project$View$rem(2))))
						]),
					_List_fromArray(
						[
							A2(
							mdgriffith$stylish_elephants$Element$paragraph,
							_Utils_ap(
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Font$size(
										elm_lang$core$Basics$round(
											author$project$View$ts(3))),
										mdgriffith$stylish_elephants$Element$Font$bold,
										mdgriffith$stylish_elephants$Element$Font$center,
										mdgriffith$stylish_elephants$Element$spacing(1),
										mdgriffith$stylish_elephants$Element$Font$color(author$project$View$colors.gray)
									]),
								isMoving ? _List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Font$color(author$project$View$colors.black)
									]) : _List_Nil),
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$text(train.lineId)
								]))
						])),
					A2(
					mdgriffith$stylish_elephants$Element$column,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$fill)
						]),
					_List_fromArray(
						[
							A2(
							author$project$View$whenJust,
							homeStationDeparture,
							author$project$View$stationRow(stations)),
							A2(
							mdgriffith$stylish_elephants$Element$el,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$width(
									mdgriffith$stylish_elephants$Element$px(author$project$View$timeWidth))
								]),
							mdgriffith$stylish_elephants$Element$text('︙')),
							A2(
							author$project$View$whenJust,
							endStation,
							author$project$View$stationRow(stations))
						])),
					A2(
					mdgriffith$stylish_elephants$Element$column,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							author$project$View$whenJust,
							homeStationArrivingIn,
							function (time) {
								return A2(
									mdgriffith$stylish_elephants$Element$el,
									_List_fromArray(
										[
											mdgriffith$stylish_elephants$Element$Font$size(
											elm_lang$core$Basics$round(
												author$project$View$ts(-1))),
											mdgriffith$stylish_elephants$Element$Font$center,
											mdgriffith$stylish_elephants$Element$Font$bold,
											mdgriffith$stylish_elephants$Element$Font$color(author$project$View$colors.gray)
										]),
									mdgriffith$stylish_elephants$Element$text('Arrives in'));
							}),
							A2(
							author$project$View$whenJust,
							homeStationArrivingIn,
							function (time) {
								return A2(
									mdgriffith$stylish_elephants$Element$paragraph,
									_List_fromArray(
										[
											mdgriffith$stylish_elephants$Element$Font$size(
											elm_lang$core$Basics$round(
												author$project$View$ts(2))),
											mdgriffith$stylish_elephants$Element$Font$center,
											mdgriffith$stylish_elephants$Element$spacing(1),
											mdgriffith$stylish_elephants$Element$Font$color(author$project$View$colors.gray)
										]),
									_List_fromArray(
										[
											mdgriffith$stylish_elephants$Element$text(time)
										]));
							}),
							A2(author$project$View$whenJust, currentStation, statusInfo)
						]))
				]));
	});
var mdgriffith$stylish_elephants$Internal$Model$unstyled = function ($) {
	return mdgriffith$stylish_elephants$Internal$Model$Unstyled(
		elm_lang$core$Basics$always($));
};
var mdgriffith$stylish_elephants$Element$html = mdgriffith$stylish_elephants$Internal$Model$unstyled;
var elm_lang$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm_lang$json$Json$Encode$string(string));
	});
var elm_lang$html$Html$Attributes$href = function (url) {
	return A2(
		elm_lang$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var elm_lang$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var mdgriffith$stylish_elephants$Element$link = F2(
	function (attrs, _n0) {
		var url = _n0.url;
		var label = _n0.label;
		return A5(
			mdgriffith$stylish_elephants$Internal$Model$element,
			mdgriffith$stylish_elephants$Internal$Model$noStyleSheet,
			mdgriffith$stylish_elephants$Internal$Model$asEl,
			elm_lang$core$Maybe$Just('a'),
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$Attr(
					elm_lang$html$Html$Attributes$href(url)),
				A2(
					elm_lang$core$List$cons,
					mdgriffith$stylish_elephants$Internal$Model$Attr(
						elm_lang$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						elm_lang$core$List$cons,
						mdgriffith$stylish_elephants$Element$width(mdgriffith$stylish_elephants$Element$shrink),
						A2(
							elm_lang$core$List$cons,
							mdgriffith$stylish_elephants$Element$height(mdgriffith$stylish_elephants$Element$shrink),
							A2(
								elm_lang$core$List$cons,
								mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterX),
								A2(
									elm_lang$core$List$cons,
									mdgriffith$stylish_elephants$Internal$Model$htmlClass(mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY),
									attrs)))))),
			mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var mdgriffith$stylish_elephants$Internal$Model$Min = F2(
	function (a, b) {
		return {$: 'Min', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$minimum = F2(
	function (i, l) {
		return A2(mdgriffith$stylish_elephants$Internal$Model$Min, i, l);
	});
var author$project$View$trainsView = F3(
	function (model, _n0, trains) {
		var from = _n0.a;
		var to = _n0.b;
		var rightDirection = author$project$Model$sortedTrainList(trains);
		var heading = A2(author$project$View$stationName, model.stations, from) + ('—' + A2(author$project$View$stationName, model.stations, to));
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$spacing(
					elm_lang$core$Basics$round(
						author$project$View$rem(1))),
					mdgriffith$stylish_elephants$Element$width(
					A2(
						mdgriffith$stylish_elephants$Element$minimum,
						elm_lang$core$Basics$round(
							author$project$View$rem(20)),
						mdgriffith$stylish_elephants$Element$fill))
				]),
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						mdgriffith$stylish_elephants$Element$row,
						_Utils_ap(
							author$project$View$headingStyles,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Element$spacing(
									elm_lang$core$Basics$round(
										author$project$View$rem(1)))
								])),
						_List_fromArray(
							[
								A2(
								mdgriffith$stylish_elephants$Element$link,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Font$color(author$project$View$colors.black),
										mdgriffith$stylish_elephants$Element$Font$center,
										mdgriffith$stylish_elephants$Element$width(
										mdgriffith$stylish_elephants$Element$px(
											elm_lang$core$Basics$round(
												author$project$View$rem(2))))
									]),
								{
									label: mdgriffith$stylish_elephants$Element$text('‹'),
									url: '#'
								}),
								A2(
								mdgriffith$stylish_elephants$Element$el,
								author$project$View$headingStyles,
								mdgriffith$stylish_elephants$Element$text(heading)),
								A2(
								mdgriffith$stylish_elephants$Element$link,
								_List_fromArray(
									[
										mdgriffith$stylish_elephants$Element$Font$color(author$project$View$colors.gray),
										mdgriffith$stylish_elephants$Element$Font$center,
										mdgriffith$stylish_elephants$Element$width(
										mdgriffith$stylish_elephants$Element$px(
											elm_lang$core$Basics$round(
												author$project$View$rem(2)))),
										mdgriffith$stylish_elephants$Element$centerX
									]),
								{
									label: mdgriffith$stylish_elephants$Element$html(
										author$project$Icons$swap(
											author$project$View$ts(2))),
									url: '#' + (to + ('/' + from))
								})
							]))
					]),
				A2(
					elm_lang$core$List$map,
					A2(
						author$project$View$trainRow,
						model,
						_Utils_Tuple2(from, to)),
					rightDirection)));
	});
var author$project$View$scheduleView = F2(
	function (model, targets) {
		var _n0 = model.trains;
		switch (_n0.$) {
			case 'Success':
				var trains = _n0.a;
				return A3(author$project$View$trainsView, model, targets, trains);
			case 'Failure':
				var err = _n0.a;
				return A2(
					mdgriffith$stylish_elephants$Element$column,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$spacing(
							elm_lang$core$Basics$round(
								author$project$View$rem(1)))
						]),
					_List_fromArray(
						[
							A2(
							mdgriffith$stylish_elephants$Element$el,
							author$project$View$headingStyles,
							mdgriffith$stylish_elephants$Element$text('Oh noes, an error!')),
							function () {
							switch (err.$) {
								case 'NetworkError':
									return mdgriffith$stylish_elephants$Element$text('It\'s the network.');
								case 'Timeout':
									return mdgriffith$stylish_elephants$Element$text('Helloooo? (There was no response.)');
								case 'BadUrl':
									return mdgriffith$stylish_elephants$Element$text('It\'s not you, it\'s me. I have the server address wrong.');
								case 'BadStatus':
									return mdgriffith$stylish_elephants$Element$text('Whoops, looks like the server didn\'t like the request.');
								default:
									return mdgriffith$stylish_elephants$Element$text('Ouch, the server responded with strange contents.');
							}
						}()
						]));
			case 'Loading':
				return A2(
					mdgriffith$stylish_elephants$Element$el,
					author$project$View$headingStyles,
					mdgriffith$stylish_elephants$Element$text('Loading'));
			default:
				return mdgriffith$stylish_elephants$Element$text('');
		}
	});
var elm_lang$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var author$project$Stations$common = _List_fromArray(
	[
		A2(elm_lang$core$Tuple$pair, 'HKI', 'Helsinki'),
		A2(elm_lang$core$Tuple$pair, 'PSL', 'Pasila')
	]);
var author$project$Stations$directionLahti = _List_fromArray(
	[
		A2(elm_lang$core$Tuple$pair, 'KÄP', 'Käpylä'),
		A2(elm_lang$core$Tuple$pair, 'OLK', 'Oulunkylä'),
		A2(elm_lang$core$Tuple$pair, 'PMK', 'Pukinmäki'),
		A2(elm_lang$core$Tuple$pair, 'ML', 'Malmi'),
		A2(elm_lang$core$Tuple$pair, 'TNA', 'Tapanila'),
		A2(elm_lang$core$Tuple$pair, 'PLA', 'Puistola'),
		A2(elm_lang$core$Tuple$pair, 'TKL', 'Tikkurila'),
		A2(elm_lang$core$Tuple$pair, 'HKH', 'Hiekkaharju'),
		A2(elm_lang$core$Tuple$pair, 'KVY', 'Koivukylä'),
		A2(elm_lang$core$Tuple$pair, 'RKL', 'Rekola'),
		A2(elm_lang$core$Tuple$pair, 'KRS', 'Korso'),
		A2(elm_lang$core$Tuple$pair, 'SAV', 'Savio'),
		A2(elm_lang$core$Tuple$pair, 'KE', 'Kerava'),
		A2(elm_lang$core$Tuple$pair, 'HAA', 'Haarajoki'),
		A2(elm_lang$core$Tuple$pair, 'MLÄ', 'Mäntsälä'),
		A2(elm_lang$core$Tuple$pair, 'HNN', 'Henna'),
		A2(elm_lang$core$Tuple$pair, 'LH', 'Lahti')
	]);
var author$project$Stations$directionSiuntio = _List_fromArray(
	[
		A2(elm_lang$core$Tuple$pair, 'ILA', 'Ilmala'),
		A2(elm_lang$core$Tuple$pair, 'HPL', 'Huopalahti'),
		A2(elm_lang$core$Tuple$pair, 'VMO', 'Valimo'),
		A2(elm_lang$core$Tuple$pair, 'PJM', 'Pitäjänmäki'),
		A2(elm_lang$core$Tuple$pair, 'MÄK', 'Mäkkylä'),
		A2(elm_lang$core$Tuple$pair, 'LPV', 'Leppävaara'),
		A2(elm_lang$core$Tuple$pair, 'KIL', 'Kilo'),
		A2(elm_lang$core$Tuple$pair, 'KEA', 'Kera'),
		A2(elm_lang$core$Tuple$pair, 'KNI', 'Kauniainen'),
		A2(elm_lang$core$Tuple$pair, 'KVH', 'Koivuhovi'),
		A2(elm_lang$core$Tuple$pair, 'TRL', 'Tuomarila'),
		A2(elm_lang$core$Tuple$pair, 'EPO', 'Espoo'),
		A2(elm_lang$core$Tuple$pair, 'KLH', 'Kauklahti'),
		A2(elm_lang$core$Tuple$pair, 'MAS', 'Masala'),
		A2(elm_lang$core$Tuple$pair, 'JRS', 'Jorvas'),
		A2(elm_lang$core$Tuple$pair, 'TOL', 'Tolsa'),
		A2(elm_lang$core$Tuple$pair, 'KKN', 'Kirkkonummi'),
		A2(elm_lang$core$Tuple$pair, 'STI', 'Siuntio')
	]);
var author$project$Stations$directionTampere = _List_fromArray(
	[
		A2(elm_lang$core$Tuple$pair, 'KÄP', 'Käpylä'),
		A2(elm_lang$core$Tuple$pair, 'OLK', 'Oulunkylä'),
		A2(elm_lang$core$Tuple$pair, 'PMK', 'Pukinmäki'),
		A2(elm_lang$core$Tuple$pair, 'ML', 'Malmi'),
		A2(elm_lang$core$Tuple$pair, 'TNA', 'Tapanila'),
		A2(elm_lang$core$Tuple$pair, 'PLA', 'Puistola'),
		A2(elm_lang$core$Tuple$pair, 'TKL', 'Tikkurila'),
		A2(elm_lang$core$Tuple$pair, 'HKH', 'Hiekkaharju'),
		A2(elm_lang$core$Tuple$pair, 'KVY', 'Koivukylä'),
		A2(elm_lang$core$Tuple$pair, 'RKL', 'Rekola'),
		A2(elm_lang$core$Tuple$pair, 'KRS', 'Korso'),
		A2(elm_lang$core$Tuple$pair, 'SAV', 'Savio'),
		A2(elm_lang$core$Tuple$pair, 'KE', 'Kerava'),
		A2(elm_lang$core$Tuple$pair, 'AIN', 'Ainola'),
		A2(elm_lang$core$Tuple$pair, 'JP', 'Järvenpää'),
		A2(elm_lang$core$Tuple$pair, 'SAU', 'Saunakallio'),
		A2(elm_lang$core$Tuple$pair, 'JK', 'Jokela'),
		A2(elm_lang$core$Tuple$pair, 'HY', 'Hyvinkää'),
		A2(elm_lang$core$Tuple$pair, 'RI', 'Riihimäki'),
		A2(elm_lang$core$Tuple$pair, 'RY', 'Ryttylä'),
		A2(elm_lang$core$Tuple$pair, 'TU', 'Turenki'),
		A2(elm_lang$core$Tuple$pair, 'HL', 'Hämeenlinna'),
		A2(elm_lang$core$Tuple$pair, 'PRL', 'Parola'),
		A2(elm_lang$core$Tuple$pair, 'ITA', 'Iittala'),
		A2(elm_lang$core$Tuple$pair, 'TL', 'Toijala'),
		A2(elm_lang$core$Tuple$pair, 'VIA', 'Viiala'),
		A2(elm_lang$core$Tuple$pair, 'LPÄ', 'Lempäälä'),
		A2(elm_lang$core$Tuple$pair, 'TPE', 'Tampere')
	]);
var author$project$Stations$ringTrackCW = _List_fromArray(
	[
		A2(elm_lang$core$Tuple$pair, 'ILA', 'Ilmala'),
		A2(elm_lang$core$Tuple$pair, 'HPL', 'Huopalahti'),
		A2(elm_lang$core$Tuple$pair, 'POH', 'Pohjois-Haaga'),
		A2(elm_lang$core$Tuple$pair, 'KAN', 'Kannelmäki'),
		A2(elm_lang$core$Tuple$pair, 'MLO', 'Malminkartano'),
		A2(elm_lang$core$Tuple$pair, 'MYR', 'Myyrmäki'),
		A2(elm_lang$core$Tuple$pair, 'LOH', 'Louhela'),
		A2(elm_lang$core$Tuple$pair, 'MRL', 'Martinlaakso'),
		A2(elm_lang$core$Tuple$pair, 'VKS', 'Vantaankoski'),
		A2(elm_lang$core$Tuple$pair, 'VEH', 'Vehkala'),
		A2(elm_lang$core$Tuple$pair, 'KTÖ', 'Kivistö'),
		A2(elm_lang$core$Tuple$pair, 'AVP', 'Aviapolis'),
		A2(elm_lang$core$Tuple$pair, 'LEN', 'Lentoasema (Airport)'),
		A2(elm_lang$core$Tuple$pair, 'LNÄ', 'Leinelä'),
		A2(elm_lang$core$Tuple$pair, 'HKH', 'Hiekkaharju'),
		A2(elm_lang$core$Tuple$pair, 'TKL', 'Tikkurila'),
		A2(elm_lang$core$Tuple$pair, 'PLA', 'Puistola'),
		A2(elm_lang$core$Tuple$pair, 'TNA', 'Tapanila'),
		A2(elm_lang$core$Tuple$pair, 'ML', 'Malmi'),
		A2(elm_lang$core$Tuple$pair, 'PMK', 'Pukinmäki'),
		A2(elm_lang$core$Tuple$pair, 'OLK', 'Oulunkylä'),
		A2(elm_lang$core$Tuple$pair, 'KÄP', 'Käpylä')
	]);
var author$project$Stations$commuterStations = _List_fromArray(
	[
		_Utils_ap(author$project$Stations$common, author$project$Stations$directionSiuntio),
		_Utils_ap(author$project$Stations$common, author$project$Stations$ringTrackCW),
		_Utils_ap(author$project$Stations$common, author$project$Stations$directionTampere),
		_Utils_ap(author$project$Stations$common, author$project$Stations$directionLahti)
	]);
var author$project$Stations$all = elm_lang$core$Dict$toList(
	elm_lang$core$Dict$fromList(
		elm_lang$core$List$concat(author$project$Stations$commuterStations)));
var author$project$View$depDestLink = mdgriffith$stylish_elephants$Element$link(
	_List_fromArray(
		[
			mdgriffith$stylish_elephants$Element$Font$color(author$project$View$colors.purple)
		]));
var author$project$View$selectDepView = function (model) {
	return A2(
		mdgriffith$stylish_elephants$Element$column,
		_List_fromArray(
			[
				mdgriffith$stylish_elephants$Element$centerX,
				mdgriffith$stylish_elephants$Element$spacing(
				elm_lang$core$Basics$round(
					author$project$View$rem(1)))
			]),
		_List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$el,
				author$project$View$headingStyles,
				mdgriffith$stylish_elephants$Element$text('Select departure')),
				A2(
				mdgriffith$stylish_elephants$Element$column,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$spacing(
						elm_lang$core$Basics$round(
							author$project$View$rem(0.5)))
					]),
				A2(
					elm_lang$core$List$map,
					function (_n0) {
						var abbr = _n0.a;
						var name = _n0.b;
						return author$project$View$depDestLink(
							{
								label: mdgriffith$stylish_elephants$Element$text(name),
								url: '#' + abbr
							});
					},
					author$project$Stations$all))
			]));
};
var author$project$Stations$findName = function (abbreviation) {
	return A2(
		elm_lang$core$Dict$get,
		abbreviation,
		elm_lang$core$Dict$fromList(
			elm_lang$core$List$concat(author$project$Stations$commuterStations)));
};
var elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			elm_lang$core$Dict$update,
			key,
			elm_lang$core$Basics$always(elm_lang$core$Maybe$Nothing),
			dict);
	});
var author$project$Stations$matching = function (abbreviation) {
	return elm_lang$core$Dict$toList(
		A2(
			elm_lang$core$Dict$remove,
			abbreviation,
			elm_lang$core$Dict$fromList(
				elm_lang$core$List$concat(
					A2(
						elm_lang$core$List$filter,
						function (track) {
							return A2(
								elm_lang$core$Maybe$withDefault,
								false,
								A2(
									elm_lang$core$Maybe$map,
									function (_n1) {
										return true;
									},
									elm_lang$core$List$head(
										A2(
											elm_lang$core$List$filter,
											function (_n0) {
												var abbr = _n0.a;
												var name = _n0.b;
												return _Utils_eq(abbreviation, abbr);
											},
											track))));
						},
						author$project$Stations$commuterStations)))));
};
var author$project$View$selectDestView = F2(
	function (model, dep) {
		var url = function (dest) {
			return '#' + (dep + ('/' + dest));
		};
		var linkText = function (dest) {
			return A2(
				elm_lang$core$Maybe$withDefault,
				dest,
				A2(
					elm_lang$core$Maybe$map,
					function (name) {
						return name + ('–' + dest);
					},
					author$project$Stations$findName(dep)));
		};
		return A2(
			mdgriffith$stylish_elephants$Element$column,
			_List_fromArray(
				[
					mdgriffith$stylish_elephants$Element$centerX,
					mdgriffith$stylish_elephants$Element$spacing(
					elm_lang$core$Basics$round(
						author$project$View$rem(1)))
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$stylish_elephants$Element$el,
					author$project$View$headingStyles,
					mdgriffith$stylish_elephants$Element$text('Select destination')),
					A2(
					mdgriffith$stylish_elephants$Element$column,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$spacing(
							elm_lang$core$Basics$round(
								author$project$View$rem(1)))
						]),
					A2(
						elm_lang$core$List$map,
						function (_n0) {
							var abbr = _n0.a;
							var name = _n0.b;
							return author$project$View$depDestLink(
								{
									label: mdgriffith$stylish_elephants$Element$text(
										linkText(name)),
									url: url(abbr)
								});
						},
						author$project$Stations$matching(dep)))
				]));
	});
var mdgriffith$stylish_elephants$Internal$Model$OnlyDynamic = function (a) {
	return {$: 'OnlyDynamic', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$StaticRootAndDynamic = function (a) {
	return {$: 'StaticRootAndDynamic', a: a};
};
var mdgriffith$stylish_elephants$Internal$Model$AllowHover = {$: 'AllowHover'};
var mdgriffith$stylish_elephants$Internal$Model$Layout = {$: 'Layout'};
var mdgriffith$stylish_elephants$Internal$Model$focusDefaultStyle = {
	backgroundColor: elm_lang$core$Maybe$Nothing,
	borderColor: elm_lang$core$Maybe$Nothing,
	shadow: elm_lang$core$Maybe$Just(
		{
			blur: 3,
			color: A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			offset: _Utils_Tuple2(0, 0),
			size: 3
		})
};
var mdgriffith$stylish_elephants$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 'HoverOption':
					var hoverable = opt.a;
					var _n4 = record.hover;
					if (_n4.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								hover: elm_lang$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 'FocusStyleOption':
					var focusStyle = opt.a;
					var _n5 = record.focus;
					if (_n5.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								focus: elm_lang$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _n6 = record.mode;
					if (_n6.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								mode: elm_lang$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			focus: function () {
				var _n0 = record.focus;
				if (_n0.$ === 'Nothing') {
					return mdgriffith$stylish_elephants$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _n0.a;
					return focusable;
				}
			}(),
			hover: function () {
				var _n1 = record.hover;
				if (_n1.$ === 'Nothing') {
					return mdgriffith$stylish_elephants$Internal$Model$AllowHover;
				} else {
					var hoverable = _n1.a;
					return hoverable;
				}
			}(),
			mode: function () {
				var _n2 = record.mode;
				if (_n2.$ === 'Nothing') {
					return mdgriffith$stylish_elephants$Internal$Model$Layout;
				} else {
					var actualMode = _n2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			elm_lang$core$List$foldr,
			combine,
			{focus: elm_lang$core$Maybe$Nothing, hover: elm_lang$core$Maybe$Nothing, mode: elm_lang$core$Maybe$Nothing},
			options));
};
var mdgriffith$stylish_elephants$Internal$Model$toHtml = F2(
	function (options, el) {
		switch (el.$) {
			case 'Unstyled':
				var html = el.a;
				return html(mdgriffith$stylish_elephants$Internal$Model$asEl);
			case 'Styled':
				var styles = el.a.styles;
				var html = el.a.html;
				var styleSheet = A2(
					mdgriffith$stylish_elephants$Internal$Model$toStyleSheetString,
					options,
					A3(
						elm_lang$core$List$foldl,
						mdgriffith$stylish_elephants$Internal$Model$reduceStyles,
						_Utils_Tuple2(
							elm_lang$core$Set$empty,
							_List_fromArray(
								[
									mdgriffith$stylish_elephants$Internal$Model$renderFocusStyle(options.focus)
								])),
						styles).b);
				return A2(
					html,
					elm_lang$core$Maybe$Just(styleSheet),
					mdgriffith$stylish_elephants$Internal$Model$asEl);
			case 'Text':
				var text = el.a;
				return mdgriffith$stylish_elephants$Internal$Model$textElement(text);
			default:
				return mdgriffith$stylish_elephants$Internal$Model$textElement('');
		}
	});
var mdgriffith$stylish_elephants$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = mdgriffith$stylish_elephants$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _n0 = options.mode;
			if (_n0.$ === 'NoStaticStyleSheet') {
				return mdgriffith$stylish_elephants$Internal$Model$OnlyDynamic(options);
			} else {
				return mdgriffith$stylish_elephants$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			mdgriffith$stylish_elephants$Internal$Model$toHtml,
			options,
			A5(
				mdgriffith$stylish_elephants$Internal$Model$element,
				embedStyle,
				mdgriffith$stylish_elephants$Internal$Model$asEl,
				elm_lang$core$Maybe$Nothing,
				attributes,
				mdgriffith$stylish_elephants$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var mdgriffith$stylish_elephants$Internal$Flag$fontFamily = mdgriffith$stylish_elephants$Internal$Flag$col(5);
var mdgriffith$stylish_elephants$Internal$Model$SansSerif = {$: 'SansSerif'};
var mdgriffith$stylish_elephants$Internal$Model$Typeface = function (a) {
	return {$: 'Typeface', a: a};
};
var elm_lang$core$String$toLower = _String_toLower;
var elm_lang$core$String$words = _String_words;
var mdgriffith$stylish_elephants$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 'Serif':
						return 'serif';
					case 'SansSerif':
						return 'sans-serif';
					case 'Monospace':
						return 'monospace';
					case 'Typeface':
						var name = font.a;
						return A2(
							elm_lang$core$String$join,
							'-',
							elm_lang$core$String$words(
								elm_lang$core$String$toLower(name)));
					default:
						var name = font.a;
						var url = font.b;
						return A2(
							elm_lang$core$String$join,
							'-',
							elm_lang$core$String$words(
								elm_lang$core$String$toLower(name)));
				}
			}());
	});
var mdgriffith$stylish_elephants$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			mdgriffith$stylish_elephants$Internal$Model$Typeface('Open Sans'),
			mdgriffith$stylish_elephants$Internal$Model$Typeface('Helvetica'),
			mdgriffith$stylish_elephants$Internal$Model$Typeface('Verdana'),
			mdgriffith$stylish_elephants$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$bgColor,
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Colored,
				'bg-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(
					A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 1, 1, 1, 1)),
				'background-color',
				A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 1, 1, 1, 1))),
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$fontColor,
			A3(
				mdgriffith$stylish_elephants$Internal$Model$Colored,
				'font-color-' + mdgriffith$stylish_elephants$Internal$Model$formatColorClass(
					A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4(mdgriffith$stylish_elephants$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$fontSize,
			A3(mdgriffith$stylish_elephants$Internal$Model$Single, 'font-size-20', 'font-size', '20px')),
			A2(
			mdgriffith$stylish_elephants$Internal$Model$StyleClass,
			mdgriffith$stylish_elephants$Internal$Flag$fontFamily,
			A2(
				mdgriffith$stylish_elephants$Internal$Model$FontFamily,
				A3(elm_lang$core$List$foldl, mdgriffith$stylish_elephants$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var mdgriffith$stylish_elephants$Element$layoutWith = F3(
	function (_n0, attrs, child) {
		var options = _n0.options;
		return A3(
			mdgriffith$stylish_elephants$Internal$Model$renderRoot,
			options,
			A2(
				elm_lang$core$List$cons,
				mdgriffith$stylish_elephants$Internal$Model$htmlClass(
					A2(
						elm_lang$core$String$join,
						' ',
						_List_fromArray(
							[mdgriffith$stylish_elephants$Internal$Style$classes.root, mdgriffith$stylish_elephants$Internal$Style$classes.any, mdgriffith$stylish_elephants$Internal$Style$classes.single, mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterX, mdgriffith$stylish_elephants$Internal$Style$classes.contentCenterY]))),
				_Utils_ap(mdgriffith$stylish_elephants$Internal$Model$rootStyle, attrs)),
			child);
	});
var mdgriffith$stylish_elephants$Element$layout = mdgriffith$stylish_elephants$Element$layoutWith(
	{options: _List_Nil});
var mdgriffith$stylish_elephants$Internal$Model$Max = F2(
	function (a, b) {
		return {$: 'Max', a: a, b: b};
	});
var mdgriffith$stylish_elephants$Element$maximum = F2(
	function (i, l) {
		return A2(mdgriffith$stylish_elephants$Internal$Model$Max, i, l);
	});
var mdgriffith$stylish_elephants$Element$padding = function (x) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$padding,
		A4(mdgriffith$stylish_elephants$Internal$Model$PaddingStyle, x, x, x, x));
};
var mdgriffith$stylish_elephants$Element$Font$family = function (families) {
	return A2(
		mdgriffith$stylish_elephants$Internal$Model$StyleClass,
		mdgriffith$stylish_elephants$Internal$Flag$fontFamily,
		A2(
			mdgriffith$stylish_elephants$Internal$Model$FontFamily,
			A3(elm_lang$core$List$foldl, mdgriffith$stylish_elephants$Internal$Model$renderFontClassName, 'ff-', families),
			families));
};
var mdgriffith$stylish_elephants$Element$Font$sansSerif = mdgriffith$stylish_elephants$Internal$Model$SansSerif;
var mdgriffith$stylish_elephants$Element$Font$typeface = mdgriffith$stylish_elephants$Internal$Model$Typeface;
var author$project$View$view = function (model) {
	return {
		body: _List_fromArray(
			[
				A2(
				mdgriffith$stylish_elephants$Element$layout,
				_List_fromArray(
					[
						mdgriffith$stylish_elephants$Element$Background$color(author$project$View$colors.lightGray),
						mdgriffith$stylish_elephants$Element$Font$family(
						_List_fromArray(
							[
								mdgriffith$stylish_elephants$Element$Font$typeface('Roboto'),
								mdgriffith$stylish_elephants$Element$Font$sansSerif
							])),
						mdgriffith$stylish_elephants$Element$Font$size(
						elm_lang$core$Basics$round(
							author$project$View$ts(0)))
					]),
				A2(
					mdgriffith$stylish_elephants$Element$column,
					_List_fromArray(
						[
							mdgriffith$stylish_elephants$Element$centerX,
							mdgriffith$stylish_elephants$Element$spacing(
							elm_lang$core$Basics$round(
								author$project$View$rem(2))),
							mdgriffith$stylish_elephants$Element$padding(
							elm_lang$core$Basics$round(
								author$project$View$rem(2))),
							mdgriffith$stylish_elephants$Element$width(
							A2(
								mdgriffith$stylish_elephants$Element$maximum,
								elm_lang$core$Basics$round(
									author$project$View$rem(30)),
								mdgriffith$stylish_elephants$Element$fill))
						]),
					_List_fromArray(
						[
							function () {
							var _n0 = model.route;
							switch (_n0.$) {
								case 'SelectDepRoute':
									return author$project$View$selectDepView(model);
								case 'SelectDestRoute':
									var dep = _n0.a;
									return A2(author$project$View$selectDestView, model, dep);
								default:
									var from = _n0.a;
									var to = _n0.b;
									return A2(
										author$project$View$scheduleView,
										model,
										_Utils_Tuple2(from, to));
							}
						}()
						])))
			]),
		title: 'Schedules! Helsinki region commuter trains'
	};
};
var elm_lang$browser$Browser$Env = F2(
	function (flags, url) {
		return {flags: flags, url: url};
	});
var elm_lang$browser$Browser$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm_lang$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm_lang$core$String$slice,
			n,
			elm_lang$core$String$length(string),
			string);
	});
var elm_lang$core$String$startsWith = _String_startsWith;
var elm_lang$url$Url$Parser$Http = {$: 'Http'};
var elm_lang$url$Url$Parser$Https = {$: 'Https'};
var elm_lang$core$String$indexes = _String_indexes;
var elm_lang$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm_lang$core$String$slice, 0, n, string);
	});
var elm_lang$core$String$contains = _String_contains;
var elm_lang$url$Url$Parser$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm_lang$url$Url$Parser$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm_lang$core$String$isEmpty(str) || A2(elm_lang$core$String$contains, '@', str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm_lang$core$Maybe$Just(
					A6(elm_lang$url$Url$Parser$Url, protocol, str, elm_lang$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm_lang$core$String$toInt(
						A2(elm_lang$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm_lang$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm_lang$core$Maybe$Just(
							A6(
								elm_lang$url$Url$Parser$Url,
								protocol,
								A2(elm_lang$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm_lang$core$Maybe$Nothing;
				}
			}
		}
	});
var elm_lang$url$Url$Parser$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm_lang$core$String$isEmpty(str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm_lang$url$Url$Parser$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm_lang$url$Url$Parser$chompBeforePath,
					protocol,
					A2(elm_lang$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm_lang$core$String$left, i, str));
			}
		}
	});
var elm_lang$url$Url$Parser$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm_lang$core$String$isEmpty(str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm_lang$url$Url$Parser$chompBeforeQuery, protocol, elm_lang$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm_lang$url$Url$Parser$chompBeforeQuery,
					protocol,
					elm_lang$core$Maybe$Just(
						A2(elm_lang$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm_lang$core$String$left, i, str));
			}
		}
	});
var elm_lang$url$Url$Parser$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm_lang$core$String$isEmpty(str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm_lang$url$Url$Parser$chompBeforeFragment, protocol, elm_lang$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm_lang$url$Url$Parser$chompBeforeFragment,
					protocol,
					elm_lang$core$Maybe$Just(
						A2(elm_lang$core$String$dropLeft, i + 1, str)),
					A2(elm_lang$core$String$left, i, str));
			}
		}
	});
var elm_lang$url$Url$Parser$toUrl = function (str) {
	return A2(elm_lang$core$String$startsWith, 'http://', str) ? A2(
		elm_lang$url$Url$Parser$chompAfterProtocol,
		elm_lang$url$Url$Parser$Http,
		A2(elm_lang$core$String$dropLeft, 7, str)) : (A2(elm_lang$core$String$startsWith, 'https://', str) ? A2(
		elm_lang$url$Url$Parser$chompAfterProtocol,
		elm_lang$url$Url$Parser$Https,
		A2(elm_lang$core$String$dropLeft, 8, str)) : elm_lang$core$Maybe$Nothing);
};
var elm_lang$browser$Browser$unsafeToUrl = function (string) {
	var _n0 = elm_lang$url$Url$Parser$toUrl(string);
	if (_n0.$ === 'Nothing') {
		return _Browser_invalidUrl(string);
	} else {
		var url = _n0.a;
		return url;
	}
};
var elm_lang$browser$Browser$Navigation$Manager$Listen = function (a) {
	return {$: 'Listen', a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$State = F2(
	function (subs, popWatcher) {
		return {popWatcher: popWatcher, subs: subs};
	});
var elm_lang$browser$Browser$Navigation$Manager$init = elm_lang$core$Task$succeed(
	A2(elm_lang$browser$Browser$Navigation$Manager$State, _List_Nil, elm_lang$core$Maybe$Nothing));
var elm_lang$browser$Browser$Navigation$Manager$go = _Browser_go;
var elm_lang$browser$Browser$Navigation$Manager$ignore = F2(
	function (task, b) {
		return A2(
			elm_lang$core$Task$andThen,
			function (_n0) {
				return elm_lang$core$Task$succeed(b);
			},
			task);
	});
var elm_lang$browser$Browser$Navigation$Manager$notify = F3(
	function (router, subs, url) {
		var send = function (_n0) {
			var tagger = _n0.a;
			return A2(
				elm_lang$core$Platform$sendToApp,
				router,
				tagger(url));
		};
		return A2(
			elm_lang$browser$Browser$Navigation$Manager$ignore,
			elm_lang$core$Task$sequence(
				A2(elm_lang$core$List$map, send, subs)),
			_Utils_Tuple0);
	});
var elm_lang$browser$Browser$Navigation$Manager$pushState = _Browser_pushState;
var elm_lang$browser$Browser$Navigation$Manager$replaceState = _Browser_replaceState;
var elm_lang$browser$Browser$Navigation$Manager$cmdHelp = F3(
	function (router, subs, cmd) {
		switch (cmd.$) {
			case 'Go':
				var n = cmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$go(n);
			case 'Push':
				var url = cmd.a;
				return A2(
					elm_lang$core$Task$andThen,
					A2(elm_lang$browser$Browser$Navigation$Manager$notify, router, subs),
					elm_lang$browser$Browser$Navigation$Manager$pushState(url));
			default:
				var url = cmd.a;
				return A2(
					elm_lang$core$Task$andThen,
					A2(elm_lang$browser$Browser$Navigation$Manager$notify, router, subs),
					elm_lang$browser$Browser$Navigation$Manager$replaceState(url));
		}
	});
var elm_lang$browser$Browser$Navigation$Manager$killPopWatcher = function (popWatcher) {
	if (popWatcher.$ === 'Normal') {
		var pid = popWatcher.a;
		return elm_lang$core$Process$kill(pid);
	} else {
		var pid1 = popWatcher.a;
		var pid2 = popWatcher.b;
		return A2(
			elm_lang$core$Task$andThen,
			function (_n1) {
				return elm_lang$core$Process$kill(pid2);
			},
			elm_lang$core$Process$kill(pid1));
	}
};
var elm_lang$browser$Browser$Navigation$Manager$InternetExplorer = F2(
	function (a, b) {
		return {$: 'InternetExplorer', a: a, b: b};
	});
var elm_lang$browser$Browser$Navigation$Manager$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$reportUrl = F2(
	function (name, router) {
		return A4(
			_Browser_on,
			_Browser_window,
			true,
			name,
			function (_n0) {
				return A2(
					elm_lang$core$Platform$sendToSelf,
					router,
					_Browser_getUrl(_Utils_Tuple0));
			});
	});
var elm_lang$browser$Browser$Navigation$Manager$spawnPopWatcher = function (router) {
	return _Browser_isInternetExplorer11(_Utils_Tuple0) ? A3(
		elm_lang$core$Task$map2,
		elm_lang$browser$Browser$Navigation$Manager$InternetExplorer,
		A2(elm_lang$browser$Browser$Navigation$Manager$reportUrl, 'popstate', router),
		A2(elm_lang$browser$Browser$Navigation$Manager$reportUrl, 'hashchange', router)) : A2(
		elm_lang$core$Task$map,
		elm_lang$browser$Browser$Navigation$Manager$Normal,
		A2(elm_lang$browser$Browser$Navigation$Manager$reportUrl, 'popstate', router));
};
var elm_lang$browser$Browser$Navigation$Manager$onEffects = F4(
	function (router, cmds, subs, _n0) {
		var popWatcher = _n0.popWatcher;
		var stepState = function () {
			var _n2 = _Utils_Tuple2(subs, popWatcher);
			_n2$2:
			while (true) {
				if (!_n2.a.b) {
					if (_n2.b.$ === 'Just') {
						var watcher = _n2.b.a;
						return A2(
							elm_lang$browser$Browser$Navigation$Manager$ignore,
							elm_lang$browser$Browser$Navigation$Manager$killPopWatcher(watcher),
							A2(elm_lang$browser$Browser$Navigation$Manager$State, subs, elm_lang$core$Maybe$Nothing));
					} else {
						break _n2$2;
					}
				} else {
					if (_n2.b.$ === 'Nothing') {
						var _n3 = _n2.a;
						var _n4 = _n2.b;
						return A2(
							elm_lang$core$Task$map,
							function ($) {
								return A2(
									elm_lang$browser$Browser$Navigation$Manager$State,
									subs,
									elm_lang$core$Maybe$Just($));
							},
							elm_lang$browser$Browser$Navigation$Manager$spawnPopWatcher(router));
					} else {
						break _n2$2;
					}
				}
			}
			return elm_lang$core$Task$succeed(
				A2(elm_lang$browser$Browser$Navigation$Manager$State, subs, popWatcher));
		}();
		return A2(
			elm_lang$core$Task$andThen,
			function (_n1) {
				return stepState;
			},
			elm_lang$core$Task$sequence(
				A2(
					elm_lang$core$List$map,
					A2(elm_lang$browser$Browser$Navigation$Manager$cmdHelp, router, subs),
					cmds)));
	});
var elm_lang$browser$Browser$Navigation$Manager$onSelfMsg = F3(
	function (router, url, state) {
		return A2(
			elm_lang$browser$Browser$Navigation$Manager$ignore,
			A3(elm_lang$browser$Browser$Navigation$Manager$notify, router, state.subs, url),
			state);
	});
var elm_lang$browser$Browser$Navigation$Manager$Go = function (a) {
	return {$: 'Go', a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$Push = function (a) {
	return {$: 'Push', a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$Replace = function (a) {
	return {$: 'Replace', a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$cmdMap = F2(
	function (_n0, myCmd) {
		switch (myCmd.$) {
			case 'Go':
				var n = myCmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$Go(n);
			case 'Push':
				var url = myCmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$Push(url);
			default:
				var url = myCmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$Replace(url);
		}
	});
var elm_lang$browser$Browser$Navigation$Manager$subMap = F2(
	function (func, _n0) {
		var tagger = _n0.a;
		return elm_lang$browser$Browser$Navigation$Manager$Listen(
			function ($) {
				return func(
					tagger($));
			});
	});
_Platform_effectManagers['Browser.Navigation.Manager'] = _Platform_createManager(elm_lang$browser$Browser$Navigation$Manager$init, elm_lang$browser$Browser$Navigation$Manager$onEffects, elm_lang$browser$Browser$Navigation$Manager$onSelfMsg, elm_lang$browser$Browser$Navigation$Manager$cmdMap, elm_lang$browser$Browser$Navigation$Manager$subMap);
var elm_lang$browser$Browser$Navigation$Manager$command = _Platform_leaf('Browser.Navigation.Manager');
var elm_lang$browser$Browser$Navigation$Manager$subscription = _Platform_leaf('Browser.Navigation.Manager');
var elm_lang$core$Platform$Sub$batch = _Platform_batch;
var elm_lang$browser$Browser$Navigation$Manager$addListen = F3(
	function (toMsg, toSubs, model) {
		return elm_lang$core$Platform$Sub$batch(
			_List_fromArray(
				[
					elm_lang$browser$Browser$Navigation$Manager$subscription(
					elm_lang$browser$Browser$Navigation$Manager$Listen(toMsg)),
					toSubs(model)
				]));
	});
var elm_lang$browser$Browser$fullscreen = function (impl) {
	return _Browser_fullscreen(
		{
			init: function (_n0) {
				var flags = _n0.flags;
				var url = _n0.url;
				return impl.init(
					A2(
						elm_lang$browser$Browser$Env,
						flags,
						elm_lang$browser$Browser$unsafeToUrl(url)));
			},
			subscriptions: function () {
				var _n1 = impl.onNavigation;
				if (_n1.$ === 'Nothing') {
					return impl.subscriptions;
				} else {
					var toMsg = _n1.a;
					return A2(
						elm_lang$browser$Browser$Navigation$Manager$addListen,
						function ($) {
							return toMsg(
								elm_lang$browser$Browser$unsafeToUrl($));
						},
						impl.subscriptions);
				}
			}(),
			update: impl.update,
			view: impl.view
		});
};
var author$project$Main$main = elm_lang$browser$Browser$fullscreen(
	{
		init: author$project$Main$init,
		onNavigation: elm_lang$core$Maybe$Just(author$project$View$UrlChange),
		subscriptions: author$project$Main$subscriptions,
		update: author$project$Main$update,
		view: author$project$View$view
	});
_Platform_export({'Main':author$project$Main$main(elm_lang$json$Json$Decode$int)(0)({})});}(this));