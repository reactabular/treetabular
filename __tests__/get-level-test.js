import { getLevel } from '../src';

describe('tree.getLevel', function () {
  it('returns zero if empty rows are passed', function () {
    expect(getLevel()([])).toEqual(0);
  });

  it('returns zero if there are no parents', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = 0;

    expect(getLevel({ index: 0 })(given)).toEqual(expected);
  });

  it('returns one if there is one parent', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'bar',
        foo: 'foo'
      }
    ];
    const expected = 1;

    expect(getLevel({ index: 1, idField: 'foo' })(given)).toEqual(expected);
  });

  it('returns one if there is one parent and parent has null parent', function () {
    const given = [
      {
        parent: null,
        foo: 'bar'
      },
      {
        parent: 'bar',
        foo: 'foo'
      }
    ];
    const expected = 1;

    expect(getLevel({ index: 1, idField: 'foo' })(given)).toEqual(expected);
  });

  it('works with sibling children', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'bar',
        foo: 'foo'
      },
      {
        parent: 'bar',
        foo: 'barbar'
      }
    ];
    const expected = 1;

    expect(getLevel({ index: 2, idField: 'foo' })(given)).toEqual(expected);
  });

  it('works with preceding parent', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'bar',
        foo: 'foo'
      },
      {
        foo: 'barbar'
      }
    ];
    const expected = 0;

    expect(getLevel({ index: 2, idField: 'foo' })(given)).toEqual(expected);
  });

  it('works with preceding parent if own parent is null', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'bar',
        foo: 'foo'
      },
      {
        parent: null,
        foo: 'barbar'
      }
    ];
    const expected = 0;

    expect(getLevel({ index: 2, idField: 'foo' })(given)).toEqual(expected);
  });

  it('works with sibling children without parents', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        foo: 'foo'
      }
    ];
    const expected = 0;

    expect(getLevel({ index: 1, idField: 'foo' })(given)).toEqual(expected);
  });

  it('works with sibling children when parent is set to null', function () {
    const given = [
      {
        foo: 'bar',
        parent: null
      },
      {
        foo: 'foo',
        parent: null
      }
    ];
    const expected = 0;

    expect(getLevel({ index: 1, idField: 'foo' })(given)).toEqual(expected);
  });

  it('works with nested children', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'bar',
        foo: 'foo'
      },
      {
        parent: 'foo',
        foo: 'barbar'
      }
    ];
    const expected = 2;

    expect(getLevel({ index: 2, idField: 'foo' })(given)).toEqual(expected);
  });

  it('allows parent field to be customized', function () {
    const parentField = 'demo';
    const given = [
      {
        foo: 'bar'
      },
      {
        [parentField]: 'bar',
        foo: 'foo'
      },
      {
        [parentField]: 'foo',
        foo: 'barbar'
      }
    ];
    const expected = 2;

    expect(getLevel({ index: 2, idField: 'foo', parentField })(given)).toEqual(expected);
  });
});
