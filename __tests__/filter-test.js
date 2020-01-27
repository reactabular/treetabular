import { filter } from '../src';

describe('tree.filter', function () {
  it('returns empty rows if empty rows are passed', function () {
    expect(filter({ fieldName: 'showingChildren' })([])).toEqual([]);
  });

  it('returns rows that do not have parents', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        foo: 'foo',
        showingChildren: true
      }
    ];

    expect(filter({ fieldName: 'showingChildren' })(given)).toEqual(given);
  });

  it('returns rows with showingChildren set true while checking parents', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        id: 123,
        foo: 'foo',
        showingChildren: false
      },
      {
        id: 234,
        parent: 123,
        foo: 'foo'
      },
      {
        id: 567,
        parent: 123,
        foo: 'foo2'
      }
    ];
    const expected = [
      {
        foo: 'bar'
      },
      {
        id: 123,
        foo: 'foo',
        showingChildren: false
      }
    ];

    expect(filter({ fieldName: 'showingChildren' })(given)).toEqual(expected);
  });

  it('works if parent id is zero', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        id: 0,
        foo: 'foo',
        showingChildren: false
      },
      {
        id: 234,
        parent: 0,
        foo: 'foo'
      }
    ];
    const expected = [
      {
        foo: 'bar'
      },
      {
        id: 0,
        foo: 'foo',
        showingChildren: false
      }
    ];

    expect(filter({ fieldName: 'showingChildren' })(given)).toEqual(expected);
  });

  it('allow parent field to be customized', function () {
    const parentField = 'demo';
    const given = [
      {
        foo: 'bar'
      },
      {
        id: 123,
        foo: 'foo',
        showingChildren: false
      },
      {
        id: 234,
        [parentField]: 123,
        foo: 'foo'
      }
    ];
    const expected = [
      {
        foo: 'bar'
      },
      {
        id: 123,
        foo: 'foo',
        showingChildren: false
      }
    ];

    expect(filter({
      fieldName: 'showingChildren',
      parentField
    })(given)).toEqual(expected);
  });

  it('throws an error if fieldName is not passed', function () {
    expect(filter()).toThrow(Error);
  });
});
