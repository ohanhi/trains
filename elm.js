
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
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


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
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


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
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
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
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
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
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
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

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

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode = _elm_lang$core$Json_Decode$succeed;
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$resolve = _elm_lang$core$Json_Decode$andThen(_elm_lang$core$Basics$identity);
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom = _elm_lang$core$Json_Decode$map2(
	F2(
		function (x, y) {
			return y(x);
		}));
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$hardcoded = function (_p0) {
	return _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom(
		_elm_lang$core$Json_Decode$succeed(_p0));
};
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return _elm_lang$core$Json_Decode$oneOf(
				{
					ctor: '::',
					_0: decoder,
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Json_Decode$null(fallback),
						_1: {ctor: '[]'}
					}
				});
		};
		var handleResult = function (input) {
			var _p1 = A2(_elm_lang$core$Json_Decode$decodeValue, pathDecoder, input);
			if (_p1.ctor === 'Ok') {
				var _p2 = A2(
					_elm_lang$core$Json_Decode$decodeValue,
					nullOr(valDecoder),
					_p1._0);
				if (_p2.ctor === 'Ok') {
					return _elm_lang$core$Json_Decode$succeed(_p2._0);
				} else {
					return _elm_lang$core$Json_Decode$fail(_p2._0);
				}
			} else {
				return _elm_lang$core$Json_Decode$succeed(fallback);
			}
		};
		return A2(_elm_lang$core$Json_Decode$andThen, handleResult, _elm_lang$core$Json_Decode$value);
	});
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optionalAt = F4(
	function (path, valDecoder, fallback, decoder) {
		return A2(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optionalDecoder,
				A2(_elm_lang$core$Json_Decode$at, path, _elm_lang$core$Json_Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom,
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optionalDecoder,
				A2(_elm_lang$core$Json_Decode$field, key, _elm_lang$core$Json_Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$requiredAt = F3(
	function (path, valDecoder, decoder) {
		return A2(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom,
			A2(_elm_lang$core$Json_Decode$at, path, valDecoder),
			decoder);
	});
var _NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$custom,
			A2(_elm_lang$core$Json_Decode$field, key, valDecoder),
			decoder);
	});

var _elm_lang$core$Native_Bitwise = function() {

return {
	and: F2(function and(a, b) { return a & b; }),
	or: F2(function or(a, b) { return a | b; }),
	xor: F2(function xor(a, b) { return a ^ b; }),
	complement: function complement(a) { return ~a; },
	shiftLeftBy: F2(function(offset, a) { return a << offset; }),
	shiftRightBy: F2(function(offset, a) { return a >> offset; }),
	shiftRightZfBy: F2(function(offset, a) { return a >>> offset; })
};

}();

var _elm_lang$core$Bitwise$shiftRightZfBy = _elm_lang$core$Native_Bitwise.shiftRightZfBy;
var _elm_lang$core$Bitwise$shiftRightBy = _elm_lang$core$Native_Bitwise.shiftRightBy;
var _elm_lang$core$Bitwise$shiftLeftBy = _elm_lang$core$Native_Bitwise.shiftLeftBy;
var _elm_lang$core$Bitwise$complement = _elm_lang$core$Native_Bitwise.complement;
var _elm_lang$core$Bitwise$xor = _elm_lang$core$Native_Bitwise.xor;
var _elm_lang$core$Bitwise$or = _elm_lang$core$Native_Bitwise.or;
var _elm_lang$core$Bitwise$and = _elm_lang$core$Native_Bitwise.and;

var _Skinney$murmur3$Murmur3$mur = F2(
	function (c, h) {
		return 4294967295 & (((h & 65535) * c) + ((65535 & ((h >>> 16) * c)) << 16));
	});
var _Skinney$murmur3$Murmur3$step = function (acc) {
	var h1 = A2(_Skinney$murmur3$Murmur3$mur, 5, (acc >>> 19) | (acc << 13));
	return ((h1 & 65535) + 27492) + ((65535 & ((h1 >>> 16) + 58964)) << 16);
};
var _Skinney$murmur3$Murmur3$mix = F2(
	function (h1, h2) {
		var k1 = A2(_Skinney$murmur3$Murmur3$mur, 3432918353, h2);
		return h1 ^ A2(_Skinney$murmur3$Murmur3$mur, 461845907, (k1 >>> 17) | (k1 << 15));
	});
var _Skinney$murmur3$Murmur3$finalize = F2(
	function (strLength, _p0) {
		var _p1 = _p0;
		var _p3 = _p1._1;
		var _p2 = _p1._2;
		var acc = (!_elm_lang$core$Native_Utils.eq(_p2, 0)) ? A2(_Skinney$murmur3$Murmur3$mix, _p3, _p2) : _p3;
		var h1 = acc ^ strLength;
		var h2 = A2(_Skinney$murmur3$Murmur3$mur, 2246822507, h1 ^ (h1 >>> 16));
		var h3 = A2(_Skinney$murmur3$Murmur3$mur, 3266489909, h2 ^ (h2 >>> 13));
		return (h3 ^ (h3 >>> 16)) >>> 0;
	});
var _Skinney$murmur3$Murmur3$hashFold = F2(
	function (c, _p4) {
		var _p5 = _p4;
		var _p7 = _p5._0;
		var _p6 = _p5._1;
		var res = _p5._2 | ((255 & _elm_lang$core$Char$toCode(c)) << _p7);
		if (_elm_lang$core$Native_Utils.cmp(_p7, 24) > -1) {
			var newHash = _Skinney$murmur3$Murmur3$step(
				A2(_Skinney$murmur3$Murmur3$mix, _p6, res));
			return {ctor: '_Tuple3', _0: 0, _1: newHash, _2: 0};
		} else {
			return {ctor: '_Tuple3', _0: _p7 + 8, _1: _p6, _2: res};
		}
	});
var _Skinney$murmur3$Murmur3$hashString = F2(
	function (seed, str) {
		return A2(
			_Skinney$murmur3$Murmur3$finalize,
			_elm_lang$core$String$length(str),
			A3(
				_elm_lang$core$String$foldl,
				_Skinney$murmur3$Murmur3$hashFold,
				{ctor: '_Tuple3', _0: 0, _1: seed, _2: 0},
				str));
	});

var _elm_lang$core$Color$fmod = F2(
	function (f, n) {
		var integer = _elm_lang$core$Basics$floor(f);
		return (_elm_lang$core$Basics$toFloat(
			A2(_elm_lang$core$Basics_ops['%'], integer, n)) + f) - _elm_lang$core$Basics$toFloat(integer);
	});
var _elm_lang$core$Color$rgbToHsl = F3(
	function (red, green, blue) {
		var b = _elm_lang$core$Basics$toFloat(blue) / 255;
		var g = _elm_lang$core$Basics$toFloat(green) / 255;
		var r = _elm_lang$core$Basics$toFloat(red) / 255;
		var cMax = A2(
			_elm_lang$core$Basics$max,
			A2(_elm_lang$core$Basics$max, r, g),
			b);
		var cMin = A2(
			_elm_lang$core$Basics$min,
			A2(_elm_lang$core$Basics$min, r, g),
			b);
		var c = cMax - cMin;
		var lightness = (cMax + cMin) / 2;
		var saturation = _elm_lang$core$Native_Utils.eq(lightness, 0) ? 0 : (c / (1 - _elm_lang$core$Basics$abs((2 * lightness) - 1)));
		var hue = _elm_lang$core$Basics$degrees(60) * (_elm_lang$core$Native_Utils.eq(cMax, r) ? A2(_elm_lang$core$Color$fmod, (g - b) / c, 6) : (_elm_lang$core$Native_Utils.eq(cMax, g) ? (((b - r) / c) + 2) : (((r - g) / c) + 4)));
		return {ctor: '_Tuple3', _0: hue, _1: saturation, _2: lightness};
	});
var _elm_lang$core$Color$hslToRgb = F3(
	function (hue, saturation, lightness) {
		var normHue = hue / _elm_lang$core$Basics$degrees(60);
		var chroma = (1 - _elm_lang$core$Basics$abs((2 * lightness) - 1)) * saturation;
		var x = chroma * (1 - _elm_lang$core$Basics$abs(
			A2(_elm_lang$core$Color$fmod, normHue, 2) - 1));
		var _p0 = (_elm_lang$core$Native_Utils.cmp(normHue, 0) < 0) ? {ctor: '_Tuple3', _0: 0, _1: 0, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 1) < 0) ? {ctor: '_Tuple3', _0: chroma, _1: x, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 2) < 0) ? {ctor: '_Tuple3', _0: x, _1: chroma, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 3) < 0) ? {ctor: '_Tuple3', _0: 0, _1: chroma, _2: x} : ((_elm_lang$core$Native_Utils.cmp(normHue, 4) < 0) ? {ctor: '_Tuple3', _0: 0, _1: x, _2: chroma} : ((_elm_lang$core$Native_Utils.cmp(normHue, 5) < 0) ? {ctor: '_Tuple3', _0: x, _1: 0, _2: chroma} : ((_elm_lang$core$Native_Utils.cmp(normHue, 6) < 0) ? {ctor: '_Tuple3', _0: chroma, _1: 0, _2: x} : {ctor: '_Tuple3', _0: 0, _1: 0, _2: 0}))))));
		var r = _p0._0;
		var g = _p0._1;
		var b = _p0._2;
		var m = lightness - (chroma / 2);
		return {ctor: '_Tuple3', _0: r + m, _1: g + m, _2: b + m};
	});
var _elm_lang$core$Color$toRgb = function (color) {
	var _p1 = color;
	if (_p1.ctor === 'RGBA') {
		return {red: _p1._0, green: _p1._1, blue: _p1._2, alpha: _p1._3};
	} else {
		var _p2 = A3(_elm_lang$core$Color$hslToRgb, _p1._0, _p1._1, _p1._2);
		var r = _p2._0;
		var g = _p2._1;
		var b = _p2._2;
		return {
			red: _elm_lang$core$Basics$round(255 * r),
			green: _elm_lang$core$Basics$round(255 * g),
			blue: _elm_lang$core$Basics$round(255 * b),
			alpha: _p1._3
		};
	}
};
var _elm_lang$core$Color$toHsl = function (color) {
	var _p3 = color;
	if (_p3.ctor === 'HSLA') {
		return {hue: _p3._0, saturation: _p3._1, lightness: _p3._2, alpha: _p3._3};
	} else {
		var _p4 = A3(_elm_lang$core$Color$rgbToHsl, _p3._0, _p3._1, _p3._2);
		var h = _p4._0;
		var s = _p4._1;
		var l = _p4._2;
		return {hue: h, saturation: s, lightness: l, alpha: _p3._3};
	}
};
var _elm_lang$core$Color$HSLA = F4(
	function (a, b, c, d) {
		return {ctor: 'HSLA', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_lang$core$Color$hsla = F4(
	function (hue, saturation, lightness, alpha) {
		return A4(
			_elm_lang$core$Color$HSLA,
			hue - _elm_lang$core$Basics$turns(
				_elm_lang$core$Basics$toFloat(
					_elm_lang$core$Basics$floor(hue / (2 * _elm_lang$core$Basics$pi)))),
			saturation,
			lightness,
			alpha);
	});
var _elm_lang$core$Color$hsl = F3(
	function (hue, saturation, lightness) {
		return A4(_elm_lang$core$Color$hsla, hue, saturation, lightness, 1);
	});
var _elm_lang$core$Color$complement = function (color) {
	var _p5 = color;
	if (_p5.ctor === 'HSLA') {
		return A4(
			_elm_lang$core$Color$hsla,
			_p5._0 + _elm_lang$core$Basics$degrees(180),
			_p5._1,
			_p5._2,
			_p5._3);
	} else {
		var _p6 = A3(_elm_lang$core$Color$rgbToHsl, _p5._0, _p5._1, _p5._2);
		var h = _p6._0;
		var s = _p6._1;
		var l = _p6._2;
		return A4(
			_elm_lang$core$Color$hsla,
			h + _elm_lang$core$Basics$degrees(180),
			s,
			l,
			_p5._3);
	}
};
var _elm_lang$core$Color$grayscale = function (p) {
	return A4(_elm_lang$core$Color$HSLA, 0, 0, 1 - p, 1);
};
var _elm_lang$core$Color$greyscale = function (p) {
	return A4(_elm_lang$core$Color$HSLA, 0, 0, 1 - p, 1);
};
var _elm_lang$core$Color$RGBA = F4(
	function (a, b, c, d) {
		return {ctor: 'RGBA', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_lang$core$Color$rgba = _elm_lang$core$Color$RGBA;
var _elm_lang$core$Color$rgb = F3(
	function (r, g, b) {
		return A4(_elm_lang$core$Color$RGBA, r, g, b, 1);
	});
var _elm_lang$core$Color$lightRed = A4(_elm_lang$core$Color$RGBA, 239, 41, 41, 1);
var _elm_lang$core$Color$red = A4(_elm_lang$core$Color$RGBA, 204, 0, 0, 1);
var _elm_lang$core$Color$darkRed = A4(_elm_lang$core$Color$RGBA, 164, 0, 0, 1);
var _elm_lang$core$Color$lightOrange = A4(_elm_lang$core$Color$RGBA, 252, 175, 62, 1);
var _elm_lang$core$Color$orange = A4(_elm_lang$core$Color$RGBA, 245, 121, 0, 1);
var _elm_lang$core$Color$darkOrange = A4(_elm_lang$core$Color$RGBA, 206, 92, 0, 1);
var _elm_lang$core$Color$lightYellow = A4(_elm_lang$core$Color$RGBA, 255, 233, 79, 1);
var _elm_lang$core$Color$yellow = A4(_elm_lang$core$Color$RGBA, 237, 212, 0, 1);
var _elm_lang$core$Color$darkYellow = A4(_elm_lang$core$Color$RGBA, 196, 160, 0, 1);
var _elm_lang$core$Color$lightGreen = A4(_elm_lang$core$Color$RGBA, 138, 226, 52, 1);
var _elm_lang$core$Color$green = A4(_elm_lang$core$Color$RGBA, 115, 210, 22, 1);
var _elm_lang$core$Color$darkGreen = A4(_elm_lang$core$Color$RGBA, 78, 154, 6, 1);
var _elm_lang$core$Color$lightBlue = A4(_elm_lang$core$Color$RGBA, 114, 159, 207, 1);
var _elm_lang$core$Color$blue = A4(_elm_lang$core$Color$RGBA, 52, 101, 164, 1);
var _elm_lang$core$Color$darkBlue = A4(_elm_lang$core$Color$RGBA, 32, 74, 135, 1);
var _elm_lang$core$Color$lightPurple = A4(_elm_lang$core$Color$RGBA, 173, 127, 168, 1);
var _elm_lang$core$Color$purple = A4(_elm_lang$core$Color$RGBA, 117, 80, 123, 1);
var _elm_lang$core$Color$darkPurple = A4(_elm_lang$core$Color$RGBA, 92, 53, 102, 1);
var _elm_lang$core$Color$lightBrown = A4(_elm_lang$core$Color$RGBA, 233, 185, 110, 1);
var _elm_lang$core$Color$brown = A4(_elm_lang$core$Color$RGBA, 193, 125, 17, 1);
var _elm_lang$core$Color$darkBrown = A4(_elm_lang$core$Color$RGBA, 143, 89, 2, 1);
var _elm_lang$core$Color$black = A4(_elm_lang$core$Color$RGBA, 0, 0, 0, 1);
var _elm_lang$core$Color$white = A4(_elm_lang$core$Color$RGBA, 255, 255, 255, 1);
var _elm_lang$core$Color$lightGrey = A4(_elm_lang$core$Color$RGBA, 238, 238, 236, 1);
var _elm_lang$core$Color$grey = A4(_elm_lang$core$Color$RGBA, 211, 215, 207, 1);
var _elm_lang$core$Color$darkGrey = A4(_elm_lang$core$Color$RGBA, 186, 189, 182, 1);
var _elm_lang$core$Color$lightGray = A4(_elm_lang$core$Color$RGBA, 238, 238, 236, 1);
var _elm_lang$core$Color$gray = A4(_elm_lang$core$Color$RGBA, 211, 215, 207, 1);
var _elm_lang$core$Color$darkGray = A4(_elm_lang$core$Color$RGBA, 186, 189, 182, 1);
var _elm_lang$core$Color$lightCharcoal = A4(_elm_lang$core$Color$RGBA, 136, 138, 133, 1);
var _elm_lang$core$Color$charcoal = A4(_elm_lang$core$Color$RGBA, 85, 87, 83, 1);
var _elm_lang$core$Color$darkCharcoal = A4(_elm_lang$core$Color$RGBA, 46, 52, 54, 1);
var _elm_lang$core$Color$Radial = F5(
	function (a, b, c, d, e) {
		return {ctor: 'Radial', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Color$radial = _elm_lang$core$Color$Radial;
var _elm_lang$core$Color$Linear = F3(
	function (a, b, c) {
		return {ctor: 'Linear', _0: a, _1: b, _2: c};
	});
var _elm_lang$core$Color$linear = _elm_lang$core$Color$Linear;

//import Result //

var _elm_lang$core$Native_Date = function() {

function fromString(str)
{
	var date = new Date(str);
	return isNaN(date.getTime())
		? _elm_lang$core$Result$Err('Unable to parse \'' + str + '\' as a date. Dates must be in the ISO 8601 format.')
		: _elm_lang$core$Result$Ok(date);
}

var dayTable = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthTable =
	['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


return {
	fromString: fromString,
	year: function(d) { return d.getFullYear(); },
	month: function(d) { return { ctor: monthTable[d.getMonth()] }; },
	day: function(d) { return d.getDate(); },
	hour: function(d) { return d.getHours(); },
	minute: function(d) { return d.getMinutes(); },
	second: function(d) { return d.getSeconds(); },
	millisecond: function(d) { return d.getMilliseconds(); },
	toTime: function(d) { return d.getTime(); },
	fromTime: function(t) { return new Date(t); },
	dayOfWeek: function(d) { return { ctor: dayTable[d.getDay()] }; }
};

}();
var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Platform$sendToApp(router),
				_p1._0));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			_elm_lang$core$Task$onError,
			function (_p2) {
				return _elm_lang$core$Task$fail(
					convert(_p2));
			},
			task);
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											},
											taskE);
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p3 = tasks;
	if (_p3.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p3._0,
			_elm_lang$core$Task$sequence(_p3._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p4) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p7, _p6, _p5) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$Perform = function (a) {
	return {ctor: 'Perform', _0: a};
};
var _elm_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, toMessage, task)));
	});
var _elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(
					_elm_lang$core$Task$onError,
					function (_p8) {
						return _elm_lang$core$Task$succeed(
							resultToMessage(
								_elm_lang$core$Result$Err(_p8)));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p9) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Ok(_p9)));
						},
						task))));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$Perform(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			var spawnRest = function (id) {
				return A3(
					_elm_lang$core$Time$spawnHelp,
					router,
					_p0._1,
					A3(_elm_lang$core$Dict$insert, _p1, id, processes));
			};
			var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Time$setInterval,
					_p1,
					A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
			return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{
					ctor: '::',
					_0: _p6,
					_1: {ctor: '[]'}
				},
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{ctor: '::', _0: _p6, _1: _p4._0},
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var tellTaggers = function (time) {
				return _elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						function (tagger) {
							return A2(
								_elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						_p7._0));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p8) {
					return _elm_lang$core$Task$succeed(state);
				},
				A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						function (_p14) {
							return _p13._2;
						},
						_elm_lang$core$Native_Scheduler.kill(id))
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: {ctor: '::', _0: interval, _1: _p18._0},
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			function (newProcesses) {
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (_p20) {
					return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_lang$core$Date$millisecond = _elm_lang$core$Native_Date.millisecond;
var _elm_lang$core$Date$second = _elm_lang$core$Native_Date.second;
var _elm_lang$core$Date$minute = _elm_lang$core$Native_Date.minute;
var _elm_lang$core$Date$hour = _elm_lang$core$Native_Date.hour;
var _elm_lang$core$Date$dayOfWeek = _elm_lang$core$Native_Date.dayOfWeek;
var _elm_lang$core$Date$day = _elm_lang$core$Native_Date.day;
var _elm_lang$core$Date$month = _elm_lang$core$Native_Date.month;
var _elm_lang$core$Date$year = _elm_lang$core$Native_Date.year;
var _elm_lang$core$Date$fromTime = _elm_lang$core$Native_Date.fromTime;
var _elm_lang$core$Date$toTime = _elm_lang$core$Native_Date.toTime;
var _elm_lang$core$Date$fromString = _elm_lang$core$Native_Date.fromString;
var _elm_lang$core$Date$now = A2(_elm_lang$core$Task$map, _elm_lang$core$Date$fromTime, _elm_lang$core$Time$now);
var _elm_lang$core$Date$Date = {ctor: 'Date'};
var _elm_lang$core$Date$Sun = {ctor: 'Sun'};
var _elm_lang$core$Date$Sat = {ctor: 'Sat'};
var _elm_lang$core$Date$Fri = {ctor: 'Fri'};
var _elm_lang$core$Date$Thu = {ctor: 'Thu'};
var _elm_lang$core$Date$Wed = {ctor: 'Wed'};
var _elm_lang$core$Date$Tue = {ctor: 'Tue'};
var _elm_lang$core$Date$Mon = {ctor: 'Mon'};
var _elm_lang$core$Date$Dec = {ctor: 'Dec'};
var _elm_lang$core$Date$Nov = {ctor: 'Nov'};
var _elm_lang$core$Date$Oct = {ctor: 'Oct'};
var _elm_lang$core$Date$Sep = {ctor: 'Sep'};
var _elm_lang$core$Date$Aug = {ctor: 'Aug'};
var _elm_lang$core$Date$Jul = {ctor: 'Jul'};
var _elm_lang$core$Date$Jun = {ctor: 'Jun'};
var _elm_lang$core$Date$May = {ctor: 'May'};
var _elm_lang$core$Date$Apr = {ctor: 'Apr'};
var _elm_lang$core$Date$Mar = {ctor: 'Mar'};
var _elm_lang$core$Date$Feb = {ctor: 'Feb'};
var _elm_lang$core$Date$Jan = {ctor: 'Jan'};

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {

function escape(str)
{
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function caseInsensitive(re)
{
	return new RegExp(re.source, 'gi');
}
function regex(raw)
{
	return new RegExp(raw, 'g');
}

function contains(re, string)
{
	return string.match(re) !== null;
}

function find(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex === re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		out.push({
			match: result[0],
			submatches: _elm_lang$core$Native_List.fromArray(subs),
			index: result.index,
			number: number
		});
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

function replace(n, re, replacer, string)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		return replacer({
			match: match,
			submatches: _elm_lang$core$Native_List.fromArray(submatches),
			index: arguments[arguments.length - 2],
			number: count
		});
	}
	return string.replace(re, jsReplacer);
}

function split(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	if (n === Infinity)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(re));
	}
	var string = str;
	var result;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		if (!(result = re.exec(string))) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function (a, b, c, d) {
		return {match: a, submatches: b, index: c, number: d};
	});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function (a) {
	return {ctor: 'AtMost', _0: a};
};
var _elm_lang$core$Regex$All = {ctor: 'All'};

var _elm_lang$dom$Native_Dom = function() {

var fakeNode = {
	addEventListener: function() {},
	removeEventListener: function() {}
};

var onDocument = on(typeof document !== 'undefined' ? document : fakeNode);
var onWindow = on(typeof window !== 'undefined' ? window : fakeNode);

function on(node)
{
	return function(eventName, decoder, toTask)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {

			function performTask(event)
			{
				var result = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, event);
				if (result.ctor === 'Ok')
				{
					_elm_lang$core$Native_Scheduler.rawSpawn(toTask(result._0));
				}
			}

			node.addEventListener(eventName, performTask);

			return function()
			{
				node.removeEventListener(eventName, performTask);
			};
		});
	};
}

var rAF = typeof requestAnimationFrame !== 'undefined'
	? requestAnimationFrame
	: function(callback) { callback(); };

function withNode(id, doStuff)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		rAF(function()
		{
			var node = document.getElementById(id);
			if (node === null)
			{
				callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NotFound', _0: id }));
				return;
			}
			callback(_elm_lang$core$Native_Scheduler.succeed(doStuff(node)));
		});
	});
}


// FOCUS

function focus(id)
{
	return withNode(id, function(node) {
		node.focus();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function blur(id)
{
	return withNode(id, function(node) {
		node.blur();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SCROLLING

function getScrollTop(id)
{
	return withNode(id, function(node) {
		return node.scrollTop;
	});
}

function setScrollTop(id, desiredScrollTop)
{
	return withNode(id, function(node) {
		node.scrollTop = desiredScrollTop;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toBottom(id)
{
	return withNode(id, function(node) {
		node.scrollTop = node.scrollHeight;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function getScrollLeft(id)
{
	return withNode(id, function(node) {
		return node.scrollLeft;
	});
}

function setScrollLeft(id, desiredScrollLeft)
{
	return withNode(id, function(node) {
		node.scrollLeft = desiredScrollLeft;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toRight(id)
{
	return withNode(id, function(node) {
		node.scrollLeft = node.scrollWidth;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SIZE

function width(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollWidth;
			case 'VisibleContent':
				return node.clientWidth;
			case 'VisibleContentWithBorders':
				return node.offsetWidth;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.right - rect.left;
		}
	});
}

function height(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollHeight;
			case 'VisibleContent':
				return node.clientHeight;
			case 'VisibleContentWithBorders':
				return node.offsetHeight;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.bottom - rect.top;
		}
	});
}

return {
	onDocument: F3(onDocument),
	onWindow: F3(onWindow),

	focus: focus,
	blur: blur,

	getScrollTop: getScrollTop,
	setScrollTop: F2(setScrollTop),
	getScrollLeft: getScrollLeft,
	setScrollLeft: F2(setScrollLeft),
	toBottom: toBottom,
	toRight: toRight,

	height: F2(height),
	width: F2(width)
};

}();

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
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
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
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


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Keyed$node = _elm_lang$virtual_dom$VirtualDom$keyedNode;
var _elm_lang$html$Html_Keyed$ol = _elm_lang$html$Html_Keyed$node('ol');
var _elm_lang$html$Html_Keyed$ul = _elm_lang$html$Html_Keyed$node('ul');

var _elm_lang$http$Native_Http = function() {


// ENCODING AND DECODING

function encodeUri(string)
{
	return encodeURIComponent(string);
}

function decodeUri(string)
{
	try
	{
		return _elm_lang$core$Maybe$Just(decodeURIComponent(string));
	}
	catch(e)
	{
		return _elm_lang$core$Maybe$Nothing;
	}
}


// SEND REQUEST

function toTask(request, maybeProgress)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NetworkError' }));
		});
		xhr.addEventListener('timeout', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'Timeout' }));
		});
		xhr.addEventListener('load', function() {
			callback(handleResponse(xhr, request.expect.responseToResult));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'BadUrl', _0: request.url }));
		}

		configureRequest(xhr, request);
		send(xhr, request.body);

		return function() { xhr.abort(); };
	});
}

function configureProgress(xhr, maybeProgress)
{
	if (maybeProgress.ctor === 'Nothing')
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_elm_lang$core$Native_Scheduler.rawSpawn(maybeProgress._0({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function configureRequest(xhr, request)
{
	function setHeader(pair)
	{
		xhr.setRequestHeader(pair._0, pair._1);
	}

	A2(_elm_lang$core$List$map, setHeader, request.headers);
	xhr.responseType = request.expect.responseType;
	xhr.withCredentials = request.withCredentials;

	if (request.timeout.ctor === 'Just')
	{
		xhr.timeout = request.timeout._0;
	}
}

function send(xhr, body)
{
	switch (body.ctor)
	{
		case 'EmptyBody':
			xhr.send();
			return;

		case 'StringBody':
			xhr.setRequestHeader('Content-Type', body._0);
			xhr.send(body._1);
			return;

		case 'FormDataBody':
			xhr.send(body._0);
			return;
	}
}


// RESPONSES

function handleResponse(xhr, responseToResult)
{
	var response = toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadStatus',
			_0: response
		});
	}

	var result = responseToResult(response);

	if (result.ctor === 'Ok')
	{
		return _elm_lang$core$Native_Scheduler.succeed(result._0);
	}
	else
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadPayload',
			_0: result._0,
			_1: response
		});
	}
}

function toResponse(xhr)
{
	return {
		status: { code: xhr.status, message: xhr.statusText },
		headers: parseHeaders(xhr.getAllResponseHeaders()),
		url: xhr.responseURL,
		body: xhr.response
	};
}

function parseHeaders(rawHeaders)
{
	var headers = _elm_lang$core$Dict$empty;

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

			headers = A3(_elm_lang$core$Dict$update, key, function(oldValue) {
				if (oldValue.ctor === 'Just')
				{
					return _elm_lang$core$Maybe$Just(value + ', ' + oldValue._0);
				}
				return _elm_lang$core$Maybe$Just(value);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function expectStringResponse(responseToResult)
{
	return {
		responseType: 'text',
		responseToResult: responseToResult
	};
}

function mapExpect(func, expect)
{
	return {
		responseType: expect.responseType,
		responseToResult: function(response) {
			var convertedResponse = expect.responseToResult(response);
			return A2(_elm_lang$core$Result$map, func, convertedResponse);
		}
	};
}


// BODY

function multipart(parts)
{
	var formData = new FormData();

	while (parts.ctor !== '[]')
	{
		var part = parts._0;
		formData.append(part._0, part._1);
		parts = parts._1;
	}

	return { ctor: 'FormDataBody', _0: formData };
}

return {
	toTask: F2(toTask),
	expectStringResponse: expectStringResponse,
	mapExpect: F2(mapExpect),
	multipart: multipart,
	encodeUri: encodeUri,
	decodeUri: decodeUri
};

}();

var _elm_lang$http$Http_Internal$map = F2(
	function (func, request) {
		return _elm_lang$core$Native_Utils.update(
			request,
			{
				expect: A2(_elm_lang$http$Native_Http.mapExpect, func, request.expect)
			});
	});
var _elm_lang$http$Http_Internal$RawRequest = F7(
	function (a, b, c, d, e, f, g) {
		return {method: a, headers: b, url: c, body: d, expect: e, timeout: f, withCredentials: g};
	});
var _elm_lang$http$Http_Internal$Request = function (a) {
	return {ctor: 'Request', _0: a};
};
var _elm_lang$http$Http_Internal$Expect = {ctor: 'Expect'};
var _elm_lang$http$Http_Internal$FormDataBody = {ctor: 'FormDataBody'};
var _elm_lang$http$Http_Internal$StringBody = F2(
	function (a, b) {
		return {ctor: 'StringBody', _0: a, _1: b};
	});
var _elm_lang$http$Http_Internal$EmptyBody = {ctor: 'EmptyBody'};
var _elm_lang$http$Http_Internal$Header = F2(
	function (a, b) {
		return {ctor: 'Header', _0: a, _1: b};
	});

var _elm_lang$http$Http$decodeUri = _elm_lang$http$Native_Http.decodeUri;
var _elm_lang$http$Http$encodeUri = _elm_lang$http$Native_Http.encodeUri;
var _elm_lang$http$Http$expectStringResponse = _elm_lang$http$Native_Http.expectStringResponse;
var _elm_lang$http$Http$expectJson = function (decoder) {
	return _elm_lang$http$Http$expectStringResponse(
		function (response) {
			return A2(_elm_lang$core$Json_Decode$decodeString, decoder, response.body);
		});
};
var _elm_lang$http$Http$expectString = _elm_lang$http$Http$expectStringResponse(
	function (response) {
		return _elm_lang$core$Result$Ok(response.body);
	});
var _elm_lang$http$Http$multipartBody = _elm_lang$http$Native_Http.multipart;
var _elm_lang$http$Http$stringBody = _elm_lang$http$Http_Internal$StringBody;
var _elm_lang$http$Http$jsonBody = function (value) {
	return A2(
		_elm_lang$http$Http_Internal$StringBody,
		'application/json',
		A2(_elm_lang$core$Json_Encode$encode, 0, value));
};
var _elm_lang$http$Http$emptyBody = _elm_lang$http$Http_Internal$EmptyBody;
var _elm_lang$http$Http$header = _elm_lang$http$Http_Internal$Header;
var _elm_lang$http$Http$request = _elm_lang$http$Http_Internal$Request;
var _elm_lang$http$Http$post = F3(
	function (url, body, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'POST',
				headers: {ctor: '[]'},
				url: url,
				body: body,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$get = F2(
	function (url, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'GET',
				headers: {ctor: '[]'},
				url: url,
				body: _elm_lang$http$Http$emptyBody,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$getString = function (url) {
	return _elm_lang$http$Http$request(
		{
			method: 'GET',
			headers: {ctor: '[]'},
			url: url,
			body: _elm_lang$http$Http$emptyBody,
			expect: _elm_lang$http$Http$expectString,
			timeout: _elm_lang$core$Maybe$Nothing,
			withCredentials: false
		});
};
var _elm_lang$http$Http$toTask = function (_p0) {
	var _p1 = _p0;
	return A2(_elm_lang$http$Native_Http.toTask, _p1._0, _elm_lang$core$Maybe$Nothing);
};
var _elm_lang$http$Http$send = F2(
	function (resultToMessage, request) {
		return A2(
			_elm_lang$core$Task$attempt,
			resultToMessage,
			_elm_lang$http$Http$toTask(request));
	});
var _elm_lang$http$Http$Response = F4(
	function (a, b, c, d) {
		return {url: a, status: b, headers: c, body: d};
	});
var _elm_lang$http$Http$BadPayload = F2(
	function (a, b) {
		return {ctor: 'BadPayload', _0: a, _1: b};
	});
var _elm_lang$http$Http$BadStatus = function (a) {
	return {ctor: 'BadStatus', _0: a};
};
var _elm_lang$http$Http$NetworkError = {ctor: 'NetworkError'};
var _elm_lang$http$Http$Timeout = {ctor: 'Timeout'};
var _elm_lang$http$Http$BadUrl = function (a) {
	return {ctor: 'BadUrl', _0: a};
};
var _elm_lang$http$Http$StringPart = F2(
	function (a, b) {
		return {ctor: 'StringPart', _0: a, _1: b};
	});
var _elm_lang$http$Http$stringPart = _elm_lang$http$Http$StringPart;

var _elm_lang$navigation$Native_Navigation = function() {


// FAKE NAVIGATION

function go(n)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		if (n !== 0)
		{
			history.go(n);
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function pushState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.pushState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}

function replaceState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.replaceState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}


// REAL NAVIGATION

function reloadPage(skipCache)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		document.location.reload(skipCache);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function setLocation(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		try
		{
			window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			document.location.reload(false);
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


// GET LOCATION

function getLocation()
{
	var location = document.location;

	return {
		href: location.href,
		host: location.host,
		hostname: location.hostname,
		protocol: location.protocol,
		origin: location.origin,
		port_: location.port,
		pathname: location.pathname,
		search: location.search,
		hash: location.hash,
		username: location.username,
		password: location.password
	};
}


// DETECT IE11 PROBLEMS

function isInternetExplorer11()
{
	return window.navigator.userAgent.indexOf('Trident') !== -1;
}


return {
	go: go,
	setLocation: setLocation,
	reloadPage: reloadPage,
	pushState: pushState,
	replaceState: replaceState,
	getLocation: getLocation,
	isInternetExplorer11: isInternetExplorer11
};

}();

var _elm_lang$navigation$Navigation$replaceState = _elm_lang$navigation$Native_Navigation.replaceState;
var _elm_lang$navigation$Navigation$pushState = _elm_lang$navigation$Native_Navigation.pushState;
var _elm_lang$navigation$Navigation$go = _elm_lang$navigation$Native_Navigation.go;
var _elm_lang$navigation$Navigation$reloadPage = _elm_lang$navigation$Native_Navigation.reloadPage;
var _elm_lang$navigation$Navigation$setLocation = _elm_lang$navigation$Native_Navigation.setLocation;
var _elm_lang$navigation$Navigation_ops = _elm_lang$navigation$Navigation_ops || {};
_elm_lang$navigation$Navigation_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p0) {
				return task2;
			},
			task1);
	});
var _elm_lang$navigation$Navigation$notify = F3(
	function (router, subs, location) {
		var send = function (_p1) {
			var _p2 = _p1;
			return A2(
				_elm_lang$core$Platform$sendToApp,
				router,
				_p2._0(location));
		};
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(_elm_lang$core$List$map, send, subs)),
			_elm_lang$core$Task$succeed(
				{ctor: '_Tuple0'}));
	});
var _elm_lang$navigation$Navigation$cmdHelp = F3(
	function (router, subs, cmd) {
		var _p3 = cmd;
		switch (_p3.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$go(_p3._0);
			case 'New':
				return A2(
					_elm_lang$core$Task$andThen,
					A2(_elm_lang$navigation$Navigation$notify, router, subs),
					_elm_lang$navigation$Navigation$pushState(_p3._0));
			case 'Modify':
				return A2(
					_elm_lang$core$Task$andThen,
					A2(_elm_lang$navigation$Navigation$notify, router, subs),
					_elm_lang$navigation$Navigation$replaceState(_p3._0));
			case 'Visit':
				return _elm_lang$navigation$Navigation$setLocation(_p3._0);
			default:
				return _elm_lang$navigation$Navigation$reloadPage(_p3._0);
		}
	});
var _elm_lang$navigation$Navigation$killPopWatcher = function (popWatcher) {
	var _p4 = popWatcher;
	if (_p4.ctor === 'Normal') {
		return _elm_lang$core$Process$kill(_p4._0);
	} else {
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Process$kill(_p4._0),
			_elm_lang$core$Process$kill(_p4._1));
	}
};
var _elm_lang$navigation$Navigation$onSelfMsg = F3(
	function (router, location, state) {
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			A3(_elm_lang$navigation$Navigation$notify, router, state.subs, location),
			_elm_lang$core$Task$succeed(state));
	});
var _elm_lang$navigation$Navigation$subscription = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$command = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$Location = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {href: a, host: b, hostname: c, protocol: d, origin: e, port_: f, pathname: g, search: h, hash: i, username: j, password: k};
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
var _elm_lang$navigation$Navigation$State = F2(
	function (a, b) {
		return {subs: a, popWatcher: b};
	});
var _elm_lang$navigation$Navigation$init = _elm_lang$core$Task$succeed(
	A2(
		_elm_lang$navigation$Navigation$State,
		{ctor: '[]'},
		_elm_lang$core$Maybe$Nothing));
var _elm_lang$navigation$Navigation$Reload = function (a) {
	return {ctor: 'Reload', _0: a};
};
var _elm_lang$navigation$Navigation$reload = _elm_lang$navigation$Navigation$command(
	_elm_lang$navigation$Navigation$Reload(false));
var _elm_lang$navigation$Navigation$reloadAndSkipCache = _elm_lang$navigation$Navigation$command(
	_elm_lang$navigation$Navigation$Reload(true));
var _elm_lang$navigation$Navigation$Visit = function (a) {
	return {ctor: 'Visit', _0: a};
};
var _elm_lang$navigation$Navigation$load = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Visit(url));
};
var _elm_lang$navigation$Navigation$Modify = function (a) {
	return {ctor: 'Modify', _0: a};
};
var _elm_lang$navigation$Navigation$modifyUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Modify(url));
};
var _elm_lang$navigation$Navigation$New = function (a) {
	return {ctor: 'New', _0: a};
};
var _elm_lang$navigation$Navigation$newUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$New(url));
};
var _elm_lang$navigation$Navigation$Jump = function (a) {
	return {ctor: 'Jump', _0: a};
};
var _elm_lang$navigation$Navigation$back = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(0 - n));
};
var _elm_lang$navigation$Navigation$forward = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(n));
};
var _elm_lang$navigation$Navigation$cmdMap = F2(
	function (_p5, myCmd) {
		var _p6 = myCmd;
		switch (_p6.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$Jump(_p6._0);
			case 'New':
				return _elm_lang$navigation$Navigation$New(_p6._0);
			case 'Modify':
				return _elm_lang$navigation$Navigation$Modify(_p6._0);
			case 'Visit':
				return _elm_lang$navigation$Navigation$Visit(_p6._0);
			default:
				return _elm_lang$navigation$Navigation$Reload(_p6._0);
		}
	});
var _elm_lang$navigation$Navigation$Monitor = function (a) {
	return {ctor: 'Monitor', _0: a};
};
var _elm_lang$navigation$Navigation$program = F2(
	function (locationToMessage, stuff) {
		var init = stuff.init(
			_elm_lang$navigation$Native_Navigation.getLocation(
				{ctor: '_Tuple0'}));
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				{
					ctor: '::',
					_0: _elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
					_1: {
						ctor: '::',
						_0: stuff.subscriptions(model),
						_1: {ctor: '[]'}
					}
				});
		};
		return _elm_lang$html$Html$program(
			{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$programWithFlags = F2(
	function (locationToMessage, stuff) {
		var init = function (flags) {
			return A2(
				stuff.init,
				flags,
				_elm_lang$navigation$Native_Navigation.getLocation(
					{ctor: '_Tuple0'}));
		};
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				{
					ctor: '::',
					_0: _elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
					_1: {
						ctor: '::',
						_0: stuff.subscriptions(model),
						_1: {ctor: '[]'}
					}
				});
		};
		return _elm_lang$html$Html$programWithFlags(
			{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$subMap = F2(
	function (func, _p7) {
		var _p8 = _p7;
		return _elm_lang$navigation$Navigation$Monitor(
			function (_p9) {
				return func(
					_p8._0(_p9));
			});
	});
var _elm_lang$navigation$Navigation$InternetExplorer = F2(
	function (a, b) {
		return {ctor: 'InternetExplorer', _0: a, _1: b};
	});
var _elm_lang$navigation$Navigation$Normal = function (a) {
	return {ctor: 'Normal', _0: a};
};
var _elm_lang$navigation$Navigation$spawnPopWatcher = function (router) {
	var reportLocation = function (_p10) {
		return A2(
			_elm_lang$core$Platform$sendToSelf,
			router,
			_elm_lang$navigation$Native_Navigation.getLocation(
				{ctor: '_Tuple0'}));
	};
	return _elm_lang$navigation$Native_Navigation.isInternetExplorer11(
		{ctor: '_Tuple0'}) ? A3(
		_elm_lang$core$Task$map2,
		_elm_lang$navigation$Navigation$InternetExplorer,
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'popstate', _elm_lang$core$Json_Decode$value, reportLocation)),
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'hashchange', _elm_lang$core$Json_Decode$value, reportLocation))) : A2(
		_elm_lang$core$Task$map,
		_elm_lang$navigation$Navigation$Normal,
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'popstate', _elm_lang$core$Json_Decode$value, reportLocation)));
};
var _elm_lang$navigation$Navigation$onEffects = F4(
	function (router, cmds, subs, _p11) {
		var _p12 = _p11;
		var _p15 = _p12.popWatcher;
		var stepState = function () {
			var _p13 = {ctor: '_Tuple2', _0: subs, _1: _p15};
			_v6_2:
			do {
				if (_p13._0.ctor === '[]') {
					if (_p13._1.ctor === 'Just') {
						return A2(
							_elm_lang$navigation$Navigation_ops['&>'],
							_elm_lang$navigation$Navigation$killPopWatcher(_p13._1._0),
							_elm_lang$core$Task$succeed(
								A2(_elm_lang$navigation$Navigation$State, subs, _elm_lang$core$Maybe$Nothing)));
					} else {
						break _v6_2;
					}
				} else {
					if (_p13._1.ctor === 'Nothing') {
						return A2(
							_elm_lang$core$Task$map,
							function (_p14) {
								return A2(
									_elm_lang$navigation$Navigation$State,
									subs,
									_elm_lang$core$Maybe$Just(_p14));
							},
							_elm_lang$navigation$Navigation$spawnPopWatcher(router));
					} else {
						break _v6_2;
					}
				}
			} while(false);
			return _elm_lang$core$Task$succeed(
				A2(_elm_lang$navigation$Navigation$State, subs, _p15));
		}();
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					A2(_elm_lang$navigation$Navigation$cmdHelp, router, subs),
					cmds)),
			stepState);
	});
_elm_lang$core$Native_Platform.effectManagers['Navigation'] = {pkg: 'elm-lang/navigation', init: _elm_lang$navigation$Navigation$init, onEffects: _elm_lang$navigation$Navigation$onEffects, onSelfMsg: _elm_lang$navigation$Navigation$onSelfMsg, tag: 'fx', cmdMap: _elm_lang$navigation$Navigation$cmdMap, subMap: _elm_lang$navigation$Navigation$subMap};

var _elm_lang$svg$Svg$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$svg$Svg$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$svg$Svg$svgNamespace = A2(
	_elm_lang$virtual_dom$VirtualDom$property,
	'namespace',
	_elm_lang$core$Json_Encode$string('http://www.w3.org/2000/svg'));
var _elm_lang$svg$Svg$node = F3(
	function (name, attributes, children) {
		return A3(
			_elm_lang$virtual_dom$VirtualDom$node,
			name,
			{ctor: '::', _0: _elm_lang$svg$Svg$svgNamespace, _1: attributes},
			children);
	});
var _elm_lang$svg$Svg$svg = _elm_lang$svg$Svg$node('svg');
var _elm_lang$svg$Svg$foreignObject = _elm_lang$svg$Svg$node('foreignObject');
var _elm_lang$svg$Svg$animate = _elm_lang$svg$Svg$node('animate');
var _elm_lang$svg$Svg$animateColor = _elm_lang$svg$Svg$node('animateColor');
var _elm_lang$svg$Svg$animateMotion = _elm_lang$svg$Svg$node('animateMotion');
var _elm_lang$svg$Svg$animateTransform = _elm_lang$svg$Svg$node('animateTransform');
var _elm_lang$svg$Svg$mpath = _elm_lang$svg$Svg$node('mpath');
var _elm_lang$svg$Svg$set = _elm_lang$svg$Svg$node('set');
var _elm_lang$svg$Svg$a = _elm_lang$svg$Svg$node('a');
var _elm_lang$svg$Svg$defs = _elm_lang$svg$Svg$node('defs');
var _elm_lang$svg$Svg$g = _elm_lang$svg$Svg$node('g');
var _elm_lang$svg$Svg$marker = _elm_lang$svg$Svg$node('marker');
var _elm_lang$svg$Svg$mask = _elm_lang$svg$Svg$node('mask');
var _elm_lang$svg$Svg$pattern = _elm_lang$svg$Svg$node('pattern');
var _elm_lang$svg$Svg$switch = _elm_lang$svg$Svg$node('switch');
var _elm_lang$svg$Svg$symbol = _elm_lang$svg$Svg$node('symbol');
var _elm_lang$svg$Svg$desc = _elm_lang$svg$Svg$node('desc');
var _elm_lang$svg$Svg$metadata = _elm_lang$svg$Svg$node('metadata');
var _elm_lang$svg$Svg$title = _elm_lang$svg$Svg$node('title');
var _elm_lang$svg$Svg$feBlend = _elm_lang$svg$Svg$node('feBlend');
var _elm_lang$svg$Svg$feColorMatrix = _elm_lang$svg$Svg$node('feColorMatrix');
var _elm_lang$svg$Svg$feComponentTransfer = _elm_lang$svg$Svg$node('feComponentTransfer');
var _elm_lang$svg$Svg$feComposite = _elm_lang$svg$Svg$node('feComposite');
var _elm_lang$svg$Svg$feConvolveMatrix = _elm_lang$svg$Svg$node('feConvolveMatrix');
var _elm_lang$svg$Svg$feDiffuseLighting = _elm_lang$svg$Svg$node('feDiffuseLighting');
var _elm_lang$svg$Svg$feDisplacementMap = _elm_lang$svg$Svg$node('feDisplacementMap');
var _elm_lang$svg$Svg$feFlood = _elm_lang$svg$Svg$node('feFlood');
var _elm_lang$svg$Svg$feFuncA = _elm_lang$svg$Svg$node('feFuncA');
var _elm_lang$svg$Svg$feFuncB = _elm_lang$svg$Svg$node('feFuncB');
var _elm_lang$svg$Svg$feFuncG = _elm_lang$svg$Svg$node('feFuncG');
var _elm_lang$svg$Svg$feFuncR = _elm_lang$svg$Svg$node('feFuncR');
var _elm_lang$svg$Svg$feGaussianBlur = _elm_lang$svg$Svg$node('feGaussianBlur');
var _elm_lang$svg$Svg$feImage = _elm_lang$svg$Svg$node('feImage');
var _elm_lang$svg$Svg$feMerge = _elm_lang$svg$Svg$node('feMerge');
var _elm_lang$svg$Svg$feMergeNode = _elm_lang$svg$Svg$node('feMergeNode');
var _elm_lang$svg$Svg$feMorphology = _elm_lang$svg$Svg$node('feMorphology');
var _elm_lang$svg$Svg$feOffset = _elm_lang$svg$Svg$node('feOffset');
var _elm_lang$svg$Svg$feSpecularLighting = _elm_lang$svg$Svg$node('feSpecularLighting');
var _elm_lang$svg$Svg$feTile = _elm_lang$svg$Svg$node('feTile');
var _elm_lang$svg$Svg$feTurbulence = _elm_lang$svg$Svg$node('feTurbulence');
var _elm_lang$svg$Svg$font = _elm_lang$svg$Svg$node('font');
var _elm_lang$svg$Svg$linearGradient = _elm_lang$svg$Svg$node('linearGradient');
var _elm_lang$svg$Svg$radialGradient = _elm_lang$svg$Svg$node('radialGradient');
var _elm_lang$svg$Svg$stop = _elm_lang$svg$Svg$node('stop');
var _elm_lang$svg$Svg$circle = _elm_lang$svg$Svg$node('circle');
var _elm_lang$svg$Svg$ellipse = _elm_lang$svg$Svg$node('ellipse');
var _elm_lang$svg$Svg$image = _elm_lang$svg$Svg$node('image');
var _elm_lang$svg$Svg$line = _elm_lang$svg$Svg$node('line');
var _elm_lang$svg$Svg$path = _elm_lang$svg$Svg$node('path');
var _elm_lang$svg$Svg$polygon = _elm_lang$svg$Svg$node('polygon');
var _elm_lang$svg$Svg$polyline = _elm_lang$svg$Svg$node('polyline');
var _elm_lang$svg$Svg$rect = _elm_lang$svg$Svg$node('rect');
var _elm_lang$svg$Svg$use = _elm_lang$svg$Svg$node('use');
var _elm_lang$svg$Svg$feDistantLight = _elm_lang$svg$Svg$node('feDistantLight');
var _elm_lang$svg$Svg$fePointLight = _elm_lang$svg$Svg$node('fePointLight');
var _elm_lang$svg$Svg$feSpotLight = _elm_lang$svg$Svg$node('feSpotLight');
var _elm_lang$svg$Svg$altGlyph = _elm_lang$svg$Svg$node('altGlyph');
var _elm_lang$svg$Svg$altGlyphDef = _elm_lang$svg$Svg$node('altGlyphDef');
var _elm_lang$svg$Svg$altGlyphItem = _elm_lang$svg$Svg$node('altGlyphItem');
var _elm_lang$svg$Svg$glyph = _elm_lang$svg$Svg$node('glyph');
var _elm_lang$svg$Svg$glyphRef = _elm_lang$svg$Svg$node('glyphRef');
var _elm_lang$svg$Svg$textPath = _elm_lang$svg$Svg$node('textPath');
var _elm_lang$svg$Svg$text_ = _elm_lang$svg$Svg$node('text');
var _elm_lang$svg$Svg$tref = _elm_lang$svg$Svg$node('tref');
var _elm_lang$svg$Svg$tspan = _elm_lang$svg$Svg$node('tspan');
var _elm_lang$svg$Svg$clipPath = _elm_lang$svg$Svg$node('clipPath');
var _elm_lang$svg$Svg$colorProfile = _elm_lang$svg$Svg$node('colorProfile');
var _elm_lang$svg$Svg$cursor = _elm_lang$svg$Svg$node('cursor');
var _elm_lang$svg$Svg$filter = _elm_lang$svg$Svg$node('filter');
var _elm_lang$svg$Svg$script = _elm_lang$svg$Svg$node('script');
var _elm_lang$svg$Svg$style = _elm_lang$svg$Svg$node('style');
var _elm_lang$svg$Svg$view = _elm_lang$svg$Svg$node('view');

var _elm_lang$svg$Svg_Attributes$writingMode = _elm_lang$virtual_dom$VirtualDom$attribute('writing-mode');
var _elm_lang$svg$Svg_Attributes$wordSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('word-spacing');
var _elm_lang$svg$Svg_Attributes$visibility = _elm_lang$virtual_dom$VirtualDom$attribute('visibility');
var _elm_lang$svg$Svg_Attributes$unicodeBidi = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-bidi');
var _elm_lang$svg$Svg_Attributes$textRendering = _elm_lang$virtual_dom$VirtualDom$attribute('text-rendering');
var _elm_lang$svg$Svg_Attributes$textDecoration = _elm_lang$virtual_dom$VirtualDom$attribute('text-decoration');
var _elm_lang$svg$Svg_Attributes$textAnchor = _elm_lang$virtual_dom$VirtualDom$attribute('text-anchor');
var _elm_lang$svg$Svg_Attributes$stroke = _elm_lang$virtual_dom$VirtualDom$attribute('stroke');
var _elm_lang$svg$Svg_Attributes$strokeWidth = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-width');
var _elm_lang$svg$Svg_Attributes$strokeOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-opacity');
var _elm_lang$svg$Svg_Attributes$strokeMiterlimit = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-miterlimit');
var _elm_lang$svg$Svg_Attributes$strokeLinejoin = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linejoin');
var _elm_lang$svg$Svg_Attributes$strokeLinecap = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linecap');
var _elm_lang$svg$Svg_Attributes$strokeDashoffset = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dashoffset');
var _elm_lang$svg$Svg_Attributes$strokeDasharray = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dasharray');
var _elm_lang$svg$Svg_Attributes$stopOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stop-opacity');
var _elm_lang$svg$Svg_Attributes$stopColor = _elm_lang$virtual_dom$VirtualDom$attribute('stop-color');
var _elm_lang$svg$Svg_Attributes$shapeRendering = _elm_lang$virtual_dom$VirtualDom$attribute('shape-rendering');
var _elm_lang$svg$Svg_Attributes$pointerEvents = _elm_lang$virtual_dom$VirtualDom$attribute('pointer-events');
var _elm_lang$svg$Svg_Attributes$overflow = _elm_lang$virtual_dom$VirtualDom$attribute('overflow');
var _elm_lang$svg$Svg_Attributes$opacity = _elm_lang$virtual_dom$VirtualDom$attribute('opacity');
var _elm_lang$svg$Svg_Attributes$mask = _elm_lang$virtual_dom$VirtualDom$attribute('mask');
var _elm_lang$svg$Svg_Attributes$markerStart = _elm_lang$virtual_dom$VirtualDom$attribute('marker-start');
var _elm_lang$svg$Svg_Attributes$markerMid = _elm_lang$virtual_dom$VirtualDom$attribute('marker-mid');
var _elm_lang$svg$Svg_Attributes$markerEnd = _elm_lang$virtual_dom$VirtualDom$attribute('marker-end');
var _elm_lang$svg$Svg_Attributes$lightingColor = _elm_lang$virtual_dom$VirtualDom$attribute('lighting-color');
var _elm_lang$svg$Svg_Attributes$letterSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('letter-spacing');
var _elm_lang$svg$Svg_Attributes$kerning = _elm_lang$virtual_dom$VirtualDom$attribute('kerning');
var _elm_lang$svg$Svg_Attributes$imageRendering = _elm_lang$virtual_dom$VirtualDom$attribute('image-rendering');
var _elm_lang$svg$Svg_Attributes$glyphOrientationVertical = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-vertical');
var _elm_lang$svg$Svg_Attributes$glyphOrientationHorizontal = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-horizontal');
var _elm_lang$svg$Svg_Attributes$fontWeight = _elm_lang$virtual_dom$VirtualDom$attribute('font-weight');
var _elm_lang$svg$Svg_Attributes$fontVariant = _elm_lang$virtual_dom$VirtualDom$attribute('font-variant');
var _elm_lang$svg$Svg_Attributes$fontStyle = _elm_lang$virtual_dom$VirtualDom$attribute('font-style');
var _elm_lang$svg$Svg_Attributes$fontStretch = _elm_lang$virtual_dom$VirtualDom$attribute('font-stretch');
var _elm_lang$svg$Svg_Attributes$fontSize = _elm_lang$virtual_dom$VirtualDom$attribute('font-size');
var _elm_lang$svg$Svg_Attributes$fontSizeAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('font-size-adjust');
var _elm_lang$svg$Svg_Attributes$fontFamily = _elm_lang$virtual_dom$VirtualDom$attribute('font-family');
var _elm_lang$svg$Svg_Attributes$floodOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('flood-opacity');
var _elm_lang$svg$Svg_Attributes$floodColor = _elm_lang$virtual_dom$VirtualDom$attribute('flood-color');
var _elm_lang$svg$Svg_Attributes$filter = _elm_lang$virtual_dom$VirtualDom$attribute('filter');
var _elm_lang$svg$Svg_Attributes$fill = _elm_lang$virtual_dom$VirtualDom$attribute('fill');
var _elm_lang$svg$Svg_Attributes$fillRule = _elm_lang$virtual_dom$VirtualDom$attribute('fill-rule');
var _elm_lang$svg$Svg_Attributes$fillOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('fill-opacity');
var _elm_lang$svg$Svg_Attributes$enableBackground = _elm_lang$virtual_dom$VirtualDom$attribute('enable-background');
var _elm_lang$svg$Svg_Attributes$dominantBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('dominant-baseline');
var _elm_lang$svg$Svg_Attributes$display = _elm_lang$virtual_dom$VirtualDom$attribute('display');
var _elm_lang$svg$Svg_Attributes$direction = _elm_lang$virtual_dom$VirtualDom$attribute('direction');
var _elm_lang$svg$Svg_Attributes$cursor = _elm_lang$virtual_dom$VirtualDom$attribute('cursor');
var _elm_lang$svg$Svg_Attributes$color = _elm_lang$virtual_dom$VirtualDom$attribute('color');
var _elm_lang$svg$Svg_Attributes$colorRendering = _elm_lang$virtual_dom$VirtualDom$attribute('color-rendering');
var _elm_lang$svg$Svg_Attributes$colorProfile = _elm_lang$virtual_dom$VirtualDom$attribute('color-profile');
var _elm_lang$svg$Svg_Attributes$colorInterpolation = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation');
var _elm_lang$svg$Svg_Attributes$colorInterpolationFilters = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation-filters');
var _elm_lang$svg$Svg_Attributes$clip = _elm_lang$virtual_dom$VirtualDom$attribute('clip');
var _elm_lang$svg$Svg_Attributes$clipRule = _elm_lang$virtual_dom$VirtualDom$attribute('clip-rule');
var _elm_lang$svg$Svg_Attributes$clipPath = _elm_lang$virtual_dom$VirtualDom$attribute('clip-path');
var _elm_lang$svg$Svg_Attributes$baselineShift = _elm_lang$virtual_dom$VirtualDom$attribute('baseline-shift');
var _elm_lang$svg$Svg_Attributes$alignmentBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('alignment-baseline');
var _elm_lang$svg$Svg_Attributes$zoomAndPan = _elm_lang$virtual_dom$VirtualDom$attribute('zoomAndPan');
var _elm_lang$svg$Svg_Attributes$z = _elm_lang$virtual_dom$VirtualDom$attribute('z');
var _elm_lang$svg$Svg_Attributes$yChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('yChannelSelector');
var _elm_lang$svg$Svg_Attributes$y2 = _elm_lang$virtual_dom$VirtualDom$attribute('y2');
var _elm_lang$svg$Svg_Attributes$y1 = _elm_lang$virtual_dom$VirtualDom$attribute('y1');
var _elm_lang$svg$Svg_Attributes$y = _elm_lang$virtual_dom$VirtualDom$attribute('y');
var _elm_lang$svg$Svg_Attributes$xmlSpace = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var _elm_lang$svg$Svg_Attributes$xmlLang = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:lang');
var _elm_lang$svg$Svg_Attributes$xmlBase = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:base');
var _elm_lang$svg$Svg_Attributes$xlinkType = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:type');
var _elm_lang$svg$Svg_Attributes$xlinkTitle = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:title');
var _elm_lang$svg$Svg_Attributes$xlinkShow = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:show');
var _elm_lang$svg$Svg_Attributes$xlinkRole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:role');
var _elm_lang$svg$Svg_Attributes$xlinkHref = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:href');
var _elm_lang$svg$Svg_Attributes$xlinkArcrole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:arcrole');
var _elm_lang$svg$Svg_Attributes$xlinkActuate = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:actuate');
var _elm_lang$svg$Svg_Attributes$xChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('xChannelSelector');
var _elm_lang$svg$Svg_Attributes$x2 = _elm_lang$virtual_dom$VirtualDom$attribute('x2');
var _elm_lang$svg$Svg_Attributes$x1 = _elm_lang$virtual_dom$VirtualDom$attribute('x1');
var _elm_lang$svg$Svg_Attributes$xHeight = _elm_lang$virtual_dom$VirtualDom$attribute('x-height');
var _elm_lang$svg$Svg_Attributes$x = _elm_lang$virtual_dom$VirtualDom$attribute('x');
var _elm_lang$svg$Svg_Attributes$widths = _elm_lang$virtual_dom$VirtualDom$attribute('widths');
var _elm_lang$svg$Svg_Attributes$width = _elm_lang$virtual_dom$VirtualDom$attribute('width');
var _elm_lang$svg$Svg_Attributes$viewTarget = _elm_lang$virtual_dom$VirtualDom$attribute('viewTarget');
var _elm_lang$svg$Svg_Attributes$viewBox = _elm_lang$virtual_dom$VirtualDom$attribute('viewBox');
var _elm_lang$svg$Svg_Attributes$vertOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-y');
var _elm_lang$svg$Svg_Attributes$vertOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-x');
var _elm_lang$svg$Svg_Attributes$vertAdvY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-adv-y');
var _elm_lang$svg$Svg_Attributes$version = _elm_lang$virtual_dom$VirtualDom$attribute('version');
var _elm_lang$svg$Svg_Attributes$values = _elm_lang$virtual_dom$VirtualDom$attribute('values');
var _elm_lang$svg$Svg_Attributes$vMathematical = _elm_lang$virtual_dom$VirtualDom$attribute('v-mathematical');
var _elm_lang$svg$Svg_Attributes$vIdeographic = _elm_lang$virtual_dom$VirtualDom$attribute('v-ideographic');
var _elm_lang$svg$Svg_Attributes$vHanging = _elm_lang$virtual_dom$VirtualDom$attribute('v-hanging');
var _elm_lang$svg$Svg_Attributes$vAlphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('v-alphabetic');
var _elm_lang$svg$Svg_Attributes$unitsPerEm = _elm_lang$virtual_dom$VirtualDom$attribute('units-per-em');
var _elm_lang$svg$Svg_Attributes$unicodeRange = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-range');
var _elm_lang$svg$Svg_Attributes$unicode = _elm_lang$virtual_dom$VirtualDom$attribute('unicode');
var _elm_lang$svg$Svg_Attributes$underlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('underline-thickness');
var _elm_lang$svg$Svg_Attributes$underlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('underline-position');
var _elm_lang$svg$Svg_Attributes$u2 = _elm_lang$virtual_dom$VirtualDom$attribute('u2');
var _elm_lang$svg$Svg_Attributes$u1 = _elm_lang$virtual_dom$VirtualDom$attribute('u1');
var _elm_lang$svg$Svg_Attributes$type_ = _elm_lang$virtual_dom$VirtualDom$attribute('type');
var _elm_lang$svg$Svg_Attributes$transform = _elm_lang$virtual_dom$VirtualDom$attribute('transform');
var _elm_lang$svg$Svg_Attributes$to = _elm_lang$virtual_dom$VirtualDom$attribute('to');
var _elm_lang$svg$Svg_Attributes$title = _elm_lang$virtual_dom$VirtualDom$attribute('title');
var _elm_lang$svg$Svg_Attributes$textLength = _elm_lang$virtual_dom$VirtualDom$attribute('textLength');
var _elm_lang$svg$Svg_Attributes$targetY = _elm_lang$virtual_dom$VirtualDom$attribute('targetY');
var _elm_lang$svg$Svg_Attributes$targetX = _elm_lang$virtual_dom$VirtualDom$attribute('targetX');
var _elm_lang$svg$Svg_Attributes$target = _elm_lang$virtual_dom$VirtualDom$attribute('target');
var _elm_lang$svg$Svg_Attributes$tableValues = _elm_lang$virtual_dom$VirtualDom$attribute('tableValues');
var _elm_lang$svg$Svg_Attributes$systemLanguage = _elm_lang$virtual_dom$VirtualDom$attribute('systemLanguage');
var _elm_lang$svg$Svg_Attributes$surfaceScale = _elm_lang$virtual_dom$VirtualDom$attribute('surfaceScale');
var _elm_lang$svg$Svg_Attributes$style = _elm_lang$virtual_dom$VirtualDom$attribute('style');
var _elm_lang$svg$Svg_Attributes$string = _elm_lang$virtual_dom$VirtualDom$attribute('string');
var _elm_lang$svg$Svg_Attributes$strikethroughThickness = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-thickness');
var _elm_lang$svg$Svg_Attributes$strikethroughPosition = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-position');
var _elm_lang$svg$Svg_Attributes$stitchTiles = _elm_lang$virtual_dom$VirtualDom$attribute('stitchTiles');
var _elm_lang$svg$Svg_Attributes$stemv = _elm_lang$virtual_dom$VirtualDom$attribute('stemv');
var _elm_lang$svg$Svg_Attributes$stemh = _elm_lang$virtual_dom$VirtualDom$attribute('stemh');
var _elm_lang$svg$Svg_Attributes$stdDeviation = _elm_lang$virtual_dom$VirtualDom$attribute('stdDeviation');
var _elm_lang$svg$Svg_Attributes$startOffset = _elm_lang$virtual_dom$VirtualDom$attribute('startOffset');
var _elm_lang$svg$Svg_Attributes$spreadMethod = _elm_lang$virtual_dom$VirtualDom$attribute('spreadMethod');
var _elm_lang$svg$Svg_Attributes$speed = _elm_lang$virtual_dom$VirtualDom$attribute('speed');
var _elm_lang$svg$Svg_Attributes$specularExponent = _elm_lang$virtual_dom$VirtualDom$attribute('specularExponent');
var _elm_lang$svg$Svg_Attributes$specularConstant = _elm_lang$virtual_dom$VirtualDom$attribute('specularConstant');
var _elm_lang$svg$Svg_Attributes$spacing = _elm_lang$virtual_dom$VirtualDom$attribute('spacing');
var _elm_lang$svg$Svg_Attributes$slope = _elm_lang$virtual_dom$VirtualDom$attribute('slope');
var _elm_lang$svg$Svg_Attributes$seed = _elm_lang$virtual_dom$VirtualDom$attribute('seed');
var _elm_lang$svg$Svg_Attributes$scale = _elm_lang$virtual_dom$VirtualDom$attribute('scale');
var _elm_lang$svg$Svg_Attributes$ry = _elm_lang$virtual_dom$VirtualDom$attribute('ry');
var _elm_lang$svg$Svg_Attributes$rx = _elm_lang$virtual_dom$VirtualDom$attribute('rx');
var _elm_lang$svg$Svg_Attributes$rotate = _elm_lang$virtual_dom$VirtualDom$attribute('rotate');
var _elm_lang$svg$Svg_Attributes$result = _elm_lang$virtual_dom$VirtualDom$attribute('result');
var _elm_lang$svg$Svg_Attributes$restart = _elm_lang$virtual_dom$VirtualDom$attribute('restart');
var _elm_lang$svg$Svg_Attributes$requiredFeatures = _elm_lang$virtual_dom$VirtualDom$attribute('requiredFeatures');
var _elm_lang$svg$Svg_Attributes$requiredExtensions = _elm_lang$virtual_dom$VirtualDom$attribute('requiredExtensions');
var _elm_lang$svg$Svg_Attributes$repeatDur = _elm_lang$virtual_dom$VirtualDom$attribute('repeatDur');
var _elm_lang$svg$Svg_Attributes$repeatCount = _elm_lang$virtual_dom$VirtualDom$attribute('repeatCount');
var _elm_lang$svg$Svg_Attributes$renderingIntent = _elm_lang$virtual_dom$VirtualDom$attribute('rendering-intent');
var _elm_lang$svg$Svg_Attributes$refY = _elm_lang$virtual_dom$VirtualDom$attribute('refY');
var _elm_lang$svg$Svg_Attributes$refX = _elm_lang$virtual_dom$VirtualDom$attribute('refX');
var _elm_lang$svg$Svg_Attributes$radius = _elm_lang$virtual_dom$VirtualDom$attribute('radius');
var _elm_lang$svg$Svg_Attributes$r = _elm_lang$virtual_dom$VirtualDom$attribute('r');
var _elm_lang$svg$Svg_Attributes$primitiveUnits = _elm_lang$virtual_dom$VirtualDom$attribute('primitiveUnits');
var _elm_lang$svg$Svg_Attributes$preserveAspectRatio = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAspectRatio');
var _elm_lang$svg$Svg_Attributes$preserveAlpha = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAlpha');
var _elm_lang$svg$Svg_Attributes$pointsAtZ = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtZ');
var _elm_lang$svg$Svg_Attributes$pointsAtY = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtY');
var _elm_lang$svg$Svg_Attributes$pointsAtX = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtX');
var _elm_lang$svg$Svg_Attributes$points = _elm_lang$virtual_dom$VirtualDom$attribute('points');
var _elm_lang$svg$Svg_Attributes$pointOrder = _elm_lang$virtual_dom$VirtualDom$attribute('point-order');
var _elm_lang$svg$Svg_Attributes$patternUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternUnits');
var _elm_lang$svg$Svg_Attributes$patternTransform = _elm_lang$virtual_dom$VirtualDom$attribute('patternTransform');
var _elm_lang$svg$Svg_Attributes$patternContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternContentUnits');
var _elm_lang$svg$Svg_Attributes$pathLength = _elm_lang$virtual_dom$VirtualDom$attribute('pathLength');
var _elm_lang$svg$Svg_Attributes$path = _elm_lang$virtual_dom$VirtualDom$attribute('path');
var _elm_lang$svg$Svg_Attributes$panose1 = _elm_lang$virtual_dom$VirtualDom$attribute('panose-1');
var _elm_lang$svg$Svg_Attributes$overlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('overline-thickness');
var _elm_lang$svg$Svg_Attributes$overlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('overline-position');
var _elm_lang$svg$Svg_Attributes$origin = _elm_lang$virtual_dom$VirtualDom$attribute('origin');
var _elm_lang$svg$Svg_Attributes$orientation = _elm_lang$virtual_dom$VirtualDom$attribute('orientation');
var _elm_lang$svg$Svg_Attributes$orient = _elm_lang$virtual_dom$VirtualDom$attribute('orient');
var _elm_lang$svg$Svg_Attributes$order = _elm_lang$virtual_dom$VirtualDom$attribute('order');
var _elm_lang$svg$Svg_Attributes$operator = _elm_lang$virtual_dom$VirtualDom$attribute('operator');
var _elm_lang$svg$Svg_Attributes$offset = _elm_lang$virtual_dom$VirtualDom$attribute('offset');
var _elm_lang$svg$Svg_Attributes$numOctaves = _elm_lang$virtual_dom$VirtualDom$attribute('numOctaves');
var _elm_lang$svg$Svg_Attributes$name = _elm_lang$virtual_dom$VirtualDom$attribute('name');
var _elm_lang$svg$Svg_Attributes$mode = _elm_lang$virtual_dom$VirtualDom$attribute('mode');
var _elm_lang$svg$Svg_Attributes$min = _elm_lang$virtual_dom$VirtualDom$attribute('min');
var _elm_lang$svg$Svg_Attributes$method = _elm_lang$virtual_dom$VirtualDom$attribute('method');
var _elm_lang$svg$Svg_Attributes$media = _elm_lang$virtual_dom$VirtualDom$attribute('media');
var _elm_lang$svg$Svg_Attributes$max = _elm_lang$virtual_dom$VirtualDom$attribute('max');
var _elm_lang$svg$Svg_Attributes$mathematical = _elm_lang$virtual_dom$VirtualDom$attribute('mathematical');
var _elm_lang$svg$Svg_Attributes$maskUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskUnits');
var _elm_lang$svg$Svg_Attributes$maskContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskContentUnits');
var _elm_lang$svg$Svg_Attributes$markerWidth = _elm_lang$virtual_dom$VirtualDom$attribute('markerWidth');
var _elm_lang$svg$Svg_Attributes$markerUnits = _elm_lang$virtual_dom$VirtualDom$attribute('markerUnits');
var _elm_lang$svg$Svg_Attributes$markerHeight = _elm_lang$virtual_dom$VirtualDom$attribute('markerHeight');
var _elm_lang$svg$Svg_Attributes$local = _elm_lang$virtual_dom$VirtualDom$attribute('local');
var _elm_lang$svg$Svg_Attributes$limitingConeAngle = _elm_lang$virtual_dom$VirtualDom$attribute('limitingConeAngle');
var _elm_lang$svg$Svg_Attributes$lengthAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('lengthAdjust');
var _elm_lang$svg$Svg_Attributes$lang = _elm_lang$virtual_dom$VirtualDom$attribute('lang');
var _elm_lang$svg$Svg_Attributes$keyTimes = _elm_lang$virtual_dom$VirtualDom$attribute('keyTimes');
var _elm_lang$svg$Svg_Attributes$keySplines = _elm_lang$virtual_dom$VirtualDom$attribute('keySplines');
var _elm_lang$svg$Svg_Attributes$keyPoints = _elm_lang$virtual_dom$VirtualDom$attribute('keyPoints');
var _elm_lang$svg$Svg_Attributes$kernelUnitLength = _elm_lang$virtual_dom$VirtualDom$attribute('kernelUnitLength');
var _elm_lang$svg$Svg_Attributes$kernelMatrix = _elm_lang$virtual_dom$VirtualDom$attribute('kernelMatrix');
var _elm_lang$svg$Svg_Attributes$k4 = _elm_lang$virtual_dom$VirtualDom$attribute('k4');
var _elm_lang$svg$Svg_Attributes$k3 = _elm_lang$virtual_dom$VirtualDom$attribute('k3');
var _elm_lang$svg$Svg_Attributes$k2 = _elm_lang$virtual_dom$VirtualDom$attribute('k2');
var _elm_lang$svg$Svg_Attributes$k1 = _elm_lang$virtual_dom$VirtualDom$attribute('k1');
var _elm_lang$svg$Svg_Attributes$k = _elm_lang$virtual_dom$VirtualDom$attribute('k');
var _elm_lang$svg$Svg_Attributes$intercept = _elm_lang$virtual_dom$VirtualDom$attribute('intercept');
var _elm_lang$svg$Svg_Attributes$in2 = _elm_lang$virtual_dom$VirtualDom$attribute('in2');
var _elm_lang$svg$Svg_Attributes$in_ = _elm_lang$virtual_dom$VirtualDom$attribute('in');
var _elm_lang$svg$Svg_Attributes$ideographic = _elm_lang$virtual_dom$VirtualDom$attribute('ideographic');
var _elm_lang$svg$Svg_Attributes$id = _elm_lang$virtual_dom$VirtualDom$attribute('id');
var _elm_lang$svg$Svg_Attributes$horizOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-y');
var _elm_lang$svg$Svg_Attributes$horizOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-x');
var _elm_lang$svg$Svg_Attributes$horizAdvX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-adv-x');
var _elm_lang$svg$Svg_Attributes$height = _elm_lang$virtual_dom$VirtualDom$attribute('height');
var _elm_lang$svg$Svg_Attributes$hanging = _elm_lang$virtual_dom$VirtualDom$attribute('hanging');
var _elm_lang$svg$Svg_Attributes$gradientUnits = _elm_lang$virtual_dom$VirtualDom$attribute('gradientUnits');
var _elm_lang$svg$Svg_Attributes$gradientTransform = _elm_lang$virtual_dom$VirtualDom$attribute('gradientTransform');
var _elm_lang$svg$Svg_Attributes$glyphRef = _elm_lang$virtual_dom$VirtualDom$attribute('glyphRef');
var _elm_lang$svg$Svg_Attributes$glyphName = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-name');
var _elm_lang$svg$Svg_Attributes$g2 = _elm_lang$virtual_dom$VirtualDom$attribute('g2');
var _elm_lang$svg$Svg_Attributes$g1 = _elm_lang$virtual_dom$VirtualDom$attribute('g1');
var _elm_lang$svg$Svg_Attributes$fy = _elm_lang$virtual_dom$VirtualDom$attribute('fy');
var _elm_lang$svg$Svg_Attributes$fx = _elm_lang$virtual_dom$VirtualDom$attribute('fx');
var _elm_lang$svg$Svg_Attributes$from = _elm_lang$virtual_dom$VirtualDom$attribute('from');
var _elm_lang$svg$Svg_Attributes$format = _elm_lang$virtual_dom$VirtualDom$attribute('format');
var _elm_lang$svg$Svg_Attributes$filterUnits = _elm_lang$virtual_dom$VirtualDom$attribute('filterUnits');
var _elm_lang$svg$Svg_Attributes$filterRes = _elm_lang$virtual_dom$VirtualDom$attribute('filterRes');
var _elm_lang$svg$Svg_Attributes$externalResourcesRequired = _elm_lang$virtual_dom$VirtualDom$attribute('externalResourcesRequired');
var _elm_lang$svg$Svg_Attributes$exponent = _elm_lang$virtual_dom$VirtualDom$attribute('exponent');
var _elm_lang$svg$Svg_Attributes$end = _elm_lang$virtual_dom$VirtualDom$attribute('end');
var _elm_lang$svg$Svg_Attributes$elevation = _elm_lang$virtual_dom$VirtualDom$attribute('elevation');
var _elm_lang$svg$Svg_Attributes$edgeMode = _elm_lang$virtual_dom$VirtualDom$attribute('edgeMode');
var _elm_lang$svg$Svg_Attributes$dy = _elm_lang$virtual_dom$VirtualDom$attribute('dy');
var _elm_lang$svg$Svg_Attributes$dx = _elm_lang$virtual_dom$VirtualDom$attribute('dx');
var _elm_lang$svg$Svg_Attributes$dur = _elm_lang$virtual_dom$VirtualDom$attribute('dur');
var _elm_lang$svg$Svg_Attributes$divisor = _elm_lang$virtual_dom$VirtualDom$attribute('divisor');
var _elm_lang$svg$Svg_Attributes$diffuseConstant = _elm_lang$virtual_dom$VirtualDom$attribute('diffuseConstant');
var _elm_lang$svg$Svg_Attributes$descent = _elm_lang$virtual_dom$VirtualDom$attribute('descent');
var _elm_lang$svg$Svg_Attributes$decelerate = _elm_lang$virtual_dom$VirtualDom$attribute('decelerate');
var _elm_lang$svg$Svg_Attributes$d = _elm_lang$virtual_dom$VirtualDom$attribute('d');
var _elm_lang$svg$Svg_Attributes$cy = _elm_lang$virtual_dom$VirtualDom$attribute('cy');
var _elm_lang$svg$Svg_Attributes$cx = _elm_lang$virtual_dom$VirtualDom$attribute('cx');
var _elm_lang$svg$Svg_Attributes$contentStyleType = _elm_lang$virtual_dom$VirtualDom$attribute('contentStyleType');
var _elm_lang$svg$Svg_Attributes$contentScriptType = _elm_lang$virtual_dom$VirtualDom$attribute('contentScriptType');
var _elm_lang$svg$Svg_Attributes$clipPathUnits = _elm_lang$virtual_dom$VirtualDom$attribute('clipPathUnits');
var _elm_lang$svg$Svg_Attributes$class = _elm_lang$virtual_dom$VirtualDom$attribute('class');
var _elm_lang$svg$Svg_Attributes$capHeight = _elm_lang$virtual_dom$VirtualDom$attribute('cap-height');
var _elm_lang$svg$Svg_Attributes$calcMode = _elm_lang$virtual_dom$VirtualDom$attribute('calcMode');
var _elm_lang$svg$Svg_Attributes$by = _elm_lang$virtual_dom$VirtualDom$attribute('by');
var _elm_lang$svg$Svg_Attributes$bias = _elm_lang$virtual_dom$VirtualDom$attribute('bias');
var _elm_lang$svg$Svg_Attributes$begin = _elm_lang$virtual_dom$VirtualDom$attribute('begin');
var _elm_lang$svg$Svg_Attributes$bbox = _elm_lang$virtual_dom$VirtualDom$attribute('bbox');
var _elm_lang$svg$Svg_Attributes$baseProfile = _elm_lang$virtual_dom$VirtualDom$attribute('baseProfile');
var _elm_lang$svg$Svg_Attributes$baseFrequency = _elm_lang$virtual_dom$VirtualDom$attribute('baseFrequency');
var _elm_lang$svg$Svg_Attributes$azimuth = _elm_lang$virtual_dom$VirtualDom$attribute('azimuth');
var _elm_lang$svg$Svg_Attributes$autoReverse = _elm_lang$virtual_dom$VirtualDom$attribute('autoReverse');
var _elm_lang$svg$Svg_Attributes$attributeType = _elm_lang$virtual_dom$VirtualDom$attribute('attributeType');
var _elm_lang$svg$Svg_Attributes$attributeName = _elm_lang$virtual_dom$VirtualDom$attribute('attributeName');
var _elm_lang$svg$Svg_Attributes$ascent = _elm_lang$virtual_dom$VirtualDom$attribute('ascent');
var _elm_lang$svg$Svg_Attributes$arabicForm = _elm_lang$virtual_dom$VirtualDom$attribute('arabic-form');
var _elm_lang$svg$Svg_Attributes$amplitude = _elm_lang$virtual_dom$VirtualDom$attribute('amplitude');
var _elm_lang$svg$Svg_Attributes$allowReorder = _elm_lang$virtual_dom$VirtualDom$attribute('allowReorder');
var _elm_lang$svg$Svg_Attributes$alphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('alphabetic');
var _elm_lang$svg$Svg_Attributes$additive = _elm_lang$virtual_dom$VirtualDom$attribute('additive');
var _elm_lang$svg$Svg_Attributes$accumulate = _elm_lang$virtual_dom$VirtualDom$attribute('accumulate');
var _elm_lang$svg$Svg_Attributes$accelerate = _elm_lang$virtual_dom$VirtualDom$attribute('accelerate');
var _elm_lang$svg$Svg_Attributes$accentHeight = _elm_lang$virtual_dom$VirtualDom$attribute('accent-height');

var _elm_lang$window$Native_Window = function()
{

var size = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)	{
	callback(_elm_lang$core$Native_Scheduler.succeed({
		width: window.innerWidth,
		height: window.innerHeight
	}));
});

return {
	size: size
};

}();
var _elm_lang$window$Window_ops = _elm_lang$window$Window_ops || {};
_elm_lang$window$Window_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p0) {
				return task2;
			},
			task1);
	});
var _elm_lang$window$Window$onSelfMsg = F3(
	function (router, dimensions, state) {
		var _p1 = state;
		if (_p1.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (_p2) {
				var _p3 = _p2;
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p3._0(dimensions));
			};
			return A2(
				_elm_lang$window$Window_ops['&>'],
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p1._0.subs)),
				_elm_lang$core$Task$succeed(state));
		}
	});
var _elm_lang$window$Window$init = _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
var _elm_lang$window$Window$size = _elm_lang$window$Native_Window.size;
var _elm_lang$window$Window$width = A2(
	_elm_lang$core$Task$map,
	function (_) {
		return _.width;
	},
	_elm_lang$window$Window$size);
var _elm_lang$window$Window$height = A2(
	_elm_lang$core$Task$map,
	function (_) {
		return _.height;
	},
	_elm_lang$window$Window$size);
var _elm_lang$window$Window$onEffects = F3(
	function (router, newSubs, oldState) {
		var _p4 = {ctor: '_Tuple2', _0: oldState, _1: newSubs};
		if (_p4._0.ctor === 'Nothing') {
			if (_p4._1.ctor === '[]') {
				return _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
			} else {
				return A2(
					_elm_lang$core$Task$andThen,
					function (pid) {
						return _elm_lang$core$Task$succeed(
							_elm_lang$core$Maybe$Just(
								{subs: newSubs, pid: pid}));
					},
					_elm_lang$core$Process$spawn(
						A3(
							_elm_lang$dom$Dom_LowLevel$onWindow,
							'resize',
							_elm_lang$core$Json_Decode$succeed(
								{ctor: '_Tuple0'}),
							function (_p5) {
								return A2(
									_elm_lang$core$Task$andThen,
									_elm_lang$core$Platform$sendToSelf(router),
									_elm_lang$window$Window$size);
							})));
			}
		} else {
			if (_p4._1.ctor === '[]') {
				return A2(
					_elm_lang$window$Window_ops['&>'],
					_elm_lang$core$Process$kill(_p4._0._0.pid),
					_elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing));
			} else {
				return _elm_lang$core$Task$succeed(
					_elm_lang$core$Maybe$Just(
						{subs: newSubs, pid: _p4._0._0.pid}));
			}
		}
	});
var _elm_lang$window$Window$subscription = _elm_lang$core$Native_Platform.leaf('Window');
var _elm_lang$window$Window$Size = F2(
	function (a, b) {
		return {width: a, height: b};
	});
var _elm_lang$window$Window$MySub = function (a) {
	return {ctor: 'MySub', _0: a};
};
var _elm_lang$window$Window$resizes = function (tagger) {
	return _elm_lang$window$Window$subscription(
		_elm_lang$window$Window$MySub(tagger));
};
var _elm_lang$window$Window$subMap = F2(
	function (func, _p6) {
		var _p7 = _p6;
		return _elm_lang$window$Window$MySub(
			function (_p8) {
				return func(
					_p7._0(_p8));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Window'] = {pkg: 'elm-lang/window', init: _elm_lang$window$Window$init, onEffects: _elm_lang$window$Window$onEffects, onSelfMsg: _elm_lang$window$Window$onSelfMsg, tag: 'sub', subMap: _elm_lang$window$Window$subMap};

var _evancz$url_parser$UrlParser$toKeyValuePair = function (segment) {
	var _p0 = A2(_elm_lang$core$String$split, '=', segment);
	if (((_p0.ctor === '::') && (_p0._1.ctor === '::')) && (_p0._1._1.ctor === '[]')) {
		return A3(
			_elm_lang$core$Maybe$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			_elm_lang$http$Http$decodeUri(_p0._0),
			_elm_lang$http$Http$decodeUri(_p0._1._0));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _evancz$url_parser$UrlParser$parseParams = function (queryString) {
	return _elm_lang$core$Dict$fromList(
		A2(
			_elm_lang$core$List$filterMap,
			_evancz$url_parser$UrlParser$toKeyValuePair,
			A2(
				_elm_lang$core$String$split,
				'&',
				A2(_elm_lang$core$String$dropLeft, 1, queryString))));
};
var _evancz$url_parser$UrlParser$splitUrl = function (url) {
	var _p1 = A2(_elm_lang$core$String$split, '/', url);
	if ((_p1.ctor === '::') && (_p1._0 === '')) {
		return _p1._1;
	} else {
		return _p1;
	}
};
var _evancz$url_parser$UrlParser$parseHelp = function (states) {
	parseHelp:
	while (true) {
		var _p2 = states;
		if (_p2.ctor === '[]') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var _p4 = _p2._0;
			var _p3 = _p4.unvisited;
			if (_p3.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p4.value);
			} else {
				if ((_p3._0 === '') && (_p3._1.ctor === '[]')) {
					return _elm_lang$core$Maybe$Just(_p4.value);
				} else {
					var _v4 = _p2._1;
					states = _v4;
					continue parseHelp;
				}
			}
		}
	}
};
var _evancz$url_parser$UrlParser$parse = F3(
	function (_p5, url, params) {
		var _p6 = _p5;
		return _evancz$url_parser$UrlParser$parseHelp(
			_p6._0(
				{
					visited: {ctor: '[]'},
					unvisited: _evancz$url_parser$UrlParser$splitUrl(url),
					params: params,
					value: _elm_lang$core$Basics$identity
				}));
	});
var _evancz$url_parser$UrlParser$parseHash = F2(
	function (parser, location) {
		return A3(
			_evancz$url_parser$UrlParser$parse,
			parser,
			A2(_elm_lang$core$String$dropLeft, 1, location.hash),
			_evancz$url_parser$UrlParser$parseParams(location.search));
	});
var _evancz$url_parser$UrlParser$parsePath = F2(
	function (parser, location) {
		return A3(
			_evancz$url_parser$UrlParser$parse,
			parser,
			location.pathname,
			_evancz$url_parser$UrlParser$parseParams(location.search));
	});
var _evancz$url_parser$UrlParser$intParamHelp = function (maybeValue) {
	var _p7 = maybeValue;
	if (_p7.ctor === 'Nothing') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Result$toMaybe(
			_elm_lang$core$String$toInt(_p7._0));
	}
};
var _evancz$url_parser$UrlParser$mapHelp = F2(
	function (func, _p8) {
		var _p9 = _p8;
		return {
			visited: _p9.visited,
			unvisited: _p9.unvisited,
			params: _p9.params,
			value: func(_p9.value)
		};
	});
var _evancz$url_parser$UrlParser$State = F4(
	function (a, b, c, d) {
		return {visited: a, unvisited: b, params: c, value: d};
	});
var _evancz$url_parser$UrlParser$Parser = function (a) {
	return {ctor: 'Parser', _0: a};
};
var _evancz$url_parser$UrlParser$s = function (str) {
	return _evancz$url_parser$UrlParser$Parser(
		function (_p10) {
			var _p11 = _p10;
			var _p12 = _p11.unvisited;
			if (_p12.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				var _p13 = _p12._0;
				return _elm_lang$core$Native_Utils.eq(_p13, str) ? {
					ctor: '::',
					_0: A4(
						_evancz$url_parser$UrlParser$State,
						{ctor: '::', _0: _p13, _1: _p11.visited},
						_p12._1,
						_p11.params,
						_p11.value),
					_1: {ctor: '[]'}
				} : {ctor: '[]'};
			}
		});
};
var _evancz$url_parser$UrlParser$custom = F2(
	function (tipe, stringToSomething) {
		return _evancz$url_parser$UrlParser$Parser(
			function (_p14) {
				var _p15 = _p14;
				var _p16 = _p15.unvisited;
				if (_p16.ctor === '[]') {
					return {ctor: '[]'};
				} else {
					var _p18 = _p16._0;
					var _p17 = stringToSomething(_p18);
					if (_p17.ctor === 'Ok') {
						return {
							ctor: '::',
							_0: A4(
								_evancz$url_parser$UrlParser$State,
								{ctor: '::', _0: _p18, _1: _p15.visited},
								_p16._1,
								_p15.params,
								_p15.value(_p17._0)),
							_1: {ctor: '[]'}
						};
					} else {
						return {ctor: '[]'};
					}
				}
			});
	});
var _evancz$url_parser$UrlParser$string = A2(_evancz$url_parser$UrlParser$custom, 'STRING', _elm_lang$core$Result$Ok);
var _evancz$url_parser$UrlParser$int = A2(_evancz$url_parser$UrlParser$custom, 'NUMBER', _elm_lang$core$String$toInt);
var _evancz$url_parser$UrlParser_ops = _evancz$url_parser$UrlParser_ops || {};
_evancz$url_parser$UrlParser_ops['</>'] = F2(
	function (_p20, _p19) {
		var _p21 = _p20;
		var _p22 = _p19;
		return _evancz$url_parser$UrlParser$Parser(
			function (state) {
				return A2(
					_elm_lang$core$List$concatMap,
					_p22._0,
					_p21._0(state));
			});
	});
var _evancz$url_parser$UrlParser$map = F2(
	function (subValue, _p23) {
		var _p24 = _p23;
		return _evancz$url_parser$UrlParser$Parser(
			function (_p25) {
				var _p26 = _p25;
				return A2(
					_elm_lang$core$List$map,
					_evancz$url_parser$UrlParser$mapHelp(_p26.value),
					_p24._0(
						{visited: _p26.visited, unvisited: _p26.unvisited, params: _p26.params, value: subValue}));
			});
	});
var _evancz$url_parser$UrlParser$oneOf = function (parsers) {
	return _evancz$url_parser$UrlParser$Parser(
		function (state) {
			return A2(
				_elm_lang$core$List$concatMap,
				function (_p27) {
					var _p28 = _p27;
					return _p28._0(state);
				},
				parsers);
		});
};
var _evancz$url_parser$UrlParser$top = _evancz$url_parser$UrlParser$Parser(
	function (state) {
		return {
			ctor: '::',
			_0: state,
			_1: {ctor: '[]'}
		};
	});
var _evancz$url_parser$UrlParser_ops = _evancz$url_parser$UrlParser_ops || {};
_evancz$url_parser$UrlParser_ops['<?>'] = F2(
	function (_p30, _p29) {
		var _p31 = _p30;
		var _p32 = _p29;
		return _evancz$url_parser$UrlParser$Parser(
			function (state) {
				return A2(
					_elm_lang$core$List$concatMap,
					_p32._0,
					_p31._0(state));
			});
	});
var _evancz$url_parser$UrlParser$QueryParser = function (a) {
	return {ctor: 'QueryParser', _0: a};
};
var _evancz$url_parser$UrlParser$customParam = F2(
	function (key, func) {
		return _evancz$url_parser$UrlParser$QueryParser(
			function (_p33) {
				var _p34 = _p33;
				var _p35 = _p34.params;
				return {
					ctor: '::',
					_0: A4(
						_evancz$url_parser$UrlParser$State,
						_p34.visited,
						_p34.unvisited,
						_p35,
						_p34.value(
							func(
								A2(_elm_lang$core$Dict$get, key, _p35)))),
					_1: {ctor: '[]'}
				};
			});
	});
var _evancz$url_parser$UrlParser$stringParam = function (name) {
	return A2(_evancz$url_parser$UrlParser$customParam, name, _elm_lang$core$Basics$identity);
};
var _evancz$url_parser$UrlParser$intParam = function (name) {
	return A2(_evancz$url_parser$UrlParser$customParam, name, _evancz$url_parser$UrlParser$intParamHelp);
};

var _krisajenkins$remotedata$RemoteData$isNotAsked = function (data) {
	var _p0 = data;
	if (_p0.ctor === 'NotAsked') {
		return true;
	} else {
		return false;
	}
};
var _krisajenkins$remotedata$RemoteData$isLoading = function (data) {
	var _p1 = data;
	if (_p1.ctor === 'Loading') {
		return true;
	} else {
		return false;
	}
};
var _krisajenkins$remotedata$RemoteData$isFailure = function (data) {
	var _p2 = data;
	if (_p2.ctor === 'Failure') {
		return true;
	} else {
		return false;
	}
};
var _krisajenkins$remotedata$RemoteData$isSuccess = function (data) {
	var _p3 = data;
	if (_p3.ctor === 'Success') {
		return true;
	} else {
		return false;
	}
};
var _krisajenkins$remotedata$RemoteData$withDefault = F2(
	function ($default, data) {
		var _p4 = data;
		if (_p4.ctor === 'Success') {
			return _p4._0;
		} else {
			return $default;
		}
	});
var _krisajenkins$remotedata$RemoteData$Success = function (a) {
	return {ctor: 'Success', _0: a};
};
var _krisajenkins$remotedata$RemoteData$succeed = _krisajenkins$remotedata$RemoteData$Success;
var _krisajenkins$remotedata$RemoteData$prism = {
	reverseGet: _krisajenkins$remotedata$RemoteData$Success,
	getOption: function (data) {
		var _p5 = data;
		if (_p5.ctor === 'Success') {
			return _elm_lang$core$Maybe$Just(_p5._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	}
};
var _krisajenkins$remotedata$RemoteData$Failure = function (a) {
	return {ctor: 'Failure', _0: a};
};
var _krisajenkins$remotedata$RemoteData$fromResult = function (result) {
	var _p6 = result;
	if (_p6.ctor === 'Err') {
		return _krisajenkins$remotedata$RemoteData$Failure(_p6._0);
	} else {
		return _krisajenkins$remotedata$RemoteData$Success(_p6._0);
	}
};
var _krisajenkins$remotedata$RemoteData$asCmd = _elm_lang$core$Task$attempt(_krisajenkins$remotedata$RemoteData$fromResult);
var _krisajenkins$remotedata$RemoteData$sendRequest = _elm_lang$http$Http$send(_krisajenkins$remotedata$RemoteData$fromResult);
var _krisajenkins$remotedata$RemoteData$fromTask = function (_p7) {
	return A2(
		_elm_lang$core$Task$onError,
		function (_p8) {
			return _elm_lang$core$Task$succeed(
				_krisajenkins$remotedata$RemoteData$Failure(_p8));
		},
		A2(_elm_lang$core$Task$map, _krisajenkins$remotedata$RemoteData$Success, _p7));
};
var _krisajenkins$remotedata$RemoteData$Loading = {ctor: 'Loading'};
var _krisajenkins$remotedata$RemoteData$NotAsked = {ctor: 'NotAsked'};
var _krisajenkins$remotedata$RemoteData$map = F2(
	function (f, data) {
		var _p9 = data;
		switch (_p9.ctor) {
			case 'Success':
				return _krisajenkins$remotedata$RemoteData$Success(
					f(_p9._0));
			case 'Loading':
				return _krisajenkins$remotedata$RemoteData$Loading;
			case 'NotAsked':
				return _krisajenkins$remotedata$RemoteData$NotAsked;
			default:
				return _krisajenkins$remotedata$RemoteData$Failure(_p9._0);
		}
	});
var _krisajenkins$remotedata$RemoteData$toMaybe = function (_p10) {
	return A2(
		_krisajenkins$remotedata$RemoteData$withDefault,
		_elm_lang$core$Maybe$Nothing,
		A2(_krisajenkins$remotedata$RemoteData$map, _elm_lang$core$Maybe$Just, _p10));
};
var _krisajenkins$remotedata$RemoteData$mapError = F2(
	function (f, data) {
		var _p11 = data;
		switch (_p11.ctor) {
			case 'Success':
				return _krisajenkins$remotedata$RemoteData$Success(_p11._0);
			case 'Failure':
				return _krisajenkins$remotedata$RemoteData$Failure(
					f(_p11._0));
			case 'Loading':
				return _krisajenkins$remotedata$RemoteData$Loading;
			default:
				return _krisajenkins$remotedata$RemoteData$NotAsked;
		}
	});
var _krisajenkins$remotedata$RemoteData$mapBoth = F2(
	function (successFn, errorFn) {
		return function (_p12) {
			return A2(
				_krisajenkins$remotedata$RemoteData$mapError,
				errorFn,
				A2(_krisajenkins$remotedata$RemoteData$map, successFn, _p12));
		};
	});
var _krisajenkins$remotedata$RemoteData$andThen = F2(
	function (f, data) {
		var _p13 = data;
		switch (_p13.ctor) {
			case 'Success':
				return f(_p13._0);
			case 'Failure':
				return _krisajenkins$remotedata$RemoteData$Failure(_p13._0);
			case 'NotAsked':
				return _krisajenkins$remotedata$RemoteData$NotAsked;
			default:
				return _krisajenkins$remotedata$RemoteData$Loading;
		}
	});
var _krisajenkins$remotedata$RemoteData$andMap = F2(
	function (wrappedValue, wrappedFunction) {
		var _p14 = wrappedFunction;
		switch (_p14.ctor) {
			case 'Success':
				return A2(_krisajenkins$remotedata$RemoteData$map, _p14._0, wrappedValue);
			case 'Failure':
				return _krisajenkins$remotedata$RemoteData$Failure(_p14._0);
			case 'Loading':
				return _krisajenkins$remotedata$RemoteData$Loading;
			default:
				return _krisajenkins$remotedata$RemoteData$NotAsked;
		}
	});
var _krisajenkins$remotedata$RemoteData$map2 = F3(
	function (f, a, b) {
		return A2(
			_krisajenkins$remotedata$RemoteData$andMap,
			b,
			A2(_krisajenkins$remotedata$RemoteData$map, f, a));
	});
var _krisajenkins$remotedata$RemoteData$map3 = F4(
	function (f, a, b, c) {
		return A2(
			_krisajenkins$remotedata$RemoteData$andMap,
			c,
			A2(
				_krisajenkins$remotedata$RemoteData$andMap,
				b,
				A2(_krisajenkins$remotedata$RemoteData$map, f, a)));
	});
var _krisajenkins$remotedata$RemoteData$append = F2(
	function (a, b) {
		return A2(
			_krisajenkins$remotedata$RemoteData$andMap,
			b,
			A2(
				_krisajenkins$remotedata$RemoteData$map,
				F2(
					function (v0, v1) {
						return {ctor: '_Tuple2', _0: v0, _1: v1};
					}),
				a));
	});
var _krisajenkins$remotedata$RemoteData$update = F2(
	function (f, remoteData) {
		var _p15 = remoteData;
		switch (_p15.ctor) {
			case 'Success':
				var _p16 = f(_p15._0);
				var first = _p16._0;
				var second = _p16._1;
				return {
					ctor: '_Tuple2',
					_0: _krisajenkins$remotedata$RemoteData$Success(first),
					_1: second
				};
			case 'NotAsked':
				return {ctor: '_Tuple2', _0: _krisajenkins$remotedata$RemoteData$NotAsked, _1: _elm_lang$core$Platform_Cmd$none};
			case 'Loading':
				return {ctor: '_Tuple2', _0: _krisajenkins$remotedata$RemoteData$Loading, _1: _elm_lang$core$Platform_Cmd$none};
			default:
				return {
					ctor: '_Tuple2',
					_0: _krisajenkins$remotedata$RemoteData$Failure(_p15._0),
					_1: _elm_lang$core$Platform_Cmd$none
				};
		}
	});

var _mdgriffith$style_elements$Style_Internal_Model$StyleSheet = F3(
	function (a, b, c) {
		return {style: a, variations: b, css: c};
	});
var _mdgriffith$style_elements$Style_Internal_Model$Reset = function (a) {
	return {ctor: 'Reset', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Import = function (a) {
	return {ctor: 'Import', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$RawStyle = F2(
	function (a, b) {
		return {ctor: 'RawStyle', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$Style = F2(
	function (a, b) {
		return {ctor: 'Style', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$Transitions = function (a) {
	return {ctor: 'Transitions', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$TextColor = function (a) {
	return {ctor: 'TextColor', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$SelectionColor = function (a) {
	return {ctor: 'SelectionColor', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Visibility = function (a) {
	return {ctor: 'Visibility', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Filters = function (a) {
	return {ctor: 'Filters', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Transform = function (a) {
	return {ctor: 'Transform', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Shadows = function (a) {
	return {ctor: 'Shadows', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Background = function (a) {
	return {ctor: 'Background', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Layout = function (a) {
	return {ctor: 'Layout', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Font = F2(
	function (a, b) {
		return {ctor: 'Font', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$Position = function (a) {
	return {ctor: 'Position', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$PseudoElement = F2(
	function (a, b) {
		return {ctor: 'PseudoElement', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$MediaQuery = F2(
	function (a, b) {
		return {ctor: 'MediaQuery', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$Child = F2(
	function (a, b) {
		return {ctor: 'Child', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$Variation = F2(
	function (a, b) {
		return {ctor: 'Variation', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$Exact = F2(
	function (a, b) {
		return {ctor: 'Exact', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$mapPropClass = F2(
	function (fn, prop) {
		var _p0 = prop;
		switch (_p0.ctor) {
			case 'Child':
				return A2(
					_mdgriffith$style_elements$Style_Internal_Model$Child,
					fn(_p0._0),
					A2(
						_elm_lang$core$List$map,
						_mdgriffith$style_elements$Style_Internal_Model$mapPropClass(fn),
						_p0._1));
			case 'Variation':
				return A2(
					_mdgriffith$style_elements$Style_Internal_Model$Variation,
					_p0._0,
					A2(
						_elm_lang$core$List$map,
						_mdgriffith$style_elements$Style_Internal_Model$mapPropClass(fn),
						_p0._1));
			case 'Exact':
				return A2(_mdgriffith$style_elements$Style_Internal_Model$Exact, _p0._0, _p0._1);
			case 'Position':
				return _mdgriffith$style_elements$Style_Internal_Model$Position(_p0._0);
			case 'Font':
				return A2(_mdgriffith$style_elements$Style_Internal_Model$Font, _p0._0, _p0._1);
			case 'Layout':
				return _mdgriffith$style_elements$Style_Internal_Model$Layout(_p0._0);
			case 'Background':
				return _mdgriffith$style_elements$Style_Internal_Model$Background(_p0._0);
			case 'MediaQuery':
				return A2(
					_mdgriffith$style_elements$Style_Internal_Model$MediaQuery,
					_p0._0,
					A2(
						_elm_lang$core$List$map,
						_mdgriffith$style_elements$Style_Internal_Model$mapPropClass(fn),
						_p0._1));
			case 'PseudoElement':
				return A2(
					_mdgriffith$style_elements$Style_Internal_Model$PseudoElement,
					_p0._0,
					A2(
						_elm_lang$core$List$map,
						_mdgriffith$style_elements$Style_Internal_Model$mapPropClass(fn),
						_p0._1));
			case 'Shadows':
				return _mdgriffith$style_elements$Style_Internal_Model$Shadows(_p0._0);
			case 'Transform':
				return _mdgriffith$style_elements$Style_Internal_Model$Transform(_p0._0);
			case 'Filters':
				return _mdgriffith$style_elements$Style_Internal_Model$Filters(_p0._0);
			case 'Visibility':
				return _mdgriffith$style_elements$Style_Internal_Model$Visibility(_p0._0);
			case 'TextColor':
				return _mdgriffith$style_elements$Style_Internal_Model$TextColor(_p0._0);
			case 'Transitions':
				return _mdgriffith$style_elements$Style_Internal_Model$Transitions(_p0._0);
			default:
				return _mdgriffith$style_elements$Style_Internal_Model$SelectionColor(_p0._0);
		}
	});
var _mdgriffith$style_elements$Style_Internal_Model$mapPropClassAndVar = F3(
	function (fn, fnVar, prop) {
		var _p1 = prop;
		switch (_p1.ctor) {
			case 'Child':
				return A2(
					_mdgriffith$style_elements$Style_Internal_Model$Child,
					fn(_p1._0),
					A2(
						_elm_lang$core$List$map,
						A2(_mdgriffith$style_elements$Style_Internal_Model$mapPropClassAndVar, fn, fnVar),
						_p1._1));
			case 'Variation':
				return A2(
					_mdgriffith$style_elements$Style_Internal_Model$Variation,
					fnVar(_p1._0),
					A2(
						_elm_lang$core$List$map,
						_mdgriffith$style_elements$Style_Internal_Model$mapPropClass(fn),
						_p1._1));
			case 'Exact':
				return A2(_mdgriffith$style_elements$Style_Internal_Model$Exact, _p1._0, _p1._1);
			case 'Position':
				return _mdgriffith$style_elements$Style_Internal_Model$Position(_p1._0);
			case 'Font':
				return A2(_mdgriffith$style_elements$Style_Internal_Model$Font, _p1._0, _p1._1);
			case 'Layout':
				return _mdgriffith$style_elements$Style_Internal_Model$Layout(_p1._0);
			case 'Background':
				return _mdgriffith$style_elements$Style_Internal_Model$Background(_p1._0);
			case 'MediaQuery':
				return A2(
					_mdgriffith$style_elements$Style_Internal_Model$MediaQuery,
					_p1._0,
					A2(
						_elm_lang$core$List$map,
						A2(_mdgriffith$style_elements$Style_Internal_Model$mapPropClassAndVar, fn, fnVar),
						_p1._1));
			case 'PseudoElement':
				return A2(
					_mdgriffith$style_elements$Style_Internal_Model$PseudoElement,
					_p1._0,
					A2(
						_elm_lang$core$List$map,
						A2(_mdgriffith$style_elements$Style_Internal_Model$mapPropClassAndVar, fn, fnVar),
						_p1._1));
			case 'Shadows':
				return _mdgriffith$style_elements$Style_Internal_Model$Shadows(_p1._0);
			case 'Transform':
				return _mdgriffith$style_elements$Style_Internal_Model$Transform(_p1._0);
			case 'Filters':
				return _mdgriffith$style_elements$Style_Internal_Model$Filters(_p1._0);
			case 'Visibility':
				return _mdgriffith$style_elements$Style_Internal_Model$Visibility(_p1._0);
			case 'TextColor':
				return _mdgriffith$style_elements$Style_Internal_Model$TextColor(_p1._0);
			case 'Transitions':
				return _mdgriffith$style_elements$Style_Internal_Model$Transitions(_p1._0);
			default:
				return _mdgriffith$style_elements$Style_Internal_Model$SelectionColor(_p1._0);
		}
	});
var _mdgriffith$style_elements$Style_Internal_Model$mapClassAndVar = F3(
	function (fn, fnVariation, style) {
		var _p2 = style;
		switch (_p2.ctor) {
			case 'Style':
				return A2(
					_mdgriffith$style_elements$Style_Internal_Model$Style,
					fn(_p2._0),
					A2(
						_elm_lang$core$List$map,
						A2(_mdgriffith$style_elements$Style_Internal_Model$mapPropClassAndVar, fn, fnVariation),
						_p2._1));
			case 'Import':
				return _mdgriffith$style_elements$Style_Internal_Model$Import(_p2._0);
			case 'RawStyle':
				return A2(_mdgriffith$style_elements$Style_Internal_Model$RawStyle, _p2._0, _p2._1);
			default:
				return _mdgriffith$style_elements$Style_Internal_Model$Reset(_p2._0);
		}
	});
var _mdgriffith$style_elements$Style_Internal_Model$Transition = function (a) {
	return {ctor: 'Transition', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Opacity = function (a) {
	return {ctor: 'Opacity', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Invisible = {ctor: 'Invisible'};
var _mdgriffith$style_elements$Style_Internal_Model$Hidden = {ctor: 'Hidden'};
var _mdgriffith$style_elements$Style_Internal_Model$Float = function (a) {
	return {ctor: 'Float', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Inline = {ctor: 'Inline'};
var _mdgriffith$style_elements$Style_Internal_Model$ZIndex = function (a) {
	return {ctor: 'ZIndex', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$PosBottom = function (a) {
	return {ctor: 'PosBottom', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$PosTop = function (a) {
	return {ctor: 'PosTop', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$PosRight = function (a) {
	return {ctor: 'PosRight', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$PosLeft = function (a) {
	return {ctor: 'PosLeft', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$RelativeTo = function (a) {
	return {ctor: 'RelativeTo', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Parent = {ctor: 'Parent'};
var _mdgriffith$style_elements$Style_Internal_Model$Current = {ctor: 'Current'};
var _mdgriffith$style_elements$Style_Internal_Model$Screen = {ctor: 'Screen'};
var _mdgriffith$style_elements$Style_Internal_Model$FloatTopRight = {ctor: 'FloatTopRight'};
var _mdgriffith$style_elements$Style_Internal_Model$FloatTopLeft = {ctor: 'FloatTopLeft'};
var _mdgriffith$style_elements$Style_Internal_Model$FloatRight = {ctor: 'FloatRight'};
var _mdgriffith$style_elements$Style_Internal_Model$FloatLeft = {ctor: 'FloatLeft'};
var _mdgriffith$style_elements$Style_Internal_Model$BoxProp = F2(
	function (a, b) {
		return {ctor: 'BoxProp', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$Grid = F2(
	function (a, b) {
		return {ctor: 'Grid', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$FlexLayout = F2(
	function (a, b) {
		return {ctor: 'FlexLayout', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$TextLayout = function (a) {
	return {ctor: 'TextLayout', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Vert = function (a) {
	return {ctor: 'Vert', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Horz = function (a) {
	return {ctor: 'Horz', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Wrap = function (a) {
	return {ctor: 'Wrap', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$GridGap = F2(
	function (a, b) {
		return {ctor: 'GridGap', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$GridV = function (a) {
	return {ctor: 'GridV', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$GridH = function (a) {
	return {ctor: 'GridH', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$NamedGridTemplate = function (a) {
	return {ctor: 'NamedGridTemplate', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$GridTemplate = function (a) {
	return {ctor: 'GridTemplate', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$GridPosition = function (a) {
	return {ctor: 'GridPosition', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Named = F2(
	function (a, b) {
		return {ctor: 'Named', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$SpanJust = function (a) {
	return {ctor: 'SpanJust', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$SpanAll = {ctor: 'SpanAll'};
var _mdgriffith$style_elements$Style_Internal_Model$BackgroundLinearGradient = F2(
	function (a, b) {
		return {ctor: 'BackgroundLinearGradient', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$BackgroundElement = F2(
	function (a, b) {
		return {ctor: 'BackgroundElement', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$BackgroundImage = function (a) {
	return {ctor: 'BackgroundImage', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$ToAngle = function (a) {
	return {ctor: 'ToAngle', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$ToBottomLeft = {ctor: 'ToBottomLeft'};
var _mdgriffith$style_elements$Style_Internal_Model$ToTopLeft = {ctor: 'ToTopLeft'};
var _mdgriffith$style_elements$Style_Internal_Model$ToLeft = {ctor: 'ToLeft'};
var _mdgriffith$style_elements$Style_Internal_Model$ToBottomRight = {ctor: 'ToBottomRight'};
var _mdgriffith$style_elements$Style_Internal_Model$ToTopRight = {ctor: 'ToTopRight'};
var _mdgriffith$style_elements$Style_Internal_Model$ToRight = {ctor: 'ToRight'};
var _mdgriffith$style_elements$Style_Internal_Model$ToDown = {ctor: 'ToDown'};
var _mdgriffith$style_elements$Style_Internal_Model$ToUp = {ctor: 'ToUp'};
var _mdgriffith$style_elements$Style_Internal_Model$PxStep = F2(
	function (a, b) {
		return {ctor: 'PxStep', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$PercentStep = F2(
	function (a, b) {
		return {ctor: 'PercentStep', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$ColorStep = function (a) {
	return {ctor: 'ColorStep', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$ShadowModel = function (a) {
	return {ctor: 'ShadowModel', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$DropShadow = function (a) {
	return {ctor: 'DropShadow', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Sepia = function (a) {
	return {ctor: 'Sepia', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Saturate = function (a) {
	return {ctor: 'Saturate', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$OpacityFilter = function (a) {
	return {ctor: 'OpacityFilter', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Invert = function (a) {
	return {ctor: 'Invert', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$HueRotate = function (a) {
	return {ctor: 'HueRotate', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Grayscale = function (a) {
	return {ctor: 'Grayscale', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Contrast = function (a) {
	return {ctor: 'Contrast', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Brightness = function (a) {
	return {ctor: 'Brightness', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Blur = function (a) {
	return {ctor: 'Blur', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$FilterUrl = function (a) {
	return {ctor: 'FilterUrl', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Scale = F3(
	function (a, b, c) {
		return {ctor: 'Scale', _0: a, _1: b, _2: c};
	});
var _mdgriffith$style_elements$Style_Internal_Model$RotateAround = F4(
	function (a, b, c, d) {
		return {ctor: 'RotateAround', _0: a, _1: b, _2: c, _3: d};
	});
var _mdgriffith$style_elements$Style_Internal_Model$Rotate = function (a) {
	return {ctor: 'Rotate', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Translate = F3(
	function (a, b, c) {
		return {ctor: 'Translate', _0: a, _1: b, _2: c};
	});
var _mdgriffith$style_elements$Style_Internal_Model$NoRepeat = {ctor: 'NoRepeat'};
var _mdgriffith$style_elements$Style_Internal_Model$Round = {ctor: 'Round'};
var _mdgriffith$style_elements$Style_Internal_Model$Space = {ctor: 'Space'};
var _mdgriffith$style_elements$Style_Internal_Model$Repeat = {ctor: 'Repeat'};
var _mdgriffith$style_elements$Style_Internal_Model$RepeatY = {ctor: 'RepeatY'};
var _mdgriffith$style_elements$Style_Internal_Model$RepeatX = {ctor: 'RepeatX'};
var _mdgriffith$style_elements$Style_Internal_Model$GoLeft = {ctor: 'GoLeft'};
var _mdgriffith$style_elements$Style_Internal_Model$Down = {ctor: 'Down'};
var _mdgriffith$style_elements$Style_Internal_Model$GoRight = {ctor: 'GoRight'};
var _mdgriffith$style_elements$Style_Internal_Model$Up = {ctor: 'Up'};
var _mdgriffith$style_elements$Style_Internal_Model$Other = function (a) {
	return {ctor: 'Other', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$JustifyAll = {ctor: 'JustifyAll'};
var _mdgriffith$style_elements$Style_Internal_Model$Justify = {ctor: 'Justify'};
var _mdgriffith$style_elements$Style_Internal_Model$Center = {ctor: 'Center'};
var _mdgriffith$style_elements$Style_Internal_Model$Bottom = {ctor: 'Bottom'};
var _mdgriffith$style_elements$Style_Internal_Model$Top = {ctor: 'Top'};
var _mdgriffith$style_elements$Style_Internal_Model$Right = {ctor: 'Right'};
var _mdgriffith$style_elements$Style_Internal_Model$Left = {ctor: 'Left'};
var _mdgriffith$style_elements$Style_Internal_Model$Calc = F2(
	function (a, b) {
		return {ctor: 'Calc', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Model$Fill = function (a) {
	return {ctor: 'Fill', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Auto = {ctor: 'Auto'};
var _mdgriffith$style_elements$Style_Internal_Model$Percent = function (a) {
	return {ctor: 'Percent', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Model$Px = function (a) {
	return {ctor: 'Px', _0: a};
};

var _mdgriffith$style_elements$Element_Internal_Model$name = function (el) {
	var _p0 = el;
	switch (_p0.ctor) {
		case 'Empty':
			return 'empty';
		case 'Spacer':
			return 'spacer';
		case 'Text':
			return 'text';
		case 'Element':
			return 'element';
		case 'Layout':
			return 'layout';
		default:
			return 'html';
	}
};
var _mdgriffith$style_elements$Element_Internal_Model$Raw = function (a) {
	return {ctor: 'Raw', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Layout = function (a) {
	return {ctor: 'Layout', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Element = function (a) {
	return {ctor: 'Element', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Text = F2(
	function (a, b) {
		return {ctor: 'Text', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Element_Internal_Model$Spacer = function (a) {
	return {ctor: 'Spacer', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Empty = {ctor: 'Empty'};
var _mdgriffith$style_elements$Element_Internal_Model$Keyed = function (a) {
	return {ctor: 'Keyed', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Normal = function (a) {
	return {ctor: 'Normal', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$adjust = F3(
	function (fn, parent, el) {
		var maybeOnEmptyList = function (list) {
			return _elm_lang$core$List$isEmpty(list) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(list);
		};
		var merge = F2(
			function (el, current) {
				var _p1 = el;
				if (_p1.ctor === 'Nothing') {
					return current;
				} else {
					var _p2 = current;
					if (_p2.ctor === 'Nothing') {
						return el;
					} else {
						return _elm_lang$core$Maybe$Just(
							A2(_elm_lang$core$Basics_ops['++'], _p1._0, _p2._0));
					}
				}
			});
		var _p3 = el;
		switch (_p3.ctor) {
			case 'Element':
				var adjustAndMerge = F2(
					function (el, _p4) {
						var _p5 = _p4;
						var _p9 = _p5._1;
						var _p8 = _p5._0;
						var _p6 = A3(_mdgriffith$style_elements$Element_Internal_Model$adjust, fn, _elm_lang$core$Maybe$Nothing, el);
						var adjusted = _p6._0;
						var data = _p6._1;
						var _p7 = data;
						if (_p7.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: adjusted, _1: _p8},
								_1: _p9
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: adjusted, _1: _p8},
								_1: A2(_elm_lang$core$Basics_ops['++'], _p7._0, _p9)
							};
						}
					});
				var _p10 = function () {
					var _p11 = _p3._0.absolutelyPositioned;
					if (_p11.ctor === 'Nothing') {
						return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing};
					} else {
						return function (_p12) {
							var _p13 = _p12;
							return {
								ctor: '_Tuple2',
								_0: maybeOnEmptyList(_p13._0),
								_1: maybeOnEmptyList(_p13._1)
							};
						}(
							A3(
								_elm_lang$core$List$foldr,
								adjustAndMerge,
								{
									ctor: '_Tuple2',
									_0: {ctor: '[]'},
									_1: {ctor: '[]'}
								},
								_p11._0));
					}
				}();
				var adjustedOthers = _p10._0;
				var otherChildrenData = _p10._1;
				var _p14 = A3(_mdgriffith$style_elements$Element_Internal_Model$adjust, fn, _elm_lang$core$Maybe$Nothing, _p3._0.child);
				var adjustedChild = _p14._0;
				var childData = _p14._1;
				var _p15 = A2(
					fn,
					parent,
					_mdgriffith$style_elements$Element_Internal_Model$Element(
						_elm_lang$core$Native_Utils.update(
							_p3._0,
							{child: adjustedChild, absolutelyPositioned: adjustedOthers})));
				var adjustedEl = _p15._0;
				var elData = _p15._1;
				return {
					ctor: '_Tuple2',
					_0: adjustedEl,
					_1: A3(
						_elm_lang$core$List$foldr,
						merge,
						_elm_lang$core$Maybe$Nothing,
						{
							ctor: '::',
							_0: childData,
							_1: {
								ctor: '::',
								_0: otherChildrenData,
								_1: {
									ctor: '::',
									_0: elData,
									_1: {ctor: '[]'}
								}
							}
						})
				};
			case 'Layout':
				var _p40 = _p3._0.layout;
				var adjustAndMergeKeyed = F3(
					function (usingParent, _p17, _p16) {
						var _p18 = _p17;
						var _p24 = _p18._0;
						var _p19 = _p16;
						var _p23 = _p19._1;
						var _p22 = _p19._0;
						var _p20 = A3(_mdgriffith$style_elements$Element_Internal_Model$adjust, fn, usingParent, _p18._1);
						var adjusted = _p20._0;
						var data = _p20._1;
						var _p21 = data;
						if (_p21.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _p24, _1: adjusted},
									_1: _p22
								},
								_1: _p23
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _p24, _1: adjusted},
									_1: _p22
								},
								_1: A2(_elm_lang$core$Basics_ops['++'], _p21._0, _p23)
							};
						}
					});
				var adjustAndMerge = F3(
					function (usingParent, el, _p25) {
						var _p26 = _p25;
						var _p30 = _p26._1;
						var _p29 = _p26._0;
						var _p27 = A3(_mdgriffith$style_elements$Element_Internal_Model$adjust, fn, usingParent, el);
						var adjusted = _p27._0;
						var data = _p27._1;
						var _p28 = data;
						if (_p28.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: adjusted, _1: _p29},
								_1: _p30
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: adjusted, _1: _p29},
								_1: A2(_elm_lang$core$Basics_ops['++'], _p28._0, _p30)
							};
						}
					});
				var _p31 = function () {
					var _p32 = _p3._0.children;
					if (_p32.ctor === 'Normal') {
						var _p33 = A3(
							_elm_lang$core$List$foldr,
							adjustAndMerge(
								_elm_lang$core$Maybe$Just(_p40)),
							{
								ctor: '_Tuple2',
								_0: {ctor: '[]'},
								_1: {ctor: '[]'}
							},
							_p32._0);
						var adjusted = _p33._0;
						var data = _p33._1;
						return {
							ctor: '_Tuple2',
							_0: _mdgriffith$style_elements$Element_Internal_Model$Normal(adjusted),
							_1: maybeOnEmptyList(data)
						};
					} else {
						var _p34 = A3(
							_elm_lang$core$List$foldr,
							adjustAndMergeKeyed(
								_elm_lang$core$Maybe$Just(_p40)),
							{
								ctor: '_Tuple2',
								_0: {ctor: '[]'},
								_1: {ctor: '[]'}
							},
							_p32._0);
						var adjusted = _p34._0;
						var data = _p34._1;
						return {
							ctor: '_Tuple2',
							_0: _mdgriffith$style_elements$Element_Internal_Model$Keyed(adjusted),
							_1: maybeOnEmptyList(data)
						};
					}
				}();
				var adjustedChildren = _p31._0;
				var childrenData = _p31._1;
				var _p35 = function () {
					var _p36 = _p3._0.absolutelyPositioned;
					if (_p36.ctor === 'Nothing') {
						return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing};
					} else {
						return function (_p37) {
							var _p38 = _p37;
							return {
								ctor: '_Tuple2',
								_0: maybeOnEmptyList(_p38._0),
								_1: maybeOnEmptyList(_p38._1)
							};
						}(
							A3(
								_elm_lang$core$List$foldr,
								adjustAndMerge(_elm_lang$core$Maybe$Nothing),
								{
									ctor: '_Tuple2',
									_0: {ctor: '[]'},
									_1: {ctor: '[]'}
								},
								_p36._0));
					}
				}();
				var adjustedOthers = _p35._0;
				var otherChildrenData = _p35._1;
				var _p39 = A2(
					fn,
					parent,
					_mdgriffith$style_elements$Element_Internal_Model$Layout(
						_elm_lang$core$Native_Utils.update(
							_p3._0,
							{children: adjustedChildren, absolutelyPositioned: adjustedOthers})));
				var adjustedLayout = _p39._0;
				var layoutData = _p39._1;
				return {
					ctor: '_Tuple2',
					_0: adjustedLayout,
					_1: A3(
						_elm_lang$core$List$foldr,
						merge,
						_elm_lang$core$Maybe$Nothing,
						{
							ctor: '::',
							_0: layoutData,
							_1: {
								ctor: '::',
								_0: childrenData,
								_1: {
									ctor: '::',
									_0: otherChildrenData,
									_1: {ctor: '[]'}
								}
							}
						})
				};
			default:
				return A2(fn, _elm_lang$core$Maybe$Nothing, el);
		}
	});
var _mdgriffith$style_elements$Element_Internal_Model$mapChildren = F2(
	function (fn, children) {
		var _p41 = children;
		if (_p41.ctor === 'Normal') {
			return _mdgriffith$style_elements$Element_Internal_Model$Normal(
				A2(_elm_lang$core$List$map, fn, _p41._0));
		} else {
			return _mdgriffith$style_elements$Element_Internal_Model$Keyed(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Tuple$mapSecond(fn),
					_p41._0));
		}
	});
var _mdgriffith$style_elements$Element_Internal_Model$OnGrid = function (a) {
	return {ctor: 'OnGrid', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$NamedOnGrid = function (a) {
	return {ctor: 'NamedOnGrid', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Overflow = function (a) {
	return {ctor: 'Overflow', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Shrink = function (a) {
	return {ctor: 'Shrink', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$PointerEvents = function (a) {
	return {ctor: 'PointerEvents', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$GridCoords = function (a) {
	return {ctor: 'GridCoords', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$GridArea = function (a) {
	return {ctor: 'GridArea', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Attr = function (a) {
	return {ctor: 'Attr', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$InputEvent = function (a) {
	return {ctor: 'InputEvent', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Event = function (a) {
	return {ctor: 'Event', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$PhantomPadding = function (a) {
	return {ctor: 'PhantomPadding', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Padding = F4(
	function (a, b, c, d) {
		return {ctor: 'Padding', _0: a, _1: b, _2: c, _3: d};
	});
var _mdgriffith$style_elements$Element_Internal_Model$Expand = {ctor: 'Expand'};
var _mdgriffith$style_elements$Element_Internal_Model$Margin = function (a) {
	return {ctor: 'Margin', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Spacing = F2(
	function (a, b) {
		return {ctor: 'Spacing', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Element_Internal_Model$Opacity = function (a) {
	return {ctor: 'Opacity', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Hidden = {ctor: 'Hidden'};
var _mdgriffith$style_elements$Element_Internal_Model$PositionFrame = function (a) {
	return {ctor: 'PositionFrame', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Position = F3(
	function (a, b, c) {
		return {ctor: 'Position', _0: a, _1: b, _2: c};
	});
var _mdgriffith$style_elements$Element_Internal_Model$VAlign = function (a) {
	return {ctor: 'VAlign', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$HAlign = function (a) {
	return {ctor: 'HAlign', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Inline = {ctor: 'Inline'};
var _mdgriffith$style_elements$Element_Internal_Model$Width = function (a) {
	return {ctor: 'Width', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Height = function (a) {
	return {ctor: 'Height', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Vary = F2(
	function (a, b) {
		return {ctor: 'Vary', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Element_Internal_Model$mapAttr = F2(
	function (fn, attr) {
		var _p42 = attr;
		switch (_p42.ctor) {
			case 'Event':
				return _mdgriffith$style_elements$Element_Internal_Model$Event(
					A2(_elm_lang$html$Html_Attributes$map, fn, _p42._0));
			case 'InputEvent':
				return _mdgriffith$style_elements$Element_Internal_Model$InputEvent(
					A2(_elm_lang$html$Html_Attributes$map, fn, _p42._0));
			case 'Attr':
				return _mdgriffith$style_elements$Element_Internal_Model$Attr(
					A2(_elm_lang$html$Html_Attributes$map, fn, _p42._0));
			case 'Vary':
				return A2(_mdgriffith$style_elements$Element_Internal_Model$Vary, _p42._0, _p42._1);
			case 'Height':
				return _mdgriffith$style_elements$Element_Internal_Model$Height(_p42._0);
			case 'Width':
				return _mdgriffith$style_elements$Element_Internal_Model$Width(_p42._0);
			case 'Inline':
				return _mdgriffith$style_elements$Element_Internal_Model$Inline;
			case 'HAlign':
				return _mdgriffith$style_elements$Element_Internal_Model$HAlign(_p42._0);
			case 'VAlign':
				return _mdgriffith$style_elements$Element_Internal_Model$VAlign(_p42._0);
			case 'Position':
				return A3(_mdgriffith$style_elements$Element_Internal_Model$Position, _p42._0, _p42._1, _p42._2);
			case 'PositionFrame':
				return _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(_p42._0);
			case 'Hidden':
				return _mdgriffith$style_elements$Element_Internal_Model$Hidden;
			case 'Opacity':
				return _mdgriffith$style_elements$Element_Internal_Model$Opacity(_p42._0);
			case 'Spacing':
				return A2(_mdgriffith$style_elements$Element_Internal_Model$Spacing, _p42._0, _p42._1);
			case 'Margin':
				return _mdgriffith$style_elements$Element_Internal_Model$Margin(_p42._0);
			case 'Expand':
				return _mdgriffith$style_elements$Element_Internal_Model$Expand;
			case 'Padding':
				return A4(_mdgriffith$style_elements$Element_Internal_Model$Padding, _p42._0, _p42._1, _p42._2, _p42._3);
			case 'PhantomPadding':
				return _mdgriffith$style_elements$Element_Internal_Model$PhantomPadding(_p42._0);
			case 'GridArea':
				return _mdgriffith$style_elements$Element_Internal_Model$GridArea(_p42._0);
			case 'GridCoords':
				return _mdgriffith$style_elements$Element_Internal_Model$GridCoords(_p42._0);
			case 'PointerEvents':
				return _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(_p42._0);
			case 'Shrink':
				return _mdgriffith$style_elements$Element_Internal_Model$Shrink(_p42._0);
			default:
				return _mdgriffith$style_elements$Element_Internal_Model$Overflow(_p42._0);
		}
	});
var _mdgriffith$style_elements$Element_Internal_Model$mapMsg = F2(
	function (fn, el) {
		var _p43 = el;
		switch (_p43.ctor) {
			case 'Empty':
				return _mdgriffith$style_elements$Element_Internal_Model$Empty;
			case 'Spacer':
				return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p43._0);
			case 'Text':
				return A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p43._0, _p43._1);
			case 'Element':
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					_elm_lang$core$Native_Utils.update(
						_p43._0,
						{
							attrs: A2(
								_elm_lang$core$List$map,
								_mdgriffith$style_elements$Element_Internal_Model$mapAttr(fn),
								_p43._0.attrs),
							child: A2(_mdgriffith$style_elements$Element_Internal_Model$mapMsg, fn, _p43._0.child),
							absolutelyPositioned: A2(
								_elm_lang$core$Maybe$map,
								_elm_lang$core$List$map(
									function (child) {
										return A2(_mdgriffith$style_elements$Element_Internal_Model$mapMsg, fn, child);
									}),
								_p43._0.absolutelyPositioned)
						}));
			case 'Layout':
				return _mdgriffith$style_elements$Element_Internal_Model$Layout(
					_elm_lang$core$Native_Utils.update(
						_p43._0,
						{
							attrs: A2(
								_elm_lang$core$List$map,
								_mdgriffith$style_elements$Element_Internal_Model$mapAttr(fn),
								_p43._0.attrs),
							children: A2(
								_mdgriffith$style_elements$Element_Internal_Model$mapChildren,
								_mdgriffith$style_elements$Element_Internal_Model$mapMsg(fn),
								_p43._0.children),
							absolutelyPositioned: A2(
								_elm_lang$core$Maybe$map,
								_elm_lang$core$List$map(
									function (child) {
										return A2(_mdgriffith$style_elements$Element_Internal_Model$mapMsg, fn, child);
									}),
								_p43._0.absolutelyPositioned)
						}));
			default:
				return _mdgriffith$style_elements$Element_Internal_Model$Raw(
					A2(_elm_lang$html$Html$map, fn, _p43._0));
		}
	});
var _mdgriffith$style_elements$Element_Internal_Model$AllAxis = {ctor: 'AllAxis'};
var _mdgriffith$style_elements$Element_Internal_Model$YAxis = {ctor: 'YAxis'};
var _mdgriffith$style_elements$Element_Internal_Model$XAxis = {ctor: 'XAxis'};
var _mdgriffith$style_elements$Element_Internal_Model$Sub = {ctor: 'Sub'};
var _mdgriffith$style_elements$Element_Internal_Model$Super = {ctor: 'Super'};
var _mdgriffith$style_elements$Element_Internal_Model$Strike = {ctor: 'Strike'};
var _mdgriffith$style_elements$Element_Internal_Model$Underline = {ctor: 'Underline'};
var _mdgriffith$style_elements$Element_Internal_Model$Italic = {ctor: 'Italic'};
var _mdgriffith$style_elements$Element_Internal_Model$Bold = {ctor: 'Bold'};
var _mdgriffith$style_elements$Element_Internal_Model$NoDecoration = {ctor: 'NoDecoration'};
var _mdgriffith$style_elements$Element_Internal_Model$Nearby = function (a) {
	return {ctor: 'Nearby', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Absolute = function (a) {
	return {ctor: 'Absolute', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Model$Relative = {ctor: 'Relative'};
var _mdgriffith$style_elements$Element_Internal_Model$Screen = {ctor: 'Screen'};
var _mdgriffith$style_elements$Element_Internal_Model$BottomLeft = {ctor: 'BottomLeft'};
var _mdgriffith$style_elements$Element_Internal_Model$TopLeft = {ctor: 'TopLeft'};
var _mdgriffith$style_elements$Element_Internal_Model$Within = {ctor: 'Within'};
var _mdgriffith$style_elements$Element_Internal_Model$OnRight = {ctor: 'OnRight'};
var _mdgriffith$style_elements$Element_Internal_Model$OnLeft = {ctor: 'OnLeft'};
var _mdgriffith$style_elements$Element_Internal_Model$Above = {ctor: 'Above'};
var _mdgriffith$style_elements$Element_Internal_Model$Below = {ctor: 'Below'};
var _mdgriffith$style_elements$Element_Internal_Model$Justify = {ctor: 'Justify'};
var _mdgriffith$style_elements$Element_Internal_Model$Center = {ctor: 'Center'};
var _mdgriffith$style_elements$Element_Internal_Model$Right = {ctor: 'Right'};
var _mdgriffith$style_elements$Element_Internal_Model$Left = {ctor: 'Left'};
var _mdgriffith$style_elements$Element_Internal_Model$VerticalCenter = {ctor: 'VerticalCenter'};
var _mdgriffith$style_elements$Element_Internal_Model$Bottom = {ctor: 'Bottom'};
var _mdgriffith$style_elements$Element_Internal_Model$Top = {ctor: 'Top'};

var _mdgriffith$style_elements$Element_Internal_Modify$getChild = function (el) {
	var _p0 = el;
	switch (_p0.ctor) {
		case 'Empty':
			return _mdgriffith$style_elements$Element_Internal_Model$Empty;
		case 'Spacer':
			return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p0._0);
		case 'Raw':
			return _mdgriffith$style_elements$Element_Internal_Model$Raw(_p0._0);
		case 'Layout':
			return el;
		case 'Element':
			return _p0._0.child;
		default:
			return A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p0._0, _p0._1);
	}
};
var _mdgriffith$style_elements$Element_Internal_Modify$removeContent = function (el) {
	var _p1 = el;
	switch (_p1.ctor) {
		case 'Empty':
			return _mdgriffith$style_elements$Element_Internal_Model$Empty;
		case 'Spacer':
			return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p1._0);
		case 'Raw':
			return _mdgriffith$style_elements$Element_Internal_Model$Raw(_p1._0);
		case 'Layout':
			return _mdgriffith$style_elements$Element_Internal_Model$Layout(
				_elm_lang$core$Native_Utils.update(
					_p1._0,
					{
						children: _mdgriffith$style_elements$Element_Internal_Model$Normal(
							{ctor: '[]'}),
						absolutelyPositioned: _elm_lang$core$Maybe$Nothing
					}));
		case 'Element':
			return _mdgriffith$style_elements$Element_Internal_Model$Element(
				_elm_lang$core$Native_Utils.update(
					_p1._0,
					{child: _mdgriffith$style_elements$Element_Internal_Model$Empty, absolutelyPositioned: _elm_lang$core$Maybe$Nothing}));
		default:
			return _mdgriffith$style_elements$Element_Internal_Model$Empty;
	}
};
var _mdgriffith$style_elements$Element_Internal_Modify$removeStyle = function (el) {
	var _p2 = el;
	switch (_p2.ctor) {
		case 'Empty':
			return _mdgriffith$style_elements$Element_Internal_Model$Empty;
		case 'Spacer':
			return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p2._0);
		case 'Raw':
			return _mdgriffith$style_elements$Element_Internal_Model$Raw(_p2._0);
		case 'Layout':
			return _mdgriffith$style_elements$Element_Internal_Model$Layout(
				_elm_lang$core$Native_Utils.update(
					_p2._0,
					{style: _elm_lang$core$Maybe$Nothing}));
		case 'Element':
			return _mdgriffith$style_elements$Element_Internal_Model$Element(
				_elm_lang$core$Native_Utils.update(
					_p2._0,
					{style: _elm_lang$core$Maybe$Nothing}));
		default:
			return A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p2._0, _p2._1);
	}
};
var _mdgriffith$style_elements$Element_Internal_Modify$getStyle = function (el) {
	var _p3 = el;
	switch (_p3.ctor) {
		case 'Empty':
			return _elm_lang$core$Maybe$Nothing;
		case 'Raw':
			return _elm_lang$core$Maybe$Nothing;
		case 'Spacer':
			return _elm_lang$core$Maybe$Nothing;
		case 'Layout':
			return _p3._0.style;
		case 'Element':
			return _p3._0.style;
		default:
			return _elm_lang$core$Maybe$Nothing;
	}
};
var _mdgriffith$style_elements$Element_Internal_Modify$getAttrs = function (el) {
	var _p4 = el;
	switch (_p4.ctor) {
		case 'Empty':
			return {ctor: '[]'};
		case 'Spacer':
			return {ctor: '[]'};
		case 'Raw':
			return {ctor: '[]'};
		case 'Layout':
			return _p4._0.attrs;
		case 'Element':
			return _p4._0.attrs;
		default:
			return {ctor: '[]'};
	}
};
var _mdgriffith$style_elements$Element_Internal_Modify$addChild = F2(
	function (parent, el) {
		var _p5 = parent;
		switch (_p5.ctor) {
			case 'Empty':
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					{
						node: 'div',
						style: _elm_lang$core$Maybe$Nothing,
						attrs: {ctor: '[]'},
						child: _mdgriffith$style_elements$Element_Internal_Model$Empty,
						absolutelyPositioned: _elm_lang$core$Maybe$Just(
							{
								ctor: '::',
								_0: el,
								_1: {ctor: '[]'}
							})
					});
			case 'Spacer':
				return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p5._0);
			case 'Raw':
				return _mdgriffith$style_elements$Element_Internal_Model$Raw(_p5._0);
			case 'Layout':
				var _p7 = _p5._0;
				var _p6 = _p5._0.absolutelyPositioned;
				if (_p6.ctor === 'Nothing') {
					return _mdgriffith$style_elements$Element_Internal_Model$Layout(
						_elm_lang$core$Native_Utils.update(
							_p7,
							{
								absolutelyPositioned: _elm_lang$core$Maybe$Just(
									{
										ctor: '::',
										_0: el,
										_1: {ctor: '[]'}
									})
							}));
				} else {
					return _mdgriffith$style_elements$Element_Internal_Model$Layout(
						_elm_lang$core$Native_Utils.update(
							_p7,
							{
								absolutelyPositioned: _elm_lang$core$Maybe$Just(
									{ctor: '::', _0: el, _1: _p6._0})
							}));
				}
			case 'Element':
				var _p9 = _p5._0;
				var _p8 = _p5._0.absolutelyPositioned;
				if (_p8.ctor === 'Nothing') {
					return _mdgriffith$style_elements$Element_Internal_Model$Element(
						_elm_lang$core$Native_Utils.update(
							_p9,
							{
								absolutelyPositioned: _elm_lang$core$Maybe$Just(
									{
										ctor: '::',
										_0: el,
										_1: {ctor: '[]'}
									})
							}));
				} else {
					return _mdgriffith$style_elements$Element_Internal_Model$Element(
						_elm_lang$core$Native_Utils.update(
							_p9,
							{
								absolutelyPositioned: _elm_lang$core$Maybe$Just(
									{ctor: '::', _0: el, _1: _p8._0})
							}));
				}
			default:
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					{
						node: 'div',
						style: _elm_lang$core$Maybe$Nothing,
						attrs: {ctor: '[]'},
						child: A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p5._0, _p5._1),
						absolutelyPositioned: _elm_lang$core$Maybe$Just(
							{
								ctor: '::',
								_0: el,
								_1: {ctor: '[]'}
							})
					});
		}
	});
var _mdgriffith$style_elements$Element_Internal_Modify$removeAllAttrs = function (el) {
	var _p10 = el;
	switch (_p10.ctor) {
		case 'Empty':
			return _mdgriffith$style_elements$Element_Internal_Model$Empty;
		case 'Spacer':
			return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p10._0);
		case 'Raw':
			return _mdgriffith$style_elements$Element_Internal_Model$Raw(_p10._0);
		case 'Layout':
			return _mdgriffith$style_elements$Element_Internal_Model$Layout(
				_elm_lang$core$Native_Utils.update(
					_p10._0,
					{
						attrs: {ctor: '[]'}
					}));
		case 'Element':
			return _mdgriffith$style_elements$Element_Internal_Model$Element(
				_elm_lang$core$Native_Utils.update(
					_p10._0,
					{
						attrs: {ctor: '[]'}
					}));
		default:
			return A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p10._0, _p10._1);
	}
};
var _mdgriffith$style_elements$Element_Internal_Modify$removeAttrs = F2(
	function (props, el) {
		var match = function (p) {
			return !A2(_elm_lang$core$List$member, p, props);
		};
		var _p11 = el;
		switch (_p11.ctor) {
			case 'Empty':
				return _mdgriffith$style_elements$Element_Internal_Model$Empty;
			case 'Raw':
				return _mdgriffith$style_elements$Element_Internal_Model$Raw(_p11._0);
			case 'Spacer':
				return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p11._0);
			case 'Layout':
				var _p12 = _p11._0;
				return _mdgriffith$style_elements$Element_Internal_Model$Layout(
					_elm_lang$core$Native_Utils.update(
						_p12,
						{
							attrs: A2(_elm_lang$core$List$filter, match, _p12.attrs)
						}));
			case 'Element':
				var _p13 = _p11._0;
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					_elm_lang$core$Native_Utils.update(
						_p13,
						{
							attrs: A2(_elm_lang$core$List$filter, match, _p13.attrs)
						}));
			default:
				return A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p11._0, _p11._1);
		}
	});
var _mdgriffith$style_elements$Element_Internal_Modify$setAttrs = F2(
	function (props, el) {
		var _p14 = el;
		switch (_p14.ctor) {
			case 'Empty':
				return _mdgriffith$style_elements$Element_Internal_Model$Empty;
			case 'Spacer':
				return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p14._0);
			case 'Raw':
				return _mdgriffith$style_elements$Element_Internal_Model$Raw(_p14._0);
			case 'Layout':
				return _mdgriffith$style_elements$Element_Internal_Model$Layout(
					_elm_lang$core$Native_Utils.update(
						_p14._0,
						{attrs: props}));
			case 'Element':
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					_elm_lang$core$Native_Utils.update(
						_p14._0,
						{attrs: props}));
			default:
				return A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p14._0, _p14._1);
		}
	});
var _mdgriffith$style_elements$Element_Internal_Modify$addAttrList = F2(
	function (props, el) {
		var _p15 = el;
		switch (_p15.ctor) {
			case 'Empty':
				return _mdgriffith$style_elements$Element_Internal_Model$Empty;
			case 'Spacer':
				return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p15._0);
			case 'Raw':
				return _mdgriffith$style_elements$Element_Internal_Model$Raw(_p15._0);
			case 'Layout':
				var _p16 = _p15._0;
				return _mdgriffith$style_elements$Element_Internal_Model$Layout(
					_elm_lang$core$Native_Utils.update(
						_p16,
						{
							attrs: A2(_elm_lang$core$Basics_ops['++'], props, _p16.attrs)
						}));
			case 'Element':
				var _p17 = _p15._0;
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					_elm_lang$core$Native_Utils.update(
						_p17,
						{
							attrs: A2(_elm_lang$core$Basics_ops['++'], props, _p17.attrs)
						}));
			default:
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					{
						node: 'div',
						style: _elm_lang$core$Maybe$Nothing,
						attrs: props,
						child: A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p15._0, _p15._1),
						absolutelyPositioned: _elm_lang$core$Maybe$Nothing
					});
		}
	});
var _mdgriffith$style_elements$Element_Internal_Modify$addAttr = F2(
	function (prop, el) {
		var _p18 = el;
		switch (_p18.ctor) {
			case 'Empty':
				return _mdgriffith$style_elements$Element_Internal_Model$Empty;
			case 'Raw':
				return _mdgriffith$style_elements$Element_Internal_Model$Raw(_p18._0);
			case 'Spacer':
				return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p18._0);
			case 'Layout':
				var _p19 = _p18._0;
				return _mdgriffith$style_elements$Element_Internal_Model$Layout(
					_elm_lang$core$Native_Utils.update(
						_p19,
						{
							attrs: {ctor: '::', _0: prop, _1: _p19.attrs}
						}));
			case 'Element':
				var _p20 = _p18._0;
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					_elm_lang$core$Native_Utils.update(
						_p20,
						{
							attrs: {ctor: '::', _0: prop, _1: _p20.attrs}
						}));
			default:
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					{
						node: 'div',
						style: _elm_lang$core$Maybe$Nothing,
						attrs: {
							ctor: '::',
							_0: prop,
							_1: {ctor: '[]'}
						},
						child: A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p18._0, _p18._1),
						absolutelyPositioned: _elm_lang$core$Maybe$Nothing
					});
		}
	});
var _mdgriffith$style_elements$Element_Internal_Modify$addAttrToNonText = F2(
	function (prop, el) {
		var _p21 = el;
		switch (_p21.ctor) {
			case 'Empty':
				return _mdgriffith$style_elements$Element_Internal_Model$Empty;
			case 'Raw':
				return _mdgriffith$style_elements$Element_Internal_Model$Raw(_p21._0);
			case 'Spacer':
				return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p21._0);
			case 'Layout':
				var _p22 = _p21._0;
				return _mdgriffith$style_elements$Element_Internal_Model$Layout(
					_elm_lang$core$Native_Utils.update(
						_p22,
						{
							attrs: {ctor: '::', _0: prop, _1: _p22.attrs}
						}));
			case 'Element':
				var _p23 = _p21._0;
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					_elm_lang$core$Native_Utils.update(
						_p23,
						{
							attrs: {ctor: '::', _0: prop, _1: _p23.attrs}
						}));
			default:
				return A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p21._0, _p21._1);
		}
	});
var _mdgriffith$style_elements$Element_Internal_Modify$setNode = F2(
	function (node, el) {
		var _p24 = el;
		switch (_p24.ctor) {
			case 'Empty':
				return _mdgriffith$style_elements$Element_Internal_Model$Empty;
			case 'Raw':
				return _mdgriffith$style_elements$Element_Internal_Model$Raw(_p24._0);
			case 'Spacer':
				return _mdgriffith$style_elements$Element_Internal_Model$Spacer(_p24._0);
			case 'Layout':
				return _mdgriffith$style_elements$Element_Internal_Model$Layout(
					_elm_lang$core$Native_Utils.update(
						_p24._0,
						{node: node}));
			case 'Element':
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					_elm_lang$core$Native_Utils.update(
						_p24._0,
						{node: node}));
			default:
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					{
						node: node,
						style: _elm_lang$core$Maybe$Nothing,
						attrs: {ctor: '[]'},
						child: A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p24._0, _p24._1),
						absolutelyPositioned: _elm_lang$core$Maybe$Nothing
					});
		}
	});

var _mdgriffith$style_elements$Style_Internal_Batchable$toList = function (batchables) {
	var flatten = function (batch) {
		var _p0 = batch;
		switch (_p0.ctor) {
			case 'One':
				return {
					ctor: '::',
					_0: _p0._0,
					_1: {ctor: '[]'}
				};
			case 'Many':
				return _p0._0;
			default:
				return _mdgriffith$style_elements$Style_Internal_Batchable$toList(_p0._0);
		}
	};
	return A2(_elm_lang$core$List$concatMap, flatten, batchables);
};
var _mdgriffith$style_elements$Style_Internal_Batchable$Batch = function (a) {
	return {ctor: 'Batch', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Batchable$batch = _mdgriffith$style_elements$Style_Internal_Batchable$Batch;
var _mdgriffith$style_elements$Style_Internal_Batchable$Many = function (a) {
	return {ctor: 'Many', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Batchable$many = _mdgriffith$style_elements$Style_Internal_Batchable$Many;
var _mdgriffith$style_elements$Style_Internal_Batchable$One = function (a) {
	return {ctor: 'One', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Batchable$one = _mdgriffith$style_elements$Style_Internal_Batchable$One;
var _mdgriffith$style_elements$Style_Internal_Batchable$map = F2(
	function (fn, batchable) {
		var _p1 = batchable;
		switch (_p1.ctor) {
			case 'One':
				return _mdgriffith$style_elements$Style_Internal_Batchable$One(
					fn(_p1._0));
			case 'Many':
				return _mdgriffith$style_elements$Style_Internal_Batchable$Many(
					A2(_elm_lang$core$List$map, fn, _p1._0));
			default:
				return _mdgriffith$style_elements$Style_Internal_Batchable$Batch(
					A2(
						_elm_lang$core$List$map,
						_mdgriffith$style_elements$Style_Internal_Batchable$map(fn),
						_p1._0));
		}
	});

var _mdgriffith$style_elements$Style_Internal_Find$variation = F3(
	function ($class, variation, elements) {
		var find = function (el) {
			var _p0 = el;
			if (_p0.ctor === 'Variation') {
				return (_elm_lang$core$Native_Utils.eq($class, _p0._0) && _elm_lang$core$Native_Utils.eq(_p0._1, variation)) ? _elm_lang$core$Maybe$Just(_p0._2) : _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		};
		var found = _elm_lang$core$List$head(
			A2(_elm_lang$core$List$filterMap, find, elements));
		var _p1 = found;
		if (_p1.ctor === 'Nothing') {
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'No ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(variation),
						A2(
							_elm_lang$core$Basics_ops['++'],
							' variation  present for ',
							_elm_lang$core$Basics$toString($class)))),
				'');
		} else {
			return _p1._0;
		}
	});
var _mdgriffith$style_elements$Style_Internal_Find$style = F2(
	function ($class, elements) {
		var find = function (el) {
			var _p2 = el;
			if (_p2.ctor === 'Style') {
				return _elm_lang$core$Native_Utils.eq(_p2._0, $class) ? _elm_lang$core$Maybe$Just(_p2._1) : _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		};
		var found = _elm_lang$core$List$head(
			A2(_elm_lang$core$List$filterMap, find, elements));
		var _p3 = found;
		if (_p3.ctor === 'Nothing') {
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'No style present for ',
					_elm_lang$core$Basics$toString($class)),
				'');
		} else {
			return _p3._0;
		}
	});
var _mdgriffith$style_elements$Style_Internal_Find$Variation = F3(
	function (a, b, c) {
		return {ctor: 'Variation', _0: a, _1: b, _2: c};
	});
var _mdgriffith$style_elements$Style_Internal_Find$toVariation = F3(
	function ($var, newName, element) {
		var _p4 = element;
		if (_p4.ctor === 'Style') {
			return A3(_mdgriffith$style_elements$Style_Internal_Find$Variation, _p4._0, $var, newName);
		} else {
			return A3(_mdgriffith$style_elements$Style_Internal_Find$Variation, _p4._0, $var, newName);
		}
	});
var _mdgriffith$style_elements$Style_Internal_Find$Style = F2(
	function (a, b) {
		return {ctor: 'Style', _0: a, _1: b};
	});

var _mdgriffith$style_elements$Style_Internal_Selector$getFindable = function (find) {
	getFindable:
	while (true) {
		var _p0 = find;
		switch (_p0.ctor) {
			case 'Select':
				return {
					ctor: '::',
					_0: _p0._1,
					_1: {ctor: '[]'}
				};
			case 'SelectChild':
				var _v1 = _p0._0;
				find = _v1;
				continue getFindable;
			case 'Stack':
				return A2(
					_elm_lang$core$Maybe$withDefault,
					{ctor: '[]'},
					A2(
						_elm_lang$core$Maybe$map,
						function (x) {
							return {
								ctor: '::',
								_0: x,
								_1: {ctor: '[]'}
							};
						},
						_elm_lang$core$List$head(
							_elm_lang$core$List$reverse(
								A2(_elm_lang$core$List$concatMap, _mdgriffith$style_elements$Style_Internal_Selector$getFindable, _p0._0)))));
			default:
				return {ctor: '[]'};
		}
	}
};
var _mdgriffith$style_elements$Style_Internal_Selector$render = F2(
	function (maybeGuard, selector) {
		var spacer = function (sel) {
			var _p1 = sel;
			if (_p1.ctor === 'Pseudo') {
				return '';
			} else {
				return ' ';
			}
		};
		var renderAndSpace = F2(
			function (i, sel) {
				return _elm_lang$core$Native_Utils.eq(i, 0) ? A2(_mdgriffith$style_elements$Style_Internal_Selector$render, maybeGuard, sel) : A2(
					_elm_lang$core$Basics_ops['++'],
					spacer(sel),
					A2(_mdgriffith$style_elements$Style_Internal_Selector$render, maybeGuard, sel));
			});
		var guard = function (str) {
			var _p2 = maybeGuard;
			if (_p2.ctor === 'Nothing') {
				return str;
			} else {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					str,
					A2(_elm_lang$core$Basics_ops['++'], '--', _p2._0));
			}
		};
		var _p3 = selector;
		switch (_p3.ctor) {
			case 'Select':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'.style-elements .',
					guard(_p3._0));
			case 'SelectChild':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'> ',
					A2(_mdgriffith$style_elements$Style_Internal_Selector$render, maybeGuard, _p3._0));
			case 'Free':
				return _p3._0;
			case 'Pseudo':
				return _p3._0;
			default:
				return _elm_lang$core$String$concat(
					A2(_elm_lang$core$List$indexedMap, renderAndSpace, _p3._0));
		}
	});
var _mdgriffith$style_elements$Style_Internal_Selector$topName = function (selector) {
	topName:
	while (true) {
		var _p4 = selector;
		switch (_p4.ctor) {
			case 'Select':
				return _p4._0;
			case 'SelectChild':
				var _v6 = _p4._0;
				selector = _v6;
				continue topName;
			case 'Stack':
				return A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					_elm_lang$core$List$head(
						_elm_lang$core$List$reverse(
							A2(_elm_lang$core$List$map, _mdgriffith$style_elements$Style_Internal_Selector$topName, _p4._0))));
			default:
				return '';
		}
	}
};
var _mdgriffith$style_elements$Style_Internal_Selector$uncapitalize = function (str) {
	var tail = A2(_elm_lang$core$String$dropLeft, 1, str);
	var head = _elm_lang$core$String$toLower(
		A2(_elm_lang$core$String$left, 1, str));
	return A2(_elm_lang$core$Basics_ops['++'], head, tail);
};
var _mdgriffith$style_elements$Style_Internal_Selector$formatName = function (x) {
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('[\\s+]'),
		function (_p5) {
			return '-';
		},
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex('[A-Z0-9]+'),
			function (_p6) {
				var _p7 = _p6;
				return A2(
					_elm_lang$core$Basics_ops['++'],
					' ',
					_elm_lang$core$String$toLower(_p7.match));
			},
			A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex('[^a-zA-Z0-9_-]'),
				function (_p8) {
					return '';
				},
				_mdgriffith$style_elements$Style_Internal_Selector$uncapitalize(
					_elm_lang$core$Basics$toString(x)))));
};
var _mdgriffith$style_elements$Style_Internal_Selector$Stack = function (a) {
	return {ctor: 'Stack', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Selector$Free = function (a) {
	return {ctor: 'Free', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Selector$free = function (str) {
	return _mdgriffith$style_elements$Style_Internal_Selector$Free(str);
};
var _mdgriffith$style_elements$Style_Internal_Selector$SelectChild = function (a) {
	return {ctor: 'SelectChild', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Selector$child = F2(
	function (parent, selector) {
		return _mdgriffith$style_elements$Style_Internal_Selector$Stack(
			{
				ctor: '::',
				_0: parent,
				_1: {
					ctor: '::',
					_0: _mdgriffith$style_elements$Style_Internal_Selector$SelectChild(selector),
					_1: {ctor: '[]'}
				}
			});
	});
var _mdgriffith$style_elements$Style_Internal_Selector$Pseudo = function (a) {
	return {ctor: 'Pseudo', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Selector$Select = F2(
	function (a, b) {
		return {ctor: 'Select', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Selector$guard = F2(
	function (guard, selector) {
		var addGuard = function (str) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				str,
				A2(_elm_lang$core$Basics_ops['++'], '__', guard));
		};
		var onFindable = function (findable) {
			var _p9 = findable;
			if (_p9.ctor === 'Style') {
				return A2(
					_mdgriffith$style_elements$Style_Internal_Find$Style,
					_p9._0,
					addGuard(_p9._1));
			} else {
				return A3(
					_mdgriffith$style_elements$Style_Internal_Find$Variation,
					_p9._0,
					_p9._1,
					addGuard(_p9._2));
			}
		};
		var onSelector = function (sel) {
			var _p10 = sel;
			switch (_p10.ctor) {
				case 'Select':
					return A2(
						_mdgriffith$style_elements$Style_Internal_Selector$Select,
						addGuard(_p10._0),
						onFindable(_p10._1));
				case 'SelectChild':
					return _mdgriffith$style_elements$Style_Internal_Selector$SelectChild(
						onSelector(_p10._0));
				case 'Stack':
					return _mdgriffith$style_elements$Style_Internal_Selector$Stack(
						A2(_elm_lang$core$List$map, onSelector, _p10._0));
				default:
					return _p10;
			}
		};
		return onSelector(selector);
	});
var _mdgriffith$style_elements$Style_Internal_Selector$select = function ($class) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Selector$Select,
		_mdgriffith$style_elements$Style_Internal_Selector$formatName($class),
		A2(
			_mdgriffith$style_elements$Style_Internal_Find$Style,
			$class,
			_mdgriffith$style_elements$Style_Internal_Selector$formatName($class)));
};
var _mdgriffith$style_elements$Style_Internal_Selector$variant = F2(
	function (sel, $var) {
		var _p11 = sel;
		switch (_p11.ctor) {
			case 'Pseudo':
				return _mdgriffith$style_elements$Style_Internal_Selector$Pseudo(_p11._0);
			case 'Select':
				var _p12 = _p11._0;
				return A2(
					_mdgriffith$style_elements$Style_Internal_Selector$Select,
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p12,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'-',
							_mdgriffith$style_elements$Style_Internal_Selector$formatName($var))),
					A3(
						_mdgriffith$style_elements$Style_Internal_Find$toVariation,
						$var,
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p12,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'-',
								_mdgriffith$style_elements$Style_Internal_Selector$formatName($var))),
						_p11._1));
			case 'SelectChild':
				return _mdgriffith$style_elements$Style_Internal_Selector$SelectChild(
					A2(_mdgriffith$style_elements$Style_Internal_Selector$variant, _p11._0, $var));
			case 'Free':
				return _mdgriffith$style_elements$Style_Internal_Selector$Free(_p11._0);
			default:
				var _p14 = _p11._0;
				var init = _elm_lang$core$List$reverse(
					A2(
						_elm_lang$core$List$drop,
						1,
						_elm_lang$core$List$reverse(_p14)));
				var lastElem = _elm_lang$core$List$head(
					_elm_lang$core$List$reverse(_p14));
				var _p13 = lastElem;
				if (_p13.ctor === 'Nothing') {
					return _mdgriffith$style_elements$Style_Internal_Selector$Stack(_p14);
				} else {
					return _mdgriffith$style_elements$Style_Internal_Selector$Stack(
						A2(
							_elm_lang$core$Basics_ops['++'],
							init,
							{
								ctor: '::',
								_0: A2(_mdgriffith$style_elements$Style_Internal_Selector$variant, _p13._0, $var),
								_1: {ctor: '[]'}
							}));
				}
		}
	});
var _mdgriffith$style_elements$Style_Internal_Selector$pseudo = F2(
	function (psu, sel) {
		var _p15 = sel;
		switch (_p15.ctor) {
			case 'Pseudo':
				return _mdgriffith$style_elements$Style_Internal_Selector$Pseudo(
					A2(_elm_lang$core$Basics_ops['++'], _p15._0, psu));
			case 'Select':
				return _mdgriffith$style_elements$Style_Internal_Selector$Stack(
					{
						ctor: '::',
						_0: A2(_mdgriffith$style_elements$Style_Internal_Selector$Select, _p15._0, _p15._1),
						_1: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Style_Internal_Selector$Pseudo(psu),
							_1: {ctor: '[]'}
						}
					});
			case 'SelectChild':
				return _mdgriffith$style_elements$Style_Internal_Selector$SelectChild(
					A2(_mdgriffith$style_elements$Style_Internal_Selector$pseudo, psu, _p15._0));
			case 'Free':
				return _mdgriffith$style_elements$Style_Internal_Selector$Free(_p15._0);
			default:
				var _p17 = _p15._0;
				var init = _elm_lang$core$List$reverse(
					A2(
						_elm_lang$core$List$drop,
						1,
						_elm_lang$core$List$reverse(_p17)));
				var lastElem = _elm_lang$core$List$head(
					_elm_lang$core$List$reverse(_p17));
				var _p16 = lastElem;
				if (_p16.ctor === 'Nothing') {
					return _mdgriffith$style_elements$Style_Internal_Selector$Stack(_p17);
				} else {
					return _mdgriffith$style_elements$Style_Internal_Selector$Stack(
						A2(
							_elm_lang$core$Basics_ops['++'],
							init,
							{
								ctor: '::',
								_0: A2(_mdgriffith$style_elements$Style_Internal_Selector$pseudo, psu, _p16._0),
								_1: {ctor: '[]'}
							}));
				}
		}
	});

var _mdgriffith$style_elements$Style_Internal_Render_Css$prop = F2(
	function (i, _p0) {
		var _p1 = _p0;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_elm_lang$core$String$repeat, i, ' '),
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p1._0,
				A2(
					_elm_lang$core$Basics_ops['++'],
					': ',
					A2(_elm_lang$core$Basics_ops['++'], _p1._1, ';'))));
	});
var _mdgriffith$style_elements$Style_Internal_Render_Css$brace = F2(
	function (i, str) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			' {\n',
			A2(
				_elm_lang$core$Basics_ops['++'],
				str,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\n',
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(_elm_lang$core$String$repeat, i, ' '),
						'}'))));
	});

var _mdgriffith$style_elements$Style_Internal_Intermediate$asFindable = function (intermediate) {
	var findableProp = function (prop) {
		var _p0 = prop;
		switch (_p0.ctor) {
			case 'SubClass':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$asFindable(_p0._0);
			case 'PropsAndSub':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$asFindable(_p0._1);
			default:
				return {ctor: '[]'};
		}
	};
	var _p1 = intermediate;
	if (_p1.ctor === 'Class') {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_mdgriffith$style_elements$Style_Internal_Selector$getFindable(_p1._0.selector),
			A2(_elm_lang$core$List$concatMap, findableProp, _p1._0.props));
	} else {
		return {ctor: '[]'};
	}
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$render = function (renderable) {
	var _p2 = renderable;
	switch (_p2.ctor) {
		case 'RenderableClass':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_p2._0,
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_mdgriffith$style_elements$Style_Internal_Render_Css$brace,
						0,
						A2(
							_elm_lang$core$String$join,
							'\n',
							A2(
								_elm_lang$core$List$map,
								_mdgriffith$style_elements$Style_Internal_Render_Css$prop(2),
								_p2._1))),
					'\n'));
		case 'RenderableMedia':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_p2._0,
				A2(
					_mdgriffith$style_elements$Style_Internal_Render_Css$brace,
					0,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'  ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p2._1,
							A2(
								_mdgriffith$style_elements$Style_Internal_Render_Css$brace,
								2,
								A2(
									_elm_lang$core$String$join,
									'\n',
									A2(
										_elm_lang$core$List$map,
										_mdgriffith$style_elements$Style_Internal_Render_Css$prop(4),
										_p2._2)))))));
		default:
			return _p2._0;
	}
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$hash = function (value) {
	return _elm_lang$core$Basics$toString(
		A2(_Skinney$murmur3$Murmur3$hashString, 8675309, value));
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$calculateGuard = function ($class) {
	var propToString = function (_p3) {
		var _p4 = _p3;
		return A2(_elm_lang$core$Basics_ops['++'], _p4._0, _p4._1);
	};
	var asString = function (prop) {
		var _p5 = prop;
		switch (_p5.ctor) {
			case 'Props':
				return _elm_lang$core$String$concat(
					A2(_elm_lang$core$List$map, propToString, _p5._0));
			case 'SubClass':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$calculateGuard(_p5._0);
			case 'PropsAndSub':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$String$concat(
						A2(_elm_lang$core$List$map, propToString, _p5._0)),
					_mdgriffith$style_elements$Style_Internal_Intermediate$calculateGuard(_p5._1));
			default:
				return '';
		}
	};
	var _p6 = $class;
	switch (_p6.ctor) {
		case 'Class':
			return _elm_lang$core$String$concat(
				A2(_elm_lang$core$List$map, asString, _p6._0.props));
		case 'Media':
			return _elm_lang$core$String$concat(
				A2(_elm_lang$core$List$map, asString, _p6._0.props));
		default:
			return '';
	}
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$Free = function (a) {
	return {ctor: 'Free', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$Media = function (a) {
	return {ctor: 'Media', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$Class = function (a) {
	return {ctor: 'Class', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$Animation = {ctor: 'Animation'};
var _mdgriffith$style_elements$Style_Internal_Intermediate$PropsAndSub = F2(
	function (a, b) {
		return {ctor: 'PropsAndSub', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Intermediate$SubClass = function (a) {
	return {ctor: 'SubClass', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$applyGuard = F2(
	function (guard, $class) {
		var guardProp = function (prop) {
			var _p7 = prop;
			if (_p7.ctor === 'SubClass') {
				return _mdgriffith$style_elements$Style_Internal_Intermediate$SubClass(
					A2(_mdgriffith$style_elements$Style_Internal_Intermediate$applyGuard, guard, _p7._0));
			} else {
				return _p7;
			}
		};
		var _p8 = $class;
		switch (_p8.ctor) {
			case 'Class':
				var _p9 = _p8._0;
				return _mdgriffith$style_elements$Style_Internal_Intermediate$Class(
					{
						selector: A2(_mdgriffith$style_elements$Style_Internal_Selector$guard, guard, _p9.selector),
						props: A2(_elm_lang$core$List$map, guardProp, _p9.props)
					});
			case 'Media':
				var _p10 = _p8._0;
				return _mdgriffith$style_elements$Style_Internal_Intermediate$Media(
					{
						query: _p10.query,
						selector: A2(_mdgriffith$style_elements$Style_Internal_Selector$guard, guard, _p10.selector),
						props: A2(_elm_lang$core$List$map, guardProp, _p10.props)
					});
			default:
				return _p8;
		}
	});
var _mdgriffith$style_elements$Style_Internal_Intermediate$guard = function ($class) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Intermediate$applyGuard,
		_mdgriffith$style_elements$Style_Internal_Intermediate$hash(
			_mdgriffith$style_elements$Style_Internal_Intermediate$calculateGuard($class)),
		$class);
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$asMediaQuery = F2(
	function (query, prop) {
		var classAsMediaQuery = function (cls) {
			var _p11 = cls;
			if (_p11.ctor === 'Class') {
				return _mdgriffith$style_elements$Style_Internal_Intermediate$Media(
					{query: query, selector: _p11._0.selector, props: _p11._0.props});
			} else {
				return _p11;
			}
		};
		var _p12 = prop;
		switch (_p12.ctor) {
			case 'SubClass':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$SubClass(
					classAsMediaQuery(_p12._0));
			case 'PropsAndSub':
				return A2(
					_mdgriffith$style_elements$Style_Internal_Intermediate$PropsAndSub,
					_p12._0,
					classAsMediaQuery(_p12._1));
			default:
				return _p12;
		}
	});
var _mdgriffith$style_elements$Style_Internal_Intermediate$Props = function (a) {
	return {ctor: 'Props', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$props = _mdgriffith$style_elements$Style_Internal_Intermediate$Props;
var _mdgriffith$style_elements$Style_Internal_Intermediate$RenderableFree = function (a) {
	return {ctor: 'RenderableFree', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$RenderableMedia = F3(
	function (a, b, c) {
		return {ctor: 'RenderableMedia', _0: a, _1: b, _2: c};
	});
var _mdgriffith$style_elements$Style_Internal_Intermediate$RenderableClass = F2(
	function (a, b) {
		return {ctor: 'RenderableClass', _0: a, _1: b};
	});
var _mdgriffith$style_elements$Style_Internal_Intermediate$makeRenderable = function (cls) {
	var renderableProps = F2(
		function (prop, _p13) {
			var _p14 = _p13;
			var _p17 = _p14._1;
			var _p16 = _p14._0;
			var _p15 = prop;
			switch (_p15.ctor) {
				case 'Props':
					return {
						ctor: '_Tuple2',
						_0: A2(_elm_lang$core$Basics_ops['++'], _p16, _p15._0),
						_1: _p17
					};
				case 'SubClass':
					return {
						ctor: '_Tuple2',
						_0: _p16,
						_1: A2(
							_elm_lang$core$Basics_ops['++'],
							_p17,
							_mdgriffith$style_elements$Style_Internal_Intermediate$makeRenderable(_p15._0))
					};
				case 'PropsAndSub':
					return {
						ctor: '_Tuple2',
						_0: A2(_elm_lang$core$Basics_ops['++'], _p16, _p15._0),
						_1: A2(
							_elm_lang$core$Basics_ops['++'],
							_p17,
							_mdgriffith$style_elements$Style_Internal_Intermediate$makeRenderable(_p15._1))
					};
				default:
					return {ctor: '_Tuple2', _0: _p16, _1: _p17};
			}
		});
	var _p18 = cls;
	switch (_p18.ctor) {
		case 'Class':
			var _p19 = A3(
				_elm_lang$core$List$foldl,
				renderableProps,
				{
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: {ctor: '[]'}
				},
				_p18._0.props);
			var rendered = _p19._0;
			var subelements = _p19._1;
			return {
				ctor: '::',
				_0: A2(
					_mdgriffith$style_elements$Style_Internal_Intermediate$RenderableClass,
					A2(_mdgriffith$style_elements$Style_Internal_Selector$render, _elm_lang$core$Maybe$Nothing, _p18._0.selector),
					rendered),
				_1: subelements
			};
		case 'Media':
			var _p20 = A3(
				_elm_lang$core$List$foldl,
				renderableProps,
				{
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: {ctor: '[]'}
				},
				_p18._0.props);
			var rendered = _p20._0;
			var subelements = _p20._1;
			return {
				ctor: '::',
				_0: A3(
					_mdgriffith$style_elements$Style_Internal_Intermediate$RenderableMedia,
					_p18._0.query,
					A2(_mdgriffith$style_elements$Style_Internal_Selector$render, _elm_lang$core$Maybe$Nothing, _p18._0.selector),
					rendered),
				_1: subelements
			};
		default:
			return {
				ctor: '::',
				_0: _mdgriffith$style_elements$Style_Internal_Intermediate$RenderableFree(_p18._0),
				_1: {ctor: '[]'}
			};
	}
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$raw = function (cls) {
	var topName = function () {
		var _p21 = cls;
		switch (_p21.ctor) {
			case 'Class':
				return _mdgriffith$style_elements$Style_Internal_Selector$topName(_p21._0.selector);
			case 'Media':
				return _mdgriffith$style_elements$Style_Internal_Selector$topName(_p21._0.selector);
			default:
				return '';
		}
	}();
	return {
		ctor: '_Tuple2',
		_0: topName,
		_1: A2(
			_elm_lang$core$String$join,
			'\n',
			A2(
				_elm_lang$core$List$map,
				_mdgriffith$style_elements$Style_Internal_Intermediate$render,
				_mdgriffith$style_elements$Style_Internal_Intermediate$makeRenderable(cls)))
	};
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$Rendered = function (a) {
	return {ctor: 'Rendered', _0: a};
};
var _mdgriffith$style_elements$Style_Internal_Intermediate$finalize = function (intermediates) {
	var finalizeCss = function (cls) {
		return A2(
			_elm_lang$core$String$join,
			'\n',
			A2(
				_elm_lang$core$List$map,
				_mdgriffith$style_elements$Style_Internal_Intermediate$render,
				_mdgriffith$style_elements$Style_Internal_Intermediate$makeRenderable(cls)));
	};
	return _mdgriffith$style_elements$Style_Internal_Intermediate$Rendered(
		{
			css: A2(
				_elm_lang$core$String$join,
				'\n',
				A2(_elm_lang$core$List$map, finalizeCss, intermediates)),
			findable: A2(_elm_lang$core$List$concatMap, _mdgriffith$style_elements$Style_Internal_Intermediate$asFindable, intermediates)
		});
};

var _mdgriffith$style_elements$Style_Internal_Render_Value$typeface = function (families) {
	return A2(
		_elm_lang$core$String$join,
		', ',
		A2(
			_elm_lang$core$List$map,
			function (fam) {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'\"',
					A2(_elm_lang$core$Basics_ops['++'], fam, '\"'));
			},
			families));
};
var _mdgriffith$style_elements$Style_Internal_Render_Value$gridPosition = function (_p0) {
	var _p1 = _p0;
	var _p6 = _p1._0.width;
	var _p5 = _p1._0.height;
	var _p2 = _p1._0.start;
	var x = _p2._0;
	var y = _p2._1;
	var _p3 = {ctor: '_Tuple2', _0: y + 1, _1: (y + 1) + _p5};
	var rowStart = _p3._0;
	var rowEnd = _p3._1;
	var _p4 = {ctor: '_Tuple2', _0: x + 1, _1: (x + 1) + _p6};
	var colStart = _p4._0;
	var colEnd = _p4._1;
	return (_elm_lang$core$Native_Utils.eq(_p6, 0) || _elm_lang$core$Native_Utils.eq(_p5, 0)) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
		A2(
			_elm_lang$core$String$join,
			' / ',
			{
				ctor: '::',
				_0: _elm_lang$core$Basics$toString(rowStart),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Basics$toString(colStart),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Basics$toString(rowEnd),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Basics$toString(colEnd),
							_1: {ctor: '[]'}
						}
					}
				}
			}));
};
var _mdgriffith$style_elements$Style_Internal_Render_Value$color = function (color) {
	var _p7 = _elm_lang$core$Color$toRgb(color);
	var red = _p7.red;
	var green = _p7.green;
	var blue = _p7.blue;
	var alpha = _p7.alpha;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		A2(
			_elm_lang$core$Basics_ops['++'],
			'rgba(',
			_elm_lang$core$Basics$toString(red)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$Basics_ops['++'],
				',',
				_elm_lang$core$Basics$toString(green)),
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$Basics_ops['++'],
					',',
					_elm_lang$core$Basics$toString(blue)),
				A2(
					_elm_lang$core$Basics_ops['++'],
					',',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(alpha),
						')')))));
};
var _mdgriffith$style_elements$Style_Internal_Render_Value$shadow = function (_p8) {
	var _p9 = _p8;
	var _p10 = _p9._0;
	return A2(
		_elm_lang$core$String$join,
		' ',
		A2(
			_elm_lang$core$List$filterMap,
			_elm_lang$core$Basics$identity,
			{
				ctor: '::',
				_0: _elm_lang$core$Native_Utils.eq(_p10.kind, 'inset') ? _elm_lang$core$Maybe$Just('inset') : _elm_lang$core$Maybe$Nothing,
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(
								_elm_lang$core$Tuple$first(_p10.offset)),
							'px')),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Maybe$Just(
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(
									_elm_lang$core$Tuple$second(_p10.offset)),
								'px')),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p10.blur),
									'px')),
							_1: {
								ctor: '::',
								_0: (_elm_lang$core$Native_Utils.eq(_p10.kind, 'text') || _elm_lang$core$Native_Utils.eq(_p10.kind, 'drop')) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p10.size),
										'px')),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Maybe$Just(
										_mdgriffith$style_elements$Style_Internal_Render_Value$color(_p10.color)),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}));
};
var _mdgriffith$style_elements$Style_Internal_Render_Value$parentAdjustedLength = F2(
	function (len, adjustment) {
		var _p11 = len;
		switch (_p11.ctor) {
			case 'Px':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p11._0),
					'px');
			case 'Percent':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'calc(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p11._0),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'% - ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(adjustment),
								'px)'))));
			case 'Auto':
				return 'auto';
			case 'Fill':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'calc(100% - ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(adjustment),
						'px)'));
			default:
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'calc(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p11._0),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'% + ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p11._1),
								'px)'))));
		}
	});
var _mdgriffith$style_elements$Style_Internal_Render_Value$length = function (l) {
	var _p12 = l;
	switch (_p12.ctor) {
		case 'Px':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p12._0),
				'px');
		case 'Percent':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p12._0),
				'%');
		case 'Auto':
			return 'auto';
		case 'Fill':
			return '100%';
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'calc(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p12._0),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'% + ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p12._1),
							'px)'))));
	}
};
var _mdgriffith$style_elements$Style_Internal_Render_Value$box = function (_p13) {
	var _p14 = _p13;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(_p14._0),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'px ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p14._1),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'px ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p14._2),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'px ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p14._3),
								'px')))))));
};

var _mdgriffith$style_elements$Style_Internal_Render_Property$flexbox = F2(
	function (dir, el) {
		var _p0 = el;
		switch (_p0.ctor) {
			case 'Wrap':
				return _p0._0 ? {ctor: '_Tuple2', _0: 'flex-wrap', _1: 'wrap'} : {ctor: '_Tuple2', _0: 'flex-wrap', _1: 'nowrap'};
			case 'Horz':
				var _p6 = _p0._0;
				var _p1 = dir;
				switch (_p1.ctor) {
					case 'GoRight':
						var _p2 = _p6;
						switch (_p2.ctor) {
							case 'Other':
								if (_p2._0.ctor === 'Left') {
									return {ctor: '_Tuple2', _0: 'justify-content', _1: 'flex-start'};
								} else {
									return {ctor: '_Tuple2', _0: 'justify-content', _1: 'flex-end'};
								}
							case 'Center':
								return {ctor: '_Tuple2', _0: 'justify-content', _1: 'center'};
							case 'Justify':
								return {ctor: '_Tuple2', _0: 'justify-content', _1: 'space-between'};
							default:
								return {ctor: '_Tuple2', _0: 'justify-content', _1: 'space-between'};
						}
					case 'GoLeft':
						var _p3 = _p6;
						switch (_p3.ctor) {
							case 'Other':
								if (_p3._0.ctor === 'Left') {
									return {ctor: '_Tuple2', _0: 'justify-content', _1: 'flex-end'};
								} else {
									return {ctor: '_Tuple2', _0: 'justify-content', _1: 'flex-start'};
								}
							case 'Center':
								return {ctor: '_Tuple2', _0: 'justify-content', _1: 'center'};
							case 'Justify':
								return {ctor: '_Tuple2', _0: 'justify-content', _1: 'space-between'};
							default:
								return {ctor: '_Tuple2', _0: 'justify-content', _1: 'space-between'};
						}
					case 'Down':
						var _p4 = _p6;
						switch (_p4.ctor) {
							case 'Other':
								if (_p4._0.ctor === 'Left') {
									return {ctor: '_Tuple2', _0: 'align-items', _1: 'flex-start'};
								} else {
									return {ctor: '_Tuple2', _0: 'align-items', _1: 'flex-end'};
								}
							case 'Center':
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'center'};
							case 'Justify':
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'Justify'};
							default:
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'Justify'};
						}
					default:
						var _p5 = _p6;
						switch (_p5.ctor) {
							case 'Other':
								if (_p5._0.ctor === 'Left') {
									return {ctor: '_Tuple2', _0: 'align-items', _1: 'flex-start'};
								} else {
									return {ctor: '_Tuple2', _0: 'align-items', _1: 'flex-end'};
								}
							case 'Center':
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'center'};
							case 'Justify':
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'Justify'};
							default:
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'Justify'};
						}
				}
			default:
				var _p12 = _p0._0;
				var _p7 = dir;
				switch (_p7.ctor) {
					case 'GoRight':
						var _p8 = _p12;
						switch (_p8.ctor) {
							case 'Other':
								if (_p8._0.ctor === 'Top') {
									return {ctor: '_Tuple2', _0: 'align-items', _1: 'flex-start'};
								} else {
									return {ctor: '_Tuple2', _0: 'align-items', _1: 'flex-end'};
								}
							case 'Center':
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'center'};
							case 'Justify':
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'Justify'};
							default:
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'Justify'};
						}
					case 'GoLeft':
						var _p9 = _p12;
						switch (_p9.ctor) {
							case 'Other':
								if (_p9._0.ctor === 'Top') {
									return {ctor: '_Tuple2', _0: 'align-items', _1: 'flex-start'};
								} else {
									return {ctor: '_Tuple2', _0: 'align-items', _1: 'flex-end'};
								}
							case 'Center':
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'center'};
							case 'Justify':
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'Justify'};
							default:
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'Justify'};
						}
					case 'Down':
						var _p10 = _p12;
						switch (_p10.ctor) {
							case 'Other':
								if (_p10._0.ctor === 'Top') {
									return {ctor: '_Tuple2', _0: 'justify-content', _1: 'flex-start'};
								} else {
									return {ctor: '_Tuple2', _0: 'justify-content', _1: 'flex-end'};
								}
							case 'Center':
								return {ctor: '_Tuple2', _0: 'justify-content', _1: 'center'};
							case 'Justify':
								return {ctor: '_Tuple2', _0: 'justify-content', _1: 'space-between'};
							default:
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'Justify'};
						}
					default:
						var _p11 = _p12;
						switch (_p11.ctor) {
							case 'Other':
								if (_p11._0.ctor === 'Top') {
									return {ctor: '_Tuple2', _0: 'justify-content', _1: 'flex-end'};
								} else {
									return {ctor: '_Tuple2', _0: 'justify-content', _1: 'flex-start'};
								}
							case 'Center':
								return {ctor: '_Tuple2', _0: 'justify-content', _1: 'center'};
							case 'Justify':
								return {ctor: '_Tuple2', _0: 'justify-content', _1: 'space-between'};
							default:
								return {ctor: '_Tuple2', _0: 'align-items', _1: 'Justify'};
						}
				}
		}
	});
var _mdgriffith$style_elements$Style_Internal_Render_Property$transition = function (_p13) {
	var _p14 = _p13;
	var formatTrans = function (prop) {
		return A2(
			_elm_lang$core$String$join,
			' ',
			{
				ctor: '::',
				_0: prop,
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p14._0.duration * _elm_lang$core$Time$millisecond),
						'ms'),
					_1: {
						ctor: '::',
						_0: _p14._0.easing,
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p14._0.delay * _elm_lang$core$Time$millisecond),
								'ms'),
							_1: {ctor: '[]'}
						}
					}
				}
			});
	};
	return A2(
		_elm_lang$core$String$join,
		', ',
		A2(_elm_lang$core$List$map, formatTrans, _p14._0.props));
};
var _mdgriffith$style_elements$Style_Internal_Render_Property$direction = function (dir) {
	var _p15 = dir;
	switch (_p15.ctor) {
		case 'GoRight':
			return {ctor: '_Tuple2', _0: 'flex-direction', _1: 'row'};
		case 'GoLeft':
			return {ctor: '_Tuple2', _0: 'flex-direction', _1: 'row-reverse'};
		case 'Down':
			return {ctor: '_Tuple2', _0: 'flex-direction', _1: 'column'};
		default:
			return {ctor: '_Tuple2', _0: 'flex-direction', _1: 'column-reverse'};
	}
};
var _mdgriffith$style_elements$Style_Internal_Render_Property$gridAlignment = function (align) {
	var _p16 = align;
	switch (_p16.ctor) {
		case 'GridGap':
			return {
				ctor: '_Tuple2',
				_0: 'grid-gap',
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p16._0),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'px ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p16._1),
							'px')))
			};
		case 'GridH':
			var _p17 = _p16._0;
			switch (_p17.ctor) {
				case 'Other':
					if (_p17._0.ctor === 'Left') {
						return {ctor: '_Tuple2', _0: 'justify-content', _1: 'start'};
					} else {
						return {ctor: '_Tuple2', _0: 'justify-content', _1: 'end'};
					}
				case 'Center':
					return {ctor: '_Tuple2', _0: 'justify-content', _1: 'center'};
				case 'Justify':
					return {ctor: '_Tuple2', _0: 'justify-content', _1: 'space-between'};
				default:
					return {ctor: '_Tuple2', _0: 'justify-content', _1: 'space-between'};
			}
		default:
			var _p18 = _p16._0;
			switch (_p18.ctor) {
				case 'Other':
					if (_p18._0.ctor === 'Top') {
						return {ctor: '_Tuple2', _0: 'align-content', _1: 'start'};
					} else {
						return {ctor: '_Tuple2', _0: 'align-content', _1: 'end'};
					}
				case 'Center':
					return {ctor: '_Tuple2', _0: 'align-content', _1: 'center'};
				case 'Justify':
					return {ctor: '_Tuple2', _0: 'align-content', _1: 'space-between'};
				default:
					return {ctor: '_Tuple2', _0: 'align-content', _1: 'space-between'};
			}
	}
};
var _mdgriffith$style_elements$Style_Internal_Render_Property$layout = F2(
	function (inline, lay) {
		var _p19 = lay;
		switch (_p19.ctor) {
			case 'TextLayout':
				return {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'display',
						_1: inline ? 'inline-block' : 'block'
					},
					_1: {ctor: '[]'}
				};
			case 'FlexLayout':
				var _p20 = _p19._0;
				return {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'display',
						_1: inline ? 'inline-flex' : 'flex'
					},
					_1: {
						ctor: '::',
						_0: _mdgriffith$style_elements$Style_Internal_Render_Property$direction(_p20),
						_1: A2(
							_elm_lang$core$List$map,
							_mdgriffith$style_elements$Style_Internal_Render_Property$flexbox(_p20),
							_p19._1)
					}
				};
			default:
				if (_p19._0.ctor === 'NamedGridTemplate') {
					var _p31 = _p19._0._0.rows;
					var _p30 = _p19._0._0.columns;
					var areaSpan = function (_p21) {
						var _p22 = _p21;
						var name = function () {
							var _p23 = _p22._1;
							if (_p23.ctor === 'Nothing') {
								return '.';
							} else {
								return _p23._0;
							}
						}();
						var _p24 = _p22._0;
						if (_p24.ctor === 'SpanAll') {
							return A2(
								_elm_lang$core$List$repeat,
								_elm_lang$core$List$length(_p30),
								name);
						} else {
							return A2(_elm_lang$core$List$repeat, _p24._0, name);
						}
					};
					var areasInRow = function (areas) {
						var areaStrs = A2(_elm_lang$core$List$concatMap, areaSpan, areas);
						var quote = function (str) {
							return A2(
								_elm_lang$core$Basics_ops['++'],
								'\"',
								A2(_elm_lang$core$Basics_ops['++'], str, '\"'));
						};
						if (_elm_lang$core$Native_Utils.cmp(
							_elm_lang$core$List$length(areaStrs),
							_elm_lang$core$List$length(_p30)) > 0) {
							var _p25 = A2(
								_elm_lang$core$Basics_ops['++'],
								A2(_elm_lang$core$Debug$log, 'style-elements', 'Named grid row ('),
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(areas),
									') is too big for this grid!'));
							return quote(
								A2(_elm_lang$core$String$join, ' ', areaStrs));
						} else {
							if (_elm_lang$core$Native_Utils.cmp(
								_elm_lang$core$List$length(areaStrs),
								_elm_lang$core$List$length(_p30)) < 0) {
								var _p26 = A2(
									_elm_lang$core$Basics_ops['++'],
									A2(_elm_lang$core$Debug$log, 'style-elements', 'Named grid row ('),
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(areas),
										') doesn\'t have enough names to fit this grid!'));
								return quote(
									A2(_elm_lang$core$String$join, ' ', areaStrs));
							} else {
								return quote(
									A2(_elm_lang$core$String$join, ' ', areaStrs));
							}
						}
					};
					var alignment = A2(_elm_lang$core$List$map, _mdgriffith$style_elements$Style_Internal_Render_Property$gridAlignment, _p19._1);
					var renderLen = function (len) {
						var _p27 = len;
						switch (_p27.ctor) {
							case 'Px':
								return A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p27._0),
									'px');
							case 'Percent':
								return A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p27._0),
									'%');
							case 'Auto':
								return 'auto';
							case 'Fill':
								return A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p27._0),
									'fr');
							default:
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'calc(',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p27._0),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'% + ',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_elm_lang$core$Basics$toString(_p27._1),
												'px)'))));
						}
					};
					var grid = inline ? {ctor: '_Tuple2', _0: 'display', _1: 'inline-grid'} : {ctor: '_Tuple2', _0: 'display', _1: 'grid'};
					return {
						ctor: '::',
						_0: grid,
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'grid-template-rows',
								_1: A2(
									_elm_lang$core$String$join,
									' ',
									A2(
										_elm_lang$core$List$map,
										function (_p28) {
											return renderLen(
												_elm_lang$core$Tuple$first(_p28));
										},
										_p31))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'grid-template-columns',
									_1: A2(
										_elm_lang$core$String$join,
										' ',
										A2(_elm_lang$core$List$map, renderLen, _p30))
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'grid-template-areas',
										_1: A2(
											_elm_lang$core$String$join,
											'\n',
											A2(
												_elm_lang$core$List$map,
												function (_p29) {
													return areasInRow(
														_elm_lang$core$Tuple$second(_p29));
												},
												_p31))
									},
									_1: alignment
								}
							}
						}
					};
				} else {
					var alignment = A2(_elm_lang$core$List$map, _mdgriffith$style_elements$Style_Internal_Render_Property$gridAlignment, _p19._1);
					var renderLen = function (len) {
						var _p32 = len;
						switch (_p32.ctor) {
							case 'Px':
								return A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p32._0),
									'px');
							case 'Percent':
								return A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p32._0),
									'%');
							case 'Auto':
								return 'auto';
							case 'Fill':
								return A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p32._0),
									'fr');
							default:
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'calc(',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p32._0),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'% + ',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_elm_lang$core$Basics$toString(_p32._1),
												'px)'))));
						}
					};
					var grid = inline ? {ctor: '_Tuple2', _0: 'display', _1: 'inline-grid'} : {ctor: '_Tuple2', _0: 'display', _1: 'grid'};
					return {
						ctor: '::',
						_0: grid,
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'grid-template-rows',
								_1: A2(
									_elm_lang$core$String$join,
									' ',
									A2(_elm_lang$core$List$map, renderLen, _p19._0._0.rows))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'grid-template-columns',
									_1: A2(
										_elm_lang$core$String$join,
										' ',
										A2(_elm_lang$core$List$map, renderLen, _p19._0._0.columns))
								},
								_1: alignment
							}
						}
					};
				}
		}
	});
var _mdgriffith$style_elements$Style_Internal_Render_Property$background = function (prop) {
	var renderStep = function (step) {
		var _p33 = step;
		switch (_p33.ctor) {
			case 'ColorStep':
				return _mdgriffith$style_elements$Style_Internal_Render_Value$color(_p33._0);
			case 'PercentStep':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_mdgriffith$style_elements$Style_Internal_Render_Value$color(_p33._0),
					A2(
						_elm_lang$core$Basics_ops['++'],
						' ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p33._1),
							'%')));
			default:
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_mdgriffith$style_elements$Style_Internal_Render_Value$color(_p33._0),
					A2(
						_elm_lang$core$Basics_ops['++'],
						' ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p33._1),
							'px')));
		}
	};
	var directionName = function (dir) {
		var _p34 = dir;
		switch (_p34.ctor) {
			case 'ToUp':
				return 'to top';
			case 'ToDown':
				return 'to bottomn';
			case 'ToRight':
				return 'to right';
			case 'ToTopRight':
				return 'to top right';
			case 'ToBottomRight':
				return 'to bottom right';
			case 'ToLeft':
				return 'to left';
			case 'ToTopLeft':
				return 'to top left';
			case 'ToBottomLeft':
				return 'to bottom left';
			default:
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p34._0),
					'rad');
		}
	};
	var _p35 = prop;
	switch (_p35.ctor) {
		case 'BackgroundElement':
			return {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: _p35._0, _1: _p35._1},
				_1: {ctor: '[]'}
			};
		case 'BackgroundImage':
			var _p37 = _p35._0.position;
			return {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'background-image', _1: _p35._0.src},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'background-repeat',
						_1: function () {
							var _p36 = _p35._0.repeat;
							switch (_p36.ctor) {
								case 'RepeatX':
									return 'repeat-x';
								case 'RepeatY':
									return 'repeat-y';
								case 'Repeat':
									return 'repeat';
								case 'Space':
									return 'space';
								case 'Round':
									return 'round';
								default:
									return 'no-repeat';
							}
						}()
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'background-position',
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(
									_elm_lang$core$Tuple$first(_p37)),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'px ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(
											_elm_lang$core$Tuple$second(_p37)),
										'px')))
						},
						_1: {ctor: '[]'}
					}
				}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'background-image',
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						'linear-gradient(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(
								_elm_lang$core$String$join,
								', ',
								{
									ctor: '::',
									_0: directionName(_p35._0),
									_1: A2(_elm_lang$core$List$map, renderStep, _p35._1)
								}),
							')'))
				},
				_1: {ctor: '[]'}
			};
	}
};
var _mdgriffith$style_elements$Style_Internal_Render_Property$position = function (posEls) {
	var renderPos = function (pos) {
		var _p38 = pos;
		switch (_p38.ctor) {
			case 'RelativeTo':
				switch (_p38._0.ctor) {
					case 'Screen':
						return {ctor: '_Tuple2', _0: 'position', _1: 'fixed'};
					case 'Parent':
						return {ctor: '_Tuple2', _0: 'position', _1: 'absolute'};
					default:
						return {ctor: '_Tuple2', _0: 'position', _1: 'relative'};
				}
			case 'PosLeft':
				return {
					ctor: '_Tuple2',
					_0: 'left',
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p38._0),
						'px')
				};
			case 'PosRight':
				return {
					ctor: '_Tuple2',
					_0: 'right',
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p38._0),
						'px')
				};
			case 'PosTop':
				return {
					ctor: '_Tuple2',
					_0: 'top',
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p38._0),
						'px')
				};
			case 'PosBottom':
				return {
					ctor: '_Tuple2',
					_0: 'bottom',
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p38._0),
						'px')
				};
			case 'ZIndex':
				return {
					ctor: '_Tuple2',
					_0: 'z-index',
					_1: _elm_lang$core$Basics$toString(_p38._0)
				};
			case 'Inline':
				return {ctor: '_Tuple2', _0: 'display', _1: 'inline-block'};
			default:
				switch (_p38._0.ctor) {
					case 'FloatLeft':
						return {ctor: '_Tuple2', _0: 'float', _1: 'left'};
					case 'FloatRight':
						return {ctor: '_Tuple2', _0: 'float', _1: 'right'};
					case 'FloatTopLeft':
						return {ctor: '_Tuple2', _0: 'float', _1: 'left'};
					default:
						return {ctor: '_Tuple2', _0: 'float', _1: 'right'};
				}
		}
	};
	return A2(_elm_lang$core$List$map, renderPos, posEls);
};
var _mdgriffith$style_elements$Style_Internal_Render_Property$transformations = function (transforms) {
	var transformToString = function (transform) {
		var _p39 = transform;
		switch (_p39.ctor) {
			case 'Translate':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'translate3d(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p39._0),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'px, ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p39._1),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'px, ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p39._2),
										'px)'))))));
			case 'RotateAround':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'rotate3d(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p39._0),
						A2(
							_elm_lang$core$Basics_ops['++'],
							',',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p39._1),
								A2(
									_elm_lang$core$Basics_ops['++'],
									',',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p39._2),
										A2(
											_elm_lang$core$Basics_ops['++'],
											',',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_elm_lang$core$Basics$toString(_p39._3),
												'rad)'))))))));
			case 'Rotate':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'rotate(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p39._0),
						'rad)'));
			default:
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'scale3d(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p39._0),
						A2(
							_elm_lang$core$Basics_ops['++'],
							', ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p39._1),
								A2(
									_elm_lang$core$Basics_ops['++'],
									', ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p39._2),
										')'))))));
		}
	};
	var transformString = A2(
		_elm_lang$core$String$join,
		' ',
		A2(_elm_lang$core$List$map, transformToString, transforms));
	var renderedTransforms = (_elm_lang$core$Native_Utils.cmp(
		_elm_lang$core$String$length(transformString),
		0) > 0) ? {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'transform', _1: transformString},
		_1: {ctor: '[]'}
	} : {ctor: '[]'};
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$List$length(transforms),
		0) ? {ctor: '[]'} : renderedTransforms;
};
var _mdgriffith$style_elements$Style_Internal_Render_Property$box = function (_p40) {
	var _p41 = _p40;
	return {ctor: '_Tuple2', _0: _p41._0, _1: _p41._1};
};
var _mdgriffith$style_elements$Style_Internal_Render_Property$shadow = function (shadows) {
	var _p42 = A2(
		_elm_lang$core$List$partition,
		function (_p43) {
			var _p44 = _p43;
			return _elm_lang$core$Native_Utils.eq(_p44._0.kind, 'text');
		},
		shadows);
	var text = _p42._0;
	var box = _p42._1;
	var renderedBox = A2(
		_elm_lang$core$String$join,
		', ',
		A2(_elm_lang$core$List$map, _mdgriffith$style_elements$Style_Internal_Render_Value$shadow, box));
	var renderedText = A2(
		_elm_lang$core$String$join,
		', ',
		A2(_elm_lang$core$List$map, _mdgriffith$style_elements$Style_Internal_Render_Value$shadow, text));
	return A2(
		_elm_lang$core$List$filterMap,
		_elm_lang$core$Basics$identity,
		{
			ctor: '::',
			_0: _elm_lang$core$Native_Utils.eq(renderedBox, '') ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
				{ctor: '_Tuple2', _0: 'box-shadow', _1: renderedBox}),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Native_Utils.eq(renderedText, '') ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
					{ctor: '_Tuple2', _0: 'text-shadow', _1: renderedText}),
				_1: {ctor: '[]'}
			}
		});
};
var _mdgriffith$style_elements$Style_Internal_Render_Property$filters = function (filters) {
	var filterName = function (filtr) {
		var _p45 = filtr;
		switch (_p45.ctor) {
			case 'FilterUrl':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'url(',
					A2(_elm_lang$core$Basics_ops['++'], _p45._0, ')'));
			case 'Blur':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'blur(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p45._0),
						'px)'));
			case 'Brightness':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'brightness(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p45._0),
						'%)'));
			case 'Contrast':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'contrast(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p45._0),
						'%)'));
			case 'Grayscale':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'grayscale(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p45._0),
						'%)'));
			case 'HueRotate':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'hueRotate(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p45._0),
						'deg)'));
			case 'Invert':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'invert(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p45._0),
						'%)'));
			case 'OpacityFilter':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'opacity(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p45._0),
						'%)'));
			case 'Saturate':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'saturate(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p45._0),
						'%)'));
			case 'Sepia':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'sepia(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p45._0),
						'%)'));
			default:
				var _p46 = _p45._0;
				var shadowModel = _mdgriffith$style_elements$Style_Internal_Model$ShadowModel(
					{kind: 'drop', offset: _p46.offset, size: _p46.size, blur: _p46.blur, color: _p46.color});
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'drop-shadow(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_mdgriffith$style_elements$Style_Internal_Render_Value$shadow(shadowModel),
						')'));
		}
	};
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$List$length(filters),
		0) ? {ctor: '[]'} : {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'filter',
			_1: A2(
				_elm_lang$core$String$join,
				' ',
				A2(_elm_lang$core$List$map, filterName, filters))
		},
		_1: {ctor: '[]'}
	};
};
var _mdgriffith$style_elements$Style_Internal_Render_Property$flexHeight = function (l) {
	var _p47 = l;
	switch (_p47.ctor) {
		case 'Px':
			return {
				ctor: '_Tuple2',
				_0: 'height',
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p47._0),
					'px')
			};
		case 'Percent':
			return {
				ctor: '_Tuple2',
				_0: 'height',
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p47._0),
					'%')
			};
		case 'Auto':
			return {ctor: '_Tuple2', _0: 'height', _1: 'auto'};
		case 'Fill':
			return {
				ctor: '_Tuple2',
				_0: 'flex-grow',
				_1: _elm_lang$core$Basics$toString(_p47._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'height',
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					'calc(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p47._0),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'% + ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p47._1),
								'px)'))))
			};
	}
};
var _mdgriffith$style_elements$Style_Internal_Render_Property$flexWidth = F2(
	function (len, adjustment) {
		var _p48 = len;
		switch (_p48.ctor) {
			case 'Px':
				return {
					ctor: '_Tuple2',
					_0: 'width',
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p48._0),
						'px')
				};
			case 'Percent':
				return {
					ctor: '_Tuple2',
					_0: 'width',
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						'calc(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p48._0),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'% - ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(adjustment),
									'px)'))))
				};
			case 'Auto':
				return {ctor: '_Tuple2', _0: 'width', _1: 'auto'};
			case 'Fill':
				return {
					ctor: '_Tuple2',
					_0: 'flex-grow',
					_1: _elm_lang$core$Basics$toString(_p48._0)
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: 'width',
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						'calc(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p48._0),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'% + ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p48._1),
									'px)'))))
				};
		}
	});
var _mdgriffith$style_elements$Style_Internal_Render_Property$visibility = function (vis) {
	var _p49 = vis;
	switch (_p49.ctor) {
		case 'Hidden':
			return {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'display', _1: 'none'},
				_1: {ctor: '[]'}
			};
		case 'Invisible':
			return {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'visibility', _1: 'hidden'},
				_1: {ctor: '[]'}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'opacity',
					_1: _elm_lang$core$Basics$toString(_p49._0)
				},
				_1: {ctor: '[]'}
			};
	}
};

var _mdgriffith$style_elements$Style_Internal_Render$renderVariationProp = F2(
	function (parentClass, prop) {
		var _p0 = prop;
		switch (_p0.ctor) {
			case 'Child':
				return _elm_lang$core$Maybe$Nothing;
			case 'Variation':
				return _elm_lang$core$Maybe$Nothing;
			case 'PseudoElement':
				return function (_p1) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$SubClass(
							_mdgriffith$style_elements$Style_Internal_Intermediate$Class(_p1)));
				}(
					{
						selector: A2(
							_elm_lang$core$Debug$log,
							'rendering variation pseudo',
							A2(_mdgriffith$style_elements$Style_Internal_Selector$pseudo, _p0._0, parentClass)),
						props: A2(
							_elm_lang$core$List$filterMap,
							_mdgriffith$style_elements$Style_Internal_Render$renderVariationProp(parentClass),
							_p0._1)
					});
			case 'MediaQuery':
				var _p3 = _p0._0;
				return function (_p2) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$SubClass(
							_mdgriffith$style_elements$Style_Internal_Intermediate$Media(_p2)));
				}(
					{
						query: A2(_elm_lang$core$Basics_ops['++'], '@media ', _p3),
						selector: parentClass,
						props: A2(
							_elm_lang$core$List$map,
							_mdgriffith$style_elements$Style_Internal_Intermediate$asMediaQuery(_p3),
							A2(
								_elm_lang$core$List$filterMap,
								_mdgriffith$style_elements$Style_Internal_Render$renderVariationProp(parentClass),
								_p0._1))
					});
			case 'Exact':
				return function (_p4) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$props(_p4));
				}(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p0._0, _1: _p0._1},
						_1: {ctor: '[]'}
					});
			case 'Visibility':
				return function (_p5) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$props(_p5));
				}(
					_mdgriffith$style_elements$Style_Internal_Render_Property$visibility(_p0._0));
			case 'Position':
				return function (_p6) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$props(_p6));
				}(
					_mdgriffith$style_elements$Style_Internal_Render_Property$position(_p0._0));
			case 'Font':
				return function (_p7) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$props(_p7));
				}(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p0._0, _1: _p0._1},
						_1: {ctor: '[]'}
					});
			case 'Layout':
				return function (_p8) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$props(_p8));
				}(
					A2(_mdgriffith$style_elements$Style_Internal_Render_Property$layout, false, _p0._0));
			case 'Background':
				return function (_p9) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$props(_p9));
				}(
					_mdgriffith$style_elements$Style_Internal_Render_Property$background(_p0._0));
			case 'Shadows':
				return function (_p10) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$props(_p10));
				}(
					_mdgriffith$style_elements$Style_Internal_Render_Property$shadow(_p0._0));
			case 'Transform':
				return function (_p11) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$props(_p11));
				}(
					_mdgriffith$style_elements$Style_Internal_Render_Property$transformations(_p0._0));
			case 'Filters':
				return function (_p12) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$props(_p12));
				}(
					_mdgriffith$style_elements$Style_Internal_Render_Property$filters(_p0._0));
			case 'TextColor':
				return function (_p13) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$props(_p13));
				}(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'color',
							_1: _mdgriffith$style_elements$Style_Internal_Render_Value$color(_p0._0)
						},
						_1: {ctor: '[]'}
					});
			case 'SelectionColor':
				return function (_p14) {
					return _elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Style_Internal_Intermediate$SubClass(
							_mdgriffith$style_elements$Style_Internal_Intermediate$Class(_p14)));
				}(
					{
						selector: A2(_mdgriffith$style_elements$Style_Internal_Selector$pseudo, '::selection', parentClass),
						props: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Style_Internal_Intermediate$props(
								{
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'background-color',
										_1: _mdgriffith$style_elements$Style_Internal_Render_Value$color(_p0._0)
									},
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					});
			default:
				return _elm_lang$core$Maybe$Just(
					_mdgriffith$style_elements$Style_Internal_Intermediate$props(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'transition',
								_1: A2(
									_elm_lang$core$String$join,
									', ',
									A2(_elm_lang$core$List$map, _mdgriffith$style_elements$Style_Internal_Render_Property$transition, _p0._0))
							},
							_1: {ctor: '[]'}
						}));
		}
	});
var _mdgriffith$style_elements$Style_Internal_Render$renderProp = F2(
	function (parentClass, prop) {
		var _p15 = prop;
		switch (_p15.ctor) {
			case 'Child':
				return function (_p16) {
					return _mdgriffith$style_elements$Style_Internal_Intermediate$SubClass(
						_mdgriffith$style_elements$Style_Internal_Intermediate$Class(_p16));
				}(
					{
						selector: A2(
							_mdgriffith$style_elements$Style_Internal_Selector$child,
							parentClass,
							_mdgriffith$style_elements$Style_Internal_Selector$select(_p15._0)),
						props: A2(
							_elm_lang$core$List$map,
							_mdgriffith$style_elements$Style_Internal_Render$renderProp(parentClass),
							_p15._1)
					});
			case 'Variation':
				var selectVariation = A2(_mdgriffith$style_elements$Style_Internal_Selector$variant, parentClass, _p15._0);
				return function (_p17) {
					return _mdgriffith$style_elements$Style_Internal_Intermediate$SubClass(
						_mdgriffith$style_elements$Style_Internal_Intermediate$Class(_p17));
				}(
					{
						selector: selectVariation,
						props: A2(
							_elm_lang$core$List$filterMap,
							_mdgriffith$style_elements$Style_Internal_Render$renderVariationProp(selectVariation),
							_p15._1)
					});
			case 'PseudoElement':
				return function (_p18) {
					return _mdgriffith$style_elements$Style_Internal_Intermediate$SubClass(
						_mdgriffith$style_elements$Style_Internal_Intermediate$Class(_p18));
				}(
					{
						selector: A2(_mdgriffith$style_elements$Style_Internal_Selector$pseudo, _p15._0, parentClass),
						props: A2(
							_elm_lang$core$List$map,
							_mdgriffith$style_elements$Style_Internal_Render$renderProp(parentClass),
							_p15._1)
					});
			case 'MediaQuery':
				var _p20 = _p15._0;
				return function (_p19) {
					return _mdgriffith$style_elements$Style_Internal_Intermediate$SubClass(
						_mdgriffith$style_elements$Style_Internal_Intermediate$Media(_p19));
				}(
					{
						query: A2(_elm_lang$core$Basics_ops['++'], '@media ', _p20),
						selector: parentClass,
						props: A2(
							_elm_lang$core$List$map,
							_mdgriffith$style_elements$Style_Internal_Intermediate$asMediaQuery(_p20),
							A2(
								_elm_lang$core$List$map,
								_mdgriffith$style_elements$Style_Internal_Render$renderProp(parentClass),
								_p15._1))
					});
			case 'Exact':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$props(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p15._0, _1: _p15._1},
						_1: {ctor: '[]'}
					});
			case 'Visibility':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$props(
					_mdgriffith$style_elements$Style_Internal_Render_Property$visibility(_p15._0));
			case 'Position':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$props(
					_mdgriffith$style_elements$Style_Internal_Render_Property$position(_p15._0));
			case 'Font':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$props(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p15._0, _1: _p15._1},
						_1: {ctor: '[]'}
					});
			case 'Layout':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$props(
					A2(_mdgriffith$style_elements$Style_Internal_Render_Property$layout, false, _p15._0));
			case 'Background':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$props(
					_mdgriffith$style_elements$Style_Internal_Render_Property$background(_p15._0));
			case 'Shadows':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$props(
					_mdgriffith$style_elements$Style_Internal_Render_Property$shadow(_p15._0));
			case 'Transform':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$props(
					_mdgriffith$style_elements$Style_Internal_Render_Property$transformations(_p15._0));
			case 'Filters':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$props(
					_mdgriffith$style_elements$Style_Internal_Render_Property$filters(_p15._0));
			case 'SelectionColor':
				return function (_p21) {
					return _mdgriffith$style_elements$Style_Internal_Intermediate$SubClass(
						_mdgriffith$style_elements$Style_Internal_Intermediate$Class(_p21));
				}(
					{
						selector: A2(_mdgriffith$style_elements$Style_Internal_Selector$pseudo, '::selection', parentClass),
						props: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Style_Internal_Intermediate$props(
								{
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'background-color',
										_1: _mdgriffith$style_elements$Style_Internal_Render_Value$color(_p15._0)
									},
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					});
			case 'TextColor':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$props(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'color',
							_1: _mdgriffith$style_elements$Style_Internal_Render_Value$color(_p15._0)
						},
						_1: {ctor: '[]'}
					});
			default:
				return _mdgriffith$style_elements$Style_Internal_Intermediate$props(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'transition',
							_1: A2(
								_elm_lang$core$String$join,
								', ',
								A2(_elm_lang$core$List$map, _mdgriffith$style_elements$Style_Internal_Render_Property$transition, _p15._0))
						},
						_1: {ctor: '[]'}
					});
		}
	});
var _mdgriffith$style_elements$Style_Internal_Render$preprocess = function (style) {
	var _p22 = style;
	if (_p22.ctor === 'Style') {
		var mergeTransforms = function (props) {
			var applyTransforms = function (_p23) {
				var _p24 = _p23;
				var _p25 = _p24._1;
				var transformations = A2(
					_elm_lang$core$List$filterMap,
					_elm_lang$core$Basics$identity,
					{
						ctor: '::',
						_0: _p24._0.translate,
						_1: {
							ctor: '::',
							_0: _p24._0.rotate,
							_1: {
								ctor: '::',
								_0: _p24._0.scale,
								_1: {ctor: '[]'}
							}
						}
					});
				return _elm_lang$core$List$isEmpty(transformations) ? _p25 : {
					ctor: '::',
					_0: _mdgriffith$style_elements$Style_Internal_Model$Transform(transformations),
					_1: _p25
				};
			};
			var setIfNothing = F2(
				function (x, maybeX) {
					var _p26 = maybeX;
					if (_p26.ctor === 'Nothing') {
						return _elm_lang$core$Maybe$Just(x);
					} else {
						return _p26;
					}
				});
			var gatherTransformStack = F2(
				function (transformation, gathered) {
					var _p27 = transformation;
					switch (_p27.ctor) {
						case 'Translate':
							return _elm_lang$core$Native_Utils.update(
								gathered,
								{
									translate: A2(
										setIfNothing,
										A3(_mdgriffith$style_elements$Style_Internal_Model$Translate, _p27._0, _p27._1, _p27._2),
										gathered.translate)
								});
						case 'Rotate':
							return _elm_lang$core$Native_Utils.update(
								gathered,
								{
									rotate: A2(
										setIfNothing,
										_mdgriffith$style_elements$Style_Internal_Model$Rotate(_p27._0),
										gathered.rotate)
								});
						case 'RotateAround':
							return _elm_lang$core$Native_Utils.update(
								gathered,
								{
									rotate: A2(
										setIfNothing,
										A4(_mdgriffith$style_elements$Style_Internal_Model$RotateAround, _p27._0, _p27._1, _p27._2, _p27._3),
										gathered.rotate)
								});
						default:
							return _elm_lang$core$Native_Utils.update(
								gathered,
								{
									scale: A2(
										setIfNothing,
										A3(_mdgriffith$style_elements$Style_Internal_Model$Scale, _p27._0, _p27._1, _p27._2),
										gathered.scale)
								});
					}
				});
			var gatherTransforms = F2(
				function (prop, _p28) {
					var _p29 = _p28;
					var _p32 = _p29._0;
					var _p31 = _p29._1;
					var _p30 = prop;
					if (_p30.ctor === 'Transform') {
						return {
							ctor: '_Tuple2',
							_0: A3(_elm_lang$core$List$foldr, gatherTransformStack, _p32, _p30._0),
							_1: _p31
						};
					} else {
						return {
							ctor: '_Tuple2',
							_0: _p32,
							_1: {ctor: '::', _0: prop, _1: _p31}
						};
					}
				});
			return applyTransforms(
				A3(
					_elm_lang$core$List$foldr,
					gatherTransforms,
					{
						ctor: '_Tuple2',
						_0: {rotate: _elm_lang$core$Maybe$Nothing, scale: _elm_lang$core$Maybe$Nothing, translate: _elm_lang$core$Maybe$Nothing},
						_1: {ctor: '[]'}
					},
					props));
		};
		var dropShadow = function (_p33) {
			var _p34 = _p33;
			return _elm_lang$core$Native_Utils.eq(_p34._0.kind, 'drop');
		};
		var moveDropShadow = function (props) {
			var asDropShadow = function (_p35) {
				var _p36 = _p35;
				var _p37 = _p36._0;
				return _mdgriffith$style_elements$Style_Internal_Model$DropShadow(
					{offset: _p37.offset, size: _p37.size, blur: _p37.blur, color: _p37.color});
			};
			var moveDropped = F2(
				function (prop, _p38) {
					var _p39 = _p38;
					var _p46 = _p39._0;
					var _p45 = _p39._1;
					var _p40 = prop;
					switch (_p40.ctor) {
						case 'Shadows':
							var _p43 = _p40._0;
							return {
								ctor: '_Tuple2',
								_0: {
									ctor: '::',
									_0: _mdgriffith$style_elements$Style_Internal_Model$Shadows(
										A2(
											_elm_lang$core$List$filter,
											function (_p41) {
												return !dropShadow(_p41);
											},
											_p43)),
									_1: _p46
								},
								_1: function () {
									var _p42 = A2(_elm_lang$core$List$filter, dropShadow, _p43);
									if (_p42.ctor === '[]') {
										return _elm_lang$core$Maybe$Nothing;
									} else {
										return _elm_lang$core$Maybe$Just(_p42);
									}
								}()
							};
						case 'Filters':
							var _p44 = _p45;
							if (_p44.ctor === 'Nothing') {
								return {
									ctor: '_Tuple2',
									_0: {ctor: '::', _0: prop, _1: _p46},
									_1: _p45
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: {
										ctor: '::',
										_0: _mdgriffith$style_elements$Style_Internal_Model$Filters(
											A2(
												_elm_lang$core$Basics_ops['++'],
												_p40._0,
												A2(_elm_lang$core$List$map, asDropShadow, _p44._0))),
										_1: _p46
									},
									_1: _p45
								};
							}
						default:
							return {
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: prop, _1: _p46},
								_1: _p45
							};
					}
				});
			return _elm_lang$core$Tuple$first(
				A3(
					_elm_lang$core$List$foldr,
					moveDropped,
					{
						ctor: '_Tuple2',
						_0: {ctor: '[]'},
						_1: _elm_lang$core$Maybe$Nothing
					},
					props));
		};
		var overridePrevious = F2(
			function (overridable, props) {
				var eliminatePrevious = F2(
					function (prop, _p47) {
						var _p48 = _p47;
						var _p50 = _p48._1;
						var _p49 = _p48._0;
						return (overridable(prop) && _p50) ? {ctor: '_Tuple2', _0: _p49, _1: _p50} : ((overridable(prop) && (!_p50)) ? {
							ctor: '_Tuple2',
							_0: {ctor: '::', _0: prop, _1: _p49},
							_1: true
						} : {
							ctor: '_Tuple2',
							_0: {ctor: '::', _0: prop, _1: _p49},
							_1: _p50
						});
					});
				return _elm_lang$core$Tuple$first(
					A3(
						_elm_lang$core$List$foldr,
						eliminatePrevious,
						{
							ctor: '_Tuple2',
							_0: {ctor: '[]'},
							_1: false
						},
						props));
			});
		var prioritize = F2(
			function (isPriority, props) {
				var _p51 = A2(_elm_lang$core$List$partition, isPriority, props);
				var high = _p51._0;
				var low = _p51._1;
				return A2(_elm_lang$core$Basics_ops['++'], low, high);
			});
		var shadows = function (prop) {
			var _p52 = prop;
			if (_p52.ctor === 'Shadows') {
				return true;
			} else {
				return false;
			}
		};
		var visible = function (prop) {
			var _p53 = prop;
			if (_p53.ctor === 'Visibility') {
				return true;
			} else {
				return false;
			}
		};
		var processed = mergeTransforms(
			moveDropShadow(
				A2(
					overridePrevious,
					shadows,
					A2(
						prioritize,
						shadows,
						A2(
							overridePrevious,
							visible,
							A2(prioritize, visible, _p22._1))))));
		return A2(_mdgriffith$style_elements$Style_Internal_Model$Style, _p22._0, processed);
	} else {
		return style;
	}
};
var _mdgriffith$style_elements$Style_Internal_Render$reorderImportAddReset = F2(
	function (reset, styles) {
		var reorder = F2(
			function (style, _p54) {
				var _p55 = _p54;
				var _p58 = _p55._1;
				var _p57 = _p55._0;
				var _p56 = style;
				if (_p56.ctor === 'Import') {
					return {
						ctor: '_Tuple2',
						_0: {ctor: '::', _0: style, _1: _p57},
						_1: _p58
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _p57,
						_1: {ctor: '::', _0: style, _1: _p58}
					};
				}
			});
		var _p59 = A3(
			_elm_lang$core$List$foldr,
			reorder,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			styles);
		var imports = _p59._0;
		var allStyles = _p59._1;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			imports,
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: _mdgriffith$style_elements$Style_Internal_Model$Reset(reset),
					_1: {ctor: '[]'}
				},
				allStyles));
	});
var _mdgriffith$style_elements$Style_Internal_Render$spacing = function (box) {
	var name = function () {
		var _p60 = box;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'spacing-',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p60._0),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'-',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p60._1),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'-',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p60._2),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'-',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p60._3),
										' > *:not(.nospacing)'))))))));
	}();
	return function (cls) {
		return {
			ctor: '_Tuple2',
			_0: name,
			_1: A2(
				_elm_lang$core$Basics_ops['++'],
				'.',
				A2(_elm_lang$core$Basics_ops['++'], name, cls))
		};
	}(
		A2(
			_mdgriffith$style_elements$Style_Internal_Render_Css$brace,
			0,
			A2(
				_mdgriffith$style_elements$Style_Internal_Render_Css$prop,
				2,
				{
					ctor: '_Tuple2',
					_0: 'margin',
					_1: _mdgriffith$style_elements$Style_Internal_Render_Value$box(box)
				})));
};
var _mdgriffith$style_elements$Style_Internal_Render$class = F2(
	function (name, props) {
		var renderedProps = A2(
			_elm_lang$core$String$join,
			'\n',
			A2(
				_elm_lang$core$List$map,
				_mdgriffith$style_elements$Style_Internal_Render_Css$prop(2),
				props));
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'.',
			A2(
				_elm_lang$core$Basics_ops['++'],
				name,
				A2(_mdgriffith$style_elements$Style_Internal_Render_Css$brace, 0, renderedProps)));
	});
var _mdgriffith$style_elements$Style_Internal_Render$renderStyle = F2(
	function (guarded, style) {
		var _p61 = style;
		switch (_p61.ctor) {
			case 'Reset':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$Free(_p61._0);
			case 'Import':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$Free(
					A2(
						_elm_lang$core$Basics_ops['++'],
						'@import ',
						A2(_elm_lang$core$Basics_ops['++'], _p61._0, ';')));
			case 'RawStyle':
				return _mdgriffith$style_elements$Style_Internal_Intermediate$Free(
					A2(_mdgriffith$style_elements$Style_Internal_Render$class, _p61._0, _p61._1));
			default:
				var guard = function (i) {
					return guarded ? _mdgriffith$style_elements$Style_Internal_Intermediate$guard(i) : i;
				};
				var selector = _mdgriffith$style_elements$Style_Internal_Selector$select(_p61._0);
				var inter = _mdgriffith$style_elements$Style_Internal_Intermediate$Class(
					{
						selector: selector,
						props: A2(
							_elm_lang$core$List$map,
							_mdgriffith$style_elements$Style_Internal_Render$renderProp(selector),
							_p61._1)
					});
				return guard(inter);
		}
	});
var _mdgriffith$style_elements$Style_Internal_Render$stylesheet = F3(
	function (reset, guard, batched) {
		return _mdgriffith$style_elements$Style_Internal_Intermediate$finalize(
			A2(
				_elm_lang$core$List$map,
				function (_p62) {
					return A2(
						_mdgriffith$style_elements$Style_Internal_Render$renderStyle,
						guard,
						_mdgriffith$style_elements$Style_Internal_Render$preprocess(_p62));
				},
				A2(
					_mdgriffith$style_elements$Style_Internal_Render$reorderImportAddReset,
					reset,
					_mdgriffith$style_elements$Style_Internal_Batchable$toList(batched))));
	});
var _mdgriffith$style_elements$Style_Internal_Render$unbatchedStylesheet = F2(
	function (guard, styles) {
		return _mdgriffith$style_elements$Style_Internal_Intermediate$finalize(
			A2(
				_elm_lang$core$List$map,
				function (_p63) {
					return A2(
						_mdgriffith$style_elements$Style_Internal_Render$renderStyle,
						guard,
						_mdgriffith$style_elements$Style_Internal_Render$preprocess(_p63));
				},
				styles));
	});
var _mdgriffith$style_elements$Style_Internal_Render$single = F2(
	function (guard, style) {
		return function (_p64) {
			return _mdgriffith$style_elements$Style_Internal_Intermediate$raw(
				A2(
					_mdgriffith$style_elements$Style_Internal_Render$renderStyle,
					guard,
					_mdgriffith$style_elements$Style_Internal_Render$preprocess(_p64)));
		}(style);
	});

var _mdgriffith$style_elements$Style$prepareSheet = function (_p0) {
	var _p1 = _p0;
	var _p3 = _p1._0.findable;
	var variations = F2(
		function ($class, vs) {
			var varys = A2(
				_elm_lang$core$List$map,
				function (cls) {
					return {ctor: '_Tuple2', _0: cls, _1: true};
				},
				A2(
					_elm_lang$core$List$map,
					function (_p2) {
						return function (vary) {
							return A3(_mdgriffith$style_elements$Style_Internal_Find$variation, $class, vary, _p3);
						}(
							_elm_lang$core$Tuple$first(_p2));
					},
					A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, vs)));
			var parent = A2(_mdgriffith$style_elements$Style_Internal_Find$style, $class, _p3);
			return {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: parent, _1: true},
				_1: varys
			};
		});
	return {
		style: function ($class) {
			return A2(_mdgriffith$style_elements$Style_Internal_Find$style, $class, _p3);
		},
		variations: F2(
			function ($class, varys) {
				return A2(variations, $class, varys);
			}),
		css: _p1._0.css
	};
};
var _mdgriffith$style_elements$Style$pseudo = F2(
	function (psu, props) {
		return A2(
			_mdgriffith$style_elements$Style_Internal_Model$PseudoElement,
			A2(_elm_lang$core$Basics_ops['++'], ':', psu),
			props);
	});
var _mdgriffith$style_elements$Style$checked = function (props) {
	return A2(_mdgriffith$style_elements$Style_Internal_Model$PseudoElement, ':checked', props);
};
var _mdgriffith$style_elements$Style$focus = function (props) {
	return A2(_mdgriffith$style_elements$Style_Internal_Model$PseudoElement, ':focus', props);
};
var _mdgriffith$style_elements$Style$hover = function (props) {
	return A2(_mdgriffith$style_elements$Style_Internal_Model$PseudoElement, ':hover', props);
};
var _mdgriffith$style_elements$Style$scale = F3(
	function (x, y, z) {
		return _mdgriffith$style_elements$Style_Internal_Model$Transform(
			{
				ctor: '::',
				_0: A3(_mdgriffith$style_elements$Style_Internal_Model$Scale, x, y, z),
				_1: {ctor: '[]'}
			});
	});
var _mdgriffith$style_elements$Style$translate = F3(
	function (x, y, z) {
		return _mdgriffith$style_elements$Style_Internal_Model$Transform(
			{
				ctor: '::',
				_0: A3(_mdgriffith$style_elements$Style_Internal_Model$Translate, x, y, z),
				_1: {ctor: '[]'}
			});
	});
var _mdgriffith$style_elements$Style$rotateAround = F2(
	function (_p4, angle) {
		var _p5 = _p4;
		return _mdgriffith$style_elements$Style_Internal_Model$Transform(
			{
				ctor: '::',
				_0: A4(_mdgriffith$style_elements$Style_Internal_Model$RotateAround, _p5._0, _p5._1, _p5._2, angle),
				_1: {ctor: '[]'}
			});
	});
var _mdgriffith$style_elements$Style$rotate = function (a) {
	return _mdgriffith$style_elements$Style_Internal_Model$Transform(
		{
			ctor: '::',
			_0: _mdgriffith$style_elements$Style_Internal_Model$Rotate(a),
			_1: {ctor: '[]'}
		});
};
var _mdgriffith$style_elements$Style$origin = F3(
	function (x, y, z) {
		return A2(
			_mdgriffith$style_elements$Style_Internal_Model$Exact,
			'transform-origin',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(x),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'px  ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(y),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'px ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(z),
								'px'))))));
	});
var _mdgriffith$style_elements$Style$filters = function (fs) {
	return _mdgriffith$style_elements$Style_Internal_Model$Filters(fs);
};
var _mdgriffith$style_elements$Style$shadows = function (shades) {
	return _mdgriffith$style_elements$Style_Internal_Model$Shadows(shades);
};
var _mdgriffith$style_elements$Style$paddingBottomHint = function (x) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Exact,
		'padding-bottom',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(x),
			'px'));
};
var _mdgriffith$style_elements$Style$paddingTopHint = function (x) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Exact,
		'padding-top',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(x),
			'px'));
};
var _mdgriffith$style_elements$Style$paddingRightHint = function (x) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Exact,
		'padding-right',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(x),
			'px'));
};
var _mdgriffith$style_elements$Style$paddingLeftHint = function (x) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Exact,
		'padding-left',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(x),
			'px'));
};
var _mdgriffith$style_elements$Style$paddingHint = function (x) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Exact,
		'padding',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(x),
			'px'));
};
var _mdgriffith$style_elements$Style$cursor = function (name) {
	return A2(_mdgriffith$style_elements$Style_Internal_Model$Exact, 'cursor', name);
};
var _mdgriffith$style_elements$Style$opacity = function (o) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Exact,
		'opacity',
		_elm_lang$core$Basics$toString(o));
};
var _mdgriffith$style_elements$Style$prop = F2(
	function (name, val) {
		return A2(_mdgriffith$style_elements$Style_Internal_Model$Exact, name, val);
	});
var _mdgriffith$style_elements$Style$variation = F2(
	function (variation, props) {
		return A2(_mdgriffith$style_elements$Style_Internal_Model$Variation, variation, props);
	});
var _mdgriffith$style_elements$Style$style = F2(
	function (cls, props) {
		return _mdgriffith$style_elements$Style_Internal_Batchable$one(
			A2(
				_mdgriffith$style_elements$Style_Internal_Model$Style,
				cls,
				{
					ctor: '::',
					_0: A2(_mdgriffith$style_elements$Style$prop, 'border-style', 'solid'),
					_1: props
				}));
	});
var _mdgriffith$style_elements$Style$importCss = function (str) {
	return _mdgriffith$style_elements$Style_Internal_Batchable$one(
		_mdgriffith$style_elements$Style_Internal_Model$Import(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'\"',
				A2(_elm_lang$core$Basics_ops['++'], str, '\"'))));
};
var _mdgriffith$style_elements$Style$importUrl = function (url) {
	return _mdgriffith$style_elements$Style_Internal_Batchable$one(
		_mdgriffith$style_elements$Style_Internal_Model$Import(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'url(\"',
				A2(_elm_lang$core$Basics_ops['++'], url, '\")'))));
};
var _mdgriffith$style_elements$Style$Unguarded = {ctor: 'Unguarded'};
var _mdgriffith$style_elements$Style$unguarded = _mdgriffith$style_elements$Style$Unguarded;
var _mdgriffith$style_elements$Style$styleSheetWith = F2(
	function (options, styles) {
		var unguarded = A2(
			_elm_lang$core$List$any,
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				})(_mdgriffith$style_elements$Style$Unguarded),
			options);
		return _mdgriffith$style_elements$Style$prepareSheet(
			A3(_mdgriffith$style_elements$Style_Internal_Render$stylesheet, '', !unguarded, styles));
	});
var _mdgriffith$style_elements$Style$styleSheet = function (styles) {
	return A2(
		_mdgriffith$style_elements$Style$styleSheetWith,
		{ctor: '[]'},
		styles);
};
var _mdgriffith$style_elements$Style$stylesheet = function (styles) {
	return A2(
		_mdgriffith$style_elements$Style$styleSheetWith,
		{ctor: '[]'},
		styles);
};
var _mdgriffith$style_elements$Style$stylesheetWith = F2(
	function (options, styles) {
		var unguarded = A2(
			_elm_lang$core$List$any,
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				})(_mdgriffith$style_elements$Style$Unguarded),
			options);
		return _mdgriffith$style_elements$Style$prepareSheet(
			A3(_mdgriffith$style_elements$Style_Internal_Render$stylesheet, '', !unguarded, styles));
	});

var _mdgriffith$style_elements$Element_Attributes$manifest = function (man) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$manifest(man));
};
var _mdgriffith$style_elements$Element_Attributes$scope = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$scope(str));
};
var _mdgriffith$style_elements$Element_Attributes$rowspan = function (i) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$rowspan(i));
};
var _mdgriffith$style_elements$Element_Attributes$headers = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$headers(str));
};
var _mdgriffith$style_elements$Element_Attributes$colspan = function (i) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$colspan(i));
};
var _mdgriffith$style_elements$Element_Attributes$start = function (i) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$start(i));
};
var _mdgriffith$style_elements$Element_Attributes$reversed = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$reversed(on));
};
var _mdgriffith$style_elements$Element_Attributes$pubdate = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$pubdate(str));
};
var _mdgriffith$style_elements$Element_Attributes$datetime = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$datetime(str));
};
var _mdgriffith$style_elements$Element_Attributes$rel = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$rel(str));
};
var _mdgriffith$style_elements$Element_Attributes$ping = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$ping(str));
};
var _mdgriffith$style_elements$Element_Attributes$media = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$media(str));
};
var _mdgriffith$style_elements$Element_Attributes$hreflang = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$hreflang(str));
};
var _mdgriffith$style_elements$Element_Attributes$downloadAs = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$downloadAs(str));
};
var _mdgriffith$style_elements$Element_Attributes$download = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$download(on));
};
var _mdgriffith$style_elements$Element_Attributes$target = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$target(str));
};
var _mdgriffith$style_elements$Element_Attributes$href = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$href(str));
};
var _mdgriffith$style_elements$Element_Attributes$cite = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$cite(str));
};
var _mdgriffith$style_elements$Element_Attributes$align = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$align(str));
};
var _mdgriffith$style_elements$Element_Attributes$keytype = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$keytype(str));
};
var _mdgriffith$style_elements$Element_Attributes$challenge = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$challenge(str));
};
var _mdgriffith$style_elements$Element_Attributes$coords = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$coords(str));
};
var _mdgriffith$style_elements$Element_Attributes$shape = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$shape(str));
};
var _mdgriffith$style_elements$Element_Attributes$usemap = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$usemap(str));
};
var _mdgriffith$style_elements$Element_Attributes$ismap = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$ismap(on));
};
var _mdgriffith$style_elements$Element_Attributes$wrap = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$wrap(str));
};
var _mdgriffith$style_elements$Element_Attributes$rows = function (i) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$rows(i));
};
var _mdgriffith$style_elements$Element_Attributes$cols = function (i) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$cols(i));
};
var _mdgriffith$style_elements$Element_Attributes$step = function (s) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$step(s));
};
var _mdgriffith$style_elements$Element_Attributes$min = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$min(str));
};
var _mdgriffith$style_elements$Element_Attributes$max = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$max(str));
};
var _mdgriffith$style_elements$Element_Attributes$form = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$form(str));
};
var _mdgriffith$style_elements$Element_Attributes$for = function (id) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$for(id));
};
var _mdgriffith$style_elements$Element_Attributes$size = function (i) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$size(i));
};
var _mdgriffith$style_elements$Element_Attributes$required = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$required(on));
};
var _mdgriffith$style_elements$Element_Attributes$readonly = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$readonly(on));
};
var _mdgriffith$style_elements$Element_Attributes$pattern = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$pattern(str));
};
var _mdgriffith$style_elements$Element_Attributes$novalidate = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$novalidate(on));
};
var _mdgriffith$style_elements$Element_Attributes$name = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$name(str));
};
var _mdgriffith$style_elements$Element_Attributes$multiple = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$multiple(on));
};
var _mdgriffith$style_elements$Element_Attributes$method = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$method(str));
};
var _mdgriffith$style_elements$Element_Attributes$maxlength = function (i) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$maxlength(i));
};
var _mdgriffith$style_elements$Element_Attributes$minlength = function (i) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$minlength(i));
};
var _mdgriffith$style_elements$Element_Attributes$list = function (l) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$list(l));
};
var _mdgriffith$style_elements$Element_Attributes$formaction = function (action) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$formaction(action));
};
var _mdgriffith$style_elements$Element_Attributes$enctype = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$enctype(str));
};
var _mdgriffith$style_elements$Element_Attributes$disabled = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$disabled(on));
};
var _mdgriffith$style_elements$Element_Attributes$autofocus = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$autofocus(on));
};
var _mdgriffith$style_elements$Element_Attributes$autocomplete = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$autocomplete(on));
};
var _mdgriffith$style_elements$Element_Attributes$action = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$action(str));
};
var _mdgriffith$style_elements$Element_Attributes$acceptCharset = function ($char) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$acceptCharset($char));
};
var _mdgriffith$style_elements$Element_Attributes$accept = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$accept(str));
};
var _mdgriffith$style_elements$Element_Attributes$selected = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$selected(on));
};
var _mdgriffith$style_elements$Element_Attributes$placeholder = function (place) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$placeholder(place));
};
var _mdgriffith$style_elements$Element_Attributes$checked = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$checked(on));
};
var _mdgriffith$style_elements$Element_Attributes$defaultValue = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$defaultValue(str));
};
var _mdgriffith$style_elements$Element_Attributes$value = function (val) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$value(val));
};
var _mdgriffith$style_elements$Element_Attributes$type_ = function (t) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$type_(t));
};
var _mdgriffith$style_elements$Element_Attributes$srcdoc = function (doc) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$srcdoc(doc));
};
var _mdgriffith$style_elements$Element_Attributes$seamless = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$seamless(on));
};
var _mdgriffith$style_elements$Element_Attributes$sandbox = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$sandbox(str));
};
var _mdgriffith$style_elements$Element_Attributes$srclang = function (lang) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$srclang(lang));
};
var _mdgriffith$style_elements$Element_Attributes$kind = function (k) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$kind(k));
};
var _mdgriffith$style_elements$Element_Attributes$default = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$default(on));
};
var _mdgriffith$style_elements$Element_Attributes$poster = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$poster(str));
};
var _mdgriffith$style_elements$Element_Attributes$preload = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$preload(str));
};
var _mdgriffith$style_elements$Element_Attributes$loop = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$loop(on));
};
var _mdgriffith$style_elements$Element_Attributes$controls = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$controls(on));
};
var _mdgriffith$style_elements$Element_Attributes$autoplay = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$autoplay(on));
};
var _mdgriffith$style_elements$Element_Attributes$alt = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$alt(str));
};
var _mdgriffith$style_elements$Element_Attributes$src = function (s) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$src(s));
};
var _mdgriffith$style_elements$Element_Attributes$scoped = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$scoped(on));
};
var _mdgriffith$style_elements$Element_Attributes$language = function (lang) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$language(lang));
};
var _mdgriffith$style_elements$Element_Attributes$httpEquiv = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$httpEquiv(str));
};
var _mdgriffith$style_elements$Element_Attributes$defer = function (def) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$defer(def));
};
var _mdgriffith$style_elements$Element_Attributes$content = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$content(str));
};
var _mdgriffith$style_elements$Element_Attributes$charset = function ($char) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$charset($char));
};
var _mdgriffith$style_elements$Element_Attributes$async = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$async(on));
};
var _mdgriffith$style_elements$Element_Attributes$tabindex = function (index) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$tabindex(index));
};
var _mdgriffith$style_elements$Element_Attributes$spellcheck = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$spellcheck(on));
};
var _mdgriffith$style_elements$Element_Attributes$lang = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$lang(str));
};
var _mdgriffith$style_elements$Element_Attributes$itemprop = function (item) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$itemprop(item));
};
var _mdgriffith$style_elements$Element_Attributes$dropzone = function (drop) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$dropzone(drop));
};
var _mdgriffith$style_elements$Element_Attributes$draggable = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$draggable(str));
};
var _mdgriffith$style_elements$Element_Attributes$dir = function (d) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$dir(d));
};
var _mdgriffith$style_elements$Element_Attributes$contextmenu = function (id) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$contextmenu(id));
};
var _mdgriffith$style_elements$Element_Attributes$contenteditable = function (on) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$contenteditable(on));
};
var _mdgriffith$style_elements$Element_Attributes$accesskey = function ($char) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$accesskey($char));
};
var _mdgriffith$style_elements$Element_Attributes$title = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$title(str));
};
var _mdgriffith$style_elements$Element_Attributes$id = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$id(str));
};
var _mdgriffith$style_elements$Element_Attributes$class = function (cls) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$class(cls));
};
var _mdgriffith$style_elements$Element_Attributes$map = F2(
	function (fn, attr) {
		var _p0 = attr;
		switch (_p0.ctor) {
			case 'Attr':
				return _mdgriffith$style_elements$Element_Internal_Model$Attr(
					A2(_elm_lang$html$Html_Attributes$map, fn, _p0._0));
			case 'Vary':
				return A2(_mdgriffith$style_elements$Element_Internal_Model$Vary, _p0._0, _p0._1);
			case 'Height':
				return _mdgriffith$style_elements$Element_Internal_Model$Height(_p0._0);
			case 'Width':
				return _mdgriffith$style_elements$Element_Internal_Model$Width(_p0._0);
			case 'Inline':
				return _mdgriffith$style_elements$Element_Internal_Model$Inline;
			case 'Hidden':
				return _mdgriffith$style_elements$Element_Internal_Model$Hidden;
			case 'PositionFrame':
				return _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(_p0._0);
			case 'Opacity':
				return _mdgriffith$style_elements$Element_Internal_Model$Opacity(_p0._0);
			case 'Expand':
				return _mdgriffith$style_elements$Element_Internal_Model$Expand;
			case 'Padding':
				return A4(_mdgriffith$style_elements$Element_Internal_Model$Padding, _p0._0, _p0._1, _p0._2, _p0._3);
			case 'PhantomPadding':
				return _mdgriffith$style_elements$Element_Internal_Model$PhantomPadding(_p0._0);
			case 'Margin':
				return _mdgriffith$style_elements$Element_Internal_Model$Margin(_p0._0);
			case 'GridArea':
				return _mdgriffith$style_elements$Element_Internal_Model$GridArea(_p0._0);
			case 'GridCoords':
				return _mdgriffith$style_elements$Element_Internal_Model$GridCoords(_p0._0);
			case 'PointerEvents':
				return _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(_p0._0);
			case 'Event':
				return _mdgriffith$style_elements$Element_Internal_Model$Event(
					A2(_elm_lang$html$Html_Attributes$map, fn, _p0._0));
			case 'InputEvent':
				return _mdgriffith$style_elements$Element_Internal_Model$InputEvent(
					A2(_elm_lang$html$Html_Attributes$map, fn, _p0._0));
			case 'Position':
				return A3(_mdgriffith$style_elements$Element_Internal_Model$Position, _p0._0, _p0._1, _p0._2);
			case 'Spacing':
				return A2(_mdgriffith$style_elements$Element_Internal_Model$Spacing, _p0._0, _p0._1);
			case 'VAlign':
				return _mdgriffith$style_elements$Element_Internal_Model$VAlign(_p0._0);
			case 'HAlign':
				return _mdgriffith$style_elements$Element_Internal_Model$HAlign(_p0._0);
			case 'Shrink':
				return _mdgriffith$style_elements$Element_Internal_Model$Shrink(_p0._0);
			default:
				return _mdgriffith$style_elements$Element_Internal_Model$Overflow(_p0._0);
		}
	});
var _mdgriffith$style_elements$Element_Attributes$toAttr = _mdgriffith$style_elements$Element_Internal_Model$Attr;
var _mdgriffith$style_elements$Element_Attributes$attribute = F2(
	function (name, val) {
		return _mdgriffith$style_elements$Element_Internal_Model$Attr(
			A2(_elm_lang$html$Html_Attributes$attribute, name, val));
	});
var _mdgriffith$style_elements$Element_Attributes$property = F2(
	function (str, val) {
		return _mdgriffith$style_elements$Element_Internal_Model$Attr(
			A2(_elm_lang$html$Html_Attributes$property, str, val));
	});
var _mdgriffith$style_elements$Element_Attributes$inlineStyle = function (_p1) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$virtual_dom$VirtualDom$style(_p1));
};
var _mdgriffith$style_elements$Element_Attributes$classList = function (_p2) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$classList(_p2));
};
var _mdgriffith$style_elements$Element_Attributes$clipY = _mdgriffith$style_elements$Element_Internal_Model$Attr(
	_elm_lang$virtual_dom$VirtualDom$style(
		{
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'overflow-y', _1: 'hidden'},
			_1: {ctor: '[]'}
		}));
var _mdgriffith$style_elements$Element_Attributes$clipX = _mdgriffith$style_elements$Element_Internal_Model$Attr(
	_elm_lang$virtual_dom$VirtualDom$style(
		{
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'overflow-x', _1: 'hidden'},
			_1: {ctor: '[]'}
		}));
var _mdgriffith$style_elements$Element_Attributes$clip = _mdgriffith$style_elements$Element_Internal_Model$Attr(
	_elm_lang$virtual_dom$VirtualDom$style(
		{
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'overflow', _1: 'hidden'},
			_1: {ctor: '[]'}
		}));
var _mdgriffith$style_elements$Element_Attributes$xScrollbar = _mdgriffith$style_elements$Element_Internal_Model$Overflow(_mdgriffith$style_elements$Element_Internal_Model$XAxis);
var _mdgriffith$style_elements$Element_Attributes$yScrollbar = _mdgriffith$style_elements$Element_Internal_Model$Overflow(_mdgriffith$style_elements$Element_Internal_Model$YAxis);
var _mdgriffith$style_elements$Element_Attributes$scrollbars = _mdgriffith$style_elements$Element_Internal_Model$Overflow(_mdgriffith$style_elements$Element_Internal_Model$AllAxis);
var _mdgriffith$style_elements$Element_Attributes$hidden = _mdgriffith$style_elements$Element_Internal_Model$Hidden;
var _mdgriffith$style_elements$Element_Attributes$paddingBottom = function (x) {
	return A4(
		_mdgriffith$style_elements$Element_Internal_Model$Padding,
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Just(x),
		_elm_lang$core$Maybe$Nothing);
};
var _mdgriffith$style_elements$Element_Attributes$paddingTop = function (x) {
	return A4(
		_mdgriffith$style_elements$Element_Internal_Model$Padding,
		_elm_lang$core$Maybe$Just(x),
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Nothing);
};
var _mdgriffith$style_elements$Element_Attributes$paddingRight = function (x) {
	return A4(
		_mdgriffith$style_elements$Element_Internal_Model$Padding,
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Just(x),
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Nothing);
};
var _mdgriffith$style_elements$Element_Attributes$paddingLeft = function (x) {
	return A4(
		_mdgriffith$style_elements$Element_Internal_Model$Padding,
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Just(x));
};
var _mdgriffith$style_elements$Element_Attributes$paddingXY = F2(
	function (x, y) {
		return A4(
			_mdgriffith$style_elements$Element_Internal_Model$Padding,
			_elm_lang$core$Maybe$Just(y),
			_elm_lang$core$Maybe$Just(x),
			_elm_lang$core$Maybe$Just(y),
			_elm_lang$core$Maybe$Just(x));
	});
var _mdgriffith$style_elements$Element_Attributes$padding = function (x) {
	return A4(
		_mdgriffith$style_elements$Element_Internal_Model$Padding,
		_elm_lang$core$Maybe$Just(x),
		_elm_lang$core$Maybe$Just(x),
		_elm_lang$core$Maybe$Just(x),
		_elm_lang$core$Maybe$Just(x));
};
var _mdgriffith$style_elements$Element_Attributes$spacingXY = _mdgriffith$style_elements$Element_Internal_Model$Spacing;
var _mdgriffith$style_elements$Element_Attributes$spacing = function (x) {
	return A2(_mdgriffith$style_elements$Element_Internal_Model$Spacing, x, x);
};
var _mdgriffith$style_elements$Element_Attributes$vary = _mdgriffith$style_elements$Element_Internal_Model$Vary;
var _mdgriffith$style_elements$Element_Attributes$percent = _mdgriffith$style_elements$Style_Internal_Model$Percent;
var _mdgriffith$style_elements$Element_Attributes$fill = _mdgriffith$style_elements$Style_Internal_Model$Fill;
var _mdgriffith$style_elements$Element_Attributes$px = _mdgriffith$style_elements$Style_Internal_Model$Px;
var _mdgriffith$style_elements$Element_Attributes$height = _mdgriffith$style_elements$Element_Internal_Model$Height;
var _mdgriffith$style_elements$Element_Attributes$maxHeight = function (len) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'max-height',
					_1: _mdgriffith$style_elements$Style_Internal_Render_Value$length(len)
				},
				_1: {ctor: '[]'}
			}));
};
var _mdgriffith$style_elements$Element_Attributes$minHeight = function (len) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'min-height',
					_1: _mdgriffith$style_elements$Style_Internal_Render_Value$length(len)
				},
				_1: {ctor: '[]'}
			}));
};
var _mdgriffith$style_elements$Element_Attributes$maxWidth = function (len) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'max-width',
					_1: _mdgriffith$style_elements$Style_Internal_Render_Value$length(len)
				},
				_1: {ctor: '[]'}
			}));
};
var _mdgriffith$style_elements$Element_Attributes$minWidth = function (len) {
	return _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'min-width',
					_1: _mdgriffith$style_elements$Style_Internal_Render_Value$length(len)
				},
				_1: {ctor: '[]'}
			}));
};
var _mdgriffith$style_elements$Element_Attributes$width = _mdgriffith$style_elements$Element_Internal_Model$Width;
var _mdgriffith$style_elements$Element_Attributes$moveXY = F2(
	function (x, y) {
		return A3(
			_mdgriffith$style_elements$Element_Internal_Model$Position,
			_elm_lang$core$Maybe$Just(x),
			_elm_lang$core$Maybe$Just(y),
			_elm_lang$core$Maybe$Nothing);
	});
var _mdgriffith$style_elements$Element_Attributes$moveY = function (y) {
	return A3(
		_mdgriffith$style_elements$Element_Internal_Model$Position,
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Just(y),
		_elm_lang$core$Maybe$Nothing);
};
var _mdgriffith$style_elements$Element_Attributes$moveX = function (x) {
	return A3(
		_mdgriffith$style_elements$Element_Internal_Model$Position,
		_elm_lang$core$Maybe$Just(x),
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Nothing);
};
var _mdgriffith$style_elements$Element_Attributes$moveLeft = function (x) {
	return A3(
		_mdgriffith$style_elements$Element_Internal_Model$Position,
		_elm_lang$core$Maybe$Just(
			_elm_lang$core$Basics$negate(x)),
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Nothing);
};
var _mdgriffith$style_elements$Element_Attributes$moveRight = function (x) {
	return A3(
		_mdgriffith$style_elements$Element_Internal_Model$Position,
		_elm_lang$core$Maybe$Just(x),
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Nothing);
};
var _mdgriffith$style_elements$Element_Attributes$moveDown = function (y) {
	return A3(
		_mdgriffith$style_elements$Element_Internal_Model$Position,
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Just(y),
		_elm_lang$core$Maybe$Nothing);
};
var _mdgriffith$style_elements$Element_Attributes$moveUp = function (y) {
	return A3(
		_mdgriffith$style_elements$Element_Internal_Model$Position,
		_elm_lang$core$Maybe$Nothing,
		_elm_lang$core$Maybe$Just(
			_elm_lang$core$Basics$negate(y)),
		_elm_lang$core$Maybe$Nothing);
};
var _mdgriffith$style_elements$Element_Attributes$alignRight = _mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Right);
var _mdgriffith$style_elements$Element_Attributes$alignLeft = _mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Left);
var _mdgriffith$style_elements$Element_Attributes$alignBottom = _mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$Bottom);
var _mdgriffith$style_elements$Element_Attributes$alignTop = _mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$Top);
var _mdgriffith$style_elements$Element_Attributes$justify = _mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Justify);
var _mdgriffith$style_elements$Element_Attributes$verticalCenter = _mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$VerticalCenter);
var _mdgriffith$style_elements$Element_Attributes$center = _mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Center);

var _mdgriffith$style_elements$Element_Internal_Adjustments$spacingToMargin = function (attrs) {
	var spaceToMarg = function (a) {
		var _p0 = a;
		if (_p0.ctor === 'Spacing') {
			var _p2 = _p0._1;
			var _p1 = _p0._0;
			return _mdgriffith$style_elements$Element_Internal_Model$Margin(
				{ctor: '_Tuple4', _0: _p2, _1: _p1, _2: _p2, _3: _p1});
		} else {
			return _p0;
		}
	};
	return A2(_elm_lang$core$List$map, spaceToMarg, attrs);
};
var _mdgriffith$style_elements$Element_Internal_Adjustments$defaultPadding = F2(
	function (_p4, _p3) {
		var _p5 = _p4;
		var _p6 = _p3;
		return {
			ctor: '_Tuple4',
			_0: A2(_elm_lang$core$Maybe$withDefault, _p6._0, _p5._0),
			_1: A2(_elm_lang$core$Maybe$withDefault, _p6._1, _p5._1),
			_2: A2(_elm_lang$core$Maybe$withDefault, _p6._2, _p5._2),
			_3: A2(_elm_lang$core$Maybe$withDefault, _p6._3, _p5._3)
		};
	});
var _mdgriffith$style_elements$Element_Internal_Adjustments$hoistFixedScreenElements = function (el) {
	var elementIsOnScreen = function (attrs) {
		return A2(
			_elm_lang$core$List$any,
			function (attr) {
				return _elm_lang$core$Native_Utils.eq(
					attr,
					_mdgriffith$style_elements$Element_Internal_Model$PositionFrame(_mdgriffith$style_elements$Element_Internal_Model$Screen));
			},
			attrs);
	};
	var _p7 = el;
	switch (_p7.ctor) {
		case 'Element':
			return elementIsOnScreen(_p7._0.attrs) ? {
				ctor: '_Tuple2',
				_0: _mdgriffith$style_elements$Element_Internal_Model$Empty,
				_1: _elm_lang$core$Maybe$Just(
					{
						ctor: '::',
						_0: el,
						_1: {ctor: '[]'}
					})
			} : {ctor: '_Tuple2', _0: el, _1: _elm_lang$core$Maybe$Nothing};
		case 'Layout':
			return elementIsOnScreen(_p7._0.attrs) ? {
				ctor: '_Tuple2',
				_0: _mdgriffith$style_elements$Element_Internal_Model$Empty,
				_1: _elm_lang$core$Maybe$Just(
					{
						ctor: '::',
						_0: el,
						_1: {ctor: '[]'}
					})
			} : {ctor: '_Tuple2', _0: el, _1: _elm_lang$core$Maybe$Nothing};
		default:
			return {ctor: '_Tuple2', _0: el, _1: _elm_lang$core$Maybe$Nothing};
	}
};
var _mdgriffith$style_elements$Element_Internal_Adjustments$tagIntermediates = false;
var _mdgriffith$style_elements$Element_Internal_Adjustments$tag = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Adjustments$tagIntermediates ? _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$class(str)) : _mdgriffith$style_elements$Element_Internal_Model$Attr(
		_elm_lang$html$Html_Attributes$class(''));
};
var _mdgriffith$style_elements$Element_Internal_Adjustments$counterSpacing = function (elm) {
	var _p8 = elm;
	if (_p8.ctor === 'Layout') {
		var _p25 = _p8._0.layout;
		var _p24 = _p8._0.attrs;
		var forPadding = function (posAttr) {
			var _p9 = posAttr;
			if (_p9.ctor === 'Padding') {
				return _elm_lang$core$Maybe$Just(
					A2(
						_mdgriffith$style_elements$Element_Internal_Adjustments$defaultPadding,
						{ctor: '_Tuple4', _0: _p9._0, _1: _p9._1, _2: _p9._2, _3: _p9._3},
						{ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0}));
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		};
		var forSpacing = function (posAttr) {
			var _p10 = posAttr;
			if (_p10.ctor === 'Spacing') {
				var _p12 = _p10._1;
				var _p11 = _p10._0;
				return _elm_lang$core$Maybe$Just(
					{ctor: '_Tuple4', _0: _p12, _1: _p11, _2: _p12, _3: _p11});
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		};
		var padding = _elm_lang$core$List$head(
			_elm_lang$core$List$reverse(
				A2(_elm_lang$core$List$filterMap, forPadding, _p24)));
		var spacing = _elm_lang$core$List$head(
			_elm_lang$core$List$reverse(
				A2(_elm_lang$core$List$filterMap, forSpacing, _p24)));
		var hasSpacing = function () {
			var _p13 = spacing;
			if (_p13.ctor === 'Nothing') {
				return false;
			} else {
				return true;
			}
		}();
		var _p14 = A2(
			_elm_lang$core$List$partition,
			function (attr) {
				return _elm_lang$core$Native_Utils.eq(
					attr,
					_mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Center)) || _elm_lang$core$Native_Utils.eq(
					attr,
					_mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$VerticalCenter));
			},
			_p24);
		var centeredProps = _p14._0;
		var others = _p14._1;
		var _p15 = _p25;
		if (_p15.ctor === 'FlexLayout') {
			if (hasSpacing) {
				var phantomPadding = _mdgriffith$style_elements$Element_Internal_Model$PhantomPadding(
					A2(
						_elm_lang$core$Maybe$withDefault,
						{ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0},
						padding));
				var _p16 = function () {
					var _p17 = spacing;
					if (_p17.ctor === 'Nothing') {
						return {
							ctor: '_Tuple3',
							_0: {ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0},
							_1: A2(_mdgriffith$style_elements$Element_Internal_Model$Spacing, 0, 0),
							_2: 0
						};
					} else {
						var _p20 = _p17._0._1;
						var _p19 = _p17._0._3;
						var _p18 = _p17._0._2;
						return {
							ctor: '_Tuple3',
							_0: {ctor: '_Tuple4', _0: -1 * _p17._0._0, _1: -1 * _p20, _2: -1 * _p18, _3: -1 * _p19},
							_1: A2(_mdgriffith$style_elements$Element_Internal_Model$Spacing, _p20, _p18),
							_2: (_p20 + _p19) / 2
						};
					}
				}();
				var negativeMargin = _p16._0;
				var spacingAttr = _p16._1;
				var totalHSpacing = _p16._2;
				var forAlignment = function (attr) {
					var _p21 = attr;
					switch (_p21.ctor) {
						case 'HAlign':
							return true;
						case 'VAlign':
							return true;
						default:
							return false;
					}
				};
				var _p22 = A2(_elm_lang$core$List$partition, forAlignment, _p24);
				var aligned = _p22._0;
				var unaligned = _p22._1;
				return _mdgriffith$style_elements$Element_Internal_Model$Layout(
					{
						node: _p8._0.node,
						style: _p8._0.style,
						layout: A2(
							_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
							_mdgriffith$style_elements$Style_Internal_Model$GoRight,
							{ctor: '[]'}),
						attrs: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Adjustments$tag('counter-spacing-container'),
							_1: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(true),
								_1: unaligned
							}
						},
						children: _mdgriffith$style_elements$Element_Internal_Model$Normal(
							{
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$Layout(
									{
										node: 'div',
										style: _elm_lang$core$Maybe$Nothing,
										layout: _p25,
										attrs: {
											ctor: '::',
											_0: _mdgriffith$style_elements$Element_Internal_Adjustments$tag('counter-spacing'),
											_1: {
												ctor: '::',
												_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(false),
												_1: {
													ctor: '::',
													_0: phantomPadding,
													_1: {
														ctor: '::',
														_0: _mdgriffith$style_elements$Element_Internal_Model$Margin(negativeMargin),
														_1: {
															ctor: '::',
															_0: spacingAttr,
															_1: {
																ctor: '::',
																_0: _mdgriffith$style_elements$Element_Internal_Model$Width(
																	A2(_mdgriffith$style_elements$Style_Internal_Model$Calc, 100, totalHSpacing)),
																_1: {
																	ctor: '::',
																	_0: _mdgriffith$style_elements$Element_Internal_Model$Shrink(1),
																	_1: aligned
																}
															}
														}
													}
												}
											}
										},
										children: function () {
											var _p23 = _p8._0.children;
											if (_p23.ctor === 'Normal') {
												return _mdgriffith$style_elements$Element_Internal_Model$Normal(
													A2(
														_elm_lang$core$List$map,
														_mdgriffith$style_elements$Element_Internal_Modify$addAttr(
															_mdgriffith$style_elements$Element_Internal_Model$PointerEvents(true)),
														_p23._0));
											} else {
												return _mdgriffith$style_elements$Element_Internal_Model$Keyed(
													A2(
														_elm_lang$core$List$map,
														_elm_lang$core$Tuple$mapSecond(
															_mdgriffith$style_elements$Element_Internal_Modify$addAttr(
																_mdgriffith$style_elements$Element_Internal_Model$PointerEvents(true))),
														_p23._0));
											}
										}(),
										absolutelyPositioned: _elm_lang$core$Maybe$Nothing
									}),
								_1: {ctor: '[]'}
							}),
						absolutelyPositioned: _p8._0.absolutelyPositioned
					});
			} else {
				return _mdgriffith$style_elements$Element_Internal_Model$Layout(
					_elm_lang$core$Native_Utils.update(
						_p8._0,
						{
							attrs: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(true),
								_1: _p24
							}
						}));
			}
		} else {
			return elm;
		}
	} else {
		return elm;
	}
};
var _mdgriffith$style_elements$Element_Internal_Adjustments$positionNearby = F2(
	function (parent, elm) {
		var setPosition = F3(
			function (nearbyPosition, _p26, el) {
				var _p27 = _p26;
				var _p31 = _p27._1;
				var _p30 = _p27._0;
				var nearbyAlignment = function () {
					var _p28 = nearbyPosition;
					_v13_4:
					do {
						if ((_p28.ctor === 'Just') && (_p28._0.ctor === 'Nearby')) {
							switch (_p28._0._0.ctor) {
								case 'Above':
									return {
										ctor: '::',
										_0: _mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$Top),
										_1: {ctor: '[]'}
									};
								case 'Below':
									return {
										ctor: '::',
										_0: _mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$Bottom),
										_1: {ctor: '[]'}
									};
								case 'OnRight':
									return {
										ctor: '::',
										_0: _mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Right),
										_1: {ctor: '[]'}
									};
								case 'OnLeft':
									return {
										ctor: '::',
										_0: _mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Left),
										_1: {ctor: '[]'}
									};
								default:
									break _v13_4;
							}
						} else {
							break _v13_4;
						}
					} while(false);
					return {ctor: '[]'};
				}();
				var framed = function () {
					var _p29 = nearbyPosition;
					if (_p29.ctor === 'Nothing') {
						return false;
					} else {
						return true;
					}
				}();
				return (_elm_lang$core$Native_Utils.eq(
					nearbyPosition,
					_elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Element_Internal_Model$Nearby(_mdgriffith$style_elements$Element_Internal_Model$Above))) || _elm_lang$core$Native_Utils.eq(
					nearbyPosition,
					_elm_lang$core$Maybe$Just(
						_mdgriffith$style_elements$Element_Internal_Model$Nearby(_mdgriffith$style_elements$Element_Internal_Model$Below)))) ? _mdgriffith$style_elements$Element_Internal_Model$Layout(
					{
						node: 'div',
						style: _elm_lang$core$Maybe$Nothing,
						layout: A2(
							_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
							_mdgriffith$style_elements$Style_Internal_Model$GoRight,
							{ctor: '[]'}),
						attrs: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Adjustments$tag('above-below-intermediate-parent'),
							_1: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(false),
								_1: {
									ctor: '::',
									_0: _mdgriffith$style_elements$Element_Internal_Model$Height(
										_mdgriffith$style_elements$Style_Internal_Model$Px(0)),
									_1: {
										ctor: '::',
										_0: _mdgriffith$style_elements$Element_Internal_Model$Width(
											_mdgriffith$style_elements$Style_Internal_Model$Percent(100)),
										_1: {
											ctor: '::',
											_0: _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(
												_mdgriffith$style_elements$Element_Internal_Model$Absolute(
													_elm_lang$core$Native_Utils.eq(
														nearbyPosition,
														_elm_lang$core$Maybe$Just(
															_mdgriffith$style_elements$Element_Internal_Model$Nearby(_mdgriffith$style_elements$Element_Internal_Model$Above))) ? _mdgriffith$style_elements$Element_Internal_Model$TopLeft : _mdgriffith$style_elements$Element_Internal_Model$BottomLeft)),
											_1: {
												ctor: '::',
												_0: A3(
													_mdgriffith$style_elements$Element_Internal_Model$Position,
													_elm_lang$core$Maybe$Just(0),
													_elm_lang$core$Maybe$Just(0),
													_elm_lang$core$Maybe$Nothing),
												_1: A2(_elm_lang$core$Basics_ops['++'], nearbyAlignment, _p30)
											}
										}
									}
								}
							}
						},
						children: _mdgriffith$style_elements$Element_Internal_Model$Normal(
							{
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$Element(
									{
										node: 'div',
										style: _elm_lang$core$Maybe$Nothing,
										attrs: {
											ctor: '::',
											_0: _mdgriffith$style_elements$Element_Internal_Adjustments$tag('above-below-intermediate'),
											_1: {
												ctor: '::',
												_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(false),
												_1: {
													ctor: '::',
													_0: _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(
														_mdgriffith$style_elements$Element_Internal_Model$Absolute(
															_elm_lang$core$Native_Utils.eq(
																nearbyPosition,
																_elm_lang$core$Maybe$Just(
																	_mdgriffith$style_elements$Element_Internal_Model$Nearby(_mdgriffith$style_elements$Element_Internal_Model$Above))) ? _mdgriffith$style_elements$Element_Internal_Model$BottomLeft : _mdgriffith$style_elements$Element_Internal_Model$TopLeft)),
													_1: {
														ctor: '::',
														_0: A3(
															_mdgriffith$style_elements$Element_Internal_Model$Position,
															_elm_lang$core$Maybe$Nothing,
															_elm_lang$core$Maybe$Just(0),
															_elm_lang$core$Maybe$Nothing),
														_1: {
															ctor: '::',
															_0: _mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$Bottom),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										},
										child: _mdgriffith$style_elements$Element_Internal_Adjustments$counterSpacing(
											A2(
												_mdgriffith$style_elements$Element_Internal_Modify$setAttrs,
												{
													ctor: '::',
													_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(true),
													_1: {
														ctor: '::',
														_0: _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(
															_mdgriffith$style_elements$Element_Internal_Model$Absolute(_mdgriffith$style_elements$Element_Internal_Model$TopLeft)),
														_1: {
															ctor: '::',
															_0: A3(
																_mdgriffith$style_elements$Element_Internal_Model$Position,
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Nothing),
															_1: _p31
														}
													}
												},
												el)),
										absolutelyPositioned: _elm_lang$core$Maybe$Nothing
									}),
								_1: {ctor: '[]'}
							}),
						absolutelyPositioned: _elm_lang$core$Maybe$Nothing
					}) : (framed ? _mdgriffith$style_elements$Element_Internal_Model$Layout(
					{
						node: 'div',
						style: _elm_lang$core$Maybe$Nothing,
						layout: A2(
							_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
							_mdgriffith$style_elements$Style_Internal_Model$GoRight,
							{ctor: '[]'}),
						attrs: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Adjustments$tag('nearby-intermediate-parent'),
							_1: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(false),
								_1: {
									ctor: '::',
									_0: _mdgriffith$style_elements$Element_Internal_Model$Height(
										_mdgriffith$style_elements$Style_Internal_Model$Percent(100)),
									_1: {
										ctor: '::',
										_0: _mdgriffith$style_elements$Element_Internal_Model$Width(
											_mdgriffith$style_elements$Style_Internal_Model$Percent(100)),
										_1: {
											ctor: '::',
											_0: _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(
												_mdgriffith$style_elements$Element_Internal_Model$Absolute(_mdgriffith$style_elements$Element_Internal_Model$TopLeft)),
											_1: {
												ctor: '::',
												_0: A3(
													_mdgriffith$style_elements$Element_Internal_Model$Position,
													_elm_lang$core$Maybe$Just(0),
													_elm_lang$core$Maybe$Just(0),
													_elm_lang$core$Maybe$Nothing),
												_1: A2(_elm_lang$core$Basics_ops['++'], nearbyAlignment, _p30)
											}
										}
									}
								}
							}
						},
						children: _mdgriffith$style_elements$Element_Internal_Model$Normal(
							{
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$Element(
									{
										node: 'div',
										style: _elm_lang$core$Maybe$Nothing,
										attrs: A2(
											_elm_lang$core$Basics_ops['++'],
											_p31,
											{
												ctor: '::',
												_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(false),
												_1: {
													ctor: '::',
													_0: _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(_mdgriffith$style_elements$Element_Internal_Model$Relative),
													_1: {
														ctor: '::',
														_0: A3(
															_mdgriffith$style_elements$Element_Internal_Model$Position,
															_elm_lang$core$Maybe$Just(0),
															_elm_lang$core$Maybe$Just(0),
															_elm_lang$core$Maybe$Nothing),
														_1: {
															ctor: '::',
															_0: A4(
																_mdgriffith$style_elements$Element_Internal_Model$Padding,
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Just(0)),
															_1: {
																ctor: '::',
																_0: _mdgriffith$style_elements$Element_Internal_Adjustments$tag('nearby-intermediate'),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}),
										child: _mdgriffith$style_elements$Element_Internal_Adjustments$counterSpacing(
											A2(
												_mdgriffith$style_elements$Element_Internal_Modify$addAttrList,
												{
													ctor: '::',
													_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(true),
													_1: {
														ctor: '::',
														_0: _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(
															_mdgriffith$style_elements$Element_Internal_Model$Absolute(_mdgriffith$style_elements$Element_Internal_Model$TopLeft)),
														_1: {
															ctor: '::',
															_0: A3(
																_mdgriffith$style_elements$Element_Internal_Model$Position,
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Nothing),
															_1: {ctor: '[]'}
														}
													}
												},
												el)),
										absolutelyPositioned: _elm_lang$core$Maybe$Nothing
									}),
								_1: {ctor: '[]'}
							}),
						absolutelyPositioned: _elm_lang$core$Maybe$Nothing
					}) : ((!_elm_lang$core$List$isEmpty(_p30)) ? _mdgriffith$style_elements$Element_Internal_Model$Layout(
					{
						node: 'div',
						style: _elm_lang$core$Maybe$Nothing,
						layout: A2(
							_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
							_mdgriffith$style_elements$Style_Internal_Model$GoRight,
							{ctor: '[]'}),
						attrs: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Adjustments$tag('nearby-intermediate-parent'),
							_1: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(false),
								_1: {
									ctor: '::',
									_0: _mdgriffith$style_elements$Element_Internal_Model$Height(
										_mdgriffith$style_elements$Style_Internal_Model$Percent(100)),
									_1: {
										ctor: '::',
										_0: _mdgriffith$style_elements$Element_Internal_Model$Width(
											_mdgriffith$style_elements$Style_Internal_Model$Percent(100)),
										_1: {
											ctor: '::',
											_0: _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(_mdgriffith$style_elements$Element_Internal_Model$Relative),
											_1: {
												ctor: '::',
												_0: A3(
													_mdgriffith$style_elements$Element_Internal_Model$Position,
													_elm_lang$core$Maybe$Just(0),
													_elm_lang$core$Maybe$Just(0),
													_elm_lang$core$Maybe$Nothing),
												_1: A2(_elm_lang$core$Basics_ops['++'], nearbyAlignment, _p30)
											}
										}
									}
								}
							}
						},
						children: _mdgriffith$style_elements$Element_Internal_Model$Normal(
							{
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$Element(
									{
										node: 'div',
										style: _elm_lang$core$Maybe$Nothing,
										attrs: A2(
											_elm_lang$core$Basics_ops['++'],
											_p31,
											{
												ctor: '::',
												_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(false),
												_1: {
													ctor: '::',
													_0: _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(_mdgriffith$style_elements$Element_Internal_Model$Relative),
													_1: {
														ctor: '::',
														_0: A3(
															_mdgriffith$style_elements$Element_Internal_Model$Position,
															_elm_lang$core$Maybe$Just(0),
															_elm_lang$core$Maybe$Just(0),
															_elm_lang$core$Maybe$Nothing),
														_1: {
															ctor: '::',
															_0: A4(
																_mdgriffith$style_elements$Element_Internal_Model$Padding,
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Just(0)),
															_1: {
																ctor: '::',
																_0: _mdgriffith$style_elements$Element_Internal_Adjustments$tag('nearby-intermediate'),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}),
										child: _mdgriffith$style_elements$Element_Internal_Adjustments$counterSpacing(
											A2(
												_mdgriffith$style_elements$Element_Internal_Modify$addAttrList,
												{
													ctor: '::',
													_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(true),
													_1: {
														ctor: '::',
														_0: _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(_mdgriffith$style_elements$Element_Internal_Model$Relative),
														_1: {
															ctor: '::',
															_0: A3(
																_mdgriffith$style_elements$Element_Internal_Model$Position,
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Just(0),
																_elm_lang$core$Maybe$Nothing),
															_1: {ctor: '[]'}
														}
													}
												},
												el)),
										absolutelyPositioned: _elm_lang$core$Maybe$Nothing
									}),
								_1: {ctor: '[]'}
							}),
						absolutelyPositioned: _elm_lang$core$Maybe$Nothing
					}) : _mdgriffith$style_elements$Element_Internal_Adjustments$counterSpacing(elm)));
			});
		var forAlignment = function (attr) {
			var _p32 = attr;
			switch (_p32.ctor) {
				case 'HAlign':
					return true;
				case 'VAlign':
					return true;
				default:
					return false;
			}
		};
		var separateAlignment = function (attrs) {
			return A2(_elm_lang$core$List$partition, forAlignment, attrs);
		};
		var _p33 = elm;
		switch (_p33.ctor) {
			case 'Element':
				var _p37 = _p33._0.attrs;
				var isFrame = function (attr) {
					var _p34 = attr;
					if (_p34.ctor === 'PositionFrame') {
						return _elm_lang$core$Maybe$Just(_p34._0);
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				};
				var frame = _elm_lang$core$List$head(
					A2(_elm_lang$core$List$filterMap, isFrame, _p37));
				var _p35 = separateAlignment(_p37);
				var aligned = _p35._0;
				var unaligned = _p35._1;
				var _p36 = parent;
				if (_p36.ctor === 'Nothing') {
					return A3(
						setPosition,
						frame,
						{ctor: '_Tuple2', _0: aligned, _1: unaligned},
						elm);
				} else {
					return elm;
				}
			case 'Layout':
				var _p41 = _p33._0.attrs;
				var isFrame = function (attr) {
					var _p38 = attr;
					if (_p38.ctor === 'PositionFrame') {
						return _elm_lang$core$Maybe$Just(_p38._0);
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				};
				var frame = _elm_lang$core$List$head(
					A2(_elm_lang$core$List$filterMap, isFrame, _p41));
				var _p39 = separateAlignment(_p41);
				var aligned = _p39._0;
				var unaligned = _p39._1;
				var _p40 = parent;
				if (_p40.ctor === 'Nothing') {
					return A3(
						setPosition,
						frame,
						{ctor: '_Tuple2', _0: aligned, _1: unaligned},
						elm);
				} else {
					return _mdgriffith$style_elements$Element_Internal_Adjustments$counterSpacing(elm);
				}
			default:
				return _mdgriffith$style_elements$Element_Internal_Adjustments$counterSpacing(elm);
		}
	});
var _mdgriffith$style_elements$Element_Internal_Adjustments$centerTextLayout = function (elm) {
	var _p42 = elm;
	if (_p42.ctor === 'Layout') {
		var _p43 = A2(
			_elm_lang$core$List$partition,
			function (attr) {
				return _elm_lang$core$Native_Utils.eq(
					attr,
					_mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Center)) || _elm_lang$core$Native_Utils.eq(
					attr,
					_mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$VerticalCenter));
			},
			_p42._0.attrs);
		var centeredProps = _p43._0;
		var others = _p43._1;
		var _p44 = _p42._0.layout;
		if (_p44.ctor === 'TextLayout') {
			return (!_elm_lang$core$List$isEmpty(centeredProps)) ? _mdgriffith$style_elements$Element_Internal_Model$Layout(
				{
					node: 'div',
					style: _elm_lang$core$Maybe$Nothing,
					layout: A2(
						_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
						_mdgriffith$style_elements$Style_Internal_Model$GoRight,
						{ctor: '[]'}),
					attrs: {
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Internal_Adjustments$tag('center-text'),
						_1: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(false),
							_1: centeredProps
						}
					},
					children: _mdgriffith$style_elements$Element_Internal_Model$Normal(
						{
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Model$Layout(
								_elm_lang$core$Native_Utils.update(
									_p42._0,
									{
										attrs: {
											ctor: '::',
											_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(true),
											_1: others
										}
									})),
							_1: {ctor: '[]'}
						}),
					absolutelyPositioned: _elm_lang$core$Maybe$Nothing
				}) : elm;
		} else {
			return elm;
		}
	} else {
		return elm;
	}
};
var _mdgriffith$style_elements$Element_Internal_Adjustments$apply = function (root) {
	var stack = F2(
		function (parent, el) {
			return function (_p45) {
				return _mdgriffith$style_elements$Element_Internal_Adjustments$hoistFixedScreenElements(
					A2(
						_mdgriffith$style_elements$Element_Internal_Adjustments$positionNearby,
						parent,
						_mdgriffith$style_elements$Element_Internal_Adjustments$centerTextLayout(_p45)));
			}(el);
		});
	return A3(_mdgriffith$style_elements$Element_Internal_Model$adjust, stack, _elm_lang$core$Maybe$Nothing, root);
};

var _mdgriffith$style_elements$Element_Internal_Render$renderPadding = function (_p0) {
	var _p1 = _p0;
	var format = F2(
		function (name, x) {
			return {
				ctor: '_Tuple2',
				_0: name,
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(x),
					'px')
			};
		});
	return A2(
		_elm_lang$core$List$filterMap,
		_elm_lang$core$Basics$identity,
		{
			ctor: '::',
			_0: A2(
				_elm_lang$core$Maybe$map,
				format('padding-top'),
				_p1._0),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$core$Maybe$map,
					format('padding-bottom'),
					_p1._2),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$core$Maybe$map,
						format('padding-left'),
						_p1._3),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$core$Maybe$map,
							format('padding-right'),
							_p1._1),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _mdgriffith$style_elements$Element_Internal_Render$flexboxVerticalIndividualAlignment = F2(
	function (direction, alignment) {
		var _p2 = direction;
		switch (_p2.ctor) {
			case 'GoRight':
				var _p3 = alignment;
				switch (_p3.ctor) {
					case 'Top':
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'flex-start'});
					case 'Bottom':
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'flex-end'});
					default:
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'center'});
				}
			case 'GoLeft':
				var _p4 = alignment;
				switch (_p4.ctor) {
					case 'Top':
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'flex-start'});
					case 'Bottom':
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'flex-end'});
					default:
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'center'});
				}
			case 'Down':
				var _p5 = alignment;
				switch (_p5.ctor) {
					case 'Top':
						return _elm_lang$core$Maybe$Nothing;
					case 'Bottom':
						return _elm_lang$core$Maybe$Nothing;
					default:
						return _elm_lang$core$Maybe$Nothing;
				}
			default:
				var _p6 = alignment;
				switch (_p6.ctor) {
					case 'Top':
						return _elm_lang$core$Maybe$Nothing;
					case 'Bottom':
						return _elm_lang$core$Maybe$Nothing;
					default:
						return _elm_lang$core$Maybe$Nothing;
				}
		}
	});
var _mdgriffith$style_elements$Element_Internal_Render$flexboxHorizontalIndividualAlignment = F2(
	function (direction, alignment) {
		var _p7 = direction;
		switch (_p7.ctor) {
			case 'GoRight':
				var _p8 = alignment;
				switch (_p8.ctor) {
					case 'Left':
						return _elm_lang$core$Maybe$Nothing;
					case 'Right':
						return _elm_lang$core$Maybe$Nothing;
					case 'Center':
						return _elm_lang$core$Maybe$Nothing;
					default:
						return _elm_lang$core$Maybe$Nothing;
				}
			case 'GoLeft':
				var _p9 = alignment;
				switch (_p9.ctor) {
					case 'Left':
						return _elm_lang$core$Maybe$Nothing;
					case 'Right':
						return _elm_lang$core$Maybe$Nothing;
					case 'Center':
						return _elm_lang$core$Maybe$Nothing;
					default:
						return _elm_lang$core$Maybe$Nothing;
				}
			case 'Down':
				var _p10 = alignment;
				switch (_p10.ctor) {
					case 'Left':
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'flex-start'});
					case 'Right':
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'flex-end'});
					case 'Center':
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'center'});
					default:
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'stretch'});
				}
			default:
				var _p11 = alignment;
				switch (_p11.ctor) {
					case 'Left':
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'flex-start'});
					case 'Right':
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'flex-end'});
					case 'Center':
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'center'});
					default:
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: 'align-self', _1: 'stretch'});
				}
		}
	});
var _mdgriffith$style_elements$Element_Internal_Render$alignLayout = F3(
	function (maybeHorizontal, maybeVertical, layout) {
		var alignGridVertical = function (align) {
			var _p12 = align;
			switch (_p12.ctor) {
				case 'Top':
					return _mdgriffith$style_elements$Style_Internal_Model$GridV(
						_mdgriffith$style_elements$Style_Internal_Model$Other(_mdgriffith$style_elements$Style_Internal_Model$Top));
				case 'Bottom':
					return _mdgriffith$style_elements$Style_Internal_Model$GridV(
						_mdgriffith$style_elements$Style_Internal_Model$Other(_mdgriffith$style_elements$Style_Internal_Model$Bottom));
				default:
					return _mdgriffith$style_elements$Style_Internal_Model$GridV(_mdgriffith$style_elements$Style_Internal_Model$Center);
			}
		};
		var alignGridHorizontal = function (align) {
			var _p13 = align;
			switch (_p13.ctor) {
				case 'Left':
					return _mdgriffith$style_elements$Style_Internal_Model$GridH(
						_mdgriffith$style_elements$Style_Internal_Model$Other(_mdgriffith$style_elements$Style_Internal_Model$Left));
				case 'Right':
					return _mdgriffith$style_elements$Style_Internal_Model$GridH(
						_mdgriffith$style_elements$Style_Internal_Model$Other(_mdgriffith$style_elements$Style_Internal_Model$Right));
				case 'Center':
					return _mdgriffith$style_elements$Style_Internal_Model$GridH(_mdgriffith$style_elements$Style_Internal_Model$Center);
				default:
					return _mdgriffith$style_elements$Style_Internal_Model$GridH(_mdgriffith$style_elements$Style_Internal_Model$Justify);
			}
		};
		var alignFlexboxVertical = function (align) {
			var _p14 = align;
			switch (_p14.ctor) {
				case 'Top':
					return _mdgriffith$style_elements$Style_Internal_Model$Vert(
						_mdgriffith$style_elements$Style_Internal_Model$Other(_mdgriffith$style_elements$Style_Internal_Model$Top));
				case 'Bottom':
					return _mdgriffith$style_elements$Style_Internal_Model$Vert(
						_mdgriffith$style_elements$Style_Internal_Model$Other(_mdgriffith$style_elements$Style_Internal_Model$Bottom));
				default:
					return _mdgriffith$style_elements$Style_Internal_Model$Vert(_mdgriffith$style_elements$Style_Internal_Model$Center);
			}
		};
		var alignFlexboxHorizontal = function (align) {
			var _p15 = align;
			switch (_p15.ctor) {
				case 'Left':
					return _mdgriffith$style_elements$Style_Internal_Model$Horz(
						_mdgriffith$style_elements$Style_Internal_Model$Other(_mdgriffith$style_elements$Style_Internal_Model$Left));
				case 'Right':
					return _mdgriffith$style_elements$Style_Internal_Model$Horz(
						_mdgriffith$style_elements$Style_Internal_Model$Other(_mdgriffith$style_elements$Style_Internal_Model$Right));
				case 'Center':
					return _mdgriffith$style_elements$Style_Internal_Model$Horz(_mdgriffith$style_elements$Style_Internal_Model$Center);
				default:
					return _mdgriffith$style_elements$Style_Internal_Model$Horz(_mdgriffith$style_elements$Style_Internal_Model$Justify);
			}
		};
		var _p16 = layout;
		switch (_p16.ctor) {
			case 'TextLayout':
				return _mdgriffith$style_elements$Style_Internal_Model$TextLayout(_p16._0);
			case 'FlexLayout':
				var _p19 = _p16._1;
				var _p18 = _p16._0;
				var _p17 = {ctor: '_Tuple2', _0: maybeHorizontal, _1: maybeVertical};
				if (_p17._0.ctor === 'Nothing') {
					if (_p17._1.ctor === 'Nothing') {
						return A2(_mdgriffith$style_elements$Style_Internal_Model$FlexLayout, _p18, _p19);
					} else {
						return A2(
							_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
							_p18,
							{
								ctor: '::',
								_0: alignFlexboxVertical(_p17._1._0),
								_1: _p19
							});
					}
				} else {
					if (_p17._1.ctor === 'Nothing') {
						return A2(
							_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
							_p18,
							{
								ctor: '::',
								_0: alignFlexboxHorizontal(_p17._0._0),
								_1: _p19
							});
					} else {
						return A2(
							_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
							_p18,
							{
								ctor: '::',
								_0: alignFlexboxHorizontal(_p17._0._0),
								_1: {
									ctor: '::',
									_0: alignFlexboxVertical(_p17._1._0),
									_1: _p19
								}
							});
					}
				}
			default:
				var _p22 = _p16._0;
				var _p21 = _p16._1;
				var _p20 = {ctor: '_Tuple2', _0: maybeHorizontal, _1: maybeVertical};
				if (_p20._0.ctor === 'Nothing') {
					if (_p20._1.ctor === 'Nothing') {
						return A2(_mdgriffith$style_elements$Style_Internal_Model$Grid, _p22, _p21);
					} else {
						return A2(
							_mdgriffith$style_elements$Style_Internal_Model$Grid,
							_p22,
							{
								ctor: '::',
								_0: alignGridVertical(_p20._1._0),
								_1: _p21
							});
					}
				} else {
					if (_p20._1.ctor === 'Nothing') {
						return A2(
							_mdgriffith$style_elements$Style_Internal_Model$Grid,
							_p22,
							{
								ctor: '::',
								_0: alignGridHorizontal(_p20._0._0),
								_1: _p21
							});
					} else {
						return A2(
							_mdgriffith$style_elements$Style_Internal_Model$Grid,
							_p22,
							{
								ctor: '::',
								_0: alignGridHorizontal(_p20._0._0),
								_1: {
									ctor: '::',
									_0: alignGridVertical(_p20._1._0),
									_1: _p21
								}
							});
					}
				}
		}
	});
var _mdgriffith$style_elements$Element_Internal_Render$makePositionable = F2(
	function (attr, pos) {
		var _p23 = attr;
		switch (_p23.ctor) {
			case 'Overflow':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						overflow: _elm_lang$core$Maybe$Just(_p23._0)
					});
			case 'Shrink':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						shrink: _elm_lang$core$Maybe$Just(_p23._0)
					});
			case 'Inline':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{inline: true});
			case 'Expand':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{expand: true});
			case 'Vary':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						variations: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _p23._0, _1: _p23._1},
							_1: pos.variations
						}
					});
			case 'Height':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						height: _elm_lang$core$Maybe$Just(_p23._0)
					});
			case 'Width':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						width: _elm_lang$core$Maybe$Just(_p23._0)
					});
			case 'Position':
				var _p24 = pos.positioned;
				var currentX = _p24._0;
				var currentY = _p24._1;
				var currentZ = _p24._2;
				var newX = function () {
					var _p25 = _p23._0;
					if (_p25.ctor === 'Nothing') {
						return currentX;
					} else {
						return _elm_lang$core$Maybe$Just(_p25._0);
					}
				}();
				var newY = function () {
					var _p26 = _p23._1;
					if (_p26.ctor === 'Nothing') {
						return currentY;
					} else {
						return _elm_lang$core$Maybe$Just(_p26._0);
					}
				}();
				var newZ = function () {
					var _p27 = _p23._2;
					if (_p27.ctor === 'Nothing') {
						return currentZ;
					} else {
						return _elm_lang$core$Maybe$Just(_p27._0);
					}
				}();
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						positioned: {ctor: '_Tuple3', _0: newX, _1: newY, _2: newZ}
					});
			case 'PositionFrame':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						frame: _elm_lang$core$Maybe$Just(_p23._0)
					});
			case 'HAlign':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						horizontal: _elm_lang$core$Maybe$Just(_p23._0)
					});
			case 'VAlign':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						vertical: _elm_lang$core$Maybe$Just(_p23._0)
					});
			case 'Spacing':
				return pos;
			case 'Margin':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						margin: _elm_lang$core$Maybe$Just(_p23._0)
					});
			case 'PhantomPadding':
				return pos;
			case 'Padding':
				var _p28 = pos.padding;
				var currentTop = _p28._0;
				var currentRight = _p28._1;
				var currentBottom = _p28._2;
				var currentLeft = _p28._3;
				var newTop = function () {
					var _p29 = _p23._0;
					if (_p29.ctor === 'Nothing') {
						return currentTop;
					} else {
						return _elm_lang$core$Maybe$Just(_p29._0);
					}
				}();
				var newRight = function () {
					var _p30 = _p23._1;
					if (_p30.ctor === 'Nothing') {
						return currentRight;
					} else {
						return _elm_lang$core$Maybe$Just(_p30._0);
					}
				}();
				var newBottom = function () {
					var _p31 = _p23._2;
					if (_p31.ctor === 'Nothing') {
						return currentBottom;
					} else {
						return _elm_lang$core$Maybe$Just(_p31._0);
					}
				}();
				var newLeft = function () {
					var _p32 = _p23._3;
					if (_p32.ctor === 'Nothing') {
						return currentLeft;
					} else {
						return _elm_lang$core$Maybe$Just(_p32._0);
					}
				}();
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						padding: {ctor: '_Tuple4', _0: newTop, _1: newRight, _2: newBottom, _3: newLeft}
					});
			case 'Hidden':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{hidden: true});
			case 'Opacity':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						opacity: _elm_lang$core$Maybe$Just(_p23._0)
					});
			case 'Event':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						attrs: {ctor: '::', _0: _p23._0, _1: pos.attrs}
					});
			case 'InputEvent':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						attrs: {ctor: '::', _0: _p23._0, _1: pos.attrs}
					});
			case 'Attr':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						attrs: {ctor: '::', _0: _p23._0, _1: pos.attrs}
					});
			case 'PointerEvents':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						pointerevents: _elm_lang$core$Maybe$Just(_p23._0)
					});
			case 'GridArea':
				return _elm_lang$core$Native_Utils.update(
					pos,
					{
						gridPosition: _elm_lang$core$Maybe$Just(_p23._0)
					});
			default:
				var _p33 = _mdgriffith$style_elements$Style_Internal_Render_Value$gridPosition(_p23._0);
				if (_p33.ctor === 'Nothing') {
					return _elm_lang$core$Native_Utils.update(
						pos,
						{hidden: true});
				} else {
					return _elm_lang$core$Native_Utils.update(
						pos,
						{
							gridPosition: _elm_lang$core$Maybe$Just(_p33._0)
						});
				}
		}
	});
var _mdgriffith$style_elements$Element_Internal_Render$emptyPositionable = {
	inline: false,
	horizontal: _elm_lang$core$Maybe$Nothing,
	vertical: _elm_lang$core$Maybe$Nothing,
	frame: _elm_lang$core$Maybe$Nothing,
	expand: false,
	hidden: false,
	width: _elm_lang$core$Maybe$Nothing,
	height: _elm_lang$core$Maybe$Nothing,
	positioned: {ctor: '_Tuple3', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing, _2: _elm_lang$core$Maybe$Nothing},
	margin: _elm_lang$core$Maybe$Nothing,
	padding: {ctor: '_Tuple4', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing, _2: _elm_lang$core$Maybe$Nothing, _3: _elm_lang$core$Maybe$Nothing},
	variations: {ctor: '[]'},
	opacity: _elm_lang$core$Maybe$Nothing,
	gridPosition: _elm_lang$core$Maybe$Nothing,
	pointerevents: _elm_lang$core$Maybe$Nothing,
	attrs: {ctor: '[]'},
	shrink: _elm_lang$core$Maybe$Nothing,
	overflow: _elm_lang$core$Maybe$Nothing
};
var _mdgriffith$style_elements$Element_Internal_Render$gather = function (attrs) {
	return A3(_elm_lang$core$List$foldl, _mdgriffith$style_elements$Element_Internal_Render$makePositionable, _mdgriffith$style_elements$Element_Internal_Render$emptyPositionable, attrs);
};
var _mdgriffith$style_elements$Element_Internal_Render$defaultPadding = F2(
	function (_p35, _p34) {
		var _p36 = _p35;
		var _p37 = _p34;
		return {
			ctor: '_Tuple4',
			_0: A2(_elm_lang$core$Maybe$withDefault, _p37._0, _p36._0),
			_1: A2(_elm_lang$core$Maybe$withDefault, _p37._1, _p36._1),
			_2: A2(_elm_lang$core$Maybe$withDefault, _p37._2, _p36._2),
			_3: A2(_elm_lang$core$Maybe$withDefault, _p37._3, _p36._3)
		};
	});
var _mdgriffith$style_elements$Element_Internal_Render$calcPosition = F2(
	function (frame, _p38) {
		var _p39 = _p38;
		var _p46 = _p39._1;
		var _p45 = _p39._0;
		var z = A2(_elm_lang$core$Maybe$withDefault, 0, _p39._2);
		var y = A2(_elm_lang$core$Maybe$withDefault, 0, _p46);
		var x = A2(_elm_lang$core$Maybe$withDefault, 0, _p45);
		var _p40 = frame;
		switch (_p40.ctor) {
			case 'Relative':
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'position', _1: 'relative'},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'left',
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(x),
								'px')
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'top',
								_1: A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(y),
									'px')
							},
							_1: {ctor: '[]'}
						}
					}
				};
			case 'Screen':
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'position', _1: 'fixed'},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'left',
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(x),
								'px')
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'top',
								_1: A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(y),
									'px')
							},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'z-index', _1: '1000'},
								_1: {ctor: '[]'}
							}
						}
					}
				};
			case 'Absolute':
				if (_p40._0.ctor === 'TopLeft') {
					return A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						{
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple2', _0: 'position', _1: 'absolute'}),
							_1: {
								ctor: '::',
								_0: function () {
									var _p41 = _p45;
									if (_p41.ctor === 'Just') {
										return _elm_lang$core$Maybe$Just(
											{
												ctor: '_Tuple2',
												_0: 'left',
												_1: A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$Basics$toString(_p41._0),
													'px')
											});
									} else {
										return _elm_lang$core$Maybe$Nothing;
									}
								}(),
								_1: {
									ctor: '::',
									_0: function () {
										var _p42 = _p46;
										if (_p42.ctor === 'Just') {
											return _elm_lang$core$Maybe$Just(
												{
													ctor: '_Tuple2',
													_0: 'top',
													_1: A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$Basics$toString(_p42._0),
														'px')
												});
										} else {
											return _elm_lang$core$Maybe$Nothing;
										}
									}(),
									_1: {ctor: '[]'}
								}
							}
						});
				} else {
					return A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						{
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple2', _0: 'position', _1: 'absolute'}),
							_1: {
								ctor: '::',
								_0: function () {
									var _p43 = _p45;
									if (_p43.ctor === 'Just') {
										return _elm_lang$core$Maybe$Just(
											{
												ctor: '_Tuple2',
												_0: 'left',
												_1: A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$Basics$toString(_p43._0),
													'px')
											});
									} else {
										return _elm_lang$core$Maybe$Nothing;
									}
								}(),
								_1: {
									ctor: '::',
									_0: function () {
										var _p44 = _p46;
										if (_p44.ctor === 'Just') {
											return _elm_lang$core$Maybe$Just(
												{
													ctor: '_Tuple2',
													_0: 'bottom',
													_1: A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$Basics$toString(_p44._0),
														'px')
												});
										} else {
											return _elm_lang$core$Maybe$Nothing;
										}
									}(),
									_1: {ctor: '[]'}
								}
							}
						});
				}
			default:
				switch (_p40._0.ctor) {
					case 'Within':
						return {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'position', _1: 'relative'},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'top',
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(y),
										'px')
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'left',
										_1: A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(x),
											'px')
									},
									_1: {ctor: '[]'}
								}
							}
						};
					case 'Above':
						return {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'position', _1: 'relative'},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'top',
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(y),
										'px')
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'left',
										_1: A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(x),
											'px')
									},
									_1: {ctor: '[]'}
								}
							}
						};
					case 'Below':
						return {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'position', _1: 'relative'},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'top',
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										'calc(100% + ',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(y),
											'px)'))
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'left',
										_1: A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(x),
											'px')
									},
									_1: {ctor: '[]'}
								}
							}
						};
					case 'OnLeft':
						return {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'position', _1: 'relative'},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'right',
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										'calc(100% - ',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(x),
											'px)'))
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'top',
										_1: A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(y),
											'px')
									},
									_1: {ctor: '[]'}
								}
							}
						};
					default:
						return {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'position', _1: 'relative'},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'left',
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										'calc(100% + ',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(x),
											'px)'))
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'top',
										_1: A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(y),
											'px')
									},
									_1: {ctor: '[]'}
								}
							}
						};
				}
		}
	});
var _mdgriffith$style_elements$Element_Internal_Render$spacingToMargin = function (attrs) {
	var spaceToMarg = function (a) {
		var _p47 = a;
		if (_p47.ctor === 'Spacing') {
			var _p49 = _p47._1;
			var _p48 = _p47._0;
			return _mdgriffith$style_elements$Element_Internal_Model$Margin(
				{ctor: '_Tuple4', _0: _p49, _1: _p48, _2: _p49, _3: _p48});
		} else {
			return _p47;
		}
	};
	return A2(_elm_lang$core$List$map, spaceToMarg, attrs);
};
var _mdgriffith$style_elements$Element_Internal_Render$qualifiedNormalize = 'html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin:0;padding:0;border:0}body{margin:0}.style-elements article,.style-elements aside,.style-elements footer,.style-elements header,.style-elements nav,.style-elements section{display:block}.style-elements h1{font-size:1em;margin:0}.style-elements figcaption,.style-elements figure,.style-elements main{display:block}.style-elements figure{margin:1em 40px}.style-elements hr{box-sizing:content-box;height:0;overflow:visible}.style-elements pre{font-family:monospace, monospace;font-size:1em}.style-elements a{background-color:transparent;-webkit-text-decoration-skip:objects}.style-elements abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}.style-elements b,.style-elements strong{font-weight:inherit}.style-elements b,.style-elements strong{font-weight:bolder}.style-elements code,.style-elements kbd,.style-elements samp{font-family:monospace, monospace;font-size:1em}.style-elements dfn{font-style:italic}.style-elements mark{background-color:#ff0;color:#000}.style-elements small{font-size:80%}.style-elements sub,.style-elements sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}.style-elements sub{bottom:-0.25em}.style-elements sup{top:-0.5em}.style-elements audio,.style-elements video{display:inline-block}.style-elements audio:not([controls]){display:none;height:0}.style-elements img{border-style:none}.style-elements svg:not(:root){overflow:hidden}.style-elements button,.style-elements input,.style-elements optgroup,.style-elements select,.style-elements textarea{font-family:sans-serif;font-size:100%;margin:0}.style-elements button,.style-elements input{overflow:visible}.style-elements button,.style-elements select{text-transform:none}.style-elements button,.style-elements html [type=\"button\"],.style-elements [type=\"reset\"],.style-elements [type=\"submit\"]{-webkit-appearance:button}.style-elements [type=\"button\"]::-moz-focus-inner,.style-elements [type=\"reset\"]::-moz-focus-inner,.style-elements [type=\"submit\"]::-moz-focus-inner,.style-elements button::-moz-focus-inner{border-style:none;padding:0}.style-elements [type=\"button\"]:-moz-focusring,.style-elements [type=\"reset\"]:-moz-focusring,.style-elements [type=\"submit\"]:-moz-focusring,.style-elements button:-moz-focusring{outline:1px dotted ButtonText}.style-elements fieldset{padding:0.35em 0.75em 0.625em}.style-elements legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}.style-elements progress{display:inline-block;vertical-align:baseline}.style-elements textarea{overflow:auto}.style-elements [type=\"checkbox\"],.style-elements [type=\"radio\"]{box-sizing:border-box;padding:0}.style-elements [type=\"number\"]::-webkit-inner-spin-button,.style-elements [type=\"number\"]::-webkit-outer-spin-button{height:auto}.style-elements [type=\"search\"]{-webkit-appearance:textfield;outline-offset:-2px}.style-elements [type=\"search\"]::-webkit-search-cancel-button,.style-elements [type=\"search\"]::-webkit-search-decoration{-webkit-appearance:none}.style-elements::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}.style-elements details,.style-elements menu{display:block}.style-elements summary{display:list-item}.style-elements canvas{display:inline-block}.style-elements template{display:none}.style-elements [hidden]{display:none}.style-elements em{font-style:italic}.style-elements strong{font-weight:bold}.style-elements a{text-decoration:none}.style-elements input,.style-elements textarea{border:0}.style-elements .clearfix:after{content:\"\";display:table;clear:both}.style-elements a,.style-elements abbr,.style-elements acronym,.style-elements address,.style-elements applet,.style-elements article,.style-elements aside,.style-elements audio,.style-elements b,.style-elements big,.style-elements blockquote,.style-elements canvas,.style-elements caption,.style-elements center,.style-elements cite,.style-elements code,.style-elements dd,.style-elements del,.style-elements details,.style-elements dfn,.style-elements div,.style-elements dl,.style-elements dt,.style-elements em,.style-elements embed,.style-elements fieldset,.style-elements figcaption,.style-elements figure,.style-elements footer,.style-elements form,.style-elements h1,.style-elements h2,.style-elements h3,.style-elements h4,.style-elements h5,.style-elements h6,.style-elements header,.style-elements hgroup,.style-elements hr,.style-elements i,.style-elements iframe,.style-elements img,.style-elements ins,.style-elements kbd,.style-elements label,.style-elements legend,.style-elements li,.style-elements mark,.style-elements menu,.style-elements nav,.style-elements object,.style-elements ol,.style-elements output,.style-elements p,.style-elements pre,.style-elements q,.style-elements ruby,.style-elements s,.style-elements samp,.style-elements section,.style-elements small,.style-elements span,.style-elements strike,.style-elements strong,.style-elements sub,.style-elements summary,.style-elements sup,.style-elements table,.style-elements tbody,.style-elements td,.style-elements tfoot,.style-elements th,.style-elements thead,.style-elements time,.style-elements tr,.style-elements tt,.style-elements u,.style-elements ul,.style-elements var,.style-elements video{margin:0;padding:0;border:0;font-size:100%;font:inherit;box-sizing:border-box}.style-elements{margin:0;padding:0;border:0;font-size:100%;font:inherit;line-height:1}';
var _mdgriffith$style_elements$Element_Internal_Render$normalizeFull = function (_p50) {
	return A2(_elm_lang$core$Basics_ops['++'], 'html,body{width:100%;height:100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;}', _mdgriffith$style_elements$Element_Internal_Render$qualifiedNormalize);
};
var _mdgriffith$style_elements$Element_Internal_Render$embed = F2(
	function (full, stylesheet) {
		return A3(
			_elm_lang$html$Html$node,
			'style',
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(
					full ? A2(
						_elm_lang$core$Basics_ops['++'],
						_mdgriffith$style_elements$Element_Internal_Render$normalizeFull(
							{ctor: '_Tuple0'}),
						stylesheet.css) : A2(_elm_lang$core$Basics_ops['++'], _mdgriffith$style_elements$Element_Internal_Render$qualifiedNormalize, stylesheet.css)),
				_1: {ctor: '[]'}
			});
	});
var _mdgriffith$style_elements$Element_Internal_Render$normalize = 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video,hr{margin:0;padding:0;border:0;font-size:100%;font:inherit}html{line-height:1;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:0.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace, monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,html [type=\"button\"],[type=\"reset\"],[type=\"submit\"]{-webkit-appearance:button}button::-moz-focus-inner,[type=\"button\"]::-moz-focus-inner,[type=\"reset\"]::-moz-focus-inner,[type=\"submit\"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=\"button\"]:-moz-focusring,[type=\"reset\"]:-moz-focusring,[type=\"submit\"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=\"checkbox\"],[type=\"radio\"]{box-sizing:border-box;padding:0}[type=\"number\"]::-webkit-inner-spin-button,[type=\"number\"]::-webkit-outer-spin-button{height:auto}[type=\"search\"]{-webkit-appearance:textfield;outline-offset:-2px}[type=\"search\"]::-webkit-search-cancel-button,[type=\"search\"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}em{font-style:italic}strong{font-weight:bold}a{text-decoration:none}input,textarea{border:0}.clearfix:after{content:\"\";display:table;clear:both}';
var _mdgriffith$style_elements$Element_Internal_Render$Parent = F3(
	function (a, b, c) {
		return {parentSpecifiedSpacing: a, layout: b, parentPadding: c};
	});
var _mdgriffith$style_elements$Element_Internal_Render$Positionable = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return function (r) {
																		return {inline: a, horizontal: b, vertical: c, frame: d, expand: e, hidden: f, width: g, height: h, positioned: i, margin: j, padding: k, variations: l, opacity: m, gridPosition: n, pointerevents: o, attrs: p, shrink: q, overflow: r};
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
						};
					};
				};
			};
		};
	};
};
var _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast = {ctor: 'FirstAndLast'};
var _mdgriffith$style_elements$Element_Internal_Render$Last = {ctor: 'Last'};
var _mdgriffith$style_elements$Element_Internal_Render$Middle = function (a) {
	return {ctor: 'Middle', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Render$First = {ctor: 'First'};
var _mdgriffith$style_elements$Element_Internal_Render$detectOrder = F2(
	function (list, i) {
		var len = _elm_lang$core$List$length(list);
		return (_elm_lang$core$Native_Utils.eq(i, 0) && _elm_lang$core$Native_Utils.eq(len, 1)) ? _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast : (_elm_lang$core$Native_Utils.eq(i, 0) ? _mdgriffith$style_elements$Element_Internal_Render$First : (_elm_lang$core$Native_Utils.eq(i, len - 1) ? _mdgriffith$style_elements$Element_Internal_Render$Last : _mdgriffith$style_elements$Element_Internal_Render$Middle(i)));
	});
var _mdgriffith$style_elements$Element_Internal_Render$LayoutElement = function (a) {
	return {ctor: 'LayoutElement', _0: a};
};
var _mdgriffith$style_elements$Element_Internal_Render$Single = {ctor: 'Single'};
var _mdgriffith$style_elements$Element_Internal_Render$renderAttributes = F6(
	function (elType, order, maybeElemID, parent, stylesheet, elem) {
		var attributes = function () {
			var _p51 = maybeElemID;
			if (_p51.ctor === 'Nothing') {
				return elem.attrs;
			} else {
				var _p52 = _p51._0;
				return (_elm_lang$core$Native_Utils.cmp(
					_elm_lang$core$List$length(elem.variations),
					0) > 0) ? {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$classList(
						A2(stylesheet.variations, _p52, elem.variations)),
					_1: elem.attrs
				} : {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class(
						stylesheet.style(_p52)),
					_1: elem.attrs
				};
			}
		}();
		var defaults = {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'box-sizing', _1: 'border-box'},
			_1: {ctor: '[]'}
		};
		var adjustspacing = function (_p53) {
			var _p54 = _p53;
			var _p63 = _p54._0;
			var _p62 = _p54._1;
			var _p61 = _p54._3;
			var _p60 = _p54._2;
			var onScreen = function () {
				var _p55 = elem.frame;
				if ((_p55.ctor === 'Just') && (_p55._0.ctor === 'Screen')) {
					return true;
				} else {
					return false;
				}
			}();
			var halved = {ctor: '_Tuple4', _0: _p63 / 2, _1: _p62 / 2, _2: _p60 / 2, _3: _p61 / 2};
			if (onScreen) {
				return {ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0};
			} else {
				var _p56 = parent;
				if (_p56.ctor === 'Nothing') {
					return {ctor: '_Tuple4', _0: _p63, _1: _p62, _2: _p60, _3: _p61};
				} else {
					var _p57 = _p56._0.layout;
					if (_p57.ctor === 'TextLayout') {
						var _p58 = elem.horizontal;
						if (_p58.ctor === 'Nothing') {
							return (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$Last) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0} : (elem.inline ? {ctor: '_Tuple4', _0: 0, _1: _p62, _2: 0, _3: 0} : {ctor: '_Tuple4', _0: 0, _1: 0, _2: _p60, _3: 0});
						} else {
							if ((!elem.inline) && _elm_lang$core$Native_Utils.eq(elem.frame, _elm_lang$core$Maybe$Nothing)) {
								var _p59 = _p58._0;
								switch (_p59.ctor) {
									case 'Left':
										return _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$First) ? {ctor: '_Tuple4', _0: 0, _1: _p62, _2: _p60, _3: 0} : (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast) ? {ctor: '_Tuple4', _0: 0, _1: _p62, _2: 0, _3: 0} : (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$Last) ? {ctor: '_Tuple4', _0: 0, _1: _p62, _2: 0, _3: 0} : {ctor: '_Tuple4', _0: 0, _1: _p62, _2: _p60, _3: 0}));
									case 'Right':
										return _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$First) ? {ctor: '_Tuple4', _0: 0, _1: 0, _2: _p60, _3: _p61} : (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast) ? {ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: _p61} : (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$Last) ? {ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: _p61} : {ctor: '_Tuple4', _0: 0, _1: 0, _2: _p60, _3: _p61}));
									default:
										return (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$Last) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0} : {ctor: '_Tuple4', _0: 0, _1: 0, _2: _p60, _3: 0};
								}
							} else {
								return {ctor: '_Tuple4', _0: _p63, _1: _p62, _2: _p60, _3: _p61};
							}
						}
					} else {
						return halved;
					}
				}
			}
		};
		var spacing = function (attrs) {
			var _p64 = elem.margin;
			if (_p64.ctor === 'Nothing') {
				return attrs;
			} else {
				return {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'margin',
						_1: _mdgriffith$style_elements$Style_Internal_Render_Value$box(
							adjustspacing(_p64._0))
					},
					_1: attrs
				};
			}
		};
		var gridPos = function (attrs) {
			var _p65 = elem.gridPosition;
			if (_p65.ctor === 'Nothing') {
				return attrs;
			} else {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'grid-area', _1: _p65._0},
					_1: attrs
				};
			}
		};
		var padding = function (attrs) {
			var paddings = _mdgriffith$style_elements$Element_Internal_Render$renderPadding(elem.padding);
			return (_elm_lang$core$Native_Utils.cmp(
				_elm_lang$core$List$length(paddings),
				0) > 0) ? A2(_elm_lang$core$Basics_ops['++'], paddings, attrs) : attrs;
		};
		var opacity = function (attrs) {
			var _p66 = elem.opacity;
			if (_p66.ctor === 'Nothing') {
				return attrs;
			} else {
				return {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'opacity',
						_1: _elm_lang$core$Basics$toString(_p66._0)
					},
					_1: attrs
				};
			}
		};
		var height = function (attrs) {
			var _p67 = elem.height;
			if (_p67.ctor === 'Nothing') {
				return attrs;
			} else {
				var _p72 = _p67._0;
				var _p68 = parent;
				if (_p68.ctor === 'Just') {
					var hundredPercentOrFill = function (x) {
						var _p69 = x;
						switch (_p69.ctor) {
							case 'Percent':
								return _elm_lang$core$Native_Utils.eq(_p69._0, 100);
							case 'Fill':
								return true;
							case 'Calc':
								return _elm_lang$core$Native_Utils.eq(_p69._0, 100);
							default:
								return false;
						}
					};
					var _p70 = A2(
						_elm_lang$core$Maybe$withDefault,
						{ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0},
						_p68._0.parentSpecifiedSpacing);
					var topPad = _p70._0;
					var bottomPad = _p70._2;
					var paddingAdjustment = (topPad + bottomPad) / 2;
					var _p71 = _p68._0.layout;
					if (_p71.ctor === 'FlexLayout') {
						switch (_p71._0.ctor) {
							case 'Down':
								return {
									ctor: '::',
									_0: _mdgriffith$style_elements$Style_Internal_Render_Property$flexHeight(_p72),
									_1: attrs
								};
							case 'Up':
								return {
									ctor: '::',
									_0: _mdgriffith$style_elements$Style_Internal_Render_Property$flexHeight(_p72),
									_1: attrs
								};
							case 'GoRight':
								return hundredPercentOrFill(_p72) ? {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'height', _1: 'auto'},
									_1: attrs
								} : {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'height',
										_1: A2(_mdgriffith$style_elements$Style_Internal_Render_Value$parentAdjustedLength, _p72, paddingAdjustment)
									},
									_1: attrs
								};
							default:
								return hundredPercentOrFill(_p72) ? {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'height', _1: 'auto'},
									_1: attrs
								} : {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'height',
										_1: A2(_mdgriffith$style_elements$Style_Internal_Render_Value$parentAdjustedLength, _p72, paddingAdjustment)
									},
									_1: attrs
								};
						}
					} else {
						return {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'height',
								_1: A2(_mdgriffith$style_elements$Style_Internal_Render_Value$parentAdjustedLength, _p72, paddingAdjustment)
							},
							_1: attrs
						};
					}
				} else {
					return {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'height',
							_1: _mdgriffith$style_elements$Style_Internal_Render_Value$length(_p72)
						},
						_1: attrs
					};
				}
			}
		};
		var width = function (attrs) {
			var _p73 = elem.width;
			if (_p73.ctor === 'Nothing') {
				return attrs;
			} else {
				var _p77 = _p73._0;
				var _p74 = parent;
				if (_p74.ctor === 'Just') {
					var _p75 = A2(
						_elm_lang$core$Maybe$withDefault,
						{ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0},
						_p74._0.parentSpecifiedSpacing);
					var rightPad = _p75._1;
					var leftPad = _p75._3;
					var paddingAdjustment = (rightPad + leftPad) / 2;
					var _p76 = _p74._0.layout;
					_v52_2:
					do {
						if (_p76.ctor === 'FlexLayout') {
							switch (_p76._0.ctor) {
								case 'GoRight':
									return {
										ctor: '::',
										_0: A2(_mdgriffith$style_elements$Style_Internal_Render_Property$flexWidth, _p77, paddingAdjustment),
										_1: attrs
									};
								case 'GoLeft':
									return {
										ctor: '::',
										_0: A2(_mdgriffith$style_elements$Style_Internal_Render_Property$flexWidth, _p77, paddingAdjustment),
										_1: attrs
									};
								default:
									break _v52_2;
							}
						} else {
							break _v52_2;
						}
					} while(false);
					return {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'width',
							_1: A2(_mdgriffith$style_elements$Style_Internal_Render_Value$parentAdjustedLength, _p77, paddingAdjustment)
						},
						_1: attrs
					};
				} else {
					return {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'width',
							_1: _mdgriffith$style_elements$Style_Internal_Render_Value$length(_p77)
						},
						_1: attrs
					};
				}
			}
		};
		var shrink = function (attrs) {
			var _p78 = elem.shrink;
			if (_p78.ctor === 'Just') {
				return {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'flex-shrink',
						_1: _elm_lang$core$Basics$toString(_p78._0)
					},
					_1: attrs
				};
			} else {
				var _p79 = parent;
				if (_p79.ctor === 'Nothing') {
					return attrs;
				} else {
					var horizontalOverflow = function () {
						var _p80 = elem.overflow;
						if (_p80.ctor === 'Just') {
							switch (_p80._0.ctor) {
								case 'XAxis':
									return true;
								case 'YAxis':
									return false;
								default:
									return true;
							}
						} else {
							return false;
						}
					}();
					var verticalOverflow = function () {
						var _p81 = elem.overflow;
						if (_p81.ctor === 'Just') {
							switch (_p81._0.ctor) {
								case 'XAxis':
									return false;
								case 'YAxis':
									return true;
								default:
									return true;
							}
						} else {
							return false;
						}
					}();
					var isVertical = function (dir) {
						var _p82 = dir;
						switch (_p82.ctor) {
							case 'Up':
								return true;
							case 'Down':
								return true;
							default:
								return false;
						}
					};
					var isHorizontal = function (dir) {
						var _p83 = dir;
						switch (_p83.ctor) {
							case 'GoRight':
								return true;
							case 'GoLeft':
								return true;
							default:
								return false;
						}
					};
					var isPx = function (x) {
						var _p84 = x;
						if ((_p84.ctor === 'Just') && (_p84._0.ctor === 'Px')) {
							return true;
						} else {
							return false;
						}
					};
					var isPercent = function (x) {
						var _p85 = x;
						if ((_p85.ctor === 'Just') && (_p85._0.ctor === 'Percent')) {
							return true;
						} else {
							return false;
						}
					};
					var _p86 = _p79._0.layout;
					if (_p86.ctor === 'FlexLayout') {
						var _p88 = _p86._0;
						if (isHorizontal(_p88) && isPx(elem.width)) {
							return {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '0'},
								_1: attrs
							};
						} else {
							if (isHorizontal(_p88) && isPercent(elem.width)) {
								return {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '0'},
									_1: attrs
								};
							} else {
								if (isHorizontal(_p88) && (!_elm_lang$core$Native_Utils.eq(elem.width, _elm_lang$core$Maybe$Nothing))) {
									return {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '1'},
										_1: attrs
									};
								} else {
									if (isHorizontal(_p88) && horizontalOverflow) {
										return {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '1'},
											_1: attrs
										};
									} else {
										if (isVertical(_p88) && isPx(elem.height)) {
											return {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '0'},
												_1: attrs
											};
										} else {
											if (isVertical(_p88) && isPercent(elem.height)) {
												return {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '0'},
													_1: attrs
												};
											} else {
												if (isVertical(_p88) && (!_elm_lang$core$Native_Utils.eq(elem.height, _elm_lang$core$Maybe$Nothing))) {
													return {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '1'},
														_1: attrs
													};
												} else {
													if (isVertical(_p88) && verticalOverflow) {
														return {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '1'},
															_1: attrs
														};
													} else {
														if (isHorizontal(_p88) && _elm_lang$core$Native_Utils.eq(elem.width, _elm_lang$core$Maybe$Nothing)) {
															return {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '1'},
																_1: attrs
															};
														} else {
															if (isVertical(_p88) && _elm_lang$core$Native_Utils.eq(elem.height, _elm_lang$core$Maybe$Nothing)) {
																var _p87 = elType;
																if (_p87.ctor === 'Single') {
																	return {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '1'},
																		_1: attrs
																	};
																} else {
																	return {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '0'},
																		_1: attrs
																	};
																}
															} else {
																return {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: 'flex-shrink', _1: '0'},
																	_1: attrs
																};
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					} else {
						return attrs;
					}
				}
			}
		};
		var overflow = function (attrs) {
			var _p89 = elem.overflow;
			if (_p89.ctor === 'Nothing') {
				return attrs;
			} else {
				var _p90 = _p89._0;
				switch (_p90.ctor) {
					case 'XAxis':
						return {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'overflow-x', _1: 'auto'},
							_1: attrs
						};
					case 'YAxis':
						return {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'overflow-y', _1: 'auto'},
							_1: attrs
						};
					default:
						return {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'overflow', _1: 'auto'},
							_1: attrs
						};
				}
			}
		};
		var horizontal = function (attrs) {
			var _p91 = elem.horizontal;
			if (_p91.ctor === 'Nothing') {
				return attrs;
			} else {
				var _p98 = _p91._0;
				if (elem.inline && _elm_lang$core$Native_Utils.eq(elType, _mdgriffith$style_elements$Element_Internal_Render$Single)) {
					var _p92 = _p98;
					switch (_p92.ctor) {
						case 'Left':
							return {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'z-index', _1: '1'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'float', _1: 'left'},
									_1: attrs
								}
							};
						case 'Right':
							return {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'z-index', _1: '1'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'float', _1: 'right'},
									_1: attrs
								}
							};
						case 'Center':
							return attrs;
						default:
							return attrs;
					}
				} else {
					if (elem.inline) {
						return attrs;
					} else {
						if (!_elm_lang$core$Native_Utils.eq(elem.frame, _elm_lang$core$Maybe$Nothing)) {
							var _p93 = _p98;
							switch (_p93.ctor) {
								case 'Left':
									return {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'left', _1: '0'},
										_1: attrs
									};
								case 'Right':
									return {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'right', _1: '0'},
										_1: attrs
									};
								case 'Center':
									return attrs;
								default:
									return attrs;
							}
						} else {
							var _p94 = parent;
							if (_p94.ctor === 'Nothing') {
								return attrs;
							} else {
								var _p95 = _p94._0.layout;
								switch (_p95.ctor) {
									case 'TextLayout':
										var _p96 = _p98;
										switch (_p96.ctor) {
											case 'Left':
												return {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'z-index', _1: '1'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'float', _1: 'left'},
														_1: attrs
													}
												};
											case 'Right':
												return {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'z-index', _1: '1'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'float', _1: 'right'},
														_1: attrs
													}
												};
											case 'Center':
												return attrs;
											default:
												return attrs;
										}
									case 'FlexLayout':
										var _p97 = A2(_mdgriffith$style_elements$Element_Internal_Render$flexboxHorizontalIndividualAlignment, _p95._0, _p98);
										if (_p97.ctor === 'Nothing') {
											return attrs;
										} else {
											return {ctor: '::', _0: _p97._0, _1: attrs};
										}
									default:
										return attrs;
								}
							}
						}
					}
				}
			}
		};
		var vertical = function (attrs) {
			var _p99 = elem.vertical;
			if (_p99.ctor === 'Nothing') {
				return attrs;
			} else {
				var _p104 = _p99._0;
				if (elem.inline && _elm_lang$core$Native_Utils.eq(elType, _mdgriffith$style_elements$Element_Internal_Render$Single)) {
					return attrs;
				} else {
					if (elem.inline) {
						return attrs;
					} else {
						if (!_elm_lang$core$Native_Utils.eq(elem.frame, _elm_lang$core$Maybe$Nothing)) {
							var _p100 = _p104;
							switch (_p100.ctor) {
								case 'Top':
									return {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'top', _1: '0'},
										_1: attrs
									};
								case 'Bottom':
									return {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'bottom', _1: '0'},
										_1: attrs
									};
								default:
									return attrs;
							}
						} else {
							var _p101 = parent;
							if (_p101.ctor === 'Nothing') {
								return attrs;
							} else {
								var _p102 = _p101._0.layout;
								if (_p102.ctor === 'FlexLayout') {
									var _p103 = A2(_mdgriffith$style_elements$Element_Internal_Render$flexboxVerticalIndividualAlignment, _p102._0, _p104);
									if (_p103.ctor === 'Nothing') {
										return attrs;
									} else {
										return {ctor: '::', _0: _p103._0, _1: attrs};
									}
								} else {
									return attrs;
								}
							}
						}
					}
				}
			}
		};
		var passthrough = function (attrs) {
			var _p105 = elem.pointerevents;
			if (_p105.ctor === 'Nothing') {
				return attrs;
			} else {
				if (_p105._0 === false) {
					return {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'pointer-events', _1: 'none'},
						_1: attrs
					};
				} else {
					return {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'pointer-events', _1: 'auto'},
						_1: attrs
					};
				}
			}
		};
		var position = function (attrs) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_mdgriffith$style_elements$Element_Internal_Render$calcPosition,
					A2(_elm_lang$core$Maybe$withDefault, _mdgriffith$style_elements$Element_Internal_Model$Relative, elem.frame),
					elem.positioned),
				attrs);
		};
		var layout = function (attrs) {
			var _p106 = elType;
			if (_p106.ctor === 'Single') {
				return elem.inline ? {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'display', _1: 'inline'},
					_1: attrs
				} : {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'display', _1: 'block'},
					_1: attrs
				};
			} else {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_mdgriffith$style_elements$Style_Internal_Render_Property$layout,
						elem.inline,
						A3(_mdgriffith$style_elements$Element_Internal_Render$alignLayout, elem.horizontal, elem.vertical, _p106._0)),
					attrs);
			}
		};
		if (elem.hidden) {
			return {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'display', _1: 'none'},
						_1: {ctor: '[]'}
					}),
				_1: attributes
			};
		} else {
			if (elem.expand) {
				var expandedProps = function () {
					var _p107 = parent;
					if (_p107.ctor === 'Nothing') {
						return {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'width', _1: '100%'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'height', _1: '100%'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'margin', _1: '0'},
									_1: {ctor: '[]'}
								}
							}
						};
					} else {
						var _p114 = _p107._0.parentPadding;
						var _p108 = _p107._0.layout;
						switch (_p108.ctor) {
							case 'TextLayout':
								var borders = _elm_lang$core$List$concat(
									{
										ctor: '::',
										_0: _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$Last) ? {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'border-top-right-radius', _1: '0'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'border-top-left-radius', _1: '0'},
												_1: {ctor: '[]'}
											}
										} : (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$First) ? {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'border-bottom-right-radius', _1: '0'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'border-bottom-left-radius', _1: '0'},
												_1: {ctor: '[]'}
											}
										} : (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast) ? {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'border-top-right-radius', _1: '0'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'border-top-left-radius', _1: '0'},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'border-bottom-right-radius', _1: '0'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'border-bottom-left-radius', _1: '0'},
														_1: {ctor: '[]'}
													}
												}
											}
										} : {ctor: '[]'})),
										_1: {ctor: '[]'}
									});
								var _p109 = _p114;
								var top = _p109._0;
								var right = _p109._1;
								var bottom = _p109._2;
								var left = _p109._3;
								return A2(
									_elm_lang$core$Basics_ops['++'],
									{
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'width',
											_1: A2(
												_elm_lang$core$Basics_ops['++'],
												'calc(100% + ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$Basics$toString(right + left),
													'px'))
										},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'margin', _1: '0'},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'margin-left',
													_1: A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$Basics$toString(-1 * left),
														'px')
												},
												_1: {
													ctor: '::',
													_0: (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$First) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {
														ctor: '_Tuple2',
														_0: 'margin-top',
														_1: A2(
															_elm_lang$core$Basics_ops['++'],
															_elm_lang$core$Basics$toString(-1 * top),
															'px')
													} : {ctor: '_Tuple2', _0: 'margin-top', _1: '0'},
													_1: {
														ctor: '::',
														_0: (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$Last) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {
															ctor: '_Tuple2',
															_0: 'margin-bottom',
															_1: A2(
																_elm_lang$core$Basics_ops['++'],
																_elm_lang$core$Basics$toString(-1 * bottom),
																'px')
														} : {ctor: '_Tuple2', _0: 'margin-bottom', _1: '0'},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'padding',
																_1: _mdgriffith$style_elements$Style_Internal_Render_Value$box(
																	A2(_mdgriffith$style_elements$Element_Internal_Render$defaultPadding, elem.padding, _p114))
															},
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									},
									borders);
							case 'FlexLayout':
								var _p110 = function () {
									var _p111 = _p107._0.parentSpecifiedSpacing;
									if (_p111.ctor === 'Nothing') {
										return {ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0};
									} else {
										return _p111._0;
									}
								}();
								var parentSpaceTop = _p110._0;
								var parentSpaceRight = _p110._1;
								var parentSpaceBottom = _p110._2;
								var parentSpaceLeft = _p110._3;
								var _p112 = _p114;
								var top = _p112._0;
								var right = _p112._1;
								var bottom = _p112._2;
								var left = _p112._3;
								var _p113 = _p108._0;
								switch (_p113.ctor) {
									case 'GoRight':
										return width(
											{
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'height',
													_1: A2(
														_elm_lang$core$Basics_ops['++'],
														'calc(100% + ',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_elm_lang$core$Basics$toString((top + bottom) - ((parentSpaceTop + parentSpaceBottom) / 2)),
															'px'))
												},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'margin', _1: '0'},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'margin-top',
															_1: A2(
																_elm_lang$core$Basics_ops['++'],
																_elm_lang$core$Basics$toString((-1 * top) + (parentSpaceTop / 2)),
																'px')
														},
														_1: {
															ctor: '::',
															_0: (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$First) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {
																ctor: '_Tuple2',
																_0: 'margin-left',
																_1: A2(
																	_elm_lang$core$Basics_ops['++'],
																	_elm_lang$core$Basics$toString(-1 * left),
																	'px')
															} : {
																ctor: '_Tuple2',
																_0: 'margin-left',
																_1: A2(
																	_elm_lang$core$Basics_ops['++'],
																	_elm_lang$core$Basics$toString(parentSpaceLeft / 2),
																	'px')
															},
															_1: {
																ctor: '::',
																_0: (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$Last) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {
																	ctor: '_Tuple2',
																	_0: 'margin-right',
																	_1: A2(
																		_elm_lang$core$Basics_ops['++'],
																		_elm_lang$core$Basics$toString(-1 * right),
																		'px')
																} : {
																	ctor: '_Tuple2',
																	_0: 'margin-right',
																	_1: A2(
																		_elm_lang$core$Basics_ops['++'],
																		_elm_lang$core$Basics$toString(parentSpaceRight / 2),
																		'px')
																},
																_1: {ctor: '[]'}
															}
														}
													}
												}
											});
									case 'GoLeft':
										return width(
											{
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'height',
													_1: A2(
														_elm_lang$core$Basics_ops['++'],
														'calc(100% + ',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_elm_lang$core$Basics$toString((top + bottom) - ((parentSpaceTop + parentSpaceBottom) / 2)),
															'px'))
												},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'margin', _1: '0'},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'margin-top',
															_1: A2(
																_elm_lang$core$Basics_ops['++'],
																_elm_lang$core$Basics$toString((-1 * top) + (parentSpaceTop / 2)),
																'px')
														},
														_1: {
															ctor: '::',
															_0: (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$First) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {
																ctor: '_Tuple2',
																_0: 'margin-right',
																_1: A2(
																	_elm_lang$core$Basics_ops['++'],
																	_elm_lang$core$Basics$toString(-1 * right),
																	'px')
															} : {
																ctor: '_Tuple2',
																_0: 'margin-right',
																_1: A2(
																	_elm_lang$core$Basics_ops['++'],
																	_elm_lang$core$Basics$toString(parentSpaceRight / 2),
																	'px')
															},
															_1: {
																ctor: '::',
																_0: (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$Last) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {
																	ctor: '_Tuple2',
																	_0: 'margin-left',
																	_1: A2(
																		_elm_lang$core$Basics_ops['++'],
																		_elm_lang$core$Basics$toString(-1 * left),
																		'px')
																} : {
																	ctor: '_Tuple2',
																	_0: 'margin-left',
																	_1: A2(
																		_elm_lang$core$Basics_ops['++'],
																		_elm_lang$core$Basics$toString(parentSpaceLeft / 2),
																		'px')
																},
																_1: {ctor: '[]'}
															}
														}
													}
												}
											});
									case 'Up':
										return height(
											{
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'width',
													_1: A2(
														_elm_lang$core$Basics_ops['++'],
														'calc(100% + ',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_elm_lang$core$Basics$toString((left + right) - ((parentSpaceLeft + parentSpaceRight) / 2)),
															'px'))
												},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'margin', _1: '0'},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'margin-left',
															_1: A2(
																_elm_lang$core$Basics_ops['++'],
																_elm_lang$core$Basics$toString((-1 * left) + (parentSpaceLeft / 2)),
																'px')
														},
														_1: {
															ctor: '::',
															_0: (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$First) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {
																ctor: '_Tuple2',
																_0: 'margin-bottom',
																_1: A2(
																	_elm_lang$core$Basics_ops['++'],
																	_elm_lang$core$Basics$toString(-1 * top),
																	'px')
															} : {
																ctor: '_Tuple2',
																_0: 'margin-bottom',
																_1: A2(
																	_elm_lang$core$Basics_ops['++'],
																	_elm_lang$core$Basics$toString(parentSpaceBottom / 2),
																	'px')
															},
															_1: {
																ctor: '::',
																_0: (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$Last) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {
																	ctor: '_Tuple2',
																	_0: 'margin-top',
																	_1: A2(
																		_elm_lang$core$Basics_ops['++'],
																		_elm_lang$core$Basics$toString(-1 * bottom),
																		'px')
																} : {
																	ctor: '_Tuple2',
																	_0: 'margin-top',
																	_1: A2(
																		_elm_lang$core$Basics_ops['++'],
																		_elm_lang$core$Basics$toString(parentSpaceTop / 2),
																		'px')
																},
																_1: {ctor: '[]'}
															}
														}
													}
												}
											});
									default:
										return height(
											{
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'width',
													_1: A2(
														_elm_lang$core$Basics_ops['++'],
														'calc(100% + ',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_elm_lang$core$Basics$toString((left + right) - ((parentSpaceLeft + parentSpaceRight) / 2)),
															'px'))
												},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'margin', _1: '0'},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'margin-left',
															_1: A2(
																_elm_lang$core$Basics_ops['++'],
																_elm_lang$core$Basics$toString((-1 * left) + (parentSpaceLeft / 2)),
																'px')
														},
														_1: {
															ctor: '::',
															_0: (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$First) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {
																ctor: '_Tuple2',
																_0: 'margin-top',
																_1: A2(
																	_elm_lang$core$Basics_ops['++'],
																	_elm_lang$core$Basics$toString(-1 * top),
																	'px')
															} : {
																ctor: '_Tuple2',
																_0: 'margin-top',
																_1: A2(
																	_elm_lang$core$Basics_ops['++'],
																	_elm_lang$core$Basics$toString(parentSpaceTop / 2),
																	'px')
															},
															_1: {
																ctor: '::',
																_0: (_elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$Last) || _elm_lang$core$Native_Utils.eq(order, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast)) ? {
																	ctor: '_Tuple2',
																	_0: 'margin-bottom',
																	_1: A2(
																		_elm_lang$core$Basics_ops['++'],
																		_elm_lang$core$Basics$toString(-1 * bottom),
																		'px')
																} : {
																	ctor: '_Tuple2',
																	_0: 'margin-bottom',
																	_1: A2(
																		_elm_lang$core$Basics_ops['++'],
																		_elm_lang$core$Basics$toString(parentSpaceBottom / 2),
																		'px')
																},
																_1: {ctor: '[]'}
															}
														}
													}
												}
											});
								}
							default:
								return {ctor: '[]'};
						}
					}
				}();
				return {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$style(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'box-sizing', _1: 'border-box'},
							_1: function (_p115) {
								return passthrough(
									gridPos(
										layout(
											spacing(
												opacity(
													shrink(
														padding(
															position(
																overflow(_p115)))))))));
							}(expandedProps)
						}),
					_1: attributes
				};
			} else {
				return {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$style(
						function (_p116) {
							return passthrough(
								gridPos(
									layout(
										spacing(
											opacity(
												shrink(
													width(
														height(
															padding(
																horizontal(
																	vertical(
																		position(
																			overflow(_p116)))))))))))));
						}(defaults)),
					_1: attributes
				};
			}
		}
	});
var _mdgriffith$style_elements$Element_Internal_Render$renderElement = F4(
	function (parent, stylesheet, order, elm) {
		var _p117 = elm;
		switch (_p117.ctor) {
			case 'Empty':
				return _elm_lang$html$Html$text('');
			case 'Raw':
				return _p117._0;
			case 'Spacer':
				var _p121 = _p117._0;
				var forSpacing = function (posAttr) {
					var _p118 = posAttr;
					if (_p118.ctor === 'Spacing') {
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: _p118._0, _1: _p118._1});
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				};
				var _p119 = function () {
					var _p120 = parent;
					if (_p120.ctor === 'Just') {
						return A2(
							_elm_lang$core$Maybe$withDefault,
							{ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0},
							_p120._0.parentSpecifiedSpacing);
					} else {
						return {ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0};
					}
				}();
				var spacingX = _p119._0;
				var spacingY = _p119._1;
				var inline = {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'width',
						_1: A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p121 * spacingX),
							'px')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'height',
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p121 * spacingY),
								'px')
						},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'visibility', _1: 'hidden'},
							_1: {ctor: '[]'}
						}
					}
				};
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$style(inline),
						_1: {ctor: '[]'}
					},
					{ctor: '[]'});
			case 'Text':
				var _p123 = _p117._1;
				var _p122 = _p117._0;
				switch (_p122.ctor) {
					case 'NoDecoration':
						return _elm_lang$html$Html$text(_p123);
					case 'Bold':
						return A2(
							_elm_lang$html$Html$strong,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(_p123),
								_1: {ctor: '[]'}
							});
					case 'Italic':
						return A2(
							_elm_lang$html$Html$em,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(_p123),
								_1: {ctor: '[]'}
							});
					case 'Underline':
						return A2(
							_elm_lang$html$Html$u,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(_p123),
								_1: {ctor: '[]'}
							});
					case 'Strike':
						return A2(
							_elm_lang$html$Html$s,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(_p123),
								_1: {ctor: '[]'}
							});
					case 'Super':
						return A2(
							_elm_lang$html$Html$sup,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(_p123),
								_1: {ctor: '[]'}
							});
					default:
						return A2(
							_elm_lang$html$Html$sub,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(_p123),
								_1: {ctor: '[]'}
							});
				}
			case 'Element':
				var _p134 = _p117._0.child;
				var _p133 = _p117._0.attrs;
				var parentTextLayout = function (layout) {
					var _p124 = layout;
					if (_p124.ctor === 'TextLayout') {
						return true;
					} else {
						return false;
					}
				};
				var attributes = function () {
					var _p125 = parent;
					if (_p125.ctor === 'Nothing') {
						return _mdgriffith$style_elements$Element_Internal_Render$spacingToMargin(_p133);
					} else {
						var _p131 = _p125._0;
						var _p126 = _p131.parentSpecifiedSpacing;
						if (_p126.ctor === 'Nothing') {
							return (parentTextLayout(_p131.layout) || A2(
								_elm_lang$core$List$any,
								F2(
									function (x, y) {
										return _elm_lang$core$Native_Utils.eq(x, y);
									})(_mdgriffith$style_elements$Element_Internal_Model$Inline),
								_p133)) ? _mdgriffith$style_elements$Element_Internal_Render$spacingToMargin(_p133) : _p133;
						} else {
							var _p130 = _p126._0._0;
							var _p129 = _p126._0._1;
							var _p128 = _p126._0._3;
							var _p127 = _p126._0._2;
							return (parentTextLayout(_p131.layout) || A2(
								_elm_lang$core$List$any,
								F2(
									function (x, y) {
										return _elm_lang$core$Native_Utils.eq(x, y);
									})(_mdgriffith$style_elements$Element_Internal_Model$Inline),
								_p133)) ? {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$Margin(
									{ctor: '_Tuple4', _0: _p130, _1: _p129, _2: _p127, _3: _p128}),
								_1: _mdgriffith$style_elements$Element_Internal_Render$spacingToMargin(_p133)
							} : {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$Margin(
									{ctor: '_Tuple4', _0: _p130, _1: _p129, _2: _p127, _3: _p128}),
								_1: _p133
							};
						}
					}
				}();
				var htmlAttrs = A6(
					_mdgriffith$style_elements$Element_Internal_Render$renderAttributes,
					_mdgriffith$style_elements$Element_Internal_Render$Single,
					order,
					_p117._0.style,
					parent,
					stylesheet,
					_mdgriffith$style_elements$Element_Internal_Render$gather(attributes));
				var childHtml = function () {
					var _p132 = _p117._0.absolutelyPositioned;
					if (_p132.ctor === 'Nothing') {
						return {
							ctor: '::',
							_0: A4(_mdgriffith$style_elements$Element_Internal_Render$renderElement, _elm_lang$core$Maybe$Nothing, stylesheet, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast, _p134),
							_1: {ctor: '[]'}
						};
					} else {
						return A2(
							_elm_lang$core$List$map,
							A3(_mdgriffith$style_elements$Element_Internal_Render$renderElement, _elm_lang$core$Maybe$Nothing, stylesheet, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast),
							{ctor: '::', _0: _p134, _1: _p132._0});
					}
				}();
				return A3(_elm_lang$html$Html$node, _p117._0.node, htmlAttrs, childHtml);
			default:
				var _p156 = _p117._0.node;
				var _p155 = _p117._0.layout;
				var _p154 = _p117._0.attrs;
				var isFlexbox = function (layout) {
					var _p135 = layout;
					if (_p135.ctor === 'FlexLayout') {
						return true;
					} else {
						return false;
					}
				};
				var adjacentFlexboxCorrection = function (htmlNode) {
					var _p136 = parent;
					if (_p136.ctor === 'Nothing') {
						return htmlNode;
					} else {
						return (isFlexbox(_p136._0.layout) && isFlexbox(_p155)) ? htmlNode : htmlNode;
					}
				};
				var findSpacing = function (posAttr) {
					var _p137 = posAttr;
					if (_p137.ctor === 'Spacing') {
						var _p139 = _p137._1;
						var _p138 = _p137._0;
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple4', _0: _p139, _1: _p138, _2: _p139, _3: _p138});
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				};
				var forSpacing = function (_p140) {
					return function (x) {
						return !_elm_lang$core$Native_Utils.eq(x, _elm_lang$core$Maybe$Nothing);
					}(
						findSpacing(_p140));
				};
				var _p141 = A2(_elm_lang$core$List$partition, forSpacing, _p154);
				var spacing = _p141._0;
				var forPadding = function (posAttr) {
					var _p142 = posAttr;
					switch (_p142.ctor) {
						case 'Padding':
							return _elm_lang$core$Maybe$Just(
								A2(
									_mdgriffith$style_elements$Element_Internal_Render$defaultPadding,
									{ctor: '_Tuple4', _0: _p142._0, _1: _p142._1, _2: _p142._2, _3: _p142._3},
									{ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0}));
						case 'PhantomPadding':
							return _elm_lang$core$Maybe$Just(_p142._0);
						default:
							return _elm_lang$core$Maybe$Nothing;
					}
				};
				var clearfix = function (attrs) {
					var _p143 = _p155;
					if (_p143.ctor === 'TextLayout') {
						return _p143._0 ? {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('clearfix'),
							_1: attrs
						} : attrs;
					} else {
						return attrs;
					}
				};
				var attributes = function () {
					var _p144 = parent;
					if (_p144.ctor === 'Nothing') {
						return _p154;
					} else {
						var _p145 = _p144._0.parentSpecifiedSpacing;
						if (_p145.ctor === 'Nothing') {
							return _p154;
						} else {
							return {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$Margin(_p145._0),
								_1: _p154
							};
						}
					}
				}();
				var padding = function () {
					var _p146 = _elm_lang$core$List$head(
						A2(_elm_lang$core$List$filterMap, forPadding, attributes));
					if (_p146.ctor === 'Nothing') {
						return {ctor: '_Tuple4', _0: 0, _1: 0, _2: 0, _3: 0};
					} else {
						return _p146._0;
					}
				}();
				var inherit = {
					parentSpecifiedSpacing: _elm_lang$core$List$head(
						A2(_elm_lang$core$List$filterMap, findSpacing, _p154)),
					layout: _p155,
					parentPadding: padding
				};
				var htmlAttrs = clearfix(
					A6(
						_mdgriffith$style_elements$Element_Internal_Render$renderAttributes,
						_mdgriffith$style_elements$Element_Internal_Render$LayoutElement(_p155),
						order,
						_p117._0.style,
						parent,
						stylesheet,
						_mdgriffith$style_elements$Element_Internal_Render$gather(attributes)));
				var _p147 = A2(
					_elm_lang$core$List$partition,
					function (attr) {
						return _elm_lang$core$Native_Utils.eq(
							attr,
							_mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Center)) || _elm_lang$core$Native_Utils.eq(
							attr,
							_mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$VerticalCenter));
					},
					_p154);
				var centeredProps = _p147._0;
				var others = _p147._1;
				var _p148 = _p117._0.children;
				if (_p148.ctor === 'Normal') {
					var _p150 = _p148._0;
					var childHtml = A2(
						_elm_lang$core$List$indexedMap,
						F2(
							function (i, child) {
								return A4(
									_mdgriffith$style_elements$Element_Internal_Render$renderElement,
									_elm_lang$core$Maybe$Just(inherit),
									stylesheet,
									A2(_mdgriffith$style_elements$Element_Internal_Render$detectOrder, _p150, i),
									child);
							}),
						_p150);
					var allChildren = function () {
						var _p149 = _p117._0.absolutelyPositioned;
						if (_p149.ctor === 'Nothing') {
							return childHtml;
						} else {
							return A2(
								_elm_lang$core$Basics_ops['++'],
								childHtml,
								A2(
									_elm_lang$core$List$map,
									A3(_mdgriffith$style_elements$Element_Internal_Render$renderElement, _elm_lang$core$Maybe$Nothing, stylesheet, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast),
									_p149._0));
						}
					}();
					return adjacentFlexboxCorrection(
						A3(_elm_lang$html$Html$node, _p156, htmlAttrs, allChildren));
				} else {
					var _p153 = _p148._0;
					var childHtml = A2(
						_elm_lang$core$List$indexedMap,
						F2(
							function (i, _p151) {
								var _p152 = _p151;
								return {
									ctor: '_Tuple2',
									_0: _p152._0,
									_1: A4(
										_mdgriffith$style_elements$Element_Internal_Render$renderElement,
										_elm_lang$core$Maybe$Just(inherit),
										stylesheet,
										A2(_mdgriffith$style_elements$Element_Internal_Render$detectOrder, _p153, i),
										_p152._1)
								};
							}),
						_p153);
					return adjacentFlexboxCorrection(
						A3(_elm_lang$html$Html_Keyed$node, _p156, htmlAttrs, childHtml));
				}
		}
	});
var _mdgriffith$style_elements$Element_Internal_Render$render = F2(
	function (stylesheet, elm) {
		var _p157 = _mdgriffith$style_elements$Element_Internal_Adjustments$apply(elm);
		var adjusted = _p157._0;
		var onScreen = _p157._1;
		var fixedScreenElements = function () {
			var _p158 = onScreen;
			if (_p158.ctor === 'Nothing') {
				return {ctor: '[]'};
			} else {
				return A2(
					_elm_lang$core$List$map,
					A3(_mdgriffith$style_elements$Element_Internal_Render$renderElement, _elm_lang$core$Maybe$Nothing, stylesheet, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast),
					_p158._0);
			}
		}();
		return {
			ctor: '::',
			_0: A4(_mdgriffith$style_elements$Element_Internal_Render$renderElement, _elm_lang$core$Maybe$Nothing, stylesheet, _mdgriffith$style_elements$Element_Internal_Render$FirstAndLast, adjusted),
			_1: fixedScreenElements
		};
	});
var _mdgriffith$style_elements$Element_Internal_Render$viewport = F2(
	function (stylesheet, elm) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('style-elements'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$style(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'width', _1: '100%'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'height', _1: '100%'},
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: A2(_mdgriffith$style_elements$Element_Internal_Render$embed, true, stylesheet),
				_1: A2(_mdgriffith$style_elements$Element_Internal_Render$render, stylesheet, elm)
			});
	});
var _mdgriffith$style_elements$Element_Internal_Render$root = F2(
	function (stylesheet, elm) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('style-elements'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(_mdgriffith$style_elements$Element_Internal_Render$embed, false, stylesheet),
				_1: A2(_mdgriffith$style_elements$Element_Internal_Render$render, stylesheet, elm)
			});
	});

var _mdgriffith$style_elements$Element$map = _mdgriffith$style_elements$Element_Internal_Model$mapMsg;
var _mdgriffith$style_elements$Element$responsive = F3(
	function (a, _p1, _p0) {
		var _p2 = _p1;
		var _p7 = _p2._0;
		var _p6 = _p2._1;
		var _p3 = _p0;
		var _p5 = _p3._0;
		var _p4 = _p3._1;
		if (_elm_lang$core$Native_Utils.cmp(a, _p7) < 1) {
			return _p5;
		} else {
			if (_elm_lang$core$Native_Utils.cmp(a, _p6) > -1) {
				return _p4;
			} else {
				var deltaA = (a - _p7) / (_p6 - _p7);
				return (deltaA * (_p4 - _p5)) + _p5;
			}
		}
	});
var _mdgriffith$style_elements$Element$classifyDevice = function (_p8) {
	var _p9 = _p8;
	var _p11 = _p9.width;
	var _p10 = _p9.height;
	return {
		width: _p11,
		height: _p10,
		phone: _elm_lang$core$Native_Utils.cmp(_p11, 600) < 1,
		tablet: (_elm_lang$core$Native_Utils.cmp(_p11, 600) > 0) && (_elm_lang$core$Native_Utils.cmp(_p11, 1200) < 1),
		desktop: (_elm_lang$core$Native_Utils.cmp(_p11, 1200) > 0) && (_elm_lang$core$Native_Utils.cmp(_p11, 1800) < 1),
		bigDesktop: _elm_lang$core$Native_Utils.cmp(_p11, 1800) > 0,
		portrait: _elm_lang$core$Native_Utils.cmp(_p11, _p10) > 0
	};
};
var _mdgriffith$style_elements$Element$embed = function (sheet) {
	return A2(_mdgriffith$style_elements$Element_Internal_Render$embed, false, sheet);
};
var _mdgriffith$style_elements$Element$root = _mdgriffith$style_elements$Element_Internal_Render$root;
var _mdgriffith$style_elements$Element$render = F2(
	function (stylesheet, el) {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			A2(_mdgriffith$style_elements$Element_Internal_Render$render, stylesheet, el));
	});
var _mdgriffith$style_elements$Element$embedStylesheet = function (sheet) {
	return A2(_mdgriffith$style_elements$Element_Internal_Render$embed, false, sheet);
};
var _mdgriffith$style_elements$Element$toHtml = F2(
	function (stylesheet, el) {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			A2(_mdgriffith$style_elements$Element_Internal_Render$render, stylesheet, el));
	});
var _mdgriffith$style_elements$Element$viewport = _mdgriffith$style_elements$Element_Internal_Render$viewport;
var _mdgriffith$style_elements$Element$layout = _mdgriffith$style_elements$Element_Internal_Render$root;
var _mdgriffith$style_elements$Element$onLeft = F2(
	function (nearbys, parent) {
		var position = F2(
			function (el, p) {
				return A2(
					_mdgriffith$style_elements$Element_Internal_Modify$addChild,
					p,
					A2(
						_mdgriffith$style_elements$Element_Internal_Modify$removeAttrs,
						{
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Right),
							_1: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Left),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_mdgriffith$style_elements$Element_Internal_Modify$addAttr,
							_mdgriffith$style_elements$Element_Internal_Model$PositionFrame(
								_mdgriffith$style_elements$Element_Internal_Model$Nearby(_mdgriffith$style_elements$Element_Internal_Model$OnLeft)),
							el)));
			});
		return A3(_elm_lang$core$List$foldl, position, parent, nearbys);
	});
var _mdgriffith$style_elements$Element$onRight = F2(
	function (nearbys, parent) {
		var position = F2(
			function (el, p) {
				return A2(
					_mdgriffith$style_elements$Element_Internal_Modify$addChild,
					p,
					A2(
						_mdgriffith$style_elements$Element_Internal_Modify$removeAttrs,
						{
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Right),
							_1: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$HAlign(_mdgriffith$style_elements$Element_Internal_Model$Left),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_mdgriffith$style_elements$Element_Internal_Modify$addAttr,
							_mdgriffith$style_elements$Element_Internal_Model$PositionFrame(
								_mdgriffith$style_elements$Element_Internal_Model$Nearby(_mdgriffith$style_elements$Element_Internal_Model$OnRight)),
							el)));
			});
		return A3(_elm_lang$core$List$foldl, position, parent, nearbys);
	});
var _mdgriffith$style_elements$Element$below = F2(
	function (nearbys, parent) {
		var position = F2(
			function (el, p) {
				return A2(
					_mdgriffith$style_elements$Element_Internal_Modify$addChild,
					p,
					A2(
						_mdgriffith$style_elements$Element_Internal_Modify$removeAttrs,
						{
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$Top),
							_1: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$Bottom),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_mdgriffith$style_elements$Element_Internal_Modify$addAttr,
							_mdgriffith$style_elements$Element_Internal_Model$PositionFrame(
								_mdgriffith$style_elements$Element_Internal_Model$Nearby(_mdgriffith$style_elements$Element_Internal_Model$Below)),
							el)));
			});
		return A3(_elm_lang$core$List$foldl, position, parent, nearbys);
	});
var _mdgriffith$style_elements$Element$above = F2(
	function (nearbys, parent) {
		var position = F2(
			function (el, p) {
				return A2(
					_mdgriffith$style_elements$Element_Internal_Modify$addChild,
					p,
					A2(
						_mdgriffith$style_elements$Element_Internal_Modify$removeAttrs,
						{
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$Top),
							_1: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$VAlign(_mdgriffith$style_elements$Element_Internal_Model$Bottom),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_mdgriffith$style_elements$Element_Internal_Modify$addAttr,
							_mdgriffith$style_elements$Element_Internal_Model$PositionFrame(
								_mdgriffith$style_elements$Element_Internal_Model$Nearby(_mdgriffith$style_elements$Element_Internal_Model$Above)),
							el)));
			});
		return A3(_elm_lang$core$List$foldl, position, parent, nearbys);
	});
var _mdgriffith$style_elements$Element$within = F2(
	function (nearbys, parent) {
		var position = F2(
			function (el, p) {
				return A2(
					_mdgriffith$style_elements$Element_Internal_Modify$addChild,
					p,
					A2(
						_mdgriffith$style_elements$Element_Internal_Modify$addAttr,
						_mdgriffith$style_elements$Element_Internal_Model$PositionFrame(
							_mdgriffith$style_elements$Element_Internal_Model$Nearby(_mdgriffith$style_elements$Element_Internal_Model$Within)),
						el));
			});
		return A3(_elm_lang$core$List$foldl, position, parent, nearbys);
	});
var _mdgriffith$style_elements$Element$link = F2(
	function (src, el) {
		return A2(
			_mdgriffith$style_elements$Element_Internal_Modify$addAttrList,
			{
				ctor: '::',
				_0: _mdgriffith$style_elements$Element_Internal_Model$Attr(
					_elm_lang$html$Html_Attributes$href(src)),
				_1: {
					ctor: '::',
					_0: _mdgriffith$style_elements$Element_Internal_Model$Attr(
						_elm_lang$html$Html_Attributes$rel('noopener noreferrer')),
					_1: {ctor: '[]'}
				}
			},
			A2(_mdgriffith$style_elements$Element_Internal_Modify$setNode, 'a', el));
	});
var _mdgriffith$style_elements$Element$spanAll = function (name) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Named,
		_mdgriffith$style_elements$Style_Internal_Model$SpanAll,
		_elm_lang$core$Maybe$Just(name));
};
var _mdgriffith$style_elements$Element$span = F2(
	function (i, name) {
		return A2(
			_mdgriffith$style_elements$Style_Internal_Model$Named,
			_mdgriffith$style_elements$Style_Internal_Model$SpanJust(i),
			_elm_lang$core$Maybe$Just(name));
	});
var _mdgriffith$style_elements$Element$named = F2(
	function (name, el) {
		return _mdgriffith$style_elements$Element_Internal_Model$NamedOnGrid(
			A2(
				_mdgriffith$style_elements$Element_Internal_Modify$addAttr,
				_mdgriffith$style_elements$Element_Internal_Model$GridArea(name),
				el));
	});
var _mdgriffith$style_elements$Element$area = F2(
	function (box, el) {
		return _mdgriffith$style_elements$Element_Internal_Model$OnGrid(
			A2(
				_mdgriffith$style_elements$Element_Internal_Modify$addAttr,
				_mdgriffith$style_elements$Element_Internal_Model$GridCoords(
					_mdgriffith$style_elements$Style_Internal_Model$GridPosition(box)),
				el));
	});
var _mdgriffith$style_elements$Element$namedGrid = F4(
	function (style, template, attrs, children) {
		var forSpacing = function (attr) {
			var _p12 = attr;
			if (_p12.ctor === 'Spacing') {
				return true;
			} else {
				return false;
			}
		};
		var _p13 = A2(_elm_lang$core$List$partition, forSpacing, attrs);
		var spacing = _p13._0;
		var notSpacingAttrs = _p13._1;
		var gridAttributes = function () {
			var _p14 = _elm_lang$core$List$head(
				_elm_lang$core$List$reverse(spacing));
			if (_p14.ctor === 'Nothing') {
				return {ctor: '[]'};
			} else {
				if (_p14._0.ctor === 'Spacing') {
					return {
						ctor: '::',
						_0: A2(_mdgriffith$style_elements$Style_Internal_Model$GridGap, _p14._0._0, _p14._0._1),
						_1: {ctor: '[]'}
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}();
		var prepare = function (el) {
			return _mdgriffith$style_elements$Element_Internal_Model$Normal(
				A2(
					_elm_lang$core$List$map,
					function (_p15) {
						var _p16 = _p15;
						return _p16._0;
					},
					el));
		};
		return _mdgriffith$style_elements$Element_Internal_Model$Layout(
			{
				node: 'div',
				style: _elm_lang$core$Maybe$Just(style),
				layout: A2(
					_mdgriffith$style_elements$Style_Internal_Model$Grid,
					_mdgriffith$style_elements$Style_Internal_Model$NamedGridTemplate(template),
					gridAttributes),
				attrs: notSpacingAttrs,
				children: prepare(children),
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$grid = F4(
	function (style, template, attrs, children) {
		var forSpacing = function (attr) {
			var _p17 = attr;
			if (_p17.ctor === 'Spacing') {
				return true;
			} else {
				return false;
			}
		};
		var _p18 = A2(_elm_lang$core$List$partition, forSpacing, attrs);
		var spacing = _p18._0;
		var notSpacingAttrs = _p18._1;
		var gridAttributes = function () {
			var _p19 = _elm_lang$core$List$head(
				_elm_lang$core$List$reverse(spacing));
			if (_p19.ctor === 'Nothing') {
				return {ctor: '[]'};
			} else {
				if (_p19._0.ctor === 'Spacing') {
					return {
						ctor: '::',
						_0: A2(_mdgriffith$style_elements$Style_Internal_Model$GridGap, _p19._0._0, _p19._0._1),
						_1: {ctor: '[]'}
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}();
		var prepare = function (el) {
			return _mdgriffith$style_elements$Element_Internal_Model$Normal(
				A2(
					_elm_lang$core$List$map,
					function (_p20) {
						var _p21 = _p20;
						return _p21._0;
					},
					el));
		};
		return _mdgriffith$style_elements$Element_Internal_Model$Layout(
			{
				node: 'div',
				style: _elm_lang$core$Maybe$Just(style),
				layout: A2(
					_mdgriffith$style_elements$Style_Internal_Model$Grid,
					_mdgriffith$style_elements$Style_Internal_Model$GridTemplate(template),
					gridAttributes),
				attrs: notSpacingAttrs,
				children: prepare(children),
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$table = F3(
	function (style, attrs, rows) {
		var children = _elm_lang$core$List$concat(
			A2(
				_elm_lang$core$List$indexedMap,
				F2(
					function (row, columns) {
						return A2(
							_elm_lang$core$List$indexedMap,
							F2(
								function (col, content) {
									return A2(
										_mdgriffith$style_elements$Element$area,
										{
											start: {ctor: '_Tuple2', _0: row, _1: col},
											width: 1,
											height: 1
										},
										content);
								}),
							columns);
					}),
				rows));
		return A4(
			_mdgriffith$style_elements$Element$grid,
			style,
			{
				columns: {ctor: '[]'},
				rows: {ctor: '[]'}
			},
			attrs,
			children);
	});
var _mdgriffith$style_elements$Element$wrappedColumn = F3(
	function (style, attrs, children) {
		return _mdgriffith$style_elements$Element_Internal_Model$Layout(
			{
				node: 'div',
				style: _elm_lang$core$Maybe$Just(style),
				layout: A2(
					_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
					_mdgriffith$style_elements$Style_Internal_Model$Down,
					{
						ctor: '::',
						_0: _mdgriffith$style_elements$Style_Internal_Model$Wrap(true),
						_1: {ctor: '[]'}
					}),
				attrs: attrs,
				children: _mdgriffith$style_elements$Element_Internal_Model$Normal(children),
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$wrappedRow = F3(
	function (style, attrs, children) {
		return _mdgriffith$style_elements$Element_Internal_Model$Layout(
			{
				node: 'div',
				style: _elm_lang$core$Maybe$Just(style),
				layout: A2(
					_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
					_mdgriffith$style_elements$Style_Internal_Model$GoRight,
					{
						ctor: '::',
						_0: _mdgriffith$style_elements$Style_Internal_Model$Wrap(true),
						_1: {ctor: '[]'}
					}),
				attrs: attrs,
				children: _mdgriffith$style_elements$Element_Internal_Model$Normal(children),
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$column = F3(
	function (style, attrs, children) {
		return _mdgriffith$style_elements$Element_Internal_Model$Layout(
			{
				node: 'div',
				style: _elm_lang$core$Maybe$Just(style),
				layout: A2(
					_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
					_mdgriffith$style_elements$Style_Internal_Model$Down,
					{ctor: '[]'}),
				attrs: attrs,
				children: _mdgriffith$style_elements$Element_Internal_Model$Normal(children),
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$row = F3(
	function (style, attrs, children) {
		return _mdgriffith$style_elements$Element_Internal_Model$Layout(
			{
				node: 'div',
				style: _elm_lang$core$Maybe$Just(style),
				layout: A2(
					_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
					_mdgriffith$style_elements$Style_Internal_Model$GoRight,
					{ctor: '[]'}),
				attrs: attrs,
				children: _mdgriffith$style_elements$Element_Internal_Model$Normal(children),
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$paragraph = F3(
	function (style, attrs, children) {
		return _mdgriffith$style_elements$Element_Internal_Model$Layout(
			{
				node: 'p',
				style: _elm_lang$core$Maybe$Just(style),
				layout: _mdgriffith$style_elements$Style_Internal_Model$TextLayout(false),
				attrs: attrs,
				children: _mdgriffith$style_elements$Element_Internal_Model$Normal(
					A2(
						_elm_lang$core$List$map,
						_mdgriffith$style_elements$Element_Internal_Modify$addAttrToNonText(_mdgriffith$style_elements$Element_Internal_Model$Inline),
						children)),
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$textLayout = F3(
	function (style, attrs, children) {
		return _mdgriffith$style_elements$Element_Internal_Model$Layout(
			{
				node: 'div',
				style: _elm_lang$core$Maybe$Just(style),
				layout: _mdgriffith$style_elements$Style_Internal_Model$TextLayout(true),
				attrs: attrs,
				children: _mdgriffith$style_elements$Element_Internal_Model$Normal(children),
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$full = F3(
	function (elem, attrs, child) {
		return _mdgriffith$style_elements$Element_Internal_Model$Element(
			{
				node: 'div',
				style: _elm_lang$core$Maybe$Just(elem),
				attrs: {ctor: '::', _0: _mdgriffith$style_elements$Element_Internal_Model$Expand, _1: attrs},
				child: child,
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$inputText = F3(
	function (elem, attrs, content) {
		return _mdgriffith$style_elements$Element_Internal_Model$Element(
			{
				node: 'input',
				style: _elm_lang$core$Maybe$Just(elem),
				attrs: {
					ctor: '::',
					_0: _mdgriffith$style_elements$Element_Attributes$type_('text'),
					_1: {
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Attributes$value(content),
						_1: attrs
					}
				},
				child: _mdgriffith$style_elements$Element_Internal_Model$Empty,
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$select = F4(
	function (group, style, attributes, buttons) {
		var toChild = function (_p22) {
			var _p23 = _p22;
			return A2(
				_mdgriffith$style_elements$Element_Internal_Modify$addAttrList,
				{
					ctor: '::',
					_0: _mdgriffith$style_elements$Element_Attributes$value(_p23._0),
					_1: {
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Attributes$selected(_p23._1),
						_1: {ctor: '[]'}
					}
				},
				A2(_mdgriffith$style_elements$Element_Internal_Modify$setNode, 'option', _p23._2));
		};
		return A2(
			_mdgriffith$style_elements$Element_Internal_Modify$setNode,
			'select',
			A3(
				_mdgriffith$style_elements$Element$column,
				style,
				{
					ctor: '::',
					_0: _mdgriffith$style_elements$Element_Attributes$name(group),
					_1: attributes
				},
				A2(_elm_lang$core$List$map, toChild, buttons)));
	});
var _mdgriffith$style_elements$Element$radio = F4(
	function (group, style, attributes, buttons) {
		var toChild = function (_p24) {
			var _p25 = _p24;
			var _p28 = _p25._2;
			var literalLabel = _mdgriffith$style_elements$Element_Internal_Modify$removeStyle(
				_mdgriffith$style_elements$Element_Internal_Modify$removeAllAttrs(
					_mdgriffith$style_elements$Element_Internal_Modify$getChild(_p28)));
			var forInputEvents = function (attr) {
				var _p26 = attr;
				if (_p26.ctor === 'InputEvent') {
					return true;
				} else {
					return false;
				}
			};
			var attrs = _mdgriffith$style_elements$Element_Internal_Modify$getAttrs(_p28);
			var _p27 = A2(_elm_lang$core$List$partition, forInputEvents, attrs);
			var inputEvents = _p27._0;
			var nonInputEventAttrs = _p27._1;
			var rune = _mdgriffith$style_elements$Element_Internal_Modify$removeStyle(
				_mdgriffith$style_elements$Element_Internal_Modify$removeContent(
					A2(
						_mdgriffith$style_elements$Element_Internal_Modify$addAttrList,
						A2(
							_elm_lang$core$Basics_ops['++'],
							{
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Attributes$type_('radio'),
								_1: {
									ctor: '::',
									_0: _mdgriffith$style_elements$Element_Attributes$name(group),
									_1: {
										ctor: '::',
										_0: _mdgriffith$style_elements$Element_Attributes$value(_p25._0),
										_1: {
											ctor: '::',
											_0: _mdgriffith$style_elements$Element_Attributes$checked(_p25._1),
											_1: {ctor: '[]'}
										}
									}
								}
							},
							inputEvents),
						A2(_mdgriffith$style_elements$Element_Internal_Modify$setNode, 'input', _p28))));
			var style = _mdgriffith$style_elements$Element_Internal_Modify$getStyle(_p28);
			return _mdgriffith$style_elements$Element_Internal_Model$Layout(
				{
					node: 'layout',
					style: style,
					layout: A2(
						_mdgriffith$style_elements$Style_Internal_Model$FlexLayout,
						_mdgriffith$style_elements$Style_Internal_Model$GoRight,
						{ctor: '[]'}),
					attrs: nonInputEventAttrs,
					children: _mdgriffith$style_elements$Element_Internal_Model$Normal(
						{
							ctor: '::',
							_0: rune,
							_1: {
								ctor: '::',
								_0: literalLabel,
								_1: {ctor: '[]'}
							}
						}),
					absolutelyPositioned: _elm_lang$core$Maybe$Nothing
				});
		};
		return A3(
			_mdgriffith$style_elements$Element$column,
			style,
			attributes,
			A2(_elm_lang$core$List$map, toChild, buttons));
	});
var _mdgriffith$style_elements$Element$form = _mdgriffith$style_elements$Element_Internal_Modify$setNode('form');
var _mdgriffith$style_elements$Element$video = _mdgriffith$style_elements$Element_Internal_Modify$setNode('video');
var _mdgriffith$style_elements$Element$audio = _mdgriffith$style_elements$Element_Internal_Modify$setNode('audio');
var _mdgriffith$style_elements$Element$iframe = _mdgriffith$style_elements$Element_Internal_Modify$setNode('iframe');
var _mdgriffith$style_elements$Element$canvas = _mdgriffith$style_elements$Element_Internal_Modify$setNode('canvas');
var _mdgriffith$style_elements$Element$button = _mdgriffith$style_elements$Element_Internal_Modify$setNode('button');
var _mdgriffith$style_elements$Element$aside = _mdgriffith$style_elements$Element_Internal_Modify$setNode('aside');
var _mdgriffith$style_elements$Element$article = _mdgriffith$style_elements$Element_Internal_Modify$setNode('article');
var _mdgriffith$style_elements$Element$nav = _mdgriffith$style_elements$Element_Internal_Modify$setNode('nav');
var _mdgriffith$style_elements$Element$section = _mdgriffith$style_elements$Element_Internal_Modify$setNode('section');
var _mdgriffith$style_elements$Element$header = _mdgriffith$style_elements$Element_Internal_Modify$setNode('header');
var _mdgriffith$style_elements$Element$node = function (str) {
	return _mdgriffith$style_elements$Element_Internal_Modify$setNode(str);
};
var _mdgriffith$style_elements$Element$label = F4(
	function (elem, attrs, label, input) {
		var containedLabel = function () {
			var _p29 = label;
			if (_p29.ctor === 'Text') {
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					{
						node: 'div',
						style: _elm_lang$core$Maybe$Nothing,
						attrs: {ctor: '[]'},
						child: A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p29._0, _p29._1),
						absolutelyPositioned: _elm_lang$core$Maybe$Nothing
					});
			} else {
				return _p29;
			}
		}();
		return A2(
			_mdgriffith$style_elements$Element$node,
			'label',
			A3(
				_mdgriffith$style_elements$Element$column,
				elem,
				attrs,
				{
					ctor: '::',
					_0: label,
					_1: {
						ctor: '::',
						_0: input,
						_1: {ctor: '[]'}
					}
				}));
	});
var _mdgriffith$style_elements$Element$labelBelow = F4(
	function (elem, attrs, label, input) {
		var containedLabel = function () {
			var _p30 = label;
			if (_p30.ctor === 'Text') {
				return _mdgriffith$style_elements$Element_Internal_Model$Element(
					{
						node: 'div',
						style: _elm_lang$core$Maybe$Nothing,
						attrs: {ctor: '[]'},
						child: A2(_mdgriffith$style_elements$Element_Internal_Model$Text, _p30._0, _p30._1),
						absolutelyPositioned: _elm_lang$core$Maybe$Nothing
					});
			} else {
				return _p30;
			}
		}();
		return A2(
			_mdgriffith$style_elements$Element$node,
			'label',
			A3(
				_mdgriffith$style_elements$Element$column,
				elem,
				attrs,
				{
					ctor: '::',
					_0: input,
					_1: {
						ctor: '::',
						_0: label,
						_1: {ctor: '[]'}
					}
				}));
	});
var _mdgriffith$style_elements$Element$html = _mdgriffith$style_elements$Element_Internal_Model$Raw;
var _mdgriffith$style_elements$Element$image = F4(
	function (src, style, attrs, child) {
		return _mdgriffith$style_elements$Element_Internal_Model$Element(
			{
				node: 'img',
				style: _elm_lang$core$Maybe$Just(style),
				attrs: {
					ctor: '::',
					_0: _mdgriffith$style_elements$Element_Internal_Model$Attr(
						_elm_lang$html$Html_Attributes$src(src)),
					_1: attrs
				},
				child: child,
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$spacer = _mdgriffith$style_elements$Element_Internal_Model$Spacer;
var _mdgriffith$style_elements$Element$circle = F4(
	function (radius, style, attrs, child) {
		return _mdgriffith$style_elements$Element_Internal_Model$Element(
			{
				node: 'div',
				style: _elm_lang$core$Maybe$Just(style),
				attrs: {
					ctor: '::',
					_0: _mdgriffith$style_elements$Element_Internal_Model$Attr(
						_elm_lang$html$Html_Attributes$style(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'border-radius',
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(radius),
										'px')
								},
								_1: {ctor: '[]'}
							})),
					_1: {
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Internal_Model$Width(
							_mdgriffith$style_elements$Style_Internal_Model$Px(2 * radius)),
						_1: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Model$Height(
								_mdgriffith$style_elements$Style_Internal_Model$Px(2 * radius)),
							_1: attrs
						}
					}
				},
				child: child,
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$el = F3(
	function (style, attrs, child) {
		return _mdgriffith$style_elements$Element_Internal_Model$Element(
			{
				node: 'div',
				style: _elm_lang$core$Maybe$Just(style),
				attrs: attrs,
				child: child,
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$super = _mdgriffith$style_elements$Element_Internal_Model$Text(_mdgriffith$style_elements$Element_Internal_Model$Super);
var _mdgriffith$style_elements$Element$sub = _mdgriffith$style_elements$Element_Internal_Model$Text(_mdgriffith$style_elements$Element_Internal_Model$Sub);
var _mdgriffith$style_elements$Element$underline = _mdgriffith$style_elements$Element_Internal_Model$Text(_mdgriffith$style_elements$Element_Internal_Model$Underline);
var _mdgriffith$style_elements$Element$strike = _mdgriffith$style_elements$Element_Internal_Model$Text(_mdgriffith$style_elements$Element_Internal_Model$Strike);
var _mdgriffith$style_elements$Element$italic = _mdgriffith$style_elements$Element_Internal_Model$Text(_mdgriffith$style_elements$Element_Internal_Model$Italic);
var _mdgriffith$style_elements$Element$bold = _mdgriffith$style_elements$Element_Internal_Model$Text(_mdgriffith$style_elements$Element_Internal_Model$Bold);
var _mdgriffith$style_elements$Element$text = _mdgriffith$style_elements$Element_Internal_Model$Text(_mdgriffith$style_elements$Element_Internal_Model$NoDecoration);
var _mdgriffith$style_elements$Element$textArea = F3(
	function (elem, attrs, content) {
		return _mdgriffith$style_elements$Element_Internal_Model$Element(
			{
				node: 'textarea',
				style: _elm_lang$core$Maybe$Just(elem),
				attrs: attrs,
				child: _mdgriffith$style_elements$Element$text(content),
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$empty = _mdgriffith$style_elements$Element_Internal_Model$Empty;
var _mdgriffith$style_elements$Element$hairline = function (style) {
	return _mdgriffith$style_elements$Element_Internal_Model$Element(
		{
			node: 'hr',
			style: _elm_lang$core$Maybe$Just(style),
			attrs: {
				ctor: '::',
				_0: _mdgriffith$style_elements$Element_Internal_Model$Height(
					_mdgriffith$style_elements$Style_Internal_Model$Px(1)),
				_1: {ctor: '[]'}
			},
			child: _mdgriffith$style_elements$Element$empty,
			absolutelyPositioned: _elm_lang$core$Maybe$Nothing
		});
};
var _mdgriffith$style_elements$Element$break = _mdgriffith$style_elements$Element_Internal_Model$Element(
	{
		node: 'br',
		style: _elm_lang$core$Maybe$Nothing,
		attrs: {ctor: '[]'},
		child: _mdgriffith$style_elements$Element$empty,
		absolutelyPositioned: _elm_lang$core$Maybe$Nothing
	});
var _mdgriffith$style_elements$Element$inlineChildren = F4(
	function (node, style, attrs, children) {
		var _p31 = function () {
			var _p32 = children;
			if (_p32.ctor === '[]') {
				return {ctor: '_Tuple2', _0: _mdgriffith$style_elements$Element$empty, _1: _elm_lang$core$Maybe$Nothing};
			} else {
				return {
					ctor: '_Tuple2',
					_0: A2(_mdgriffith$style_elements$Element_Internal_Modify$addAttrToNonText, _mdgriffith$style_elements$Element_Internal_Model$Inline, _p32._0),
					_1: _elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$core$List$map,
							_mdgriffith$style_elements$Element_Internal_Modify$addAttrToNonText(_mdgriffith$style_elements$Element_Internal_Model$Inline),
							_p32._1))
				};
			}
		}();
		var child = _p31._0;
		var others = _p31._1;
		return _mdgriffith$style_elements$Element_Internal_Model$Element(
			{node: node, style: style, attrs: attrs, child: child, absolutelyPositioned: others});
	});
var _mdgriffith$style_elements$Element$checkbox = F4(
	function (on, style, attrs, label) {
		var forInputEvents = function (attr) {
			var _p33 = attr;
			if (_p33.ctor === 'InputEvent') {
				return true;
			} else {
				return false;
			}
		};
		var _p34 = A2(_elm_lang$core$List$partition, forInputEvents, attrs);
		var events = _p34._0;
		var notInputEvents = _p34._1;
		return _mdgriffith$style_elements$Element_Internal_Model$Element(
			{
				node: 'label',
				style: _elm_lang$core$Maybe$Just(style),
				attrs: notInputEvents,
				child: A4(
					_mdgriffith$style_elements$Element$inlineChildren,
					'div',
					_elm_lang$core$Maybe$Nothing,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Internal_Model$Element(
							{
								node: 'input',
								style: _elm_lang$core$Maybe$Nothing,
								attrs: {
									ctor: '::',
									_0: _mdgriffith$style_elements$Element_Attributes$type_('checkbox'),
									_1: {
										ctor: '::',
										_0: _mdgriffith$style_elements$Element_Attributes$checked(on),
										_1: events
									}
								},
								child: _mdgriffith$style_elements$Element$empty,
								absolutelyPositioned: _elm_lang$core$Maybe$Nothing
							}),
						_1: {
							ctor: '::',
							_0: label,
							_1: {ctor: '[]'}
						}
					}),
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			});
	});
var _mdgriffith$style_elements$Element$when = F2(
	function (bool, elm) {
		return bool ? elm : _mdgriffith$style_elements$Element$empty;
	});
var _mdgriffith$style_elements$Element$whenJust = F2(
	function (maybe, view) {
		var _p35 = maybe;
		if (_p35.ctor === 'Nothing') {
			return _mdgriffith$style_elements$Element$empty;
		} else {
			return view(_p35._0);
		}
	});
var _mdgriffith$style_elements$Element$screen = function (el) {
	return A2(
		_mdgriffith$style_elements$Element$within,
		{
			ctor: '::',
			_0: el,
			_1: {ctor: '[]'}
		},
		_mdgriffith$style_elements$Element_Internal_Model$Element(
			{
				node: 'div',
				style: _elm_lang$core$Maybe$Nothing,
				attrs: {
					ctor: '::',
					_0: _mdgriffith$style_elements$Element_Internal_Model$PositionFrame(_mdgriffith$style_elements$Element_Internal_Model$Screen),
					_1: {
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Internal_Model$Width(
							A2(_mdgriffith$style_elements$Style_Internal_Model$Calc, 100, 0)),
						_1: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Internal_Model$Height(
								A2(_mdgriffith$style_elements$Style_Internal_Model$Calc, 100, 0)),
							_1: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Internal_Model$PointerEvents(false),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				child: _mdgriffith$style_elements$Element$empty,
				absolutelyPositioned: _elm_lang$core$Maybe$Nothing
			}));
};
var _mdgriffith$style_elements$Element$Grid = F2(
	function (a, b) {
		return {rows: a, columns: b};
	});
var _mdgriffith$style_elements$Element$NamedGrid = F2(
	function (a, b) {
		return {rows: a, columns: b};
	});
var _mdgriffith$style_elements$Element$GridPosition = F3(
	function (a, b, c) {
		return {start: a, width: b, height: c};
	});
var _mdgriffith$style_elements$Element$Device = F7(
	function (a, b, c, d, e, f, g) {
		return {width: a, height: b, phone: c, tablet: d, desktop: e, bigDesktop: f, portrait: g};
	});
var _mdgriffith$style_elements$Element$Option = F3(
	function (a, b, c) {
		return {ctor: 'Option', _0: a, _1: b, _2: c};
	});
var _mdgriffith$style_elements$Element$option = _mdgriffith$style_elements$Element$Option;

var _mdgriffith$style_elements$Style_Color$placeholder = function (clr) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$PseudoElement,
		'::placeholder',
		{
			ctor: '::',
			_0: _mdgriffith$style_elements$Style_Internal_Model$TextColor(clr),
			_1: {
				ctor: '::',
				_0: A2(_mdgriffith$style_elements$Style_Internal_Model$Exact, 'opacity', '1'),
				_1: {ctor: '[]'}
			}
		});
};
var _mdgriffith$style_elements$Style_Color$selection = function (clr) {
	return _mdgriffith$style_elements$Style_Internal_Model$SelectionColor(clr);
};
var _mdgriffith$style_elements$Style_Color$decoration = function (clr) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Exact,
		'text-decoration-color',
		_mdgriffith$style_elements$Style_Internal_Render_Value$color(clr));
};
var _mdgriffith$style_elements$Style_Color$cursor = function (clr) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Exact,
		'cursor-color',
		_mdgriffith$style_elements$Style_Internal_Render_Value$color(clr));
};
var _mdgriffith$style_elements$Style_Color$border = function (clr) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Exact,
		'border-color',
		_mdgriffith$style_elements$Style_Internal_Render_Value$color(clr));
};
var _mdgriffith$style_elements$Style_Color$background = function (clr) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Exact,
		'background-color',
		_mdgriffith$style_elements$Style_Internal_Render_Value$color(clr));
};
var _mdgriffith$style_elements$Style_Color$text = _mdgriffith$style_elements$Style_Internal_Model$TextColor;

var _mdgriffith$style_elements$Style_Font$lowercase = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'text-transform', 'lowercase');
var _mdgriffith$style_elements$Style_Font$capitalize = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'text-transform', 'capitalize');
var _mdgriffith$style_elements$Style_Font$uppercase = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'text-transform', 'uppercase');
var _mdgriffith$style_elements$Style_Font$weight = function (fontWeight) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Font,
		'font-weight',
		_elm_lang$core$Basics$toString(fontWeight));
};
var _mdgriffith$style_elements$Style_Font$light = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'font-weight', '300');
var _mdgriffith$style_elements$Style_Font$bold = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'font-weight', '700');
var _mdgriffith$style_elements$Style_Font$italic = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'font-style', 'italic');
var _mdgriffith$style_elements$Style_Font$strike = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'text-decoration', 'line-through');
var _mdgriffith$style_elements$Style_Font$underline = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'text-decoration', 'underline');
var _mdgriffith$style_elements$Style_Font$noWrap = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'white-space', 'nowrap');
var _mdgriffith$style_elements$Style_Font$preLine = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'white-space', 'pre-line');
var _mdgriffith$style_elements$Style_Font$preWrap = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'white-space', 'pre-wrap');
var _mdgriffith$style_elements$Style_Font$pre = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'white-space', 'pre');
var _mdgriffith$style_elements$Style_Font$wrap = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'white-space', 'normal');
var _mdgriffith$style_elements$Style_Font$justifyAll = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'text-align', 'justifyAll');
var _mdgriffith$style_elements$Style_Font$justify = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'text-align', 'justify');
var _mdgriffith$style_elements$Style_Font$center = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'text-align', 'center');
var _mdgriffith$style_elements$Style_Font$alignRight = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'text-align', 'right');
var _mdgriffith$style_elements$Style_Font$alignLeft = A2(_mdgriffith$style_elements$Style_Internal_Model$Font, 'text-align', 'left');
var _mdgriffith$style_elements$Style_Font$wordSpacing = function (offset) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Font,
		'word-spacing',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(offset),
			'px'));
};
var _mdgriffith$style_elements$Style_Font$letterSpacing = function (offset) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Font,
		'letter-spacing',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(offset),
			'px'));
};
var _mdgriffith$style_elements$Style_Font$lineHeight = function (height) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Font,
		'line-height',
		_elm_lang$core$Basics$toString(height));
};
var _mdgriffith$style_elements$Style_Font$size = function (size) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Font,
		'font-size',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(size),
			'px'));
};
var _mdgriffith$style_elements$Style_Font$typeface = function (families) {
	return A2(
		_mdgriffith$style_elements$Style_Internal_Model$Font,
		'font-family',
		_mdgriffith$style_elements$Style_Internal_Render_Value$typeface(families));
};

var _mdgriffith$style_elements$Style_Shadow$drop = function (_p0) {
	var _p1 = _p0;
	return _mdgriffith$style_elements$Style_Internal_Model$ShadowModel(
		{kind: 'drop', offset: _p1.offset, size: 0, blur: _p1.blur, color: _p1.color});
};
var _mdgriffith$style_elements$Style_Shadow$text = function (_p2) {
	var _p3 = _p2;
	return _mdgriffith$style_elements$Style_Internal_Model$ShadowModel(
		{kind: 'text', offset: _p3.offset, size: 0, blur: _p3.blur, color: _p3.color});
};
var _mdgriffith$style_elements$Style_Shadow$inset = function (_p4) {
	var _p5 = _p4;
	return _mdgriffith$style_elements$Style_Internal_Model$ShadowModel(
		{kind: 'inset', offset: _p5.offset, size: _p5.size, blur: _p5.blur, color: _p5.color});
};
var _mdgriffith$style_elements$Style_Shadow$box = function (_p6) {
	var _p7 = _p6;
	return _mdgriffith$style_elements$Style_Internal_Model$ShadowModel(
		{kind: 'box', offset: _p7.offset, size: _p7.size, blur: _p7.blur, color: _p7.color});
};
var _mdgriffith$style_elements$Style_Shadow$deep = _mdgriffith$style_elements$Style$shadows(
	{
		ctor: '::',
		_0: _mdgriffith$style_elements$Style_Shadow$box(
			{
				color: A4(_elm_lang$core$Color$rgba, 0, 0, 0, 0.2),
				offset: {ctor: '_Tuple2', _0: 0, _1: 14},
				blur: 20,
				size: -12
			}),
		_1: {ctor: '[]'}
	});
var _mdgriffith$style_elements$Style_Shadow$simple = _mdgriffith$style_elements$Style$shadows(
	{
		ctor: '::',
		_0: _mdgriffith$style_elements$Style_Shadow$box(
			{
				color: A4(_elm_lang$core$Color$rgba, 0, 0, 0, 0.5),
				offset: {ctor: '_Tuple2', _0: 0, _1: 29},
				blur: 32,
				size: -20
			}),
		_1: {
			ctor: '::',
			_0: _mdgriffith$style_elements$Style_Shadow$box(
				{
					color: A4(_elm_lang$core$Color$rgba, 0, 0, 0, 0.25),
					offset: {ctor: '_Tuple2', _0: 0, _1: 4},
					blur: 11,
					size: -3
				}),
			_1: {ctor: '[]'}
		}
	});
var _mdgriffith$style_elements$Style_Shadow$textGlow = F2(
	function (color, size) {
		return _mdgriffith$style_elements$Style_Internal_Model$Shadows(
			{
				ctor: '::',
				_0: _mdgriffith$style_elements$Style_Internal_Model$ShadowModel(
					{
						kind: 'text',
						offset: {ctor: '_Tuple2', _0: 0, _1: 0},
						size: size,
						blur: size * 2,
						color: color
					}),
				_1: {ctor: '[]'}
			});
	});
var _mdgriffith$style_elements$Style_Shadow$innerGlow = F2(
	function (color, size) {
		return _mdgriffith$style_elements$Style_Internal_Model$Shadows(
			{
				ctor: '::',
				_0: _mdgriffith$style_elements$Style_Internal_Model$ShadowModel(
					{
						kind: 'inset',
						offset: {ctor: '_Tuple2', _0: 0, _1: 0},
						size: size,
						blur: size * 2,
						color: color
					}),
				_1: {ctor: '[]'}
			});
	});
var _mdgriffith$style_elements$Style_Shadow$glow = F2(
	function (color, size) {
		return _mdgriffith$style_elements$Style_Internal_Model$Shadows(
			{
				ctor: '::',
				_0: _mdgriffith$style_elements$Style_Internal_Model$ShadowModel(
					{
						kind: 'box',
						offset: {ctor: '_Tuple2', _0: 0, _1: 0},
						size: size,
						blur: size * 2,
						color: color
					}),
				_1: {ctor: '[]'}
			});
	});

var _mgold$elm_date_format$Date_Local$french = {
	date: {
		months: {jan: 'Janvier', feb: 'Février', mar: 'Mars', apr: 'Avril', may: 'Mai', jun: 'Juin', jul: 'Juillet', aug: 'Août', sep: 'Septembre', oct: 'Octobre', nov: 'Novembre', dec: 'Décembre'},
		monthsAbbrev: {jan: 'Jan', feb: 'Fév', mar: 'Mar', apr: 'Avr', may: 'Mai', jun: 'Jui', jul: 'Jul', aug: 'Aoû', sep: 'Sep', oct: 'Oct', nov: 'Nov', dec: 'Déc'},
		wdays: {mon: 'Lundi', tue: 'Mardi', wed: 'Mercredi', thu: 'Jeudi', fri: 'Vendredi', sat: 'Samedi', sun: 'Dimanche'},
		wdaysAbbrev: {mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Jeu', fri: 'Ven', sat: 'Sam', sun: 'Dim'},
		defaultFormat: _elm_lang$core$Maybe$Nothing
	},
	time: {am: 'am', pm: 'pm', defaultFormat: _elm_lang$core$Maybe$Nothing},
	timeZones: _elm_lang$core$Maybe$Nothing,
	defaultFormat: _elm_lang$core$Maybe$Nothing
};
var _mgold$elm_date_format$Date_Local$international = {
	date: {
		months: {jan: 'January', feb: 'February', mar: 'March', apr: 'April', may: 'May', jun: 'June', jul: 'July', aug: 'August', sep: 'September', oct: 'October', nov: 'November', dec: 'December'},
		monthsAbbrev: {jan: 'Jan', feb: 'Feb', mar: 'Mar', apr: 'Apr', may: 'May', jun: 'Jun', jul: 'Jul', aug: 'Aug', sep: 'Sep', oct: 'Oct', nov: 'Nov', dec: 'Dec'},
		wdays: {mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday'},
		wdaysAbbrev: {mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun'},
		defaultFormat: _elm_lang$core$Maybe$Nothing
	},
	time: {am: 'am', pm: 'pm', defaultFormat: _elm_lang$core$Maybe$Nothing},
	timeZones: _elm_lang$core$Maybe$Nothing,
	defaultFormat: _elm_lang$core$Maybe$Nothing
};
var _mgold$elm_date_format$Date_Local$Local = F4(
	function (a, b, c, d) {
		return {date: a, time: b, timeZones: c, defaultFormat: d};
	});
var _mgold$elm_date_format$Date_Local$Months = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return {jan: a, feb: b, mar: c, apr: d, may: e, jun: f, jul: g, aug: h, sep: i, oct: j, nov: k, dec: l};
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
};
var _mgold$elm_date_format$Date_Local$WeekDays = F7(
	function (a, b, c, d, e, f, g) {
		return {mon: a, tue: b, wed: c, thu: d, fri: e, sat: f, sun: g};
	});

var _mgold$elm_date_format$Date_Format$padWith = function (c) {
	return function (_p0) {
		return A3(
			_elm_lang$core$String$padLeft,
			2,
			c,
			_elm_lang$core$Basics$toString(_p0));
	};
};
var _mgold$elm_date_format$Date_Format$zero2twelve = function (n) {
	return _elm_lang$core$Native_Utils.eq(n, 0) ? 12 : n;
};
var _mgold$elm_date_format$Date_Format$mod12 = function (h) {
	return A2(_elm_lang$core$Basics_ops['%'], h, 12);
};
var _mgold$elm_date_format$Date_Format$dayOfWeekToWord = F2(
	function (loc, dow) {
		var _p1 = dow;
		switch (_p1.ctor) {
			case 'Mon':
				return loc.mon;
			case 'Tue':
				return loc.tue;
			case 'Wed':
				return loc.wed;
			case 'Thu':
				return loc.thu;
			case 'Fri':
				return loc.fri;
			case 'Sat':
				return loc.sat;
			default:
				return loc.sun;
		}
	});
var _mgold$elm_date_format$Date_Format$monthToWord = F2(
	function (loc, m) {
		var _p2 = m;
		switch (_p2.ctor) {
			case 'Jan':
				return loc.jan;
			case 'Feb':
				return loc.feb;
			case 'Mar':
				return loc.mar;
			case 'Apr':
				return loc.apr;
			case 'May':
				return loc.may;
			case 'Jun':
				return loc.jun;
			case 'Jul':
				return loc.jul;
			case 'Aug':
				return loc.aug;
			case 'Sep':
				return loc.sep;
			case 'Oct':
				return loc.oct;
			case 'Nov':
				return loc.nov;
			default:
				return loc.dec;
		}
	});
var _mgold$elm_date_format$Date_Format$monthToInt = function (m) {
	var _p3 = m;
	switch (_p3.ctor) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var _mgold$elm_date_format$Date_Format$formatToken = F3(
	function (loc, d, m) {
		var symbol = function () {
			var _p4 = m.submatches;
			if (((_p4.ctor === '::') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === '[]')) {
				return _p4._0._0;
			} else {
				return ' ';
			}
		}();
		var _p5 = symbol;
		switch (_p5) {
			case '%':
				return '%';
			case 'Y':
				return _elm_lang$core$Basics$toString(
					_elm_lang$core$Date$year(d));
			case 'y':
				return A2(
					_elm_lang$core$String$right,
					2,
					_elm_lang$core$Basics$toString(
						_elm_lang$core$Date$year(d)));
			case 'm':
				return A3(
					_elm_lang$core$String$padLeft,
					2,
					_elm_lang$core$Native_Utils.chr('0'),
					_elm_lang$core$Basics$toString(
						_mgold$elm_date_format$Date_Format$monthToInt(
							_elm_lang$core$Date$month(d))));
			case 'B':
				return A2(
					_mgold$elm_date_format$Date_Format$monthToWord,
					loc.date.months,
					_elm_lang$core$Date$month(d));
			case 'b':
				return A2(
					_mgold$elm_date_format$Date_Format$monthToWord,
					loc.date.monthsAbbrev,
					_elm_lang$core$Date$month(d));
			case 'd':
				return A2(
					_mgold$elm_date_format$Date_Format$padWith,
					_elm_lang$core$Native_Utils.chr('0'),
					_elm_lang$core$Date$day(d));
			case 'e':
				return A2(
					_mgold$elm_date_format$Date_Format$padWith,
					_elm_lang$core$Native_Utils.chr(' '),
					_elm_lang$core$Date$day(d));
			case 'a':
				return A2(
					_mgold$elm_date_format$Date_Format$dayOfWeekToWord,
					loc.date.wdaysAbbrev,
					_elm_lang$core$Date$dayOfWeek(d));
			case 'A':
				return A2(
					_mgold$elm_date_format$Date_Format$dayOfWeekToWord,
					loc.date.wdays,
					_elm_lang$core$Date$dayOfWeek(d));
			case 'H':
				return A2(
					_mgold$elm_date_format$Date_Format$padWith,
					_elm_lang$core$Native_Utils.chr('0'),
					_elm_lang$core$Date$hour(d));
			case 'k':
				return A2(
					_mgold$elm_date_format$Date_Format$padWith,
					_elm_lang$core$Native_Utils.chr(' '),
					_elm_lang$core$Date$hour(d));
			case 'I':
				return A2(
					_mgold$elm_date_format$Date_Format$padWith,
					_elm_lang$core$Native_Utils.chr('0'),
					_mgold$elm_date_format$Date_Format$zero2twelve(
						_mgold$elm_date_format$Date_Format$mod12(
							_elm_lang$core$Date$hour(d))));
			case 'l':
				return A2(
					_mgold$elm_date_format$Date_Format$padWith,
					_elm_lang$core$Native_Utils.chr(' '),
					_mgold$elm_date_format$Date_Format$zero2twelve(
						_mgold$elm_date_format$Date_Format$mod12(
							_elm_lang$core$Date$hour(d))));
			case 'p':
				return (_elm_lang$core$Native_Utils.cmp(
					_elm_lang$core$Date$hour(d),
					12) < 0) ? _elm_lang$core$String$toUpper(loc.time.am) : _elm_lang$core$String$toUpper(loc.time.pm);
			case 'P':
				return (_elm_lang$core$Native_Utils.cmp(
					_elm_lang$core$Date$hour(d),
					12) < 0) ? loc.time.am : loc.time.pm;
			case 'M':
				return A2(
					_mgold$elm_date_format$Date_Format$padWith,
					_elm_lang$core$Native_Utils.chr('0'),
					_elm_lang$core$Date$minute(d));
			case 'S':
				return A2(
					_mgold$elm_date_format$Date_Format$padWith,
					_elm_lang$core$Native_Utils.chr('0'),
					_elm_lang$core$Date$second(d));
			default:
				return '';
		}
	});
var _mgold$elm_date_format$Date_Format$re = _elm_lang$core$Regex$regex('%(%|Y|y|m|B|b|d|e|a|A|H|k|I|l|p|P|M|S)');
var _mgold$elm_date_format$Date_Format$localFormat = F3(
	function (loc, s, d) {
		return A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_mgold$elm_date_format$Date_Format$re,
			A2(_mgold$elm_date_format$Date_Format$formatToken, loc, d),
			s);
	});
var _mgold$elm_date_format$Date_Format$format = F2(
	function (s, d) {
		return A3(_mgold$elm_date_format$Date_Format$localFormat, _mgold$elm_date_format$Date_Local$international, s, d);
	});
var _mgold$elm_date_format$Date_Format$formatISO8601 = _mgold$elm_date_format$Date_Format$format('%Y-%m-%dT%H:%M:%SZ');

var _mgold$elm_date_format$Time_Format$format = F2(
	function (s, t) {
		return A2(
			_mgold$elm_date_format$Date_Format$format,
			s,
			_elm_lang$core$Date$fromTime(t));
	});

var _ohanhi$remotedata_http$RemoteData_Http$queryEscape = function (string) {
	return A2(
		_elm_lang$core$String$join,
		'+',
		A2(
			_elm_lang$core$String$split,
			'%20',
			_elm_lang$http$Http$encodeUri(string)));
};
var _ohanhi$remotedata_http$RemoteData_Http$queryPair = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_ohanhi$remotedata_http$RemoteData_Http$queryEscape(_p1._0),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'=',
			_ohanhi$remotedata_http$RemoteData_Http$queryEscape(_p1._1)));
};
var _ohanhi$remotedata_http$RemoteData_Http$url = F2(
	function (baseUrl, args) {
		var _p2 = args;
		if (_p2.ctor === '[]') {
			return baseUrl;
		} else {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				baseUrl,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'?',
					A2(
						_elm_lang$core$String$join,
						'&',
						A2(_elm_lang$core$List$map, _ohanhi$remotedata_http$RemoteData_Http$queryPair, args))));
		}
	});
var _ohanhi$remotedata_http$RemoteData_Http$defaultConfig = {
	headers: {ctor: '[]'},
	withCredentials: false,
	timeout: _elm_lang$core$Maybe$Nothing
};
var _ohanhi$remotedata_http$RemoteData_Http$request = F5(
	function (config, method, url, successDecoder, body) {
		return _elm_lang$http$Http$request(
			{
				method: method,
				headers: config.headers,
				url: url,
				body: body,
				expect: _elm_lang$http$Http$expectJson(successDecoder),
				timeout: config.timeout,
				withCredentials: config.withCredentials
			});
	});
var _ohanhi$remotedata_http$RemoteData_Http$getRequest = F3(
	function (config, url, decoder) {
		return A5(_ohanhi$remotedata_http$RemoteData_Http$request, config, 'GET', url, decoder, _elm_lang$http$Http$emptyBody);
	});
var _ohanhi$remotedata_http$RemoteData_Http$toTask = function (request) {
	return A2(
		_elm_lang$core$Task$onError,
		function (_p3) {
			return _elm_lang$core$Task$succeed(
				_krisajenkins$remotedata$RemoteData$Failure(_p3));
		},
		A2(
			_elm_lang$core$Task$map,
			_krisajenkins$remotedata$RemoteData$Success,
			_elm_lang$http$Http$toTask(request)));
};
var _ohanhi$remotedata_http$RemoteData_Http$getTaskWithConfig = F3(
	function (config, url, decoder) {
		return _ohanhi$remotedata_http$RemoteData_Http$toTask(
			A3(_ohanhi$remotedata_http$RemoteData_Http$getRequest, config, url, decoder));
	});
var _ohanhi$remotedata_http$RemoteData_Http$postTaskWithConfig = F4(
	function (config, url, decoder, body) {
		return _ohanhi$remotedata_http$RemoteData_Http$toTask(
			A5(
				_ohanhi$remotedata_http$RemoteData_Http$request,
				config,
				'POST',
				url,
				decoder,
				_elm_lang$http$Http$jsonBody(body)));
	});
var _ohanhi$remotedata_http$RemoteData_Http$postTask = _ohanhi$remotedata_http$RemoteData_Http$postTaskWithConfig(_ohanhi$remotedata_http$RemoteData_Http$defaultConfig);
var _ohanhi$remotedata_http$RemoteData_Http$putTaskWithConfig = F4(
	function (config, url, decoder, body) {
		return _ohanhi$remotedata_http$RemoteData_Http$toTask(
			A5(
				_ohanhi$remotedata_http$RemoteData_Http$request,
				config,
				'PUT',
				url,
				decoder,
				_elm_lang$http$Http$jsonBody(body)));
	});
var _ohanhi$remotedata_http$RemoteData_Http$putTask = _ohanhi$remotedata_http$RemoteData_Http$putTaskWithConfig(_ohanhi$remotedata_http$RemoteData_Http$defaultConfig);
var _ohanhi$remotedata_http$RemoteData_Http$patchTaskWithConfig = F4(
	function (config, url, decoder, body) {
		return _ohanhi$remotedata_http$RemoteData_Http$toTask(
			A5(
				_ohanhi$remotedata_http$RemoteData_Http$request,
				config,
				'PATCH',
				url,
				decoder,
				_elm_lang$http$Http$jsonBody(body)));
	});
var _ohanhi$remotedata_http$RemoteData_Http$patchTask = _ohanhi$remotedata_http$RemoteData_Http$patchTaskWithConfig(_ohanhi$remotedata_http$RemoteData_Http$defaultConfig);
var _ohanhi$remotedata_http$RemoteData_Http$deleteTaskWithConfig = F3(
	function (config, url, body) {
		return _ohanhi$remotedata_http$RemoteData_Http$toTask(
			_elm_lang$http$Http$request(
				{
					method: 'DELETE',
					headers: config.headers,
					url: url,
					body: _elm_lang$http$Http$jsonBody(body),
					expect: _elm_lang$http$Http$expectString,
					timeout: config.timeout,
					withCredentials: config.withCredentials
				}));
	});
var _ohanhi$remotedata_http$RemoteData_Http$deleteTask = _ohanhi$remotedata_http$RemoteData_Http$deleteTaskWithConfig(_ohanhi$remotedata_http$RemoteData_Http$defaultConfig);
var _ohanhi$remotedata_http$RemoteData_Http$toCmd = function (tagger) {
	return _elm_lang$http$Http$send(
		function (_p4) {
			return tagger(
				_krisajenkins$remotedata$RemoteData$fromResult(_p4));
		});
};
var _ohanhi$remotedata_http$RemoteData_Http$getWithConfig = F4(
	function (config, url, tagger, decoder) {
		return A2(
			_ohanhi$remotedata_http$RemoteData_Http$toCmd,
			tagger,
			A3(_ohanhi$remotedata_http$RemoteData_Http$getRequest, config, url, decoder));
	});
var _ohanhi$remotedata_http$RemoteData_Http$postWithConfig = F5(
	function (config, url, tagger, decoder, body) {
		return A2(
			_ohanhi$remotedata_http$RemoteData_Http$toCmd,
			tagger,
			A5(
				_ohanhi$remotedata_http$RemoteData_Http$request,
				config,
				'POST',
				url,
				decoder,
				_elm_lang$http$Http$jsonBody(body)));
	});
var _ohanhi$remotedata_http$RemoteData_Http$post = _ohanhi$remotedata_http$RemoteData_Http$postWithConfig(_ohanhi$remotedata_http$RemoteData_Http$defaultConfig);
var _ohanhi$remotedata_http$RemoteData_Http$putWithConfig = F5(
	function (config, url, tagger, decoder, body) {
		return A2(
			_ohanhi$remotedata_http$RemoteData_Http$toCmd,
			tagger,
			A5(
				_ohanhi$remotedata_http$RemoteData_Http$request,
				config,
				'PUT',
				url,
				decoder,
				_elm_lang$http$Http$jsonBody(body)));
	});
var _ohanhi$remotedata_http$RemoteData_Http$put = _ohanhi$remotedata_http$RemoteData_Http$putWithConfig(_ohanhi$remotedata_http$RemoteData_Http$defaultConfig);
var _ohanhi$remotedata_http$RemoteData_Http$patchWithConfig = F5(
	function (config, url, tagger, decoder, body) {
		return A2(
			_ohanhi$remotedata_http$RemoteData_Http$toCmd,
			tagger,
			A5(
				_ohanhi$remotedata_http$RemoteData_Http$request,
				config,
				'PATCH',
				url,
				decoder,
				_elm_lang$http$Http$jsonBody(body)));
	});
var _ohanhi$remotedata_http$RemoteData_Http$patch = _ohanhi$remotedata_http$RemoteData_Http$patchWithConfig(_ohanhi$remotedata_http$RemoteData_Http$defaultConfig);
var _ohanhi$remotedata_http$RemoteData_Http$deleteWithConfig = F4(
	function (config, url, tagger, body) {
		return A2(
			_ohanhi$remotedata_http$RemoteData_Http$toCmd,
			tagger,
			_elm_lang$http$Http$request(
				{
					method: 'DELETE',
					headers: config.headers,
					url: url,
					body: _elm_lang$http$Http$jsonBody(body),
					expect: _elm_lang$http$Http$expectString,
					timeout: config.timeout,
					withCredentials: config.withCredentials
				}));
	});
var _ohanhi$remotedata_http$RemoteData_Http$delete = _ohanhi$remotedata_http$RemoteData_Http$deleteWithConfig(_ohanhi$remotedata_http$RemoteData_Http$defaultConfig);
var _ohanhi$remotedata_http$RemoteData_Http$noCache = A2(_elm_lang$http$Http$header, 'Cache-Control', 'no-store, must-revalidate, no-cache, max-age=0');
var _ohanhi$remotedata_http$RemoteData_Http$noCacheConfig = _elm_lang$core$Native_Utils.update(
	_ohanhi$remotedata_http$RemoteData_Http$defaultConfig,
	{
		headers: {
			ctor: '::',
			_0: _ohanhi$remotedata_http$RemoteData_Http$noCache,
			_1: {ctor: '[]'}
		}
	});
var _ohanhi$remotedata_http$RemoteData_Http$getTask = _ohanhi$remotedata_http$RemoteData_Http$getTaskWithConfig(_ohanhi$remotedata_http$RemoteData_Http$noCacheConfig);
var _ohanhi$remotedata_http$RemoteData_Http$get = _ohanhi$remotedata_http$RemoteData_Http$getWithConfig(_ohanhi$remotedata_http$RemoteData_Http$noCacheConfig);
var _ohanhi$remotedata_http$RemoteData_Http$Config = F3(
	function (a, b, c) {
		return {headers: a, withCredentials: b, timeout: c};
	});

var _user$project$Icons$swap = function (floatSize) {
	var size = _elm_lang$core$Basics$toString(
		_elm_lang$core$Basics$round(floatSize));
	return A2(
		_elm_lang$svg$Svg$svg,
		{
			ctor: '::',
			_0: _elm_lang$svg$Svg_Attributes$viewBox('0 0 13 13'),
			_1: {
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$width(size),
				_1: {
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$height(size),
					_1: {ctor: '[]'}
				}
			}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$svg$Svg$path,
				{
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$strokeWidth('0.7'),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$strokeLinecap('round'),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$stroke('#babdb6'),
							_1: {
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$fill('none'),
								_1: {
									ctor: '::',
									_0: _elm_lang$svg$Svg_Attributes$d(
										A2(_elm_lang$core$Basics_ops['++'], 'M4 2 v10 M2 4 L4 2 M6 4 L4 2', 'M8 12 v-10 M6 10 L8 12 M10 10 L8 12')),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				},
				{ctor: '[]'}),
			_1: {ctor: '[]'}
		});
};

var _user$project$Model$dateDecoder = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (a) {
		var _p0 = _elm_lang$core$Date$fromString(a);
		if (_p0.ctor === 'Ok') {
			return _elm_lang$core$Json_Decode$succeed(_p0._0);
		} else {
			return _elm_lang$core$Json_Decode$fail(_p0._0);
		}
	},
	_elm_lang$core$Json_Decode$string);
var _user$project$Model$sortedTrainList = function (trains) {
	return A2(
		_elm_lang$core$List$sortBy,
		function (_p1) {
			return _mgold$elm_date_format$Date_Format$formatISO8601(
				function (_) {
					return _.departingFromStation;
				}(_p1));
		},
		_elm_lang$core$Dict$values(trains));
};
var _user$project$Model$stationsDecoder = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (_p2) {
		return _elm_lang$core$Json_Decode$succeed(
			_elm_lang$core$Dict$fromList(_p2));
	},
	_elm_lang$core$Json_Decode$list(
		A3(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
			'stationName',
			A2(
				_elm_lang$core$Json_Decode$map,
				function (a) {
					return A2(_elm_lang$core$String$endsWith, ' asema', a) ? A2(_elm_lang$core$String$dropRight, 6, a) : a;
				},
				_elm_lang$core$Json_Decode$string),
			A3(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
				'stationShortCode',
				_elm_lang$core$Json_Decode$string,
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}))))));
var _user$project$Model_ops = _user$project$Model_ops || {};
_user$project$Model_ops['=>'] = F2(
	function (v0, v1) {
		return {ctor: '_Tuple2', _0: v0, _1: v1};
	});
var _user$project$Model$Model = F5(
	function (a, b, c, d, e) {
		return {trains: a, stations: b, currentTime: c, lastRequestTime: d, route: e};
	});
var _user$project$Model$Train = F5(
	function (a, b, c, d, e) {
		return {trainNumber: a, lineId: b, timetableRows: c, cancelled: d, departingFromStation: e};
	});
var _user$project$Model$TrainRaw = F5(
	function (a, b, c, d, e) {
		return {trainNumber: a, lineId: b, trainCategory: c, timetableRows: d, cancelled: e};
	});
var _user$project$Model$TimetableRow = F8(
	function (a, b, c, d, e, f, g, h) {
		return {scheduledTime: a, trainStopping: b, stationShortCode: c, stationUICCode: d, rowType: e, actualTime: f, liveEstimateTime: g, differenceInMinutes: h};
	});
var _user$project$Model$ScheduleRoute = F2(
	function (a, b) {
		return {ctor: 'ScheduleRoute', _0: a, _1: b};
	});
var _user$project$Model$SelectDestRoute = function (a) {
	return {ctor: 'SelectDestRoute', _0: a};
};
var _user$project$Model$SelectDepRoute = {ctor: 'SelectDepRoute'};
var _user$project$Model$Arrival = {ctor: 'Arrival'};
var _user$project$Model$Departure = {ctor: 'Departure'};
var _user$project$Model$toTrain = F2(
	function (_p4, _p3) {
		var _p5 = _p4;
		var _p9 = _p5._0;
		var _p6 = _p3;
		var _p8 = _p6.timetableRows;
		var departingFromStation = _elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$filterMap,
				function (a) {
					return (_elm_lang$core$Native_Utils.eq(a.stationShortCode, _p9) && _elm_lang$core$Native_Utils.eq(a.rowType, _user$project$Model$Departure)) ? _elm_lang$core$Maybe$Just(a.scheduledTime) : _elm_lang$core$Maybe$Nothing;
				},
				_p8));
		var rightDirection = function (rows) {
			var arrivalTimes = A2(
				_elm_lang$core$List$filterMap,
				function (row) {
					return (_elm_lang$core$Native_Utils.eq(row.stationShortCode, _p5._1) && _elm_lang$core$Native_Utils.eq(row.rowType, _user$project$Model$Arrival)) ? _elm_lang$core$Maybe$Just(
						_mgold$elm_date_format$Date_Format$formatISO8601(row.scheduledTime)) : _elm_lang$core$Maybe$Nothing;
				},
				rows);
			var departureTime = _elm_lang$core$List$head(
				A2(
					_elm_lang$core$List$filterMap,
					function (row) {
						return (_elm_lang$core$Native_Utils.eq(row.stationShortCode, _p9) && _elm_lang$core$Native_Utils.eq(row.rowType, _user$project$Model$Departure)) ? _elm_lang$core$Maybe$Just(
							_mgold$elm_date_format$Date_Format$formatISO8601(row.scheduledTime)) : _elm_lang$core$Maybe$Nothing;
					},
					rows));
			return A2(
				_elm_lang$core$Maybe$withDefault,
				false,
				A2(
					_elm_lang$core$Maybe$map,
					function (dep) {
						return A2(
							_elm_lang$core$List$any,
							function (arr) {
								return _elm_lang$core$Native_Utils.cmp(arr, dep) > 0;
							},
							arrivalTimes);
					},
					departureTime));
		}(
			A2(
				_elm_lang$core$List$filter,
				function (_) {
					return _.trainStopping;
				},
				_p8));
		return (_elm_lang$core$Native_Utils.eq(_p6.trainCategory, 'Commuter') && rightDirection) ? A2(
			_elm_lang$core$Maybe$withDefault,
			_elm_lang$core$Json_Decode$succeed(_elm_lang$core$Maybe$Nothing),
			A2(
				_elm_lang$core$Maybe$map,
				function (_p7) {
					return _elm_lang$core$Json_Decode$succeed(
						_elm_lang$core$Maybe$Just(
							A5(_user$project$Model$Train, _p6.trainNumber, _p6.lineId, _p8, _p6.cancelled, _p7)));
				},
				departingFromStation)) : _elm_lang$core$Json_Decode$succeed(_elm_lang$core$Maybe$Nothing);
	});
var _user$project$Model$rowTypeDecoder = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (a) {
		var _p10 = a;
		switch (_p10) {
			case 'ARRIVAL':
				return _elm_lang$core$Json_Decode$succeed(_user$project$Model$Arrival);
			case 'DEPARTURE':
				return _elm_lang$core$Json_Decode$succeed(_user$project$Model$Departure);
			default:
				return _elm_lang$core$Json_Decode$fail(
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\"',
						A2(_elm_lang$core$Basics_ops['++'], _p10, '\" is not a valid row type')));
		}
	},
	_elm_lang$core$Json_Decode$string);
var _user$project$Model$timetableRowsDecoder = _elm_lang$core$Json_Decode$list(
	A4(
		_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optional,
		'differenceInMinutes',
		_elm_lang$core$Json_Decode$maybe(_elm_lang$core$Json_Decode$int),
		_elm_lang$core$Maybe$Nothing,
		A4(
			_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optional,
			'liveEstimateTime',
			_elm_lang$core$Json_Decode$maybe(_user$project$Model$dateDecoder),
			_elm_lang$core$Maybe$Nothing,
			A4(
				_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$optional,
				'actualTime',
				_elm_lang$core$Json_Decode$maybe(_user$project$Model$dateDecoder),
				_elm_lang$core$Maybe$Nothing,
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'type',
					_user$project$Model$rowTypeDecoder,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'stationUICCode',
						_elm_lang$core$Json_Decode$int,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'stationShortCode',
							_elm_lang$core$Json_Decode$string,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'trainStopping',
								_elm_lang$core$Json_Decode$bool,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'scheduledTime',
									_user$project$Model$dateDecoder,
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model$TimetableRow))))))))));
var _user$project$Model$trainsDecoder = function (targets) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		function (_p11) {
			return _elm_lang$core$Json_Decode$succeed(
				_elm_lang$core$Dict$fromList(
					A2(
						_elm_lang$core$List$map,
						function (a) {
							return {ctor: '_Tuple2', _0: a.trainNumber, _1: a};
						},
						A2(_elm_lang$core$List$filterMap, _elm_lang$core$Basics$identity, _p11))));
		},
		_elm_lang$core$Json_Decode$list(
			A2(
				_elm_lang$core$Json_Decode$andThen,
				_user$project$Model$toTrain(targets),
				A3(
					_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
					'cancelled',
					_elm_lang$core$Json_Decode$bool,
					A3(
						_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
						'timeTableRows',
						_user$project$Model$timetableRowsDecoder,
						A3(
							_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
							'trainCategory',
							_elm_lang$core$Json_Decode$string,
							A3(
								_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
								'commuterLineID',
								_elm_lang$core$Json_Decode$string,
								A3(
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$required,
									'trainNumber',
									_elm_lang$core$Json_Decode$int,
									_NoRedInk$elm_decode_pipeline$Json_Decode_Pipeline$decode(_user$project$Model$TrainRaw)))))))));
};

var _user$project$Stations_ops = _user$project$Stations_ops || {};
_user$project$Stations_ops['=>'] = F2(
	function (v0, v1) {
		return {ctor: '_Tuple2', _0: v0, _1: v1};
	});
var _user$project$Stations$common = {
	ctor: '::',
	_0: A2(_user$project$Stations_ops['=>'], 'HKI', 'Helsinki'),
	_1: {
		ctor: '::',
		_0: A2(_user$project$Stations_ops['=>'], 'PSL', 'Pasila'),
		_1: {ctor: '[]'}
	}
};
var _user$project$Stations$directionSiuntio = {
	ctor: '::',
	_0: A2(_user$project$Stations_ops['=>'], 'ILA', 'Ilmala'),
	_1: {
		ctor: '::',
		_0: A2(_user$project$Stations_ops['=>'], 'HPL', 'Huopalahti'),
		_1: {
			ctor: '::',
			_0: A2(_user$project$Stations_ops['=>'], 'VMO', 'Valimo'),
			_1: {
				ctor: '::',
				_0: A2(_user$project$Stations_ops['=>'], 'PJM', 'Pitäjänmäki'),
				_1: {
					ctor: '::',
					_0: A2(_user$project$Stations_ops['=>'], 'MÄK', 'Mäkkylä'),
					_1: {
						ctor: '::',
						_0: A2(_user$project$Stations_ops['=>'], 'LPV', 'Leppävaara'),
						_1: {
							ctor: '::',
							_0: A2(_user$project$Stations_ops['=>'], 'KIL', 'Kilo'),
							_1: {
								ctor: '::',
								_0: A2(_user$project$Stations_ops['=>'], 'KEA', 'Kera'),
								_1: {
									ctor: '::',
									_0: A2(_user$project$Stations_ops['=>'], 'KNI', 'Kauniainen'),
									_1: {
										ctor: '::',
										_0: A2(_user$project$Stations_ops['=>'], 'KVH', 'Koivuhovi'),
										_1: {
											ctor: '::',
											_0: A2(_user$project$Stations_ops['=>'], 'TRL', 'Tuomarila'),
											_1: {
												ctor: '::',
												_0: A2(_user$project$Stations_ops['=>'], 'EPO', 'Espoo'),
												_1: {
													ctor: '::',
													_0: A2(_user$project$Stations_ops['=>'], 'KLH', 'Kauklahti'),
													_1: {
														ctor: '::',
														_0: A2(_user$project$Stations_ops['=>'], 'MAS', 'Masala'),
														_1: {
															ctor: '::',
															_0: A2(_user$project$Stations_ops['=>'], 'JRS', 'Jorvas'),
															_1: {
																ctor: '::',
																_0: A2(_user$project$Stations_ops['=>'], 'TOL', 'Tolsa'),
																_1: {
																	ctor: '::',
																	_0: A2(_user$project$Stations_ops['=>'], 'KKN', 'Kirkkonummi'),
																	_1: {
																		ctor: '::',
																		_0: A2(_user$project$Stations_ops['=>'], 'STI', 'Siuntio'),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _user$project$Stations$ringTrackCW = {
	ctor: '::',
	_0: A2(_user$project$Stations_ops['=>'], 'ILA', 'Ilmala'),
	_1: {
		ctor: '::',
		_0: A2(_user$project$Stations_ops['=>'], 'HPL', 'Huopalahti'),
		_1: {
			ctor: '::',
			_0: A2(_user$project$Stations_ops['=>'], 'POH', 'Pohjois-Haaga'),
			_1: {
				ctor: '::',
				_0: A2(_user$project$Stations_ops['=>'], 'KAN', 'Kannelmäki'),
				_1: {
					ctor: '::',
					_0: A2(_user$project$Stations_ops['=>'], 'MLO', 'Malminkartano'),
					_1: {
						ctor: '::',
						_0: A2(_user$project$Stations_ops['=>'], 'MYR', 'Myyrmäki'),
						_1: {
							ctor: '::',
							_0: A2(_user$project$Stations_ops['=>'], 'LOH', 'Louhela'),
							_1: {
								ctor: '::',
								_0: A2(_user$project$Stations_ops['=>'], 'MRL', 'Martinlaakso'),
								_1: {
									ctor: '::',
									_0: A2(_user$project$Stations_ops['=>'], 'VKS', 'Vantaankoski'),
									_1: {
										ctor: '::',
										_0: A2(_user$project$Stations_ops['=>'], 'VEH', 'Vehkala'),
										_1: {
											ctor: '::',
											_0: A2(_user$project$Stations_ops['=>'], 'KTÖ', 'Kivistö'),
											_1: {
												ctor: '::',
												_0: A2(_user$project$Stations_ops['=>'], 'AVP', 'Aviapolis'),
												_1: {
													ctor: '::',
													_0: A2(_user$project$Stations_ops['=>'], 'LEN', 'Lentoasema (Airport)'),
													_1: {
														ctor: '::',
														_0: A2(_user$project$Stations_ops['=>'], 'LNÄ', 'Leinelä'),
														_1: {
															ctor: '::',
															_0: A2(_user$project$Stations_ops['=>'], 'HKH', 'Hiekkaharju'),
															_1: {
																ctor: '::',
																_0: A2(_user$project$Stations_ops['=>'], 'TKL', 'Tikkurila'),
																_1: {
																	ctor: '::',
																	_0: A2(_user$project$Stations_ops['=>'], 'PLA', 'Puistola'),
																	_1: {
																		ctor: '::',
																		_0: A2(_user$project$Stations_ops['=>'], 'TNA', 'Tapanila'),
																		_1: {
																			ctor: '::',
																			_0: A2(_user$project$Stations_ops['=>'], 'ML', 'Malmi'),
																			_1: {
																				ctor: '::',
																				_0: A2(_user$project$Stations_ops['=>'], 'PMK', 'Pukinmäki'),
																				_1: {
																					ctor: '::',
																					_0: A2(_user$project$Stations_ops['=>'], 'OLK', 'Oulunkylä'),
																					_1: {
																						ctor: '::',
																						_0: A2(_user$project$Stations_ops['=>'], 'KÄP', 'Käpylä'),
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _user$project$Stations$ringTrackCCW = _elm_lang$core$List$reverse(_user$project$Stations$ringTrackCW);
var _user$project$Stations$directionTampere = {
	ctor: '::',
	_0: A2(_user$project$Stations_ops['=>'], 'KÄP', 'Käpylä'),
	_1: {
		ctor: '::',
		_0: A2(_user$project$Stations_ops['=>'], 'OLK', 'Oulunkylä'),
		_1: {
			ctor: '::',
			_0: A2(_user$project$Stations_ops['=>'], 'PMK', 'Pukinmäki'),
			_1: {
				ctor: '::',
				_0: A2(_user$project$Stations_ops['=>'], 'ML', 'Malmi'),
				_1: {
					ctor: '::',
					_0: A2(_user$project$Stations_ops['=>'], 'TNA', 'Tapanila'),
					_1: {
						ctor: '::',
						_0: A2(_user$project$Stations_ops['=>'], 'PLA', 'Puistola'),
						_1: {
							ctor: '::',
							_0: A2(_user$project$Stations_ops['=>'], 'TKL', 'Tikkurila'),
							_1: {
								ctor: '::',
								_0: A2(_user$project$Stations_ops['=>'], 'HKH', 'Hiekkaharju'),
								_1: {
									ctor: '::',
									_0: A2(_user$project$Stations_ops['=>'], 'KVY', 'Koivukylä'),
									_1: {
										ctor: '::',
										_0: A2(_user$project$Stations_ops['=>'], 'RKL', 'Rekola'),
										_1: {
											ctor: '::',
											_0: A2(_user$project$Stations_ops['=>'], 'KRS', 'Korso'),
											_1: {
												ctor: '::',
												_0: A2(_user$project$Stations_ops['=>'], 'SAV', 'Savio'),
												_1: {
													ctor: '::',
													_0: A2(_user$project$Stations_ops['=>'], 'KE', 'Kerava'),
													_1: {
														ctor: '::',
														_0: A2(_user$project$Stations_ops['=>'], 'AIN', 'Ainola'),
														_1: {
															ctor: '::',
															_0: A2(_user$project$Stations_ops['=>'], 'JP', 'Järvenpää'),
															_1: {
																ctor: '::',
																_0: A2(_user$project$Stations_ops['=>'], 'SAU', 'Saunakallio'),
																_1: {
																	ctor: '::',
																	_0: A2(_user$project$Stations_ops['=>'], 'JK', 'Jokela'),
																	_1: {
																		ctor: '::',
																		_0: A2(_user$project$Stations_ops['=>'], 'HY', 'Hyvinkää'),
																		_1: {
																			ctor: '::',
																			_0: A2(_user$project$Stations_ops['=>'], 'RI', 'Riihimäki'),
																			_1: {
																				ctor: '::',
																				_0: A2(_user$project$Stations_ops['=>'], 'RY', 'Ryttylä'),
																				_1: {
																					ctor: '::',
																					_0: A2(_user$project$Stations_ops['=>'], 'TU', 'Turenki'),
																					_1: {
																						ctor: '::',
																						_0: A2(_user$project$Stations_ops['=>'], 'HL', 'Hämeenlinna'),
																						_1: {
																							ctor: '::',
																							_0: A2(_user$project$Stations_ops['=>'], 'PRL', 'Parola'),
																							_1: {
																								ctor: '::',
																								_0: A2(_user$project$Stations_ops['=>'], 'ITA', 'Iittala'),
																								_1: {
																									ctor: '::',
																									_0: A2(_user$project$Stations_ops['=>'], 'TL', 'Toijala'),
																									_1: {
																										ctor: '::',
																										_0: A2(_user$project$Stations_ops['=>'], 'VIA', 'Viiala'),
																										_1: {
																											ctor: '::',
																											_0: A2(_user$project$Stations_ops['=>'], 'LPÄ', 'Lempäälä'),
																											_1: {
																												ctor: '::',
																												_0: A2(_user$project$Stations_ops['=>'], 'TPE', 'Tampere'),
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _user$project$Stations$directionLahti = {
	ctor: '::',
	_0: A2(_user$project$Stations_ops['=>'], 'KÄP', 'Käpylä'),
	_1: {
		ctor: '::',
		_0: A2(_user$project$Stations_ops['=>'], 'OLK', 'Oulunkylä'),
		_1: {
			ctor: '::',
			_0: A2(_user$project$Stations_ops['=>'], 'PMK', 'Pukinmäki'),
			_1: {
				ctor: '::',
				_0: A2(_user$project$Stations_ops['=>'], 'ML', 'Malmi'),
				_1: {
					ctor: '::',
					_0: A2(_user$project$Stations_ops['=>'], 'TNA', 'Tapanila'),
					_1: {
						ctor: '::',
						_0: A2(_user$project$Stations_ops['=>'], 'PLA', 'Puistola'),
						_1: {
							ctor: '::',
							_0: A2(_user$project$Stations_ops['=>'], 'TKL', 'Tikkurila'),
							_1: {
								ctor: '::',
								_0: A2(_user$project$Stations_ops['=>'], 'HKH', 'Hiekkaharju'),
								_1: {
									ctor: '::',
									_0: A2(_user$project$Stations_ops['=>'], 'KVY', 'Koivukylä'),
									_1: {
										ctor: '::',
										_0: A2(_user$project$Stations_ops['=>'], 'RKL', 'Rekola'),
										_1: {
											ctor: '::',
											_0: A2(_user$project$Stations_ops['=>'], 'KRS', 'Korso'),
											_1: {
												ctor: '::',
												_0: A2(_user$project$Stations_ops['=>'], 'SAV', 'Savio'),
												_1: {
													ctor: '::',
													_0: A2(_user$project$Stations_ops['=>'], 'KE', 'Kerava'),
													_1: {
														ctor: '::',
														_0: A2(_user$project$Stations_ops['=>'], 'HAA', 'Haarajoki'),
														_1: {
															ctor: '::',
															_0: A2(_user$project$Stations_ops['=>'], 'MLÄ', 'Mäntsälä'),
															_1: {
																ctor: '::',
																_0: A2(_user$project$Stations_ops['=>'], 'HNN', 'Henna'),
																_1: {
																	ctor: '::',
																	_0: A2(_user$project$Stations_ops['=>'], 'LH', 'Lahti'),
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _user$project$Stations$commuterStations = {
	ctor: '::',
	_0: A2(_elm_lang$core$Basics_ops['++'], _user$project$Stations$common, _user$project$Stations$directionSiuntio),
	_1: {
		ctor: '::',
		_0: A2(_elm_lang$core$Basics_ops['++'], _user$project$Stations$common, _user$project$Stations$ringTrackCW),
		_1: {
			ctor: '::',
			_0: A2(_elm_lang$core$Basics_ops['++'], _user$project$Stations$common, _user$project$Stations$directionTampere),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Basics_ops['++'], _user$project$Stations$common, _user$project$Stations$directionLahti),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _user$project$Stations$all = _elm_lang$core$Dict$toList(
	_elm_lang$core$Dict$fromList(
		_elm_lang$core$List$concat(_user$project$Stations$commuterStations)));
var _user$project$Stations$findName = function (abbreviation) {
	return A2(
		_elm_lang$core$Dict$get,
		abbreviation,
		_elm_lang$core$Dict$fromList(
			_elm_lang$core$List$concat(_user$project$Stations$commuterStations)));
};
var _user$project$Stations$matching = function (abbreviation) {
	return _elm_lang$core$Dict$toList(
		A2(
			_elm_lang$core$Dict$remove,
			abbreviation,
			_elm_lang$core$Dict$fromList(
				_elm_lang$core$List$concat(
					A2(
						_elm_lang$core$List$filter,
						function (track) {
							return A2(
								_elm_lang$core$Maybe$withDefault,
								false,
								A2(
									_elm_lang$core$Maybe$map,
									function (_p0) {
										return true;
									},
									_elm_lang$core$List$head(
										A2(
											_elm_lang$core$List$filter,
											function (_p1) {
												var _p2 = _p1;
												return _elm_lang$core$Native_Utils.eq(abbreviation, _p2._0);
											},
											track))));
						},
						_user$project$Stations$commuterStations)))));
};

var _user$project$View$prettyTime = _mgold$elm_date_format$Date_Format$format('%H.%M');
var _user$project$View$formatDifference = F2(
	function ($default, differenceInMinutes) {
		var stringify = function (n) {
			return _elm_lang$core$Native_Utils.eq(n, 0) ? _elm_lang$core$Maybe$Nothing : ((_elm_lang$core$Native_Utils.cmp(n, 0) < 0) ? _elm_lang$core$Maybe$Just(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(
						_elm_lang$core$Basics$abs(n)),
					' min early')) : _elm_lang$core$Maybe$Just(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(n),
					' min late')));
		};
		return A2(
			_elm_lang$core$Maybe$withDefault,
			$default,
			A2(_elm_lang$core$Maybe$andThen, stringify, differenceInMinutes));
	});
var _user$project$View$stationName = F2(
	function (stations, shortCode) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			shortCode,
			A2(_elm_lang$core$Dict$get, shortCode, stations));
	});
var _user$project$View$rem = function (x) {
	return x * 16;
};
var _user$project$View$ts = function (scale) {
	return Math.pow(
		1.33,
		_elm_lang$core$Basics$toFloat(scale)) * _user$project$View$rem(1);
};
var _user$project$View$timeWidth = _user$project$View$rem(3);
var _user$project$View$UrlChange = function (a) {
	return {ctor: 'UrlChange', _0: a};
};
var _user$project$View$StationsResponse = function (a) {
	return {ctor: 'StationsResponse', _0: a};
};
var _user$project$View$TrainsResponse = function (a) {
	return {ctor: 'TrainsResponse', _0: a};
};
var _user$project$View$UpdateTime = function (a) {
	return {ctor: 'UpdateTime', _0: a};
};
var _user$project$View$StatusInfo = {ctor: 'StatusInfo'};
var _user$project$View$StationDifference = {ctor: 'StationDifference'};
var _user$project$View$StationName = {ctor: 'StationName'};
var _user$project$View$StationTimeShouldBe = {ctor: 'StationTimeShouldBe'};
var _user$project$View$StationTime = {ctor: 'StationTime'};
var _user$project$View$HeadingSwap = {ctor: 'HeadingSwap'};
var _user$project$View$HeadingBack = {ctor: 'HeadingBack'};
var _user$project$View$Heading = {ctor: 'Heading'};
var _user$project$View$TimetableRowCurrent = {ctor: 'TimetableRowCurrent'};
var _user$project$View$TimetableRow = {ctor: 'TimetableRow'};
var _user$project$View$TrainArrivingTime = {ctor: 'TrainArrivingTime'};
var _user$project$View$TrainArrivingIn = {ctor: 'TrainArrivingIn'};
var _user$project$View$TrainLineId = {ctor: 'TrainLineId'};
var _user$project$View$TrainRow = {ctor: 'TrainRow'};
var _user$project$View$Trains = {ctor: 'Trains'};
var _user$project$View$Main = {ctor: 'Main'};
var _user$project$View$None = {ctor: 'None'};
var _user$project$View$selectDepView = function (model) {
	return A3(
		_mdgriffith$style_elements$Element$column,
		_user$project$View$None,
		{
			ctor: '::',
			_0: _mdgriffith$style_elements$Element_Attributes$spacing(
				_user$project$View$rem(1)),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A3(
				_mdgriffith$style_elements$Element$el,
				_user$project$View$Heading,
				{ctor: '[]'},
				_mdgriffith$style_elements$Element$text('Select departure')),
			_1: {
				ctor: '::',
				_0: A3(
					_mdgriffith$style_elements$Element$column,
					_user$project$View$None,
					{ctor: '[]'},
					A2(
						_elm_lang$core$List$map,
						function (_p0) {
							var _p1 = _p0;
							return A2(
								_mdgriffith$style_elements$Element$link,
								A2(_elm_lang$core$Basics_ops['++'], '#', _p1._0),
								A3(
									_mdgriffith$style_elements$Element$el,
									_user$project$View$None,
									{ctor: '[]'},
									_mdgriffith$style_elements$Element$text(_p1._1)));
						},
						_user$project$Stations$all)),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$View$selectDestView = F2(
	function (model, dep) {
		var linkText = function (dest) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				dest,
				A2(
					_elm_lang$core$Maybe$map,
					function (name) {
						return A2(
							_elm_lang$core$Basics_ops['++'],
							name,
							A2(_elm_lang$core$Basics_ops['++'], '–', dest));
					},
					_user$project$Stations$findName(dep)));
		};
		var url = function (dest) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'#',
				A2(
					_elm_lang$core$Basics_ops['++'],
					dep,
					A2(_elm_lang$core$Basics_ops['++'], '/', dest)));
		};
		return A3(
			_mdgriffith$style_elements$Element$column,
			_user$project$View$None,
			{
				ctor: '::',
				_0: _mdgriffith$style_elements$Element_Attributes$spacing(
					_user$project$View$rem(1)),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A3(
					_mdgriffith$style_elements$Element$el,
					_user$project$View$Heading,
					{ctor: '[]'},
					_mdgriffith$style_elements$Element$text('Select destination')),
				_1: {
					ctor: '::',
					_0: A3(
						_mdgriffith$style_elements$Element$column,
						_user$project$View$None,
						{ctor: '[]'},
						A2(
							_elm_lang$core$List$map,
							function (_p2) {
								var _p3 = _p2;
								return A2(
									_mdgriffith$style_elements$Element$link,
									url(_p3._0),
									A3(
										_mdgriffith$style_elements$Element$el,
										_user$project$View$None,
										{ctor: '[]'},
										_mdgriffith$style_elements$Element$text(
											linkText(_p3._1))));
							},
							_user$project$Stations$matching(dep))),
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$View$Moving = {ctor: 'Moving'};
var _user$project$View$OffSchedule = {ctor: 'OffSchedule'};
var _user$project$View$SlightlyOffSchedule = {ctor: 'SlightlyOffSchedule'};
var _user$project$View$OnTime = {ctor: 'OnTime'};
var _user$project$View$stylesheet = function () {
	var shadow = _mdgriffith$style_elements$Style$shadows(
		{
			ctor: '::',
			_0: _mdgriffith$style_elements$Style_Shadow$box(
				{
					offset: {ctor: '_Tuple2', _0: 1, _1: 5},
					blur: 10,
					color: A4(_elm_lang$core$Color$rgba, 0, 0, 0, 0.1),
					size: 0
				}),
			_1: {ctor: '[]'}
		});
	var colors = {
		online: A3(_elm_lang$core$Color$rgb, 0, 205, 0),
		onTime: _elm_lang$core$Color$darkGreen,
		slightlyOffSchedule: _elm_lang$core$Color$orange,
		offSchedule: _elm_lang$core$Color$darkRed
	};
	return _mdgriffith$style_elements$Style$stylesheet(
		{
			ctor: '::',
			_0: A2(
				_mdgriffith$style_elements$Style$style,
				_user$project$View$None,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_mdgriffith$style_elements$Style$style,
					_user$project$View$Main,
					{
						ctor: '::',
						_0: _mdgriffith$style_elements$Style_Color$background(_elm_lang$core$Color$lightGray),
						_1: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Style_Font$typeface(
								{
									ctor: '::',
									_0: 'Roboto',
									_1: {
										ctor: '::',
										_0: 'sans-serif',
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Style_Font$lineHeight(1.5),
								_1: {
									ctor: '::',
									_0: _mdgriffith$style_elements$Style_Font$size(
										_user$project$View$ts(0)),
									_1: {ctor: '[]'}
								}
							}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_mdgriffith$style_elements$Style$style,
						_user$project$View$Trains,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_mdgriffith$style_elements$Style$style,
							_user$project$View$TrainRow,
							{
								ctor: '::',
								_0: _mdgriffith$style_elements$Style_Color$background(_elm_lang$core$Color$white),
								_1: {
									ctor: '::',
									_0: _mdgriffith$style_elements$Style_Font$pre,
									_1: {
										ctor: '::',
										_0: shadow,
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_mdgriffith$style_elements$Style$style,
								_user$project$View$TrainLineId,
								{
									ctor: '::',
									_0: _mdgriffith$style_elements$Style_Font$size(
										_user$project$View$ts(3)),
									_1: {
										ctor: '::',
										_0: _mdgriffith$style_elements$Style_Font$weight(600),
										_1: {
											ctor: '::',
											_0: _mdgriffith$style_elements$Style_Font$center,
											_1: {
												ctor: '::',
												_0: _mdgriffith$style_elements$Style_Font$lineHeight(1),
												_1: {
													ctor: '::',
													_0: _mdgriffith$style_elements$Style_Color$text(_elm_lang$core$Color$darkGray),
													_1: {
														ctor: '::',
														_0: A2(
															_mdgriffith$style_elements$Style$variation,
															_user$project$View$Moving,
															{
																ctor: '::',
																_0: _mdgriffith$style_elements$Style_Color$text(_elm_lang$core$Color$black),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_mdgriffith$style_elements$Style$style,
									_user$project$View$TrainArrivingIn,
									{
										ctor: '::',
										_0: _mdgriffith$style_elements$Style_Font$size(
											_user$project$View$ts(-1)),
										_1: {
											ctor: '::',
											_0: _mdgriffith$style_elements$Style_Font$center,
											_1: {
												ctor: '::',
												_0: _mdgriffith$style_elements$Style_Font$weight(600),
												_1: {
													ctor: '::',
													_0: _mdgriffith$style_elements$Style_Color$text(_elm_lang$core$Color$darkGray),
													_1: {ctor: '[]'}
												}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_mdgriffith$style_elements$Style$style,
										_user$project$View$TrainArrivingTime,
										{
											ctor: '::',
											_0: _mdgriffith$style_elements$Style_Font$size(
												_user$project$View$ts(2)),
											_1: {
												ctor: '::',
												_0: _mdgriffith$style_elements$Style_Font$center,
												_1: {
													ctor: '::',
													_0: _mdgriffith$style_elements$Style_Font$lineHeight(1),
													_1: {
														ctor: '::',
														_0: _mdgriffith$style_elements$Style_Color$text(_elm_lang$core$Color$darkGray),
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_mdgriffith$style_elements$Style$style,
											_user$project$View$TimetableRow,
											{
												ctor: '::',
												_0: _mdgriffith$style_elements$Style_Font$pre,
												_1: {
													ctor: '::',
													_0: _mdgriffith$style_elements$Style_Color$text(_elm_lang$core$Color$gray),
													_1: {ctor: '[]'}
												}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_mdgriffith$style_elements$Style$style,
												_user$project$View$TimetableRowCurrent,
												{
													ctor: '::',
													_0: _mdgriffith$style_elements$Style_Font$pre,
													_1: {
														ctor: '::',
														_0: _mdgriffith$style_elements$Style_Color$text(_elm_lang$core$Color$black),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_mdgriffith$style_elements$Style$style,
													_user$project$View$Heading,
													{
														ctor: '::',
														_0: _mdgriffith$style_elements$Style_Font$size(
															_user$project$View$ts(2)),
														_1: {
															ctor: '::',
															_0: _mdgriffith$style_elements$Style_Font$lineHeight(2),
															_1: {
																ctor: '::',
																_0: _mdgriffith$style_elements$Style_Color$text(_elm_lang$core$Color$black),
																_1: {ctor: '[]'}
															}
														}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_mdgriffith$style_elements$Style$style,
														_user$project$View$HeadingBack,
														{
															ctor: '::',
															_0: _mdgriffith$style_elements$Style_Color$text(_elm_lang$core$Color$black),
															_1: {
																ctor: '::',
																_0: _mdgriffith$style_elements$Style_Font$center,
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_mdgriffith$style_elements$Style$style,
															_user$project$View$HeadingSwap,
															{
																ctor: '::',
																_0: _mdgriffith$style_elements$Style_Color$text(_elm_lang$core$Color$darkGray),
																_1: {
																	ctor: '::',
																	_0: _mdgriffith$style_elements$Style_Font$center,
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_mdgriffith$style_elements$Style$style,
																_user$project$View$StationTime,
																{
																	ctor: '::',
																	_0: _mdgriffith$style_elements$Style_Font$center,
																	_1: {
																		ctor: '::',
																		_0: _mdgriffith$style_elements$Style_Font$weight(600),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_mdgriffith$style_elements$Style$variation,
																				_user$project$View$OnTime,
																				{
																					ctor: '::',
																					_0: _mdgriffith$style_elements$Style_Color$text(colors.onTime),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_mdgriffith$style_elements$Style$variation,
																					_user$project$View$SlightlyOffSchedule,
																					{
																						ctor: '::',
																						_0: _mdgriffith$style_elements$Style_Color$text(colors.slightlyOffSchedule),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_mdgriffith$style_elements$Style$variation,
																						_user$project$View$OffSchedule,
																						{
																							ctor: '::',
																							_0: _mdgriffith$style_elements$Style_Color$text(colors.offSchedule),
																							_1: {ctor: '[]'}
																						}),
																					_1: {ctor: '[]'}
																				}
																			}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_mdgriffith$style_elements$Style$style,
																	_user$project$View$StationTimeShouldBe,
																	{
																		ctor: '::',
																		_0: _mdgriffith$style_elements$Style_Color$text(_elm_lang$core$Color$darkGray),
																		_1: {
																			ctor: '::',
																			_0: _mdgriffith$style_elements$Style_Font$strike,
																			_1: {
																				ctor: '::',
																				_0: _mdgriffith$style_elements$Style_Font$size(
																					_user$project$View$ts(-1)),
																				_1: {ctor: '[]'}
																			}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_mdgriffith$style_elements$Style$style,
																		_user$project$View$StationName,
																		{ctor: '[]'}),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_mdgriffith$style_elements$Style$style,
																			_user$project$View$StationDifference,
																			{ctor: '[]'}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_mdgriffith$style_elements$Style$style,
																				_user$project$View$StatusInfo,
																				{
																					ctor: '::',
																					_0: _mdgriffith$style_elements$Style_Font$size(
																						_user$project$View$ts(-1)),
																					_1: {
																						ctor: '::',
																						_0: _mdgriffith$style_elements$Style_Font$center,
																						_1: {ctor: '[]'}
																					}
																				}),
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
}();
var _user$project$View$stationRow = F2(
	function (stations, station) {
		var name = A2(_user$project$View$stationName, stations, station.stationShortCode);
		return A3(
			_mdgriffith$style_elements$Element$row,
			_user$project$View$None,
			{
				ctor: '::',
				_0: _mdgriffith$style_elements$Element_Attributes$spacing(
					_user$project$View$rem(0.5)),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: function () {
					var _p4 = {ctor: '_Tuple2', _0: station.liveEstimateTime, _1: station.differenceInMinutes};
					if (((_p4.ctor === '_Tuple2') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) {
						var _p5 = _p4._1._0;
						return A3(
							_mdgriffith$style_elements$Element$column,
							_user$project$View$StationTime,
							{
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Attributes$width(
									_mdgriffith$style_elements$Element_Attributes$px(_user$project$View$timeWidth)),
								_1: {
									ctor: '::',
									_0: A2(
										_mdgriffith$style_elements$Element_Attributes$vary,
										_user$project$View$OnTime,
										_elm_lang$core$Native_Utils.cmp(
											_elm_lang$core$Basics$abs(_p5),
											1) < 1),
									_1: {
										ctor: '::',
										_0: A2(
											_mdgriffith$style_elements$Element_Attributes$vary,
											_user$project$View$SlightlyOffSchedule,
											(_elm_lang$core$Native_Utils.cmp(
												_elm_lang$core$Basics$abs(_p5),
												1) > 0) && (_elm_lang$core$Native_Utils.cmp(
												_elm_lang$core$Basics$abs(_p5),
												5) < 1)),
										_1: {
											ctor: '::',
											_0: A2(
												_mdgriffith$style_elements$Element_Attributes$vary,
												_user$project$View$OffSchedule,
												_elm_lang$core$Native_Utils.cmp(
													_elm_lang$core$Basics$abs(_p5),
													5) > 0),
											_1: {ctor: '[]'}
										}
									}
								}
							},
							{
								ctor: '::',
								_0: _mdgriffith$style_elements$Element$text(
									_user$project$View$prettyTime(_p4._0._0)),
								_1: {
									ctor: '::',
									_0: A2(
										_mdgriffith$style_elements$Element$when,
										!_elm_lang$core$Native_Utils.eq(_p5, 0),
										A3(
											_mdgriffith$style_elements$Element$el,
											_user$project$View$StationTimeShouldBe,
											{ctor: '[]'},
											_mdgriffith$style_elements$Element$text(
												_user$project$View$prettyTime(station.scheduledTime)))),
									_1: {ctor: '[]'}
								}
							});
					} else {
						return A3(
							_mdgriffith$style_elements$Element$el,
							_user$project$View$StationTime,
							{
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Attributes$width(
									_mdgriffith$style_elements$Element_Attributes$px(_user$project$View$timeWidth)),
								_1: {ctor: '[]'}
							},
							_mdgriffith$style_elements$Element$text(
								_user$project$View$prettyTime(station.scheduledTime)));
					}
				}(),
				_1: {
					ctor: '::',
					_0: A3(
						_mdgriffith$style_elements$Element$el,
						_user$project$View$StationName,
						{ctor: '[]'},
						_mdgriffith$style_elements$Element$text(name)),
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$View$trainRow = F3(
	function (_p7, _p6, train) {
		var _p8 = _p7;
		var _p15 = _p8.stations;
		var _p9 = _p6;
		var statusInfoBadge = F2(
			function (station, n) {
				return A3(
					_mdgriffith$style_elements$Element$wrappedRow,
					_user$project$View$StatusInfo,
					{
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Attributes$center,
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A3(
							_mdgriffith$style_elements$Element$el,
							_user$project$View$StationTime,
							{
								ctor: '::',
								_0: A2(
									_mdgriffith$style_elements$Element_Attributes$vary,
									_user$project$View$OnTime,
									_elm_lang$core$Native_Utils.cmp(
										_elm_lang$core$Basics$abs(n),
										1) < 1),
								_1: {
									ctor: '::',
									_0: A2(
										_mdgriffith$style_elements$Element_Attributes$vary,
										_user$project$View$SlightlyOffSchedule,
										(_elm_lang$core$Native_Utils.cmp(
											_elm_lang$core$Basics$abs(n),
											1) > 0) && (_elm_lang$core$Native_Utils.cmp(
											_elm_lang$core$Basics$abs(n),
											5) < 1)),
									_1: {
										ctor: '::',
										_0: A2(
											_mdgriffith$style_elements$Element_Attributes$vary,
											_user$project$View$OffSchedule,
											_elm_lang$core$Native_Utils.cmp(
												_elm_lang$core$Basics$abs(n),
												5) > 0),
										_1: {ctor: '[]'}
									}
								}
							},
							_mdgriffith$style_elements$Element$text(
								A2(_user$project$View$formatDifference, 'On time', station.differenceInMinutes))),
						_1: {ctor: '[]'}
					});
			});
		var statusInfo = function (station) {
			return A2(
				_mdgriffith$style_elements$Element$whenJust,
				station.differenceInMinutes,
				statusInfoBadge(station));
		};
		var endStation = _elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$filter,
				function (row) {
					return _elm_lang$core$Native_Utils.eq(row.rowType, _user$project$Model$Arrival) && _elm_lang$core$Native_Utils.eq(row.stationShortCode, _p9._1);
				},
				train.timetableRows));
		var _p10 = function (homeStationRows) {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$List$head(
					A2(
						_elm_lang$core$List$filter,
						function (_p11) {
							return A2(
								F2(
									function (x, y) {
										return _elm_lang$core$Native_Utils.eq(x, y);
									}),
								_user$project$Model$Arrival,
								function (_) {
									return _.rowType;
								}(_p11));
						},
						homeStationRows)),
				_1: _elm_lang$core$List$head(
					A2(
						_elm_lang$core$List$filter,
						function (_p12) {
							return A2(
								F2(
									function (x, y) {
										return _elm_lang$core$Native_Utils.eq(x, y);
									}),
								_user$project$Model$Departure,
								function (_) {
									return _.rowType;
								}(_p12));
						},
						homeStationRows))
			};
		}(
			A2(
				_elm_lang$core$List$filter,
				function (_p13) {
					return A2(
						F2(
							function (x, y) {
								return _elm_lang$core$Native_Utils.eq(x, y);
							}),
						_p9._0,
						function (_) {
							return _.stationShortCode;
						}(_p13));
				},
				train.timetableRows));
		var homeStationArrival = _p10._0;
		var homeStationDeparture = _p10._1;
		var homeStationArrivingIn = A2(
			_elm_lang$core$Maybe$andThen,
			function (timeDiff) {
				return (_elm_lang$core$Native_Utils.cmp(timeDiff, 0) > 0) ? _elm_lang$core$Maybe$Just(
					A2(_mgold$elm_date_format$Time_Format$format, '%M:%S', timeDiff)) : _elm_lang$core$Maybe$Nothing;
			},
			A2(
				_elm_lang$core$Maybe$map,
				function (date) {
					return _elm_lang$core$Date$toTime(date) - _p8.currentTime;
				},
				A2(
					_elm_lang$core$Maybe$withDefault,
					A2(
						_elm_lang$core$Maybe$map,
						function (_) {
							return _.scheduledTime;
						},
						homeStationArrival),
					A2(
						_elm_lang$core$Maybe$map,
						function (_) {
							return _.liveEstimateTime;
						},
						homeStationArrival))));
		var homeStationLiveEstimate = A2(
			_elm_lang$core$Maybe$andThen,
			_elm_lang$core$Basics$identity,
			A2(
				_elm_lang$core$Maybe$map,
				function (_) {
					return _.liveEstimateTime;
				},
				homeStationDeparture));
		var currentStation = _elm_lang$core$List$head(
			_elm_lang$core$List$reverse(
				A2(
					_elm_lang$core$List$filter,
					function (_p14) {
						return A2(
							F2(
								function (x, y) {
									return !_elm_lang$core$Native_Utils.eq(x, y);
								}),
							_elm_lang$core$Maybe$Nothing,
							function (_) {
								return _.actualTime;
							}(_p14));
					},
					train.timetableRows)));
		var isMoving = !_elm_lang$core$Native_Utils.eq(currentStation, _elm_lang$core$Maybe$Nothing);
		return A3(
			_mdgriffith$style_elements$Element$row,
			_user$project$View$TrainRow,
			{
				ctor: '::',
				_0: A2(
					_mdgriffith$style_elements$Element_Attributes$paddingXY,
					_user$project$View$rem(1),
					_user$project$View$rem(0.5)),
				_1: {
					ctor: '::',
					_0: _mdgriffith$style_elements$Element_Attributes$spacing(
						_user$project$View$rem(1)),
					_1: {
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Attributes$verticalCenter,
						_1: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Attributes$width(
								_mdgriffith$style_elements$Element_Attributes$percent(100)),
							_1: {ctor: '[]'}
						}
					}
				}
			},
			{
				ctor: '::',
				_0: A3(
					_mdgriffith$style_elements$Element$column,
					_user$project$View$None,
					{
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Attributes$width(
							_mdgriffith$style_elements$Element_Attributes$px(
								_user$project$View$rem(2))),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A3(
							_mdgriffith$style_elements$Element$el,
							_user$project$View$TrainLineId,
							{
								ctor: '::',
								_0: A2(_mdgriffith$style_elements$Element_Attributes$vary, _user$project$View$Moving, isMoving),
								_1: {ctor: '[]'}
							},
							_mdgriffith$style_elements$Element$text(train.lineId)),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A3(
						_mdgriffith$style_elements$Element$column,
						_user$project$View$None,
						{
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Attributes$width(
								_mdgriffith$style_elements$Element_Attributes$fill(1)),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_mdgriffith$style_elements$Element$whenJust,
								homeStationDeparture,
								_user$project$View$stationRow(_p15)),
							_1: {
								ctor: '::',
								_0: A3(
									_mdgriffith$style_elements$Element$el,
									_user$project$View$StationTime,
									{
										ctor: '::',
										_0: _mdgriffith$style_elements$Element_Attributes$width(
											_mdgriffith$style_elements$Element_Attributes$px(_user$project$View$timeWidth)),
										_1: {ctor: '[]'}
									},
									_mdgriffith$style_elements$Element$text('︙')),
								_1: {
									ctor: '::',
									_0: A2(
										_mdgriffith$style_elements$Element$whenJust,
										endStation,
										_user$project$View$stationRow(_p15)),
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: A3(
							_mdgriffith$style_elements$Element$column,
							_user$project$View$None,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: A2(
									_mdgriffith$style_elements$Element$whenJust,
									homeStationArrivingIn,
									function (time) {
										return A3(
											_mdgriffith$style_elements$Element$el,
											_user$project$View$TrainArrivingIn,
											{ctor: '[]'},
											_mdgriffith$style_elements$Element$text('Arrives in'));
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_mdgriffith$style_elements$Element$whenJust,
										homeStationArrivingIn,
										function (time) {
											return A3(
												_mdgriffith$style_elements$Element$el,
												_user$project$View$TrainArrivingTime,
												{ctor: '[]'},
												_mdgriffith$style_elements$Element$text(time));
										}),
									_1: {
										ctor: '::',
										_0: A2(_mdgriffith$style_elements$Element$whenJust, currentStation, statusInfo),
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _user$project$View$trainsView = F3(
	function (model, _p16, trains) {
		var _p17 = _p16;
		var _p19 = _p17._1;
		var _p18 = _p17._0;
		var heading = A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_user$project$View$stationName, model.stations, _p18),
			A2(
				_elm_lang$core$Basics_ops['++'],
				'—',
				A2(_user$project$View$stationName, model.stations, _p19)));
		var rightDirection = _user$project$Model$sortedTrainList(trains);
		return A3(
			_mdgriffith$style_elements$Element$column,
			_user$project$View$Trains,
			{
				ctor: '::',
				_0: _mdgriffith$style_elements$Element_Attributes$spacing(
					_user$project$View$rem(1)),
				_1: {
					ctor: '::',
					_0: _mdgriffith$style_elements$Element_Attributes$width(
						_mdgriffith$style_elements$Element_Attributes$percent(100)),
					_1: {
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Attributes$minWidth(
							_mdgriffith$style_elements$Element_Attributes$px(
								_user$project$View$rem(20))),
						_1: {ctor: '[]'}
					}
				}
			},
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: A3(
						_mdgriffith$style_elements$Element$row,
						_user$project$View$Heading,
						{
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Attributes$spacing(
								_user$project$View$rem(1)),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_mdgriffith$style_elements$Element$link,
								'#',
								A3(
									_mdgriffith$style_elements$Element$el,
									_user$project$View$HeadingBack,
									{
										ctor: '::',
										_0: _mdgriffith$style_elements$Element_Attributes$width(
											_mdgriffith$style_elements$Element_Attributes$px(
												_user$project$View$rem(2))),
										_1: {ctor: '[]'}
									},
									_mdgriffith$style_elements$Element$text('‹'))),
							_1: {
								ctor: '::',
								_0: A3(
									_mdgriffith$style_elements$Element$el,
									_user$project$View$Heading,
									{ctor: '[]'},
									_mdgriffith$style_elements$Element$text(heading)),
								_1: {
									ctor: '::',
									_0: A2(
										_mdgriffith$style_elements$Element$link,
										A2(
											_elm_lang$core$Basics_ops['++'],
											'#',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_p19,
												A2(_elm_lang$core$Basics_ops['++'], '/', _p18))),
										A3(
											_mdgriffith$style_elements$Element$el,
											_user$project$View$HeadingSwap,
											{
												ctor: '::',
												_0: _mdgriffith$style_elements$Element_Attributes$width(
													_mdgriffith$style_elements$Element_Attributes$px(
														_user$project$View$rem(2))),
												_1: {
													ctor: '::',
													_0: _mdgriffith$style_elements$Element_Attributes$center,
													_1: {ctor: '[]'}
												}
											},
											_mdgriffith$style_elements$Element$html(
												_user$project$Icons$swap(
													_user$project$View$ts(2))))),
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {ctor: '[]'}
				},
				A2(
					_elm_lang$core$List$map,
					A2(
						_user$project$View$trainRow,
						model,
						{ctor: '_Tuple2', _0: _p18, _1: _p19}),
					rightDirection)));
	});
var _user$project$View$scheduleView = F2(
	function (model, targets) {
		var _p20 = model.trains;
		switch (_p20.ctor) {
			case 'Success':
				return A3(_user$project$View$trainsView, model, targets, _p20._0);
			case 'Failure':
				return A3(
					_mdgriffith$style_elements$Element$column,
					_user$project$View$None,
					{
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Attributes$spacing(
							_user$project$View$rem(1)),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A3(
							_mdgriffith$style_elements$Element$el,
							_user$project$View$Heading,
							{ctor: '[]'},
							_mdgriffith$style_elements$Element$text('Oh noes, an error!')),
						_1: {
							ctor: '::',
							_0: function () {
								var _p21 = _p20._0;
								switch (_p21.ctor) {
									case 'NetworkError':
										return _mdgriffith$style_elements$Element$text('It\'s the network.');
									case 'Timeout':
										return A2(
											_mdgriffith$style_elements$Element$below,
											{
												ctor: '::',
												_0: _mdgriffith$style_elements$Element$text('There was no response.'),
												_1: {ctor: '[]'}
											},
											_mdgriffith$style_elements$Element$text('Helloooo?'));
									case 'BadUrl':
										return _mdgriffith$style_elements$Element$text('It\'s not you, it\'s me. I have the server address wrong.');
									case 'BadStatus':
										return _mdgriffith$style_elements$Element$text('Whoops, looks like the server didn\'t like the request.');
									default:
										return _mdgriffith$style_elements$Element$text('Ouch, the server responded with strange contents.');
								}
							}(),
							_1: {ctor: '[]'}
						}
					});
			case 'Loading':
				return A3(
					_mdgriffith$style_elements$Element$el,
					_user$project$View$Heading,
					{ctor: '[]'},
					_mdgriffith$style_elements$Element$text('Loading'));
			default:
				return _mdgriffith$style_elements$Element$empty;
		}
	});
var _user$project$View$view = function (model) {
	return A2(
		_mdgriffith$style_elements$Element$viewport,
		_user$project$View$stylesheet,
		A3(
			_mdgriffith$style_elements$Element$column,
			_user$project$View$Main,
			{
				ctor: '::',
				_0: _mdgriffith$style_elements$Element_Attributes$center,
				_1: {
					ctor: '::',
					_0: _mdgriffith$style_elements$Element_Attributes$width(
						_mdgriffith$style_elements$Element_Attributes$percent(100)),
					_1: {
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Attributes$padding(
							_user$project$View$rem(2)),
						_1: {ctor: '[]'}
					}
				}
			},
			{
				ctor: '::',
				_0: A3(
					_mdgriffith$style_elements$Element$el,
					_user$project$View$None,
					{
						ctor: '::',
						_0: _mdgriffith$style_elements$Element_Attributes$spacing(
							_user$project$View$rem(2)),
						_1: {
							ctor: '::',
							_0: _mdgriffith$style_elements$Element_Attributes$width(
								_mdgriffith$style_elements$Element_Attributes$percent(100)),
							_1: {
								ctor: '::',
								_0: _mdgriffith$style_elements$Element_Attributes$maxWidth(
									_mdgriffith$style_elements$Element_Attributes$px(
										_user$project$View$rem(30))),
								_1: {
									ctor: '::',
									_0: _mdgriffith$style_elements$Element_Attributes$center,
									_1: {ctor: '[]'}
								}
							}
						}
					},
					function () {
						var _p22 = model.route;
						switch (_p22.ctor) {
							case 'SelectDepRoute':
								return _user$project$View$selectDepView(model);
							case 'SelectDestRoute':
								return A2(_user$project$View$selectDestView, model, _p22._0);
							default:
								return A2(
									_user$project$View$scheduleView,
									model,
									{ctor: '_Tuple2', _0: _p22._0, _1: _p22._1});
						}
					}()),
				_1: {ctor: '[]'}
			}));
};

var _user$project$Main$get = _ohanhi$remotedata_http$RemoteData_Http$getWithConfig(_ohanhi$remotedata_http$RemoteData_Http$defaultConfig);
var _user$project$Main$subscriptions = function (model) {
	return A2(_elm_lang$core$Time$every, _elm_lang$core$Time$second, _user$project$View$UpdateTime);
};
var _user$project$Main$getTrains = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0;
	var trainsUrl = A2(
		_ohanhi$remotedata_http$RemoteData_Http$url,
		A2(_elm_lang$core$Basics_ops['++'], 'https://rata.digitraffic.fi/api/v1/live-trains/station/', _p2),
		{
			ctor: '::',
			_0: A2(_user$project$Model_ops['=>'], 'minutes_before_departure', '120'),
			_1: {
				ctor: '::',
				_0: A2(_user$project$Model_ops['=>'], 'minutes_after_departure', '0'),
				_1: {
					ctor: '::',
					_0: A2(_user$project$Model_ops['=>'], 'minutes_before_arrival', '0'),
					_1: {
						ctor: '::',
						_0: A2(_user$project$Model_ops['=>'], 'minutes_after_arrival', '0'),
						_1: {ctor: '[]'}
					}
				}
			}
		});
	return A3(
		_user$project$Main$get,
		trainsUrl,
		_user$project$View$TrainsResponse,
		_user$project$Model$trainsDecoder(
			{ctor: '_Tuple2', _0: _p2, _1: _p1._1}));
};
var _user$project$Main$getStations = function () {
	var stationsUrl = 'https://rata.digitraffic.fi/api/v1/metadata/stations';
	return A3(_user$project$Main$get, stationsUrl, _user$project$View$StationsResponse, _user$project$Model$stationsDecoder);
}();
var _user$project$Main$parseLocation = function (location) {
	var routeParser = _evancz$url_parser$UrlParser$oneOf(
		{
			ctor: '::',
			_0: A2(_evancz$url_parser$UrlParser$map, _user$project$Model$SelectDepRoute, _evancz$url_parser$UrlParser$top),
			_1: {
				ctor: '::',
				_0: A2(_evancz$url_parser$UrlParser$map, _user$project$Model$SelectDestRoute, _evancz$url_parser$UrlParser$string),
				_1: {
					ctor: '::',
					_0: A2(
						_evancz$url_parser$UrlParser$map,
						_user$project$Model$ScheduleRoute,
						A2(_evancz$url_parser$UrlParser_ops['</>'], _evancz$url_parser$UrlParser$string, _evancz$url_parser$UrlParser$string)),
					_1: {ctor: '[]'}
				}
			}
		});
	return A2(
		_elm_lang$core$Maybe$withDefault,
		_user$project$Model$SelectDepRoute,
		A2(_evancz$url_parser$UrlParser$parseHash, routeParser, location));
};
var _user$project$Main$locationChange = F2(
	function (location, model) {
		var route = _user$project$Main$parseLocation(location);
		var _p3 = function () {
			var _p4 = route;
			if (_p4.ctor === 'ScheduleRoute') {
				return {
					ctor: '_Tuple2',
					_0: _krisajenkins$remotedata$RemoteData$Loading,
					_1: _user$project$Main$getTrains(
						{ctor: '_Tuple2', _0: _p4._0, _1: _p4._1})
				};
			} else {
				return {ctor: '_Tuple2', _0: _krisajenkins$remotedata$RemoteData$NotAsked, _1: _elm_lang$core$Platform_Cmd$none};
			}
		}();
		var trains = _p3._0;
		var trainsCmd = _p3._1;
		return A2(
			_elm_lang$core$Platform_Cmd_ops['!'],
			_elm_lang$core$Native_Utils.update(
				model,
				{route: route, trains: trains}),
			{
				ctor: '::',
				_0: trainsCmd,
				_1: {ctor: '[]'}
			});
	});
var _user$project$Main$update = F2(
	function (msg, model) {
		var _p5 = msg;
		switch (_p5.ctor) {
			case 'UrlChange':
				return A2(_user$project$Main$locationChange, _p5._0, model);
			case 'UpdateTime':
				var _p6 = A2(
					_elm_lang$core$Maybe$withDefault,
					{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Just(model.currentTime),
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$Maybe$map,
						function (time) {
							var _p7 = model.route;
							if (_p7.ctor === 'ScheduleRoute') {
								return (_elm_lang$core$Native_Utils.cmp(model.currentTime - time, 10 * _elm_lang$core$Time$second) > -1) ? {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Maybe$Just(model.currentTime),
									_1: {
										ctor: '::',
										_0: _user$project$Main$getTrains(
											{ctor: '_Tuple2', _0: _p7._0, _1: _p7._1}),
										_1: {ctor: '[]'}
									}
								} : {
									ctor: '_Tuple2',
									_0: model.lastRequestTime,
									_1: {ctor: '[]'}
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: model.lastRequestTime,
									_1: {ctor: '[]'}
								};
							}
						},
						model.lastRequestTime));
				var lastRequestTime = _p6._0;
				var cmds = _p6._1;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{currentTime: _p5._0, lastRequestTime: lastRequestTime}),
					cmds);
			case 'TrainsResponse':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{trains: _p5._0}),
					{ctor: '[]'});
			default:
				if (_p5._0.ctor === 'Success') {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{stations: _p5._0._0}),
						{ctor: '[]'});
				} else {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'});
				}
		}
	});
var _user$project$Main$init = F2(
	function (time, location) {
		var _p8 = A2(
			_user$project$Main$locationChange,
			location,
			{trains: _krisajenkins$remotedata$RemoteData$NotAsked, stations: _elm_lang$core$Dict$empty, currentTime: time, lastRequestTime: _elm_lang$core$Maybe$Nothing, route: _user$project$Model$SelectDepRoute});
		var model = _p8._0;
		var trainsCmd = _p8._1;
		return A2(
			_elm_lang$core$Platform_Cmd_ops['!'],
			model,
			{
				ctor: '::',
				_0: _user$project$Main$getStations,
				_1: {
					ctor: '::',
					_0: trainsCmd,
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$Main$main = A2(
	_elm_lang$navigation$Navigation$programWithFlags,
	_user$project$View$UrlChange,
	{init: _user$project$Main$init, view: _user$project$View$view, update: _user$project$Main$update, subscriptions: _user$project$Main$subscriptions})(_elm_lang$core$Json_Decode$float);

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
if (typeof _user$project$Main$main !== 'undefined') {
    _user$project$Main$main(Elm['Main'], 'Main', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

