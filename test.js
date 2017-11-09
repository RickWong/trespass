const $ = require('./index');

test('works with undefined', () => {
    expect($(undefined).$).toBe(undefined);
    expect($(undefined).foo.$).toBe(undefined);
});

test('works with null', () => {
    expect($(null).$).toBe(null);
    expect($(null).foo.$).toBe(undefined);
});

test('works with false', () => {
    expect($(false).$).toBe(false);
    expect($(false).foo.$).toBe(undefined);
});

test('works with string', () => {
    expect($('string').$).toBe('string');
    expect($('string').foo.$).toBe(undefined);
});

test('works with function', () => {
    expect(typeof $(() => 5)).toBe('function');
    expect(typeof $(() => 5).$).toBe('function');
    expect($(() => 5)().$).toBe(5);
    expect($(() => 5)().a.b.$).toBe(undefined);
    expect($(() => 5).$()).toBe(5);
    expect($(() => 5).$().a).toBe(undefined);
});

test('works with object', () => {
    const object = {
        a: {
            b: {
                c: 'abc',
            },
        },
        x: () => 'x',
    };

    expect($(object).a.$).toEqual({b: {c: 'abc'}});
    expect($(object).a.b.$).toEqual({c: 'abc'});
    expect($(object).a.b.a.$).toBe(undefined);
    expect($(object).a.b.c.$).toBe('abc');
    expect($(object).a.b.c.d.$).toBe(undefined);
    expect($(object).x().$).toBe('x');
    expect($(object).x().a.$).toBe(undefined);
    expect($(object).y().z.$).toBe(undefined);
});

test('works with array', () => {
    const array = ['0', 1, [2]];

    expect($(array).$).toBe(array);
    expect($(array)[0].$).toBe('0');
    expect($(array)[1].$).toBe(1);
    expect($(array)[2].$).toEqual([2]);
    expect($(array)[2][0].$).toBe(2);
    expect($(array)[2][0].foo.$).toBe(undefined);
});

test('works with custom terminator ø', () => {
    const item = { foo: 'bar' };
    const ø = $.createWrapper('ø');

    expect(ø(item).ø.foo).toBe('bar');
    expect(ø(item).foo.ø).toBe('bar');
});

test('has works', () => {
    const item = { foo: 'bar' };

    expect('foo' in $(item)).toBe(true);
    expect('fuu' in $(item)).toBe(false);
});


test('delete works', () => {
    const item = { foo: 'bar' };

    expect('foo' in $(item)).toBe(true);
    delete $(item).foo;
    expect('foo' in $(item)).toBe(false);
});
